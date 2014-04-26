module.exports = function(grunt) {
    grunt.initConfig({
        shell: {
            // updates all npm & bower packages
            updatePackages: {
                command: "npm install && bower install"
            }
        },
        clean: {
            // empties the build directory
            build: ["build"]
        },
        copy: {
            // copies all files from public to build/public, used for static files
            assets: {
                expand: true,
                cwd: "src/",
                src: "public/**/*",
                dest: "build/"
            }
        },
        assemble: {
            // generates the html pages based on the files in the src folder
            pages: {
                options: {
                    layout: "layouts/opleidingspagina.hbs", // the layout that is used for most pages
                    partials: ["partials/**/*.hbs", "partials/**/*.md"], // all partials must reside under the partials folder
                    helpers: ["handlebars-helper-include"] // this one works with a variable as name for the partial
                },
                expand: true, // otherwise problems with file names
                cwd: "src/", // current working directory, for relative paths etc.
                src: ["**/*.md", "**/*.hbs"], // source files must be inside this folder
                dest: "build/" // where the assembled files are put
            }
        },
        // automatically update build when source files are changed and livereload pages if enabled in the browser
        watch: {
            // add or change static files
            assets: {
                options: {
                    livereload: true
                },
                files: ["src/public/**/*"],
                tasks: ["copy:assets"]
            },
            // rebuild pages when source files, includes or layouts are changed
            pages: {
                options: {
                    livereload: true
                },
                files: ["**/*.md", "**/*.hbs"],
                tasks: ["assemble"]
            }
        }
    });

    // load all tasks that are used above
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // concatenate the above tasks and give them nice names
    grunt.registerTask('update', "Update installed dependencies or install new dependencies.", ["shell:updatePackages"]);
    grunt.registerTask('build', "Build a debug version of the website and put it in the build folder.", ["clean:build", "copy", "assemble"]);
    grunt.registerTask('default', ["build"]);
};
