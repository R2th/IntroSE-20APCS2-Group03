# 1. combineLatest
combineLatest là một operator được dùng khi value mà bạn muốn trộn cùng các Observables khác.
Khi một phần tử được phát ra bởi 2 Observables, sẽ kết hợp  các phần tử mới nhất  được emit bởi các Observable bằng cách sử dụng closure và kết quả phát ra dựa vào closure này.Operators này rất hữu ích khi bạn muốn đồng bộ giữa data server và data local.

![](https://images.viblo.asia/2adca21e-4a58-405b-9159-83c2f94c2e85.png)
combineLatest sẽ emit ra bất cứ khi nào và ở bất cứ nguồn Observables bất kỳ (miễn là mỗi Observables đã emit ra ít nhất 1 phần tử). 

Trong trường hợp bạn có một value từ một Observables và muốn combineLatest ra một phần tử bạn có thể dùng startWith. Operator  startWith mình sẽ giới thiệu các bạn sau nhé. 
Nói thì dài bạn cứ hiểu combineLatest như thế này: Khi kết hợp 2 Observables lại với nhau thì nếu Observable sẽ lắng nghe 2 phần từ cuối cùng của 2 Observalbe phát ra.
Ví dụ : 
```
func example() {
        let disposeBag = DisposeBag()
        
        let stringSubject = PublishSubject<String>()
        let intSubject = PublishSubject<Int>()
        
        Observable.combineLatest(stringSubject, intSubject) { stringElement, intElement in
                "\(stringElement) \(intElement)"
        }.subscribe{ event in
            print("event: \(event)")
        }.disposed(by: disposeBag)
        
        stringSubject.onNext("🅰️")
        
        stringSubject.onNext("🅱️")
        intSubject.onNext(1)
        
        intSubject.onNext(2)
        
        stringSubject.onNext("🆎")
    }
```
Kết quả: 

event: next(🅱️ 1) 

event: next(🅱️ 2)

event: next(🆎 2)

# 2. zip
Operator zip cũng kết hợp nhiều phần tử của nhiều Observables lại với nhau bằng closure.

![](https://images.viblo.asia/17bf2120-9b3d-4f89-8aba-8e5bece36ba3.png)

Phần tử  đầu tiên được emit bằng zip Observable  được phát ra bằng cách kết hợp phần từ đầu tiên được phát ra bởi Observable #1 và  phần tử đầu tiên được phát ra bởi Observable #2. Tương tự phần tử thứ 2 được emit bằng zip Observable là sự kết hợp phần tử thứ 2 được phát ra bởi Observable #1 và phần tử thử 2 được phát ra bới Observable #2 và cứ  như vậy.
Điều cần lưu ý là số emit phát ra bằng zip Observable  chính bằng số phần tử emit ở Observable phát ra ít nhất.

```
func example() {
        let disposeBag = DisposeBag()
        
        let stringSubject = PublishSubject<String>()
        let intSubject = PublishSubject<Int>()
        
        Observable.zip(stringSubject, intSubject) { stringElement, intElement in
            "\(stringElement) \(intElement)"
            }
            .subscribe(onNext: { print($0) })
            .disposed(by: disposeBag)
        
        stringSubject.onNext("🅰️")
        stringSubject.onNext("🅱️")
        
        intSubject.onNext(1)
        
        intSubject.onNext(2)
        
        stringSubject.onNext("🆎")
        intSubject.onNext(3)
    }
```

Kết quả: 

🅰️ 1

🅱️ 2

🆎 3

# 3 WithLatestFrom:
Operators này sẽ merge 2 chuỗi observable bằng cách kết hợp từng phần tử với 1 phần tứ mới nhất từ Observable thứ hai. 
![](https://images.viblo.asia/48795916-a7ec-426b-aaf4-51e71a34db3e.png)
Rxswift có 2 functions kết hợp phần từ Observable thứ nhất với phần tử mới nhất từ  Observable thứ hai. 
* withLatestFrom(_: )  : Nó merge 2  chuỗi thành 1 chuỗi bằng cách dùng phần tử mới nhất của chuỗi thứ 2  mỗi khi 'self' emit phần tử. Bạn có thể nhìn ví dụ dưới đây để hiểu rõ hơn:

```
func example() {
        let disposeBag = DisposeBag()
        let firstSubject = PublishSubject<String>()
        let secondSubject = PublishSubject<String>()

        firstSubject
             .withLatestFrom(secondSubject)
             .subscribe(onNext: { print($0) })
             .disposed(by: disposeBag)

        firstSubject.onNext("🅰️")
        firstSubject.onNext("🅱️")
        secondSubject.onNext("1")
        secondSubject.onNext("2")
        firstSubject.onNext("🆎")
    }
```

Output : 2

**Bạn hiểu đơn giản như thế này: firstSubject đóng vai trò là 1 trigger còn secondSubject nó sẽ emit ra phần tử mới nhất khi  firstSubject bị kích hoạt.**

 **Note: Sẽ không có giá trị bằng 1 được in ra vì secondSubject nó emit 2 phần từ  1, 2 liên tiếp nhau nên nó sẽ lấy phần tử mới nhất.**

Thằng secondSubject sẽ phát ra phần tử mới nhất mỗi khi thằng  firstSubject trigger event.


* withLatestFrom(_:resultSelector:) :  Merge 2 chuỗi bằng cách kết hợp mỗi phần tử từ chính bản thân nó với phần tử mới nhất từ Observable thứ hai.

```
func example() {
        let disposeBag = DisposeBag()
        let firstSubject = PublishSubject<String>()
        let secondSubject = PublishSubject<String>()

        firstSubject.withLatestFrom(secondSubject, resultSelector: { (value1, value2) in
            print("\(value1) \(value2)")
        })
             .subscribe(onNext: { print($0) })
             .disposed(by: disposeBag)

        firstSubject.onNext("🅰️")
        firstSubject.onNext("🅱️")
        secondSubject.onNext("1")
        secondSubject.onNext("2")
        firstSubject.onNext("🆎")
    }
```

Output: 

🆎 2

()


### Tổng kết : 

**combineLatest**:   dùng để phát ra value khi cả 2 observable đều cùng phát ra ít nhất 1 phần tử.

Tài liệu tham khảo : 
https://medium.com/swift-india/rxswift-combining-operators-combinelatest-zip-and-withlatestfrom-521d2eca5460