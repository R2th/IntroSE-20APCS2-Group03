Singleton
---
"Singleton là một mẫu thiết kế sáng tạo cho phép bạn đảm bảo rằng một lớp chỉ có một cá thể và cung cấp một điểm truy cập toàn cục cho cá thể này."

***Singleton giải quyết hai vấn đề vào thời điểm đó:***

*1.Đảm bảo rằng một lớp chỉ có một cá thể duy nhất* 

"tạo ra một đối tượng duy nhất và tồn tại trong suốt vòng đời của ứng dụng, nói cách khác, nó chỉ cho phép khởi tạo 1 lần duy nhất"

"Lý do phổ biến nhất cho việc này là để kiểm soát một số tài nguyên được chia sẻ, ví dụ, cơ sở dữ liệu."

"Hãy tưởng tượng rằng bạn đã tạo ra một đối tượng, và sau một thời gian, cố gắng tạo một đối tượng mới. Trong trường hợp này, bạn sẽ muốn nhận đối tượng cũ, thay vì tạo một thể hiện mới."

Lý do nó không thể được thực hiện với một hàm tạo: "Nó không thể được thực hiện với một hàm tạo thông thường vì mọi lời gọi hàm tạo luôn trả về một đối tượng mới theo thiết kế."

*2.Cung cấp điểm truy cập toàn cầu cho cá thể đó.*

Lý do không sd biến toàn cục: "Nghe như một biến toàn cục, phải không? Nhưng bạn không thể tạo biến toàn cục chỉ đọc. Bất cứ ai có thể truy cập nó cũng có thể thay thế giá trị của nó."

"Có một khía cạnh khác của vấn đề này: bạn không muốn mã giải quyết vấn đề trước đó nằm rải rác khắp chương trình của bạn. Tốt hơn là nên có nó trong một lớp, đặc biệt nếu phần còn lại của mã của bạn đã phụ thuộc vào lớp đó."

Lưu ý: 
"Singleton giải quyết cả hai vấn đề này cùng một lúc. Nhưng ngày nay mô hình trở nên phổ biến đến nỗi mọi người gọi một cái gì đó là Singleton ngay cả khi nó giải quyết một trong những vấn đề này."

***Áp dụng như thế nào?***

"có thể là: một cầu nối liên kết với database, tạo một lớp controller quản lý và lưu trữ đảm bảo tính duy nhất, hoặc tạo một lớp để cache object ...  tình huống này thì nó được triển khai vô cùng hiệu quả"

