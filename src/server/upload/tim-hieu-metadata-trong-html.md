## 1. Giới thiệu
Tối ưu onpage là một trong những công việc quan trọng trong SEO và những thẻ meta vẫn là những công cụ cần thiết trong quá trình thực hiện onpage. Vậy thẻ meta là gì? Ý nghĩa của nó ra sao? Những thẻ meta nào cần thiết và quan trọng trong SEO?

## 2. Thẻ <meta /> là gì?
Thẻ HTML `<html>` hay thẻ `<meta>` trong HTML được sử dụng để cung cấp metadata về tài liệu HTML. Metadata sẽ không được hiển thị trên trình duyệt, nhưng nó sẽ được bộ máy tìm kiếm phân tích để lấy thông tin cơ bản về trang web của bạn. Nói cách khác là nó dùng để cung cấp thêm "thông tin về trang web" cho trình duyệt và các công cụ tìm kiếm, những thông tin này không hiển thị lên màn hình cho người dùng nhìn thấy, tuy nhiên trình duyệt và các công cụ tìm kiếm có thể đọc và hiểu được, thường được đặt dưới thẻ `<head>` của một trang web..

Trước đây một số nhà phát triển website còn cho rằng thẻ meta có thể được đặt trong body của một trang, vậy trường hợp nào để trong `<head>` và trường hợp nào để trong `<body>`. Đối với các thẻ meta định nghĩa trang web thì phải để trong `<head>`. Ví dụ như: meta description. Nhưng trong một số trường hợp bạn cần đánh dấu văn bản trong trang web. Thì bạn có thể sử dụng các thẻ meta trong `<body>`.

Vì vậy: Các thẻ meta được sử dụng để định nghĩa cho cả trang web thì đặt ở trong `<head>`. Một số thẻ meta được dùng để đánh dấu văn bản cho một phần nội dung trang web thì có thể đặt trong `<body>`.

## 3. Các ví dụ về thẻ meta trong HTML
Ví dụ 1: định nghĩa các từ khóa cho bộ máy tìm kiếm.
```
<meta name="keywords" content="HTML là gì? Thẻ HTML meta">
```

Ví dụ 2: định nghĩa một mô tả cho trang web.
```
<meta name="description" content="Tìm hiểu về metadata trong HTML">
```

Ví dụ 3: định nghĩa tác giả của trang web.
```
<meta name="author" content="Alex">
```

Ví dụ 4: tự động tải lại trang web sau 30s.
```
<meta http-equiv="refresh" content="30">
```

