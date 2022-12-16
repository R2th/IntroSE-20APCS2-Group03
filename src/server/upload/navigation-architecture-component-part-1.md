# Tổng quan về Navigation Architecture Component
> Architecture Component xuất hiện trong bộ công cụ và thư viện [Android Jetpack](https://developer.android.com/jetpack/) mới ra mắt trong Google I/O 2018, nhằm mục đích giúp cho việc xây dựng ứng dụng Apdroid trở lên nhanh và dễ dàng hơn.
Thực tế Android Jetpack cung cấp 4 cơ sở hạ tầng lớn như Foundation, Architecture, Behavior và UI. Chúng ta sẽ nghiên cứu về Architecture Navigation trong bài viết dưới đây để hiểu và sử dụng được cấu trúc một ứng dụng mà google đưa ra để giúp đỡ các lập trình viên trong việc quản lý các mô hình ứng dụng của họ.

![](https://www.androidpolice.com/wp-content/uploads/2018/05/chrome_2018-05-08_18-50-02-728x467.png)

> Từ xưa đến nay các ứng dụng Android hiếm khi được tạo nên từ 1 màn hình, vì vậy trải nghiệm mang đến cho người dùng chưa được mượt mà vì phải chuyển qua lại giữa các màn hình. Chính vì vậy navigation được sinh ra để giải quyết vấn đề về giao diện khi chỉ có 1 màn hình và thay vào đó sẽ là các trình diễn của Fragment trên Android. Trên thực tế trước kia mọi người cũng có thể làm những ứng dụng chỉ với một màn hình và nhiều fragment nhưng giờ Google đã cung cấp sẵn các công cụ để tiện lợi cho mọi người khi triển khai ứng dụng.

# Quy tắc của Navigation Architecture
* **Ngăn xếp (stack)**: Trạng thái Navigation trong ứng dụng của bạn nên được trình chiếu lại với nguyên tắc là "last in, first out" giống như cách mà ngăn xếp của Activity quản lý. Ngăn xếp của Navigation sẽ có điểm đến bắt đầu là fragment ở cuối ngăn xếp và điểm đến hiện tại là vị trí trên cùng của stack. Các hoạt động "pushing" hoặc là "popping" luôn luôn được thay đổi ở trên cùng của ngăn xếp.
* **"Up button" không bao giờ thoát khỏi ứng dụng**: Nếu người dùng đang ở điểm đến đầu tiên, phím up sẽ không được hiển thị. Khi ứng dụng của bạn hiển thị mà sử dụng deeplink trên task của một ứng dụng khác(deeplink là 1 URL có thể đưa người dùng đến với đúng nội dung ở trong ứng dụng của bạn), nó sẽ đưa người dùng đến đích thân ứng dụng mở ra nó và không quay trở lại ứng dụng mà deeplink mở ra.
* **"Up button" và "Back button" là tương đương nhau trong task của ứng dụng**: Khi phím back của ứng dụng không thoát khỏi ứng dụng của bạn, như là khi bạn đang thực hiện trên task của bạn mà không phải bắt đầu từ điểm đến bắt đầu của Navigation, khi đó thì phím up và phím back của hệ thống hoạt động giống nhau.
* **Deeplink và Navigation chuyển đến cùng một nơi đến sẽ có cùng một ngăn xếp**: Người dùng có thể bắt đầu với điểm đến đầu tiên và điều hướng nó bằng Navigation để tới đích. Đồng thời người dùng cũng có thể sử dụng deeplink, nếu có sẵn, chúng sẽ được điều hướng đến cùng một điểm đến. Trong 2 cách trên, ngăn xếp của Navigation phải có cùng một ngăn xếp của điểm đến. Đặc biệt, người dùng có thể sử dụng phím up hoặc phím back, bất để là điểm đến là gì, Navigation sẽ điều hướng chúng quay trở về điểm xuất phát. Mọi ngăn xếp tồn tại đều có thể bị xóa và thay vào đó là ngăn xếp của deeplink tạo ra.

# Triển khai
### Yêu cầu chung
* Navigation hiện tại được triển khai trên hai phiên bản Android Studio Preview: [Beta Build 3.2 Beta 4](https://developer.android.com/studio/preview/) và [Canary Build 3.3 Canary 3](https://developer.android.com/studio/preview/). Bạn phải cập nhật Android Studio lên trên 3.2 để có thể sử dụng Navigation, hiện tại bản Beta Build có nhiều lỗi hơn nên khuyên bạn sử dụng bản Android Studio Canary Build.
* Nếu sử dụng bản Canary Build thì chức năng Navigation Editor được bật sẵn, còn nếu bạn sử dụng bản khác thì vào cài đặt và chọn **Experimental** sau đó tích vào **Enable Navigation Editor** để bật chức năng này lên.
### Navigation Graph
> Navigation graph là một biểu đồ cho biết được các thành phần có trong ứng dụng của bạn được Navigation quản lý, có các action và giao diện đầy đủ của các màn hình. Việc này giúp cho ứng dụng của bạn dễ dàng quản lý follow của từng màn hình và liên kết với nhau, nhìn qua là có thể biết được các màn hình ra sao và chúng tương tác với nhau như thế nào.

Navigation graph sẽ trông như thế nào ?
![](https://cdn-images-1.medium.com/max/2000/1*YIQHQmS_wneHSl3Ur055OA.png)

### Cài đặt Navigation vào ứng dụng
* Thêm vào build gradle của ứng dụng các dependencies của Navigation
```
dependencies {
    def nav_version = "1.0.0-alpha04"

    implementation "android.arch.navigation:navigation-fragment:$nav_version" // use -ktx for Kotlin
    implementation "android.arch.navigation:navigation-ui:$nav_version" // use -ktx for Kotlin

    // optional - Test helpers
    androidTestImplementation "android.arch.navigation:navigation-testing:$nav_version" // use -ktx for Kotlin
}
```
### Tạo file Navigation Graph
* Đầu tiên bạn phải tạo file ***nav_graph.xml*** như tạo file xml bình thường chú ý chọn **Resource-type** là **Navigation**. 
* Chọn Design sẽ thấy được toàn bộ các fragment được tạo ra và liên kết với nhau như đây. 
![](https://developer.android.com/images/topic/libraries/architecture/navigation-editor.png)
* Chúng ta có thể thấy Navigation Graph được chia thành 3 phần khác nhau:
1. Phần này hiển thị tất cả các destination có trong graph và đâu là nơi chưa navigation graph hosted được khởi tạo.
2. Phần thứ 2 rất lớn để bạn có thể trình diễn tất cả các destination có trong graph và quan hệ giữa chúng được biểu diễn rất trực quan. Dữ liệu của bạn cũng sẽ hiển thị ở đây như một bản tóm tắt các màn hình có trong graph của bạn.
3. Phần thứ 3 chứa các thuộc tính của destination. Nội dung phần này chỉ hiển thị khi bạn chỉ định destination hoặc là action của nó, có thể sửa đổi các thuộc tính các chỉ mục của action hoặc destination.

### Thêm mới một Destination
* Bạn có thể tạo mới Fragment bằng cách click vào ![](https://developer.android.com/studio/images/buttons/navigation-add.png) hoặc là tạo fragment rồi mới chọn thêm để hiển thị ra danh sách các fragment có trong ứng dụng muốn sử dụng navigation. Bắt buộc navigation phải có một fragment được chọn là start (màn hình hiển thị đầu tiên của navigation), được định nghĩa ở trong xml navigation là id của fragment đầu tiên. 
```
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:android="http://schemas.android.com/apk/res/android"
    app:startDestination="@id/blankFragment">
    <fragment
        android:id="@+id/blankFragment"
        android:name="com.example.cashdog.cashdog.BlankFragment"
        android:label="Blank"
        tools:layout="@layout/fragment_blank" />
</navigation>
```
![](https://images.viblo.asia/0a20bc34-b3d9-4b22-a301-5ac3e41a024b.png)
### Lưu trữ Navigation Graph
* Chỉ định cho activity thấy đó là host của navigation trong file xml của activity bằng thuộc tính **app:defaultNavHost="true"**. Đây sẽ là nơi xử lý tất cả các thành phần thuộc về Navigation Graph.
```
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/navigation_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <fragment
        android:id="@+id/my_nav_home_fragment"
        class="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:defaultNavHost="true"
        app:navGraph="@navigation/nav_graph" />
</FrameLayout>
```
* Cũng có thể chỉ định layout này chính là host của navigation bằng cách override hàm **onSupportNavigateUp()** để chỉ định activity chính là nơi để lưu trữ các destination. Cách này thì có thể dùng để chỉnh sửa các navigation graph khác nhau cho 1 activity.
```
override fun onSupportNavigateUp(): Boolean {
    return Navigation.findNavController(this, R.id.my_nav_home_fragment).navigateUp()
  }
```
### Liên kết giữa các destination
* Để tạo hành động giữa các destination mới nhau để chuyển màn hay gửi dữ liệu gì thì có thể kéo thả ở trên từ nơi bắt đầu tới nơi kết thúc trên Graph Editor, sẽ được thẻ **action** ở trong destination đó, quản lý thẻ đó qua id để có thể gọi action đó từ destination. Có thêm xử lý về animation, flag hoặc là laucher-mode để có thể xử lý cho destination sẽ được mở tiếp theo.
```
<fragment
        android:id="@+id/blankFragment"
        android:name="com.example.cashdog.cashdog.BlankFragment"
        android:label="fragment_blank"
        tools:layout="@layout/fragment_blank" >
        <action
            android:id="@+id/action_blankFragment_to_blankFragment2"
            app:clearTask="false"
            app:destination="@id/detailFragment"
            app:enterAnim="@anim/nav_default_enter_anim"
            app:exitAnim="@animator/flip_y"
            app:launchDocument="false"
            app:launchSingleTop="false"
            app:popEnterAnim="@animator/flip_x"
            app:popExitAnim="@anim/nav_default_pop_exit_anim"
            app:popUpToInclusive="false"
            />
    </fragment>
```
* Để di chuyển sang destination khác, chúng ta cần sử dụng **NavHostFragment** để có thể tìm được **NavController**. NavController chịu trách nhiệm quản lý toàn bộ quá trình điều hướng trong Navigaiton Host. Tìm đến đúng id của destination đó để có thể chuyển được sang destination khác.
```
 NavHostFragment.findNavController(this).navigate(R.id.blankFragment2)
```
### Truyền gửi dữ liệu giữa các destination
Truyền gửi dữ liệu giữa các destination thông thường sử dung Bundle để lưu trữ, NavController cho phép truyền thêm tham số là Bundle sang bên destination khác.
> Lợi ích của việc truyền gửi này là có thể gửi qua lại rất nhiều các dạng dữ liệu từ nguyên thủy đến nâng cao, nhưng mà việc kiểm soát lỗi thì rất khó để kiểm soát nếu người dùng gửi sai dữ liệu. Chính vì vậy đây là 1 trong 2 cách có thể sử dụng để truyền gửi dữ liệu khi sử dụng Navigation Component.
* Thêm thuộc tính **agurment** ở bên destination nhận với tham số **name** và **defaultValue**:
```
 <fragment
        android:id="@+id/detailFragment"
        android:name="android.thaihn.kotlindemo.screen.navigation.DetailFragment"
        android:label="fragment_detail"
        tools:layout="@layout/fragment_detail">

        <argument
            android:name="name"
            android:defaultValue="Thaihn" />
    </fragment>
```
* Xử lý ở destination gửi chỉ cần tạo 1 bundle và truyền nó quá NavController như sau:
```
 var bundle = Bundle()
 bundle.putString("name", "Thaihn")
 NavHostFragment.findNavController(this).navigate(R.id.detailFragment, bundle)
```
* Xử lý bên destination nhận chỉ cần getArgument ra là được
```
var name = arguments.getString("name")
```

### Truyền gửi dữ liệu một cách an toàn hơn - args plugin của Nagivation Architecture Architecture
Đây là một cách truyền gửi dữ liệu an toàn hơn, được xem là giải pháp tốt hơn sử dụng Bundle bình thường. Safe args được xây dựng dựa trên nền tàng Bundle nhưng yêu cầu mã nguồn nhiều hơn để đổi lấy sự an toàn hơn khi truyền gửi dữ liệu trong ứng dụng của bạn.
> Hạn chế của cách gửi dữ liệu kiểu này là chỉ hỗ trợ các dạng dữ liệu cơ bản là "**inferred, string, integer, reference**" nên chúng ta phải cân nhắc trước khi sử dụng. Nếu cần truyền gửi dữ liệu phức tạp thì nên sử dụng gửi Bundle một cách thủ công.
* Thêm plugin vào file build gradle như sau:
```
apply plugin: 'com.android.application'
apply plugin: 'androidx.navigation.safeargs'

android {
   //...
}
```

```
build.gradle project

buildscript {
    repositories {
        google()
    }
    dependencies {
        classpath "android.arch.navigation:navigation-safe-args-gradle-plugin:1.0.0-alpha04"
    }
}
```

* Khi sử dụng plugin args thì khi truyền gừi dữ liệu qua argument ở xml sẽ thêm 1 thuộc tính **app:argType** để kiểm soát phải gửi dữ liệu theo kiểu nào, sẽ không có gửi sai dữ liệu nếu như sử dụng args, nhờ đó mà ứng dụng của chúng ta có ít lỗi hơn khi phát hiện gửi sai ngay ở lúc compile time.
```
<fragment
        android:id="@+id/detailsFragment"
        android:name="thaihn.com.navigationcomponent.DetailsFragment"
        android:label="fragment_details"
        tools:layout="@layout/fragment_details">

        <argument
            android:name="name"
            android:defaultValue="NoName"
            app:argType="string" />
    </fragment>
```
* Khi gửi dữ liệu thì plugin này tự động tạo ra class YourFragmentDirection để kiểm soát việc gửi dữ liệu qua id của action bạn đặt cho mỗi action khác nhau. Qua đó có thể kiểm soát và gửi dữ liệu 1 các đúng kiểu để tránh lỗi. Chú ý nếu thay đổi kiểu của args thì phải rebuild project để có thể cập nhật class tự tạo ra của args.
```
val directions = MainFragmentDirections
                .actionMainFragmentToDetailsFragment().setName("Hoang Ngoc Thai")
        NavHostFragment.findNavController(this).navigate(directions)
```

* Khi nhận dữ liệu thì args cũng tự động tạo ra class YourFragmentArgs để có thể nhận bundle và trả về dữ liệu đã được định nghĩa ở trong xml graph navigation.
```
mText = rootView.findViewById(R.id.text_details)
val name = DetailsFragmentArgs.fromBundle(arguments).name
mText?.text = name
```



-----

> Trên đây là một số tìm hiểu cơ bản của mình về Navigation Architecture Component mong các bạn cho ý kiến đóng góp để mình hoàn thiện hơn. 
> 
> Demo nhỏ các bạn có thể tham khảo [tại đây](https://github.com/thaihn2/Architect-Component/tree/master/Navigation)
> 
> Hoặc demo của Google về Navigation [tại đây](https://github.com/googlesamples/android-sunflower)





-----


UPDATE
Phần tiếp theo [Navigation Architecture Component - Part 2](https://viblo.asia/p/navigation-architecture-component-part-2-eW65GEwOZDO)