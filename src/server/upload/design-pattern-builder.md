# Creational patterns
*  **Design Pattern** là những mẫu thiết kế được sinh ra để đại diện cho các vấn đề thực tiễn sẽ được giải quyết nếu đi theo những mẫu thiết kế này. Những mẫu này thường được sử dụng bởi các nhà phát triển phần mềm hướng đối tượng có kinh nghiệm. Những mẫu này là giải pháp cho các vấn đề mà khi phát triển phần mềm gặp phải, chúng rất đáng tin cậy bởi vì giải pháp này đã được thử nghiệm bởi các nhà phát triển phần mềm trong một thời gian dài.
*  **Creational pattern**  là các mẫu thiết kế để xử lý các cơ chế tạo đối tượng, cố gắng để tạo đối tượng theo những tình huống phù hợp nhất. Các hình thức tạo đối tượng có thể dẫn đến các vấn đề về thiết kế hoặc làm tăng độ phức tạp cho thiết kế. Các mẫu thiết kế này giải quyết vấn đề bằng cách kiểm soát việc tạo đối tượng của nó.
*  Các mẫu thiết kế nằm trong loại mẫu khởi tạo bao gồm: **Abstract Factory**, **Builder**, **Factory Method**, **Object Pool**, **Prototype**, **Singleton**
*  Trong bài này chúng ta sẽ tìm hiểu về mẫu **Builder Pattern**


# Builder Pattern
> Càng tác biệt việc khởi tạo một đối tượng ra khỏi biểu diễn của nó để có thể cùng một quá trình xây dựng có thể tạo ra các biểu diễn khác nhau
## Vấn đề
Xem xét một ví dụ như này:
```
public class Employee {

    private int id;
    private String firstName;
    private String lastName;
    private int age;
    private String phone;
    private String address;

    public Employee(EmployeeBuilder employeeBuilder) {
        this.id = employeeBuilder.id;
        this.firstName = employeeBuilder.firstName;
        this.lastName = employeeBuilder.lastName;
        this.age = employeeBuilder.age;
        this.phone = employeeBuilder.phone;
        this.address = employeeBuilder.address;
}
```

Như trên, ta nhận thấy một vài vấn đề như này:
* Có quá nhiều tham số của đối tượng trên, vì vậy nếu tạo đối tượng như vậy bạn sẽ phải cung cấp tất cả các thông tin trong lần khởi tạo đầu tiên. Mặc dù trong số chúng sẽ có những tham số tùy chọn và bắt buộc khác nhau. Chúng ta có thể giải quyết bằng việc truyền cho các tham số tùy chọn giá trị NULL hoặc default nhưng việc đó có thể sẽ dẫn đến nhầm lẫn những tham số cùng loại khi khởi tạo.
* Đối với việc chỉ muốn tạo đối tượng với một vài tham số trong số đó thì việc tạo thêm các hàm khởi tạo sẽ rất nhiều và không còn linh động đối với trường hợp các tham số tùy lúc.

## Giải quyết
Builder Pattern sinh ra để giải quyết vấn đề trên, nó cho phép việc khởi tạo đối tượng với số lượng tham số tùy chọn cho phép việc tạo đối tượng một cách linh hoạt hơn. Vậy hãy xem Builder Pattern hoạt động như thế nào:

*  Tạo một ClassBuilder với tất cả các tham số bắt buộc.
*  ClassBuilder này nên có public constructor với tất cả các tham số bắt buộc.
*  Tạo các phương thức để có thể lấy ra được giá trị của các tham số tùy chọn. Các phương thức này sẽ trả ra cùng một đối tượng chứa các phương thức tùy chọn sau khi bạn thêm những giá trị tùy chọn vào.
*  Cuối cùng là cung cấp một phương thức **build()** trong ClassBuilder để trả ra đối tượng mong muốn mà chúng ta vừa tạo.

## Thực tế
> Trong thực tế thì **Builder Pattern** nên được sử dụng trong những bài toán mà chúng ta không biết trước được số lượng tham số của đối tượng. Lấy ví dụ ở đây là việc ban đầu bạn xây dựng những thuộc tính bắt buộc trước, sau đó bạn có thể tạo ra nhiều đối tượng khác nhau bằng các tham số tùy chọn khác nhau