Nguồn của ví dụ: [https://viblo.asia/p/gioi-thieu-ve-cac-design-patterns-hay-duoc-su-dung-trong-java-ByEZkpRqlQ0](https://viblo.asia/p/gioi-thieu-ve-cac-design-patterns-hay-duoc-su-dung-trong-java-ByEZkpRqlQ0 )

"Khi singleton pattern được giới thiệu lần đầu nó đã tồn tại vấn đề với các kịch bản đa luồng. Đó là lý do chúng ta sẽ làm theo một cách tiếp cận tối ưu hơn, sử dụng một static inner class"
```
public class Singleton  {    
    private Singleton() {}
     
    private static class SingletonHolder {    
        public static final Singleton instance = new Singleton();
    }
 
    public static Singleton getInstance() {    
        return SingletonHolder.instance;    
    }
}
```
Giải thích code example: "Ở đây, chúng ta đã tạo ra một lớp tĩnh là instance của lớp Singleton. Nó tạo ra thể hiện chỉ khi ai đó gọi phương thức getInstance () và không phải khi lớp bên ngoài được nạp. Đây là một cách tiếp cận được sử dụng rộng rãi cho một lớp Singleton vì nó không yêu cầu đồng bộ hóa, là thread an toàn, khởi tạo lazy."

"Singleton là một mẫu thiết kế creational cho phép bạn đảm bảo rằng một lớp chỉ có một object thể hiện và cung cấp truy cập object này với phạm vi toàn ứng dụng."

https://viblo.asia/p/kotlin-design-pattern-p1-creational-Az45bApOlxY	

***Khi nào cần áp dụng***

"Hầu hết các đối tượng trong một ứng dụng đều chịu trách nhiệm cho công việc của chúng và truy xuất dữ liệu tự lưu trữ (self-contained data) và các tham chiếu trong phạm vi được đưa ra của chúng. Tuy nhiên, có nhiều đối tượng có thêm những nhiệm vụ và có ảnh hưởng rộng hơn, chẳng hạn như quản lý các nguồn tài nguyên bị giới hạn hoặc theo dõi toàn bộ trạng thái của hệ thống. Những nhiệm vụ của các đối tượng này thường yêu cầu chỉ có một đối tượng của một lớp. Các ví dụ bao gồm đối tượng request call API, đối tượng play âm thanh trong ứng dụng game,... Những phần khác trong ứng dụng phụ thuộc vào những đối tượng đặc biệt này và cần có cách để tìm ra chúng. Đây là nơi mà mẫu thiết kế Singleton được sử dụng.

Bạn gặp một sự cố về hiệu năng hệ thống. Cùng một thời điểm, các bạn đang sử dụng một lúc nhiều đối tượng và chúng làm tiêu tốn quá nhiều tài nguyên của hệ thống. Đây là vấn đề mà bạn cần phải khắc phục, và Singleton pattern có thể giúp bạn thực hiện được điều đó."

"Đối với một vài class thì việc chỉ có duy nhất một instance (object) là rất quan trọng. Bạn có thấy là các chương trình thường xuyên có một tập tin cấu hình duy nhất không. Nó không phải là bất thường đối với một chương trình cho phép bạn biết làm thế nào nó được thực hiện thông qua một file log duy nhất. Hay Giao diện ứng dụng thường xuyên có một cửa sổ chính, và họ thường lấy đầu vào từ bàn phím một cách chính xác. Hay nhiều ứng dụng khác thì cần phải nói chuyện với một cơ sở dữ liệu chính xác. Nếu bạn chỉ có một instance của một class và rất nhiều mã cần truy cập đến instance đó, thì thật là ngớ ngẩn khi chuyển object từ method này sang method khác.
Làm thế nào để chúng ta đảm bảo một class chỉ có một thể hiện duy nhất và dễ dàng truy nhập được? Một object toàn cục có thể làm cho nó dễ dàng truy nhập được nhưng không ngăn cấm bạn tạo thêm nhiều object khác.
Một giải pháp tốt hơn là làm cho class đó tự bản thân nó có thể điều khiển được thực thể chính của nó. Class đó có thể đảm bảo rằng không có thực thể khác được tạo ra (bằng cách chặn đứng các yêu cầu tạo object mới) và cung cấp cách thức để truy nhập được thực thể chính của nó. Đó là singleton pattern."

***Ở tài liệu này còn chỉ ra rằng mục đích của singleton patterns là:***

* Dùng để tạo các resources được dùng nhiều lần (như đối tượng kết nối cơ sở dữ liệu)

* Để giữ tất cả logger là Singletons làm tăng hiệu năng

* Các lớp cung cấp quyền truy cập vào cài đặt cấu hình cho ứng dụng

* Các lớp có chứa resources được chia sẻ quyền truy cập

***Trong một tài liệu khác chỉ ra rằng ưu nhược điểm của singleton là:***

* Quản lý việc truy cập tốt hơn vì chỉ có một thể hiện đơn nhất.
* Cho phép cải tiến lại các tác vụ (operations) và các thể hiện (representation) do pattern có thể được kế thừa và tùy biến lại thông qua một thể hiện của lớp con
* Quản lý số lượng thể hiện của một lớp, không nhất thiết chỉ có một thể hiện mà có số thể hiện xác định.
* Khả chuyển hơn so với việc dùng một lớp có thuộc tính là static, vì việc dùng lớp static chỉ có thể sử dụng một thể hiện duy nhất, còn Singleton Pattern cho phép quản lý các thể hiện tốt hơn và tùy biến theo điều kiện cụ thể.

Tham chiếu:

* [https://viblo.asia/p/gioi-thieu-ve-cac-design-patterns-hay-duoc-su-dung-trong-java-ByEZkpRqlQ0](https://viblo.asia/p/gioi-thieu-ve-cac-design-patterns-hay-duoc-su-dung-trong-java-ByEZkpRqlQ0 )
* [https://sourcemaking.com/design_patterns/singleton](https://sourcemaking.com/design_patterns/singleton)
* [https://viblo.asia/p/design-pattern-singleton-0bDM6kBYG2X4](https://viblo.asia/p/design-pattern-singleton-0bDM6kBYG2X4)
* [https://refactoring.guru/design-patterns/singleton](https://refactoring.guru/design-patterns/singleton)
* [https://viblo.asia/p/tim-hieu-singleton-pattern-MVpeKPAOkKd](https://viblo.asia/p/tim-hieu-singleton-pattern-MVpeKPAOkKd)
* [https://viblo.asia/p/design-pattern-singletons-oOVlY4doZ8W](https://viblo.asia/p/design-pattern-singletons-oOVlY4doZ8W)