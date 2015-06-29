/*
 * grunt-init-node
 * https://gruntjs.com/
 *
 * Copyright (c) 2015 Denny Riadi
 * Licensed under the Findly license.
 */

'use strict';

// Basic template description.
exports.description = 'Node.js scaffold to create REST API using restify library.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain "node" or "js" and should ' +
  'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'node'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'Findly'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('node_version', '>= 0.10.0'),
    init.prompt('main', 'gulpfile.js'),
    init.prompt('npm_test', 'gulp test'),
    init.prompt('private', true)
  ], function(err, props) {
    props.private = true;
    props.keywords = [];
    props.devDependencies = {
      'gulp': '^3.9.0',
      'gulp-jshint': '^1.11.0',
      'gulp-nodemon': '^2.0.3',
      'gulp-spawn-mocha': '^2.2.1',
      'jshint-stylish': '^2.0.1',
      'supertest': '^0.15.0'
    };
    props.dependencies = {
      'bunyan': '^1.4.0',
      'lodash': '^3.9.3',
      'logentries-stream': '^1.0.0',
      'newrelic': '^1.20.2',
      'restify': '^3.0.3'
    };

    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });
};
