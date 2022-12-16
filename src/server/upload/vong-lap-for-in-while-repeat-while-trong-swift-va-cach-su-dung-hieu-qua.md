![](https://images.viblo.asia/47d8028f-a930-42de-82a2-8a7e41820d29.png)

*Vòng lặp* là khái niệm cơ bản trong lập trình. Bạn có thể lặp lại 1 đoạn code với vòng lặp **for - in**, **while**, **repeat - while** giúp đoạn code trở lên clear, ngắn gọn nhưng rất dễ hiểu.

Trong bài này, chúng ta sẽ đi tìm hiểu cách sử dụng sao cho hiệu quả các vấn đề sau

1. Vòng lặp **for - in** trong Swift
2. Dùng vòng lặp **for - in** trong **Collections** (arrays, dictionarys, sets,..)
3. Dùng vòng lặp **for - in** trong **Ranges** 
4. Dùng vòng lặp **while** và **repeat while**
5. Tài liệu tham khảo

# Vòng lặp for - in trong Swift
```Swift
for item in items {
    //Do something
}
```

`Với mỗi item trong items hãy thực hiện đoạn code //Do something`

Với từ khoá là `for` và `in`, vòng lặp **for** tiếp nhận 1 chuỗi hành động và lặp lại  **lần lượt** với mỗi `item` trong `items` . Chuỗi hành động được viết trong block `{...}`. Cú pháp này có thể áp dụng cho *ranges, sequences, iterators, collelction* và thậm chí là chuỗi *strings*.

**Object có kiểu là [arryas](https://learnappmaking.com/array-swift-how-to/), [dictionarys](https://learnappmaking.com/dictionary-swift-how-to/), [sets](https://learnappmaking.com/set-swift-how-to/) được gọi là Collection**

Cùng xem 1 VD đơn giản nữa nhé:
```Swift
for n in 1...5 {
    print(n)
}

// Output: 1 2 3 4 5
```

Đoạn code trên sử dụng phạm vi là **ranges** từ 1 đến 5 (bao giồm cả 1 và 5) để lặp đoạn code `print(n)` với số lần lặp là 5

Oke tiếp tục đi vào những VD cụ thể dưới nhé! :clap:

# Dùng vòng lặp **for - in** trong Collections (arrays, dictionarys, sets,..)
## Arrays
Vòng lặp trong arrays: 
```Swift
let names = ["Arthur", "Zaphod", "Trillian", "Ford", "Marvin"]

for name in names {
    print(name)
}
/*
Arthur
Zaphod
Trillian
Ford
Marvin
*/
```
Đoạn code trên in tất cả chuỗi có trong mảng `names`. Dù không khai báo kiểu của arrays `names` nhưng từ phần tử của `names` ta có thể suy ra `names` có kiểu `[String]` và chắc chắn biến `name` phải có kiểu `String`

1 VD khác:
```Swift
let numbers = [1, 2, 3, 4, 5, 6]
var sum = 0

for i in numbers {
    sum += i
}

print(sum)
//21
```

Tạo 1 function có tham số là 1 chuỗi và trả về tổng: 
```Swift
func sum(_ numbers:[Int]) -> Int
{
    var sum = 0

    for n in numbers {
        sum += n
    }

    return sum
}

let result = sum([23, 11, 9, 3, 24, 77])
print(result) // Output: 147
```
Cách tính tổng khác: 
```Swift
for i in 0..<numbers.count {
    sum += numbers[i]
}
```
## Dictionarys
VD rất đơn giản:
```Swift
let scores = ["Bob": 42, "Alice": 99, "Jane": 13]

for (name, score) in scores
{
    print("\(name)'s score is \(score)")
}
```
`scores` có kiểu `[String: Int]` nên Dictionarys này có `key` kiểu `String` và `value` kiểu `Int`. Vòng lặp for dùng 2 tham số, `name` tương ứng với `key` và `score` tương ứng với `value`

Nếu bạn muốn biết số thứ tự của mỗi phần tử:
```Swift
let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]

for (n, prime) in primes.enumerated()
{
    print("\(n) = \(prime)")
}
/*
0 = 2
1 = 3
2 = 5
3 = 7
4 = 11
5 = 13
6 = 17
7 = 19
8 = 23
9 = 29
10 = 31
*/
```
## Trong lập trình iOS
Vòng lặp **for - in** rất hữu dụng trong VD đơn giản sau: Bạn muốn config 1 loạt các UI có kiểu giống nhau và không muốn viết config cho từng thằng 1, như thế rất mất thời gian và khiến code khó kiểm soát. Hãy đưa các **UI có cùng kiểu đó (buttons, uiview, lable,...)** vào 1 mảng và lặp đoạn code cần config
```Swift
let buttons = [loginButton, signupButton, facebookButton]

for button in buttons {
    button.backgroundColor = UIColor.red
    button.layer.cornerRadius = 5.0
}
```
Bạn muốn thay đổi dữ liệu trong đoạn lặp vẽ đồ thị:
```Swift
let points = [0.1, 0.2, 0.3, 0.5, 0.7, 0.8]

for x in 0..<points.count {
    let y = points[x]
    graph.drawPoint(x, y)
}
```
Bạn thông báo cho người dùng với nội dung của chỉ người đó: 
```Swift
for uid in user.followers {
    sendNotification(withUID: uid)
}
```
# Dùng vòng lặp **for - in** trong **Ranges** 
VD đơn giản đã được nêu ở trên
```Swift
for n in 1...5 {
    print(n)
}
```
Với **range(first: .., last: ...)**, vòng lặp cũng dùng với kí tự văn bản: 
```Swift
let xyz = "x"..."z"
print(xyz.contains("y"))
// Output: true
```
**Với toán tử first..<last tạo ra giới hạn trên và không bao gồm "thằng" last**
```Swift
for i in 0..<5 {
    print(i)
}
// Output: 0 1 2 3 4
```
**Số phần tử của mảng - 1 = chỉ số thứ tự của phần tử cuối cùng của mảng, VD dưới đây là cách code clear khi muốn duyệt 1 mảng** 
```Swift
for i in 0..<items.count {
    // Do stuff...
}
```
# Dùng vòng lặp **while** và **repeat while**
Lặp **for - in** không phải cách lặp duy nhất trong Swift
## While
Dùng vòng lặp **while** khi bạn không biết chính xác số lần lặp. **while** kiểm tra điều kiện trước khi bắt đầu vòng lặp mới và dừng lại cho đến khi điều kiện đó sai:
```Swift
while(condition == true) {
    // Repeat this
}
```
## Repeat - while
Vòng lặp **repeat - while** y hệt như **while** ngoại trừ điều kiện được kiểm tra ở cuối vòng lặp:
```Swift
repeat {
    // Do this
} while(condition == true)
```
# Tài liệu tham khảo
https://learnappmaking.com/loops-swift-how-to/

https://soltveit.org/swift-loops-how-to-do-loops-with-swift/