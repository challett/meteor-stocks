/**
 * Created by Connor on 12/3/2015.
 */
Meteor.startup(function () {

    Symbols = [];
    Papa.parse('symbols.csv', {
        download: true,
        header: true,
        complete: function(results) {
            Symbols = results.data;
        }
    });
});