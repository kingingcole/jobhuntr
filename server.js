const express = require("express");
const app = express();



app.use(express.json());

app.post("/charge", async (req, res) => {
    try {
        let {amount, tokenId, stripe_key, company_name} = req.body; // params sent in with client
        const stripe = require("stripe")(stripe_key); // initializes stripe with the stripe keys passed from client
        // console.log(amount, tokenId, stripe_key);
        let description = `Payment for job posting for ${company_name} on JobHuntr.io`
        let {status} = await stripe.charges.create({
            amount,
            currency: "usd",
            description,
            receipt_email: 'emeruchecole9@gmail.com',
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

app.listen(process.env.PORT || 9000, () => console.log("Listening on port 9000"));