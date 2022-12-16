# Giới thiệu chung
Gần đây, mình bắt đầu tìm xem có một cách nào khác để điều hướng qua lại bên trong ứng dụng Android ngoài [Intents](https://developer.android.com/reference/android/content/Intent) hay không. Đó là bởi vì trong việc [phát triển ứng dụng Android](https://www.solutionanalysts.com/android-app-development/), chúng ta có rất nhiều thư viện và công cụ có thể giúp các lập trình viên giảm số lượng dòng code thực hiện việc điều hướng, từ đó có thể giúp họ tập trung và các tính năng cốt lõi của ứng dụng. Và từ đó, mình đã tìm thấy thư viện [Navigation Component](https://developer.android.com/guide/navigation/navigation-getting-started) thuộc bộ Jetpack. Google đã giới thiệu bản stable của thư viện vào **14 tháng 3 năm 2019**. Nó cung cấp một cách đơn giản và hoàn thiện để maintain flow của ứng dụng từ một vị trí tập trung.
# Navigation Component
Sau lời giới thiệu vừa rồi, ta hãy cùng thử một vài dòng code với Navigation Component:
```
val navController=Navigation.findNavController(view)
 navController.navigate(LoginFragmentDirections.actionNavigationHomeToNavHome(loginViewModel.email.value.toString()))
```
Và đây là đoạn code với tính năng tương tự khi không sử dụng Navigation Component:
```
 activity.getFragmentManager().beginTransaction()
.add(R.id. container_of_this_frag, new HomeFragment())
.remove(this)
.commit();
```
![](https://images.viblo.asia/8b6af398-66e2-4e6f-9f5a-ea4a3e9de564.gif)

Vậy, ta hãy cùng nhau tạo một ứng dụng sử dụng thư viện Navigation với mô hình MVVM.
Để có thể sử dụng thư viện Navigation, ta cần thêm các dependency của chúng vào file `build.gradle`:
```
 def nav_version = "2.1.0"

 // navigation lib
 implementation "androidx.navigation:navigation-fragment-ktx:$nav_version"
 implementation "androidx.navigation:navigation-ui-ktx:$nav_version"
```
Tiếp theo, vì ta sẽ sử dụng plugin safe argument, thứ được recommend bởi Google, sẽ giúp ta tạo nên các class cho mỗi fragment cũng như các static method cho mỗi action. Để thêm plugin safe argument, ta cần thêm dependency sau vào `app.gradle` 
```
apply plugin: "androidx.navigation.safeargs.kotlin"
```
và `build.gradle`:
```
def nav_version = "2.1.0"
        classpath "androidx.navigation:navigation-safe-args-gradle-plugin:$nav_version"
```
Tới đây, ta đã có thể tạo file navigation trong folder `res`. Để có thể tạo `navigation` folder, ta thực hiện các bước sau:
`res`-> `Android Resource Directory` -> `Select Navigation As Resource Type`
Từ đó, ta có thể thấy folder `navigation`, để tạo một graph mới, click phải ào `navigation` folder và chọn `Create A New File`. Sau đó, ta đã có thể thấy file graph mới được tạo. Chúng ta có hai lựa chọn cho việc tạo graph cho ứng dụng. Với mỗi graph, ta bắt đầu điều hướng từ fragment đầu tiên được load trong `navHost`.
## 1. Kéo thả
![](https://images.viblo.asia/6918b197-6720-459a-9d1a-d62b45f370db.png)

Nếu ta chọn thiết kế theo cách này, ta có thể click trên button + ở phía bên phải, từ đó ta có thể chọn các fragment hay activity mà ta muốn. Sau đó, ta có thể click vào item bất kỳ để tạo các action.
## 2. Sử dụng code XML
```
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/nv_graph"
    app:startDestination="@id/navigation">  
<fragment
        android:id="@+id/homeFragment"
        android:name="com.rudraksh.netednavigation.HomeFragment"
        android:label="activity"
        tools:layout="@layout/fragment_home"/>
        
  <activity
        android:id="@+id/mainActivity"
        android:name="com.rudraksh.netednavigation.MainActivity"
        android:label="activity"
        tools:layout="@layout/activity_main"/>
</navigation>
```
Một cách khác là ta có thể sử dụng XML để khai báo graph.
Hãy cùng tìm hiểu về các thuộc tính của navigation item:
1. `id`:  id của fragment/ activity/ customview
2. `label`: nhãn cho fragment/ activity/ customview
3. `name`: đường dẫn tới fragment/ activity/ customview với package
4. `layout`: đường dẫn tới layout file tương ứng.
Bây giờ, khi ta tiến hành tạo bất kỳ action nào, ở đây, action là thực thể đại diện cho việc điều hướng giữa một fragment tới một fragment khác hay activity, và vì ta sử dụng plugin safe argument, nó sẽ tạo cho ta một static method đối với một action cụ thể trong fragment/ activity.
Hãy cùng xem xét các thuộc tính của một `action`:
1. `id`: là một id duy nhất cho mỗi action và dựa trên nó safe argument sẽ tạo một static method.
2. `popUpTo`: khi ta handle back press và muốn chặn người dùng quay trở lại fragment ta sẽ sử dụng thuộc tính này.
3. `popUpToInclusive`: bất cứ khi nào ta muốn bao gồm cả fragment trong back stack mà ta đã chỉ định với `popUpTo`
4. `destination`: fragment đích của action.
```
 <action
            android:id="@+id/action_homeFragment_to_signout"
            app:popUpTo="@id/homeFragment"
            app:popUpToInclusive="false"
            app:destination="@id/signout" >
            
             <argument
                    android:name="loginName"
                    app:argType="com.rudraksh.netednavigation.Destination"
                    android:defaultValue="a"
                    />
</action>
```
Nếu ta muốn truyền dữ liệu giữa các fragment, ta sẽ sử dụng argument và argument có thể là bất kỳ kiểu dữ liệu nào như là `String`, `Int`, `Double`, `Float`, `Enum`, `Parcelable`, `Serializable`. Hãy cùng tìm hiểu các thuộc tính và cách sử dụng chúng:
1. `name`: tương tự như là key.
2. `argType`: chỉ định kiểu dữ liệu ta muốn gửi trong argument.
3. `defaultValue`: chỉ định giá trị mặc định cho argument.
Bây giờ, ta hãy cùng đi tới `MainActivity` hay host activity với `NavHost` và tìm hiểu các thuộc tính của chúng:
```
<fragment
        android:id="@+id/nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:defaultNavHost="true"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:navGraph="@navigation/nv_graph" />
```
Ở đây, `name` chứa tên class được cài đặt của `NavHost`, `navGraph` chứa graph được load trong `NavHost`. `defaultNavHost` sẽ chịu trách nhiện cho việc tương tác với nút back của hệ thống.
Từ fragment, khi ta muốn thay đổi fragment hay activity, chúng ta có class được generate bởi plugin safe argument, chứa một method cho mỗi action mà ta đã định nghĩa trong graph và ta có thể truyền vào đối số cho phương thức đó:
```
class HomeFragment : Fragment(),View.OnClickListener {
    override fun onClick(p0: View?) {
        when(p0!!.id)
        {
            R.id.button2->{
                val dit=Distination("ad")
                navController.navigate(HomeFragmentDirections.actionNavigationHomeToWelcome(dit))

            }
        }
    }
    lateinit var navController: NavController
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home, container, false)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        navController=Navigation.findNavController(view)

        view.button2.setOnClickListener(this)
    }
}
```
Ta hãy cùng xem xét `HomeFragment`. Ở đây, ta sử dụng `navController` để gọi phương thức `navigate()`. Phương thức này nhận vào một đối tượng `NavDirections` làm đối số để thay đổi fragment được hiển thị. Chúng ta sử dụng plugin safe argument cho nên sẽ được tự động generate class `HomeFragmentDirections` và phương thức `actionHomeFragmentToSignout()`.
Tùy thuộc vào action được khai báo từ trước, phương thức này có thể nhận vào tham số hoặc là không.
Tiêp theo, là cách nhận vào tham số được truyền tới ở fragment đích:
```
class WelcomeFragment : Fragment(),View.OnClickListener{
    val args: welcomeFragmentArgs by navArgs()

    lateinit var navController:NavController
    override fun onClick(p0: View?) {
        when(p0!!.id)
        {
            R.id.button->{
              navController.navigate(welcomeFragmentDirections.actionGlobalMain2Activity())
                activity!!.finish()
            }

        }
    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_welcome, container, false)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        view.button.setOnClickListener(this)
        val name = args.loginName.name
        userName.text=name
        navController= Navigation.findNavController(view)
    }
}
```
Classs `WelcomeFragmentArgs` được tự động generate, do đó ta có thể nhận được tham số được truyền vào tại fragment này.
# Kết luận:
Như vậy, với bài viết ngắn gọn này, mình đã giới thiệu với các bạn về Navigation Component. Hi vọng bài viết có thể giúp bạn làm quen với thư viện rất thú vị này. Cảm ơn bạn đã dành thời gian đọc bài viết. Nếu có bất kỳ góp ý nào, hãy để lại bình luận nhé.
# Tham khảo:
[All You Need to Know about Android Navigation Component](https://medium.com/swlh/all-you-need-to-know-about-android-navigation-component-96778b4f471c)