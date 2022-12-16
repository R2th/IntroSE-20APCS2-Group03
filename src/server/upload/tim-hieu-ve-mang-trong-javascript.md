# 1. Introduction
> Class `Array` cung cấp rất nhiều các phương thức hữu ích để chúng ta làm việc với mảng trong javascript. Trong bài hôm này chúng ta sẽ đi tìm hiểu các phương thức sẵn có đó để giúp việc lập trình vs javascript trở nên dễ dàng hơn.

# 2. Content
## 1. Array
* `Array` trong javascript cũng giống như trong các ngôn ngữ lập trình khác, là một tập hợp các giá trị như số, chữ... Trong javascript thì chúng ta có thể tạo ra một biến mảng bằng cách gán cho nó một mảng như sau:
    ```Javascript
    const arr = ['javascript', 'ruby'];
    ```
    hoặc bằng cách chỉ định nó là một `instance` của class `Array` như sau:
    ```Javascript
    const arr = new Array('javascript', 'ruby');
    ```
    và chúng ta có một kết quả tương tự nhau. Sau đó thì chúng ta có thể truy cập vào các phần tử trong mảng để lấy ra hoặc gán dữ liệu theo cùng một cách như nhau:
    ```Javascript
    const firstElem = arr[0];
    // firstElem = 'javascript';
    // Hoặc nếu muốn gán giá trị phần tử thứ 2 trong mảng bằng một giá trị khác:
    arr[1] = 'php';
    // arr sẽ bằng ['javascript', 'php'];
    ```
## 2. Array Methods
* Tiếp theo ở phần này tôi sẽ liệt kê cũng như giới thiệu qua các method hữu ích mà sau đó chúng ta sẽ đi sâu vào từng method ở các phần sau:



| Tên hàm | Giới thiệu hàm |
| -------- | -------- |
| Array.from() | Tạo một mảng mới |
| Array.isArray() | Trả về true nếu đối tượng trong ngoặc là mảng và false nếu ngược lại |
| Array.of() | Tạo một mảng mới từ các giá trị trong dấu () |
| Array.prototype.fill() | Fill các giá trị của mảng bằng giá trị được truyền vào |
| Array.prototype.filter() | Trả về một mảng mới thỏa mãn điều kiện truyền vào |
| Array.prototype.find() | Trả về phần tử đầu tiên thỏa mãn điều kiện truyền vào |
| Array.prototype.forEach() | Lặp qua các phần tử trong mảng với một hàm callback  |
| Array.prototype.indexOf() | Trả về giá trị index của tham số truyền vào trong mảng |
| Array.prototype.map() | Trả về một mảng mới sau khi thực hiện hàm callback được truyền vào với từng phần tử trong mảng |
| Array.prototype.reduce() | Hàm reduce sẽ biến đổi một mảng trở thành một số hoặc một kết quả rút gọn của mảng ban đầu |

## 4. Static Methods
#### 1. Array.isArray()
* Đây là một hàm rất đơn giản nhưng cũng rất hữu ích khi chúng ta muốn kiểm tra xem đối tượng đó có phải là một mảng hay không.
* Như ở trên ta có mảng `arr = ['javascript', 'ruby'];`
* Ta sẽ sử dụng hàm `isArray()` để kiểm tra
    ```Javascript
    Array.isArray(arr);
    // true
    Array.isArray(1);
    // false
    ```
#### 2. Array.from()
* Đây là cú pháp đầy đủ của hàm `from`
    ```Javascript
    Array.from(collection, mapFunction?, thisArgument?)
    ```
* Tham số đầu tiên là object dùng để tạo ra mảng mới, 2 tham số phía sau là tùy chọn. Tham số thứ 2 là một hàm callback chạy qua mỗi phần tử của collection trước khi được tạo thành mảng mới. Tham số thứ 3 là một giá trị sẽ được sử dụng như là `this` trong `callback function`.
* Xem ví dụ sau:
    ```Javascript
    function createArrayFromFunction() {
        return Array.from(arguments);
    }

    console.log(createArrayFromFunction(1, 2, 3));
    // (3) [1, 2, 3]

    // Hoặc ta có thể tạo trực tiếp
    console.log(Array.from([1, 2, 3]));
    // (3) [1, 2, 3]

    // Nếu muốn khi tạo mảng mới các phần tử sẽ được nhân đôi thì ta làm như sau
    console.log(Array.from([1, 2, 3], function(elem) {
        return elem * elem;
    }));
    // (3) [1, 4, 9]
    ```
    
#### 3. Array.of()
* Đây là cú pháp đầy đủ của hàm `of`
    ```Javascript
    Array.of(args0?, args1?, ...)
    ```
* Hàm này cho phép ta tạo ra mảng mới từ các phần tử được truyền vào trong ngoặc `()`.
* Hàm này khác với hàm `Array.new()` ở chỗ trong khi `Array.new(17)` sẽ tạo ra 1 mảng với 17 phần tử `undefined` còn `Array.of(17)` sẽ tạo ra 1 mảng có 1 phần tử là `17`;
* Xem ví dụ sau:
    ```Javascript
    console.log(Array.of(1, 2, '3'));
    // (3) [1, 2, "3"]
    ```
## 5. Array Prototype Methods
> Các methods dưới đây sẽ được sử dụng với thể hiện của mảng.
#### 1. Array.prototype.fill()
* Đây là cú pháp đầy đủ của hàm `fill`
    ```Javascript
    Array.prototype.fill(value, startPosition?, endPosition?)
    ```
