## 1. Giới thiệu

[Navigation Architecture Component](http://d.android.com/arch/navigation) giúp chúng ta dễ dàng xây dựng flow điều hướng giữa các Fragment. Nó cũng cung cấp một editor giúp trực quan hóa flow điều hướng trong ứng dụng. Ngoài ra thì việc sử dụng thư viện này cũng mang lại các ưu điểm sau:

- Hỗ trợ xử lý các **fragment transaction**

- Hỗ trợ xử lý mặc định nút **up** và **back** một cách chính xác

- Cung cấp sử dụng mặc định các **animations** và **transitions**

- Có thể sử dụng cho **navigation drawer** và **bottom nav**

- Đảm bảo **type safety** khi truyền dữ liệu trong quá trình điều hướng


### Thành phẩm sau khi làm

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/39d65f72ed0364e3.png)

Ban đầu thì chúng ta sẽ bắt đầu với các activity và fragment có sẵn và sẽ sử dụng Navigation Component để kết nối chúng. Đây là những gì chúng ta sẽ làm với Navigation Component:

- Thực hiện điều hướng thông qua destination và action

- Xây dựng flow của sub-navigation

- Xây dựng điều hướng thông qua menu

- Xây dựng điều hướng thông qua bottom navigation

- Làm việc với deep links


### Cài đặt môi trường

- Clone code dựng sẵn ở đây:


```
$ git clone https://github.com/googlecodelabs/android-navigation
```

- Tải Android Studio 3.2 Canary 14: Hãy đảm bảo rằng bạn đang sử dụng Android Studio 3.2 Canary 14 hoặc cao hơn. Các bạn có thể vào [đây](https://developer.android.com/studio/preview/) để tải.

## 2. Giới thiệu về Navigation Graph

### Destinations

Navigation Component giới thiệu một định nghĩa mới là **destination**. Một destination đơn giản chỉ là nơi mà người dùng có thể đi đến, trong trường hợp này thì destination thường (và cũng được khuyến nghị) là một fragment. Activity cũng có thể là một destination. Navigation hỗ trợ mặc định các kiểu destination là fragment và activity. Tuy nhiên nếu muốn thì chúng ta có thể định nghĩa ra một kiểu destination mới.

### Navigation Graph

Một nơi mà chúng ta có thể điều hướng đến từ một destination nào đó được biểu diễn trực quan hóa thông qua **navigation graph**. Đây là một loại resource mới mà chúng ta sẽ khai báo tất cả các path giữa các màn hình mà người dùng có thể sử dụng trong quá trình dùng ứng dụng. Ví dụ:

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/1be0826fdab14ade.png)

### Khám phá Navigation Editor

Click **Design** để vào Design mode:

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/e724b0f5463969e1.png)

Và đây là thứ chúng ta sẽ thấy:

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/dfbc32939213814b.png)

Navigation graph sẽ cho chúng ta thấy các destination hiện có. Các đường nối giữa các destination được gọi là **action**. Chúng ta sẽ nói về cái này sau.

Chúng ta có thể click vào các destination để xem các thuộc tính của nó. Ngoài ra thì chúng ta cũng có thể thay đổi thuộc tính của chúng, cái này chúng ta sẽ làm sau:

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/8532988f0ed9b310.png)

### Xem xét kỹ file XML của navigation

Tất cả các thay đổi chúng ta tạo ra trên giao diện đồ họa của Navigation Editor sẽ làm thay đổi file XML tương ứng. Tương tự như khi chúng ta làm việc với các file layout.

Bây giờ hãy chọn tab Text

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/89ce023e174d3e96.png)

Chúng ta sẽ thấy một file XML như sau:

```xml
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:app="http://schemas.android.com/apk/res-auto"
            xmlns:tools="http://schemas.android.com/tools"
            app:startDestination="@+id/launcher_home">

    <!-- ...tags for fragments and activities here -->

</navigation>
```

Trong file này thì:

- `<navigation>`  là node root của mỗi navigation graph

- `<navigation>` bao gồm ít nhất là 1 destination, được biểu biễn bằng <activity> hoặc <fragment>.

- `app:startDestination` là một thuộc tinh dùng để khai báo destination sẽ dược mở mặc định mỗi khi người dùng lần đầu mở ứng dụng.


Hãy cùng xem một fragment destination:

