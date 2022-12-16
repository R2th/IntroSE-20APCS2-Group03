Xin chào mọi người, hôm nay mình sẽ giới thiệu một số hàm xử lý với mảng trong JS, mong mọi người theo dõi

### 1) forEach

**forEach** được sử dụng để duyệt qua từng phần tử của mảng

Cú pháp:

> array.forEach(function(currentValue, index, arr), thisValue)

Trong đó

- **currentValue**: Giá trị hiện tại của phần tử
- **index**: Không bắt buộc, là vị trí của phần tử hiện tại
- **arr**: Không bắt buộc, là mảng mà chứa phần tử hiện tại
- **thisValue**: Không bắt buộc, nếu truyền vào thì nó sẽ được làm giá trị this của function, nếu không truyền this sẽ là **undefined**

**Ví dụ**

```js
const users = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
];
 
users.forEach(function (user) {
    console.log(user.name);
});
 
/*
Output:
 
A
B
C
*/
```

### 2) includes

**includes**: được sử dụng để check sự tồn tại của item nào trong mảng, Sẽ trả ra kết quả là **True** nếu như tìm thấy và người lại sẽ trả về là **false**

Cú pháp :

> array.includes(searchvalue, start)

Trong đó
- **searchvalue** là item cần kiểm tra trong mảng
- **start** là vị trí bắt đầu kiểm tra trong mảng, mặc định mang giá trị 0 tức là phương thức sẽ kiểm tra từ đầu mảng.

**Ví dụ**

```js
  const arr = [1, 2, 3, 4, 5, 6];

arr.includes(1); // output: true
arr.includes(1, 2); // output: false
```

### 3) filter

**filter**  được sử dụng để lọc các phần tử trong mảng theo một điều kiện mà bạn đặt ra. Hàm này sẽ trả về một mảng mới chứa các phần tử thỏa mãn điều kiện.

Cú pháp

> array.filter(function(currentValue, index, arr), thisValue)
> 


Trong đó
- **currentValue**: Giá trị hiện tại của phần tử
- **index**: Không bắt buộc, là vị trí của phần tử hiện tại
- **arr**: Không bắt buộc, là mảng mà chứa phần tử hiện tại
- **thisValue**: Không bắt buộc, nếu truyền vào thì nó sẽ được làm giá trị this của function, nếu không truyền this sẽ là **undefined**

**Ví dụ**

```js
const arr = [1, 2, 3, 4, 5, 6];

// lọc ra các phần tử  có giá trị lớn hơn 2
const result = arr.filter(num => num > 2);
console.log(result); // output: [3, 4, 5, 6]
```

### 4) reduce

**reduce** được sử dụng khi bạn muốn thực thi một callback lên từng phần tử (từ trái qua phải) với một biến được “tích lũy” để trả về một giá trị duy nhất.

Cú pháp

> array.reduce((prev, next, index, array) => {...}, initialValue)

Trong đó

- **prev**: biến tích lũy, truyền giá trị trả về của mỗi lần gọi callback, nó là giá trị tích lũy được trả về trong lần gọi callback trước, hoặc giá trị của tham số initialValue, nếu được cung cấp
- **next**: là giá trị của phần tử hiện tại
- **index**: Không bắt buộc, là vị trí của phần tử hiện tại.
- **arr**: Không bắt buộc, là mảng mà phần tử hiện tại thuộc về.
- **initialValue**: Giá trị cho tham số thứ nhất của hàm callback trong lần gọi đầu tiên. Nếu giá trị ban đầu này không được cung cấp, phần tử đầu tiên của mảng sẽ được dùng.

**Ví dụ**

```js
// TÍnh tổng của các phần tử trong mảng
const arr = [1, 2, 3, 4, 5, 6];
 
const sum = arr.reduce((total, value) => {
    return total + value;
}, 0);
 
console.log(sum); // output: 21
```

### 5) some
**Some** Được sử dụng để kiểm tra một mảng có thỏa mãn điều kiện của bạn hay không

Cú pháp

> array.some(function(currentValue, index, arr), thisValue)

Trong đó

- **currentValue**:  giá trị của phần tử hiện tại
- **index**: Không bắt buộc, là vị trí của phần tử hiện tại.
- **arr**: Không bắt buộc, là mảng mà phần tử hiện tại thuộc về.
- **thisValue**: Không bắt buộc, nếu truyền vào thì nó sẽ được làm giá trị this của function, nếu không truyền this sẽ là **undefined**

