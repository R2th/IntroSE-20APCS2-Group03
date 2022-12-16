# 1. Giới thiệu
Hãy thử một ví dụ như sau:

```swift
final class ViewController: UIViewController {

    @IBOutlet weak var mapView: MKMapView!

    override func viewDidLoad() {
        super.viewDidLoad()
        configView()
    }

    private func configView() {
        mapView.delegate = self
    }
}

extension ViewController: MKMapViewDelegate {
    func mapView(_ mapView: MKMapView, regionDidChangeAnimated: Bool) {
        print(mapView.centerCoordinate)
    }
}
```

Đây là một triển khai cơ bản của **MKMapViewDelegate** nơi bạn muốn bắt các in toạ độ (coordinate) mới khi thay đổi region trên bản đồ.

Tuy nhiên, phong cách này rất mâu thuẫn với tư tưởng Observables của RxSwift. Liệu chúng ta có thể chuyển đổi delegate này thành `Observable<CLLocationCoordinate2D>` để có thể observe được không?
Chẳng phải sẽ tuyệt vời hơn đếu chúng ta có thể áp dụng như sau:

```swift
mapView.rx.centerDidChange
    .subscribe(onNext: { coordinate in
        /// Do something
    })
```

Hãy cùng thử thực hiện việc chuyển hoá delegate nhé:
# 2. Tạo Proxy Class
Đầu tiên chúng ta cần tạo một lớp proxy chứa các phương thức delegate. Proxy class này sẽ mang nhiệm vụ trung gian chuyển đổi giữa Delegate và Observable. 
Bạn sẽ cần phải cho proxy class kế thừa từ DelegateProxy, MKMapViewDelegate và DelegateProxyType.

```swift
import RxSwift
import RxCocoa
import MapKit

final class RxMKMapViewDelegateProxy: DelegateProxy<MKMapView, MKMapViewDelegate>, MKMapViewDelegate, DelegateProxyType {

    /// Typed parent object.
    public weak private(set) var mapView: MKMapView?

    /// - parameter mapView: Parent object for delegate proxy.
    public init(mapView: ParentObject) {
        self.mapView = mapView
        super.init(parentObject: mapView, delegateProxy: RxMKMapViewDelegateProxy.self)
    }

    /// Factory method
    static func registerKnownImplementations() {
        self.register { RxMKMapViewDelegateProxy(mapView: $0) }
    }

    /// Getter for delegate proxy
    static func currentDelegate(for object: MKMapView) -> MKMapViewDelegate? {
        let mapView: MKMapView = object
        return mapView.delegate
    }

    /// Setter for delegate proxy
    static func setCurrentDelegate(_ delegate: MKMapViewDelegate?, to object: MKMapView) {
        let mapView: MKMapView = object
        mapView.delegate = delegate
    }
}
```

# 3. Tạo các Extension Method cho các Delegate Method
Tiếp theo, chúng ta sẽ tạo một extension method cho các delegate method mà bạn mong muốn chuyển đổi sang Observable. 

Trước tiên, chúng ta cần tạo một biến có tên là delegate, loại DelegateProxy. Đây là biến cung cấp cho bạn trở lại class proxy mà chúng ta đã tạo phía trên:

```swift
var delegate: DelegateProxy<MKMapView, MKMapViewDelegate> {
    return RxMKMapViewDelegateProxy.proxy(for: base)
}
```
    
Sau đó chúng ta có thể quan sát các phương thức qua selector. Chúng ta sẽ quan sát selector và lấy một mảng các parameter qua dưới dạng [AnyObject?].
Tạo một biến mới có tên là **regionDidChangeAnimated: ControlEvent<Bool>**. Vì chúng ta chỉ cần biết nếu mapView có animate hay không nên chỉ cần lấy param ở vị trí số 2.

```swift
func mapView(_ mapView: MKMapView, regionDidChangeAnimated animated: Bool)
```
```swift
var regionDidChangeAnimated: ControlEvent<Bool> {
    let source = delegate
        .methodInvoked(#selector(MKMapViewDelegate.mapView(_:regionDidChangeAnimated:)))
        .map { annotation in
            return try castOrThrow(Bool.self, annotation[1])
    }
    return ControlEvent(events: source)
}    
```
Từ đó chúng ta có thể mở rộng thêm để để bắt toạ độ dưới dạng **Observable<CLLocationCoordinate2D>** của mapView khi region được thay đổi.
    
```swift
var centerDidChange: Observable<CLLocationCoordinate2D> {
    return regionDidChangeAnimated
        .map { [base] _ in base.centerCoordinate }
        .startWith(base.centerCoordinate)
}
```
    
Đây là toàn bộ :
    
```swift
extension Reactive where Base: MKMapView {
    /// Reactive wrapper for `delegate`.
    var delegate: DelegateProxy<MKMapView, MKMapViewDelegate> {
        return RxMKMapViewDelegateProxy.proxy(for: base)
    }

    var regionDidChangeAnimated: ControlEvent<Bool> {
        let source = delegate
            .methodInvoked(#selector(MKMapViewDelegate.mapView(_:regionDidChangeAnimated:)))
            .map { annotation in
                return try castOrThrow(Bool.self, annotation[1])
        }
        return ControlEvent(events: source)
    }

    var centerDidChange: Observable<CLLocationCoordinate2D> {
        return regionDidChangeAnimated
            .map { [base] _ in base.centerCoordinate }
            .startWith(base.centerCoordinate)
    }
}
```
    
Bạn có thể sử dụng pattern này với hầu hết mọi loại delegate.

# 4. Sử dụng để lắng nghe thay đổi

```swift
mapView.rx.centerDidChange
    .subscribe(onNext: { coordinate in
        print(coordinate)
    })
```
    
GitHub Project: https://github.com/tienpx-1643/RxSwiftMapDelegateExample

# 5. Tham khảo

Max Alexander. 2019. RxSwift — Migrate Delegates to BEAUTIFUL Observables. [ONLINE] Available at: https://medium.com/@sudomax/rxswift-migrate-delegates-to-beautiful-observables-3e606a863048. [Accessed 21 August 2019].