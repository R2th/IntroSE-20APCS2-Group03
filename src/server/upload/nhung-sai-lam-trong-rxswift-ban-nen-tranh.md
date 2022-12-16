Khi chúng ta bắt đầu học một ngôn ngữ lập trình mới hay frameworks mới, ta thường tạo nhiều lỗi do chưa hiểu kỹ được vấn đề. Bài viết này sẽ giới thiệu những sai lầm thường gặp khi làm việc với RxSwift.

### 1. combineLatest vs withLatestFrom
Đây là lỗi rất thường hay gặp phải. combineLatest gởi event khi có bất kì một observales bên trong nào của nó gởi một event. Vì thế, nếu bạn muốn nhận phản hồi từ việc tap một button thì đó là ý tưởng sai lầm nếu sử dụng combineLatest.


### 2. Observable nên được khai báo với lazy
Observable bản chất là một lazy sequence. Nó không nên chạy một logic nào cho đến khi có subscription. Đôi khi, ta cần bọc một API có sẵn trong một Observable:
```
func rx_myFunction() -> Observable<Int> {
    let someCalculationResult: Int = calculate()
    return .just(someCalculationResult)
}
```

Việc bọc một giá trị đơn cũng chấp nhận được. Tuy nhiên, ta lại chạy tất cả các logic để tính toán giá trị trước một subscription. Nếu bạn sử dụng deffered, phép tính sẽ được chuyển cho đến khi có Observer nào đó subscribe Observale của bạn.

```
func rx_myFunction() -> Observable<Int> {
    return Observable.deferred {
        let someCalculationResult: Int = self.calculate()
        return .just(someCalculationResult)
    }
}
```

### 3. Sử dụng sai DisposeBag
DisposeBag là một tool tuyệt vời để lưu multiple Disposable và giải phóng chúng khi deinit. Tuy nhiên, điều quan trọng cần xem xét là khi nào bạn muốn huỷ subscription cũ?

Trường hợp sử dụng điển hình của nó là binding cell với data từ CellViewModel. Ta nên add disposable vào disposeBag của cell và giải phóng nó khi cell được reuse (trong phương thức prepareForReuse):

```
dataSource.configureCell = { _, tableView, indexPath, cellViewModel in
	let cell: TheCell = tableView.dequeueCell(at: indexPath)
	cellViewModel.image
		.drive(cell.avatarView.image)
		.disposed(by: cell.disposeBag)
	return cell
}
        
//somewhere in TheCell.swift file
class TheCell: UITableViewCell {
	private(set) var disposeBag = DisposeBag()
    
	override func prepareForReuse() {
		disposeBag = DisposeBag()
	}
}
```

### 4. Không sử dụng drivers trên UI
Traits trong Rxswift rất tuyệt, nó giúp giao tiếp và đảm bảo những giả định của ta trong thời gian compile code. Ví dụ, đối với Driver, mục đích chính của nó là được sử dụng trên giao diện của ứng dụng. Ta tuân theo luật định rằng tất cả các sequence mà UIViewController hoặc UIView subscribes phải là một Driver.

Với Rx, việc thay đổi queue/thread rất dễ dàng. Kết quả là, đôi khi ta thay đổi thread bởi một nhầm lẫn nào đó và quên gọi observeOn(MainScheduler.instance) trước khi làm việc với UI, và crash xảy ra.

```
protocol GalleryListViewModeling {
	var images: Observable<[Photo]> { get }
}
```

Nếu ta sử dụng Driver thay vào đó, việc transform một Observable thành Driver sẽ tự động thêm observeOn(MainScheduler.instance). Ta không cần quan tâm đến nó nữa.

```
protocol GalleryListViewModel {
	var images: Driver<[Photo]> { get }
}
```

Thay đổi nhỏ bên trong interface của protocol giúp bảo vệ ứng dụng khỏi những thay đổi của thread không mong đợi và crash.

### 5. Error handling
Observable được chấm dứt khi nào nó gởi completed hoặc error event. Nó cũng là một Observable traits.
flatMap gởi tất cả các event từ một Observable có sẵn vào original pipe. Nó chuyển tiếp các events tiếp theo cũng như các error.

```
let loginAtButtonTap: Observable<User> = button.rx.tap
	.withLatestFrom(credential)
	.flatMap(login)

loginAtButtonTap.subscribe(onNext: { user in
	// handle user login
})
```

Khi login function ném một lỗi, flatMap chuyển tiếp lỗi này cho main sequence là loginAtButtonTap. Bất cứ khi nào một Observable sequence gởi một error, nó dừng việc gởi các giá trị mới. Kết quả là, app sẽ dừng response khi button được kích.

Để tránh việc loginAtButtonTap bị dừng lại, ta có thể sử dụng kiểu Result<T> để có một Observable<Result<User>> hoặc sử dụng materialize(). 

### 6. Subscribing nhiều lần vào một Observable

Observable là immutable class. Mỗi operator trả về một object Observable mới và không chỉnh sửa giá trị gốc. Tuy nhiên, thỉnh thoảng ta cần chia sẻ kết quả giữa một vài Observable, ví dụ:
```
let items: Observable<[Item]> = itemsProvider.items
let count: Observable<Int> = items
	.map { $0.count }
    
items.subscribe(onNext: { items in 
    //do something with items
}) 

numberOfItems.subscribe(onNext: { count in 
	//do something with count
})
```

Giả sử rằng itemsProvider gọi một REST API để nhận các item, đoạn code trên sẽ gọi request hai lần. Khi subscribe items và numberOfItems, ta sẽ gọi itemsProvider hai lần vì items và count là hai Observable khác nhau.

Để chia sẻ kết quả từ itemsProvider, ta nên sử dụng share hoặc shareReplay(1):
```
let items: Observable<[Item]> = itemsProvider.items
	.share()
    
let count: Observable<Int> = items
	.map { $0.count }
    
items.subscribe(onNext: { items in 
	//do something with items
}) 
    
numberOfItems.subscribe(onNext: { count in 
	//do something with count
})
```

### 7. Lạm dụng subjects và variables
Variables và Subjects là tool tuyệt vời, tuy nhiên, việc sử dụng nên được giới hạn, khi dùng subjects và variable, ta đang sử dụng mutable variables nên cần phải thật cẩn thận.
Ta có thể dùng những operator khác thay thế cho Subject như merge, concat, publish và refCout, defer...