class AdminController {
    index(req, res) {
        res.send(req.params)
    }
}
module.exports  = AdminController;