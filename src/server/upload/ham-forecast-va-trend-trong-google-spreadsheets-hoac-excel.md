Dự báo (Forecasting) là việc dự đoán trước xu hướng, giá trị của dữ liệu trong tương lai dựa trên những dữ liệu trong quá khứ.
Dự báo là công việc cực kì quan trọng trong nhiều ngành nghề như thời tiết, đầu tư, chiến lược kinh doanh,.... và là kĩ thuật sẽ còn được phát triển mạnh mẽ trong tương lai.
Hiện nay có rất nhiều kĩ thuật phức tạp để làm công việc dự báo, nhưng trong bài này mình sẽ giới thiệu một cách rất đơn giản, sử dụng hàm FORECAST và TREND của Google SpreadSheets hoặc Excel để làm công việc này.
## 1. Hàm FORECAST
Hàm FORECAST là hàm thuộc nhóm những hàm thống kê. Hàm này sẽ sử dụng hồi quy tuyến tính trả về giá trị dự đoán dựa trên những giá trị đã có sẵn.
Cú pháp:
### =FORECAST(x, known_y_values, known_x_values)
Trong đó:
+  x: là dữ liệu mà ta cần dự đoán giá trị y cho nó.
+  known_y_values: các dữ liệu y đã biết, để dự đoán giá trị y.
+  known_x_values: các dữ liệu x đã biết, để dự đoán giá trị y.
Chú ý:
+ Độ dài của hai mảng known_x_values và known_y_values phải bằng nhau.
+ Phương sai của known_x_values phải khác 0.
+ Hai mảng known_x_values và known_y_values không được trống.
+ Giá trị x phải là số.
### Công thức tính toán
Giá trị dự đoán y được tính bằng công thức y = a +bx
Trong đó: 

![](https://images.viblo.asia/75f6d593-6ff1-47f9-a062-c43dfb42c7b7.png)
và 

![](https://images.viblo.asia/4483696b-c313-43c2-a42a-e80432feb9d5.png)
+ ![](https://images.viblo.asia/05e80711-9678-4ebb-a713-ccddf5f7a65f.png) là means (giá trị trung bình) của known_x_values.
+ ![](https://images.viblo.asia/1f7edfa2-55d1-40c9-b74f-58303f910152.png) là means (giá trị trung bình) của known_y_values.
### Demo
Cùng thực hành nào!!

Bài toán: Giả sử chúng ta có dữ liệu về dân số 2 giới của Việt Nam qua các năm như sau:
![](https://images.viblo.asia/0a06f481-017e-4611-86ce-b895b123c415.png)
Bây giờ nhiệm vụ của chúng ta là dự đoán dân số vào các năm sau đó.
Cách làm:
Để tính số dân giới tính nam và năm 2012, ta sử dụng công thức FORECAST, với x = 2012, known_y_values = B3:B14, known_x_values = A3:A14.

Công thức đầy đủ sẽ như sau:
![](https://images.viblo.asia/c2efd6d3-1c7d-4410-a81b-92c10367d6d8.png)
và kết quả là: 

![](https://images.viblo.asia/9b5e69a9-8ba3-4aa2-995f-9479d1f72c9f.png)

Nếu vẽ thử trên đồ thị đường thì ta sẽ thấy như sau:
![](https://images.viblo.asia/15e628d7-1e3e-4824-a557-fcd29e5d7632.png)
## 2. Hàm TREND
Hàm TREND cũng là hàm thuộc nhóm những hàm thống kê. Hàm này trả về các giá trị theo xu hướng tuyến tính của những giá trị được cho trước.

Cả hàm TREND và hàm FORECAST đều cho ra kết quả giống nhau, nhưng cách dùng khác nhau.
Trong khi hàm FORECAST chỉ trả ra 1 trá trị thì hàm TREND có thể tính giá trị "forecast" cho nhiều ô. Do đó, khi có nhu cầu dự đoán với nhiều giá trị thì ta nên sử dụng hàm TREND nhé :D 

Cú pháp:
### = TREND(known_y's, [known_x's], [new_x's], [const])
Trong đó:
* known_y's: mảng hoặc dải ô dữ liệu y đã biết trong mối quan hệ y = mx + b. Mảng này dùng để dự đoán giá trị của y.
- known_x's: mảng hoặc dải ô dữ liệu x đã biết trong mối quan hệ y = mx + b, dùng để dự đoán giá trị của y. known_x's có thể được bỏ qua, khi đó nó sẽ là một mảng {1, 2, 3,....} có kích thước bằng known_y's.
- new_x's: là những giá trị x mà ta cần dự đoán giá trị y cho nó. new_x's có thể được bỏ qua, khi đó nó sẽ được coi như giống known_x's.
- const: là giá trị logic xác định giá trị của hẳng số b trong mối quan hệ y = mx + b, với các trường hợp như sau:
  + const = TRUE hoặc bỏ qua: b được tính toán bình thường.
  + const = FALSE: b=0 và y = mx.
###   Demo
Bài toán: Vẫn sử dụng dữ liệu dân số Việt Nam qua các năm giống như bên trên, bây giờ nhiệm vụ của chúng ta là dự báo dân số nữ của Việt Nam trong 3 năm 2012, 2013, 2014.
![](https://images.viblo.asia/be340a9d-ac0b-48ae-8acb-eace602ab69f.png)

Cách làm: Thay vì dùng 3 lần hàm FORECAST như ở bên trên, chúng ta dùng hàm TREND để tính 1 lúc 3 giá trị luôn. Công thức sẽ như sau:
![](https://images.viblo.asia/97b3a70f-817a-4e29-b584-69cae1b4ff1f.png)

Cuối cùng, ta được kết quả giống như khi dùng FORECAST.
![](https://images.viblo.asia/c1cb5734-912c-4108-abb4-9aaafeb0b5de.png)
# Kết
Trên đây là hai hàm dự báo thuộc nhóm hàm thống kê trong Google SpreadSheets hoặc Excel.

Hi vọng bài viết này hữu ích. 

Cảm ơn đã theo dõi. :D