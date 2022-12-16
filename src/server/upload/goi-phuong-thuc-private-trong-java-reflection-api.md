# 1. Tổng quan
Khi mới học JAVA, các phương thức *private*  được sử dụng để ngăn cản việc gọi từ bên ngoài class. Nhưng vì 1 lý do nào đó, nếu chúng ta muốn sử dụng nó. Để đạt được điều này, chúng ta cần nghiên cứu về **Java's access controls**. Giúp chúng ta có thể sử dụng được các đoạn trong phương thức private. 

# 2. Cách thực hiện
Ta có 1 hàm thư viện như bên dưới. Đơn giản là cộng 2 số và trả về kết quả. 
Nó là **private** method, theo quan điểm thông thường thì chúng ta không thể gọi được nó.
```
private class MyUtils {
    private Integer plusNumber(int a, int b){
        return a+b;
    }
    private static Integer subNumber(int a, int b){
        return a-b;
    }

    private int var1= 1;
    private static int var2= 2;
}
```
## Cách 1: Sử dụng Java Reflection API
Nếu chúng ta gọi trực tiếp như thế này, compiler sẽ báo lỗi.  
```
MyUtils.plusNumber(1,2)
```

Chúng ta sẽ gọi hàm này dựa trên **reflection**(một số khái niệm mình giữ nguyên tiếng Anh cho đúng bản chất)
### Bước 1: Truy cập vào đối tượng *Method* muốn gọi 
```
        Method indexOfMethod = MyUtils.class.getDeclaredMethod(
                "plusNumber", int.class, int.class);
```
Có 3 tham số:
- *plusNumber*: Tên hàm
- *2 tham số tiếp* theo là kiểu dữ liệu vủa hàm *plusNumber*. Trong ví dụ này là 2 biến kiểu *int* 

### Bước 2: Cho phép truy cập 
```
indexOfMethod.setAccessible(true);
```

### Bước 3: Thực hiện gọi method 

```
Integer result = (Integer) indexOfMethod.invoke(new MyUtils(), a, b);
```

hàm invoke cần lưu ý các tham số:
- Tham số 1: Nếu hàm thông thường thì cần 1 instance của Object (new MyUtils()). Nếu là hàm static thì cần MyUtils.class
- Các tham số tiếp theo dùng để gọi hàm đó ở ví dụ là 2 biến kiểu int
- Nhớ ép kiểu về kiểu mong muốn của hàm (Integer)


## Cách 2: Sử dụng Spring ReflectionTestUtils

Để thao tác được đến các private method là 1 vấn đề trong testing. Spring's test library cung cấp sẵn các hàm để thực hiện việc này.
```
    /**
     * Call non-static method plusNumber using reflection API
     * @throws Exception
     */
    private static void callMethod() throws Exception {
        int a = 1;
        int b = 2;
        Method indexOfMethod = MyUtils.class.getDeclaredMethod(
                "plusNumber", int.class, int.class);
        indexOfMethod.setAccessible(true);
        Integer result = (Integer) indexOfMethod.invoke(new MyUtils(), a, b);
        System.out.println(result);
    }

    /**
     * Call static method subNumber using reflection API
     * @throws Exception
     */
    private static void callMethodStatic() throws Exception{
        int a = 10;
        int b = 2;
        Method indexOfMethod = MyUtils.class.getDeclaredMethod(
                "subNumber", int.class, int.class);
        indexOfMethod.setAccessible(true);
        Integer result = (Integer) indexOfMethod.invoke(MyUtils.class, a, b);
        System.out.println(result);
    }
```

Trên là 2 ví dụ khi gọi hàm non-static và static. 
Cách gọi tương tự như sử dụng Reflection API ở mục 2.1

## Truy cập vào biến private
Tương tự như method, chúng ta cũng có thể truy cập vào biến private bằng **Reflection API** và **Spring ReflectionTestUtils**

**Reflection API**
```
    /**
     * Get value of non-static field "var1" using reflection API
     * @throws Exception
     */
    private static void callField() throws Exception{
        Field field = MyUtils.class.getDeclaredField(
                "var1");
        field.setAccessible(true);
        Integer result = (Integer) field.get(new MyUtils());
        System.out.println(result);
    }
```

**Spring ReflectionTestUtils**
```
    /**
     * Call non-static variable "var1" using SpringTestUtils library
     */
    private static void springTestCallField(){
        Integer value = (Integer) ReflectionTestUtils.getField(new MyUtils(), "var1");
        System.out.println(value);
    }
```


# 3. Kết luận
Trong bài viết này, ta đã tìm hiểu **Java Reflection API** and **Spring's ReflectionTestUtils**.
Biết cách sử dụng trong trường hợp cần thiết. 
Source code của toàn bộ bài viết xem ở [đây](https://github.com/ledangtuanbk/JavaInvokePrivateMethod)