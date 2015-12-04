/**
 * Created by Connor on 12/3/2015.
 */
Meteor.publish('portfolioStocks', function (params) {
    return Stocks.find({symbol: {$in: params.portfolio}})
});