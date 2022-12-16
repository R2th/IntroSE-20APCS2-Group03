Chào các bạn, ở phần trước chúng ta đã cùng nhau tìm hiểu qua về `Creational patterns` và `Structural patterns` và những trường hợp hay sử dụng chúng ở trong Android. Tiếp theo hôm nay chúng ta sẽ tìm hiểu nốt phần còn lại là `Behavioral Patterns` và `App Architectures` nhé. Thôi bắt đầu ngay nào. 
# Behavioral Patterns
“Vậy… làm cách nào để biết một class đang chịu trách nhiệm về việc gì?” 

`Behavioral Patterns` cho phép bạn chỉ định trách nhiệm cho các chức năng ứng dụng khác nhau. Bạn có thể sử dụng chúng để điều hướng cấu trúc và kiến trúc của dự án.

Các mẫu này có thể khác nhau về phạm vi, từ mối quan hệ giữa hai đối tượng đến toàn bộ kiến trúc ứng dụng của bạn. Thông thường, các nhà phát triển sử dụng nhiều Behavioral Patterns cùng nhau trong cùng một ứng dụng.
## Command 
Khi gọi món ăn tại một nhà hàng, bạn sẽ không biết đầu bếp nào sẽ chế biến món ăn của mình. Bạn chỉ cần đưa món ăn của mình cho người phục vụ, người này sẽ giao đơn hàng vào trong bếp cho người nấu.

Tương tự, `Command pattern` cho phép bạn đưa ra yêu cầu mà không cần biết người nhận. Bạn đóng gói một request dưới dạng một đối tượng và gửi nó đi. Nhưng làm thế nào hoàn thành request thì lại là một cơ chế hoàn toàn riêng biệt.

