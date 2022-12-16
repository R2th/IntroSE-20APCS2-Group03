Cùng với HTML và CSS, `JavaScript` là 1 trong số bộ 3 ngôn ngữ khởi đầu cho bất kỳ ai muốn học lập trình web. Nếu như HTML cho phép chúng ta cấu trúc nội dung của trang web, CSS cho phép chúng ta thiết lập phong cách hiển thị của các nội dung, thì JavaScript ở khía cạnh khác lại cho phép chúng ta viết kịch bản đáp ứng cho các thành phần kiến trúc để tương tác với người dùng.

Hay nói một cách khác, với HTML và CSS thì chúng ta có thể vẽ ra một giao diện người dùng tùy ý trên nền trình duyệt web, còn với JavaScript thì chúng ta có thể lập trình cách hoạt động của giao diện mà chúng ta đã vẽ ra trước đó.

Chúng ta sẽ có một ví dụ nho nhỏ mở đầu ở đây. Giả sử bạn muốn tạo ra một nút nhấn trên trang web của bạn để chào hỏi người dùng. HTML có thể tạo ra nút nhấn. CSS có thể giúp thay đổi phong cách hiển thị của nút nhấn đó. Tuy nhiên cả HTML và CSS đều không thể nói với trình duyệt web `Việc cần làm là gì?` khi người dùng click chuột vào nút nhấn đó. Đây chính là điểm mà `JavaScript` xuất hiện.

```greeting.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Chào hỏi</title>
      <link rel="stylesheet" href="greeting.css">
   </head>
   <body>
      <button type="button" id="greet">
         Click vào đây! :D
      </button>

      <script src="greeting.js"></script>
   </body>
</html>
```

```greeting.css
#greet {
   font-size: 18px;
   font-weight: bold;

   padding: 18px 27px;

   color: White;
   background-color: RoyalBlue;

   border: none;
   cursor: pointer;
}
```

```greeting.js
Đặt một công tắc cảm biến
   trên nút nhấn có id `greet`.

Mỗi khi nhận được 1 click chuột
   truy vấn thông tin thời gian từ thiết bị
   tính toán xem đang là khoảng thời gian nào trong ngày.

Gửi lời chào người dùng
   bằng cách cho hiện một bảng thông báo
   và lời chào được chọn tương ứng với kết quả tính toán.
```

