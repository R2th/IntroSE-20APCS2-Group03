Một mô hình phổ biến khi sử dụng bảng là các hàng được ẩn cho đến khi người dùng hiển thị chúng. Thật không may, mô hình thường quá phức tạp với các scrips và styles không cần thiết thường phá vỡ ngữ nghĩa của table hoặc không hoạt động trên tất cả các bối cảnh. Thông thường chỉ có hai điều chúng ta cần làm khi mở rộng hàng mà không làm mất ngữ nghĩa của table:
1.  Hãy chắc chắn rằng bạn sử dụng `display: table-row` thay vì `display: block`
2.  Sử dụng [Disclosure ](https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure) cho việc hiển thị hoặc ẩn đi các hàng.

{@embed: https://codepen.io/numberboo/pen/VwweOjz}

## Disclosure là gì?
Disclosure là một `button` kiểm soát việc hiển thị của một phần nội dung. Khi nội dung được kiểm soát bị ẩn nó thường được ***style*** như một `button` đặc trưng với mũi tên phải hoặc tam giác nhọn để gợi ý rằng khi nhấn vào `button` sẽ hiển thị thêm nội dung. Khi nội dung đã được hiển thị thì mũi tên hoặc tam giác sẽ trỏ xuống.

 Gợi ý nội dung có thể hiển thị thêm:
![Gợi ý nội dung có thể hiển thị thêm](https://images.viblo.asia/83baeca1-1764-485c-b9b5-b298222d326c.PNG)

Nội dung đã được hiển thị:

![](https://images.viblo.asia/0215dfae-8b74-4764-9dfb-fcc3e945e4df.PNG)

Giống với ví dụ phía trên, các nội dung thêm sẽ được kết nối thông qua giá trị `aria-label` của `button` và phần văn bản trong các cell để tạo ra 

Giá trị của  `aria-expanded` sẽ giúp các công nghệ hỗ trợ biết được nội dung do `button` đó kiểm soát đã được hiển thị hay chưa?

```html
<tr>
      <td>
          <button type="button" id="btn-toggle" class="btn-toggle" aria-expanded="false" onclick="toggle(this.id, '#id-1, #id-2');" aria-controls="id-1 id-2" aria-label="2 more from" aria-labelledby="btn-toggle id-master">
                <i class="fa fa-caret-right"></i>
          </button>
        </td>
      [...]
    </tr>
```

Và giá trị của `aria-controls` là một danh sách các `id` của `row` mà chúng ta đang kiểm soát. Lưu ý là không nên để giá trị của nó quá dài khi được đọc cho người dùng sử dụng **screen reader**. Nếu nó thực sự dài bạn có thể bỏ qua nhưng `aria-controls` rất có ích cho **screen reader** nên hãy sử dụng nó hiệu quả.
## CSS
Chúng ta có thể dễ dàng style cho các trạng thái của button thông qua attribute `[aria-expanded="true|false"]`, chỉ thay đổi icon của `button`.

```css
.btn-toggle[aria-expanded="true"] i{
  transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}
```

## Scripts
Các hàm xử lý cũng không có gì đặc biệt, nó sẽ lấy danh sách tất cả các id và `querySelector` đến các id này, đồng thời cũng query đến id của  `button`. Chúng ta sẽ kiểm tra giá trị `aria-expanded` của `button` để thay đổi `class` của các hàng `button` đó kiểm soát thành `hide` hoặc `show`.

Đoạn scripts bên dưới đây vẫn chưa thể sử dụng trong để build các sản phẩm vì Internet Explorer không hỗ trợ  `classList` cho các phiên bản IE 11 trở xuống. Hãy thêm các polyfill hoặc sử dụng jQuery thay thế.

```javascript
function toggle(btnID, rowIDs){
  var btnToggle = document.getElementById(btnID);
  var rowHiddens = document.querySelectorAll(rowIDs);
  
  var ariaExpanded = btnToggle.getAttribute('aria-expanded');
  if(ariaExpanded === 'false'){
    console.log(rowHiddens);
    for(let row of rowHiddens){
      row.classList.remove('hidden');
      row.classList.add('show');
    }
    btnToggle.setAttribute('aria-expanded', 'true');
  }
  else{
    for(let row of rowHiddens){
      row.classList.remove('show');
      row.classList.add('hidden');
    }
    btnToggle.setAttribute('aria-expanded', 'false');
  }
}
```
## Kết luận
Bài viết trên mình muốn giới thiệu về một cách sử dụng bảng phổ biến sao cho ngữ nghĩa của bảng không bị thay đổi hoặc mất đi. Bài viết cũng không thể tránh khỏi những thiếu sót nên mong mọi người có thể bỏ qua và hãy để lại ý kiến cho mình nếu thấy nhầm lẫn ở đâu đó để giúp mình rút kinh nghiệm.

Mọi người có thể truy cập vào link [https://adrianroselli.com/2019/09/table-with-expando-rows.html](https://adrianroselli.com/2019/09/table-with-expando-rows.html) để có thể tham khảo chi tiết hơn.

Cảm ơn mọi người đã đọc bài viết!