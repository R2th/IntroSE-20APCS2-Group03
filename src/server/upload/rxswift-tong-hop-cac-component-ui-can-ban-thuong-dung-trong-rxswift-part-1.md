Bài viết này mang tính thực dụng một chút, giải thích cách dùng ngắn gọn, mang tính chất tra cứu nhanh cơ bản, đơn giản, đi thẳng vào code demo và tìm hiểu các **component UI** hay sử dụng trong **RxSwift**. 

Trong quá trình tìm hiểu cách sử dụng, sẽ review lại một số khái niệm trong **RxSwift**.

# **1. UIButton**

Giả sử UI ta có một button và một label. Khi nhấn **button** thì sẽ thay đổi giá trị **label**. Như vậy **button** là một **observable** và **label** sẽ thực hiện **observer** sự kiện **button** được **tap**.

Code như sau:
```
        tapButton.rx.tap.subscribe({ [weak self] _ in
            guard let this = self else {
                return
            }
            guard let text = this.numberLabel.text else {
                return
            }
            guard let number = Int(text) else {
                return
            }
            this.numberLabel.text = String(number+1)
        }).disposed(by: disposeBag)
```
**subscribe**: tức là sẽ **handler** một **observable sequence,** ở đây là **event** khi **tap** vào **button**. Trong body của closure sẽ thực hiện tiếp làm cái gì đó khi event tap button đó xảy ra.

**disposed**: liên quan đến việc quản lý bộ nhớ, trong đó **disposeBag** , giống như cái thùng rác, nơi chúng ta muốn các huỷ bỏ các đăng ký theo dõi trong quá trình **deinit**.

Phân tích tiếp cái **subscribe**, sẽ phát ra event mà observable emit ra (bao gồm **.next**, .**error** và **.completed**). Một sự kiện .next sẽ gửi đến 1 element hợp lệ đến handlers, và 1 .error sẽ chứa một error instance.

Ví dụ như này:
```
let observable: Observable = Observable.of(1,2,3)
        //1
        observable.subscribe({ event in
            print(event)
        })
// Kết quả:
> next(1)
> next(2)
> next(3)
> completed
        //2
        observable.subscribe({ event in
            if let element = event.element {
                print(element)
            }
        })
// Kết quả
> 1
> 2
> 3
        //3
        observable.subscribe(onNext : { element in
            print(element)
        })
 // Kết quả
> 1
> 2
> 3
```

Chúng ta có một observable, bao gồm các event (1,2,3)

//1: trả về tất cả event next

//2: trả về event .next dưới dạng optional

//3: trả về event

Cách 3 , **.onNext** là một **subscribe operator** giúp cho ta lấy được hẳn element mà không cần phải unwrap.

Ngoài ra, cũng rất hay sử dụng phiên bản đặc biệt của **subscribe** là **bind(to: )**. Ở đây ta hiểu khái niệm binding là một luồng dữ liệu đơn hướng (unidirectional stream of data).
Mô hình bind(to: ) hoạt động như hình này:

