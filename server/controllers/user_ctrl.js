const User = require('../models/user')
const Workspace = require('../models/workspace')

createUser = async (req, res) => { // need create workspace
    console.log('createUser')
    const body = req.body
    // const body = {  account: "1234567",
    //                 password: "abcdefg",
    //                 username : "roger",
    //             }

    if (!body) {
        console.count('error: ' + 'You must provide a user')
        return res.status(400).json({
            message: 'You must provide a user'
        })
    }

    const user = new User(body)

    if (!user) {
        console.count('error: ' + err)
        return res.status(400).json({ message: err })
    }

    try {
        const oldUser = await User.findOne({ account: user.account }).exec()
        if (oldUser) {
          console.count('error: ' + 'account exist')
          return res.status(400).json({ message: 'account exist' })
        }

        const workspace_input = { name: user.username, members: user._id}

        const workspace = new Workspace(workspace_input)

        if (!workspace) {
            console.count('error: ' + err)
            return res.status(400).json({ message: err })
        }

        await workspace.save()

        user.workspace.push(workspace._id)

        const public = await Workspace.findOne({name: 'Public'})
        
        public.members.push(user._id)
        await public.save()

        user.workspace.push(public._id)

        await user.save()

        return res.status(201).json({
          message: 'success',
        })
      } catch (error) {
        console.count('error: ' + error)
        return res.status(400).json({
          message: error,
        })
      }
}

getAllUsers = async (req, res) => {
    await User.find({}, (err, AllUser) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!AllUser.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: AllUser })
    }).catch(err => console.log(err))
}

getUserInfo = async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.params.id })

        if (!user) {
            console.count('error: ' + 'ID not found');
            return res.status(403).json({ data: '' })
        }

        return res.status(200).json({ data: user })
    } catch (error) {
        console.count('error: ' + error)
        return res.status(400).json({ message: error })
    }
}

getUserName = async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.params.id })

        if (!user) {
            console.count('error: ' + 'ID not found');
            return res.status(403).json({ data: '' })
        }

        return res.status(200).json({ data: user.username })
    } catch (error) {
        console.count('error: ' + error)
        return res.status(400).json({ message: error })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserInfo,
    getUserName,
}