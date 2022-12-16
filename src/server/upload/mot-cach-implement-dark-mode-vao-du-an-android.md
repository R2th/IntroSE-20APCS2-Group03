# Tổng quan
Trong những năm gần đây, Dark Mode xuất hiện trên lượng lớn ứng dụng Mobile, Website, hay các ứng dụng trên nền tảng khác. Ngay cả những tập đoàn lớn cũng đã tích hợp Dark Mode vào ứng dụng của mình, điển hình là Facebook với Website mới, Google, Youtube, Twitter, ...

![](https://images.viblo.asia/9724fd8f-61fc-4418-971b-f807d19bc892.png)


Điểm qua một chút, Dark Mode là tính năng cho phép người dùng chuyển giao diện ứng dụng về tông màu tối, chủ yếu là đen, xám, trái ngược với hầu hết tông màu mặc định của chúng (thường là màu trắng). Với sự phủ sóng ngày càng rộng của các thiết bị di động có màn hình Amoled, Dark Mode phần nào phát huy được ưu điểm lớn, đó là giúp tiết kiệm năng lượng cho thỏi pin vốn vẫn được xem là phần lạc hậu nhất của 1 chiếc điện thoại, cũng như việc giúp người dùng sử dụng lâu không bị mỏi mắt do tiếp xúc liên tục với ánh sáng cường độ lớn. 

Vậy, làm thế nào ta có thể tích hợp tính năng Trendy và hay ho này vào dự án Android của mình? Trong bài viết này, hãy cùng tham khảo qua cách đơn giản nhất, dễ áp dụng nhất mà bản thân mình cũng hay dùng. 
# Các bước thực hiện
Mình sẽ ví dụ xây dựng 1 ứng dụng đơn giản, với giao diện chính chỉ có 1 Button, vừa có chức năng chuyển qua lại giữa 2 chế độ, vừa là ví dụ về thay đổi màu sắc, background.

Giao diện của chúng ta sẽ trông như sau:

```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button"
        android:layout_width="0dp"
        android:layout_height="120dp"
        android:layout_marginStart="16dp"
        android:layout_marginEnd="16dp"
        android:layout_marginBottom="16dp"
        android:clickable="true"
        android:focusable="true"
        android:foreground="?attr/selectableItemBackground"
        android:gravity="center"
        android:text="Button"
        android:textSize="32sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

Giao diện khi chạy trông như sau:

![](https://images.viblo.asia/819c6f89-0df8-495a-bacc-5dd8ec608e22.png)


## Chuẩn bị Style
Bước đầu tiên là chuẩn bị 2 Theme cho ứng dụng, 1 theme mặc định, 1 theme sử dụng khi chuyển sang Dark Mode. Mình sẽ sử dụng nền màu trắng cho chế độ mặc định và nền màu đen cho Dark Mode.

Khi đó, khi ở chế độ mặc định, văn bản, Icons, Button, ... sẽ cần có màu sắc tối để nổi bật trên nền trắng và ngược lại, sẽ cần có màu sáng để nổi bật và dễ thao tác trên nền nền đen.

Mặc định, Android hỗ trợ 2 màu cho nội dung trên thanh Status Bar, màu xám sẽ dùng cho mặc định, màu trắng sẽ dùng cho Dark Mode trên nền đen. Sau khi xác định sự khác biệt chính giữa chủ đề mặc định và chủ đề khi sử dụng Dark Mode, ta sẽ tạo 2 Style sau trong styles.xml:

```
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        <item name="android:colorBackground">@android:color/white</item>
        <item name="android:textColor">@android:color/black</item>
        <item name="android:statusBarColor">@android:color/white</item>
        <item name="android:windowLightStatusBar">true</item>
    </style>

    <style name="AppThemeDark" parent="AppTheme">
        <item name="android:colorBackground">@android:color/black</item>
        <item name="android:textColor">@android:color/white</item>
        <item name="android:statusBarColor">@android:color/black</item>
        <item name="android:windowLightStatusBar">false</item>
    </style>
```

Màu sắc nội dung trên Status bar được định hình qua thuộc tính windowLightStatusBar, thuộc tính này có giá trị true khi ở chế độ mặc định, false khi ở chế độ Dark Mode. Ngoài ra, để đồng nhất màu sắc của Status Bar với màu nền ứng dụng, ta sử dụng thuộc tính statusBarColor để gán màu cho Status Bar.

textColor là đen với chế độ mặc định và trắng với Dark Mode. Vậy là xong điều kiện cần, với những dự án đơn giản, ta không cần đến bước 2, nhưng với đa số dự án có nhiều chức năng, ta sẽ cần đến bước 2 để Custom giao diện hợp lý nhất khi ở 2 chế độ.

## Chuẩn bị Drawable
Theme giúp thay đổi chủ đề chính của ứng dụng như màu nền, màu văn bản, màu Status Bar, ... vậy còn những View được custom background thì sao? Lúc này ta sẽ cần đến 2 phiên bản Drawable cho một View. Ví dụ với 2 hình dưới đây, ở chế độ mặc định bên trái , 1 button được custom với màu đậm hơn màu nền, vậy khi chuyển sang Dark Mode, ta sẽ thay đổi background cho nó như hình bên phải.

![](https://images.viblo.asia/790850e4-0792-45a9-80b9-30413fa5f317.jpg)


Việc này khá đơn giản, ta tạo 2 background Drawable như sau:

Mặc định - bg_default.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <corners android:radius="24dp" />
    <solid android:color="#f2f2f2" />
</shape>
```

Dark Mode - bg_dark.xml

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <corners android:radius="24dp" />
    <solid android:color="#252525" />
</shape>
```

Tương tự, hãy chuẩn bị các custom background tùy thích cho View, hoặc chuẩn bị các Icons khác nhau cho từng chế độ của ứng dụng. Sau khi đã chuẩn bị hết các Drawable, ta sẽ bắt đầu xử lý Dark Mode trong code với bước 3.
## Tạo Object giữ trạng thái
Đến đây, ta cần 1 nơi lưu giữ trạng thái của ứng dụng, đang ở chế độ thường Dark Mode, từ đó, các Activity và Fragment có thể nắm được và thay đổi giao diện cho phù hợp, đồng nhất. Đây cũng là cơ chế áp dụng Dark Mode của mình, đó là, các Activity/ Fragment sẽ lấy trạng thái hiện tại của ứng dụng tại thời điểm render, từ đó áp dụng Style và Drawable tương ứng. Trong phạm vi bài viết, để cho đơn giản, mình sử dụng 1 Object lưu trạng thái true/false của Dark Mode. Tuy nhiên, trong 1 dự án thực, trạng thái này cần được lưu giữ ngay cả khi người dùng tắt ứng dụng, do đó cần được lưu trữ vào File, Database, Server, ...

Object DarkModeUtil đơn giản chỉ có 1 thuộc tính trạng thái như sau:

```
object DarkModeUtil {
    var isDarkMode = false
}
```

false là giá trị mặc định ứng với giao diện mặc định, với màu trắng làm chủ đạo.

Do các Activity/ Fragment đều cần truy cập và thay đổi giao diện, và cùng thực hiện 2 việc như nhau, hoặc là áp dụng Dark Mode, hoặc là không, nên ta sẽ tạo thêm 1 Interface cho việc này như sau:

```
interface DarkModeInterface {

    fun enableDarkMode()
    fun disableDarkMode()
}
```

## Triển khai code
Vậy là xong hết phần chuẩn bị, bây giờ ta sẽ thực hiện thay đổi giao diện của ứng dụng với từng Activity/ Fragment mỗi khi chúng được tạo, dựa vào trạng thái của DarkModeUtil. Các Activity/ Fragment đều được implement DarkModeInterface.
Quay lại với ví dụ trên, ta sẽ cần thay đổi Theme ứng dụng, và background cho Button. Để áp dụng 1 theme cho Activity/ Fragment, ta dùng câu lệnh sau trước lệnh setContentView trong onCreate:

```
setTheme(R.style.YourTheme)
```

Để thay đổi background cho Button, ta dùng lệnh:

```
button.background = getDrawable(R.drawable.your_drawable)
```

Cụ thể, nội dung của 2 hàm `enableDarkMode(), disableDarkMode()` sẽ như sau:

enableDarkMode()

```
override fun enableDarkMode() {
    button.background = getDrawable(R.drawable.bg_dark)
}
```

disableDarkMode()

```
override fun disableDarkMode() {
    button.background = getDrawable(R.drawable.bg_default)
}
```

Giờ ta sẽ sử dụng câu lệnh điều khiển If trong onCreate để xử lý Theme và handle 2 hàm này, Activity sẽ như sau:

```
override fun onCreate(savedInstanceState: Bundle?) {
        applyTheme()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)
        applyBackground()
    }
    
