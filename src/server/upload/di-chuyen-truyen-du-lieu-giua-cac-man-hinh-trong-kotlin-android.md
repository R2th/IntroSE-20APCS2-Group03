## Di chuyển và Truyền dữ liệu giữa các màn hình trong kotlin android
## 1. Di chuyển giữa các màn hình
- Hôm nay mình sẽ hướng dẫn di chuyển giữa các màn hình khi click và một button.
- Đề thực hiện việc di chuyển giữa các màn hình, việc này khá đơn giản. Đầu tiên chúng ta chỉ cần tạo thêm một màn hình mới trong project của mình. 
Ảnh tạo thêm một màn hình.
- Chúng ta sẽ phân biệt 2 màn hình bằng tên: screen1 và screen2 (di chuyển từ screen1 qua screen2).
- Tạo một button ở screen1:
```
<Button
        android:id="@+id/move_screen"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Next_screen"
        tools:layout_editor_absoluteX="150dp"
        tools:layout_editor_absoluteY="50dp">
    </Button>
```
- Tiếp theo là code cho sự kiện khi onlick và button này.
- Vào file screen1.kt:
- Đầu tiên khai báo button vừa tạo ra thông qua id:
```
        val button = findViewById<Button>(R.id.move_screen)
```
- Tiếp theo là xử lý sự kiên onlick của button:
```
        button.setOnClickListener(){
        ...
        }
```
- Có 2 cách để bạn di chuyển qua màn hình khác như sau:
    + Sử dụng từ khóa Intent:
```
            val intent: Intent = Intent (this, second_activity::class.java)
            startActivity(intent)
```
   + Gọi trực tiếp bằng hàm setContentView():
```
setContentView(R.layout.activity_second_activity)
```
Và sau đó, bạn chỉ cần build chương trình, click vào button bạn vừa tạo ra là đã có thể di chuyển qua màn hình tiếp theo.
## 2. Truyền dữ liệu giữa các màn hình
- Nhiều khi ta không đơn thuần chỉ là mở một màn hình mà còn muốn truyền dữ liệu tới màn hình đó.
- Mình sẽ sử dụng code của phần 1 để demo. Khi click và button của màn screen1, màn screen2 sẽ được mở và hiển thị dữ liệu nhận được từ màn screen 1.
- Mình sẽ hướng dẫn gửi từ dữ liệu đơn giản tới việc gửi các đối tượng.

- Để hiển thị thông tin của dữ liệu nhận được từ screen1, bạn cần tạo 1 text view ở screen2, với id "text_view_s2'.
- Bắt đầu thôi:
### Gửi dữ liệu kiểu string
- Ở file screen1.kt, chúng ta bắt sự kiện click button:
```
        button.setOnClickListener(){
            val intent: Intent = Intent (this, second_activity::class.java)
            intent.putExtra("data", "Hello screen2!") // data: tên của kiểu dữ liệu được gửi, "Hello screen2!": giá trị data được gửi đi
            startActivity(intent)
        }
```
- Ở screen2.kt: bạn xử lý việc hiển thị dữ liệu nhận được trong hàm onCreate():
```
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_second_activity)
        val intent = intent
        val data_ : String = intent.getStringExtra("data")  // lấy dữ liệu nhận được thông qua biên data để gán vào biến data_

        val textView = findViewById<TextView>(R.id.text_view_s2)
        textView.text = data_ //gán text của textView bằng data để hiển thị.
    }

```
### Gửi dữ liệu kiểu Int
- Tương tự với kiểu string, chúng ta cũng sẽ gửi dữ liệu thông qua hàm pushExtra():
- File screen1.kt:
```
        button.setOnClickListener(){
            val intent: Intent = Intent (this, second_activity::class.java)
            intent.putExtra("data", 2021) // 2021 giá trị của data, ở đây chúng ta không cần định nghĩa kiểu dữ liệu.
            startActivity(intent)
        }
```
- Nhưng ở phía scree2.kt sẽ có một chút khác biệt.
```
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_second_activity)
        val intent = intent
        val data_ : Int = intent.getIntExtra("data", 0)   //0 là default value

        val textView = findViewById<TextView>(R.id.text_view_s2)
        textView.text = data_.toString()
    }
```
- Có một chút khác biệt ở đây là khi gọi hàm getIntExtra() cần truyền vào giá trị mặc định, bởi trong nhiều trường hợp, dữ liệu nhận được không đúng hoặc không có thì giá trị mặc định này sẽ được sử dụng.
### Truyền kiểu mảng
- Truyền kiểu mảng sẽ tương tự với kiểu string và kiểu Int.
- File screen1.kt:
```
        button.setOnClickListener(){
            val intent: Intent = Intent (this, second_activity::class.java)
            val dataArray : IntArray = intArrayOf(1,2,3)
            intent.putExtra("data", dataArray)
            startActivity(intent)
        }
```
- Ở file screen2.kt:
```
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_second_activity)
        val intent = intent
        val data_ : IntArray = intent.getIntExtra("data")

        val textView = findViewById<TextView>(R.id.text_view_s2)
        textView.text = data_[0].toString()   //lấy ra phần tử 0 của data_
    }
```
### Truyền một đối tượng
- Đầu tiên để truyền một đối tượng, thì bạn cần tạo ra một đối tượng cho riêng mình. Tạo một class data mới:
```
//thừa kế từ Serializable cho phép chúng ta có thể truyền dữ liệu qua hàm putExtra()
data class Student (val name: String, yearOfBird: Int, val address: String) : Serializable {
}
```
- Sau đó quay trở lại file screen1.kt và khai báo biến theo kiểu dữ liệu vừa tạo ra:
```
        button.setOnClickListener(){
            val intent: Intent = Intent (this, second_activity::class.java)
            val student : Student = Student("Nguyen Van A", 2021, "Ha Noi")
            intent.putExtra("data", student)
            startActivity(intent)
        }
```
- Sau đó ở màn screen2 cũng nhận dữ liệu như bình thường, có một chút khác biệt khi gọi hàm get dữ liệu.
- Ở file screen2.kt:
```
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_second_activity)
        val intent = intent
        val data_ : Student = intent.getSerializableExtra("data") as Student //ở đây cần ép kiểu về Student nếu không sẽ báo lỗi

        val textView = findViewById<TextView>(R.id.text_view_s2)
        textView.text = data_.name + "  " + data_.yearOfBird
    }
```
- Vừa rồi mình vừa chia sẻ về di chuyển và truyền nhận dữ liệu giữa các màn hình. Bài viết của mình vẫn còn nhiều thiếu sót và rất mong nhận được sự góp ý của các bạn để những bài viết sau được chất lượng hơn.