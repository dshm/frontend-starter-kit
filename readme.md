#Front-end developer kit
##Requirements
* node ^6.3.0
* npm ^3.10.0

##Getting Started
`$ git clone https://github.com/dshm/frontend-starter-kit.git`

You must be globally installed packages *gulp* and *bower*

To set the type in the console `npm install gulp bower -g`

##Install dependencies, and check to see it works
######step 1
**cd 'project_folder'**
######step 2
**npm install** - This command installs a package, and any packages that it depends on. ([npm](https://www.npmjs.com/ "npm is the package manager for JavaScript"))
######step 3
**bower install** - This command installs a front-end package, and any packages that it depends on.([bower](https://bower.io/ "Bower is a command line utility. Install it with npm."))
######step 4
**npm start** or **gulp** - This command starts *Front-end developer kit*

##Development
**browsers.json** - In this file, you can specify the required browsers for [autoprefixer](https://github.com/postcss/autoprefixer "Parse CSS and add vendor prefixes to rules by Can I Use")

**uncss.json** - In this file, you can specify the required ignore ClassNames for [gulp-uncss](https://www.npmjs.com/package/gulp-uncss)

##Gulp tasks
* **gulp** - default task which runs the project with the initial settings with browsersync and Livereload

* **gulp build** - default task which runs the project with the initial settings without browsersync and Livereload

* **gulp png-sprite** - run task that takes image and converts them into a stylesheet and sprites(retina and default)

* **gulp svg-sprite** - run task which takes a bunch of SVG files, optimizes them and bakes them into SVG sprites of several types

* **gulp optimize-images** - run task which minify images seamlessly

* **gulp clean** - run task which remove *dist* folder

* **gulp zip** - run task which archive folder *dist*

##Application Structure
```
.
├── app
│   └── data
│   ├── fonts
│   ├── images
│   ├── jade
│   ├── layouts
│   ├── png-sprite
│   ├── scripts
│   │   ├── vendor
│   │   ├── index.js
│   │   └── markup-menu.js
│   ├── scss
│   │   ├── app
│   │   ├── _extends.scss
│   │   ├── _mixins.scss
│   │   ├── _normalize.scss
│   │   ├── _variable.scss
│   │   └── index.scss
│   ├── svg-sprite
│   ├── favicon.ico
│   └── index.html                
├── dist               
├── gulp                    
│   └── tasks
├── browsers.json           
└── uncss.json                   
```
