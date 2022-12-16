Phần thứ ba trong loạt RxSwift này. Trong bài viết trước, chúng ta đã xem xét các loại Đối tượng khác nhau với các ví dụ hoạt động để xem cách họ xử lý phát lại và dừng các sự kiện. Đến bây giờ, việc tạo và đăng ký các chuỗi có vẻ như là một nhiệm vụ khá đơn giản, vì vậy, hãy để bây giờ đi sâu vào một mức độ phức tạp khác và bắt đầu chuyển đổi các chuỗi.
### What Does It Mean To Transform A Sequence?

Thường thì bạn sẽ đăng ký một chuỗi chỉ để nhận một loại phần tử khác với loại bạn muốn làm việc. Ví dụ: bạn có thể muốn làm việc với biểu diễn Chuỗi của một Ngày, thay vì nhận các phần tử của loại Ngày trong các sự kiện tiếp theo của bạn, bạn sẽ muốn chuyển đổi chuỗi của mình để nó gửi cho bạn một loại Chuỗi. Âm thanh quen thuộc? Chúng tôi đã xử lý các loại biến đổi này trong các loại bộ sưu tập tiêu chuẩn bằng các phương thức như map, FlatMap, rút gọn và bộ lọc. Chúng ta sẽ thấy các tên tương tự, nhưng vì lập trình phản ứng là một mô hình không đồng bộ, các hành vi của các toán tử phản ứng có thể có một vài bất ngờ. Trong bài viết này, chúng tôi sẽ xem xét bản đồ, FlatMap và FlatMapLatest với việc kiểm tra sơ đồ đá cẩm thạch của họ và một ví dụ mã hóa cho mỗi bản đồ. 
### Map And An Introduction to Marbles

Map là một nơi khởi đầu đơn giản, tốt đẹp vì hành vi của nó gần giống như đối với các bộ sưu tập. Nó đi qua từng phần tử, áp dụng một phép biến đổi và trả về một chuỗi mới với các phần tử được sửa đổi. Như chúng ta mong đợi, trình tự ban đầu vẫn không thay đổi.
Cho đến nay chúng ta đã có thể mô tả các toán tử phản ứng mà không cần sự trợ giúp của các sơ đồ trực quan, nhưng bây giờ chúng tôi bắt đầu đi vào lãnh thổ nơi chúng có thể thực sự hữu ích, vì vậy, không chậm trễ, hãy để tôi giới thiệu cho bạn về những viên bi đá. Bạn có thể thấy tên của toán tử và phép biến đổi được áp dụng trong hình chữ nhật trung tâm. Các đường ngang chỉ ra những thay đổi trong chuỗi theo thời gian. Trong trường hợp này, chúng ta có một chuỗi đầu vào phía trên toán tử và một chuỗi đầu ra bên dưới. Đối với toán tử bản đồ, mỗi lần chuỗi đầu vào phát ra một sự kiện tiếp theo, phần tử được chuyển đổi và giá trị mới được phát ra cho chuỗi đầu ra.

