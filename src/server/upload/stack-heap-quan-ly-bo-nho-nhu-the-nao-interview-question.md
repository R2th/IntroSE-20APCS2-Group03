Khi IDE tràn bộ nhớ các bạn thường tăng Stack và Heap, vậy nó là gì và cách hoạt động như thế nào?

Tại sao chúng ta lại quan tâm tới Stack và Heap, hiểu được chúng có giúp ích gì được không?

Để giải quyết vấn đề trên. Chúng ta sẽ tìm hiểu cách hoạt động và ý nghĩa của Heap và Stack...

### Đối tượng được tạo ra và mất đi

Nhiệm vụ của bạn là quản lý vòng đời của đối tượng. Bạn quyết định khi nào khởi tạo (consturct), khi nào xoá (destroy) chúng. 

Trường hợp bạn không chỉ định xoá (destroy) trực tiếp, thì bộ máy dọn rác Garbage Collector (gc) sẽ làm giải quyết chúng chúng, giúp giải phóng bộ nhớ.

Nếu bạn dự định tạo ra những đối tượng, thì bạn phải quản lý được khi nào tạo hoặc xoá chúng, nếu không việc tràn bộ nhớ là điều hiển nhiên.

### Stack và Heap hoạt động như thế nào

Trong Java, ta sẽ xem xét 2 vùng của bộ nhớ:

1. Nơi lưu trữ đối tượng(object) Heap.
2. Nơi lưu trữ hàm và biến local. 

Khi máy ảo Java (JVM) được khởi động, sẽ được cấp 1 vùng nhớ. Bạn có thể chỉnh sửa vùng nhớ hoặc không thể tuỳ chỉnh được, điều này phụ thuộc vào phiên bản của máy ảo Java. Vùng nhớ được cấp phát cũng phụ thuộc vào phiên bản của máy ảo. Nhưng bạn sẽ không cần quan tâm nhiều đến điều này.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/mpf94fziv7_image.png)

Như các bạn đã biết tất cả đối tượng được lưu trữ trên Heap, nhưng ta chưa biết nơi lưu trữ của biến, và nơi lưu trữ đó tuỳ thuộc vào loại của biến đó là: biến thực thể (Instance Variable) và biến nội bộ (Local Viriable).

### Biến thực thể (Instance Variable)

Biến thực thể: là biến đựợc khai báo trong lớp (class). 

Chúng biểu thị trạng thái của đối tượng. 

Biến thực thể được lưu trữ trong đối tượng

```
public class Duck {
   //Mỗi đối tượng Duck có thực thể "size"
    int size;
}
```

### Biến cục bộ (Local Variable)

Biến cục bộ được khai báo trong hàm, và bao gồm tham số được truyền vào hàm. Chúng chỉ là những biến tạm thời và chúng chỉ tồn tại cho đến khi hàm được giải phóng trên Stack.

```
public void foo(int x) {
   // Tham số x và biến i, b được gọi là biến cục bộ
   int i = x + 3;
   boolean b = true;
}
```

### Hàm trên Stack được xếp chồng lên nhau

Khi bạn gọi hàm, hàm sẽ được xếp chồng lên trên và được lưu vào nơi có tên là Stack Frame. Nơi này lưu trữ trạng thái của hàm, bao gồm: dòng đang thực thi, và tất cả các giá trị biến cục bộ.

Hàm đầu tiên trên Stack luôn luôn là hàm đang thực thi. Hàm này tồn tại trên Stack cho đến khi găp dấu '}' (dấu kết thúc hàm). Nếu hàm foo() gọi hàm bar(), thì hàm bar() sẽ được sếp chồng lên vị trí cao nhất.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/1j8yg19sfv_image.png)

### Luồng chạy của Stack

```
public void doStuff() {
    boolean b = true; 
    go(4);
}

public void go(int x) {
    int z = x + 24;
    crazy();
    // Các đoạn code tiếp theo,...
}

public void crazy() { 
    char c = ‘a’;
}
```

Đoạn mã ở trên có 3 hàm: doStuff(), go() và crazy(). Hàm doStuff() gọi hàm go(), hàm go() gọi hàm crazy().

Mỗi hàm khai báo 1 biến cục bộ trong phần thân({....}). Tuy nhiên hàm go() có 1 tham số là x, nên hàm go() sẽ có 2 biến cục bộ.

