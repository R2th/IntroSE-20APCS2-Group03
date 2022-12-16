## unzip
```javascript
const unzip = arr =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  );
```

```javascript
EXAMPLES
unzip([['a', 1, true], ['b', 2, false]]); // [['a', 'b'], [1, 2], [true, false]]
unzip([['a', 1, true], ['b', 2]]); // [['a', 'b'], [1, 2], [true]]

```

Dùng Array.prototype.map() để biến mỗi phần tử thành một mảng. Sử dụng Array.prototype.reduce () và Array.prototype.forEach () để mapping các giá trị được nhóm thành các mảng riêng lẻ.

## frequencies
```javascript
const frequencies = arr =>
  arr.reduce((a, v) => {
    a[v] = a[v] ? a[v] + 1 : 1;
    return a;
  }, {});
  
  
  EXAMPLES
  frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // { a: 4, b: 2, c: 1 }

```

Trả về một đối tượng với các giá trị duy nhất của một mảng và số lần xuất hiện của các giá trị.

Sử dụng Array.prototype.reduce () để mapping các giá trị duy nhất vào các key của đối tượng, thêm vào các key hiện có mỗi khi gặp cùng một giá trị.

## mostFrequent

```javascript
const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];
  
EXAMPLES
mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

```

Trả về phần tử xuất hiện nhiều nhất trong một mảng.

Sử dụng Array.prototype.reduce () để mapping các giá trị duy nhất vào các key của object, thêm vào các key hiện có mỗi khi gặp cùng một giá trị. Sử dụng Object.entries () trên kết quả kết hợp với Array.prototype.reduce () để nhận giá trị xuất hiện nhiều nhất trong mảng.

## isContainedIn

```javascript
const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (!b.some(e => e === v) || a.filter(e => e === v).length > b.filter(e => e === v).length)
      return false;
  }
  return true;
};
EXAMPLES
isContainedIn([1, 4], [2, 4, 1]); // true

```

Trả về true nếu các phần tử của mảng đầu tiên được chứa trong phần thứ hai bất kể thứ tự, sai khác.

Sử dụng vòng lặp for...of cho Tập Set được tạo từ mảng đầu tiên. Sử dụng Array.prototype.some () để kiểm tra xem tất cả các giá trị riêng biệt có được chứa trong mảng thứ hai hay không, sử dụng Array.prototype.filter () để so sánh số lần xuất hiện của từng giá trị riêng biệt trong cả hai mảng. Trả về false nếu số lượng của bất kỳ phần tử nào lớn hơn trong mảng thứ nhất so với phần tử thứ hai, ngược lại, true

## haveSameContents
```javascript
const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length) return false;
  return true;
};
EXAMPLES
haveSameContents([1, 2, 4], [2, 4, 1]); // true

```

Trả về true nếu hai mảng chứa các phần tử giống nhau bất kể thứ tự, sai khác.

Sử dụng vòng lặp for cho một Tập Set được tạo từ các giá trị của cả hai mảng. Sử dụng Array.prototype.filter () để so sánh số lượng xuất hiện của từng giá trị riêng biệt trong cả hai mảng. Trả về false nếu tổng số không khớp với bất kỳ phần tử nào, ngược lại trả về true

## weightedSample
```javascript
const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce((acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]), [])
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};
```

Trả về một phần tử ngẫu nhiên từ một mảng, sử dụng các trọng số được cung cấp làm xác suất cho mỗi phần tử.

Sử dụng Array.prototype.reduce () để tạo một mảng tổng một phần cho mỗi giá trị theo trọng số. Sử dụng Math.random () để tạo số ngẫu nhiên và Array.prototype.findIndex () để tìm chỉ mục chính xác dựa trên mảng được tạo trước đó. Cuối cùng, trả về phần tử của mảng với chỉ mục được sản xuất.

## JSONtoCSV
```javascript
const JSONtoCSV = (arr, columns, delimiter = ',') =>
  [
    columns.join(delimiter),
    ...arr.map(obj =>
      columns.reduce(
        (acc, key) => `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
        ''
      )
    )
  ].join('\n');
EXAMPLES
JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';'); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'

```
Chuyển đổi một mảng các đối tượng thành chuỗi giá trị được phân tách bằng dấu phẩy (CSV) chỉ chứa các cột được chỉ định.

Sử dụng Array.prototype.join (dấu phân cách) để kết hợp tất cả các tên trong các cột để tạo hàng đầu tiên. Sử dụng Array.prototype.map () và Array.prototype.reduce () để tạo một hàng cho mỗi đối tượng, thay thế các giá trị không tồn tại bằng các chuỗi trống và chỉ mapping giá trị trong các cột. Sử dụng Array.prototype.join ('\ n') để kết hợp tất cả các hàng thành một chuỗi.

## countBy
```javascript
const countBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
EXAMPLES
countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
countBy(['one', 'two', 'three'], 'length'); // {3: 2, 5: 1}

```
Nhóm các phần tử của một mảng dựa trên hàm đã cho và trả về số lượng phần tử trong mỗi nhóm.

Sử dụng Array.prototype.map () để mapping các giá trị của một mảng thành tên hàm hoặc thuộc tính. Sử dụng Array.prototype.reduce () để tạo một đối tượng, trong đó các khóa được tạo ra từ các kết quả được mapping.

## differenceBy

```javascript
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.map(fn).filter(el => !s.has(el));
};
EXAMPLES
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [2]
```

Trả về sự khác biệt giữa hai mảng, sau khi áp dụng hàm được cung cấp cho từng phần tử của cả hai mảng.

Tạo Tập Set bằng cách áp dụng fn cho từng phần tử trong b, sau đó sử dụng Array.prototype.map () để áp dụng fn cho từng phần tử trong a, sau đó Array.prototype.filter ()