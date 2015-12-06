/**
 * Created by Connor on 12/3/2015.
 */
Meteor.publish('portfolioStocks', function (params) {
    return Stocks.find({symbol: {$in: params.portfolio}})
});

Meteor.publish('searchStocks', function (params) {
    var searchKey = params.searchKey.toUpperCase();
    var searchRegex = '^'+searchKey+'.*';
    return Stocks.find({$or: [{symbol: {$regex: searchRegex}}, {nameUpperCase: {$regex: searchRegex}}]}, {limit: 5, sort: {symbol: 1}})
});

Meteor.publish('stockBySymbol', function (params) {
    return Stocks.find({symbol: params.symbol})
});