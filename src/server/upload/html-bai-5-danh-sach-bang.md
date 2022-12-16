Giờ thì bạn đã khá quen thuộc với HTML rồi, do đó chúng ta sẽ đi nhanh qua bài hướng dẫn này thôi.
Danh sách và bảng biểu là những phương thức phổ biến nhất để thể hiện nội dung dữ liệu.
Hãy cùng tạo một vài danh sách và bảng dữ liệu trong HTML.

## Tạo danh sách và bảng dữ liệu

Có 3 kiểu danh danh sách trong HTML:

- Danh sách ngẫu nhiên, không thứ tự
- Danh sách có thứ tự
- Danh sách dạng định nghĩa

Loại danh sách cuối cùng rất hiếm khi được sử dụng, do đó chúng ta sẽ nói về 2 loại danh sách đầu tiên và bảng dữ liệu.

### Danh sách ngẫu nhiên

Để tạo ra một danh sách ngẫu nhiên, không thứ tự, đầu tiên chúng ta cần tạo một `container` sử dụng các thẻ `<ul></ul>`.
Thẻ này có tên gọi đầy đủ là `unordered list`, dịch nôm na là danh sách không được sắp xếp thứ tự.
Kế đến là chúng ta cần liệt kê các thành phần sử dụng các thẻ `<li></li>` hay `list item` (phần tử của danh sách).

```unordered.html
<ul>
    <li>Rose</li>
    <li>Clover</li>
    <li>Lotus</li>
</ul>
```

### Danh sách có thứ tự

Việc khởi tạo một danh sách có thứ tự cũng khá tương đồng.
Lúc này `container` ở phía bên ngoài được thay thành `<ol></ol>` hay `ordered list` (danh sách đã được sắp xếp).

```ordered.html
<ol>
    <li>Lotus</li>
    <li>Clover</li>
    <li>Rose</li>
</ol>
```

### Bảng dữ liệu

Bảng dữ liệu trong HTML được tạo ra bằng các hàng ghép lại với nhau. Dưới đây là các bước để tạo bảng:

- Tạo một `container` cho bảng bằng `<table></table>`.
- Tạo ra các hàng dữ liệu của bảng bằng `<tr></tr>` hay `table row` (hàng của bảng).
- Bên trong mỗi hàng dữ liệu, thêm vào các ô dữ liệu bằng `<td></td>` hay `table data` (dữ liệu của bảng).
- Đối với những ô mà bạn muốn sử dụng làm tiêu đều của hàng hay tiêu đề của cột, có thể sử dụng `<th>` thay cho `<td>`.

```table.html
<table>
   <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Place</th>
   </tr>

   <!-- Hàng ở phía trên được dùng làm tiêu đề -->
  
   <tr>
      <td>Methuselah</td>
      <td>4,800</td>
      <td>California</td>
   </tr>

   <tr>
      <td>Senator</td>
      <td>3,500</td>
      <td>Florida</td>
   </tr>

   <tr>
      <td>Sarv-e Abarqu</td>
      <td>4,000</td>
      <td>Iran</td>
   </tr>
</table>
```

Ngoài ra thì các phần tử `th` và `td` còn có thể được gắn một vài thuộc tính để mở rộng theo hàng hoặc theo cột.
Đây là một vài liên kết tham khảo về các thuộc tính mở rộng:

- Thuộc tính [colspan](https://www.w3schools.com/tags/att_colspan.asp) mở rộng ô dữ liệu theo cột.
- Thuộc tính [rowspan](https://www.w3schools.com/tags/att_rowspan.asp) mở rộng ô dữ liệu theo hàng.

### Viết chú thích trong HTML

Trong ví dụ trước, có một dòng code không được hiển thị khi bạn mở tệp HTML bằng trình duyệt:

`<!-- Hàng ở phía trên được dùng làm tiêu đề -->`

Dòng này được sử dụng để chú thích trong văn bản HTML mà không ảnh hưởng đến kết quả hiển thị
đầu ra của trang web. Nó được gọi là một `comment` hay chú thích.

Một chú thích trong HTML được tạo ra bằng cách sử dụng một thẻ mở `<!--` và một thẻ đóng `-->`.

Một lợi ích khác của việc sử dụng các chú thích trong code HTML đó là chúng ta có thể tạm thời ngắt
một khối code mà không cần phải xóa hay di chuyển khối code đó tới nơi khác.

```comment.html
<table>
   <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Place</th>
   </tr>

   <!-- Hàng ở phía trên được dùng làm tiêu đề -->
  
   <tr>
      <td>Methuselah</td>
      <td>4,800</td>
      <td>California</td>
   </tr>

   <tr>
      <td>Senator</td>
      <td>3,500</td>
      <td>Florida</td>
   </tr>

   <!-- Tạm thời ngắt hàng dữ liệu cuối cùng
      <tr>
         <td>Sarv-e Abarqu</td>
         <td>4,000</td>
         <td>Iran</td>
      </tr>
   -->
</table>
```

[[HTML] Bài 6 - Các Thẻ Định Dạng Chữ](https://viblo.asia/p/html-bai-6-cac-the-dinh-dang-chu-gGJ59rYPKX2)