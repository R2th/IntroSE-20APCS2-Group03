Các phần trong bài viết này bao gồm  các phần như sau:
* Classes, Superclasses, and Subclasses
* Object: The Cosmic Superclass
* Generic Array Lists
* Object Wrappers and Autoboxing
* Methods with a Variable Number of Parameters
* Enumeration Classes
* Reflection
* Design Hints for Inheritance


-----

Khi bạn kế thừa từ một lớp hiện có, bạn sử dụng lại (hoặc kế thừa) các phương thức (methods) của nó và bạn có thể thêm các phương thức và trường mới để điều chỉnh lớp mới của bạn thành tình huống mới. Thật sự, có thể nói kỹ thuật này rất cần thiết trong lập trình Java :+1:
# Classes, Superclasses, and Subclasses
Các bạn lưu ý, người Việt chúng ta hay gọi các thuật ngữ này là: Lớp (`Classes`), Lớp cha (`Superclasses`) và lớp con (`Subclasses`). Trong bài viết này, tôi sẽ gọi các từ chuyên ngành này theo kiểu người Việt cho nó thân thiệt hây :innocent:

Chúng ta sẽ sử dụng một lớp có tên là `Employee`. 

Giả sử bạn làm việc cho một công ty, Người quản lý cũng giống như nhân viên ở nhiều khía cạnh. Người quản lý và nhân viên đều được trả lương. Tuy nhiên, trong khi Nhân viên sẽ chỉ được nhận tiền lương cơ bản thì Người quản lý ngoài nhận `tiền lương cơ bản` sẽ nhận thêm `tiền thưởng` nữa nếu họ quản lý tốt. Đây là tình huống đáng "khóc" phải kể đến trong việc dùng Thừa kế. Tại sao ư ? Chà, bạn cần xác định một Lớp mới trong Thừa kế, `Manager`, và thêm các chức năng. Nhưng bạn có thể dùng lại một số thứ mà bạn đã code trong lớp `Employee`.

Đây là cách bạn định nghĩa một lớp `Manager`kế thừa từ lớp `Employee`. Sử dụng từ khóa `extends` để biểu thị Thừa Kế: 
```JAVA
class Manager extends Employee
{
    [Thêm phương thức và trường]
}
```
```
C++ Note
Tương tự trong C++, Java sử dụng từ khóa extends thay vì token. Tất cả các Thừa kế trong Java là kế thừa public; không có chức năng tương tự như C++ (thừa kế private và protected). 
```

-----

## extends

Từ khóa `extends` chỉ ra rằng bạn đang tạo một lớp (lớp con) xuất phát từ một lớp hiện có (lớp cha).

Lớp `Manager` có một trường mới `bonus`(tiền thưởng mà lớp `Employee`sẽ không có trường này) và thêm một phương thức mới `setBonus`
```JAVA
class Manager extends Employee
{
    private double bonus;
    . . .
    public void setBonus(double b)
    {
        bonus = b;
    }
}
```
Phương thức `setBonus` để set giá trị `bonus`
```JAVA
Manager boss = . . .;
boss.setBonus(5000);
```

Trong lớp `Employee` có 3 trường: `name`, `salary` và `hireDay`
Và suy ra thì lớp `Manager`có 4 trường: `name`, `salary`, `hireDay` và thêm `bonus`

Tuy nhiên, có một trường hợp như thế này đối với phương thức `getSalary` thì đối tượng Nhân viên sẽ trả về` tiền lương cơ bản`, nhưng đối tượng là Người quản lý thì trả về `tiền lương cơ bản + tiền thưởng`. Nên bạn cần cung cấp một phương phức mới để ghi đè (override) lên phương thức của Lớp cha:
```JAVA
class Manager extends Employee
{
    . . .
    public double getSalary()
    {
    . . .
    }
    . . .
}
```
Thoạt nhìn code tổng thể ở trên thì có vẻ đơn giản là chỉ cần return lại tổng tiền:
```JAVA
public double getSalary()
{
    return salary + bonus; // won't work
}
```
Tuy nhiên nó không hoạt động được!
Phương thức getSalary của lớp `Manager` không có quyền truy cập trực tiếp vào các trường private (trường `salary` là trường private của `Manager`) của lớp cha. 

