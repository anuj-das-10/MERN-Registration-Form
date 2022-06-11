const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const app = express();
const port = process.env.PORT || 3000;
require("./db/connect");

const Registers = require("./models/register");

const static_path = path.join(__dirname, "../public/");
const views_path = path.join(__dirname, "../templates/views/");
const partials_path = path.join(__dirname, "../templates/partials/");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",views_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res) => {
    res.render("index")
});

app.get("/register",(req,res) => {
    res.render("register")
});
app.get("/login",(req,res) => {
    res.render("login")
});
app.get("/welcome",(req,res) => {
    res.render("welcome")
});
app.get("/home",(req,res) => {
    res.render("home")
});


// Create a new user in the Database  (FOR REGISTRATION) ----------------------------------------------->
app.post("/register", async (req,res) => {
    try{
        const password = req.body.password;
        const confirm__password = req.body.confirm__password;
           
        // Check for passwords (Re-confirmation)

            if(password === confirm__password) {
                const customerDetails = new Registers({
                    fullName:   req.body.fullName,
                    email:      req.body.email,
                    mobile_no:  req.body.mobile_no,
                    address:    req.body.address,
                    password:   password,
                    confirm__password: confirm__password
                })
                const registered__success =  await customerDetails.save();
                res.status(201).render("welcome")
            }
            else {
                    res.send("Passwords confirmation failed!");
            }
        }
    catch(error) {
        res.status(400).send("Email already taken!");
    }
})



// LOG IN LOGIC ------------------------------------------------------------------------------------->
app.post("/login", async (req,res) => {
    try {
        const input_email = req.body.email;
        const input_password = req.body.password;
        const user_details = await Registers.findOne({email: input_email});

        const hashMatching = await bcrypt.compare(input_password, user_details.password);

        if(hashMatching) {
            res.status(201).render("home")
        }
        else {
            res.send("Incorrect Password!")
        }   
    } catch (error) {
        res.status(400).send("Credentials doesn't match. Please check email and password carefully!");
    }
})





app.listen(port, () => {
    console.log(`Server is running at PORT:  ${port}`);
})