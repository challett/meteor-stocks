/**
 * Created by Connor on 12/3/2015.
 */
Meteor.startup(function () {
    if (Stocks.find().count() === 0) {
        Papa.parse(Assets.getText('symbols.csv'), {
        header: true,
        complete: function(results) {
            lodash.forEach(results.data, function (value){
                Stocks.upsert({symbol: value.Symbol},{$set:{symbol: value.Symbol}});
             });
        }
        });
    }
});