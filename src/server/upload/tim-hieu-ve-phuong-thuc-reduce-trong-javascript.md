Reduce là một phương thức sẵn có được sử dụng để thực thi một hàm lên các phần tử của mảng (từ trái sang phải) với một biến tích lũy để thu về một giá trị duy nhất. Là một phương thức quan trọng hay sử dụng trong lập trình hàm.

## Cú pháp
```rust
arr.reduce(callback( accumulator, currentValue[, index[, array]] ) {
  // return result from executing something for accumulator or currentValue
}[, initialValue])
```
### Tham số
 **callback** là hàm thực thi với từng phần tử của hàm, với 4 tham số là: accumulator, currentValue, index và array.

* **accumulator** biến tích lũy, được trả về sau mỗi lần gọi hàm callback.
* **currentValue** phần tử của mảng đang được xử lý.
* **index** (Optional) chỉ số của phần tử trong mảng đang được xử lý.
* **array** (Optional) mảng hiện tại gọi hàm reduce().

**initialValue** là giá trị cho tham số thứ nhất (accumulator) của hàm callback trong lần gọi hàm đầu tiên. Nếu giá trị này không được cung cấp thì giá trị phần tử đầu tiên của mảng sẽ được sử dụng.
### Giá trị trả về
chính là giá trị của accumulator sau lần gọi hàm callback cuối cùng.

## Ứng dụng
Giả sử rằng chúng ta có một mảng đại diện cho danh sách mua sắm của mình và chúng ta muốn tìm tổng chi phí của tất cả các phần tử trong đó trong trường hợp này, chúng ta có thể sử dụng hàm `reduce()` mảng js.

Ta lấy một ví dụ đơn giản về hàm `reduce()` và xem nó hoạt động như thế nào.
```javascript

const data = [5, 10, 15, 20, 25];

const res = data.reduce((total,currentValue) => {
  return total + currentValue;
});

console.log(res); // 75
```
1. Trong ví dụ trên `reduce()` tham số là một hàm với 2 tham số total và currentValue
2. Hàm `reduce()` quay vòng qua từng giá trị trong mảng giống như trong vòng lặp for.
3. Trong ví dụ cụ thể này, ta muốn thêm currentValue vào total.
4. Phép tính được lặp lại liên tục cho mỗi giá trị trong một mảng, nhưng mỗi khi giá trị currentValue thay đổi thành giá trị tiếp theo trong mảng thì sẽ di chuyển sang phải.
5. Khi không còn giá trị nào nữa trong mảng, phương thức `reduce()` trả về tổng giá trị.

### Cách hoạt động của reduce() trong Javascript.

Xem đoạn mã sau

```markdown
data = [2, 4, 6, 8, 10]

const reducer = (accumulator, currentValue, currentIndex, array) => accumulator + currentValue

result = data.reduce(reducer)

console.log(result)
```
`reduce()` tham số là một hàm với 4 tham số. Bây giờ, chúng ta hãy xem một bảng mô tả cho biết điều gì đang xảy ra trên mỗi lần lặp lại.

