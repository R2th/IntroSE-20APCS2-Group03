### Kiểm thử tích hợp hệ thống là gì ?

Kiểm thử tích hợp hệ thống được định nghĩa là một loại thử nghiệm được thực hiện trong môi trường đã tích hợp phần cứng và phần mềm để xác minh hành vi của hệ thống hoàn chỉnh. Đây là một thử nghiệm được tiến hành trên một hệ thống tích hợp hoàn chỉnh để đánh giá sự tuân thủ của hệ thống với yêu cầu cụ thể của nó.
Kiểm thử tích hợp hệ thống (SIT) được thực hiện để xác minh tương tác giữa các mô-đun của hệ thống phần mềm. Nó đề cập đến việc xác minh các yêu cầu phần mềm cấp cao và cấp thấp được quy định trong Đặc tả các yêu cầu Phần mềm và Tài liệu Thiết kế Phần mềm.
Nó cũng xác minh sự đồng tồn tại của một hệ thống phần mềm với những phần mềm khác và kiểm tra giao diện giữa các mô-đun của ứng dụng phần mềm. Trong loại thử nghiệm này, các mô-đun được thử nghiệm riêng lẻ lần đầu và sau đó được kết hợp để tạo ra một hệ thống.
Ở đây, các thành phần phần mềm và phần cứng được kết hợp và thử nghiệm dần dần cho đến khi toàn bộ hệ thống được tích hợp.

