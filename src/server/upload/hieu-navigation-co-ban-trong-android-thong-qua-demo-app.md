## 1. Giới thiệu:
* `Navigation Component` là một thư viện thành phần trong bộ thư viện của `Android Jetpack`. Mục đích chính của nó là giúp cho việc điều hướng giữa các màn hình trở nên nhanh gọn và đơn giản hơn, dễ maintain, dễ quản lí các `Stack` và được rất nhiều lập trình viên sử dụng trong code base của mình. Trong bài viết này mình sẽ cùng các bạn code một demo cơ bản và dễ hiểu nhất về `Navigation` nhé !

## 2. Setup ban đầu:
*  Chúng ta sẽ code trực tiếp trên project demo sẵn, trong đó đã có sẵn 4 `fragment` để chúng ta không phải mất thêm thời gian vẽ layout cũng như tạo các class fragment.kt. Ta sẽ clone về từ link sau :
*   https://github.com/google-developer-training/android-basics-kotlin-cupcake-app/tree/viewmodel
*   Tại đây nếu các bạn checkout đến nhánh `viewmodel` để sử dụng luôn viewmodel có sẵn.

## 3. Setup navigation cho nút `back` tại `actionBar`:
* Tại lớp `MainActivity.kt` ta sẽ khai báo biến toàn cục `navController` và sẽ gọi phương thức `setUpActionBarWithNavController` trong phương thức `onCreate`:
```kotlin
class MainActivity : AppCompatActivity(R.layout.activity_main) {

    private lateinit var navController: NavController

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val navHostFragment = supportFragmentManager
            .findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        navController = navHostFragment.navController
        setupActionBarWithNavController(navController)
    }
}
```
* Tiếp đến ta gi đè phương thức `onSupportNavigateUp` để chỉ định activity này là `host` của `navigation`:
```kotlin
override fun onSupportNavigateUp(): Boolean {
        return navController.navigateUp() || super.onSupportNavigateUp()
    }
 ```
 
