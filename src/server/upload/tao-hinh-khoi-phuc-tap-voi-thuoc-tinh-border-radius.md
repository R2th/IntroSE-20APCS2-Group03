Bằng việc set 8 giá trị tham số trong border-radius, chúng ta có thể tạo ra các hình khối phức tạp nhưng khá thú vị. 

### 1. Trường hợp chỉ có 1 giá trị (single value)

Hãy bắt đầu với cơ bản trước. Chắc hẳn bạn đã quen thuộc với thuộc tính border-radius trong CSS. Bình thường, border-radius chủ yếu được sử dụng với 1 giá trị, ví dụ như: border-radius: 1em;
Trong trường hợp này, tất cả các góc đều được bo tròn như hình dưới:

![](https://images.viblo.asia/945dfc85-a63e-4037-bfd9-082152663b8c.png)

Có thể thấy trong ví dụ trên, giá trị của tham số có thể tính theo đơn vị chiều dài (px, rem, em) hoặc %. Ví dụ nếu muốn tạo một hình tròn, ta có thể sử dụng border-radius: 50%. Độ cong của các góc sẽ phụ thuộc vào chiều rộng và chiều cao của phần tử. Nhưng nếu áp dụng để vào hình chữ nhật, sẽ thấy rằng các góc không còn đối xứng nữa. Dưới đây là ví dụ cho thấy sự khác biệt giữa việc sử dụng border-radius: 110px và border-radius: 30% áp dụng trên hình chữ nhật:

![](https://images.viblo.asia/c25c7a0a-39d7-4f2a-8ac6-51978b50625c.png)

### 2. Trường hợp với 4 giá trị khác nhau (four different values)

Set 4 tham số khác nhau cho 4 góc, lần lượt theo chiều kim đồng hồ bắt đầu từ góc trên cùng phía bên trái. Cũng có thể kết hợp % với các giá trị đơn vị chiều dài (px, rem, em).

![](https://images.viblo.asia/ac5bd433-3f14-4c92-8fdb-46032b8aad64.png)

### 3. Trường hợp với 8 giá trị và được phân tách bằng "/":

Điều gì sẽ xảy ra nếu tách các tham số bằng dấu "/" và set tối đa 8 tham số? Định nghĩa cho thấy rằng:

> Các giá trị được đặt trước dấu "/" sẽ xác định chiều rộng các góc của phần tử và các giá trị được đặt sau dấu "/" sẽ xác định chiều cao các góc của phần tử. Nếu không có dấu "/". các giá trị sẽ set các bán kính đều nhau -- W3C
> 
Nhưng điều đó có nghĩa là gì? Chúng ta sẽ có các giá trị tuyệt đối khác nhau cho các khoảng cách ngang và dọc và các góc bo tròn không đối xứng. Đây chính là kết quả của việc sử dụng cú pháp "/".

Vì thế, khi so sánh giữa border-radius: 4em 8em; và border-radius: 4em / 8em; sẽ thấy hai kết quả khác nhau:

![](https://images.viblo.asia/5d4e3fba-0805-41f7-9133-0dab49277444.png)

*Các góc bo tròn của hình bên trái thuộc một phần tư của hình tròn, còn các góc bo tròn của hình bên phải thuộc một phần của hình ellipse.*

Và thử đổi thành % xem, có thể tạo ra những hình khối phức tạp như này chẳng hạn:

![](https://images.viblo.asia/0e9c4873-d9ea-48de-aacf-797fa15530e8.png)

![](https://images.viblo.asia/7c5c1449-e808-42fe-9f30-ba952a0e1649.png)

*Nhìn hình thấy rằng bốn hình ellipse chồng lên nhau để tạo ra được kết quả cuối cùng.*

Tham khảo tool từ tác giả bài viết gốc: [tại đây](https://9elements.github.io/fancy-border-radius/)

Link bài viết tham khảo [tại đây](https://9elements.com/io/css-border-radius/)