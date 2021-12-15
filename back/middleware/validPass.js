module.exports = (req, res, next) => {
    const User =  JSON.parse(req.body.user)
    let userPassLength =User.password.length > 8
    

    if(userPassLength){
        next();
    } else {
        res.status(400).json({
            error: new error('8 caractères minimum')
        });
    }
}