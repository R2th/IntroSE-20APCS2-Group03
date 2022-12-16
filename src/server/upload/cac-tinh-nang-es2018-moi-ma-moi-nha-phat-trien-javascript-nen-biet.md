## Spread Properties
Một trong những tính năng thú vị nhất được thêm vào ES2015 là spread operator. Toán tử này làm cho việc sao chép và hợp nhất các mảng đơn giản hơn rất nhiều. Thay vì gọi phương thức `concat()` hoặc `slice`, bạn có thể sử dụng toán tử `...`

Ví dụ:
`const arr1 = [1, 2, 3];

// make a copy of arr1
const copy = [...arr1];
console.log(copy);    // → [1, 2, 3]
const arr2 = [40, 50];

// merge arr2 with arr1
const merge = [...arr1, ...arr2];
console.log(merge);    // → [1, 2, 3, 40, 50]`

ES2018 tiếp tục mở rộng cú pháp này bằng cách thêm các thuộc tính spread cho các đối tượng. Với các spread operator, bạn có thể sao chép các thuộc tính của một đối tượng sang một đối tượng mới. Hãy xem xét ví dụ sau:
```
const obj1 = {
  a: 1,
  b: 2
};

const obj2 = {
  ...obj1,
  c: 3
};

console.log(obj2);    // → {a: 1, b: 2, c: 3}
```

## Asynchronous Iteration

Lặp trên một tập hợp các dữ liệu là một phần quan trọng của chương trình. Trước ES2015, JavaScript đã cung cấp các câu lệnh như `for`, `for ... in` và `while` và các phương thức như `map()`, `filter()` và `forEach()` cho mục đích này. Để cho phép các lập trình viên xử lý các phần tử trong một bộ sưu tập cùng một lúc, ES2015 đã giới thiệu iterator interface.
Một đối tượng có thể lặp lại nếu nó có thuộc tính `Symbol.iterator`. Trong ES2015, các đối tượng chuỗi và các collection như Set, Map và Array đi kèm với thuộc tính `Symbol.iterator` và do đó có thể lặp lại được. 
Ví dụ:
```
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
  
console.log(iterator.next());    // → {value: 1, done: false}
console.log(iterator.next());    // → {value: 2, done: false}
console.log(iterator.next());    // → {value: 3, done: false}
console.log(iterator.next());    // → {value: undefined, done: true}
```

Iterator không đồng bộ khác với iterator thông thường ở chỗ, thay vì trả về một đối tượng đơn giản ở dạng `{value, done}`, nó trả về một Promise tương ứng  `{value, done}`. Một iterable không đồng bộ định nghĩa một phương thức `Symbol.asyncIterator (thay vì Symbol.iterator)` trả về một iterator không đồng bộ.
```
const collection = {
  a: 10,
  b: 20,
  c: 30,
  [Symbol.asyncIterator]() {
    const values = Object.keys(this);
    let i = 0;
    return {
      next: () => {
        return Promise.resolve({
          value: this[values[i++]], 
          done: i > values.length
        });
      }
    };
  }
};

const iterator = collection[Symbol.asyncIterator]();
  
console.log(iterator.next().then(result => {
  console.log(result);    // → {value: 10, done: false}
}));

console.log(iterator.next().then(result => {
  console.log(result);    // → {value: 20, done: false} 
}));

console.log(iterator.next().then(result => {
  console.log(result);    // → {value: 30, done: false} 
}));

console.log(iterator.next().then(result => {
  console.log(result);    // → {value: undefined, done: true} 
}));
```

## Promise.prototype.finally
Một bổ sung thú vị khác cho ES2018 là phương thức `finally()`. Một số thư viện JavaScript trước đây đã triển khai phương thức tương tự, điều này tỏ ra hữu ích trong nhiều tình huống. Điều này khuyến khích Ủy ban Kỹ thuật Ecma chính thức thêm `finally()`. Với phương pháp này, các lập trình viên sẽ có thể thực thi code bất kể kết quả của promise. Hãy nhìn vào một ví dụ đơn giản dưới đây:
```
fetch('https://www.google.com')
  .then((response) => {
    console.log(response.status);
  })
  .catch((error) => { 
    console.log(error);
  })
  .finally(() => { 
    document.querySelector('#spinner').style.display = 'none';
  });
  ```
  
  ## Các đặc tính mới cho RegExp
  - s (dotAll) Flag
  - Named Capture Groups
  - Lookbehind Assertions
  - Unicode Property Escapes