Chúng ta sẽ cố thử một lần nữa:
```JAVA
public double getSalary()
{
    double baseSalary = getSalary(); // still won't work
    return baseSalary + bonus;
}
```
Tuy nhiên nó vẫn không hoạt động được !
Vì khi chúng ta chỉ gọi phương thức bằng `getSalary()`, chắc chắn nó sẽ tưởng rằng đang gọi một phương thức nào đó được viết trong lớp `Manager` nhưng thực sự thì không có sẵn `getSalary()` vì chúng ta sẽ thừa kế phương thức này ở lớp `Employee`,  mà muốn Java nó biết thì chúng ta phải dùng một lệnh riêng biệt để nhận biết điều đấy là `super` :sweat_smile:

## super
Tóm lại, Chúng ta cần chỉ ra rằng chúng ta cần gọi phương thức `getSalary` của lớp cha (`Employee`) chứ không phải lớp hiện tại (`Manager`):
```JAVA
super.getSalary()
```
Thử lại lần cuối nè:
```JAVA
public double getSalary()
{
    double baseSalary = super.getSalary();
    return baseSalary + bonus;
}
```
Ok, nó hoạt động được rồi đấy!
`super` là một đặc biệt từ khóa chỉ đạo trình biên dịch gọi các phương thức của lớp cha.

Như các bạn đã thấy, một `lớp con có thể thêm các trường và phương thức hoặc ghi đè` các phương thức của lớp cha. Tuy nhiên, Thừa kế `không bao giờ có thể lấy đi bất kỳ trường hay phương thức nào`.

```
C++ Note
Java sử dụng từ khóa super để gọi một phương thức siêu lớp. Trong C ++, bạn sẽ sử dụng tên của siêu lớp với toán tử :: thay vào đó.
```
 
-----

Cuối cùng hãy để chúng tôi cung cấp một hàm dựng (`constructor`)
```JAVA
public Manager(String n, double s, int year, int month, int day)
{
    super(n, s, year, month, day);
    bonus = 0;
}
```

Ở đây `super([có các tham số])` là cách gọi `constructor`của lớp cha `Employee`,  với `n`, `s`, `year` và `day`như tham số đưa vào. Hoặc nếu dùng `super([không có các tham số])`(tức `super()`) là cách gọi đến hàm dựng không tham số của Lớp cha. Nếu Lớp cha không có hàm dựng không có tham số mà lớp con vẫn gọi `super()`thì trình biên dịch Java báo lỗi.

Vì hàm dựng của `Manager`không được phép truy cập vào các trường private của lớp `Employee`, nên nó phải khởi tạo chúng thông qua một `constructor`. Hàm dựng `constructor`được gọi với từ khóa `super`. `Khi sử dụng phải là câu lệnh đầu tiên trong hàm dựng của lớp con.`

Kết luận, `super` có hai ý nghĩa:
* Gọi một phương thức hoặc thuộc tính của lớp cha.
* Gọi một hàm dựng khác (của lớp cha) - ở khác lớp.

Liên hệ đến `this`có hai ý nghĩa:
* Gọi một phương thức hoặc thuộc tính trong cùng một lớp.
* Gọi một hàm dựng khác - ở cùng một lớp.

-----
```JAVA
Manager boss = new Manager("Carl Cracker", 80000, 1987, 12, 15);
boss.setBonus(5000);
```
```JAVA
Employee[] staff = new Employee[3];
```
```JAVA
staff[0] = boss;
staff[1] = new Employee("Harry Hacker", 50000, 1989, 10, 1);
staff[2] = new Employee("Tony Tester", 40000, 1990, 3, 15);
```
Chúng tôi in ra tất cả lương của mọi nhân viên:
```JAVA
for (Employee e : staff)
    System.out.println(e.getName() + " " + e.getSalary());
```
Vòng lặp này in dữ liệu sau:
```
Carl Cracker 85000.0
Harry Hacker 50000.0
Tommy Tester 40000.0
```
Bây giờ `staff[1]` và `staff[2]` mỗi người in mức lương cơ bản của họ vì họ là đối tượng của `Employee`. Tuy nhiên, `staff[0]` là một đối tượng `Manager` có phương thức `getSalary` thêm phần thưởng vào tiền lương cơ bản.

 Nhưng điều đáng chú ý là lời gọi:
 ```JAVA
 e.getSalary()
 ```
 chọn ra phương thức `getSalary` chính xác. Lưu ý rằng loại khai báo của `e` là `Employee`, nhưng loại thực tế của đối tượng mà `e`đề cập có thể là `Employee` hoặc `Manager`.
 
 Khi `e`đề cập đến đối tượng `Employee`, thì khi đó lời gọi `e.getSalary()`gọi đến phương thức `getSalary` của lớp `Employee`. Tuy nhiên, khi `e` đề cập đến một đối tượng `Manager`, thì phương thức `getSalary` của Lớp `Manager` được gọi thay thế. Trình biên dịch `tự biết` về loại thực tế của đối tượng mà `e` đề cập, và do đó có thể gọi phương thức đúng.

