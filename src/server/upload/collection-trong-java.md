### **1. Sự ra đời của Java Collection Framwork.**
### 
Trước JDK 1.2, các cấu trúc dữ liệu của Java bao gồm mảng, Vector và Hashtable. JDK 1.2 đã giới thiệu Collection Framework và trang bị thêm các lớp kế thừa (Vector và Hashtable) để người sử dụng có thể lựa chọn các collection phù hợp cho bài toán của mình.

Mặc dù chúng ta có thể sử dụng một mảng để lưu trữ một nhóm các phần tử cùng loại (nguyên thủy hoặc đối tượng). Tuy nhiên, mảng không hỗ trợ cái gọi là phân bổ động - nó có độ dài cố định không thể thay đổi một khi được phân bổ. Hơn nữa, mảng là một cấu trúc tuyến tính đơn giản. Nhiều ứng dụng có thể yêu cầu cấu trúc dữ liệu phức tạp hơn như danh sách được liên kết, ngăn xếp, hashtable...

### **2. Giới thiệu về Java Collection Framework**
### 
Collection Framework cung cấp 1 kiến trúc để lưu trữ và thao tác với một nhóm các đối tượng.

Java Collections có thể thi hành được tất cả các hoạt động mà bạn thực hiện trên dữ liệu như tìm kiếm, sắp xếp, chèn, thao tác và xóa.

Gói Java Collection Framework bao gồm:

-	Tập các interface
-	Các lớp kế thừa
-	Các thuật toán (ví dụ như sắp xếp và tìm kiếm)

Hệ thống phân cấp của Collection Framework:

