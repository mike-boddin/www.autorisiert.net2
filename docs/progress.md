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