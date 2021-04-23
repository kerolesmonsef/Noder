class UserController {

    index() {

    }

    show(req, res, user) {
        console.log(require.main.require('./routes/web'))
        res.send(user);
    }

    edit(user) {

    }

    update() {

    }

}

module.exports = UserController;