private fun applyTheme() {
        val theme = if (DarkModeUtil.isDarkMode) R.style.AppThemeDark else R.style.AppTheme
        setTheme(theme)
    }

private fun applyBackground() {
        if (DarkModeUtil.isDarkMode) enableDarkMode() else disableDarkMode()
    }
```

Vậy là về cơ bản, khi đặt giá trị của isDarkMode là true hoặc false, khi Build và chạy ứng dụng, ta sẽ được giao diện như ý muốn. 

Dark Mode đã được implement thành công rồi, vậy khi muốn thay đổi trạng thái thì phải làm như thế nào? Ta sẽ dùng button để chuyển qua lại giữa 2 chế độ. Ta set Click cho button như sau:

```
button.setOnClickListener {
            DarkModeUtil.isDarkMode = DarkModeUtil.isDarkMode.not()
            recreate()
        }
```

Ta cần sử dụng recreate() để tạo lại Activity, do Theme đã được thay đổi. Dữ liệu, trạng thái, ... nên được giữ lại, có thể thông qua ViewModel, savedInstanceState, ...


MainActivity đầy đủ sẽ như sau:

```
class MainActivity : AppCompatActivity(), DarkModeInterface {

    override fun onCreate(savedInstanceState: Bundle?) {
        applyTheme()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)
        applyBackground()
        button.setOnClickListener {
                DarkModeUtil.isDarkMode = DarkModeUtil.isDarkMode.not()
                recreate()
            }
    }

    private fun applyTheme() {
        val theme = if (DarkModeUtil.isDarkMode) R.style.AppThemeDark else R.style.AppTheme
        setTheme(theme)
    }

    private fun applyBackground() {
        if (DarkModeUtil.isDarkMode) enableDarkMode() else disableDarkMode()
    }

    override fun enableDarkMode() {
        button.background = getDrawable(R.drawable.bg_dark)
    }

    override fun disableDarkMode() {
        button.background = getDrawable(R.drawable.bg_default)
    }

}
```

Giờ chạy ứng dụng, ta có thể thay đổi qua lại Dark Mode và Default Mode như Demo dưới. Vậy là mình đã giúp các bạn hoàn thành việc áp dụng Dark Mode cho dự án, việc tiếp theo sẽ phụ thuộc vào khả năng sáng tạo với UI, UX của bạn ^^.

![](https://images.viblo.asia/c8cfe602-c062-457d-bbfc-3bcaadc8e1da.gif)

# Tổng kết
Như vậy, mình đã giới thiệu cách implement Dark Mode đơn giản nhất. Với ví dụ đơn giản này, ta hoàn toàn có thể áp dụng cho các ứng dụng lớn, dự án phức tạp hơn. Hy vọng bài viết sẽ giúp các bạn có thêm gợi ý cho ứng dụng của mình trở nên hiện đại hơn, bắt Trend hơn. Đây là cách mình tối ưu và sử dụng, nếu có phương pháp áp dụng Dark Mode nào hay hơn, hãy để lại comment để cùng trao đổi nhé!