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
    Account.find({ topic: param },
        (error, meeting) => {
            if (error) {
                response.status(404).json({ message: "Nenhum resultado encontrado." });
            } else {
                response.status(200).json(meeting);
            }
        });
}

module.exports = {
    add,
    find,
    findById
}