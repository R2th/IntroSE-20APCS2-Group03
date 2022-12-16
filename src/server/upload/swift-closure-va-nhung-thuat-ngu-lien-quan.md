Ở bài viết lần này mình sẽ cùng các bạn đi ôn lại về một kiến thức rất nền tảng và khá là đặc biệt của Swift, đó chính là Closure. Đầu tiên, hãy đi đến định nghĩa của nó trước nhé.
## Định nghĩa
"**Closure** là một khối chức năng độc lập có thể truyền đi và được sử dụng trong code của bạn."
Nghe vẫn khá là mơ hồ nhỉ? **Closure** trong Swift khá là giống blocks trong **C** hay **Objective-C**, là một đoạn mã được bao hàm trong block thực hiện một chức năng cụ thể nào đó như là Function vậy. Nói đến Function thì nó có tên (để gọi), có kiểu trả về (hoặc không với Void) và đoạn mã trong block để thực hiện chức năng, vậy Function có phải là Closure không? Câu trả lời là có với **Global** hay **Nested function** thực chất là trường hợp đặc biệt của closure.
    Closure sẽ thuộc một trong 3 dạng dưới đây:
* Global function là một closure có tên và không **capturing value**
* Nested function là một closure có tên và có khả năng **capturing value** từ function bao quanh chúng
* Closure expression là một closure không có tên được viết dưới dạng giản lược và có khả năng **capturing value**

Thuật ngữ **capturing value** ở đây là để chỉ khả năng bắt lấy, sử dụng những hằng số hay biến số từ những nội dung xung quanh nơi mà nó được định nghĩa.

## Closure Expressions 
Closure expressions là một cách để viết closure ngắn gọn hơn, tập trung vào cú pháp. Nó cung cấp một số những sự tối ưu hoá cho cú pháp để có thể rút ngắn nhưng vẫn mang lại sự rõ ràng và ý nghĩa. Những sự tối ưu hoá về cú pháp này gồm có:
* Tự suy diễn kiểu của tham số và kiểu trả về từ bối cảnh xung quanh 
* Ngầm return đối với các single-expression closures 
* Các viết tắt tên các arguments 
* Cú pháp **Trailling closure**

Nếu các bạn thắc mắc Closure expressions có thể rút gọn tới cỡ nào, các bạn có thể đọc bài viết [**Funtion tiến hoá trở thành Closure và cái kết bất ngờ!**](https://viblo.asia/p/funtion-tien-hoa-tro-thanh-closure-va-cai-ket-bat-ngo-gGJ59YMJ5X2) của anh Trương Minh Thắng để thấy rõ hơn về sự rút gọn của Closure expressions.

## Trailling Closure 
Trailling closure là một trong những cách rút gọn hữu hiệu khi bạn truyền một closure vào một function như là argument cuối cùng của function, và cái thể hiện của closure này khá dài. Khi sử dụng trailling closure thì chúng ta không cần phải viết nhãn của closure trong function đó nữa. Hãy nhìn qua một ví dụ.
```
func someFunctionThatTakesAClosure(closure: () -> Void) {
    // function body
}

// gọi function không dùng tới trailling closure

someFunctionThatTakesAClosure(closure: {
    // closure's body 
})

// khi sử dụng trailling closure 

someFunctionThatTakesAClosure() {
    // trailing closure's body
}
```

Hãy tới một ví dụ cụ thể hơn, lần này chúng ta sẽ sử dụng trailling closure để chuyển đổi một mảng giá trị Int sang một mảng String. Đây sẽ là đầu vào
```
let digitNames = [
    0: "Zero", 1: "One", 2: "Two",   3: "Three", 4: "Four",
    5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine"
]
let numbers = [16, 58, 510]
```

Và giờ chúng ta sẽ sử dụng toán tử map và trailling closure để thực hiện
```
let strings = numbers.map { (number) -> String in
    var number = number
    var output = ""
    repeat {
        output = digitNames[number % 10]! + output
        number /= 10
    } while number > 0
    return output
}
// KQ: ["OneSix", "FiveEight", "FiveOneZero"]
```

Toán tử map thực hiện đoạn code trong closure đối với mỗi một phần tử ở trong mảng numbers. Và number trong closure cũng không cần định nghĩa rõ ràng kiểu vì đặc điểm tự suy diễn kiểu dữ liệu của tham số trong closure.

## Escaping Closure 
Escaping closure là để chỉ việc khi closure được truyền vào như một argument của function nhưng lại được gọi sau đó, khi mà function này đã kết thúc. Điều này rất hữu ích khi chúng ta làm việc với các tác vụ bất đồng bộ hay thao tác với dữ liệu từ server/API ... Để khai báo một closure là một escaping thì chỉ cần thêm @escaping vào trước kiểu của tham số. Hãy xem qua một ví dụ
```
var completionHandlers: [() -> Void] = []

func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
    completionHandlers.append(completionHandler)
}

func someFunctionWithNonescapingClosure(closure: () -> Void) {
    closure()
}

class SomeClass {
    var x = 10
    func doSomething() {
        someFunctionWithEscapingClosure { self.x = 100 }
        someFunctionWithNonescapingClosure { x = 200 }
    }
}

let instance = SomeClass()
instance.doSomething()
print(instance.x)
// Prints "200"

completionHandlers.first?()
print(instance.x)
// Prints "100"
```

## Closures are reference type
Hãy lưu ý rằng một closure là một kiểu tham chiếu vì vậy khi gán một hằng hay biến vào closure nó sẽ làm tăng reference counting của biến đó. Và khi sự dụng self trong closure cũng nên sử dụng weak hoặc unowned để tránh reference retain cycles.