![](https://images.viblo.asia/6080e672-c9c9-49c9-852c-6b0552b8ea08.png) 

### **3. Collection và Collections trong java**
### 
-	Collections là 1 lớp chỉ bao gồm các static method chứa các thuật toán đa hình hoạt động trên các collection và trả về 1 collection mới dựa trên collection đã chỉ định.

Một số phương thức có trong Collections

        - addAll(Collection<? super T> c, T…elements): Thêm tất cả các phần tử được chỉ định vào colletion được chỉ định.

        - reverse(List<?> list): Xáo trộn các phần tử có trong List được chỉ định.

        - sort(List<?> list): Sắp xếp các phần tử của List. Với điều kiện các phần tử của List phải là kiểu Comparable. Nghĩa là lớp các phần tử phải được implements giao diện Comparable

        - sort(List<?> list, Comparator<? super T> c): Sắp xếp các phần tử theo comparator đã chỉ định.

        - swap(List<?> list, int i, int j): Hoán đổi các phần tử tại vị trí i và j.

-	Collection là interface được implement bởi tất cả các lớp trong collection framework. Nó khai báo tất cả các phương thức mà mọi class trong collection framework đều có.

Một số phương thức có trong collection

        - add(int index, E element): Chèn một phần tử vào collection.

        - addAll(Collection<? extends E> c): Chèn các phần tử trong collection được chỉ định vào collection gọi.

        - remove(Object element): xóa phần tử khỏi collection
	
### **4. Một số lớp trong collection**
### 
### **4.1. List**
    Lưu trữ các phần tử dưới dạng danh sách
    
### **a. ArrayList**
### 
Lớp ArrayList sử dụng một mảng động để lưu trữ các phần tử. Nó kế thừa lớp AbstractList và implement interface List.

Một số đặc điểm quan trọng của ArrayList:

•	Có thể chứa các phần tử trùng lặp

•	Duy trì thứ tự chèn.

•	Không đồng bộ.

•	Cho phép truy cập ngẫu nhiên nhờ index.

•	Vì bản chất của ArrayList vẫn sử dụng mảng để lưu trữ dữ liệu nên các thao tác xóa hay thêm phần tử sẽ chậm.

	Nên sử dụng ArrayList trong các trường hợp cần nhiều việc truy xuất các phần tử.

### **b. LinkedList**
### 
Lớp LinkedList sử dụng một danh sách liên kết đôi để lưu trữ phần tử. Nó cung cấp một cấu trúc dữ liệu danh sách liên kết. Nó kế thừa lớp AbstractList và thực hiện các giao diện List và Deque.

Đặc điểm của LinkedList:

•	Có thể chứa các phần tử trùng lặp.

•	Duy trì thứ tự chèn.

•	Không đồng bộ.

•	Truy xuất phần tử chậm hơn so với ArrayList.

•	Việc thao tác dữ liệu nhanh hơn vì không cần dịch chuyển các phần tử.

	Nên sử dụng LinkedList trong trường hợp cần nhiều thao tác thêm xóa phần tử.
### **4.2. Set**
### **a. HashSet**

Lớp Java Hashset được sử dụng để tạo một collection sử dụng bảng băm để lưu trữ. Nó kế thừa lớp AbstractSet và implement interface Set.

Đặc điểm của HashSet:

•	Hashset lưu trữ các phần tử bằng cách sử dụng một cơ chế gọi là hashing. HashSet dựa vào giá trị hashcode() để phân biệt các phần tử

•	Không chứa các phần tử trùng lặp.

•	HashSet cho phép chứa giá trị null.

•	Không đồng bộ

•	Không duy trì thứ tự chèn.

•	Được sử dụng trong các hoạt động tìm kiếm

### **b. TreeSet**
### 
Lớp TreeSet được implement interface Set. Nó lưu trữ các phần tử dưới dạng cây.

Đặc điểm của TreeSet:

•	Không chứa các phần tử trùng lặp giống HashSet.

•	Thời gian truy xuất phần tử nhanh.

•	Không cho phép phần tử null do cần phải sắp xếp các phần tử.

•	Không đồng bộ.

•	Sắp xếp các phần tử theo thứ tự tăng dần.


### **4.3. Queue và PriorityQueue**
### 
Queue là 1 interface kế thừa Collection và có thêm các phương thức dung để chèn, xóa phần tử vào hàng đợi.

Lớp PriorityQueue cung cấp phương tiện sử dụng hàng đợi. Nhưng nó không chỉ đặt các phần tử theo FIFO mà người sử dụng có thể chỉ định thông qua các phương thức có trong Collection

### **4.4. Map**
### **a. HashMap**
### 
Lớp HashMap lưu trữ các phần tử dưới dạng 1 cặp key-value.

Đặc điểm của HashMap:

•	Lớp Java HashMap chứa các giá trị dựa trên khóa.

•	Các khóa không được trùng lặp.

•	Có thể chứa 1 key null và nhiều value null.

•	Không đồng bộ.

•	Không duy trì thứ tự sắp xếp

Vì các phần tử trong HashMap không duy trì thứ tự sắp xếp vậy khi ta muốn truy xuất phần tử thông qua index thì sẽ làm thế nào?

Một lớp mở rộng của HashMap đó là LinkedHashMap. Lớp này duy trì 1 danh sách liên kết đôi chạy qua tất cả các phần tử bên trong nó vì vậy nó sẽ duy trì được thứ tự chèn các phần tử bên trong Map. Và khi bạn cần truy xuất thông qua index, bạn cần phải convert sang ArrayList để có thể truy xuất.

Ví dụ

```
    LinkedHashMap<String,String> linkedHashMap = new LinkedHashMap<String,String>();
    linkedHashMap.put("key0","value0");
    linkedHashMap.put("key1","value1");
    linkedHashMap.put("key2","value2");
    int pos = 1;
    String value = (new ArrayList<String>(linkedHashMap.values())).get(pos);
```

### **b. TreeMap**
### 
Lưu trữ các cặp dữ liệu dưới dạng cây.

Đặc điểm của TreeMap:

•	Không chứa 1 key null nhưng có thể chứa nhiều value null.

•	Không đồng bộ.

•	Duy trì thứ tự tăng dần các key.

### **5. Tổng kết**
### 
Trên đây là bài giới thiệu về Collection framework. Thông qua bài viết này mong các bạn có thể cân nhắc lựa chọn các lớp phù hợp với bài toán của mình.

Tài liệu tham khảo:

https://www.javatpoint.com/collections-in-java
https://www3.ntu.edu.sg/home/ehchua/programming/java/J5c_Collection.html
https://docs.oracle.com/javase/tutorial/collections/