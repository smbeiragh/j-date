# Date class implementation in Jalali calendar

This package aimed to develop and maintain Jalali Calendar also called Persian Calendar in the form of
   Javascript Date Class, Basically we have a JDate class with identical interface and behavior of Data class
   
I believe we need more atomic libraries in javascript that are independent of other frameworks/libs. 
this package is one of those atomics, I searched a lot to find a real implementation of Date class for Jalali calendar 
and found a few. All of them was not really identical with Date class in term of interface and behavior. the only on
that was close to this idea was [jdate](https://github.com/tahajahangir/jdate) and it was pure in coding,
maintenance and modern development, still I'm not sure about it's possible logical bugs! I refactored
[this code](https://github.com/tahajahangir/jdate) to modern an modular npm package for ease of use in modern work flow.
 
## TO DO: 
* Writing Tests
* Making sure it's identical to Date
* Refactor code
* Resolve eslint errors
* Document known differences to Data Class 
* Writing documentation
* Adding minified version

     