![](https://images.viblo.asia/407b787e-bdf2-43e2-82a7-0b97f3318139.png)

### Tại sao cần Kiểm thử tích hợp hệ thống ?

Kiểm thử tích hợp hệ thống được thực hiện bởi vì :

* Nó giúp phát hiện lỗi sớm
* Những phải hồi sớm trên các tính chất có thể thừa nhận của mô đun riêng lẻ sẽ luôn có sẵn
* Linh hoạt trong việc lên kế hoạch sửa lỗi khiếm khuyết và có thể đan xen với sự phát triển
* Lưu lượng dữ liệu chính xác
* Luồng điều khiển chính xác
* Thời gian chính xác
* Sử dụng bộ nhớ đúng
* Đúng với yêu cầu phần mềm

### Phương pháp tiếp cận Kiểm thử tích hợp hệ thống

Đây là một kỹ thuật có tính hệ thống để xây dựng cấu trúc chương trình trong khi tiến hành kiểm tra để phát hiện lỗi liên quan đến giao tiếp.

Tất cả các mô-đun được tích hợp trước và chương trình được kiểm tra toàn bộ. Trong quá trình này, có thể gặp phải một tập các lỗi.

Sẽ  là khó khăn để sửa chữa các lỗi như vậy bởi vì rất phức tạp để cô lập các nguyên nhân gây lỗi bởi sự mở rộng rộng lớn của toàn bộ chương trình. Khi các lỗi này được sửa chữa, có thể một lỗi mới sẽ xuất hiện, và quá trình tiếp tục liên tục trong một vòng lặp vô tận. Để tránh tình trạng này, một cách tiếp cận khác được sử dụng gọi là Tích hợp gia tăng.
Có một số phương pháp gia tăng như các bài kiểm tra tích hợp được thực hiện trên một hệ thống dựa trên bộ xử lý đích. Phương pháp được sử dụng là Kiểm thử hộp đen. Việc tích hợp từ dưới lên hoặc từ trên xuống có thể được sử dụng.
Các trường hợp kiểm thử được xác định chỉ sử dụng các yêu cầu phần mềm cấp cao.
Tích hợp phần mềm cũng có thể đạt được chủ yếu trong môi trường máy chủ, với các đơn vị cụ thể cho môi trường đích tiếp tục được mô phỏng trong máy chủ. Các kiểm tra lặp lại trong môi trường đích để xác nhận lại là cần thiết.
Kiểm tra xác nhận ở cấp độ này sẽ xác định các vấn đề môi trường cụ thể, chẳng hạn như lỗi trong phân bổ bộ nhớ. Tính thực tiễn của việc tiến hành tích hợp phần mềm trong môi trường máy chủ sẽ phụ thuộc vào chức năng mục tiêu cụ thể. Đối với một số hệ thống nhúng, việc ghép nối với môi trường đích sẽ rất chắc chắn, khiến cho việc tích hợp phần mềm trong môi trường máy chủ không thực tế.

Các phát triển phần mềm lớn sẽ phân chia sự tích hợp phần mềm thành một số cấp. Việc tích hợp phần mềm ở mức thấp có thể dựa chủ yếu vào môi trường máy chủ, với các mức tích hợp phần mềm cao hơn ngày càng phụ thuộc vào môi trường đích.

Lưu ý: Nếu phần mềm chỉ đang được kiểm tra thì nó được gọi là Kiểm thử tích hợp phần mềm - phần mềm (SSIT) và nếu cả phần cứng và phần mềm đang được thử nghiệm thì nó được gọi là Kiểm thử tích hợp phần mềm - phần cứng (HSIT).

### Tiêu chí ETVX cho Kiểm thử tích hợp

Thông thường trong khi thực hiện Kiểm thử Tích hợp, chiến lược ETVX (Entry Criteria, Task, Validation, Exit Criteria - Tiêu chí Nhập, Nhiệm vụ, Xác nhận, Thoát) được sử dụng.

**Tiêu chí Nhập (Entry Criteria):**
* Hoàn thành Kiểm thử đơn vị (Unit Testing)

**Đầu vào:**
* Software Requirements Data (Dữ liệu các yêu cầu)
* Software Design Document (Tài liệu thiết kế)
* Software Verification Plan (Kế hoạch xác minh)
* Software Integration Documents (Tài liệu tích hợp)

**Hoạt động:**
* Căn cứ vào các yêu cầu cấp cao và cấp thấp tạo ra các trường hợp kiểm thử và thủ tục kiểm tra
* Kết hợp các mô-đun cấp thấp, xây dựng để triển khai một chức năng phổ biến
* Phát triển một bản khai thác thử nghiệm
* Kiểm thử bản dựng
* Khi kiểm thử được thông qua, bản dựng được kết hợp với các bản dựng khác và thử nghiệm cho đến khi hệ thống được tích hợp thành một thể thống nhất.
* Thực hiện lại tất cả các thử nghiệm trên nền tảng bộ xử lý đích và thu kết quả

**Exit Criteria:**
* Hoàn tất thành công việc tích hợp mô-đun phần mềm vào phần cứng đích
* Hiệu suất của phần mềm chính xác theo các yêu cầu quy định

**Đầu ra:**
* Báo cáo Kiểm thử tích hợp
* Các trường hợp và thủ tục kiểm thử phần mềm

### Kiểm thử tích hợp Phần cứng với Phần mềm

Nó là thử nghiệm của các thành phần phần mềm máy tính (CSC) hoạt động trong môi trường máy tính đích và trên các chức năng cấp cao. Nó tập trung vào hành vi của phần mềm tích hợp được phát triển trên môi trường đích.

**Yêu cầu dựa trên Kiểm thử tích hợp Phần cứng-Phần mềm**

Mục đích của yêu cầu dựa trên Kiểm thử tích hợp Phần cứng-Phần mềm là để đảm bảo rằng phần mềm trong máy tính đích sẽ đáp ứng các yêu cầu cấp cao. Các lỗi điển hình được khám phá bởi phương pháp thử nghiệm này bao gồm:
* Lỗi giao diện phần cứng / phần mềm
* Vi phạm phân vùng phần mềm
* Các lỗi không thể phát hiện ở thử nghiệm bản dựng
* Phản hồi không đúng với lỗi phần cứng
* Lỗi do trình tự, tải đầu vào và công suất đầu vào
* Phản hồi lặp lại hành vi không chính xác
* Kiểm soát không chính xác hoặc không đúng cách phần cứng quản lý bộ nhớ
* Vấn đề tranh chấp bus dữ liệu
* Vận hành sai cơ chế để xác minh tính tương thích và tính chính xác của các trường (field) có thể tải của phần mềm

Tích hợp Phần cứng-Phần mềm liên quan đến việc xác nhận các yêu cầu cấp cao.Tất cả các thử nghiệm ở cấp độ này được thực hiện trên phần cứng đích.
* Kiểm thử hộp đen là phương pháp thử nghiệm chính được sử dụng ở cấp độ thử nghiệm này.
* Xác định các trường hợp kiểm thử chỉ tính từ các yêu cầu cấp cao
* Kiểm thử phải được thực hiện trên phần cứng tiêu chuẩn của sản phẩm (đích)

**Những điều cần xem xét khi thiết kế các trường hợp thử nghiệm để tích hợp Phần cứng - Phần mềm**

* Đảm bảo tất cả dữ liệu thu được về phần mềm là chính xác
* Mở rộng quy mô và phạm vi dữ liệu như mong đợi từ phần cứng đến phần mềm
* Đầu ra chính xác của dữ liệu từ phần mềm đến phần cứng
* Dữ liệu trong thông số kỹ thuật (phạm vi bình thường)
* Dữ liệu bên ngoài thông số kỹ thuật (phạm vi bất thường)
* Dữ liệu biên
* Ngắt xử lý
* Thời gian (timing)
* Sử dụng bộ nhớ đúng (địa chỉ, chồng chéo, v.v.)
* Chuyển tiếp trạng thái

**Lưu ý**: Để kiểm tra ngắt, tất cả các ngắt sẽ được xác minh độc lập với yêu cầu ban đầu thông qua dịch vụ đầy đủ và hoàn chỉnh. Các trường hợp kiểm thử sẽ được thiết kế theo từng trường hợp cụ thể để kiểm tra đầy đủ các ngắt.

### Kiểm thử tích hợp Phần mềm với Phần mềm

Đây là thử nghiệm của thành phần phần mềm máy tính hoạt động trong máy chủ / máy đích

Môi trường mô phỏng toàn bộ hệ thống (các thành phần phần mềm máy tính khác nhau), và trên các chức năng cấp cao.

Nó tập trung vào hành vi của các thành phần phần mềm máy tính trong môi trường máy chủ / đích được mô phỏng. Phương pháp tiếp cận được sử dụng để Tích hợp phần mềm có thể là một phương pháp gia tăng (Incremental Approach) (từ trên xuống, phương pháp tiếp cận từ dưới lên hoặc kết hợp cả hai).

### Incremental Approach (Phương pháp gia tăng)

Kiểm thử gia tăng là một cách kiểm thử tích hợp. Trong loại phương pháp thử nghiệm này, trước tiên bạn kiểm tra từng mô-đun của phần mềm riêng lẻ và sau đó tiếp tục thử nghiệm bằng cách nối thêm các mô-đun khác vào mô-đun đó, sau đó là tiếp tục các mô-đun khác nữa ...
Tích hợp gia tăng là sự tương phản của phương pháp tiếp cận big bang. Chương trình được xây dựng và thử nghiệm trong các phân đoạn nhỏ, ở đó các lỗi dễ cô lập và hiệu chỉnh hơn. Các giao diện có nhiều khả năng được kiểm tra hoàn chỉnh hơn và có thể áp dụng phương pháp thử nghiệm có tính hệ thống.

Có hai loại thử nghiệm gia tăng
* Top-Down (Phương pháp tiếp cận từ trên xuống)
* Bottom-Up (Phương pháp tiếp cận từ dưới lên)

**Phương pháp tiếp cận từ trên xuống**

Trong kiểu tiếp cận này, bắt đầu riêng lẻ bằng cách chỉ thử nghiệm giao diện người dùng, với chức năng cơ bản được mô phỏng bằng các nhánh, sau đó bạn di chuyển xuống dưới tích hợp các lớp thấp hơn và thấp hơn như trong hình dưới đây.

![](https://images.viblo.asia/5c051b82-407d-42ce-bf6e-c7a5993227c2.png)

* Bắt đầu với mô-đun điều khiển chính, các mô-đun được tích hợp bằng cách di chuyển xuống thông qua hệ thống phân cấp điều khiển
* Các mô-đun phụ cho mô-đun điều khiển chính được tích hợp vào cấu trúc theo chiều rộng (breadth-first) hoặc theo chiều sâu (depth-first).
* Hình dưới đây sẽ cho bạn cái nhìn cụ thể hơn về tích hợp theo chiều rộng (breadth-first) và theo chiều sâu (depth-first)

![](https://images.viblo.asia/673941b8-5735-4526-9ce3-37ae9a4aac19.png)

Quá trình tích hợp mô-đun được thực hiện theo cách sau:

1. Mô-đun điều khiển chính được sử dụng như một trình điều khiển thử nghiệm, và các cuống được thay thế cho tất cả các mô-đun trực tiếp cấp dưới cho mô-đun điều khiển chính.
2. Các stub cấp dưới được thay thế với các mô-đun thực tế tùy thuộc vào cách tiếp cận được lựa chọn (chiều rộng đầu tiên hoặc chiều sâu đầu tiên).
3. Các thử nghiệm được thực hiện khi mỗi mô-đun được tích hợp.
4. Khi hoàn thành mỗi tập kiểm thử, stub khác được thay thế bằng mô-đun thực khi hoàn thành mỗi tập kiểm thử
5. Để đảm bảo rằng không có hoặc phát hiện các lỗi mới nên thực hiện Kiểm thử hồi quy

Quá trình tiếp tục từ bước 2 cho đến khi toàn bộ cấu trúc chương trình được xây dựng. Chiến lược Top-Down có vẻ như không phức tạp cho lắm, nhưng trên thực tế, các vấn đề về tính logic lại phát sinh ra. Vấn đề phổ biến nhất là khi cần xử lý ở mức thấp trong hệ thống phân cấp thì bắt buộc phải kiểm tra đầy đủ các cấp trên nó.

**Thách thức Tester có thể phải đối mặt:**
* Dừng nhiều kiểm tra cho đến khi các nhánh được thay thế bằng các mô-đun thực tế.
* Phát triển các nhánh thực hiện các hàm giới hạn mô phỏng mô đun thực tế.
* Tích hợp phần mềm từ dưới cùng của hệ thống phân cấp trở lên.

**Lưu ý :** 
* Depth-First khiến chúng ta mất kiểm soát đối với sự đối xứng giữa các thử nghiệm cụ thể và sự kết hợp các mô-đun cụ thể. Điều này có thể dẫn đến khó xác định nguyên nhân của các lỗi, có xu hướng vi phạm bản chất bị hạn chế cao của phương pháp tiếp cận từ trên xuống.
* Breadth-First là hoàn toàn khả thi nhưng có thể dẫn đến chi phí đáng kể, vì việc khai thác trở nên ngày càng phức tạp.

**Phương pháp tiếp cận từ dưới lên**

Tích hợp từ dưới lên bắt đầu xây dựng và thử nghiệm với các mô-đun ở mức thấp nhất trong cấu trúc chương trình. Trong quá trình này, các mô-đun được tích hợp từ dưới lên trên.

Trong cách tiếp cận này, việc xử lý yêu cầu cho các mô đun phụ thuộc vào một cấp độ nhất định luôn sẵn có và nhu cầu cho các nhánh được loại bỏ.

Quá trình kiểm tra tích hợp này được thực hiện theo một loạt bốn bước:
* Các mô-đun mức thấp được kết hợp thành các cụm thực hiện chức năng phụ cụ thể của phần mềm.
* Trình điều khiển được viết để kết hợp các trường hợp thử nghiệm input và output.
* Kiểm thử bản dựng
* Trình điều khiển được loại bỏ, và các cụm được kết hợp di chuyển lên trên trong cấu trúc chương trình.

Trong thực tế, nếu hai cấp cao nhất của cấu trúc chương trình được tích hợp từ trên xuống, số lượng trình điều khiển có thể được giảm đáng kể và việc tích hợp các cụm được đơn giản hóa rất nhiều (ảnh bên dưới). Tích hợp từ dưới lên là cần thiết để giảm bớt trình điều khiển thử nghiệm riêng biệt.

![](https://images.viblo.asia/efdbb050-be29-4dfe-9ba0-ddd8f785f38e.png)

### Phương pháp tiếp cận Big Bang

Trong phương pháp này, tất cả các mô-đun không được tích hợp cho đến khi tất cả các mô-đun đã sẵn sàng. Một khi chúng đã sẵn sàng, tất cả các mô-đun được tích hợp và sau đó nó được thực hiện để biết liệu tất cả các mô-đun tích hợp có đang hoạt động hay không.

Trong phương pháp này, rất khó để biết nguyên nhân gốc rễ của lỗi vì tích hợp mọi thứ cùng một lúc.

Ngoài ra, sẽ có nguy cơ xuất hiện các lỗi nghiêm trọng trong môi trường production.

Cách tiếp cận này chỉ được áp dụng khi kiểm thử tích hợp phải được thực hiện cùng một lúc.

### Tổng kết

* Tích hợp được thực hiện để xác minh tương tác giữa các mô-đun của một hệ thống phần mềm. Nó giúp phát hiện sớm khuyết tật
* Kiểm thử tích hợp có thể được thực hiện cho tích hợp Phần cứng-Phần mềm hoặc tích hợp Phần mềm-Phần mềm
* Kiểm thử tích hợp được thực hiện bằng hai phương pháp
    * Cách tiếp cận gia tăng
    * Cách tiếp cận Big Bang
* Trong khi thực hiện Kiểm thử tích hợp thường sử dụng chiến lược ETVX (Tiêu chí nhập, Nhiệm vụ, Xác thực và Tiêu chí thoát).

Bài dịch từ : https://www.guru99.com/system-integration-testing.html

Cảm ơn các bạn đã theo dõi (yeah)