# Magic Methods Trong PHP
### 1. Magic methods là gì.<br>
Magic methods là các phương thức đặc biệt để tùy biến các các sự kiện trong php. Hiểu đơn giản là nó cung cấp thêm cách để giải quyết một vấn đề. Magic methods được dùng để xử lý các đối tượng trong lập trình hướng đối tượng.<br>
### 2. Ưu nhược điểm của magic methods.<br>
   Bất kì một cái gì đó đều có ưu và nhược điểm cả (không có gì là hoàn hảo).<br>
**Ưu điểm**<br>
      Từ khái niệm ở trên chúng ta có thể thấy được ưu điểm của magic methods :<br>
•	Giúp cho chúng ta tùy biến được các hành vi, thêm cách lựa chọn để xử lý một đối tượng trong php.<br>
 •	Nó giúp cho chúng ta có thể thao tác với một đối tượng theo cách mình muốn.<br>
**Nhược điểm**<br>
Từ khái niệm ở trên chúng ta có thể thấy được ưu điểm của magic methods :<br>
•	Giúp cho chúng ta tùy biến được các hành vi, thêm cách lựa chọn để xử lý một đối tượng trong php.<br>
•	Nó giúp cho chúng ta có thể thao tác với một đối tượng theo cách mình muốn.<br>
•	Một magic methods có tốc độ chậm hơn các phương thức bình thường.<br>
##  3, Các magic method trong PHP.
Tất cả các hàm magic methods được viết trong 1 class cụ thể mà khi ta thao tác với đối tượng của class đó mà tùy trường hợp các hàm magic methods ta đã khai báo trong class đó sẽ được thực hiện.<br>
-Trong PHP hiện nay có 15 hàm magic methods : <br>
###    **+__construct()**: 
Hàm được gọi khi ta khởi tạo một đối tượng.<br>
Trong php thì magic method __construct() rất là phổ biến mà chúng ta hay thường gặp nhất. Hàm __construct() sẽ tự đông được gọi khi ta khởi tạo 1 đối tượng( còn được gọi là hàm khởi tạo).<br>
 
