const User = require('../models/user')
const Workspace = require('../models/workspace')

createUser = async (req, res) => { // need create workspace
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
    
        await user.save()

        const workspace_input = { name: user.username, members: user._id}

        const workspace = new Workspace(workspace_input)

        if (!workspace) {
            console.count('error: ' + err)
            return res.status(400).json({ message: err })
        }

        await workspace.save()

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

getUserID = async (req, res) => {
    //const { account, password } = req.body
    const body = req.body
    const account = body.account
    const password = body.password

    try {
        const user = await User.findOne({ account: account})

        if (!user) {
            console.count('error: ' + 'Account not found');
            return res.status(403).json({ message: 'Account not found' })
        }

        if (user.password !== password) {
            console.count('error: ' + 'Wrong password');
            return res.status(401).json({ message: 'Wrong password' })
        }

        return res.status(200).json({ userID: user._id })
    } catch (error) {
        console.count('error: ' + error)
        return res.status(400).json({ message: error })
    }
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
    getUserID,
    getUserInfo,
    getUserName,
}