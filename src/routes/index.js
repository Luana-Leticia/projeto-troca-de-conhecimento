const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.status(200).json({
        title: "Bem-vindo à plataforma Troca de conhecimento",
        version: "1.0.0"
    });
})

module.exports = router;