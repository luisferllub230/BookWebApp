const  getHome =  (req, res, next) => {
    res.render('index',{
        title: 'Home',
        activeHome: true
    });
}



export {getHome};