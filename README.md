# A Node.js microservice that allows authenticated users to download and resize an image.

## Users can also send jsonpatch requests to the server which returns a patched json document.

[![Build Status](https://travis-ci.org/ebcp-dev/img-resizer.svg?branch=master)](https://travis-ci.org/ebcp-dev/img-resizer)

- [DockerHub](https://hub.docker.com/r/ebcperez/img-resizer/)
- [Travis CI Build](https://travis-ci.org/ebcp-dev/img-resizer/)

## Created with:

- Node.js/Express
- axios
- Sharp
- [json-patch](http://bruth.github.io/jsonpatch-js/)
- Morgan
- Passport
- JSON Web Tokens authentication
- Mocha, Chai
- JSDOC Documentation

## Setup:

- `git clone https://github.com/ebcp-dev/img-resizer.git`
- `npm install`
- `npm run build`
- `npm start`
- For testing: `npm test`
