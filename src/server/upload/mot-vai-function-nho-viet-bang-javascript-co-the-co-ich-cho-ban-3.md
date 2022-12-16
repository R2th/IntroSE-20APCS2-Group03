# findLastIndex
Trả về index của phần tử cuối cùng match với hàm được cung cấp.

Sử dụng Array.prototype.map () để ánh xạ từng phần tử vào một mảng với index và value. Sử dụng Array.prototype.filter () để loại bỏ các phần tử mà fn trả về giá trị false, Array.prototype.pop () để lấy phần tử cuối cùng. -1 là giá trị mặc định khi không tìm thấy.

```javascript
const findLastIndex = (arr, fn) =>
  (arr
    .map((val, i) => [i, val])
    .filter(([i, val]) => fn(val, i, arr))
    .pop() || [-1])[0];
    
 
EXAMPLES
findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2 (index of the value 3)
findLastIndex([1, 2, 3, 4], n => n === 5); // -1 (default value when not found)

```

# initializeArrayWithRange
Khởi tạo một mảng chứa các số trong phạm vi được chỉ định trong đó `start`mặc định bắt đầu từ  0 và `end` cùng với `step`  (bước nhảy) mặc định là 1

Sử dụng Array.from () để tạo một mảng có độ dài mong muốn, `(end - start + 1) / step` và một hàm ánh xạ để fill nó với các giá trị mong muốn trong phạm vi đã cho. 

```javascript
const initializeArrayWithRange = (end, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end - start + 1) / step) }, (v, i) => i * step + start);
  
  EXAMPLES
initializeArrayWithRange(5); // [0,1,2,3,4,5]
initializeArrayWithRange(7, 3); // [3,4,5,6,7]
initializeArrayWithRange(9, 0, 2); // [0,2,4,6,8]

```


# isSorted
Trả về 1 nếu mảng được sắp xếp theo thứ tự tăng dần, -1 nếu nó được sắp xếp theo thứ tự giảm dần hoặc 0 nếu nó không được sắp xếp.

Sử dụng Object.entries () để lặp qua các đối tượng mảng và so sánh chúng theo cặp. Trả về 0 nếu `direction` thay đổi hoặc `direction` nếu đã tới phần tử cuối.
```
const isSorted = arr => {
  let direction = -(arr[0] - arr[1]);
  for (let [i, val] of arr.entries()) {
    direction = !direction ? -(arr[i - 1] - arr[i]) : direction;
    if (i === arr.length - 1) return !direction ? 0 : direction / Math.abs(direction);
    else if ((val - arr[i + 1]) * direction > 0) return 0;
  }
};
EXAMPLES
isSorted([0, 1, 2, 2]); // 1
isSorted([4, 3, 2]); // -1
isSorted([4, 3, 5]); // 0

```

# filterNonUniqueBy
Lọc ra các giá trị không duy nhất trong một mảng, dựa trên hàm so sánh được cung cấp.

Sử dụng `Array.prototype.filter ()` và `Array.prototype.every ()` cho một mảng chỉ chứa các giá trị duy nhất, dựa trên hàm so sánh, fn. Hàm so sánh có bốn đối số: các giá trị của hai phần tử được so sánh và các chỉ mục của chúng.

```
const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));
  
  EXAMPLES
filterNonUniqueBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 2, value: 'c' } ]

```


# mapObject
Ánh xạ các giá trị của một mảng tới một đối tượng bằng cách sử dụng hàm.

Sử dụng `Array.prototype.reduce ()` để áp dụng `fn` cho từng phần tử trong `arr` và kết hợp các kết quả thành một object. Sử dụng `el` làm key cho mỗi thuộc tính và kết quả của `fn` làm value.
```
const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

EXAMPLES
mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

```


# longestItem
Lấy bất kỳ số lượng đối tượng hoặc đối tượng lặp lại có thuộc tính `length` và trả về đối tượng dài nhất. Nếu nhiều đối tượng có cùng độ dài, đối tượng đầu tiên sẽ được trả về. Trả về `undefined` nếu không có đối số được cung cấp.

