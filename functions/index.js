const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("STRIPE_PUBLIC_KEY");

// API


// App Config
const app = express();


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}


// Middleware
// app.use(cors({ origin: true }));

app.use(express.json());


// API Routes
app.get("/", (req, res) => res.status(200).send("Hello World!"));


app.post("/payments/create", cors(), async (req, res) => {

    try {
        const total = req.query.total;

        console.log("Payment Request Received BOOMMMM!!! - for this amount >>>", total);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,  // subunits of the currency
            currency: "usd",
        });
        res.status(201).send({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
});


app.get("*", (req, res) => {
    res.status(404)
        .send("404, Not Found");
});





// Listen Command
exports.api = functions.https.onRequest(app);


// http://localhost:5001/clone-e8984/us-central1/api



