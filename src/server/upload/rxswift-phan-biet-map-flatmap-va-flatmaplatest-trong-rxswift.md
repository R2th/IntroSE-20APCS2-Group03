# Lời mở đầu:

-----


RxSwift là một Extension của ReactiveX được viết bằng ngôn ngữ Swift. Nó là sự kết hợp của Observer Pattern, Iterator Pattern và Functional Programing. RxSwift giúp cho công việc trở nên đơn giản hơn. RxSwift giúp tối giản và hạn chế việc sử dụng các Notifications và Delegate Pattern đi kèm với các câu lệnh if/else và các block code lồng nhau phức tạp trong code. Tuy nhiên, đối với các bạn mới học sử dụng RxSwift thì rất dễ bị nhầm lần giữa 3 operator đó là map, flatMap và flatMapLatest. Chính vì vậy, hôm nay chúng ta sẽ cùng nhau tìm hiểu rõ ràng hơn về 3 Trasnforming Operator này nhé.
# I) .map{ }:

-----


![](https://images.viblo.asia/cf072961-a0f6-40cb-bbc4-d53b766805a4.png)
### Cách thức hoạt động:
* map trong RxSwift tương tự như map trong thư viện chuẩn của Swift, ngoại trừ việc nó hoạt động bên trong một Observable. 
* map sẽ biến đổi từng phần tử (hay còn gọi là element) của chuỗi Observable theo một biểu thức nhất định.
### Ví dụ:
```swift
        let disposeBag = DisposeBag()

        Observable<Int>.of(1, 2, 3, 4, 5, 6, 7)
            .map { element in
                element * 10
            }
            .subscribe(onNext: { element in
                print(element)
            })
            .disposed(by: disposeBag)

```
* Trong ví dụ trên, chúng ta có một chuỗi Observable với kiểu dữ liệu là Int và có các element lần lượt là 1, 2, 3, 4, 5, 6, 7. Operator map đã lần lượt biến đổi các element của chuỗi Observable bằng cách lần lượt nhân chung lên với 10. Kết quả đầu ra chúng ta có một chuỗi Observable với các giá trị mới là 10, 20, 30, 40, 50, 60, 70.
Kết quả:
```
10
20
30
40
50
60
70
```
# II) .flatMap{ }:

-----


![](https://images.viblo.asia/4bd7394f-baa2-490d-893d-87c74d690ffb.png)
### Cách thúc hoạt động:
* flatMap biến đổi các element phát ra từ một Observable thành nhiều Observable, sau đó gộp lại thành một Observable duy nhất.
* Giả sử chúng ta có một chuỗi Observable tên là A và các element của chuỗi Observable này lại chứa một chuỗi Observable khác bên trong element đó. Khi đó thì A sẽ được gọi là Source Observable. flatMap sẽ là Operator giúp cho chúng ta lắng nghe được sự kiện từ các Observable nằm bên trong Source Observable bằng cách gộp các Observable nằm trong element của Source Observable thành một chuỗi Observable duy nhất. Từ đó ta có thể dễ dàng lắng nghe sự kiện từ các Observable nằm trong các element này.
### Ví dụ:
```swift
        struct Student {
            var name: String
            var score: Variable<Int>
        }

        let disposeBag = DisposeBag()
        
        let studentA = Student(name: "Mr.A", score: Variable(5))
        let studentB = Student(name: "Mr.B", score: Variable(10))
        let studentC = Student(name: "Mr.C", score: Variable(15))
        
        let sourceObservable = Observable.of(studentA, studentB, studentC)
        
        sourceObservable
            .flatMap { element in
                return element.score.asObservable()
            }
            .subscribe(onNext: { score in
                print("Student's score \(score)")
            })
            .disposed(by: disposeBag)
        
        studentA.score.value = 25
        studentB.score.value = 30
        studentC.score.value = 35
```
* Trong ví dụ, chúng ta có Source Observable với kiểu dữ liệu là Student. Điều đó có nghĩa bên trong mỗi element có kiểu dữ liệu là Student của Source Observable chúng ta đều có một chuỗi Observable khác đó chính là score. FlatMap giúp chúng ta lắng nghe được các thay đổi score của Student. 
* Chúng ta có 3 Student là A, B, C tương ứng với 3 element của Source Obseravble. Với flatMap thì chúng ta có thể dễ dàng lắng nghe các event mỗi khí thay đổi giá trị của các Observable lưu trữ score trong Student. Kết quả:
```
Student's score 5
Student's score 10
Student's score 15
Student's score 25
Student's score 30
Student's score 35
```
### Sự khác nhau giữa map và flatMap:
* .map dùng trong các trường hợp đồng bộ (synchronized), không phải chờ. Tức là mỗi khi nhận vào một element thì việc biến đổi element này ngay lập tức sẽ được thực hiện. Từng element sẽ được biến đổi tuần tự thông qua operator map.
* .flatMap dùng trong trường hợp bất đồng bộ (asynchronized). Element sẽ không lập tức được biến đổi mà chúng ta cần phải chờ chuỗi Observable nằm bên trong element của Source Observable emit ra sự kiện thì mới có thể thực hiện được công việc mong muốn.
# III) .flatMapLatest{ }:

-----


![](https://images.viblo.asia/27dbd78b-06fe-4b6d-b859-6c84cb902b4c.png)
### Cách thức hoạt động:
* Về cách thức hoạt động thì flatMapLatest tương tự như flatMap nhưng chúng ta chỉ có thể lắng nghe các sự kiện của chuỗi Observable nằm trong element cuối cùng của Source Observable.
### Ví dụ:
```swift
         struct Student {
            var name: String
            var score: Variable<Int>
        }
        
        
        let disposeBag = DisposeBag()
        
        let studentA = Student(name: "Mr.A", score: Variable(5))
        let studentB = Student(name: "Mr.B", score: Variable(10))
        let studentC = Student(name: "Mr.C", score: Variable(15))
        
        let sourceObservable = Observable.of(studentA, studentB, studentC)
        
        sourceObservable
            .flatMapLatest { element in
                return element.score.asObservable()
            }
            .subscribe(onNext: { score in
                print("Student's score \(score)")
            })
            .disposed(by: disposeBag)
        
        studentA.score.value = 25
        studentB.score.value = 30
        studentC.score.value = 35
```
* Với ví dụ trên, chúng ta sử dụng `Observable.of(studentA, studentB, studentC)` để tạo ra một Source Obseravble với 3 element lần lượt là studentA, studentB và studentC. flatMapLatest chỉ có thể theo dõi chuỗi Observable nằm trong element cuối cùng của Source Obseavble, và trong trường hợp này sau khi đã emit ra 3 element là studentA, studentB và studentC thì element cuối cùng của Source Observable chính là studentC. Bởi thế cho nên khi chúng ta thay đổi giá trị score của studentA và studentB thì ta không tiếp nhận được sự kiện. Nhưng khi score của studentC thay đổi, vì studentC là element cuối cùng của Source Observable nên ngay lập tức chúng ta nhận được sự kiện score của studentC thay đổi giá trị thành 35. Kết quả:
```
Student's score 5
Student's score 10
Student's score 15
Student's score 35
```
# Tài liệu tham khảo:
RxSwift - Reactive Programming with Swift