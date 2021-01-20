const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const request = require("request");
const { response } = require('express');
const filterRate=require('./util/filterRates')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send(
      "use url in this format /api/rates?baseCurrency=aud&c1=gbp&c2=pln&c3=eur"
    );
})
 app.get("/api/rates",  (req, res) => {
    const fromCurrency = req.query.baseCurrency.toUpperCase();
    const selectedCurrencyOne = req.query.c1.toUpperCase();
        const selectedCurrencyTwo = req.query.c2.toUpperCase();
    const selectedCurrencyThree = req.query.c3.toUpperCase();

        const url = `https://api.exchangeratesapi.io/latest?base=${fromCurrency}`;
    
    try {
        if (!fromCurrency || fromCurrency.length < 3) {
          res.status(400).send("enter a proper symbols")
      }
       request({ url, json: true }, (err, { body }) => {
          if (err) {
            res.status(400).send(err)
        }
      const rates = body.rates;
      const selectedCurrencies = [selectedCurrencyOne, selectedCurrencyTwo, selectedCurrencyThree];
        const newRates = filterRate(selectedCurrencies, rates);
       
      const data = {
        base: body.base,
        date: body.date,
        rates: newRates,
      };

      res.send(data);
    });
  } catch (e) {
res.send(err)  }
});




app.listen(4000,()=>{console.log("listen @ 4000")})
