**Khái niệm hệ thống phân tán:**

`Hệ thống phân tán là một tập hợp các phần tử tính toán độc lập mà đối với người dùng thì nó hoạt động như một hệ thống nhất quán duy nhất.`


Một hệ thống phân tán sẽ bao gồm 2 tính chất sau đây:
* Là tập hợp các phần tử tính toán độc lập.
* Hoạt động như một hệ thống nhất quán duy nhất.

**Tính chất 1: Tập hợp các phần tử tính toán độc lập.**

 Các hệ thống phân tán hiện đại thường sẽ bao gồm tất cả các loại nút, từ các siêu máy tính đến máy tính nhỏ hay các thiết bị nhỏ hơn. Một nguyên tắc cơ bản là các nút có thể hoạt động độc lập với nhau. Trong thực tế thì các nút được lập trình để đạt được các mục tiêu của chung, được thực hiện bằng việc trao đổi các thông điệp với nhau. Một nút nhận thông điệp đến, xử lý và sau đó nó dẫn đến các liên lạc tiếp theo thông qua việc truyền thông điệp.

Có một vấn đề quan trọng, như một hệ quả của việc xử lý các nút độc lập thì mỗi nút sẽ có một khái niệm thời gian riêng. Nói cách khác, chúng ta không thể có một cái đồng hồ chung cho cả hệ thống như một cái đồng hồ toàn cầu. Việc thiếu một tham chiếu thời gian chung dẫn đến những câu hỏi liên quan đến sự đồng bộ và phối hợp trong một hệ thống phân tán. Thực tế là việc xử lý một tập hợp các nút tương tự như việc cần quản lý các thành viên và tổ chức . Nói cách khác, chúng ta cần đăng ký những nút nào thuộc hệ thống hoặc có thể không thuộc hệ thống, đồng thời cung cấp cho mỗi thành viên một danh sách các nút mà có thể giao tiếp với nhau được.

**Vấn đề quản lý thành viên nhóm:**

* Để giải quyết thì giải pháp là phân biệt giữa nhóm công khai và nhóm riêng tư(  nhóm mở và nhóm đóng). Trong một nhóm mở, bất kỳ nút nào cũng được phép tham gia vào hệ thống phân tán, nghĩa là nó có thể gửi thông điệp đến bất kỳ nút nào khác trong hệ thống. Ngược lại với nhóm kín, chỉ các thành viên trong nhóm mới có thể giao tiếp được với nhau và cần có một cơ chế riêng để cho một nút tham gia hay rời nhóm.

**Vấn đề kiểm soát truy cập**
 * Đầu tiên, phải có một cơ chế xác thực một nút và như chúng ta biết nếu không được thiết kế đúng cách, việc quản lý xác thực có thể gặp các vấn đề về khả năng mở rộng.  
 * Thứ hai, về nguyên tắc, mỗi nút sẽ phải kiểm tra xem nó có đang thực sự giao tiếp với một thành viên nhóm không, chẳng hạn như với một kẻ xâm nhập với mục đích phá hoại chẳng hạn. Cuối cùng, xét đến việc một thành viên có thể dễ dàng giao tiếp với những người không phải thành viên, bảo mật là một vấn đề trong việc giao tiếp của hệ thống phân tán, chúng ta sẽ phải đối mặt với các vấn đề về sự tin cậy.

Liên quan đến việc tổ chức của các phần tử, thực tế thì một hệ thống phân tán thường được tổ chức như một mạng lớp phủ( overlay network). Trong trường hợp này, một nút thường là một quy trình phần mềm được trang bị một danh sách các tiến trình mà có thể gửi thông điệp đến. Nó cũng có thể là trường hợp mà một nút hàng xóm cần tìm kiếm đầu tiên. Việc truyền thông điệp được gửi thông qua các kênh **TCP/IP** hoặc **UDP**. Có hai lại mạng phủ ( **Overlay Network**):

* **Structured overlay**: Trong trường hợp này, mỗi nút có một tập hợp các nút láng giềng được xác định rõ ràng mà nó có thể giao tiếp. Ví dụ, các nút được tổ chức trong một cây hoặc vòng logic.
* **Unstructured overlay:** Trong các lớp phủ này, mỗi nút có một số tham chiếu đến các nút khác được chọn ngẫu nhiên.

