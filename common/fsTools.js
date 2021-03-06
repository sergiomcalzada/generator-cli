module.exports = {
    /**
     * Copies a file from the source path to the exact same location in destination
     * @param {*} generator File system
     * @param {*} source Source path
     * @param {*} parameters Object with parameters to replace
     */
    copy: function (generator, source, parameters) {
        generator.fs.copyTpl(
            generator.templatePath(source),
            generator.destinationPath(source),
            parameters
        );
    },

    /**
     * Copies a file from the source to a given destination path
     * @param {*} fs File system
     * @param {*} source Source path
     * @param {*} destination Target path
     * @param {*} parameters Object with parameters to replace
     */
    copyTo: function (generator, source, destination, parameters) {
        generator.fs.copyTpl(
            generator.templatePath(source),
            generator.destinationPath(destination),
            parameters
        );
    }
}