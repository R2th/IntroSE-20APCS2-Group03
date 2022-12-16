*Map và Object có các trường hợp sử dụng rất giống nhau đòi hỏi chúng ta phải hiểu sâu hơn để quyết định dùng cái gì và khi nào thì dùng chúng. Và đó là lý do mình đưa đến mọi người bài viết ngày hôm nay :)*
## 1. Map là gì?
Map là 1 kiểu data collection trong đó, dữ liệu được lưu trữ dưới dạng các cặp key - value, Và vì tính duy nhất của mỗi khóa được lưu trữ nên sẽ không có cặp key-value trùng lặp. với tinh chất đó Map được sử dụng đúng như cái tên của nó, chủ yếu được sử dụng để tìm kiếm và tra cứu dữ liệu một cách nhanh chóng.

ví dụ:
>  {(1, “smile”), (2, “cry”), (42, “happy”)}

**Lưu ý quan trọng**: key và value trong Map có thể ở bất kỳ loại dữ liệu nào, không giới hạn chỉ chuỗi hoặc số nguyên.

## 2. Object là gì?
Object trong Javascript cũng tuân theo khái niệm lưu trữ key - value như Map. Mỗi khóa trong object (hay chúng ta thường gọi là property ) cũng là duy nhất và được liên kết với 1 giá trị nhất định.

ví dụ:
> {1: ‘smile’, 2: ‘cry’, 42: ‘happy’}

Do đó, theo định nghĩa, Object và Map dựa trên cùng một khái niệm - sử dụng key - value để lưu trữ dữ liệu. và cả hai đều cho phép lấy dữ liệu theo key, xoá key, kiểm tra xem 1 key đã tồn tại hay chưa

ngoài ra thì có một số điểm khác nhau dễ nhận thấy:

*  **Key:** trong Object các khóa **PHẢI** là integer, string hoặc symbols. Nhưng trong Map, nó có thể là bất kỳ kiểu dữ liệu nào (một đối tượng, một mảng, v.v.). ví dụ về Map:
```js
const fun = function () {}
const set = new Set();
const map = new Map();
map.set(NaN, 1)
   .set(1, 2)
   .set("a", 3)
   .set([2], 4)
   .set({x : 3}, 5)
   .set(fun, 6)
   .set(set, 7);

``` 


*  **Thứ tự phần tử:** trong Map, thứ tự ban đầu của các phần tử (key - value) được giữ nguyên, trong khi Object không đảm bảo điều đó.
* **Kế thừa:** Map là một instance of Object  Nhưng Object chắc chắn không phải là một instance of Map. ví du:
```js
var map = new Map([[1,2],[3,4]]);
console.log(map instanceof Object); //true
var obj = new Object();
console.log(obj instanceof Map); //false
```
Ngoài nhưng điểm khác biệt trên Object và map còn khác nhau ở

## Xác định kích thước
* Với Map bạn có thể xác định kích thước thông qua thuộc tính size 
```js
var map = new Map([[1,2],[2,3]]);

map.size //2
```
* Với Object, bạn phải đếm số lượng các thuộc tính thủ công hoặc thông qua phương thức Object.keys(), phương thức này trả về 1 mảng  chứa các thuộc tính của Object
```
var obj = {id: 1, name: "Test object"};

let size = 0;
for (const key in obj) size++;
console.log(size);//2

console.log(Object.keys(obj).length); //2
```

## Duyệt các phần tử

* Bạn có thể duyệt qua các phần tử của Map (để lấy key, value hoặc [key, value]) một cách trực tiếp thông qua for...of.
ví dụ:
```js
const map = new Map([["first", 1], ["second", 2]]);
for (const key of map.keys()) {
  console.log(key);
}
/*
* first 
* second
*/
```

*  với Object, bạn chỉ có thể duyệt qua các key, sau đó mới lấy value thông qua key.
```js
const obj = { "first" : 1, "second" : 2 };
for (const key in obj) {
  console.log(key, obj[key]);
}
/*
* first 1
* second 2
*/
```

## 3. Khi nào sử dụng Object?, Khi nào sử dụng Map?
*  Trong các trường hợp cần áp dụng logic riêng cho các thuộc tính / phần tử riêng lẻ, thì Object chắc chắn là lựa chọn. Ví dụ:

```js
var obj = {
    id: 1, 
    name: "Ninh", 
    print: function(){ 
        return `Object Id: ${this.id}, with Name: ${this.name}`;
    }
}
console.log(obj.print());//Object Id: 1, with Name: Ninh
```
*  JSON có hỗ trợ trực tiếp cho Object, nhưng Map thì không (chưa). Vì vậy, trong tình huống nhất định mà chúng ta phải làm việc rất nhiều với JSON, hãy nghĩ đễn Object
*   Map duy trì thứ tự các khóa của nó - không giống như Object và Map được xây dựng với ý tưởng lặp lại, vì vậy trong trường hợp thứ tự lặp hoặc thứ tự các yếu tố rất quan trọng, hãy nghĩ đến Map - nó sẽ đảm bảo hiệu suất lặp ổn định trong tất cả các trình duyệt.
*   Map có xu hướng hoạt động tốt hơn trong việc lưu trữ tập dữ liệu lớn, đặc biệt là khi các khóa không xác định