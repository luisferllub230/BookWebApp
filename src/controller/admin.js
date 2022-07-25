
const getBooks = (req, res) => {
    res.render('./admin/adminTools',{
        title: 'Books',
        activeBooks: true
    });
}

const getCategories = (req, res) => {
    res.render('./admin/adminTools',{
        title: 'Categories',
        activeCategories: true
    });
}

const getAuthor = (req, res) => {
    res.render('./admin/adminTools',{
        title: 'Author',
        activeAuthor: true
    });
}

const getEditorials = (req, res) => {
    res.render('./admin/adminTools',{
        title: 'Editorials',
        activeEditorials: true
    });
}

export {getBooks, getCategories, getAuthor, getEditorials};