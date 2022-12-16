*Đây là 1 bài dịch các bạn nhé:v*

Ai cũng có một thời làm new dev=)) 
Bài viết này tổng hợp những  kinh nghiệm thực tế của bản thân tôi – khi còn là 1 new dev Java. Khoảng thời gian đó, tôi thường được các đàn anh trong công ty review code cho, nên đã nghiệm ra được nhiều điều bổ ích. Hy vọng, bài viết này sẽ giúp ích cho các bạn.


### Tạo các biến instance không cần thiết
Biến instance dùng để giữ, duy trì trạng thái, nên dễ gây ra lỗi.
Có lần tôi  tạo biến instance, và đã bị comment lại là: 「Phần này dùng biến local hay hơn mà nhỉ?」

**Trước khi tạo biến instance, bạn hãy xem xét lạ: Phần đó có thể thực hiện bằng biến Local không?**

### Khai báo tất cả các biến số ở phần đầu Method

Có lẽ đây là 1 thói quen mà những lập trình viên đã từng học qua ngôn ngữ C thường gặp phải.
Do scope của biến số thường bị mở rộng một cách không cần thiết, nên việc trace (truy dấu) sẽ gặp rất nhiều khó khăn.

```
Ví dụ Chưa hợp lý
public String function() {
    int count;
    int max;
    int min;
    List fooList;
    String hogeCode;
    String fugaCode;
    String ret;

    // Nhiều loại xử lý

    return ret;
}
```
**Khi khai báo biến, bạn nên ý thức được scope của nó, và nên thực hiện vào những thời điểm thích hợp, thời điểm thực sự cần thiết.**

### Đặt tên biến không rõ ràng, thiếu thông tin

Thường gặp ở các lập trình viên còn đang chập chững, mới vào nghề. Tuy nhiên, nếu không để ý, đặt tên tùy tiện thì lập trình viên lâu năm, có kinh nghiệm cũng sẽ gây ra lỗi này.
Lập trình viên mới vào nghề thường có xu hướng lược bỏ, rút gọn tên mẫu; thêm những dãy số mà chỉ có người viết nó mới hiểu được.

```
Ví dụ chưa hợp lý
String str;  //  Strings gì đây? Chắc chỉ có người viết mới hiểu được

String code; //  Code gì đây? Để làm gì, anh chịu.

int a;       //  Kinh khủng thật sự! Nhưng thỉnh thoảng tôi vẫn bắt gặp khi review

File file1;  //  đánh số khó hiểu
File file2;

static final String MSGID_E0001 = "E0001"; // Trong hằng số có value
```


```
Ví dụ hợp lý
String userName;

String messageCode;

int age;

File userListFile;
File companyListFile;

static final String MSGID_FILE_NOT_FOUND = "E0001";
```

Tuy nhiên, không có nghĩa là: bạn cần phải đặt tên biến chi tiết, rườm rà thì mới tốt.
Với các trường hợp ngoại lệ như: counter cho câu  for, hay ngoại lệ catch thì đặt tên biến ngắn gọn cũng OK.

**Túm lại, muốn xác định đặt tên biến chi tiết tới đâu, thì bạn nên quyết định độ dài cuả Scope.**

Với các biến Instance hoặc biến Local được sử dụng trong các Method dài, thì cần đặt tên càng chi tiết càng tốt. Ngược lại, nếu scope của biến chỉ giới hạn trong block vài dòng, thì đặt tên biến ngắn cũng không có vấn đề gì.

Điều quan trọng khi viết code là: bạn phải đứng ở vị trí của người đọc code (bao gồm cả bản thân mình khi đọc lại code của mình vài tháng sau), xem họ có thể hiểu được những gì mình sẽ viết không, có thể trả lời được câu hỏi:  “Biến này dùng để lưu cái gì?”

