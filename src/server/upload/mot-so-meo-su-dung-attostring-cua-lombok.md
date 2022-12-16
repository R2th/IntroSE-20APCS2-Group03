Annotation @ToString giúp chúng ta tự hàm toString(), một method thường được sử dụng khi chúng ta muốn kiểm tra tất cả các giá trị của các thuộc tính trong object, nó cũng có thể là công cụ để giúp chúng ta gỡ lỗi.

Để sử dụng Lombok trong project Maven, chúng ta phải thêm dependency:
```
dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.8</version>
</dependency>
```
## @ToString annotation Lombok
@ToString annotation là một class-level annotation, được đặt ở đầu class cho phép lombok tự sinh toString().

Mặc định, nó sẽ in tên class, sau đó đến tên và giá trị của từng thuộc tính theo thứ tự được khai báo được ngăn cách bởi dấy phẩy.

Ví dụ mình tạo một class Staff gồm 2 thuộc tính age, name. Sử dụng @ToString annotation để in giá trị của staff object.
```
import lombok.ToString;

@ToString
public class Staff {

    public Staff(int age, String name) {
        this.age = age;
        this.name = name;
    }
    private int age;
    private String name;

    public static void main(String[] agrs) {
        Staff staff = new Staff(19, "nth");
        System.out.println(staff.toString());
    }
}

Output: Staff(age=19, name=nth)

```
## Cách sử dụng IncludeFieldNames với @ToString annotation
Phụ thuộc vào trường hợp của chúng ta, có thể không muốn tên của các thuộc tính xuất hiện trong kết quả trả về của toString(), sử dụng IncludeFiledNames trong trường hợp này.

Mặc định giá IncludeFiledNames là true đồng nghĩa với việc tên của tất cả các thuộc tính non-static với giá trị của nó sẽ được trả về trong kết quả của hàm toString(). Gán giá trị IncludeFiledNames = false sẽ khiếm lombok loại bỏ tên của các thuộc tính non-static trong kết quả trả về.
```
import lombok.ToString;

@ToString(includeFieldNames = false)
public class Staff {

    public Staff(int age, String name) {
        this.age = age;
        this.name = name;
    }
    private int age;
    private String name;

    public static void main(String[] agrs) {
        Staff staff = new Staff(19, "nth");
        System.out.println(staff.toString());
    }
}

Output:Staff(19, nth)

```

Nguồn tham khảo

[https://shareprogramming.net/cach-su-dung-annotation-tostring-cua-lombok/](https://shareprogramming.net/cach-su-dung-annotation-tostring-cua-lombok/)