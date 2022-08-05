const get404 = (req, res, next) => {
    res.status(404).render('./errors/404', {
        title: '404',
        message: 'Sorry, the page you are looking for does not exist.',
        url: 'https://t3.ftcdn.net/jpg/01/98/86/64/240_F_198866450_Jvmn2ulqsEMUEv7Ghc52EssrruFCpgAy.jpg'
    });
}

export {get404}