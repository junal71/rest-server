
const mongoose  = require( 'mongoose' );

const dbConnection = async() => {

    try{

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //strictQuery: true
            //useCreateIndex: true,
            //useFindAndModify: false
            
        })

        await mongoose.set ('strictQuery', false);

        console.log('base de datos online')


    }catch (error) {
        console.log(error);
        throw new Error('Error en base de datos')

    }

}

module.exports = {
    dbConnection
}