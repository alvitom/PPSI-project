const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const path = require("path");

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucketName = process.env.BUCKET_NAME;

const uploadFile = async (filePath, destFileName) => {
  try {
    const generationMatchPrecondition = 0;

    const options = {
      destination: destFileName,
      preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
    };

    await storage.bucket(bucketName).upload(filePath, options);

    fs.unlinkSync(path.join(__dirname.replace("src", "").replace("utils", ""), filePath));

    return `https://storage.googleapis.com/${bucketName}/${destFileName}`;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { uploadFile };