Ví dụ thực tế:
* Việc tạo ra những thông tin bắt buộc của con người có thể có, và với những thuộc tính tùy chọn khác có thể xác định xem chính xác bạn là đối tượng gì. Ví dụ thêm vào thông tin tùy chọn là chức vụ thì sẽ biết bạn là nông dân, công nhân, học sinh, sinh viên, ...
* Một ví dụ khác về việc xây dựng nhà hàng, bạn sẽ không biết được là sẽ có bao nhiêu đồ ăn được tạo ra, mà ban đầu cứ xây dựng các thông tin cơ bản của món ăn. Những thuộc tính được thêm vào sẽ định nghĩa xem nó là món ăn gì để phân biệt nhau sau mỗi lần tạo món mới. 

![](https://images.viblo.asia/ea47b81b-1021-44d1-bffb-b82a9dc760fe.png)

* Các thư viện được xây dựng cũng sử dụng **Builder Pattern** để lấy các thành phần tùy chọn cho từng nhiệm vụ khác nhau, vì chúng có quá nhiều thuộc tính mà người dùng có thể truyền vào. Ví dụ như thư viện load ảnh Glide

```
GlideApp
    .with(myFragment)
    .load(url)
    .centerCrop()
    .placeholder(R.drawable.loading_spinner)
    .into(myImageView);
```
## Demo
Chúng ta sẽ lấy ví dụ về việc quản lý nhân viên, sẽ có những thông tin được coi là bắt buộc và một số thông tin là lựa chọn, có thể có hoặc không.

* Nếu không sử dụng **Builder Pattern** thì sẽ phải tạo rất nhiều constructor để số lượng tham số truyền vào đúng như ý muốn.
```
public class Employee {

    private int id;
    private String firstName;
    private String lastName;
    private int age;
    private String phone;
    private String address;

    public Employee(int id, String firstName, String lastName, int age, String phone, String address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.phone = phone;
        this.address = address;
    }
    
    public Employee(int id, String firstName, String lastName, int age) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    // Getter and Setter

}
```

* Vậy nếu sử dụng **Builder Pattern** thì sao. Xác định việc này sẽ có những thông tin bắt buộc như **id**, **firstName**, **lastName** là những thông tin cần thiết, còn lại thì có thể có hoặc không là có thể xác định được đối tượng rồi.

```
public class Employee {

    private int id;
    private String firstName;
    private String lastName;
    private int age;
    private String phone;
    private String address;

    public Employee(EmployeeBuilder employeeBuilder) {
        this.id = employeeBuilder.id;
        this.firstName = employeeBuilder.firstName;
        this.lastName = employeeBuilder.lastName;
        this.age = employeeBuilder.age;
        this.phone = employeeBuilder.phone;
        this.address = employeeBuilder.address;
    }

   // Getter and Setter

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                '}';
    }

    public class EmployeeBuilder {

        private int id;
        private String firstName;
        private String lastName;
        private int age;
        private String phone;
        private String address;

        public EmployeeBuilder(int id, String firstName, String lastName) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
        }

        public EmployeeBuilder age(int age) {
            this.age = age;
            return this;
        }

        public EmployeeBuilder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public EmployeeBuilder address(String address) {
            this.address = address;
            return this;
        }

        public Employee build() {
            return new Employee(this);
        }
    }
}

```

* Sau đó sử dụng nó dễ dàng trong lúc gọi như sau:

```
Employee emp1 = new Employee.EmployeeBuilder(1, "Thai", "Ngoc")
                .build();

Employee emp2 = new Employee.EmployeeBuilder(1, "Ngoc", "Thai")
                .address("Ba Vi")
                .age(23)
                .build();
```
# Tham khảo
1. https://www.tutorialspoint.com/design_pattern/index.htm
2. https://sourcemaking.com/design_patterns/creational_patterns
3. https://android.jlelse.eu/create-complex-object-at-run-time-with-builder-pattern-d425e6f4408e
4. https://www.javaworld.com/article/2074938/core-java/too-many-parameters-in-java-methods-part-3-builder-pattern.html