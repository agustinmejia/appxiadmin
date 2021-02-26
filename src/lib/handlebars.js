const timeago = require('timeago.js');

const helpers = {};

helpers.timeago = (savedTimestamp) => {
    return timeago.format(savedTimestamp);
};

helpers.ifIgual = (v1, v2, options) => {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
}

helpers.ifDiff = (v1, v2, options) => {
    if(v1 !== v2) {
        return options.fn(this);
    }
    return options.inverse(this);
}

module.exports = helpers;