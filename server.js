const express = require('express')
const app = express()
const mongojs = require('mongojs')
const bodyparser = require('body-parser')
const session = require('express-session');
const ses = require('sess')
const cookieParser=require('cookie-parser');

app.set("view engine","ejs"); // setting view engine to ejs
app.use(express.static("public")); // using static(public) folder
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

// database setup
const cs="mongodb://balamahesh:balamahesh@ac-ksc2ibe-shard-00-00.5bnlukb.mongodb.net:27017,ac-ksc2ibe-shard-00-01.5bnlukb.mongodb.net:27017,ac-ksc2ibe-shard-00-02.5bnlukb.mongodb.net:27017/dbs?ssl=true&replicaSet=atlas-5kgaa4-shard-0&authSource=admin&retryWrites=true&w=majority"
const db=mongojs(cs,["users"])

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
    session({
      key: "user_sid", // cookies id 
      secret: "ssshhhhh",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 1000 * 6000 * 6000 * 1000000, // cookie expiration time in seconds
      },
    })
);
var sess; // declaring session variable

app.get('/', (req,res) => {
    res.sendFile(__dirname+"/public/home.html");
})

app.get('/login', (req,res) => {
    res.sendFile(__dirname+"/public/login.html");
})

app.get('/new', (req,res) => {
    res.sendFile(__dirname+"/public/newjourney.html");
})

app.get('/successful', (req,res) => {
    var data = {
		Name:req.query.name,
		password:req.query.pswd,
		email:req.query.mail
	}
    db.users.insert(data,function(err,docs){
    	if(err){
    		res.send('Something went wrong')
    	}
    	else{
    		res.sendFile(__dirname+"/public/login.html");
    	}
    })
})

app.get('/ulogin', (req,res) => {
    var dat = {
        email:req.query.loginemail,
        password:req.query.loginpswd
    }

    db.users.find(dat,(err,docs) => {
        if(docs.length==0){
			res.send('no user found')
		}
		else{
			res.render("profile",{data:docs});
		}
    })
})

app.get('/newticket',(req,res) => {
    sess = req.session
    var ins = {
        from:req.query.from,
        to:req.query.to,
        departure:req.query.departure,
        seat:req.query.seat,
        number:req.query.number
    }
    db.journeys.insert(ins, (err,docs) => {
        if(err){
    		res.send('Something went wrong')
    	}
    	else{
    		res.sendFile(__dirname+"/public/payment.html");
    	}
    })
})
app.listen(8000,(req,res)=>{
    console.log('running')
})