Ví dụ 5: Thiết định khung nhìn để trang web dễ nhìn trên tất cả các thiết bị.
```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 4. Các thuộc tính của thẻ meta
Thẻ `<meta>` có bốn thuộc tính cơ bản.

Dưới đây là bảng mô tả sơ lược về bốn thuộc tính đó:


| Thuộc tính | Giá trị | Mô tả |
| -------- | -------- | -------- |
| charset     | character_set     | Chỉ định mã hoá ký tự cho tài liệu HTML     |
| content     | text     | Cung cấp giá trị được gắn liền với thuộc tính http-equiv hoặc name     |
| name     | application-name, author, description, generator, keywords, viewport , robots    | Xác định "tên của một loại thông tin" mà bạn muốn cung cấp thêm cho trang web    |
| http-equiv     | content-type, default-style, refresh     | Chỉ định mã hoá ký tự cho tài liệu HTML     |

### 4.1 Thuộc tính charset
Thuộc tính charset dùng để xác định kiểu mã hóa ký tự của trang web. (Tiếng Việt của chúng ta sử dụng kiểu mã hóa ký tự là UTF-8)

Ví dụ:
```
<meta charset="UTF-8">
```

### 4.2 Thuộc tính name
Thuộc tính name dùng để xác định "tên của một loại thông tin" mà bạn muốn cung cấp thêm cho trang web. Lưu ý: Thuộc tính name chỉ dùng để xác định tên của loại thông tin mà bạn muốn cung cấp thêm cho trang web, còn nội dung của thông tin đó thì phải sử dụng thuộc tính content.

Dưới đây là một số giá trị thường được dùng bởi thuộc tính name:
**Giá trị author**
 Xác định tên tác giả (chủ sở hữu) của trang web.
 
Ví dụ:
```
<meta name="author" content="Web cơ bản">
```

Thẻ trên cung cấp cho trình duyệt và các công cụ tìm kiếm biết tác giả (chủ sở hữu) của trang web chính là "Web cơ bản". Khi tìm kiếm trên google, tên tác giả sẽ hiển thị kế bên kết quả tìm kiếm.

**Giá trị keywords**
Xác định danh sách những từ khóa mà bạn muốn khi người dùng gõ vào các cỗ máy tìm kiếm như google, bing, .... thì sẽ hiển thị kết quả là trang web của bạn.

Ví dụ: Bạn muốn khi người dùng gõ trên google một trong những từ khóa bên dưới sẽ hiển thị kết quả là trang web của bạn.
```
xem phim hd
phim hay
phim hành động
```

```
<meta name="keywords" content="xem phim hd, phim hay, phim hành động">
```
> Lưu ý: Giữa các từ khóa phải được ngăn cách bởi dấu phẩy.

**Giá trị description**
Mô tả ngắn gọn nội dung chính của trang web (khoảng 150 ký tự là hợp lý)
Ví dụ:
```
<meta name="description" content="Website xem phim hành động hay chất lượng full HD miễn phí">
```
Lưu ý: Nội dung của thuộc tính description tốt nhất nên chứa các từ trong danh sách từ khóa (keywords), điều đó sẽ hỗ trợ tốt cho thuộc tính keywords cũng như việc hiển thị trang web của bạn trên các cỗ máy tìm kiếm.

**Giá trị robots**
Thẻ Meta robots là một thẻ có tác dụng điều hướng cho bọ tìm kiếm của Google thu thập thông tin trên những trang đánh chỉ mục và những trang loại trừ của một website. Bạn có thể cho phép hoặc không cho phép công cụ tìm kiếm index trang, theo dõi các liên kết của nó hoặc lưu trữ nó, hoặc ngăn chặn không cho nó index một số trang không cần thiết. Ví dụ:

```
<meta name=”robots” content=”noindex, nofollow” />
```

Thẻ meta này không cho công cụ tìm kiếm index trang và ngăn cản họ theo dõi các liên kết trên trang. Nếu bạn tình cờ được sử dụng hai thuật ngữ mâu thuẫn (ví dụ noindex và index), Google sẽ chọn tùy chọn hạn chế nhất là noindex.

Tại sao thẻ này hữu ích cho SEO? Trước hết đó là một cách đơn giản để ngăn chặn các chỉ số hoá nội dung trùng lặp, ví dụ phiên bản để in của một trang. Nó cũng có thể có ích cho các trang chưa hoàn thiện hoặc các trang web có thông tin bí mật.

Tham khảo thêm một số giá trị khai báo:

“index“: Các bọ tìm kiếm của Google khi thu thập thông tin được phép đánh chỉ mục trang này.

“follow“: Thuộc tính cho phép các bọ tìm kiếm của Google dựa vào những liên kết trên trang hiện tại của website để tìm kiếm thông tin trên các trang khác có liên quan đến trang này.

“all” hoặc “index, follow”: Bao gồm cả 2 giá trị của index và follow là cho phép google index, lập chỉ mục và đi theo các liên kết có trong bài viết.

“noindex”:  không cho phép google hay robots index trang này.

“nofollow“: Không cho phép Robots đi theo link trong trang để tới các trang khác liên kết.

“none” hay “noindex, nofollow“: bao gồm 2 thuộc tính noindex và nofollow, không cho google index trnag và không cho robots đi theo các liên kết trong trang.

### 4.3 Thuộc tính http-equiv
Thuộc tính http-equiv thường được dùng để:
Xác định kiểu nội dung và kiểu mã hóa ký tự của trang web và xác định việc tải lại trang.
> Lưu ý: Tương tự như thuộc tính name, thuộc tính http-equiv phải sử dụng kèm với thuộc tính content.

Dưới đây là các giá trị được dùng bởi thuộc tính http-equiv:

**Giá trị content-type**
Xác định kiểu nội dung và kiểu mã hóa ký tự của trang web.

Ví dụ:
```
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
```
Tuy nhiên, ta có thể thay thế bằng `<meta charset="UTF-8">` cho ngắn gọn hơn.

**Giá trị refresh**
Xác định việc trang sẽ tự động được tải lại.

Ví dụ: Sau 2 giây trang sẽ tự động được tải lại.

```
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="2">
</head>
<body>
    <h1>Bức tranh bên dưới có tên là The Scream</h1>
    <img src="../image/the-scream.jpg">
