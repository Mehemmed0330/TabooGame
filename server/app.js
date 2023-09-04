const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');

const port = 3000
app.use(bodyParser.json())
app.use(cors())
require('dotenv').config()

const WordsSchema = new mongoose.Schema({
    topWord: String,
    firstWord: String,
    secondWord: String,
    thirdWord: String,
    fourthWord: String,
})

const WordModel = mongoose.model('WordModel', WordsSchema)

// get words
app.get('/api/words', async(req, res) => {
    res.send(await WordModel.find())
})

// post words
app.post('/api/words', async(req, res) => {
    const { topWord, firstWord, secondWord, thirdWord, fourthWord } = req.body
    const newWord = new WordModel({
        topWord: topWord,
        firstWord: firstWord,
        secondWord: secondWord,
        thirdWord: thirdWord,
        fourthWord: fourthWord
    })
    console.log(firstWord);
    await newWord.save()
    res.status(200).send(newWord)
})

// delete words
app.delete('/api/words/:id', async(req, res) => {
    const { id } = req.params
    const deleteWord = await WordModel.findByIdAndRemove(id)
    res.send({ message: "Deleted Word" })
})


// put words
app.put('/api/words/:id', async(req, res) => {
    const { id } = req.params
    const { topWord, firstWord, secondWord, thirdWord, fourthWord } = req.body
    const updateWord = { topWord: topWord, firstWord: firstWord, secondWord: secondWord, thirdWord: thirdWord, fourthWord: fourthWord }
    await WordModel.findByIdAndUpdate(id, updateWord)
    res.send({ message: `${updateWord.topWord} is updated` })
})



app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})

mongoose.connect(process.env.SERVER_URL).then(() => {
    console.log('Connection mongodb')
})