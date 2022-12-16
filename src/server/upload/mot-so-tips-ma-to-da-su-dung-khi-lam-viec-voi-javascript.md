# Giới thiệu
Trong bài viết này thì mình sẽ giới thiệu những tip mà mình thường sử dụng khi làm việc với JS, được mình tổng hợp từ nhiều nguồn, và nó đang giúp mình rút ngắn thời gian phát triển rất là nhiều, hy vọng sẽ giúp ích được cho bạn.

# Chuyển đổi thành Boolean
Để chuyển một biến thành giá trị boolean và không làm thay đổi giá trị của nó thì thường mình sẽ làm như thế này
```js
!!undefined // false
!!null // false
!!true // true
!!false // false
!!123 // true
!!0 // false
!!'some string' // true
!!'' // false
!!{} // true
!![] // true

[true, false, undefined, 0, 1].map(Boolean) // [true, false, false, false, true]
```

# Lọc giá trị
```js
[true, false, undefined, 0, 1].filter(Boolean) // [true, 1]
```

# Pluck
Khi mình cần lấy dữ liệu của một thuộc tính trong một mảng các object thì sẽ làm như thế này:
```js
var goal  = [ 
        { 
            "category" : "other", 
            "title" : "harry University", 
            "value" : 50000, 
            "id":"1" 
        }, 
        { 
            "category" : "traveling", 
            "title" : "tommy University", 
            "value" : 50000, 
            "id":"2" 
        }, 
        { 
            "category" : "education", 
            "title" : "jerry University", 
            "value" : 50000, 
            "id":"3" 
        }, 
        {     
            "category" : "business", 
            "title" : "Charlie University", 
            "value" : 50000, 
            "id":"4" 
        } 
] 


const pluck = (key, array) => array.reduce((values, current) => {
    values.push(current[key]);

    return values;
}, []);

console.log(pluck('title', goal));
//(4) ["harry University", "tommy University", "jerry University", "Charlie University"]
```

# Chuyển String thành Number và ngược lại
Để chuyển giá trị trong mảng từ chuỗi thành số và ngược lại, thì tớ sẽ làm như thế này:
```js
// string => number
console.log(['1', '2', '3'].map(Number)) // [1, 2, 3]

// number => string
console.log([1, 2, 3].map(String)) // ['1', '2', '3']
```

# Query string parameters
```js
const objectToQueryString = (obj) => Object.keys(obj).map((key) =>
    `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
    
console.log(objectToQueryString({giatri1: 1, giatri2: 2})) // "giatri1=1&giatri2=2"
```

# Tìm kiếm object trong mảng
Bạn cần tìm một object trong một mảng có giá trị gần giống hoặc giống thì làm như sau:
```js
const _ = require("lodash") // chúng ta sẽ sử dụng thư viện lodash

const search = (arr, keyName, value) => _.filter(
     arr,
     item => item[keyName].toLowerCase().includes(value.toLowerCase())
)

const test = [
    {
        name: 'name 1'
    },
    {
        name: 'name 2'
    },
    {
        name: 'name 3'
    }
];

console.log(search(test, 'name', '1')); // [{name: "name 1"}]
console.log(search(test, 'name', '2')); // [{name: "name 2"}]
console.log(search(test, 'name', 'ame')); // [{name: "name 1"}, {name: "name 2"}, {name: "name 3"}]
console.log(search(test, 'name', 'na 3')); // []
```

# Tìm giá trị bằng nhau trong 2 mảng
```js
const test = (arr, values) => arr.filter(v => values.includes(v));

console.log( test([1, 2, 3], [1, 4, 3]) ); // [1, 3]
```

# Kiểm tra Loại thiết bị
```js
const pattern  = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i;
console.log(pattern.test(navigator.userAgent) ? 'Mobile' : 'Desktop') // "Desktop";
```

# Chuyển đổi số thập phân
```js
const test = num => num.toLocaleString('en-US');

console.log( test(123456789.987782) ); // "123,456,789.988"
```

# Flatten deep
Bằng cách sử dụng đệ quy, mình có thể chuyển mảng đa chiều thành mảng một chiều
```js
const flattenDeep = arr => [].concat(...arr.map(v => (Array.isArray(v) ? flattenDeep(v) : v)));
console.log( flattenDeep([1, [2], [[3], 4], 5]) ); // [1, 2, 3, 4, 5]
```

# Chuyển đổi chữ dạng camel case sang một dạng tùy ý
```js
const fromCamelCase = (str, separator = '_') => str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();
const string = 'dayLaMotChuoi';
console.log(fromCamelCase(string, ' ')); // day la mot chuoi
console.log(fromCamelCase(string, '-')); // day-la-mot-chuoi
console.log(fromCamelCase(string, '_')); // day_la_mot_chuoi
```