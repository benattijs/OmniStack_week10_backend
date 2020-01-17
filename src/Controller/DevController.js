const axios = require("axios");
const Dev = require("../models/dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {

    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {


            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = apiResponse.data;

            //            const techsArrays = techs.split(',').map(tech => tech.trim());
            const techsArrays = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArrays,
                location
            })

        }
        return res.json(dev);
    },

    async update(req, res) {
        let { github_username, name, avatar_url, bio, techs, latitude, longitude } = req.body;

        const query = {
            github_username,
        };

        //let dev = await Dev.findOne(query);
        let updateDev = {}
        if (name)
            updateDev.name = name

        if (avatar_url)
            updateDev.avatar_url = avatar_url

        if (bio)
            updateDev.bio = bio



        if (latitude && longitude) {
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            updateDev.location = location
        }

        if (techs)
            updateDev.techs = parseStringAsArray(techs)



        // const updateDev = {
        //     name,
        //     avatar_url,
        //     bio,
        //     techs: parseStringAsArray(techs),
        //     location: location,

        // }

        const options = {
            new: true,
            useFindAndModify: false,
        }
        dev = await Dev.findOneAndUpdate(query, updateDev, options);

        return res.json(dev);
    },


    async destroy(req, res) {

        let { github_username } = req.body;

        const query = {
            github_username,
        };
        const options = {
            useFindAndModify: false,
        }
        const dev = await Dev.findOneAndDelete(query, options);
        return res.json(dev);
    }
}