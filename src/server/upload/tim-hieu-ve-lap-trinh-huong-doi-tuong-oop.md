# I. Mở đầu
Khi chúng ta thực hiện một project hay dự án nào đó, chúng ta luôn mong muốn xây dựng được source code mà chúng ta có thể đọc hiểu một cách nhanh chóng và dễ dàng phát triển cho sau này. Và một trong cách đó là phát triển source code theo hướng đối tượng. 

Vậy ta cần hiểu hướng đối tượng là gì và các đặc điểm của hướng đối tượng để có thể áp dụng nó vào project hay dự án.
# II. OOP là gì?
OOP hay Object Oriented Program là một kĩ thuật cho phép người phát triển tạo ra các đối tượng trong code, giúp dễ dàng quản lý và dễ phát triên hơn ! Tại sao ư ? 

Thứ nhất: Vì nó là đối tượng nên chúng ta có thể dễ hình dung nó hơn là việc viết tràn lan code hơn.

Thứ hai: VÌ việc quản lý qua đối tượng nên sẽ tránh được sự trùng lặp có thể xảy ra.

## 1. Phân tích

Do chúng ta dựa trên khái niệm "công nghệ đối tượng", mà trong đó các đối tượng chứa các thuộc tính và các hành động hay các phương thức. Chính các phương thức này sẽ giúp các đối tượng có thể tương tác qua lại lẫn nhau.

## 2. Ưu điểm

GIúp tăng năng suất, đơn giản hóa phức tạo khi maintain, 
dễ dàng tiếp thu, dễ học hơn các phương pháp trước đó, 
giảm được lượng code

## 3. Nhược điểm

Khó đọc hiểu hơn khi mới bước vào một dự án dùng OOP
Khi viết code xử lý một hành động nào đó thì thay thì viết code để chạy hàm A, B để làm việc A và B thì nếu dùng OOP thì bạn phải code nhiều hơn 2 hàm A, B để làm việc này. Tuy nhiên nếu xét về việc sau này maintain thì cũng ko thành vấn đề lắm

# III. Các đặc điểm của OOP
Khi làm việc với OOP thì bạn cần lắm rõ 4 đặc trưng cơ bản của nó: 
*  Tính trìu tương
* Tính kế thừa
* Tính đa hình
* Tính đóng gói
* 
Chúng ta sẽ lần lượt tìm hiểu

## 1. Tính Trìu Tượng

Đây là khả năng cho phép người lập trình bỏ qua hay không chú ý đến một số đặc điểm của một thông tin mà nó đang trực tiếp làm việc trên, điều này giúp trập trung vào phần cốt lõi hơn là phần rìa ngoài. Các đối tượng tương tác với nhau mà ko cần quan tâm đến cách nó thực hiện ra sao. 

Tính chất này thể hiện rõ nhất qua **Interface** và **Abstract Class**

Để hiểu rõ chúng ta sẽ xem một ví dụ nhỏ sau:

Ta có Interface BaseRepository có một function **gift**, function này có một đối số là $age là số tuổi

