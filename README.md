# Date class implementation in Jalali calendar

**JDate aka Date class implementation for Jalali calendar**

This package aimed to develop and maintain Jalaali Calendar also called Persian Calendar in the form of
   Javascript Date Class, Basically we have a JDate class with identical interface and behavior of Data class
   
I believe we need more atomic libraries in javascript that are independent of other frameworks/libs. 
this package is one of those atomics, I searched a lot to find a real implementation of Date class for Jalali calendar 
and found a few. All of them was not really identical with Date class in term of interface and behavior. the only on
that was close to this idea was [jdate](https://github.com/tahajahangir/jdate) and it was pure in coding,
maintenance and modern development, still I'm not sure about it's possible logical bugs! I refactored
[this code](https://github.com/tahajahangir/jdate) to a modern and modular npm package for ease of use in modern work flow.

## installation
```shel
npm install j-date --save
```

## usage
using node, webpack, browserify and other commonjs modular environments

```js
var JDate = require('./dist/j-date.src').JDate;

// will log someting like 1394/12/02 03:30:00
console.log((new JDate('1394-12-2')).toLocaleString());
```

```js
// using harmony modules
// default export
import JDate from 'j-date'

// or named export
import { JDate } from 'j-date' 
```

using globals in browser
download dist/j-date.js and load it using script tag

```js
// will log someting like 1394/12/02 03:30:00
console.log((new JDate('1394-12-2')).toLocaleString());
```

## Contribution
Fork this repo and always keep your code on a git branch other than master branch,

### Setting up dev environment 
**requirements**
npm 3.*.* or upper  
node 4.*.* or upper  
 
```shel
git clone clone git@github.com:you/j-date.git
npm install
npm run serve
```

run build script to make sure build passes without errors
```shel
npm run build
``` 
 
## TO DO: 
* Writing Tests
* Making sure it's identical to Date
* Refactor code
* Resolve eslint errors
* Document known differences to Data Class 
* Writing documentation

     