Sử dụng `Array.prototype.reduce ()`, so sánh `length` của các đối tượng để tìm ra đối tượng dài nhất.
```
const longestItem = (...vals) => vals.reduce((a, x) => (x.length > a.length ? x : a));

EXAMPLES
longestItem('this', 'is', 'a', 'testcase'); // 'testcase'
longestItem(...['a', 'ab', 'abc']); // 'abc'
longestItem(...['a', 'ab', 'abc'], 'abcd'); // 'abcd'
longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
longestItem([1, 2, 3], 'foobar'); // 'foobar'

```

# reducedFilter
Lọc một mảng các đối tượng dựa trên một điều kiện đồng thời lọc ra các khóa không xác định.

Sử dụng `Array.prototype.filter ()` để lọc mảng dựa trên hàm `fn` để nó trả về các đối tượng mà điều kiện trả về matched. Trên mảng đã lọc, sử dụng `Array.prototype.map ()` để trả về object mới bằng `Array.prototype.reduce ()` để lọc các key không được cung cấp làm `keys` đối số.

```
const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );
  
  EXAMPLES
const data = [
  {
    id: 1,
    name: 'john',
    age: 24
  },
  {
    id: 2,
    name: 'mike',
    age: 50
  }
];

reducedFilter(data, ['id', 'name'], item => item.age > 24); // [{ id: 2, name: 'mike'}]

```

# shank
Có chức năng tương tự như `Array.prototype.splice ()`, nhưng trả về một mảng mới thay vì làm thay đổi mảng ban đầu.

Sử dụng `Array.prototype.slice ()` và `Array.prototype.concat ()` để có được một mảng mới với nội dung mới sau khi loại bỏ các phần tử hiện có hoặc thêm các phần tử mới. Bỏ qua đối số thứ hai, `index`, để bắt đầu từ 0. Bỏ qua đối số thứ ba, `delCount`, để loại bỏ 0 phần tử. Bỏ qua đối số thứ tư, các `elements`, để không thêm bất kỳ phần tử mới nào.

```
const shank = (arr, index = 0, delCount = 0, ...elements) =>
  arr
    .slice(0, index)
    .concat(elements)
    .concat(arr.slice(index + delCount));
EXAMPLES
const names = ['alpha', 'bravo', 'charlie'];
const namesAndDelta = shank(names, 1, 0, 'delta'); // [ 'alpha', 'delta', 'bravo', 'charlie' ]
const namesNoBravo = shank(names, 1, 1); // [ 'alpha', 'charlie' ]
console.log(names); // ['alpha', 'bravo', 'charlie']

```

# takeRightWhile
Loại bỏ các phần tử từ cuối một mảng cho đến khi hàm được truyền trả về `true`. Trả về các phần tử bị loại bỏ.

Lặp lại qua mảng, sử dụng `Array.prototype.reduceRight ()` và tích lũy các phần tử trong khi hàm trả về giá không khớp

```
const takeRightWhile = (arr, func) =>
  arr.reduceRight((acc, el) => (func(el) ? acc : [el, ...acc]), []);
EXAMPLES
takeRightWhile([1, 2, 3, 4], n => n < 3); // [3, 4]

```

# uniqueElementsByRight
Trả về tất cả các giá trị duy nhất của một mảng, dựa trên hàm so sánh được cung cấp, bắt đầu từ bên phải.

Sử dụng `Array.prototype.reduceRight ()` và `Array.prototype.some ()` cho một mảng chỉ chứa lần xuất hiện duy nhất cuối cùng của mỗi giá trị, dựa trên hàm so sánh, `fn`. Hàm so sánh có hai đối số: các giá trị của hai phần tử được so sánh.

```
const uniqueElementsByRight = (arr, fn) =>
  arr.reduceRight((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);
EXAMPLES
uniqueElementsByRight(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'e' }, { id: 1, value: 'd' }, { id: 2, value: 'c' } ]

```