![](https://images.viblo.asia/db4c428b-15b1-4c9d-9e24-4d15a82e1280.png)

Bây giờ ta sẽ dùng một class để implement cái interface này:

![](https://images.viblo.asia/9c89d287-60a7-476e-b6ab-121f39e80230.png)
Trong hàm này ta định nghịa nếu $age > 18 thì in ra 'Có quà', nếu ko thì là 'Ko có quà'.

Từ đây ta có thể thấy, khi chưa định hình được các hành vi của các đối tượng ra sao, ta có thể xây dựng nên interface trước, sau đó tùy vào mục đích mà cho các đối tượng implement từ interface đó để thực thi nó.
## 2. Tính Kế Thừa
Là khả năng cho phép một class được kế thừa các thuộc tính và các phương thức của một class khác mà ko cần định nghĩa lại chúng nữa.

Điều này giúp cho các đối tương chia sẻ hay mở rộng các đặc tính có sẵn mà ko cần định nghĩa lại.
Ví dụ
Ta có một class Animal có một thuộc tính **numberLeg** và một phương thức **souding**:

![](https://images.viblo.asia/7d61b815-9fc4-4016-af1b-058b02bc5ffd.png)

Ta cho class Cat kế thừa từ class Animal (sử dụng extends) :

![](https://images.viblo.asia/2626d440-68ee-4ac9-8522-3e7314e7bd34.png)

Khi đó, class Cat sẽ có các phương thức và thuộc tính của lớp Animal mà chúng ta ko cần định nghĩa lại nữa:

![](https://images.viblo.asia/58d2b320-75cb-4356-a22e-88b048956c4d.png)

## 3. Tính Đa Hình
Đặc trưng này có vẻ khá là lằng nhằng, ngay cả đối với người viết như mình. Nó được hiểu đơn giản như sau: 
Khi thực hiện viết một abstract class hay interface, việc một lớp khác phải viết lại tất cả các phương thức abstract này chính là một thể hiện của đa hình. Nó giúp các đối tường thuộc các lớp khác nhau cùng thể hiện một thông điệp theo nhiều cách khác nhau. Nó có hai cách thể hiện, một là thông qua **Override**, hai là **Overload**.

**Override**: Việc một phương thức ở lớp cha được lớp con viết lại nhưng giữ nguyên các tham số đầu vào, chỉ thay đổi việc xử lý bên trong.

**Overload**: Việc một lớp có nhiều phương thức với tên trùng lặp nhau nhưng khác nhau về đối số truyền vào hay kiểu dữ liệu đầu ra.

Ví dụ:

![](https://images.viblo.asia/89aa9b36-e94b-4a4a-86fe-9e6b2e443a65.png)

Trong lớp Animal này, có một phương thức **dead()** là phương thức abstract, yêu cầu tất cả các phương thức mà extend từ phương thức này cần override lại nó:

![](https://images.viblo.asia/8011fca5-3272-48b5-adf5-5f4165541a5e.png)

## 4. Tính Đóng Gói
Tính chất này không cho phép người sử dụng các đối tượng thay đổi trạng thái nội tại của một đối tượng. Chỉ có các phương thức nội tại của đối tượng cho phép thay đổi trạng thái của nó.

Việc cho phép môi trường bên ngoài tác động lên các dữ liệu nội tại của một đối tượng theo cách nào là hoàn toàn tùy thuộc vào người viết mã. Đây là tính chất đảm bảo sự toàn vẹn của đối tượng.

Tính chất này thể hiện qua việc sử dụng các định nghĩa truy cập (access modifier).

Thông thương sẽ có 3 truy cập: 

* **public**: Mọi nơi đều có thể gọi đến nó được
* **protected**: Chỉ có bản thân lớp cũng cùng các lớp con truy cập được

* **private**: Chỉ bản thân lớp đó định nghĩa mới có thể gọi được

Và thông thường chúng ta sẽ để các thuộc tính là private, sau đó dùng các phương thức **get()** để lấy ra và **set()** để tương tác với các thuộc tính đó.

Bạn sẽ đặt ra câu hỏi: Tại sao lại cần cái tính chất này? Rất đơn giản, nó giống như việc có một người đến nhà bạn mượn một cây kéo, thay vì cho họ vào nhà và lật tung căn nhà lên để tìm cây kéo, thì bạn có thể lấy cho họ. 
Việc cho tương tác trực tiếp với các thuộc tính cũng tương tự như vậy.

# IV. Kết luận
Cho dù thế nào đi chăng nữa thì các phát triển theo mô hình hướng đối tượng này cũng sẽ còn được sử dụng trong vài năm nữa, chưa biết được sẽ có mô hình phát triển nào khác ra đời thay thế nó ko. Việc làm theo mô hình không chỉ giúp người lập trinh tăng năng suất mà còn dễ phát triển và sử dụng hơn.

Việc phân tích trên còn nhiều điều chưa đúng. Mong nhận được sự góp ý của mọi người :)