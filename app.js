var app=require("express")();
var mongoose=require('mongoose');
var bodyParser=require("body-parser");


mongoose.connect("mongodb://localhost:27017/song",{useNewUrlParser:true});

app.use(bodyParser.urlencoded({ extended: false }))

var SongShema=new mongoose.Schema({
    name:String,
    author:String
});

var Song=mongoose.model("Song",SongShema);


app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.redirect("/home")
})
app.get("/home",(req,res)=>{
    Song.find({},(err,songs)=>{
        res.render('index',{songs:songs});
     
           
    })
})
app.get("/create",(req,res)=>{
    res.render("create");
})

app.post("/store",(req,res)=>{
    var newSong={
        name:req.body.name,
        author:req.body.author
    }
    
    Song.create(newSong,(err,newrecor)=>{
        if(err) console.log("error to save the new song");
        else {
            console.log(newrecor);
            res.redirect("/home")
        }
        
    })
})
app.get("/delete/:id",(req,res)=>{
     var idSong=req.params.id;
     Song.findByIdAndDelete(idSong,(err)=>{
         if(err) console.log("error");
         else {
             res.redirect("/home")
         }
     })
})
//the edit page
app.get('/edit/:id',(req,res)=>{
    var idSong=req.params.id;
    Song.findById(idSong,(err,editsong)=>{
        if(err) console.log("error to get the get edited");
        else {
            res.render("edit",{editsong:editsong})
        }
        
    })
    
})



app.listen(3000,()=>{
    console.log("the server working!");
    
})