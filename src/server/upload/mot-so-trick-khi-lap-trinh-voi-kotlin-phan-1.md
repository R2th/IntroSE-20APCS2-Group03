**Giới thiệu**

Chào mọi người, sau một thời gian làm việc với  **Kotlin**. Ở bài viết này mình muốn trình bày về một số trick giúp bạn làm việc hiệu quả hơn với  **Kotlin**.

Bài viết này mình muốn hướng đến đối tượng những người mới học và làm việc với **Kotlin** như mình. 

Những trick ở đây bao gồm việc sử dụng extention, inflate layout, handle click của UI, kết hợp kotlin với sử dụng lambda, Anko....

OK chúng ta cùng bắt đầu

# 1. Xử lý click listener

Việc thiếu lambda trong Java 7 là lý do tại sao việc viết listener và callback không mấy dễ chịu. 
**Kotlin** có lambda với cách viết ngắn gọn và khả năng tương thích tốt với các thư viện Java. Vì vậy, nó có thể ánh xạ các interface với method thành một lambda. 
Ví dụ ở đây đơn giản là 1 dòng code 

```
btnLogin.setOnClickListener { doLogin() }
```
Bạn có thể thấy nó ngắn gọn hơn so với cách viết thông thường rất nhiều lần

# 2. Inflate layout

Mỗi khi bạn sử dụng 1 adapter thì bạn cần sử dụng LayoutInflate nhằm làm công việc chuyển mã từ một file layout xml lên view.
Chắc bạn không xa lạ gì với đoạn code 
```
LayoutInflater.from(parent.getContext()).inflate(R.id.my_layout, parent, false);
```
Với cách viết này thì chúng ta thấy rằng parent không thể inflate layout cho riêng mình nhưng với **Extention function** trong kotlin thì bạn có thể làm được điều đó.
Các bạn có thể tìm hiểu thêm về **Extention function** trong kotlin tại đây https://antonioleiva.com/extension-functions-kotlin/. (Đọc xong link mình gửi các bạn sẽ thấy **extention function** thực sự hữu ích và thấy Kotlin awesome :)))
+ Thực hiện inflate layout với **Extention function**
```
fun ViewGroup.inflate(@LayoutRes layoutRes: Int, attachToRoot: Boolean = false): View {
    return LayoutInflater.from(context).inflate(layoutRes, this, attachToRoot)
}
```
Với đoạn code bên trên chúng ta đã tạo ra 1 extention function cho Viewgroup. Với các giá trị mặc định, bạn có thể tạo nhiều phiên bản của cùng một method mà không cần overload function. Bây giờ bạn có thể gọi inflate layout bằng cách:
```
parent.inflate(R.layout.my_layout)
parent.inflate(R.layout.my_layout, true)
```
Trong đoạn code trên parent.inflate sẽ tự động gọi extention function mà chúng ta định nghĩa bên trên. Và giá trị attachToRoot: Boolean = false là optional. Hay hơn java rất nhiều rồi phải không :smiley: 

# 3. Load image với Imageview

ImageView không thể load trực tiếp image từ một URL. Có một số thư viện custom giúp chúng ta làm điều này, chẳng hạn như NetworkImageView, nhưng điều này buộc bạn phải sử dụng thừa kế, điều này có thể làm bạn gặp một vài issue không đáng có. Một lần nữa với extention function thì tại sao chúng ta không làm nó trở lên đơn giản hơn. 
```
fun ImageView.loadUrl(url: String) {
    Picasso.with(context).load(url).into(this)
}
```
Ở đây mình dùng picasso để load ảnh. Bạn cũng có thể thay bằng một library khác như Glide nếu muốn. Việc sử dụng extention như vậy nếu kết hợp cùng databinding nữa thì càng hữu ích và làm giảm thiểu rất nhiều line code trong project của bạn.

# 4. Menu switches 

```
@Override
public boolean onOptionsItemSelected(MenuItem item) {
    switch (item.getItemId()) {
           case R.id.action_settings:
                navigateToSettings() 
                closeDrawers()
                return true;
           case R.id.nav_camera:
                navigateToCamera() 
                closeDrawers()
                return true;
           case  R.id.nav_slideshow
                loadSlideshow() 
                 closeDrawers()
                return true;
   }
    return super.onOptionsItemSelected(item);
}
```
Chúng ta có thể làm mọi thứ bên trên đơn giản hơn với extention function và từ khóa inline(Bạn có thể tìm hiểu thêm về **inline** tại đây https://viblo.asia/p/nhung-tinh-nang-tuyet-voi-lam-toi-chon-kotlin-thay-vi-java-3Q75wgqe5Wb)

+ Implement **extention function** và sử dụng **inline**

```
inline fun consume(f: () -> Unit): Boolean {
    f()
    return true
}
```

```
inline fun DrawerLayout.consume(f: () -> Unit): Boolean {
    f()
    closeDrawers()
    return true
}
```

Với 2 đoạn code này thì đoạn code ban đầu mình viết sẽ trở thành đoạn code sau 

```
override fun onOptionsItemSelected(item: MenuItem) = when (item.itemId) {
    R.id.action_settings -> consume { navigateToSettings() }
    R.id.nav_camera -> drawer.consume { navigateToCamera() }
    R.id.nav_slideshow -> drawer.consume { loadSlideshow() }
    else -> super.onOptionsItemSelected(item)
}
```
Nhìn ngắn gọn và clear hơn rất nhiều phải không. Ở đây các bạn có thể thấy param là một method và method này được thực hiện sau đó mới gọi  closeDrawers() rồi return true.

Như vậy là mình đã trình bày xong phần 1 bài viết về Một số trick khi lập trình trong Kotlin. Ở phần 2 mình sẽ trình bày thêm 1 số trick khác nữa như sử dụng data class giảm thiểu get/set method, sử dụng anko tạo thread, findViewByID với kotlin...
Bài viết mang quan điểm cá nhân kết hợp với việc dịch từ một số nguồn https://antonioleiva.com/kotlin-awesome-tricks-for-android, https://blog.philipphauer.de/idiomatic-kotlin-best-practices/, https://kotlinlang.org/docs/reference/extensions.html.
Nếu có gì sai sót rất mong nhận được sự đóng góp từ phía các bạn.