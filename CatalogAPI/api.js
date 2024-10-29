const axios = require('axios');
let data = JSON.stringify({
  "findItemsAdvancedRequest": {
    "itemFilter": [
      {
        "name": "ListingType",
        "value": "FixedPrice"
      },
      {
        "name": "Condition",
        "value": "1000"
      }
    ],
    "paginationInput": {
      "entriesPerPage": 25,
      "pageNumber": 1
    }
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://svcs.ebay.com/services/search/FindingService/v1?keywords=iphone 15',
  headers: { 
    'X-EBAY-SOA-SECURITY-APPNAME': 'EthanCof-Team04We-PRD-66deb8e82-133a021b', 
    'X-EBAY-SOA-OPERATION-NAME': 'findItemsAdvanced', 
    'x-ebay-soa-response-data-format': 'JSON', 
    'x-ebay-soa-request-data-format': 'JSON', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});


