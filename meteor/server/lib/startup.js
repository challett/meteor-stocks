/**
 * Created by Connor on 12/3/2015.
 */
Meteor.startup( function () {
        if(Stocks.find().count() === 0) {
            var data;
            Papa.parse(Assets.getText('symbols-names-uppercase.csv'), {
                header: true,
                complete: function(results) {
                    data = results.data;
                    console.log('done')

                },
                error: function (err) {
                    console.log('error parsing csv',err)
                }
            });
            Stocks.rawCollection().insert(data, function (err,res) {
            })
        }
    }
);

