Swift là loại ngôn ngữ tốt, giúp bạn cảm thấy thoải mái khi sử dụng. Nó kết nối các khía cạnh tốt của các ngôn ngữ khác, làm cho Swift thực sự linh hoạt và tương đối dễ hiểu bởi những người mới dùng. Đó là lý do tại sao bạn có thể tìm thấy nó đang được sử dụng với *Object-Oriented Programming*, nhưng cũng có thể dùng với nhiều mô hình khác ví dụ như *Protocol-Oriented Programming*, được giới thiệu tại WWDC’15. Bạn không cần phải tìm kiếm nhiều để thấy rằng bạn cũng có thể sử dụng  *Functional Programming* và *Reactive Programming* trong Swift. Hôm này và một vài tuần tới chúng ta sẽ nói về sự kết hợp của *Functional Programming* và *Reactive Programming*,  **Functional Reactive Programming**.

Vậy **Functional Reactive Programming** là gì? Nói một cách ngắn gọn nó sử dụng *Reactive Programming*  cùng với *Functional Programming* blocks (filter, map, reduce etc.). Và bạn đoán xem? Swift đã được tích hợp sẵn! Và về phần *Reactive* , bạn có thể dùng RxSwift.
RxSwift là một phiên bản mở rộng của Reactive được viết bằng Swift.

"ReactiveX là sự kết hợp những ý tưởng tốt nhất của Observer pattern, the Iterator pattern, và functional programming"

Về cơ bản, bạn phải thay đổi cách nhìn của bạn từ việc gán giá trị cho biến, để quan sát một cái gì đó có thể và có thể sẽ thay đổi trong tương lai.

