/**
 * Created by Connor on 12/3/2015.
 */
Meteor.publish('portfolioStocks', function (params) {
    return Stocks.find({symbol: {$in: params.portfolio}})
});

Meteor.publish('searchStocks', function (params) {
    var searchKey = params.searchKey.toUpperCase();
    var searchRegex = '^'+searchKey+'.*';
    return Stocks.find({symbol: {$regex: searchRegex}}, {limit: 5})
});

Meteor.publish('stockBySymbol', function (params) {
    return Stocks.find({symbol: params.symbol})
});