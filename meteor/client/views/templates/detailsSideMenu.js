/**
 * Created by Connor on 11/26/2015.
 */
Template.detailsSideMenu.helpers({
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

                '_id',
                'name',
                'symbol',
                'askRealtime',
                'bidRealtime',
                'dividendYield',
                'dividendPerShare',
                'dividendPayDate',
                'exDividendDate',
                'changeRealtime',
                'changePercentRealtime',
                'lastTradeDate',
                'tradeDate',
                'afterHoursChangeRealtime',
                'commission',
                'lastTradeRealtimeWithTime',
                'lastTradeWithTime',
                'daysValueChange',
                'daysValueChangeRealtime',
                'pricePaid',
                'daysRangeRealtime',
                'holdingsGainPercent',
                'annualizedGain',
                'holdingsGain',
                'holdingsGainPercentRealtime',
                'holdingsGainRealtime',
                'moreInfo',
                'marketCapRealtime',
                'notes',
                'sharesOwned',
                'stockExchange',
                'peRatioRealtime',
                'tickerTrend',
                'orderBookRealtime',
                'highLimit',
                'lowLimit',
                'holdingsValue',
                'holdingsValueRealtime',
                'previousClose',
                'open',
                'daysLow',
                'daysHigh',
                'lastTradePriceOnly',
                'change',
                'changeInPercent',
            ];
        return stock[key] && lodash.indexOf(exclude, key) === -1
    },
    'checked': function (key) {
        return Session.equals(key , true)
    },
    preference: function () {
        return Preferences.find();
    },
});