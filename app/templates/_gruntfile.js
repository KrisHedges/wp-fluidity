module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Compile the PHP
    jadephp: {
      dev: {
        expand: true,
        src: ['../jade/**/*.jade'],
        dest: '../',
        ext: '.php',
        flatten: true,
        options: {
          pretty: true
        }
      },
      dist: {
        expand: true,
        src: ['../tmp/**/*.jade'],
        dest: '../',
        ext: '.php',
        flatten: true,
        options: {
          pretty: false
        }
      }
    },

    // Code Sniff the PHP
    phpcs: {
      application: {
        dir: ['../**/*.php']
      },
      options: {
        bin: '~/.composer/vendor/bin/phpcs',
        warningSeverity: 6,
        severity: 1
      }
    },

    //Compile the CoffeeScript
    coffee: {
      dev: {
        expand: true,
        src: ['../coffee/**/*.coffee'],
        dest: '../js/tmp/',
        ext: '.js',
        flatten: true,
        options: {
          sourceMap: false
        }
      },
      dist: {
        expand: true,
        src: ['../coffee/**/*.coffee'],
        dest: '../js/tmp/',
        ext: '.js',
        flatten: true,
        options: {
          sourceMap: false
        }
      }
    },

    // Lint the CoffeeScript
    coffeelint: {
      all: ['../coffee/**/*.coffee']
    },

    // Compile the CSS
    stylus: {
      options: {
        paths: ['./node_modules/grunt-contrib-stylus/node_modules', './node_modules/fluidity/lib']
      },
      dev: {
        expand: true,
        src: ['../stylus/style.styl'],
        dest: '../',
        ext: '.css',
        flatten: true,
        options: {
          compress: false
        }
      },
      dist: {
        expand: true,
        src: ['../stylus/style.styl'],
        dest: '../',
        ext: '.css',
        flatten: true,
        options: {
          compress: true
        }
      }
    },

    // Concatentate the Javascript Files
    concat: {
      options: {
        seperator: ';'
      },
      js: {
        src: ['../js/tmp/**/*.js'],
        dest: '../js/dist.js'
      }
    },

    // Minify the Javascript
    uglify: {
      js: {
        files: {
          '../js/dist.js': '../js/dist.js'
        }
      }
    },

    // Minify the CSS
    cssmin: {
      css: {
        files: {
          '../style.css': '../style.css'
        }
      }
    },

    preprocess:{
      jade: {
        cwd: '../jade',
        src: '**/*',
        dest: '../tmp/result',
        expand: true
      }
    },

    // Watch Source Files for Changes
    watch: {
      jade: {
        files: ['../jade/**/*.jade' ],
        tasks: ['jadephp:dev', 'phpcs:application', 'notify:jade'],
        options: {
          livereload: true,
        }
      },

      coffee: {
        files: ['../coffee/**/*.coffee'],
        tasks: ['coffeelint:all','coffee:dev','concat:js', 'notify:coffee'],
        options: {
          livereload: true,
        }
      },

      stylus: {
        files: ['../stylus/**/*.styl' ],
        tasks: ['stylus:dev', 'notify:stylus'],
        options: {
          livereload: true,
        }
      }
    },

    copyto: {
      dist: {
        files: [
          {cwd: '../', src: ['**/*'], dest: '../dist/'}
        ],
        options: {
          ignore: [
            '../dist{,/**/*}',
            '../doc{,/**/*}',
            '../js/tmp{,/**/*}',
            '../tmp{,/**/*}',
            '../grunt{,/**/*}',
            '../stylus{,/**/*}',
            '../coffee{,/**/*}',
            '../jade{,/**/*}'
          ]
        }
      }
    },
    // notify cross-OS
    notify: {
      jade: {
        options: {
          title: 'StreamPress Watcher',
          message: 'Jade Compiled'
        }
      },
      stylus: {
        options: {
          title: 'StreamPress Watcher',
          message: 'Stylus Compiled'
        }
      },
      coffee: {
        options: {
          title: 'StreamPress Watcher',
          message: 'CoffeeScript Compiled'
        }
      },
      dev: {
        options: {
          title: 'StreamPress Watcher',
          message: "All source files compiled succesfully you're ready to go!"
        }
      },
      dist: {
        options: {
          title: 'StreamPress Watcher',
          message: "All source files compiled, minified, & uglified succesfully!"
        }
      }
    },

    clean: {
      all: {
        src: ['../dist', '../*.php', '../docs', '../*.css', '../tmp'],
        options: {
          force: true
        }
      },
      build: {
        src: [ '../*.php', '../*.css', '../tmp'],
        options: {
          force: true
        }
      }
    }
  });

  // Load grunt npm's via matchdep
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Production Build task
  grunt.registerTask('build', function() {
    grunt.task.run([
        'clean:all',
        'preprocess:jade',
        'jadephp:dist',
        'phpcs:application',
        'coffeelint:all',
        'coffee:dist',
        'concat:js',
        'uglify:js',
        'stylus:dist',
        'cssmin:css',
        'copyto:dist',
        'clean:build',
        'notify:dist'
    ]);
  });

  // Development task
  grunt.registerTask('development', function() {
    grunt.task.run([
        'clean:all',
        'stylus:dev',
        'jadephp:dev',
        'phpcs:application',
        'coffeelint:all',
        'coffee:dev',
        'concat:js',
        'notify:dev'
    ]);
  });

  // Dev
  grunt.registerTask('dev', [
    'development',
    'watch'
  ]);

  //Dist
  grunt.registerTask('dist', [
    'build'
  ])

  //Default
  grunt.registerTask('default', [
    'dev'
  ]);
};