</body>
</html>
```

### 4.4 Thuộc tính content
Sau khi xem qua thuộc tính name và thuộc tính http-equiv thì chắc các bạn đã quá hiểu rõ về thuộc tính content. Thuộc tính content dùng để xác định nội dung của loại thông tin mà bạn muốn cung cấp cho trình duyệt và các công cụ tìm kiếm.

## 5. Title
Về mặt lý thuyết ,thẻ tiêu đề không phải là thẻ meta nhưng nó cũng được đưa vào cùng với các thẻ meta khác trong thẻ <head> . Nhưng mình vẫn đưa vào bài viết này vì cá nhân mìn thấy nó khá quan trọng trong SEO.

Cú pháp:

<title>Tiêu đề trang web của bạn</title>

Khi bạn chèn đoạn cú pháp này thì tiêu đề xuất hiện ở hai nơi khác nhau: Trên các trang kết quả tìm kiếm và ở trên tab của trình duyệt web.

Điều này đồng nghĩa với việc thẻ tiêu đề có ảnh hưởng lớn đối với CTR (Click Through Rate) và vị trí thứ hạng của bạn. Một tiêu đề tốt là bạn cần sử dụng từ khóa để làm tiêu đề. Hãy nhớ rằng nếu các từ khóa (Tiêu đề) phù hợp với truy vấn tìm kiếm của người dùng, nó sẽ được hiển thị in đậm. Và một điều nữa là chiều dài không quá 70 ký tự. Vậy nên bạn cần viết một tiêu đề ngắn gọn, xúc tích và phù hợp với nội dung bạn cần hướng tới người dùng.

## 6. Kết luận
Trong rất nhiều thẻ meta khác nữa,  như meta Abstract, meta Author, meta Copyright, meta Designer … nhưng những thẻ meta này không quan trọng nên mình không đưa vào bài viết này. Bạn có thể tự tìm hiểu thêm nhé. Các bạn nên quan tâm đến các thẻ:  meta description, meta robots và title ( mình có nói phía trên là title không phải là một thẻ meta nhưng nó thường được coi là một thể tương tự). Meta description được sử dụng để hiển thị thêm thông tin về nội dung của trang web. Công cụ tìm kiếm sử dụng nó trong SERPs của họ.
    
Meta robots: dùng để điều hướng bot tìm kiếm index trang của bạn hoặc bạn có thể ngăn chặn một số trang có nội dung trùng lặp, các trang admin, các trang bí mật…

Cuối cùng, một trong những phần quan trọng nhất là thẻ <title>.  Bạn nên nhớ không để thẻ <title> vượt quá 70 ký tự và hãy sử dụng từ khóa làm đòn bẩy cho mức độ hiệu quả của nó.

Chúc các bạn thành công trong công việc tối ưu Onpage của mình. Nếu các bạn có ý kiến nào khác có thể bình luận cùng góp ý, hoặc thấy hay thì share cho mọi người cùng biết.