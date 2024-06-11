const moongose = require ("mongoose")

const commentSchema = new moongoseSchema (
    {
        author: String,
        title: String,
        postId: String,
        publication_date: String,
        likes: String, 
        replies: String,

    }

)

module.exports = moongose-model("Comment", commentSchema)