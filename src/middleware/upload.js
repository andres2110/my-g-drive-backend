const multer = require("multer");
const util = require("util");
const fs = require("fs");
const {
  BASE_DIRECTORY,
  MAX_DIRECTORIES,
  ERROR_MAX_NUMBER,
  ERROR_NOT_DIRECTORY_NAME,
  MAX_LENGTH_NAME,
  ERROR_ILLEGAL_PATH,
  LEGAL_PATH,
} = require("../constants");

const _fnVerifyPath = (sPath) => {
  //Verify if the path is valid for create
  let bMaxDirectories = sPath.split("/").length > MAX_DIRECTORIES;
  let bNotDirectoryName = sPath.split(".").length > 1;
  let bNameIsLonger = sPath.length > MAX_LENGTH_NAME;
  let oReturn = {
    code:LEGAL_PATH,
    error: null
  }
  //Only can create 5 directory in one request
  if (bMaxDirectories) {
    oReturn.code = ERROR_MAX_NUMBER,
    oReturn.error = new Error(`Error: The max number of directories to create is ${MAX_DIRECTORIES}`)
    return oReturn;
  }
  //Only can create 5 directory
  if (bNotDirectoryName) {
    oReturn.code = ERROR_NOT_DIRECTORY_NAME,
    oReturn.error = new Error(`Error: The name contains '.' `)
    return oReturn;
  }
  //Only can create 5 directory
  if (bNameIsLonger) {
    oReturn.code = ERROR_ILLEGAL_PATH,
    oReturn.error = new Error(`Error: The lenght of the name is longer`)
    return oReturn;
  }
  //If the path is accepted
  return oReturn;
};

const oStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let sPath = req.body.path;
    let oVerifyPath = _fnVerifyPath(sPath);
    if (oVerifyPath.code !== LEGAL_PATH) {
      //If the path is not valid
      cb(oVerifyPath.error, "");
      return;
    }
    //Join to the new path and create the new path
    let sPathFull = `${BASE_DIRECTORY}/${sPath}`;
    fs.mkdirSync(sPathFull, { recursive: true });
    cb(null, sPathFull);
  },
  filename: (req, file, cb) => {
    let sFilename = file.originalname;
    let sExtension = sFilename.split(".")[1];//TODO: verify if the ext is .jpeg .png
    if (req.body.filename !== undefined) {
      sFilename = `${req.body.filename}_${req.files.length}.${sExtension}`;
    }
    cb(null, sFilename);
  },
});

//file means the fieldname on the request
let fnUploadFile = multer({ storage: oStorage }).array("files_up");

let uploadFileMiddleware = util.promisify(fnUploadFile);
module.exports = uploadFileMiddleware;
