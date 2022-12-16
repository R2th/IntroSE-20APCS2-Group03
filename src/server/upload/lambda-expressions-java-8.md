![](https://images.viblo.asia/c867bcf5-3d9d-4e29-bb6b-faa6b7e0aca8.png)

Trong quá trình làm việc với Java 8 chúng ta khá quen thuộc với Lambda, trong bài viết này mình xin giới thiệu về Lambda expressions:
* Lambdas trong một cách viết tóm tắt
* Sử dụng lambdas ở đâu và như thế nào
* Việc thực hiện xung quanh mẫu
* Functional interfaces, type inference
* Functional interface
* Implement lambdas

Trong những cách thực hiện trước đây, bạn đã thấy rằng việc chuyển mã với tham số hóa hành vi là hữu ích để đối phó với các thay đổi yêu cầu thường xuyên trong mã của bạn. Nó cho phép bạn xác định một khối mã đại diện cho một hành vi và sau đó chuyển nó đi xung quanh. Bạn có thể quyết định chạy khối mã đó khi xảy ra một sự kiện nào đó (ví dụ: nhấp vào nút) hoặc tại một số điểm nhất định trong thuật toán (ví dụ: một vị từ như chỉ áp dụng nặng hơn 150 g tựa trong bộ lọc thuật toán hoặc các hoạt động so sánh tùy chỉnh trong sắp xếp). Nói chung, bằng cách sử dụng khái niệm này, bạn có thể viết mã mà linh hoạt hơn và có thể sử dụng lại.

Nhưng bạn đã thấy rằng việc sử dụng các lớp ẩn danh để thể hiện các hành vi khác nhau là không thỏa mãn: nó dài dòng, điều này không khuyến khích các lập trình viên sử dụng tham số hóa hành vi trong thực tế. Trong bài viết này, tôi hướng dẫn cho bạn về một tính năng mới trong Java 8 giải quyết vấn đề này: các biểu thức lambda, cho phép bạn biểu diễn một hành vi hoặc truyền mã theo cách ngắn gọn. Bây giờ bạn có thể nghĩ các biểu thức lambda là các hàm ẩn danh, về cơ bản là các phương thức không có tên khai báo, nhưng cũng có thể được truyền dưới dạng đối số cho một phương thức như bạn có thể với một lớp ẩn danh.
Tôi trình bày cách xây dựng chúng, nơi sử dụng chúng và cách bạn có thể làm cho mã của mình ngắn gọn hơn bằng cách sử dụng chúng. Tôi cũng giải thích một số tính năng mới như suy luận kiểu và các giao diện quan trọng mới có sẵn trong API Java 8. Cuối cùng, chúng tôi giới thiệu các tài liệu tham khảo phương pháp, một
tính năng mới hữu ích đi đôi với biểu thức lambda.
Bài viết này được tổ chức theo cách để dạy bạn từng bước làm thế nào để viết mã ngắn gọn và linh hoạt hơn. Cuối chương này, chúng tôi tập hợp tất cả các khái niệm được dạy vào một ví dụ cụ thể: chúng tôi lấy ví dụ sắp xếp được hiển thị trong chương 2 và dần dần cải thiện nó bằng cách sử dụng biểu thức lambda và tham chiếu phương thức để làm cho nó ngắn gọn và dễ đọc hơn.

### 1. Lambdas là một cách viết rút gọn
* Anonymous: Tôi nói ẩn danh vì nó không có tên rõ ràng như một phương thức thường có: ít để viết và biểu diễn!
* Function: Tôi nói chức năng bởi vì lambda không được liên kết với một lớp cụ thể như một phương thức. Nhưng giống như một phương thức, lambda có một danh sách các tham số, phần thân, kiểu trả về và một danh sách các trường hợp ngoại lệ có thể được ném ra.
* Passed around: Một biểu thức lambda có thể được truyền dưới dạng đối số cho một phương thức hoặc được lưu trữ trong một biến.
* Concise: Bạn không cần phải viết nhiều bản tóm tắt như bạn làm cho các lớp ẩn danh.

Nếu bạn đang tự hỏi thuật ngữ lambda đến từ đâu, thì nó bắt nguồn từ một hệ thống được phát triển trong giới hàn lâm gọi là lambda tính toán, được sử dụng để mô tả các tính toán. Tại sao bạn nên quan tâm đến biểu thức lambda? Bạn đã thấy trong chương trước rằng việc chuyển mã hiện đang tẻ nhạt và dài dòng trong Java. Vâng, tin tốt! Lambdas khắc phục vấn đề này: họ cho phép bạn truyền mã theo cách súc tích. Về mặt kỹ thuật, Lambdas cho phép bạn làm bất cứ điều gì mà bạn không thể làm trước Java 8. Nhưng bạn không còn phải viết mã vụng về bằng cách sử dụng các lớp ẩn danh để hưởng lợi từ tham số hóa hành vi! Biểu thức Lambda sẽ khuyến khích bạn áp dụng kiểu tham số hóa. Kết quả cuối cùng là mã của bạn sẽ rõ ràng và linh hoạt hơn. Ví dụ: bằng cách sử dụng biểu thức lambda, bạn có thể tạo một đối tượng So sánh tùy chỉnh theo cách ngắn gọn hơn.

Before:
```
Comparator<User> byWeight = new Comparator<User>() {
    public int compare(User a1, User a2){
        return a1.getWeight().compareTo(a2.getWeight());
    }
};
```

After (with lambda expressions):
```
Comparator<User> byWeight = (User a1, User a2) -> a1.getWeight().compareTo(a2.getWeight());
```

* Một biểu thức boolean :  (List<String> list) -> list.isEmpty()
* Tạo đối tượng :  () -> new User(10)
* Tiêu thụ từ một đối tượng : (A a) -> { System.out.println(a.getWeight()); }
* Select/extract xuất từ một đối tượng : (String s) -> s.length()
* Kết hợp hai giá trị :  (int a, int b) -> a * b
* So sánh hai đối tượng : (A a1, B a2) -> a1.getWeight().compareTo(a2.getWeight())

### 2. Sử dụng lambdas ở đâu và như thế nào
Bây giờ bạn có thể tự hỏi nơi bạn đã được phép sử dụng biểu thức lambda. Trong ví dụ trước, bạn đã gán lambda cho một biến loại Comparator<User>. Bạn cũng có thể sử dụng lambda khác với phương thức lọc mà bạn đã triển khai trong đó:
```
List<Color> greenApples = filter(inventory, (Color a) -> "green".equals(a.getColor()));
```
Vì vậy, nơi chính xác bạn có thể sử dụng lambdas? Bạn có thể sử dụng biểu thức lambda trong ngữ cảnh của giao diện chức năng. Trong mã được hiển thị ở đây, bạn có thể chuyển lambda làm đối số thứ hai cho bộ lọc phương thức vì nó mong đợi một Vị ngữ <T>, là giao diện chức năng. Don Tiết lo lắng nếu điều này nghe có vẻ trừu tượng; Bây giờ chúng tôi giải thích chi tiết điều này có nghĩa là gì và giao diện chức năng là gì.
    
#### 2.1. Functional interface
Ghi nhớ giao diện Dự đoán <T> bạn đã tạo trong chương 2 để bạn có thể tham số hóa hành vi của phương thức lọc? Nó có một giao diện chức năng! Tại sao? Bởi vì Vị ngữ chỉ định một phương thức trừu tượng:
```
public interface Predicate<T>{
    boolean test (T t);
}
```
![](https://images.viblo.asia/62e71b8b-8e3f-4f00-a54e-a2c0f5c8dd9b.png)
    
#### 2.2. Function descriptor
Ký tự của phương thức trừu tượng của giao diện chức năng về cơ bản mô tả chữ ký của biểu thức lambda. Chúng tôi gọi phương thức trừu tượng này là một mô tả chức năng. Ví dụ: giao diện Runnable có thể được xem là chữ ký của hàm chấp nhận
không có gì và trả về không có gì (void) bởi vì nó chỉ có một phương thức trừu tượng gọi là run, không chấp nhận gì và không trả về gì (void).
Một số ngôn ngữ như Scala cung cấp các chú thích loại rõ ràng trong hệ thống loại của chúng để mô tả loại hàm (được gọi là các loại hàm). Java sử dụng lại các loại danh nghĩa hiện có được cung cấp bởi các giao diện chức năng và ánh xạ chúng thành một dạng các loại chức năng đằng sau.
![](https://images.viblo.asia/c161210c-d431-4114-a88f-1b689f6c6cf5.png)
    
### 3. Đưa lambdas vào thực tế
Hãy cùng xem một ví dụ về cách lambdas, cùng với tham số hóa hành vi, có thể được sử dụng trong thực tế để làm cho mã của bạn linh hoạt và ngắn gọn hơn. Một mẫu lặp lại trong xử lý tài nguyên (ví dụ, xử lý các tệp hoặc cơ sở dữ liệu) là để mở một tài nguyên, thực hiện một số xử lý trên đó và sau đó đóng tài nguyên. Các giai đoạn thiết lập và dọn dẹp luôn giống nhau và bao quanh mã quan trọng đang xử lý. Điều này được gọi là thực thi xung quanh mẫu,
như minh họa trong hình dưới đây. Ví dụ, trong đoạn mã sau, các dòng được tô sáng hiển thị mã soạn sẵn được yêu cầu để đọc một dòng từ một tệp (cũng lưu ý rằng bạn sử dụng câu lệnh thử tài nguyên của Java 7, đã đơn giản hóa code:
    ![](https://images.viblo.asia/e0e4b760-65a0-4a83-81a3-5adace8360d2.png)

#### 3.1. Step 1: Ghi nhớ tham số hành vi
Mã hiện tại này là hạn chế. Bạn chỉ có thể đọc dòng đầu tiên của tập tin. Điều gì sẽ xảy ra nếu bạn muốn trả lại hai dòng đầu tiên thay thế hoặc thậm chí từ được sử dụng thường xuyên nhất? Lý tưởng nhất là bạn muốn sử dụng lại mã khi thiết lập và dọn dẹp và báo cho phương thức processFile thực hiện các hành động khác nhau trên tệp. Điều này nghe có vẻ quen thuộc phải không? Có, bạn cần tham số hóa hành vi của processFile. Bạn cần một cách để chuyển hành vi sang processFile để nó có thể thực thi các hành vi khác nhau bằng cách sử dụng BufferedReader.
Hành vi vượt qua chính xác là những gì lambdas dành cho. Vậy phương thức processFile mới sẽ trông như thế nào nếu bạn muốn đọc hai dòng cùng một lúc? Về cơ bản, bạn cần một lambda lấy BufferedReader và trả về Chuỗi. Ví dụ, ở đây, cách thức in hai dòng của BufferedReader:
```
String result = processFile((BufferedReader br) ->br.readLine() + br.readLine());
```
#### 3.2. Step 2: Sử dụng functional interface để truyền các hành vi
Tôi đã giải thích trước đó rằng lambdas chỉ có thể được sử dụng trong ngữ cảnh của giao diện chức năng. Bạn cần tạo một cái khớp với chữ ký BufferedReader -> Chuỗi và có thể ném IOException. Hãy gọi cho giao diện này BufferedReaderProcessor:
```
@FunctionalInterface
public interface BufferedReaderProcessor {
    String process(BufferedReader b) throws IOException;
}
```
Bây giờ bạn có thể sử dụng giao diện này làm đối số cho phương thức processFile mới của mình:
```
public static String processFile(BufferedReaderProcessor p) throws IOException {
    // TODO something
}
```
    
#### 3.3. Step 3: Thực hiện một hành vi
Bất kỳ lambdas nào có dạng BufferedReader -> Chuỗi có thể được truyền dưới dạng đối số, vì chúng khớp với chữ ký của phương thức quy trình được xác định trong giao diện Buffered-ReaderProcessor.
Bây giờ bạn chỉ cần một cách để thực thi mã được đại diện bởi lambda bên trong phần thân của processFile. Hãy nhớ rằng, biểu thức lambda cho phép bạn cung cấp việc thực hiện bản tóm tắt
phương thức của giao diện chức năng trực tiếp nội tuyến và chúng coi toàn bộ biểu thức là một thể hiện của giao diện chức năng. Do đó, bạn có thể gọi quy trình phương thức trên đối tượng BufferedReaderProcessor kết quả bên trong thân processFile để xử lý tốt hơn quá trình xử lý:
    ![](https://images.viblo.asia/c91ee33a-e08a-4095-a3d2-b84db0a76130.png)
    
#### 3.4. Step 4: Lambdas
Bây giờ bạn có thể sử dụng lại phương thức processFile và xử lý các tệp theo các cách khác nhau bằng cách chuyển các lambdas khác nhau.
    
Xử lý một dòng:
```
String oneLine = processFile((BufferedReader br) -> br.readLine());
```
Xử lý hai dòng:
```
String twoLines = processFile((BufferedReader br) -> br.readLine() + br.readLine());
```    

Tổng kết các bước lambda hóa:
    ![](https://images.viblo.asia/0a40fa12-1da1-4eba-8646-4a7daa7ae4e4.png)

### 4.. Tổng kết
Sau đây là các khái niệm chính bạn nên nắm về Lambdas:
* Một biểu thức lambda có thể được hiểu là một loại hàm ẩn danh: nó không có tên, nhưng nó có một danh sách các tham số, phần thân, kiểu trả về và cũng có thể là một danh sách các trường hợp ngoại lệ có thể được ném ra.
* Biểu thức Lambda cho phép bạn truyền mã chính xác.
* Giao diện chức năng là một giao diện khai báo chính xác một phương thức trừu tượng.
* Biểu thức Lambda chỉ có thể được sử dụng khi có giao diện chức năng.
* Biểu thức Lambda cho phép bạn cung cấp việc thực hiện phương thức trừu tượng của giao diện chức năng trực tiếp nội tuyến và coi toàn bộ biểu thức là một thể hiện của giao diện chức năng.
* Java 8 đi kèm với một danh sách các functional interfaces phổ biến trong gói java.util .function, bao gồm Predicate<T>, Function<T ,R>, Supplier<T>, Consumer<T> và BinaryOperator<T>.
* Có các chuyên môn nguyên thủy của các giao diện chức năng chung chung như Predicate<T> và Function<T, R> có thể được sử dụng để tránh các hoạt động đấm bốc: IntPredicate, IntToLongFunction, v.v.
* Mẫu thực thi xung quanh (nghĩa là bạn cần thực thi một chút hành vi ở giữa mã mà LỚN luôn yêu cầu trong một phương thức, ví dụ, phân bổ tài nguyên và dọn dẹp) có thể được sử dụng với lambdas
để có được sự linh hoạt và tái sử dụng bổ sung.
* Loại dự kiến cho biểu thức lambda được gọi là target type.
* Tham chiếu phương thức cho phép bạn sử dụng lại việc triển khai phương thức hiện có và chuyển trực tiếp xung quanh.
* Các Functional interfaces như Comparator, Predicate và Function có một số phương thức mặc định có thể được sử dụng để kết hợp các biểu thức lambda.