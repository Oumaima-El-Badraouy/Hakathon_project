const mongoose = require('mongoose');

const contactSchema =  new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
       
        message: {
            type: String,
            required: true,
            min: 30,
            max: 300
        }
    },
    { timestamps: true }
)

const contact = mongoose.model('Contact', contactSchema);

module.exports = contact;