## I. Giới thiệu về Google sheet 
- Google Sheet là một công cụ miễn phí. 
- Google Sheet được sử dụng gần giống như Excel. 
- Google có một số thủ thuật tuyệt vời giúp việc sử dụng Google sheet trở nên nhanh chóng và hiệu quả hơn. Dưới đây là một vài thủ thuật tiêu biểu. Mong là sẽ giúp ích được cho mọi người 

## II. Một số thủ thuật
### **1. Phím tắt trong Google sheet**
- Một số phím tắt hay dùng:

Copy: Ctrl + C or Ctrl + Insert 

Cut: Ctrl + X

Paste: Ctrl + V 

Paste format only: Ctrl + Alt + V

Redo: Ctrl + Y

- Để xem được cụ thể danh sách các phím tắt của Google sheet cần thực hiện thao tác sau: 
Bấm vào Menu Help => chọn Keyboard Shortcuts => danh sách sẽ được hiển thị ra
![](https://images.viblo.asia/d6a18f06-a2f0-4dae-97f0-d6e1ff5ce40d.png)
- Chúng ta có thể search các phím tắt của các chức năng ngay trên Keyboard Shortcuts
 ![](https://images.viblo.asia/5f8eb5ec-bcb7-4cc0-a5aa-8572ed6059ef.png)

### **2. Chèn ảnh vào ô**
Có 2 cách:
- Cách thông thường:
Bấm vào Insert => Image => Chọn **Image in cell** cho trường hợp muốn chèn ảnh vào ô, chọn **Image over cells** cho trường hợp muốn chèn ảnh ngoài ô. 
![](https://images.viblo.asia/9b2b731a-78c2-4403-9e02-37c8e28295a5.png)
- Dùng hàm Image:
=image(“đường dẫn URL tới ảnh”,1) – ảnh tự thay đổi kích thước để vừa với ô
=image(“đường dẫn URL tới ảnh”,2) – ảnh tự giãn ra để hiển thị đầy ô
=image(“đường dẫn URL tới ảnh”,3) – ảnh giữ nguyên kích thước nguyên bản
=image(“đường dẫn URL tới ảnh”,4) – ảnh với kích thước tự chọn

![](https://images.viblo.asia/47795111-6967-4d6b-a81b-473790409a88.png)

### **3. Tạo QR Code**
- QR code là mã vạch 2 chiều dùng để mã hoá 1 thông tin như là số điện thoại, địa chỉ email hoặc URL hoặc 1 số thông tin khác. 
- Để thực hiện việc mã hoá này chúng ta sẽ sử dụng hàm Image. 

### **4. Lấy giá trị duy nhất trong cột**
- Dùng hàm Unique
- Công thức: = Unique (bôi đen số ô muốn lấy giá trị unique)
Ví dụ: Unique (A2:A15)
![](https://images.viblo.asia/b02c214a-7cfa-4fdc-9a26-d817c01baad7.png)

### **5. Lấy thông tin và dữ liệu từ 1 trang web**
- Dùng hàm IMPORTXML
- Cách sử dụng:
Ví dụ: cần lấy giá của 1 sản phẩm trên Tiki về Google sheet

**a. Bấm chuột phải và chọn Inspect**

![](https://images.viblo.asia/6baf27e7-8bd3-4776-915f-6d259cf314ab.png)

**b. Click vào giá và sẽ thấy hiển thị như hình sau:**

![](https://images.viblo.asia/c645ca8e-8a9a-4d6e-8d19-bcbe33b26f13.png)

**c. Nhấn chuột phải vào dòng code và chọn Copy => copy Xpath**

![](https://images.viblo.asia/48b666cf-cd26-44f2-addc-f6c8df7d8131.png)

**d. Nội dung copy được sẽ là:**

**//*[@id="next"]/div[1]/main/div[2]/div[2]/div/div[3]/div/span[1]**

Để dùng được trong Google sheet cần thay " thành ' 
**//*[@id='next']/div[1]/main/div[2]/div[2]/div/div[3]/div/span[1]**

**e. Quay lại Google sheet, gắn link sản phẩm vào cột Link sản phẩm và input công thức** 

IMPORTXML(A2,"//*[@id='__next']/div[1]/main/div[2]/div[2]/div/div[3]/div/span[1]")

ở ô cần cho hiển thị giá

**f. Giá sản phẩm sẽ được tự động hiển thị và chúng ta có thể dễ dàng theo dõi được giá cả sản phẩm realtime**

### **6. Nhận dạng ngôn ngữ**
- Google sheet có khả năng nhận dạng ngôn ngữ do được tích hợp với các dịch vụ của Google.
- Công thức: 
= detectlanguage (cột muốn nhận dạng ngôn ngữ)
Ví dụ: = detectlanguage (A1) 
=> sau đó sẽ show ra ngôn ngữ mà Google sheet đã nhận dạng được 

![](https://images.viblo.asia/676e50f7-27bf-48ef-b7fe-bd9b3d03af9e.png)

### **7. Translate**
- Dùng hàm GOOGLETRANSLATE() 
- Cách sử dụng: 
Phần trong () gồm 3 tham số:
+ Đoạn văn bạn muốn dịch
+ Ngôn ngữ của đoạn văn bạn muốn dịch
+ Ngôn ngữ bạn muốn dịch ra
Ví dụ: GOOGLETRANSLATE (A1, ja, en)
![](https://images.viblo.asia/28dfe410-f106-4d22-a83f-9fcc1c125f86.png)

### **8. Thêm ký tự đặc biệt**
- Dùng hàm CHAR ()
- Danh sách các ký tự đặc biệt có thể thêm:
Tham khảo tại trang: https://graphemica.com/unicode/characters/page/2
Ví dụ: = char (169)
![](https://images.viblo.asia/460773d0-13f0-4543-9193-bd775c6e31f0.png)

### **9. Kiểm tra URL**
- Dùng hàm isurl (ô muốn kiểm tra)
Ví dụ: 
![](https://images.viblo.asia/2b52f2bf-6125-42aa-8695-252528a59b19.png)

### 10. Làm gọn văn bản 
Dùng các hàm:
+ UPPER - chuyển tất cả các dữ liệu thành viết hoa
+ LOWER - chuyển tất cả các dữ liệu thành chữ thường
+ TRIM - loại bỏ hàng đầu và trống trong dữ liệu

Ví dụ: cho case dùng hàm UPPER
![](https://images.viblo.asia/fb2851b9-80f2-47a6-9479-053b43f5d5a6.png)