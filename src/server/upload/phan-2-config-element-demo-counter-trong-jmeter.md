## 1. Yêu cầu
Tưởng không cần mà lại cần không tưởng đó các bạn. Chúng ta cùng phân tích một yêu cầu đơn giản sau đây nhé: Trên trang web X, đăng nhập vào tài khoản của bạn và tạo 100 yêu cầu Y.
## 2. Kịch bản
Kịch bản của chúng ta cần những gì nào ? 

1. Cần 1 request để đăng nhập thành công vào tài khoản của bạn 
2. Cần 1 request để tạo thành công chức năng Y được yêu cầu

=> Vậy làm thế nào để tạo được 100 yêu cầu. Trong Jmeter đã cung cấp  Loop Count để bạn có thể thực hiện lặp lại các bước tuỳ ý. 

![](https://images.viblo.asia/dfeac94f-3f11-42f0-ae04-9ec6d2640e8f.png)

Tới bước này thì về cơ bản bạn đã hoàn thành xong bước phác thảo yêu cầu đó bạn. Nhưng bạn hãy nhìn ảnh result sau đây và đặt ra tình huống, trong lúc chạy vòng lặp, có 1 vài request bị fail và bạn thì không biết nó sai ở request thứ bao nhiêu.
![](https://images.viblo.asia/2210ddbb-b18a-4ea0-9c93-bf2054c136c2.png)
>  Trường hợp xấu nhất thì chúng ta sẽ ngồi đếm => Tuyệt vời, bạn có thể làm cách đó. Nhưng  chạy nhiều Thread Group thì tôi chắc bạn sẽ phải hoa mắt thôi. Vậy thì Counter chính là vị cứu tinh của chúng ta rồi :) 
## 3. Counter
### 3.1. Tìm hiểu
Để hiển thị Counter => Nhấp chuột phải => Chọn Config Element => Chọn Counter sẽ thấy hình giống như bên dưới ạ 
![](https://images.viblo.asia/05f916c2-8998-47f8-bc9c-e5600af23197.png)

- Staring value: Đây là số thứ tự, thông thường chúng ta sẽ đếm từ 1. Nếu để trống thì mặc định sẽ hiển thị là 0 
- Increment: Gía trị tăng, thông thường đếm 1 tới 2 tới 3 ... tới n+1 nên set là 1. Tham số này là bắt buộc nhập, nếu không thì result của bạn sẽ hiển thị là 1,1,1,1... Nhưng bạn có thể set là n+2. Điều này là tuỳ thuộc vào mong muốn của bạn :) 
- Maximum value: Là giá trị tăng theo vòng lặp. Thông thường nên set giá trị Maximum value = Loop Count. Nếu Thread = 2, Loop Count = 100 => Maximum value tốt nhất là 50. Giả sử Maximum value < Loop Count thì khi đếm tới Max sẽ đếm lại từ đầu
- Number format: Phụ thuộc vào vòng lặp giá trị là bao nhiêu. Nếu loop count = 100 thì set 000 => Khi chạy sẽ hiển thị 001, 002, 003,...
- Exported Variable Name: Nên set tên biến để gọi tới các request cần dùng
- Track counter independently for each user: Nếu có nhiều Thread Group sẽ ko uncheck
### 3.2. Cấu hình
- Từ những tìm hiểu bên trên. Giờ đây bạn có thể cấu hình như ảnh bên dưới này
![](https://images.viblo.asia/07697266-22ec-4a04-a2ef-a9b9e0962ec9.png)
- Sau đó, tại những request bạn cần đếm. Hãy gọi tham số count như những ảnh bên dưới 

![](https://images.viblo.asia/aa8b35c1-c59c-47f6-a59f-356ac73fba17.png)
Hình 1. Set count tại tên request
![](https://images.viblo.asia/2827da3c-c60a-4d2e-a609-f6957e908c1b.png)
 Hình 2. Thêm parameters trong body của request trên
###  View result 
 Giờ thì chạy thôi và sẽ thấy được kết quả như hình bên dưới. 
 ![](https://images.viblo.asia/58979104-83f6-4be1-90ec-e66f6512936d.png)