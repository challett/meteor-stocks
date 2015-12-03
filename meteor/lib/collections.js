/**
 * Created by Connor on 11/26/2015.
 */
//var results = Papa.parse('/symbols.csv', {
//    download: true,
//    header: true,
//    complete: function(results) {
//        console.log(results);
//        lodash.forEach(results.data, function (value){
//            Stocks.upsert({symbol: value.symbol},{$set:{symbol: value.symbol}});
//        });
//    }
//});
Stocks = new Meteor.Collection('stocks');

