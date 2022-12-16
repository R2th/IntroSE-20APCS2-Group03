Trong sự kiện Google I/O 2018 tổ chức tại Mountain View, California, Google đã phát hành rất nhiều công cụ tuyệt vời để giúp các nhà phát triển tăng tốc quá trình phát triển của họ và xây dựng các ứng dụng tốt hơn. Một trong số chúng là Android Navigation Components - một thư viện thành phần của bộ thư viện Android Jetpack. Thư viện này được tạo để trợ giúp và đơn giản hoá việc triển khai điều hướng nhất quán trong các ứng dụng Android.

# Các khái niệm chính
Trước khi bắt đầu triển khai Android Navigation Components, hãy xem các khái niệm chính của thư viện:

- Navigation Graph là biểu đồ mô tả một nhóm các Navigation destination và kết nối của chúng.

Nó có thể được biểu diễn bằng cách sử dụng một Navigation Graph đơn hoặc một tập hợp nhiều Navigation Graphs tùy thuộc vào việc triển khai mà bạn quyết định thực hiện (Single Activity hoặc Multiple Activities application).

 
- Navigation Destination có thể là screen hoặc bất kỳ View nào trong ứng dụng của bạn.

Để xác định một destimation trong Android Studio, bạn có thể tham khảo tại đây.

- Navigation Action là một liên kết kết nối một destination với một destination khác.

Một Action biết được destination nào nó đang kết nối và loại thông tin sẽ được truyền qua giữa chúng.

- Máy Navigation Host là một thành phần biết về tất cả các destimation và action trong Navigation Graph.

Nó xử lý thực hiện điều hướng trong các destimation khác nhau.

# Triển khai các Navigation Components trong project của bạn
Để bắt đầu triển khai Navigation Components trong ứng dụng của bạn, trước tiên bạn cần phải cập nhật phiên bản Android Studio mà bạn đang làm việc lên phiên bản 3.2 Canary mới nhất.

Điều này sẽ đảm bảo bạn có tất cả các công cụ mới nhất như Navigation editor có sẵn để hỗ trợ bạn thực hiện điều hướng. Bạn có thể tìm thấy phiên bản Android Studio mới nhất tại đây.

## Thêm các Navigation Components dependencies
dependencies {
    //Other Dependencies...
    
    implementation "android.arch.navigation:navigation-fragment-ktx:1.0.0-alpha04"
    implementation "android.arch.navigation:navigation-ui-ktx:1.0.0-alpha04"

}
Lưu ý hậu tố ktx trong cả hai phụ thuộc dành cho kotlin.

## Tạo một file Navigation Graph
Bước đầu tiên để bắt đầu sử dụng Navigation Components là tạo resource file cho Navigation Graph.

Như đã đề cập trước đó, file này là nơi chúng ta xác định các destimation khác nhau trong ứng dụng và cách chúng được kết nối.

Ứng dụng có thể có nhiều hơn một Navigation Graph và các Navigation Graph này có thể được lồng vào nhau.

Để tạo file Navigation Graph, hãy click chuột phải từ bất kỳ nơi nào bên trong app module, chọn tùy chọn New -> Android Resource File.

Thao tác này sẽ mở template để tạo tệp tài nguyên Android mới.

Điền vào template bằng cách đặt tên tệp của bạn và sử dụng drop-down Resource Type để chọn loại Navigation resource.

Khi bạn hoàn tất, nhấn OK và Navigation Editor cho tệp này sẽ được mở như được hiển thị bên dưới.

