// My  8601 date is

// 2013-03-10T02:00:00Z

// How can I get the following?

// 2013-03-10

// approch 1

date = new Date('2013-08-03T02:00:00Z');
year = date.getFullYear();
month = date.getMonth()+1;
dt = date.getDate();

if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}
console.log(year+'-' + month + '-'+dt);

// approch 2

const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
const date = new Date('2013-03-10T02:00:00Z').toLocaleDateString('en-EN', options);
console.log(date.toLocaleDateString('en-US'));
// → "12/20/2012"

// British English uses day-month-year order
console.log(date.toLocaleDateString('en-GB'));
// → "20/12/2012"
console.log(date.toLocaleDateString('fa-IR'));
//