// console.log(`Mongooser connection ${process.env.SERVER_MONGOOSE_URL}`)
const mongoose = require('mongoose');
mongoose.connect(process.env.SERVER_MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database Connected")
    })
    .catch((error) => (console.log(error)))