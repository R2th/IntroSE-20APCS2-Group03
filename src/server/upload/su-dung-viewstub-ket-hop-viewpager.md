# 1. Bài toán đặt ra
Nếu ai đã sử dụng qua Viewpager chắc mọi người cũng biết được rằng ViewPager có nhiệm vụ lưu lại state của các view bên trong nó mắc định là 1 view trước view invisible và 1 view sau view invisible. Nhưng bài toán ở đây chỉ phù hợp khi dữ liệu của bạn không quá lớn, khi khởi tạo Viewpager việc khởi tạo cùng lúc các view không tốn quá nhiều tài nguyên và thời gian thì việc đó vô cùng tiện lợi cho người dùng không cần phải load lại cho lần sau. Nhưng với những trang chứa dữ liệu lớn việc load nhiều view cùng 1 lúc lại khiến cho app trở nên đơ lag khó chịu. 

Mọi người thử nghĩ 1 trang web với dữ liệu lớn như shopee mà chỉ sử dụng mỗi ViewPager để load dữ liệu của 5 tab lớn trong đó mỗi tab lại có thêm 3 tab con nữa. Nếu các tab cùng load một lúc khi người dùng vào app thì sẽ khiến cho app bị đơ một lúc rất lâu.
![](https://images.viblo.asia/8e4128e8-2250-4db1-9124-0c948b5da896.png)

Vậy có thể chỉ phải load từng tab một khi tab được click hiển thị nhưng khi quay lại ta vẫn giữ state của tab đó không?

Điều đó hoàn toàn là có thể nay mình sẽ chia sẻ với mọi người một cách để giải quyết bài toán khá nan giải này. Đó là việc kết hợp giữa ViewStub và ViewPager.
# 2. Giới thiệu quá về ViewStub
ViewStub là một View invisible, có kích thước là ""zero-size" và khi nào cần thì 1 view nào đó sẽ được tạo. Khi ViewStub được set là "visible" hoặc khi phương thức inflate() được gọi đến thì một View nào đó mong muốn sẽ được inflated. ViewStub sẽ tự thay thế chính nó bởi View (hay các View) mà được inflated. Bởi vậy, ViewStub chỉ tồn tại trong hệ thống cho đến khi phương thức setVisibility(int) hoặc inflate() được gọi đến. View được add vào sẽ theo layout parameters của ViewStub đã được định nghĩa trước đó. Vậy nên, đây cũng là một cách có thể giúp cải thiện performance của ứng dụng - chỉ tạo khi cần thiết.

Định nghĩa một ViewStub:

```
<ViewStub android:id="@+id/stub"
          android:inflatedId="@+id/subTree"
          android:layout="@layout/mySubTree"
          android:layout_width="120dip"
          android:layout_height="40dip" />
```
Và sử dụng  ViewStub
```
ViewStub stub = (ViewStub) findViewById(R.id.stub);
View inflated = stub.inflate();
```
Về sơ qua có thể nhiều bạn sẽ cảm thấy **ViewStub** sẽ giống với **Include**. Nhưng thực ra Include chỉ là việc chia bố cục code xml ra thành nhiều file khác nhau cho dễ nhìn và dễ thiết kế. Còn việc vẽ lên view thì vẫn như bình thường còn ViewStub lại khác nó không được thêm vào sẵn chỉ được tải lên khi bạn thực sự dùng nó được set là "visible" hoặc khi phương thức inflate() được gọi đến.

Đây là một tối ưu hóa tốt vì bạn có thể có bố cục phức tạp với hàng tấn chế độ xem nhỏ, chế độ xem phức tạp hoặc tiêu đề ở bất cứ đâu và vẫn có hoạt động của bạn tải lên rất nhanh. 

## 2.1 Các phương thức quan trọng của ViewStub:
1. getInflatedId (): Phương thức này được sử dụng để lấy id của ViewStub
2. setLayoutResource (int layoutResource): Phương thức này được sử dụng để đặt bố cục ghi lên khi StubbedView
3. getLayoutResource (): Phương thức này được sử dụng để lấy bố cục sẽ được sử dụng bởi setsetVisibility (int) hoặc Inflate () để thay thế StubbedView này trong cha mẹ của nó bằng một khung nhìn khác
4. inflate(): Phương thức này được sử dụng để hiển thị bố cục được xác định bởi getLayoutResource() và thay thế StubbedView này trong cha mẹ của nó bằng tài nguyên bố cục được chỉ định
5. setVisibility (int visual ): Phương thức này được sử dụng để hiển thị StubView. Khi khả năng hiển thị được đặt thành VISIBLE hoặc INVISIBLE
6. setOnInflateListener (OnInflateListenerinflateListener): Phương thức này được sử dụng để lắng nghe sự kiện khi chúng ta thêm vào ViewStub

## 2.2 Attributes của ViewStub:
1. id: Thuộc tính này được sử dụng để xác định duy nhất một ViewStub.
2. inflatedId: Thuộc tính này được sử dụng để đặt id của view được thêm vào.
3. layout: Thuộc tính này được sử dụng để cung cấp một mã định danh cho bố cục sẽ được hiển thị khi ViewStub hiển thị hoặc khi buộc phải làm như vậy
# 3. Sử dụng ViewStub kết hợp ViewPager

Bước 1: Xây dựng main chứa ViewPager

Bước 2: Xây dựng frament cần thêm vào ViewPager chứa ViewStub

**fragment_viewstub.xml**
```
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
            android:layout_width="match_parent"
            android:layout_height="match_parent">
   <ProgressBar
           android:id="@+id/inflateProgressbar"
           android:foregroundGravity="center"
           android:layout_gravity="center"
           android:indeterminate="true"
           android:layout_width="48dp"
           android:layout_height="48dp"/>
   <ViewStub
           android:id="@+id/fragmentViewStub"
           android:layout_width="match_parent"
           android:layout_height="match_parent"/>
</FrameLayout>
```

Bước 3: Xử lý logic hiển thị view khi view nhận biết được đang hiển thị thông quá userVisibleHint

**BaseViewStubFragment.class**

```
abstract class BaseViewStubFragment : Fragment() {
   private var mSavedInstanceState: Bundle? = null
   private var hasInflated = false
   private var mViewStub: ViewStub? = null

   override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
       val view = inflater.inflate(R.layout.fragment_viewstub, container, false)
       mViewStub = view.findViewById(R.id.fragmentViewStub) as ViewStub
       mViewStub!!.layoutResource = getViewStubLayoutResource()
       mSavedInstanceState = savedInstanceState

       if (userVisibleHint && !hasInflated) {
           val inflatedView = mViewStub!!.inflate()
           onCreateViewAfterViewStubInflated(inflatedView, mSavedInstanceState)
           afterViewStubInflated(view)
       }

       return view
   }

   protected abstract fun onCreateViewAfterViewStubInflated(inflatedView: View, savedInstanceState: Bundle?)

   /**
    * The layout ID associated with this ViewStub
    * @see ViewStub.setLayoutResource
    * @return
    */
   @LayoutRes
   protected abstract fun getViewStubLayoutResource(): Int

   /**
    *
    * @param originalViewContainerWithViewStub
    */
   @CallSuper
   protected fun afterViewStubInflated(originalViewContainerWithViewStub: View?) {
       hasInflated = true
       if (originalViewContainerWithViewStub != null) {
           val pb = originalViewContainerWithViewStub.findViewById<ProgressBar>(R.id.inflateProgressbar)
           pb.visibility = View.GONE
       }
   }

   override fun setUserVisibleHint(isVisibleToUser: Boolean) {
       super.setUserVisibleHint(isVisibleToUser)

       if (isVisibleToUser && mViewStub != null && !hasInflated) {
           val inflatedView = mViewStub!!.inflate()
           onCreateViewAfterViewStubInflated(inflatedView, mSavedInstanceState)
           afterViewStubInflated(view)
       }
   }

   override fun onDetach() {
       super.onDetach()
       hasInflated = false
   }
}
```

Bước 4: Và cuối cùng là setLayoutResuorce cho view cần hiển thị

**HeavyFragment.class**
```
class HeavyFragment : BaseViewStubFragment() {

   override fun onCreateViewAfterViewStubInflated(inflatedView: View, savedInstanceState: Bundle?) {
       val titleView = inflatedView.findViewById<TextView>(R.id.fragmentTitle)
       titleView.text = arguments!!["title"] as String
   }

   override fun getViewStubLayoutResource(): Int {
       return R.layout.fragment_heavy
   }
}
```

**Kết quả**
![](https://images.viblo.asia/f2f67849-48f5-4a24-83c9-3fbb4be4e768.gif)

# 4. Tổng kết 
Trên đây là một số giới thiệu cơ bản về ViewStub và tip trong việc xư lý tăng hiệu năng trên ứng dụng Android kết hợp ViewPage và ViewStub

Mong rằng những chia sẻ này sẽ giúp ích các bạn trong dự án thực tế!!
Mọi người có thểm tham khảo project tại [đây](https://github.com/am5a03/viewstubfragment-demo?source=post_page---------------------------)

[Nguồn tham khảo](https://medium.com/@raymondctc/android-performance-lazy-inflating-fragment-with-viewstub-b51b2682ec0c)