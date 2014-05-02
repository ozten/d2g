Distribute to Gecko aka D2G
=================

A service that makes it easy for developers to get Beta testers
to install privileged apps.

## Dependencies

* NodeJS 0.10.x
* MongoDB 2.4.9
* zip, unzip (UnZip, by Info-ZIP will work)
* [nss](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS)

## Installing on Ubuntu

    # install nodejs and mongodb manually for latest
    $ sudo apt-get install mongodb unzip zip libnss3 libnss3-tools
    $ cd d2g
    $ cp config/config.js-dist config/config.js
    # edit config.js audience if it isn't http://localhost:3000
    $ cp config/secrets.js-dist config/secrets.js
    $ npm install
    $ 


## Running Service

    npm start

## Resetting everything

    npm run-script clean


## Usage

Assuming your running this server on ip address 10.0.1.13 and port 3000:

    cd phonetools
    ./configure-2-distribute-2-gecko.sh 10.0.1.13:3000

On a desktop browser, log in and upload a privileged app.

Use FirefoxOS browser to go to http://10.0.1.13:3000 click link for install page of one of your apps.

App should install and be launchable.