**Ví dụ**

```js
const arr = [1, 2, 3, 4, 5, 6];

// kiểm tra xem mảng có phần tử nào lớn hơn 7 không
const result = arr.some(num => num > 7);
console.log(result); // output: false 
// kiểm tra xem các phần từ có lớn hơn 0 hay không
const result = arr.some(num => num > 0);
console.log(result); // output: true
```

### 6) every
**every** Hàm này thì hơi khác hàm **some** một chút đó là nó sẽ check hết các phần tử trong mảng thỏa mãn điều kiện rồi trả về **true** hoặc **false**

Cú pháp

> array.every(function(currentValue, index, arr), thisValue)

- **currentValue**:  giá trị của phần tử hiện tại
- **index**: Không bắt buộc, là vị trí của phần tử hiện tại.
- **arr**: Không bắt buộc, là mảng mà phần tử hiện tại thuộc về.
- **thisValue**: Không bắt buộc, nếu truyền vào thì nó sẽ được làm giá trị this của function, nếu không truyền this sẽ là **undefined**

**Ví dụ**

```
const arr = [1, 2, 3, 4, 5, 6];

// Kiểm tra xem các phần tử trong mảng có phải toàn là số lẻ hay không

let isOddArray = arr.every(item => {
    return item % 2 !== 0;
});

console.log(isOddArray); // false
```

### 7) map

**map** hàm **map** sẽ tạo ra một array mới duyệt qua các phần tử và áp dụng 1 biểu thức logic – biểu thức này được cung cấp qua 1 hàm **callback**.

Cú pháp

> array.map(function(currentValue, index, arr), thisValue)


Trong đó

- **currentValue**:  giá trị của phần tử hiện tại
- **index**: Không bắt buộc, là vị trí của phần tử hiện tại.
- **arr**: Không bắt buộc, là mảng mà phần tử hiện tại thuộc về.
- **thisValue**: Không bắt buộc, nếu truyền vào thì nó sẽ được làm giá trị this của function, nếu không truyền this sẽ là **undefined**

**Ví dụ**

```js
const arr = [1, 2, 3, 4, 5, 6];

// nhân đôi giá trị của các phần tử trong mảng

var result = arr.map(item => {
  return item * 2;
});
 
console.log(result); //  [2, 4, 6, 8, 10, 12]
```

### 8) pop

Hàm array.pop() có chức năng xóa bỏ phần tử cuối cùng của mảng, hàm sẽ trả về phần tử bị xóa, ngoài ra thì để loại bỏ phần tử đầu tiên của mảng thì ta có thể sử dụng hàm array.shift()

Cú pháp

> array.pop()

Hàm array.pop() không có tham số truyền vào.

**Ví dụ**

```js
const arr = [1, 2, 3, 4, 5, 6];

console.log(arr.pop()); // 6
console.log(arr.pop()); // 5
console.log(arr.pop()); // 4
console.log(arr); // [1, 2, 3]
```

### 9) push
**push** được sử dụng để thêm mới một phần tử vào cuối mảng, hàm trả về chiều dài của mảng mới, ngoài ra nếu bạn muốn thêm phần tử vào vị trí đầu tiên của mảng thì có thể sử dụng hàm array.unshift()

Cú pháp

> array.push(item1, item2, ..., itemX)

Trong đó

- item1, item2, ..., itemX là các phần tử sẽ được thêm vào cuối mảng array.

**Ví dụ**

```js
const arr = [1, 2, 3, 4, 5, 6];

arr.push(7, 8, 9)

console.log(arr); // output [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 10) sort
**sort()** được sử dụng khi bạn muốn sắp xếp các phần tử trong mảng theo chiều tăng dần hoặc giảm dần.
Mặc định phương thức sort() sẽ sắp xếp mảng theo thứ tự bảng chữ cái theo chiều tăng dần.

Cú pháp

> array.sort(compareFunction)

Trong đó

**compareFunction** là tham số không bắt buộc. Nó là một hàm định nghĩa thứ tự sắp xếp, hàm này nên được trả về giá trị âm, 0 hoặc dương tùy thuộc vào tham số của nó, khi phương thức sort so sánh 2 giá trị, nó sẽ gửi các giá trị đó đến hàm này, và sắp xếp chúng dựa vào kết quả trả về của hàm này

**Ví dụ**

```js
const arr = [1, 3, 2, 4, 6, 5];

const alpha = ['d', 'a', 'u'];

