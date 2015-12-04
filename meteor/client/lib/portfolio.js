/**
 * Created by Connor on 12/3/2015.
 */

Portfolio = new Ground.Collection('portfolio', {connection: null});

Tracker.autorun(function () {
    Meteor.subscribe('portfolioStocks', {portfolio: Portfolio.find({}).map(function (item) {return item.symbol})});
});