| callback iteration | accumulator | currentValue |currentIndex	|array|return value|
| -------- | -------- | -------- |-------|------|-----|
| first call     | 2     | 3     |1|[2, 4, 6, 8, 10]|6|
| second call | 6 | 6 |2|[2, 4, 6, 8, 10]|12|
| third call	     | 12     | 8     |3|[2, 4, 6, 8, 10]|20|
| fourth call | 20 | 10 |4|[2, 4, 6, 8, 10]	|30|
Giá trị được trả về bởi `reduce()` sẽ là giá trị của lệnh gọi lại cuối cùng là 30.
### Không truyền giá trị initialValue cho hàm reduce()
Nếu bạn không chuyển giá trị ban đầu, reducer sẽ giả định giá trị đầu tiên trong mảng của bạn làm giá trị ban đầu. Điều này hoạt động tốt trong một số ví dụ vì chúng tôi đã thêm danh sách các số.
```markdown
data = [11, 21, 19, 18, 46]

const reducer = (accumulator, currentValue) => accumulator + currentValue

result = data.reduce(reducer)

console.log(result)
```
**Output**
```shell
115
```
Trong ví dụ này, bạn có thể thấy rằng chúng ta chưa chuyển giá trị ban đầu vào hàm `reduce()`. Nó nhận phần tử đầu tiên làm giá trị ban đầu và bắt đầu reducing và sẽ cộng tất cả các phần tử và trả về một giá trị duy nhất làm đầu ra.
### Truyền một giá trị initialValue cho hàm reduce()
Nếu chúng ta chuyển giá trị ban đầu làm đối số, thì nó sẽ tự định vị là giá trị đầu tiên và sau đó nó sẽ bắt đầu reducing.
```markdown
data = [11, 21, 19, 18, 46]

const reducer = (accumulator, currentValue) => accumulator + currentValue

result = data.reduce(reducer, 29)

console.log(result)
```
**Output**
```shell
144
```
Trong ví dụ này, bạn có thể thấy rằng chúng ta đã chuyển giá trị ban đầu là 29 vào hàm reduce(). Điều đó có nghĩa là nó nhận 29 làm giá trị ban đầu và bắt đầu reducing và sẽ cộng tất cả các phần tử, bao gồm cả 29 và trả về một giá trị duy nhất dưới dạng đầu ra. Nếu bạn thấy trong đầu ra, thì bạn có thể xác minh rằng nó đã thêm 29 giá trị trong đầu ra cuối cùng.

Giá trị trả về của hàm `reduce()` được gán cho `accumulator`,  giá trị của nó được giữ lại qua mỗi lần lặp trong toàn mảng và chắc chắn trở thành giá trị kết quả cuối cùng, duy nhất.

### TypeError: Reduce() của một mảng trống và không có giá trị khởi tạo ban đầu initialValue.
Nếu một mảng trống và không có giá trị ban đầu nào được cung cấp, TypeError sẽ được ném ra.

```markdown
data = []

const reducer = (accumulator, currentValue) => accumulator + currentValue

result = data.reduce(reducer)

console.log(result)
```
**Output**
```swift
result = data.reduce(reducer)
              ^

TypeError: Reduce of empty array with no initial value
    at Array.reduce (<anonymous>)
    at Object.<anonymous> (/Users/krunal/Desktop/code/pyt/app.js:5:15)
    at Module._compile (internal/modules/cjs/loader.js:1128:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1167:10)
    at Module.load (internal/modules/cjs/loader.js:983:32)
    at Function.Module._load (internal/modules/cjs/loader.js:891:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
    at internal/main/run_main_module.js:17:47
```
Nếu mảng chỉ có một phần tử và không có giá trị ban đầu initialValue hoặc có giá trị ban đầu initialValue và mảng rỗng thì giá trị sẽ được trả về mà không cần gọi callback
```markdown
data = []

const reducer = (accumulator, currentValue) => accumulator + currentValue

result = data.reduce(reducer, 11)

console.log(result)
```
**Output**
```shell
11
```
### Chuyển mảng 2 chiều thành mảng 1 chiều
Chúng ta có thể sử dụng hàm `reduce()` để san bằng các phần tử lồng nhau thành một mảng.

Chúng tôi đặt một giá trị ban đầu cho mảng trống và sau đó nối giá trị hiện tại với total.

```rust
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const flatValues = data.reduce((total, value) => {
  return total.concat(value);
}, []);

console.log(flatValues); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
Bạn phải trả về một cái gì đó để một hàm `reduce()` hoạt động.

### Tìm trung bình bằng cách sử dụng phương thức reduce() trong Javascript.
Trong ví dụ trên, thay vì ghi lại tổng, những gì bạn có thể làm là chia tổng cho một độ dài của mảng trước khi bạn trả về giá trị cuối cùng.

Cách để làm điều này là sử dụng của các đối số khác trong hàm reduce() là **index** và **array**.

```javascript
const pounds = [11, 21, 16];

