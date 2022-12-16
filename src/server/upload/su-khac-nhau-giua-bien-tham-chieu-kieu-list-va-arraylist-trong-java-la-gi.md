![](https://images.viblo.asia/375aa3d9-6e4e-45e1-998c-1adcbc9b8422.png)

# 1. Đặt vấn đề. 
Trong bài viết này mình sẽ cùng các bạn tìm hiểu về hai cách khai báo biến trong Java. Tại sao chúng ta có thể sử dụng cả Interface và Class là kiểu biến? Dùng cách nào sẽ có ưu điểm hơn và tại sao? Mình lưu ý là ở đây mình chỉ đề cập đến các kiểu dữ liệu không phải là kiểu nguyên thủy (non primitive) vì kiểu dữ liệu nguyên thủy có cách khai báo riêng của nó.

Ví dụ: Ở đây mình lấy ví dụ về Interface **List** và Class **ArrayList** nhé. Tại sao? Vì đây có thể nói là một ví dụ điển hình, nhiều bạn từng thấy trong các đoạn code trên mạng hoặc trong các dự án nhưng không mấy để ý.

Yêu cầu: Nắm được sự khác nhau giữa Interface và Class, thế nào là tính đa hình (Polymorphism) trong lập trình hướng đối tượng.

# 2. Phân tích ví dụ.
``` JAVA
    List<Student> listOfStudents = new ArrayList<>(); (1)
```
Chắc các bạn đã nhìn thấy cách khai báo này nhiều rồi nhỉ! Ta cùng phân tích dòng code này một chút. Vế trái khai báo một biến có tên là listOfStudents với kiểu biến là kiểu List và kiểu dữ liệu là đối tượng Student. Vế phải ta có toán tử new để khởi tạo một đối tượng  ArrayList. Ở đây ta sẽ tạo ra một biến tham chiếu đến một vùng nhớ mà chứa các đối tượng Student.

Như mình đã trình bày chúng ta hoàn toàn có thể khai báo như sau:
```JAVA
    ArrayList<Student> listOfStudents = new ArrayList<>(); (2)
```

**Câu hỏi 1:**  Vậy khai báo như nào cho đúng?

Câu trả lời là cách nào cũng đúng hết chỉ có điều là cách nào giúp chương trình của chúng ta linh hoạt hơn thôi. Về cơ bản chúng ta hiểu rằng một Class  có thể triển khai (implement) một hoặc nhiều interface. Ở đây, lớp ArrayList implement interface List, điều đó có nghĩa List là **supertype** trong khi ArrayList là **subtype**. Trong Java và các ngôn ngữ lập trình hướng đối tượng khác thì một biến kiểu supertype có thể lưu (tham chiếu) một đối tượng của subtype. Kết luận, cách khai báo (1) không có gì sai cả, còn cách khai báo (2) thì là khai báo theo chuẩn rồi không có gì phải bàn. 

**Câu hỏi 2:** Nếu cách (2) là đúng thì tôi khai báo theo cách (1) có gì hay ho không?

Câu trả lời tất nhiên là "yes!", không có gì hay ho thì người ta nói làm gì :stuck_out_tongue_winking_eye: . Bây giờ hãy thử suy nghĩ nếu bạn không muốn new một ArrayList object nữa mà thay vào đó là **"new Vector<>()"** hoặc **"new LinkedList<>()"** thì sẽ như thế nào? Vì thực tế biến của chúng ta có thể nhận giá trị trả về từ một số hàm nào đó. Nếu mỗi hàm trả về một kiểu thì sao? Đó, chính là lợi điểm đầu tiên của cách khai báo (1). Nguyên nhân là do các lớp ArrayList, Vector hay LinkedList đều implement từ Interface List. (Đây là một ví dụ khá hay về tính đa hình đó ha ...)

```JAVA
    List<Student> listOfStudents = new ArrayList<>(); (work)
    or
    List<Student> listOfStudents = new Vector<>(); (work)
    or
    List<Student> listOfStudents = new LinkedList<>(); (work)
```

```JAVA
    ArrayList<Student> listOfStudents = new Vector<>(); (error)
    or
    ArrayList<Student> listOfStudents = new LinkedList<>(); (error)
```

**Câu hỏi 3:** Còn gì hay ho nữa không bạn ơi?

Tất nhiên là "yes!". Ít vậy ai người ta nói làm gì :stuck_out_tongue_winking_eye:. Như trong câu hỏi 2 mình có nói là biến có thể nhận giá trị trả về từ nhiều hàm và mỗi hàm có thể trả về một kiểu khác nhau ví dụ như này: (Vì thực tế mỗi cấu trúc dữ liệu sẽ phù hợp với một loại dữ liệu hoặc chạy đơn luồng hay đa luồng nên sẽ phải có các hàm trả về khác nhau)

```JAVA
    public ArrayList<Student> getListStudents(){
        ArrayList<Student> list = new ArrayList<>();
        //do something
        return list;
    }

    public Vector<Student> getListStudents(){
        Vector<Student> list = new Vector<>();
        //do something
        return list;
    }

    public LinkedList<Student> getListStudents(){
        LinkedList<Student> list = new LinkedList<>();
        //do something
        return list;
    }
```

Ơ, thế viết như này thì chỉ có một công việc mà phải viết tận 3 hàm lận. Bạn đùa tôi à!
Khoan khoan, mình đã nói xong đâu. Coi đoạn code này nhé:

```JAVA
    public List<Student> getListStudents(List<Student> list){
        list.add(new Student(1L, "B142", "A"));
        list.add(new Student(2L, "B145", "B"));
        //... do something.
        return list;
    }

    public void perform(String[] args) {
        List<Student> list1 = getListStudents(new ArrayList<>());
        List<Student> list2 = getListStudents(new Vector<>());
        List<Student> list3 = getListStudents(new LinkedList<>());
        or
        ArrayList<Student> list1 = (ArrayList<Student>) getListStudents(new ArrayList<>());
        Vector<Student> list2 = (Vector<Student>) getListStudents(new Vector<>());
        LinkedList<Student> list3 = (LinkedList<Student>) getListStudents(new LinkedList<>()); 
    }
```

Đó, ta sẽ chuyển kiểu trả về của hàm thành kiểu List và đồng thời truyền tham số là cấu trúc dữ liệu mà bạn muốn sử dụng. Bạn truyền vào kiểu nào ta sẽ thao tác trên kiểu đó và trả về một List. Khi lấy giá trị trả về từ hàm ta có thể dùng một biến kiểu List hoặc ép kiểu về các kiểu dữ liệu tương ứng.

# 3. Kết luận.

1. Về mặt lý thuyết khai báo như cách (1) hay cách (2) thì nó đều tạo một đối tượng mà ta khai báo sau toán tử new chỉ khác nhau là ở cái kiểu biến ta tham chiếu đến đối tượng đó.

2. Khai báo theo cách (1) sẽ tận dụng được tính đa hình trong lập trình hướng đối tượng và làm cho chương trình của chúng ta linh hoạt hơn, dễ mở rộng hơn sau này.

# 4. Tham khảo.

1.  https://www.java67.com/2016/01/difference-between-list-and-arraylist-variable-in-java.html
2.  Ngoài ra mình cũng có một blog nhỏ, nơi mình chia sẻ kiến thức về lập trình nói chung và Java nói riêng. Các bạn có thể theo dõi blog **[tại đây](https://laptrinhb2a.com/)** nha.

Thanks all ❤️❤️❤️