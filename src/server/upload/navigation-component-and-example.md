## I. Navigation Component 
### 1. Navigation Component là gì?  
Hiểu đơn giản navigation component là thành phần cho phép user điều hướng qua lại giữa các thành phần(activity, fragment) trong ứng dụng (thay thế cho việc sử dụng intent)
### 2. Các nguyên lý trong navigation component   
* Fixed start destination   
Theo nguyên lý này, tất cả các app đều phải có 1 start destination cố định.
Đây là màn hình đầu tiên khi user nhìn lúc họ mở app từ launcher.
Và cũng là màn hình cuối cùng user nhìn thấy khi họ muốn trở về launcher khi ấn nút back.
* Navigation state được thể hiện là 1 stack các destination  
•	Khi app được chạy, 1 Task mới sẽ được tạo ra và nó sẽ hiển thị start destination.
•	Start destination trở thành destination đầu tiên trong back stack.
•	Khi user điều hướng, top của back stack là screen hiện tại.
•	Mỗi lần user start 1 destination, thì destination đó sẽ được đưa lên top của back stack.
•	Start destination luôn nằm ở đáy của back stack.
•	Bạn tương tác với back stack là tương tác với top destination của back stack đó:
o	push: đưa 1 destination mới lên top.
o	pop: loại bỏ top destination khỏi back stack.
•	Up và back có chức năng tương đương trong app task
![](https://images.viblo.asia/a2ee932a-e95a-4742-9646-2b7f896a72dc.png)
	

* Nếu bạn làm việc với android mà vẫn chưa biết 2 nút này thì trên là hình ảnh của 2 nút theo thứ tự là up (thường xuất hiện trên ActionBar) và back (xuất hiện ở navigation bar - thanh điều hướng).
*	Up button không bao giờ exit app  
Nếu user đang ở start destination, up button sẽ bị ẩn đi vì nó không được exit app. Back button thì vẫn exit app bình thường.
*	Deep linking mô phỏng navigation  
•	Khi deep link hoặc việc điều hướng tới 1 destination, bạn có thể sử up button để trở lại các destination trước.
•	Khi deep link tới 1 destination trong app task của bạn, bất cứ back stack đang tồn tại nào của app task cũng bị remove và bị thay thế bởi back stack của deep link.

### 3. Các thành phần chính trong Navigation component   
Navigation component giới thiệu về khái niệm là Destination (điểm đến). Destination là bất kỳ nơi nào bạn có thể điều hướng đến trong ứng dụng của mình, thường là một fragment hoặc một activity. Những điều này được hỗ trợ ngoài hộp, nhưng bạn cũng có thể tạo các loại đích tùy chỉnh của riêng mình nếu cần.  
Navigation graph là một đồ thị mô tả một nhóm các Navigation destination và sự kết nối của chúng (ảnh mô tả bên dưới)    
![](https://images.viblo.asia/f469f836-bcc6-4218-af48-7fed526a87f4.png)

Navigation Destination có thể là một màn hình hoặc là một vài view trong ứng dụng của bạn. Trong Usecase Diagram trên thì ứng với mỗi use case tương ứng sẽ là một Navigation Destination  

Một Navigation action là một đường dẫn kết nối một destination với một destination khác. Một action sẽ cho biết destination nào nó đang kết nối và loại thông tin sẽ xảy ra giữa chúng  

Navigation host Một container trống hiển thị một destination và action trong navigation graph Nó thực hiện điều hướng các destination khác nhau  
  
Navigation host Một container trống hiển thị một destination và action trong navigation graph Nó thực hiện điều hướng các destination khác nhau  
## II. Example 
Link github : https://github.com/yenntt-1728/NavigationExample
Thêm vào build gradle của ứng dụng các dependencies của Navigation  
```javascript
dependencies {
    def nav_version = "1.0.0-alpha04"

    implementation "android.arch.navigation:navigation-fragment:$nav_version" // use -ktx for Kotlin
    implementation "android.arch.navigation:navigation-ui:$nav_version" // use -ktx for Kotlin

    // optional - Test helpers
    androidTestImplementation "android.arch.navigation:navigation-testing:$nav_version" // use -ktx for Kotlin
}
```
Tạo file Navigation Graph  
Đầu tiên bạn phải tạo file nav_graph.xml như tạo file xml bình thường chú ý chọn Resource-type là Navigation.  
Open res/navigation/mobile_navigation.xml
![](https://images.viblo.asia/f5ed9b06-77ba-459d-aa3e-eb57bbc89025.png)
* Sử dụng navigation để điều hướng 
Đưa NavHostFragment vào bên trong activity gốc của bạn để thông qua NaviHostFragment này điều hướng bên trong ứng dụng của bạn 
![](https://images.viblo.asia/898df552-5a45-435e-83c5-fb2547994543.png)


Đoạn code sau sẽ mô tả điều này (trong file layout navigation_activity.xml)  
```javascript
<LinearLayout
    .../>
    <androidx.appcompat.widget.Toolbar
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
    <com.google.android.material.bottomnavigation.BottomNavigationView
        .../>
</LinearLayout>
```

android:name="androidx.navigation.fragment.NavHostFragment" and app:defaultNavHost="true" sẽ connect đến button back trên hệ thống với NavHostFragment  
app: navGraph = "@navigation/mobile_navigation" liên kết NavHostFragment với Navigation Graph. Navigation graph này chỉ định tất cả các destination mà người dùng có thể điều hướng bên trong NavHostFragment này.    
* NavController 
Và sau khi tạo đầy đủ nav graph, destination, action,.. tiếp đến để kích hoạt việc navigate giữa các thành phần trong ứng dụng của bạn thì bạn cân sử dụng NavController  
```javascript
// Command to navigate to flow_step_one_dest
findNavController().navigate(R.id.flow_step_one_dest)
```
=> có nghĩa là nó đang kích hoạt việc điều hướng đến fragment có id flow_step_one_dest mà bạn đã khai báo ở trong NavGraph   
NavController rất mạnh mẽ vì khi bạn gọi các phương thức như Navigate () hoặc popBackStack (), nó sẽ dịch các lệnh này thành các đoạn code  thích hợp tương ứng với loại đích mà bạn đang điều hướng đến.  Ví dụ: khi bạn gọi navigate() với đích là một activity, thì NavController sẽ thay mặt bạn gọi startActivity ().  
Có một số cách để lấy một đối tượng NavController được liên kết với NavHostFragment của bạn.  
Fragment.findNavController()  
View.findNavController()  
Activity.findNavController(viewId: Int)  
```javascript
 homeBinding.navigateDestinationButton.setOnClickListener{
            findNavController().navigate(R.id.flow_step_one_dest, null)
        }
```
* Custom animation cho việc navigate  
Thêm hiệu ứng khi thực hiện navigate giữa các màn hình   
```javascript
val options = navOptions {
            anim {
                enter = R.anim.slide_in_right
                exit = R.anim.slide_out_left
                popEnter = R.anim.slide_in_left
                popExit = R.anim.slide_out_right
            }
        }
        homeBinding.navigateDestinationButton.setOnClickListener{
            findNavController().navigate(R.id.flow_step_one_dest, null, options)
        }
```

* Navigate sử dụng Action  
Các đường liên kết giữa các activity và fragment trong navigation graph chính là mô tả trực quan nhất về action 
```javascript
<fragment android:id="@+id/home_dest"
        ...>
        
        <action android:id="@+id/next_action"
            app:destination="@+id/flow_step_one"
            app:enterAnim="@anim/slide_in_right"
            app:exitAnim="@anim/slide_out_left"
            app:popEnterAnim="@anim/slide_in_left"
            app:popExitAnim="@anim/slide_out_right" />
```

* Sử dụng argument để truyền data giữa các thành phần trong ứng dụng   
Navigation component có một plugin Gradle, được gọi là safe args, tạo ra các lớp đối tượng để truy cập an toàn kiểu (safe type) vào các argument được chỉ định cho destination và action 
* Truyền value sử dụng safe argument   
Open the project build.gradle file and notice the safe args plugin:  
```javascript
dependencies {
        classpath "androidx.navigation:navigation-safe-args-gradle-plugin:$navigationVersion"
    //...
    }
```
Open the app/build.gradle file and notice the applied plugin:  
```javascript
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'androidx.navigation.safeargs.kotlin'

android { 
   //...
}
```
và sau đó bạn hoàn toàn có thể sử dụng <argument> bên trong navigate file của bạn 
```javascript
<fragment
    android:id="@+id/flow_step_one_dest"
    android:name="com.example.android.codelabs.navigation.FlowStepFragment"
    tools:layout="@layout/flow_step_one_fragment">
    <argument
        android:name="flowStepNumber"
        app:argType="integer"
        android:defaultValue="1"/>

    <action...>
    </action>
</fragment>
```
    
 * Xử lí deeplink với một destination   
    Navigation component cũng bao gồm hỗ trợ việc sử dụng Deeplink. Deeplink là một cách để nhảy vào giữa việc điều hướng trong ứng dụng của bạn, cho dù đó là từ một liên kết URL hay một intent đang chờ xử lý từ notification