Thực tế là một biến đối tượng (như biến `e`) có thể tham chiếu đến nhiều loại thực tế được gọi là `đa hình`. Tự động chọn phương thức thích hợp trong thời gian chạy được gọi là `liên kết động`. Chúng ta thảo luận về cả hai chủ đề chi tiết hơn trong chương này.

-----
## Chương trình hoàn chỉnh để bạn tham khảo:

inheritance/ManagerTest.java:
```JAVA
package inheritance;

/**
    * This program demonstrates inheritance.
    * @version 1.21 2004-02-21
    * @author Cay Horstmann
*/

public class ManagerTest
{
    public static void main(String[] args)
    {
        // construct a Manager object
        Manager boss = new Manager("Carl Cracker", 80000, 1987, 12, 15);
        boss.setBonus(5000);

        Employee[] staff = new Employee[3];

        // fill the staff array with Manager and Employee objects
        staff[0] = boss;
        staff[1] = new Employee("Harry Hacker", 50000, 1989, 10, 1);
        staff[2] = new Employee("Tommy Tester", 40000, 1990, 3, 15);

       // print out information about all Employee objects
        for (Employee e : staff)
            System.out.println("name=" + e.getName() + ",salary=" + e.getSalary());
    }
}
```
inheritance/Employee.java:
```JAVA
package inheritance;

import java.util.Date;
import java.util.GregorianCalendar;

public class Employee
{
    private String name;
    private double salary;
    private Date hireDay;
   
    public Employee(String n, double s, int year, int month, int day)
    {
        name = n;
        salary = s;
        GregorianCalendar calendar = new GregorianCalendar(year, month -
1, day);
        hireDay = calendar.getTime();
    }

    public String getName()
    {
        return name;
    }
    public double getSalary()
    {
        return salary;
    }

    public Date getHireDay()
    {
        return hireDay;
    }

    public void raiseSalary(double byPercent)
    {
        double raise = salary * byPercent / 100;
        salary += raise;
    }
}
```
inheritance/Manager.java:
```JAVA
package inheritance;

public class Manager extends Employee
{
    private double bonus;
    /**
    * @param n the employee's name
    * @param s the salary
    * @param year the hire year
    * @param month the hire month
    * @param day the hire day
    */
    public Manager(String n, double s, int year, int month, int day)
    {
        super(n, s, year, month, day);
        bonus = 0;
    }

    public double getSalary()
    {
        double baseSalary = super.getSalary();
        return baseSalary + bonus;
    }

    public void setBonus(double b)
    {
        bonus = b;
    }
}
```

Sau bài viết này sẽ còn thêm nhiều phần của Classes, Superclasses, and Subclasses nữa. Nên khi nào viết phần nào, thì mình sẽ để link tại đây nha :rofl:

Nếu bạn đọc kĩ bài viết, bạn sẽ hiểu được nhiều hơn đấy. 
Nếu có bất kì sai sót nào về bài này, hãy gửi mail cho mình nha. Mình xin cảm ơn :heart_eyes:


-----


# Nguồn tham khảo
* Sách:
[Core Java Volume I- Fundamentals 9th Edition- Horstmann, Cay S. _ Cornell, Gary](https://drive.google.com/file/d/1g6XYYxec4bBiaJVxZN3rlsc7avMrIS5Y/view)