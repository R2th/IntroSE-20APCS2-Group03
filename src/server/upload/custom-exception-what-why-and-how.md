# Lời mở đầu
Exception là một khái niệm không hề xa lạ với một lập trình viên. Các bạn cũng đã theo dõi nhiều bài viết trên Viblo nói về vấn đề này. Trong đó cũng có một số bài nói về custom exception (ngoại lệ tự định nghĩa). Tuy nhiên, cá nhân mình nhận thấy chưa có bài viết nào thực sự nói về tầm quan trọng của nó mà hầu hết các bài viết chỉ dừng lại ở việc giới thiệu custom Exception là gì mà thôi.
Vì vậy, để tiếp tục với vấn đề Exception ở bài iết trước của mình: [Câu chuyện về exception](https://viblo.asia/p/cau-chuyen-ve-exception-jvElaB7A5kw), thì bài viết lần này mình sẽ viết chia sẻ cách hiểu của mình về custom exception để mọi người có một cái nhìn rõ hơn nhé.
# What is custom exception
Custom Exception (hay User-defined Custom Exception) nghĩa là ngoại lệ do bạn tự định nghĩa hay bạn tự tạo riêng cho mình (cái tên nói lên tất cả).
# Why is custom exception
1.	Các ngôn ngữ lập trình hiện tại đều đã xây dựng sẵn gần như tất cả các exception có thể xảy ra trong chương trình. Tuy nhiên gần như tất cả không phải là tất cả. Vẫn có một số trường hợp chẳng hạn như lỗi thuật toán, lỗi nghiệp vụ, lỗi thao tác với application… thì không thể nào try catch bằng exception sẵn có được. Chính vì thế các ngôn ngữ lập trình cho phép lập trình viên có thể tạo ra một exception mới để sử dụng cho các trường hợp này.

VD: Một công ty không thể có nhân viên dưới 18. Nếu có nhân viên nào dưới 18 tuổi thì đó sẽ là exception. Trường hợp này thì các exception sẵn có không thể giúp gì được rồi nhỉ.

2.	Ngoài những cái chưa có ra, thì đối với các exception sẵn có vẫn tồn tại những hạn chế nhất định. Chẳng hạn như message output, hay nhưng phương thức sẵn có không thích hợp để xử lý cho trường hợp của bạn thì lúc này custom exception là lựa chọn số một.

VD: Việc xử lý exception luôn kèm theo xử lý log. Tuy nhiên các exception sẵn có không có method nào hỗ trợ cho việc ghi log. Tạo một exception với các method xuất thông tin lỗi vào log có vẻ tốt hơn dùng exception sẵn có các bạn nhỉ. 

3.	Bên cạnh việc hỗ trợ cho xử lý các trường hợp không mong muốn, custom exception còn đóng một vai trò không nhỏ trong việc bảo mật thông tin. Các exception có sẵn tất nhiên là không thể qua mắt được hacker hay dòm ngó source code. Chỉ cần tên exception hay message lỗi sẵn có là có thể biết được điểm yếu của chương trình và tấn công vào đó. Nhưng với custom exception, mấy anh hacker không thể biết cái quái gì đang xảy ra một cách đơn giản được.

VD: Khi hacker tấn công hệ thống bổng dưng bị một cái BusinessException đập vào mặt. Và anh ấy chả biết cái BusinessException là cái quái gì. Tại sao cái quái gì cũng throw ra BusinessException hết vậy. “AAA! Hate this exception so much.”
# How to create custom exception
Rất đơn giản để tạo một custom exception. Hãy nhìn ví dụ sau:
```
public class MyBusinessException extends Exception {
	public MyBusinessException(String message, Throwable cause) {
		super(message, cause);
	}
}
```
Tất cả những gì chúng ta cần là implement ít nhất một constructor với các tham số tương ứng với superclass là Exception hoặc RuntimeException.
Tuy nhiên, để dễ hình dung hơn ta đến với ví dụ sau:
Ví dụ chúng ta có một đoạn code về xử lý exception sẵn có:
```
try (Scanner file = new Scanner(new File(fileName))) {
    if (file.hasNextLine()) return file.nextLine();
} catch(FileNotFoundException e) {
    // Logging, etc 
}
```
Đây là cách xử lý exception đơn giản với try catch. Trường hợp chương trình throw  FileNotFoundException  thì ta không thể biết chính xác nguyên nhân gây ra lỗi là do file không tồn tại hay filename không hợp lệ dẫn đến không đọc được file.
Để xác định rõ nguyên nhân exception là do đâu thì ta cần thêm xử lý check filename khi xảy ra  FileNotFoundException để biết là filename có hợp lệ hay không. Nếu filename không hợp lệ thì sẽ throw exception. Nhưng java lại không có exception này nên ta sẽ tạo một custom exception có tên là IncorrectFileNameException cho nó:
```
public class IncorrectFileNameException extends Exception { 
    public IncorrectFileNameException(String errorMessage) {
        super(errorMessage);
    }
}
```
Và nó được sử dụng như sau:
```
try (Scanner file = new Scanner(new File(fileName))) {
    if (file.hasNextLine())
        return file.nextLine();
} catch (FileNotFoundException e) {
    if (!isCorrectFileName(fileName)) {
        throw new IncorrectFileNameException("Incorrect filename : " + fileName );
    }
    //...
}
```
Với xử lý thế này thì ta có thể biết nguyên nhân là do filename không hợp lệ hay file không tồn tại. Kết quả output khi gặp exception
`com.examples.exception.IncorrectFileNameException: Incorrect filename : abc.a`
Ở đây thông tin lỗi là file không hợp lệ. Nhưng vô tình chúng ta đã bỏ nguyên nhân gốc là FileNotFoundException. Chỉ xem thông tin lỗi thì ta không thể biết được là do xảy ra FileNotFoundException nên mới kiểm tra và xác định nguyên nhân gây lỗi là IncorrectFileNameException.
Để khắc phục điều này, ta cần phải thêm thông tin của FileNotFoundException  vào IncorrectFileNameException. Nghĩa là ta phải implement constructor chứa java.lang.Throwable parameter của super class. Sửa lại IncorrectFileNameException:
```
public class IncorrectFileNameException extends Exception { 
    public IncorrectFileNameException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }
}
```
Thông qua ví dụ này, thì việc tạo một custom exception rất đơn giản. Tuy nhiên khi tạo cần phải chú ý đến các parameter của constructor. Bạn có thể bổ sung thêm parameter để tăng mức độ chi tiết của exception. Tuy nhiên hãy chắc chắn rằng không bỏ qua nguyên nhân gốc của exception nhé.

# Lưu ý với custom exception
1. Không nên lạm dụng custom exception: custom exception rất hữu ích trong việc xử lý ngoại lệ, nhất là trong việc cung cấp thông tin hữu ích, chính xác tương thích với từng trường hợp. Tuy nhiên hãy xem xét và cân nhắc sử dụng custom exception nếu nó mang lại nhiều lợi ích so với những exception sẵn có.
2. Khi tạo một custom exception thì hãy tạo thêm comment document mô tả rõ exception của bạn. Từ cấu trúc, trường hợp xảy ra, message output… Điều này là cần thiết bởi vì không chỉ mình bạn thao tác với exception đó. Hãy thử nghĩ tới cảm giác bạn sử dụng một method mà nó bắn ra cái exception mà đến google cũng không thể giúp bạn giải quyết vì google-cũng-không-biết-nó-là-cái-gì-cả.
3. Khi đặt tên custom exception thì các bạn hãy lưu ý đặt tên một cách tường minh, có tính gợi nhớ đến nguyên nhân gây ra exception đó hãy kết thúc tên bằng từ khóa Exception nhé. Một số tên gọi custom exception mình sử dụng trong ví dụ như:
* IncorrectFileNameException: exception liên quan đến tên file bạn đặt không hợp lệ.
* FileNotFoundException: exception liên quan đến việc không tìm thấy file cần xử lý.
* MyBusinessException: exception liên quan đến các xử lý nghiệp vụ.

# Lời kết
Thông qua 3 câu hỏi What, Why, How, mình hy vọng các bạn khi mới tiếp xúc với lập trình và đang cân nhắc tạo cho mình một custom exception có thể nhanh chóng nắm bắt được cách xử lý custom exception như thế nào cho phù hợp với chương trình của bạn nhất có thể. Bài viết ở mức độ basic trên phương diện hiểu biết cá nhân trong quá trình học và làm cũng như vọc vạch đọc thêm các kiểu nên vẫn còn nhiều sai sót. Rất mong các bạn có thể góp ý thêm.

Nguồn tham khảo: 
https://stackify.com/java-custom-exceptions/
https://www.baeldung.com/java-new-custom-exception