Trong vài năm qua, các ứng dụng web đã vượt qua nhiều rào cản đáng chú ý. Một trong những thành tựu đó là tốc độ tải các ứng dụng này. Ngày nay, hầu hết mọi người đều mong muốn vào 1 trang web được tải với tốc độ bàn thờ. Tình huống này để đảm bảo các tốc độ này đòi hỏi phải có các công cụ và thực hành phù hợp.

Trong bối cảnh này, một trong những phương pháp như vậy là sử dụng Mạng phân phối nội dung (Content Delivery Network - CDN) cho frontend. Nhu cầu về CDN đa phần từ các ứng dụng web có người dùng ở nhiều vị trí địa lý,

>#### The challenge CDN solves, is the limit with Speed of Light.

Trong bài viết này, mình sẽ thảo luận về nhu cầu sử dụng CDN và các chiến lược khác nhau mà bạn có thể sử dụng để thiết lập nó trong kiến trúc của mình và những cạm bẫy phổ biến bạn nên tránh.

## Nhu cầu về CDN

Trong cuộc sống hiện đại, bạn có thể đã gặp phải các độ trễ khác nhau khi xem các ứng dụng web từ các nơi khác nhau trên thế giới. Khi khoảng cách máy chủ web xa bạn, có thể mất nhiều thời gian hơn để tải ứng dụng web vào trình duyệt của bạn.

Lý do của sự chậm trễ này là gì? Bạn rất biết rằng khi nói đến phần giao diện người dùng của một ứng dụng web, trước tiên nó yêu cầu tải HTML, JavaScript, CSS và Hình ảnh vào trình duyệt để nó hoạt động. Điều này cho thấy nhu cầu đẩy nhanh tốc độ tải các tài sản đó.

Cách duy nhất để cải thiện tốc độ tải các nội dung này là đưa nội dung giao diện người dùng đến gần hơn với người dùng. Tuy nhiên, việc di chuyển máy chủ không phải lúc nào cũng có thể thực hiện được. Đây là lúc việc sử dụng CDN phát huy tác dụng. Chúng ta có thể sử dụng CDN để lưu nội dung giao diện người dùng vào bộ đệm gần với người dùng hơn để độ trễ khi tải giao diện người dùng trở nên ít hơn.

Và sử dụng nó để tối đa hóa việc tái sử dụng mã, hợp tác giữa các thành phần độc lập và xây dựng ứng dụng theo quy mô lớn.

## Các chiến lược khác nhau trong thiết lập CDN

Nếu bạn quyết định sử dụng CDN cho ứng dụng web của mình, bạn phải lập kế hoạch chiến lược để sử dụng nó.

Một trong những cách tiếp cận phổ biến là lưu trữ và phân phát nội dung tĩnh như JavaScript, CSS và Hình ảnh bằng CDN. Theo cách tiếp cận này, chúng ta có thể lưu trữ ứng dụng web trong máy chủ - nơi nó phân phối trang index.html. Trang này sẽ chứa các liên kết CDN nhúng cho các nội dung tĩnh này.

#### Public CDN cho JavaScript

Bạn có thể đã thấy một số thư viện JavaScript hiện tại cung cấp các URL CDN cho frontend mà bạn có thể sử dụng để truy xuất các tệp này.

```html
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
```

Như bạn có thể thấy ở đây, đây là phiên bản jQuery được lưu trữ trên CDN mà bạn có thể nhúng trực tiếp vào các ứng dụng web của mình. Ưu điểm ở đây là khi nhiều ứng dụng bắt đầu sử dụng URL này, bạn có thể tìm thấy thư viện trong bộ nhớ cache của trình duyệt sẵn có cho bất kỳ ứng dụng nào sử dụng cùng một URL. Vì điều này, nó cải thiện 1 phần tốc độ tải các ứng dụng web của bạn.

Tuy nhiên, ngày nay thực tiễn này đã thay đổi chủ yếu do số lượng phụ thuộc JavaScript mà mỗi giao diện ứng dụng sử dụng. Vì chúng ta sử dụng nhiều thành phần JavaScript, tốt hơn nên nhóm chúng thay vì tải chúng một cách độc lập để giảm số lượng yêu cầu cần thiết để tải ứng dụng web.

#### Nhu cầu về private CDN

Để điều này hoạt động, chúng ta phải truy xuất gói nội dung tĩnh như JavaScript từ private CDN. Tại đây, chúng ta có thể xem xét thêm việc truy xuất CSS và Hình ảnh từ CDN để có hiệu suất tối ưu

> **Lưu ý rằng trong trường hợp này, index.html được phục vụ trực tiếp từ máy chủ web. Chỉ các liên kết nhúng (liên kết JavaScript, liên kết CSS) cho nội dung tĩnh mới được phân phát qua CDN như được hiển thị bên dưới.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>My Web App</title>
<link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="<Private CDN>/stylesheet.css">
  <link
    href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Sharp"
    rel="stylesheet">
</head>
<body>
    <!-- HTML Content -->          
    <script src="<Private CDN>/runtime-es2015.b76e2.js"></script>
    <script src="<Private CDN>/vendor-es5.bafcac.js"></script>
  </body>
