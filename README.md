# se-n-se #

## Description ##

Source code and generators for http://www.se-n-se.eu/

## Working on the source code ##

If you want to do some work on the website, you **MUST read all this documentation!**

### Prerequisites ###

* git of course ;-) (The best way to install git on Windows is by installing [the GitHub client for windows](http://windows.github.com/). The shell that comes with it is also great for all your command prompt commands, like `grunt update` etc.)
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

## The files ##

### src/index.hbs ###

This is the main source file for the index.html homepage of the website. It includes a number of partials to keep the file down to a convenient size: _navigation_ and _welkom_.

Every _domein_ also has its own partial: administratie_en_handel.hbs, gezondheid_en_maatschappij.hbs, kunst.hbs and techniek_en_wetenschap.hbs.

Because it is unique, this page specifies its own layout. It does not need an external layout file.

### partials/domeinen/*.hbs ###

administratie_en_handel.hbs, gezondheid_en_maatschappij.hbs, kunst.hbs and techniek_en_wetenschap.hbs

The _domeinen_ partials aggregate the _opleidingen_ that match it. Each _domein_ has its own section with an article for each _opleiding_. This article contains the title, the summary and a link to the homepage for the _opleiding._

### src/opleidingen/**/*.md ###

The contents for the _opleidingen_ pages. These are formatted as markdown with [YAML Front Matter](http://assemble.io/docs/YAML-front-matter.html). The front matter must contain the following properties:

* **title:** the title of the page or the name of the _opleiding._ **STRING**
* **tags** an array that contains at least one string with the hyphenated name of the _domein._ **ARRAY of STRINGS**
* **url:** this is a bit of a hack, but this property must contain the url of the resulting html page: "opleidingen/\<domein>/\<filename>.html". **STRING**
* **scholen:** an array that contains a list of strings with the names of the _scholen_ that have the _opleiding._ The strings should match the base filenames of the partials in _partials/scholen:_ underscored and without file extension. **ARRAY of STRINGS**
* **summary:** the first part of the text. It must be a little bit like a teaser. This is the text that is used on the homepage and also the first part of the text that is used on the page for the _opleiding_ itself. **STRING**

The content is in [markdown.](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) The title and the first paragraph should not be part of the markdown. They are already included in the YAML front matter.

The first heading level should be h2. h1 is reserved for the page title.

### partials/scholen/*.hbs ###

These files contain the addresses of the _scholen_ and the dates and times of their _infomomenten._ The format used is html with the [h-card](http://microformats.org/wiki/h-card) microformat for the address and the [h-event](http://microformats.org/wiki/h-event) microformat for the _infomoment._

### layouts/opleidingspagina.hbs ###

This is the layout for the opleidingspagina's. It uses the content and properties specified in the _src/opleidingen/\**/\*.md_ files.

## Grunt ##

Our build system makes extensive use of [grunt](http://gruntjs.com/), the javascript task runner. Grunt helps us build a complete website that we can publish from our source files. We have defined a number of tasks. Run these commands from your shell in the top folder of this project.

* **build:** Build the website in our _build_ directory (this is the default task). `grunt build` or `grunt`
* **update:** Update the necessary packages. You must run this task every time that _package.json_ or _bower.json_ are changed. `grunt update`
* **watch:** Leave this task running to automatically update the build whenever a source file is saved. If you have [the LiveReload extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) installed and activated for your browser, your browser will automatically refresh every time a file is updated as well (no more F5 or cmd+R). To make sure that you have all files in your _build_ folder, always run `grunt build` before running `grunt watch`

## Handlebars ##

The templates we use are created with [handlebars](http://handlebarsjs.com/). Handlebars files are normal HTML with some special functions put between {{ }}.