1. Đầu tiên hàm `doStuff()` được gọi và hàm `doStuff()` được xếp chồng lên vị trí đầu của Stack. Biến `b` được lưu tại stack frame.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/x20zfu62dw_image.png)

2. Hàm doStuff gọi hàm `go()`, hàm `go()` được xếp chồng lên bị trí đầu của Stack. Biến `x` và `z` được lưu vào stack frame.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/lz4c38ysr3_image.png)

3. Hàm `go()` gọi hàm `crazy()` vào hàm `crazy()` được đưa lên đầu Stack, với biến `c` trong stack frame.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/kjzcadfaqp_image.png)


4. Hàm `crazy()` sau khi chạy xong, thì stack frame sẽ bị xoá khỏi stack và quay trở lại hàm `go()`. 

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/lz4c38ysr3_image.png)

5. Hàm `go()` sau khi xong, thì stack frame sẽ bị xoá khỏi stack và quay trở lại hàm `doStuff()`.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/x20zfu62dw_image.png)

6. Hàm `doStuff` sau khi chạy xong thì stack frame của nó cũng bị xoá bỏ.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/wyoxccno9f_image.png)

### Trường hợp biến cục bộ là những đối tượng thì như thế nào?

Những biến không phải là kiểu nguyên nguyên thuỷ (primitive variable), thì chỉ lưu trữ tham chiếu tới đối tượng, KHÔNG lưu trữ đối tượng chính nó.

**Nếu biến cục bộ tham chiếu tới một đối tượng, thì chỉ có biến địa chỉ tham chiếu lưu trên Stack. Đối tượng sẽ được lưu trên Heap**

```
public class StackRef {
    
    public void foof() {
        barf(); 
    }
    
    public void barf() {
        Duck d = new Duck(24);
    } 
}
```

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/7lf5dmnevx_image.png)

### Tại sao chúng ta phải học về stack/heap? Nó giúp gì được cho chúng ta? Tôi có cần học về nó?

Hiểu biết về nền tảng của Java Stack và Heap là điều quan trọng, nếu bạn muốn hiểu về phạm vi của biến, luồng(threads), và xử lý ngoại lệ (exception handlling).

Bạn không cần biết về các thực thi của Stack và Heap trong máy ảo java (JVM). Tất cả bạn cần biết là về Stack và Heap về những gì mình đã diễn giải.

Nếu bạn tìm hiểu kỹ về những vấn đề trên thì những chủ đề có liên quan đến Stack và Heap bạn sẽ hiểu 1 cách cặn kẽ và dễ hiểu hơn. Và 1 ngày nào đó bạn sẽ nói lời cảm ơn vì đã giúp bạn tìm hiểu về Stack và Heap.

### Tổng kết

* Java có 2 vùng nhớ mà bạn cần quan tâm là Stack và Heap.
* Biến thực thể (instance viriable) là biến được khai báo trong class nhưng ở ngoài hàm.
* Biến cục bộ là biến được khai báo trong hàm, hoặc là tham số của hàm(method papameter).
* Tất cả biến cục bộ được lưu trong Stack với frame(khung) tương ứng với hàm được khai báo.
* Biến tham chiếu đối tượng được lưu giống như biến nguyên thuỷ(primitive variable). Nếu biến tham chiếu được khai báo như là biến cục bộ, thì sẽ được lưu trong Stack.
* Tất cả các đối tượng được lưu trong Heap, bất kế biến tham chiếu là cục bộ là hay là biến thực thể(instace variable).

### Đóng góp

Các bạn bỏ ra 1 phút giúp mình nhé. Vui lòng để lại ý kiến của bạn để giúp người sau dễ đọc và dễ hiểu hơn. 

Cảm ơn các bạn đã quan tâm bài viết này. Chúc các bạn 1 ngày tốt lành! :)

Tham khảo từ: Head First Java (Kathy Sierra & Bert Bates)

Phúc Vưu

### Bài viết liên quan

Nếu biến cục bộ(local variable) được lưu trên Stack thì biến thực thể(instace viriable) được lưu ở đâu?

Các bạn đón chờ tập tiếp theo nhá!!! Sẽ sớm thui <3.