</html>
```

Đối với ngữ cảnh này, bạn có thể sử dụng các dịch vụ CDN như Akamai, Azure CDN và AWS CloudFront. Mình hy vọng bạn cũng lưu ý rằng chúng ta có thể sử dụng kết hợp các URL CDN riêng tư và công khai trong index.html.

#### Sử dung CDN như proxy và entry point cho web app

Một chiến lược khác mà bạn có thể sử dụng là cung cấp toàn bộ ứng dụng web thông qua dịch vụ CDN. Ở đây CDN cũng hoạt động như một proxy và là entry point của ứng dụng web. Để điều này hoạt động, CDN phải có thể lưu trữ nội dung tĩnh của frontend (HTML, CSS và JavaScript) và bỏ qua nội dung động (Lệnh gọi API).

Bạn có thể sử dụng phương pháp này với AWS CloudFront, nơi bạn không cần xác định URL CDN trong index.html của mình một cách rõ ràng. Tuy nhiên, bạn cần xác định quy tắc bộ nhớ đệm (TTL) để hướng dẫn proxy CDN cho nội dung tĩnh và động dựa trên định tuyến dựa trên đường dẫn.

## Những cạm bẫy phổ biến cần tránh khi sử dụng CDN

Khi sử dụng CDN, có những cạm bẫy phổ biến mà chúng ta thường rơi vào mà không biết về hệ lụy trong tương lai.

#### Avoid Caching of index.html

Một trong những sai lầm phổ biến mà chúng ta mắc phải là lưu mọi thứ vào bộ nhớ cache, bao gồm cả index.html. Mặc dù có thể chấp nhận được việc lưu index.html vào bộ nhớ cache cho một trang web, nhưng nó có thể có những tác động xấu đến ứng dụng web. Vấn đề là nếu trình duyệt hoặc CDN của người dùng lưu trữ phiên bản cũ của index.html, điều đó có thể dẫn đến không tương thích với chương trình phụ trợ.

Do đó, điều quan trọng là không được lưu vào bộ nhớ cache index.html. Mình thậm chí còn khuyên bạn nên sử dụng các thẻ meta sau để tránh lưu vào bộ nhớ đệm index.html trong trình duyệt.

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

#### Selective Invalidation of CDN Cache

Bước này là một phần chung của câu đố. Khi sử dụng CDN, không có ý nghĩa gì khi làm mất hiệu lực của toàn bộ bộ nhớ cache sau một bản phát hành mới. Bạn có thể phân loại các nhóm nội dung và thiết lập các quy tắc để làm mất hiệu lực của nhóm nội dung, tùy thuộc vào những thay đổi bạn đã thực hiện trong mỗi bản phát hành.

Ví dụ: vì các thay đổi thường xuyên xảy ra đối với JavaScripts và CSS trong một ứng dụng giao diện người dùng, hai nhóm này có thể là một phần của việc vô hiệu vĩnh viễn. Tuy nhiên, nếu bạn có sự tách biệt giữa JavaScripts tùy chỉnh và Tập lệnh của nhà cung cấp, bạn có thể chia nó thành các nhóm con.
Tuy nhiên, nếu bạn thực hiện các bản phát hành lớn có sửa đổi trên một phần đáng kể của ứng dụng, bạn có thể chấm dứt hiệu lực hoàn toàn vì chức năng sửa chữa của ứng dụng quan trọng hơn lợi ích hiệu suất bổ sung từ CDN.

#### Automate CDN Cache Invalidation

Khi chúng ta xem xét các trường hợp không hợp lệ trong bộ nhớ cache có chọn lọc, điều quan trọng là phải loại bỏ lỗi của con người khi thiếu một nhóm nội dung quan trọng. Vì nó có thể ảnh hưởng trực tiếp đến chức năng ứng dụng như đã thảo luận ở trên, bạn có thể thiết lập các quy tắc trong việc triển khai liên tục của mình để xử lý các lỗi tự động vô hiệu.

Ví dụ: bạn có thể phát hiện các thay đổi nội dung khi triển khai liên tục bằng cách so sánh nó với các artifacts trên production. Nếu các nội dung khác nhau, chúng ta có thể tự động vô hiệu hóa bộ nhớ cache CDN.

## Tóm lược

Mình hy vọng rằng bài viết này đã nâng cao nhận thức của bạn về những điều cần tìm khi bạn thiết lập CDN cho ứng dụng web của mình.

Như bạn đã biết, việc thiết lập CDN đi kèm với sự phức tạp của nó ngoài việc chỉ lưu nội dung vào bộ nhớ đệm. Như mình đã nhấn mạnh sự cần thiết, điều cần thiết là phải cung cấp hành vi ứng dụng chính xác ở mức ưu tiên cao nhất và tránh mọi xung đột tiềm ẩn từ bộ nhớ đệm.

Nếu bạn xử lý được những thách thức này, mình chắc chắn rằng bộ nhớ đệm bằng CDN sẽ cung cấp trải nghiệm người dùng thú vị cho người dùng với tốc độ tải nhanh.

Nguồn [https://blog.bitsrc.io](https://blog.bitsrc.io/)