![](https://www.thedroidsonroids.com/wp-content/uploads/2016/02/Why-Jackie-390x267.jpg)

Bạn có thể hỏi "Tại sao tôi lại muốn sử dụng nó?". Vâng, câu trả lời rất đơn giản. Nó chỉ đơn giản hoá công việc của bạn. Thay vì sử dụng notification, thứ mà rất khó kiểm tra, chúng ta có thể sử dụng các  signals. Thay vì sử dụng delegates tốn nhiều dòng code, chúng ta có thể viết các block và loại bỏ switchs / ifs. Chúng ta cũng có KVO, IBActions, input filters, MVVM và nhiều loại nữa được xử lý trơn tru, dễ dàng bởi RxSwift. Hãy nhớ rằng, không phải lúc nào cũng là cách tốt nhất để giải quyết vấn đề, nhưng bạn cần phải biết khi nào sử dụng nó để tận dùng đầy đủ tiềm năng của nó. Mình sẽ cố gắng trình bày cho bạn một số ví dụ mà bạn có thể sử dụng trong ứng dụng của bạn.

# **Định nghĩa**.
Trước tiên, mình muốn bắt đầu với một số định nghĩa. Để hiểu rõ hơn về logic, chúng ta phải trải qua những việc cơ bản.

Điện thoại thông minh của bạn là một observable (đối tượng có thể quan sát được). Nó phát ra các tín hiệu như thông báo trên Facebook, tin nhắn, thông báo của Snapchat.... Bạn đăng ký nhận nó nên bạn nhận được mọi thông báo trong màn hình chủ của bạn. Bây giờ bạn có thể quyết định làm gì với các signal đó. Bạn là một observer (người quan sát).

![](https://www.thedroidsonroids.com/wp-content/uploads/2016/02/that_was_easy.png)

Bạn đã chuẩn bị cho ví dụ dưới đây?

## **Example**

Chúng ta sẽ viết ứng dụng tìm kiếm thành phố, nhập tên thành phố vào ô tìm kiếm và tự động hiển thị danh sách. Khi bạn gõ gì đó vào thanh tìm kiếm, chúng ta sẽ tự động thử lấy danh sách thành phố bắt đầu với từ khoá đó và hiển thị lên table view. Đơn giản mà, phải không? Khi bạn thử xây dựng  chức năng tự động tìm kiếm trong ứng dụng của bạn, bạn luôn luôn phải nghĩ tới một số trường hợp đặc biệt. Ví dụ như nếu người dùng gõ rất nhanh và thay đổi ý định thường xuyên? Chúng ta sẽ phải gửi rất nhiều API. Trong ứng dụng thực tế, bạn sẽ phải huỷ bỏ request cũ, đợi một lúc trước khi gửi request tiếp theo, kiểm tra từ khoá xem có giống với lần gõ cũ hay không... Chứa đụng rất nhiều logic mặc dù trông nó rất đơn giản khi mới bắt đầu phải không? "Nó chỉ là tìm kiếm tự động thôi mà, có gì có thể sai được chứ?" Dĩ nhiên bạn có thể làm mà không cần tới Rx, nhưng hãy xem chúng ta có thể viết các logic đó sử dụng tới ít code như thế nào.

Đầu tiên, chúng ta cần tạo project. Sau đó cài CocoaPods và RxSwift + RxCocoa. Ví dụ như Podfile ở dưới đây: 

```
platform :ios, '8.0'
use_frameworks!
 
target 'RxSwiftExample' do
 
pod "RxSwift"
pod "RxCocoa"
 
end
```

Bây giờ chúng ta có thể bắt đầu!

Chúng ta sẽ tạo giao diện đơn giản gồm UISearchBar + UITableView.

![](https://www.thedroidsonroids.com/wp-content/uploads/2016/02/Zrzut-ekranu-2016-02-24-o-14.13.55-390x404.png)

Tiếp theo chúng ta cần một mảng chứa tên thành phố. Để giảm thiểu logic trong code, mình sẽ tránh sử dụng API, thay vào đó mình sẽ sử dụng 2 mảng, một chứa tất cả thành phố và một sẽ hiển thị thành phố được tìm thấy.

```
var shownCities = [String]() // Data source for UITableView
let allCities = ["New York", "London", "Oslo", "Warsaw", "Berlin", "Praga"] // Our mocked API data source
```

Tiếp theo mình sẽ cài đặt UITableViewDataSource và kết nối với biến *shownCities*

```
@IBOutlet weak var tableView: UITableView!
@IBOutlet weak var searchBar: UISearchBar!
 
override func viewDidLoad() {
    super.viewDidLoad()
    tableView.dataSource = self
}
 
func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -&gt; Int {
    return shownCities.count
}
 
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -&gt; UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "cityPrototypeCell", for: indexPath)
    cell.textLabel?.text = shownCities[indexPath.row]
    
    return cell
}
```

Vậy là xong phần setup Table View. Giờ chúng ta sẽ chuyển qua phần thú vị hơn. Mình sẽ observe kí tự được nhập trong UISearchBar. Rất dễ bởi vì RxCocoa (extension của RxSwift) đã hỗ trợ chúng ta. Không chỉ UISearchBar mà còn rất nhiều Controls cung cấp với Cocoa frameworks được hỗ trợ từ Rx team. Trong trường hợp với UISearchBar, chúng ta có thể sử dụng biến rx.text để phát các signals một khi kí tự trong UISearchBar thay đổi. Thật dễ phải không nào? Đầu tiên chúng ta cần import RxCocoa & RxSwift.

```
import RxCocoa
import RxSwift
```

Tiếp theo tới phần observing. Ở viewDidLoad(), chúng ta sẽ observe biến  rx.text của UISearchBar

```
searchBar
    .rx.text // Observable property thanks to RxCocoa
    .orEmpty // Make it non-optional
    .subscribe(onNext: { [unowned self] query in // Here we will be notified of every new value
        self.shownCities = self.allCities.filter { $0.hasPrefix(query) } // We now do our "API Request" to find cities.
        self.tableView.reloadData() // And reload table view data.
    })
    .addDisposableTo(disposeBag)
```

Tuyệt vời! Và tìm kiếm động hoạt động như vậy. subscribeNext khá là dễ hiểu - chúng ta đăng kí theo dõi biến observable phát ra signals. Nó giống như bạn bảo với chiếc điện thoại "Được rồi, bây giờ có gì mới thì hãy hiển thị cho ta". Và nó sẽ hiển thị cho bạn bất cứ thứ gì mới. Trong trường h ợp này chúng ta chỉ cần duy nhất kí tự mới, nhưng subscribe cũng có thêm nhiều wrappers với sự kiện như onError, onCompleted...

![](https://www.thedroidsonroids.com/wp-content/uploads/2016/02/what_if-390x389.jpeg)

Điều thú vị hơn nằm ở dòng cuối cùng. Khi chúng ta subscribe một observables, thường thì bạn sẽ muốn unsubscribe  khi đối tượng đó bị deallocate. Trong Rx, chúng ta có thứ gọi là *DisposeBag*, sẽ giúp giữ những thứ mà bạn muốn unsubscribe trong quá trình deinit. Trong một vài trường hợp thì không cần thiết, nhưng nguyên tắc chung là luôn tạo *Bag*  và add disposables cho nó. Trong bài tới, chúng ta sẽ học cách sử dụng một thư viện nhỏ để giúp chúng ta xử lý, nhưng tạm thời bây giờ chúng ta phải tự tạo *bag* 

```
var shownCities = [String]() // Data source for UITableView
let allCities = ["New York", "London", "Oslo", "Warsaw", "Berlin", "Praga"] // Our mocked API data source
let disposeBag = DisposeBag() // Bag of disposables to release them when view is being dealloca
```

Vậy bây giờ, sau khi compile, ứng dụng sẽ chạy đúng. Sau khi gõ kí tự "O", chúng ta sẽ có được kết quả "Oslo" được hiển thị trên table view. Nhưng...Vậy còn nhưng thứ chúng ta sợ? API spamming? Delay? Phải, chúng ta cần phải tự bảo vệ. Bắt đầu với bảo về API backend. Chúng ta cần thêm cơ chế delay, cái sẽ được gọi sau X giây sau khi gõ nhưng chỉ trong trường hợp kí tự đó khác so với kí tự cũ. Thường thì chúng ta sẽ sử dụng NSTimer, kích hoạt sau một khoảng thời gian. Không khó nhưng vẫn có thể có lỗi. Nếu chúng ta gõ "O", kết quả xuất hiện, sau đó chúng ta thay đổi suy nghĩ và gõ "Oc", nhưng ngay lập tức quay trở về "O", trước khoảng thời gian delay và API được gọi. Trong trường hợp này, chúng ta sẽ có 2 API giống nhau được gọi. Trong một vài trường hợp chúng ta muốn điều đó bởi có thể database được cập nhật rất nhanh, có bản ghi mới được thêm vào. Nhưng thường thì gọi 2 request giống nhau là không cần thiết trong khoảng thời gian giả sử 0.5 giây. Để làm điều đó không dùng Rx, chúng ta cần thêm một vài biến flag kết quả tìm được và so sánh với kết quả mới. Không mất nhiều dòng code nhưng logic sẽ ngày càng cồng kềnh. Với RxSwift, chúng ta có thể làm với 2 dòng code. *debounce()* tạo ra hiệu ứng delay trong khoảng thời gian được cung cấp và *distinctUntilChanged()* bảo về chúng ta khỏi kết quả giống nhau. Nếu chúng ta kết nối với bản cũ, nó sẽ trông giống thế này: 

```
searchBar
    .rx.text // Observable property thanks to RxCocoa
    .orEmpty // Make it non-optional
    .debounce(0.5, scheduler: MainScheduler.instance) // Wait 0.5 for changes.
    .distinctUntilChanged() // If they didn't occur, check if the new value is the same as old.
    .subscribe(onNext: { [unowned self] query in // Here we subscribe to every new value
        self.shownCities = self.allCities.filter { $0.hasPrefix(query) } // We now do our "API Request" to find cities.
        self.tableView.reloadData() // And reload table view data.
    })
    .addDisposableTo(disposeBag) 
```

Tuyệt với! Nhưng chúng ta vẫn bỏ sót một vài thứ. Nêu người dùng nhập gì đó và table view được cập nhât, sau đó người dùng lại xoá tất cả và để trống? Yeah, chúng ta sẽ gửi query với biến bị bỏ trống. Trong trường hợp này, chúng ta không muốn điều đó xảy ra nên làm cách nào để giải quyết? 
Với *filter()*, như bạn đã biết thì đã được tích hợp trong Swift nhưng nó gây ra câu hỏi "Tại sao tôi cần phải sử dụng *filter* cho một giá trị? filter() hoạt động với collection cơ mà!!!" Đây là một câu hỏi khá hay! Nhưng đừng nghĩ Observable như là một *value/object*. Nó là một dòng chảy của giá trị, hoạt động một cách tự nhiên. Và do đó, bạn sẽ dễ dàng hiểu cách sử dụng của *functional blocks.* Để *filter* giá trị, chúng ta sẽ làm giống cách làm với array hay strings. Chỉ cần: 

```
.filter { !$0.isEmpty } // Filter for non-empty query.
```

Và chỉ cần vậy! Code hoàn chỉnh bao phủ khá nhiều logic chỉ có 9 dòng code. Thật kì diệu!

```
searchBar
    .rx.text // Observable property thanks to RxCocoa
    .orEmpty // Make it non-optional
    .debounce(0.5, scheduler: MainScheduler.instance) // Wait 0.5 for changes.
    .distinctUntilChanged() // If they didn't occur, check if the new value is the same as old.
    .filter { !$0.isEmpty } // If the new value is really new, filter for non-empty query.
    .subscribe(onNext: { [unowned self] query in // Here we subscribe to every new value, that is not empty (thanks to filter above).
        self.shownCities = self.allCities.filter { $0.hasPrefix(query) } // We now do our "API Request" to find cities.
        self.tableView.reloadData() // And reload table view data.
    })
    .addDisposableTo(disposeBag)
```

Đã đủ cho hôm này. Khá vui phải không nào? Bài sau mình sẽ giới thiệu RxSwift qua ví dụ tiếp theo "Observable and the Bind". Các bạn nhớ đón xem nhé.

Nguồn: https://www.thedroidsonroids.com/blog/ios/rxswift-by-examples-1-the-basics/