![](https://images.viblo.asia/c7486a98-1264-4093-b2c5-ac9b93fdda49.png)

Ví dụ code, cập nhật date lên label khi ấn button:
```
 refreshButton
            .rx
            .tap
            .map({ 
            let dateformatter = DateFormatter()
            dateformatter.dateStyle = .medium
            dateformatter.timeStyle = .medium
            return dateformatter.string(from: Date())
        })
        .bind(to: dateTimeLabel.rx.text)
        .disposed(by: disposeBag)
```

Hàm **bind(to:)** sẽ đảm nhận nhiệm vụ update text lên label. Nói chung là các kiểu như những component quen thuộc như **UILabel, UITextField, UIImageView** có data thay đổi ta có thế sử dụng **bind(to: )** để cập nhật data.

# **2. UISlider**
Chẳng hạn chúng ta muốn thay đổi **value** của **slider** và cập nhật giá trị lên **label**, ta sẽ làm như nào với **RxSwift**?
Ta sẽ sử dụng đến thuộc tính **.rx.value** như ví dụ này:
```
slider.rx.value.subscribe({
            [weak self] _ in
            guard let this = self else {
                return
            }
            this.calculator()
        }).disposed(by: disposeBag)

func calculator() {
        let percent = Double(slider.value).roundToPlaces(2)
        percentLabel.text = "(\(String(format: "%.0f", percent * 100))%)"
    }
```
Giống như ví dụ UIButton, chúng ta **subscribe value** của **observable** là cái **slider**, khi thay đổi **value** của **slider**, chúng ta sẽ thực thi tiếp công việc gì đó, cập nhật value lên label chẳng hạn.
Khá là dễ hiểu.


# 3. UIImagePickerController
Ví dụ tiếp theo chúng ta sẽ thử lấy ảnh từ Photo Album và hiển thị lên view, chúng ta sẽ dùng đến **UIImagePickerController**, hãy xem RxSwift xử lý như nào, đến đoạn hay (nhưng cũng khó hiểu).

Xem xét code demo sau:
```
 barButtonItem.rx.tap
            .flatMapLatest { [weak self] _ in
                return UIImagePickerController.rx.createWithParent(self) { picker in
                    picker.sourceType = .photoLibrary
                    picker.allowsEditing = false
                    }
                    .flatMap {
                        $0.rx.didFinishPickingMediaWithInfo
                    }
                    .take(1)
            }.map({
                info in
                return info[UIImagePickerControllerOriginalImage] as? UIImage
            }).subscribe(onNext: { [weak self] (image) in
                guard let this = self else {
                    return
                }
                guard let image = image else {
                    return
                }
                let textAttachment = NSTextAttachment()
                let scaleFactor = image.size.width / (this.textView.frame.size.width - 10);
                guard let cgImage = image.cgImage else {
                    return
                }
                textAttachment.image = UIImage(cgImage: cgImage, scale: scaleFactor, orientation: .up)
                let attString = NSAttributedString(attachment: textAttachment)
                this.textView.textStorage.insert(attString, at: this.textView.selectedRange.location)
            })
        .disposed(by: disposeBag)
```

Phân tích từng thành phần nhé.

 **1. rx.tap**:  cái này đã nói ở trên, chúng ta đang xử lý việc tap vào button.

**2. flatMapLatest:** flatmap thường được sử dụng khi muốn thực hiện một chuỗi observable tuần tự, là làm flat một collection thành một collection.

Nó thực hiện biến đổi các element được phát ra bởi các chuỗi  Observable này thành các chuỗi Observable khác, và merge các emissions  từ các chuỗi Observable thànnh 1 chuỗi đơn Observable duy nhất ( làm phẳng hoá, giống khái niệm flat gốc ở trên). 

flatMapLatest sẽ phát ra các element từ bên trong chuỗi Observable gần đây nhất.

Trong trường hợp này, chúng ta hiểu là sẽ lấy được phần tử picker từ trong **UIImagePickerController** (là một  **Observable**).

**3.   .flatMap:** lần này sẽ trả ra **delegate** của **UIImagePickerControllerDelegate** thông báo việc **picker** đã kết thúc.

**4. .map:** chuyển đổi **info** với thành  **image**

**5.  .subscribe(onNext: )**: và cuối cùng đẩy ra cho **Observer** 

(Đôi khi chúng ta chỉ cần hiểu công việc của các framework là input - ouput là gì là đủ dùng)

Tham khảo kỹ hơn trong bài viết này về flatMap và các operator liên quan khác

https://viblo.asia/p/flatmap-operators-trong-rxswift-yMnKMg3ml7P

https://viblo.asia/p/tim-hieu-rxswift-bai-2-cac-khai-niem-co-ban-trong-rx-Ljy5VrXj5ra

http://reactivex.io/documentation/operators/flatmap.html

Có vẻ như ví dụ trên khó hiểu quá, chúng ta thử lấy ví dụ khác dễ hiểu hơn
Ví dụ cách dùng map
```
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
            .disposed(by: disposeBag)
```

Kết quả sẽ là:
> one hundred twenty-three
four
fifty-six

Như vậy map thực hiện transform các element từ số sang text thông qua một trailling closures (closure dạng rút gọn)

(Xem cách sử dụng map tương đương ở link này:

https://medium.com/@tranhieutt/swift-tản-mạn-nhanh-về-map-reduce-flatmap-filter-a65dcc87a64

# 4. UITableView và UIControl
Chúng ta có **UITableView** để hứng dữ liệu và **UIControl** để update dữ liệu mới.
Trước hết,  ta có tập data và sẽ chuyển đổi **tập data** này thành một **observable**, đúng như khái niệm cốt lõi của FRP, mọi thứ đều có thể biến đổi thành **observable**.
Tập data:
```
let items = Variable([
            "Mike",
            "Apples",
            "Ham",
            "Eggs"
            ])
        
        let items2 = [
            "Fish",
            "Carrots",
            "Mike",
            "Apples",
            "Ham",
            "Eggs",
            "Bread",
            "Chiken",
            "Water"
            ]
```

Biến đổi thành **observable** và đẩy vào table view
```
        items.asObservable()
            .bind(to: tableView.rx.items(cellIdentifier: "Cell", cellType: UITableViewCell.self), curriedArgument: { (row, element, cell) in
                cell.textLabel?.text = element
            }).disposed(by: disposeBag)
```

Với hàm **.asObservable** chúng ta đã chuyển đổi sang observable, như vậy ta sẽ sử dụng đến **bind(to: curriedArgument:)** đến UITableView.
Lưu ý là ta đang dùng đến curriedArgument: là một **final argument passed to binder** ( kiểu closure)  để kết thúc quá trình binding.

Với UIControl, ta sử dụng đến thuộc tính **.controlEvent** để emit ra **changeValue** và tập data nói trên  đóng vai trò là observer, và khi tập data thay đổi thì tableView được cập nhật mới giá trị.
```
refreshControl.rx.controlEvent(.valueChanged)
            .subscribe(onNext: {
                _ in
                items.value = items2
                self.refreshControl.endRefreshing()
            }).disposed(by: disposeBag)
        
        tableView.addSubview(refreshControl)
```

# 5. UIGesture
Đối với các gesture recognizers như là tap, pan, swipe, drag, RxSwift cũng cung cấp sẵn observable cần thiết, chúng ta có thể sử dụng một cách đơn lẻ từng gesture.
Ví dụ:

```
let label = UILabel()
let disposeBag = DisposeBag()
override func viewDidLoad() {
    label.rx.gesture(.tap).subscribe {onNext (gesture) in
        // Your logic here
    }.addDisposableTo(disposeBag)
}
```

Nếu chúng ta muốn xử lý nhiều gesture cùng lúc thì sao? 
Ví dụ:

```
let label = UILabel()
let disposeBag = DisposeBag()
override func viewDidLoad() {
    label.rx.gesture(.tap, .pan, .swipeUp).subscribe { onNext (gesture) in
        switch gesture {
        case .tap: // Do something
        case .pan: // Do something
        case .swipeUp: // Do something 
        default: break       
        }        
    }.disposed(by: disposeBag)
}
```
Và đương nhiên, để sử dụng đc đoạn code trên, chúng ta phải import thêm một wrapper về gesture là [RxGesture](https://github.com/RxSwiftCommunity/RxGesture)

(Còn tiếp...)