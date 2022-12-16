Bạn đã bảo giờ tự đặt câu hỏi cho mình đó là: Khi người dùng đang trải nghiệm, giao tiếp với ứng dụng mà họ cảm thấy bị lag khi sử dụng một ứng dụng?  Câu trả lời không phải lúc nào cũng rõ ràng, nhưng hầu hết thời gian nó phải làm với các tác vụ nặng về CPU, và cũng có trường hợp các loại vấn đề về hiệu năng này có liên quan đến bộ nhớ.
Tất nhiên, bạn có thể in logs để giúp bạn khắc phục sự cố, nhưng bạn cần phải khá quen thuộc với codebase để đặt logs ở những nơi thích hợp.

Nếu bạn muốn khám phá một option khác mà không chỉ dựa vào logs, thì hãy sử dụng **Android Profiler**,  đã giới thiệu trong Android Studio 3.0. Các developer có thể sử dụng công cụ này để giám sát việc sử dụng CPU và sử dụng bộ nhớ, chặn các  response network và thậm chí quan sát mức tiêu thụ năng lượng.
Dựa trên dữ liệu số liệu được cung cấp bởi Android Profiler, chúng ta có thể hiểu rõ hơn về cách các ứng dụng của mình sử dụng CPU và các tài nguyên bộ nhớ khác. Đây là những mấu chốt cuối cùng có thể dẫn chúng ta đến nguyên nhân gốc rễ của vấn đề.
Trong bài viết này, chúng ta sẽ thảo luận về các phương pháp để giải quyết các vấn đề liên quan đến hiệu suất một cách có hệ thống bằng cách sử dụng Android Profiler.

## 1. Memory Problems
Hãy cùng xem lại quản lý bộ nhớ Android để chúng ta có thể hiểu tại sao việc sử dụng bộ nhớ không phù hợp có thể góp phần gây ra các vấn đề về hiệu suất. Một ứng dụng Android, giống như bất kỳ ứng dụng phần mềm nào khác, chạy trong môi trường bị giới hạn bộ nhớ, trong đó HĐH Android chỉ định một phần giới hạn nhưng rất linh hoạt (flexible) về memory heap cho mỗi ứng dụng được khởi chạy.
Trong suốt vòng đời của một ứng dụng, HĐH Android phân bổ bộ nhớ cho ứng dụng để lưu trữ các instructions và dữ liệu chương trình (program data). Lượng bộ nhớ cần thiết khác nhau trong các trường hợp sử dụng ứng dụng khác nhau. Chẳng hạn, một ứng dụng cần nhiều bộ nhớ hơn để hiển thị ảnh bitmap toàn màn hình so với văn bản (text) toàn màn hình.

