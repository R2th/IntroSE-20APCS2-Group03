#### Mở đầu
:hugs:  Hello , xin chào các bạn, bài viết hôm nay mình muốn chia sẻ tới các bạn là Alert Dialog - một thành phần rất hay sử dụng trong Android app.<br>
Phần tử giao diện người dùng có vẻ đơn giản này có rất nhiều tính năng ẩn. <br>
Nếu bạn đã từng phát triển một ứng dụng, có thể bạn đã sử dụng nó rất nhiều phải không ? :thinking::thinking:

#### Khái quát
![](https://images.viblo.asia/2e745ad7-2af0-4abb-b55b-6a9a589184c8.png)
<br>Chức năng chính của AlertDialog là thông báo cho người dùng về điều gì đó sắp xảy ra cần họ chú ý ngay lập tức và họ phải thực hiện hành động. <br>Việc sử dụng AlertDialog rất nhiều và có thể bao gồm:
* Yêu cầu người dùng cấp quyền cho ứng dụng của bạn làm điều gì đó (vị trí)
* Thông báo cho người dùng về một hành động sắp diễn ra (xóa ảnh)
* Thông báo cho người dùng về những gì đang xảy ra (tính năng không khả dụng, lỗi mạng, ...)

<br>Mình sẽ không đề cập đến các trường hợp sử dụng cơ bản và cấu trúc của một AlertDialog, chỉ đề cập đến một số cách sử dụng nâng cao hơn và cảnh báo của phần tử UI này.

#### 1. Độ dài tiêu đề của Alert Dialog
Đặt tiêu đề trên AlertDialog thật dễ dàng. Sử dụng phương pháp sau:<br>
```
public AlertDialog.Builder setTitle (CharSequence title)
```
<br>Điều không rõ ràng từ code là: tiêu đề của hộp thoại chỉ được giới hạn trong hai dòng. Có nghĩa là nếu bạn viết một tiêu đề dài, nó sẽ bị cắt bớt và bạn sẽ thấy ba dấu chấm (…) được hiển thị có nghĩa là câu dài hơn so với những gì nó đang xuất hiện:<br><br>
![](https://images.viblo.asia/fe22c61c-ebe8-442e-930f-716387d2f60c.jpeg)
<br>
Nhưng nếu chúng ta cần thêm chỗ cho tiêu đề của mình thì sao? Chúng ta có thể sử dụng phương thức **setCustomTitle()** nhận View làm tham số.
```
public AlertDialog.Builder setCustomTitle (View customTitleView)
```
<br>Sử dụng cách trên, chúng ta có thể dễ dàng tạo TextView và tạo kiểu theo ý thích của mình để có được kết quả mong muốn.<br>
```
val dialog = AlertDialog.Builder(this)
val textView = TextView(this)

with(textView) {
    textView.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi neque, pulvinar sit amet tortor vitae, porta suscipit neque."
    textView.textSize = 20.0F
    textView.setTypeface(null, Typeface.BOLD)
    textView.gravity = Gravity.CENTER
}

dialog.setCustomTitle(textView)
dialog.setMessage("AlertDialog Message")
dialog.setNeutralButton("Dismiss") {dialog, which ->
    //Neutral button click logic
}
dialog.show()
```

Kết quả:
![](https://images.viblo.asia/ad7bbe36-29b7-4de7-9a34-0c5e59a67f27.png)


#### 2. Neutral Button (Nút trung lập)
![](https://images.viblo.asia/0f2ce555-10d3-494f-9136-64a6de8acdb3.png)

Mặc dù bạn có thể quen thuộc với các nút đồng ý hoặc từ chối được liên kết với AlertDialog, nhưng cũng có một loại nút khác có sẵn. Nút đó là **Neutral Button** . Điều đặc biệt ở nút này là nó báo hiệu cho người dùng biết rằng nếu họ thực hiện lựa chọn này thì sẽ không có gì bị ảnh hưởng.<br>
```
public AlertDialog.Builder setNeutralButton (
                CharSequence text, 
                DialogInterface.OnClickListener listener
)
```

Nếu bạn nhìn vào ảnh chụp màn hình ở trên, bạn có thể thấy rằng nút có văn bản Cancel là một Neutral Button.<br>
#### 3. Danh sách gồm các mục lựa chọn
Sau khi đặt tiêu đề, chúng ta có thể đặt thông điệp của hộp thoại cảnh báo của mình. Một lần nữa, điều gì sẽ xảy ra nếu chúng tôi muốn người dùng chọn một cái gì đó trong hộp thoại cảnh báo của chúng tôi (ngoài danh sách)? <br><br>
Để làm được điều đó, chúng ta có thể sử dụng phương thức **setItems** :
```
public AlertDialog.Builder setItems (
                CharSequence[] items, 
                DialogInterface.OnClickListener listener
)
```
Hoặc chúng ta có thể sử dụng phương **thức setSingleChoiceItems** :<br>
```

public AlertDialog.Builder setSingleChoiceItems (
                CharSequence[] items, 
                int checkedItem, 
                DialogInterface.OnClickListener listener
)
```
<br>
Ở đây, chúng ta đến một ngã ba trên đường, bởi vì chúng ta sẽ phải chọn thứ quan trọng hơn đối với chúng ta: danh sách các mục hoặc thông báo của Alert Dialog. <br>Chúng ta không thể có cả hai. Trích dẫn tài liệu của android docs:<br><br>

***…Because the list appears in the dialog’s content area, the dialog cannot show both a message and a list…***

Khi sử dụng danh sách mục, bạn nên sử dụng adapter để xử lý việc tương tác và quản lý danh sách mục của chúng tôi. Dưới đây là một minh chứng đơn giản về cách đạt được điều đó:

```
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val listAdapter = AlertDialogListAdapter(this)
        val dialog = AlertDialog.Builder(this)
        dialog.setTitle("Items List")
        dialog.setAdapter(listAdapter, {dialog, which ->
            //Clicking on list element logic here
        })

        dialog.setNeutralButton("Dismiss") {dialog, which ->
            //Click on dismiss button logic here
        }
        dialog.show()

    }
```

Và...:<br>

```
class AlertDialogListAdapter(private val context: Context) : BaseAdapter() {

    private val inflater: LayoutInflater
            = context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater

    private val data : ArrayList<String> = arrayListOf("One", "Two", "Three")

    override fun getView(position: Int, p1: View?, p2: ViewGroup?): View {
        val listItem = inflater.inflate(R.layout.list_item, p2, false)
        val textView = listItem.findViewById(R.id.text_view) as TextView
        textView.text = data[position]

        return listItem
    }

    override fun getItem(position: Int): Any {
        return data[position]
    }

    override fun getItemId(position: Int): Long {
      return position.toLong()
    }

    override fun getCount(): Int {
        return data.size
    }
}
```

Layout:<br>

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/text_view"
        android:textSize="20sp">

    </TextView>

</LinearLayout>
```

Kết quả:<br>

![](https://images.viblo.asia/52d06080-8df2-4f5a-9bb5-62ba0162e3ed.png)

<br>Nếu bạn không muốn xử lý adapter, bạn có thể sử dụng phương thức **setSingleChoiceItems()** như sau:

```

val items = arrayOf<CharSequence>("One", "Two", "Three")
val dialog = AlertDialog.Builder(this)
dialog.setTitle("Items List")
dialog.setSingleChoiceItems(items, -1) { dialog, which ->
    //Clicking on list element logic here
}

dialog.setNeutralButton("Dismiss") {dialog, which ->
    //Click on dismiss button logic here
}
dialog.show()
```

Và bạn sẽ nhận được những điều sau:

![](https://images.viblo.asia/01a3c4fc-8416-40ae-9d89-7e27e66e4012.png)


#### 4. Alert chứa hình ảnh
Điều gì sẽ xảy ra nếu chúng ta muốn có một tin nhắn và một hình ảnh trong AlertDialog của mình? :thinking::thinking:
<br>
Chúng ta có thể đạt được điều đó bằng cách sử dụng phương thức **setView()**:
```
public AlertDialog.Builder setView (View view)
```

Code Demo:

```

override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val dialog = AlertDialog.Builder(this)
        dialog.setTitle("Custom View")
        val customView = layoutInflater.inflate(R.layout.custom_view, null)
        dialog.setView(customView)
        dialog.setNeutralButton("Dismiss") {dialog, which ->
            //Click on dismiss button logic here
        }
        dialog.show()

    }
```

Custom View:

```

<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">


    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/text_view"
        android:textSize="20sp"
        android:gravity="center"
        android:text="Our AlertDialog Message">

    </TextView>

    <ImageView
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:id="@+id/image_view"
        android:src="@drawable/warning"
        android:layout_gravity="center">

    </ImageView>

</LinearLayout>
```

Kết quả:

![](https://images.viblo.asia/9f21b532-e913-4011-802c-4f13be65597a.png)

Trên thực tế, bạn có thể nhận thấy rằng ngay cả đối với các vấn đề trước, chúng ta có thể sử dụng Custom View có dạng xem danh sách và dạng xem văn bản để xử lý kịch bản của một thông báo và danh sách các mục.

Đó chỉ là một số khả năng rộng mà bạn có thể làm với AlertDialog. Bạn có thể làm nhiều hơn nữa bằng việc Custom view. <br>Hoặc muốn xử lý nhiều hơn thì nên sử dụng DialogFragment. <br>
Nếu bạn có thêm ví dụ như thế này, hãy chia sẻ chúng trong phần bình luận.
<br>
Cảm ơn bạn đã quan tâm theo dõi. :handshake::handshake:

###### Nguồn tham khảo
[ProAndroidDev](https://proandroiddev.com/what-you-might-not-know-about-the-alertdialog-2bdc55f3d907)