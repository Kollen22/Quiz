const mongoose = require('mongoose');
const fs = require('fs');
const aws = require('aws-sdk');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3();

const Quiz = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    alternatives:{
        type: Array,
        required: true,
    },
    answer:{
        type: Number,
        required: true,
    },
    url: String,
    key: String

})

Quiz.pre('save', function(){
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});

Quiz.pre('remove', function(){
    if(process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject({
            Bucket: 'projetoquiz',
            Key: this.key,
        }).promise();
    }else{
        return promisify(fs.unlink)(path.resolve(__dirname, "..", "uploads", this.key));
    }
})

const Question = mongoose.model('Question', Quiz);
module.exports = Question;