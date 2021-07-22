class UserController {

    index({req, res}) {

    }

    show({req, res}) {
        res.send("koko");
        res.send("koko");
    }

    edit({req, res}) {

        res.send('edit');
    }

    update({req, res}) {
        res.send('update');
    }

    destroy({req, res}) {
        res.send('destroy');

    }

}

module.exports = UserController;