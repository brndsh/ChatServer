module.exports = function(grunt) {

  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),

    jshint: {
      
      options: {
      	  reporter: require('jshint-stylish'), // use jshint-stylish to make our errors look and read good
	  	  curly:  true,
		  immed:  true,
		  newcap: true,
		  noarg:  true,
		  sub:    true,
		  boss:   true,
		  eqnull: true,
		  node:   true,
		  undef:  true,	
	  globals: {
	    _:       false,
	    jQuery:  false,
	    angular: false,
	    moment:  false,
	    console: false,
	    $:       false,
	    io:      false
		}
	},

	build: ['Gruntfile.js', '../client/src/*.js']
    },
      connect: {
	    server: {
	      options: {
	        port: 8000,
	        keepalive: true,
         	socketio: true,
	        base: ['./src']
	      },
	      livereload: {
          options: {
            middleware: function (connect) {
              return [
                require('./chatserver')
              ];
            }
          }
        }
	  }
	}
  });


  grunt.registerTask('default', ['connect:server']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-keepalive');
};