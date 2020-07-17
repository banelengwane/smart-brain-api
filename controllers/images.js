const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '153e6a6e24af4986a9eb4241df667771'
})

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(res.status(400).json('unable to work with api'))
}

const handleImages = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to count'))
}

module.exports = { handleImages, handleApiCall }