Trong nhiều trường hợp, về nguyên tắc, một mạng phủ phải luôn được kết nối, nghĩa là giữa hai nút bất kỳ luôn có một đường truyền thông tin cho phép các nút đó định tuyến các thông điệp từ nút này sang nút khác. Một lớp phủ tốt được cấu trúc bởi các mạng ngang hàng( P2P). Điều quan trọng là việc tổ chức các nút đòi hỏi công sức khá lớn và đôi khi nó là một trong những phần phức tạp hơn của quản lý hệ thống phân tán.

**Tính chất 2: Hệ thống nhất quán đơn( Single coherent system)**

Như đã đề cập, một hệ thống phân tán nên giống như như một hệ thống nhất quán đơn, có nghĩa là người dùng cuối thậm chí không nhận thấy rằng họ đang tương tác với các **quy trình, dữ liệu và điều khiển** đã được ẩn trên một mạng máy tính. Để đạt được một hệ thống đơn thường có quá nhiều yêu cầu, vì vậy trong định nghĩa của chúng tôi về hệ thống phân tán, đơn giản hơn thì đó là nó có vẻ nhất quán. Tốt nhất, một hệ thống phân tán là nhất quán nếu nó hoạt động đúng theo mong đợi của người dùng. Cụ thể hơn trong một hệ thống nhất quán đơn, tập hợp các nút nói chung hoạt động giống nhau, bất kể sự tương tác giữa người dùng và hệ thống diễn ra ở đâu, khi nào và như thế nào.

Ví dụ: nó yêu cầu người dùng cuối không thể biết chính xác trên máy tính nào có quy trình hiện đang thực thi, hoặc thậm chí có thể một phần của nhiệm vụ đã được tạo ra cho một quy trình khác đang được thực thi ở nơi khác. 

Tương tự như vậy, nơi lưu trữ dữ liệu cũng không phải vấn đề được quan tâm và người dùng cũng không quan tâm đến việc hệ thống có đang sao chép dữ liệu để nâng cao hiệu suất không. Nó được gọi là **tính trong suốt( distribution transparency)** của hệ thống với người dùng. Đây là một mục tiêu quan trọng trong việc thiết kế hệ thống phân tán mà chúng ta sẽ thảo luận trong các bài viết tiếp theo. Ta có thể hiểu đơn giản giống như cách tiếp cận được thực hiện trong nhiều hệ điều hành, tài nguyên được truy cập thông qua giao diện hệ thống tệp thống nhất, che giấu sự khác biệt không chỉ giữa các tệp, thiết bị lưu trữ và bộ nhớ chính mà còn cả mạng.

Tuy nhiên, để có được hệ thống nhất quán thì ta cũng cần đánh đổi. Thực tế là một hệ thống phân tán bao gồm nhiều nút trong mạng, nên không thể tránh khỏi việc các nút bị lỗi ở bất cứ lúc nào. Điều này có nghĩa là có một hành vi bất ngờ trong đó ví dụ một số ứng dụng có thể tiếp tục thực thi thành công trong khi những ứng dụng khác tạm dừng, đây là một thực tế cần xử lý. Mặc dù các lỗi này là cố hữu đối với bất kỳ hệ thống phức tạp nào, trong hệ thống phân tán thì chúng lại đặc biệt khó che giấu. Nó đã khiến người đạt giải Turing-Award, Leslie Lamport mô tả về hệ thống phân tán : “*Một trong những lỗi của một máy tính mà bạn thậm chí không biết là đã tồn tại có thể khiến máy tính của bạn không thể sử dụng được*”.

**Middleware and hệ thống phân tán( Distributed systems)**

Để giúp việc phát triển các ứng dụng phân tán, các hệ thống phân tán thường được tổ chức sao cho có các lớp phần mềm riêng biệt được đặt trên các hệ điều hành máy tính. Kiểu tổ chức này thể hiện qua hình dưới và dẫn đến cái được gọi là **Middleware( phần mềm trung gian)**.

