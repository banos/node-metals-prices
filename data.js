//TODO make this safe and abstract the data
const symbol_map = {
    "XAG": "silver",
    "XAU": "gold",
    "XPL": "platinum",
    "XPD": "palladium",
  }
  // "XR": "rhodium",

var data = { 
    "title": "commodity prices", 
    "prices": {
        "gold": {
            "price": "x",
            "timestamp": "19700101000000",
            "unit": "oz",
        },
        "silver": {
            "price": "x",
            "timestamp": "19700101000000",
            "unit": "oz",
        },
        "platinum": {
            "price": "x",
            "timestamp": "19700101000000",
            "unit": "oz",
        },
        "palladium": {
            "price": "x",
            "timestamp": "19700101000000",
            "unit": "oz",
        },
    }
};

module.exports = {data, symbol_map};