![](https://images.viblo.asia/fe608d7a-1390-486f-8d05-9e9e8a0a347f.PNG)

  Không giống như các ngôn ngữ lập trình hướng đối tượng như java hay C#. Trong PHP, hàm khởi tạo không cho phép chúng ta thực hiện việc overload, nó chỉ cho phép khởi tạo 1 đối tượng duy nhất ứng với method __contructs() được khai báo trong class(không khai báo mặc định là không truyền gì).<br>
Ví dụ :<br>

 ![](https://images.viblo.asia/1f7ed4eb-30d7-4ab1-8ebe-23c16c7c6d96.PNG)
 
Chúng ta thấy nó không thể khải tạo được biến thứ 2 do method __contruct() ta có tham số truyền vào.

Để khắc phục việc không cho overload, trong php có tùy biến như sau :
![](https://images.viblo.asia/1f7ed4eb-30d7-4ab1-8ebe-23c16c7c6d96.PNG)


### + __destruct(): 
được gọi khi một đối tượng bị hủy. Mặc định khi kết thúc chương trình hoặc khi ta khai báo mới đối tượng đó sẽ bị hủy bỏ và gọi đến method __destruct().
 
 ![](https://images.viblo.asia/9bd62923-7e94-422d-8f1a-c66b7c106249.PNG)
Như trên ví dụ ta có thể thấy đối tượng tạo trước sẽ bị hủy sau khi chương trình kết thúc.

### + __set(): 
gọi khi ta truyền dữ liệu vào thuộc tính không tồn tại hoặc thuộc tính private trong đối tượng.
 ![](https://images.viblo.asia/cdc970ea-f3e9-4f77-8bec-fdee5f00f40e.PNG)

Nó truyền dưới dạng key => value. Như ở ví dụ trên, ta set giá trị cho thuộc tính name mà không tồn tại trong class. Nó sẽ gọi đến hàm __set() với $key là thuộc tính đã gọi, $value là giá trị đã gán. <br>Kết quả:

 ![](https://images.viblo.asia/31b9543a-585a-49b9-8d8a-48cefb943b3a.PNG)
### + __get(): 
gọi khi ta truy cập vào thuộc tính không tồn tại hoặc thuộc tính private trong đối tượng.
Tương tự như set, get là việc xử lý khi truy cập đối tượng.

 ![](https://images.viblo.asia/19d1023b-cd89-43ac-b572-35e1adb4f5ca.PNG)



### + __isset(): 
-Phương thức __isset() sẽ được gọi khi chúng ta thực hiện kiểm tra một thuộc tính không được phép truy cập của một đối tượng, hay kiểm tra một thuộc tính không tồn tại trong đối tượng đó. Cụ thể là hàm isset() và hàm empty().
-Chú ý: phương thức __isset() không sử dụng được với thuộc tính tĩnh.

![](https://images.viblo.asia/c2f0ab4d-2b13-4ba9-88f7-e18d000da2db.PNG)
 
 
### + __unset(): 
được gọi khi hàm unset() được sử dụng trong một thuộc tính không được phép truy cập. Tương tự như hàm isset. Khi ta Unset 1 thuộc tính không tồn tại thì method __unset() sẽ được gọi.
![](https://images.viblo.asia/fe70a344-595a-4f86-bb44-5117f77122df.PNG)
 
### + __call():
được gọi khi ta gọi một phương thức không được phép truy cập trong phạm vi của một đối tượng. Như vậy thì có thể thấy __get() và __call() cũng gần giống nhau. Có điều __get() gọi khi không có thuộc tính còn __call() khi phương thức không có. <br>
Ta cũng có thể dùng hàm __call() để thực hiện overload trong php.<br>
	Khai báo : __call($method_name, $parameter)<br>
Trong đó:
>        $method_name là phương thức được gọi mà không tồn tại.
> 	      $parameter: là tham số truyền vào( là mảng).
![](https://images.viblo.asia/5176baaf-cfd1-42dc-b45f-f96e86c7160b.PNG)
 

Chúng ta có thể thấy trong class test không hề có hàm overloadFunction. Khi ta gọi tới phương thức overloadFunction thì nó sẽ chạy hàm __call().
### + __callstatic(): 
  Được kích hoạt khi ta gọi một phương thức không được phép truy cập trong phạm vi của một phương thức tĩnh.

 
![](https://images.viblo.asia/3e58394f-21a5-4921-9bf9-8294f7f9e006.PNG)

 Kết quả:<br>
 ![](https://images.viblo.asia/c3a9dab4-9f1c-46d3-aedb-cad5854921ec.PNG)
### + __toString(): 
  Phương thức này được gọi khi chúng ta in echo đối tượng. Method __toString() sẽ bắt buộc phải trả về 1 dãy String.

 ![](https://images.viblo.asia/6d1ecf87-5f36-4903-a137-e2c3df9f1756.PNG)

 
### + __invoke():
  Phương thức này được gọi khi ta cố gắng gọi một đối tượng như một hàm.
  ![](https://images.viblo.asia/5c7f6b84-7f0b-4b74-8c7d-79073d653bc9.PNG)

 

### + __Sleep():
   Được gọi khi serialize() một đối tượng.
  Thông thường khi chúng ta serialize() một đối tượng thì nó sẽ trả về tất cả các thuộc tính trong đối tượng đó. Nhưng nếu sử dụng __sleep() thì chúng ta có thể quy định được các thuộc tính có thể trả về.
  ![](https://images.viblo.asia/c4b3b705-1b5f-41cb-ae23-1c32c2be374b.PNG)

 
### + __wakeup: 
  Được gọi khi unserialize() đối tượng.

 ![](https://images.viblo.asia/2f164572-cc10-4755-9939-fe6a2bcd32b7.PNG)

### + __set_state():
  Được sử dụng khi chúng ta var_export một object.
  ![](https://images.viblo.asia/f080d3f3-6cc1-4ea8-b67d-95717dfbe511.PNG)


### + __clone(): 
Được sử dụng khi chúng ta clone(sao chép 1 đối tượng thành 1 đối tượng hoàn toàn mới không liên quan đến đối tượng cũ) một object.
 ![](https://images.viblo.asia/53fa9b96-1672-4722-a29d-698f5944c8eb.PNG)

### + __debugInfo():
Được gọi khi chúng ta sử dụng hàm vardump().
![](https://images.viblo.asia/427e7a7d-f376-44cb-bfa6-6a179cee7ebc.PNG)

 

# 4. kết luận.
Trên là tổng quan về magic methods và cách sử dụng chúng. Việc sử dụng magic methods khá là hữu ích nhưng chúng ta cũng không lên lạm dụng vì nó chậm hơn methods thường. 

# 5. Tài liệu tham khảo.
https://toidicode.com/magic-methods-trong-php-106.html<br>
http://php.net/manual/en/