const User = require('../Models/User.js')
const bcrypt = require('bcrypt')
const { badRequest, ok, serverError, noContent } = require('http-server-res')
const jwt = require('jsonwebtoken')
const config = require('../config/config.json')

module.exports = {
    async create(req, res) {
        try {
            const { email, password, name } = req.body
            console.log(req.body)
            if (!email || !password || !name) return badRequest(res, "Campo em branco")

            if (await User.findOne({ email })) return badRequest(res, "Email em uso")

            req.body.password = await bcrypt.hash(password, 10)

            const user = await User.create(req.body)
            user.password = undefined

            return ok(res, user)
        } catch (error) {
            console.log(error.message)
            return serverError(res, 'Server error')
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body
            if (!email || !password) return badRequest(res, "Campo em branco")

            const user = await User.findOne({ email }).select('+password');

            if (!user) return badRequest(res, "User not found")

            if (!await bcrypt.compare(password, user.password)) return badRequest(res, "Invalid password")

            user.password = undefined;

            //token
            const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400, })

            return ok(res, { user, token })
        } catch (error) {
            console.log(error.message)
            return serverError(res, 'Server error')
        }
    },

    async read(req, res) {
        try {
            const user = await User.findById(req.userId)

            return ok(res, user)
        } catch (error) {
            console.log(error.message)
            return serverError(res, 'Server error')
        }
    },


    async deleted(req, res) {
        try {
            await User.findByIdAndDelete(req.userId)

            return noContent(res, 'Deletado com sucesso!!')
        } catch (error) {
            console.log(error.message)
            return serverError(res, 'Server error')
        }
    },

    async edit(req, res) {
        try {
            const lastUser = await User.findById(req.userId)

            const { name, email, password, favoriteTrainning, favoriteVideo } = req.body

            if (name) {
                lastUser.name = name
            }
            if (email) {
                if (await User.findOne({ email })) return badRequest(res, "Email em uso")
                lastUser.email = email
            }
            if (password) {                
                lastUser.password = await bcrypt.hash(password, 10)
            }
            if (favoriteTrainning) {                
                if (favoriteTrainning != "comum" && favoriteTrainning != "pushAndPull" && favoriteTrainning != "homeFit" ){
                    return badRequest(res, "Este treino não existe!")
                }
                lastUser.favoriteTrainning.push(favoriteTrainning)
            }
            if (favoriteVideo) {                
                if (favoriteVideo != "comum" && favoriteVideo != "pushAndPull" && favoriteVideo != "homeFit" ){
                    return badRequest(res, "Este treino não existe!")
                }
                lastUser.favoriteVideo.push(favoriteVideo)
            }

            await lastUser.save()
            const user = await User.findById(req.userId)
            return ok(res, user)

        } catch (error) {
            console.log(error.message)
            return serverError(res, 'Server error')
        }
    },


}