const express = require("express");
const path = require("path");
const multer = require("multer");

const PORT = 3000;
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads"); //null is placehoplder for any error
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }); //folder where all uploads will be placed
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("uploadFile"), (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});
