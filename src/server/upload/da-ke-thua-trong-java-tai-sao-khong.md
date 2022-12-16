![](https://images.viblo.asia/8103ab52-6f01-4d2c-b5f9-78234c063e11.png)
# 1. Mở đầu câu chuyện.
- **Tý**: Hey, hôm trước thấy mày nói về 4 tính chất của lập trình hướng đối tượng hay quá. Nay tao hỏi cái này được không?
- **Tèo**: Okay, mày hỏi đi nếu biết tao sẽ giải đáp hết.
- **Tý**: Chuyện là crush tao nó mới học đến **kế thừa** trong Java. Thầy giáo hỏi:" **Tại sao Java lại không hỗ trợ đa kế thừa?** Bạn nào trả lời được thầy cộng điểm". Nó hỏi tao mà tao bối rối quá mày ạ. Mày trả lời giúp tao có gì tao hậu tạ sau :wink:
- **Tèo**: Thì ra là mày hỏi hộ gái, đúng là anh em cây khế. Hôm trước tao nhờ điểm danh hộ thì bảo sợ cô phát hiện, giờ gái nhờ lại nghĩ đến anh em. Tao e* giúp mấy đứa dại gái đâu. :stuck_out_tongue_winking_eye:
- **Tý**: Please, giờ tao phải làm gì mày mới giúp tao? 
- **Tèo**: Đơn giản thôi, mày đưa facebook crush mày đây, tao nhắn tin trực tiếp bạn ý sẽ dễ hiểu hơn :rofl:
- **Tý**: Thôi dẹp, khôn như mày xóm tao xích đầy :triumph:

Đùa chút cho có không khí nhỉ. Như các bạn biết thì không giống C++,  Java không hỗ trợ đa kế thừa. Vậy tại sao lại không hỗ trợ? Và làm thế nào để trong Java ta vẫn đạt được mục đích **"đa kế thừa"**.
# 2. Tại sao Java lại không hỗ trợ đa kế thừa?
- Để trả lời được câu hỏi này thì chúng ta phải hiểu thế nào là kế thừa? Các bạn có thể tham khảo thêm ở bài viết này: https://viblo.asia/p/4-tinh-chat-cua-lap-trinh-huong-doi-tuong-bo-tu-sieu-dang-phan-1-3P0lPPAolox
- Ở đây mình tóm gon lại như này: Nếu class A kế thừa class B thì class A sẽ thừa hưởng các tính chất, phương thức của lớp B.
- Vậy đa kế thừa là gì? Đơn giản là một class sẽ kế thừa từ NHIỀU HƠN một class khác. Ví dụ 1:

![](https://images.viblo.asia/13c0dea7-d19d-4387-90b6-df7e400f0c58.PNG)

- Mọi thứ cho đến lúc này vẫn ổn đúng không nào, nhưng hãy tưởng tượng nếu mình cho ba lớp Hacker, Gamer, Coder cùng kế thừa từ một lớp là Person như sau:

![](https://images.viblo.asia/8953b44d-43f1-42be-927f-b2833d50a3d2.PNG)

- Bây giờ mình giả sử nếu là Hacker sẽ ngủ ngày thức đêm, Gamer sẽ thức cả ngày còn Coder thức ngày ngủ đêm. Vậy câu hỏi trong một ngày thằng sinh viên It chỉ có thể hoặc là làm Hacker hoặc là Gamer hoặc là Coder (vì nó còn phải đi học mà) thì nó sẽ ngủ như thế nào? Câu này sẽ khó nếu không biết hôm đó được nghỉ sáng, nghỉ tối hay nghỉ cả ngày!
- Đây chính là nhược điểm của đa kế thừa. Nó khiến cho code trở nên mơ hồ hay người ta còn gọi đây là **[diamond problem](https://en.wikipedia.org/wiki/Multiple_inheritance)**:
- Một ví dụ khác như thế này:
```JAVA
public abstract class LiveAnimals {
    abstract String livingPlace();
}
```
```JAVA
public class Terrestrials extends LiveAnimals {
    @Override
    String livingPlace() {
        return "On the ground";
    }
}
```
```JAVA
public class Aquatics extends LiveAnimals {
    @Override
    String livingPlace() {
        return "Under the water";
    }
}
```
```JAVA
public class Amphibilans extends Terrestrials, Aquatics { //error
}
```
- Trong ví dụ này mình có lớp LiveAnimals (động vật sống) và hai lớp Terrestrials (động vật trên cạn), Aquatics (động vật dưới nước) kế thừa từ lớp LiveAnimails. Và mình có lớp Amphibilans (lưỡng cư).
- Rõ ràng là Amphibilans phải kế thừa từ cả hai lớp Terrestrials, Aquatics vì lưỡng cư có thể sống cả trên cạn lẫn dưới nước. Nhưng không, nếu kế thừa như thế sẽ lỗi trong khi thực tế thì lại có thể.
- Vậy kết luận là gì: Java không cho phép đa kế thừa **VÌ** chúng ta biết rằng java được thiết kế với nhiều cải tiến trong đó **sự đơn giản** là một trong những điều quan trọng. Việc cho phép đa kế thừa sẽ mang đến nhiều hệ lụy, khiến cho code trở nên mơ hồ.

# 3. Vậy làm sao đạt được mục đích "đa kế thừa" trong java.
- Đơn giản thôi, chúng ta sẽ sử dụng interface. Một class không thể kế thừa từ nhiều class khác nhưng có thể implements nhiều interface khác nhau một lúc.
- Ta quay lại với ví dụ đầu tiên ta giải quyết vấn đề bằng cách sử dụng các interface.
- Tạo ba interface như sau:
```JAVA
public interface ICoder {
    String sleep(String time);
    void code();
}
```
```JAVA
public interface IGamer {
    String sleep(String time);
    void playGame();
}
```
```JAVA
public interface IHacker {
    String sleep(String time);
    void hackFacebook();
}
```
- Lớp ItStudent sẽ implements cả ba interface đó:
```JAVA
public class ItStudent implements IHacker, IGamer, ICoder {
    @Override
    public void code() {
    }

    @Override
    public void playGame() {
    }

    @Override
    public void hackFacebook() {
    }

    @Override
    public String sleep(String time) {
        return time;
    }
}
```
- Và khi muốn ItStudent là hacker, coder hay gamer các bạn chỉ cần làm như sau:
```JAVA
public class Main {
    public static void main(String[] args) {
        IGamer gamer = new ItStudent();
        gamer.playGame();
        gamer.sleep("no sleep :)");

        ICoder coder = new ItStudent();
        coder.code();
        coder.sleep("I work on morning and sleep in the evening");

        IHacker hacker = new ItStudent();
        hacker.hackFacebook();
        hacker.sleep("I work on evening and sleep in the morning");
    }
}
```
- Ở đây ta thấy các interface ICoder, IHacker và IGamer đề có chung hàm **String sleep(String time);** nhưng khi ItStudent implements chúng thì chỉ có một hàm được triển khai. Đây chính là đặc điểm của interface, nó có khả năng thay đổi thay đổi hành vi ở runtime. Và cũng là lý do tại sao chúng ta dùng interface để đạt được mục đích "*đa kế thừa*".
# 4. Kết luận
- Vậy là qua bài viết này mình đã cùng các bạn trả lời câu hỏi: "Tại sao Java lại không hỗ trợ đa kế thừa?" và làm thế nào để vẫn đạt được mục đích đa kế thừa trong java giống như Cpp hoặc Python.
- Các bạn có thể đọc thêm về interface và abstract class để hiểu rõ hơn tại đây: https://viblo.asia/p/interface-vs-abstract-class-ke-tam-lang-nguoi-nua-can-07LKX9JeZV4