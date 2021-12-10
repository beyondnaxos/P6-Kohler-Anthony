module.exports = (req, res, next) => {
    const sauce =  JSON.parse(req.body.sauce)
    let nameLength =sauce.name.trim().length > 0;
    let manufacturerLength =sauce.manufacturer.trim().length > 0;
    let descriptionLength =sauce.description.trim().length > 0;
    let mainPepperLength =sauce.mainPepper.trim().length > 0;
    let imageUrlLength =sauce.imageUrl.trim().length > 0;

    if(nameLength && manufacturerLength && descriptionLength && mainPepperLength && imageUrlLength){
        next();
    } else {
        res.status(400).json({
            messsage: 'Name is required'
        });
    }
}

