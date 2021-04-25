class BookController {

    index() {
        res.send('index');
    }

    show(req, res) {
        res.send('show');
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

module.exports = BookController;