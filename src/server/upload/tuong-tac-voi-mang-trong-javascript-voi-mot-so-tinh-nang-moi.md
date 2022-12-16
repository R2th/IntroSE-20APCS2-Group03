> Bài viết gốc [Vikas Yadav - Upgrade your JavaScript Array Knowledge](https://hackernoon.com/upgrade-your-javascript-array-knowledge-b917431408d0)

Hàng ngày JavaScript được thêm một số tính năng mới đôi khi chúng ta đang bận với công việc code hàng ngày mà vẫn tiếp tục sử dụng cách cổ truyền để giải quyết một số vấn đề cụ thể mà không biết có phương thức hoặc tính năng mới được thêm vào JavaScript phiên bản mới. Trong bài viết này sẽ đưa một số phương thức đã thêm vào `Array` trong phiên bản mới của JavaScript.

### Array.prototype.isArray

Khi có một object trong JavaScript làm sao để check có phải là một Array? Đây là một câu hỏi hay hỏi trong cuộc phỏng vấn. Thông thường nếu là lập trình viên biết sơ qua JavaScript sẽ dùng `typeof` nhưng `typeof` sẽ trả về `Object` đối với `Array`.

![isArray](https://images.viblo.asia/35180619-2b66-4104-8408-6200f110db02.png)

`typeof` không check được vậy có cách nào khác?
Giải pháp là sử dụng `Object.prototype.toString`

```
let arr = [1, 2, 3];
let obj = {name: 'Viblo', age: '4'};

Object.prototype.toString.call(arr);

Object.prototype.toString.call(obj);
```

![prototype_toString](https://images.viblo.asia/1648eb57-2167-41f0-8031-75d7f6e14872.png)

Vậy vấn đề đã được giải quyết. Với JavaScript phiên bản mới hơn có một phương thức `isArray`.

```
let arr = [1, 2, 3];
let obj = {name: 'Viblo', age: '4'};

Array.isArray(arr)

Array.isArray(obj);
```

![Array.isArray](https://images.viblo.asia/703f9146-b648-4e53-bdc1-110de9721f21.png)

Phương thức `isArray` hỗ trợ hầu hết các trình duyệt.

![isArray Browser compatibility](https://images.viblo.asia/931680e4-b528-4d22-a1d1-ba4f06374743.png)

Với những trình duyệt không hỗ trợ có thể dùng `polyfill` với [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) này.

### Array.prototype.includes

Khi chúng ta cần tìm liệu một item cho trước có phải tồn tại trong mảng hay không, chúng ta hay dùng `indexOf` và check kết quả lớn hơn `-1`.

```
let arr = [1,2,3,4];
let item = 4;
let result = arr.indexOf(item) > -1 ? 'exist' : 'do not exist';
console.log(result)
```

![indexOf](https://images.viblo.asia/c3f9ca77-812a-4855-ab9a-268426a2f940.png)

Thế nhưng chúng ta có thể dùng `includes` sẽ trả về `true` nếu item đó tồn tại trong mảng và ngược lại `false`.

```
let arr = [1,2,3,4];
let item = 4;
console.log(arr.includes(item));

console.log(arr.includes(5));
```

![includes](https://images.viblo.asia/33a4612e-7fef-47a4-8427-8e9d01fbd8e1.png)

Kiểm trả sự tương thích thấy rằng IE không được hỗ trợ. [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

![includes Browser compatibility](https://images.viblo.asia/cb07e460-7e35-4587-9933-b2b43b1eede0.png)

### Array.prototype.find

Phương thức này rất hữu ích nếu chúng ta có một mảng của các object và mục đích chúng ta muốn tìm một object với một điều kiện nhất định.

Đôi khi coder dùng `filter` để tìm object dựa trên điều kiện nhưng như chúng ta biết phương thức filter trả về một mảng đã lọc không chứa item trong mảng đó. Vậy mỗi khi cần phải lấy từ item đầu tiền từ mảng đã lọc.

```
let users = [{
  name: 'NVA'
}, {
  name: 'NVL'
}, {
  name: 'NTT'
}, {
  name: 'NTAT'
}];
// Tìm một user có tên NTAT với filter

let filteredUser = users.filter(user => user.name === 'NTAT');
console.log('array đã lọc => ', filteredUser);

// Vậy để dùng user cần phải filteredUser[0]
console.log('user đã lọc => ', filteredUser[0]);
```

![filter array](https://images.viblo.asia/6b21cf42-4cab-4088-a1ae-7a0c2edc5fe2.png)

Vẫn có giải pháp tốt hơn đó là phương thức `find`.

```
let users = [{
  name: 'NVA'
}, {
  name: 'NVL'
}, {
  name: 'NTT'
}, {
  name: 'NTAT'
}];
// Tìm một user có tên NTAT với find

let filteredUser = users.find(user => user.name === 'NTAT');

console.log('user đã lọc => ', filteredUser);
```

![array find](https://images.viblo.asia/fffc92d1-9ec9-48e8-a9c3-79f8f0dc3ab4.png)

Kiểm trả sự tương thích thấy rằng IE không được hỗ trợ. [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

![find Browser compatibility](https://images.viblo.asia/a9e888f2-2e46-43c8-8c4b-8672c56a5da7.png)

### Array.prototype.flat

Bạn từng gặp trường hợp với một mảng chứa phần tử cũng là mảng và cần gộp thành một mảng? Giải quyết như thế nào? Có thể dùng `reduce` và `concat` đó là cách để giải quyết vấn đề nhưng bây giờ có toán tử `flat` có thể giúp cho tới độ sâu truyền vào.

```
let arr = [1,2, [3,4,5]];
let result = arr.flat();

console.log(result);

let brr = [arr, [9, 8, 7]]
console.log('array level 2: ', brr);

console.log('array level 2 flatten: ', brr.flat(2));
```

![array flat](https://images.viblo.asia/dcf1f58b-e9e7-4d21-be8d-779bdc49cac1.png)

Trong trường hợp không biết độ sâu thì làm như thế nào? Quay lại sử dụng `reduce` và `concat`.

```
let arr = [1,2, [3,4,5,[6,7,8,9,10]]];
function flattenDeep(arr1) {
   return arr1.reduce((acc, val) => {
       return Array.isArray(val) ? 
           acc.concat(flattenDeep(val)) :
           acc.concat(val);
   }, []);
}
console.log(flattenDeep(arr))
```

![](https://images.viblo.asia/6125bbd9-feb5-48e7-847c-5724aed2decc.png)

Có một cách khác như [Matthew Hartman](https://medium.com/@matthewhartmanau) đã chỉ ra thì chỉ cần truyền `Infinity` thì mọi thứ sẽ được giải quyết và không cần dùng `reduce` và `concat` nữa.

```
let arr = [1,2, [3,4,5,[6,7,8,9,10]]];
let result = arr.flat(Infinity);
console.log(result);
```

![](https://images.viblo.asia/999987d0-07f5-42b6-913c-2651ae558b3f.png)

Với bài toán này có nhiều giải pháp nếu bạn không muốn sử dụng đệ quy có thể tham khảo [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) này.

Các trình duyệt hỗ trợ bởi phương thức này:

![](https://images.viblo.asia/fb6acb5b-cec5-4cd4-85a9-dcc9a310decb.png)

Đây là một số phương thức trong JavaScript có thể tận dụng được. 
Cảm ơn bạn đã đọc!