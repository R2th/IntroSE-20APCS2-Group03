&emsp;&emsp;Như đã tìm hiểu ở [Phần 1 của series Thiết kế phần mềm](https://viblo.asia/p/thiet-ke-phan-mem-p1-tat-ca-deu-xoay-quanh-su-phuc-tap-RnB5pjvdZPG), chúng ta đã biết hai nguyên nhân khiến cho một hệ thống phần mềm trở nên phức tạp, một trong số đó là sự ràng buộc. Ở bài viết này, chúng ta sẽ tiếp tục đồng hành với John Ousterhout và cuốn sách [Philosophy of Software Design](https://www.amazon.com/Philosophy-Software-Design-John-Ousterhout/dp/1732102201) để tìm cách giảm thiểu hoặc làm đơn giản hóa tối đa các sự ràng buộc trong hệ thống, bắt đầu với khái niệm chiều sâu của mô-đun.
# Mô-đun phải có chiều sâu
&emsp;&emsp;Một trong những kỹ thuật quan trong nhất trong quản lý sự phức tạp của hệ thống phần mềm là thiết kế hệ thống sao cho lập trình viên chỉ phải đối mặt với một phần nhỏ trong toàn bộ sự phức tạp ở một thời điểm. Cách tiếp cận này được gọi là *thiết kế mô-đun (modular design)*, trong phần này chúng ta sẽ tìm hiểu các nguyên tắc cơ bản của nó.

## Thiết kế mô-đun

&emsp;&emsp;Trong thiết kế mô đun, một hệ thống phần mềm được phân tách ra thành một nhóm các mô-đun tương đối độc lập. Mô-đun có thể có nhiều dạng, ví dụ như class, các hệ thống con (subsystems), hay các dịch vụ (services). Trong một thế giới lý tưởng, mỗi mô-đun sẽ hoàn toàn độc lập với các mô-đun khác: lập trình viên có thể làm việc với bất kì mô-đun nào mà không cần biết bất kì điều gì về các mô-đun khác.<br>
&emsp;&emsp;Tuy nhiên, thế giới lý tưởng đó là không khả thi, bởi các mô-đun phải làm việc với nhau bằng cách gọi đến hàm và phương thức của nhau. Hệ quả là các mô-đun này phải nắm được thông tin của mô-đun khác. Như vậy, các ràng buộc sẽ hình thành giữa các mô-đun: nếu một mô-đun thay đổi, thì các mô-đun khác cũng phải thay đổi để tương thích. Ví dụ: các tham số của một phương thức tạo ra ràng buộc giữa phương thức đó với bất kì đoạn code nào gọi đến nó; nếu các tham số bắt buộc được thay đổi, thì các đoạn code kia cũng phải được chỉnh sửa để tương thích với ký hiệu (signature) mới. Tóm lại, mục đích của thiết kế mô-đun là giảm thiểu tối đa những ràng buộc giữa các mô-đun.<br>
&emsp;&emsp;Để quản lý sự ràng buộc, một mô-đun được định nghĩa với hai phần: *giao diện (interface)* và *cài đặt (implementation)*.
* Giao diện bao gồm mọi thứ mà một lập trình viên cần biết, khi làm việc với một mô-đun, để có thể sử dụng mô-đun đó. Thông thường, một giao diện mô tả hành động của mô-đun, không phải cách mô-đun đó hoạt động. Một giao diện chứa hai loại thông tin: chính thức (formal) và không chính thức (informal).
    * Phần chính thức được biểu thị rõ ràng trong code. Ví dụ: kí hiệu (signature) của một phương thức bao gồm tên, kiểu dữ liệu của các tham số, kiểu dữ liệu của giá trị trả về, thông tin về các ngoại lệ (exceptions).
    * Phần không chính thức mô tả các hành vị bậc cao (high-level), ví dụ như một hàm xóa file dựa vào tham số tên file. Nếu một class có yêu cầu ràng buộc (constraints) khi sử dụng (như một phương thức này phải được gọi trước phương thức kia), thì đây cũng là một phần không chính thức trong giao diện của class. Phần không chính thức chỉ có thể được mô tả bằng cách sử dụng comments. 
* Cài đặt bao gồm phần code thực thi những điều được mô tả bởi giao diện.

&emsp;&emsp;Một lập trình viên khi làm việc trong một mô-đun nhất định thì phải hiểu được giao diện và cài đặt của mô-đun đó, cộng thêm cả giao diện của các mô-đun khác mà mô-đun hiện tại gọi đến. Điều quan trọng là, người lập trình viên không cần phải hiểu cài đặt của các mô-đun kia.<br>
&emsp;&emsp;Xét một ví dụ là mô-đun cài đặt cấu trúc dữ liệu cây nhị phân cân bằng. Trong mô-đun này chắc hẳn chứa nhiều đoạn code xử lý các logic phức tạp để đảm bảo cây được cân bằng, tuy nhiên người dùng sẽ không nhìn thấy sự phức tạp đó. Người dùng sẽ chỉ thấy phần giao diện tương đối đơn giản để thực hiện hành động thêm, xóa, lấy giá trị của các node trong cây. Để thực thi hành động thêm node, người dùng chỉ cần cung cấp khóa (key) và giá trị (value) của node, còn cơ chế duyệt cây, tách node đều được ẩn đi.<br>
&emsp;&emsp;Theo mục đích của cuốn sách và bài viết, một mô-đun là một đơn vị code bao gồm cả giao diện và cài đặt. Như vậy, mỗi class trong lập trình hướng đối tượng (OOP) là một mô-đun. Mỗi phương thức trong một class hay các hàm trong các ngôn ngữ không hướng đối tượng cũng được coi là các mô-đun. Các hệ thống con hay dịch vụ cũng là các mô-đun, mà giao diện của chúng có thể tồn tại ở nhiều dạng khác nhau, như các lệnh hệ thống (kernel calls) hay các yêu cầu HTTP (HTTP requests).<br>
&emsp;&emsp;Mô-đun tốt nhất là mô-đun có giao diện đơn giản hơn nhiều so với cài đặt của nó. Những mô-đun như vậy có hai ưu điểm:
* Thứ nhất, giao diện đơn giản làm giảm sự phức tạp của một mô-đun áp đặt lên phần còn lại của hệ thống.
* Thứ hai, nếu một mô-đun được chỉnh sửa mà không cần thay đổi giao diện của nó, thì các mô-đun khác sẽ không bị ảnh hưởng bởi sự thay đổi này.

## Sự trừu tượng

> Trừu tượng là một cách nhìn được đơn giản hóa về một đối tượng, trong đó những chi tiết không quan trọng được lược bỏ.

&emsp;&emsp;Khái niệm trừu tượng gắn bó mật thiết với thiết kế mô-đun. Nó rất hữu dụng bởi nó giúp ta dễ hình dung và quản lý những thứ phức tạp.<br>
&emsp;&emsp;Trong lập trình mô-đun, mỗi mô-đun cung cấp một sự trừu tượng dưới dạng giao diện của nó. Giao diện thể hiện một góc nhìn được giản hóa về các chức năng của mô-đun, còn chi tiết cài đặt là không quan trọng từ góc nhìn trừu tượng, vậy nên nó không được bao gồm ở giao diện. Trong định nghĩa, cụm từ "không quan trọng" rất đáng được chú ý. Càng nhiều chi tiết không quan trọng được lược bỏ khỏi trừu tượng thì càng tốt. Tuy nhiên, một chi tiết chỉ có thể được lược bỏ nếu nó không quan trọng. Chìa khóa để thiết kế giao diện là thực sự hiểu điều gì là cần thiết, sau đó tìm kiếm các thiết kế mà giảm được tối đa lượng thông tin quan trọng.<br>
&emsp;&emsp;Hệ thống file là một ví dụ. Sự trừu tượng của nó không bao gồm các chi tiết không quan trọng đối với người dùng như cơ chế chọn block trong thiết bị lưu trữ để sử dụng cho dữ liệu của một file. Tuy nhiên, có một số chi tiết trong cách cài đặt của hệ thống file quan trọng đối với người sử dụng: hầu hết các hệ thống file sử dụng bộ nhớ đệm (cache) và trì hoãn việc ghi dữ liệu mới vào thiết bị lưu trữ, với mục đích là tăng hiệu suất; một vài ứng dụng, như database, cần biết chính xác khi nào thì dữ liệu sẽ được thực sự ghi, để đảm bảo tính toàn vẹn dữ liệu. Như  vậy, các quy tắc cho việc ghi dữ liệu phải được thể hiện trong giao diện của hệ thống file.<br> 

## Mô-đun sâu (Deep modules)

&emsp;&emsp;Mô-đun tốt nhất là mô-đun cung cấp nhiều tính năng mạnh mẽ với giao diện đơn giản. Tính từ "sâu" (deep) được dùng để mô tả những mô-đun như vậy, ngược lại với "sâu" là "nông" (shallow). Hình bên dưới minh hoạ mô-đun sâu và nông một cách trực quan.
![Deep and shallow modules](https://images.viblo.asia/d30fb374-2d19-497f-8960-aaf0bc65a816.png)

&emsp;&emsp;Độ sâu của mô-đun là một cách nghĩ về chi phí và lợi nhuận. Lợi nhuận của một mô-đun là chức năng của nó, còn chi phí (hiểu theo sự phức tạp) là giao diện. Giao diện càng nhỏ và càng đơn giản thì sự phức tạp cũng ít theo. Mô-đun tốt nhất là mô-đun mang lại nhiều lợi nhuận nhất với ít chi phí nhất. Giao diện là tốt và cần thiết, nhưng giao diện lớn hơn, hay nhiều giao diện hơn, không có nghĩa là tốt hơn.<br>
&emsp;&emsp;Cơ chế nhập xuất file (file I/O) của hệ điều hành Unix và các hậu duệ của nó, như Linux, là một ví dụ tuyệt vời về giao diện sâu. Có 5 lệnh hệ thống cơ bản cho việc nhập xuất, với ký hiệu đơn giản:
```
int open(const char* path, int flags, mode_t permissions);
ssize_t read(int fd, void* buffer, size_t count);
ssize_t write(int fd, const void* buffer, size_t count);
off_t lseek(int fd, off_t offset, int referencePosition);
int close(int fd);
```
&emsp;&emsp;Các cài đặt hiện đại của giao diện nhập xuất của Unix yêu cầu hàng trăm nghìn dòng code, để xử lý tất cả các vấn đề phức tạp mà chúng ta gặp phải ghi làm việc với nhập xuất file. Các cài đặt này đều được ẩn khỏi người sử dụng. Mỗi năm các cài đặt này được thay đổi đáng kể, nhưng đối với người dùng, 5 lệnh hệ thống kể trên vẫn không hề thay đổi.

## Mô-đun nông (Shallow modules)

&emsp;&emsp;Mặt khác, một mô-đun được xem là nông (shallow) nếu giao diện của nó tương đối phức tạp so với tính năng mà nó cung cấp. Nếu một mô-đun nông, bạn sẽ phải dành nhiều thời gian để làm quen với giao diện, so với lượng thời gian mà mô-đun giúp bạn tiết kiệm. Dưới đây là một ví dụ rõ ràng:
```java
private void addNullValueForAttribute(String attribute) {
    data.put(attribute, null);
}
```
&emsp;&emsp;Ở góc độ quản lý sự phức tạp, phương thức này không khiến cho hệ thống trở nên tốt hơn, mà chỉ tệ đi. Phương thức nói trên không mang lại sự trừu tượng nào, bởi tất cả tính năng của nó được thể hiện qua giao diện, vậy nên chẳng dễ dàng hơn chút nào khi hình dung bằng giao diện so với việc hình dung bằng toàn bộ cài đặt của phương thức. Nếu phương thức được ghi tài liệu (documentation) cẩn thận, tài liệu sẽ dài còn dài hơn cả toàn bộ code. Hơn nữa, người dùng còn phải gõ phím nhiều hơn để gọi phương thức thay vì trực tiếp làm việc với biến data. Tóm lại, phương thức nói trên làm tăng sự phức tạp mà không mang lại lợi nhuận nào.<br>

## Hội chứng classitis

&emsp;&emsp;Thật không may rằng, ngày nay, giá trị của class sâu chưa được trân trọng rộng rãi. Sinh viên CNTT thường được dạy rằng class nên nhỏ, không sâu, và cần phải chia class thành các class nhỏ hơn. Hay một lời khuyên tương tự thường được đưa ra: "Bất kì phương thức nào dài hơn N dòng code thì nên được chia thành nhiều phương thức khác nhau" (N có thể chỉ ít bằng 10). Cách tiếp cận này dẫn đến số lượng lớn các class và phương thức nông, điều mà khiến cho sự phức tạp của hệ thống nói chung tăng lên.<br>
&emsp;&emsp;Hướng tiếp cận "class nên nhỏ" mang tính cực đoan được John Ousterhout gọi là hội chứng *classitis*. Trong các hệ thống mắc phải hội chứng này, lập trình viên được khuyến khích giảm tối đa lượng tính năng trong mỗi class mới: nếu bạn muốn thêm tính năng, hãy tạo thêm class. Classitis có thể làm cho mỗi class trở nên đơn giản, nhưng nó tăng độ phức tạp của toàn bộ hệ thống. Các class nhỏ không đóng góp nhiều tính năng, nên tồn tại rất nhiều class, mỗi class lại có một giao diện riêng. Những giao diện này dồn tụ lại và tạo ra sự phức tạp đáng kể ở mức độ hệ thống. Nhiều class nhỏ cũng khiến cho code rườm rà, bởi bản mẫu (boilerplate) được yêu cầu cho mỗi class.

## Ví dụ: Java I/O

&emsp;&emsp;Bản thân ngôn ngữ Java không yêu cầu nhiều class nhỏ, nhưng hội chứng classitis đang dần len lỏi vào cộng đồng java. Hãy cùng xem và thảo luận một đoạn code dùng để mở file và đọc các đối tượng đã được chuyển đổi (serialized):
```java
FileInputStream fileStream = new FileInputStream(fileName);
BufferedInputStream bufferedStream = new BufferedInputStream(fileStream);
ObjectInputStream objectStream = new ObjectInputStream(bufferedStream);
```
&emsp;&emsp;Đối tượng FileInputStream chỉ cung cấp tính năng nhập xuất thô sơ: nó không thể thực hiện nhập xuất với bộ đệm (buffer), hay cũng không thể đọc và viết đối tượng đã tượng chuyển đổi. Đối tượng BufferedInputStream thêm vào một bộ đệm cho FileInputStream, và đối tượng ObjectInputStream cho phép đọc và viết các đối tượng được chuyển đổi. Hai đối tượng đầu tiên sẽ không bao giờ được sử dụng một khi file đã được mở, mọi hoạt động sau đó chỉ dùng đến objectStream.<br>
&emsp;&emsp;Thật phiền phức (và có lẽ là dễ gây ra lỗi) khi bộ đệm phải được yêu cầu trực  tiếp bằng cách tạo ra một đối tượng BufferedInputStream riêng. Nếu một lập trình viên quên tạo đối tượng này, sẽ chẳng có bộ đệm nào và hiệu suất của nhập xuất bị giảm. Có lẽ các lập trình viên Java sẽ lý luận rằng không phải tất cả đều muốn sử dụng bộ đệm, nên nó không nên được đưa vào cơ chế mặc định. Họ cũng có thể cho rằng sẽ tốt hơn nếu giữ tính năng sử dụng bộ đệm riêng biệt, và cho phép mọi người lựa chọn sử dụng nó hoặc không. Mặc dù cung cấp sự lựa chọn là tốt, nhưng **giao diện nên được thiết kế sao cho các trường hợp thường gặp trở nên đơn giản nhất có thể**. Hầu hết mọi người đều muốn sử dụng bộ đệm khi nhập xuất file, do đó nó nên được cung cấp mặc định. Và trong một vài trường hợp bộ đệm là không cần thiết, thư viện có thể cung cấp một cơ chế để tắt bỏ nó. Cơ chế tắt bỏ bộ đệm nên được tách riêng (ví dụ, bằng cách tạo ra một phương thức khởi tạo khác cho FileInputStream, hoặc thêm một phương thức để tắt bỏ hay thay chế bộ đệm), nhờ đó mà hầu hết lập trình viên không cần phải biết đến sự tồn tại của nó.

# Kết luận
&emsp;&emsp;Ở bài viết này, chúng ta đã hiểu được khái niệm chiều sâu của mô-đun. Ở bài viết tiếp theo, chúng ta sẽ tìm hiểu các kỹ thuật để tạo ra các mô-đun sâu.