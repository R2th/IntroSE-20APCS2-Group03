![](https://images.viblo.asia/5131ce09-25f4-442b-90f8-b8832ddab7c4.png)

# 1. Giới thiệu nhân vật.
**Tý:** Nhìn cái tiêu đề là tao biết mày định nói về 4 cái tính chất của lập trình hướng đối tượng chứ gì, cái này xưa rồi mày nói ai nghe chứ!

**Tèo:** Mày đừng tưởng bở, hỏi ra khối đứa không biết. Không khéo tao hỏi mày cũng chịu cứng râu nên :rofl:

**Tý:** What? Tao kinh nghiệm gần 1 năm code java. Mày ngon thì hỏi đi tao trả lời hết, dăm ba cái khái niệm :triumph:

**Tèo:** Good! Vậy để tao thử xem kinh nghiệm gần 1 năm của mày nó ở cái level nào. Câu hỏi đơn giản thôi, có hai cách khai báo như này: 

```JAVA
List<Student> listOfStudents = new ArrayList<>(); (1)
```

```JAVA
ArrayList<Student> listOfStudents = new ArrayList<>(); (2)
```
Theo mày thì khai báo theo cách nào sẽ tận dụng được tính đa hình và tận dụng như thế nào?

**Tý:** Tưởng câu gì khó, tao chọn cách (1).

**Tèo:** Ơ, thằng này được. Sao mày biết, giải thích xem nào.

**Tý:** Ahihi, thực ra tao mới đọc được một bài viết trên Viblo chứ tao cũng có biết gì đầu, toàn khai báo theo cách (2). Bài viết ý đây này: https://viblo.asia/p/su-khac-nhau-giua-bien-tham-chieu-kieu-list-va-arraylist-trong-java-la-gi-djeZ1e8JZWz

**Tèo:** Á đ*, bài viết của tao mà.  Tưởng thế nào, thôi vào vấn đề. Mày xem "Bộ tứ siêu đẳng - Fantastic Four" chưa? Hôm nay tao sẽ phân tích 4 tính chất của lập trình OOP dựa trên 4 nhân vật của phim này.

**Tý:** Có vẻ hay nhỉ, hóng!

# 2. Phân tích nhân vật.

## 2.1. Tính Bao Đóng (Encapsulation)

### 2.1.1. Giới thiệu.

- Đầu tiên, chúng ta cùng nói về chị gái duy nhất trong đội (xinh đúng hem các bạn). Nếu các bạn từng xem phim thì biết chị này có khả năng đó là **tàng hình**. Nghe hợp với tính chất bao đóng đúng không nào. Nếu chiếu theo khái niệm thì ta có định nghĩa của tính bao đóng là: **"Encapsulation refers to the bundling of data with the methods that operate on that data, or the restricting of direct access to some of an object's components"**
- Dịch nôm na là chúng ta sẽ dùng các phương thức để thao tác với dữ liệu (ở đây là các biến, tính chất của đối tượng) thay vì thao tác trực tiếp. Sử dụng các chế độ truy cập (**access modifier**) để hạn chế truy cập vào các thành phần của đối tượng. Ok!, các bạn coi hình bên dưới sẽ dễ hình dung hơn.

![](https://images.viblo.asia/acafd251-8ee6-4e46-a60c-31d3110db6b1.jpg)

Chúng ta tạo ra hai đối tượng Medicine01 và Medicine02 và mỗi đối tượng có hai biến với chế độ truy cập khác nhau.

![](https://images.viblo.asia/fbf106f9-5a1d-487c-a69c-3e8079f73b11.png)

- Chúng ta thấy ở chế độ **public** thì ta có thể truy nhập tới trường dữ liệu đó ở trong class và cả ngoài class (ở đây mình truy cập từ class Main mà vẫn ok). Còn nếu để ở chế độ **private** thì chỉ có bên trong class mới truy nhập được. Đó chính là những biểu hiện đầu tiên cho tính bao đóng (encapsulation). 
- Nhiều bạn mới code thường để public hết, không sai nhưng làm như vậy sẽ đánh mất tính bao đóng của lập trình hướng đối tượng và có thể làm thay đổi giá trị của các trường dữ liệu trong đối tượng một cách không mong muốn. Bây giờ chúng ta sẽ tìm hiểu kỹ hơn về các chế độ truy cập (ở đây mình lấy ví dụ với ngôn ngữ Java)

### 2.1.2. Các chế độ truy cập (access modifier)

Chúng ta có 4 loại phạm vi truy cập đó là:
1. **private**
2. **public**
3. **default**
4. **protected**

Trước khi nói về 4 kiểu truy cập này mình sẽ qua một chút về **package** (bản chất là những folders) để chúng ta chứa các class, các files có liên quan với nhau. Mục đích là để cho dự án của chúng ta rõ ràng hơn, phân tách tác moduls với nhau, nhìn vào có thể biết được chức năng của các class, các files bên trong, tiện cho việc tìm kiếm, chỉnh sửa, quản lý code. Ví dụ:

![](https://images.viblo.asia/018d217f-efa8-426f-a6fc-8680fb287c7d.PNG)

**1. private**: Chỉ cho phép truy cập *nội bộ bên trong class*

- Private có nghĩa là *riêng tư* tức là khi một thuộc tính ở chế độ Private thì chỉ bên trong class đó truy cập được. Ra bên ngoài class đó sẽ không có cách nào truy cập **trực tiếp** mà ta chỉ có thể truy cập gián tiếp thông qua các hàm setter/getter.
- Ở đây các bạn lưu ý không phải tất cả các class đều dùng để tạo các object, có những class sẽ có tác vụ riêng của nó như thực hiện các chức năng chung thì các thuộc tính nếu có, có thể sẽ **không được** để private vì phải truy cập từ nhiều class khác nhau.

**2. public**: Có thể truy cập ở *bất cứ đâu trong project* 

- Public có nghĩa là *công khai* tức là khi một thuộc tính ở chế độ Public thì ta có thể truy cập nó ở bất cứ vị trí nào trong project.

**Câu hỏi**: "Nếu hai thuộc tính ở hai class khác nhau thì chúng **gọi** đến các thuộc tính public của nhau kiểu gì?

- Đơn giản thôi, có hai trường hợp: Nếu cùng package thì bạn chỉ cần gọi là ok, nếu khác package thì bạn phải import thêm các class từ package chứa nó. Ví dụ:

![](https://images.viblo.asia/ba71e90b-ef01-4b30-8f6c-24a8acc94aab.PNG)

**3. default**: Truy cập *nội bộ bên trong package*

- Khi chúng ta không sử dụng bất kỳ kiểu truy cập nào (public, protected, private) thì mặc định sẽ là kiểu default, khi khai báo như thế nào thì các class phải ở chung một package thì mới gọi được các thuộc tính, phương thức của nhau.
- Đây cũng chính là tác dụng của kiểu khai báo này. Khi nào chúng ta muốn có một package mà chỉ có các class trong đó trao đổi thông tin với nhau thì chúng ta nghĩ đến default access modifier.

**4. protected**: Có thể truy cập trong package nếu *sử dụng kế thừa*.
- Ở đây chúng ta đề cập đến khái niệm kế thừa, nếu bạn nào chưa nắm được về tính kế thừa thì có thể qua đọc phần kế thừa xong quay lại. Protected có nghĩa là được bảo vệ (bảo vệ bởi việc phải sử dụng kế thừa mới dùng được). Mình sẽ lấy ví dụ như thế này cho dễ hình dung. Mình có 3 lớp thuộc hai package khác nhau.

![](https://images.viblo.asia/2cf6dd92-111a-4bec-b87d-16a8f3d1958f.PNG)

- Đầu tiên mình có lớp Person như sau:

```JAVA
package dto;

public class Person {
    protected String name;
    protected int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public String getName() {
        return name;
    }
    protected void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    protected void setAge(int age) {
        this.age = age;
    }
}
```

**TH1**: Nếu lớp Student không kế thừa lớp Person:

```JAVA
package app;

import dto.Person;

public class Main {
    public static void main(String[] args) {
        Person p = new Person("canhnd", 21);
        p.setName();// error because this method is protected.
        p.getName();// ok because this method is public
    }
}
```

Chúng ta không thể truy cập phương thức setName() bởi vì nó đang ở chế độ **protected**

**TH2**: Nếu lớp Student kế thừa lớp Person và lớp Main ở khác package với Student và Person.

```JAVA
package dto;

public class Student extends Person {
    private String studentCode;
    private String school;

    public Student(String name, int age) {
        super(name, age);
    }
}
```

```JAVA
package app;

import dto.Student;

public class Main {
    public static void main(String[] args) {
        Student s = new Student("canhd", 21);
        s.setName("longnv");//error
        s.setAge(22);//error
    }
}
```

**TH3**: Nếu lớp Student kế thừa lớp Person và lớp Main ở cùng package với Student và Person.

![](https://images.viblo.asia/e65ba47a-cea1-4790-ac66-291b2f084446.PNG)

```JAVA
package dto;

import dto.Student;

public class Main {
    public static void main(String[] args) {
        Student s = new Student("canhd", 21);
        s.setName("longnv");//ok
        s.setAge(22);//ok
    }
}
```

- Phần kết luận mình để các bạn tự rút ra nha :hugs:

# 2.2. Tính Kế Thừa (Inheritance)

## 2.2.1. Giới thiệu.

- Quay trở lại với bộ tứ siêu đẳng, bạn ấn tượng với nhân vật nào nhất? Ta đã nói về chị gái tàng hình xinh đẹp, giờ đến với anh người đá "xấu trai" nhất đội. Tôi thề là cho mấy đứa nhỏ xem kiểu gì nó cũng nhớ ông này nhất vì ngoại hình khá là "dị". Vậy liên quan gì đến tính kế thừa chứ? 
- Trong 4 tính chất của lập trình hướng đối tượng có lẽ kế thừa là tính chất "có vẻ" dễ hiểu nhất, dễ từ cái tên đến khái niệm nhưng sức mạnh thì lại không hề nhỏ. Ok, nếu các bạn xem mấy phim về siêu anh hùng thì thấy rằng mấy ông to con thường dễ nắm bắt, không mưu mẹo nhưng được cái khỏe đúng hem :+1:
- Kế thừa được định nghĩa trên wiki: **"Inheritance is the mechanism of basing an object or class upon another object (prototype-based inheritance) or class (class-based inheritance), retaining similar implementation"**. Tất nhiên chúng ta có thể hiểu theo nhiều cách khác nhau, nhưng đơn giản nhất theo nghĩa đen (trong lập trình) là việc một class thừa hưởng lại những thuộc tính, phương thức của class khác với mục đích tái sử dụng lại code, thuận lợi cho việc nâng cấp và bảo trì.
- Ví dụ thực tế:

![](https://images.viblo.asia/94cd3891-5205-4a47-bb55-db3cd4fc354a.png)

## 2.2.2. Đặc điểm của kế thừa.

- Ở đây mình vẫn sẽ dùng Java làm ngôn ngữ cho các ví dụ nha.

![](https://images.viblo.asia/2eccec3c-69b2-49c7-9e8b-ff9b399da084.png)

- Chúng ta thấy rằng 2 lớp Student và Teacher có chung hai thuộc tính là name và age. Vậy làm sao để chỉ cần khai báo hai thuộc tính này một lần? Trong trường hợp có 2 lớp thì ok, tôi khai báo lại cũng được. Nhưng khoan, nếu có tới cả chục, cả trăm lớp cần đến hai thuộc tính này thì sao? Tôi phải khai báo lại 100 lần ư? 
- Đó là lúc chúng ta nghĩ đến kế thừa. Và đó cũng là lý do chúng ta tạo ra lớp Person là lớp có đặc điểm chung và cho hai lớp Student và Teacher kế thừa lớp đó.
- Đây chính là lý do đầu tiên mà chúng ta nên sử dụng kế thừa: **"Code Reusability - khả năng tái sử dụng code"**

- Lý do khác để chúng ta sử dụng kế thừa đó là... coi ví dụ và đoán xem nhé.

![](https://images.viblo.asia/4f24bc7c-31b7-4dca-b04d-cf3f06cb15bd.PNG)

- Các bạn đã đoán ra chưa nào! Đó chính là **Method Overrding - Ghi đè phương thức**. Có một khái niệm mà các bạn hay nhầm lần với Method Overriding đó là **Method Overloading - Nạp chồng phương thức**. Trong khuông khổ bài viết này mình sẽ không đề cập đến nhưng các bạn lưu ý cho mình nhé.
- Vậy Overriding là gì? Đó chính là ở lớp con (sub class) có các phương thức giống với phương thức đã được khai báo ở lớp cha (super class).
- Vậy thế nào là **GIỐNG**? Khi đảm bảo đủ 3 rules này thì giống:

![](https://images.viblo.asia/7043417f-ba59-46f9-b37d-a2ba1021d569.png)

- Giống về tên
- Giống về các tham số
- Và phải có quan hệ kế thừa (IS - A)
- Code ví dụ nha:

```JAVA
public class Bank {
    public float getRateOfInterest(int value1, int value2) {
        return (value1 + value2) / 2;
    }
}
```

```JAVA
public class Vietcombank extends Bank {
    @Override
    public double getRateOfInterest(int value1, int value2) {
        return super.getRateOfInterest(value1, value2) * 0.9;
    }
}
```

```JAVA
public class Techcombank extends Bank {
    @Override
    public double getRateOfInterest(int value1, int value2) {
        return super.getRateOfInterest(value1, value2) * 0.8;
    }
}
```

```JAVA
public class Agribank extends Bank {
    @Override
    public double getRateOfInterest(int value1, int value2) {
        return super.getRateOfInterest(value1, value2) * 0.85;
    }
}
```

- Còn một vấn đề về việc đa kế thừa thì mình sẽ trình bày trong một bài viết riêng [tại đây](https://viblo.asia/p/da-ke-thua-trong-java-tai-sao-khong-4dbZNJMaZYM). Tại sao Java lại không hỗ trợ đa kế thừa (một lớp có thể kế thừa từ nhiều lớp một lúc) mà chỉ hỗ trợ đơn kế thừa?

- Trong phần 2 mình sẽ cùng các bạn tìm hiểu về hai anh trai đẹp còn lại. Các chị em hẳn háo hức lắm :stuck_out_tongue_winking_eye:
# Tham khảo.
- https://www.javatpoint.com/inheritance-in-java
- https://www.javatpoint.com/method-overriding-in-java
- https://www.howkteam.vn/course/lap-trinh-java-co-ban-den-huong-doi-tuong/bon-tinh-chat-cua-huong-doi-tuong-trong-java-3893