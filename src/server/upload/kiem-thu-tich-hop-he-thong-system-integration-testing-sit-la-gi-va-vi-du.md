### Kiểm thử tích hợp hệ thống là gì?
Kiểm thử tích hợp hệ thống (SIT) được định nghĩa là một loại kiểm thử phần mềm được thực hiện khi tích hợp phần mềm và phần cứng để xác minh tính đúng đắn của hệ thống hoàn chỉnh. Đó là quá trình kiểm thử được tiến hành để đánh giá hệ thống hoàn chỉnh có đáp ứng được yêu cầu được đưa ra trước đó hay không.

Kiểm thử tích hợp hệ thống (SIT) được thực hiện để xác minh sự tương tác giữa các module  của hệ thống phần mềm. Nó liên quan đến việc xác minh các yêu cầu phần mềm cấp cao và cấp thấp được chỉ định trong tài liệu dữ liệu đặc tả , yêu cầu phần mềm và tài liệu thiết kế phần mềm.

Nó cũng xác minh sự cùng tồn tại của một hệ thống phần mềm với các phần mềm khác và kiểm thử giao diện giữa các module của ứng dụng phần mềm. Trong loại thử nghiệm này, trước tiên các module được thử nghiệm riêng lẻ và sau đó kết hợp để tạo ra một hệ thống.

