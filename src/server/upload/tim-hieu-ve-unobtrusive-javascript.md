Unobtrusive JavaScript là một best practice trong việc viết code JavaScript cho phần frontend của một website. Lập trình viên nên nắm được điều này, biến nó trở thành thói quen, ý niệm quan trọng mỗi khi muốn bổ sung code JavaScript cho ứng dụng của mình.

Từ góc nhìn của người dùng, có thể phân chia website thành mấy phần: thứ nhất là nội dung và cấu trúc, tiếp theo là layout và các định dạng, cuối cùng là hành vi. Những chuyên gia lâu năm trong lĩnh vực phát triển web thường đưa ra lời khuyên về việc phân tách các phần này. Bạn sẽ sử dụng HTML khi muốn định hình cấu trúc và làm việc với nội dung của website. CSS dành cho việc tạo bố cục trực quan và các định dạng về màu sắc, phông chữ... Hành vi của các phần tử trên trang web, cách thức người dùng tương tác với ứng dụng sẽ được xử lý bằng cách sử dụng Unobtrusive JavaScript.

## Khái niệm

Một trong những vấn đề phổ biến mà chúng ta thường quan sát được: trong quá trình truy cập website, có nhiều người dùng, vì lý do nào đó mà code JavaScript ở phía client không hoạt động. Khi ấy, nhà phát triển web cần đảm bảo rằng nội dung của trang vẫn hiển thị bình thường, đáp ứng được mục đích truy cập dữ liệu. Cách tương tác, xử lý hiệu ứng của web có thể kém mượt mà, nhưng phần văn bản vẫn cần được ưu tiên truy cập. Và Unobtrusive JavaScript là kĩ thuật để giải quyết vấn đề này.

Trong nhiều trường hợp, vIệc bổ sung code JavaScript (JS) vào ứng dụng chỉ nên giống như hành động cho thêm phụ gia vào một món ăn ngon, để nó đã ngon nay còn ngon hơn. Ở khía cạnh làm web, điều này sẽ mang lại trải nghiệm tốt hơn cho những người dùng có khả năng chạy code JS, chứ không nên là gánh nặng, sự khó nhọc đối với những người mà vì lí do nào đó code JS bị block, vô hiệu hóa, hoặc không được thực thi đầy đủ. Quan điểm này được tóm gọn trong một thuật ngữ rộng rãi hơn là [Progressive Enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement).

## Cài đặt

Để minh họa cho kĩ thuật này, chúng ta sẽ cùng xem xét ví dụ: cài đặt chức năng mở một tab trình duyệt mới, hiển thị nội dung trang web khác khi click vào một siêu liên kết trên website của bạn.

### Cách làm bất tiện nhất

Chúng ta sẽ sử dụng code JS trực tiếp cho thuộc tính **href** của thẻ *<a></a>*. Cách xử lý này đã khiến cho nhiều người phàn nàn, kể cả người dùng lẫn lập trình viên web, về sự bất tiện của JS.

```html
<a href="javascript:window.open('https://www.w3.org/wiki/The_principles_of_unobtrusive_JavaScript')">W3C Article</a> 
```

Nếu JS bị vô hiệu hóa trên trang của người dùng, liên kết này sẽ không hoạt động. Đồng thời, việc maintain trang web sẽ trở nên khó khăn, bởi vì nếu muốn áp dụng một kĩ thuật khác để giải quyết vấn đề này thì bạn phải sửa lại tất cả những liên kết đang sử dụng cách làm cũ.

### Cách tốt hơn

Thay vì thêm trực tiếp code JS vào thuộc tính **href**, chúng ta sẽ sử dụng thuộc tính **onclick**:

```html
<a href="https://www.w3.org/wiki/The_principles_of_unobtrusive_JavaScript" onclick="window.open('https://www.w3.org/wiki/The_principles_of_unobtrusive_JavaScript');return false;">W3C Article</a>
```

Xét về khía cạnh bảo trì code, cách làm này vẫn thực sự giống như một cơn ác mộng. Tuy nhiên ưu điểm của nó là vẫn hoạt động trong trường hợp trình duyệt phía người dùng không hỗ trợ thực thi hoàn toàn hoặc một phần code JS. Nếu JS không hoạt động, thay vì một tab mới được mở ra, người dùng sẽ truy cập trực tiếp đến trang đích ở ngay tab đang mở hiện tại.

