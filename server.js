const express = require("express");
const app = express();



app.use(express.json());

app.post("/charge", async (req, res) => {
    try {
        let {amount, tokenId, stripe_key} = req.body; // params sent in with client
        const stripe = require("stripe")(stripe_key); // initializes stripe with the stripe keys passed from client
        // console.log(amount, tokenId, stripe_key);
        let {status} = await stripe.charges.create({
            amount,
            currency: "usd",
            description: "An example charge",
            source: tokenId
        });
        console.log(status);
        res.json({status});
    } catch (error) {
        // res.status(500).end();
        res.json({error}).end();
        console.log(error)
    }
});

app.listen(9000, () => console.log("Listening on port 9000"));