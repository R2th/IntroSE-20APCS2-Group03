Trong phần đầu tiên của loạt bài này, chúng ta đã tạo ra một observable sequence, đăng ký nó và quan sát các sự kiện được phát ra. Với rất ít dòng mã, chúng ta có thể thấy các nuts và bolts của reactive programming, mà tất cả các khái niệm nâng cao được xây dựng trên.

### What are Subjects?
Sự phổ biến của các Subjects trong reactive programming  có thể được cường điệu hóa. Nếu bạn đang làm việc với một reactive programming , rất có thể bạn sẽ sử dụng Subjects. Subjects là một loại reactive vừa là Observable Sequence vừa là một Observer.
Có bốn loại subject: PublishSubject, BehaviorSubject, Variable, ReplaySubject. Trong phần tiếp theo, chúng ta sẽ mô tả các loại này, nêu bật sự khác biệt của chúng và xem xét một ví dụ mã hóa cho từng loại.
Hai thuật ngữ rất cần thiết để hiểu được sự khác biệt giữa các loại subject khác nhau, vì vậy, hãy để nhanh chóng xem xét chúng trước khi sang phần khác :
 #### Replay 
 Trong một số trường hợp, bạn có thể muốn một subscriber mới nhận được (các) sự kiện tiếp theo ()) gần đây nhất từ chuỗi mà nó đang đăng ký. Mặc dù (các) sự kiện đã được phát ra, subject có thể lưu trữ chúng và phát lại chúng cho một single subscriber tại thời điểm đăng ký. Điều này được gọi là replay.
 #### Stop Event 
 Đây là event chấm dứt chuỗi, đã hoàn thành () hoặc lỗi ()
 
 ### PublishSubject
 PublishSubject chỉ liên quan đến việc phát ra các sự kiện mới cho những subscribers. Nó không replay các sự kiện tiếp theo, vì vậy bất kỳ sự kiện nào tồn tại trước khi đăng ký sẽ không được subscribers đó nhận được. Tuy nhiên, nó lại phát ra các sự kiện dừng cho những new subscribers. Điều này có nghĩa là nếu bạn đăng ký một chuỗi đã bị chấm dứt, người đăng ký sẽ nhận được thông tin đó. Điều đáng chú ý là tất cả các loại subject phát lại các event stop.
 
 Một trường hợp sử dụng tốt cho PublishSubject là bất kỳ loại mã nào. Nếu bạn muốn có một nguồn thông tin trực tiếp, có thể bạn không muốn nhận bất kỳ sự kiện lịch sử nào. Điều này làm cho PublishSubject lý tưởng cho mục đích của bạn
Trong ví dụ đơn giản này, bạn có thể thấy các sự kiện được đăng ký bởi PublishSubject:

```swift

enum MyError: Error {
    case error1
}

let disposeBag = DisposeBag()
            
let pubSubj = PublishSubject<String>()
            
pubSubj.on(.next("(next 1")) //event emitted to no subscribers
            
pubSubj.subscribe({ //subscriber added, but no replay of "next 1"
                print("line: \(#line),", "event: \($0)")
            })
.disposed(by: disposeBag)
            
pubSubj.on(.next("(next 2")) //event emitted and received by subscriber
pubSubj.onError(MyError.error1) //emits error and terminates sequence
            
pubSubj.on(.next("next 3")) //pubSubj cannot emit this event
/* prints: 
line: 8, event: next((next 2)
line: 8, event: error(error1) 
*/

  ```
  
  Lưu ý trong ví dụ này rằng "next 1"   (dòng 9) được phát ra trước khi đăng ký được tạo. Vì loại PublishSubject không phát lại, nên "next 1”  không bao giờ nhận được đăng ký tiếp theo. Ngoài ra, "next 3" không có gì nhận được sau sự kiện dừng, lỗi (dòng 18).
  
  ### BehaviorSubject
  
  
  Một BehaviorSubject lưu trữ sự kiện next()  gần đây nhất, có thể được phát lại cho những new subscribers. Nói cách khác, một new subscriber có thể nhận được sự kiện next() gần đây nhất ngay cả khi họ đăng ký sau khi sự kiện được phát ra. Một BehaviorSubject không được có bộ đệm trống, do đó, nó được khởi tạo với giá trị bắt đầu đóng vai trò là sự kiện next () ban đầu. Giá trị này được ghi đè ngay sau khi một phần tử mới được thêm vào chuỗi. Giống như tất cả các loại Subject, BehaviorSubject phát lại các sự kiện dừng cho những new subscribers.
  
  Trường hợp sử dụng tốt cho BehaviorSubject có thể là bất kỳ thuộc tính nào có giá trị giữ chỗ hoặc giá trị mặc định. Trong một trò chơi, bạn có thể bắt đầu bằng một placeholder text như là "Player 1", đó sẽ là giá trị bắt đầu mà BehaviorSubject được khởi tạo. Khi người dùng thay đổi giá trị trong textfield, BehaviorSubject sẽ phát ra giá trị mới cho bất kỳ observers nào dưới dạng sự kiện next() và lưu trữ nó trong bộ đệm để được phát lại nếu và khi cuối cùng một observer mới được thêm vào.
  
  Trong ví dụ này, bạn có thể thấy thiết lập cơ bản và đăng ký một BehaviorSubject.
  ```swift
  let dispose = DisposeBag()
            
let behavSub = BehaviorSubject<String>(value: "Starting value") //BehaviorSubject instantiated with a starting value (single event buffer)
            
behavSub.subscribe({ (event) in //Sub A added and most recent event replayed ("starting value")
   print("Sub A, line: \(#line)", "event: \(event)")
})
.disposed(by: dispose)
            
behavSub.on(.next("next 1")) //event emitted and received by Sub A. Value ("next 1") stored for replay
            
behavSub.subscribe({ (event) in //Sub B added and most recent event replayed ("next 1")
print("Sub B, line: \(#line)", "event: \(event)")
})
.disposed(by: dispose)
            
behavSub.on(.next("next 2")) //event emitted to Sub A and Sub B. Value ("next 2") stored for replay
            
behavSub.onCompleted() //emits completed event and terminates sequence
/*
prints: 
Sub A, line: 6 event: next(Starting value)
Sub A, line: 6 event: next(next 1)
Sub B, line: 13 event: next(next 1)
Sub A, line: 6 event: next(next 2)
Sub B, line: 13 event: next(next 2)
Sub A, line: 6 event: completed
Sub B, line: 13 event: completed
*/
   ```
   
  Lưu ý trong ví dụ này rằng BehaviorSubject được khởi tạo với giá trị bắt đầu (dòng 3). Khi  first subscription (Sub A) được thêm vào, Behavior subject sẽ phát lại giá trị bắt đầu (dòng 5 - 8). Sự kiện “next 1” sau đó được phát ra và nhận bởi Sub A và giá trị được lưu trữ trong BehaviorSubject để phát lại (dòng 10). Khi đăng ký thứ hai (Sub B) được tạo, BehaviorSubject sẽ phát lại tiếp theo là 1 tiếp theo (dòng 12 - 14). Các sự kiện cuối cùng  “next 2”  và " completed" , được phát ra cho cả Sub A và Sub B. Chuỗi kết thúc trên sự kiện đã hoàn thành (dòng 19).
  
 ### Variable
 
 Tại trái tim của nó, Variable là một trình bao bọc xung quanh BehaviorSubject cho phép xử lý đơn giản hơn. Thay vì gửi các sự kiện next()  thông thường, Variable cung cấp cú pháp dấu chấm để nhận và đặt một giá trị duy nhất được phát ra dưới dạng sự kiện next () và được lưu trữ để phát lại. Thuộc tính "**.value**" được hiển thị nhận và đặt giá trị thành thuộc tính được lưu trữ riêng _value. Ngoài ra, nó tạo ra một sự kiện next() mới cho BehaviorSubject được tổ chức riêng tư có trong Biến trong phương thức setter. Variable cũng có một phương thức **.asObservable ()** trả về BehaviorSubject do tư nhân nắm giữ để quản lý các subscribers của mình.
 
 Các biến không cho phép chấm dứt sớm. Nói cách khác, bạn không thể gửi một sự kiện error() hoặc đã completed() để chấm dứt chuỗi. Bạn chỉ cần đợi Variable được giải quyết và tự chấm dứt chuỗi trong phương thức deinit của nó.
 
 Biến được lên kế hoạch cho deprecation, vì vậy hãy chú ý đến một đối tượng tương tự trong tương lai gần.
 
   ```swift
   let disposeBag = DisposeBag()
            
let variable = Variable<String>("starting value") //instantiate variable with starting value
            
variable.asObservable().subscribe({ //asObservable() returns the BehaviorSubject which is held as a property. Sequence replays "starting value" to Sub A
  print("Sub A, line: \(#line)", "event: \($0)")
})
.disposed(by: disposeBag)
            
variable.value = "next 1" // gets and sets to a privately stored property. Additionally, creates a next() event on the privately stored BehaviorSubject
variable.asObservable().subscribe({ //Sequence replays "next 1" to Sub B
  print("Sub B, line: \(#line)", "event: \($0)")
})
.disposed(by: disposeBag)

variable.value = "next 2" //emits "next 2" to both Sub A and Sub B
/*
prints:
Sub A, line: 6 event: next(starting value)
Sub A, line: 6 event: next(next 1)
Sub B, line: 13 event: next(next 1)
Sub A, line: 6 event: next(next 2)
Sub B, line: 13 event: next(next 2)
Sub A, line: 6 event: completed
Sub B, line: 13 event: completed
*/
   ```
    
   Ví dụ này sẽ trông rất quen thuộc vì nó có các hoạt động chính xác giống như ví dụ BehaviorSubject trước đó. Trong trường hợp này, lưu ý rằng Biến được khởi tạo với giá trị bắt đầu (dòng 3). Phương thức **.asObservable ()** được sử dụng để thêm đăng ký (dòng 5 & 12) và mỗi lần giá trị gần đây nhất được phát lại. Thuộc tính **.value** được sử dụng để gửi các sự kiện  next() và cập nhật giá trị cho phát lại (dòng 10 & 17) và trong khi không có sự kiện hoàn thành nào được gửi rõ ràng, Biến sẽ xử lý việc này khi kết thúc thực hiện và nó được xử lý.
   
   ### ReplaySubject
   
 Cho đến nay chúng ta đã thấy một chủ đề no replay (PublishSubject) và hai chủ đề replay một sự kiện tiếp theo (BehaviorSubject và Biến). Như tên gọi của nó, ReplaySubject cung cấp cho bạn khả năng phát lại nhiều sự kiện tiếp theo. Để thực hiện việc này, bạn chỉ định kích thước bộ đệm của mình khi khởi tạo ReplaySubject và nó duy trì các sự kiện tiếp theo mới nhất của bạn cho đến giới hạn bộ đệm. Khi một new subscriber được thêm vào, các sự kiện được lưu trữ trong bộ đệm được phát lại lần lượt từng cái như thể chúng xảy ra liên tiếp ngay sau khi đăng ký. Một lần nữa, các sự kiện dừng lại được phát lại cho những người đăng ký mới.
 
 
 Các trường hợp sử dụng tốt cho Replay subject là những trường hợp ghi thông tin lịch sử như lưu trữ các thuật ngữ hoặc hoạt động tìm kiếm gần đây nhất mà người dùng có thể muốn hoàn tác.
 ```swift
 let disposeBag = DisposeBag()
            
let replaySub = ReplaySubject<String>.create(bufferSize: 4)
            
replaySub.on(.next("(pre) Event 1"))
replaySub.on(.next("(pre) Event 2"))
replaySub.on(.next("(pre) Event 3"))
replaySub.on(.next("(pre) Event 4"))
replaySub.on(.next("(pre) Event 5")) //5 events overfills the buffer
            
replaySub.subscribe({ //replays the 4 events in memory (2-5)
  print("line: \(#line)", "event: \($0)")
})
.disposed(by: disposeBag)
            
replaySub.on(.next("(post) Event 6")) //emits next event to subscription
            
replaySub.onError(MyError.error2) //emits error event and terminates the sequence
            
replaySub.on(.next("(post) Event 7")) //sequence cannot emit event as it has been terminated
/*prints:
line: 12 event: next((pre) Event 2)
line: 12 event: next((pre) Event 3)
line: 12 event: next((pre) Event 4)
line: 12 event: next((pre) Event 5)
line: 12 event: next((post) Event 6)
line: 12 event: error(error2)

   ```
   
   Trong ví dụ này, ReplaySubject giữ một bộ đệm gồm 4 sự kiện tiếp theo thuộc kiểu String (dòng 3). Ngay lập tức, 5 sự kiện tiếp theo xảy ra trước khi đăng ký được thêm vào. Như chúng ta mong đợi, điều này tràn bộ đệm có nghĩa là không bao giờ nhận được sự kiện "(pre) event 1 "(được xác nhận trong bảng điều khiển in ra). Giống như chúng ta đã thấy trong các ví dụ trước, sự kiện dừng (dòng 18) chấm dứt ý nghĩa chuỗi các sự kiện tiếp theo trong tương lai (dòng 20) không thể được nhận bởi các observers.
   
   ### Tổng kết
   
   Hy vọng rằng bạn có thể bắt đầu thấy lý do tại sao Subjects rất mạnh trong RxSwift. Bằng cách quyết định mức độ bạn muốn replay(phát lại) các sự kiện, bạn có thể phân bổ bộ nhớ một cách đơn giản và hiệu quả và chỉ truy cập các sự kiện lịch sử mà bạn cần.
   
   Referent from Source: [Link](https://medium.com/swift2go/rxswift-part-2-working-with-subjects-34e35a058a2c)