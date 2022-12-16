Chào, nay ngồi đọc bài viết thấy Swift 5 mới ra vài cái hay ho và này nọ nhìn giống RxSwift nên mình mò vào coi có gì hay. Mình xin phép dịch bài này cho các bạn có thể hiểu hơn vì Swift Combine Framework mới của Apple. ( :v nên đọc tiếng anh nhé để luyện kĩ năng đọc cũng như tạo cơ hội cho mình tiếp xúc với anh văn nhiều hơn sau này còn ra nước ngoài làm việc. Đừng như mình hại đời người khác :v )

-----

map, flatMap và switchToLatest là những toán tử chuyển đổi khá quan trọng trong "Swift Combine Framework". Chúng ta hãy cùng xem cách chúng hoạt động, sự khác nhau giữa các toán tử và nhận biết khi nào sử dụng các toán tử này nhé :D.
> Nếu các bạn muốn làm quen với chúng thì hãy clear qua bài viết này của tác giả trước nhé: [ the bird-eye overview of the Combine Framework.](https://www.vadimbulavin.com/swift-combine-framework-tutorial-getting-started/)
> 

## Chuyển đổi element với Map

Hàm `map(_ :)` của *`Combine`* hoạt động y chang map trong bộ thư viện của Swift, ngoại trừ việc nó thực thi với **publisher**. Nó sẽ tạo một closure để biến đổi 1 phần tử này sang một phần tử khác (VD: Int -> String, Int -> Double, [String] -> [Double], etc).

```
[1, 2, 3]
   .publisher
   .map { $0 * 2 }
   .sink { print($0) }
   
// Result:
2
4
6
```

## Chuyển đổi Publisher với FlatMap

Hàm `flatMap(maxPublishers:_:)` sẽ chuyển đổi publisher thành 1 publisher mới hoàn toàn với phần tử cùng loại. Nó thường được sử dụng khi bạn muốn chạy vào bên trong publisher để lấy các phần tử của nó.

Để hiểu hơn thì các bạn xem 1 ví dụ này nhé. Chúng ta có 1 struct User với name là publisher property.

```
struct User {
   let name: CurrentValueSubject<String, Never>
}
```

Để in ra *name* trong luồng thay đổi của User chúng ta sẽ tạo ra `PassthroughSubject` với object là User 
```
let userSubject = PassthroughSubject<User, Never>()

userSubject
   .map { $0.name } // 🛑 Oops, compilation error here
   .sink { print($0) }

let user = User(name: .init("User 1"))
userSubject.send(user)
```

Nếu bạn dùng map thì sẽ bị Xcode báo lỗi như trên. mặc dù `userSubject` cũng là một publisher trong các publishers. Hàm flatMap sẽ giúp chúng ta khắc phục điều này và in ra giá trị name đúng như mong muốn 
```
userSubject
   .flatMap { $0.name }
   .sink { print($0) }
// Result: 
User 1
```

## Quản lý các Publishers với flatMap
`flatMap`  có 1 parameter là `maxPublishers`, nó quản lý số lượng tối đa mà method cho phép hoạt động. Giá trị mặc định của nó là **`unlimited`** 

```
let anotherUser = User(name: .init("AnotherUser 1"))
userSubject.send(anotherUser)

anotherUser.name.send("AnotherUser 2")

user.name.send("User 2")
```
Chúng ta sẽ có kết quả của cã `user`và `user
anotherUser` :
```
// Result:
User 1
AnotherUser 1
AnotherUser 2
User 2
```

Khi chúng ta gán giá trị `maxPublishers` là 1, flatMap chỉ cho phép duy nhất user chạy vào và bỏ qua các thằng còn lại:
```
userSubject
   .flatMap(maxPublishers: .max(1)) { $0.name }
   .sink { print($0) }

let user = User(name: .init("User 1"))
userSubject.send(user)

let anotherUser = User(name: .init("AnotherUser 1"))
userSubject.send(anotherUser)

anotherUser.name.send("AnotherUser 2")

user.name.send("User 2")


// Result: 
User 1
User 2
```

## switchToLatest
Như chúng ta đã thấy với `flatMap`, việc 1 publisher trong nhiều publishers là rất bình thường. Giả dụ như một trang web sẽ được gọi request và tạo ra 1 luồng (stream) khi bạn nhấn 1 button. Khi mà các request phải thực hiện liên tục trong 1 thời gian ngắn, giá trị responses trả về nhiều lúc sẽ bị đổi hoặc cũ. Tuy nhiên thì thật ra chúng ta chỉ để ý tới reponses cuối cùng của lần request cuối cùng. Đó là lý do mà Combine tạo ra một toán tử thực thi gần như là y chang quá trình này: **`switchToLatest()`**

Tiếp tục với vd ở trên, hãy xem làm cách nào chúng ta có thể chuyển sang lắng nghe duy nhất luồng cuối cùng của publisher (ở đây chính là anotherUser)

```
userSubject
   .map { $0.name }
   .switchToLatest()
   .sink { print($0) }
   
// Result
User 1
AnotherUser 1
AnotherUser 2
```

Khi mà `anotherUser` được thêm vào stream, `userSubject` sẽ tự động thay đổi sang luồng mới nhất chính là  `anotherUser` và không còn để ý tới stream `user` nữa cho tới khi nó send một giá trị mới nhất.

> Nếu các bạn có background về RxSwift thì chúng ta sẽ thấy nó y chang như cách hoạt động của `flatMapLatest()` . Trong Combine thì nó được biên dịch thành `map + switchToLatest`.
> 
## Tìm hiểu thêm
Nếu các bạn muốn tìm hiểu thêm về combine thì có thể đọc qua các bài viết dưới đây:

[Getting Started with Swift Combine Framework](https://www.vadimbulavin.com/swift-combine-framework-tutorial-getting-started/)

[Understanding Schedulers in Combine](https://www.vadimbulavin.com/understanding-schedulers-in-swift-combine-framework/)


-----

Cảm ơn các bạn đã xem bài dịch của mình. Rất xin lỗi vì gần như các bài viết của mình là copy và dịch lại từ bài của người khác. Mình chỉ muốn học hỏi và biết thêm tiếng anh thôi. Một phần là từ dạo nào tâm lý mình không ổn định lắm nên chẳng còn hứng như hồi ấy. Dù sao cũng cảm ơn các bạn rất nhiều :D 
Link mình dịch ở đây nè : 

[Transforming Operators in Swift Combine Framework: Map vs FlatMap vs SwitchToLatest](https://www.vadimbulavin.com/map-flatmap-switchtolatest-in-combine-framework/?fbclid=IwAR3V3a1TCBvWEKzT7cTP4E6LR5aJc8CnK7mW0gyZ-3DjDnZ-rbRj8mO5M5E)