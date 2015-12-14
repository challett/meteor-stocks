/**
 * Created by Connor on 11/26/2015.
 */
Template.portfolioSideMenu.events({
    'click .item-checkbox': function (event) {
        console.log(this)
    }
});

Template.portfolioSideMenu.helpers({
    'stockInfo': function () {
        var stock = Stocks.findOne();
        return lodash.keys(stock);
    },
    'weHaveData': function (key) {
        var stock = Stocks.findOne(),
            exclude = [
                /**
                *These are options that we do NOT want in our side bar.
                */
                
                '_id',,
                'changeInPercent',
                'change',
                'price',
                'dividendYield',
                'lastTradePriceOnly',
                'dividendPerShare',
                'dividendPayDate',
                'exDividendDate',
                'ask',
                'bid',
                'name',
                'symbol',
                'changeAndPercentChange',
                'lastTradeDate',
                'lastTradeTime',
                'lastTradeWithTime',
                '1YrTargetPrice',
                'changeFrom200DayMoving',
                '50DayMovingAverage',
                '200DayMovingAverage',
                'daysRange',
                '52WeekHigh',
                '52WeekLow',
                'changeFrom52WeekLow',
                'changeFrom52WeekHigh',
                'changeFrom50DayMovingAverage',
                'changeFrom200DayMovingAverage',
                'percentChangeFrom52WeekLow',
                'percentChangeFrom52WeekHigh',
                'percentChangeFrom200DayMovingAverage',
                'percentChangeFrom50DayMovingAverage',
                'percebtChangeFrom52WeekHigh',
                '52WeekRange',
                'marketCapitalization',
                'volume',
                'averageDailyVolume',
                'epsEstimateCurrentYear',
                'epsEstimateNextQuarter',
                'bookValue',
                'ebitda',
                'pricePerSales',
                'pricePerBook',
                'pricePerEpsEstimateCurrentYear',
                'pricePerEpsEstimateNextYear',
                'shortRatio',
                'pegRatio',
                'epsEstimateNextYear',
                'stockExchange',
                'earningsPerShare',
                'peRatio'
            ];
        return stock[key] && lodash.indexOf(exclude, key) === -1
    },
    'checked': function (key) {
        return Session.equals(key , true)
    },
    preference: function () {
        return Preferences.find();
    },
    sortingPreference: function () {
        return Preferences.findOne({name: 'sort'})
    },
    fieldName: function (string) {
        return this._af.doc.name
            // insert a space before all caps
            .replace(/([A-Z])/g, ' $1')
            // uppercase the first character
            .replace(/^./, function(str){ return str.toUpperCase(); }).replace(/([a-z])(?=[0-9])/g, '$1 ')
    }

});