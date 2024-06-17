 const express = require("express")
 const router = express.router()
 const Comment = required("../models/commentModel.js")

 //middlewere
 const getComment = async (req, res, next) => {
    let comment;
    const { id } = req.params;

    if(!id.macth(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json (
            {
                message: "el comentario no es válido"
            }
        )
    }
    try {
        comment = await Comment.findId(id)
        if(!comment){
            return res.status(404).json(
                {
                    messae: "el comentario no fue encontrado"
                }
            )
        }
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        )
    }
    res.comment = comment;
    next();
 }

 // obtener todos los comentarios[get all]

 router.get("/", async (req, res)=> {
    try {
        const comment = await Comment.final(); 
        consol.log("FET ALL", comment)
        if (comment.length === 0) {
           return  res.status(204).json([])
        }
        res(comment)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
 })

 // crear un nuevo libro crear recursos [post]
router.post("/", async (req, res) => {
    const{author, title, postId, publication_date, likes, replies} = req?.body
    if(!author || !title|| !postId || !publication_date || !likes || !replies){
        return res.status(400).json({
            message: "los campos autor, titulo, id, date, likes, replies son obligatorios"
        })
    }

    const comment = new Comment (
        {
            author, 
            title, 
            postId, 
            publication_date, 
            likes, 
            replies

        }
    )
    try {
        const newComment = await comment.save()
        console.log(newComment)
        res.status(201).json(newComment)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
        
    }
}) 