```xml
<fragment
        android:id="@+id/flow_step_one"
        android:name="com.example.android.codelabs.navigation.FlowStepOneFragment"
        tools:layout="@layout/flow_step_one_fragment">

        <argument
            .../>

        <action
            android:id="@+id/next_action"
            app:destination="@+id/flow_step_second"/>
    </fragment>
```

Trong đoạn XML này thì:

- `android:id` sẽ gán id cho fragment. Chúng ta có thể dùng id này để tham chiếu destination này ở chỗ nào đấy trong XML và trong code.

- `android:name` được dùng để khai báo tên class đầy đủ của một fragment sẽ được khởi tạo khi chúng ta điều hướng đến destination đấy.

- `tools:layout` được dùng để xác định xem layout nào sẽ được sử dụng để hiển thị ở design mode.


Nếu nhìn vào các tag `<fragment>` khác thì chúng ta thấy chúng sẽ chứa các tag khác như `<action>`, `<argument>` và `<deepLink>`. Mấy cái này chúng ta sẽ tìm hiểu sau.

### Thêm một destination vào Navigation Graph

Và bây giờ chúng ta sẽ thêm một destination vào graph. Mỗi một destination phải được thêm vào navigation graph nếu chúng ta muốn có thể điều hướng đến nó.

Hãy chuyển sang tab Design trong file `res/navigation/mobile_navigation.xml`.

Hãy click vào icon **add destination** và chọn `fragment_setting`:

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/84e6203b3d9034bf.png)

Ngoài ra thì chúng ta cũng có thể edit trực tiếp file XML để thêm destination:

#### mobile_navigation.xml

```xml
<fragment
        android:id="@+id/settings_fragment"
        android:name="com.example.android.codelabs.navigation.SettingsFragment"
        android:label="fragment_settings"
        tools:layout="@layout/fragment_settings"/>
```

Sau cùng thì kết quả chúng ta thu được là một destination mới, trong tab design chúng ta sẽ thấy layout preview của fragment này được render.

### 5. Sử dụng Navigation Graph để điều hướng

Hiện tại thì chúng ta mới chỉ có navigation graph chứ chưa sử dụng nó.

### Activity và Navigation

Trong quá trình sử dụng Navigation Component thì chúng ta nên tuân theo các quy tắc điều hướng ở [đây](http://d.android.com/topic/libraries/architecture/navigation/navigation-principles). Có một quy tắc khuyến khích chúng ta nên có một activity như một entry point của ứng dụng, activity này sẽ bao gồm một global navigation như là bottom nav. Ngược lại thì fragment sẽ là các destination cụ thể.

Để làm được những điều ở trên thì chúng ta sẽ phải sửa lại layout của activty để cho nó chứa một widget đặc biệt là **NavHostFragment**. Widget này sẽ được sử dụng như một container chứa fragment và cho phép chúng ta swap các fragment mỗi khi chúng ta điều hướng trong navigation graph.

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/fd47b155b24e2e9b.png)

Dưới đây là một layout đơn giản hỗ trợ việc điều hướng tương tự như trong ảnh trên:

```xml
<LinearLayout
    .../>
    <android.support.v7.widget.Toolbar
        .../>
    <fragment
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:id="@+id/my_nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        app:navGraph="@navigation/mobile_navigation"
        app:defaultNavHost="true"
        />
    <android.support.design.widget.BottomNavigationView
        .../>
</LinearLayout>
```

Trong đoạn XML này thì:

- Đây là layout cho một activity - nó bao gồm một global navigation, bao gồm một bottom nav và một toolbar.
- `android:name="androidx.navigation.fragment.NavHostFragment"`  và `app:defaultNavHost="true"` có tác dụng kết nối nút back hệ thống với `NavHostFragment`
- `app:navGraph="@navigation/mobile_navigation"`  liên kết `NavHostFragment` với navigation graph. Navigation graph bao gồm các destination mà người dùng có thể điều hướng đến thông qua `NavHostFragment` này.


`NavigationUI` và `navigation-ui-ktx` cung cấp các helper method cho global navigation. Thư viện này sẽ cho phép action bar, navigation drawer và bottom navigation bar có thể dễ dàng giao tiếp và thay đổi content của `NavHostFragment`.

### NavigationController

Cuối cùng thì khi người dùng thực hiện một thao tác nào đấy như là click vào button thì chúng ta sẽ phải thực thi lệnh điều hướng. Một class đặc biệt gọi là `NavController` chính là lớp sẽ thực hiện việc thay fragment cho `NavHostFragment`

