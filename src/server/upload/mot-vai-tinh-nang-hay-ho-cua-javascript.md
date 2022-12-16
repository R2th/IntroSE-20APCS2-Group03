### Khai báo và khởi tạo Array

Có thể sử dụng các giá trị mặc định như "", null hoặc 0; để khởi tạo một array có kích thước cụ thể. Các giá trị này có thể được sử dụng để khởi tạo một array có kích thước cụ thể với giá trị mặc định là "", null hoặc 0.

```
const array = Array(5).fill(''); 
// Output 
(5) ["", "", "", "", ""]

const matrix = Array(5).fill(0).map(()=>Array(5).fill(0)); 
// Output
(5) [Array(5), Array(5), Array(5), Array(5), Array(5)]
0: (5) [0, 0, 0, 0, 0]
1: (5) [0, 0, 0, 0, 0]
2: (5) [0, 0, 0, 0, 0]
3: (5) [0, 0, 0, 0, 0]
4: (5) [0, 0, 0, 0, 0]
length: 5
```

### Tìm ra giá trị tổng, giá trị nhỏ nhất hoặc lớn nhất

Để tìm nhanh các phép toán cơ bản này, sử dụng *reduce*.

```
const array  = [5,4,7,8,9,2];
Sum
array.reduce((a, b) => a + b);
// Output: 35
Max
array.reduce((a, b) => a > b ? a : b);
// Output: 9
Min
array.reduce((a, b) => a < b ? a : b);
// Output: 2
```

### Sắp xếp một mảng chuỗi (string), số (number) hoặc đối tượng (object)

Có các phương thức có sẵn để sắp xếp chuỗi, chẳng hạn như *reverse()* và *sort()*. Nhưng còn mảng số và mảng đối tượng thì sao? Hãy thử xem một vài mẹo nhỏ để việc sắp xếp có thể sử dụng cho cả số lẫn đối tượng, theo thứ tự tăng hoặc giảm dưới đây.

```
Sort String Array
const stringArr = ["Hoa", "Lan", "Mai", "Trang"]
stringArr.sort()
// Output
(4) ["Hoa", "Lan", "Mai", "Trang"]

stringArr.reverse()
// Output
(4) ["Trang", "Mai", "Lan", "Hoa"]
__S.12__
Sort Number Array
const array = [40.100, 1, 5, 25, 10,];
array.sort(a, b). => a – b
// Output
(6) [1, 5, 10, 25, 40, 100]

array.sort((a.b) => (b - a);
// Output
(6) [100-40, 25, 10, 5, 1,]
__S.23__
Sort an array of objects
const objectArr =
     first_name: 'Minh', last_name: 'Trang',
     first_name: 'Thu',    last_name: 'Hoa',
     first_name: 'Van', last_name: 'Hieu' 
[];
objectArr.sort((a, b) => a.last_name.localeCompare(b.last_name));
// Output
(3) [{}, {}]
0: first_name: "Thu", last_name: "Hoa"
1: first_name: "Minh", last_name: "Trang"
2: first_name: "Van", last_name: "Hieu"
```

### Lọc các value false ra khỏi mảng

Có thể dễ dàng bỏ qua các false value như 0, undefined, null, false, hoặc "" bằng một mẹo dưới đây,

```
const array = [3,0, 6, 7, ''?, false]
array.filter(Boolean);
// Output
(3) [3, 6, 7, 7]
```

### Sử dụng các toán tử logic để đối phó với các loại điều khiện khác nhau

Có thể sử dụng các toán tử logic cơ bản như OR để giảm các trường hợp *If else* lồng nhau hoặc các trường hợp *switch*.

```
function doSomething(arg1){function doSomething (arg1)
 10;
// Set arg1-10 as the default, if it isn't already.
Return arg1
}

let foo = 10;
foo ===10 && doSomething()
// is the same as "foo == 10") then doSomething()
// Output: 10.

 doSomething();
// is the same as "foo!= 5" then doSomething()
// Output: 10.
```

### Loại bỏ các bản sao (duplicates)

Có lẽ đã từng sử dụng indexOf() kết hợp với vòng lặp for để chỉ trả về first index được tìm htayas, hoặc includes() mới hơn mà có trả về boolean true/false của một mảng để loại bỏ các bản sao. Dưới đây là hai cách tiếp cận nhanh hơn để loại bỏ.

```
const array = [5, 4, 7.8, 9, 2, 7.5]
array.filter((item,idx,arr) => arr.indexOf(item) === idx);
//
const nonUnique = [...new Set(array)];
// Output: (5, 4, 7, 8, 9, 2, 2)
```

### Tạo một Counter Object hoặc Map

Hầu hết thường yêu cầu giải quyết vấn đề bằng cách tạo một counter object hoặc map để theo dõi các biến dưới dạng keys với tần suất/số lần xuất hiện dưới dạng value.

```
let string = "kapilalipak" = {}; Const Table
for(let char of string) {For(let char string)
  table[char]=table[char]+1 || 1;
}
// Output
k. 2, a. 3, p. 2, i. 2, l. 2

And

const countMap = New Map()
  for (let i = 0; i < string.length; i++) {
    if (countMap.has(string[i])) {
      countMap.set(string[i], countMap.get(string[i]) + 1);
    } else {or else
      countMap.set(string[i], 1);
    }
  }
// Output
Map(5) "k” => 2, “a” => 3, “p” => 2, „i” => 2, „l” => 2
```

### Performance

Trong JS, cũng có thể nhận được thời gian thực thi code giống như google:
![](https://images.viblo.asia/e25e3453-3711-493d-9216-6bdcc677586d.png)
```
const firstTime = performance.now();
something();
const secondTime = performance.now();
console.log(`The something function took ${secondTime - firstTime} milliseconds.`);
```

### Hoán đổi giá trị với Array Destructuring
Cú pháp destructuring assignment là một biểu thức JS giúp giải nén các giá trị từ mảng hoặc thuộc tính từ các đối tượng thành các biến riêng biệt. Chúng ta có thể sử dụng để hoán đổi các giá trị một cách nhanh chóng, chẳng hạn như sau:

```
let a = 1, b = 2
[a, b] = [b, a]
console.log(a) // result -> 2
console.log(b) // result -> 1
```

Nguồn: Sưu tầm [tại đây](https://dev.to/)