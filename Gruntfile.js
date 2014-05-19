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
            build: ["build"],
            // empties the dist directory
            dist: ["dist"]
        },
        copy: {
            // copies all files from public to build/public, used for static files
            assets: {
                expand: true,  
                src: "public/**/*",
                dest: "build/"
            },
            // copies the assets files from public to dist/public, used for static files
            dist: {
                expand: true,
                src: ["public/**/*", "!*.css"],
                dest: "dist/"
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
        htmlmin: {
            // minifies the html files by removing whitespace and comments
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            dist: {
                expand: true,
                cwd: "build/",
                src: "**/*.html",
                dest: "dist/"
            }
        },
        cssmin: {
            dist: {
                expand: true,
                cwd: "build/",
                src: "**/*.css",
                dest: "dist/"
            }
        },
        sitemap: {
            dist: {
                siteRoot: "dist/",
                homepage: "http://www.se-n-se.eu",
                pattern: "**/*.html"
            }
        },
        watch: {
            // automatically update build when source files are changed and livereload pages if enabled in the browser
            // add or change static files
            assets: {
                options: {
                    livereload: true
                },
                files: ["public/**/*"],
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
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-sitemap');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // concatenate the above tasks and give them nice names
    grunt.registerTask('update', "Update installed dependencies or install new dependencies.", ["shell:updatePackages"]);
    grunt.registerTask('build', "Build a debug version of the website and put it in the build folder.", ["clean:build", "copy:assets", "assemble"]);
    grunt.registerTask('dist', "Create a distribution version of the website and put it in the dist folder.", ["build", "clean:dist", "copy:dist", "htmlmin:dist", "cssmin:dist", "sitemap:dist"]);
    grunt.registerTask('default', ["build"]);
};
