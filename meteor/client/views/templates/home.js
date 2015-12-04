/**
 * Created by Connor on 10/30/2015.
 */
var portfolio = [
    {
        _id: '1',
        symbol: 'GOOG',
    },
    {
        _id: '5',
        symbol: 'AAPL',
    },
    {
        _id: '4',
        symbol: 'MSFT',
    },
    {
        _id: '3',
        symbol: 'TWTR',
    },
    {
        _id: '2',
        symbol: 'YHOO',
    },
];
Template.home.helpers({
    items: portfolio,
    price: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        var num = stock.lastTradePriceOnly;
        return num.toFixed(2);
    },
    change: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        var num = stock.change;
        return num.toFixed(2);
    },
    name: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        return stock.name;
    },
    changeStyle: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        var change = stock.change;
        if (change > 0){
            return 'button-balanced'
        } else if (change < 0) {
            return 'button-assertive'
        } else {
            return "button-calm"
        }
    },
    changeColor: function () {
        var stock = Stocks.findOne({symbol: this.symbol});
        var change = stock.change;
        if (change > 0){
            return '#2ec76f'
        } else if (change < 0) {
            return '#d22d2d'
        } else {
            return "#3f5973"
        }
    }

});

Template.home.rendered = function () {
    Meteor.call('getQuotes', {symbols: ['GOOG','AAPL','MSFT','TWTR','YHOO'], fields: Fields}, function (err, res) {

    });
};