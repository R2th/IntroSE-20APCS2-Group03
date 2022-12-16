Test ViewModel là chúng ta tiến hành viết test cho phần ViewModel ở trong các mô hình có chứa ViewModel như MVVM hoặc MVVC-C, ... . Điều đó có nghĩa nghĩa là project của bạn phải được áp dụng một trong các mô hình đó. Nếu chưa từng áp dụng hoặc tìm hiểu về nó, vui lòng đọc tại [đây](https://viblo.asia/p/co-ban-ve-mvvm-model-view-viewmodel-pattern-Do754wdWlM6) hoặc tại [đây](https://viblo.asia/p/overview-model-view-viewmodelcoordinatormvvm-c-1Je5Ej70KnL)

Đây không phải là kỹ thuật hay phương pháp, mà đơn giản là chúng ta sử dụng những kỹ thuật như Mock, Stub, Fake, ... để test ViewModel - phần xử lí logic chính trong app. Vì vậy mục này sẽ hướng dẫn cụ thể một ví dụ, mang các đặc điểm đặc trưng nhất của phần ViewModel để chúng ta dễ hình dung về Test ViewModel cũng như viết UnitTest nói chung.

Các đặc điểm đặc trưng này có thể bao gồm:

- Khai báo, setup các thành phần liên quan
- Sử dụng Mock, Stub để xây dựng các thành phần thay thế
- Viết và chạy các function test

## Ví dụ:
Ta có 1 ViewModel với 1 function getData():

```
struct ViewModel: ViewModelType {

let useCase: MyUseCaseType

struct Input {
    let loadTrigger: Driver<Void>
}

struct Output {
    let data: Driver<Data>
}

    func transform(_ input: ViewModel.Input) -> ViewModel.Output {

        let data = input.loadTrigger
            .map { self.useCase.getData() }
            .asDriver()

        return Output(data: data)
    }
}
```

Với UseCase được tách ra như sau:

```
protocol NewsDetailUseCaseType {

    func getData() -> Data
}

struct MyUseCase: MyUseCaseType {

    func getData() -> Data {
        guard let rdata = RealmManager.objects(Data.self , predicate: predicate) else {
        return Data()
    }
        let data = News.parseFromList(rdata)
        return data
    }
}
```


### Khai báo, setup các thành phần liên quan

Đầu tiên, chúng ta tạo file test, nếu chưa biết thì bạn có thể tham khảo ở đây. Và tiến hành khai báo như sau:

```
@testable import MyProject

import XCTest

import RxSwift

import RxBlocking

class ViewModelTest: XCTestCase {

private var viewModel: ViewModel!
private var input: ViewModel.Input!
private var output: ViewModel.Output!
private var useCase: MyUseCaseMock!

private var disposeBag: DisposeBag!

private let loadTrigger = PublishSubject<Void>()

override func setUp() {
        super.setUp()
        useCase = MyUseCaseMock()
        viewModel = ViewModel(useCase: useCase)
        disposeBag = DisposeBag()

        input = ViewModel.Input(loadTrigger: loadTrigger.asDriverOnErrorJustComplete())

         output = viewModel.transform(input)
         output.data.drive().disposed(by: disposeBag)
    }
}
```

Lưu ý: Nếu import các module từ pod vào, chúng ta phải chắc chắn rằng các module đó đã được thêm vào target test trong file Podfile

Ví dụ:
```
target 'MyProjectTests' do

`inherit! :search_paths`

`# Pods for testing`

`pod 'RxBlocking', '5.0.0'`
end
```

### Sử dụng Mock, Stub để xây dựng các thành phần thay thế
Ở bên trên, chúng ta có MyUseCaseMock, sử dụng để thay thế cho MyUseCase, toàn bộ class đã được làm gọn đi như sau:

```
@testable import MyProject import RxSwift

final class MyUseCaseMock: MyUseCaseType {

var getDataCalled = false
var getDataReturnValue: [Data] = [Data()]

    func getData() -> [Data] {
        getDataCalled = true
        return getDataReturnValue
    }
}
```

### Viết và chạy các function test
Sau khi đã chuẩn bị đầy đủ các thành phần, chúng ta tiến hành viết các function test. Do ở viewmodel mới chỉ có hàm getData() nên chúng ta có function như sau:

Tại Class Test:

```
func test_LoadTrigger_GetData() {

//act
       loadTrigger.onNext(())
    let data = try? output.detail.toBlocking(timeout: 1).first()

    //equal
    XCTAssertNotNil(data)
}
```

Giải thích:
Function test bên trên đã kiểm tra xem data của hàm getData() trả về có bị nil hay không. Nếu nil, khi chúng ta chạy hàm sẽ fail và ngược lại.

Hoặc thêm nữa chúng ta có thể test xem khi bắt đầu, hàm getData() có được gọi đến không, sử dụng phần MyUseCaseMock đã được viết từ trước:

```
func test_loadTrigger() {

    loadTrigger.onNext(())
    // assert
    XCTAssert(useCase.getDataCalled)
}
```

Bằng cách sử dụng XCTAssert và kết hợp với các kỹ thuật hỗ trợ test, chúng ta sẽ xây dựng các function test cho các function tại ViewModel.
Cám ơn các bạn đã đọc bài viết của mình. Hi vọng nó sẽ giúp ích các bạn trong quá trình tìm hiểu về UnitTest