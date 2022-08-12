const express = require('express')
const tvshowRouter = express.Router()
const { v4: uuidv4} = require('uuid')

let tvShows = [
    {title: "The Walking Dead", channel: "AMC", _id: uuidv4()},
    {title: "Vikings", channel: "History", _id: uuidv4()},
    {title: "How I Met Your Mother", channel: "FOX", _id: uuidv4()},
    {title: "Brooklyn 99", channel: "FOX", _id: uuidv4()}
]

tvshowRouter
    .get('/', (req, res) => {
    res.send(tvShows)
    })

    .get('/:tvId', (req, res) => {
        const tvId = req.params.tvId
        const singularShow = tvShows.find(show => show._id === tvId)
        
        res.send(singularShow)
    })

    .post('/', (req, res) => {
    // Extracting our new req.body
    const tvShow = req.body
    tvShow._id = uuidv4()
    tvShows.push(tvShow)
    
    console.log(tvShows)
    res.send(`Successfully added ${tvShows.title} to the database`)
    })

module.exports = tvshowRouter