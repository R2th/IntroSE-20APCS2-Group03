## 1. Issue
Một trong những tính chất quan trọng và nổi bật của lập trình hướng đối tượng (Object Oriented Programming) đó chính là tính bao gói (Encapsulation), tính chất này được phát biểu như sau:
> In object-oriented programming (OOP), encapsulation refers to the bundling of data with the methods that operate on that data, or the restricting of direct access to some of an object's components.
>
> Trong lập trình hướng đối tượng, tính bao gói đề cập tới việc đóng gói thuộc tính và các phương thức , hoặc sự giới hạn truy cập trực tiếp đến một số thành phần của đối tượng.

Như vậy là tính bao gói đề cập đến hai vấn đề chính, một là Object và một là Getter/Setter.

Nhưng câu hỏi bây giờ đặt ra là vai trò của tính bao gói trong thực tế là gì (phạm vi trong bài viết này mình sẽ chủ yếu đề cập đến Getter/Setter) khi thiếu đi nó thì code vẫn hoạt động một cách bình thường.
Hãy cùng xem xét  đoạn code sau áp dụng cho `collection-type field` với public modifier, không Getter/Setter:

```
public class MyClass {

    public List<String> myStrings;

}
```

Khi bạn chỉ viết và chạy một chương trình Java đơn giản, ví dụ như khởi tạo và in ra Object bằng hàm main() chẳng hạn, viết như trên là hoàn toàn ổn nhưng vấn đề sẽ xảy ra khi bạn tham gia vào một dự án lớn hơn. Làm sao bạn có thể đảm bảo rằng chỉ khi nào giá trị nhận được không phải `null` hay `empty()` thì bạn mới lưu lại vào biến `myStrings` một cách đơn giản, làm sao bạn có thể tránh được sự rườm rà của việc check `null` mỗi khi muốn thao tác với dữ liệu và nếu bạn muốn tạo một `immutable object` thì làm thế nào...chưa kể đến nỗi ám ảnh thì phải maintain code nữa. Nói chung là mọi thứ sẽ trở nên phức tạp vì với việc dùng `non-private access modifier` đồng nghĩa với việc bạn sẽ mất quyền kiểm soát sự thay đổi dữ liệu của đối tượng. 

Tuy nhiên thì Getter/Setter có lẽ đôi khi cũng không cần thiết đối với trường hợp sau:

```
public class MyClass {
    private String name;
    
    public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
    
}
```
Không những mình ít khi tận dụng được gì từ Getter và Setter ở trường hợp này, mà code còn trở nên dài hơn và chậm hơn chút xíu nữa 😂😂.

Quay trở lại về bài toán ban đầu, sau khi thêm Getter/Setter chúng ta có đoạn code sau:
```
public class MyClass {

    private List<String> myStrings;

    public void setMyStrings(List<String> s) {
        this.myStrings = s;
    }

    public List<String> getMyStrings() {
        return this.myStrings;
    }
}
```
Mặc dù đã tuân thủ các nguyên lý OOP nhưng bạn sẽ thấy nó chưa đủ "tốt", hãy cùng refactor bằng việc trả lời các câu hỏi sau:
1. Tôi muốn khi lấy ra giá trị thì không phải check `null` nữa.
2. `setMyStrings` đang nhận tham số đầu vào là một `ArrayList`, tôi muốn nhận vào một `Set` thì làm như thế nào?
3. Tôi chỉ muốn `setMyStrings` khi giá trị truyền vào có tồn tại.
4. Tôi muốn sử dụng các hàm như `add()` hay `remove()` nhưng hiện tại nếu sử dụng các hàm này thì lại phá vỡ nguyên tắc `Encapsulation`.
5. Tôi không thể viết lại các method của collection như implement Collection<String> để kiểm soát sự thay đổi dữ liệu được, nó làm tăng độ phức tạp một cách không cần thiết.

## 2. Solution
1. Khởi tạo giá trị cho field `myStrings`. Từ bản `Java8` thì khi khởi tạo ArrayList không còn default capacity = 10 nữa, nên bạn không cần lo lắng về việc tốn memory, chỉ khoảng [`24 bytes`](https://www.baeldung.com/java-size-of-object) mỗi ArrayList instance.
    ```
    public class MyClass {

        private List<String> myStrings = new ArrayList();

        public List<String> getMyStrings() {
            return this.myStrings;
        }
    }
    ``` 
2. Dùng superclass-type for tham số truyền vào.
    ```
    public class MyClass {

        private List<String> myStrings = new ArrayList();

        public List<String> getMyStrings() {
            return this.myStrings;
        }

        public void setMyStrings(Collection<String> s) {
            this.myStrings.clear(); 
            if (s != null) { 
                this.myStrings.addAll(s); 
            } 
        }
    }
    ```
3.  Thêm custom `addString()` và `removeString()` method, return bản copy của `myStrings`.
     ```
    public class MyClass {

        private final List<String> myStrings = new ArrayList();

        public void setMyStrings(Collection<String> s) {
            this.myStrings.clear(); 
            if (s != null) { 
                this.myStrings.addAll(s); 
            } 
        }

        // 6
        public List<String> getMyStrings() {
            return new ArrayList(this.myStrings);
        }

        public void addString(String s) { 
            this.myStrings.add(s); 
        }

        public void removeString(String s) { 
            this.myStrings.remove(s); 
        }
    }
    ```
## 3. Final Thought
 Với `immutable type` như `String` thì vịệc thiết kế encapsulation không có gì phức tạp, nhưng mới `mutable type` như collection thì bạn cần chú ý nếu không muốn gặp những lỗi liên quan tới `reference` trong java.
    
Cảm ơn mọi người đã đọc bài. Happy Coding! 😆😆

#### References:
1. https://www.baeldung.com/java-why-getters-setters
2. https://kipalog.com/posts/Ban-da-thuc-su-hieu-mutable-va-immutable
3. https://dzone.com/articles/collections-and-encapsulation-in-java
4. https://stackoverflow.com/questions/9743513/defensive-copy-from-effective-java
5. https://dev.to/kylec32/effective-java-make-defensive-copies-when-necessary-4bd6