Trong javascript có nhiều cách javascript remove element from array. Có nhiều cách ta đã biết từ lâu, nhưng cũng nên học thêm những cách khác như, remove item in array javascript es6, hay remove object in array javascript, hoặc có thể remove element from array by index or value. Nếu chúng ta biết trước index or value.
## javascript remove element from array
Trước tiên chúng ta lướt qua một số method cơ bản của một array, để có thể remove item in array một cách nhanh chóng. Hỗ trợ cực mạnh, hà cớ gì tại sao lại không dùng đến.

###  Array.shift() 

Sử dụng Array.shift() remove item đầu tiên của một array
```
let array = [1, 2, 3, 4]; 
array.shift();
/*
Output:
 [2, 3, 4]
*/
```
### Array.pop() 

Sử dụng Array.pop() remove item cuối của một array

```
let array = [1, 2, 3, 4]; 
array.pop();
/*
Output:
 [1, 2, 3]
*/
```
Notes: Cả hai method pop() và shift() đều return về giá trị đã bị xoá
## Javascript remove element from array by index

Nếu bạn sử dụng trường hợp này thì chắc chắn chúng ta đã biết index trong array hay biết position i trong một array. Splice array javascript cung cấp một method array.splice() để giải quyết việc này. và chúng ta cũng có thể hiểu index là key hoặc javascript remove element from array by key 

Giả sử bạn có một array và bạn biết xoá position i = 2

```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var removed = arr.splice(2, 1);
/*
removed === [3]
arr === [1, 2, 4, 5, 6, 7, 8, 9, 0]
*/
or bạn có thể xoá nhiều items

var removed = arr.splice(2, 2);//xoá ở i = 2 và tham số tuỳ chọn để xoá đến đâu 
/*
removed === [3, 4]
arr === [1, 2, 5, 6, 7, 8, 9, 0]
*/
```
Notes: arr.splice(2, 2);//xoá ở i = 2 và tham số tuỳ chọn để xoá đến đâu. Nếu tham số thứ 2 bỏ quên thì nó sẽ xoá hết items, trừ kể từ vị trí của tham số thứ nhất.
Ví dụ:

```
var removed = arr.splice(2);
/*
removed === [3, 4, 5, 6, 7, 8, 9, 0]
arr === [1, 2]
*/
```
The splice() cũng có thể add thêm item nữa, chứ không đơn thuần là chỉ remove item array using splice trong javascript đâu. 
## Javascript remove element from array by value
Để sử dụng trường hợp này, bắt buộc bạn phải biết mình remove value nào trong array. 

Cách cũ ví dụ: 

Giả sử bạn muốn remove value 4 trong array cho trước.

```
function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}
var arr = [1, 2, 3, 4, 5];
removeElement(arr, 4);
console.log(arr);

// Output:
//  [1, 2, 3, 5]
```

## Remove item in array javascript es6
Những bạn nào mà đã sử dụng ES6 một thời gian rồi thì có thể sử dụng method array.filter() 

### remove a item in array

```
const items = [1, 2, 3, 4, 5]
const valueToRemove = 4
const filteredItems = items.filter(item => item !== valueToRemove)
/*
  Output:
  [1, 2, 3, 5]
*/
```
### sử dụng array.filter() để remove multiple item in array javascript

```
const items = [1, 2, 3, 4, 5]
const valuesToRemove = [3, 4]
const filteredItems = items.filter(item => !valuesToRemove.includes(item))
console.log(filteredItems)
/*
  Output:
  [1, 2, 5]
*/
```
## Lodash remove item in array
Nếu bạn nào quen sử dụng lodash để tiện cho việc lập trình thì có thể sử dụng cách sau: 

Ví dụ remove item using lodash

```
var arr = [1, 2, 3, 3, 4, 5];
_.remove(arr, function(e) {
    return e === 3;
});
console.log(arr);

// Output:
// [ 1, 2, 4, 5 ]
```
Ngoài ra chúng ta cũng có thể sử dụng lodash để remove object in array javascript 

### remove item in object javascript

 ```
var people = [
    {name: 'Billy', age: 22},
    {name: 'Sally', age: 19},
    {name: 'Timmy', age: 29},
    {name: 'Tammy', age: 15}
];
_.remove(people, function(e) {
    return e.age < 21
});
console.log(people);

// Output
// [ { name: 'Billy', age: 22 }, { name: 'Timmy', age: 29 } ]
Cũng có thể dùng es6 filter() để giải quyết remove object in array javascript

var people = [
    {name: 'Billy', age: 22},
    {name: 'Sally', age: 19},
    {name: 'Timmy', age: 29},
    {name: 'Tammy', age: 15}
];

people = people.filter(function(returnableObjects){
     return returnableObjects.age < 21
});
        
console.log(people)

// Output
// [ { name: 'Billy', age: 22 }, { name: 'Timmy', age: 29 } ]
```
## javascript remove element from array in foreach
Cũng tương tự như loop for vậy, chúng ta lại sử dụng splice() để giải quyết:

var arr = [1, 2, 3, 4, 5];

arr.forEach(function(index, value){
   if(arr[index] === 4){
      arr.splice(index, 1);
   }
});

console.log(arr)
/*
Output
[1, 2, 3, 5]
Trên đây là những cách mà bạn có thể javascript remove element from array khi bạn gặp phải. Và tôi khuyên bạn, nên sử dụng nhưng gì mà javascript cung cấp, không nên lạm dụng những thư viện như lodash để remove item mà mà phải kéo về thư viện lodash chỉ để dùng cho một việc nhỏ như thế. 

Hy vọng có thể giúp các bạn hiểu rõ và dễ so sánh với nhau những cách trên làm sao cho hiệu quả và phù hợp với dự án của minh