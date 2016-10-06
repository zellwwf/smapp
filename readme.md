#Example App

## The goals of this app
1. This site will ask you to either log in or sign up using google, or a local account.
2. You can log in.
3. You can signup locally, or automatically log in using google.

So far, the app is single user only. Ie the loggin mechanism is just an almost entirely global boolean, not really in the session per user.

# Getting Started with Development
* models/
  ..* user.js
* node_modules/
  ..* node stuff
* views/
  ..* index.pug
* app.js
* api.js
* config.js
* package.json
* readme.md


### Prequisites
1. Node.JS
2. NPM

## Start Development locally
If you have npm, simply clone this repo and install packages using npm
> >npm install

> >node app.js

After you start the app, it will tell you give you visit link. Since we're not using regular ports, check the link.
Using the terminal, the app will occasionally inform you of what is happening. That's good to keep in mind.


## Start Development on Vagrant
*tested on scotch/box.*

These commands should get you started if you have
> >vagrant init scotch/box
> >vagrant up

then you can ssh, using vagrant or if on Windows use putty's ssh (see [putty](http://www.putty.org))
> >vagrant ssh

> >sudo apt-get update

> >sudo apt-get upgrade -Y

Once you're inside the vm and done with updating the packages follow the steps in **Start Development Locally** section.
The good thing about Scotchbox is you only need to only update some packages. It already
has node and npm.





## Why there is no email verification
The reason is that I cannot find a way to generate the verification links without deploying
the application somewhere. This required more time on my part that I wasn't prepared for.
