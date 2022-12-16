# Navigation Component là gì ?
-Navigation là 1 thư viện quan trọng trong bộ thư viện của Android Jetpack's nó có thể giúp bạn điều hướng tới mọi nơi trong ứng dụng của bạn nếu bạn muốn, hổ trợ Animation và cả by Argument, Navigation phù hợp với mô hình Single Activiy hiện tại theo đề xuất của Google, và sau đây mình sẽ cùng các bạn đi sơ lược quá nó 1 chút nhé, nếu thấy nó bổ ích các bạn có thể apply ngay vào project demo của mình hoặc các bạn muốn move sang Navigation Component trong project đã đi được quãng đường xa.
# Các thành phần chính của Navigation Component
-Để sử dụng được Navigation Component thì các bạn cùng mình tìm hiểu về các thành phần chính của nó trước nhé:
## 1. Navigation graph
- Navigation graph: ở xml của chúng ta, đây là thành phần quan trọng nó cho chung ta biết tất cả thông tin của việc chúng ta có các action gì, đi đâu, từ đâu đến đâu của project, nếu các bạn đang sử dụng mô hình Single  Activity thì project của chúng ta sẽ chỉ có duy nhất 1 file xml graph này.
## 2 . NavHost
- Là các điểm đến của các bạn, thành phần này sẽ chứa: NavHost implementation, NavHostFragment, các điểm đến phân mảnh
## 3. NavController
- Là công cụ để các bạn truy cập gọi action, điều hướng tới các điểm đến đã đề cập từ trước
**Thành phần Điều hướng cung cấp một số lợi ích khác, bao gồm những lợi ích sau:**
* Xử lý các giao dịch phân mảnh.
* Xử lý các hành động Up và Back một cách chính xác theo mặc định.
* Cung cấp tài nguyên tiêu chuẩn hóa cho hoạt ảnh và chuyển tiếp.
* Thực hiện và xử lý liên kết sâu.
* Bao gồm các mẫu Giao diện người dùng điều hướng, chẳng hạn như ngăn kéo điều hướng và điều hướng dưới cùng, với công việc bổ sung tối thiểu.
* Safe Args - một plugin Gradle cung cấp tính năng an toàn khi điều hướng và chuyển dữ liệu giữa các điểm đến.
* Hỗ trợ ViewModel - bạn có thể đưa ViewModel vào biểu đồ điều hướng để chia sẻ dữ liệu liên quan đến giao diện người dùng giữa các điểm đến của biểu đồ.
# Sự dụng Navigation như thế nào?
- Bây giờ chúng ta sẽ bắt đầu sử dụng Navigation với project nhé:
1.  Đầu tiên các bạn cần implement vào gradle của các bạn:
    dependencies {
      def nav_version = "2.3.5"

      // Java language implementation
      implementation "androidx.navigation:navigation-fragment:$nav_version"
      implementation "androidx.navigation:navigation-ui:$nav_version"

      // Kotlin
      implementation "androidx.navigation:navigation-fragment-ktx:$nav_version"
      implementation "androidx.navigation:navigation-ui-ktx:$nav_version"

      // Feature module Support
      implementation "androidx.navigation:navigation-dynamic-features-fragment:$nav_version"

      // Testing Navigation
      androidTestImplementation "androidx.navigation:navigation-testing:$nav_version"

      // Jetpack Compose Integration
      implementation "androidx.navigation:navigation-compose:1.0.0-alpha10"
    }
2.  Khởi tạo Navigation graph
Các bạn follow theo các bước này nhé:
To add a navigation graph to your project, do the following:

-Step 1: In the Project window, right-click on the res directory and select New > Android Resource File. The New Resource File dialog appears.

-Step 2: Type a name in the File name field, such as "nav_graph".

-Step 3: Select Navigation from the Resource type drop-down list, and then click OK.

Khi bạn thêm đồ thị điều hướng đầu tiên của mình, Android Studio sẽ tạo một thư mục tài nguyên điều hướng trong thư mục res. Thư mục này chứa tệp tài nguyên đồ thị điều hướng của bạn (ví dụ: nav_graph.xml).

3. Add a NavHost to an activity
-Một trong những phần cốt lõi của thành phần Điều hướng là NavHost.NavHost là một vùng chứa trống nơi các điểm đến được hoán đổi vào và ra khi người dùng điều hướng qua ứng dụng của bạn.
-NavHost phải bắt nguồn từ NavHost. Việc triển khai NavHost mặc định của thành phần Điều hướng, NavHostFragment, xử lý việc hoán đổi các điểm đến phân mảnh.

4. Add a NavHostFragment via XML
    <?xml version="1.0" encoding="utf-8"?>
    <androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

        <androidx.appcompat.widget.Toolbar
            .../>

        <androidx.fragment.app.FragmentContainerView
            android:id="@+id/nav_host_fragment"
            android:name="androidx.navigation.fragment.NavHostFragment"
            android:layout_width="0dp"
            android:layout_height="0dp"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintBottom_toBottomOf="parent"

            app:defaultNavHost="true"
            app:navGraph="@navigation/nav_graph" />

        <com.google.android.material.bottomnavigation.BottomNavigationView
            .../>

    </androidx.constraintlayout.widget.ConstraintLayout>
Lưu ý những điều dưới đây:

