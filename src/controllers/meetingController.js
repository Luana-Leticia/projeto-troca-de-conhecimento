const Meeting = require('../models/meetingSchema');

const add = (request, response) => {
    const { date, participants, topic } = request.body;

    const newMeeting = new Meeting({ date, participants, topic });
    newMeeting.save((error) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).json({ message: "Reunião marcada com sucesso." });
        }
    });
}

const find = (request, response) => {
    Meeting.find(
        (error, meeting) => {
            if (error) {
                response.status(500).json(error);
            } else {
                response.status(200).send(meeting);
            }
        }
    )
}

const findById = (request, response) => {
    const param = request.params.id;
    Meeting.findById(param,
        (error, meeting) => {
            if (error) {
                response.status(404).json({ message: "ID inválido" });
            } else {
                response.status(200).json(meeting);
            }
        });
}


const findByTopic = (request, response) => {
    const param = request.params.topic;
    Meeting.find({ topic: param },
        (error, meetings) => {
            if (error) {
                response.status(500).send(error);
            } else if (meetings.length > 0) {
                response.status(200).json(meetings);
            } else {
                response.status(404).json({ message: "Nenhum resultado encontrado." });
            }
        });
}

const findByDate = (request, response) => {
    const param = request.params.date;
    Meeting.find({ date: param },
        (error, meetings) => {
            if (error) {
                response.status(500).send(error);
            } else if (meetings.length > 0) {
                response.status(200).json(meetings);
            } else {
                response.status(404).json({ message: "Nenhum resultado encontrado." });
            }
        });
}

const edit = (request, response) => {
    const param = request.params.id;
    const body = request.body;
    const option = { new: true };
    Meeting.findByIdAndUpdate(param, body, option,
        (error, meeting) => {
            if (error) {
                response.status(500).send(error);
            } else if (meeting) {
                response.status(200).json({ message: "Reunião editada com sucesso." });
            } else {
                response.status(404).json({ message: "ID inválido." });
            }
        });
}

const remove = (request, response) => {
    const param = request.params.id;
    Meeting.findByIdAndDelete(param,
        (error, meeting) => {
            if (error) {
                response.status(500).send(error);
            } else if (meeting) {
                response.status(200).json({ message: "Reunião desmarcada com sucesso." });
            } else {
                response.status(404).json({ message: "ID inválido." });
            }
        });
}

module.exports = {
    add,
    find,
    findById,
    findByTopic,
    findByDate,
    edit,
    remove
}