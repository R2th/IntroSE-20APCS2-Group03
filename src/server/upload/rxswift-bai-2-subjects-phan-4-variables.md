Bài này mình sẽ viết về subject cuối cùng trong 4 subject: Variables. Variables có các tính chất như behavior subject và lưu trữ giá trị hiện tại như trạng thái của nó. Bạn có thể truy cập giá trị hiện tại thông qua thuộc tính **value**, không giống như các subject khác, bạn có thể sử dụng thuộc tính **value** này để set 1 element vào trong 1 variable. Nói cách khác, bạn không cần sử dụng onNext(_:).

Variable có tính chất giống behavior subject: được tạo với một giá trị khởi tạo, và nó sẽ replay giá trị mới nhất hoặc giá trị khởi tạo tới các new subscribers. Để truy cập vào behavior subject bên dưới variable, gọi phương thức  asObservable().

Một tính chất khá đặc trưng của variable so với những subject khác đó là nó đảm bảo rằng sẽ không phát ra Error. Mặc dù bạn có thể lắng nghe .error events trong 1 subscription đến 1 variable, nhưng bạn không thể add 1 .error event  trên 1 variable. Ngoài ra, một variable cũng sẽ tự động kết thúc khi nó chuẩn bị deallocated, cho nên bạn không thể add .completed event vào nó.

Ví dụ:

```
example(of: "Variable") {
        // 1
        let variable = Variable("Initial value")
        let disposeBag = DisposeBag()
        
        // 2
        variable.value = "New initial value"
        
        // 3
        variable.asObservable()
         .subscribe {
                 print(label: "1)", event: $0)
         }
         .disposed(by: disposeBag)
}
```

1.  Tạo một variable với một giá trị khởi tạo. Variable có thể tự suy luận kiểu thông qua giá trị ban đầu nhưng bạn cũng có thể khai rõ ràng loại là gì, ví dụ  Variable<String>("Initial value").
2.  Add một giá trị mới cho variable, bạn lưu ý là lần này add thông qua thuộc tính value, chứ không thông qua onNext nữa
3.  Subscribe variable này bằng cách gọi **asObservable() **để truy cập vào behavior subject nằm bên trong của nó.

Nó sẽ in ra giá trị mới nhất, như sau:

```
--- Example of: Variable ---
1) New initial value
```

Bây giờ add thêm đoạn code sau:

```
// 1
variable.value = "1"
// 2
variable.asObservable()
 .subscribe {
 print(label: "2)", event: $0)
 }
 .disposed(by: disposeBag)
// 3
variable.value = "2"
```

1.  Add thêm giá trị mới vào variable
2.  Tạo thêm 1 subscription đến variable này.
3.  Add thêm một giá trị khác vào variable này.

Subscription 1 sẽ nhận được cả 1 và 2 vì nó đã subscribe ngay từ đầu; còn subscription 2 cũng nhận được 1 và 2 vì 1 là giá trị gần nhất, còn 2 nhận được là đương nhiên. Kết quả in ra như sau:

```
1) 1
2) 1
1) 2
2) 2
```

Không có cách nào để add event .error hay .completed vào variable, dù có cố add thì compiler cũng báo lỗi.
Variables rất linh hoạt. Bạn có thể subscribe chúng như là observables để có thể react bất cứ khi nào có 1 event .next mới xuất hiện, giống như các subject khác. Chúng còn có thể đáp ứng nhu cầu dùng lần rồi thôi khi bạn chỉ cần check giá trị hiện tại là đủ mà không cần phải subscribe gì cho phức tạp.