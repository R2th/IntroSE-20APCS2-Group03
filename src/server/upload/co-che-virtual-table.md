## Cơ chế Virtual table


### 1. Định nghĩa
- Virtual table là cơ chế quan trọng trong lập trình hướng đối tượng, được sử dụng trong việc xử lý với virtual function.
- Để thực hiện được chức năng hàm ảo (virtual function) khi xây dựng các class, C++ sử dụng một cơ chế ràng buộc đặc biệt (ràng buộc muộn/trễ: là ràng buộc được thực hiện trong lúc chạy chương trình) được gọi là virtual table (còn có tên gọi khác là "vtable", "virtual function table). Virtual table là cơ chế được sử dụng để giải quết việc các lệnh gọi hàm theo cách liên kết động.

```
class Base
{
public:
    virtual void function1() { cout << "Base: function1.\n";};
    virtual void function2() { cout << "Base: function2.\n";};
};
 
class D1: public Base
{
public:
    virtual void function1() { cout << "D1: function1.\n";};
};
 
class D2: public Base
{
public:
    virtual void function2() { cout << "D2: function2.\n";};
};

int main(){
    Base b = new Base();
    Base d1 = new D1();
    Base d2 = new D2();

    b.function1();
    b.function2();

    d1.function1();
    d2.function2();

    return 0;
}
```

Kết quả:
```
Base: function1.
Base: function2.
D1: function1.
D2: function2.
```

--> Cơ chế virtual table cho phép thực hiện việc gọi đến hàm function1(), function2 (được định nghĩa trong class D1, D2) của đối tượng d1, d2.

### 2. Cách hoạt động
**- Trước khi tìm về các hoạt động của virtual, chúng ta sẽ tìm hiểu về con trỏ _vptr là gì?**

- Con trỏ _vptr là con trỏ được tạo ra mỗi khi một đối tượng (class định nghĩa đối tượng này có khai báo virtual function) được tạo ra khai báo.

- Khi một đối tượng được tạo ra, đồng thời con trỏ _vptr cũng sẽ được tạo ra để trỏ đến virtual table của đối tượng đó.
vd: Đối tượng b được tạo ra, thì con trỏ _vptr cũng được khai báo để trỏ tới virtual table của đối tượng b.

**- Virtual table được tạo ra như thế nào?**

- Trong vd trên, vì ở lớp Base có 2 hàm được định nghĩa virtual nên mỗi bảng sẽ có 2 mục (1 cho function1() và 1 cho function2()).

- Bảng ảo của các đối tượng Base rất đơn giản, một đối tượng kiểu Base chỉ có thể truy cập các thành viên của class Base>, nên mục nhập function1() trỏ đến Base::function1() và mục nhập cho function2() trỏ đến Base::function2().

- Bảng ảo cho các đối tượng D1 sẽ phức tạp hơn, một đối đượng kiểu D1 có thể truy cập tới các thành viên của class Base và class D1. Hàm function1() đã được ghi đè trong class D1, nên mục nhập cho function1() sẽ trỏ đến D1::function1(), còn hàm function2() không được định nghĩa nên mục nhập cho function2() trỏ đến Base::function2().

- Tương tự, các đối tượng kiểu D2, mục nhập function1() trỏ đến Base::function1(), và mục nhập cho function2() trỏ đến D2::function2().

--> Khi gọi function1() và function2() của các đối tượng kiểu D1 và D2 con trỏ _vptr thực hiện nhiệm vụ để gọi chính xác hàm cần gọi.

![](https://images.viblo.asia/d6b213a8-c4fd-4c63-9377-74e33e83a92d.png)

Sơ đồ virtual table trong ví dụ trên

### 3. Kết luận
- Virtual table là một cơ chế vô cùng quan trọng trong lập trình hướng đối tượng, nó giải quyết trọn vẹn việc xử lý các hàm ảo, ngay cả khi chỉ sử dụng một con trỏ hoặc tham chiếu đến một lớp cơ sở.
- Việc gọi hàm ảo sẽ chậm việc gọi các hàm thông thường vì một số lý do sau:
    + Đầu tiên là việc sử dụng con trỏ _vptr để đến bản ảo và gọi hàm thích hợp.
    + Thứ hai, chúng t phải lập chỉ mục bảng ảo để tìm đúng hàm cần gọi, sau đó mới có thể gọi đúng hàm.
    
    --> Dẫn tới việc phải thực hiện 3 thao tác để tìm hàm cần gọi nhiều hơn so với việc gọi 1 thao tác cho việc gọi hàm thông thường.
- Việc sử chức năng virtual rất mạnh nhưng chúng sẽ gây tốn tài nguyên do mỗi đối tượng sẽ có thêm một con trỏ.

Bạn có thể tham khảo đoạn code cơ bản sau và đoán xem hàm được gọi! Để hiểu rõ hơn về virtual function và virtual table.

**Vd1:**
```
int main()
{
    D1 d1;
    Base *dPtr = &d1;
    dPtr->function1();
 
    return 0;
}
```

**Vd2**
```
int main()
{
    Base b;
    Base *bPtr = &b;
    bPtr->function1();
 
    return 0;
}
```