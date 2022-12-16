Navigation trên Android có thể trở nên khá phức tạp - từ việc truyền dữ liệu đến xử lý ngăn xếp có rất nhiều điều cần chú ý.

### Cách thức hoạt động
Thành phần mới này hoạt động với một kiến trúc Single Activity sử dụng Fragments. Trái tim của nó là biểu đồ điều hướng (navigation graph). Đây là file xml nơi chúng ta có thể xác định các fragment và action của mình để điều hướng giữa chúng.
```
<navigation app:startDestination="@id/main_fragment">
    <fragment
        android:id="@+id/main_fragment"
        android:name="com.marianeum.navigation.MainFragment"
        android:label="@string/title_main"
        tools:layout="@layout/fragment_main" >
        <action
            android:id="@+id/open_details"
            app:destination="@id/details_fragment" />
    </fragment>
    <fragment
        android:id="@+id/details_fragment"
        android:name="com.marianeum.navigation.DetailsFragment"
        android:label="@string/title_details"
        tools:layout="@layout/fragment_details" />
</navigation>
```

Trên đây là ví dụ về biểu đồ điều hướng đơn giản có hai fragment - main, detail và action để di chuyển từ main đến detail. 

Ở trên cùng, bạn có thể thấy `startDestination` - điều này xác định nơi bắt đầu.

Phần khác chúng ta phải cấu hình là layout của Activity.
```
<FrameLayout>

    <fragment
        android:id="@+id/nav_host"
        android:name="androidx.navigation.fragment.NavHostFragment"
        app:defaultNavHost="true"
        app:navGraph="@navigation/nav_graph"/>

</FrameLayout>
```
Tất cả những gì bạn phải thêm là một `NavHostFragment` liên kết với `navGraph` được định nghĩa ở trên.

Để điều hướng từ vị trí này sang vị trí khác, bạn phải thêm dòng sau vào fragment của mình (ví dụ: trong listener click chuột):
```
findNavController().navigate(R.id.open_details)
```
Lưu ý rằng đây là `id` của action. 
```
<action
    android:id="@+id/open_details"
    app:destination="@id/details_fragment" />
```
Điều này thật tuyệt vời - điều hướng được xác định ở một nơi duy nhất và nếu bạn thay đổi nơi hành động điều hướng đến bạn chỉ cần cập nhật xml - mã có thể giữ nguyên.

### Vấn đề truyền dữ liệu
Việc truyền dữ liệu giữa các Activity và Fragment sẽ làm bạn tốn khá nhiều thời gian để giải quyết. Bạn có thể thêm các extras vào bundle, nhưng bạn định nghĩa những gì trong đó? Có thể bạn đã định nghĩa một phương thức tĩnh (static) để tạo `Intent` hoặc `Fragment` hoặc có thể bạn đã có một navigator tập trung, nhưng vẫn không có gì ngăn cản bạn chuyển bất kỳ extras tùy ý nào vào `Bundle`. Khi đọc từ `Bundle`, bạn phải biết các extras và kiểu của chúng một lần nữa. Không có hợp đồng thực sự giữa origin và destination.

Thành phần điều hướng cố gắng giải quyết điều đó bằng cách sử dụng plugin safe args:
```
classpath "android.arch.navigation:navigation-safe-args-gradle-plugin:$navVersion"
apply plugin: 'androidx.navigation.safeargs'
```

Nhìn vào `DetailsFragment` ở trên - giả sử chúng ta muốn chuyển qua một `id` cho nó. Chúng ta chỉ cần thêm đối số này bên trong fragment của biểu đồ điều hướng:
```
<argument android:name="id" app:type="string"/>
```
Khi build lại ứng dụng, điều này sẽ tạo ra một vài điều. Thứ nhất cho nguồn gốc một direction class thực hiện giao diện `NavDirections`:
```
val direction = MainFragmentDirections.open_details(id)
```
Các plugin tạo ra một class bằng cách sử dụng tên của fragment và gắn thêm hậu tố Directions (`MainFragmentDirections`), cũng như một class cho action (`open_details`) với các đối số cần thiết (`id`).

Để điều hướng đến tất cả, bạn chỉ cần gọi phương thức `navigate` với direction:
```
val direction = MainFragmentDirections.open_details(id)
findNavController().navigate(direction)
```

Để trích xuất thông tin ở phía destination, một lớp `Args` được tạo ra - một lần nữa sử dụng tên của fragment - và thêm vào hậu tố `Args`. Để extras `id` tất cả những gì bạn cần làm là:
```
val id = DetailsFragmentArgs.fromBundle(arguments).id
```
Bạn không cần phải biết gốc là gì hoặc những extra key là gì - tất cả những điều đó được thực hiện phía dưới cho bạn.

### Vấn đề deep linking
Deep linking là một thứ khác tương đối phức tạp. Bạn phải xác định `intent-filters` trong AndroidManifest và sau đó tự extract bất kỳ dữ liệu nào, như id, từ `uri` trong Activity của bạn. Điều này có nghĩa là bạn có hai cách khác nhau để trích xuất dữ liệu - một cho deep linking và một để điều hướng từ một Activity khác.

Thành phần điều hướng cũng giải quyết được vấn đề trên. Đầu tiên, để deep linking hoạt động được với nó, bạn phải thêm những thứ sau vào `AndroidManifest` trong thẻ `activity`:
```
<nav-graph android:value="@navigation/nav_graph" />
```
Điều này sẽ liên kết tất cả các deep linking bên trong biểu đồ điều hướng của bạn và tạo intent filters cho bạn.

Để có thể thêm deep linking vào một fragment, bạn phải thêm phần sau vào fragment trong biểu đồ điều hướng:
```
<deepLink app:uri="google.com/{id}"/>
```
Điều này sẽ tạo ra các intent filters cho bạn (https và http) trong `AndroidManifest` và điều hướng đến chính xác fragment với các đối số chính xác (trong trường hợp này là `id`). Như chúng ta đã định nghĩa các đối số cho `DetailsFragment`, chúng ta không phải làm thêm gì để xử lý deep linking này. Nó cũng sẽ xử lý nút up và back cho bạn, miễn là bạn ghi đè phương thức `onSupportNavigateUp` trong Activity:
```
override fun onSupportNavigateUp() = findNavController(R.id.nav_host).navigateUp()
```

### Kết luận
Đây mới chỉ là những vấn đề đơn giản gặp phải với việc điều hướng trong ứng dụng - còn rất nhiều điều cần xem xét - đặc biệt là đối với các trường hợp phức tạp hơn. Cho đến nay có vẻ rất hứa hẹn để tìm hiểu thêm về Navigation Architecture Component. Nếu bạn quan tâm, có thể xem [video Google I/O](https://www.youtube.com/watch?v=8GCXtCjtg40) này cũng như [tài liệu tham khảo](https://developer.android.com/topic/libraries/architecture/navigation/).