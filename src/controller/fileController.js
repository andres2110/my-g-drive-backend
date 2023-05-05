const { BASE_DIRECTORY } = require("../constants");
const uploadFile = require("../middleware/upload");
const fs = require("fs");

const getListFiles = (req, res) => {
  //GET: request to get all directorys
  let aFiles = _fnReadDirRecursive(BASE_DIRECTORY);
  res.status(200).send(aFiles);
};

const upload = async (req, res) => {
  //POST: request to upload files
  try {
    await uploadFile(req, res);
    if (req.files === undefined) {
      res.status(500).send({ message: "Sorry something went wrong" });
    }
    res.status(200).send({ message: "Uploading successfull" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const _fnReadDirRecursive = (sPath) => {
  //Method: to get the exist directorys in determinate path
  let aFiles = [];
  let aContent = fs.readdirSync(sPath, {
    withFileTypes: true,
  });
  let iNumFiles = aContent.length;
  aContent.forEach((oFile, index) => {
    let isDirectory = oFile.isDirectory();
    let aNodes = {};
    if (isDirectory) {
      aNodes = _fnReadDirRecursive(`${sPath}/${oFile.name}`);
      aFiles.push({
        name: oFile.name,
        isDirectory: isDirectory,
        nodes: aNodes,
      });
    }
  });
  return { directories: aFiles, numFiles: iNumFiles - aFiles.length };
};

module.exports = {
  getListFiles,
  upload,
};
