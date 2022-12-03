const db = require('../db/index')
const Story = db.story
const User = db.user

const getStory = async (req, res) => {
    try{
        const story = await Story.findByPk(req.params.storyId);
        const user = await User.findByPk(req.userId);

        if(!story || !user){
            throw new Error()
        }
        // TODO: add "if user not subcribed to author"
        if (story.isPremium && !user.isPremium){
            throw new Error()
        }
        res.send(story)
    }
    catch(err){
        res.status(404).send()
    }
}

const updateStory = async (req, res) => {
    try{
        const story = await Story.findByPk(req.params.storyId);
        const user = await User.findByPk(req.userId);

        if(!story || !user){
            throw new Error()
        }
        if (story.author_id != user.id){
            throw new Error()
        }
        res.send(story)
    }
    catch(err){
        res.status(404).send()
    }
}


module.exports = {
    getStory,
    updateStory
}