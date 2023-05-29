const express = require('express')

const Ctrl = require('../controllers/ctrl')

const router = express.Router()

router.post('/movie', Ctrl.createMovie)
router.put('/movie/:id', Ctrl.updateMovie)
router.delete('/movie/:id', Ctrl.deleteMovie)
router.get('/movie/:id', Ctrl.getMovieById)
router.get('/movies', Ctrl.getMovies)

router.post('/home/:uid/createFile', Ctrl.createFile)

module.exports = router