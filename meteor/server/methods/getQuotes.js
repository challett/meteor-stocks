/**
 * Created by Connor on 11/26/2015.
 */
Meteor.methods({
    'getQuotes': function (params) {
        if (!lodash.isEmpty(params.symbols))
        lodash.each(YahooFinance.snapshot({symbols:params.symbols, fields:params.fields}), function (item) {
            Stocks.upsert({symbol: item.symbol}, {$set: item})
        })
    }
});