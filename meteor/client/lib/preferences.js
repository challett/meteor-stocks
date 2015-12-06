/**
 * Created by Connor on 12/2/2015.
 */
Preferences = new Ground.Collection('preferences', {connection: null});

PreferencesSchema = new SimpleSchema({
    name: {
        type: String,
        unique: true
    },
    showPortfolio: {
        type: Boolean,
        optional: true,
        defaultValue: false,
        autoform: {
            type: 'boolean-checkbox'
        },
        label:' '
    },
    showDetail: {
        type: Boolean,
        optional: true,
        defaultValue: false,
        autoform: {
            type: 'boolean-checkbox'
        },
        label:' '
    },
    sort: {
        type: String,
        allowedValues: [
            'name', 'symbol', 'lastTradePriceOnly'
        ],
        autoform: {
            type: 'select-radio',
            options:
                {
                    name: 'Name',
                    symbol: 'Symbol',
                    lastTradePriceOnly: 'Price'
                },
        },
        optional: true
    }
});
Preferences.attachSchema(PreferencesSchema);

