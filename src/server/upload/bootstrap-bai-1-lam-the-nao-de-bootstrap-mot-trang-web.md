Nếu như bạn đang theo dõi [Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m) mà mình đang thực hiện từ đầu cho đến giờ thì hiển nhiên là bạn đã biết Bootstrap là cái gì rồi. Tuy nhiên thì mình vẫn muốn viết lại một vài dòng giới thiệu để dành cho trường hợp ai đó bất ngờ ghé qua và tham gia vào bài viết của chúng ta tại đây.

## Bootstrap là cái gì? Tại sao chúng ta nên sử dụng nó?

Bootstrap là framework HTML/CSS phổ biến nhất ở thời điểm hiện tại, cung cấp sẵn các thành phần kiến trúc phổ biến của một trang web (thanh điều hướng, danh sách sổ xuống, slide ảnh, v.v...), giúp chúng ta xây dựng các trang web mới nhanh hơn và hiệu quả hơn.

Để bắt đầu sử dụng Bootstrap thì chúng ta cần áp dụng mẫu template sau cho các văn bản HTML:

```template.html
<!doctype html>
<html>
  <head>
    <title> Hello, Bootstrap! </title>

    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
    <link rel="stylesheet" href="override.css" />
  </head>
  <body>
    <h1> Hello, Bootstrap! </h1>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
  </body>
</html>
```

Như bạn đã thấy thì chúng ta đã nhúng một tệp CSS có tên là `bootstrap.min.css` từ đâu đó trên internet vào văn bản HTML. Tệp CSS này có chứa code triển khai sẵn phong cách hiển thị cho các thành phần kiến trúc phổ biến của một trang web.

Ở đây chúng ta cũng gắn thêm một tệp CSS chưa có code `override.css` ngay sau tệp CSS của Bootstrap. Tệp CSS này sẽ được sử dụng để ghi đè một vài thuộc tính của các thành phần kiến trúc được sử dụng trong trang web của chúng ta. Mục đích là để khiến cho trang web của chúng ta trở nên đặc trưng với phong cách hiển thị riêng, khác với phong cách hiển thị mặc định được cung cấp bởi Bootstrap.

Ở phần cuối của `<body>` chúng ta có 2 tệp JavaScript có chứa code triển khai sẵn để giúp cho các thành phần tương tác với người dùng có thể hoạt động được ngay. Vì vậy nên chúng ta chưa cần phải học JavaScript để bắt đầu sử dụng Bootstrap ở cấp độ cơ bản với phương thức áp dụng đơn giản.

## Tìm hiểu về các thành phần của Bootstrap ở đâu?

Từ trang web chính thức của framework - [getbootstrap.com](https://getbootstrap.com/docs/5.1/getting-started/introduction/)

Chắc chắn là như vậy rồi. Như đã nói trước đó thì mình sẽ không có ý định tạo ra một bộ tài liệu Bootstrap khác bằng tiếng Việt trong Series này. Mục đích của chúng ta ở đây sẽ chỉ đơn giản là học cách đơn giản nhất để áp dụng framework này vào việc xây dựng một trang web. Vì vậy nên xuyên suốt các bài viết về Bootstrap mà chúng ta sẽ thực hiện ở đây, mình sẽ cùng bạn tra cứu thông tin trong tài liệu chính thức của nhà phát triển và xây dựng một giao diện trang chủ đơn giản.

Hãy cùng ngó qua bộ tài liệu chính thức của Bootstrap xem chúng ta có những gì nào.

`Ảnh chụp màn hình`
![tài liệu bootstrap](https://images.viblo.asia/b8136743-644a-4234-bfcc-2388346cb3da.png)

Ở trên thanh điều hướng phía bên trái của phần tài liệu `Docs` chúng ta có vài hạng mục chính sẽ sử dụng thường xuyên:

- `Components` và `Forms` - Các thành phần kiến trúc thường có trong một trang web.
- `Helpers` và `Utilities` - Các class hỗ trợ và tiện ích để tùy chỉnh bất kỳ thành phần nào trong trang web.
- `Content` - Các class tạo phong cách hiển thị mặc định cho các thành phần nội dung như: 
tiêu đều, văn bản, hình ảnh, bảng dữ liệu, v.v...
- `Layout` - Các class hay các bộ công cụ hỗ trợ tác vụ dàn trang và bố cục chính của trang web.

Đối với mỗi một cái gạch đầu dòng ở phía trên thì chúng ta sẽ làm một phần thảo luận
về những điểm quan trọng nhất. Sau đó thì chúng ta sẽ cùng xây dựng một giao diện trang chủ đơn giản. Và đây là kết quả mà chúng ta dự kiến sẽ thu được ở cuối Series Bootstrap này:

[Homepage - Bootstrap It !](https://codepen.io/semiarthanoi/full/XWVWrNq)

Bạn đã sẵn sàng để Bootstrap một trang web chưa? Hẹn gặp lại trong bài viết tiếp theo. :D

[[Bootstrap] Bài 2 - Components & Utilities](https://viblo.asia/p/3Q75wAyGZWb)