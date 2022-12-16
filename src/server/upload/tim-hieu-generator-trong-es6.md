Ở bài viết này, tôi sẽ trình bày về generator trong es6, cách sử dụng generator và iterator.

### Giới thiệu

Generator có thể hiểu cơ bản là 1 function trong javascript có khả năng pause execution (dừng việc thực thi function)
và resume execution (tiếp tục thực thi function) khi 1 điều kiện được kích hoạt (gọi hàm next).

```
function* generatorFunc() {
    yield 0
    console.log('something')
    yield 1
}

const generator = generatorFunc()
console.log(generator.next())  // { value: 0, done: false }
console.log(generator.next())  // something 
                                                                        // { value: 1, done: false }
console.log(generator.next())  // { value: undefined, done: true }
```

Như bạn thấy, mỗi khi call next mỗi dòng code trong generator function sẽ được thực thi cho đến khi gặp từ khoá yield, 
và function sẽ dừng tại đó và trả về 1 object với giá trị của value property là giá trị yield trong function.

### Generator và iterables

Sử dụng generator cho phép ta tạo ra 1 collection không giới hạn.
```
function* evenGeneratorFunc() {
    const i = 0
    while (true) {
        yield i
        i += 2
    }
}
const evenIterable = {
    [Symbol.iterator]: evenGeneratorFunc
}

for (const even of evenIterable) {
     console.log(even)
}
```

Generator có thể nhận value đầu vào.

```
function* inputGeneratorFunc() {
    const input = yield "Please input your favorite number: "
    console.log("Your favorite number is: ", input)
}
const generator = inputGeneratorFunc()
generator.next().value // Please input your favorite number: 
generator.next(13)     // Your favorite number is: 13
```