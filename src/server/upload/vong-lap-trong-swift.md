Xin chào các bạn, bài viết hôm nay mình sẽ viết về vòng lặp trong Swift, mình nghĩ đây là một kiến thức cần thiết nhất là đối với những bạn mới bắt đầu học lập trình Swift.

Vòng lặp chúng ta thực hiện một câu lệnh hoặc một khối lệnh nhiều lần, mình đi vào chi tiết một số vòng lặp nhé.

## 1. Vòng lặp For
### 1.1 For in

Vòng lặp for là vòng lặp phổ biến ở tất cả các ngôn ngữ lập trình, trong Swift thì nó có dạng for - in như sau:

```
let cities = ["Hà Nội", "Đà Nẵng", "TP HCM"]
for city in cities {
    print(city)
}
```

Vòng lặp for này sẽ duyệt qua tất cả các phần tử của mảng cities, duyệt đến đâu in ra giá trị đến đó, kết quả in ra như sau:
```
Hà Nội
Đà Nẵng
TP HCM
```

Vòng lặp for - in có nhiều dạng, mình thường dùng những dạng sau:

**Dạng x...y**

Ví dụ:
```
for i in 0...2 {
    print(i)
}

// kết quả in ra:
0
1
2
```

**Dạng x ..< y**

Ví dụ:
```
for i in 0 ..< 2 {
    print(i)
}

// kết quả in ra:
0
1
```

**Dạng stride**

Ví dụ:
```
// vòng lặp này bắt đầu từ giá trị 0,  với bưới nhảy là 3, in ra các giá trị nhỏ hơn 10
for i in stride(from: 0, to: 10, by: 3) {
    print(i)
}

// kết quả in ra:
0
3
6
9
```

**Dạng Array[...index]**

Ví dụ: 
```
var array = [0, 1, 2, 3, 4, 5, 6]
for value in array[...3] {
    print(value)
}

// kết quả in ra:
0
1
2
3
```

**Dạng Array[..<index]**

Ví dụ:
```
var array = [0, 1, 2, 3, 4, 5, 6]
for value in array[..<3] {
    print(value)
}

// kết quả in ra:
0
1
2
```

### 1.2 For each

Vòng lặp for-each thì tương tự như vòng lặp for-in (nhưng mình nhìn có vẻ cú pháp đơn giản hơn).
Ví dụ:
```
let cities = ["Hà Nội", "Đà Nẵng", "TP HCM"]
cities.forEach { (city) in
    print(city)
}

// Kết quả in ra:
Hà Nội
Đà Nẵng
TP HCM
```

```
(0 ..< 2).forEach { (index) in
    print(index)
}

// kết quả in ra:
0
1
```

Nhưng chúng có một số điểm khác biệt như sau (theo tài liệu https://developer.apple.com/documentation/swift/array/1689783-foreach):
1. `break/continue` chỉ work với for-in mà không work với for-each
2. `return` trong for-each chỉ thoát khỏi khối lệnh nội bộ, vẫn thực hiện tiếp vòng lặp và các câu lệnh phía dưới vòng lặp.

Ví dụ:
For - in:
```
var array = [0, 1, 2, 3, 4, 5, 6]
func test() {
    for value in array {
        print(value)
        return
    }
    print("nhảy vào đây")
}

// kết quả in ra:
0
```

For - each:
```
var array = [0, 1, 2, 3, 4, 5, 6]
func test() {
    array.forEach { (value) in
        print(value)
        return
    }
    print("nhảy vào đây")
}
test()

// kết quả in ra:
0
1
2
3
4
5
6
nhảy vào đây
```
## 2. Vòng lặp While
Vòng lặp while thì mình thấy ít được sử dụng hơn vòng lặp For, nó thực hiện lặp lại khối lệnh nếu điều kiện check còn thỏa mãn. Ví dụ:
```
func rollDice() -> Int {
    return (1...6).randomElement()!
}

let maxTries = 6
var tries = 0
var score = 0

while tries < maxTries {
    score += rollDice()
    tries += 1
}

print("Total score is \(score)") // Everytime a random new score! 

// Kết quả in ra:
Total score is 19
```

## 3. Vòng lặp repeat…while
Vòng lặp repeat chính là vòng lặp do-while trong các ngôn ngữ lập trình khác, nó thực hiện khối lệnh 1 lần trước khi check điều kiện, nó khác với vòng lặp while một điểm nữa là biểu thức điều kiện được đặt ở cuối khối lệnh, ví dụ:
```
func rollDice() -> Int {
    return (1...6).randomElement()!
}

let maxTries = 6
var tries = 0
var score = 0

repeat {
    score += rollDice()
    tries += 1
} while tries < maxTries

print("Total score is \(score)") // Everytime a random new score!

// kết quả in ra:
Total score is 20
```

Mình đã giới thiệu với các bạn một số vòng lặp trong Swift, hi vọng nó giúp ích gì đó cho các bạn. Cảm ơn các bạn đã đọc bài viết <3.

Tham khảo: https://www.avanderlee.com/swift/loops-swift/