### Unobtrusive JavaScript

Chúng ta sẽ cùng đến với cách làm tốt hơn nữa so với cách thứ hai nêu trên: sử dụng kĩ thuật Unobtrusive JavaScript. Cụ thể, bạn sẽ thêm thuộc tính **class** vào các thẻ *<a></a>* tương ứng, rồi xử lý tiếp bằng code JS:

```html
<a href="https://www.w3.org/wiki/The_principles_of_unobtrusive_JavaScript" class="new_window">W3C Article</a>

<a href="https://en.wikipedia.org/wiki/Unobtrusive_JavaScript" class="new_window">Wikipedia Article</a>
```

Tiếp theo, chúng ta viết code JS cho những phần tử có class **new_window** ở trên, code đặt trong tài liệu HTML hoặc ở một file JS riêng:

```javascript
// chọn ra tất cả các phần tử có class new_window
var anchors = document.getElementsByClassName('new_window');

// lặp qua các phần tử ấy, thêm hành động cho thuộc tính onclick
for(var i=0; i < anchors.length; i++){
  anchors[i].onclick = function(){
    // mở liên kết trong tab trình duyệt mới
    window.open(this.href);
    return false;
  }
}
```

Trong đoạn mã JS này, từ `this` sẽ đại diện cho đối tượng HTML mà người dùng đang thao tác, cụ thể là những cặp thẻ *<a></a>* với mục đích điều hướng đến những trang bên ngoài.

## Tại sao nên làm như vậy?

Có rất nhiều lý do để lập trình viên web quyết định sử dụng Unobtrusive JavaScript. Từ cách cài đặt như trên, chúng ta có thể thể việc bảo trì code, cập nhật chức năng mới là thuận tiện và dễ dàng hơn nhiều. Tuy nhiên, lợi ích của kĩ thuật này không chỉ dành riêng cho lập trình viên mà nó còn hướng đến người dùng nữa.

Khi một người dùng truy cập trang của bạn, bạn sẽ không thể đảm bảo rằng thiết bị, trình duyệt hoặc kết nối của họ là đủ tốt để có được trải nghiệm tốt nhất đối với sản phẩm mà bạn đã kì công xây dựng. Những trình duyệt cũ có thể sẽ không thực thi code phía client vì chúng không hỗ trợ phương thức JS `getElementsByClassName`, từ đó dẫn đến đoạn script ở trên bị vô hiệu hóa. Như vậy, để có thể cài đặt kĩ thuật Unobtrusive đầy đủ, chúng ta nên tùy chỉnh lại đoạn script ở trên để nó tương thích cả với những trình duyệt cũ, hoặc sử dụng một cách khác dễ dàng hơn, ví dụ như làm việc với thư viện [jQuery](https://blog.teamtreehouse.com/beginners-guide-to-jquery).

Đối với vấn đề kết nối internet, bạn nên đặt code JS ở cuối trang HTML, để ưu tiên cho việc tải code HTML và CSS trước.

Một trường hợp phổ biến khác nữa, ấy là những thiết bị đọc màn hình dành cho người khiếm thị, thường vô hiệu hóa hoặc không hỗ trợ đầy đủ cú pháp JavaScript. Khi này, việc ưu tiên để nội dung được tải về đầy đủ là rất quan trọng.

## Kết luận

Kĩ thuật Unobtrusive JavaScript sẽ giúp cho nhiều người dùng có thể tiếp cận với nội dung website của bạn hơn, từ đó mang lại lợi ích cho tất cả các bên: chính bạn, ông chủ của bạn, khách hàng của bạn. Đây là một giải pháp win-win. Vì vậy, hãy cố gắng sử dụng kĩ thuật này hợp lý và nhiều nhất có thể để tạo nên những ứng dụng thật chất lượng bạn nhé.

## Tài liệu tham khảo

[1] [What is Unobtrusive JavaScript and Why it’s Important?](https://blog.teamtreehouse.com/unobtrusive-javascript-important)

[2] [Unobtrusive JavaScript](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript)

[3] [The principles of unobtrusive JavaScript](https://www.w3.org/wiki/The_principles_of_unobtrusive_JavaScript)