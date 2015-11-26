/**
 * Created by Connor on 11/26/2015.
 */
Meteor.methods({
    'getQuotes': function (params) {
        lodash.each(YahooFinance.snapshot({symbols:params.symbols, fields:params.fields}), function (item) {
            Stocks.upsert({symbol: item.symbol}, item)
        })
    }
});