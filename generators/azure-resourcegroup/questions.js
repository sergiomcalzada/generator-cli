var az = require('../../common/az');
var config = require('../../common/config');
var terraform = require('../../common/terraform');
/**
 * Gets the default value from the Yeoman storage
 * @param {*} generator 
 * @param {*} key 
 * @param {*} defaultValue 
 */
function getConfig(generator, key, defaultValue) {
    return config.getDefault(generator, key, defaultValue);
}

module.exports = function (generator) {
    var questions = [];

    questions.push({
        type: "input",
        name: "name",
        message: "Resource group - Name",
        default: getConfig(generator, "name", terraform.generateKey(generator.appname)),
        validate: terraform.validateKey
    });

    questions.push({
        type: "list",
        name: "location",
        message: "Resource group - Location",
        choices: az.locations(generator),
        default: getConfig(generator, "location")
    });

    return questions;
}