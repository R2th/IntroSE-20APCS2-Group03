![](https://images.viblo.asia/3549fd11-d0e4-4518-9972-9bc66d4d3221.png)
# 1. Mở đầu câu chuyện.
- **Interviewer**: Chào em, em đến phỏng vấn internship Java nhỉ?
- **Interviewee**: Dạ, đúng rồi anh ạ.
- **Interviewer**: Em giới thiệu chút về bản thân xem nào??
- **Interviewee**: Bla, bla....
- **Interviewer**: OK, được rồi! Giờ em cho anh biết lập trình hướng đối tượng có mấy tính chất cơ bản?
- **Interviewee**: Dạ, 4 ạ. 
- **Interviewer**: Em kể ra xem nào. (Không nói luôn lại bắt mình hỏi thêm câu nữa)
- **Interviewee**: Đó là tính kế thừa, đa hình, trừu tượng và bao đóng ạ.
- **Interviewer**: Em nói rõ hơn về tính trừu tượng xem nào?
- **Interviewee**: Dạ...(gãi đầu, cười). Cái này em không rõ lắm ạ.
- **Interviewer**: Ok, không sao. Tiếp nhé, em thử **so sánh Interface và Abstract Class xem có gì giống, khác, khi nào dùng cái nào?**
- **Interviewee**: Dạ...(gãi đầu, cười tiếp). Em chỉ biết Interface chứa các phương thức không có thân hàm còn Abstract Class thì là một lớp trừu tượng thôi ạ.
- ....
- **Interviewer**: Ok, em có câu hỏi gì cho anh và công ty không?
- **Interviewee**: Dạ, không anh ạ.
- **Interviewer**: Ok, vậy buổi phỏng vấn hôm nay anh em mình dừng ở đây nhé. Có gì bên HR sẽ thông báo lại cho em. Chào em.

Anh em đoán được kết quả rồi chứ. Tất nhiên có thể sẽ được hỏi nhiều hơn nhưng mình lấy ví dụ như thế. Câu hỏi về Interface và Abstract Class là một câu hỏi mà các bạn Internship hoặc Fresher rất hay được hỏi khi đi phỏng vấn. Vậy làm sao để vượt qua câu hỏi này (ít nhất là ở khía cạnh lý thuyết)

# 2. So sánh Interface và Abstract Class.
## 2.1. Đặc điểm cơ bản của Interface và Abstract Class.
- **Interface**: Nghĩa tiếng Việt là *giao diện*, chắc các bạn nghe từ User Interface nhiều hơn. User Interface là giao diện người dùng, các bạn tưởng tượng vào TiKi có một cái button để sort. Người dùng bình thường cóc cần quan tâm quá trình sort đấy như nào, họ chỉ quan tâm bấm vào cái nút ấy là nó sắp xếp theo giá, hay gì đó.
- Tương tự, Interface trong lập trình OOP nói riêng cũng vậy. Nó bao gồm các abstract methods chỉ có tên hàm mô tả hành vi của hàm mà không có thân hàm thực hiện hành vi đó. Ngoài ra có thể có các biến const.
- VD:
```JAVA
public interface IBirdAbilities {
    boolean fly();
    boolean swim();
    //...
}
```
- **Abstract Class**: Nghĩa tiếng Việt là *lớp trừu tượng*. Bản chất abstract class là một class vì vậy có tất cả tính chất của một class (có thể có biến, có hàm,..). Chỉ có điểm khác duy nhất là abstract class có abstract methods (các phương thức trừu tượng) trong khi class bình thường không có.
- Một abstract class nên có *ít nhất một* abstract method.
- Khi một class kế thừa một abstract class thì class đó phải implement tất cả các abstract methods của abstract class.
- Chúng ta không thể tạo ra được một Instance từ một abstract class mà chỉ có thể tạo ra một anonymous object (đối tượng nặc danh). Tương tự với Interface nha.
- VD: 
```JAVA
public abstract class God {
    abstract String killSomeone(String name);
}
```
```JAVA
public class Main {
    public static void main(String[] args) {
        //God god = new God(); error
        
        //Anonymous class
        God god = new God() {
            @Override
            String killSomeone(String name) {
                return "you";
            }
        };
    }
}
```
- **Note**: Đến đây chúng ta thấy rằng mục đích của Interface và Abstract Class là để đạt được tính trừu tượng trong lập trình hướng đối tượng.
## 2.2. Kế thừa.
- Chúng ta biết rằng trong Java một class chỉ có thể kế thừa từ một và chỉ một class khác. Abstract class cũng không ngoại lệ, nó chỉ có thể kế thừa từ một class bình thường hoặc một abstract class khác.
- Một class có thể implement (triển khai) một hoặc nhiều interface. Abstract class cũng vậy, nó có thể implement một hoặc nhiều interface khác nhau.
- Nhưng một interface có thể extends từ nhiều interface khác.

![](https://images.viblo.asia/46a0dcff-d4b7-438a-8122-9e7e2e395965.PNG)
## 2.3. Quan hệ HAS-A, IS-A.
- Nếu class A **extends** class B: thì đó là quan hệ **is-a**. Vì sao? Is-a có nghĩa là cái này *là* cái kia. Khi A kế thừa B thì A sẽ có những tính chất của B, nói cách khác A là một bản sao có các tính chất của B.
- Nếu class A **implements** interface B: thì đó là quan hệ **has-a**. Vì sao? Has-a có nghĩa là cái này *có khả năng* gì đó. Khi A implements (triển khai - từ này dịch hơi ngựa) B thì là lớp A có các khả năng được mô tả trong các hàm của interface B.

## 2.4. Chế độ truy cập (access modifier)
- **Interface**: Về lý thuyết thì mặc định là kiểu public, thậm chí chúng ta không cần thiết phải khai báo chế độ truy cập cho các methods trong interface. Vì các methods này cũng không được sử dụng trực tiếp.
- **Abstract method**: Chúng ta có thể sử dụng public hoặc protected nhưng không sử dụng được private cho các abstract methods. Vì sẽ có các lớp kế thừa từ lớp này, nếu để private thì không thể truy cập được.

## 2.5. Các trường dữ liệu (data fields)
- **Interface**: Không chứa các trường dữ liệu. Chỉ có thể chứa các biến hằng (static, final)
- **Abstract class**: Cũng như một class bình thường, abstract class hoàn toàn có thể chứa các trường dữ liệu.

## 2.6. Từ khóa (Key words)
- Interface: sử dụng keyword **interface** để khai báo.
```JAVA
public interface SortAlgorithm {
    void sort(int[] data);
}
```
- Abstract class: sử dụng key word **abstract** trước class:
```JAVA
public abstract class Person {
    abstract String run();
}
```

## 2.7. Constructor & Deconstructor
- **Interface**: Không có constructor và cả deconstructor.
- **Abstract class**: Có thể tạo constructor và deconstructor nhưng thường sẽ không được sử dụng trực tiếp vì không tạo được các instance từ các abstract class. Ví dụ.
- Abstract Person.
```JAVA
public abstract class Person {
    protected String name;
    protected int age;
    protected Person(String name, int age){
        this.name = name;
        this.age = age;
    }
    abstract void say();
    abstract void run();
    abstract void walk();
}
```
- Nếu cố gắng tạo một instance và truyền các tham số vào constructor thì sẽ như này. Có gì đó sai sai vì đây là một anonymous person mà lại có tên và tuổi?
```JAVA
Person p = new Person("A", 20) {
        @Override
        void say() {}

        @Override
        void run() {}

        @Override
        String walk() {}
    };
```
- Chúng ta thường sử dụng keyword **super** ở lớp con để gọi đến constructor/ deconstructor được kế thừa abstract class. Ví dụ:
```JAVA
public class Student extends Person{

    Student(String name, int age) {
        super(name, age);
    }

    @Override
    public void say() {}

    @Override
    public void run() {}

    @Override
    public void walk() {}
}
```

## 2.8. Khi nào dùng Interface, khi nào dùng Abstract class?
- Đây có lẽ là phần được mong chờ nhất vì nếu xét về mục đích thì Interface hay là Abstract class có vẻ giống nhau đó là hướng tới tính trừu tượng. Vậy khi nào nên dùng interface, khi nào thì nên dùng abstract class. 
- Câu trả lời thực ra đã nằm ở các phần trên. Ở đây mình chỉ lấy ví dụ để các bạn hình dung ra thôi ha.

***Chúng ta bắt đầu với ví dụ này về việc khi nào nên sử dụng Interface.***
- Đầu tiên là Interface SortAlgorithm:
```JAVA
public interface SortAlgorithm {
    void sort(int[] data);
}
```
- Và 2 class là BubbleSort và InsertionSort implement interface SortAlgorithm:
```JAVA
public class BubbleSort implements SortAlgorithm {
    @Override
    public void sort(int[] data) {
        for(int i = 0; i < data.length-1; i++){
            for(int j = 1; j < data.length - i; j++){
                if (data[j-1] > data[j]) {
                    int temp = data[j-1];
                    data[j-1] = data[j];
                    data[j] = temp;
                }
            }
        }
    }
}
```
```JAVA
public class InsertionSort implements SortAlgorithm {
    @Override
    public void sort(int[] data) {
        for (int i = 1; i < data.length; i++) {
            int item = data[i];
            int j = i - 1;
            while ((j >= 0) && (item < data[j])) {
                data[j+1] = data[j];
                j--;
            }
            data[j+1] = item;
        }
    }
}
```
- Và ở class Main chúng ta thực hiện sắp xếp như sau:
```JAVA
public class Main {
    static int[] data = {9, 14, 3, 2, 43, 11, 58, 22};

    public static void printSortedArray() {
        for (int i = 0; i < data.length; i++){
            System.out.print(data[i] + " ");
        }
    }
    
    public static void main(String[] args) {
        //sort by bubble sort
        SortAlgorithm bubbleSort = new BubbleSort();
        bubbleSort.sort(data);
        System.out.print("bubble sort: ");
        printSortedArray();
        //sort by insertion sort
        SortAlgorithm insertionSort = new InsertionSort();
        insertionSort.sort(data);
        System.out.print("insertion sort: ");
        printSortedArray();
    }
}
```
- Vậy ở đây các bạn rút ra nhận xét gì hem? Rõ ràng là lớp BubbleSort hay là InsertionSort hoặc nếu bạn có thêm QuickSort, SlectionSort,... nữa thì những lớp này vẫn sẽ có chung function sort() có chung tham số truyền vào, chung kiểu trả về. Khi đó các bạn nghĩ đến việc sử dụng interface. Nói nôm na là khi hệ thống có một chức năng gì mà muốn thể hiện theo nhiều cách khác nhau thông qua các class khác nhau thì chính là trường hợp cho việc sử dụng interface.
- Một ví dụ khác các bạn có thể thấy đó là ví dụ về Interface List và các class kế thừa nó ArrayList, Vector, LinkedList.

***Còn về việc sử dụng abstract class thì sao? Khi nào ta nên sử dụng abstract class?***
- Mình sẽ lấy ví dụ như thế này:
- Chúng ta có một abstract class Person với abstract method run();
```JAVA
public abstract class Person {
    abstract String run();
}
```
- Class Student kế thừa class Person:
```JAVA
public class Student extends Person{
    @Override
    public String run() {
        return "I run by foots";
    }
}
```
- Class Teacher cũng kế thừa lớp Person:
```JAVA
public class Teacher extends Person {
    @Override
    public String run() {
        return "I run by foots";
    }
}
```
- Các bạn có nhận xét gì hem? Có vẻ giống với interface mà? Hi, không nha, mặc dù Student và Teacher đều có hàm run() nhưng thể hiện của hàm này ở hai lớp là như sau. Có nghĩa là Student hay Teacher thì có đều có thể chạy và chạy như nhau. Chứ không như interface mặc dù tên hàm, tham số, trả về giống nhau nhưng thể hiện lại khác nhau. Vậy khi mà chương trình của chúng ta có các đối tượng các tính chất giống nhau trong cách thể hiện thì ta nghĩ đến abstract class.

## 2.9. Khả năng thay đổi hành vi ở runtime và tái sử dụng code.
- **Khả năng thay đổi hành vi ở runtime**: Thế nào là runtime? Hiểu đơn giản là lúc chương trình của chúng ta chạy. Vậy thay đổi hành vi ở runtime là gì?
- Quay lại với ví dụ về việc khi nào nên sử dụng Interface bên trên. Các bạn để ý trong hàm main() phương thức sort() của mình được triển khai khác nhau (có thể là bubble sort, có thể là insertion sort,..) khi chương trình chay.
- Đó chính là thay đổi hành vi ở runtime và đây chính là sự linh hoạt mà interface đem lại.
- **Khả năng tái sử dụng code**: Nếu thay đổi hành vi ở runtime là đặc điểm của interface thì khả năng tái sử code lại là đặc điểm của abstract class. Vì khi nhiều class kế thừa từ một abstract class thì chúng phải override lại tất cả các abstract methods và ở các đối tượng này chúng hoạt động như nhau (không thể thay đổi hành vi lúc runtime). Cho nên việc sử dụng abstract là tăng khả năng tái sử dụng code.

# 3. Kết luận.
- Ở đây mình chỉ so sánh chủ yếu dựa trên khía cạnh lý thuyết, chưa có nhiều ví dụ thực tế. Nhưng mình đã list ra được một số sự khác nhau tiêu biểu. Hi vọng đủ để có thể pass qua câu phỏng vấn này. Bạn nào thấy thiếu sót cứ cmt góp ý nha.
- Tham khảo: https://www.youtube.com/watch?v=vXGcnuxPg1U&t=255s