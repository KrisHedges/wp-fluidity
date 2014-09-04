'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var colors = require('colors');

var WpFluidityThemeGenerator = module.exports = function WpFluidityThemeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    if (this.themeNameSpace) {
      process.chdir(this.themeNameSpace+"/grunt/");
      this.installDependencies({ skipInstall: options['skip-install'], bower: false });
    }
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WpFluidityThemeGenerator, yeoman.generators.Base);

WpFluidityThemeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log("\n\n                                 \u2591\u2591\u2591\u2591\u2591\u2591\u2591".grey);
  console.log("                                 \u2591\u2591".grey);
  console.log("                                 \u2591\u2591\u2591\u2591\u2591\u2591".grey);
  console.log("                                 \u2591\u2591".grey);
  console.log("                                 \u2591\u2591".grey);
  console.log("                                 \u2591\u2591".grey);
  console.log('\n                      ' + 'Fluidity Design Environment.\n\n'.bold.underline.white);

  console.log("This generator will create a Wordpress Theme Development Environment, Using \nCoffeescript, JadePHP, & Stylus w/Fluidity. It will create a base app and file structure.\n\nUsing the 'grunt dev' task you'll have features like live-reload on both the\nclient-side and server-side changes to view files and coffee-hinting throughout the entire app.\n\nUsing the 'grunt build' task will concat, compress, minify, lint, hint, sniff and otherwise uglify both the php code as well as your js/css.\nIt can also dynamically generate documentation using docco and a generated styleguide\nwith styldocco.\n".grey);

  var prompts = [{
    name: 'themeName',
    message: 'Name of the theme you want to create?'
  },{
    name: 'themeNameSpace',
    message: 'Uniq name-space for the theme (alphanumeric)?',
    default: function( answers ) {
    return answers.themeName.replace(/\W/g, '').toLowerCase();
  }
  },{
    name: 'themeAuthor',
    message: 'Name of the themes author?',
    default: function( answers ) {
    return 'John Doe';
  }
  },{
    name: 'themeAuthorURI',
    message: 'Website of the themes authors?',
    default: function( answers ) {
    return 'http://www.'+answers.themeAuthor.replace(/\W/g, '').toLowerCase()+'.com';
  }
  },{
    name: 'themeURI',
    message: 'Website of the theme?',
  default: function( answers ) {
    return answers.themeAuthorURI+'/'+answers.themeNameSpace;
  }
  },{
    name: 'themeDescription',
    message: 'Description of the theme?',
    default: function( answers ) {
    return 'This is a description for the '+answers.themeName+' theme.';
  }
  }];

  this.prompt(prompts, function (props) {
    this.themeName = props.themeName;
    this.themeNameSpace = props.themeNameSpace;
    this.themeAuthor = props.themeAuthor;
    this.themeAuthorURI = props.themeAuthorURI;
    this.themeURI = props.themeURI;
    this.themeDescription = props.themeDescription;

    cb();
  }.bind(this));
};

WpFluidityThemeGenerator.prototype.app = function app() {
  var currentDate = new Date()
  this.themeCreated = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

  this.directory('theme', this.themeNameSpace);
  this.mkdir(this.themeNameSpace+'/fonts');
  this.mkdir(this.themeNameSpace+'/images');
  this.mkdir(this.themeNameSpace+'/grunt');

  this.template('_style.styl', this.themeNameSpace+'/stylus/style.styl')
  this.template('_gruntfile.js', this.themeNameSpace+'/grunt/gruntfile.js')
  this.template('_package.json', this.themeNameSpace+'/grunt/package.json')
};
