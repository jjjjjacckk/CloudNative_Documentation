const express = require('express')

// const Ctrl = require('../controllers/ctrl')
const User = require('../controllers/user_ctrl')
const File = require('../controllers/file_ctrl')
const Workspace = require('../controllers/workspace_ctrl')

const router = express.Router()

// router.post('/movie', Ctrl.createMovie)
// router.put('/movie/:id', Ctrl.updateMovie)
// router.delete('/movie/:id', Ctrl.deleteMovie)
// router.get('/movie/:id', Ctrl.getMovieById)
// router.get('/movies', Ctrl.getMovies)

router.post('/newUser', User.createUser)
router.get('/getAllUsers', User.getAllUsers)
router.get('/getUserInfo/:id', User.getUserInfo)
router.get('/getUserName/:id', User.getUserName)

router.post('/createWorkspace', Workspace.createWorkspace)
router.get('/getWorkspace/:id', Workspace.getWorkspace)
router.get('/getWorkspaceTags/:id', Workspace.getWorkspaceTags)
router.put('/leaveWorkspace/:id', Workspace.leaveWorkspace)
router.put('/joinWorkspace/:id', Workspace.joinWorkspace)
router.get('/getAllWorkspace', Workspace.getAllWorkspace)

router.post('/createFile', File.createFile)
router.delete('/deleteFile/:id', File.deleteFile)
router.get('/getFileInfo/:id', File.getFileInfo)
router.get('/getFile/:id', File.getFile)
router.put('/updateFile', File.updateFile)
router.put('/updateSnapshot', File.updateSnapshot)
router.put('/updateHistory', File.updateHistory)

module.exports = router