![](https://images.viblo.asia/39807047-d50e-44ce-8a9e-6dc6387e6a93.png)
Navigation Editor được hiển thị ở trên được chia thành 3 phần khác nhau. Từ trái sang phải:

Phần này hiển thị danh sách tất cả các destinations trong graph và đâu là nơi navigation graph được lưu trữ.
Phần giữa và phần lớn là nơi bạn có thể thấy một đại diện trực quan của tất cả các destinations trong graph và các kết nối của chúng. Nếu bạn đang sử dụng namespace trong layouts của mình, data cũng sẽ được hiển thị ở đây và bạn có thể có view tốt về ứng dụng và data mẫu của mình.
Phần thứ ba và ngoài cùng bên phải là phần attributes. Nội dung phần này chỉ hiển thị nếu bạn chọn một destination hoặc action. Phần này sẽ hiển thị và cho phép sửa đổi các thuộc tính của destination hoặc action đã chọn.
## Thêm các Destination vào Graph
Bắt đầu tạo Navigation Graph bằng cách thêm các destination khác nhau trong ứng dụng của bạn. Chúng ta nên bắt đầu xây dựng Navigation Graph từ trên xuống dưới.

![](https://images.viblo.asia/d68e7059-49fc-4d73-af11-65e5039c0488.png)

Như bạn có thể thấy chúng ta có 3 destination, đó là các điểm vào ứng dụng. Các destination này không được kết nối với nhau và do đó sẽ không có action nào liên kết chúng với nhau.

Chúng ta sẽ cùng tìm hiểu cách điều hướng đến từng destination ngay sau đây.

Bây giờ, hãy thêm các fragment và có một luồng các destination được kết nối với nhau. Để làm điều đó, trước tiên chúng ta phải lặp lại quá trình thêm destination mới vào Navigation Graph.

Để bắt đầu thực hiện kết nối, hãy chọn destination nơi bạn muốn bắt đầu và kéo một đường kết nối đến destination đích. Bây giờ chúng ta sẽ có Navigation Graph trông như thế này:

![](https://images.viblo.asia/e3ea0d12-17b5-4c52-acb7-a902db28cbec.png)

## Gắn Navigation Graph với Navigation Host
Đến đây Navigation Graph này chưa làm bất cứ điều gì ngoài việc đưa ra một biểu diễn trực quan về hành trình của người dùng trong ứng dụng. Điều này là do Navigation Graph cần một container đặc biệt được gọi là Navigation Host.

Thành phần này có một Navigation Graph và cung cấp các cơ chế để điều hướng qua các destination khác nhau bằng cách sử dụng một NavController.

Navigation Host thực hiện thay cho chúng ta tất cả các việc như giao dịch phân đoạn và tất cả những thứ khác cần thiết để thực hiện điều hướng.

Nếu bạn đang sử dụng loại cấu trúc ứng dụng single Activity mà Google hiện đang đề xuất, ứng dụng của bạn sẽ có một Activity chỉ với một Navigation Host và một Navigation Graph.

Nếu bạn đang migration từ hệ thống đã xây dựng, bạn nên tách luồng của mình thành các Activity khác nhau và cung cấp Navigation Graph và Navigation Host cho từng Activity trong giai đoạn chuyển đổi.

Việc bạn đang bắt đầu một ứng dụng mới hay đang migration ứng dụng hiện tại là không quan trọng, layout Activity của bạn có thể sẽ giống nhau và sẽ chỉ chứa Navigation Host như bên dưới đây:

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="navexample.app.dario.com.MainActivity">

    <fragment
        android:id="@+id/nav_host"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:name="androidx.navigation.fragment.NavHostFragment"
        app:navGraph="@navigation/main_nav"
        app:defaultNavHost="true"/>

</android.support.constraint.ConstraintLayout>
```
Hai điều cần lưu ý trên đoạn code ở trên là các attributes:

app:navGraph: xác định Navigation Graph nào sẽ được liên kết với Navigation Host.
app:defaultNavHost: một giá trị boolean nếu thiết lập true sẽ cho phép Navigation Host chặn khi nhấn nút back hệ thống.
Bây giờ, nếu bạn khởi chạy Activity có Navigation Host, nó sẽ hiển thị trên màn hình destination được đặt làm điểm bắt đầu (starting point) trong Navigation Graph.

Để đặt Fragment làm điểm đến bắt đầu trong Navigation Graph, hãy click chuột phải vào destination đầu trong Navigation Editor và chọn “Set as start destination”.

## Điều hướng giữa các destination
Bây giờ Navigation Graph được lưu trữ bên trong NavFragmentHost, chúng ta hãy xem cách di chuyển từ một destination đến một destination khác.

Trong ví dụ này, quá trình điều hướng đến một destination được thực hiện sau khi xảy ra sự kiện starting destination.

Để điều hướng giữa các destination, Navigation Host có một thành phần được gọi là NavController.

Thành phần NavController chịu trách nhiệm quản lý toàn bộ quá trình điều hướng trong một Navigation Host.

Để thực hiện điều hướng giữa các destination bạn cần trước tiên hãy lấy NavController từ Navigation Host bằng cách sử dụng phương thức tĩnh findNavController của navHostFragment như sau:

val navController = Navigation.findNavController(fragment)
Sau khi nhận được NavController, điều hướng đến destination EventDetailsFragment được thực hiện như sau:

navController.navigate(R.id.event_details_fragment)
R.id.event_details_fragment là destination id cho EventDetailsFragment.

Để điều hướng trở lại destination trước đó, quá trình này tương tự và trước tiên bạn cần có được NavController và sau đó gọi hàm navigationUp như sau:

navController.navigateUp()
Bạn sẽ thường xuyên thực hiện phương pháp này để xử lý press Up Button trong một destination.

## Truyền dữ liệu giữa các destination
Điều hướng giữa các destination khác nhau là phần chính nhưng nhiều khi chúng ta không chỉ cần điều hướng đến destination khác mà còn cần gửi một số loại thông tin trong quá trình này.

Chúng ta thực hiện điều này bằng cách sử dụng Bundles theo 2 cách khác nhau:

type-safe: sử dụng Navigation Components Safe với khai báo trong args Gradle plugin.
non type-safe: bằng cách tự xây dựng Bundle như chúng ta luôn làm.
Sử dụng cách thứ hai như sau:

//EventDetailsFragment.kt 
companion object {
  private const val ARG_EVENT = "event"
  
  fun bundleArgs(event: Event): Bundle {
    return Bundle().apply { 
      this.putParcelable(ARG_EVENT, event)
    }
  }
}
Để điều hướng đến destination này và chuyển thông tin Bundle, bạn sẽ cần phải sử dụng phương thức navigate có action và arguments:

val args = EventDetailsFragment.bundleArgs(event)
navController.navigate(R.id.event_details_fragment, args)
# Kết luận
Đến bây giờ, bạn đã có thể bắt đầu triển khai Navigation Components vào các dự án của riêng mình. Bạn có thể làm điều đó bằng cách sử dụng loại cấu trúc ứng dụng single Activity mà Google hiện đang đề xuất nếu bạn đang bắt đầu dự án mới, hoặc bạn có thể bắt đầu bằng việc có nhiều Activity với Navigation Graph của riêng chúng nếu bạn đang migrating một ứng dụng lớn.