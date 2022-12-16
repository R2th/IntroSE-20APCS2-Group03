![](https://images.viblo.asia/c77fb464-310b-41cd-94fe-432282ff36a2.png)
## **Ví dụ**

Khi bạn là một lập trình viên Android và đang thiết kế một Activity với nhiều view khác nhau. Một trong những việc nhàm chán nhất có lẽ là gán OnClickListener cho rất nhiều view trong layout một lúc. Theo như cách truyền thống, chúng ta thường implement Activity với View.OnClickListener rồi viết một hàm initListeners kiểu như sau:

```Kotlin
    private fun initListeners() {
        textUserName?.setOnClickListener(this)
        textDescription?.setOnClickListener(this)
        imageAvatar?.setOnClickListener(this)
        buttonLogin?.setOnClickListener(this)
    }
    
    override fun onClick(view: View) = when(view.id) {
        R.id.textUserName -> doSomething()
        ...
    }
```

Ở đây, các view được gán vào một đối tượng View.OnClickListener để khi người dùng thực hiện thao tác click vào view thì phương thức onClick() sẽ được gọi. Trong trường hợp này, tôi kiểm tra id của view rồi thực hiện các lệnh mong muốn.

Cách này khá ổn nếu chỉ có 1, 2 view cần setOnClickListener, nhưng trong trường hợp layout quá nhiều view, đến cả chục view cần set thì sao ? Quả thực là không ổn chút nào. Việc cứ phải lặp đi lặp lại một đoạn code như vậy được gọi là boilerplate code. Đó là một trong những thứ nhàm chán và "mỏi tay" nhất trong lập trình.

## **Đề xuất sử dụng Kotlin Extensions**

### **Kotlin Extensions functions là gì ?**

![](https://images.viblo.asia/b3621293-f70e-463c-9322-314408a3cc29.png)

Kotlin Extensions functions (tạm dịch: hàm mở rộng trong Kotlin) cho phép chúng ta mở rộng chức năng của một class/interface bằng cách thêm mới các phương thức. Class/Interface này có thể là class/interface được khai báo bên trong project của bạn hoặc từ một thư viện bên ngoài, thậm chí là cả các thư viện mặc định của Android. Điều này khiến cho việc lập trình trở nên cực "sướng".

Thử nghĩ mà xem, bình thường bạn không thể gán trực tiếp một URL của một file ảnh trên mạng cho một ImageView, nhưng giờ đây, với Kotlin Extensions, bạn có thể viết một hàm mở rộng cho class ImageView để thực hiện việc load ảnh từ một URL vào ImageView thông qua Glide:
```Kotlin
fun ImageView.setImageUrl(url: String) {
    Glide.with(context).load(url).into(this)
}
```

Sau đó, bạn có thể gán URL cho bất kỳ ImageView nào ở bất kỳ đâu. Thật vi diệu.

### Dùng Kotlin Extensions gán OnClickListener như thế nào ?

Quay lại chủ để chính của bài viết, chúng ta bây giờ không muốn phải gán OnClickListener cho từng view nữa. Mà ngược lại, tại sao không gán tất cả các view đó cho một OnClickListener nhỉ.

Ví dụ:
```Kotlin
private fun initListeners() {
    listOf(textUserName, textDescription, imageAvatar, buttonLogin).forEach { view -> 
        view?.setOnClickListeners(this)
    }
}
```

Nhìn có vẻ ổn hơn rồi nhỉ. lần lượt từng view sẽ được gán OnClickListener là activity hiện tại. Nhưng có vẻ nhìn nó hơi rắc rối.

Bây giờ, ta hãy thử coi View là trâu, còn OnClickListener là cọc, như ở trên 4 con trâu cùng đi tìm một cái cọc. Bây giờ, thời đại thay đổi, cọc lại thích đi tìm trâu thì sao.

Tức là bây giờ tôi muốn giao nhiệm vụ cho OnClickListener rằng phải lắng nghe các View đó. Tôi sẽ muốn có một phương thức kiểu như: `assignViews(views: List<View>)`  dành cho OnClickListener để có thể giao cho nó việc lắng nghe sự thay đổi ở view trong list `views`.

![](https://images.viblo.asia/e06d0683-bd46-4c8a-9ec9-5475f2b74521.jpeg)

Nhưng interface OnClickListener mặc định chỉ có duy nhất phương thức `onClick`, vậy nên, chúng ta sẽ dùng Kotlin Extensions để viết mở rộng thêm một phương thức như ở trên nhé.

```Kotlin
fun View.OnClickListener.assignViews(views: List<View?>) {
    views?.forEach { it.setOnClickListener(this) }
}
```

Như bạn có thể thấy ở trên, lần lượt các View trong list `views` sẽ được gán vào đối tượng OnClickListener. Như vậy, lần sau, mọi đối tượng implement View.OnClickListener đều có thể gọi phương thức `assignViews` để gán listener lên các View đó. Kiểu như này:

```Kotlin
assignView(listOf(textUserName, textDescription, imageAvatar, buttonLogin))
```

## Còn có thể tốt hơn ?

Một trong những điều tôi rất thích khi dùng Kotlin đó là mọi thứ đều có thể gọn hơn. Nếu bạn đang nghĩ đọc đến phần trên là đã có đoạn code tốt nhất để dùng thì tôi nghĩ chắc là chưa đâu. Bạn còn nhớ Varargs trong Java chứ, thay vì phải khai báo một list của một kiểu nào đó, ta có thể khai báo số lượng tham số linh động, trong Kotlin cũng có cái đó, nhưng cách viết nhìn cool hơn nhiều:

```Kotlin
fun View.OnClickListener.assignViews(vararg views: View?) {
    views.forEach { it?.setOnClickListener(this) }
}
```

Xong, từ nay ta có thể gán 1 view, 2 view hay thậm chí 100 view một lúc cũng được.

```Kotlin
assignViews(textUserName, textDescription, imageAvatar, buttonLogin)
```

## Tổng kết

Mục tiêu của bài viết này, ngoài đưa ra một trick nhỏ giúp các bạn code Android bằng Kotlin thấy sướng hơn, các bạn cũng sẽ thấy được sức mạnh của Kotlin Extensions lớn như thế nào. Đôi khi mình cảm thấy, cùng một project với cùng một nội dung, Kotlin có thể viết code gọn hơn so với Java một nửa. Hãy khám phá và tận dụng hết khả năng phi thường của Kotlin các bạn nhé. :+1: