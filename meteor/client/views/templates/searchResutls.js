/**
 * Created by Connor on 12/6/2015.
 */
Template.searchResults.rendered = function () {
    Meteor.call('getQuotes', {symbols:  Stocks.find().map( function (object) {
        return object.symbol
    }), fields: Fields})
};

Template.searchResults.helpers({
    'searchResult': function () {
        var searchKey = Session.get('searchKey').toUpperCase();
        var searchRegex = '^'+searchKey+'.*';
        return Stocks.find({symbol: {$regex: searchRegex}, lastTradePriceOnly: {$ne: null}}, {limit: 5})
    },
    searched: function () {
        return Session.get('searchKey')
    },
    price: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock && stock.lastTradePriceOnly && stock.lastTradePriceOnly.toFixed(2);
    },
    change: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock && stock.change && stock.change.toFixed(2);
    },
    changeInPercent: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return (stock && stock.changeInPercent && stock.changeInPercent.toFixed(2)) || 0;
    },
    name: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock && stock.name;
    },
    open: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock && stock.open;
    },
    daysLow: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock && stock.daysLow && stock.daysLow.toFixed(2);
    },
    daysHigh: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock && stock.daysHigh && stock.daysHigh.toFixed(2);
    },
    stockExchange: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock && stock.stockExchange;
    },
    earningsPerShare: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock && stock.earningsPerShare && stock.earningsPerShare.toFixed(2);
    },
    peRatio: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock && stock.peRatio && stock.peRatio.toFixed(2);
    },
    changeStyle: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        if (stock && stock.change) {
            var change = stock.change;
            if (change > 0) {
                return 'button-balanced'
            } else if (change < 0) {
                return 'button-assertive'
            } else {
                return "button-calm"
            }
        }
    },
    changeColor: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        if (stock) {
            var change = stock.change;
            if (change > 0) {
                return '#2ec76f'
            } else if (change < 0) {
                return '#d22d2d'
            } else {
                return "#3f5973"
            }
        }
    },
    showPrice: function () {
        return showElement('lastTradePriceOnly')
    },
    showChange: function () {
        return showElement('change')
    },
    showOpen: function () {
        return showElement('open')
    },
    showChangeInPercent: function () {
        return showElement('changeInPercent')
    },
    showDaysLow: function () {
        return showElement('daysLow')
    },
    showDaysHigh: function () {
        return showElement('daysHigh')
    },
});

function showElement (value) {
    return Preferences.findOne({name: value}).showPortfolio;
}