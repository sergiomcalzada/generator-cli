var fsTools = require ('../../common/fsTools');
var config = require('./js/config');
var variables = require('./js/variables');
var providers = require('./js/providers');
var outputs = require('./js/outputs');

/**
 * Application writer
 */
module.exports = function (generator, answers) {

    answers = Object.assign({
        name: answers.serverName,
        serverVersion: "12.0",
        failOver: answers.features.includes("fail-over"),
        serverLocations: answers.features.includes("fail-over") ? answers.serverLocations : [answers.serverLocation]
    }, answers);

    fsTools.copyTo(generator, 'sql-server.tf', `${answers.name}-sql-server.tf`, answers);
    config.copy(generator.fs, answers); 
    variables.copy(generator.fs, answers);
    providers.copy(generator.fs, answers);
    outputs.copy(generator.fs, answers);
    if (answers.features.includes("fail-over")) {
        fsTools.copyTo(generator, 'sql-server-failover.tf', `${answers.name}-sql-server-failover.tf`, answers);
    }
}