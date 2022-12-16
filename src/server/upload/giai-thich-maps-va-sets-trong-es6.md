## Giới thiệu
Đây là bài giới thiệu ngắn gọn về kiểu dữ liệu Map và Set trong Javascript. Map và Set là các kiểu dữ liệu mới được giới thiệu trong ES6. Bài viết này sẽ giải thích theo các use case thực tế, và các lý do sử dụng Map và Set thay cho Array và Object.

## Javascript Set
Đầu tiên, chúng ta sẽ tạo một mảng mẫu bao gồm các số tự nhiên từ 1 đến 5, sau đó chúng ta sẽ chuyển mảng đó sang kiểu Set.
```
    const myArray = [1, 2, 3, 4, 5];
    const mySet = new Set(myArray);
```

Đối tượng Set cho phép bạn lưu trữ các giá trị duy nhất thuộc bất kì kiểu nào, cho dù là kiểu giá trị nguyên thuỷ(primitive value) hay kiểu đối tượng tham chiếu(object reference).

Vậy Set sử dụng cho mục đích gì?

Ứng dụng thực tế đầu tiên là sử dụng Set để loại bỏ tất cả các giá trị trùng lặp từ một mảng. Chúng ta chỉ cần tạo một `set` mới và truyền vào tham số là mảng mà chúng ta đã có sẵn ở trên.

Bây giờ, nếu chúng ta thêm các giá trị trùng lặp vào mảng của chúng ta ở trên và `set` của chúng ta sẽ tự động loại bỏ chúng (các giá trị trùng lặp) cho chúng ta. Hãy thử làm một demo:

```
    const myArray = [1, 2, 3, 4, 5, 5, 5, 2];
    const mySet = new Set(myArray);
    console.log(mySet);
    // Set {1, 2, 3, 4, 5};
```

Chúng ta thấy rằng `mySet` chỉ chứa các giá trị duy nhất.

Chúng ta có thể dễ dàng chuyển dạng dữ liệu `Set` về `Array` bằng toán tử `spread operator`.

```
    const uniqueArray = [...mySet];
    console.log(uniqueArray);
    // [1, 2, 3, 4, 5]
```

### Các phương thức của kiểu dữ liệu Set
`Set` hỗ trợ các phương thức khác nhau cho phép chúng ta xử lý dữ liệu bên trong nó một cách dễ dàng.

#### set.add()
    - Sử dụng add để thêm một phần tử bất kì vào `set` của chúng ta.
    - Như đã đề cập ở trên, đó có thể là kiểu nguyên thuỷ hay mảng hoặc object.
```
    mySet.add(6);
    mySet.add('6');
    mySet.add({ channelName: 'JavaScript Mastery' });
    mySet.add([ 1, 2, 3 ]);
```
#### set.delete()
    - Sử dụng để xoá phần tử mong muốn khỏi một set
```
    mySet.delete(5);
```

#### set.clear()
    - Sử dụng để xoá tất cả các phần tử trong một set
```
    mySet.clear();
```

#### set.has()
    - Giống với phương thức array.includes(), dùng để check xem một giá trị có thuộc set hay không.
```
    console.log(mySet.has(5));
```

#### set.size()
    - Trả về tổng số phần tử của một set
```
    console.log(mySet.size);
```

### Sự khác nhau giữa Array và Set
- Mảng là một danh sách có thứ tự của các object. Chúng ta có thể truy xuất tới một phần tử của mảng qua vị trí tham chiếu của nó trong mảng:
```
    myArray[3]
```
- Set là một nhóm các phần tử duy nhất (luôn có giá trị khác nhau). Vì `set` không có thứ tự nên ta không thể truy xuất tới các phần tử thông qua vị trị tham chiếu.

### Vậy khi nào ta nên sử dụng `Set` thay vì `Array`
- Đầu tiên, `Set` khác `Array`, nó được tạo ra không phải là để thay thế cho `Array` mà để bổ sung các kiểu hỗ trợ để giúp Array tiện dùng hơn.
- Vì `Set` chỉ chứa các phần tử duy nhất, nó giúp chúng ta dễ dàng hơn trong việc tránh lưu các giá trị trùng lặp vào cấu trúc dữ liệu của chúng ta.

## Javascript Map
Đối tượng Map chứa các cặp key - value và ghi nhớ thứ tự chèn ban đầu của các khoá.
Mọi giá trị (cả kiểu đối tượng và nguyên thuỷ) đều có thể được sử dụng hoặc là key hoặc là value.

Map là một cấu trúc dữ liệu có trong các ngôn ngữ lập trình khác nhau. Javascript lần đầu giới thiệu kiểu dữ liệu này trong ES6, và chúng cho phép bạn ánh xạ một giá trị bất kì này với một giá trị khác, điều quan trọng nhất là bạn có thể sử dụng các đối tượng như là các key của đối tượng `map`.

```
    const myMap = new Map([ [key, value] ]);
```

### Vấn đề mà `Map` giải quyết là gì?
Javascript chỉ hỗ trợ một đối tượng chính (one key object). Nếu chúng ta thêm vào nhiều đối tượng `key` khác, nó chỉ ghi nhớ cái cuối cùng, đó chính là lý do `map` được thêm vào.
```
    const myObject = {};
    const a = {};
    const b = {};

    myObject[a] = 'a';
    myObject[b] = 'b';

    console.log(myObject);
    // { '[object Object]': 'b' }
```
Trong trường hợp trên nếu sử dụng `Map` ta có thể lưu được tất cả các giá trị như sau:

```
    const a = {};
    const b = {};

    const myMap = new Map([ [ a, 'a'], [b, 'b'] ]);
    console.log(myMap);
    // Map { {} => 'a', {} => 'b' }
```
Như trên ta thấy `Map` có thể lưu nhiều đối tượng làm `key`.

### Các phương thức của `Map`
`Map` có nhiều phương thức giúp tương tác dữ liệu bên trong nó dễ dàng.
#### map.set()
Sử dụng để gán cặp key-value cho một `map`
```
    myMap.set(key, value);
```
Như đã đề cập ở trên, `key` có thể là một kiểu dữ liệu bất kì.
#### map.delete()
Dùng để xoá 1 phần tử khỏi mảng
```
    myMap.delete(5);
```
Chi tiết hơn có thể tham khảo thêm tại [đây.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
## Kết luận
Trên đây là tất cả những điều quan trọng về Map và Set. Chúc các bạn sớm thành công trên con đường trở thành pro JS developer.
[Link tham khao](https://www.freecodecamp.org/news/javascript-maps-and-sets-explained/)