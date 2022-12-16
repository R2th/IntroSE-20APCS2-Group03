## I. Tính đóng gói
### 1. Khái niệm  
Đóng gói là sự che giấu bên trong dữ liệu riêng của mỗi đối tượng của lớp được khai báo và chỉ được truy xuất chúng thông qua các phương thức có sẵn của lớp đó. Vì vậy, nó còn được gọi là data hiding (nghĩa là che giấu dữ liệu).  
Hay hiểu đơn giản tính đóng gói là sự giới hạn về phạm vi sử dụng của biến hoặc function   

![](https://images.viblo.asia/a45d2f42-1e37-4033-915b-6df14a918c91.png)  
### 2. Access modifier
![](https://images.viblo.asia/82aaeb1f-5154-4dc5-9cf1-91b9b3fd8e9b.png)  
Private Access Modifier chỉ được truy cập trong phạm vi lớp.  
Default Access Modifier là chỉ được phép truy cập trong cùng package.  
Protected access modifier được truy cập bên trong package và bên ngoài package nhưng phải kế thừa.  
Protected access modifier có thể được áp dụng cho biến, phương thức, constructor. Nó không thể áp dụng cho lớp.  
Public access modifier được truy cập ở mọi nơi.  
## II. Tính trừu tượng  
Tính trừu tượng là một tiến trình ẩn các chi tiết trình triển khai và chỉ hiển thị tính năng tới người dùng  
Abstract class là một lớp mà nó được khai báo bằng từ khóa abstract   
Có thể hoặc không có phương thức ảo (abstract method)  
Abstract không được khai báo nhưng có thể là một lớp con   
Một phương thức trừu tượng là một phương thức được khai báo mà không cần thực hiện (không có dấu ngoặc ôm và tiếp theo là dấu chấm phẩy), như thế này  

```javascript
abstract void moveTo(double deltaX, double deltaY);
```

Nếu một lớp bao gồm các phương thức trừu tượng, thì chính lớp đó phải được khai báo trừu tượng, như sau:
```javascript
public abstract class GraphicObject {
   // declare fields
   // declare nonabstract methods
   abstract void draw();
}
```
Khi lớp trừu tượng là một subclass thì lớp đó thường cung cấp các phương thức để thực thi tất cả phương thức trừu tượng của lớp cha. Nếu không class con phải được khai báo là abstract
Phân biệt abstract class và interface  
![](https://images.viblo.asia/8186ed5d-29ae-4c7d-bbe1-f1cd972a3dd2.png)  
## III. Tính kế thừa
### 1.  Khái niệm   
Lập trình hướng đối tượng cho phép định nghĩa một lớp mới từ một lớp đã tồn tại được gọi là tính kế thừa trong Java  
Tính kế thừa là rất quan trọng  và có tính năng mạnh mẽ trong việc tái sử dụng phần mềm  
Giả sử bạn cần định nghĩa một lớp là các mẫu hình tròn,hình vuông, hình tam giác. Những lớp đó có nhiều tính năng chung. Cách tốt nhất để thiết kế những lớp đó để tránh dư thừa và làm hệ thống trở nên dễ hiểu, dễ bảo trì là sử dụng tính kế thừa trong java
### 2.  Superclass và Subclass  
Tính kế thừa cho phép bạn định nghĩa một lớp chung ( SuperClass) và sau đó kế thừa nó để có nhiều lớp chuyên biệt hơn (subclass)  
Có thể sử dụng một lớp để mô hình hóa các đối tượng là cùng kiểu     
Các lớp khác nhau có thể có một vài thuộc tính chung và trạng thái, chúng có thể tổng quat bên trong một lớp và có thể chia sẻ cho các lớp khác. Hoàn toàn có thể định nghĩa các lớp chuyên biệt kế thừa từ lớp chung   
Lớp chuyên biệt sẽ được kế thừa các thuộc tính và phương thức của lớp chung  
ví dụ :  
xem xét các đối tượng hình học. Giả sử bạn muốn thiết kế lớp là các đối tượng hình học chẳng hạn như hình tròn, hình chữ nhật. Đối tượng hình học có thể có các thuộc tính, trạng thái chung, chúng có thể là color, filled or unfilled. Lớp chung GeometricObject được sử dụng cho tất cả các đối tượng hình học. đây là một lớp chứa thuộc tính color, filled và các phương thức getter() and setter() và toString() (phương thưc toString trả về một chuỗi mô tả của đối tượng) . Lớp hình tròn và hình chữ nhật có thể được định nghĩa là các lớp con của lớp cha GeometricObject.   
Hình 1.1 bên dưới mô tả mối quan hệ giữa chúng.   
![](https://images.viblo.asia/01194cb0-7c45-4ec1-8a3b-9b54aaad4a74.png)    
Trong thuật ngữ của Java,lớp C1 kế thừa từ một lớp C2 được gọi là SubClass và C2 được gọi là SuperClass. Một superclass cũng có thể được đề cập đến như là một lớp cha hoặc lớp cơ sở (base class) và subclass được coi là một lớp con, một lớp được kế thừa. một Subclass kế thừa việc truy cập vào các trường dữ liệu và phương thức của superclass và cũng có thể thêm vào một vài thuộc tính và phương thức mới 
Class Circle kế thừa lớp GeometricObject   
![](https://images.viblo.asia/b77cf85d-a671-4abd-abb1-4bac613978ce.png)  
Class Rectangle kế thừa lớp GeomatricObject  
![](https://images.viblo.asia/033301ba-915a-4c6b-ae1b-fca2f98b48c5.png)  
### 3. Super Keyword  
Từ khóa super đề cập đến superclass và có thể được sử dụng để gọi phương thức của lớp cha và constructors  
Trong java, từ khóa super có 3 cách sử dụng như sau:  
Từ khóa super được sử dụng để tham chiếu trực tiếp đến biến instance của lớp cha gần nhất.  
Ví dụ :  
![](https://images.viblo.asia/ddfabe18-b695-45e6-94f4-9c150e0c35ed.png)  
Output : 50  

super() được sử dụng để gọi trực tiếp Constructor của lớp cha.
![](https://images.viblo.asia/7455332d-03e4-47a0-a361-cac7073ae4a9.png)  
kết quả  
```javascript
Vehicle is created  
Bike is created
```
Từ khóa super được sử dụng để gọi trực tiếp phương thức của lớp cha.  
![](https://images.viblo.asia/33c2887b-cbb7-496b-891a-9d025d9a23e7.png)  
Kết quả
```javascript
welcome to java
welcome
```
### 4. Các kiểu kế thừa   
![](https://images.viblo.asia/acbce220-4ea1-4846-84c7-8adb15a8e5ba.png)  
## IV. Tính đa hình 
### 1. Khái niệm  
Một hành động có thể được thực hiện bằng nhiều cách khác nhau được gọi là đa hình 
### 2. Đa hình lúc runtime  
Đa hình lúc runtime là quá trình gọi phương thức đã được ghi đè trong thời gian thực thi chương trình. Trong quá trình này, một phương thức được ghi đè được gọi thông qua biến tham chiếu của một lớp cha.
Trước khi tìm hiểu về đa hình tại runtime, bạn có thể  tìm hiểu về Upcasting.
Khi biến tham chiếu của lớp cha tham chiếu tới đối tượng của lớp con, thì đó là Upcasting. Ví dụ:
```javascript
class A{}  
class B extends A{}  
A a=new B();//upcasting  
```
ví dụ về đa hình lúc runtime  
![](https://images.viblo.asia/e54799c4-b4dd-4c1c-ad77-714feb4dd17a.png)  
Kết quá  
```javascript
running safely with 60km
```
### 3. Overloading method  
Nếu một lớp có nhiều phương thức cùng tên nhưng có tham số khác nhau thì đó là nạp chồng phương thức. Nếu bạn phải thực hiện chỉ một hoạt động có cùng tên phương thức thì kĩ thuật này làm tăng tính dễ đọc của chương trình   
Có hai cách để nạp chông phương thức trong java   
Bằng việc thay đổi tham số   
Bằng việc thay đổi kiểu dữ liệu của các tham số   
Trong java nạp chồng phương thức không thể xảy ra bẳng việc thay đổi kiểu trả về của phương thức   
Ví dụ về nạp chồng phương thức bằng cách thay đổi tham số  
![](https://images.viblo.asia/d1a108a9-9afc-4ca0-87d4-8afb97c750b5.png)  
Output
```javascript
30
40
```
### 4. Overriding method  
Nếu lớp con có cùng phương thức như đã được khai báo trong lớp cha thì đó được gọi là ghi đè phương thức. Nói cách khác nếu lơp con cung cấp tringf triển khai cụ thể của phương thức mà đã được cung cấp bởi một trong các lớp cha của nó thì đó là ghi đè phương thức   
Sử dụng của ghi đè phương thức   
Cung cấp trình triển khai cụ thể của một phương thức mà đã được cung cấp bởi lớp cha của nó   
Ghi đè phương thức được sử dụng để thu được tính đa hình tại runtime 
Quy tăc cho ghi đè phương thức : phương thức phải có tên giống lớp cha, có tham số truyền vào, kiểu dữ liệu trả về giống lớp cha, và có quan hệ kế thừa với lớp cha 
Ví dụ về ghi đè : 
![](https://images.viblo.asia/ec7ce1be-49b2-4e9b-81b6-1aea30d42807.png)  

## V. Tài liệu tham khảo  
Introduction to java
https://drive.google.com/file/d/0Bw5H_3WbSL-HSHZaRVlIcjhDWk0/view?usp=sharing