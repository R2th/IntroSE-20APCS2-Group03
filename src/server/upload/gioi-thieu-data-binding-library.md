# I. Tổng quan
Thư viện data binding là một thư viện hỗ trợ cho phép ta có thể bind thành phần UI trong layout tới data source trong ứng dụng sử dụng một định dạng khai báo thay vì phải lập trình.
Layout thường được định nghĩa ở trong những activity với code gọi tới các phương thức trong UI framework. Ví dụ như để hiển thị dữ liệu lên một TextView ta phải findViewById rồi sử dụng phương thức setText.
Sử dụng thư viện data binding cho phép ta có thể đưa dữ liệu vào ngay từ trong layout file. Điều này cho phép ta xóa bỏ những câu lệnh bằng Java. Sử dụng cú pháp @{} để gán.
Sử dụng binding component trong layout file cho phép ta xóa bỏ những lời gọi UI framework trong những activities, làm cho chúng đơn giản hơn và dễ bảo trì hơn. Nó cũng có thể cải thiện hiệu năng của ứng dụng và giúp loại bỏ memory leak cũng như là null pointer exception.
# II. Thiết lập cơ bản
Thư viện Data Binding cung cấp tính linh hoạt và tương thích rộng - nó là một thư viện hỗ trợ, vậy nên ta có thể sử dụng nó với những thiết bị chạy từ Android 4.0 (API 14) trở lên.
Android Studio hỗ trợ nhiều tính năng cho data binding. Những tính năng cho biểu thức databinding như:
* Highlight cú pháp.
* Đánh dấu lỗi cú pháp của biểu thức.
* Hoàn thành code XML.
* Tham chiếu, bao gồm điều hướng và tài liệu nhanh.
Preview pane trong Layout Editor hiển thị giá trị mặc định của data binding expression, nếu nó được cung cấp.
Android Gradle plugin phiên bản 3.1.0-alpha06 đã thêm data binding compiler mới để tạo các lớp binding. Compiler mới từng bước tạo những lớp binding, trong hầu hết trường hợp sẽ giúp tăng tốc độ build.
Phiên bản trước đó của data binding compiler tạo những class binding trong cùng bước với compile code được quản lý. Nếu code compile thất bại, ta sẽ nhận được nhiều report lỗi rằng các lớp binding không được tìm thấy. Compiler mới tránh những lỗi này bằng cách tạo những class binding trước khi build ứng dụng.
# III. Layout và biểu thức binding
Expression language cho phép ta có thể viết biểu thức để xử lý sự kiện được gửi đi bởi các view. Thư viện Data Binding sẽ tự động tạo ra những class cần thiết để bind view trong layout với những data object.
Data binding layout file sẽ bắt đầu với một thẻ root là layout, sau đó là thẻ data và một view root. View này chính là view layout của file.
Một binding class được tạo cho mỗi layout file. Theo mặc định, tên của class này được dựa trên tên của layout file, được chuyển thành Pascal case và thêm Binding vào phía sau. Ví dụ, layout là activity_main.xml thì tên của class được tạo ra tương ứng là ActivityMainBinding. Class này sẽ giữ tất cả những binding từ thuộc tính của layout tới view của layout và biết phải gán value tới binding expression như thế nào. Phương thức được khuyên dùng để tạo binding là làm khi inflate layout.
Nếu ta sử dụng data binding trong Fragment, ListView hay RecyclerView adapter, ta có thể sử dụng phương thức inflate của binding class hoặc DataBindingUtil.
Binding data code được khởi tạo tự động kiểm tra giá trị null và chống null pointer exception.
Những collection thông thường, như là array, list, maps,..  có thể được truy cập bằng cách sử dụng toán tử [].
Data Binding cho phép ta viết biểu thức để xử lý sự kiện được gửi đi từ view, như là onClick chẳng hạn. Tên của thuộc tính sự kiện được quyết định bằng tên của phương thức listener với một số ngoại lệ. Ví dụ, View.OnClickListener có phương thức onClick, vậy nên thuộc tính cho event này là android:onClick.
# IV. Làm việc với đối tượng dữ liệu Observable
Observability nói tới khả năng của một đối tượng có thể cung cấp thông tin về sự thay đổi của dữ liệu bên trong nó. Thư viện Data Binding cho phép ta có thể tạo đối tượng, trường hoặc các collection có khả năng quan sát.
	Bất kỳ POJO nào cũng có thể được sử dụng cho data binding, nhưng chỉnh sửa dữ liệu bên trong đối tượng không tự động cập nhật UI. Data binding có thể được sử dụng để làm cho đối tượng dữ liệu có khả năng thông báo cho những đối tượng khác, như là listener, khi mà dữ liệu của nó thay đổi. Có 3 kiểu khác nhau của observable class: object, field và collection.
	Khi một trong những observable data object được bind tới UI và dữ liệu bên trong nó thay đổi, UI sẽ tự động update.
