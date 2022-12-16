![](https://images.viblo.asia/8dd5b553-5e8a-433d-84a6-8f7f1295cc0e.png)
Khi mọi người nhìn vào, chúng tôi muốn Code nhìn vào được gọn gàng, nhất quán, chi tiết. Muốn mọi người cảm nhận được  đây là do một chuyên gia làm việc. Nếu thay vào đó họ thấy được một khối lượng code xáo trộn trông giống như được viết bởi một loạt thủy thủ say rượu, sau đó họ có thể kết luận rằng sự thiếu chú ý đến chi tiết tràn ngập trong mọi khía cạnh khác của dự án.

Bạn nên quan tâm đến Code của bạn được định dạng một cách đẹp mắt. Nếu bạn đang làm việc trong một nhóm, thì nhóm nên đồng ý với một bộ quy tắc định dạng duy nhất và tất cả các thành viên phải tuân thủ. Có công cụ tự động có thể áp dụng các quy tắc định dạng đó cho bạn.
# The Purpose of Formatting
Điều đầu tiên, hãy dọn dẹp. Hình thức của code rất quan trọng. Định dạng Code là giao tiếp, và giao tiếp là đơn đặt hàng đầu tiên mà các doanh nghiệp xác định lập trình viên chuyên nghiệp. Có lẽ bạn nghĩ rằng, việc làm cho code hoạt động tốt là ưu tiên đầu tiên cho một nhà phát triển chuyên nghiệp. Tuy nhiên, tôi hy vọng rằng cuốn sách này đã làm bạn thất vọng về ý tưởng đó. Chức năng mà bạn tạo hôm nay có cơ hội thay đổi tiếp trong phiên bản tiếp theo, nhưng khả năng đọc mã của bạn sẽ có ảnh hưởng sâu sắc đến tất cả các thay đổi sẽ được thực hiện. Kiểu tiền mã hóa và khả năng đọc được thiết lập các tiền lệ tiếp tục ảnh hưởng đến khả năng bảo trì và khả năng mở rộng rất lâu sau khi mã gốc đã được thay đổi. Phong cách và kỷ luật của bạn tồn tại, mặc dù mã của bạn không.
Vì vậy, các vấn đề định dạng giúp chúng ta giao tiếp tốt nhất là gì?
# Vertical Formatting (Theo chiều dọc)
Hãy bắt đầu với kích thước dọc. File nguồn nên lớn đến cỡ nào? Trong Java, kích thước tệp có liên quan chặt chẽ với kích thước class. Chúng ta nói về quy mô class khi chúng ta nói về classes. Hiện tại, hãy để chỉ xem xét kích thước tệp.
![](https://images.viblo.asia/6ea8a6bf-eb99-4465-af90-8c8073d0b045.png)
Junit, FitNesse, và Time và Money bao gồm các tệp tương đối nhỏ. Không có hơn 500 dòng và hầu hết các tệp đó dưới 200 dòng. Tomcat và Ant, mặt khác, có một số tệp dài vài nghìn dòng và gần một nửa là hơn 200 dòng.
Điều đó có ý nghĩa gì với chúng ta? Dường như có thể xây dựng các hệ thống quan trọng (FitNesse gần 50.000 dòng) trong số các tệp thường dài 200 dòng, với giới hạn trên là 500. Mặc dù đây không phải là quy tắc cứng và nhanh. Các tệp nhỏ thường dễ hiểu hơn các tệp lớn.
### The Newspaper Metaphor
Hãy nghĩ về một bài báo được viết tốt. Bạn đọc nó theo chiều dọc. Ở đầu bạn mong đợi một tiêu đề sẽ cho bạn biết câu chuyện nói về cái gì và cho phép bạn quyết định xem đó có phải là thứ bạn muốn đọc không. Đoạn đầu tiên cung cấp cho bạn một bản tóm tắt của toàn bộ câu chuyện, ẩn tất cả các chi tiết trong khi cung cấp cho bạn các khái niệm chải rộng. Khi bạn tiếp tục xuống, các chi tiết sẽ tăng cho đến khi bạn có tất cả các ngày, tên, trích dẫn, khiếu nại và các chi tiết vụn vặt khác.

Chúng tôi muốn một tập tin nguồn giống như một bài báo. Tên nên đơn giản nhưng giải thích. Tên đủ để cho chúng ta biết liệu chúng ta có đang ở đúng mô-đun hay không. Các phần trên cùng của tệp nguồn sẽ cung cấp các khái niệm và thuật toán cấp cao. Chi tiết sẽ tăng lên khi chúng ta di chuyển xuống dưới, cho đến cuối cùng, chúng ta tìm thấy các hàm và chi tiết mức thấp nhất trong tệp nguồn.

Một tờ báo bao gồm nhiều bài báo; hầu hết là rất nhỏ, một số lớn hơn một chút. Rất ít có chứa nhiều văn bản như một trang có thể giữ. Điều này làm cho tờ báo có thể sử dụng. Nếu tờ báo chỉ là một câu chuyện dài chứa sự kết tụ vô tổ chức của sự kiện, ngày tháng và tên, thì đơn giản là chúng ta sẽ không đọc nó.
### Vertical Openness Between Concepts (Sự cởi mở giữa các khái niệm)
Gần như tất cả Code đề được đọc từ trái sang phải, từ trên xuống dưới. Mỗi dòng đều đại diện cho một biểu thức hoặc một mệnh đề. Những khái niệm nên được tách ra với một dòng trắng. => Tăng khả năng đọc Code

### Vertical Density (Mật độ)
Cở mở chia tách các khai niệm, sau đó mật độ liên kết chặt chẽ lại.

=> Comment làm phá hỏng sự liên kết:
```
public class ReporterConfig {
   /**
   * The class name of the reporter listener
   */
   private String m_className;
   /**
   * The properties of the reporter listener
   */
   private List<Property> m_properties = new ArrayList<Property>();
   public void addProperty(Property property) {
   m_properties.add(property);
}
```
=> Dễ dàng hơn để đọc:
```
public class ReporterConfig {
   private String m_className;
   private List<Property> m_properties = new ArrayList<Property>();
   public void addProperty(Property property) {
   m_properties.add(property);
}
```
### Vertical Distance (Khoảng cách)
Các khái niệm có liên quan với nhau nên được giữ gần nhau, tránh tách chúng ra thành từng file khác nhau trừ khi có lý do chính đáng.

- Khai báo biến: Nên khai báo biến ở càng gần nơi mà nó sử dụng càng tốt. Bởi vì hàm ngắn, nên biến cục bộ nên đặt đầu mỗi hàm. Các biến điều khiển cho vòng lặp nên được khai báo ở trong vòng lặp.
- Biến đối tượng: Khai báo biến ở trên cùng của một lớp.
- Các hàm phụ thuộc: Nếu một hàm gọi một hàm khác thì nên để chúng gần nhau.
### Vertical Ordering
Hàm chức năng được gọi thì nên ở phía dưới hàm gọi nó. Tạo một dòng chảy mã nguồn từ mức cao đến mức thấp. Cũng đừng thu nhỏ font chữ để tăng số lượng ký tự trên 1 dòng màn hình.
# Horizontal Formatting (Theo chiều ngang)
Cố gắng giữ cho dòng được ngắn. Đừng bao giờ phải di chuyển sang phải.
### Horizontal Openness and Density
Sử dụng khoảng trắng để kết hợp những thứ có liên quan và tách những thứ ít liên quan hơn với nhau.
```
public class Quadratic {
   public static double root1(double a, double b, double c) {
      double determinant = determinant(a, b, c);
      return (-b + Math.sqrt(determinant)) / (2*a);
   }

   public static double root2(int a, int b, int c) {
      double determinant = determinant(a, b, c);
      return (-b - Math.sqrt(determinant)) / (2*a);
   }

   private static double determinant(double a, double b, double c) {
      return b*b - 4*a*c;
   }
}
```
### Horizontal Alignment (Dóng hàng)
Khi tôi là một lập trình viên ngôn ngữ, tôi đã sử dụng căn chỉnh ngang để làm nổi bật các cấu trúc nhất định. Khi tôi bắt đầu viết mã bằng C, C ++ và cuối cùng là Java, tôi tiếp tục cố gắng sắp xếp tất cả các tên biến trong một tập hợp các khai báo hoặc tất cả các giá trị trong một tập hợp các câu lệnh gán. Mã của tôi có thể trông như thế này:
![](https://images.viblo.asia/701f4e6b-ff8a-47b5-a61c-4c330e46cfcf.png)
Sự liên kết dường như nhấn mạnh những điều sai trái và khiến tôi rời mắt khỏi ý định thực sự. Ví dụ, trong danh sách các khai báo ở trên, bạn nên đọc danh sách các tên biến mà không xem các loại của chúng. Tương tự như vậy, trong danh sách các câu lệnh gán, bạn muốn nhìn xuống danh sách các giá trị mà không bao giờ nhìn thấy toán tử gán. Để làm cho vấn đề tồi tệ hơn, các công cụ định dạng lại tự động thường loại bỏ loại căn chỉnh này.
Vì vậy, cuối cùng, tôi không còn làm điều này nữa. Ngày nay, tôi thích các tuyên bố chưa được phân bổ, được hiển thị bên dưới, bởi vì chúng chỉ ra sự thiếu sót quan trọng. Nếu tôi có danh sách dài cần căn chỉnh, vấn đề là độ dài của danh sách, không phải là thiếu liên kết. Độ dài của danh sách các khai báo trong FitNesseExpediter bên dưới cho thấy rằng lớp này nên được tách ra.
![](https://images.viblo.asia/0f17f136-af56-4f58-a26d-7394545101be.png)

### Indentation

Thụt lề phân cấp các phạm vi.
Một tệp nguồn là một hệ thống phân cấp chứ không phải là một phác thảo. Các thông tin liên quan đến toàn bộ tệp, cho các class riêng lẻ trong tệp, cho các phương thức trong các class, cho các khối trong các phương thức và đệ quy cho các khối trong các khối. Mỗi cấp độ của hệ thống phân cấp này là một phạm vi mà các tên có thể được khai báo.

Để làm cho hệ thống phân cấp phạm vi này hiển thị, chúng ta thụt các dòng mã nguồn theo phần vào vị trí của chúng trong phần tìm kiếm. Các câu lệnh ở cấp độ của tệp, chẳng hạn như hầu hết các khai báo classes, hoàn toàn không được thụt lề. Các phương thức trong một lớp được thụt vào một cấp ở bên phải của lớp. Việc thực hiện các phương thức đó được thực hiện một cấp ở bên phải của khai báo phương thức. Việc triển khai khối được thực hiện một cấp ở bên phải khối chứa của chúng, v.v.

Các lập trình viên phụ thuộc rất nhiều vào sơ đồ thụt lề này. Họ trực quan xếp hàng bên trái để xem phạm vi họ xuất hiện. Điều này cho phép họ nhanh chóng nhảy qua các phạm vi, chẳng hạn như triển khai các câu lệnh if hoặc while, không liên quan đến tình huống hiện tại của họ. Họ quét bên trái để khai báo phương thức mới, biến mới và thậm chí các lớp mới. Nếu không có sự thụt dòng, các chương trình sẽ hầu như không thể đọc được bởi con người.
```
public class FitNesseServer implements SocketServer { private FitNesseContext context; public FitNesseServer(FitNesseContext context) { this.context = context; } public void serve(Socket s) { serve(s, 10000); } public void serve(Socket s, long requestTimeout) { try { FitNesseExpediter sender = new FitNesseExpediter(s, context); sender.setRequestParsingTimeLimit(requestTimeout); sender.start(); } catch(Exception e) { e.printStackTrace(); } } }
```

```
public class FitNesseServer implements SocketServer { 
    private FitNesseContext context;
    public FitNesseServer(FitNesseContext context) { 
        this.context = context;
    }
    public void serve(Socket s) { 
        serve(s, 10000);
    }
    
    public void serve(Socket s, long requestTimeout) { 
        try {
            FitNesseExpediter sender = new FitNesseExpediter(s, context); 
            sender.setRequestParsingTimeLimit(requestTimeout); 
            sender.start();
        } catch (Exception e) {
            e.printStackTrace(); 
        }
    } 
}
```

Mắt của bạn có thể nhanh chóng phân biệt cấu trúc của tập tin thụt lề. Bạn gần như có thể ngay lập tức phát hiện ra các biến, hàm tạo, hàm truy cập và phương thức. Chỉ mất vài giây để nhận ra rằng đây là một loại đầu cuối đơn giản cho một ổ cắm, với thời gian chờ. Phiên bản không được cấp phép, tuy nhiên, hầu như không cần nghiên cứu mạnh mẽ.
### Dummy Scopes
Tôi không thích những loại cấu trúc này và cố gắng tránh chúng. Khi tôi có thể tránh được chúng, tôi chắc chắn rằng code được thụt vào đúng cách và được bao quanh bởi chấm phẩy. Tôi có thể nói với bạn bao nhiêu lần tôi đã bị lừa bởi một dấu chấm phẩy âm thầm ngồi ở cuối một vòng lặp trên cùng một dòng. Trừ khi bạn làm cho dấu chấm phẩy đó hiển thị bằng cách thụt lề trên dòng riêng của nó, còn lại thì quá khó để nhìn thấy.
```
while (dis.read(buf, 0, readBufferSize) != -1)
   ;
```
# Team Rules
Mỗi lập trình viên đều có một nguyên tắc định dạng riêng. nhưng khi làm việc nhóm phải tuân theo nguyên tắc của nhóm. Một nhóm phát triển nên thỏa thuận về một kiểu định dạng duy nhất, sau đó mỗi thành viên trong nhóm nên sử dụng kiểu định dạng đó. => Tính nhất quán.