const mongoose = require('mongoose')


module.exports = async function(){
    try {

        await mongoose.connect('mongodb+srv://rightfittcc:rightfittcc@cluster0.cptjl.mongodb.net/rightfit?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log('mongodb connect')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }    
}