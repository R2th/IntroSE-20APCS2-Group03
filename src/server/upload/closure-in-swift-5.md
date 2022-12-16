### What is Closure?

Closure là các khối function khép kín có thể được chuyển qua và sử dụng trong code của bạn. Closures trong Swift tương tự như blocks trong C và Objective-C và lambdas trong các ngôn ngữ lập trình khác.

- Closure là một function and với từ khoá “func” 

- Closure là một block của code mà bạn có thể gán cho biến.

- Trong Swift  “var” và  “let” lưu trữ thông tin, Các hàm “func” thực thi các tác vụ và Các Closures có function code dưới dạng một biến và có thể được passed around.

### What are the types of the Closure?

- Closure mà không có parameters cũng như giá trị trả về. 
- Closure có các tham số. 
- Closure  giá trị trả về.
- Trailing Closure.


##### Closure không có tham số và giá trị trả về :

```swift   
var myClosure = {
    print("Hello I'm a Closure")
}
myClosure()         
=> Hello I'm a Closure
 ```
 
 ##### Closure có parameters
 
 ```swift   
var closure: (String) -> Void = { str in
    print(str)
}
var closure: (Int, Int) -> Void = { first, second in
    print(first + second)
}
 ```
 
 
Vì các tham số không có tên nên bạn có thể refer đến chúng với $ + parameters number
 
  ```swift   
var closure: (Int, Int) -> Void = {
    print($0 + $1)
}
closure(3, 2)          
=> 5
 ```
  ##### Closure có giá trị trả về
  
   ```swift   
var closure: () -> String = {
    return "Hello Closure"
}
var value = closure()
print(value)  
=> Hello Closure
 ```
 
 các closures cũng có thể chấp nhận các tham số và trả về giá trị
 
  ```swift   
var addTwoNumbers: (Int, Int) -> Int = {
    return $0 + $1
}
addTwoNumbers(4, 5)   
=> 9
 ```
 
 ##### Trailing Closure

 Nếu tham số cuối cùng của một hàm là closure thì được gọi là trailing closure.
 
   ```swift   
func callMe(closure: () -> Void) {
    print("will call you")
    closure()
    print("did call you")
}
callMe {
    print("calling you...")
}
=> will call you
=> calling you...
=> did call you
 ```
 
**một vị dụ khác của trailing closure có parameter**


   ```swift   
func callMe(name: String, closure: (String) -> Void) {
    print("\(name) will call you")
    closure(name)
    print("\(name) did call you")
}
callMe(name: "Smith") { name in
    print(name, "is calling you")
}
=> Smith will call you
=> Smith is calling you
=> Smith did call you
 ```