Ví dụ, các thành phần phần mềm và phần cứng được kết hợp và kiểm thử dần dần cho đến khi toàn bộ hệ thống được tích hợp.
![](https://images.viblo.asia/37cdf9b1-a8bd-43e9-afd5-236b61276250.png)

### Tại sao cần kiểm thử tích hợp hệ thống?
Trong nghiên cứu và phát triển phần mềm, kiểm thử tích hợp hệ thống được thực hiện bởi vì:

* Giúp phát hiện sớm các rủi ro.
* Phản hồi sớm về tính khả dụng của các module cá nhân được tích hợp
* Lập lịch giải quyết rủi ro một cách linh hoạt và nó có thể thực hiện đồng thời trong quá trình develop
* Data flow chính xác
* Flow điều khiển chính xác
* Đúng thời gian
* Sử dụng bộ nhớ chính xác
* Đúng với yêu cầu phần mềm

### Cách thực hiện Kiểm thử tích hợp hệ thống
Đây là một kỹ thuật có hệ thống để xây dựng cấu trúc chương trình trong khi tiến hành các thử nghiệm để phát hiện ra các lỗi liên quan đến tích hợp.

Tất cả các module được tích hợp trước và toàn bộ chương trình được kiểm thử toàn bộ. Nhưng trong quá trình này, một loạt các lỗi có thể gặp phải.

Việc fixbug sẽ khó khăn vì khi đó phần mềm đã gần hoàn tất. Khi các lỗi này được khắc phục và sửa chữa, một lỗi mới sẽ xuất hiện và quá trình cứ liên tục như vậy trong một vòng lặp vô tận . Để tránh tình trạng này, một cách tiếp cận khác được sử dụng, tích hợp tăng dần (Incremental Integration). Chúng ta sẽ thấy chi tiết hơn về một cách tiếp cận tăng dần trong hướng dẫn sau này.

Có một số phương pháp gia tăng như các thử nghiệm tích hợp được tiến hành trên một hệ thống dựa trên bộ xử lý đích. Phương pháp được sử dụng là Kiểm thử hộp đen (Black box testing) . Có thể sử dụng tích hợp từ dưới lên hoặc từ trên xuống.

Tích hợp phần mềm cũng có thể áp dụng phần lớn trong môi trường máy chủ, với các đơn vị cụ thể cho môi trường đích tiếp tục được mô phỏng trong máy chủ. Lặp lại các thử nghiệm trong môi trường đích để xác nhận là việc cần thiết.

Kiểm thử xác nhận ở cấp độ này sẽ xác định các vấn đề cụ thể về môi trường, chẳng hạn như lỗi trong phân bổ bộ nhớ và phân bổ lại. Tính thực tiễn của việc tiến hành tích hợp phần mềm trong môi trường máy chủ sẽ phụ thuộc vào mức độ và chức năng cụ thể của mục tiêu. Đối với một số hệ thống nhúng, việc ghép với môi trường đích sẽ rất khó khăn, khiến việc tiến hành tích hợp phần mềm trong môi trường máy chủ trở nên không thực tế.

Phát triển những phần mềm quy mô lớn sẽ phân chia tích hợp phần mềm thành một số cấp độ. Các cấp độ tích hợp phần mềm thấp hơn chủ yếu dựa vào môi trường máy chủ, với các cấp độ tích hợp phần mềm sau này trở nên phụ thuộc nhiều hơn vào môi trường đích.

Lưu ý: Nếu chỉ phần mềm đang được kiểm thử thì nó được gọi là Kiểm thử tích hợp phần mềm [SSIT] và nếu cả phần cứng và phần mềm đang được kiểm thử, thì đó được gọi là Kiểm thử tích hợp phần mềm phần cứng [HSIT].

### Tiêu chuẩn bắt đầu và dừng kiểm thử trong kiểm thử tích hợp
Thông thường trong khi thực hiện Kiểm thử tích hợp, chiến lược ETVX (Tiêu chuẩn bắt đầu test, Nhiệm vụ, Xác thực và Tiêu chuẩn dừng test) được sử dụng.

**Tiêu chuẩn bắt đầu test:**

* Hoàn thành kiểm thử đơn vị

**Đầu vào:**

* Dữ liệu yêu cầu phần mềm
* Tài liệu thiết kế phần mềm
* Kế hoạch xác minh phần mềm
* Tài liệu tích hợp phần mềm


**Hoạt động:**


* Dựa trên các yêu cầu cấp cao và cấp thấp, hãy tạo các test case và quy trình kiểm thử
* Kết hợp các bản dựng mô-đun cấp thấp thực hiện chức năng chung
* Phát triển khai thác bản thử nghiệm
* Kiểm thử bản dựng
* Khi thử nghiệm được thông qua, bản dựng được kết hợp với các bản dựng khác và được kiểm thử cho đến khi toàn bộ hệ thống được tích hợp.
* Thực hiện lại tất cả các thử nghiệm trên nền tảng dựa trên bộ xử lý đích và thu được kết quả


**Tiêu chuẩn dừng test:**

* Hoàn thành thành công việc tích hợp mô-đun phần mềm trên phần cứng
* Hiệu suất của phần mềm tuân thủ chính xác theo các yêu cầu được chỉ định


**Đầu ra**

* Báo cáo kiểm thử tích hợp
* Các test case và quy trình kiểm thử phần mềm [SVCP].


### Kiểm thử tích hợp phần cứng

Đây là kiểm thử của Thành phần phần mềm máy tính (CSC) hoạt động trong môi trường máy tính mục tiêu trên chức năng cấp cao. Nó tập trung vào hành vi của phần mềm tích hợp được phát triển trên môi trường đích.

**Kiểm thử tích hợp phần cứng-phần mềm dựa trên yêu cầu**

Mục đích của kiểm thử tích hợp phần cứng / phần mềm dựa trên yêu cầu là đảm bảo rằng phần mềm trong máy tính mục tiêu sẽ đáp ứng các yêu cầu cấp cao. Các lỗi điển hình được tiết lộ bởi phương pháp thử nghiệm này bao gồm:

* Lỗi giao diện phần cứng / phần mềm
* Vi phạm phân vùng phần mềm.
* Không có khả năng phát hiện lỗi bằng cách kiểm thử tích hợp
* Phản hồi không chính xác với lỗi phần cứng
* Lỗi do trình tự, tải đầu vào tạm thời và nguồn đầu vào bị quá tải
* Lặp lại phản hồi hành vi không chính xác
* Kiểm soát không chính xác việc quản lý phần cứng bộ nhớ
* Vấn đề tranh chấp bus dữ liệu
* Hoạt động không chính xác của cơ chế xác minh tính tương thích.


Tích hợp phần mềm và phần cứng liên quan đến việc xác minh các yêu cầu cấp cao. Tất cả các thử nghiệm ở cấp độ này được tiến hành trên phần cứng mục tiêu.

* Kiểm thử hộp đen là phương pháp kiểm thử chính được sử dụng ở cấp độ thử nghiệm này.
* Chỉ xác định các test case kiểm thử từ các yêu cầu cấp cao
* Một kiểm thử phải được thực hiện trên phần cứng đạt tiêu chuẩn sản xuất 


**Những điều cần lưu ý khi thiết kế các test case cho kiểm thử tích hợp phần mềm và phần cứng (HW/SW)**

* Thu thập chính xác tất cả dữ liệu của phần mềm
* Chia tỷ lệ và phạm vi dữ liệu như mong đợi từ phần cứng đến phần mềm
* Đầu ra chính xác của dữ liệu từ phần mềm đến phần cứng
* Dữ liệu trong thông số kỹ thuật (phạm vi bình thường)
* Dữ liệu ngoài thông số kỹ thuật (phạm vi bất thường)
* Dữ liệu ranh giới
* Ngắt xử lý
* Thời gian
* Sử dụng bộ nhớ chính xác (địa chỉ, chồng chéo, v.v.)
* Chuyển trạng thái


**Lưu ý:**  Đối với kiểm thử ngắt, tất cả các ngắt sẽ được xác minh độc lập với yêu cầu ban đầu thông qua dịch vụ đầy đủ tới khi hoàn thành. Các test case sẽ được thiết kế đặc biệt để kiểm thử đầy đủ các ngắt.

### Kiểm thử tích hợp phần mềm
Đây là kiểm thử của thành phần phần mềm máy tính hoạt động trong máy chủ / máy tính đích

Nó tập trung vào hành vi của CSC trong môi trường máy chủ / mục tiêu mô phỏng. Cách tiếp cận được sử dụng cho tích hợp phần mềm có thể là cách tiếp cận gia tăng (từ trên xuống, cách tiếp cận từ dưới lên hoặc kết hợp cả hai).

**Cách tiếp cận gia tăng**

Kiểm thử tăng dần là một cách kiểm thử tích hợp. Trong loại phương pháp kiểm thử này, trước tiên bạn kiểm thử từng module của phần mềm và sau đó tiếp tục kiểm thử bằng cách nối thêm các mô-đun khác với module khác, v.v.

Tích hợp gia tăng là sự tương phản với cách tiếp cận big bang. Chương trình được xây dựng và thử nghiệm trong các phân đoạn nhỏ, khi đó các lỗi dễ dàng hơn để cô lập và sửa chữa. Các giao diện có nhiều khả năng được kiểm thử hoàn toàn và phương pháp kiểm thử có hệ thống có thể được áp dụng.

Có hai loại kiểm thử tăng dần:

* Cách tiếp cận từ trên xuống
* Cách tiếp cận từ dưới lên


**Cách tiếp cận từ trên xuống**

Trong kiểu tiếp cận này, cá nhân bắt đầu bằng cách chỉ kiểm thử giao diện người dùng, với chức năng cơ bản được mô phỏng theo sơ khai, sau đó bạn di chuyển xuống dưới tích hợp các lớp thấp hơn và thấp hơn như trong hình bên dưới.

![](https://images.viblo.asia/4c525367-3546-4a10-af61-8114e1f7a293.png)

* Bắt đầu với module điều khiển chính, các mô đun được tích hợp bằng cách di chuyển xuống dưới thông qua hệ thống phân cấp điều khiển
* Các module phụ cho module điều khiển chính được kết hợp vào cấu trúc theo cách đầu tiên theo chiều rộng hoặc theo chiều sâu.
* Tích hợp theo chiều sâu đầu tiên tích hợp tất cả các module trên một đường dẫn điều khiển chính của cấu trúc như được hiển thị trong sơ đồ sau:

![](https://images.viblo.asia/3e7acf70-f0bc-49fa-ae31-1c858679cdc9.png)

Quá trình tích hợp module được thực hiện theo cách sau:

1. Mô-đun điều khiển chính được sử dụng làm trình điều khiển thử nghiệm và các nhánh được thay thế cho tất cả các module trực tiếp phụ thuộc vào module điều khiển chính.
2. Các nhánh cấp dưới được thay thế cùng một lúc bằng các module thực tế tùy thuộc vào cách tiếp cận được chọn (chiều rộng đầu tiên hoặc độ sâu trước).
3. Các thử nghiệm được thực hiện khi mỗi mô-đun được tích hợp.
4. Khi hoàn thành mỗi bộ kiểm thử, một nhánh khác được thay thế bằng một module thực sự khi hoàn thành từng bộ kiểm thử
5. Để đảm bảo rằng các lỗi mới chưa được đề cập trong kiểm thử hồi quy


Quá trình tiếp tục từ bước 2 cho đến khi toàn bộ cấu trúc chương trình được xây dựng. Chiến lược từ trên xuống nghe có vẻ không phức tạp, nhưng trong thực tế, các vấn đề hậu cần phát sinh.

Các vấn đề phổ biến nhất xảy ra khi xử lý ở mức thấp trong hệ thống phân cấp được yêu cầu để kiểm thử đầy đủ các cấp trên.

Các nhánh thay thế các module cấp thấp khi bắt đầu kiểm thử từ trên xuống và do đó, không có dữ liệu quan trọng nào có thể chảy lên trong cấu trúc chương trình.

**Những thách thức mà Tester có thể phải đối mặt:**

* Trì hoãn việc kiểm thử cho đến khi nhánh được thay thế bằng các module thực tế.
* Phát triển các nhánh thực hiện các chức năng giới hạn mô phỏng module thực tế.
* Tích hợp phần mềm từ dưới cùng của hệ thống phân cấp trở lên.


**Lưu ý:** Cách tiếp cận đầu tiên khiến chúng ta mất một số quyền kiểm soát đối với sự tương ứng giữa các thử nghiệm cụ thể và kết hợp các module cụ thể. Điều này có thể dẫn đến khó khăn trong việc xác định nguyên nhân gây ra lỗi có xu hướng vi phạm bản chất bị ràng buộc cao của phương pháp từ trên xuống.

Cách tiếp cận thứ hai là khả thi nhưng có thể dẫn đến chi phí đáng kể, vì các nhánh ngày càng phức tạp.

**Cách tiếp cận từ dưới lên**

Tích hợp từ dưới lên bắt đầu xây dựng và thử nghiệm với các module ở mức thấp nhất trong cấu trúc chương trình. Trong quá trình này, các module được tích hợp từ dưới lên trên.

Trong phương pháp này, việc xử lý cần thiết cho các mô-đun phụ thuộc ở một mức nhất định luôn có sẵn và nhu cầu cho các sơ khai được loại bỏ.

Quá trình kiểm thử tích hợp này được thực hiện theo bốn bước

1. Các module cấp thấp được kết hợp thành các cụm thực hiện chức năng phụ phần mềm cụ thể.
2. Một trình điều khiển được viết để phối hợp với các test case đầu vào và đầu ra.
3. Các cluster hoặc bản build được kiểm thử
4. Trình điều khiển được loại bỏ và các cụm được kết hợp di chuyển lên trên trong cấu trúc chương trình.

Trong thực tế, nếu hai cấp cao nhất của cấu trúc chương trình được tích hợp từ trên xuống, số lượng trình điều khiển có thể giảm đáng kể và việc tích hợp các cluster được đơn giản hóa rất nhiều. Tích hợp theo mô hình minh họa dưới đây. Khi tích hợp di chuyển lên trên, cần phải chia ra các test driver riêng biệt.

![](https://images.viblo.asia/181807e9-c8f0-4762-975c-5881f1b3e9a4.png)

**Lưu ý:** Nếu hai cấp cao nhất của cấu trúc chương trình được tích hợp Từ trên xuống, số lượng trình điều khiển có thể giảm đáng kể và việc tích hợp các bản dựng được đơn giản hóa rất nhiều.

**Cách tiếp cận Big Bang**

Trong phương pháp này, tất cả các module không được tích hợp cho đến khi và trừ khi tất cả các mô-đun đã sẵn sàng. Khi chúng đã sẵn sàng, tất cả các module được tích hợp và sau đó nó được thực thi để biết liệu tất cả các module tích hợp có hoạt động hay không.

Trong phương pháp này, thật khó để biết nguyên nhân gốc rễ của  vì tích hợp mọi thứ cùng một lúc.

Ngoài ra, sẽ có nhiều khả năng xảy ra các lỗi nghiêm trọng trong môi trường product

Cách tiếp cận này chỉ được áp dụng khi kiểm thử tích hợp phải được thực hiện cùng một lúc.

**Tổng kết:**

* Tích hợp được thực hiện để xác minh các tương tác giữa các module của hệ thống phần mềm. Nó giúp phát hiện sớm khiếm khuyết
* Kiểm thử tích hợp có thể được thực hiện đối với tích hợp phần cứng - phần mềm hoặc phần cứng - phần cứng
* Kiểm thử tích hợp được thực hiện bằng hai phương pháp
    1. Cách tiếp cận gia tăng
    2. Cách tiếp cận big bang

* Trong khi thực hiện kiểm thử tích hợp nói chung, chiến lược ETVX (Tiêu chuẩn bắt đầu kiểm thử, Nhiệm vụ, Xác thực và tiêu chuẩn dừng kiểm thử) được sử dụng.

Nguồn : https://www.guru99.com/system-integration-testing.html