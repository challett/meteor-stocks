/**
 * Created by Connor on 12/2/2015.
 */
Preferences = new Ground.Collection('preferences', {connection: null});

PreferencesSchema = new SimpleSchema({
    name: {
        type: String
    },
    showPortfolio: {
        type: Boolean,
        autoform: {
            type: 'boolean-checkbox'
        }
    }
});
Preferences.attachSchema(PreferencesSchema);

