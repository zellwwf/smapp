#Example App

## The goals of this side
1. This site will ask you to either log in or sign up using google, or a local account.
2. You can log in.
3. You can signup locally, or automatically log in using google.

## Routes This includes the following routes:
* GET   http://localhost:2200/
* GET   http://localhost:2200/register
* GET   http://localhost:2200/users -- not visible yet
* POST   http://localhost:2200/login
* GET   http://localhost:2200/logout

# Getting Started with Development
* models/
  ..* user.js
* node_modules/
  ..* node stuff
* views/
  ..* error.pug
  ..* index.pug
  ..* users.pug
* app.js
* api.js
* config.js
* package.json
* readme.md


### Prequisites
1. Node.JS
2. NPM

If you have npm, simply pull this repo and install packages using npm
> npm install


## Development on Vagrant

## Things that aren't working properly
1. User registration isn't making sure that only 1 user per email account
2. User sign in fails to redirect
3.
## Why there is no email verification
The reason is that I cannot find a way to generate the verification links without deploying
the application somewhere. This required more time on my part.
