const mongoose = require('mongodb');

const budgetSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        
    },
       data:[{
        title:{
            type: String,
            
        },
        color:{
            type: String,
         

        },
        budget:{
            type: Number
        },


       }]
           
}, {collection: 'pbudget'});


module.exports = mongoose.model('pbudget', budgetSchema);
