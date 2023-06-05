const File = require('../models/file')
const Workspace = require('../models/workspace')

createFile = async (req, res) => { 
    const body = req.body
    // const body = {
    //     file_name: 'testFile2',
    //     user_id: '64789cd3b0b2800013401d7d',
    //     file_tags: ['tag4', 'tag2', 'tag5'], 
    //     workspace_id: '64789cd3b0b2800013401d7f'
    //   };
      
    const file_format = {  name: body.file_name,
                           tag: body.file_tags,
                           owner: body.user_id,
                           data: ''
                    }
    

    if (!body) {
        console.count('error: ' + 'Wrong format')
        return res.status(400).json({
            message: 'Please enter the correct format'
        })
    }

    const file = new File(file_format)

    if (!file) {
        console.count('error: ' + err)
        return res.status(400).json({ message: err })
    }

    try {

        // find the workspace which file was created
        const workspace = await Workspace.findOne({ _id: body.workspace_id }).exec()
        if (!workspace) {
            console.count('error: ' + ' Workspace not found');
            return res.status(403).json({ message: ' Workspace not found' })
        }

        //  add file id to the files in a workspace
        workspace.files.push(file._id)
        
        for (const tag of body.file_tags) {
            const workspaceTag = workspace.tags.find(t => t.tag === tag)
            if (workspaceTag) {
                workspaceTag.number += 1
            } else {
                workspace.tags.push({ tag, number: 1 })
            }
        }

        await workspace.save()

        await file.save()
        return res.status(201).json({
            message: 'success',
          })
        
      } catch (error) {
        console.count('error: ' + error)
        return res.status(400).json({ message: 'failed' })
    }
}
deleteFile = async (req, res) => {
    // const file_id = await File.findOne({ _id: req.params.id })
    //const file_id = '64789ff2f5a262001a8fb365'

    try {
        const file = await File.findOne({ _id: req.params.id });

        if (!file) {
            console.count('error: ' + 'File not found');
            return res.status(403).json({ message: 'failed' });
        }

        //delete the file id from the File
        await File.deleteOne({ _id: req.params.id });

        
        const workspace = await Workspace.findOne({ files: req.params.id });
        if (workspace) {
            //delete the file id from Workspace
            await Workspace.updateOne({ _id: workspace._id }, { $pull: { files: req.params.id } });
            
            //delete tag from Workspace
            for (const tag of file.tag) {
                const workspaceTag = workspace.tags.find((t) => t.tag === tag);
                if (workspaceTag) {
                    // Decrease the tag count
                    workspaceTag.number--;

                    // Remove the tag if count reaches zero
                    if (workspaceTag.number === 0) {
                        workspace.tags = workspace.tags.filter((t) => t.tag !== tag);
                    }
                }
            }

            await workspace.save();
        }

        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.count('error: ' + error);
        return res.status(400).json({ message: 'failed' });
    }
};

getFileInfo = async (req, res) => {
    const file_id = await File.findOne({ _id: req.params.id })
    //const file_id = '6478a725732d8d00131eb1cf'
    try {
        const file = await File.findOne({ _id: file_id })

        if (!file ) {
            console.count('error: ' + 'File not found');
            return res.status(403).json({ data: '' })
        }

        return res.status(200).json({
            data: {
                fileOwner: file.owner,
                fileName: file.name,
                fileTag: file.tag,
            }
        });
        
    } catch (error) {
        console.count('error: ' + error)
        return res.status(400).json({ data: '' })
    }
}

getFile = async (req, res) => {
    // const file_id = await File.findOne({ _id: req.params.id })
    //const file_id = '6478a725732d8d00131eb1cf'
    try {
        const file = await File.findOne({ _id: req.params.id })

        if (!file ) {
            console.count('error: ' + 'File not found');
            return res.status(403).json({ data: '' })
        }

        return res.status(200).json({ data: file })
    } catch (error) {
        console.count('error: ' + error)
        return res.status(400).json({ data: '' })
    }
}

updateFile = async (req, res) => {
    const body = req.body;
    const file_id = body.file_id;
    const file_name = body.file_name;
    const file_data = body.file_data;
    const file_history = body.file_history;
    // const file_id = '6478a725732d8d00131eb1cf'
    // const file_data = "updateFile test"
    // const file_history = [
    //     {
    //       user_id: '64789cd3b0b2800013401d7d',
    //       time: '2023-06-01T03:00:00Z',
    //       plain_text: 'First update',
    //     }]
    try {
        const file = await File.findOne({ _id: file_id });
        if (!file) {
            console.count('error: ' + 'File not found');
            return res.status(404).json({ data: '' });
        }

        // update file name
        file.name = file_name;
        await file.save();
        
        // update file data
        file.data = file_data;
        await file.save();

        // update file history
        file.history = file_history;
        await file.save();

        return res.status(200).json({ data: file });
    } catch (error) {
        console.count('error: ' + error);
        return res.status(500).json({ data: '' });
    }

}

updateSnapshot = async (req, res) => {
    const body = req.body;
    const file_id = body.file_id;
    const time = body.time;
    const file_data = body.file_data;
    // const file_id = '647759fc2d88cf00130e5075'
    // const file_data = "test123"
    // const time = '2023-06-01T03:13:00Z'

    try {
        const file = await File.findOne({ _id: file_id });
        if (!file) {
            console.count('error: ' + 'File not found');
            return res.status(404).json({ data: '' });
        }

        // Create a new snapshot object
        const newSnapshot = {
            plain_text: file_data,
            time: time
        };

        // Push the new snapshot to the snapshot array
        file.snapshot.push(newSnapshot);
        await file.save();

        return res.status(200).json({ data: file });
    } catch (error) {
        console.count('error: ' + error);
        return res.status(400).json({ message: 'failed' });
    }

}

updateHistory = async (req, res) => {
    const body = req.body;
    const file_id = body.file_id;
    const time = body.time;
    const file_data = body.file_data;
    const user_id = body.user_id
    // const file_id = '647898f835c43c001a0490d7'
    // const file_data = "test123"
    // const time = '2023-06-01T03:13:00Z'
    // const user_id = '6478984002b2860013515175'

    try {
        const file = await File.findOne({ _id: file_id });
        if (!file) {
            console.count('error: ' + 'File not found');
            return res.status(404).json({ data: '' });
        }

        // Create a new history object
        const newHistory= {
            user_id: user_id ,
            time: time,
            plain_text: file_data
        };

        // Push the new snapshot to the history array
        file.history.push(newHistory);
        await file.save();

        return res.status(200).json({ data: file.history });
    } catch (error) {
        console.count('error: ' + error);
        return res.status(400).json({ message: 'failed' });
    }

}


module.exports = {
    createFile,
    deleteFile,
    getFileInfo,
    getFile,
    updateFile,
    updateSnapshot,
    updateHistory,
}