@Data là cách dùng nhanh khi bạn muốn thêm tất cả các annotation:

* @Getter / @Setter
* @ToString
* @EqualsAndHashCode
* @RequiredArgsConstructor

của Lombok vào 1 class.
## @Data annotation trong Lombok
Hãy thử xem một ví dụ dưới đây khởi tạo một Persion class với đầy đủ các hàm getter, setter, toString, equals, hashCode và constructor. 
```
import java.util.Objects;

public class Staff {

    private String firstname;
    private String lastname;

    public Person() {
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 17 * hash + Objects.hashCode(this.firstname);
        hash = 17 * hash + Objects.hashCode(this.lastname);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Person other = (Person) obj;
        if (!Objects.equals(this.firstname, other.firstname)) {
            return false;
        }
        if (!Objects.equals(this.lastname, other.lastname)) {
            return false;
        }
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof Person;
    }

    @Override
    public String toString() {
        return "Person{" + "firstname=" + firstname + ", lastname=" + lastname + '}';
    }

}
```

Đây rõ ràng là một công việc khá tốn thời gian và lặp đi lặp lại rất nhiều với hình thức đều giống nhau. Mặc dù các IDE hiện tại có hỗ trợ sinh code tự động những method này tuy nhiên nhìn vào một class với 1 mớ code như này thì chán quá nhỉ.

Giờ đây, chúng ta có thể sử dụng @Data để sinh các hàm trên một cách tự động trong quá trình build. Code của chúng ta chỉ vọn vẹn có vài dòng, giúp focus chính vào các thuộc tính và các hàm quan trọng khác của class.

```
import lombok.Data;

@Data
public class Staff {

    private String firstname;
    private String lastname;
}
```

## Làm cách nào để sử dụng các annotation khác với Lombok, Override các annotation mà @Data đã bao gồm

Giả sử nếu bạn đã sử dụng @Data annotation rồi, nhưng bạn không muốn loại bỏ các getter() method trong class chẳng hạn,  hay muốn thay thế @RequireArgsConstructor bằng @AllArgsConstructor?

Thật may mắn, bạn có thể chỉ đinh những annotation khác mà Lombok cung cấp, nếu có sự xung đột giữa @Data và các annotation khác thì chúng sẽ được ưu tiên sử dụng hơn là của @Data.

Ví dụ

Nếu bạn muốn loại bỏ getter() method: 
```
import lombok.*;

@Getter(AccessLevel.NONE)
@Data
public class Staff {

    private String firstname;
    private String lastname;
}
```

Thay thế @RequiredArgsConstructor thành @AllArgsConstructor
```
import lombok.*;

@AllArgsConstructor
@Data
public class Staff {

    private String firstname;
    private String lastname;
}
```

Nguồn tham khảo
[https://shareprogramming.net/hay-can-than-khi-dung-annotation-data-cua-lombok/](https://shareprogramming.net/hay-can-than-khi-dung-annotation-data-cua-lombok/)


[Tin tức số 24h](https://tintucso24h.com/)