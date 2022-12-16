> Bài viết gốc: https://manhhomienbienthuy.github.io/2019/04/20/javascript-popups.html

Popup là một phương thức rất kinh điển để hiển thị các thông tin nâng cao cho người dùng.  Theo thời gian, popup cũng phát triển và ngày càng hoạt động phức tạp hơn.

Trong bài viết này, chúng ta sẽ tìm hiểu về cách thức sử dụng popup bằng JavaScript.

# Sử dụng cơ bản

Với lịch sử lâu đời, việc mở một popup mới bằng JavaScript là một công việc hết sức đơn giản:

```javascript
window.open('http://example.com/')
```

Và trình duyệt sẽ mở một tab mới với URL được chỉ định.  Trước đây, các trình duyệt sẽ mở URL ở một cửa sổ mới, do đó, cửa sổ này mới được gọi là popup.  Ngày ngày, hầu hết các trình duyệt hiện đại đều sử dụng tab mới thay cho cửa sổ mới nhưng thuật ngữ "popup" vẫn tiếp tục được sử dụng (có lẽ do mọi người đã quá quen rồi).

![basic](https://i.imgur.com/BKaXN7C.png)


# Sử dụng nâng cao

Hiện nay, chúng ta có nhiều cách để load và hiển thị dữ liệu bằng JavaScript, thế nhưng popup với lịch sử lâu đời của nó vẫn cứ tiếp tục được sử dụng.  Bởi đơn giản, popup có những tình huống là lựa chọn tốt nhất.

Ví dụ, nhiều shop bán hàng online thường có một khung chat để hỗ trợ khách hàng.  Trong trường hợp này, khi khách hàng click thì mở một popup để chat sẽ tốt hơn là bật một khung chat nho nhỏ.

Đây hoàn toàn là ý kiến cá nhân, dựa trên một số điểm như sau:

Một popup chat riêng độc lập với trang chính sẽ giúp trang chính (dùng để bán hàng) nhẹ hơn, hoạt động tốt hơn.  Mà riêng lĩnh vực này, trải nghiệm người dùng là cực kỳ quan trọng.

Một popup thì dễ dàng gắn vào trang hơn, chỉ cần 1 button là đủ, không cần nhiều xử lý liên quan.  Điều này cũng giúp các lập trình viên web bán hàng dễ dàng hơn trong công việc của họ.

Một điểm quan trọng nữa là, popup không bị đóng sau khi trang web bán hàng được đóng lại.  Điều này giúp các trang bán hàng "níu kéo" khách hàng tốt hơn.

## Phương thức `window.open`

Như phân trước đã đề cập, chúng ta có thể mở một popup rất dễ dàng với một URL được truyền vào.

Thế nhưng, thực tế, phương thức `window.open` cho phép chúng ta làm được nhiều hơn thế rất nhiều với các tham số như sau:

```javascrip
window.open(url, name, params)
```

Thông tin cụ thể về các tham số như sau:

- `url`: URL của trang cần load ở popup
- `name`: Tên của popup.  Mỗi một trang web khi mở ra sẽ có 1 tên (có thể truy cập thông qua `window.name`), chúng ta có thể chỉ định tên của popup.  Nếu tên này đã tồn tại (có một trang web khác được mở) thì URL được chỉ định sẽ được mở ra ở trang đó.  Nếu không (hoặc `name` không được chỉ định) thì sẽ mở một trang web mới.
- `params`: Đây chính là cấu hình của cửa sổ popup, nó có chứa toàn bộ các cấu hình, ngăn cách bằng dấu phẩy.

Một số cấu hình chúng ta có thể sử dụng trong `params`:

- `top/left`: vị trí sử mở cửa sổ popup (tính theo góc trên, bên trái) trên màn hình.  Một hạn chế của thông số này là popup bắt buộc phải được mở trong màn hình.
- `width`/`height`: Kích thước của cửa sổ popup.  Thông số này cũng có hạn chế là nó chỉ có tác dụng nếu các giá trị nhỏ hơn kích thước màn hình.
- `menubar (yes/no)`: Có hiển thị thanh menu hay không.
- `toolbar (yes/no)`: Có hiển thị toolbar hay không.
- `location (yes/no)`: Có hiển thị URL của trang được mở hay không (nhiều trìn duyệt bỏ qua thông số này).
- `status (yes/no)`: Có thể thị thanh trạng thái hay không (nhiều trình duyệt cũng bỏ qua thông số này).
- `resizable (yes/no)`: Cho phép thay đổi kích thước cửa sổ hay không.
- `scrollbars (yes/no)`: Cho phép hiển thị thanh cuộn hay không.

Có nhiều thông số khác nhau nữa, nhưng chúng cũng ít được sử dụng trong thực tên, nên nội dung bài viết này tôi không đề cập đến.  Để xem chi tiết về toàn bộ thông số, mời các bạn tham khảo thêm [ở đây](https://developer.mozilla.org/en-US/docs/Web/API/Window/open).

## Mở một cửa sổ tối giản

Dưới đây là một cách thức để mở một cửa sổ popup tối giản nhất:

```javascript
let params =
'top=0,left=0,width=500,height=500,menubar=no,toolbar=no,location=no,status=no,resizable=no,scrollbars=no'
open('http://example.com/', 'test', params);
```

Như chúng ta có thể thấy, phần lớn các thành phần cửa sổ đều bị ẩnh đi, cùng với việc chỉ định kích thước, vị trí của cửa sổ.  Sau khi thực hiện, chúng ta sẽ có một cửa sổ popup như dưới đây.

![minimal](https://i.imgur.com/eUc7ssx.png)

Trong trường hợp phương thức `window.open` không được truyền `params`, hoặc params không đầy đủ, thì cấu hình mặc định sẽ được dùng tới. Dưới đây là cấu hình mặc định trong những trường hợp đó:

- Nếu không có tham số `params` được truyền cho phương thức `window.open` (hoặc truyền là một string rỗng), thì cấu hình mặc định của cửa sổ trình duyệt sẽ được dùng (thường là mở luôn trong tab mới, dùng cửa sổ hiện tại).
- Nếu params được truyền vào, trong đó có cấu hình một số thông số của cửa sổ, thì những thông số còn thiếu (có giá trị `yes`/`no`) sẽ mặc định bị ẩn đi.  Vì vậy, một khi đã cấu hình 1 thông số nào đó, chúng ta cần cấu hình tất cả các thông số khác để đảm bảo cửa sổ popup đúng theo nhu cầu.
- Nếu không có thông số `left`, `top`, trình duyệt sẽ mở lại popup ở vị trí cửa sổ mở ra gần nhất.
- Nếu không có thông số `width`, `height`, cửa sổ sẽ được mở với kích thước của cửa sổ được mở ra gần nhất.

## Truy cập một popup đang mở

Chúng ta vẫn có thể truy cập được một popup đang mở, ngay cả khi nó là một trang web hoàn toàn riêng biệt.  Đó là bởi vì phương thức `window.open` sẽ trả về một đối tượng, tham chiếu đến cửa sổ popup. Nhờ đối tượng này, chúng ta có thể thực hiện một số thao tác với cửa sổ popup được mở.

Trong ví dụ dưới đây, chúng ta có thể dùng cách này để truy cập và thay đổi nội dung của cửa sổ popup sau khi load:

```javascript
let newWindow = open('/', 'example', 'width=500,height=500')

newWindow.onload = function() {
  let html = '<div class="warning head-warn"> <div class=wrapper><p>Welcome</div> </div>'
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
};
```

Kết quả chúng ta đã thay đổi được nội dung hiển thị trong popup

![popup](https://i.imgur.com/MQr7ACw.png)

Cần lưu ý một điều rằng, chúng ta chỉ có thể dùng cách này để thao tác với nội dung hiển thị trong popup nếu URL được mở ra trong popup đó có cùng nguồn gốc với trang hiện tại (cùng protocol, domain, port).

Với popup đang mở cácn URL khác nguồn gốc, chúng ta có thể thay đổi URL của nó (bằng cách `window.location=...`) nhưng không thể truy cập được vào nội dung hiện tại.  Điều này cũng hoàn toàn dễ hiểu, tất cả là vì sự an toàn của người dùng.

Thử tưởng tượng một trang web sử dụng popup để mở gmail của bạn chẳng hạn, nếu nó có thể truy cập vào nội dung được hiển thị thì khác nào đọc được toàn bộ nội dung thư của chúng ta.

## Đóng một popup

Nếu chúng ta không có nhu cầu dùng đến popup nữa, chúng ta có thể chủ động đóng nó lại (thông qua đối tượng như ở phần trên).

Về mặt kỹ thuật, chúng ta chỉ cần gọi phương thức `close` với đối tượng đó mà thôi.  Phương thức `close` thựuc ra có thể được gọi với bất kỳ cửa sổ nào đang bật.  Thế nhưng các trình duyệt hiện này đều được cài đặt để phương thức này chỉ có tác dụng với cửa sổ nào được mở ra bởi `window.open` mà thôi.

Chúng ta có thể sử dụng thuộc tính `window.closed` để kiểm tra xem popup được mở ra dã bị đóng hay chưa.  Ví dụ, người dùng có thể chủ động đóng popup lại và chúng ta cần kiểm tra điều đó để thực hiện các thao tác khác với cửa sổ popup chẳng hạn.

Đoạn code dưới đây sẽ mở ra một popup sau đó đóng nó lại:

```javascript
let newWindow = open('http://example.com/', 'example', 'width=300,height=300')
newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```

## Focus popup

Về lý thuyết, chúng ta có các phương thức `window.focus` dùng để focus một cửa sổ.

Trước đây, chúng ta còn có thể `window.blur`, ngoài ra, chúng ta có thể dùng các event `onfocus` và `onblur` để xử lý các thao tác cần thiết.

Như trong ví dụ dưới đây, chúng ta "bắt buộc" người dùng focus vào popup:

```javascript
let newWindow = open('http://example.com/','example','width=300,height=300')
newWindow.onblur = () => newWindow.focus()
```

Trước đây, điều này là một nỗi ám ảnh với người dùng, bởi nó làm cửa sổ popup lúc nào cũng nổi trên màn hình mà không làm gì khác được. Tuy nhiên, giờ đây, các trình duyệt đã bảo vệ người dùng tốt hơn và những thao tác như trên hầu như không cần dùng được nữa.

Chúng ta vẫn có thể sử dụng `window.focus` để focus vào popup nhưng không thể sử dụng `window.blur` được nữa.  Có rất nhiều giới hạn khác nhau cho những thao tác như vậy, mục đích là để tránh người dùng bị làm phiền bởi các thủ thuật.

Mỗi trình duyệt lại có một phương thức khác nhau cho việc này.  Ví dụ, các trình duyệt trên di động thường bỏ qua phương thức `focus`.  Ngoài ra, `focus` cũng thường không có tác dụng, nếu trình duyệt mở popup trong 1 tab mới thay vì cửa sổ mới.

Thế nhưng, vẫn có một số điều mà JavaScript có thể làm được.  Ví dụ, sau khi mở một popup, chúng ta có thể gọi `window.focus`, chỉ là để chắc chắn popup sẽ được focus thôi.  (Với đa số trình duyệt, thao tác này hơi thừa.)

# Block popup

Popup đã xuất hiện từ thuở xa xưa của công nghệ.  Mục đích ban đầu là để hiển thị các nội dung khác mà không cần thay đổi đến trang hiện tại.  Ngày nay, chúng ta có thể nhiều cách thức khác nhau để thực hiện việc đó: JavaScript có thể gửi các request và nhận phản hồi sau đó hiển thị.  Popup hầu như không còn cần thiết, nhưng vẫn có nhiều lúc, popup vẫn có vai trò rất quan trọng, như đã nó ở trên, dù không nhiều.

Thế nhưng, popup cũng có những vấn đề của riêng nó.  Nhiều người đã lợi dụng popup để spam quảng cáo cho người dùng.  Điều đó vẫn còn tiếp diễn đến tận bây giờ, rất nhiều website mở hàng đống popup quảng cáo đủ thể loại mỗi khi người dùng truy cập.

Do đó, các trình duyệt hiện nay đều phát triển một cơ chế, block popup giúp bảo vệ người dùng khỏi những thứ phiền phức đó.  Mặc định, chế độ block pop được bật sẵn nên nhiều khi người dùng không để ý nhưng nó đã giúp rất nhiều trong việc tránh làm phiền.

Thông thường, các trình duyệt đều được cài đặt để block các popup được mở ra mà không có liên quan gì đến thao tác click chuột của người dùng.  Tức là nếu ngay khi người dùng click mà bật popup thì không sao, nhưng sau khi gọi ajax hay các request khác mà bật popup thì popup đó sẽ bị block.

Ví dụ đoạn code sau muốn mở một popup sau khi gọi một query thông qua fetch API, popup này sẽ bị chặn bởi rất nhiều trình duyệt:

```javascript
$("#test-open").on('click', () => {
	fetch('https://jsonplaceholder.typicode.com/posts/1')
		.then(response => response.json())
		.then(() => window.open('/'))
})
```

Thế nhưng, trong trường hợp cần thiết, vẫn có cách để vượt qua được block popup này.  Nhưng trong bài viết tôi sẽ không mô tả cụ thể ở đây.

# Kết luận

Popup có thể được mở thông qua phương thức `window.open`, phương thức này sẽ trả về một đối tượng mà thông qua đó, chúng ta có thể tương tác với popup được mở ra.  Và popup thực ra theo hướng ngược lại, cũng có thể tương tác được với cửa sổ đã mở nó ra.  Đây là một kết nối hai chiều.

Block popup là một cơ chế của trình duyệt (mặc định được bật sẵn) để tránh việc các popup làm phiến người dùng quá mức.  Nếu cần đến popup, tốt nhất là hãy báo cho người dùng biết về việc đó, chỉ một icon nhỏ biểu thị sẽ có cửa sổ mở ra sẽ giúp ích rất nhiều trong trải nghiệm người dùng.