Ba thành phần nền tảng Java không thể thiếu và cách chúng hoạt động cùng nhau trong các ứng dụng Java của bạn
![](https://images.viblo.asia/900e92c6-2c4f-4246-85a7-05fb79a60d5f.png)
Các nhà phát triển mới sử dụng Java thường tự hỏi có gì khác biệt Java Virtual Machine,  Java Development Kit,  Java Runtime Environment. Họ cũng tò mò về cách ba thành phần nền tảng Java này hoạt động cùng nhau trong các ứng dụng Java. Cuối cùng, các nhà phát triển cần biết họ sẽ tương tác với từng thành phần như thế nào.

Nói ngắn gọn:

* JVM là thành phần nền tảng Java thực thi các chương trình của bạn.
* JRE khởi tạo JVM và đảm bảo các phụ thuộc có sẵn cho các chương trình của bạn.
* JDK cho phép bạn tạo các chương trình Java có thể được thực thi và chạy bởi JVM và JRE.

Là nhà phát triển, bạn sẽ làm việc với JDK để viết các ứng dụng của mình và với JVM để gỡ lỗi và tối ưu hóa chúng, đặc biệt là về hiệu năng. JRE chủ yếu chạy ở chế độ nền, nhưng bạn có thể sử dụng nó để theo dõi ứng dụng và cấu hình bộ nhớ.
# JVM là gi? Giới thiệu Java Virtual Machine
JVM quản lý bộ nhớ hệ thống và cung cấp môi trường thực thi di động cho các ứng dụng dựa trên Java
![](https://images.viblo.asia/8837d1f8-67f4-4bc4-81b6-d177f4069359.png)
## Sử dụng và định nghĩa JVM
JVM có hai chức năng chính: cho phép các chương trình Java chạy trên mọi thiết bị hoặc hệ điều hành (được gọi là nguyên tắc "Viết một lần, chạy mọi nơi") và để quản lý và tối ưu hóa bộ nhớ chương trình
![](https://images.viblo.asia/75f0b56e-8003-493c-9a32-d4a3a3d3d52f.png)
## Quản lí bộ nhớ trong JVM
Tương tác phổ biến nhất với JVM đang chạy là kiểm tra mức sử dụng bộ nhớ trong heap và stack. Điều chỉnh phổ biến nhất là điều chỉnh các cài đặt bộ nhớ của JVM.
### Thu gom rác(Garbage collection)
Trước Java, tất cả bộ nhớ chương trình được quản lý bởi lập trình viên. Trong Java, bộ nhớ chương trình được quản lý bởi JVM. JVM quản lý bộ nhớ thông qua một quá trình gọi là bộ sưu tập rác(*garbage collection*), liên tục xác định và loại bỏ bộ nhớ không sử dụng trong các chương trình Java. Việc thu gom rác xảy ra bên trong một JVM đang chạy.
## Tải và thực thi class files trong  JVM
### Java class loader trong JVM
Mọi thứ trong java là một lớp(class), và tất cả các ứng dụng Java được xây dựng từ các lớp(classes). Một ứng dụng có thể bao gồm một lớp hoặc hàng ngàn lớp. Để chạy một ứng dụng Java, JVM phải tải các tệp .class đã biên dịch vào context, chẳng hạn như một máy chủ, nơi chúng có thể được truy cập. Một JVM phụ thuộc vào trình tải lớp của nó để thực hiện chức năng này.

Trình tải lớp Java là một phần của JVM tải các lớp vào bộ nhớ và làm cho chúng có sẵn để thực thi. Trình nạp lớp sử dụng các kỹ thuật như lazy-loading và caching để làm cho việc tải lớp hiệu quả nhất có thể. 
### Công cụ thực thi trong JVM(The execution engine in the JVM)
Khi trình tải lớp đã hoàn thành công việc tải các lớp, JVM bắt đầu thực thi mã trong mỗi lớp. Công cụ thực thi là thành phần JVM xử lý chức năng này. Công cụ thực thi là điều cần thiết cho JVM đang chạy. 
Mã thực thi liên quan đến việc quản lý truy cập vào tài nguyên hệ thống. Công cụ thực thi JVM nằm giữa chương trình đang chạy - với nhu cầu về tài nguyên tệp, mạng và bộ nhớ - và hệ điều hành, cung cấp các tài nguyên đó.

### Cách công cụ thực thi quản lý tài nguyên hệ thống
Tài nguyên hệ thống có thể được chia thành hai loại lớn: bộ nhớ và mọi thứ khác.

Hãy nhớ lại rằng JVM chịu trách nhiệm xử lý bộ nhớ không sử dụng và bộ sưu tập rác(*garbage collection*) là cơ chế thực hiện việc xử lý đó. JVM cũng chịu trách nhiệm phân bổ và duy trì cấu trúc tham chiếu mà nhà phát triển được cấp. Ví dụ, công cụ thực thi của JVM chịu trách nhiệm lấy một cái gì đó giống như từ khóa *new* trong Java và biến nó thành một yêu cầu dành riêng cho hệ điều hành để cấp phát bộ nhớ.

Ngoài bộ nhớ, công cụ thực thi quản lý tài nguyên để truy cập hệ thống tệp và network I/O . Do JVM có thể tương tác trên các hệ điều hành, nên đây không phải là nhiệm vụ . Ngoài nhu cầu tài nguyên của từng ứng dụng, công cụ thực thi phải đáp ứng với từng môi trường HĐH. 
# JRE là gì? Giới thiệu Java Runtime Environment
JRE tạo JVM và đảm bảo các phụ thuộc có sẵn cho các chương trình Java của bạn.
![](https://images.viblo.asia/ef7ee3f4-f8df-486e-8d47-2dc0a605e68b.png)
Thực tế mà nói, runtime enviroment là một phần mềm được thiết kế để chạy các phần mềm khác. Là runtime enviroment cho Java, JRE chứa các thư viện lớp Java, trình tải lớp Java và Máy ảo Java. Trong hệ thống này:
* Trình tải lớp chịu trách nhiệm tải chính xác các lớp và kết nối chúng với các thư viện lớp Java cốt lõi.
* JVM chịu trách nhiệm đảm bảo các ứng dụng Java có tài nguyên mà chúng cần để chạy và hoạt động tốt trong thiết bị hoặc môi trường đám mây của bạn.
* JRE chủ yếu là một thùng chứa cho các thành phần khác và chịu trách nhiệm điều phối các hoạt động của chúng.

## Runtime Enviroment là gì?
Một chương trình phần mềm cần phải thực thi và để thực hiện nó cần một môi trường để chạy. *Runtime Enviroment* tải các tệp lớp và đảm bảo có quyền truy cập vào bộ nhớ và các tài nguyên hệ thống khác để chạy chúng. Trước đây, hầu hết các phần mềm đều sử dụng hệ điều hành (HĐH) làm *Runtime Enviroment*. Chương trình chạy bên trong bất kỳ máy tính nào được bật, nhưng dựa vào cài đặt hệ điều hành để truy cập tài nguyên. Tài nguyên trong trường hợp này sẽ là những thứ như bộ nhớ và tệp chương trình và dependencies. Java Runtime Enviroment đã thay đổi tất cả, ít nhất là đối với các chương trình Java.

JRE chứa các thư viện và phần mềm mà các chương trình Java của bạn cần chạy. Ví dụ, trình tải lớp Java là một phần của Java Runtime Environment. Phần mềm quan trọng này tải mã Java được biên dịch vào bộ nhớ và kết nối mã với các thư viện lớp Java thích hợp.
## Cách JRE hoạt động với JVM
Java Virtual Machine là một hệ thống phần mềm đang chạy chịu trách nhiệm thực thi các chương trình Java trực tiếp. JRE là hệ thống trên đĩa lấy mã Java của bạn, kết hợp nó với các thư viện cần thiết và khởi động JVM để thực thi nó.
![](https://images.viblo.asia/b4e3484f-fdde-4063-a947-53527ed7060a.png)

## Bộ nhớ Java và JRE
Bộ nhớ Java bao gồm ba thành phần: heap, stack và metaspace (trước đây được gọi là permgen).
* Metaspace là nơi Java giữ thông tin không thay đổi của chương trình như các định nghĩa lớp.
* Không gian heap (*Heap space*) là nơi Java giữ nội dung biến(*variable content*).
* Không gian ngăn xếp (*Stack space*) là nơi Java lưu trữ thực thi hàm(*function execution*) và tham chiếu biến(*variable references*).

## Quản lý bộ nhớ trong java 8
Cho đến Java 8, *metaspace* được biết đến như là permgen. Bên cạnh việc là một cái tên hay hơn nhiều, *metaspace* là một thay đổi quan trọng đối với cách các nhà phát triển tương tác với không gian bộ nhớ của Java.  Trước đây, bạn sẽ sử dụng lệnh * java -XX: MaxPermSize* để theo dõi kích thước của không gian permgen. Từ Java 8 trở đi, Java sẽ tự động tăng kích thước của metaspace để đáp ứng nhu cầu meta của chương trình của bạn. Java 8 cũng giới thiệu một cờ mới, MaxMetaspaceSize, có thể được sử dụng để giới hạn kích thước metaspace.

Các tùy chọn bộ nhớ khác, heap và stack, vẫn giữ nguyên trong Java 8.

## Cấu hình không gian heap(Configuring heap space)
Không gian heap là phần động nhất của hệ thống bộ nhớ Java. Bạn có thể sử dụng các cờ -Xms và -Xmx để cho Java biết mức độ lớn để bắt đầu heap và mức độ lớn để cho phép nó trở thành. Hiểu cách điều chỉnh các cờ này cho các nhu cầu chương trình cụ thể là một khía cạnh quan trọng của quản lý bộ nhớ trong Java. Ý tưởng là làm cho heap đủ lớn để  *garbage collection* hoạt động hiệu quả nhất. Đó là, bạn muốn cho phép đủ bộ nhớ để cho chương trình chạy, nhưng bạn không muốn nó lớn hơn mức cần thiết.

## Cấu hình không gian ngăn xếp(Configuring stack space)
Không gian ngăn xếp là nơi các hàm gọi và tham chiếu biến được xếp hàng. Không gian ngăn xếp là nguồn gốc của lỗi nổi tiếng thứ hai trong lập trình Java: ngoại lệ tràn ngăn xếp (đầu tiên là ngoại lệ con trỏ null). Ngoại lệ tràn ngăn xếp chỉ ra rằng bạn đã hết dung lượng ngăn xếp vì quá nhiều phần đã được bảo lưu. Thông thường, bạn sẽ nhận được một ngăn xếp tràn khi một phương thức hoặc phương thức gọi nhau theo kiểu vòng tròn, do đó dành một số lượng lớn các lệnh gọi hàm ngày càng tăng vào ngăn xếp.

Bạn sử dụng công tắc -Xss để định cấu hình kích thước bắt đầu ngăn xếp. Ngăn xếp sau đó phát triển linh hoạt theo nhu cầu của chương trình.
# JDK là gì? Giới thiệu Java Development Kit
JDK là một thành phần nền tảng chính để xây dựng các ứng dụng Java. Trái tim của nó là trình biên dịch Java.
![](https://images.viblo.asia/fa274cc9-cb6a-4cbd-8b5c-6885dbcbcefa.png)
Java Development Kit (JDK) là một trong ba gói công nghệ cốt lõi được sử dụng trong lập trình Java, cùng với JVM (Java Virtual Machine) và JRE (Java Runtime Environment)

JRE có thể được sử dụng như một thành phần độc lập để chạy các chương trình Java, nhưng nó cũng là một phần của JDK. JDK yêu cầu JRE vì chạy các chương trình Java là một phần của việc phát triển chúng.
![](https://images.viblo.asia/0fa40581-96db-4353-8b0a-269848407ee5.png)
Các định nghĩa:
* Định nghĩa kỹ thuật: JDK là một triển khai của đặc tả nền tảng Java, bao gồm các trình biên dịch và thư viện lớp.
* Định nghĩa hàng ngày: JDK là gói phần mềm bạn tải xuống để tạo các ứng dụng dựa trên Java.

Nguồn tham khảo:
https://www.javaworld.com/article/3272244/what-is-the-jvm-introducing-the-java-virtual-machine.html
https://www.javaworld.com/article/3296360/what-is-the-jdk-introduction-to-the-java-development-kit.html
https://www.javaworld.com/article/3304858/what-is-the-jre-introduction-to-the-java-runtime-environment.html