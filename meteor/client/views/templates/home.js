/**
 * Created by Connor on 10/30/2015.
 */

Template.home.helpers({
    portfolioStock: function () {
        var searchKey = Session.get('searchKey').toUpperCase();
        var searchRegex = '^'+searchKey+'.*';
        var portfolioSymbols = Portfolio.find().map(function (stock) {
            return stock.symbol
        });
        return Stocks.find({$and: [
            {symbol: {$in: portfolioSymbols}},
            {symbol: {$regex: searchRegex}}
        ]})
    },
    searched: function () {
        return Session.get('searchKey')
    },
    stockNumber: function (key) {
        return this && this[key] && this[key].toFixed(2)
    },
    changeStyle: function () {
        var stock = this;
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
        var stock = this;
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
    showElement: function (element) {
        return Preferences.findOne({name: element}).showPortfolio;
    }

});

Template.home.rendered = function () {
    Meteor.call('getQuotes', {symbols:  Portfolio.find().map( function (object) {
        return object.symbol
    }), fields: Fields});
};

Template.home.events({
    'click .remove-button': function (event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        var self = this;
        IonPopup.show({
            title: 'Are you sure?',
            template: 'Are you sure you want to remove this stock from your portfolio?',
            buttons: [{
                text: 'Yes',
                type: 'button-positive',
                onTap: function() {
                    Portfolio.remove({symbol: self.symbol})
                    IonPopup.close()
                }
            },
                {
                    text: 'No',
                    type: 'button-positive',
                    onTap: function() {
                        IonPopup.close()
                }
            }]
        });
    },
    'click .add-button': function (event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        var self= this;
        IonPopup.show({
            title: 'Success',
            template: self.symbol + ' has been added to your portfolio',
            buttons: []
        });
        Portfolio.insert({symbol: this.symbol})
        setTimeout(function () {
            IonPopup.close();
        }.bind(this), 1000)
    }
});

Template.home.created = function () {
    Session.set('searchKey', '')
};