[**Mở xem ví dụ hoạt động**](https://codepen.io/semiarthanoi/full/QWaWGZM)

Thực ra thì đó không phải là code JavaScript. Do ngôn ngữ này rất linh hoạt và có nhiều thứ có thể sẽ khiến bạn bị rối khi mới bắt đầu học; nên mình đã viết tạm vài dòng mô tả những nội dung cần triển khai trong code JavaScript bằng tiếng Việt như vậy. :D

Ở đây thì bạn chỉ cần lưu ý duy nhất một điểm mới trong code HTML đó là thẻ `<script>` ở
cuối phần `<body>` được sử dụng để gắn một tệp JavaScript vào văn bản HTML.

## Vậy rốt cuộc thì JavaScript có thể làm được những gì trong trình duyệt web?

Chức năng đầu tiên để nói đến thì JavaScript là một ngôn ngữ lập trình và có thể giúp chúng ta nhờ trình duyệt web thực hiện các tác vụ tính toán, tư duy logic, ra quyết định thực hiện các thao tác xử lý trong những tình huống cụ thể.

Chức năng thứ hai, đó là JavaScript có thể giúp chúng ta nói với trình duyệt web thực hiện những thao tác thay đổi nội dung của văn bản HTML đang hiển thị; Và hiển nhiên là cả các phong cách hiển thị được quy định bởi CSS cũng có thể được thay đổi bởi JavaScript.

Chức năng thứ ba, đó là JavaScript còn có thể thực hiện những thao tác người dùng đối với chính phần mềm trình duyệt web. Ví dụ như đóng/mở một cửa sổ trình duyệt, hoặc thay đổi kích thước cửa sổ trình duyệt và di chuyển cửa sổ đó trên màn hình hiển thị của người dùng máy tính. JavaScript cũng có thể gửi yêu cầu truy vấn thêm dữ liệu tới máy chủ web hoặc chuyển hướng người dùng tới địa chỉ web khác.

Ồ... nghe chừng như chúng ta sẽ phải học rất nhiều thứ.  
Tuy nhiên bạn đừng lo lắng gì cả. Thực ra chỉ có một phần quan trọng duy nhất, đó là phần đầu tiên: "Học các khái niệm căn bản trong lập trình và làm quen với ngôn ngữ". Một khi bạn đã biết những thứ căn bản thì việc học 2 phần còn lại thực sự sẽ không phải là vấn đề gì khó khăn đâu. Vì vậy nên chúng ta hãy cứ bắt đầu luôn đi thôi. :D

## Câu lệnh JavaScript đầu tiên

Ok, bây giờ chúng ta sẽ chạy thử câu lệnh JavaScript đầu tiên.

```simple.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Gặp gỡ JavaScript</title>
   </head>
   <body>
      <h1>Xin chào JavaScript !</h1>
      <script src="smart.js"></script>
   </body>
</html>
```

```smart.js
console.log(2022);
```

Ở đây chúng ta sẽ dành quãng thời gian đầu tiên của Series JavaScript để học các khái niệm căn bản trong lập trình. Và vì vậy nên chúng ta sẽ chưa thể chạm vào các công cụ giúp thay đổi nội dung của văn bản HTML. Chúng ta sẽ cần một nơi nào đó khác để xem kết quả hoạt động của code JavaScript ví dụ; Và câu lệnh phía trên sẽ in bất cứ thứ gì mà chúng ta đặt trong cặp ngoặc đơn `()` ra cửa sổ `console` của trình duyệt web.

Để mở cửa sổ `console` thì bạn có thể nhấn nút `F12` trên bàn phím máy tính hoặc click chuột phải vào bất kỳ đâu trên trang web và chọn `Inspect`, rồi sau đó chọn thẻ `console`.

![](https://images.viblo.asia/9c86d6a9-99e7-45f5-b0c3-470e64dfb628.png)

Bây giờ thì hãy cùng nhìn kỹ hơn vào câu lệnh JavaScript đầu tiên của chúng ta. Nó trông khá rõ ràng và dễ hiểu phải không? :D Chúng ta đang nói với cửa sổ `console` của trình duyệt web rằng - Hãy `log` (in nhật ký) với nội dung là `2022`. Như vậy là chỉ còn 3 chi tiết nhỏ nữa mà chúng ta cần quan tâm tới ý nghĩa của chúng:

- Đầu tiên là một dấu chấm phẩy `;` ở vị trí cuối cùng của câu lệnh. Mình đoán là bạn cũng đã quen với ký hiệu này từ khi học CSS. Thực ra chúng ta không bắt buộc phải kết thúc mỗi câu lệnh JavaScript bằng một dấu `;`. Tuy nhiên thì đây lại là một thói quen tốt cho quãng thời gian mới bắt đầu học; Và chúng ta nên kết thúc mỗi câu lệnh với một dấu `;` cho đến khi bạn thực sự yêu thích JavaScript đủ nhiều để có thể bỏ nó đi. :D
- 2 chi tiết đáng quan tâm còn lại là cặp ngoặc đơn `()` mà chúng ta đã nhắc đến ở trên và một dấu chấm `.` đứng giữa 2 từ khóa `console` và `log`. Đây là 2 thứ nhỏ bé và đẹp đẽ nhất trong thế giới lập trình; Và chúng ta sẽ cần thêm một vài bài viết nữa để có thể sẵn sàng hiểu được ý nghĩa của chúng. Vì vậy nên bây giờ chúng ta hãy cứ tạm xem như đây là những ký tự phân tách đơn giản, giúp cho câu lệnh của chúng ta dễ đọc hơn với 3 từ khóa chính là `console`, `log`, và `2022` được tách rời khỏi nhau một chút. :D

Chúng ta có thể kết thúc bài viết đầu tiên về JavaScript với một chút băn khoăn được không? :D

## Viết chú thích trong code JavaScript

Ồ... Mình xin lỗi một chút. Có một việc nho nhỏ nữa mà mình cần nói với bạn. Đó là giống với các ngôn ngữ máy tính khác, JavaScript cho phép chúng ta viết các chú thích trong code. Có 2 cách viết như thế này:

- Mở đầu chú thích của bạn với 2 dấu gạch nghiêng `//` và tất cả những ký tự sau đó cho tới cuối dòng sẽ được trình duyệt web bỏ qua.
- Nếu như bạn muốn viết một chú thích có nhiều dòng thì bạn có thể đóng khung nội dung bằng cách sử dụng một cặp `/*` và `*/` như chúng ta vẫn thường làm trong `/* CSS */`.

[**[JavaScript] Bài 2 - Kiểu & Biến**](https://viblo.asia/p/bWrZnAvQKxw)