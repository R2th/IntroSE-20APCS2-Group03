![](https://images.viblo.asia/2c2f5dbe-974e-4e29-ab80-b134673fb2bd.jpg)
## Giới thiệu
Xin chào mọi người, buổi trước mình có viết bài về xử lý mảng trong ruby nhưng vấn đề là không phải lúc nào mình cũng làm việc đó ở bên back-end đúng không.<br/> 
Thế nên hôm này mình sẽ bổ xung thêm cách xử lý mảng trong javascript cho nó có đôi có cặp, nói thế thôi chứ thực ra thì chúng giống na ná nhau đến 80% rồi nên cũng không có gì mới mẻ lắm đâu. <br/>
Lets' go. Hãy tạo 1 mảng trước đã:
```javascript
var foods = ['apple', 'tangerine', 'poultry_leg', 'pizza', 'hotdog']
```
### 1. Length
Sẽ trả về tổng số phần tử của mảng.
```javascript
f.length;  // 5
```
Hầu hết mọi người thường làm rỗng một mảng bằng cách gán nó bằng một mảng rỗng, nhưng như thế có thật sự hiệu quả không?
```javascript
let foo = [1, 2, 3];
let bar = [1, 2, 3];
let foo2 = foo;
let bar2 = bar;
foo.length = 0;          // so good
bar = [];                // not good
console.log(foo, foo2);  // [] []
console.log(bar, bar2);  // [] [1, 2, 3]
```
Khi làm rỗng một mảng bằng cách gán nó bằngrỗng thì hiểu đơn giản là mảng đó sẽ quên đi địa chỉ ô nhớ lưu giá trị `[1, 2, 3]` và sẽ nhận địa chỉ ô nhớ lưu giá trị `[]`  => dữ liệu cũ không bị xóa đi mà còn tạo thêm một mảng mới với giá trị rỗng.<br/>
Gán độ dài của mảng đó về không thì lại khác, việc này sẽ trực tiếp thao tác với địa chỉ ô nhớ lưu giá trị `[1, 2, 3]` và gán cho địa chỉ ô nhớ đó về rỗng.<br/>
**Tip:** Cách đơn giản cũng như hiệu quả nhất là sử dụng **`.length = 0`** để làm rỗng một mảng
```javascript
foods.length = 2;  // ['apple', 'tangerine']
foods.length = 0;  // []
```
### 2. Push
Thêm một phẩn tử vào vị trí cuối cùng của mảng.
```javascript
foods.push('grape');
foods;  // ['apple', 'tangerine', 'poultry_leg', 'pizza', 'hotdog', 'grapes']
```
**Tip:**  Thêm nhiều phần tử trong mảng thông qua **`Spread syntax (...)`** - một tính năng tương đối hay của ES6 có thể thay thế cho hàm **`concat`**.
```javascript
let numbers =  [1, 2, 3, 4, 5, 6];
let num2 = [7, 8, 9];
numbers.push(...num2);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
### 3. Unshift
Thêm một phần tử vào đầu của mảng.
```javascript
foods.unshift('grape');
foods;  // [ 'grapes', 'apple', 'tangerine', 'poultry_leg', 'pizza', 'hotdog']
```
**Tip:**  Thêm nhiều phần tử trong mảng thông qua **`Spread syntax (...)`**
```javascript
let numbers =  [1, 2, 3, 4, 5, 6];
let num2 = [7, 8, 9];
numbers.unshift(...num2); // [7, 8, 9, 1, 2, 3, 4, 5, 6]
```
### 4. Pop
Xóa bỏ một phần tử cuối cùng của mảng và trả về phần tử vừa được xóa.
```javascript
foods;           // ['apple', 'tangerine', 'poultry_leg', 'pizza', 'hotdog']
foods.pop();     // "hotdog"
foods;           // ['apple', 'tangerine', 'poultry_leg', 'pizza']
```
### 5. Shift
Xóa bỏ một phần tử đầu tiên của mảng và cũng trả về phẩn tử vừa được xóa.
```javascript
foods;           // ['apple', 'tangerine', 'poultry_leg', 'pizza', 'hotdog']
foods.shift();   // "apple"
foods;           // ['tangerine', 'poultry_leg', 'pizza',  'hotdog']
```
### 6. Join
Nối các phần tử của một mảng lại với nhau thành một chuỗi.
```javascript
foods;            // ['apple', 'tangerine', 'poultry_leg', 'pizza', 'hotdog']
foods.join();     // "apple,tangerine,poultry_leg,pizza,hotdog"
foods.join('');   // "appletangerinepoultry_legpizzahotdog" 
foods.join('-');  // "apple-tangerine-poultry_leg-pizza-hotdog"
```
### 7. Concat
Kết hợp các mảng lại với nhau:
```javascript
let array = [0, 1];
let newArray = array.concat(2, [3, 4, [5, 6], 7], 8, 9, undefined, null);
// [0, 1, 2, 3, 4, [5, 6], 7, 8, 9, undefined, null]
```
**Tip:** Cũng có thể sử dụng **`Spread syntax - (...)`** thay có **`concat`**
```javascript
let languages = ["JavaScript", "Ruby", "SQL"]
let frameworks = ["React", "Rails"]
let myStack = languages.concat(frameworks)
let myStack = [...languages, ...frameworks]
// ["JavaScript", "Ruby", "SQL", "React", "Rails"]
```
### 8. Reverse
Đảo ngược vị trí của các phẩn tử trong một mảng.
```javascript
foods;           // ['apple', 'tangerine', 'poultry_leg', 'pizza', 'hotdog']
foods.reverse();
foods;           // ['hotdog', 'pizza', 'poultry_leg', 'tangerine', 'apple']
```
**Tip:** Đảo ngược một chuỗi (convert sang mảng -> đảo ngược -> convert lại string)
```javascript
let str = "Athena"
let strReverse = [...str].reverse().join(''); // "anehtA"
```
### 9. indexOf và lastIndexOf
indexOf trả về chỉ mục của phẩn tử tìm thấy đầu tiên trong mảng đó, nếu không có sẽ trả về -1.<br/>
lastIndexOf trả về chỉ mục của phần tử tìm thấy cuối cùng trong mảng đó, nếu không có sẽ trả về -1.
```javascript
foods;  // ['apple', 'tangerine', 'beef', 'pizza', 'apple', 'hotdog']
```
| | apple | tangerine | beef | pizza | apple | hotdog | egg
| -------- | -------- | -------- | -------- | -------- |  -------- | -------- | -------- |
|**Index** | 0 | 1 | 2 | 3 | 4 | 5 | - |
|**indexOf** | 0 | 1 | 2 | 3 | 0 | 5 | -1 |
|**lastIndexOf** | 4 | 1 | 2 | 3 | 4 | 5 | -1 |
```javascript
foods.indexOf('apple');      // 0
foods.lastIndexOf('apple');  // 4
foods.indexOf('egg');        //-1
```
### 10. Some
Kiểm tra nếu như có bất kỳ `một phần tử ` nào thỏa mãn điều kiện đề ra thì trả về` true`.
```javascript
let num = [1, 2, 3, 4, 5];
num.some(item => item > 3);  // true
num.some(item => item > 6);  // false
```
Trên là cách viết rút gọn sử dụng `arrow function` trong `ES6` còn cú pháp đầy đủ sẽ như sau:
```javascript
num.some(function(item){return item > 3});
```
### 11. Every
Nghiêm ngặt hơn đó là `every`, chỉ trả về `true` khi `tất cả các phần tử ` thỏa mãn điều kiện đề ra.
```javascript
let num = [1, 2, 3, 4, 5];
num.some(item => item > 3);  // false
num.some(item => item > 0);  // true
```
### 12. Sort
Sắp xếp các phần tử trong mảng, nếu không truyền vào điều kiện gì thì mặc định sẽ sắp xếp theo `char code`.
```javascript
let arr = ['b', 'c', 'd', 'e'];
arr.sort();  // ["b", "c", "d", "e"]

//custom sort
let num = [1, 2, 3, 4, 5, 100, 23, 12];
num.sort( (a, b) => a-b );  // [1, 2, 3, 4, 5, 12, 23, 100]
```
**Note:** Hãy cẩn thận khi sử dụng `sort`, nên nhớ rằng phương thức này sắp xếp dựa trên `char code` chứ không phải giá trị, ví dụ điển hình là 100 > 2 nhưng lại "100" < "2".
```javascript
let num = [1, 2, 3, 4, 5, 100, 23, 12];
num.sort();  // [1, 100, 12, 2, 23, 3, 4, 5]
```
**Tip:** Xáo trộn một mảng bằng `sort`.
```javascript
let arr = [1,2,4,1,2,3];
arr.sort(() => Math.random()-0.5);
```
### 13. Filter
Phương thức `filter()` tạo ra một mảng mới dự trên các điều kiện mà trả về kết quả `true` từ một mảng hiện có.
```javascript
foods;     // ['apple', 'tangerine', 'poultry_leg', 'pizza', 'hotdog']
let vegFoods =  foods.filter( food => isVeg(food));
vegFoods;  // ['apple', 'tangerine', 'pizza']
```
### 14. Reduce
Phương thức `reduce()` thực thi các phương thức xử lý đối với từng phần tử trong mảng và cuối cùng tổng hợp kết quả về trả về cho chúng ta.<br/>
Hãy xem một ví dụ đơn giản:
```javascript
let numbers = [1, 2, 3, 4, 5];
let result = 0;
//  cách 1
function add(res, currentNum){ return res+ currentNum};
numbers.reduce(add, result);                                   // 15

//  cách 2: dùng arrow function
numbers.reduce((res, currenNum) => res + currenNum, result);   // 15
```
### 15. ReduceRight
Tương tự như reduce nhưng các phần tử truyền vào theo thứ tự từ phải qua trái (phần tử cuối cùng chạy trước, phần tử đầu tiên chạy sau cùng).
```javascript
let array = [1,2,3,4,5];
let result = 0;
function sum(result, num) {
   console.log(num);
   return result + num;
}
array.reduce(sum, result);
// từ trái qua phải i.e., 1,2,3,4,5

array.reduceRight(sum, result);
// từ phải qua trái i.r., 5,4,3,2,1

array.reduceRight( (res, num) => res+num, result);
// with arrow function
```
### 16. Map
Bạn muốn biến đổi dữ liệu của từng phần tử trong một mảng, hoặc bạn muốn lấy ra những thuộc tính của đối tượng trong mảng thì lúc đó hãy sử dụng `map`.<br/>
Map cho phép bạn tùy biến dữ liệu trên từng phần tử (cộng trừ nhân chia, thêm bớt các kiểu) để rồi ta được một mảng mới đã có dữ liệu từ mảng ban đầu nhưng đã qua xử lý.
```javascript
let numbers = [1, 2, 3, 4, 5];
// cách 1: Viết đầy đủ
function double(num){return num*num};
numbers.map(double);  // [1, 4, 9, 16, 25]

// cách 2: Dùng arrow function
numbers.map(num => num*num);
```
### 17. Splice
Phương thức `splice(ịndex, n, m)` sẽ xóa bỏ `n` phần tử tính từ `index` trở đi và cũng thêm vào những phần tử mong muốn - `m`.
```javascript
let array = [1, 2, 4, 5];
array.splice(2, 0, 3);             // tại vị trí index = 2: xóa đi 0 phần tử  rồi sau đó chèn vào 3
array;  // [1, 2, 3, 4, 5]

array.splice(2, 1, 30, 95);       // tại vị trí index = 2: xóa đi 1 phần tử  rồi sau đó chèn vào 30, 95
array;  // [1, 2, 30, 95, 4, 5]

array.splice(2, 0);               // tại vị trí index = 2: xóa đi 0 phần tử  phía sau đó
array;   // [1, 2, 30, 95, 4, 5]

array.split(2);                  // tại vị trí index = 2: xóa đi tất cả các phần tử  phía sau đó
array;   // [1, 2]
```
### 18. Slice
Phương thức `slice(start, end)` trả về một bản sao từ mảng ban đầu, trong đó:<br/>
start: vị trí bắt đầu trính xuất<br/>
end: vị trí kêt thúc, **kết quả sẽ không bao gồm phần tử end**.
```javascript
let numbers = [1, 2, 3, 4, 5];
numbers.slice(1);     // [2, 3, 4, 5]
numbers.slice(1, 3);  // [2, 3]
```
**Tip:** Lấy ra n phần tử cuối cùng một mảng
```javascript
// get last n elements
array.slice(-n);

let numbers = [1, 2, 3, 4, 5];
numbers.slice(-1);  // 5
numbers.slice(-3);  // [3, 4, 5]
```
### 19. forEach
Thực thi một callback function với từng phần tử trong mảng. Chúng ta không thể sử dung `break` và `continue` trong `forEach`:
```javascript
let numbers = [1, 2, 3, 4, 5];
numbers.forEach( e => console.log(e));
```
## Bonus
### 1. Loại bỏ phần tử trùng lặp
```javascript
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArray = [...new Set(array)];
uniqueArray); // Result: [1, 2, 3, 5]
```
### 2. Lấy ra những phần tử cuối cùng trong một mảng
Đó là một mẹo trong khi sử dụng slice mình có nêu ở bên trên.
```
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array.slice(-1); // Result: [9]
array.slice(-2); // Result: [8, 9]
array.slice(-3); // Result: [7, 8, 9]
```
### 3. Duỗi thẳng một mảng
Trong ES2019 có đưa thêm một hàm đó là `flat()`<br/>
Hàm này nhận duỗi thẳng một mảng tùy theo số ta truyền vào.
```
let array = [0, 1, 2, [3, [[4, 5], [6], 7], 8, 9], 10 , [11]];
array.flat(1);  // [0, 1, 2, 3, [[4, 5], [6], 7], 8, 9, 10, 11]
array.flat(2);  // [0, 1, 2, 3, [4, 5], [6], 7, 8, 9, 10, 11]
array.flat(3);  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
```
## Tham khảo
https://medium.com/better-programming/20-methods-to-get-to-know-javascript-array-operations-6935e757729b <br/>
https://medium.com/@PurpleGreenLemon/simplify-your-javascript-with-these-6-array-methods-db4c278f08c9 <br/>