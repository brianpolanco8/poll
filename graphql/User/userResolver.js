const AWS = require('aws-sdk')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const params = {
    Bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
    CreateBucketConfiguration: {
        LocationConstraint: `${process.env.AWS_S3_BUCKET_REGION}`
    }
}

module.exports = {
    editUser: async (parent, { userInput }, { req }, info) => {

    }
}