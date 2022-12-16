![](https://i.imgur.com/MeJY4SX.gif)
# Tại sao lại thế ?
Sau khi xem hình trên, nhiều bạn sẽ nghĩ "Làm như ảnh trên dễ mà! Sao phải cần tạo ra StatusLayout làm gì nữa" :)
Vậy thì tôi xin phép đặt 1 số vấn đề sau:
Các bạn có app kết nối đến server và làm 20 màn hình. Mỗi màn phải xử lý những trường hợp sau:
1. Có Data trả về
2. Data trả về là rỗng
3. Không tìm thấy (Not found)
4. Request Timeout
5. Chưa kết nối internet

Và con ti tỉ thứ khác nữa 

![](https://images.viblo.asia/41b85c1e-a530-4702-b3dc-d8aff1e6e764.jpg)
### Sau đây là cách của nhiều bác sẽ làm:
Ui dào ôi. Có 5 trường hợp thôi chứ gì. Tạo 5 lớp viewgroup, xong cần thằng nào hiện lên thì View.VISIBLE lên còn lại thì View.Gone đi là xong. Màn hình thứ nhất xong !. Màn hình thứ 2 copy and paste xong. Màn hình thứ 3, thấy nản nản rồi nhưng cố nốt. Đến màn hình thứ 4 thì muốn đập máy

![](https://images.viblo.asia/adb7caeb-7f1f-44b0-9654-4a015b9c7e54.jpg)

Còn bác nào vẫn chày cối thì vẫn làm như thế đến hết 20 màn hình
Đến hôm sau, khách hàng yêu cầu đổi 1 chút giao diện. Thôi xong, lại lại chỉnh lại 20 màn hình đó. Rồi 1 ngày đẹp trời vào tuần sau, khách hàng lại muốn đổi giao diện khác, lúc này muốn đánh nhau rồi đấy :). 

![](https://images.viblo.asia/adb7caeb-7f1f-44b0-9654-4a015b9c7e54.jpg)

Ngoài ra còn 1 vài hạn chế như sau:
1. Thừa views! Vì thực tế android vẫn phải nạp 5 loại viewgroup đó
2. Khó tùy chỉnh và mantain. Cái này chắc ai cũng hiểu rồi vì tôi đã giải thích ở trên
3. Nếu nhiều hơn 5 trường hợp trên thì là ác mộng

### Còn đây là cách làm của tôi
**Mình có thể thêm views bằng code được mà. Khi nào cần view nào thì sẽ thêm view đó thôi và khi nào không cần thì ẩn 1 cái đó đi thế có phải hay hơn không** 
Bác nào mà nghĩ theo hướng này thì thật là 

![](https://images.viblo.asia/aa4b12d8-d280-4515-99ef-1696b7b586fb.jpg)

**Ý tưởng như sau:**
Bạn sẽ bọc toàn bộ content vào trong viewgroup1. Còn các trạng thái sẽ được bọc vào viewgroup2. Và nguyên tắc là viewgroup2 đè lên content viewgroup1.

Dưới dạng XML thì sẽ như sau

```xml
<ViewGroup1>
    <!--Your content-->
    <ViewGroup2>
        <!--Your status-->
    </ViewGroup2>
</ViewGroup1>
```
Trong đó:
+ Your content là: tất cả giao diện khi server trả về
+ Your status là: Các trường hợp ngoại lệ khi muốn thông báo với người dùng (không có dữ liệu, chưa kết nối internet, chết server, ....)

Nói nghe có vẻ dễ, vậy thì code sẽ như thế nào
# Code
Đầu tiên để view này đè lên view khác tôi sẽ chọn `RelativeLayout`
Sau đó tạo class

```kotlin
class StatusLayout : RelativeLayout{
private lateinit var groupStatus: RelativeLayout
}
```
**Cấu trúc XML sẽ như sau:**
```xml
<vn.ngh.statuslayout.StatusLayout
        android:id="@+id/statusLayout"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <!-- Your content here -->
        
</vn.ngh.statuslayout.StatusLayout>
```
Như vậy là `ViewGroup1` đã xong. Đến với `ViewGroup2`

```kotlin
private fun initViews() {
        groupStatus = RelativeLayout(context)
        groupStatus.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
        groupStatus.setBackgroundColor(Color.TRANSPARENT)
        this.addView(groupStatus)
        //default hidden
        hiddenStatus()
        initStatus()
}
```
Trong đó: `groupStatus` là `ViewGroup2`
Nhưng có 1 vấn đề là làm sao để `groupStatus` được thêm vào phần cuối cùng. Giải quyết như sau:

```kotlin
override fun onFinishInflate() {
        super.onFinishInflate()
        initViews()
}
```
Sau đoạn này sẽ được cấu trúc như sau:
```xml
<ViewGroup1>
    <!--Your content-->
    <ViewGroup2>
    </ViewGroup2>
</ViewGroup1>
```
Thêm các trạng thái vào `ViewGroup2` thì đầu tiên ta phải tạo 1 abstract class để xử lý các trạng thái

```kotlin
abstract class BaseStatusLayout(protected var activity: Activity) {

    fun getStatusActivity(): Activity {
        return activity
    }

    abstract fun getLayoutID(): Int
    abstract fun onCreate(rootView: View)
    abstract fun onDestroy()
}
```
và code hoàn chỉnh cho StatusLayout như sau:

```kotlin 
class StatusLayout : RelativeLayout {

    private val TAG: String = "StatusLayout"

    private lateinit var groupStatus: RelativeLayout
    var baseStatusLayout: BaseStatusLayout? = null
        set(value) {
            value?.let {
                if (baseStatusLayout == value) {
                    Log.d(TAG, "same object")
                    return
                }
                activity = value.getStatusActivity()
                field = value
                initStatus()
            }
        }

    private var activity: Activity? = null
    private var layoutInflate: LayoutInflater

    constructor(context: Context) : this(context, null)
    constructor(context: Context, attrs: AttributeSet?) : this(context, attrs, 0)
    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr) {
        layoutInflate = LayoutInflater.from(context)
    }

    override fun onFinishInflate() {
        super.onFinishInflate()
        initViews()
    }

    private fun initViews() {
        groupStatus = RelativeLayout(context)
        groupStatus.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
        groupStatus.setBackgroundColor(Color.TRANSPARENT)
        this.addView(groupStatus)
        //default hidden
        hiddenStatus()
        initStatus()
    }

    private fun initStatus() {
        Log.i(TAG, "initStatus")
        activity?.let {
            it.runOnUiThread({
                removeAllView()
                var view: View? = null

                baseStatusLayout?.let {
                    try {
                        view = layoutInflate.inflate(it.getLayoutID(), groupStatus, false)
                    } catch (ex: InflateException) {
                        Log.e(TAG, ex.message)
                    }
                }

                view?.let {
                    it.layoutParams = ViewGroup.LayoutParams(groupStatus.layoutParams.width, groupStatus.layoutParams.height)
                    groupStatus.addView(it)
                    baseStatusLayout?.onCreate(it)
                }
            })
        }
    }

    fun hiddenStatus() {
        groupStatus.visibility = View.GONE
    }

    fun removeAllView() {
        if (groupStatus.childCount > 0) {
            baseStatusLayout?.let {
                it.onDestroy()
            }
            groupStatus.removeAllViews()
        }
        hiddenStatus()
    }

    fun showStatus() {
        groupStatus.visibility = View.VISIBLE
    }

}
```
Sau đây là ví dụ sử dụng 
```kotlin
class LoadingStatus(activity: Activity) : BaseStatusLayout(activity) {
    override fun getLayoutID(): Int {
        return R.layout.layout_loading
    }

    override fun onCreate(rootView: View) {

    }

    override fun onDestroy() {

    }
}
```
```kotlin
statusLayout.baseStatusLayout = LoadingStatus(this@MainActivity)
statusLayout.showStatus()
```
Để hiểu rõ hơn bạn hãy vào link dưới đây để xem ví dụ cụ thể

[Github: StatusLayout](https://github.com/oTranThanhNghia/StatusLayout)
# Kết luận
Vậy là đã xong. Khá dễ dàng phải không nào. Như phương châm của tôi là đừng chỉ dừng ở việc đọc mà hãy lao vào code mới hiểu rõ được. Vậy nên bạn hãy Fork về github của bạn và code thử ngay thôi.

[Github: StatusLayout](https://github.com/oTranThanhNghia/StatusLayout)

Dưới đây là file apk để bạn có thể thử ngay

[APK](https://github.com/oTranThanhNghia/StatusLayout/blob/master/demo/app-demo.apk)