![](https://images.viblo.asia/c5ecd3f5-f4b4-4ad8-b19f-f40d048a76b7.png)

 Như trong code:

   ```swift
   let db = DisposeBag()

let seqOrig = Variable<Int>(1)

let seqMapped = seqOrig.asObservable().map() { $0 * $0 }

seqOrig.asObservable().subscribe(onNext: {
    print("Original Sequence: \($0)")
})
    .disposed(by: db)

seqMapped.subscribe(onNext: {
    print("Mapped Sequence: \($0)")
})
    .disposed(by: db)

seqOrig.value = 2
seqOrig.value = 3
seqOrig.value = 4
 
/* prints:
Original Sequence: 1
Mapped Sequence: 1
Original Sequence: 2
Mapped Sequence: 4
Original Sequence: 3
Mapped Sequence: 9
Original Sequence: 4
Mapped Sequence: 16
*/
   ```
   
   Trong ví dụ này, chúng ta có thể thấy rằng chúng ta tạo một chuỗi với kiểu phần tử Int (dòng 3) và ánh xạ nó để giá trị của các phần tử được bình phương (dòng 5). Điều quan trọng nhất cần lưu ý là chuỗi ban đầu vẫn không thay đổi và một chuỗi mới là đầu ra có nghĩa là chúng ta hiện có hai chuỗi (seqOrig và seqMapped). Sau đó chúng ta có thể đăng ký cả hai chuỗi đó (dòng 7 và 12). Khi các sự kiện tiếp theo được phát ra trong seqOrig (dòng 17, 19), chúng được chuyển đổi và phát ra theo chuỗi được ánh xạ. Như chúng ta mong đợi, cả hai subscriptions đều được xử lý bởi dispose bag khi phạm vi được thoát.
   
   ### FlatMap
   
   Chúng ta đã thấy việc áp dụng các phép biến đổi cho các phần tử theo trình tự dễ dàng như thế nào, nhưng nếu chúng ta muốn truy cập vào một thuộc tính có thể quan sát được trong phần tử, hoặc điều gì xảy ra nếu chính phần tử đó có thể quan sát được? Đối với điều này, chúng ta cần sử dụng flapMap.
Trong sơ đồ diagram này, lưu ý rằng phần tử đầu tiên O1 trong chuỗi đầu vào được biến đổi và kết quả được phát ra cho chuỗi đầu ra. Nhưng thật thú vị, khi cùng một yếu tố đó phát ra một sự kiện tiếp theo một thời gian sau đó, nó cũng được chuyển đổi và phát ra thành chuỗi đầu ra. Nói cách khác, chuỗi đầu ra được đăng ký vào các yếu tố có thể quan sát được và sẽ nhận được các sự kiện tiếp theo trong các yếu tố đó bất cứ khi nào chúng xảy ra. Sự không điển hình này rất khác so với những gì chúng ta sẽ tìm thấy trong một FlatMap truyền thống.

![](https://images.viblo.asia/a60736d0-9b31-47c0-bb49-4c81ca5192e4.png)
 ```swift
 struct Person {
    var name: String
    
    var thingsEaten = PublishSubject<String>()
    
    init(name: String) {
        self.name = name
    }
    
    func eat(item: String) {
        thingsEaten.onNext("\(self.name) ate one \(item)")
    }
}

let matt = Person(name: "Matt")
let shawna = Person(name: "Shawna")

let db = DisposeBag()

let observedPerson = Variable<Person>(matt)

let flatMappedPeople = observedPerson.asObservable().flatMap {
    $0.thingsEaten
}

flatMappedPeople.subscribe(onNext: {
    print($0)
})
.disposed(by: db)

observedPerson.asObservable().subscribe(onNext: {
    print("observing: \($0.name)")
})
.disposed(by: db)

matt.eat(item: "donut")

shawna.eat(item: "apple") //will not be observed
observedPerson.value = shawna

shawna.eat(item: "piece of cheese")

matt.eat(item: "piece of chocolate")

/* prints
observing: Matt
Matt ate one donut
observing: Shawna
Shawna ate one piece of cheese
Matt ate one piece of chocolate
*/
 ```
 
 Trong ví dụ này, chúng tôi muốn observe các mặt hàng thực phẩm mà một nhóm người ăn. Để bắt đầu, chúng tôi tạo ra một thực thể gọi là Person, đáng chú ý là thuộc tính của nó. Những thứ Eatenen (ví dụ 1, dòng 4). Như bạn sẽ nhớ, một chủ đề xuất bản không phát lại bất kỳ thông tin lịch sử nào, vì vậy nó chỉ đơn giản là sẽ phát ra một sự kiện tiếp theo khi một người ăn thứ gì đó. Để hỗ trợ cho bài đăng này, chúng tôi có thể tạo một phương thức ăn tiện lợi (mục: Chuỗi) (ví dụ 1, dòng 10)
 
 Với thực thể được thiết lập, chúng ta có thể tạo hai người: Matt và Shawna (ví dụ 2, dòng 1 Biệt2) và một người có thể quan sát được, để chúng ta có thể đăng ký thói quen ăn uống của yếu tố con người (ví dụ 2, dòng 6). Tại thời điểm này, chúng tôi sử dụng FlatMap để chúng tôi có thể truy cập .thingsEaten có thể quan sát được trong phần tử người của chúng tôi. Bạn cũng có thể nhớ lại asObservable () để truy cập BehaviorSubject bên trong trình bao bọc Biến của chúng tôi (ví dụ 2, dòng 8).
 
 ### Wrap Up
 Trong bài viết hôm nay, chúng ta đã xem xét các chuỗi biến đổi và khi làm như vậy, chúng ta đã học cách không chỉ biến đổi các yếu tố, mà còn biến đổi các vật quan sát trong các yếu tố của chúng tôi. Tất nhiên, có nhiều toán tử phản ứng hơn trong chủ đề này và tôi hy vọng rằng bạn sẽ dành chút thời gian để khám phá chúng. Nếu có một khoản tiền lớn mà tôi hy vọng bạn sẽ nhận được, đó là ý tưởng mà bạn có thể hiểu rất nhiều về các nhà khai thác mới bằng cách nghiên cứu sơ đồ diagram của họ. Chúng được sử dụng rộng rãi trong tài liệu Reactive và thậm chí có những sơ đồ tương tác thú vị mà bạn có thể chơi với.
  Referent from Source: [Link](https://medium.com/swift2go/rxswift-made-easy-part-3-transforming-observable-sequences-1fcbfdd3c6d1)