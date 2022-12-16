# Giới thiệu
Một ngày đẹp trời, bạn code xong, viết những dòng code thật cool, lấy dữ liệu và thay đổi chúng để hiển thị lên, bạn nhìn thấy lỗi undefined. Và thế là app của bạn bị crash. Cũng bực mình nhỉ?

![](https://images.viblo.asia/8a5c6135-a467-4b7c-aa98-4e524104e47c.png)

Nếu bạn đã theo đuổi JavaScript trong một thời gian, chắc hẳn lỗi trên không còn xa lạ với bạn nữa.
GIờ thì xử lý nó thôi. Biến `genres` đang bị `undefined`, cần thêm điều kiện `if` để đảm bảo cho trường hợp này.

```js
if (!loading && !error && genres.length) {
  // do something here
} else { 
  // handle if something evaluates to not true in the if statement
}
// program continues on its merry way
```
Vậy là app lại hoạt động bình thường.

Liệu có cách nào tốt hơn việc cứ phải kiếm tra giá trị của object trước khi truy cập thuộc tính của nó không?
 JavaScript chắc chắn cũng muốn giúp bạn xử lý trường hợp này.

Và đó là những gì mình muốn giới thiệu trong bài viết này, toán tử optional chaining  `?.`. 

Toán tử optional chaining là một đề xuất hiện đang ở Stage 4, cho phép xử lý short-circuiting nếu tham chiếu bị `null` hoặc `undefined` thì trả về giá trị `undefined` thay vì ném ra lỗi từ đó chương trình không thể tiếp tục. Điều này giúp các biểu thức ngắn và đơn giản hơn khi truy cập các thuộc tính của đối tượng mà khả năng tồn tại mà tham chiếu là chưa được đảm bảo.

## Cú pháp của toán tử optional chaining (?.)
Nghe tiêu đề có vẻ hơi phức tạp, cú pháp của nó chẳng phải là `?.` rồi sao, nhưng ở phần này, mình muốn giải thích kỹ hơn về cú pháp của toán tử trong từng trường hợp với example code sẽ giúp bạn thấy hiểu rõ hơn về nó.
### Optional chaining với object

```js
let possibleNull = null;
let value = 0;
let result = possibleNull?.[value++];
console.log(value); // 0 as value was not incremented
```
Mặc dù biến `possibleNull` đang là `null`,  nhưng kết quả vẫn không trả về lỗi bởi vì toán tử `?.` đã giúp bạn xử lý nó. Nó sẽ bỏ qua đoạn đó và tiếp tục thực hiện chương trình, vì vậy mà biến value lúc này sẽ không tăng giá trị, vẫn giữ nguyên là 0. 

### Optional chaining với thuộc tính của object
Dưới đây là ví dụ của optional chanining khi truy cập thuộc tính của object
```js
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined
```
Nếu toán hạng bên trái của `?.` là null hoặc undefined, biểu thức tính toán sẽ có giá trị là `undefined`.

Bạn cũng có thể sử dụng toán tử optional chaining khi truy cập vào thuộc tính là biểu thức sử dụng dấu ngoặc vuông như trường hợp dưới đây: 
```js
let nestedProp = myObj?.['prop' + 'Name'];
```

### Optional chaining với gọi hàm
Bạn có thể sử dụng nó trong trường hợp gọi một hàm chưa chắc đã tồn tại.
```js
let response = someInterface.customFunction?.();
```
Bằng việc sử dụng optional chaining với function call, biểu thức sẽ ngay lập tức trả về `undefined` thay vì ném ra một exception nếu method không được tìm thấy.  Nó sẽ vô cùng hữu ích khi bạn sử dụng API với phương thức không có sẵn, do version hoặc do phương thức đó không hỗ trợ trên thiết bị người dùng...

### Truy cập phần tử của mảng với optional chaining
Mảng với optional chaining cũng khá thú vị, bạn có thể truy cập phần tử bằng cách truyền vào index, và nếu index đó không tồn tại trong mạng, chương trình cũng sẽ không bị lỗi.
```js
let arr = [1,2,3]
let arrayItem = arr?.[3];
console.log(arrayItem) // prints: undefined
```
### Stacked optional chaining
Một điều cực cool nữa là bạn có thể sử dụng  optional chaining nhiều lần với cùng một nested object

```js
let customer = {
  name: "Sean",
   details: {
    age: 43,
    location: "Trinidad" // detailed address and subscription service frequency is unknown
  }
};

let customerSubscription = customer.details?.subscription?.frequency;
console.log(customerSubscription); // prints: undefined
let customerCity = customer.details?.address?.city;
console.log(customerCity); // prints: undefined
```
Cả 2 biến `customerSubscription` và `customerCity` đều cho kết quả cuối cùng là `undefined` bởi vì chúng không được định nghĩa ở object `customer`. 
Và bạn cũng có thể làm tương tự với function. Ví dụ như:
```js
let duration = vacations.trip?.getTime?.();
```
### Kết hợp với toán tử nullish coalescing

Toán tử nullish coalescing (cũng trong đề xuất của Stage 4) được viết là` ??` là một toán tử logic trả về toán hạng bên phải khi toán hạng bên trái của nó là null hoặc `undefined`, các trường hợp khác thì trả về toán tử bên trái. Ví dụ:
```js
const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0
```

Giờ kết hợp 2 toán tử lại, bạn sẽ được như ở ví dụ này:
```js
let customer2 = {
  name: "Paige",
  details: { 
    age: 30 // once again a city is not provided on this object
  }
};
const customerCity2 = customer2?.city ?? "City not provided";
console.log(customerCity2); // prints: "City not provided"
```

Khi không tồn tại thuộc tính `city`, trước hết nhờ `?.` nó trở thành `undefined`, tiếp theo, toán tử `??` sẽ set nó thành toán hạng bên phải "City not provided".

Vậy là bạn có thể tạo ra giá trị mặc định khi thuộc tính bị bỏ quên, giảm thiểu thời gian debug code chỉ vì bad data. Thật tuyệt phải không nào. 😀
## Kết luận

Toán tử optional chaining giúp chúng ta giảm thiểu lỗi khi giá trị của object hoặc function không tồn tại. Vì nó vẫn là đề xuất ở Stage 4 tại thời điểm viết bài này, nó chưa được hỗ trợ đầy đủ bởi tất cả các trình duyệt hoặc được chuẩn hóa thành JavaScript. Chrome, Firefox và Opera đã hỗ trợ nó, Edge, Safari và Internet Explorer thì chưa.

Cảm ơn bạn đã theo dõi bài viết, hy vọng bạn sẽ đưa nó vào sử dụng khi toán tử này được chuẩn hóa chính thức, và nó sẽ giúp bạn đơn giản hóa code hơn nhiều đấy.

Nguồn: https://itnext.io/javascripts-optional-chaining-proposal-bc9e6e5f2877