Khi không còn cần một bộ nhớ, HĐH Android sẽ tự động lấy lại tài nguyên bộ nhớ này để có thể sử dụng lại để phục vụ yêu cầu cấp phát bộ nhớ mới. Quá trình này thường được gọi là [Garbage Collection](https://dzone.com/articles/understanding-android-gc-logs).

Garbage Collection thường không ảnh hưởng đến hiệu suất của ứng dụng, vì thời gian tạm dừng ứng dụng gây ra bởi một quy trình Thu gom rác là không đáng kể. Tuy nhiên, nếu có quá nhiều sự kiện Garbage Collection xảy ra trong một khoảng thời gian ngắn, người dùng sẽ bắt đầu có trải nghiệm người dùng chậm chạp trong ứng dụng.

## 2. Memory Profiling with Android Profiler
Các điều kiện cần thiết của Android Profiler là một phiên bản của Android Studio 3.0 trở lên và thiết bị thử nghiệm (thiết bị thật) hoặc trình giả lập (máy ảo) được kết nối đang chạy ít nhất Android SDK Level 26. Hãy nhấp vào tab Profiler ở bảng dưới cùng để khởi chạy Android Profiler.

![](https://images.viblo.asia/44033e2e-5568-4ac9-acd6-a906a9f2e40d.png)

Chạy ứng dụng của bạn ở chế độ debug và bạn sẽ thấy Android Profiler hiển thị các số liệu thời gian thực cho CPU, Bộ nhớ, Mạng và Năng lượng (Energy).

![](https://images.viblo.asia/8bf8beac-8671-439f-bf93-359e3a6d49b0.png)

Click vào phần Memory để xem chi tiết số liệu sử dụng bộ nhớ , Android Profiler cung cấp một cái nhìn tổng quan trực quan về việc sử dụng bộ nhớ theo thời gian.

![](https://images.viblo.asia/d2d93c2d-6b84-4727-ba6f-e3b1ed660a63.png)
*Android Profiler memory profiling*

Như bạn có thể thấy trong diagram trên, có một sự tăng đột biến lúc đầu khi ứng dụng được khởi chạy lần đầu tiên, sau đó là một cú drop tụt xuống và cuối cùng là một đường thẳng (flat line). Đây là hành vi điển hình của một ứng dụng hello world đơn giản, vì có rất nhiều điều đang diễn ra ở đây.
Biểu đồ bộ nhớ phẳng (falt) có nghĩa là sử dụng bộ nhớ ổn định và nó là tình huống bộ nhớ lý tưởng mà chúng ta muốn đạt được.

## 3. Android Profiler in Action

Hãy cùng xem một vài mẫu biểu đồ báo hiệu các vấn đề về bộ nhớ. Bạn có thể sử dụng source code từ [repo GitHub](https://github.com/qichuan/android-profiler-example) này để tái tạo các vấn đề.

### 3.1. Một biểu đồ tăng đột biến (A growing graph)

Nếu bạn quan sát một đường xu hướng chỉ tiếp tục tăng và hiếm khi đi xuống, đó có thể là do rò rỉ bộ nhớ, điều đó có nghĩa là một số phần của bộ nhớ không thể được giải phóng. Hoặc chỉ đơn giản là không đủ bộ nhớ để đối phó với ứng dụng. Khi ứng dụng đã đạt đến giới hạn bộ nhớ và hệ điều hành Android không thể phân bổ thêm bộ nhớ cho ứng dụng, OutOfMemoryError sẽ xảy ra.

![](https://images.viblo.asia/0eb274b9-b53f-496a-8e1b-05fc4eed21b2.png)
*A growing memory usage graph*

Vấn đề này có thể được  tái hiện trong ví dụ Sử dụng bộ nhớ cao từ ứng dụng demo. Ví dụ này về cơ bản tạo ra một số lượng lớn các row (100k) và thêm các row này vào linearLayout. ( Tất nhiên trên thực tế, điều này không phải là một điều phổ biến trong Android, nhưng mình chỉ muốn hiển thị một trường hợp cực đoan khi việc tạo nhiều view có thể gây ra vấn đề về bộ nhớ, như được hiển thị trong mã nguồn bên dưới.)

```java
/***
 * In order to stress the memory usage,
 * this activity creates 100000 rows of TextView when user clicks on the start button
 */
class HighMemoryUsageActivity : AppCompatActivity() {

    val NO_OF_TEXTVIEWS_ADDED = 100000

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_high_memory_usage)

        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.setTitle(R.string.activity_name_high_memory_usage)
        btn_start.setOnClickListener {
            addRowsOfTextView()
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }

    /**
     * Add rows of text views to the root LinearLayout
     */
    private fun addRowsOfTextView() {
        val linearLayout = findViewById<LinearLayout>(R.id.linear_layout)

        val textViewParams = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        )

        val textViews = arrayOfNulls<TextView>(NO_OF_TEXTVIEWS_ADDED)

        for (i in 0 until NO_OF_TEXTVIEWS_ADDED) {
            textViews[i] = TextView(this)
            textViews[i]?.layoutParams = textViewParams
            textViews[i]?.text = i.toString()
            textViews[i]?.setBackgroundColor(getRandomColor())
            linearLayout.addView(textViews[i])
            linearLayout.invalidate()
        }
    }

    /**
     * Creates a random color for background color of the text view.
     */
    private fun getRandomColor(): Int {
        val r = Random()
        val red = r.nextInt(255)
        val green = r.nextInt(255)
        val blue = r.nextInt(255)

        return Color.rgb(red, green, blue)
    }
}
```

Activity này không sử dụng bất kỳ Adapter nào hoặc RecyclerView để tái chế các item view. Do đó, cần có 100 nghìn lần tạo view để hoàn thành việc thực hiện addRowsOfTextView ().

Bây giờ, nhấp vào nút Start và theo dõi việc sử dụng bộ nhớ trong Android Studio. Việc sử dụng bộ nhớ tiếp tục tăng và cuối cùng ứng dụng gặp sự cố. Đây là hành vi chúng ta sẽ mong đợi nó xảy ra.

Giải pháp để khắc phục vấn đề này rất đơn giản. Chỉ cần áp dụng RecyclerView để sử dụng lại các item views, nó có thể giảm đáng kể số lần create views. Sơ đồ bên dưới là mức sử dụng bộ nhớ để hiển thị 100 nghìn item views và bạn có thể thấy sự cải thiện trong ví dụ Sử dụng bộ nhớ thấp với RecyclerView.

![](https://images.viblo.asia/0a75f38f-e9c8-460c-a628-7631dcac7e19.png)

*Memory optimization by using RecyclerView*

### 3.2. Nhiễu loạn trong một khoảng thời gian ngắn (Turbulence)

Sự nhiễu loạn là một chỉ số về sự không ổn định và điều này cũng áp dụng cho việc sử dụng bộ nhớ Android. Khi chúng ta quan sát kiểu mẫu này, thường có rất nhiều expensive objects được tạo ra và thrown trong vòng đời ngắn ngủi của chúng.
CPU đang lãng phí rất nhiều performing trong việc thực hiện Thu gom rác, mà không thực hiện công việc thực tế cho ứng dụng. Người dùng có thể gặp phải giao diện người dùng chậm chạp và chúng tôi chắc chắn nên tối ưu hóa việc sử dụng bộ nhớ trong trường hợp này.

![](https://images.viblo.asia/8866ed0f-38e7-4542-8ab5-3dd4d9e3e56b.png)
*A memory usage turbulence*

Để tái hiện vấn đề này, hãy chạy ví dụ Số lượng GC từ ứng dụng demo. Ví dụ này sử dụng RecyclerView để hiển thị hai hình ảnh bitmap thay thế: một hình ảnh bitmap lớn có độ phân giải 1000 x 1000 và một hình nhỏ hơn 256 x 256. Di chuyển RecyclerView và bạn sẽ thấy nhiễu loạn rõ ràng trong Trình tạo bộ nhớ và trải nghiệm người dùng chậm chạp trong ứng dụng di động.

![](https://images.viblo.asia/b4a34d9a-4cc8-4f27-87c7-3f707a87807b.gif)

*Laggy RecyclerView*

```java
class NumerousGCActivity: AppCompatActivity() {

    val NO_OF_VIEWS = 100000


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_numerous_gc)
        btn_start.setOnClickListener {
            setupRecyclerView()
        }
    }

    private fun setupRecyclerView() {
        val numbers = arrayOfNulls<Int>(NO_OF_VIEWS).mapIndexed { index, _ -> index }
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = NumerousGCRecyclerViewAdapter(numbers)
    }
}

class NumerousGCRecyclerViewAdapter(private val numbers: List<Int>): RecyclerView.Adapter<NumerousGCViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NumerousGCViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_numerous_gc, parent, false)
        return NumerousGCViewHolder(view)
    }

    override fun getItemCount(): Int {
        return numbers.size
    }

    override fun onBindViewHolder(vh: NumerousGCViewHolder, position: Int) {
        vh.textView.text = position.toString()

        //Create bitmap from resource
        val bitmap = if(position % 2 == 0)
                BitmapFactory.decodeResource(vh.imageView.context.resources, R.drawable.big_bitmap)
            else
                BitmapFactory.decodeResource(vh.imageView.context.resources, R.drawable.small_bitmap)
        vh.imageView.setImageBitmap(bitmap)
    }
}

class NumerousGCViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    var textView: TextView = itemView.findViewById(R.id.text_view)
    var imageView: ImageView = itemView.findViewById(R.id.image_view)
}
```

Trong trường hợp này, code sample đang implement RecyclerView nhưng chúng ta vẫn gặp phải các vấn đề về bộ nhớ. Mặc dù RecyclerView là giải pháp cho vấn đề bộ nhớ trước đó, nhưng nó không phải là một viên đạn giải quyết tất cả các vấn đề về bộ nhớ. Để tìm ra nguyên nhân gốc rễ, chúng ta cần thêm thông tin để phân tích.

Nhấp vào nút Record trong Memory Profiler, scroll RecyclerView một lúc và nhấp vào nút dừng. Profiler sẽ hiển thị cho bạn một danh sách sử dụng bộ nhớ chi tiết được phân loại theo loại đối tượng.

![](https://images.viblo.asia/e48eb0fb-2e72-4486-b89d-7d22ba36b764.png)

*The detailed memory usage*

Sắp xếp danh sách theo kích thước Shallow và mục trên (top item) cùng là mảng byte, vì vậy chúng tôi biết rằng hầu hết các phân bổ bộ nhớ được quy cho các action tạo mảng byte. Chỉ có 32 phân bổ cho mảng byte và tổng kích thước của nó là 577.871.888 bit, là 72,23 MB.
Để tìm hiểu thêm thông tin, nhấp vào một trong các instances in the instance view và xem allocation call stack. Phương thức được tô sáng là onBindViewHolder () của NumerousGCRecyclerViewAdapter , nhưng chúng ta không tạo ra bất kỳ mảng byte nào rõ ràng với phương thức này.

Hãy nhìn sâu hơn phương thức onBindViewHolder () trong ngăn xếp. Các cuộc gọi phương thức đi từ decodeResource () -> decodeResourceStream () -> decodeStream () -> nativeDecodeAsset () và cuối cùng đến newNonMovableArray(). Tài liệu của phương thức này cho biết:
> Returns an array allocated in an area of the Java heap where it will never be moved. This is used to implement native allocations on the Java heap, such as DirectByteBuffers and Bitmaps.

Có nghĩa là:
Trả về một mảng được phân bổ trong một vùng của vùng heap Java nơi nó sẽ không bao giờ được di chuyển. Điều này được sử dụng để thực hiện phân bổ riêng trên heap Java, chẳng hạn như DirectByteBuffers và Bitmap.

Do đó, chúng ta có thể kết luận rằng rất nhiều mảng byte được tạo ngay tại đây bằng cách sử dụng phương thức nativeDecodeAsset ().
Mỗi lần chúng ta gọi BitmapFactory.decodeResource (), một phiên bản mới của đối tượng bitmap được tạo và do đó dữ liệu mảng byte nằm bên dưới của nó. Nếu chúng ta có thể giảm tần suất của các yêu cầu BitmapFactory.decodeResource (), chúng ta có thể tránh sự cần thiết phải phân bổ bộ nhớ bổ sung và do đó làm giảm sự xuất hiện của Garbage Collection.

```java
class LessNumerousGCRecyclerViewAdapter(private val context: Context,
                                         private val numbers: List<Int>): RecyclerView.Adapter<NumerousGCViewHolder>() {

    val bitBitmap = BitmapFactory.decodeResource(context.resources, R.drawable.big_bitmap)
    val smallBitmap = BitmapFactory.decodeResource(context.resources, R.drawable.small_bitmap)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NumerousGCViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_numerous_gc, parent, false)
        return NumerousGCViewHolder(view)
    }

    override fun getItemCount(): Int {
        return numbers.size
    }

    override fun onBindViewHolder(vh: NumerousGCViewHolder, position: Int) {
        vh.textView.text = position.toString()

        //Reuse bitmap
        val bitmap = if(position % 2 == 0) bitBitmap else smallBitmap
        vh.imageView.setImageBitmap(bitmap)
    }
}
```

Đây là phiên bản cải tiến của RecyclerViewAdapter, chỉ tạo các instances bitmap một lần, lưu trữ chúng và sử dụng lại các bitmap này cho imageView trong phương thức onBindViewHolder (). Bất kỳ phân bổ bộ nhớ không cần thiết khác là avoided. Hãy xem lại tại biểu đồ bộ nhớ sau khi cải tiến.

![](https://images.viblo.asia/3056cd11-e70b-4246-a86f-f488feb2140f.png)

Chúng ta thấy một biểu đồ sử dụng bộ nhớ phẳng và ở đó chỉ có một phân bổ cho một mảng byte và kích thước của nó là không đáng kể. Ngoài ra, ứng dụng giờ đây có thể scroll trơn tru mà không có bất kỳ sự chậm chạp nào.

![](https://images.viblo.asia/4a58d2c3-9f3a-4632-b12a-b136297c6ea5.gif)

*Smooth RecyclerView*

# Summary
Qua bài viết này, mình hy vọng bài viết đã cho bạn ý tưởng về cách sử dụng công cụ định hình để phân tích vấn đề hiệu suất. Và hãy luôn chú ý đến việc sử dụng bộ nhớ trong ứng dụng và tránh phân bổ tài nguyên bộ nhớ không cần thiết. 

Thanks for reading!

Tài liệu tham khảo:
- https://developer.android.com/studio/profile
- https://heartbeat.fritz.ai/profiling-your-app-with-android-studio-7accc268cb98