##  4. Tìm hiểu thêm về ngăn xếp:
 * Trong Android chúng ta tương tác với thiết bị thông qua các `Activity` và `Fragment` mỗi thao tác của chúng ta từ khi khởi động app đều được xếp chồng lên nhau trong ngăn xếp (Back Stack), ta hình dung nó như một chồng bánh quy ( miếng bánh trên cùng mà chúng ta nhìn thấy chính là `Activity` hoặc `Fragment` đang hiển thị trên thiết bị. Còn những stack được xếp ở phía dưới nó sẽ được tạm dừng hoạt động và sẵn sàng quay trở lại màn hình chính nếu người dùng bấm nút `Back` cho đến khi tới stack đó. Quy trình của `Back Stack` là Last In First Out, có nghĩa là Stack nào được thêm vào ngăn xếp sau cùng thì khi bấm `Back` nó sẽ được mang ra trước rồi lần lượt như vậy.
 * Lấy ví dụ trong demo app `CupCake` mà chúng ta đang viết, mặc dù chỉ có một activity nhưng lại có nhiều fragment nằm trong nó, nên khi chạy ứng dụng `StartFragment` được đẩy vào ngăn xếp và hiện tại đang đứng trên cùng :
 
 ![Screenshot from 2021-09-12 10-19-42.png](https://images.viblo.asia/e370faca-0795-4fd9-8bc4-efdc9e6cfd16.png)
 
 * Sau khi bạn chọn số lượng bánh cho đơn hàng, `navigation` sẽ điều hướng bạn đến `FlavorFragment` và `FlavorFragment` được đẩy vào `BackStack` và đứng trên cùng của ngăn xếp :
 
 ![Screenshot from 2021-09-12 18-39-48.png](https://images.viblo.asia/63376ce1-1ae2-4426-86f3-99f5dd32f436.png)
 
 * Tiếp đến bạn chọn hương vị cho đơn bánh và `navigation` sẽ điều hướng bạn đến `PickUpFragment` và cũng tương tự fragment này được đẩy tiếp vào trên cùng của `BackStack`:
 
  ![Screenshot from 2021-09-12 18-41-56.png](https://images.viblo.asia/1109c856-e77f-4ce9-bf43-963f66ab40cc.png)
  
 * Sau khi bấm `Next` bạn sẽ được điều hướng đến `SummaryFragment` và cũng tương tự được đẩy vào ngăn xếp :
 
 ![Screenshot from 2021-09-12 18-44-19.png](https://images.viblo.asia/62f3c715-97be-4560-a65e-ba36c63e431e.png)
 
 * Tại thời điểm này bạn bấm nút `Back` trên ActionBar hoặc nút back vật lí trên devices thì `SummaryFragment` sẽ bật ra khỏi `BackStack` và bị hủy hoàn toàn  và bạn sẽ thấy `PickUpFragment` hiển thị lên sau thao tác này:
 
 ![Screenshot from 2021-09-12 18-48-26.png](https://images.viblo.asia/08f18c89-2744-4261-8584-2293527ec842.png)
 
 * Tiếp tục bấm nút `Back` thêm 2 lần nữa thì `PickUpFragment` và `FlavorFragment` cũng lần lượt  bị bật ra khỏi `BackStack` và chỉ còn `StartFragment` hiển thị trên màn hình :
 
 ![Screenshot from 2021-09-12 18-50-13.png](https://images.viblo.asia/ffff64ab-4c7d-4dc6-b139-1b7d0de64dca.png)
 
 * Để làm được việc đó ta cần add action cho navigation, các bước như sau : <br>
     1.  Mở trình chỉnh sửa điều hướng: `res` > `navigation` > `nav_graph.xml` sau đó chọn `Design`
     2.  Hiện tại ta đã thấy được từ `StartFragment` tới `FlavorFragment` đã có một hành động điều hướng đi theo chiều của mũi tên và lần lượt cũng vậy từ `FlavorFragment` cũng có hành động điều hướng đi tới `PickUpFragment` và tương tự với `SummaryFragment`. Nhưng vấn đề ở chỗ khi bạn đặt hàng xong đơn hàng hoặc đã đến màn nào đó gần cuối  nhưng bạn muốn hủy đơn hàng do sai sót gì đó và bạn muốn mình quay trở lại `StartFragment` để tạo một đơn hàng mới hoàn toàn mà không phải Back lại quá nhiều lần, thì hãy thêm những action khác vào navigation này bằng cách sau.
     3.  Click vào `FlavorFragment` kéo đến `StartFragment` sẽ xuất hiện một mũi tên nối giữa hai fragment đó, làm điều tương tự với `PickUpFragment` và `SummaryFragment`.
     4.  Cuối cùng `nav_graph` hoàn chỉnh sẽ trông như sau :
     
     ![Screenshot from 2021-09-12 19-02-09.png](https://images.viblo.asia/62c1512e-bc24-4fc7-aa01-8be6892358f9.png)
 
##  5. Thêm button `Cancel` vào các fragment:
 * Việc này như đã nói ở trên sẽ giúp bạn không phải bấm `Back` quá nhiều lần mà chỉ cần bấm `Cancel` thì lập tức sẽ trở về fragment đầu tiên và sẵn sàng cho đơn hàng mới.
 * Thêm đoạn mã sau vào `fragment_flavor.xml` :
 ```kotlin
          <Button
                android:id="@+id/cancel_button"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:text="@string/cancel"
                style="?attr/materialButtonOutlinedStyle"
                android:layout_marginEnd="@dimen/side_margin"
                app:layout_constraintEnd_toStartOf="@id/next_button"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="@id/next_button" />
```
 * Và sửa `next_button`  thành `app:layout_constraintStart_toEndOf="@id/cancel_button"`
 * Thực hiện tương tự tại `fragment_flavor` và `fragment_summary`
 * Tại class `FravorFragment.kt` ta thêm phương thức sau :
 ```kotlin
 fun cancelOrder() {
        sharedViewModel.resetOrder()
        findNavController().navigate(R.id.action_flavorFragment_to_startFragment)
    }
```
* Phương thức này gọi đến `action` điều hướng từ `FlavorFragment` tới `StarFragment`
* Quay lại `fragment_flavor.xml`và thêm `onClick` cho button `Cancel`:
```kotlin
 android:onClick="@{() -> flavorFragment.cancelOrder()}"
 ```
 * Ta sẽ làm tương tự với `PickUpFragment` và `SummaryFragment`.
 * Tại đây ta có thể chạy ứng dụng và sử dụng nút `Cancel` để tạo đơn hàng mới từ bất cứ fragment nào.
 * Nhưng có một vấn đề phát sinh ở đây là khi bạn đã đến `SummaryFragment` và bấm `Cancel` thì màn hình `StartFragment` hiển thị lên, điều này trông có vẻ đúng. Nhưng nếu tiếp tục bấm `Back` thì sẽ trở lại `SummaryFragment` với thông tin bị bỏ trống. Qua đây ta có thể hình dung ra  được khi bấm `Cancel` là `StartFragment` được đẩy tiếp tục vào trong `BackStack` và những `stack` trước đó vẫn còn tồn tại gây ra trải nghiệm xấu cho người dùng :

![Screenshot from 2021-09-12 19-18-47.png](https://images.viblo.asia/dc7e5098-c733-476b-8f75-21018de6c145.png)

* Để giải quyết vấn đề trên ta cần 2 bước:<br>
  1. Thêm thuộc tính `app:popUpTo = "@id/startFragment"` vào trong action của navigation sẽ giúp bật lần lượt các ngăn xếp cho đến khi gặp được `StartFragment`. Sau bước này `BackStack` trông như sau:
  
  ![Screenshot from 2021-09-12 19-22-52.png](https://images.viblo.asia/13e2f220-a540-47a4-a41c-c131a5a78551.png)
  
  2. Nhưng trên hình ta cũng có thể thấy được là nếu bấm `Back` tiếp thì sẽ lại được điều hướng đến một bản sao của `StartFragment` nên ta cần thêm thuộc tính `app:popUpToInclusive="true"` vào trong action của navigation. Điều này sẽ giúp các ngăn xếp được bật ra ngoài lần lượt đến và luôn cả `StartFragment` cũ.
  3. Cách thực hiện thì các bạn quay lại thao tác giống bước trên để mở ra cửa sổ chỉnh sửa điều hướng, sau đó click vào mũi tên từ `SummaryFragment` chỉ tới `StartFragment` và mũi tên đó sẽ sáng lên màu xanh, bạn nhìn sang bảng `Attribute` bên phải và chọn `popUpTo` chọn `StartFragment` còn dòng bên dưới `popUpToInclusive` chọn `true`
  
  ![Screenshot from 2021-09-12 19-29-32.png](https://images.viblo.asia/3d79c067-d280-4710-a13d-253dadbfdf92.png)
  
  4. Ta làm tương tự với `PickUpFragment` và `FlavorFragment`

* Đến đây ta đã giải quyết tất cả các vấn đề liên quan đến `navigation` thông qua việc sử dụng nút `Back` trên actionBar, nút `Back` vật lí và cả nút `Cancel` nữa, hi vọng các bạn sẽ hiểu hơn về việc sử `Navigation` và sẽ áp dụng nó vào project của mình.
* Cảm ơn các bạn đã theo dõi bài viết !!
* Nguồn :  https://developer.android.com/codelabs/basic-android-kotlin-training-navigation-backstack#0