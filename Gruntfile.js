module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        connect: {
            debug: {
                options: {
                    port: 3000,
                    keepalive: true,
                    open: {
                        target: "http://localhost:3000/webapp/test/unit/unitTests.qunit.html"
                    }
                }
            }
        }
    });
      
    grunt.loadNpmTasks('grunt-contrib-connect');
  
    // Default task(s).
    grunt.registerTask('unitTestDebug', ['connect:debug']);
  
  };