* Hàm `fill` sẽ thay đổi tất cả phần tử của mảng trở thành giá trị nó được truyền vào, hoặc thay đổi một phần theo tham số thứ 2 và thứ 3 nhận được.
* Xem ví dụ sau
    ```Javascript
    // Ta có mảng sau
    const arr = ['javascript', 'ruby', 'php'];
    // Giờ tôi muốn đổi `ruby` và `php` thành `react` thì như lúc đầu giới thiệu ta có thể đổi trực tiếp bằng cách truy cập vào phần tử và đổi giá trị nhưng nếu nhiều phần tử thì cách đó sẽ không hiệu quả, nên tôi dùng hàm fill như sau
    console.log(arr.fill('react', 1, 3));
    // (3) ["javascript", "react", "react"]
    ```
#### 2. Array.prototype.filter()
* Đây là cú pháp đầy đủ của hàm `filter`
    ```Javascript
    Array.prototype.filter(callbackFunction, thisArgument?)
    ```
* Trong trường hợp bạn muốn lọc mảng ban đầu theo một điều kiện nào đó bạn có thể sử dụng hàm `filter` này, nó sẽ trả ra một mảng mới với điều kiện bạn muốn lọc.
* Xem ví dụ sau
    ```Javascript
    const arr = ['javascript', 'ruby', 'php'];
    // Giờ nếu ta muốn mảng mới chỉ có phần tử `ruby` thì ta làm như sau
    const newArr = arr.filter(function(elem) {
        return elem === 'ruby';
    });
    console.log(newArr);
    // ["ruby"]
    ```
* Hàm này mình hay sử dụng khi muốn làm ô search bằng javascript.
#### 3. Array.prototype.find()
* Đây là cú pháp đầy đủ của hàm `find`
    ```Javascript
    Array.prototype.find(callbackFunction, thisArgument?)
    ```
* Hàm `find` sẽ trả về phần tử đầu tiên tìm thấy theo điều kiện được truyền vào.
* Xem ví dụ sau
    ```Javascript
    const arr = ['javascript', 'ruby', 'php'];
    arr.find(function(elem) {
        return elem == 'ruby';
    });
    // ['ruby']
    ```

#### 4. Array.prototype.forEach()
* Đây là cú pháp đầy đủ hàm `forEach`
    ```Javascript
    Array.prototype.forEach(callbackFunction, thisArgument?)
    ```
* Hàm `forEach` cho phép chúng ta lặp hàm `callback` qua từng phần tử cuả mảng.
* Chú ý là trong `forEach` ta không thể break out được ra ngoài mà chỉ có thể throw ra được exception nên nếu cần thiết break ta nên dùng hàm `for`.
* Xem ví dụ sau
    ```Javascript
    const arr = ['javascript', 'ruby', 'php'];
    // Giả sử giờ ta muốn các phần tử đều có thêm chữ `programing language` ta làm như sau
    arr.forEach(function(elem) {
        return console.log(elem + ' programing language');
    });
    // javascript programing language
    // ruby programing language
    // php programing language
    ```
#### 5. Array.prototype.indexOf()
* Cú pháp đầy đủ của hàm `indexOf`
    ```Javascript
    Array.prototype.indexOf(elementToFind, start?)
    ```
* Hàm indexOf trả về chỉ số index của phần tử được tìm thấy trong mảng theo giá trị nhận được. Nếu không tìm thấy hàm sẽ trả về `-1`.
* Ta còn có thể truyền vào vị trí để bắt đầu tìm kiếm bằng tham số thứ 2 của hàm.
* Xem ví dụ sau
    ```Javascript
    const arr = ['javascript', 'ruby', 'php'];
    // Giờ ta muốn tìm index của phần tử `ruby` trong mảng trên
    const rubyIndex = arr.indexOf('ruby');
    // 1
    ```
#### 6. Array.prototype.map()
* Đây là cú pháp đầy đủ của hàm `map`
    ```Javascript
    Array.prototype.map(callbackFunction, thisArgument?)
    ```
* Hàm map trả về một mảng mới sau khi chạy hàm `callbackFunction` với mỗi phần tử.
* Xem ví dụ sau
    ```Javascript
    const arr = ['javascript', 'ruby', 'php'];
    
    // Giờ ta muốn trả ra 1 mảng mới với các phần tử đều được thêm chữ `language`
    const newArr = arr.map(function(elem) {
        return elem + ' language';
    });
    // (3) ["javascript language", "ruby language", "php language"]
    ```
    
#### 7. Array.prototype.reduce()
* Cú pháp đầy đủ của hàm `reduce`
    ```Javascript
    Array.prototype.reduce(callbackFunction, initialValue?)
    ```
* Hàm reduce thực hiện callbackFunction 1 lần cho mỗi phần tử trong mảng. Sau đó sẽ tính toán, xử lý và trả về một kết quả.
* Hàm reduce sẽ không thực hiện callbackFunction với các phần tử không có giá trị.
* Hàm callback sẽ có 4 tham số `previousValue`, `currentValue`, `currentIndex`, `arr`.
* Nếu khi chạy tham số `initialValue` không được truyền thì `previousValue` sẽ bằng phần tử đầu tiên còn `currentValue` sẽ bằng phần tử thứ 2 của mảng.
* Xem ví dụ sau
    ```Javascript
    const arr = [1, 20, 34, 11];
    
    // Giờ ta muốn tính tổng của mảng trên bằng hàm reduce, ta làm như sau
    const total = arr.reduce(function(a, b) {
        return a + b;
    });
    // 66
    
    ```

# 3. Conclusion
> Trên đây mình đã giới thiệu một vài hàm mình hay gặp trong quá trình làm việc với javascript. Hi vọng có thể giúp ích cho các bạn trong khi lập trình.

# 4. References
1. https://www.webucator.com/tutorial/advanced-javascript/index.cfm