Nếu muốn tìm hiểu cách đặt tên biến một cách đơn giản, mà vẫn đầy đủ ý nghĩa, thì ban nên tham khảo quyển sách [The Art of Readble code](http://shop.oreilly.com/product/9780596802301.do) 

![](https://images.viblo.asia/01fe1667-8bde-4cd2-9421-cdd0d7c91466.png)

### Sử dụng xxxflg  trong tên biến boolean

Đây có lẽ là phần mà các bạn hoàn toàn không để ý , nhận thức được, cho đến khi bị comment.
Nếu để là xxxFlg thì sẽ rất khó để biết khi bằng true, sẽ xử lý như thế nào.

```
Ví dụ chưa hợp lý
private boolean writeFlg = false; //  trong trường hợp này, sẽ không rõ đâu là true/false
Ví dụ hợp lý
private boolean writable = false;
```

**Tên biến boolean là subject.**
Khi viết  *Tên biến == true* thì thường sẽ được kỳ vọng là: có thể hiểu phần xử lý ngay trong 1 câu.

```
Ví dụ về tên Method
public boolean isWritable() {
    return writable;
}
```

Với cách đặt tên method như trong ví dụ trên, instance sẽ là chủ thể. Người đọc chỉ cần đọc câu lệnh tiếng Anh cũng hiểu ngay được ý nghĩa nó.

`if (note.isWritable()) { /* ... */ }`

Dưới đây là một số kiểu đặt tên method thường dùng.

•	is + tính từ

•	can + động từ nguyên thể

•	has + quá khứ phân từ

•	động từ thì hiện tại với 3 từ đơn (+danh từ)

(Tham khảo) Liên quan tới subject của boolean, dưới đây là bài viết tổng hợp các cách đặt tên tiếng Anh.
http://kusamakura.hatenablog.com/entry/2016/03/03/boolean_値を返却するメソッド名、変数名の付け方

### Đặt tên hàm số không có ý nghĩa

Đây là những ví dụ về việc định nghĩa nhiều hằng số, do trước đó đã nhận được nhiều comment  “Không được cho các phần xử lý, biến số, tham số thừa thãi, không cần thiết vào trong code” (các phần không cần thiết mà tôi nói tới ở đây tương tự như các magic number trong code) 

Hằng số không mang ý nghĩa gì, chỉ là thay đổi ký tự mà thôi.
```
private static final String HANKAKU_SPACE = " ";
private static final String BLANK = "";
private static final String COMMA = ",";
private static final String SLASH = "/";
private static final int ZERO = 0;
```

### Cuối mỗi method, bắt buộc phải có return

Lần đầu tiên bị comment về việc này, tôi đã không thể hiểu được và thầm nghĩ: “Cái này thì có gì sai?"
Tuy nhiên, sau khi đặt bản thân vào vị trí của người đọc code, tôi đã sáng tỏ được vấn đề.

```
Ví dụ không hợp lý
boolean isPrimeNumber(int num) {
    boolean ret;
    if (num < 2) {
        ret = false; // Nhỏ hơn 2 thì không phải số nguyên tố
    } else if (num == 2) {
        ret = true;  // 2 là số nguyên tố
    } else if (num % 2 == 0) {
        ret = false; // 2 Các số chẵn khác 2 không phải là số nguyên tố
    } else {
        ret = true; //  các số không chia hết là số nguyên tố
        double sqrtNum = Math.sqrt(num);
        for (int i = 3; i <= sqrtNum; i+=2) {
            if (num % i == 0) {
                ret = false;   //  Nếu chia hết thì không phải là số nguyên tố
                break;
            }
        }
    }
    return ret; 
}
```

```
Ví dụ hợp lý
boolean isPrimeNumber(int num) {
    if (num < 2) {
        return false; // Nhở hơn  2 thì không phải là số nguyên tố
    }
    if (num == 2) {
        return true;  // 2 là số nguyên tố
    }
    if (num % 2 == 0) {
        return false; // Các số chẵn khác 2 không phải là số nguyên tố.
    }
    double sqrtNum = Math.sqrt(num);
    for (int i = 3; i <= sqrtNum; i+=2) {
        if(num % i == 0) {
            return false;   // Nếu chia hết thì không phải là số nguyên tố
        }
    }
    return true; // Nếu không chia hết thì là số nguyên tố
}
```

Hãy thử xem xét case: Người thứ 3 phải trace (truy dấu) khi người viết gán 1 vào num.

Trong phần 「Ví dụ không hợp lý」: vì không biết ret dùng để gán cho cái gì, nên người đọc bắt buộc phải ghi nhớ trạng thái của ret, và phải tiếp tục đọc đến return cuối cùng.

Ngược lại, trong phần 「Ví dụ hợp lý」: đang return ngay tại  mỗi phần đánh giá.
Vì vậy, khi truy vết case num=1, người đọc chỉ cần đọc đến return ở dòng thú 3 là đã hiểu.

Method trong ví dụ trên chỉ có 10 dòng code. Nếu bạn code 1 method có tầm 50, 100 dòng với  style như ví dụ bất hợp lý trên, thì người đọc, review code  sẽ phải khổ sở tới mức nào.
**Mong muốn: Với các method:  Thời điểm đã xác định được giá trị trả về, thì thực hiện return**

Ngoài ra, việc return sớm có 1 ưu điểm là:  cấu trúc lồng nhau (nested structure) sẽ ít bị rối.

### Thêm public vào những phần không cần thiết

Khi còn là 1 lập trình viên mới vào nghề, tôi thường có xu hướng public các method biến số đã làm xong trên private. Tuy nhiên, đầu tiên bạn nên tạo trên private. Nếu cần, thì bạn tiếp tục mở rộng với protected, public.

### Tạo các class vi diệu như xxxUtil, xxxHelper, xxxManager...v.v cho an toàn

Những class có tên – mà tên đó lại không làm rõ vai trò của class, thực sự rất nguy hiểm.
Tại thời điểm bạn mới viết thì OK, không có vấn đề gì. Tuy nhiên, khi bạn muốn thêm chức năng khi maintain hệ thống trong 5, 10 năm sau thì sẽ rất tốn effort để lần lại.

Phần xxx càng trừu tượng thì người maintain càng đau đầu. Cá nhân tôi thì thấy là: Kinh khủng nhất là mấy ông đặt tên kiểu: CommonUtil
Tôi đã nhìn thấy class được đặt tên là CommonUtil được viết từ 10 năm trước đây, và kinh dị nhất là có hơn 4000 dòng code có chứa tên này (dead).

*Bạn nên đặt tên thế nào?*

Bạn nên thảo luận xem: có thể đổi thành tên được giới hạn vai trò như: Factory, Builder, Writer, Reader...v.v không

### Không viết 1 dòng commnent nào

Có lần khi đang phát triển, tôi đã rất tuyệt vọng và đã không viết 1 dòng comment nào. Y như rằng, khi đem code đi review, thì bị người review mắng cho té tát.
Các bạn hãy viết comment cẩn thận nhé. 
Đặc biệt những phần sau đây, cần phải viết comment đầy đủ. 

•	Khi có phần xử lý khó hiểu, hoặc khi có điều kiện phân nhánh phức tạp.

•	Khi trong code có những ý tưởng đặc thù, nếu chỉ đọc code không, người đọc sẽ không lĩnh hội, hiểu hết được.

### Viết comment cho các phần thông tin quá rõ ràng

Sau khi nghe lời nhận xét「Cậu hãy viết comment đi」, tôi đã áp dụng triệt để, nắn nót viết comment cho từng dòng code. Kết quả là tôi lại bị complain tiếp. Huhu.

Khi tôi comment cho từng dòng code như kiểu dịch ra tiếng Nhật (tác giả bài viết này là người Nhật nha các bạn) ý đồ viết dòng code đó, thì điều này cũng gây khó chịu cho người review code. Khi comment quá nhiều, thừa thãi, trên màn hình sẽ hiển thị được ít dòng code có nghĩa,  gây  khó nhìn code hơn.

```
Ví dụ bất hợp lý
// Get User ID về
String userId = user.getId();

// Thêm list User ID
userIdList.add(userId);
```

![](https://images.viblo.asia/465126be-3bf9-47bf-ac12-a3c13993bb66.png)

### Không xem xét tới trường hợp không Loop lần nào (khi số lần loop = 0) 

Khi thực hiện Loop với các câu lệnh for , while..v.v, có lần tôi đã không xét tới trường hợp “Không thực hiện loop lần nào”. Vì vậy, khi thực hiện unit test, đã nhiều lần phát hiện ra bug: Pattern = 0.
```
Foo foo = null;
for (int i=0; i < hogeList.size(); i++) {
    if (i == 0) {
        foo = new Foo();
    }
    // Xử lý
}
foo.function(); // Khi loop bằng 0, sẽ phát sinh NullPointerException
```

**Khi thực hiện Loop, bạn nên xét tới trường hợp có 0, 1 hoặc nhiều Pattern.**

### Coi thường việc thiết kế các ngoại lệ, giá trị trả về của Method

 Cho dù là method  thuộc phần chung public, thì spec cho giá trị trả về của đối số (argument) cũng rất mơ hồ.
 
Ví dụ: Các bạn nên thiết kế để không bị lack  case, rồi sau đó ghi vào Javadoc.

•	Nếu đối số là null, hoặc là số âm, thì sẽ trả về gì?

•	Trong trường hợp nào thì throw ngoại lệ? Ngoại lệ nào?

•	Việc trả về null – và null là 1 giá trị trả về sẽ được thực hiện trong trường hợp nào?

Nếu các bạn muốn biết các ví dụ về phạm vi của Javadoc: thì hãy thử xem [Javadoc của Oracle](https://docs.oracle.com/javase/jp/8/docs/api/)
Trong đó trình bày nhiều Method của các [class String](https://docs.oracle.com/javase/jp/8/docs/api/java/lang/String.html) quen thuộc => Khá là dễ hiểu.

### Lời kết

Để một new dev có thể viết code giỏi, thì đương nhiên, bản thân new dev phải tự mình nỗ lực.
Tuy nhiên, tôi nghĩ rằng:  được các lập trình viên ưu tú review code cho cũng rất quan trọng.

Khi được review code, bản thân new dev cũng sẽ nhận được những lời khuyên như “Nếu là anh, thì anh sẽ viết như thế này này” từ các reviewer, từ đó sẽ tự mình ngộ ra “À, thì ra là vậy!” .
Nhiều lần lặp đi lặp lại, các bạn new dev sẽ tích lũy được cho mình các kiến thức, vốn hiểu biết và có thể viết code tốt hơn, lập trình clear hơn.

Sẽ có ý kiến tán thành hoặc không tán thành với việc: Học tập từ việc Review code. Tuy nhiên, ý kiến của cá nhân tôi là: Việc Review code sẽ giúp nâng cao chất lượng code. Đồng thời nó cũng là 1 buổi học nhóm. 
Bản thân tôi, khi nhận được lời khuyên, complain từ các lập trình viên khác dành cho những phần code mà mình tự viết, tôi thường thảo luận với mọi người. Khi có những cơ hội như vậy, mọi người sẽ bàn luận với nhau về những kiến thức , kinh nghiệm, chứ không đơn thuần chỉ là 1 buổi review code nữa. Qua đó, mọi người có thể học tập những tip hay, những kinh nghiệm quý báu từ các đồng nghiệp. 

***Sưu tầm và dịch bài: Thanh Thảo***

★Link bài gốc: 

https://qiita.com/gengogo5/items/5b038cf0b4034194f63a?utm_source=Qiita%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9&utm_campaign=e14020ecee-Qiita_newsletter_309_05_02_2018&utm_medium=email&utm_term=0_e44feaa081-e14020ecee-33433141