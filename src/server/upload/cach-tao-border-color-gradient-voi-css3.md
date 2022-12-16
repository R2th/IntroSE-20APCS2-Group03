# Lời mở đầu:
Với tất cả các tính năng mới trong CSS3, giờ đây chúng ta có thể xây dựng các trang web hạn chế sử dụng hình ảnh. Trước đây, việc sử dụng hình ảnh là không thể tránh khỏi khi hiển thị màu gradient như background
Ngày nay, nó trở nên gọn gàng hơn rất nhiều với việc sử dụng CSS3 Gradient Background. 
Nhưng CSS3 Gradient không chỉ dừng lại để sử dụng làm background. Bạn có biết rằng bạn cũng có thể sử dụng nó trong border ? Hãy cùng tìm hiểu nó sẽ được làm thế nào.
# Phương pháp đầu tiên:
Phương pháp đầu tiên là bằng cách áp dụng Gradient CSS3 trong các phần tử giả. Hãy để ý xem cách thức hoạt động của nó
## Border Gradient từ trên xuống dưới
Chúng ta sẽ bắt đầu với một gradient đơn giản trải đều từ trên xuống dưới. Để bắt đầu, hãy tạo một khối có div, như sau:
```html
<div class="box"></div>
```
```CSS
    .box {
      width: 400px;
      height: 400px;
      background: #eee;
    }
```
Để tạo độ dốc trong đường viền hộp, trước tiên hãy đặt đường viền liền mạch ở phía trên và phía dưới của hộp. Chúng tôi cũng tạo 2 hình chữ nhật với 2 phần tử giả chỉ định chiều rộng có cùng kích thước với chiều rộng đường viền hộp.
Định vị các hình chữ nhật ở bên trái và bên phải của hộp và sử dụng gradient tuyến tính thông qua hình nền. Bạn có thể thấy thủ thuật này xuất hiện như thế nào dưới đây:
{@jsfiddle: https://jsfiddle.net/yo48u72a/}

## Border Gradient  trái sang phải

Bây giờ,  để tạo một gradient kéo dài sang trái và phải theo cách giống hệt với ví dụ trước. Chỉ có điều, lần này, chúng tôi sẽ thêm đường viền hộp ở bên trái và bên phải, thay vì ở trên và dưới.
Tương tự, chúng tôi cũng sử dụng phần tử giả để tạo hình 2 hình chữ nhật. Nhưng, trái với ví dụ trước, bây giờ chúng ta đặt chúng ở phía trên cùng và dưới cùng của hộp.
{@jsfiddle:https://jsfiddle.net/agusesetiyono/r544F/}
# Phương pháp thứ hai
Phương pháp thứ hai là bằng cách sử dụng thuộc tính CSS3 border-image. Các border-image  trong CSS3 cho phép chúng tôi để điền vào border với một hình ảnh cũng như CSS3 Gradient.
Các trình duyệt hỗ trợ cho border-image khá tuyệt vời; Chrome, Internet Explorer 11, Firefox, Safari và Opera đều có khả năng hiển thị đầy đủ border-image. Tuy nhiên, cần lưu ý rằng ý border-image chí chỉ hoạt động trên các hình dạng vuông hoặc hình chữ nhật.
Điều đó có nghĩa là thêm border-radius sẽ làm lệch border-image đầu ra.
Sau đây là các thuộc tính của border-image :
```CSS
border-image: <source> <slice> <width> <outset> <repeat|initial|inherit>;

```
Các <source> là link hình ảnh được sử dụng trong border. Ở đây, chúng tôi sẽ điền nó bằng CSS3 Gradient thay thế. Để đạt được đầu ra giống như trong các ví dụ trước, chúng tôi áp dụng Gradient CSS3 trong border-image, như sau.
```CSS
box{
  width: 250px;
  height: 250px;
  background: #eee;
  border: 20px solid transparent;
  -moz-border-image: -moz-linear-gradient(top, #3acfd5 0%, #3a4ed5 100%);
  -webkit-border-image: -webkit-linear-gradient(top, #3acfd5 0%, #3a4ed5 100%);
  border-image: linear-gradient(to bottom, #3acfd5 0%, #3a4ed5 100%);
  border-image-slice: 1;
}
```
Các border-image sẽ hiển thị không có gì nếu chúng ta không xác định border chiều rộng. Vì vậy, như bạn có thể thấy ở trên, chúng tôi thêm 20px chiều rộng đường viền với màu đường viền trong suốt. Sau đó, chúng tôi đặt giá trị của border-image và linear-gradient cùng với tiền tố của nhà cung cấp cho các phiên bản Webkit và Firefox trước đó.

Việc bổ sung các đường viền hình ảnh được hiển thị ở trên sẽ đặt các độ lệch bên trong của image-bordernội dung. Thuộc tính này là cần thiết để hiển thị gradient đầy đủ trong khu vực xung quanh của hộp. Xem đầu ra dưới đây:
{@jsfiddle:https://jsfiddle.net/agusesetiyono/796XC/7/}


# Nguồn: 
https://www.hongkiat.com/blog/css-gradient-border/