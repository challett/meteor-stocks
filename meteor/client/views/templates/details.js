/**
 * Created by Connor on 11/26/2015.
 */
Template.detail.helpers({
    fields: NamedFields,
    stockFieldValue: function (fieldName) {
        return (this.stock[fieldName])
    }
});