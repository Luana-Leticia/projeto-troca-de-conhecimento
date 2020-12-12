const Meeting = require('../models/meetingSchema');
const Account = require('../models/accountSchema');

const add = async (request, response) => {
    const accountId = request.accountId;
    const { otherAccountId } = request.params;
    const { date, topic } = request.body;
    const participants = [accountId, otherAccountId];
    const option = { new: true };

    const newMeeting = new Meeting({ date, participants, topic });
    await newMeeting.save(async (error) => {
        if (error) {
            response.status(500).send(error);
        } else {
            Account.findByIdAndUpdate(accountId,
                { $push: { meetings: newMeeting._id } },
                option,
                (error, account) => {
                    if (error) {
                        response.status(500).send(error);
                    }
                }
            );
            Account.findByIdAndUpdate(otherAccountId,
                { $push: { meetings: newMeeting._id } },
                option,
                (error, account) => {
                    if (error) {
                        response.status(500).send(error);
                    }
                }
            );
            response.status(200).json(
                { message: "Reunião marcada com sucesso." });
        }
    });
}

const find = async (request, response) => {
    const accountId = request.accountId;
    const account = await Account.findById(accountId).select('meetings').populate('meetings');

    if (account.meetings.length > 0) {
        response.status(200).send(account.meetings);
    } else {
        response.status(404).json(
            { message: "Sem reuniões marcadas." });
    }
}

const findByTopic = (request, response) => {
    const accountId = request.accountId;
    const param = request.params.topic;
    Account.findById(accountId,
        (error, account) => {
            if (error) {
                response.status(500).send(error);
            } else if (!account.meetings.length > 0) {
                response.status(404).json({
                    message: "Sem reuniões marcadas."
                });
            } else {
                const meetings = account.meetings;
                const matchedMeetings = meetings.filter(
                    meeting => meeting.topic == param);
                if (matchedMeetings.length > 0) {
                    response.status(200).json(matchedMeetings);
                }
                response.status(404).json({
                    message: "Nenhum resultado encontrado."
                });

            }
        }).select('meetings').populate('meetings');
}

const edit = async (request, response) => {
    const accountId = request.accountId;
    const meetingId = request.params.meetingId;
    const body = request.body;
    const option = { new: true };

    await Account.findById(accountId,
        async (error, account) => {
            if (error) {
                response.status(500).send(error);
            }
            if (account.meetings.find(id => id == meetingId)) {

                await Meeting.findByIdAndUpdate(meetingId,
                    { $set: body },
                    option,
                    async (error, meeting) => {
                        if (error) {
                            response.status(500).send(error);
                        } else if (meeting) {
                            response.status(200).json({
                                message: "Reunião editada com sucesso."
                            });
                        }
                    });
            }

            response.status(404).json({
                message: "Reunião não encontrada."
            });

        }).select('meetings');
}

const remove = async (request, response) => {
    const accountId = request.accountId;
    const meetingId = request.params.meetingId;

    await Account.findById(accountId,
        async (error, account) => {
            if (error) {
                response.status(500).send(error);
            }
            const meeting = account.meetings.find(
                (meeting) => meeting.id == meetingId)
            if (meeting) {
                meeting.participants.forEach(async (participantId) => {
                    await Account.findByIdAndUpdate(
                        participantId,
                        {
                            $pull: {
                                meetings: meetingId
                            }
                        }).select('meetings');
                })

                await Meeting.findByIdAndDelete(meetingId,
                    async (error, meeting) => {
                        if (error) {
                            response.status(500).send(error);
                        } else if (meeting) {
                            response.status(200).json(
                                {
                                    message: "Reunião deletada com sucesso."
                                });
                        }
                    });
            }

            return response.status(404).json(
                { message: "Reunião não encontrada." });

        }).select('meetings').populate('meetings');
}


module.exports = {
    add,
    find,
    findByTopic,
    edit,
    remove
}