import express, { urlencoded } from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
var count = 0;
let uploadedBlogs = [];



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log("all Blogs : " + uploadedBlogs);
    res.render("index.ejs", { uploadedBlogs });

});
app.get("/addpost", (req, res) => {
    res.render("addpost.ejs");
});

app.post("/post", (req, res) => {
    const newBlog = { topic: req.body["topic"], article: req.body["article"], author: req.body["author"] };
    if (newBlog.topic === "" || newBlog.article === "" || newBlog.author === "") {
        console.log("Cant be Empty");
    }
    else {
        uploadedBlogs.push(newBlog);
        console.log("all blogs after posting " + uploadedBlogs);
    }
    res.render("index.ejs", { uploadedBlogs });
});


app.get("/delete/:index", (req, res) => {
    const index = parseInt(req.params.index);
    uploadedBlogs.splice(index, 1);
    console.log("Delete Succesfully.")
    res.redirect("/");


});


app.post("/update/:index", (req, res) => {
    const index = parseInt(req.params.index);
    const blogToUpdate = uploadedBlogs.at(index);
    console.log(blogToUpdate);

});


app.listen(port, () => {
    console.log("Server is listening at " + port);
});