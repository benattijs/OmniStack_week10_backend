const axios = require("axios");
const Dev = require("../models/dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {

    async index(req, res) {
        console.log(req.query);
        //const devs = await Dev.find();
        const {latitude, longitude, techs} = req.query;
        
        const techsArrays = parseStringAsArray(techs);

        const Devs = await Dev.find({
            techs: {
                $in: techsArrays,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude,latitude],
                    },
                    $maxDistance: 10000,
                }
            }
        })

        

        return res.json(Devs);
    }
}