Thuộc tính android: name chứa tên lớp của việc triển khai NavHost của bạn.
Thuộc tính app: navGraph liên kết NavHostFragment với biểu đồ điều hướng. Biểu đồ điều hướng chỉ định tất cả các điểm đến trong NavHostFragment này mà người dùng có thể điều hướng đến.
Thuộc tính app: defaultNavHost = "true" đảm bảo rằng NavHostFragment của bạn chặn nút Quay lại của hệ thống. Lưu ý rằng chỉ có một NavHost có thể là mặc định. Nếu bạn có nhiều máy chủ trong cùng một bố cục (ví dụ: bố cục hai ngăn), hãy đảm bảo chỉ chỉ định một NavHost mặc định.
Bạn cũng có thể sử dụng Trình chỉnh sửa bố cục để thêm NavHostFragment vào một hoạt động bằng cách thực hiện như sau:

* Trong danh sách các tệp dự án của bạn, hãy bấm đúp vào tệp XML bố cục của hoạt động của bạn để mở nó trong Trình chỉnh sửa Bố cục.
* Trong ngăn Bảng màu, hãy chọn danh mục Vùng chứa hoặc cách khác là tìm kiếm "NavHostFragment".
* Kéo chế độ xem NavHostFragment vào hoạt động của bạn.
* Tiếp theo, trong hộp thoại Đồ thị điều hướng xuất hiện, hãy chọn đồ thị điều hướng tương ứng để kết hợp với NavHostFragment này, rồi bấm OK.
5. Add destinations to the navigation graph
Bạn có thể tạo điểm đến từ một phân đoạn hoặc hoạt động hiện có. Bạn cũng có thể sử dụng Trình chỉnh sửa điều hướng để tạo điểm đến mới hoặc tạo trình giữ chỗ để sau này thay thế bằng một phân đoạn hoặc hoạt động.
-Trong ví dụ này, hãy tạo một điểm đến mới. Để thêm một điểm đến mới bằng Trình chỉnh sửa Điều hướng, hãy làm như sau:
Trong Trình chỉnh sửa Điều hướng, bấm vào biểu tượng Đích mới, sau đó bấm Tạo điểm đến mới.
6. Anatomy of a destination
Nhấp vào điểm đến để chọn điểm đến và lưu ý các thuộc tính sau trong bảng Thuộc tính:

Trường Loại cho biết liệu đích có được triển khai dưới dạng phân đoạn, hoạt động hay lớp tùy chỉnh khác trong mã nguồn của bạn hay không.
Trường Nhãn chứa tên của tệp bố cục XML của điểm đến.
Trường ID chứa ID của đích được sử dụng để tham chiếu đến đích trong mã.
Menu thả xuống Lớp hiển thị tên của lớp được liên kết với đích. Bạn có thể nhấp vào menu thả xuống này để thay đổi lớp được liên kết thành một loại đích khác.
Nhấp vào tab Văn bản để hiển thị chế độ xem XML của biểu đồ điều hướng của bạn. XML chứa các thuộc tính id, tên, nhãn và bố cục giống nhau cho đích, như được hiển thị bên dưới:
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

7. Designate a screen as the start destination
Đích bắt đầu là màn hình đầu tiên người dùng nhìn thấy khi mở ứng dụng của bạn và là màn hình cuối cùng mà người dùng nhìn thấy khi thoát ứng dụng của bạn. Trình chỉnh sửa Điều hướng sử dụng biểu tượng ngôi nhà để chỉ ra điểm đến bắt đầu.

Khi bạn đã có tất cả các điểm đến của mình, bạn có thể chọn điểm đến xuất phát bằng cách thực hiện như sau:

Trong tab Thiết kế, nhấp vào điểm đến để đánh dấu điểm đến.

Nhấp vào nút Chỉ định điểm đến bắt đầu. Ngoài ra, bạn có thể nhấp chuột phải vào điểm đến và nhấp vào Đặt làm điểm đến bắt đầu.
8. Navigate to a destination
Điều hướng đến đích được thực hiện bằng NavController, một đối tượng quản lý điều hướng ứng dụng trong NavHost. Mỗi NavHost có NavController tương ứng của riêng nó. Bạn có thể truy xuất NavController bằng cách sử dụng một trong các phương pháp sau:
Kotlin:
* Fragment.findNavController()
* View.findNavController()
* Activity.findNavController(viewId: Int)
Java:
* NavHostFragment.findNavController(Fragment)
* Navigation.findNavController(Activity, @IdRes int viewId)
* Navigation.findNavController(View)
- Khi tạo NavHostFragment bằng FragmentContainerView hoặc nếu thêm NavHostFragment vào hoạt động của bạn theo cách thủ công thông qua FragmentTransaction, cố gắng truy xuất NavController trong onCreate () của một Hoạt động thông qua Navigation.findNavController (Activity, @IdRes int) sẽ không thành công. Thay vào đó, bạn nên truy xuất NavController trực tiếp từ NavHostFragment.
    val navHostFragment =
            supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as NavHostFragment
    val navController = navHostFragment.navController
8. Start Acition
- Và cuối cùng các bạn sẽ dùng bất cứ view nào trong fragment là điểm bắt đầu của mình để đi đến điểm kết thúc bằng hàng này
override fun onClick(view: View) {
    val action =
        SpecifyAmountFragmentDirections
            .actionSpecifyAmountFragmentToConfirmationFragment()
    view.findNavController().navigate(action)
} 
in MainActivity
9. Kết luận
- Như vậy chúng ta đã tìm hiểu qua 1 phần và đã có thể sử dụng vào project demo hoặc các bạn muốn import vào dự án đã chạy thì tìm hiểu thêm nhé.


Source : https://developer.android.com/guide/navigation/navigation-getting-started