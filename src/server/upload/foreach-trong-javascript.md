# 1. Đặt vấn đề 
Xét một ví dụ đơn giản : " Tính tổng của mảng numbers = [1,2,3,4,5,6]" .

Thông thường, chúng ta sẽ làm như sau : 
```
const numbers = [1, 2, 3, 4, 5, 6];
let sum = 0;
for(let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log(sum);
// => 21
```

Cách trên khá dễ hiểu và thường đọc xong người ta sẽ nghĩ đến dùng cách này luôn. Tuy nhiên, trong trường hợp nào đó, vô tình chúng ta bị nhầm lẫn biến i đó với một biến số nào trước đó thì thật tệ hại. 

Ngoài cách dùng vòng for, chúng ta có thể dùng tới forEach,  một hàm khá hay và ngắn gọn.


# 2. Sử dụng forEach thế nào ? 
Bài toán trên có thể được sử dụng với forEach như sau : 
```
const numbers = [1, 2, 3, 4, 5, 6];
let sum = 0;
forEach(numbers, function(element){
    sum += element;
});
console.log(sum);
// => 21
```
Cũng khá là dễ hiểu nhỉ vì nó khá giống với ngôn ngữ tự nhiên mà (hihi).

# 3. Giới thiệu về forEach
forEach là một phương thức có sẵn của array được Javascript cung cấp. 

**Cú pháp của nó là : **
```
arr.forEach(function callback(currentValue, index, array) {
    // your iterator
}[, thisArg]);
```
Giải thích

callback: là hàm để thực hiện với mỗi phần tử của mảng, bao gồm 3 tham số:

currentValue: phần tử hiện tại đang được xử lý của array.

index: chỉ số của phần tử hiện tại đang được xử lý của array.

array: mảng hiện tại đang gọi hàm forEach.

thisArg: giá trị được sử dụng như là this, là tham chiếu tới đối tượng khi thực hiện hàm callback (Nếu thisArg không được nói tới thì mặc định là undefined) 

Ví dụ in ra tổng của mảng : 

```
function sumOfArray(numbers){
  numbers.forEach(function sumElement(element){
    console.log(element);
  });
}
```

Ví dụ có sử dụng thisArg 
```
function Counter() {
  this.sum = 0;
  this.count = 0;
}
Counter.prototype.add = function(array) {
 array.forEach(function(item) {
   this.sum += item;
   ++this.count;
 }, this);
};

const obj = new Counter();
obj.add([2, 5, 9]);
console.log(obj.count); // => 3 
console.log(obj.sum);   // => 16
```

Khá là dễ hiểu phải không ạ? Đoạn code khi sử dụng forEach khá là dễ hiểu và ngắn gọn, tuy nhiên thì code sẽ chạy chậm hơn so với việc sử dụng vòng lặp (tuy nhiên không đáng kể).
Tùy vào từng trường hợp thì mình có thể sử dụng linh hoạt.

# 4. Một số hàm khác 
Ngoài forEach, thì Javascript còn cung cấp một số phương thức khác như : filter, reduce , map, every .... 
Trong project mình đang làm cũng liên quan khá nhiều tới xử lí các array, ơn giời là các phương thức này đã cứu cánh mình rất nhiều, nếu mình còn dùng for và for để xử lí thì ... bao nhiêu dòng code cho đủ, và mỗi lần maintain lại thật là ác mộng!
Sau đây là một số phương thức mình hay dùng : 
1. Map

Cái đầu tiên phải kể đến đó chính là map, một hàm mình dùng khá là nhiều .

Xét một ví dụ: 
```
let arrayName = dataResponse.map( item => {
    return item.Name
}
```

Nói một cách dễ hiểu, map trả về 1 mảng mới có độ dài bằng mảng ban đầu

2.  Filter

Nghe tới tên, là ta có thể hình dung luôn được nó sẽ làm gì rồi đúng không ạ? Đó chính là tìm kiếm. Filter  trả về 1 mảng có độ dài <= với độ dài mảng ban đầu.

Xét ví dụ sau :
```
let companyObject = dataCompany.filter((company) => {
              return company["companyId"] === companyId;
            })
```
3. Reduce 

Reduce thường được dùng nhiều cho việc tính toán, nó trả về một giá trị.

Xét ví dụ: 
```
let total_weight = animals.reduce((weight, animal, index, animals) => {
    return weight += animal.weight
}, 0)
```
Ngoài ra, thì có rất nhiều hàm khác, mình có thể tìm hiểu thêm ở  [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
.

Với các ví dụ đơn giản kể trên, ta đã hiểu hơn về cách sử dụng các hàm map, filter và reduce. Các hàm này sẽ càng tối ưu hơn với các dữ liệu hay mã code nhiều, phức tạp, mình khuyên các bạn nên tìm hiểu  về nó, vì nó khá hay và và đơn giản.

Trên đây là chia sẻ của mình về việc foreEach và các hàm trong javascript. Cám ơn các bạn đã đọc, mong bài viết của mình phần nào có thể giúp ích cho các bạn trong việc xử lí với array! 

Nguồn tham khảo: 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array