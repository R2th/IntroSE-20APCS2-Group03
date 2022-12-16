# Map
## Khái niệm
Map trong javascript là một cấu trúc dữ liệu cho phép lưu dữ liệu theo kiểu key - value. Wait a minute, nghe có gì đó sai sai :thinking:, thế chả lẽ nó là object à. Đương nhiên là không rồi, nếu key sử dụng kiểu dữ liệu là string hoặc number thì Map lại đa dạng hơn rất nhiều. Key, value của Map có thể là bất kì kiểu dữ liệu nào, kể cả đó là 1 function :grimacing: 

## Cách sử dụng
Bạn hãy thủ copy đoạn code này vào và mở trình duyệt lên xem kết quả trong console nhé
```javascript

    const person = {
        name: 'Hoang',
        age: 23,
    };
    const employy = new Map([
        [person, 'this is an object'],
        ['division', 'R&D Unit']
    ]);
    console.log(employy);
    
```

hoặc bạn cũng có thể viết như này:
```php

    const person = {
        name: 'Hoang',
        age: 23,
    };
    const employy = new Map();
    employy
        .set(person, 'This is an object')
        .set('division', 'R&D Unit');
    console.log(employy);
    
```

Để có thể lấy từng key nhất định thì bạn có thể sử dụng hàm `get()`
```php
    console.log(employy.get(person));
    console.log(employy.get('division'));
```

Để kiểm tra xem một key có tồn tại hay không thì ta dùng hàm `has()`
```php
    console.log(employy.has('something')); //false
    console.log(employy.has('division')); //true
```

Để xóa các key
```php
employy.delete('key'); // xóa key cụ thể
employy.clear() //xóa hết các key
```
Kiểm tra số lượng key
```php
console.log(employy.size);
```

Dùng với for và forEach:
```php
    employy.forEach((value, key) => {
        console.log(`${key} is ${value}`);
    });

    for (let [key, value] of employy.entries()) {
        console.log(`${key} is ${value}`);
    };
```

## WeakMap

WeakMap chỉ chấp nhận key là object và không thể lặp cũng như không thể sử dụng hàm `clear()`
```php
    const people = new WeakMap();
    const men = {
        title: 'Men',
    };
    const women = {
        title: 'Women',
    };
    people.set(men,'is men');
    people.set(women, 'is women');
    console.log(people.get(men));
    
```

# Set
## Khái niệm
Set là tập hợp các giá trị không trùng lặp

## Cách sử dụng

Hãy xem kết quả trả về nhé 
```php
    const color = new Set(['red', 'blue', 'sweet', 'red', 'green', 'black']);
    console.log(color);
```

hoặc bạn có thể viết như này:
```php
    const color = new Set();
    color
        .add('red')
        .add('blue')
        .add('red')
        .add('green')
        .add('black')
        .add('yellow')
        .add('red');
    console.log(color);
```

Bạn vẫn có thể add object vào nhé. Nhớ đùng nhầm với Map là dùng `set` nhé :D

**Chú ý**: Set không hỗ trợ hàm `get()` như Map đâu nhé, những hàm như `size()`, `has()`, `delete()`, `clear()` thì vẫn sử dụng như Map

Dùng với for và forEach:

```php
    color.forEach((value, key) => {
        console.log(`${key} is ${value}`);
    });

    for (let [key, value] of color.entries()) {
        console.log(`${key} is ${value}`);
    };
```

Bạn nhìn vào kết quả trả về thì sẽ thấy bạn không set key cho những item trong Set mà Set sẽ tự đặt key theo value luôn

## WeakSet
WeakSet sẽ giống như WeakMap vậy, chỉ chấp nhận object, không lặp lại và không thể dùng hàm `clear()`

```php
    let post1 = {name: 'post 1'};
    let post2 = {name: 'post 2'};
    let post3 = {name: 'post 3'};
    const posts = new WeakSet([post1, post2, post3]);
    console.log(posts)
```


Cảm ơn các bạn đã đọc bài viết của mình