> Tối ưu hóa mức tiêu thụ bộ nhớ ứng dụng Android của bạn với Profiler trong Android Studio
> 
## App Profiling là gì và nó có thể giúp gì?
Một câu hỏi mà các nhà phát triển ứng dụng phải tự hỏi mình là: Tôi sẽ làm gì khi người dùng giao tiếp mà họ cảm thấy bị lag khi sử dụng một ứng dụng nhất định? Câu trả lời là luôn luôn rõ ràng, nhưng hầu hết thời gian nó phải làm là các tác vụ nặng về CPU chặn luồng chính và cũng có trường hợp các loại vấn đề về hiệu năng này có liên quan đến bộ nhớ.
######
Tất nhiên, bạn có thể in một số log để giúp bạn khắc phục sự số, nhưng bạn cần phải khá quen thuộc với codebase để đặt log vào nơi thích hợp
######
Nếu bạn muốn khám phá một tùy chọn khác không chỉ dựa vào log, hãy xem Android Profiler, được giới thiệu trong Android Studio 3.0. Các nhà phát triển có thể sử dụng công cụ này để giám sát việc sử dụng CPU và sử dụng bộ nhớ, chặn các phản ứng mạng và thậm chí quan sát mức tiêu thụ năng lượng.
######
Dựa trên dữ liệu số liệu do Android Profiler cung cấp, chung tôi có thể hiểu rõ hơn về cách các ứng dụng của tôi sử dụng CPU và các tài nguyên bộ nhớ khác. Đây là nơi có thể dẫn chúng ta đến nguyên nhân gốc rễ của vấn đề.
######
Trong bài viết này, tôi sẽ thảo luận về các phương pháp để giải quyết các vấn đề liên quan đến hiệu suất một cách có hệ thống bằng cách sử dụng Android Profiler.
## Các vấn đề về bộ nhớ
Hãy cùng xem lại quản lý bộ nhớ Android để chúng ta có thể hiểu tại sao việc sử dụng bộ nhớ không phù hợp có thể góp phần gây ra các vấn đề về hiệu suất. Một ứng dụng Android, giống như bất kỳ ứng dụng phần mềm khác, chạy trong môi trường bị giới hạn bộ nhớ, trong đó HĐH Android chỉ định một phần giới hạn nhưng linh hoạt của đống bộ nhớ cho mỗi ứng dụng được khởi chạy.
######
Trong suốt vòng đời của một ứng dụng, HĐH Android phân bổ bộ nhớ cho ứng dụng để lưu trữ các hướng dẫn và dữ liệu chương trình. Lượng bộ nhớ cần thiết khác trong các trường hợp sử dụng ứng dụng khác nhau. Chẳng hạn, một ứng dụng cần nhiều bộ nhớ hơn để hiển thị ảnh bitmap toàn màn hình so với văn bản toàn màn hình.
######
Khi không còn cần bộ nhớ, HĐH Android sẽ tự động lấy lại tài nguyên bộ nhớ này để có thể sử dụng lại để phục vụ yêu cầu cấp phát bộ nhớ mới. Quá trình này thường được gọi là Garbage Collection.
######
Garbage Collection không ảnh hưởng đến hiệu suất của ứng dụng, vì thời gian tạm dừng ứng dụng gây ra bởi một quy trình thu gom rác là không đáng để. Tuy nhiên, nếu có quá nhiều sự kiện Garbage Collection xảy ra trong một khoảng thời gian ngắn, người dùng sẽ bắt đầu có trải nghiệm chậm chạp trong ứng dụng.
## Cấu hình bộ nhớ với Android Profilter
Các điều hiện tiên quyết của Android Profile là bản sao của Android Studio 3.0 trở lên và thiết bị thử nghiệm hoặc trình giả lập được kết nối chạy Android SDK 26 trở lên. Khi bạn đã có những phần ban đầu này, hãy nhấp vào tab Profiler ở bảng dưới cùng để khởi chạy Android Profiler.
![](https://images.viblo.asia/6e9566d7-51af-4e2c-84d1-983dfd2036c8.png)
######
Chạy ứng dụng của bạn ở chế độ Debug và bạn sẽ thấy Android Profiler hiển thị các số liệu real-time cho `CPU`, `Memory`, `Network` và `Energy`.
![](https://images.viblo.asia/44f3dd78-a8c3-4c68-9c28-4640b14a2b06.png)
######
Nhấp vào `Memory` để xem số liệu sử dụng bộ nhớ chi tiết, Android Profiler cung cấp một cái nhìn tổng quan trực quan về việc sử dụng bộ nhớ theo thời gian.
![](https://images.viblo.asia/5f5845c5-5eb6-4c50-9eb1-e3f64d0cb8c8.png)
######
Như bạn có thể thấy trong sơ đồ trên, có một sự tăng đột biến ban đầu khi ứng dụng được khởi chạy lần đầu tiên, sau đó là một giọt và cuối cùng là một đường thẳng. Đây là một hành vi điển hình của một ứng ụng Hello World đơn giản, vì có rất nhiều điều đang diễn ra tại đây.
######
Biểu đồ bộ nhớ phẳng có nghĩa là sử dụng bộ nhớ ổn định và nó là tình huống bộ nhớ lý tưởng mà chúng ta muốn đạt được. Đọc biểu đồ bộ nhớ cũng giống như phân tích biểu đồ chứng khoán nhưng thay vào đó chúng ta phải phân tích chi tiết hơn.
## Android Profiler đang hoạt động

Hãy cùng xem một vài mẫu biểu đồ báo hiệu các vấn đề về bộ nhớ. Bạn có thể sử dụng mã từ [repo Github này](https://github.com/qichuan/android-profiler-example)  để tái tạo các vấn đề này.
#### 1. Một đồ thị đang phát triển
Nếu bạn đang quan sát một đường xu hướng chỉ tiếp tục tăng và hiểm khi đi xuống, đó có thể là do một memory leak, có nghĩa là một số phần của bộ nhớ không thể được giải phóng. Hoặc chỉ đơn giản là không đủ bộ nhớ để đối phó với ứng dụng. Khi ứng dụng đạt đến giới giạn bộ nhớ và HDDH Android không thể phân bổ thêm bộ nhớ cho ứng dụng, OutOfMemoryError sẽ bị ném.

![](https://images.viblo.asia/1f05c38a-19ae-43db-90ce-f697c7f9c15a.png)
Vấn đề này có thể được tái hiện trong ví dụ High Memory Usage từ ứng dụng demo. Ví dụ này về cơ bản tạo ra một số lượng lớn các hàng (100k) và thêm các hàng này vào LinearLayout. 
```
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
Activity này không sử dụng bất kỳ AdapterView hoặc RecyclerView để tái chế các item views, do đó, cần có 100 nghìn views để hoàn thành việc thực hiện `addRowsOfTextView()`
######
Bây giờ, nhấp vào nút bắt đầu và theo dỗi việc sử dụng bộ nhớ trong Android Studio. Việc sử dụng bộ nhớ tiếp tục tăng và cuối cùng ứng dụng crashes. Đây là hành vi được mong đợi.
######
Giải pháp để khắc phục vấn đề này rất đơn giản. Chỉ cần áp dụng RecyclerView sử dụng lại các item views và cúng ta có thể giảm đáng để số lần tạo view. Sơ đồ bên dưới là mức sử dụng bộ nhớ để trình bày cùng với 100k item views. và bạn có thể thấy sự cải thiện trong ví dụ Low Memory Usage With RecyclerView 
![](https://images.viblo.asia/8e2687cb-53e5-4347-bf0f-a521720cad6a.png)
#### 2. Sự nhiễu loạn trong một khoảng thời gian ngắn
Sự nhiễu loạn là một chỉ số về sự không ổn định và điều này cũng áp dụng cho việc sử dụng bộ nhớ Android. Khi chúng ta quan sát loại mô hình này, thường có rất nhiều object được tạo ra và ném đi trong vòng đời ngắn ngủi của chúng.
######
CPU đang lãng phí rất nhiều chu kỳ trong việc thực hiện thu gom rác, mà không thực hiện công việc thực tế cho ứng dụng. Người dúng có thể gặp phải giao diện người dùng chậm chạp và chúng ta chắc chắn nên tối ưu hóa việc sử dụng bộ nhớ trong trường hợp này.
![](https://images.viblo.asia/4b6af59e-4bc9-4044-be78-9b3010d28132.png)
Để tái tạo vấn đề này, hãy chạy ví dụ Numerous GCs từ ứng dụng demo. Ví dụ này sử dụng RecyclerView để hiển thị hai hình ảnh bitmap thay thế: Một hình ảnh bitmap lớn có độ phân giải 1000x1000 và nhỏ hơn 256x256. Scroll RecyclerView và bạn sẽ thấy nhiễu loạn rõ ràng trong Memory Profiler và trải nghiệm người dùng chậm chạp trong ứng dụng di động.
![](https://images.viblo.asia/34b9605e-3b06-4604-a939-30e3056fd6e9.gif)https://images.viblo.asia/34b9605e-3b06-4604-a939-30e3056fd6e9.gif
```
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
Trong trường hợp này, code ví dụ đang sử dụng triển khai RecyclerView thích hợp, nhưng chúng ta vẫn gặp phải các vấn đề về bộ nhớ. Mặc dù RecyclerView là giải pháp cho vấn đề bộ nhớ trước đó, đó là một viên đạn bạc giải quyết tất cả các vấn đề về bộ nhớ. Để tìm ra nguyên nhân gốc rễ, chúng ta cần thêm thông tin để phân tích.
######
Nhấp chuột vào nút Recort trong Menory Profiler, scroll RecyclerView một lúc và nhấp vào nút stop. Profiler sẽ hiển thị cho bạn một danh sách sử dụng bộ nhớ chi tiết được phân loại theo kiểu đối tượng.
![](https://images.viblo.asia/4c89921e-6939-4e34-8b84-f698d136d675.png)
Sắp xếp danh sách theo kích thước Shallow và mục trên cùng là mảng byte, vì vậy chúng tối biết rằng hầu hết các phân bổ bộ nhớ được quy cho các mảng byte được tạo. Chỉ có 32 allcations cho mảng byte và tổng kích thước của nó là 577.871.888 bit là 72,23MB
######
Để tìm hiểu thêm thông tin, nhấp vào một trong các instances trong chế độ xem à xem ngăn xếp cuộc gọi phân bổ. Method được highlight là `onBindViewHolder()` của `NumerousGCRecyclerViewAdapter`, nhưng chung tôi không tạo ra bất kf mảng byte nào rõ ràng với method này.
######
Hãy nhìn xa hơn method onBindViewHolder()  trong call stack. Các cuộc gọi method từ `decodeResource() -> decodeResourceStream() -> decodeStream() -> nativeDecodeAsset()`và cuối cùng đến [`newNonMovableArray()`](https://android.googlesource.com/platform/libcore-snapshot/+/ics-mr1/dalvik/src/main/java/dalvik/system/VMRuntime.java#202). Tài liệu của method này nói `Trả về một mảng được phân bổ trong một khu vực của vùng Java heap nơi nó sẽ không bao giờ được di chuyển. Điều này được sử dụng để thực hiện phân bổ riêng trên Java Heap, chẳng hạn như DirectByteBufffers và Bitmap`
######
Tuy nhiên, chúng ta có thể kết luận rằng rất nhiều mảng byte được tạo ngay tại đây bằng cách sử dụng phương thức `nativeDecodeAsset()`.
######
Mỗi lần chúng ta gọi `BitmapFactory.decodeResource()`, một instance của đối tượng bitmap được tạo. Nếu chung ta có thể giảm tần suất của các lệnh `BitmapFactory.decodeResource()`, chúng ta có thể tránh sự cần thiết phải phân bổ bộ nhớ và do đó làm giảm sự xuất hiện của Garbage Collection.
```
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
Đây là phiên bản cải tiến của RecyclerViewAdapter chỉ tạo các bitmap một lần, lưu trữ chúng và sử dụng lại các bipmap này cho ImageView trong phương thức onBindViewHolder(). Bất kỳ phân bổ bộ nhớ không cần thiết khác được tránh khỏi. Hãy cùng xem lại biểu đồ sau khi cải tiến:
![](https://images.viblo.asia/e77b2946-91d0-4aef-b1ab-647c15b948b6.png)
Chúng ta thấy một biểu đồ sử dụng bộ nhớ phẳng và ở đó chỉ có một phần bổ cho một mảng byte và kích thước của nó là không đáng kể. Ngoài ra, ứng dụng giờ đây có thể cuộn mượn mà không có bất kỳ chậm chạp nào. 
![](https://images.viblo.asia/f67f1421-bc82-446e-91c9-4d458be1ba56.gif)
###
##### Tóm lược
Tôi hy vọng bài này đã cho bản ý tưởng về cách sử dụng công cụ định hình về phân tích vấn đề hiệu suất. Luôn chú ý đến việc sử dụng bộ nhớ trong ứng dụng của bạn và trách phân bổ tài nguyên bộ nhớ không cần thiết. Chỉ cần nhớ, mục tiêu là làm cho biểu đồ sử dụng bộ nhớ của bạn càng phẳng càng tốt.

Nguồn: [Medium](https://heartbeat.fritz.ai/profiling-your-app-with-android-studio-7accc268cb98?fbclid=IwAR282UJVgzMFy0Rx1OYUh44nzRB0rZrtw9Qb-aDFkRKqDpFVhyRLQx5nEug)