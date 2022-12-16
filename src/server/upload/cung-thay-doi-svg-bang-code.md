Một trong những điều thú vị nhất về đồ hoạ vector (ngoài việc giãn kích thước mà không mất đi chất lượng) đó là khi bạn nắm rõ cơ bản bạn có thể xử lý code những hình dạng đơn giản khá dễ dàng, mà không cần mở một ứng dụng đồ hoạ.

Chỉ với vài dòng code bạn đã có thể có được những icon tuỳ biến cho riêng mình, và bạn sẽ biết chính xác mỗi icon được tạo ra như thế nào.

Trong hướng dẫn này chúng ta sẽ tìm hiểu tất cả những nguyên tắt cơ bản trong việc viết code SVG bằng tay, nhưng tôi sẽ không làm bạn phiền phức với một bài diễn thuyết khô khan chỉ giải thích những dình dạng và thuộc tính có liên quan. Thay vào đó bạn sẽ học cách xử lý code SVG bằng tay thông qua thực hành, tạo sáu icon mà bạn thấy ở phần đầu của bài viết này ([hãy xem demo](https://tutsplus.github.io/how-to-hand-code-svg/Completed/handcodedsvg.html)). Trong quá trình thực hiện, bạn sẽ sử dụng tất cả các thành phần cơ bản cần thiết cho việc viết code SVG bằng tay.

Nói về những thành phần cơ bản đó, hãy xem một giới thiệu ngắn về mỗi thành phần.

![](https://images.viblo.asia/8f97f159-271a-4be0-bc70-494d3d6ae45a.PNG)

# Những thành phần SVG cơ bản
Bạn có thể đối mặt với rất nhiều sự phức tạp với SVG, nhưng nó không cần thiết cho những icon mà chúng ta sẽ tạo ra. Danh sách dưới đây khái quát những khối mà chúng ta sẽ cần.

* `<svg>` Bao bọc và định nghĩa toàn bộ hình. `<svg>` chính là đồ hoạ vector mà `<html>` là một trang web.
* `<line>` Tạo những đường thẳng đơn.
* `<polyline>` Tạo những đường đa đoạn.
* `<rect>` Tạo hình chữ nhật và hình vuông.
* `<ellipse>` Tạo hình tròn và hình oval.
* `<polygon>` Tạo hình đa giác, với ba hoặc nhiều cạnh.
* `<path>` Tạo bất kỳ hình nào mà bạn thích bằng cách định nghĩa những điểm và đường thẳng giữa chúng.
* `<defs>` Định nghĩa những tài nguyên có thể sử dụng lại. Không có gì nằm trong phần `<defs>` được hiển thị. `<defs>` là vector mà `<head>` là một trang web.
* `<g>` Gom nhiều hình dạng thành một nhóm. Đặt các nhóm trong phần `<defs>` để cho phép chúng được sử dụng lại.
* `<symbol>` Liên kết một nhóm, những với một số tính năng phụ. Thông thường được đặt trong phàn `<defs>`.
* `<use>` Lấy những tài nguyên được định nghĩa bên trong phần `<defs>` và làm cho chúng hiển thị trong SVG.
    
Khi chúng ta bắt đầu tạo icon, chúng ta sẽ làm việc với những thành phần này theo thứ tự đã thấy ở trên.

# Tập tin bắt đầu
Trước khi chúng ta bắt đầu, hãy lấy về một bản sao [những tập tin khởi đầu từ repo GitHub](https://github.com/tutsplus/how-to-hand-code-svg). Bạn có thể tải tập tin .zip, hoặc clone repo về hệ thống của mình.

Chúng ta sẽ bắt đầu với một tài liệu có sẵn một số thẻ HTML và CSS cơ bản. Điều này sẽ cho ta một số style cho SVG mà chúng ta sẽ tạo ra, và đồng thời sẽ thiết lập một grid nhỏ trên trang. Chúng ta sẽ tạo các icon bên trên grid này, và hy vọng nó sẽ giúp bạn sắp xếp một cách trực quan hơn với nó khi tạo SVG.

Khi bạn mở "handcodesvg.html" từ thư mục nguồn "Starter Files" bạn sẽ thấy những điều sau đây:

![](https://images.viblo.asia/74c890ec-15c4-4b45-a01f-4811cabe75e7.png)

### Xác định nhanh các giá trị `x` và `y`

Khi làm việc trong không gian 2D trên một trang web, trục ngang được biểu diễn bởi `x` và trục dọc được biểu diễn bởi `y`. Vị trí theo từng trục này được biểu diễn bởi những con số. Nếu bạn muốn di chuyển thứ gì đó về bên phải, chúng ta sẽ cần tăng giá trị `x` lên, và để di chuyển về bên trái chúng ta sẽ giảm `x`. Tương tự, để di chuyển thứ gì đó xuống chúng ta sẽ tăng `y` và để di chuyển lên trên chúng ta sẽ giảm `y`.

Một cách viết tắt thông dụng để biểu diễn `x` và `y` của một điểm là `(x, y)`. Ví dụ, một điểm tạo toạ độ `x` là `10` và `y` là `50` có thể được viết như sau `(10, 50)`. Tôi sẽ sử dụng lối viết tắt này xuyên suốt trong bài viết này.

Có để ý hai đường đậm nhất trên grid của chúng ta không? Chúng ta sẽ đặt SVG sao cho góc trên bên trái thẳng hàng với vị trí mà chúng giao nhau. Như vậy, điểm giao nhau sẽ biểu diễn vị trí `x = 0` và `y = 0`, hoặc `(0,0)` trong SVG của chúng ta.

### Grid nền
Mỗi đường grid sáng nhất biểu diễn `10px`, và những đường grid dày nhất biểu diễn `100px`. Vì vậy nếu chúng ta muốn di chuyển một đối tượng xuống dưới từ một đường dày đến đường kế, chúng sẽ tăng vị trí của nó trên trụng `y` bằng `100px`.

Nếu điều đó vẫn có vẻ chưa rõ lắm, đừng lo lắng điều này sẽ trở nên rõ ràng khi chúng ta bắt đầu thực hành tạo các biểu tượng SVG.

### Style SVG Mặc định
Lưu ý rằng trong tập tin HTML khởi đầu có một số CSS với style mặc định cho những icon SVG mà chúng ta sắp làm:

```
svg {
  stroke: #000;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
```

Điều này sẽ thiết lập các icon của chúng ta thành no fill, và troke dày `5px` màu đen với rounded là cap và join.

## 1. Thiết lập SVG

Bước đầu tiên trong việc tạo bất kỳ SVG nào là xây dựng một thẻ phần tử `<svg></svg>`. Bất kỳ thứ gì mà bạn muốn SVG của bạn hiển thị sẽ phải nằm bên trong hai thẻ này. Có một số thuộc tính mà bạn có thể sử dụng trên phần tử này, nhưng chúng ta sẽ giữ cho mọi thứ đơn giản và chỉ sử dụng `width` và `height`.

Thêm code sau đây vào phần `<body>` của tài liệu HTML:
    
```
<svg width="750" height="500">
 
</svg>
```
**Lưu ý:** CSS trong tập tin bắt đầu sẽ dịch chuyển SVG này xuống dưới và về bên phải `100px` để góc trên bên trái của nó sẽ được đặt tại nơi giao nhau của hai đường tối nhất trên grid nền của chúng ta. Và các giá trị bên trong demo trên CodePen xuyên suốt bài hướng dẫn này cũng có thể hơi khác-nhưng hãy thoải mái với chúng.

## 2. Tạo Icon "Canh Lề Trái"

Hãy bắt đầu bằng cách sử dụng phần tử <line> để tạo icon canh lề trái này:
    
![](https://images.viblo.asia/6741637f-2fac-4cf3-8339-0eda15bca9be.png)

Phần tử line có bốn thuộc tính mà bạn sẽ cần phải sử dụng:
    
* `x1` điểm bắt đầu trên trục ngang
* `y1` điểm bắt đầu trên trục dọc
* `x2` điểm kết thúc trên trục ngang
* `y2` điểm kết thúc trên trục dọc

Tóm lại, bạn sử dụng các thuộc tính `x1` và `y1` để thiết lập nơi mà line bắt đầu, và `x2` và `y2` để thiết lập nơi mà line kết thúc.

Hãy bắt đầu line đầu tiên, cái ở trên cùng. Chúng ta sẽ tạo cái line dài `45px`, tuy nhiên stroke `5px` mà chúng ta sẽ sử dụng sẽ thêm một số pixel phụ xung quanh bên ngoài line. Cũng như chúng ta sẽ cần dịch chuyển line của chúng ta xuống dưới và về bên phải `3px` để đảm bảo không có các pixel dư ra do troke bị cắt ra.

Vì lý do đó, chúng ta sẽ bắt đầu line của chúng ta tại một vị trí `3` trên trục `x` và `3` trên trụng `y`. Chúng ta có thể thiết lập điểm bắt đầu là (3,3) bằng cách sử dụng thuộc tính `x1-"3" y1="3"`.

Chúng ta muốn line dài `45px`, vì thế chúng ta sẽ thêm `45` vào vị trí x bắt đầu là `3`, cho chúng ta `48` là giá trị mà chúng ta muốn thiết lập cho `x2`. Chúng ta muốn line hoàn tất tại cùng vị trí trên trục ngang, vì thế chúng ta sẽ thiết lập `y2` bằng `3`, tương tự giá trị thiết lập cho `y1`. Chúng ta sẽ thêm điểm cuối `(48,3)` này thông qua thuộc tính `x2=48" y2="3"`.

Code hoàn chỉnh cho line đầu tiên sẽ như sau:

```
<line x1="3" y1="3" x2="48" y2="3"></line>
```

Xem lại trên trình duyệt và bạn sẽ thấy một đường thẳng dài `45px` màu đen với hai đầu bo tròn.

Bây giờ chúng ta có thể tiếp tục thêm ba line tiếp theo vào icon của chúng ta. Chúng ta muốn kết thúc với tổng cộng bốn line. Cái đầu và thứ ba sẽ dài `45px`, và cái thứ hai và thứ tư sẽ là `62px`. Chúng ta cũng muốn một khoảng cách giữa mỗi line là `16px`.

Chúng ta có thể làm điều này với code sau đây:

```
<line x1="3" y1="3" x2="48" y2="3"></line>
<line x1="3" y1="19" x2="65" y2="19"></line>
<line x1="3" y1="35" x2="48" y2="35"></line>
<line x1="3" y1="51" x2="65" y2="51"></line>
```

**Lưu ý:** giá trị `y` của mỗi line gia tăng `16px` để tạo ra khoảng cách cần thiết.

Hãy xem lại preview trên trình duyệt và bạn sẽ thấy tất cả bốn đường. Bạn cũng có thể chỉnh sửa trực tiếp SVG trong pen này:
    
[Demo](https://codepen.io/tutsplus/embed/GQpJNL/?height=455&theme-id=12451&default-tab=html,result&embed-version=2&editable=true&__cf_chl_captcha_tk__=d044da9c0c2a600ff274d5b1da0f41bf5ce17b67-1582295113-0-AUV2rcKu4ypE336QUSDdjiy7SKeKVtJRN8GcOyHUpKA4MfjW4mZTRI-0kZfDHZ0_phV-KLqtcjMMaRpWHH4-aeP6TO00g3WzDjBXDHNz6c6gTOzbti1LwiPwwA1PrrtHk7NdOxVw_N75BiGf_HrLGwWcFWuuSsxrlCaTe_nmDSdAKOrR_ucLMkcZ-SQdk_sUBSKDwV2AFDs0BTgV2r2Pa4ktwZGtJ1fxiXxlmmCFFWKrzObll26U0i78FPrpF1TAB_d99D1tq1CtTk8wsVisP-EL_NXk-9ILlwnroMO27Q2ffoj5O8sGSZhnfNmQlEGry3D7fLS92j1EbV5gEfNNKPYo_unwTglmRhw3yrtDs9iaaNz2ChYw_1IrBuvU9ZfxLc3QisegLgvyTf5nXQa8uzvrZfEl_gWLgQdlleCxmmG04CJe7oSp-kTzj-DtTw2ugR9aUB4POovWQyw6xvQ-JJqvANCRtMg-zRlwEXKM0MzOtfdjnA4NKEn0UbMMzRuZgQ)

### Tạm thời chuyển Icon thành Comment

Với code đó thì icon đầu tiên của bạn đã được hoàn thành. Chúng ta sẵn sàng chuyển đến tạo icon tiếp theo, và chúng ta sẽ muốn tạo nó ở cùng vị trí trên grid, nhưng ngay bây giờ biểu tượng canh lề trái đang ngáng đường. Như vậy, bây giờ chỉ cần comment đoạn code của nó để trải lại không gian. Chúng ta sẽ bay trở lại và bỏ comment nó sau khi chúng ta chuyển icon của chúng ta thành những tài nguyên có thể sử dụng lại.

Bạn sẽ cần thực hiện tương tự cho mỗi icon khi chúng ta tiếp tục, comment nó khi bạn hoàn tất việc tạo ra nó. Vì lý do đó có lẽ cũng là một ý tưởng hay nếu thêm một ít chú thích bên trên code cho mỗi icon để bạn biết cái nào là cái nào khi bạn quay lại chúng sau này.

## 3. Tạo Icon "Dấu Lớn hơn"

Đối với icon này, hãy sử dụng sự biến hoá tiếp theo của phần tử `<line>`: `<polyline>`. Chúng ta sẽ sử dụng nó để tạo một dấu lớn hơn.
    
![](https://images.viblo.asia/bfc390f5-7755-4cf2-959f-0e6f376519d6.png)

Phần tử `<polyline>` chỉ có một thuộc tính: `points`. Trong này bạn sử dụng các cặp số để thiết lập một chuỗi các điểm. Line sẽ tự động được vẽ giữa chúng. Các cặp số được viết đơn giản một số sau một số khác bên trong thuộc tính `points`. Không yêu cầu dấu phẩy để phân cách, tuy nhiên nó vẫn có thể sử dụng dấu phẩy. Để cho dễ nhìn bạn cũng có thể muốn đặt một cặp giá trị trên một dòng riêng của nó.

Chúng ta sẽ bắt đầu polyline của chúng ta tại cùng vị trí mà chúng ta bắt đầu icon trước đó, đó là `(3,3)` để đảm bảo stroke và cap không bị cắt. Chúng ta muốn điểm thứ hai di chuyển về bên phải, và xuống dưới `25px`, vì thế chúng ta thiết lập nó thành `(30,28)`. Điểm thứ ba của chúng ta sẽ được canh giữa thẳng đứng so với điểm đầu tiên, và di chuyển xuống dưới `25px`, vì vậy nó sẽ được thiết lập là `(3,53)`.

Chúng ta có thể thêm những điểm này vào trong thuộc tính points của polyline như sau:
    
```
<polyline points="
  3 3
  30 28
  3 53
"></polyline>
```
    
Nếu bạn muốn code ngắn gọn hơn, bạn cũng có thể viết code ở trên như sau:
    
```
<polyline points="3 3, 30 28, 3 53"></polyline>
```
    
hoặc
    
```
<polyline points="3 3 30 28 3 53"></polyline>
```
    
Hãy xem lại trên duyệt của bạn và bạn sẽ thấy icon lớn hơn hiển thị: thêm một icon nữa được hoàn thành, đơn giản vậy thôi!
    
[Demo](https://codepen.io/tutsplus/embed/PQPqVq/?height=455&theme-id=12451&default-tab=html,result&embed-version=2&editable=true)
    
Một lần nữa, comment nó đi và cho nó một it chú thích để bạn biết là cái nào trước khi tiến hành làm icon tiếp theo.
    
## 4. Tạo một Icon "Trình duyệt"
    
Bây giờ chúng ta đã làm việc với đường thẳng, hãy tạo một số hình dạng, bắt đầu với một hình chữ nhật (`<rect>`). Chúng ta sẽ sử dụng nó kết hợp với một số `<line>` để tạo một icon trình duyệt.
    
![](https://images.viblo.asia/bf2dccb1-29ea-4cb4-8240-8027166d7cdd.png)
    
Hình chữ nhật và hình vuông có thể được tạo ra với phần tử <rect>, phần tử này có bốn thuộc tính mà bạn sẽ cần cung cấp:

* `x` góc trên bên trái nằm trên trục `x`
* `y` góc trên bên trái nằm trên trục `y`
* `width` chiểu rộng của cái hình
* `height` chiều rộng của hình

Lưu ý: bạn cũng có thể sử dụng các thuộc tính `rx` và `ry` để tạo các góc bo tròn nếu bạn thích.

Chúng ta sẽ tạo một hình chữ nhật với góc trên bên trái của nó dịch chuyển `3px` theo cả hai hướng, một lần nữa hạn chế việc cắt mất stroke, vì vậy chúng ta sẽ sử dụng các thuộc tính `x="3" y="3"`. Chúng ta muốn nó rộng `80px` cao `60px`, vì vậy chúng ta cũng sẽ sử dụng các thuộc tính `width="80" height="60"`.

Như vậy code đầy đủ cho hình chữ nhật là:

```
<rect x="3" y="3" width="80" height="60"></rect>
```
    
Lưu code của bạn và xem lại trên trình duyệt. Bạn sẽ thấy một hình chữ nhật nhỏ nhắn nằm trên đó.

Bây giờ tất cả những gì chúng ta cần làm là thêm một đường thẳng nằm ngang ở bên trên, thêm một đường thẳng đứng gần với góc trên bên trái. Chúng ta sẽ sử dụng phương thức tạo đường thẳng tương tự như chúng ta đã làm, code hoàn chỉnh cho icon trình duyệt sẽ là:
    
```
<rect x="3" y="3" width="80" height="60"></rect>
<line x1="3" y1="19" x2="83" y2="19"></line>
<line x1="20" y1="3" x2="20" y2="17"></line>
```
    
Dành chút thời gian để xem toạ độ được cung cấp trong thuộc tính của hai đường thẳng, và có thể thay đổi các giá trị của chúng để bạn có thể thấy được chúng hoạt động như thế nào trong icon này.
    
Cảm ơn các bạn đã bỏ thời gian để xem bài viết của mình, nếu có gì sai sót, mong mọi người góp ý (bow)