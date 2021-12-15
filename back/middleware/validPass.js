module.exports = (req, res, next) => {
    let userPassLength = req.body.password.length 
    

    if(userPassLength > 8){
        next();
    } else {
        res.status(400).json({
            error: new error('8 caractères minimum')
        });
    }
}