```kotlin
val navController = v.findNavController()
navController.navigate(R.id.settings)
```

Lưu ý rẳng để điều hướng thì chúng ta sẽ truyền ID của destination được định nghĩa trong file XML của navigation graph.

Với `NavigationController` thì chúng ta chỉ việc  gọi các action như `navigate()` hoặc `popBackStack()` và nó sẽ lo nốt việc điều hướng cho chúng ta. Tùy vào kiểu của destination mà chúng ta đang điều hướng tới mà nó sẽ có những xử lý khác nhau, ví dụ như  nếu chúng ta điều hướng đến một destination là activity thì `NavController` sẽ gọi `startActivity()` thay cho chúng ta.

### Cách để điều hướng bằng cách sử dụng NavController

Một `NavController` có thể được xác định bằng các phương thức static sau:

- `Navigation.findNavController(Activity, @IdRes Int viewId)`
- `Navigation.findNavController(View)`
- `NavHostFragment.findNavController(Fragment)`
- `View.findNavController()`

Có một phương thức khá tiện là `Navigation.createNavigationOnClickListener(@IdRes destId: int, bundle: Bundle)`. Phương thức này sẽ build một `OnClickListener` , khi có sự kiện click thì nó sẽ tự động điều hướng đến destination được xác định thông qua `desId` được truyền vào kèm với bundle.

### Điều hướng đến một destination bằng cách sử dụng NavController

Giờ là đến lượt bạn thực hiện việc điều hướng bằng việc sử dụng `NavController`. Nhiệm vụ của bạn sẽ là làm cho việc điều hướng đến `flow_step_one` (tương ứng với `FlowStepFragment`) diễn ra khi người dùng dùng click vào button **Navigate To Destination**. Các bước như sau:

1. Mở `MainFragment`

2. Set cho `Button` với id là `navigate_dest_bt` một listener được tạo bởi hàm `Navigation.createNavigationOnClickListener`:

```kotlin
button.setOnClickListener(
Navigation.createNavigateOnClickListener(R.id.flow_step_one, null))
```

3. Run app và click vào nút`Navigate To Destination,` chúng ta sẽ thấy hành động đó sẽ điều hướng đến destination `flow_step_one`.

## Thay đổi Navigation Transition

Khi sử dụng `navigate` thì mặc định sẽ có hiệu ứng transition animation như sau:

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/9a10cf0f8ca29345.png)

Chúng ta có thể thay đổi animation mặc định này và nhiều thuộc tính khác bằng cách sử dụng `NavOptions`.

Bây giờ chúng ta sẽ cập nhật lại code để khi click vào nút `Navigation To Destination` thì sẽ hiển thị hiệu ứng transition animation khác:

1. Mở `MainFragment`
2. Xóa đoạn code đã thêm lúc trước.
3. Xây dựng một `NavOptions` và truyền nó vào lời gọi hàm `navigation` đến `navigate_dest_bt`:

```kotlin
val options = NavOptions.Builder()
    .setEnterAnim(R.anim.slide_in_right)
    .setExitAnim(R.anim.slide_out_left)
    .setPopEnterAnim(R.anim.slide_in_left)
    .setPopExitAnim(R.anim.slide_out_right)
    .build()

view.findViewById<Button>(R.id.navigate_dest_bt)?.setOnClickListener {
    findNavController(it).navigate(R.id.flow_step_one, null, options)
}
```

4. Run app và chúng ta sẽ thấy hiệu ứng animation mới như sau:

![](https://codelabs.developers.google.com/codelabs/android-navigation/img/bba3ced09ca763d2.png)

Bài viết của mình xin tạm dừng tại đây. Trong phần [tiếp theo](https://viblo.asia/p/navigation-architecture-component-hoc-voi-hanh-p2-jvElaWozKkw) mình sẽ trình bày nốt những phần sau:

1. Navigate bằng cách sử dụng action.
2. Navigate bằng cách sử dụng menu, drawer và bottom navigation.
3. Sử dụng type safe argument cho việc navigate.
4. Deep linking đến một destination.
5. Liên kết đến một trang web bằng deep link

Cảm ơn các bạn đã theo dõi.

*Nguồn: https://codelabs.developers.google.com/codelabs/android-navigation/#0*