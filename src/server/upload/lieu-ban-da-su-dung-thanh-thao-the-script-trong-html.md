## Giới thiệu về thẻ `<script>`
Như chúng ta đã biết một website hiện nay không thể thiếu 3 thành phần là HTML, CSS và Javascript. Chúng ta thường import file javascript bằng thẻ `<script>` với cách sử dụng như sau
```html
<script src="index.js"><script/>
```
Ô vậy thì thẻ script chỉ có 1 attribute đơn thuần là src thôi ư? Chúng ta hãy cùng nhau tìm hiểu trong bài viết này nhé

## Cách thẻ `<script>` hoạt động
Chúng ta sẽ cùng quy ước như sau
![](https://viblo.asia/uploads/c5905e76-d17e-41c8-a812-33c5f4688449.jpg)
- Màu xanh lá cây sẽ là lúc trình duyệt dịch mã html
- Màu xám là quá trình dịch html bị ngưng lại
- Màu tím là tải script js từ nguồn
- Màu đỏ là thực hiện js

Nếu ta sử dụng `<script>` với cách sử dụng trên
```html
<script src="index.js"></script>
```
ta sẽ có sơ đồ quá trình như sau
![](https://viblo.asia/uploads/5852381b-e5d4-4fe5-a047-3a0db777aa26.jpg)
Với 1 thẻ `<script>` không có thuộc tính gì thì khi dịch html đến đoạn gặp phải thẻ `<script>` thì quá trình dịch html tạm thời bị ngưng lại và bắt đầu load js về, chạy script js hoàn tất mới tiếp tục chạy đoạn code dưới

Ví dụ như sau
```js
//index.js
var btn = document.createElement("BUTTON");   // Create a <button> element
btn.innerHTML = "CLICK ME";                   // Insert text
document.body.appendChild(btn);               // Append <button> to <body>
```
Nếu ta dùng đơn thuần `<script>` thì sẽ có kết quả như sau
![](https://scontent.fhan2-4.fna.fbcdn.net/v/t1.15752-9/61029189_1359337314223795_6320824634182729728_n.png?_nc_cat=110&_nc_oc=AQmi5Td8wwFN-guG5Qz4Yv55AKTVoM7CRWHKMwV80IYeK3BU7g63QP7lbx-nt358jas&_nc_ht=scontent.fhan2-4.fna&oh=65e680b9747402d1cde663dc6c58b6d6&oe=5D990770)

> Vậy thì tại sao phải quan tâm đến các thuộc tính của thẻ js?
Bài toán đặt ra là ví dụ bạn cần tương tác DOM với `<div>B</div> ` chẳng hạn mà thẻ js được load trước vậy thì làm gì có thẻ đó để tương tác dom. Nếu sử dụng thẻ `<script>` đơn thuần gây ra 1 hiện tượng gọi là Blocking khiến web phải chờ đoạn script thực hiện mới có thể xem được nội dung

## Giới thiệu các thuộc tính của thẻ `<script>`
>Theo mình tìm hiểu thì thẻ `<script>` sẽ có 2 thuộc tính là **async** và **defer**

#### Thẻ `<script async>`
Trước hết hãy cùng nhìn vào sơ đồ quá trình thẻ này hoạt động
![](https://viblo.asia/uploads/2faa7c65-59e8-4d03-a28d-9a7e38ab7720.jpg)
Đối với thẻ script có thuộc tính async, trong quá trình trình duyệt dịch html gặp thẻ này thì nó vẫn sẽ tiếp tục dịch html cho đến khi script được tải thành công về, lúc này trình duyệt sẽ tạm ngừng để chạy script. Quá trình chạy script kết thúc trình duyệt tiếp tục dịch đoạn html bên dưới. Điều này sẽ giúp bạn có thể giúp bạn tiết kiệm được thời gian vì quá trình blocking giảm xuống chỉ còn là lúc chạy script thay vì cả tải script như trên

#### Thẻ `<script defer>`
![](https://viblo.asia/uploads/f266a70a-69b9-4196-a40a-691bc079c426.jpg)
Với thẻ script có thuộc tính defer, quá trình dịch html sẽ không bị dừng lại mà sẽ tiếp tục dịch cho đến khi hoàn thành, quá trình download các script file được tiến hành song song, và cuối cùng thì sẽ thực hiện những script code này khi html đã dịch xong.

## Vậy khi nào nên sử dụng thuộc tính 
Có một số nguyên tắc như sau
- Nếu script là độc lập, không phụ thuộc vào các script khác thì nên sử dụng async cho load và thực thi với trang luôn
- Nếu script bị phụ thuộc vào các script khác thì dùng defer để load và thực thi theo thứ tự
- Nếu script nhỏ, các script các phụ thuộc vào nó thì chỉ cần inline, không cần thuộc tính

## Lợi ích
Với những thuộc tính script có thể giúp bạn cải thiện tới 40% tốc độ load web và mang lại trải nghiệm tốt hơn với người sử dụng đấy