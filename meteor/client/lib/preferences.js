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
    }
});
Preferences.attachSchema(PreferencesSchema);

