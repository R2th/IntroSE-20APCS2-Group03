Để dễ dàng thao tác với kiểu dữ liệu và làm code trở nên ngắn ngọn và rõ ràng hơn, những tips and trick dành cho lập trình viên không bao giờ là thừa. Chúng ta thường hay được biết đến những khái niệm như Closure, Extension, Functional Programming... nhưng  đọc hiểu tính chất định nghĩa và cách ứng dụng chúng trong những project thực tế lại khác nhau. 10 mẹo dưới đây sẽ giúp bạn có cách nhìn rõ ràng nhất về việc sử dụng những tính năng tuyệt vời trên của Swift trong việc tối ưu code của mình.

### 1. **Extension:**
Ví dụ: Tạo func tính số bình phương của một số:
![1.png](https://images.viblo.asia/7f158c9d-32fa-49fc-aaa9-70f7f15b5aff.png)

Ở đây thay vì khai báo thêm một đối tượng squareOfFive làm cho khối code trở nên cồng kềnh hơn thì chúng ta có thể đóng gói lại trong một Extension như sau:
![2.png](https://images.viblo.asia/46b9feec-433e-4c9f-8f61-03497bf3bc28.png)

### 2. **Generics:**
Ví dụ: In tất cả các phần tử trong mảng

![3.png](https://images.viblo.asia/b7e0cdb1-270f-4498-8818-85a6c78f8388.png)

Quá nhiều dòng code trông thừa thãi chỉ để thực hiện một function đơn giản. Làm gọn gàng thôi:
![4.png](https://images.viblo.asia/05cc2f3a-d487-4e68-b39d-74d5dcce9272.png)

### 3. **Vòng lặp For và vòng lặp While:**
Ví dụ: In từ "Count" 5 lần

![5.png](https://images.viblo.asia/6390f166-6855-43f5-b4b8-6cd680a65175.png)

Bạn tạo ra một biến đếm i để kiểm tra số lần chạy func print(), điếu đó đòng nghĩa với việc sẽ có nhiều biến -> sử dụng thêm nhiều bộ nhớ và dẫn đến nhiều vấn đề trong code. 

Do đó, sử dụng một vòng for đơn giản sẽ làm code trở nên tối ưu hơn nhiều:

![6.png](https://images.viblo.asia/eb17eb8d-b85d-48be-8968-37866b32ee13.png)

### 4. **Optional Unwrapping:**

Ví dụ: Tạo một làm login cơ bản

![7.png](https://images.viblo.asia/1a29ac58-7f10-40c8-a770-b48f8cae27d1.png)

Cấu trúc lồng if else trong trường hợp này làm cho func trông dài lê thê. Tinh gọn:

![8.png](https://images.viblo.asia/a52efb5c-a765-4469-afc6-ed2a8f486d6d.png)

### 5. **Optional Unwrapping:**
Ví dụ: Tìm đường kính/bán kính khi có bán kính/đường kính của một hình tròn

![9.png](https://images.viblo.asia/aca85a4e-6983-46ad-b2dc-807610e18b50.png)

Tinh gọn bằng cách sử dụng Computer Property, code trở nên clear và dễ maintain hơn rất nhiều.

![10.png](https://images.viblo.asia/6a7aa699-6db8-404c-980d-5c23d951cd2f.png)

Source: https://blog.bobthedeveloper.io/10-tips-to-become-better-swift-developer-a7c2ab6fc0c2