const avg = pounds.reduce((total, amount, index, array) => {
  total += amount;
  if (index === array.length - 1) {
    return total / array.length;
  } else {
    return total;
  }
});

console.log(avg); // 16
```

### Tìm phần tử trùng lặp trong mảng
Giả sử bạn có tập hợp các items và bạn muốn biết số lần xuất hiện của mỗi item trong tập hợp.

```objectivec
const pounds = [11, 21, 16, 19, 46, 29, 46, 19, 21];

const count = pounds.reduce( (data, pound) => {
  data[pound] = (data[pound] || 0) + 1 ;
  return data;
} , {})

console.log(count); // { '11': 1, '16': 1, '19': 2, '21': 2, '29': 1, '46': 2 }
```
Để kiểm đếm số lần xuất hiện của mỗi item trong một mảng, giá trị ban đầu của chúng ta phải là một đối tượng rỗng, không phải là một mảng trống.

Vì chúng ta sẽ trả về đối tượng, nên bây giờ chúng ta có thể lưu trữ các cặp key-value trong data.

Ở lần đầu tiên, chúng ta cần tên của key là giá trị hiện tại và cho nó giá trị là 1, Chúng ta muốn số lượng mỗi con số tăng lên nếu chúng lặp lại. Để làm điều đó ở lần lặp thứ 2 chúng ta sẽ check nếu data đã có key của giá trị hiện tại thì giá trị của key đó sẽ tăng thêm 1, nếu không có thì sẽ tạo key đó với giá trị là 1.

### Loại bỏ các item trùng lặp trong một mảng

Array.reduce() là một hàm hữu ích khi chúng ta phải loại bỏ các item trùng lặp trong mảng. Chúng ta có thể sử dụng một hàm array.push() và array.indexOf() với hàm array.reduce() để loại bỏ các mục trùng lặp khỏi mảng.

```swift
let data = [1, 2, 3, 1, 4, 3, 3, 5, 5, 5, 8, 9]
let myOrderedArray = data.reduce(function (accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue)
  }
  return accumulator
}, [])

console.log(myOrderedArray) // [1, 2, 3, 4, 5, 8, 9]
```
### Nhóm các đối tượng theo một thuộc tính

Chúng ta có thể nhóm các đối tượng theo thuộc tính của nó bằng phương thức array.reduce().
```javascript
let student = [
  { name: 'Rick', enrollment: 60 },
  { name: 'Beth', enrollment: 40 },
  { name: 'Jerry', enrollment: 40 }
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function (accumulator, obj) {
    let key = obj[property]
    if (!accumulator[key]) {
      accumulator[key] = []
    }
    accumulator[key].push(obj)
    return accumulator
  }, {})
}

let groupedStudent = groupBy(student, 'enrollment')
console.log(groupedStudent)
```
**Output**
```javascript
{
  '40': [
    { name: 'Beth', enrollment: 40 },
    { name: 'Jerry', enrollment: 40 }
  ],
  '60': [ { name: 'Rick', enrollment: 60 } ]
}
```
Trong ví dụ này, chúng ta đã nhóm đối tượng bằng cách sử dụng thuộc tính "enrollment". Trong đầu ra, bạn có thể thấy rằng enrollment 40 có hai đối tượng và 60 có một đối tượng. Đối tượng trả về có thuộc tính được nhóm và giá trị là đối tượng theo thuộc tính đó.
## Kết luận
Một lỗi phổ biến khác là quên trả lại giá trị. Bạn phải trả về một cái gì đó để một hàm reduce() hoạt động. Luôn kiểm tra kỹ và đảm bảo rằng bạn đang trả lại giá trị mà bạn muốn.

Hy vọng qua bài viết này, bạn hiểu hơn về Reduce và ứng dụng nó nhiều hơn trong các project của mình, giúp code trở nên rõ ràng, dễ hiểu hơn.