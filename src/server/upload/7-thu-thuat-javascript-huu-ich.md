Cũng giống như mọi ngôn ngữ lập trình khác, JavaScript có hàng tá thủ thuật để thực hiện cả các nhiệm vụ dễ và khó. Một số thủ thuật được biết đến rộng rãi trong khi những thủ thuật khác đủ để thổi bay tâm trí của bạn. Trong bài viết này chúng ta sẽ lướt qua **7 thủ thuật javascript** mà bạn có thể bắt đầu tập luyện và sử dụng sau khi bạn đọc xong bài viết này.
### #Get Unique Values trong Array
Cách giải quyết duplicate bằng cách sử dụng Set.
```
var j = [...new Set([1, 2, 3, 3])]
>> [1, 2, 3]
```
### #Array and Boolean
Bao giờ bạn cần lọc các falsy values (0, undefined, null, false, vv.) ra khỏi một array? Bạn có thể chưa biết thủ thuật này:
```
myArray
    .map(item => {
        // ...
    })
    // Get rid of bad values
    .filter(Boolean);
```
### #Create Empty Objects
Đương nhiên các bạn cũng có thể tạo bằng {}. Nhưng bạn biết đấy object vừa tạo theo kiểu đó vẫn còn hasOwnProperty, __proto__ của object đó.
```
let obj = Object.create({});

// obj.__proto__ === {}
// obj.hasOwnProperty === function
```
và thủ thuật mới.
```
let dict = Object.create(null);

// dict.__proto__ === "undefined"
// No object properties exist until you add them
```
### #Merge Objects
Nhu cầu merge objetcs đang ngày càng nhiều chính vì lẽ đó cho nên mới có thủ thuật do các nhà phát triển tạo ra cho các devjs như chúng ta.
```
const person = { name: 'David Walsh', gender: 'Male' };
const tools = { computer: 'Mac', editor: 'Atom' };
const attributes = { handsomeness: 'Extreme', hair: 'Brown', eyes: 'Blue' };

const summary = {...person, ...tools, ...attributes};
/*
Object {
  "computer": "Mac",
  "editor": "Atom",
  "eyes": "Blue",
  "gender": "Male",
  "hair": "Brown",
  "handsomeness": "Extreme",
  "name": "David Walsh",
}
*/
```
Dễ dàng với 3 chấm...
### #Require Function Parameters
Có thể đặt các giá trị mặc định cho các đối số hàm là một bổ sung tuyệt vời cho JavaScript, nhưng hãy xem mẹo này để yêu cầu các giá trị được truyền cho một đối số đã cho:
```
const isRequired = () => { throw new Error('param is required'); };

const hello = (name = isRequired()) => { console.log(`hello ${name}`) };

// This will throw an error because no name is provided
hello();

// This will also throw an error
hello(undefined);

// These are good!
hello(null);
hello('David');
```
### #Get Query String Parameters
```
// Assuming "?post=1234&amp;action=edit"

var urlParams = new URLSearchParams(window.location.search);

console.log(urlParams.has('post')); // true
console.log(urlParams.get('action')); // "edit"
console.log(urlParams.getAll('action')); // ["edit"]
console.log(urlParams.toString()); // "?post=1234&amp;action=edit"
console.log(urlParams.append('active', '1')); // "?post=1234&amp;action=edit&amp;active=1"
```

Hãy lưu giữ cho mình những bí quyết này nhé