## 	1. Observable field
Một số công việc có liên quan tới việc tạo những class cài đặt interface Observable, và điều này là không đáng nếu như những class đó chỉ có một vài thuộc tính. Trong trường hợp này, ta có thể sử dụng Observable class và những class sau để tạo observable field.
Observable field bản thân nó đã bao gồm một observable object có một field duy nhất. Phiên bản primitive tránh boxing and unboxing khi truy cập biểu thức. Để sử dụng cơ chế này, tạo một trường public final.
## 2. Observable collection
Một số ứng dụng sử dụng cấu trúc động để lưu trữ dữ liệu. Observable collection cho phép truy cập những cấu trúc này sử dụng một key. Class ObservableArrayMap hữu dụng khi key thuộc kiểu dữ liệu tham chiếu, như là String. Class ObservableArrayList hữu dụng khi key là một giá trị integer.
## 3. Observable object
Một class cài đặt Observable interface cho phép các listener luôn lắng nghe sự thay đổi bên trong nó đăng ký để nhận thông báo.
Observable interface có một cơ chế để thêm và xóa listener, nhưng ta cần phải quyết định khi nào thông báo được gửi đi. Để làm việc phát triển dễ hơn, thư viện Data Binding cung cấp class BaseObservable, được cài đặt cơ chế đăng ký listener. Data class cài đặt BaseObservable chịu trách nhiệm thông báo khi các thuộc tính thay đổi. Điều này được thực hiện bằng cách gán một Bindable annotation tới getter và gọi phương thức notifyPropertyChanged trong setter.
Data binding tạo ra một class có tên là BR trong module package chứa những ID của tài nguyên được sử dụng cho data binding. Annotation Bindable tạo một entry trong class BD trong quá trình compilation. Nếu base class cho các data class không thể bị thay đổi, Observable interface có thể được cài đặt sử dụng một đối tượng PropertyChangeRegistry để đăng ký và thông báo các listener một cách hiệu quả.
# V. Tạo các lớp binding
Thư viện Data Binding tạo ra những binding class được sử dụng để truy cập tới những biến và view của layout. 
Những binding class được tạo sẽ liên kết biến của layout với view bên trong layout. Tên và package của binding class có thể được tùy chỉnh. Tất cả binding class được tạo kế thừa từ ViewDataBinding class.
Một binding class được khởi tạo cho mỗi layout file. Theo mặc định, tên của class được dựa trên tên của layout file, được chuyển thành dạng Pascal case và được thêm hậu tố Binding vào. Class này sẽ giữ tất cả ràng buộc từ thuộc tính của layout tới layout view và biết cách để gán giá trị cho biểu thức binding.
## 1. Tạo một binding object
Binding object nên được tạo sớm, sau khi inflate layout để chắc chắn rằng hệ thống phân cấp view không bị chỉnh sửa trước khi nó được bind tới các view với biểu thức trong layout. Phương thức phổ biến nhất để bind object tới layout là sử dụng phương thức static của binding class. Ta có thể inflate cây phân cấp view và bind object tới nó bằng cách sử dụng phương thức inflate() của binding class.
Có một phiên bản thay thế khác của phương thức inflate đó là nhận vào một đối tượng ViewGroup  đi kèm với đối tượng LayoutInflater.
Nếu layout được inflate bằng cách sử dụng một cơ chế khác, nó có thể được bind một cách độc lập.
Đôi khi kiểu binding không thể được biết trước. Trong trường hợp này, binding có thể được tạo bằng cách sử dụng class DataBindingUtil.
Nếu ta sử dụng data binding item bên trong một Fragment, ListView hay RecyclerView adapter, ta có thể sẽ cần sử dụng phương thức inflate() của binding class hoặc của class DataBindingUtil.
## 2. Views với ID
Data Binding Library tạo một trường không thay đổi trong binding class cho mỗi view có một ID ở trong layout.
Thư viện extract các view bao gồm ID từ cây phân cấp view trong cùng một lần. Cơ chế này có thể nhanh hơn cách gọi findViewById cho mỗi view trong layout.
Các ID là không cần thiết như khi không dùng data binding. Tuy nhiên, vẫn có một số trường hợp ta cần dùng các ID này.
## 3. Biến
Thư viện data binding tạo các phương thức truy nhập cho mỗi biến được khai báo ở trong layout.
## 4. ViewStubs
Không như những view thông thường, đối tượng ViewStubs bắt đầu như một invisible view. Khi chúng được set visible hoặc được chỉ định inflate, chúng sẽ thay thế chính chúng trong layout bằng cách inflate layout khác.
Bởi vì ViewStub về cơ bản sẽ biến mất khỏi hệ thống phân cấp view, nên view trong binding object cũng phải biến mất để cho phép được claim bởi garbage collection.
Bởi vì các view là final, một đối tượng ViewStubProxy sẽ chiếm chỗ của ViewStub trong binding class được tạo ra, cho phép ta truy cập vào ViewStub khi nó tồn tại và cũng truy cập để inflate cây phân cấp view khi mà ViewStub được inflate.
Khi ta inflate một layout khác, một binding cần phải được tạo cho layout mới. Do đó, ViewStubProxy phải được lắng nghe ViewStub OnInflateListener và tạo binding khi được yêu cầu. Do chỉ có một listener có thể tồn tại tại một thời điểm, ViewStubProxy cho phép ta có thể set một OnInfateListener, thứ sẽ được gọi sau khi tạo binding.
## 5. Immediate Binding
Khi một biến hoặc một observable object thay đổi, binding được lên kế hoạch để thay đổi trước frame tiếp theo. Tuy nhiên, có những lúc binding cần được thực thi ngay lập tức. Để force execution, sử dụng phương thức executePedingBindings.
# VI. Binding adapter
Binding adapter chịu trách nhiệm thực hiện các lời gọi cụ thể trong framework để set các valu. Một ví dụ là set một giá trị như gọi phương thức setText. Một ví dụ khác là set một event listener như gọi tới phương thức setOnClickListener.
Thư viện Data Binding cho phép ta có thể chỉ định lời gọi phương thức để set một value, cung cấp cho ta những binding logic riêng, và chỉ định kiểu trả về của đối tượng sử dụng adapter.
## 1. Setting attribute values
Bất cứ khi nào một giá trị được bind thay đổi, binding class được tạo phải gọi tới một phương thức setter trong view với biểu thức binding. Ta có thể cho phép thư viện Data Binding tự động quyết định phương thức thức, khai báo rõ ràng phương thức , hoặc cung cấp một custom logic để lựa chọn phương thức.
### Automatic method selection
Để set giá trị cho một thuộc tính example, thư viện sẽ tự động cố gắng thử tìm kiếm phương thức setExample chấp nhận kiểu tương thích làm đối số. Namespace của thuộc tính không được xem xét, chỉ có tên của thuộc tính và kiểu được sử dụng để tìm kiếm phương thức.
Ví dụ, ta có biểu thức android:text = “@{user.name}”, thư viện sẽ tìm kiếm phương thức setText(arg) chấp nhận kiểu trả về của phương thức user.getName. Nếu kiểu trả về của phương thức user.getName() là String, thư viện sẽ tìm kiếm phương thức setText chấp nhận đối số là String. Nếu biểu thức trả về một giá trị int, library sẽ tìm phương thức setText chấp nhận đối số là int. Biểu thức phải trả về kiểu hợp lệ, ta có thể ép kiểu trả về nếu cần thiết.
Data binding làm việc kể cả khi không có thuộc tính tồn tại với tên được đưa ra. Ta có thể tạo thuộc tính cho bất kỳ setter nào bằng cách sử dụng data binding. Ví dụ, support class DrawerLayout không có một thuộc tính nào, nhưng vẫn có setter.
### Specify a custom method name
Một số thuộc tính có setter không được gán với tên. Trong trường hợp này, một thuộc tính có thể được liên kết với setter của nó bằng cách sử dụng BindingMethod annotation. Annotation được sử dụng với một class và có thể chứa nhiều BindingMethod annotation, một cho mỗi phương thức được đổi tên. Binding method có annotation có thể được thêm vào bất kỳ class nào trong ứng dụng.
Hầu hết trường hợp, ta không cần rename setter trong Android Framework class. Các thuộc tính được cài đặt sẵn sử dụng quy tắc đặt tên cho việc tự động tìm kiếm.
### Provide a custom logic. 
Một số thuộc tính có thể được custom bằng binding logic. Ví dụ, không có liên kết nào giữa setter và thuộc tính android:paddingLeft. Thay vào đó, phương thức setPadding được cung cấp. Một phương thức static binding adapter với BindingAdapter annotation cho phép ta có thể customize cách mà một setter cho một thuộc tính được gọi.
Thuộc tính của Android framework đã có sẵn BindingAdapter annotation được tạo.
Kiêu của tham số rất quan trọng. Tham số đầu tiên xác định kiểm của view được liên kết với thuộc tính. Tham số thứ hai quyết định kiểu được chấp nhận trong biểu thức binding cho thuộc tính đã nhận.
Binding adapter hữu dụng cho những kiểu tùy chỉnh khác. Ví dụ, một custom loader có thể được gọi từ một worker thread để load một ảnh.
Binding adapter mà ta định nghĩa sẽ ghi đè adapter mawcjd dịnh được cung cấp bởi Android framework khi conflict xảy ra.
Phương thức của binding adapter có thể tùy ý lấy giá trị cũ trong quá trình xử lý của chúng. Một phương thức lấy một giá trị cũ và một giá trị mới nên được khai báo tất cả giá trị cũ cho thuộc tính trước, sau đó mới là các giá rị mới.
Bắt sự kiện có thể chỉ được sử dụng với interface hoặc abstract class với một phương thức abstract.
## 2. Object conversions
### Automatic object conversion
Khi object được trả về từ một biểu thức binding, thư viện sẽ chọn phương thức sử dụng để set value cho thuộc tính. Object được cast tới một tham số kiểu của phương thức được chọn.
### Custom conversions
Trong một vài trường hợp, một custom conversion được yêu cầu giữa một số kiểu cụ thể.
# VII. Bind layout view tới Architecture Component.
Thư viện AndroidX bao gồm các Architecture Component, cho phép ta có thể thiết kế ra như ứng dụng mạnh mẽ, có khả năng kiểm thử cũng như bảo trì cao. Thư viện Data Binding làm việc tốt với các Architecture Component để đơn giản hơn nữa quá trình phát triển giao diện cho ứng dụng. Layout trong ứng dụng có thể bind tới dữ liệu trong Architecture Components, thứ mà sẽ giúp bạn quản lý UI controller lifecycle và thông báo khi có sự thay đổi trong dữ liệu.
* Use LiveData to notify the UI about data changes
* Use ViewModel to manage UI-related data
Thư viện Data Binding làm việc hiệu quả với ViewModel, thứ sẽ đưa dữ liệu ra cho layout quan sát và phản hồi khi nó thay đổi. Sử dụng ViewModel với thư viện Data Binding cho phép ta có thể di chuyển logic UI ra khỏi layout và vào các component, cho phép dễ dàng test hơn. Thư viện Data Binding đảm bảo rằng view được bind và unbind khởi data source khi cần thiết. Hầu hết công việc còn lại nằm trong việc đảm bảo rằng ta expose đúng dữ liệu.
Để sử dụng ViewModel component với thư viện Data Binding, ta phải khởi tạo component, kế thừa từ class ViewModel, có được một instance của binding class, và gán ViewModel thành một thuộc tính trong binding class.
Trong layout, gán thuộc tính và phương thức của ViewModel tới view tương ứng sử dụng biểu thức binding.
* Use an Observable ViewModel for more control over binding adapter.
Ta có thể sử dụng ViewModel được cài đặt Observable để thông báo cho những thành phần khác của ứng dụng về thay đổi của dữ liệu, tương tự như cách ta tạo một đối tượng LiveData.
Có những tình huống mà ta có thể sẽ muốn sử dụng thành phần ViewModel để cài đặt Observable interface hơn là sử dụng LiveData object, ngay cả khi ta mất khả năng quan lý lifecycle của LiveData. Sử dụng một ViewModel cài đặt Observable cho phép ta điều khiển nhiều hơn trong ứng dụng. Ví dụ, kiểu thiết kế này cho phép ta điều khiển thông báo khi dữ liệu thay đổi, nó cũng cho phép ta chỉ định một custom method để set value cho một thuộc tính trong two-way data binding.
Để cài đặt một observable ViewModel, ta phải tạo một class kế thừa từ ViewModel và cài đặt Observable interface. Ta có thể cung cấp custom logic khi một observer subscribe hoặc unsubscribe để thông báo bằng cách sử dụng addOnPropertyChangedCallback và removeOnPropertyChangedCallback. Ta cũng có thể cung cấp custom login sẽ chạy khi thuộc tính thay đổi trong notifyPropertyChanged.
# VIII. Two ways data binding.
Sử dụng data binding một chiều, ta có thể set value trên một thuộc tính và set một listener sẽ phản hồi thay đổi ở thuộc tính đó. Với two-way data binding cung cấp một shortcut để làm việc này. Sử dụng @={} notation, nhận sự thay đổi của dữ liệu tới thuộc tính và lắng nghe update của người dùng cùng lúc. Để phản ứng với những thay đổi trong data, ta có thể làm cho biến trong layout là cài đặt của Observable, sử dụng BaseObservable và sử dụng @Bindable annotation.
# IX. Tài liệu tham khảo
[](https://medium.com/androiddevelopers/data-binding-lessons-learnt-4fd16576b719)
[](https://developer.android.com/topic/libraries/data-binding)