Như các bạn đã biết Ruby là một ngôn ngữ hiện nay đang dần được phổ biến trên thế giới và được rất nhiều công ty và lập trình viên sử dụng để thiết kế nhanh cho 1 Website. 
Ruby là ngôn ngữ lập trình kịch bản bởi mã lệnh của Ruby có thể chạy trực tiếp bởi máy tính mà không cần phải biên soạn thành một tệp thực thi tệp tin .exe trên Windows hay tệp tin binary trên Linux.
Sau đây mình xin chia sẻ sơ lược về những kiến thức cơ bản dành cho những người mới bắt đầu học về ngôn ngữ Ruby.
# 1. Biến trong trong Ruby
Biến trong Ruby gồm có InstanceVariables, ClassVariables, GlobalVariables, LocalVariables, ConstantVariables. <br>
**InstanceVariables :** bắt đầu bằng dấu @, nó thường được dùng làm biến trong hàm khởi tạo class <br>
  ![](https://images.viblo.asia/770c1c61-2f72-49d8-9c36-3176ccb602fc.png)  <br>
**ClassVariables:** dùng làm thuộc tính của class và bắt đầu bằng 2 dấu @@ <br>
![](https://images.viblo.asia/b0d9ed4c-ad32-4e55-842f-196e69747695.png) <br>
**GlobalVariables**: là biến toàn cục dùng ở mọi nơi ở ngoài hoặc ở trong class đều được và bắt đầu bằng dấu $ <br>
 ![](https://images.viblo.asia/5ba982b3-9470-4212-9f4d-02ab0c524652.png) <br>
**LocalVariables:** là biến cục bộ thường được dùng trong nội bộ hàm <br>
 ![](https://images.viblo.asia/994b72e3-ffc7-4d16-b84c-f4adbafc653d.png) <br>
**ConstantVariables**: là hằng số và bắt đầu bằng 1 chữ cái in hoa <br>
 ![](https://images.viblo.asia/1652d3c2-bbff-48f2-9fe3-13c6fca51a21.png) 
# 2. Các kiểu dữ liệu trong Ruby 
## a) Number
![](https://images.viblo.asia/d10b686e-6e39-416f-aa78-272a2681009c.png) <br>
Ruby gồm có các kiểu dữ liệu number cơ bản như số nguyên, số thực và các toán tử số học <br>
**Số nguyên:** Một chữ số nguyên chỉ đơn giản là một chuỗi các chữ số <br>
![](https://images.viblo.asia/594f6b5b-bb05-4e19-b112-1e17232f3efc.png) <br>
**Số thực :** Một ký tự dấu phẩy động là một dấu tùy chọn theo sau là một hoặc nhiều chữ số thập phân <br>
![](https://images.viblo.asia/dc35957c-beef-434b-9889-981f94fbee12.png) <br>
**Số học:** Tất cả các kiểu số trong Ruby đều xác định các toán tử +, -, * và / tiêu chuẩn cho các phép tính cộng, trừ, nhân và chia  và  toán tử % là biểu hiện cho chia lấy dư <br>
![](https://images.viblo.asia/5fd5c090-a37a-46c9-ba34-b54a97a252ba.png) <br>
**Dấu phẩy động và lỗi làm tròn:** có nhiều độ chính xác và có thể xấp xỉ 0,1, nhưng thực tế là con số này không thể được biểu diễn chính xác dẫn đến các vấn đề <br>
![](https://images.viblo.asia/592df07d-1399-4b9b-bf0e-50f099790eb0.png) <br>
## b) Text 
Ruby cung cấp khá nhiều Text được biểu diễn trong Ruby bởi các đối tượng của lớp String để nhúng các chuỗi theo đúng nghĩa đen vào chương trình của bạn. <br>
***Các cách nhúng chuỗi trong Ruby*** <br>
- Bằng dấu nháy đơn <br>
x  =  'This is a simple Ruby string literal' <br>
- Bằng dấu nháy đôi <br>
y =   "This quote begins with a tab and ends with a newline" <br>
**Mặc khác:**  <br>
- Các ký tự chuỗi được trích dẫn cũm có thể bao gồm các biểu thức ruby tùy ý bằng việc bắt đầu bằng # và được đặt trong dấy {} (biểu thức nội suy) <br>
z =  "360 degrees=#{2*Math::PI} radians"          # "360 degrees=6.28318530717959 radians" <br>
**Các hàm xử lí chuỗi thông dụng trong Ruby**
- In chuỗi ra màn hình <br>
 ![](https://images.viblo.asia/4602ae1c-fcc4-4eea-992f-d1d314ae2f79.png) <br>
- Truy cập vị trí index của 1 chuỗi  <br>
 ![](https://images.viblo.asia/0716e62d-30f0-44b1-af21-1a23ae8f7638.png) <br>
- So sánh chuỗi trong ruby <br>
 ![](https://images.viblo.asia/a84ad593-b207-4715-a669-591ab7a03460.png) <br>
- Nối chuỗi trong ruby <br>
 ![](https://images.viblo.asia/11d7bb5d-7aba-45a1-aa52-fba55c967081.png) <br>
- Cắt các chuỗi con trong 1 chuỗi thành các mảng <br>
 ![](https://images.viblo.asia/5da1bb09-3e86-4e0f-ba6e-0af97390e3f2.png) <br>
- Xóa khoảng trắng trước đầu và cuối chuỗi  <br>
 ![](https://images.viblo.asia/9f61442b-cae9-477d-9007-9598b3873a04.png) <br>
## c) Kiểu dữ liệu Symbol
Các đối tượng biểu tượng đại diện cho tên và một số chuỗi bên trong trình thông dịch Ruby. 
Chúng được tạo bằng cách sử dụng cú pháp nghĩa đen : name và: "string" và bằng các phương thức to_sym. <br>
 ![](https://images.viblo.asia/d4ab671b-9c75-4347-b098-b4752353c527.png) <br>
**Điểm khác nhau giữa String và Symbol** <br>
- Các vị trí index của String có thể thay đổi nhưng Symbol thì không <br>
 ![](https://images.viblo.asia/b7ad13a7-6f4d-4ddb-86ba-8e3567deab0e.png) <br>
- Symbol được sử dụng đối với những liệu cố định, ít bị thay đổi  như làm các key trong Hash <br>
 ![](https://images.viblo.asia/f80c914f-2188-4ac3-b70d-645cd70cad0a.png) <br>
# 3. Các vòng lặp thông dụng trong Ruby 
- Sử dụng vòng lặp với  in <br>
 ![](https://images.viblo.asia/bb684789-e8ee-47a4-adaf-4af7f8b8b419.png) <br>
- Sử dụng vòng lặp với each  <br>
 ![](https://images.viblo.asia/f872bfa8-7f35-4fc1-88b8-f3def1ddc216.png) <br>
- Sử dụng vòng lặp với break <br>
 ![](https://images.viblo.asia/35b0cd64-af31-4760-b75f-0b033af07c19.png) <br>
- Sử dụng vòng lặp untill với do <br>
 ![](https://images.viblo.asia/0fe0b343-e207-47bf-afa2-a8884d8b0bdc.png) <br>
- Sử dụng vòng lặp untill với  begin <br>
 ![](https://images.viblo.asia/ac6735e7-7b15-46d2-81af-80ddfcd0f72a.png) <br>
- Sử dụng vòng lặp while với do <br>
![](https://images.viblo.asia/e5bdf5b1-7baf-422d-ad31-8fc545ba8f63.png) <br>
- Sử dụng vòng lặp while với begin <br>
 ![](https://images.viblo.asia/660845f7-9572-471a-9446-16b094eb2a87.png) <br>
# 4. Biểu thức điều kiện trong Ruby
- Điều kiện if - else trong ruby <br>
 ![](https://images.viblo.asia/4f9b9979-a1ad-41fc-888e-e33c1549531f.png) <br>
 - Điều kiện case – when trong ruby <br>
 ![](https://images.viblo.asia/aaed4db7-ded2-4d59-a668-6a74b3d0aa31.png) <br>
 - Điều kiện unless trong  ruby <br>
 ![](https://images.viblo.asia/d693bec9-5cd3-4470-8957-b7d42fd82ad1.png) <br>
 ![](https://images.viblo.asia/db985c5a-53b3-4b6d-adc2-26475a684690.png) <br>
# 5. Kết luận
Qua những kiến thức cơ bản mà mình chia sẻ ở trên có thể giúp cho các bạn một phần nào đó ban đầu hiểu được các cú pháp,câu lệnh cơ bản của Ruby để bắt đầu nắm được các kiến thức nòng cốt đầu tiên để dễ dàng học tập tiếp cận với nó và sau đó có thể áp dụng để tìm hiểu các khái niệm nâng cao về sau của ngôn ngữ lập trình Ruby.