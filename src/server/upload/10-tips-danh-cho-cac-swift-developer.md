## 1. Extension

Ví dụ: Bình phương một số

```
// Bad Code
func square(x: Int) -> Int { return x * x }
var squaredOFFive = square(x: 5)
square(x:squaredOFFive) // 625
```

Có một biến *squaredOFFive* vô nghĩa được tạo ra để bình phương hai lần số 5.

Giờ cùng xem cách làm này

```
// Awesome Code
extension Int { 
 var squared: Int { return self * self }
}
5.squared // 25
5.squared.squared // 625
```

## 2. Generics

Ví dụ: In tất cả các phần tử của một mảng

```
// Bad Code
var stringArray = ["Bob", "Bobby", "SangJoon"]
var intArray = [1, 3, 4, 5, 6]
var doubleArray = [1.0, 2.0, 3.0]

func printStringArray(a: [String]) {
    for s in a {
        print(s) 
    } 
}

func printIntArray(a: [Int]) {
    for i in a {
        print(i)
    } 
}

func printDoubleArray(a: [Double]) {
    for d in a {
        print(d) 
    } 
}
```

Có quá nhiều các functions vô nghĩa. Cùng tạo ra chỉ một functions là đủ !

```
// Awesome Code

func printElementFromArray<T>(a: [T]) {
    for element in a {
        print(element) 
    } 
}
```

## 3. For Loop vs While Loop

Ví dụ: In ra "Count" 5 lần

```
// Bad code
var i = 0
while 5 > i {
    print("Count")
    i = i + 1 
}
```

Biến "i" được bạn sử dụng để chắc rằng chương trình sẽ không in vượt quá số giới hạn.

Hãy nhớ điều này,
> Nhiều biến → Bộ nhớ tốn nhiều hơn→ Bạn phải đau đầu nhiều hơn → Bugs cũng nhiều hơn → Cuộc sống sẽ có nhiều vấn đề hơn

```
// Better Code
for _ in 1...5 { 
    print("Count") 
}
```

## 4. Optional Unwrapping
Ví dụ:  Gaurd let với if let

```
var myUsername: Double?
var myPassword: Double?

// Hideous Code
func userLogIn() {
 if let username = myUsername {
     if let password = myPassword {
           print("Welcome, \(username)"!)
      }
  }
}
```

Bạn có thấy cái hình chóp chết chóc( pyramid of doom) không? Đó là những thứ khinh khủng xen lẫn vào code.

>  HÃY PHÁ HỦY CÁI XẤU, MANG TỚI NHỮNG GÌ TỐT ĐẸP.

```
// Pretty Code
func userLogIn() {
 guard let username = myUsername,
       let password = myPassword  else { return } 
     print("Welcome, \(username)!")
  }
```

Sự khác biệt giữa guard let và if let. Nếu username hoặc password có giá trị nil , Đoạn code tốt hơn sẽ nhanh chóng thoát khỏi function bằng cách gọi return.

## 5. Computed Property vs Function

Ví dụ: tìm đường kính của hình tròn


```
//  :shit: Code

func getDiameter(radius: Double) -> Double { return radius * 2}

func getRadius(diameter: Double) -> Double { return diameter / 2}

getDiameter(radius: 10) // return 20

getRadius(diameter: 200) // return 100

getRadius(diameter: 600) // return 300
```

Cần những hai functions để hỗ trợ cho việc này. Không cần tiết phải vậy.

Hãy kết nối giữa bán kính và đường kính lại với nhau.

```
// Good Code

var radius: Double = 10

var diameter: Double {
 get { return radius * 2}
 set { radius = newValue / 2} } 

radius // 10
diameter // 20
diameter = 1000 
radius // 500
```

Vậy đó, Giờ thì bán kính và đường kính đã được kết nối với nhau.

> Kết nối nhiều hơn → Sẽ gõ ít hơn → Ít lỗi chính tả hơn → Bugs cũng ít hơn → fewer life problems
    
    
## 7. Nil Coalescing
Ví dụ: 

```
// Long Code

var userChosenColor: String?
var defaultColor = "Red"
var colorToUse = ""

if let Color = userChosenColor {
    colorToUse = Color 
} else { 
    colorToUse = defaultColor 
}
```
Hơi dài dòng, hãy làm nó đơn giản hơn chút
```
var userChosenColor: String?
var defaultColor = "Red"
var colorToUse = userChosenColor ?? defaultColor
```

Nếu biến *userChosenColor* == nil,  thì biến *colorToUse* sẽ là *defaultColor* (red).  Nếu không sẽ là *userChosenColor*.

## 8. Conditional Coalescing
Việc sử dụng toán tử 3 ngôi với những logic đơn giản sẽ giúp code bạn nhìn ngắn ngọn hơn, dễ đọc hơn

```
// Simply Verbose
var currentHeight = 185
var hasSpikyHair = true
var finalHeight = 0

if hasSpikyHair {
    finalHeight = currentHeight + 5
} else { 
    finalHeight = currentHeight 
}
```

```
// Lovely Code
finalHeight = currentHeight + (hasSpikyHair ? 5: 0)
```

Nếu hasSpikeHair == true, + thêm 5 vào final height. Nếu không thì sẽ là + 0.

## 9. Functional Programming
Ví dụ) Lấy số chẵn

```
// Imperative code
var newEvens = [Int]()

for i in 1...10 {
 if i % 2 == 0 { 
     newEvens.append(i) 
 }
}
print(newEvens) // [2, 4, 6, 8, 10]
```

Hãy thử tận dụng những functional có để hỗ trợ.

```
// Declarative 
var evens = Array(1...10).filter { $0 % 2 == 0 }
print(evens) // [2, 4, 6, 8, 10]
```
Việc này giúp đoạn code nhìn gọn gàng hơn. Nhưng nó cũng có thể là con dao hai lưỡi nếu bạn không lựa chọn đúng đắn.

> Functional Programming makes you look smart.

## 10. Closure vs Func
```
// Normal Function
func sum(x: Int, y: Int) -> Int {
    return x + y 
}
var result = sum(x: 5, y: 6) // 11
```
Bạn sẽ phải ghi nhớ các params và tên hàm cho việc này. 
Hãy thử sử dụng closure và tận hưởng sự tiện dụng closure mang lại
```
// Closure
var sumUsingClosure: (Int, Int) -> (Int) = { $0 + $1 }
sumUsingClosure(5, 6) // 11
```