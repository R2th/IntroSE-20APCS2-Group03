Là một lập trình viên khi làm việc với JavaScript thì chắc chắn bạn đã từng sử dụng `console.log() `để debug code. Nó hoàn toàn đúng, không có gì để bàn cãi cả.  Nhưng có thể bạn chưa biết, ngoài phương thức `log()`, đối tượng **console** còn những method khác cũng khá hữu ích. Và trong bài viết này, tôi sẽ giới thiệu tới các bạn một số method hữu ích đó.

### Một số phương thức trong đối tượng console.

Đối tượng `console` trong JavaScript cung cấp quyền truy cập vào `browser debugging console` - nơi bạn có thể in ra giá trị của các biến mà bạn đã sử dụng trong code. Thông thường, điều này có thể được sử dụng để debug code của bạn.

#### 1. console.log()

Method này được sử dụng để in giá trị của biến được chuyển tới Console. Bất kể kiểu dữ liệu nào cũng có thể sử dụng được trong log(), có thể là string, object, array...etc

Ví dụ:

![](https://images.viblo.asia/ec219fd9-6c34-4cc9-ae6d-53997ce7fca6.png)

#### 2. console.error()

Phương thức này được sử dụng trong việc kiểm tra code. Nó được sử dụng để log errors vào Browser Console. Theo mặc định, error message sẽ được hightlight bằng màu đỏ.

Ví dụ:

![](https://images.viblo.asia/2a171685-be25-4e9f-9c31-05d4d6a073ec.png)

#### 3. console.warn()

Cũng giống như method error(), phương pháp này cũng được sử dụng để kiểm tra code. Thông thường, nó giúp đưa ra các cảnh báo đến Console. Theo mặc định, thông báo cảnh báo sẽ được tô màu vàng.

Ví dụ:

![](https://images.viblo.asia/59d50adb-ba64-4e9f-9ac3-46c4051cdfd3.png)

#### 4. console.clear()

Phương thức sử dụng để xóa Console. Nó thường được sử dụng nếu Console bị tắc nghẽn với messages/errors. Console sẽ bị xóa và hiển thị thông báo *Console was cleared*.

Ví dụ:

![](https://images.viblo.asia/2571f857-e0c3-43b3-9366-f81cb0380ce4.png)

#### 5. console.time() and console.timeEnd()

Hai phương thức này được sử dụng kết hợp với nhau. Bất cứ khi nào bạn muốn biết lượng thời gian dành cho một block hoặc function, bạn có thể dụng 2 phương thức time() và timeEnd().

Cả 2 phương thức nhận vào một string làm tham số. Hãy đảm bảo rằng, bạn sử dụng cùng một string cho cả 2 method này.

Ví dụ:

![](https://images.viblo.asia/2318b210-566b-48f7-8a46-d74606c295fe.png)

#### 6. console.table()

Phương thức này tạo ra một bảng trong Console, để dễ dàng đọc hơn. Một bảng sẽ được tạo tự động cho một mảng hoặc một đối tượng.

Ví dụ:

![](https://images.viblo.asia/e2a63a8b-2b1f-4704-a07e-92ceedcead3f.png)

#### 7. console.count()

Phương pháp này được sử dụng để đếm số mà hàm đánh vào phương pháp đếm này. Điều này có thể được sử dụng bên trong một vòng lặp để kiểm tra xem một giá trị cụ thể đã được thực thi bao nhiêu lần.

Ví dụ:

![](https://images.viblo.asia/a3b2a7d8-4ccf-4828-a1a0-5d47a94b7acf.png)

#### 8. console.group() and console.groupEnd()

Hai phương thức này cho phép chúng ta nhóm các nội dung bên trong một block riêng biệt, block sẽ được thụt vào. Giống như 2 phương thức time() và timeEnd(), hai phương thức này cũng nhận vào cùng một string làm tham số. Bạn có thể mở rộng hoặc thu gọn group.

Ví dụ:

![](https://images.viblo.asia/14e84fd6-e3b2-45e3-9b59-5920f6e795c2.png)

#### Bonus : Styling your logs

Bạn có thể thêm style cho Console log để làm cho nó ngầu hơn. Nó rất dễ dàng, bạn chỉ cần thêm CSS style như một tham số thứ 2 cho method log(), trong khi bắt đầu tham số đầu tiên với %c. CSS style sẽ thay thế %c trong Console.

Ví dụ:

![](https://images.viblo.asia/b593ba4b-e87a-4dd8-81aa-46b006541db6.png)

### Kết luận

Đối tượng console rất hữu ích cho các lập trình viên để có thể debug code. Chúng ta là nhà phát triển thường chỉ sử dụng chức năng log(). Hãy bắt đầu sử dụng tối đa khả năng của đối tượng console để debug dễ dàng hơn và xem nhật ký trình duyệt một cách sinh động. Tôi hy vọng bài viết này là hữu ích.

Thank you for reading!