module.exports = (req, res, next) => {
    let userPassLength = req.body.password.length >= 8
    

    if(userPassLength){
        next();
    } else {
        res.status(400).json({
            error: new error('8 caractères minimum')
        });
    }
}