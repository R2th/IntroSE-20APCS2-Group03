# **Mở bài**
- Giống như những ngôn ngữ khác thì việc refactor giúp chúng ta code nhanh , người khác đọc code cũng dễ hiểu hơn.
# **Khởi tạo đối tượng**
- Sử dụng `apply` cho các câu lệnh khởi tạo đối tượng để cho code sạch hơn, dễ đọc hơn.
```
// Don't 
val textView = TextView(this)
textView.visibility = View.VISIBLE
textView.text = "Framgia"
// Do
val textView = TextView(this).apply {
    visibility = View.VISIBLE
    text = "Framgia"
}
```
# **Kiểm tra `null`**
- Sử dụng `let{ }` thay vì là `if`
```
// Don't 
activity?.childFragmentManager
        ?.beginTransaction()
        ?.setCustomAnimations(...)
        ?.replace(...)
        ?.addToBackStack(...)
        ?.commit()
// Do
activity?.let { activity ->
    activity.childFragmentManager
            .beginTransaction(...)
            .setCustomAnimations(...)
            .replace(...)
            .addToBackStack(...)
            .commit()
}
```
# **Sử dụng `when`**
- `when` thay thế cho `switch` của java, nó giống như 1 sự nâng cấp của `switch` vậy 
```
// Don't
fun  parseResponse(Response response) : Product {
   if (response == null) {
       throw new HTTPException("Something bad happened");
   }
   int code = response.code();
   if (code == 200 || code == 201) {
       return parse(response.body());
   }
   if (code >= 400 && code <= 499) {
       throw new HTTPException("Invalid request");
   }
   if (code >= 500 && code <= 599) {
       throw new HTTPException("Server error");
   }
   throw new HTTPException("Error! Code " + code);
}
// Do
fun parseResponse(response: Response?) = when (response?.code()) {
   null -> throw HTTPException("Something bad happened")
   200, 201 -> parse(response.body())
   in 400..499 -> throw HTTPException("Invalid request")
   in 500..599 -> throw HTTPException("Server error")
   else -> throw HTTPException("Error! Code ${response.code()}")
}
```
# **Sử dụng `set()` và `get()`**
- Khi chúng ta khai báo 1 view ở xml và lấy giá trị của view đó thì hay sử dụng thuộc tính `set()` và `get()` của kotlin để code được tối ưu hơn.
```
// Don't
private var email: String? = null
 override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        email = etEmail.text
    }
// Do 
  private var email: String
        get() = etEmail.text  
        set(v) {
            etEmail.text = v
        }
```

# **Sử dụng `Extention fuctions`**
- `Extention fuctions` là một trong những tính năng tuyệt vời của kotlin, hay tận dụng nó thật tốt để giúp chúng ta đơn giản trong việc code.
```
// Don't
        ivCool.setOnClickListener(this)
        ivHeat.setOnClickListener(this)
        ivAutomatic.setOnClickListener(this)
        ivAirFlow.setOnClickListener(this)
        tvCould.setOnClickListener(this)
// Do
fun View.OnClickListener.listenToViews(vararg views: View) {
    views.forEach { it.setOnClickListener(this) }
}
listenToViews(ivCool, ivHeat,ivAutomatic, ivAirFlow, tvCould)
```
# **Kết thúc**
- Cảm ơn các bạn đã đọc bài viết của mình.