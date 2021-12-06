const Sauce = require('../models/sauce')
const fs = require('fs')

exports.createSauce = (req, res) => {
    const sauceObjet = JSON.parse(req.body.sauce)
    delete sauceObjet._id
    const sauce = new Sauce({
        ...sauceObjet,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    console.log(sauce)
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }))
}

exports.likeAndDislike = (req, res) => {
    // récupère l'user id
    let userId = req.body.userId
    // récupère sauce id
    let sauceId = req.params.id
    // récupère 'like' dans le corps de requête
    let like = req.body.like

    // si l'utilisateur aime la sauce incrémente le nombre de likes
    if (like === 1) {
        Sauce.updateOne(
            //push de l'user id et du like dans un tableau
            { _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } }
        )
            .then(() => res.status(200).json({ message: 'like added' }))
            .catch((error) => res.status(400).json({ error }))
    }

    // si l'utilisateur n'aime pas la sauce incrémente le nombre de dislikes
    if (like === -1) {
        Sauce.updateOne(
            // push de l'user id et du dilike dans un tableau
            { _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
        )
            .then(() => res.status(200).json({ message: 'diskike added' }))
            .catch((error) => res.status(400).json({ error }))
    }

    // Retrait du like dislike de l'utilisateur
    if (like === 0) {
        Sauce.findOne({
            _id: sauceId,
        })
            .then((sauce) => {
                // retire le like si l'utilisateur à déjà like la sauce
                if (sauce.usersLiked.includes(userId)) {
                    Sauce.updateOne(
                        //pull de l'user id et du like du tableau 
                        { _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
                    )
                        .then(() => res.status(200).json({ message: 'like removed' }))
                        .catch((error) => res.status(400).json({ error }))
                }
                // retire le dislike si l'utilisateur à déjà dislike la sauce
                if (sauce.usersDisliked.includes(userId)) {
                    Sauce.updateOne(
                //pull de l'user id et du dislike du tableau 
                        { _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
                    )
                        .then(() => res.status(200).json({ message: 'dislike removed' }))
                        .catch((error) => res.status(400).json({ error }))
                }
            })
            .catch((error) => res.status(400).json({ error }))
    }
}

exports.modifySauce = (req, res) => {
    const sauceObjet = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

        } : { ...req.body }
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObjet, _id: req.params.id })
        .then(() => res.status(201).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }))
            })
        })
        .catch(error => res.status(500).json({ error }))
}

exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))
}

exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
}