[Greenrobot’s EventBus](https://github.com/greenrobot/EventBus) là framework phổ biến hỗ trợ pattern này theo cách sau:
![](https://koenig-media.raywenderlich.com/uploads/2021/02/eventbus.png)

`Event` là một đối tượng được kích hoạt bởi user input, server data hoặc bất kỳ thứ gì khác trong ứng dụng của bạn. Bạn có thể tạo các lớp con cụ thể cũng mang theo dữ liệu:
```kotlin 
class MySpecificEvent { /* Additional fields if needed */ }
```
Sau khi xác định sự kiện của mình, bạn có được một instance của `EventBus` và đăng ký một đối tượng làm `subscriber`. Ví dụ: nếu bạn đăng ký một Activity , bạn sẽ có:
```kotlin
override fun onStart() {
  super.onStart()
  EventBus.getDefault().register(this)
}

override fun onStop() {
  super.onStop()
  EventBus.getDefault().unregister(this)
}
```
Bây giờ đối tượng là `subscriber`, hãy cho đối tượng biết loại sự kiện nào để đăng ký và đối tượng nên làm gì khi nhận được sự kiện:
```kotlin 
@Subscribe(threadMode = ThreadMode.MAIN)
fun onEvent(event: MySpecificEvent?) {
  /* Do something */
}
```
Cuối cùng, tạo và đăng một trong những sự kiện đó dựa trên tiêu chí của bạn:
```kotlin
EventBus.getDefault().post(MySpecificEvent())
```
Trông nó khá ảo diệu nên bạn có thể gặp một chút khó khăn khi theo dõi mô hình này trừ khi bạn có phạm vi kiểm thử tốt. Tuy nhiên, flow design tốt sẽ cân bằng khả năng đọc và dễ dàng thực hiện sau này.
Thư viện Event  được sử dụng khá nhiều ở các ứng dụng Android. Bạn có thể tham khảo thêm nó ở [Github](https://github.com/greenrobot/EventBus) nha.
## Observer
Đây có thể nói là là mẫu phổ biến nhất với dev Android.
![](https://res.cloudinary.com/practicaldev/image/fetch/s--VJCui3Lx--/c_imagga_scale,f_auto,fl_progressive,h_720,q_auto,w_1280/https://dev-to-uploads.s3.amazonaws.com/i/0umqa0oz6wf95h6aza4j.jpeg)
Mẫu Observer xác định sự phụ thuộc một-nhiều giữa các đối tượng. Khi một đối tượng thay đổi trạng thái, những thứ phụ thuộc theo nó sẽ nhận được thông báo và cập nhật một cách tự động. Nó giống như kiểu ta đăng kí nhận kết quả  trận đấu bóng đá. Bất cứ khi nào
có diễn biễn kịch tính hay có bàn thắng thì sẽ có tin nhắn gửi về máy của chúng ta. Một ví dụ nôm na là vậy.

Mô hình này rất linh hoạt. Bạn có thể sử dụng nó cho các hoạt động có thời gian không xác định, chẳng hạn như lệnh gọi API. Bạn cũng có thể sử dụng nó để phản hồi input của người dùng.

Ban đầu nó được phổ biến framework [RxAndroid](https://github.com/ReactiveX/RxAndroid), còn được gọi là `Reactive Android`. 
```kotlin
apiService.getData(someData)
  .subscribeOn(Schedulers.io())
  .observeOn(AndroidSchedulers.mainThread())
  .subscribe (/* an Observer */)
```
Tóm lại, bạn xác định `Observable` object  sẽ phát ra các giá trị. Các giá trị này có thể phát ra tất cả cùng một lúc, dưới dạng một luồng liên tục hoặc ở bất kỳ tốc độ và thời lượng nào.

Các `Subscriber` object sẽ lắng nghe các giá trị này và phản ứng với chúng khi chúng đến. Ví dụ: bạn có thể tạo 1 subscription khi thực hiện lệnh gọi API, lắng nghe phản hồi của máy chủ và phản hồi tương ứng.

Muốn học Rx chắc chắn các bạn phải hiểu được Observer pattern. Ngay cả bộ jetpack cũng tồn tại Observer pattern, đó chính là LiveData. Bạn có thể tìm hiểu thêm về nó ở [đây](https://www.raywenderlich.com/192258/screencast-android-architecture-components-livedata)

Theo mình thấy thì Android chỗ nào cũng có Obsever pattern, Kotlin Flow với StateFlow hay SharedFlow hay cả Channel cũng đều tuân theo pattern này cả. Cho nên nếu bạn muốn hiểu và sử dụng tốt tất cả các lib trên. thì bạn hãy học thật kỹ pattern này nhé.
## Strategy
Bạn sử dụng Strategy pattern khi bạn có nhiều đối tượng có cùng bản chất với các chức năng khác nhau. Để hiểu rõ hơn, hãy xem đoạn code sau:
```kotlin
// 1
interface TransportTypeStrategy {
  fun travelMode(): String
}

// 2
class Car : TransportTypeStrategy {
  override fun travelMode(): String {
    return "Road"
  }
}

class Ship : TransportTypeStrategy {
  override fun travelMode(): String {
    return "Sea"
  }
}

class Aeroplane : TransportTypeStrategy {
  override fun travelMode(): String {
    return "Air"
  }
}

// 3
class TravellingClient(var strategy: TransportTypeStrategy) {
  fun update(strategy: TransportTypeStrategy) {
    this.strategy = strategy
  }

  fun howToTravel(): String {
    return "Travel by ${strategy.travelMode()}"
  }
}
```
Nào cùng phân tích đoạn code này một chút nhé:

1. Interface `TransportTypeStrategy` có kiểu chung cho các `"strategies`" khác nên nó có thể được thay thế cho nhau trong thời gian chạy.
1. Tất cả các lớp cụ thể đều tuân theo `TransportTypeStrategy`.
1. `TravellingClient` biên soạn "strategies" và sử dụng các chức năng của nó bên trong các chức năng tiếp xúc với phía khách hàng.
Đây là cách bạn sử dụng nó:
```kotlin
val travelClient = TravellingClient(Aeroplane())
print(travelClient.howToTravel()) // Travel by Air
// Change the Strategy to Ship
travelClient.update(Ship())
print(travelClient.howToTravel()) // Travel by Sea
```
Giống như từ Nam Từ Liêm (Hà Nội) mà muốn vào Thủ Đức (Sài Gòn) thì bạn phải đi ô tô ra Sân bay, rồi đi máy  bay vào Sài Gòn. Rồi lại đi du thuyền đến Thủ Đức , kiểu vậy =))

Khi nào bạn muốn thay đổi cái gì đó lúc runtime, hãy nghĩ đến ` Strategy pattern`. 
## State
Trong `State pattern`, trạng thái của một đối tượng thay đổi hành vi của nó tương ứng khi trạng thái bên trong của đối tượng thay đổi. Hãy xem các đoạn code sau:
```kotlin
// 1
interface PrinterState {
  fun print()
}

// 2
class Ready : PrinterState {
  override fun print() {
    print("Printed Successfully.")
  }
}

// 3
class NoInk : PrinterState {
  override fun print() {
    print("Printer doesn't have ink.")
  }
}

// 4
class Printer() {
  private val noInk = NoInk()
  private val ready = Ready()
  private var state: PrinterState
  private var ink = 2

  init {
    state = ready
  }

  private fun setPrinterState(state: PrinterState) {
    this.state = state
  }

  // 5
  fun startPrinting() {
    ink--
    if (ink >= 0) {
      setPrinterState(ready)
    } else {
      setPrinterState(noInk)
    }
    state.print()
  }

  // 6
  fun installInk() {
    ink = 2
    print("Ink installed.")
  }
}
```
Phân tích qua code chút nào :

1. `PrinterState` xác định các trạng thái của máy in.
1. `Ready` là một lớp cụ thể triển khai `PrinterState` để xác định trạng thái sẵn sàng của máy in.
1. `NoInk` là một lớp cụ thể triển khai `PrinterState` để xác định rằng máy in không có mực.
1. `Printer` xử lý thực hiện tất cả các thao tác in.
1. `StartPrinting` bắt đầu in.
1. `InstallInk` cài đặt mực.
Đây là cách bạn sử dụng nó:
```koltin 
val printing = Printer()
printing.startPrinting() // Printed Successfully.
printing.startPrinting() // Printed Successfully.
printing.startPrinting() // Printer doesn't have ink.
printing.installInk() // Ink installed.
printing.startPrinting() // Printed Successfully.   
```
Vì vậy, bạn tạo một đối tượng của class Printer để in. Lớp `Printer` xử lý tất cả các trạng thái của máy in trong nội bộ xem nó ở trạng thái `Ready` hay là ở trạng thái `NoInk`.

Thằng `State` vs thằng `Strategy` hay bị nhầm lẫn với nhau vì nó kha khá giống nhau. Bạn hãy nhớ một thằng bị phục thuộc và trạng thái còn thằng kia thì không
* Strategy Pattern quyết định cách thực hiện một số hành động, sử dụng Strategy khi chúng ta cần  trả lời how.
* Trong khi State Pattern quyết định khi nào để thực hiện chúng, sử dụng State khi chúng ta cần  trả lời when/ what (state or type).

# App Architectures
“Có khi nào ta phải sửa đổi hoặc triển khai các tính năng mới trong dự án này không?”

Kiến trúc ứng dụng đóng một phần quan trọng trong việc cấu trúc base code được kết hợp lỏng lẻo. Bạn có thể sử dụng nó ở bất cứ đâu, không phân biệt nền tảng. Kiến trúc ứng dụng giúp bạn viết code có thể test, mở rộng và tách rời một cách dễ dàng.

Nói một cách dễ hiểu, Kiến trúc đề cập đến tổ chức tổng thể code của bạn trong những thứ như:

1. Trách nhiệm của từng lớp
1. Tổ chức thư mục
1. Cấu trúc của mã: network calls, responses, errors.

**Các loại kiến trúc ứng dụng**

Kiến trúc ứng dụng được sử dụng để tạo code base vững chắc và có thể bảo trì, nhưng trong bài viết này, bạn sẽ tìm hiểu qua những kiến trúc phổ biến nhất:
* Model View Controller
* Model View Presenter
* Model View ViewModel
* Clean Architecture

## Model View Controller
Model View Controller, hoặc MVC, đề cập đến một trong những mẫu kiến trúc phổ biến nhất và là mẫu mà nhiều mẫu khác bắt nguồn từ đó. Đặc biệt dễ dàng thiết lập dự án của bạn theo cách này trên Android. Tên của nó đề cập đến ba cách để phân loại các lớp trong code của bạn:

**Model**: Các lớp dữ liệu của bạn. 
Trong Kotlin, chúng ta sử dụng các Data classes, trong khi trong Java chúng được gọi là POJOs (Plain Old Java Object).

**View**: Các class  trực quan. Mọi thứ người dùng nhìn thấy đều thuộc mục này. Trong Android thì nó chủ yếu là XML, mặc dù bạn cũng có thể tạo các chế độ xem bằng code và với sự ra đời của Jetpack Compose thì việc tạo UI sẽ thực hiện ở bằng code động.

**Controller**: Chất keo kết dính giữa hai thứ. Nó cập nhật view, nhận thông tin đầu vào của người dùng và thực hiện các thay đổi đối với model.

Việc phân chia code của bạn giữa ba mục này sẽ giúp bạn đi một chặng đường dài hướng tới việc làm cho code được tách rời và có thể tái sử dụng.

Một khách hàng sẽ yêu cầu bạn thêm màn hình mới vào ứng dụng sử dụng dữ liệu hiện có của nó. Tuân theo mô hình MVC có nghĩa là bạn có thể dễ dàng sử dụng lại các mô hình tương tự và chỉ thay đổi view.

Hoặc có lẽ khách hàng sẽ yêu cầu bạn di chuyển tiện ích ưa thích đó từ home screen sang detail screen. Việc tách logic View khiến bạn làm cho điều này trở thành một nhiệm vụ dễ dàng.

Ngoài ra, di chuyển càng nhiều bố cục và resource vào Android XML  sẽ giữ cho lớp view của bạn sạch sẽ và gọn gàng !

Theo thời gian, bạn sẽ thấy việc đưa ra các quyết định về kiến trúc dễ dàng hơn trong MVC và bạn có thể dễ dàng giải quyết các vấn đề hơn khi chúng phát sinh.

## Model View Presenter
MVP là một mẫu kiến trúc mà bạn có thể sử dụng để giải quyết một số thiếu sót của MVC và là một kiến trúc thay thế tốt. Nó cung cấp tính mô-đun, khả năng kiểm thử và nói chung thì là một cơ sở code sạch hơn và dễ bảo trì hơn.

MVP bao gồm các thành phần sau:

**Model**: Mô hình sẽ tiếp tục chứa dữ liệu trong các lớp đơn giản, vì vậy không có gì thực sự thay đổi ở đây.

**View**:  sẽ tiếp tục được triển khai bằng cách sử dụng các lớp Activity hoặc Fragment.

**Presenter**: Xử lý các cập nhật giao diện người dùng dựa trên các thay đổi đối với mô hình dữ liệu và cũng xử lý đầu vào của người dùng. Presenter sẽ chứa nhiều code nghiệp vụ và thay thế controller .

Data (model) và UI (view), chỉ giao tiếp với nhau thông qua một trung gian (presenter). Presenter chứa phần lớn logic nghiệp vụ, trong khi view tập trung vào cách hiển thị dữ liệu. 

## Model View ViewModel
Mẫu kiến trúc này được đặt tên tương tự như mẫu MVC. Các thành phần Model và View giống nhau.

Đối tượng ViewModel là chất kết dính giữa các lớp model và View nhưng hoạt động khác với thành phần Controller. Thay vào đó, nó hiển thị các lệnh cho view và binding view với model. Khi model updated, các view tương ứng cập nhật thông qua data binding.

Tương tự, khi người dùng tương tác với view, bindings hoạt động theo hướng ngược lại để tự động cập nhật model.

Mẫu MVVM đang có xu hướng trở nên phổ biến nhưng vẫn là một bổ sung khá gần đây cho thư viện mẫu. Google hiện đang đề xuất mẫu này như một phần của thư viện [Architecture Components](https://developer.android.com/topic/libraries/architecture/viewmodel.html)

## Clean Architecture
Clean Architecture tự bản thân nó không phải là một kiến trúc mà là một khái niệm. Nó mô tả kiến trúc ứng dụng tổng thể: cách các lớp khác nhau của ứng dụng, business objects, use cases, presenters, data storage and UI, giao tiếp với nhau. MVC và MVVM tồn tại trong Clean Architecture ở các lớp outer presentation và UI layers.

Bạn có thể tìm thấy định nghĩa Clean Architecture ban đầu trong[ bài viết này](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). Có rất nhiều ví dụ về Clean Architecture cho Android, hãy thử đọc bài viết tuyệt vời này xem nhé [ Architecting Android…The evolution](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

Mặc dù có thể bạn sẽ cảm thấy yomost khi luôn updated theo các API mới nhất, xịn nhất của Android, nhưng việc cập nhật ứng dụng của bạn có thể nhanh chóng dẫn đến tình trạng mệt mỏi khi thiết kế lại.  Hãy đầu tư vào các mẫu thiết kế phần mềm và kiến trúc ứng dụng sớm sẽ cải thiện lợi tức của bạn trong thời gian phát triển. Bạn sẽ bắt đầu nhận thấy mình làm được nhiều việc hơn với nỗ lực ít hơn.

Bài viết đến đây cũng kết thúc phần 2 của series này. Nó được dịch từ bài viết của 2 tác giả  [Aaqib Hussain và Matt Luedk](https://www.raywenderlich.com/18409174-common-design-patterns-and-app-architectures-for-android#toc-anchor-003) với chút kiến thức tìm hiểu của mình. Rất cảm ơn sự quan tâm của mọi người. 

Bạn có thể xem lại phần 1 tại link sau nhé : https://viblo.asia/p/cac-loai-design-patterns-thuong-dung-o-android-va-app-architectures-phan-1-OeVKBAgE5kW