const {Router} = require('express');
DevController = require("./Controller/DevController")
DevSearchController = require("./Controller/DevSearchController")

routes = Router();




routes.get('/devs', DevController.index)

routes.get('/devSearch/', DevSearchController.index)

routes.post('/devs', DevController.store)

routes.put('/devs', DevController.update)

routes.delete('/devs', DevController.destroy)

module.exports = routes;