module.exports = function(grunt) {
    grunt.initConfig({
        shell: {
            updatePackages: {
                command: "npm install && bower install"
            }
        },
        clean: {
            build: ["build"]
        },
        copy: {
            assets: {
                expand: true,
                cwd: "src/",
                src: "public/**/*",
                dest: "build/"
            }
        },
        assemble: {
            pages: {
                options: {
                    layout: "layouts/opleidingspagina.hbs",
                    partials: ["partials/**/*.hbs", "partials/**/*.md"],
                    helpers: ["handlebars-helper-include"]
                },
                expand: true,
                cwd: "src/",
                src: ["**/*.md", "**/*.hbs"],
                dest: "build/"
            }
        },
        watch: {
            assets: {
                options: {
                    livereload: true
                },
                files: ["src/public/**/*"],
                tasks: ["copy:assets"]
            },
            pages: {
                options: {
                    livereload: true
                },
                files: ["**/*.md", "**/*.hbs"],
                tasks: ["assemble"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('update', "Update installed dependencies or install new dependencies.", ["shell:updatePackages"]);
    grunt.registerTask('build', "Build a debug version of the website and put it in the build folder.", ["clean:build", "copy", "assemble"]);
    grunt.registerTask('default', ["build"]);
};
