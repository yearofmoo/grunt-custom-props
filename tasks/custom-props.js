/*
 * grunt-custom-props
 * https://github.com/yearofmoo/grunt-custom-props
 *
 * Copyright (c) 2015 Matias Niemelä
 * Licensed under the MIT license.
 */

'use strict';

var customProps = require('../custom-props.js');
module.exports = function(grunt) {
  grunt.registerMultiTask('customProps', 'CSS Preprocessor for custom CSS properties', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({ });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var content = grunt.file.read(filepath);
        return customProps(content, options);
      }).join('');

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');

      grunt.file.write(f.dest, src);
    });
  });
};
