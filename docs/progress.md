# progress

Log my progress here.

## idea

Was formed when reading this [article on Medium](https://hackernoon.com/12-cool-things-you-can-do-with-github-f3e0424cf2f0) by david gilbertson

I just want to try, if I am capable to write a small website with some simple js, which uses Github as CMS :)

## webpack

first we need to configure webpack properly  
any tutorials out there? [try this?](https://tutorialzine.com/2017/04/learn-webpack-in-15-minutes)

Ok, good tutorial so far to start little and plain.
We need a [copy-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) to move the `index.html` to the dist-folder.

What about [a dev-server?](https://github.com/webpack/webpack-dev-server)

## javascript??

Foo, I am too stupid to use it correctly. How is it even possible to call a js-Method from inside the DOM?
Thankfully I found [this SO-Thread](https://stackoverflow.com/questions/34357489/calling-webpacked-code-from-outside-html-script-tag)

But now the prod-build fails. `ERROR in bundle.js from UglifyJs
                               Unexpected token: name (Main)`

Seems to me that I need to configure babel to convert ES6 to ES5:

    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                }
            }
        }
    ],


I see, I have to learn a lot.
Let's start with `module`, `export`, `import`  and so on in ES6: [found this](http://stackabuse.com/how-to-use-module-exports-in-node-js/)

Here is a much more extensive article about this stuff: [es6-modules-final](http://2ality.com/2014/09/es6-modules-final.html)

## do the styling

As I like bootstrap, I will follow [this guide](https://getbootstrap.com/docs/4.0/getting-started/webpack/) to add it in my project.

I choose the hard way (compile bootstrap-sass on my own), so I need a [custom.scss](https://getbootstrap.com/docs/4.0/getting-started/theming/#importing)

Of course we will have to append our entrypoint in webpack from

    entry: './src/js/index.js',

to

    entry: ['./src/js/index.js', './src/scss/custom.scss'],


And don't forget the [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) :) ([see here](https://github.com/JonathanMH/webpack-scss-sass-file))

After some try and error, I will wire this step up: (see this [commit](https://github.com/mike-boddin/www.autorisiert.net2/commit/f92f27950574a3cddcb2ff38665df63fa0df050f))

### NPM-packages

    npm i --save bootstrap
    npm i -D css-loader, extract-text-webpack-plugin, node-sass, postcss-loader, sass-loader

### webpack.config.js

    entry: ['./src/js/index.js', './src/scss/custom.scss'],
    plugins: [
        // ...
        new ExtractTextPlugin("styles.css"),
    ],
    // ...
    rules: [
        // ...
        { // sass / scss loader for webpack
            test: /\.(sass|scss)$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
        }
    ]

### postcss.config.js

    module.exports = {
        plugins: [
            require('precss'),
            require('autoprefixer'),
        ]
    }

The add the `custom.scss` as stated above.
And don't forget to append your `index.html` with

    <link rel="stylesheet" type="text/css" href="styles.css" media="screen" />

This took me quite lot of time (about 1 hour or so) but I like the result!
That is what David Gilbertson means when he talks about the *YAT* :)

> I would like to propose a unit of measure for the construct of ‘JavaScript fatigue’: the YAT.
>
> A YAT is Yet Another Thing that you have to think about when you should really be busy writing code.

([source](https://hackernoon.com/its-ok-to-not-use-yarn-f28dc766ef32)) from the great article *"It’s OK to not use Yarn"*

## some thoughts

### design-thoughts

readability:

> If you don’t know anything about typography, but care about readability, try this as a starting point:
>
> * A minimum of 18px font size
> * Line spacing of 1.6
> * \#333 for color or thereabouts
> * Limit your lines to a width of 700px

(source: [Web fonts: when you need them, when you don’t](https://hackernoon.com/web-fonts-when-you-need-them-when-you-dont-a3b4b39fe0ae)