// sắp xếp theo thứ tự giảm dần
descOrder = arr.sort((a, b) => a > b ? -1 : 1);
console.log(descOrder); // output: [6, 5, 4, 3, 2, 1]

// sắp xếp theo thứ tự tăng dần
ascOrder = alpha.sort((a, b) => a > b ? 1 : -1);
console.log(ascOrder); // output: ["a", "d", "u"]
```


### 11) from

**array.from()** Cho phép bạn tạo các array từ một kiểu dữ liệu khác

Cú pháp

> Array.from(object, mapFunction(currentValue, index), thisValue)

Trong đó

- **object**: Bắt buộc, là đối tượng bạn muốn chuyển sang dạng mảng
- **mapFunction(currentValue, index)**: Không bắt buộc, là một function hoạt động tương tự như array.map, sẽ duyệt lần lượt trên từng phần tử mảng.
- **currentValue**:  giá trị của phần tử hiện tại
- **index**: Không bắt buộc, là vị trí của phần tử hiện tại.
- **thisValue**: Không bắt buộc, nếu truyền vào thì nó sẽ được làm giá trị this của mapFunction, nếu không truyền this sẽ là **undefined**

**Ví dụ**

```js
const name = 'javascript';
const nameArray = Array.from(name);

console.log(name); // output: javascript
console.log(nameArray); // output: ['j', 'a', 'v', 'a', 's', 'c', 'r', 'i', 'p', 't']
```

### 12) slice

Hàm slice có chức năng trích xuất một số phần tử của mảng, vị trí bắt đầu và kết thúc việc trích xuất sẽ được xác định bởi tham số truyền vào hàm
Hàm sẽ trích xuất không bao gồm phần tử end truyền vào
Hàm sẽ trả về kết quả là một mảng mới bao gồm các phần tử được trích xuất.

Cú pháp

> array.slice(start, end)

Trong đó

- **start** là vị trí bắt đầu trích xuất.
- **end** là vị trí kết thúc, kết quả sẽ không bao gồm phần tử end.

**Ví dụ**

```js
const arr = [1, 3, 2, 4, 6, 5];

// Mảng newArr được trích từ mảng arr, trích từ phần tử index 1, tới phần tử index 3
const newArr = arr.slice(1, 3);

console.log(citrus); // [3, 2]
```

### 13) toString

toString() sẽ trả về một string từ mảng ban đầu, với các phần tử mảng ngăn cách nhau bằng dấu phẩy “,”.

Cú pháp

> array.toString()

Trong đó array là mảng cần chuyển đổi thành chuỗi.
Hàm này không có tham số

**Ví dụ**

```js
const arr = [1, 3, 2, 4, 6, 5];

console.log(arr.toString()); // "1,3,2,4,6,5"
```

### 14) concat
**concat** được sử dụng để gộp nhiều mảng lại với nhau, hàm sẽ trả về một mảng mới gồm giá trị của các mảng được truyền vào

Cú pháp

> array1.concat(array2, array3, ..., arrayX)

Trong đó

- array1,array2, array3, ..., arrayX là các mảng muốn nối lại với nhau

**Ví dụ**

```js
const arr1 = [1, 3, 2];

const arr2 = [4, 6, 5];

console.log(arr1.concat(arr2)); // [1, 3, 2, 4, 6, 5]
```

### 15) find

**find** được sử dụng để tìm kiếm một phần tử trong mảng thỏa mãn điều kiện, hàm sẽ trả về phần tử đầu tiên thỏa mãn điều kiện

Cú pháp

> array.find(function(currentValue, index, arr),thisValue)

Trong đó

- **currentValue**:  giá trị của phần tử hiện tại
- **index**: Không bắt buộc, là vị trí của phần tử hiện tại.
- **arr**: Không bắt buộc, là mảng mà phần tử hiện tại thuộc về.
- **thisValue**: Không bắt buộc, nếu truyền vào thì nó sẽ được làm giá trị this của function, nếu không truyền this sẽ là **undefined**

**Ví dụ**

```js
const arr = [1, 3, 2, 4, 6, 5];

const result = arr.find(item => item === 6);

console.log(result) //o output: 6
```

**Lời kết**

Như vậy mình đã giới thiệu một  số hàm xử lý với mảng trong JS, ngoài ra còn nhiều hàm xử lý khác nữa mọi người có thể xem thêm [tại đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array?retiredLocale=vi). Cám ơn mọi người đã theo dõi bài viết của mình

**Nguồn tham khảo**
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array?retiredLocale=vi