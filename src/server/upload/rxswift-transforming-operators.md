# 1. Transforming Elements
### a, toArray
Observables emit các phần tử riêng biệt, nhưng bạn muốn làm việc với tập hợp các collections. Chẳng hạn khi bạn muốn binding một observaleb vào table hoặc collection view.Có một cách thuận tiện để bạn chuyển đổi một element thành một mảng elements bằng cách dùng **toArray**. Nó sẽ convert 1 chuỗi các element thành một mảng và emit bằng event .next 
![](https://images.viblo.asia/d8e91aa8-c5a7-4cb2-9aee-4f4443102907.png)

Ví dụ:
```
func example() {

      let disposeBag = DisposeBag()

      // 1
      Observable.of("A", "B", "C")
        // 2
        .toArray()
        .subscribe(onNext: {
          print($0)
        })
        .addDisposableTo(disposeBag)
    }
```
**Giải thích**: 
1. Tạo một Obersable của các chữ cái "A", "B", "C"
2. Dùng **toArray** để biến đổi các phần tử riêng lẻ thành một mảng

Kết quả: 
```
--- Example of: toArray ---
["A", "B", "C"]
```

### b, Map
RxSwift **map** giống với Swift, ngoại trừ nó là operator trên observables.
![](https://images.viblo.asia/1637fd37-2616-47db-b805-9dbbc7469a28.png)

Ví dụ :
```
func example() {

      let disposeBag = DisposeBag()

      // 1
      let formatter = NumberFormatter()
      formatter.numberStyle = .spellOut

      // 2
      Observable<NSNumber>.of(123, 4, 56)
        // 3
        .map {
          formatter.string(from: $0) ?? ""
        }
        .subscribe(onNext: {
          print($0)
        })
        .addDisposableTo(disposeBag)
    }
```

**Giải thích :**
1. Bạn tạo một formatter để đánh vần từng số.
2. Bạn tạo một  observable của **NSNumbers** ( bạn không thể convert sang kiểu intergers khi dùng formater).
3. Bạn dùng observable để get và return kết quả formater để trả về một chuỗi đánh vần hoặc chuỗi trống nếu **map**  return nil.

Bạn có thể dùng **mapWithIndex** để sử dụng chỉ số.
![](https://images.viblo.asia/e5ea069d-6f09-4c08-a1f1-6cd7532d5777.png)

Ví dụ :
```
func example() {

      let disposeBag = DisposeBag()

      // 1
      Observable.of(1, 2, 3, 4, 5, 6)
        // 2
        .mapWithIndex { integer, index in
            print("index: \(index) value: \(integer)")
          return index > 2 ? integer * 2 : integer
        }
        .subscribe(onNext: {
          print($0)
        })
        .addDisposableTo(disposeBag)
    }
```
Kết quả :

```
index: 0 value: 1
1
index: 1 value: 2
2
index: 2 value: 3
3
index: 3 value: 4
8
index: 4 value: 5
10
index: 5 value: 6
12
```

## 2 Transforming Inner Observables
### a, flatMap
Cho đoạn code dưới đây: 
```
struct Student {
    
  var score: Variable<Int>
}
```

Struct **Student** có property **score** là một Variable. Mình xin giới thiệu **flatMap**, một operators cho phép bạn  tiếp cận observable và làm việc với properties của observable.

![](https://images.viblo.asia/59653f25-d1c8-4876-b22d-31ced172e817.png)

Nhìn sơ đồ thì bạn sẽ hiểu là nguồn  observable là một object có value property là một observalbe có kiểu Int.Giá trị khởi tạo của property  là 1 số của một object nghĩa là giá trị của property O1 là 1, O2 là 2, O3 là 3.
Chắc các bạn đọc sẽ ko khó hiểu để mình đưa ra ví dụ cho các bạn dễ hiểu:
```
func example() {
        let disposeBag = DisposeBag()
        // 1
        let laura = Student(score: BehaviorSubject(value: 80))
        let charlotte = Student(score: BehaviorSubject(value: 90))
        // 2
        let student = PublishSubject<Student>()
        // 3
        student.flatMap {
            $0.score
        }
            
            // 4
            .subscribe(onNext: {
                print($0)
            })
            .disposed(by: disposeBag)
        
        student.onNext(laura)
    }
```

Output: 
```
80
```
**Giải thích** : 
1. Bạn sẽ khởi tạo 2 instance của struct Student là **laura** và  **charlotte**
2. Bạn tạo nguồn  subject có kiểu là Student
3. Dùng flatMap dùng để lấy các giá trị của thuộc tính scope của struct Student
4. Bạn sẽ in ra các giá trị của event next trong subscription. 

OK để đây chắc các bạn đã hiểu **flatMap** rồi, các bạn lại thắc mắc thế nó khác gì **map**. Vậy hãy thay ví dụ trên từ **flatMap** sang **map**:
```
func example() {
        let disposeBag = DisposeBag()
        // 1
        let laura = Student(score: BehaviorSubject(value: 80))
        let charlotte = Student(score: BehaviorSubject(value: 90))
        // 2
        let student = PublishSubject<Student>()
        // 3
        student.map {
            $0.score
        }
            
            // 4
            .subscribe(onNext: {
                print($0)
            })
            .disposed(by: disposeBag)
        
        student.onNext(laura)
    }
```
Output:
RxSwift.BehaviorSubject<Swift.Int>

Bạn thấy đấy các element được in ra trong subscription là một Observable chứ ko phải là value của Observable.


### b,  flatMapLatest
Về cách thức hoạt động thì flatMapLatest tương tự như flatMap nhưng chúng ta chỉ có thể lắng nghe các sự kiện của chuỗi Observable nằm trong element cuối cùng của Source Observable.
Operator trên là sự kết hợp **map** và **switchLatest**, nó hoạt động  tương tự flatMap nhưng nó chỉ lắng nghe các sự kiện của observable nằm trong element cuối cùng của nguồn Observable. Để hiểu hơn về  các bạn nên xem hình vẽ và ví dụ dưới đây :
![](https://images.viblo.asia/049e884f-06ce-4f75-b285-a159b5f20c30.png)


```
func example() {
        let disposeBag = DisposeBag()
        let laura = Student(score: BehaviorSubject(value: 80))
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
        student.onNext(laura)
        laura.score.onNext(85)
        student.onNext(charlotte)
//        // 1
        laura.score.onNext(95)
        charlotte.score.onNext(100)
    }
```

Output: 
```
80
85
90
100
```
Giải thích: 
1. Thay đổi value của property score của object **laura** là 95 thì giá trị này ko được in ra vì flatMapLatest đã chọn observable **charlotte**  là observable cuối cùng thay đổi.

Trường hợp khi sử event error thì như thế nào. Mình sẽ cho bạn 1 ví dụ để cho bạn dễ hiểu: 
```
func example() {
        enum MyError: Error {
            case anError
        }
        let disposeBag = DisposeBag()
        
        let laura = Student.init(score: BehaviorSubject<Int>(value: 20))
        let charlotte = Student.init(score: BehaviorSubject<Int>(value: 100))
        
        let student = BehaviorSubject.init(value: laura)
        
        let studentScore = student.flatMapLatest {
            $0.score
        }
        
        studentScore.subscribe(onNext: {
            print($0)
        }).disposed(by: disposeBag)
        
        laura.score.onNext(85)
        laura.score.onError(MyError.anError)
        
        laura.score.onNext(90)
        
        
        student.onNext(charlotte)
    }
```

Output:
20
85
Unhandled error happened: anError
 subscription called from:
 
 Console in ra "Unhandled error happened: anError" , kết quả studentScore chấm dứt không thể subscriber. Bạn có thể dùng toán tử  **materialize**, bạn có gói emit bằng một observable trong observable.
![](https://images.viblo.asia/52f5c49e-fbe4-4368-ad4a-1884efc04ae1.png)

Thay đổi đoạn code thành :
```
let studentScore = student
.flatMapLatest {
$0.score.materialize()
}
```

Output:
next(20)
next(85)
error(anError)
next(100)

## Tài liệu tham khảo: 
https://www.raywenderlich.com/682-rxswift-transforming-operators