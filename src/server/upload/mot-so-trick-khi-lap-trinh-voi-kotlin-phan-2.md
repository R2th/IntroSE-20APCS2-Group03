Tiếp theo Một số trick khi lập trình với Kotlin phần 1
(https://viblo.asia/p/mot-so-trick-khi-lap-trinh-voi-kotlin-phan-1-4dbZN8Vk5YM)
Ở phần 2 này mình sẽ trình bày việc sử dụng một số trick khác giúp bạn sử dụng kotlin hiệu quả hơn trong quá trình phát triển app.

# 1. Sử dụng context

Trong Java, khi chúng ta tìm kiếm một view, chúng ta phải đợi cho đến khi layout của activity được inflated cho đến khi bạn có thể gán một giá trị cho một trường.Và điều tương tự cũng xảy ra với context. 
Nếu một đối tượng phụ thuộc vào context, bạn cần khai báo field ở đầu class và sau đó gán một giá trị tạo hàm onCreate.Với delegation của Kotlin, bạn có thể handle điều này dễ dàng hơn với từ khóa lazy. 
Code sẽ không được thực hiện cho đến khi biến được gọi trong thân hàm

```
override val toolbar by lazy { find<Toolbar>(R.id.toolbar) }

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_detail)
    setSupportActionBar(toolbar)
}
```

Hàm find bên trên được lấy từ thư viện Anko(Các bạn có thể hiểu thêm về anko tại đây https://medium.com/@v.souhrada/introduction-to-anko-for-android-part-1-6178d536cbe6). Nhưng các bạn cũng có thể làm điều tương tự với inline function của kotlin

```
inline fun <reified T : View> Activity.find(id: Int): T = findViewById(id) as T
```
# 2. Sử dụng lamda

Trong Java, chúng ta cần tạo các objets cho mọi thứ. Một ví dụ điển hình là postDelayed, nơi bạn cần tạo một Runnable hoàn chỉnh. Với Kotlin chỉ cần một lambda, và nó đẹp hơn và dễ đọc hơn nhiều:

```
view.postDelayed({ doWhatever() }, 200)
```

Và với việc tạo thread 

```
Thread().run { 
    // Xử lý bên trong thread
}
```

# 3. Không cần Async task 
Nhờ thư viện Anko, chúng ta có một DSL nhỏ để xử lý các background thread.(DSL là viết tắt của domain-specific language các bạn có thể tìm hiểu kĩ hơn tại đây https://viblo.asia/p/dsls-trong-kotlin-phan-1-1VgZvEy7KAw).
```
doAsync() {
    // Do something in a secondary thread
    uiThread {
        // Xử  lý main thread
    }
}
```

Một điều nữa là nếu Activity kết thúc hoạt động thì thread cũng ngừng việc xử lý vì nó có thể nhận biết được trạng thái hiện tại của ứng dụng.

# 4. Xử lý collection

Với việc sử dụng lambdas và functional operations thì việc xử lý collection sẽ trở nên rất thuận tiện và dễ dàng.
Chúng ta cũng xem đoạn code sau

```
return parsedContacts.filter { it.name != null && it.image != null }
        .sortedBy { it.name }
        .map { Contact(it.id, it.name!!, it.image!!) }
```

Chỉ với 3 dòng code gọi đến các functional operations và lambdas chúng ta đã có thể thực hiện việc filter, sort, chuyển đổi data. 
Thật đơn giản và ngắn gọn phải không nào

# 5. Không cần get/set với dataclass

Đây là một trong những điểm mình thích nhất của kotlin. So với trước dùng java với rất nhiều hàm get/set thì giờ đên trên kotlin. 
Có thể thực hiện get/set qua việc gọi trực tiếp property của dataclass. cùng xem ví dụ dưới đây

```
data class Person(val name: String, val surname: String, val age: Int) 
```

Với cách dùng này bạn có thể trực tiếp get và set giá trị qua property mà không cần gọi hàm get/set

# 6. Start activity với anko

Anko giúp chúng ta thực hiện việc start 1 activity mới theo cách dễ dàng hơn nhiều.

```
startActivity<DetailActivity>("id" to 1, "name" to "Detail")
```

Với đoạn code trên chúng ta đã có thể start 1 activity đồng thời gán thêm 2 giá trị 1 và Detail vào bundle. Rất thuận tiện

Như vây là mình đã trình bày xong phần 2 bài viết Một số trick khi lập trình với Kotlin. Hi vọng bạn thấy nó hưu ích trong quá trình dùng kotlin. 

Nguồn: https://antonioleiva.com/kotlin-awesome-tricks-for-android, https://blog.philipphauer.de/idiomatic-kotlin-best-practices/, https://kotlinlang.org/docs/reference/extensions.html. . Nếu có gì sai sót rất mong nhận được sự đóng góp từ phía các bạn.