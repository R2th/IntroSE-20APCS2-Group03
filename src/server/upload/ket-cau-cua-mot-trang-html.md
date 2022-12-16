## Kết cấu của một trang HTML

Sau bài trước chúng ta có thể hiểu được Nhập môn Java về các phần tử HTML riêng lẻ, nhưng chúng không hữu ích lắm. Bây giờ, chúng ta sẽ xem các yếu tố riêng lẻ được kết hợp như thế nào để tạo thành một trang HMTL hoàn chỉnh. Ví dụ đoạn code dưới đây được coi là một trang HTML hoàn chỉnh `index.html` với nội dung sau: Object

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Tiêu đề trang web</title>
  </head>
  <body>
    <img src="images/firefox-icon.png" alt="My test image" />
  </body>
</html>
```

## <!DOCTYPE html>

- _<! DOCTYPE html >_ là phần định nghĩa loại tài liệu (document). _<!DOCTYPE>_ được sử dụng để thông báo cho trình duyệt của người dùng truy cập trang web rằng tài liệu được hiển thị là tài liệu HTML. Mặc dù bản thân nó không phải là một phần tử HTML, nhưng mọi tài liệu HTML phải được khai báo bằng DOCTYPE để tuân thủ các tiêu chuẩn HTML.

- Phần khai báo _<!DOCTYPE>_ phải là đầu tiên trong tài liệu HTML, trước tất cả các thẻ `<html>`.

- HTML có nhiều phiên bản khác nhau như HTML5, HTML 4, HTML 3, XHTML… Khai báo `<DOCTYPE>` được các trình duyệt sử dụng để xác định loại văn bản HTML. Hiện tại HTML5 là phiên bản mới nhất và đang được sử dụng phổ biến trên hầu hết các website.

- _DOCTYPE_ có hai loại _HTML DOCTYPE_ và _XHTML DOCTYPE_ sự khác biệt giữa chúng là

**Cấu trúc tài liệu:**

- DOCTPE XHTML là bắt buộc
- Thuộc tính xmlns trong `<html>` là bắt buộc
- `<html>`, `<head>`, `<title>` và `<body>` là bắt buộc

**Các yếu tố XHTML:**

- Các phần tử XHTML phải được lồng đúng cách
- Các phần tử XHTML phải luôn được đóng
- Các phần tử XHTML phải được viết thường
- Tài liệu XHTML phải có một phần tử gốc

**Thuộc tính HTML:**

- Tên thuộc tính phải viết thường
- Giá trị thuộc tính phải được trích dẫn
- Giảm thiểu thuộc tính bị cấm

## Thẻ HTML

Thẻ `<html>` là thẻ bọc tất cả nội dung trên toàn bộ trang và đôi khi được gọi là phần tử gốc (root element).

## Thẻ HEAD trong HTML

- Trong chuẩn HTML5, thẻ `<head>` có thể được bỏ qua.
- Thẻ `<head>` là một khung chứa siêu dữ liệu – metadata (dữ liệu về dữ liệu). Metadata không được hiển thị và thường để xác định title, styles, links, scripts của tài liệu và thông tin meta khác.
- Các thẻ sau mô tả metadata: `<title>`, `<style>`, `<meta>`, `<link>`, `<script>`, và `<base>`,...

## Thẻ META trong HTML

- Thẻ `<meta>` được dùng để mô tả trang, từ khóa, tác giả, và các metadata khác.
- Metadata được sử dụng bởi các trình duyệt (làm thế nào để hiển thị nội dung), bởi công cụ tìm kiếm (từ khóa), và các dịch vụ web khác.
- Ví dụ ở đây: `<meta charset="utf-8">` để xác định tài liệu của bạn sử dụng ký tự ở định dạng UTF-8, hầu hết các ký tự phần lớn là các ngôn ngữ chữ viết của con người.

## Thẻ TITLE trong HTML

Thẻ `<title>` để xác định tiêu đề cho trang web, là tiêu đề xuất hiện trong tab trình duyệt đang được tải. Nó cũng được sử dụng để mô tà trang khi bạn đánh dấu / yêu thích nó.

## Thẻ BODY trong HTML

Thẻ `<body>` để chứa tất cả nội dung mà bạn muốn hiển thị cho người dùng web khi họ truy cập trang của bạn, cho đó là văn bản, hình ảnh, video, trò chơi, bản âm thanh có thể phát hoặc bất kỳ nội dung nào khác.