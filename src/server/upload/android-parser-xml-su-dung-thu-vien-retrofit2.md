# I. Mở đầu
Hiện nay, thường thì hầu hêt các API sẽ trả về dữ liệu dưới dạng Json để các client có thể đọc dữ liệu trả về. Nhưng bên cạnh đó, sẽ có những trường hợp mà dữ liệu chúng trả về lại là xml. Thực chất thì trong android cũng đã có thư viện hỗ trợ kỹ thuật parsing như DOM, SAX,... 
Trong bài viết này tôi xin giới thiệu một phương pháp nữa sử dụng thư viện Retrofit2 tiện ích hơn những kỹ thuật trên.

# II. Bắt đầu
Giả sử tôi có một API trả về XML như sau:
```
<orderManager>
    <order name="AX101">
        <product>Product A</product>
    </order>
    <order name="AX102">
        <product>Product B</product>
    </order>
    <order name="AX103">
        <product>Product C</product>
    </order>
</orderManager>
```

## 1. Điều kiện
- Trước khi bắt đầu, chúng ta cùng thêm các phần sau trong project nhé:
- Để lấy dữ liệu từ internet về tất nhiên chúng ta cần thêm quyền truy cập internet cho ứng dụng của bạn rồi. Hãy mở AndroidManifest.xml và thêm quyền internet:
```
<uses-permission android:name="android.permission.INTERNET"/>
```
- Thêm các Dependencies vào trong Gradle file:
```
 implementation 'com.squareup.retrofit2:retrofit:2.3.0'
 implementation ('com.squareup.retrofit2:converter-simplexml:2.0.0-beta3'){
        exclude group: 'xpp3', module: 'xpp3'
        exclude group: 'stax', module: 'stax-api'
        exclude group: 'stax', module: 'stax'
    }
 implementation 'com.squareup.retrofit2:converter-gson:2.3.0'
```

## 2. Sử dụng retrofit để parse xml
Nhìn vào ví dụ trả về xml của API trên, thì chúng ta có thể thấy trong OderManager có 1 list các Oder con.
Trước hết, chúng ta sẽ đi tạo các POJO Object của chúng

### 2.1. Oder class
```
@Root(name = "order")
data class Order(
        @field:Attribute(name = "name")
        val name: String,

        @field:Element(name = "product")
        val product: String
)
```

### 2.2. OderManager class
```
@Root(name = "orderManager")
data class OrderManager(
        @field:ElementList(inline = true)
        val order: List<Order>
)
```

* @Root: node mà class sẽ parse
* @Attribute: định danh giá trị attribute với name được định nghĩa kèm theo trong "()"
* @Element: định danh giá trị element với name được định nghĩa kèm theo trong "()"

### 2.3. OderAPI interface
```
public interface ProductAPI {

    @GET("/xml")
    fun getXML(): Call<OderManager>

}
```

### 2.4. MainActivity
```
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val interceptor = HttpLoggingInterceptor()
        interceptor.level = HttpLoggingInterceptor.Level.BODY
        val client = OkHttpClient.Builder().addInterceptor(interceptor)
                .readTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(15, TimeUnit.SECONDS)
                .build()
        val retrofit = Retrofit.Builder()
                .baseUrl("BASE_URL) //Hãy custom theo API của bạn
                .addConverterFactory(SimpleXmlConverterFactory.create())
                .client(client)
                .build()

        val requestAPI = retrofit.create(ProductAPI::class.java)

        val call = requestAPI.getXML()
        call.enqueue(object : Callback<OrderManager> {
            override fun onResponse(call: Call<OrderManager>, response: Response<OrderManager>) {
                Log.e("Thanh", Gson().toJson(response.body()?.order))
            }

            override fun onFailure(call: Call<OrderManager>, t: Throwable) {
                Log.e("Thanh", t.toString())
            }
        })
    }
```


# III. Kết luận
Trên đây là kỹ thuật parsing xml sang object bên cạnh các kỹ thuật đã có trước đây. 
Trên đây chỉ là một phần nhỏ trong các cấu trúc xml mà API trả về, các bạn có thể tham khảo đầy đủ tại http://simple.sourceforge.net/download/stream/doc/tutorial/tutorial.php 
Cảm ơn các bạn đã theo dõi bài viết của mình!