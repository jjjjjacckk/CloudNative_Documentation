const Workspace = require('../models/workspace')
const User = require('../models/user')

createWorkspace = async (req, res) => { 
    const body = req.body
    // const body = {name: 'new3', members: '647632c9ae2457001ac7b9c0', tags: {tag: "abc", number: 2}}

    if (!body) {
        console.count('error: ' + 'You must provide a workspace')
        return res.status(400).json({
            data: '',
            // message: 'You must provide a workspace'
        })
    }

    const workspace = new Workspace(body)

    if (!workspace) {
        console.count('error: ' + err)
        return res.status(400).json({ message: err })
    }

    try {
        const oldWorkspace = await Workspace.findOne({ name: workspace.name }).exec()
        if (oldWorkspace) {
          console.count('error: ' + 'Workspace exist')
          return res.status(400).json({ data: '' /*message: 'Workspace exist'*/ })
        }

        const oldUser = await User.findOne({ _id: workspace.members }).exec()
        if (!oldUser) {
          console.count('error: ' + 'User not exist')
          return res.status(400).json({ data: ''/*message: 'User not exist'*/ })
        }
        oldUser.workspace.push(workspace._id)
        oldUser.save()
    
        await workspace.save()

        return res.status(201).json({
          data: workspace._id,
        })
      } catch (error) {
        console.count('error: ' + error)
        return res.status(400).json({
            data: '',
          // message: error,
        })
      }
}

getWorkspace = async (req, res) => {

    try {
        const workspace = await Workspace.findOne({ _id: req.params.id})

        if (!workspace) {
            console.count('error: ' + 'Workspace not found');
            return res.status(403).json({ data: '' })
        }

        return res.status(200).json({ data: workspace })
    } catch (error) {
        console.count('error: ' + error)
        return res.status(400).json({ data: '' })
    }
}

getWorkspaceTags = async (req, res) => {

    try {
        const workspace = await Workspace.findOne({ _id: req.params.id})

        if (!workspace) {
            console.count('error: ' + 'Workspace not found');
            return res.status(403).json({ data: '' })
        }

        return res.status(200).json({ data: workspace.tags })
    } catch (error) {
        console.count('error: ' + error)
        return res.status(400).json({ data: '' })
    }
}

leaveWorkspace = async (req, res) => {
    const body = req.body
    const uid = body.id
    // const uid = '647632c9ae2457001ac7b9c0'

    try {
        const workspace = await Workspace.findOne({ _id: req.params.id})

        if (!workspace) {
            console.count('error: ' + 'Workspace not found');
            return res.status(403).json({ message: 'failed' })
        }

        const user = await User.findOne({ _id: uid})

        if (!user) {
            console.count('error: ' + 'User not found');
            return res.status(403).json({ message: 'failed' })
        }

        if (!workspace.members.pull(uid)) {
            console.count('error: ' + 'User not in workspace');
            return res.status(403).json({ message: 'failed' })
        }

        if (!user.workspace.pull(req.params.id)) {
            console.count('error: ' + 'workspace not in user');
            return res.status(403).json({ message: 'failed' })
        }

        await workspace.save()
        await user.save()

        return res.status(200).json({ message: 'success' })
    } catch (error) {
        console.count('error: ' + error)
        return res.status(400).json({ message: 'failed' })
    }
}

joinWorkspace = async (req, res) => {
    const body = req.body
    const uid = body.id
    // const uid = '647b2ef0b46647001a73a0f6'

    try {
        const workspace = await Workspace.findOne({ _id: req.params.id})

        if (!workspace) {
            console.count('error: ' + 'Workspace not found');
            return res.status(403).json({ message: 'failed' })
        }

        const user = await User.findOne({ _id: uid})

        if (!user) {
            console.count('error: ' + 'User not found');
            return res.status(403).json({ message: 'failed' })
        }

        var matchAcc = workspace.members.find(element => element == uid);
        console.log(matchAcc)
        if(matchAcc == undefined) {
            workspace.members.push(uid)
            await workspace.save()
    
            user.workspace.push(req.params.id)
            await user.save()
    
            return res.status(200).json({ message: 'success' })
        } else {
            console.count('error: ' + 'User exists in workspace');
            return res.status(403).json({ message: 'failed' })
        }

    } catch (error) {
        console.count('error: ' + error)
        return res.status(400).json({ message: 'failed' })
    }
}

getAllWorkspace = async (req, res) => {
    await Workspace.find({}, (err, AllWorkspace) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!AllWorkspace.length) {
            return res
                .status(404)
                .json({ success: false, error: `Workspace not found` })
        }
        return res.status(200).json({ success: true, data: AllWorkspace })
    }).catch(err => console.log(err))
}

module.exports = {
    createWorkspace,
    getWorkspace,
    getWorkspaceTags,
    leaveWorkspace,
    joinWorkspace,
    getAllWorkspace,
}