Moment.js  is a great library for working with date objects on a browser and Nodejs environment. Sometime when we work with Dates and Time in JS is not a easy. This article, I will explain the basics and most common uses of this library.
### Set Up
Moment.js can be downloaded for free at its homepage: https://momentjs.com/ . Or you can install it using the node module using the following command:
```
npm install moment
```
### Date Format
With Moment.js you can easy to use with date formate and makes your code much simpler and easier.
```
moment().format();                                // "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)
moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
moment().format("ddd, hA");                       // "Sun, 3PM"
moment('gibberish').format('YYYY MM DD');         // "Invalid date"
```

### Date Validation
It is very easy if you want to validation with date in Moment.js. You just a very short code `date.isValid()` and it will return the result that is a date or not.
MomentJS provides the following parsing flags in cases where the date given is considered as invalid :
* overflow –  an overflow occurs
* invalidMonth –  the month is invalid
* empty – the entered date contains nothing parsable.
* nullInput – the entered date is null.


```
var a = moment("2018-19-22T10:20:25");
a.isValid(); => false
a.invalidAt(); => 1
```
As you can invalidAt return back value as 1, that mean date have problem with the month value is bigger than 12. And now you can check value of invalidAt as table below:

| Value     | Key     |
| -------- | -------- |
| 0     | years     |
| 1     | months     |
| 2     | days     |
| 3     | hours     | 
| 4     | minutes     | 
| 5     | seconds     | 
| 6     | milliseconds     |

```
var today = moment().format() //returns "2019-09-22T05:23:45+07:00"
var today = moment().format('YYYY-MM-DD') //returns "2019-09-22"
var today = moment().format('YY/MMM/DD') // returns "19/Sep/22"
var today = moment().format('D/MMMM/Y') // returns "22/September/2019"
var time = moment().format('ddd DD/MM/YYYY') //returns "Sun 22/09/2019"
```
### Manipulating date and time
Once you have a moment, you may want to manipulate it. There are several methods to support you.

**ADD**
```
  moment().add(Number, String);
  moment().add(Duration);
  moment().add(Object);
```

It is a powerfull feature that can add time into moment. If you want to add the time you can add a values with the keys. Ex: `moment().add(7, 'days');`
`Subtract`
```
moment().subtract(Number, String);
moment().subtract(Duration);
moment().subtract(Object);
```
This is feature can provide you add a specified period of time. Ex: `moment().subtract(7, 'days');`

**Start of Time**

` moment().startOf(String);` You can change set and change time or date start in moment as below:
```
moment().startOf('year');
moment().startOf('month');
moment().startOf('quarter');
moment().startOf('week');
moment().startOf('isoWeek');
moment().startOf('day');
moment().startOf('date');
moment().startOf('hour'); 
moment().startOf('minute'); 
moment().startOf('second');
```
**End of Time**

`moment().endOf(String);` You can change set and change time or date end in moment as below:
`moment().endOf("year"); `

### Display
After i show you the parse and operation as above, now i will show you how to display the time.

**Format**
```
moment().format();
moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
moment().format("ddd, hA");
moment('gibberish').format('YYYY MM DD');
```

**Difference**
```
moment().diff(Moment|String|Number|Date|Array);
moment().diff(Moment|String|Number|Date|Array, String);
moment().diff(Moment|String|Number|Date|Array, String, Boolean);
```
Ex:
```
var a = moment([2019, 0, 30]);
var b = moment([2019, 0, 28]);
a.diff(b) // 172800000
```

**Days in Month**
```
moment("2019-02", "YYYY-MM").daysInMonth() // 28
moment("2019-01", "YYYY-MM").daysInMonth() // 31
```

**Javascript Date**

 `moment().toDate();` To get a copy of the Date object that Moment.js wraps, use moment # toDate.
 
**As Array**

`moment().toArray();` This returns an array of reference numbers from the `new Date ()` parameter. Ex: ` moment().toArray();`

**As String**

`moment().toString();` Returns an  string in a format similar to` .toString ()` of JS Date. For example: `moment().toString()`