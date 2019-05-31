const express = require("express");
const app = express();
const stripe = require("stripe")("sk_test_aIx7sOwerYh2IIBhEkVxL9rm00w97FMzEI");
;

app.use(express.json());

app.post("/charge", async (req, res) => {
    try {
        let {amount, tokenId} = req.body;
        console.log(amount, tokenId);
        console.log(x);
        let {status} = await stripe.charges.create({
            amount,
            currency: "usd",
            description: "An example charge",
            source: 'tok_chargeDeclinedInsufficientFunds'
        });

        res.json({status});
    } catch (err) {
        res.status(500).end();
        res.status(err).end();
        console.log(err)
    }
});

app.listen(9000, () => console.log("Listening on port 9000", x));