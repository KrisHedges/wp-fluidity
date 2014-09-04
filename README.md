# Fluidity & Wordpress ♡  generator-wp-fluidity

A [Yeoman](http://yeoman.io) generator to kickstart your WordPress theme development with an awesome grunt based workflow that utilizes Stylus w/Fluidity, JadePHP, and Coffeescript.

## What do you get
- A super barebones wp theme
- An awesome grunt based development environment that rapidly increases theme development time and developer happiness with fetaures like:
  - Compiling, merging and compressing all Stylus files to one *style.css* file
  - Hinting, compiling, merging and compressing all Coffeescript files to one *dist.js* file
  - Sniffing, compiling, and compressing all JadePHP files to PHP files
  - A 'dev' task that offers LiveReload on changes to your PHP, Style, and Coffescript files all while hinting, sniffing, compiling, and merging automatically in the background.
  - A 'build' task for generating a production ready distribution version of the theme minified and compressed to ship.

## Getting Started

You''l need to have Yeoman installed.
You can get it through [npm](https://npmjs.org).

```
$ npm install -g yo
```

Of course you'll also need a working WordPress installation.
Checkout [YeoPress](https://github.com/wesleytodd/YeoPress)
```
npm install -g yo generator-wordpress
```
Once installed you'll be able to conjure up a wordpress install in any directory with:
```
yo wordpress
```
This theme develpoment toolchain also expects some things to be available globally on the system.
In particular, it uses the `phpcs` binary to check the PHP files for syntax errors so you'll need to install that.
We can and should use [Composer](https://github.com/composer/composer) the package manager for PHP.

I recommend installing Composer globally. To do so...
```
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```
Next use Composer to install Pear phpcs
```
 composer global require "squizlabs/php_codesniffer=*"
```
Make sure you have `~/.composer/vendor/bin/` in your PATH.
Add it to your `~/.bash_profile` or `~/.bashrc` like this...
```
export PATH="~/.composer/vendor/bin/:$PATH"
```

## Installation

Finally, you can install wp-fluidity from npm.

```
npm install -g generator-wp-fluidity
```

Then from inside a themes directory of a working wordpress install.
```
yo wp-fluidity
```

You'll be prompted with a few questions about your theme and when it's all done you'll have a new folder wth your themes name.

## Theme Development

To sart developing you'll need to install the dependences the grunt tasks depend on.
First `cd` into the `wp-content/themes/<your theme name>/grunt` directory and run:

```
npm install

```
Once the install is done You'll be able to fire off the default grunt task (dev) and start developing.Simply by running...

```
grunt
```

Or You can run the dev task directly if you like...

```
grunt dev
```

This will run all of the preprocessing in development mode (Unminified, and sourcemapped where possible) for the first time generating the theme itself and 
starts a watcher that will trigger the appropriate tasks as you make changes to files.

Of course, you'll have to fire up a PHP server of some kind to actually serve up WordPress.
I'll leave that up to you but I prefer [MAMP](http://www.mamp.info/en/).

### About the Preprocessing

Our toolchain uses several pre-proccessors, linters, uglifiers to make development nicer, easier and cleaner
They are as follows...

#### JadePHP

JadePHP allows us to write our php files using the terse and beatiful syntax of jade.
For more information on the syntax and usage check the readme at [Jade.PHP](https://github.com/everzet/jade.php)

Our jade files our kept in the `/jade` directory. They are then processed on change and the resulting PHP files are generated in the root of the theme directory.

#### Coffeescript

Coffeescript allows us to write our javascript files using the terse and beatiful syntax of coffeescript.
Our coffeescript files are kept in the `/coffee` directory. They are then processed on change and the resulting JS files are generated in the root `/js/tmp` directory.
These JS files will then be Concatenated into just one JS file in `/js/dist.js`.

During dist this file will also be uglified.

#### Stylus
Stylus allows us to write our CSS files using the terse and beatiful syntax of Stylus.
Our stylus files are kept in the `/stylus` directory. They are then processed on change and the resulting CSS files are generated in the root of the theme directory.

##### Fluidity
We're using the FluidityCSS framework in our stylus files. Fluidity will be installed and available for use in your stylesheets.

## Theme Distribution

To create a production ready buold of the them in the the `/dist` directory. Run...
```
grunt build
```
This will re-compile all of the source files in their resepective non-source-mapped, minified, or otherwise uglified/compressed manner
and copy all the necessary files over to the `/dist' directory.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
