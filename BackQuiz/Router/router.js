const express = require('express');
const multer = require('multer');
const Question = require('../Database/data');
const Punc = require('../Database/punctuation');
const router = express.Router();
const multerConfig = require('../models/multer');
const multer1 = multer(multerConfig);

router.get('/questions', async(req, res) => {
    const find = await Question.find();

    res.json(find);
});

router.get('/getpunc', async (req, res) =>{
    const find = await Punc.find();

    res.json(find);
})

router.delete('/deletepunc/:id', async (req, res) =>{
    const user = await Punc.findById(req.params.id);

    await user.remove();
    res.send();
})

router.post('/senduser', async (req, res) => {
    const users = new Punc({
        name: req.body.name,
        punc: req.body.punc
    });

    try {
        const a1 = await users.save();
        res.json(a1);
    } catch (error) {
        res.send(error);
    }
})

router.post('/send', multer1.single('file'), async(req, res) => {
    const questions = new Question({
        title: req.body.title,
        description: req.body.description,
        alternatives: req.body.alternatives,
        answer: req.body.answer,
        url: req.file.location,
        key: req.file.key
        //imageUrl: req.file.imageUrl,
    })

    try {
        const a1 = await questions.save();
        res.json(a1);
    } catch (error) {
        res.send(error);
    }
});

router.delete('/delete/:id', async(req,res) => {
    const question = await Question.findById(req.params.id);

    await question.remove();
    return res.send();
})

module.exports = router;