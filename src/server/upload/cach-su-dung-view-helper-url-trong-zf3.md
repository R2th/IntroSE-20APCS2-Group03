![](https://images.viblo.asia/2844fdc7-8be8-4783-b963-c01857430192.png)
# 1. Tạo URLs từ Route
- Mục đich của việc tạo đường dẫn bằng helper url là: xác định được chính xác routes tương ứng mà nó phù hợp với yêu cầu HTTP và mục đích sử dụng.
-  Hoặc nó sẽ trả về tập hợp các tham số chứa `controller` và `action` của routes đó. 
- Một tác vụ ngược lại, cho phép tạo URL theo tham số. Tính năng này có thể được sử dụng trong các `action` của `controller`để tạo URL,.
- Ví dụ: để chuyển hướng người dùng đến một trang khác. Nó cũng có thể được sử dụng bên trong các mẫu xem để tạo `generating hyperlinks`.
# 2. Tạo URLs trong View Templates
- Các trang web của bạn thường chứa các `generating hyperlinks` đến các trang khác. 
- Các liên kết này có thể trỏ đến một trang bên trong trang web của bạn hoặc đến một trang trên một trang web khác. 
- Một `generating hyperlinks` được thể hiện bằng `<a>` thẻ HTML có thuộc tính `href` chỉ định URL của trang đích. Dưới đây, một ví dụ về một `generating hyperlinks` trỏ đến một trang bên ngoài được trình bày:

```
<a href="http://example.com/path/to/page">A link to another site page</a>
```

- Khi bạn tạo một `generating hyperlinks` đến một tài nguyên bên trong trang web của mình, bạn thường sử dụng URL tương đối (không có tên máy chủ):

```
<a href="/path/to/internal/page">A link to internal page</a>
```

- Để tạo URL trong các view templates của bạn (file .phtml), bạn có thể sử dụng view helper URL để tạo ra 1 routes bằng name của routes:
```
<!-- A hyperlink to Home page -->
<a href="<?= $this->url('home'); ?>">Home page</a>

<!-- A hyperlink to About page -->
<a href="<?= $this->url('about'); ?>">About page</a>
```
- Trong các 2 routes trên, thì chúng ta tạo ra hai URL tương đối. Ở routes thứ 2, chúng ta sử dụng helper Url và truyền vào "home" làm tham số. Ở routes thứ  2, chúng ta truyền vào tên routes "about" làm params cho view helper Url.
- PhpRenderer class thực hiện render view như bên dưới.
```
<!-- A hyperlink to Home page -->
<a href="/">Home page</a>
<!-- A hyperlink to About page -->
<a href="/about">About page</a>
```
# 3. Truyền vào Parameters
- Nếu chúng ta muốn truyền vào parameters, thì nên truyền vào tham số thứ 2 của view helper url:
```
<!-- A hyperlink to About page -->
<a href="<?= $this->url('application', ['action' => 'about']); ?>" >
  About page 
</a>

<!-- A hyperlink to Barcode image -->
<a href="<?= $this->url('application', ['action' => 'barcode',
  'type' => 'code39', 'text' => 'HELLO-WORLD']); ?>" >
  Barcode image </a>
```
- Trong ví dụ trên, chúng ta sử dụng helper view Url để tạo hai URL theo tên routes và tham số. Chúng ta truyền tên routes `"application"` làm tham số thứ nhất và một mảng các tham số làm tham số thứ hai.
- Trong routes thứ 2, chúng ta chuyển tham số "action" để nói với routes  rằng nó sẽ nhận 2 params là `'type' = 'code9'` và` 'text' = 'HELLO-WORLD'` và nhận 1 routes tương ứng được trả về.
- Nếu chúng ta chuyển nó thành `href` trong thẻ `<a>` thì sẽ thành như bên dưới:
```
<!-- A hyperlink to About page -->
<a href="/application/about" > About page </a>

<!-- A hyperlink to Barcode image -->
<a href="/application/barcode/code39/HELLO-WORLD" > Barcode image </a>
```
- Thử 1 ví dụ khác nhé, chúng ta sẽ tạo 1 URL với kiểu là `routes Regex`. (sử dụng để gọi tớ 1 page cố đinh: introduction)
```
<!-- A hyperlink to Introduction page -->
<a href="<?= $this->url('doc', ['page'=>'introduction']); ?>">
 Introduction </a>	
```
- Khi render thành html:
```
<!-- A hyperlink to Introduction page -->
<a href="/doc/introduction.html"> Introduction </a>
```
# 4. Tạo Absolute URLs
- Nếu bạn cần 1 url là 1 link tuyệt đối với hiển thị đầy đủ thông tin của server. Chúng ta sẽ thực hiện truyền 1 thuộc tính đã được hỗ trợ ở view helper url đó là `force_canonical` với giá trị là `true`.
- Ví dụ về cách sử dụng:
```
<!-- A hyperlink to Home page -->
<a href="<?= $this->url('home', [], ['force_canonical' => true]); ?>" > 
  Home page </a>
  
<!-- A hyperlink to About page -->
<a href="<?php echo $this->url('application', ['action' => 'about'],
  ['force_canonical' => true]); ?>" > About page </a>
```
- Khi được render ra HTML thì sẽ có kết quả:
```
<!-- A hyperlink to Home page -->
<a href="http://localhost/" > Home page </a>
  
<!-- A hyperlink to About page -->
<a href="http://localhost/application/index/about" > About page </a>
```
# 5. Tạo 1 Specifying Query Part
- Nếu bạn muốn URL của mình có một phần `query`, bạn có thể chỉ định tùy chọn `query` trong tham số option thứ ba của view helper Url. 
- Ví dụ: giả sử bạn có action `"search"` trong một controller và bạn muốn truyền chuỗi truy vấn tìm kiếm và số lượng kết quả đầu ra trên mỗi trang. 
- URL cho hành động này sẽ như thế này: `"http: // localhost / search? Q = topic & Count = 10".` Để tạo một URL như vậy, chúng ta có thể sử dụng kiểu bên dưới đây:
```
<a href="<?= $this->url('search', [], ['force_canonical' => true, 
         'query'=>['q'=>'topic', 'count'=>10]]); ?>" > 
  Search </a>
```
- Trong đoạn code trên, chúng ta đã sử dụng `option` `query`, đó là mảng chứa các cặp `'tên'` =>` 'giá trị'` của các tham số truy vấn.
# 6.Tạo URLs trong Controllers
- Bạn có thể tạo URL bên trong các phương thức action của controller bằng cách sử dụng `plugin` controller Url. 
- Để tạo URL, bạn gọi phương thức `fromRoute()` của controller plugin Url, như trong ví dụ dưới đây:
```
// An example action method
public function someAction() 
{
    // Generate a URL pointing to the Home page ('/')
    $url1 = $this->url()->fromRoute('home');
  
    // Generate an absolute URL pointing to the About page
    // ('http://localhost/application/about')
    $url2 = $this->url()->fromRoute('application', 
              ['action'=>'about'], ['force_canonical'=>true]);
}
```
# 7. URL Encoding
- Bạn có thể tạo URL với mã an toàn encoding để đảm bảo an toàn trong quá trình truyền vào những kí tự nhạy cảm ví dụ `'/'` hoặc `dấu cách`.
- Bạn có thể tham khảo ví dụ bên dưới. URL sẽ tự động chuyển thành dạng an toàn:
```
<!-- A hyperlink to Introduction page -->
<a href="<?= $this->url('doc', ['page'=>'chapter1/introduction']); ?>">
  Introduction </a>	
```
- Khi chuyển thành thẻ `html`, kết quả là:
```
<!-- A hyperlink to Introduction page -->
<a href="/doc/chapter1%2Fintroduction.html"> Introduction </a>
```
- Phần từ `'/'` đã bị chuyển thành `%2F` đó là cơ chế an toàn khi bạn sử dụng URL encoding.
- Nhưng đáng tiếc là url không được nhận bởi `Regex route` của zendframeword.


-----
### Tài liệu tham khảo:
- https://olegkrivtsov.github.io/using-zend-framework-3-book/html/
- https://framework.zend.com/