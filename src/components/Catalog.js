import $ from 'jquery';

var settings = {
	"url": "https://svcs.ebay.com/services/search/FindingService/v1?keywords=iphone 15",
	"method": "POST",
	"timeout": 0,
	"headers": {
		"X-EBAY-SOA-SECURITY-APPNAME": "EthanCof-Team04We-PRD-66deb8e82-133a021b",
		"X-EBAY-SOA-OPERATION-NAME": "findItemsAdvanced",
		"x-ebay-soa-response-data-format": "JSON",
		"x-ebay-soa-request-data-format": "JSON",
		"Access-Control-Allow-Origin": "*/*",
		"Content-Type": "application/json"
	},
	"data": JSON.stringify({
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
	}),
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

const Catalog = () => (
	<div className='catalog'>
	<h1>Driver Reward Catalog</h1>
	<p>Call your sponsor for more details at 1800-123-5555</p>
	</div>
);

export default Catalog;
