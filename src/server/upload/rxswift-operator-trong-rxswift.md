## Giới thiệu
**Operators** là những phép toán cho phép biển đổi observable thành observable mới để phù hợp với nhu cầu sử dụng, chúng ta có thể tạo ra một chuỗi các phép toán để biến đổi observable.

Phân loại các operators trong RxSwift:
- Creating Observables: gồm các phép toán dùng để khởi tạo observable.
- Transforming Observables: gồm các phép toán dùng để biến đổi các giá trị được phát ra bởi observable.
- Filtering Observables: gồm các phép toán dùng để chọn lọc các giá trị được phát ra bởi observable.
- Combining Observables: gồm các phép toán dùng để nhóm nhiều observables lại thành một observable.
- Error Handling Operators: gồm các phép toán dùng để thông báo lỗi từ observable.
- Observable Utility Operators: gồm các ultility hữu ích.
- Conditional and Boolean Operators: gồm các phép toán điều kiện.
- Mathematical and Aggregate Operators: gồm các phép toán tính toán số lượng các giá trị được phát ra.
- Connectable Observable Operators: gồm các phép toán có khả năng connect được observable.
- Operators to Convert Observables: gồm các phép toán dùng để convert observable thành object hoặc data structure.

Bây giờ mình sẽ đi chi tiết một số operator, tài liệu mình lấy từ cuốn **Reactive prorgaming with Swift**.
## 1. Transforming Operators
### 1.1 toArray()
Dùng để chuyển đổi một observable của các phần tử riêng lẻ thành một mảng các phần tử đó, và emit ra .next event chứa mảng này tới các subscribers của nó.:
![](https://images.viblo.asia/04bf3ad9-1e96-4b1b-82ed-3e83e3318437.jpg)
Ví dụ:
```
// 1
let observable = Observable.of("A", "B", "C")

// 2
print("element of observable.toArray(): ")
observable.toArray()
        .subscribe(onNext: {
                print($0)
        }).dispose()
        
// 3
print("element of observable: ")
observable
       .subscribe(onNext: {
                print($0)
       }).dispose()
```

Giải thích:
1. Tạo 1 observable của các phần tử "A", "B", "C"
2. Sử dụng **toArray()** để transform các phần tử này vào trong một array

Kết quả in ra như sau:
```
element of observable.toArray(): 
["A", "B", "C"]
element of observable: 
A
B
C
```
Như vậy operator toArray() đã biến đổi các phần tử "A", "B", "C" riêng lẻ thành một mảng ["A", "B", "C"]. Như bài đầu tiên mình đã viết, observable là **immutable** nên sau khi dùng toArray() xong, observable cũ không bị thay đổi.
### 1.2 map()
**map** trong RxSwift tương tự như **map** trong Swift: biến đổi các element được phát ra bởi Observable bằng cách áp dụng một function cho mỗi element. Trong trường hợp kiểu dữ liệu đầu ra bị thay đổi thì ta cần định nghĩa kiểu dữ liệu đầu ra trong closure.

![](https://images.viblo.asia/a5336ca2-5638-4873-83ca-e7c94f071f5a.jpg)

Ví dụ: 
```
Observable.of(1, 2, 3, 4, 5, 6, 7, 8, 9)
            .map {
                $0 * 10
            }
            .subscribe(onNext: {
                print($0)
            })
            .dispose()
```

Kết quả in ra như sau:
```
10
20
30
40
50
60
70
80
90
```
### 1.3 flatMap()
**flatMap** biến đổi mỗi element của một observable thành một observable, sau đó gộp tất cả các observable này lại thành một observable. Nó có vẻ hơi khó hiểu, bạn hãy xem sơ đồ marble sau:

![](https://images.viblo.asia/ec8b9cc3-0316-4014-95ee-a36a2fceec00.jpg)

Ví dụ:
```
// 1
struct Student {
    var score: BehaviorSubject<Int>
}

// 2
let ryan = Student(score: BehaviorSubject(value: 80))
let charlotte = Student(score: BehaviorSubject(value: 90))

// 3
let student = PublishSubject<Student>()

// 4
student
       .flatMap {
             $0.score
        }
        // 5
        .subscribe(onNext: {
             print($0)
         })
        .dispose()
        
// 6
student.onNext(ryan)
ryan.score.onNext(85)
student.onNext(charlotte)
charlotte.score.onNext(95)
```

1. Student là Struct có thuộc tính **score** có kiểu BehaviorSubject<Int>. 
2. Tạo 2 instance của Student là ryan và charlotte.
3. Tạo một subject nguồn kiểu Student
4. Dùng flatMap() operator truy cập tới score của student. 
5. In ra các element của vent .next của subscription này.
6. Add các instance của Student vào subject student và thay đổi thuộc tính score

Kết quả: 
```
80
85
90
95
```
### 1.4 flatMapLatest()
**flatMapLatest** là sự kết hợp của 2 operator: **map** và **switchLatest** (mình sẽ viết ở bên dưới, mục Combining Operators). Tương tự như **flatMap**, **flatMapLatest** biến đổi mỗi element của một observable thành một observable. Tương tự như **switchLatest**, **flatMapLatest** sẽ nhận các value của observable mới nhất và unsubscribe observable trước đó:
    
![](https://images.viblo.asia/8e856fb0-d291-404f-9654-b6bf08d40805.jpg)
    
Ví dụ:
```
let disposeBag = DisposeBag()
let ryan = Student(score: BehaviorSubject(value: 80))
let charlotte = Student(score: BehaviorSubject(value: 90))
let student = PublishSubject<Student>()
student
    .flatMapLatest {
        $0.score
    }
    .subscribe(onNext: {
        print($0)
    })
    .disposed(by: disposeBag)
student.onNext(ryan) 
ryan.score.onNext(85)
student.onNext(charlotte)
// 1
ryan.score.onNext(95)
charlotte.score.onNext(100)
```
    
Kết quả:
```
80
85
90
100
```

Giá trị 95 sẽ không được in ra bởi vì element mới nhất của subject student là **charlotte**.
    
Có một câu hỏi là khi nào sử dụng **flatMap**, khi nào sử dụng **flatMapLatest**? => Có lẽ trường hợp thường sử dụng **flatMapLatest** nhất là networking, ví dụ bạn có 1 search bar, khi người dùng nhập các ký tự *s, w, i, f, t * bạn muốn mỗi lần nhập ký tự sẽ thực hiện một lần tìm kiếm mới và bỏ qua kết quả lần tìm kiếm trước đó, **flatMapLatest** giúp bạn làm điều này.
## 2. Filtering Operators
### 2.1 ignoreElements
**ignoreElements** sẽ ignore các vent .next, giữ lại event .completed hoặc .error. **ignoreElements** có ích khi bạn chỉ muốn thông báo khi observable bị terminate thông qua event .completed hoặc .error.
![](https://images.viblo.asia/d8695560-d7a0-42af-8705-9a801b4673fe.jpg)
    
Ví dụ:
```
let strikes = PublishSubject<String>()
let disposeBag = DisposeBag()
strikes
    .ignoreElements()
    .subscribe { _ in
        print("You're out!")
    }
    .disposed(by: disposeBag)
strikes.onNext("X")
strikes.onNext("X")
strikes.onNext("X")
strikes.onCompleted()
```
Kết quả:
```
You're out!
```
### 2.2 filter
Cũng giống như filter trong Swift, filter operator lọc các element thoả mãn điều kiện là đúng:
![](https://images.viblo.asia/6710a1fb-6977-4666-864d-5740a0fcbc51.jpg)
    
Ví dụ:
```
Observable.of(1, 2, 3, 4, 5, 6)
    .filter { integer in
        integer % 2 == 0
    }
    .subscribe(onNext: {
        print($0)
    })
    .dispose()
```
    
Kết quả:
```
2
4
6
```
### 2.3 skip
**skip(n)** bỏ qua n phần tử đầu tiên:
![](https://images.viblo.asia/06c789a0-4be1-47c0-a909-a74941b9b984.jpg)
    
Ví dụ:
```
Observable.of("A", "B", "C", "D", "E", "F")
    .skip(3)
    .subscribe(onNext: {
        print($0)
    })
    .dispose()
```
    
Kết quả:
```
D
E
F
```
### 2.4 take
**take** ngược với **skip**, take(n) giữ lại n phần tử đầu tiên và bỏ qua các phần tử phía sau:
![](https://images.viblo.asia/37f10127-fb0c-4fca-ad09-18e216287c94.jpg)
    
Ví dụ:
```
Observable.of(1, 2, 3, 4, 5, 6, 7, 8)
    .take(5)
    .subscribe(onNext: {
        print($0)
    })
    .dispose()
```
    
Kết quả:
```
1
2
3
4
5
```
## 3. Combining Operators
### 3.1 startWith
**startWith** nối vào đầu của observable một giá trị khởi tạo, giá trị nối vào này phải cùng kiểu với các phần tử của observable.: 
![](https://images.viblo.asia/fe616ca9-87f1-4d32-8c19-c602c1f7a285.jpg)
    
Ví dụ: 
```
 let numbers = Observable.of(2, 3, 4)

 let observable = numbers.startWith(1)
 observable.subscribe(onNext: { value in
     print(value)
 })
```
Kết quả:
```
1
2
3
4
```
### 3.2 concat
concat nối các observable lại thành 1 observable, chỉ có thể nối các observable cùng kiểu:
![](https://images.viblo.asia/9591f7b7-349d-4c1d-a6fb-f745189c8c1e.jpg)
    
Ví dụ:
```
let first = Observable.of(1, 2, 3)
let second = Observable.of(4, 5, 6)

let observable = Observable.concat([first, second])
        
observable.subscribe(onNext: { value in
     print(value)
}).dispose()
```
Kết quả:
```
1
2
3
4
5
6
```
### 3.3 merge
    
![](https://images.viblo.asia/e2926b61-b1bd-4c3e-bec6-59eb567dbd80.jpg)

**merge** kết hợp nhiều observable bằng cách gộp các emit lại thành một observable. ** merge() ** complete khi tất cả các source Observable và Inner Sequence đều complete. Thứ tự complete của các Inner Sequence không liên quan đến nhau. Nếu bất kỳ Inner Sequence này emit ra Error thì observable merge() sẽ replay Error và terminate.
    
Ví dụ:
```
let left = PublishSubject<Int>()
let right = PublishSubject<Int>()
        
let source = Observable.of(left, right)
let disposable = source.merge().subscribe { (event) in
    print(event)
}
left.onNext(1)
right.onNext(3)
left.onNext(2)
right.onNext(4)
disposable.dispose()
```
Kết quả:
```
next(1)
next(3)
next(2)
next(4)
```
    
Thử thêm đoạn code sau vào trước dòng disposable.dispose():
```
left.onError(MyError.anError)
right.onNext(5)
```
    
Kết quả sẽ in ra như sau:
```
next(1)
next(3)
next(2)
next(4)
error(anError)
```
### 3.4 combineLatest
Mỗi lần một observable được combine emit 1 value, nó sẽ ghép value này với value mới nhất từ các observable khác được combine:
![](https://images.viblo.asia/3a400677-d662-41fc-98bf-a557c14de632.jpg)
    
Ví dụ:
```
let left = PublishSubject<Int>()
let right = PublishSubject<Int>()

let disposable = Observable.combineLatest(left, right) { (left, right) -> String in
    return "\(left) - \(right)"
    }.subscribe(onNext: { (event) in
        print(event)
    })
left.onNext(1)
right.onNext(3)
left.onNext(2)
right.onNext(4)
right.onNext(5)
disposable.dispose()
```
    
Kết quả:
```
1 - 3
2 - 3
2 - 4
2 - 5
```