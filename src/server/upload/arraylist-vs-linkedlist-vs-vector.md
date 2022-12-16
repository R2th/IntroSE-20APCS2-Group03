### Bài viết nguồn 
https://dzone.com/articles/arraylist-vs-linkedlist-vs
### 1. List Overview 
List, giống như cái tên của nó, là một chuỗi các phần tử có thứ tự. Khi chúng ta nói về List, sẽ là một ý hay nếu so sánh nó với Set, là một tập hợp các phần tử không có thứ tự và mỗi một phần tử đều là duy nhất. Phía dưới là Class hierarchy diagram của Collection.
![](https://images.viblo.asia/752ccf9e-9632-47b6-826f-883de62830a4.jpeg)
### 2. ArrayList vs. LinkedList vs. Vector 
Nhìn từ diagram ở trên, thì tất cả đều implement List Interface. Chúng khá giống nhau về cách sử dụng. Điểm khác nhau chính là cách hoạt động của chúng sẽ dẫn đến sự khác nhau về performance cho những trường hợp sử dụng khác nhau. 
- ArrayList được thiết kế như một resizable array. Nếu có thêm nhiều phần tử được thêm vào, kích thước của nó sẽ được tự động tăng lên. Những phần tử của nó có thể được truy cập trực tiếp bằng cách sử dụng các method get và set.
- LinkedList được thiết kế như một double linked list. Performance của nó trong việc add và remove tốt hơn so với ArrayList, nhưng lại kém hơn khi sử dụng các method get và set.
- Vector thì giống với ArrayList, chỉ khác là nó được synchronized. ArrayList sẽ là sự lựa chọn tốt hơn nếu chương trình của bạn thread-safe. 

Vector và ArrayList yêu cầu nhiều không gian lưu trữ hơn những phần tử đã được add vào. Đọc thêm ở

https://docs.oracle.com/javase/7/docs/api/java/util/ArrayList.html
https://docs.oracle.com/javase/7/docs/api/java/util/Vector.html

LinkedList implement List, tuy nhiên nó cũng implement Queue interface, nên sẽ có thêm các method khác so với ArrayList và Vector, chẳng hạn như offer(), peek(), pool() ... . 
Note: capacity mặc định khi khởi tạo của ArrayList là tương đối nhỏ,một thói quen tốt khi khởi tạo ArrayList là tạo nó với capacity lớn hơn (tùy trường hợp), điều này có thể tránh việc resize khi thêm nhiều phần tử vào list.

### 3. ArrayList example
```
ArrayList al = new ArrayList();
al.add(3);
al.add(2);
al.add(1);
al.add(4);
al.add(5);
al.add(6);
al.add(6);

Iterator iter1 = al.iterator();
while(iter1.hasNext()){
System.out.println(iter1.next());
}
```
### 4. LinkedList example
```
LinkedList ll = new LinkedList();
ll.add(3);
ll.add(2);
ll.add(1);
ll.add(4);
ll.add(5);
ll.add(6);
ll.add(6);

Iterator iter2 = al.iterator();
while(iter2.hasNext()){
System.out.println(iter2.next());
}
```
Nhìn vào những ví dụ trên này, thì ArrayList và LinkedList sử dụng khá giống nhau. Điểm khác nhau thật sự nằm ở sự triển khai và hoạt động phía bên trong của chúng
### 5. Vector 
Vector gần giống với ArrayList. điểm khác biệt là Vector được synchronize. Vì vậy, nó sẽ tốn tài nguyên hơn so với ArrayList. Thông thường, hầu hết mọi người sẽ sử dụng ArrayList thay vì Vector, họ sẽ tự điều khiển việc synchronize theo cách của họ.

### 6. Performance of ArrayList vs LinkedList 
Bảng độ phức tạp của ArrayList & LinkedList : 
![](http://www.programcreek.com/wp-content/uploads/2013/03/arraylist-vs-linkedlist-complexity.png)

Tôi sử dụng đoạn code sau để test performance
```
ArrayList arrayList = new ArrayList();
LinkedList linkedList = new LinkedList();

// ArrayList add
long startTime = System.nanoTime();

for (int i = 0; i < 100000; i++) {
arrayList.add(i);
}
long endTime = System.nanoTime();
long duration = endTime - startTime;
System.out.println("ArrayList add:  " + duration);

// LinkedList add
startTime = System.nanoTime();

for (int i = 0; i < 100000; i++) {
linkedList.add(i);
}
endTime = System.nanoTime();
duration = endTime - startTime;
System.out.println("LinkedList add: " + duration);

// ArrayList get
startTime = System.nanoTime();

for (int i = 0; i < 10000; i++) {
arrayList.get(i);
}
endTime = System.nanoTime();
duration = endTime - startTime;
System.out.println("ArrayList get:  " + duration);

// LinkedList get
startTime = System.nanoTime();

for (int i = 0; i < 10000; i++) {
linkedList.get(i);
}
endTime = System.nanoTime();
duration = endTime - startTime;
System.out.println("LinkedList get: " + duration);


// ArrayList remove
startTime = System.nanoTime();

for (int i = 9999; i >=0; i--) {
arrayList.remove(i);
}
endTime = System.nanoTime();
duration = endTime - startTime;
System.out.println("ArrayList remove:  " + duration);

// LinkedList remove
startTime = System.nanoTime();

for (int i = 9999; i >=0; i--) {
linkedList.remove(i);
}
endTime = System.nanoTime();
duration = endTime - startTime;
System.out.println("LinkedList remove: " + duration);
```
Kết quả : 
```
ArrayList add: 13265642
LinkedList add: 9550057
ArrayList get: 1543352
LinkedList get: 85085551
ArrayList remove: 199961301
LinkedList remove: 85768810
```
Sự khác biệt về hiệu suất của chúng là điều dễ nhận thấy. LinkedList nhanh hơn trong quá trình add và remove, nhưng chậm hơn trong get. Dựa trên bảng độ phức tạp thuật toán ở trên và kết quả test, chúng ta có thể biết được khi nào nên dùng cái gì. Nói ngắn gọn , LinkedList nên được sử dụng nếu : 
- Không có một lượng lớn truy cập ngẫu nhiên đến các phần tử
- Có một lượng lớn quá trình add/remove 

### Thanks for reading!