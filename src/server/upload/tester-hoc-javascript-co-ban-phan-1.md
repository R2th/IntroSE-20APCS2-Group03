:high_brightness: Hello mọi người, hôm nay mình sẽ viết về 1 đề tài không còn mới mẻ nhưng là kiến thức lần đầu mình tìm hiểu đến  - đó chính là tìm hiểu về Javascript

Về ngôn ngữ javascript đối với 1 tester thì không có giá trị lắm, tuy nhiên nếu bạn đã từng học và làm về mảng automation test thì biết javascript có 1 lợi thế vô cùng lớn, việc code sẽ nhanh gọn và thuận tiện hơn rất nhiều, thêm vào đó là việc bạn chạy theo kịp công nghệ cũng được đánh giá cao về tinh thần học hỏi và thăng tiến trong công việc :leaves: 

Bài viết này mình viết là để tự học chứ chưa có bất kỳ kinh nghiệm nào về javascript, sau khi hiểu được nó thì mình sẽ viết 1 hoặc 1 số bài để áp dụng nó vào việc automation test. Nếu bạn có bất kỳ góp ý nào cho mình thì hãy comment ở phần bình luận phía dưới để mình cải thiện hơn nhé ! :smile: 

### 1. Javascript là gì
> JavaScript là một ngôn ngữ lập trình website, được tích hợp và nhúng trong HTML giúp website sống động hơn`
> 
### 2. Công cụ & môi trường
- Trình duyệt Chrome
- Visual studio code 

Bạn lựa chọn bản cài theo hệ điều hành của máy tương ứng trên trang chủ của visual studio code: https://code.visualstudio.com/download

Sau đó cài đặt bình thường

Sau khi cài đặt thành công - mở Visual studio code lên và bắt đầu cài extention Live server

- Add extention Live server
![](https://images.viblo.asia/ad4a0b82-05c8-4e7c-9619-f2d1fbfde210.PNG)
Sau khi cài đặt thành công thì tắt và khởi động lại visual studio code

### 3. Sử dụng javascript trong HTML

Đầu tiên bạn mở Visual studio code lên và  add 1 folder mới, ở đây mình đặt tên là "Javascript_1"

Bầy giờ bạn cần tạo 2 file nằm trong folder vừa tạo đó là: 1 file đuôi html và 1 file đuôi js (thường sẽ đặt là index.html và main.js)

Đây là 2 file mà chúng ta sẽ sử dụng trọng suốt quá trình học tập về javascript cơ bản này :money_mouth_face: 


Trong file html sẽ là nơi chứa code ui, bố cục trình bày giao diện. Trong visual studio code đã hỗ trợ gợi ý khi gõ code nên trong file index bạn chỉ cần gõ html:5 và ENTER thì ứng dụng đã gen ra 1 đoạn template có sẵn

![](https://images.viblo.asia/724e650f-797d-4f43-8270-88ee20c52005.PNG)

Để file main.js có thể chạy được trong file html vừa tạo ở trên thì ra chèn đoạn code `<script src="./main.js"></script>` vào giữa thẻ <body>
    
Để test thử xem file main.js đã nhúng thành công trong file html hay chưa thì ở file main.js ta thêm đoạn code alert('hello javascript') để thử nha
    
   Muốn chạy file html ta click vào biểu tượng Go Live ở góc dưới bên phải màn hình
    
   ![](https://images.viblo.asia/abc4595e-a717-4d0f-8e60-4d761f222f89.PNG)
   Dưới đây là demo của mình 
    
   ![](https://images.viblo.asia/c9a2dae4-f451-4f98-9261-3ec1f7092285.gif)
    
    
### 4. Khai báo biến
    
   Để khai báo biến ta dùng từ khóa: var (là viết tắt của từ variable)
    
   Lưu ý biến có phân biệt ký tự hoa thường, chữ, số. Tuy nhiên ký tự bắt đầu phải là chữ
    
   ví dụ:
    
   ```
var companyName = 'Sun Assterisk Viet Nam';
    
   alert(companyName);
```
###  5. Comment trong javascript
    
 - Mục đích sử dụng để ghi chú hoặc vô hiệu hóa code, sử dụng ký tự  // để comment trên 1 dòng
    Có 2 loại comment là comment 1 dòng và comment nhiều dòng:
    + sử dụng ký tự // comment: để comment trên 1 dòng
    + sử dụng ký tự /* comment */: để comment trên nhiều dòng

    
### 6. Một số hàm built-in 
    
  Là các hàm được xây dựng sẵn trong javascript, trên thực tế các hàm được xây dựng sẵn sẽ rất nhiều, tuy nhiên ở đây mình giới thiệu các hàm cơ bản hay dùng nha:
    
   - Alert 
      ví dụ: alert('hello Sun');
    
   - Console: Hàm console có các phương thức mà nó dùng để in ra những dòng thông báo bên tab Console
    
      ví dụ: `console.log(companyName);`
    
   ![](https://images.viblo.asia/593602fc-fa93-44ed-a30f-e5bb246d8c9a.PNG)
    
  - Confirm: Là 1 dialog xác nhận - mặc định có 2 button OK và Cancel
    ![](https://images.viblo.asia/53f2a0d2-a35e-4e1c-9e4d-30e227194fab.PNG)
    
  - Prompt: Là dialog có thêm textbox, dùng trong các trường hợp yêu cầu nhập authenticate, mã code...
    ![](https://images.viblo.asia/1db3b5b4-0ebf-4851-bd2d-9ff54abfd27a.PNG)
    
    Trên đây là bài viết về javascript cơ bản (Phần 1). Cảm ơn bạn đã đọc và đón chờ nhiều điều ở phần 2 nhé :heart_eyes: