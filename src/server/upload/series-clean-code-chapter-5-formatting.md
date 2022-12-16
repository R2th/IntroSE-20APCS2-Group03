![](https://images.viblo.asia/50474180-28f3-48e4-86df-65a320359267.png)

Khi mọi người nhìn vào, chúng tôi muốn Code nhìn vào được gọn gàng, nhất quán, chi tiết. Muốn mọi người cảm nhận được  đây là do một chuyên gia làm việc. Nếu thay vào đó họ thấy được một khối lượng code xáo trộn trông giống như được viết bởi một loạt thủy thủ say rượu, sau đó họ có thể kết luận rằng sự thiếu chú ý đến chi tiết tràn ngập trong mọi khía cạnh khác của dự án.

Bạn nên quan tâm đến Code của bạn được định dạng một cách đẹp mắt.
# 1. The Purpose of Formatting
Điều đầu tiên, hãy dọn dẹp. Hình thức của code rất quan trọng. Định dạng Code là giao tiếp, và giao tiếp là đơn đặt hàng đầu tiên mà các doanh nghiệp xác định lập trình viên chuyên nghiệp.
# 2. Vertical Formatting (Theo chiều dọc)
Định dạng theo chiều dài. 
* **The Newspaper Metaphor**

    Hãy nghĩ như viết một bài báo tốt. Bạn đọc nó từ trên xuống. Ở phía trên, tiêu đề cho bạn biết bài viết đang nói về cái gì. Đoạn đầu tiên tóm tắt toàn bộ câu chuyện, ẩn các chi tiết và mang những khái niệm trải rộng ra. Ngay khi đi xuống các chi tiết sẽ được tăng lên,

    Chúng ta muốn mã nguồn giống như một bài báo. Tên đơn giản nhưng giải thích rõ ràng. Cái tên cho chúng ta biết có đang ở đúng module hay không. Ở phía đầu cung cấp những khái niệm ở cấp cao và các thuật toán. Chi tiết sẽ tăng thêm khi chúng ta di chuyển xuống dưới. Cho đến khi kết thúc, chúng ta tìm những hàm ở mức thấp nhất và chi tiết của file nguồn.

    Nếu một bài báo là một câu chuyện dài với sự hội tụ của một kết cấu vô tổ chức các sự kiện với ngày tháng, đơn giản chúng tôi sẽ không đọc nó.
* **Vertical Openness Between Concepts (Sự cởi mở giữa các khái niệm)**

    Gần như tất cả Code đề được đọc từ trái sang phải, từ trên xuống dưới. Mỗi dòng đều đại diện cho một biểu thức hoặc một mệnh đề. Những khái niệm nên được tách ra với một dòng trắng. => Tăng khả năng đọc Code
* **Vertical Density (Mật độ)**

    Cở mở chia tách các khai niệm, sau đó mật độ liên kết chặt chẽ lại.

    => Comment làm phá hỏng sự liên kết:
    ```java
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

    ```java
    public class ReporterConfig {
       private String m_className;
       private List<Property> m_properties = new ArrayList<Property>();
       public void addProperty(Property property) {
       m_properties.add(property);
    }
    ```
* **Vertical Distance (Khoảng cách)**

    Các khái niệm có liên quan với nhau nên được giữ gần nhau, tránh tách chúng ra thành từng file khác nhau trừ khi có lý do chính đáng.

    - **Khai báo biến:** Nên khai báo biến ở càng gần nơi mà nó sử dụng càng tốt. Bởi vì hàm ngắn, nên biến cục bộ nên đặt đầu mỗi hàm. Các biến điều khiển cho vòng lặp nên được khai báo ở trong vòng lặp.
    - **Biến đối tượng**: Khai báo biến ở trên cùng của một lớp.
    - **Các hàm phụ thuộc:** Nếu một hàm gọi một hàm khác thì nên để chúng gần nhau.
* **Vertical Ordering**

    Hàm chức năng được gọi thì nên ở phía dưới hàm gọi nó. Tạo một dòng chảy mã nguồn từ mức cao đến mức thấp. Cũng đừng thu nhỏ font chữ để tăng số lượng ký tự trên 1 dòng màn hình.
# 3. Horizontal Formatting (Theo chiều ngang)
Cố gắng giữ cho dòng được ngắn. Đừng bao giờ phải di chuyển sang phải.
* **Horizontal Openness and Density**

    Sử dụng khoảng trắng để kết hợp những thứ có liên quan và tách những thứ ít liên quan hơn với nhau.
    ```java
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
* **Horizontal Alignment (Dóng hàng)**

    Dóng hàng như vậy không thực sự hữu ích. Cách này như làm nổi lên những vấn đề sai trái và làm đi lệch ra khỏi mục đích thật sự. Không cần phải dóng hàng theo từng cột.
* **Indentation**

    Thụt lề phân cấp các phạm vi.
* **Dummy Scopes**
    ```java
    while (dis.read(buf, 0, readBufferSize) != -1)
       ;
    ```
# 4. Team Rules
Mỗi lập trình viên đều có một nguyên tắc định dạng riêng. nhưng khi làm việc nhóm phải tuân theo nguyên tắc của nhóm. Một nhóm phát triển nên thỏa thuận về một kiểu định dạng duy nhất, sau đó mỗi thành viên trong nhóm nên sử dụng kiểu định dạng đó. => Tính nhất quán.

Nguồn: alantrungnguyen, tapchilaptrinh