> Mỗi sự kiện chúng ta có thể có nhiều hành động. Ví dụ bạn có một sự kiện là dịch Covid-19 thì bạn sẽ có những hành động trong sự kiện đó là đeo khẩu trang, làm remote, tự cách ly bản thân, ...
> 
Khi ta làm việc với javascript nói chung và event trong Javascript nói riêng.

Chúng ta thường hiểu và biết đến sự kiện là một hành động nào đó tác động lên đối tượng HTML mà ta có thể bắt được sự kiện này và thực hiện những hành động nào đó. 

![](https://images.viblo.asia/74722e28-45de-4add-a198-a9ceb9ce370a.png)

# Tóm Tắt 
Khi viết hàm callback cho một sự kiện nào đó như click vào một button để ngăn trình duyệt không xử lý sự kiện click theo như mặc định thì thường chúng ta có các method để xử lý event sau khi xử lý callback xong .
Chúng ta sẽ lướt qua xem chúng là gì nhé :

* Event.createEvent() 

    Tạo một sự kiện mới, sự kiện này sau đó phải được khởi tạo bằng cách gọi phương thức initEvent () của nó.

* Event.composedPath()
    
    Trả về đường dẫn của sự kiện (các đối tượng mà người nghe sẽ được gọi). Điều này không bao gồm các nodes trong shadow trees nếu shadow root được tạo bằng chế độ ShadowRoot.mode bị đóng.
    
* Event.initEvent() 

    Khởi tạo giá trị của một Sự kiện được tạo. Nếu sự kiện đã được gửi đi, phương pháp này không có tác dụng gì.
    
* Event.preventDefault()

    Hủy sự kiện (nếu có thể hủy).
    
* Event.stopImmediatePropagation()

    Đối với sự kiện cụ thể này, hãy ngăn tất cả những người nghe khác được gọi. Điều này bao gồm các trình nghe được gắn với cùng một phần tử cũng như những phần tử được gắn với các phần tử sẽ được duyệt qua sau
    
* Event.stopPropagation()

    Ngừng truyền các sự kiện trong DOM.
    

Nhưng hôm nay chúng ta sẽ đi sâu vào 3 sự kiện chính hay sử dụng như tiêu đề bài viết có nhắc đến .


# 1. Event.preventDefault

![](https://images.viblo.asia/f6aa15fb-e9ed-4860-8b42-3f69b57582b4.png)

Nguồn ảnh : https://alligator.io/js/preventdefault/

Phương thức preventDefault() của đối tượng event được sử dụng để ngăn chặn cách xử lý mặc định của trình duyệt khi xảy ra sự kiện.

Ví dụ đoạn mã sau:

```Javascript
<a href="www.https://viblo.asia/">Trang chủ</a>
<script type="text/javascript">
$("a").click(function (event) {
    alert("Bạn nhấn vào link rồi");
    event.preventDefault()
});
</script>
```

thì khi người dùng nhấp vào link liên kết trình duyệt sẽ hiển thị hộp thoại cảnh báo với nội dung:

```
Bạn nhấn vào link rồi
```
đồng thời ngăn cản trình duyệt chuyển tiếp người dùng tới trang đích của link liên kết.

# 2. Event.stopPropagation

![](https://images.viblo.asia/42fcdc62-31ad-4dc5-99d6-68760619d606.jpg)


Phương thức stopPropagation() của đối tượng event được sử dụng để ngăn không cho sự kiện lan toả lên các phần tử mẹ của phần tử mà ở đó diễn ra sự kiện.

Ví dụ với đoạn mã sau:

```
<a onclick="parentEventHandler()">
    <p href="www.viblo.asia">Trang chủ</a>
</a>
<script type="text/javascript">
// hàm callback xử lý sự kiện click vào phần tử "a"
function parentEventHandler() {
    alert("Bạn nhấp vào phần tử a");
};

// đoạn mã jQuery đăng ký hàm callback để xử lý sự kiện click vào phần tử "p"
$("p").click(function (event) {
    alert("Bạn đã nhấp vào phần tử p");
    event.stopPropagation();
});
</script>
```
Thì khi người dùng click vào phần tử p (đồng thời cũng là click vào phần tử a chứa phần tử p) thì trình duyệt sẽ hiển thị hộp thoại cảnh báo với nội dung:

```
Bạn đã nhấp vào phần tử p
```

Tiếp theo, sử dụng event.stopPropagation() trong hàm callback xử lý sự kiện nhấp chuột vào thẻ p liên kết sẽ ngăn cản sự kiện này lan toả tới phần tử mẹ a. Do đó hàm parentEventHandler() sẽ không được gọi và sẽ không có hộp thoại cảnh báo nào khác được hiện ra.

Cuối cùng, vì trong hàm callback không sử dụng event.preventDefault() nên sau đó trình duyệt vẫn sẽ chuyển người dùng tới trang chủ www.viblo.asia.
# 3. Event.stopImmediatePropagation
**stopPropagation** sẽ ngăn bất kỳ trình xử lý cha mẹ nào được thực thi **stopImmediatePropagationsẽ** ngăn bất kỳ trình xử lý cha mẹ nào và bất kỳ trình xử lý nào khác thực thi

Ví dụ với đoạn mã sau:

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
 
<p>example</p>
```
Xử lý phía Javascript 
```
$("p").click(function(event) {
  event.stopImmediatePropagation();
});
 
$("p").click(function(event) {
  // Chức năng này sẽ không được thực thi
  $(this).css("background-color", "#f00");
});
```