Nối tiếp sersie nhỏ về JS snippets, chúng ta cùng tìm hiểu tiếp nhé!. Mọi người có thể xem phần 1 [ở đây](https://viblo.asia/p/mot-so-javascript-snippet-huu-dung-phan-1-Ljy5VveM5ra)

### 21. difference
Trả về các phần tử ở mảng thử nhất mà mảng thứ 2 không có.
```php
const difference = (x, y) => {
  const temp = new Set(y);
  
  return x.filter(val => !temp.has(val));
};

difference([1, 2, 3, 4], [1, 2, 5, 6]); // [3, 4]
```
### 22. differenceBy
Trả về các phần tử ở mảng thử nhất mà mảng thứ 2 không có với điều kiện đã cho
```php
const differenceBy = (x, y, fn) => {
  const temp = new Set(y.map(fn));
  
  return x.filter(val => !temp.has(fn(val)));
};

differenceBy([{ a: 1 }, { a: 2 }, {b: 3}], [{ a: 1 }], v => v.a); // [ { a: 2 }, {b: 3} ]
```

### 23. digitize
Nhận một số làm input và trả về một mảng các chữ số của nó.
```php
const digitize = n => [...`${n}`].map(i => parseInt(i));

digitize(1234); // [1, 2, 3, 4]
```
### 24. Drop Elements
Return một mảng mới với n phần tử bị remove từ bên trái.
```php
const drop = (arr, n = 1) => arr.slice(n);

drop([1, 2, 3]); // [2,3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 5); // []
```
### 25. dropRight
Return một mảng mới với n phần tử bị remove từ bên phải.
```php
const dropRight = (arr, n = 1) => arr.slice(0, -n);

dropRight([1, 2, 3]); // [1,2]
dropRight([1, 2, 3], 2); // [1]
dropRight([1, 2, 3], 5); // []
```

### 26. dropRightWhile
Return một mảng mới với n phần tử bị remove từ bên phải thỏa mãn điều kiện cho trước.
```php
const dropRightWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1);
  
  return arr;
};

dropRightWhile([1, 2, 3, 4, 5], n => n <= 3); // [1, 2, 3]
```

### 27. dropWhile
Return một mảng mới với n phần tử bị remove từ bên phải thỏa mãn điều kiện cho trước.
```php
const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  
  return arr;
};

dropWhile([1, 2, 3, 4, 5], n => n > 3); // [4, 5]
```

### 28. elementContains
Kiểm tra phần tử cha có chưa phần tử con không
```php
const elementContains = (parent, child) => parent !== child && parent.contains(child);

elementContains(document.querySelector('head'), document.querySelector('title')); // true
elementContains(document.querySelector('body'), document.querySelector('body')); // false
```
### 29.  Filter Duplicate Elements
Lọc các phần tử trùng lặp trong mảng
```php
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

filterNonUnique([1, 2, 2, 3, 4, 4, 5, 5, 5, 6]); // [1, 3, 6]
```

### 30. findKey
Return  key đầu tiên thỏa mãn điều kiện đã cho.
```php
const findKey = (obj, fn) => Object.keys(obj).find(key => fn(obj[key], key, obj));

findKey(
  {
    emma: { age: 31, active: false },
    red: { age: 38, active: true },
    taylor: { age: 40, active: true }
  }, item => item['active']
); // 'red'
```

### 31. findLast
Return phần tử cuối cùng thỏa mãn điều kiện đã cho.
```php
const findLast = (arr, fn) => arr.filter(fn).pop();

findLast([1, 2, 3, 4], n => n % 2 === 0); // 4
```
### 32. flatten
Làm phẳng một mảng lên đến độ sâu được chỉ định bằng cách sử dụng đệ quy.
```php
const flatten = (arr, depth = 1) =>
  arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);

flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]
```

### 33. Get Days Between Dates
Lấy ra số ngày giữa 2 ngày được chỉ định
```php
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

getDaysDiffBetweenDates(new Date('2021-05-01'), new Date('2021-05-10')); // 9
```
### 34. getStyle
Lấy giá trị của CSS cho một phần tử cụ thể.
```php
const getStyle = (el, styleName) => getComputedStyle(el)[styleName];

getStyle(document.querySelector('div'), 'font-size'); // '16px'
```
### 35. hasClass
Kiểm tra xem class này có tồn tại không
```php
const hasClass = (el, className) => el.classList.contains(className);

hasClass(document.querySelector('span.test'), 'test'); // true
```
### 36. hide
Ẩn tất cả các phần tử được chỉ định.
```php
const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));

hide(document.querySelectorAll('a')); // Hides all <a> elements on the page
```

### 37. httpsRedirect
Redirect từ HTTP sang HTTPS cụ thể.
```php
const httpsRedirect = () => {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};
 
httpsRedirect(); // Nếu bạn đang ở url http://mydomain.com, bạn sẽ được chuyển đến url https://mydomain.com
```
### 38. indexOfAll
Return về mảng các chỉ mục của phần tử muốn tìm. Nếu phần tử không tồn tại sẽ trả về mảng rỗng
```php
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

indexOfAll([1, 2, 3, 1, 2, 3], 2); // [1, 4]
indexOfAll([1, 2, 3, 1, 2, 3], 4); // []
```

### 39. insertAfter
Chèn một chuỗi HTML vào sau một phần tử cụ thể.
```php
const insertAfter = (el, htmlString) => el.insertAdjacentHTML('afterend', htmlString);

insertAfter(document.getElementById('myId'), '<p>Viblo May Fest</p>'); 
// <div id="myId">...</div> <p>Viblo May Fest</p>
```
### 40. insertBefore
Chèn một chuỗi HTML vào trước một phần tử cụ thể.
```php
const insertBefore = (el, htmlString) => el.insertAdjacentHTML('beforebegin', htmlString);

insertBefore(document.getElementById('myId'), '<p>Viblo May Fest</p>'); 
// <p>Viblo May Fest</p> <div id="myId">...</div>
```
### 41. intersection
Trả về 1 mảng chứa các phần tử tồn tại ở cả 2 mảng đã cho.
```php
const intersection = (a, b) => {
  const s = new Set(b);
  
  return a.filter(x => s.has(x));
};

intersection([1, 2, 3, 6], [4, 2, 1]); // [1, 2]
```

### 42. intersectionBy
Trả về danh sách các phần tử tồn tại trong cả hai mảng sau khi hàm fn được thực thi cho từng phần tử của cả hai mảng.
```php
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  
  return a.filter(x => s.has(fn(x)));
};

intersectionBy([{ a: 1 }, { a: 2 }, {b: 3}], [{ a: 1 }, {b: 2}], v => v.a); // [ { a: 1 }, {b: 3} ]
```

Phần 2 xin phép lại tại đây. Hẹn mọi người ở phần 3 nhé!

Thanks for reading:sparkling_heart: