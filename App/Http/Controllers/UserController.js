class UserController {

    index() {
        res.send('index');
    }

    show(req, res) {
        setTimeout(() => {
            res.send({
                name: "keroles"
            });
        }, 2000)

    }

    edit(req, res) {
        res.send('edit');
    }

    update(req, res) {
        res.send('update');
    }

    destroy(req, res) {
        res.send('destroy');

    }

}

module.exports = UserController;