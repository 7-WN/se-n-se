# se-n-se #

## Description ##

Source code and generators for http://www.se-n-se.eu/

## Working on the source code ##

If you want to do some work on the website, you **MUST read all this documentation!**

### Prerequisites ###

* Git of course ;-) (The best way to install git on Windows is by installing [the GitHub client for windows](http://windows.github.com/). The shell that comes with it is also great for all your command prompt commands, like `grunt update` etc.)
* [node.js](http://nodejs.org/) and npm
* [grunt-cli](http://gruntjs.com/) and [bower](http://bower.io/). The easiest way to install both and throw in the fantastic [yeoman](http://yeoman.io/) as well is by issuing the following command in your command prompt or shell `npm install -g yo`

### Getting started ###

* Clone this repository:
	* On Linux or OSX: `git clone git@github.com:comweb/se-n-se.git`
	* On Windows: `git clone https://github.com/comweb/se-n-se.git`
* Go into your local working directory: `cd se-n-se`
* Run the first initialisation task:
	* On Linux or OSX: `bin/init`
	* On Windows: `bin/init.bat`

## Folder structure ##

* **bin:** contains initialisation scripts that will set you up to work on the source code.
* **bower_components:** the folder where bower installs its packages, like bootstrap and jquery.
* **build:** this is where the generated version of the website is created. The contents of this folder are to be put on the webserver.
* **layouts:** contains handlebars layout files. These will be wrapped around a content file.
* **node_modules:** this is where node/npm installs its packages.
* **partials:** this is where pieces of content are kept that can be reused within other pages or layouts. These files can be in markdown (.md) or handlebars (.hbs) format.
* **public:** this is where static files like stylesheets and images are stored. This folder is copied integrally within the build folder.
* **src:** contains the source files for our html pages. Every file in this folder will generate an html file in the build folder. These files can be in markdown (.md) or handlebars (.hbs) format.
* **.gitignore:** list of files that git will not put in source control.
* **bower.json:** packages that bower should install.
* **Gruntfile.js:** this is where the magic happens. It contains all the jobs that are needed to generate the actual website from the source files.
* **package.json:** packages that npm should install.

## Grunt ##

Our build system makes extensive use of [grunt](http://gruntjs.com/), the javascript task runner. Grunt helps us build a complete website that we can publish from our source files. We have defined a number of tasks. Run these commands from your shell in the top folder of this project.

* **build:** Build the website in our _build_ directory (this is the default task). `grunt build` or `grunt`
* **update:** Update the necessary packages. You must run this task every time that _package.json_ or _bower.json_ are changed. `grunt update`
* **watch:** Leave this task running to automatically update the build whenever a source file is saved. If you have [the LiveReload extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) installed and activated for your browser, your browser will automatically refresh every time a file is updated as well (no more F5 or cmd+R). To make sure that you have all files in your _build_ folder, always run `grunt build` before running `grunt watch`

## Handlebars ##

The templates we use are created with [handlebars](http://handlebarsjs.com/). Handlebars files are normal HTML with some special functions put between {{}}.