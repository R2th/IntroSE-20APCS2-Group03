![image.png](https://images.viblo.asia/aa5ee8b4-79d8-4427-b4f1-6354dc048354.png)

Với rất nhiều phương thức xử lý, Array API là một trong những phương thức lớn nhất trong JavaScript. Lúc đầu, nó được dùng rất nhiều, nhưng sau đó càng ngày càng  bị lạm dụng, cụ thể như  phương thức như map() và forEach () 

Hiểu và xài đúng chổ các phương thức là rất quan trọng. Việc sử dụng sai có thể dẫn đến những lỗi khó chịu.
Trong bài viết này, chúng ta sẽ xem xét mười phương thức phiên bản hữu ích hơn của đối tượng JavaScript Array .

**1. Slice**

Nếu bạn muốn tạo một bản sao của một mảng theo chỉ mục đầu và cuối, bạn có thể muốn sử dụng slice (). Phương thức này là một hàm thuần túy nên nó sẽ không có bất kỳ tác dụng phụ nào, cũng không làm thay đổi mảng đích.

***“The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.” — MDN“The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.” — MDN***

Cả hai thông số đều là tùy chọn. Nếu được gọi mà không có tham số nào, nó sẽ chỉ sao chép toàn bộ đối tượng. Nếu bạn gọi nó chỉ với một tham số, nó sẽ cung cấp cho bạn một mảng có độ dài = 1. Bạn có thể sử dụng negative offset ể lấy các phần tử cuối cùng của mảng.

```
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(array.slice(2)) // output: array [3, 4, 5, 6, 7, 8]
console.log(array.slice(0,3)) // output: array [1, 2, 3]
console.log(array.slice()) // output: array [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Phương pháp này hữu ích khi bạn cần tạo các tập hợp con trên một mảng và không muốn mảng ban đầu của bạn bị thay đổi.

**2. Splice**

Phương pháp này tương tự như phương pháp trước nhưng có một điểm khác biệt lớn: **Nó sẽ thay đổi mảng ban đầu của bạn**. Nó rất hữu ích khi bạn đang xử lý một mảng lớn và bạn cần sử dụng một phần các tập con của nó.

`“The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.”— MDN`

```
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(array.splice(2)) // output: array [3, 4, 5, 6, 7, 8]
console.log(array.splice(0,3)) // output: array [1, 2]
console.log(array.splice()) // output: array []
```

**3. Includes**

Kiểm tra phần tử có trong mảng hay không và kết quả trả về là : `true` hoặc `false`

Để điều chỉnh hiệu suất, bạn có thể chuyển chỉ số bắt đầu làm tham số thứ hai. Chỉ số đó có thể âm hoặc dương. Nếu âm, nó sẽ kiểm tra các số x cuối cùng.

```
const array = [1,2,3,4,5];
>> undefined
array.includes(3)
>> true
array.includes(3,4)
>> false
array.includes(3,-3)
>> true
array.includes(3,-2)
>> false
```

Khi kết quả được tìm thấy, nó sẽ dừng tìm tiếp các phần tử còn lại giúp tiết kiệm hiệu suất hơn và ngắn gọn hơn là code sau:

```
function includes(array, target) {
  for (let i =0; i< array.length; i++) {
    if(array[i] === target) {
      return true;
    }
  }
  return false;
}
```

**4. Some**

Phương thức `some()` cũng tương tự phương thức `includes()` . Nó không làm thay đổi array truyền vào. Sự khác biệt của `some()` là cung cấp một  `callback` và bao gồm phương thức `includes()` dựa trên các đối tượng phù hợp. Một điểm khác nữa là nó không cho bạn thay đổi giá trị index đầu tiên.
Cú pháp:
arr.some(callback(element[, index[, array]])[, thisArg])
Giả sử có một mảng và ta muốn kiểm tra xem có bất cứ item nào lớn hơn 10 hay không, ta không thể dùng `includes()` trong trường hợp này. Dùng `some()` sẽ phù hợp hơn với tình huống này.
Ví dụ:
```
st array = [10, 30, 50, 10, 5];
const greaterThan10 = (element) => element > 10;
console.log(array.some(greaterThan10)); // outputs true
```

**5. Every**

Phương thức này giống như `some()`. Nhưng nó sẽ trả về `true` nếu như tất cả phần tử của mảng phù hợp với điều kiện kiểm tra, thay vì chỉ cần một phần tử như `some()`.
Cấu trúc:
`arr.every(callback(element[, index[, array]])[, thisArg])`
Ví dụ:

```
const array = [10, 30, 50, 10, 5];
const greaterThan10 = (element) => element > 10;
console.log(array.every(greaterThan10)); // outputs false
```

**6. Find**

Phương thức `find()` rất hữu ích khi cần tìm một phần tử thỏa điều kiện. 
Cấu trúc:

`arr.find(callback(element[, index[, array]])[, thisArg])`
Nó sẽ trả về phần tử đầu tiên phù hợp điều kiện tìm kiếm hoặc `undefined` nếu không có phần tử nào phù hợp.
Ví dụ:
```
const array = [10, 30, 50, 10, 5];
const greaterThan10 = (element) => element > 10;
console.log(array.find(greaterThan10)); // outputs 30
```

**7. Shift**
Phương thức này đơn giản và dễ hiểu. Nó xóa phần tử đầu tiên ra khỏi mảng và trả về phần tử đó. Hãy cẩn thận vì nó sẽ làm thay đổi mảng ban đầun.
Vậy nó khác gì với phương thức `pop()` ? Phương thức `pop()` sẽ xóa và trả về phần tử cuối của mảng thay vì đầu tiên như `shift()`.

Ví dụ:
```
const foo = [1, 2, 3];
const x = foo.shift(); // x is now 1
console.log(foo); // foo is now [2,3]
```

**8. Unshift**
Phương thức này dùng để thêm các phần tử vào mảng giống phương thức `push()` nhưng sẽ thêm vào đầu mảng.
Ví dụ:

```
const foo = [1, 2, 3];
const x = foo.unshift(4,5,6); // x is now 6 since it's the length of the array
console.log(foo); // foo is now [4, 5, 6, 1, 2, 3]
```

**9. FlatMap**
Trước khi hiểu phương thức FlapMap là gì, ta sẽ coi định nghĩa phương thức flat()
***“The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.” — MDN***
Tạm dịch: *phương thức `flat()` tạo một mảng mới với tất cả phần tử trong mảng con bên trong được nối lại với nhau một cách đệ quy theo chiều sâu.*
Tham số truyền vào là giá trị chiều sâu mà bạn muốn thay đổi với mảng của mình ( số mảng con được gọp lại vô mảng chính). Mặc định là 1.
Ví dụ:

```
const x = [1, 2, [3, [4 , 5 , 6]]];

x.flat(1);
// result [1, 2, 3, [4, 5, 6]]

x.flat(2);
// is equivalent to
x.reduce((acc, val) => Array.isArray(val) ? acc.concat(...val) : acc.concat(val), []).filter((item) => !!item);
// result [1, 2, 3, 4, 5, 6]
```
 Vậy flapMap() là một phương thức kết hợp giữa `map()` và `flat()`
 
***The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. It is identical to a map() followed by a flat() of depth 1, but slightly more efficient than calling those two methods separately. — MDN***

Tạm dịch: Phương thức flatMap() trrả về một mảng mới được cấu trúc bởi một hàm callback cho trước đến mỗi phần tử của mảng và sau đó sẽ flat các kết quả thành một cấp. Nó được chỉ rõ thành một map() với cấp độ của flat() là 1, nhưng được hiệu quả hơn là gọi 2 hàm riêng biệt.
Ví dụ:

```
const x = [1, 3, 5, 7];
x.flatMap(x => [x, x + 1]);

// is equivalent to
x.map(x => [x, x + 1]).flat();

// is equivalent to
x.reduce((acc, val) => acc.concat([val, val + 1]), []);

// result: [1, 2, 3, 4, 5, 6, 7, 8]
```

**10. Reduce**
Phương thức `reduce()` là một phương thức rất hữu ích và tiện lợi.
**“The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.” — MDN**
Tạm dịch: Phương thức `reduce()` thực thi một hàm reducer ( tự định nghĩa ) trên mỗi phần tử của mảng, kết quả trả về là một giá trị duy nhất.
Ví dụ: tạo một map với `reduce()`

```
function map(items, cb) {
    return items.reduce((acc, item) =>
        [...acc, cb(item)]
    , []);
}

const increaseBy1 = (item) => item + 1;

map([1,2,3], increaseBy1); // outputs [2, 3, 4]
```

**Tổng kết**
Có nhiều phương thức để xử lý mảng trong Javascript. Quan trọng là bạn phải hiểu rõ mục đích của chúng.
Nên tự hỏi trước khi dùng một phương thức, ví dụ như:
 - Đây có phải là phương thức tốt nhất cho trường hợp mình đang cần hay chưa?
 - Mình có cần thay đổi mảng hay không?
Sử dụng sai phương thức có thể dẫn đến hiệu suất kém hoặc tràn bộ nhớ. Trong trường hợp đơn giản, có thể không cần quan tâm nhiều đến hiệu suất, nhưng khi ứng dụng phát triển lớn lên, bạn phải chú ý nhiều đến hiệu suất của các phương thức này.
Là những kỹ sư phần mềm, đây chính là việc bạn cần phải chú ý đến hiệu suất hơn là việc chỉ làm cho code mình chạy được.
Cám ơn.

Nguồn: https://betterprogramming.pub/10-javascript-array-methods-to-boost-your-code-performance-acb57b455189