![](https://images.viblo.asia/27078bac-4adb-4898-b718-7b953d3c482c.png)

Hình trên mô tả bốn máy tính có nối mạng và ba ứng dụng( A, B, C), trong đó ứng dụng B được phân phối trên các máy tính 2 và 3. Mỗi ứng dụng được cung cấp cùng một giao diện. Hệ thống phân tán cung cấp các phương tiện để các thành phần của cùng một ứng dụng phân tán có thể giao tiếp với nhau, nhưng cũng để các ứng dụng khác nhau giao tiếp. Đồng thời, nó che giấu sự khác biệt về phần cứng và hệ điều hành từ mỗi ứng dụng.

Ta có thể hiểu đơn giản, phần mềm trung gian( middleware) cùng với hệ thống phân tán thì tương tự như hệ điều hành với máy tính: một trình quản lý tài nguyên cung cấp các ứng dụng để chia sẻ và triển khai tài nguyên trên mạng một cách hiệu quả. Bên cạnh quản lý tài nguyên, nó cung cấp các dịch vụ có thể thấy ở hầu hết các hệ điều hành như:

* Facilities for interapplication communication.
* Security services.
* Accounting services.
* Masking of and recovery from failures.

**Communication – Truyền thông**: Một dịch vụ truyền thông phổ biến là gọi là “**gọi thủ tục từ xa**” (**RPC**). Một dịch vụ **RPC** cho phép ứng dụng gọi một chức năng được triển khai và thực thi trên một máy tính từ xa như thể nó có sẵn tại đó. Để đạt được điều này, nhà phát triển chỉ cần chỉ định tiêu đề hàm được thể hiện bằng một ngôn ngữ lập trình đặc biệt, từ đó hệ thống con RPC có thể tạo ra mã cần thiết để thiết lập các lệnh gọi từ xa.

**Transactions – Giao dịch**: Các ứng dụng thì sử dụng nhiều dịch vụ được phân phối từ các máy tính khác nhau. Phần mềm trung gian thường cung cấp các hỗ trợ đặc biệt để thực hiện các dịch vụ theo kiểu **“all or nothing”**( tất cả hoặc không gì cả), thường được gọi là giao dịch nguyên tử – **atomic** **transaction**. Trong trường hợp này các nhà phát triển cần chỉ định các dịch vụ từ xa có liên quan bằng cách tuân theo một giao thức chuẩn hóa, phần mềm trung gian đảm bảo rằng mọi dịch vụ đều được gọi hoặc không dịch vụ nào được gọi.

**Service composition – Thành phần dịch vụ:** Nó ngày càng trở nên phổ biến khi việc phát triển các ứng dụng mới bằng các chương trình hiện có và kết hợp chúng lại với nhau. Đây là trường hợp đáng chú ý với nhiều ứng dụng web, đặc biệt là những dịch vụ Web. Phần mềm trung gian dựa trên web có thể trợ giúp bằng cách chuẩn hóa các dịch vụ Web được truy cập và cung cấp các phương tiện để tạo ra các chức năng của chúng theo một thứ tự cụ thể. Một ví dụ đơn giản về **service composition** bằng sự kết hợp:

* Các trang web kết hợp và tổng hợp dữ liệu từ nhiều nguồn khác nhau.
* Các bản kết hợp là những bản đồ dựa trên Google Maps trong đó bản đồ được cải tiến với nhiều thông tin bổ sung như kế hoạch chuyến đi hoặc dự báo thời tiết theo thời gian thực.

**Reliability – Độ tin cậy:** The Horus Toolkit  cho phép nhà phát triển xây dựng ứng dụng dưới dạng một nhóm quy trình sao cho bất kỳ thông báo nào gửi bởi một quy trình đều được đảm bảo nhận được bởi tất cả hoặc không có quy trình nào cả. Những đảm bảo như vậy có thể đơn giản hóa rất nhiều việc phát triển các ứng dụng phân tán và thường được triển khai như một phần của phần mềm trung gian.

**Nguồn:** *Distributed Systems 3rd edition Version 3.03 (2020) Maarten van Steen Andrew S. Tanenbaum*