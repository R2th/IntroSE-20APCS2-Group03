Convert String to Array JavaScript? Trong bài viết này, chúng ta sẽ cùng thảo luận về cách chuyển đổi từ String to Array javascript. Ở hướng dẫn này, chúng tôi cố gắng tìm hiểu rất nhiều ví dụ để cho các bạn một cách nhìn rõ ràng và tổng thể nhất.
Đầu tiên, chúng tôi muốn các bạn hiểu qua một phương thức rất gần gũi với mối devjs đó là method Split(). Nhưng trước hết, chúng tôi muốn các bạn đừng nhầm lẫn về **split(), splice(), slice()**.

## Cú pháp method Split()
```
str.split(separator, limit) 
```
![](https://images.viblo.asia/928928d3-c96a-4e68-8b99-7489164f8eb5.jpg)

## String to Array JavaScript Using JavaScript Examples
Đây là một ví dụ đơn giản:
```
var fruits = 'apple, orange, pear, banana, raspberry, peach';
var ar = fruits.split(', '); // split string on comma space
console.log( ar );
// [ "apple", "orange", "pear", "banana", "raspberry", "peach" ]
```
## Không có Separator - str.split();
```
var str = 'abcdefg';
var ar = str.split(); // no separator passed to split
console.log( ar ); // [ "abcdefg" ]
```
## Empty String Separator - str.split('');
```
var str = 'abcdefg';
var ar = str.split(''); // empty string separator
console.log( ar ); // [ "a", "b", "c", "d", "e", "f", "g" ]
```
## Separator - str.split('|');
| có thể là một ký tự khác cần split
```
var str = '|a|b|c|d|e|f|g|';
var ar = str.split('|');
console.log( ar ); // [ "", "a", "b", "c", "d", "e", "f", "g", "" ]
```
| có thể là một ký tự khác cần split, ví dụ : ",,"
```
var str = ',,a,,b,,c,,d,,e,,f,,g,,';
var ar = str.split(',,');
console.log( ar ); // [ "", "a", "b", "c", "d", "e", "f", "g", "" ]
```
## separator có thể là Regular Expression
```
var str = 'favorite desserts: brownies, banana bread, ice cream, chocolate chip cookies';
// regular expression separator
var re = /:\s|,\s/; // split ; và ,
var ar = str.split(re);
console.log( ar );
// [ "favorite desserts", "brownies", "banana bread", "ice cream", "chocolate chip cookies" ]
```
## Optional Limit Argument - limit array return
```
var str = 'abcdefg';
var ar = str.split(''); 
console.log( ar ); // ["a", "b", "c", "d", "e", "f", "g"]
```
Giờ đây chúng ta có thể giới hạn những items trả về trong array.
```
var str = 'abcdefg';
var ar = str.split('', 3); // chỉ lấy 3 items trong array trả về
console.log( ar ); // [ "a", "b", "c" ]
```

Ref: https://www.tutsmake.com/javascript-convert-string-to-array-javascript/