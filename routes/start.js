var express = require('express');
var router = express.Router();
var data = require('../data.js');
const fetch = require('node-fetch');

async function _get_price(symbol) {
    const url = "https://www.gold.co.uk/";
    var options = {
      'muteHttpExceptions': true,
      }
    var value = NaN;

    console.log("fetching price for " + symbol + "...");
    let res = await fetch(url, options);
    let html = await res.text();

    //TODO get all prices in one query
    switch(symbol) {
      case "XAU":
        var regExp = new RegExp("title=\"Gold price per ounce\">\n&pound;([0-9,.]+)", "gi");
        break;
      case "XAG":
        var regExp = new RegExp("title=\"Silver price per ounce\">\n&pound;([0-9,.]+)", "gi");
        break;
      case "PL":
      case "XPL":
      case "XPT":
        var regExp = new RegExp("title=\"Platinum price per ounce\">\n&pound;([0-9,.]+)", "gi");
        break;
      case "PA":
      case "XPD":
        var regExp = new RegExp("title=\"Palladium price per ounce\">\n&pound;([0-9,.]+)", "gi");
        break;
    }
    value = regExp.exec(html)[1];
    value = parseFloat(value.replace(/[^0-9.-]+/g,""));  
    // console.log("return value = " + value);
    return value;
}

//todo
async function _get_gold_price(){}
async function _get_silver_price(){}
async function _get_platinum_price(){}
async function _get_palladium_price(){}
async function _get_copper_price(){}
async function _get_rhodium_price(){}

function _get_prices() {
  console.log("_get_prices...")
  let data_map = data.symbol_map;
  let prices = data.data.prices;
  for (const k in data_map) {
    let v = data_map[k];
    console.log("getting price for " + k + ":" + v)
    _get_price(k)
    .then ((p) => {
      console.log(v + " price = " + p);
      prices[v].price=p.toFixed(2);
      prices[v].timestamp=Date.now();
    })
    .catch(err => {
      value = NaN;
      console.log("Error " + err);
      throw(err)
    })
  }
}


router.get('/', function(req, res, next) {
  if (!("intervalID" in data)) {
    /* TODO turn into worker thread */
    let intervalID = setInterval(function() {
      _get_prices()
    }, 10000); 
    data['intervalID'] = intervalID
  }
  res.send('start fetching prices');  
});

module.exports = router;
