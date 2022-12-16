#### Hướng dẫn đầy đủ để kiểm tra cơ sở dữ liệu với các mẹo và ví dụ thực tế:

Các ứng dụng máy tính ngày nay phức tạp hơn với các công nghệ như Android và cũng có rất nhiều ứng dụng Điện thoại thông minh. Mặt trước càng phức tạp, mặt sau càng trở nên phức tạp.

Vì vậy, điều quan trọng hơn hết là tìm hiểu về thử nghiệm DB và có thể xác thực cơ sở dữ liệu một cách hiệu quả để đảm bảo an toàn và cơ sở dữ liệu chất lượng.

#### Trong hướng dẫn này, bạn sẽ tìm hiểu tất cả về Kiểm tra dữ liệu - tại sao, làm thế nào và kiểm tra cái gì.
![](https://images.viblo.asia/30d989b6-0f30-4ee5-b9d3-571374aa923b.jpg)
Cơ sở dữ liệu là một trong những phần không thể tránh khỏi của một ứng dụng phần mềm.

Cơ sở dữ liệu được yêu cầu ở mọi nơi trong phần phụ trợ. Không quan trọng khi nó là web, máy tính để bàn hoặc thiết bị di động, máy chủ-máy khách, ngang hàng, doanh nghiệp hoặc doanh nghiệp cá nhân;

Một cơ sở dữ liệu luôn hoạt động phía sau hiện trường. Tương tự, khi đó là chăm sóc sức khỏe, tài chính, cho thuê, bán lẻ, ứng dụng gửi thư hoặc điều khiển tàu vũ trụ;

Theo cách tương tự, đối với các ứng dụng có tần suất giao dịch cao (ví dụ: ứng dụng ngân hàng hoặc tài chính), Sự cần thiết của Công cụ DB đầy đủ tính năng được kết hợp.

Ngày nay, chúng ta có dữ liệu lớn, lớn và phức tạp mà cơ sở dữ liệu truyền thống không thể xử lý chúng.

Có một số công cụ cơ sở dữ liệu có sẵn trên thị trường, chẳng hạn như MS-Access, MS SQL Server, SQL Server, Oracle, Oracle Financial, MySQL, PostgreQuery, DB2, Toad, Admirer, v.v. Những công cụ này khác nhau về chi phí, độ mạnh, tính năng và bảo mật. Mỗi cái đều có những lợi ích và nhược điểm riêng.

## Tại sao phải kiểm tra cơ sở dữ liệu?
#### Dưới đây, chúng ta sẽ thấy tại sao các khía cạnh sau của DB nên được xác nhận:
### 1) Ánh xạ dữ liệu
Vì vậy, đây là một số khía cạnh cần theo dõi: đối với các hệ thống phần mềm, dữ liệu truyền qua lại từ UI (giao diện người dùng) đến DB phụ trợ và ngược lại. Vì vậy, đây là một số khía cạnh để xem:

* Thông thường thông tin ánh xạ này được xác định trong các tài liệu yêu cầu. Kiểm tra xem các trường trong biểu mẫu UI / frontend có phù hợp với các trường tương ứng trong bảng DB không.
* Bất cứ khi nào một hành động nào đó được thực hiện ở mặt trước của ứng dụng, một hành động CRUD (Tạo, Lấy, Cập nhật và Xóa) tương ứng sẽ được thực hiện ở mặt sau. Người kiểm tra sẽ phải kiểm tra xem hành động đúng có được gọi không và khi được mời hành động trong nó là thành công hay không.

### 2) Xác thực thuộc tính ACID

Tính nguyên tử, tính nhất quán, cách ly và độ bền. Mỗi giao dịch mà DB thực hiện phải tuân thủ bốn thuộc tính này.
![](https://images.viblo.asia/fc2c2c33-7eec-4a89-81ac-c9359d734bc2.jpg)
* **Atomicity** có nghĩa là một giao dịch thất bại hoặc thành công.  Điều này có nghĩa là trường hợp một phần của giao dịch không thành công - có nghĩa là toàn bộ giao dịch đã thất bại. Thông thường, đây được gọi là quy tắc "tất cả hoặc không có gì".
* **Tính nhất quán** : Một giao dịch sẽ luôn dẫn đến trạng thái hợp lệ của DB
* **Cách ly**: Nếu có nhiều giao dịch và chúng được thực hiện cùng một lúc, kết quả / trạng thái của DB sẽ giống như khi chúng được thực hiện lần lượt.
* **Độ bền**: Một khi giao dịch được thực hiện và cam kết, không nên thay đổi các yếu tố bên ngoài như mất điện hoặc sự cố

### 3) Toàn vẹn dữ liệu
Không nên cập nhật giá trị trên một trong các thao tác CRUD, dữ liệu / trạng thái được chia sẻ và gần đây nhất của dữ liệu được chia sẻ sẽ xuất hiện trên màn hình và hiển thị giá trị cũ hơn trên một thao tác khác.

Khi ứng dụng đang được thực thi, người dùng cuối chủ yếu sử dụng các hoạt động 'CRUD' được tạo bởi Công cụ DB.

**C: Tạo** - Khi người dùng 'Lưu' mọi giao dịch mới, thao tác 'Tạo' được thực hiện.

**R: Truy xuất** - Khi người dùng 'Tìm kiếm' hoặc 'Xem' mọi giao dịch đã lưu, thao tác 'Truy xuất' được thực hiện.

**U: Cập nhật** - Khi người dùng 'Chỉnh sửa' hoặc 'Sửa đổi' bản ghi hiện có, hoạt động 'Cập nhật' của DB được thực hiện.

**D: Xóa** - Khi người dùng Xóa bất kỳ bản ghi nào khỏi hệ thống, Xóa hoạt động của DB được thực hiện.

Bất kỳ hoạt động cơ sở dữ liệu nào được thực hiện bởi người dùng cuối luôn là một trong bốn điều trên.

Vì vậy, hãy nghĩ ra các trường hợp kiểm tra DB của bạn theo cách bao gồm kiểm tra dữ liệu ở tất cả các vị trí xuất hiện để xem liệu nó có giống nhau không.

### 4) Tuân thủ quy tắc kinh doanh
Sự phức tạp hơn trong cơ sở dữ liệu có nghĩa là các thành phần phức tạp hơn như các ràng buộc quan hệ, trình kích hoạt, thủ tục được lưu trữ, v.v. Vì vậy, người kiểm tra sẽ phải đưa ra các truy vấn SQL thích hợp để xác thực các đối tượng phức tạp này.


## Kiểm tra cái gì (Danh sách kiểm tra cơ sở dữ liệu)
### 1) Giao dịch
Khi kiểm tra các giao dịch, điều quan trọng là đảm bảo rằng họ hài lòng với các thuộc tính ACID.

Đây là những câu thường được sử dụng:


* BEGIN TRANSACTION TRANSACTION#
* END TRANSACTION TRANSACTION#


Câu lệnh Rollback Đảm bảo rằng cơ sở dữ liệu vẫn ở trạng thái nhất quán.


* ROLLBACK TRANSACTION#

Sau khi các câu lệnh này được thực thi, hãy sử dụng Chọn để đảm bảo các thay đổi đã được phản ánh.

* SELECT * FROM TABLENAME <các bảng liên quan đến các giao dịch>

### 2) Các lược đồ cơ sở dữ liệu

Lược đồ cơ sở dữ liệu không có gì khác hơn là một định nghĩa chính thức về cách dữ liệu sẽ được tổ chức bên trong DB. Để kiểm tra nó:


* Xác định các yêu cầu dựa trên cơ sở dữ liệu hoạt động.
    * Các khóa chính được tạo trước khi bất kỳ trường nào khác được tạo.
    * Khóa ngoại nên được lập chỉ mục hoàn toàn để dễ dàng tìm kiếm và tìm kiếm.
    * Tên trường bắt đầu hoặc kết thúc với các ký tự nhất định.
    * Các trường có một ràng buộc mà các giá trị nhất định có thể hoặc không thể được chèn vào.


* Sử dụng một trong các phương pháp sau theo mức độ liên quan:

    * Truy vấn SQL DESC <tên bảng> để xác thực lược đồ.
    * Biểu thức chính quy để xác thực tên của các trường riêng lẻ và giá trị của chúng
    * Các công cụ như SchemaCrawler


### 3) Kích hoạt
Khi một sự kiện nào đó diễn ra trên một bảng nhất định, một đoạn mã (trình kích hoạt) có thể được tự động hướng dẫn để được thực thi.

Học sinh đang học 2 lớp: toán và khoa học. Học sinh đang thêm vào bảng học sinh của Google. Một bộ kích hoạt có thể thêm học sinh vào các bảng chủ đề tương ứng sau khi được thêm vào học sinh bàn.

Theo dõi kết quả này bằng cách thực hiện toàn bộ trình kích hoạt. So sánh kết quả Phương pháp phổ biến để kiểm tra là thực hiện truy vấn SQL được nhúng trong trình kích hoạt một cách độc lập trước tiên và ghi lại.

Chúng được thử nghiệm trong cả hai giai đoạn thử nghiệm hộp đen và hộp trắng.

* **Kiểm tra hộp trắng**: Sơ khai và trình điều khiển được sử dụng để cập nhật hoặc xóa dữ liệu dẫn đến việc kích hoạt được gọi. Ý tưởng cơ bản là chỉ kiểm tra DB một mình ngay cả trước khi tích hợp với giao diện người dùng (UI).
* **Kiểm tra hộp đen**:

   a) Chúng ta có thể chèn / xóa / cập nhật dữ liệu từ giao diện người dùng theo cách mà trình kích hoạt được gọi. Theo đó, Chọn câu lệnh có thể được sử dụng để truy xuất dữ liệu từ xem kích hoạt đã thành công trong việc thực hiện các hoạt động dự định.

  b) Cách thứ hai để kiểm tra điều này là tải trực tiếp dữ liệu sẽ gọi trình kích hoạt và xem liệu nó có hoạt động như dự định không.

### 4) Thủ tục lưu trữ
Các thủ tục được lưu trữ ít nhiều giống với các hàm do người dùng định nghĩa. Chúng có thể được gọi bằng các câu lệnh thủ tục cuộc gọi / Thực thi và đầu ra thường ở dạng tập kết quả.

Chúng được lưu trữ trong RDBMS và có sẵn cho các ứng dụng.

Chúng cũng được thử nghiệm trong:

* **Kiểm tra hộp trắng**: Sơ khai được sử dụng để gọi các thủ tục được lưu trữ và sau đó kết quả được xác thực theo các giá trị dự kiến.
* **Kiểm tra hộp đen**: Thực hiện một thao tác từ giao diện người dùng (UI) của ứng dụng và kiểm tra việc thực hiện thủ tục được lưu trữ và kết quả của nó.


### 5) Hạn chế trường
Giá trị mặc định, giá trị duy nhất và khóa ngoại:
* Thực hiện một hoạt động front-end thực hiện điều kiện đối tượng cơ sở dữ liệu
* Xác thực kết quả bằng Truy vấn SQL.


Bạn có thể thực hiện thủ công hoặc bạn có thể sử dụng các công cụ như QTP. Theo cách thủ công, bạn có thể thực hiện một hành động sẽ được thêm giá trị khác với giá trị mặc định của Kiểm tra giá trị mặc định cho một trường nhất định khá đơn giản. Trường từ giao diện người dùng và xem nếu nó dẫn đến một lỗi.

## Hoạt động kiểm tra dữ liệu
### Kiểm thử cơ sở dữ liệu nên tập trung vào các hoạt động kiểm tra sau:

### 1) Đảm bảo ánh xạ dữ liệu:

Ánh xạ dữ liệu là một trong những khía cạnh quan trọng trong cơ sở dữ liệu và nó cần được kiểm tra nhiều bởi mọi người kiểm thử phần mềm.

Đảm bảo rằng ánh xạ giữa các hình thức hoặc màn hình khác nhau của AUT và DB của nó không chỉ chính xác mà còn trên mỗi tài liệu thiết kế (SRS / BRS) hoặc mã. Về cơ bản, bạn cần xác thực ánh xạ giữa mọi trường phía trước với phản hồi của nó lĩnh vực cơ sở dữ liệu phụ trợ.

Đối với tất cả các hoạt động CRUD, hãy xác minh rằng các bảng và bản ghi có liên quan được cập nhật khi người dùng nhấp vào 'Lưu', 'Cập nhật', 'Tìm kiếm' hoặc 'Xóa' khỏi GUI của ứng dụng.

**Những gì bạn cần xác minh:**

* Ánh xạ bảng, ánh xạ cột và ánh xạ kiểu dữ liệu.
* Tra cứu ánh xạ dữ liệu.
* Hoạt động CRUD chính xác được gọi cho mọi hành động của người dùng tại UI.
* Hoạt động CRUD thành công.
### 2) Đảm bảo các thuộc tính ACID của giao dịch:

Các thuộc tính ACID của các giao dịch DB đề cập đến 'Tính nguyên tử', 'Tính nhất quán', 'Cách ly' và 'Độ bền'. Phải kiểm tra đúng bốn thuộc tính này trong hoạt động kiểm tra cơ sở dữ liệu. Bạn cần xác minh rằng mọi giao dịch đều thỏa mãn ACID thuộc tính của cơ sở dữ liệu.
![](https://images.viblo.asia/91f20880-de86-4b18-9e93-efd287a949ca.jpg)
Chúng ta hãy lấy một ví dụ đơn giản thông qua mã SQL bên dưới:

CREATE TABLE acidtest (A INTEGER, B INTEGER, CHECK (A + B = 100));

Bảng kiểm tra axit sẽ có hai cột - A & B. Có một ràng buộc toàn vẹn rằng tổng các giá trị trong A và B phải luôn là 100.

**Kiểm tra nguyên tử** sẽ đảm bảo mọi giao dịch được thực hiện trên bảng này là tất cả hoặc không
ví dụ: không có hồ sơ nào được cập nhật nếu bất kỳ bước nào của giao dịch không thành công.

**Kiểm tra tính nhất quán** sẽ đảm bảo rằng bất cứ khi nào giá trị trong cột A hoặc B được cập nhật, tổng luôn luôn là 100.
Nó sẽ không cho phép chèn / xóa / cập nhật trong A hoặc B nếu tổng số tiền là hơn 100.

**Kiểm tra cách ly** sẽ đảm bảo rằng nếu hai giao dịch xảy ra cùng một lúc và cố gắng sửa đổi dữ liệu của bảng kiểm tra axit, thì các giao dịch này được thực hiện một cách cô lập.

**Kiểm tra độ bền** sẽ đảm bảo rằng một khi giao dịch trên bảng này được thực hiện, nó sẽ vẫn như vậy, ngay cả trong trường hợp mất điện, sự cố hoặc lỗi.

Khu vực này đòi hỏi kiểm tra nghiêm ngặt, kỹ lưỡng và nhạy bén hơn nếu ứng dụng của bạn đang sử dụng cơ sở dữ liệu phân tán.

### 3) Đảm bảo tính toàn vẹn dữ liệu

Xem xét rằng các mô-đun khác nhau (i. E. Màn hình hoặc biểu mẫu) của ứng dụng sử dụng cùng một dữ liệu theo các cách khác nhau và thực hiện tất cả các thao tác CRUD trên dữ liệu.

Trong trường hợp đó, đảm bảo rằng trạng thái dữ liệu mới nhất được phản ánh ở mọi nơi. Hệ thống phải hiển thị các giá trị được cập nhật và gần đây nhất hoặc trạng thái của dữ liệu được chia sẻ đó trên tất cả các biểu mẫu và màn hình. Điều này được gọi là tính toàn vẹn dữ liệu.
![](https://images.viblo.asia/85734dc7-1247-44b3-a44b-0e06463cab39.jpg)
**Các trường hợp kiểm tra để xác nhận tính toàn vẹn dữ liệu của cơ sở dữ liệu:**

* Kiểm tra nếu tất cả các kích hoạt được đặt ra để cập nhật các bản ghi bảng tham chiếu.
* Kiểm tra nếu có bất kỳ dữ liệu không chính xác / không hợp lệ trong các cột chính của mỗi bảng.
* Cố gắng chèn dữ liệu sai vào bảng và quan sát nếu có lỗi xảy ra.
* Kiểm tra xem điều gì xảy ra nếu bạn cố gắng chèn một đứa trẻ trước khi chèn cha mẹ của nó (cố gắng chơi với các khóa chính và khóa ngoài).
* Kiểm tra nếu có lỗi xảy ra nếu bạn xóa một bản ghi vẫn được tham chiếu bởi dữ liệu trong bất kỳ bảng nào khác.
* Kiểm tra nếu các máy chủ và cơ sở dữ liệu được nhân rộng.
### 4) Đảm bảo tính chính xác của các quy tắc kinh doanh được thực hiện:

Trên thực tế, các cơ sở dữ liệu đã được phát triển thành các công cụ cực kỳ mạnh mẽ, cung cấp sự hỗ trợ rộng rãi để thực hiện logic nghiệp vụ ở cấp độ DB.

Một số ví dụ đơn giản về các tính năng mạnh mẽ là 'Tính toàn vẹn tham chiếu', các ràng buộc quan hệ, trình kích hoạt và quy trình được lưu trữ.

Người kiểm tra phải đảm bảo rằng logic nghiệp vụ được triển khai là chính xác và hoạt động chính xác. Vì vậy, bằng cách sử dụng các tính năng này và nhiều tính năng khác được cung cấp bởi DB, các nhà phát triển triển khai logic nghiệp vụ ở cấp DB.

***Các điểm trên mô tả bốn điều quan trọng nhất 'Thử nghiệm' của DB. Bây giờ, hãy chuyển sang phần 'Cách thực hiện'.***

## Cách kiểm tra cơ sở dữ liệu (Quy trình từng bước)
Cơ sở dữ liệu thử nghiệm quy trình thử nghiệm chung không khác lắm so với bất kỳ ứng dụng nào khác.

Sau đây là các bước cốt lõi:

**Bước # 1)** Chuẩn bị môi trường

**Bước # 2)** Chạy thử nghiệm

**Bước # 3)** Kiểm tra kết quả kiểm tra

**Bước # 4)** Xác thực theo kết quả dự kiến

**Bước # 5)** Báo cáo kết quả cho các bên liên quan trong tương lai

Thông thường, các truy vấn SQL được sử dụng để phát triển các bài kiểm tra.
 Lệnh được sử dụng phổ biến nhất là "Select".

Select * from <tablename> where <condition>

Ngoài Chọn, SQL có 3 loại lệnh quan trọng:

1. DDL: Ngôn ngữ định nghĩa dữ liệu
2. DML: Ngôn ngữ thao tác dữ liệu
3. DCL: Ngôn ngữ kiểm soát dữ liệu
    
Hãy cho chúng tôi xem cú pháp cho các câu lệnh được sử dụng phổ biến nhất.
    
**Ngôn ngữ định nghĩa dữ liệu** Sử dụng CREATE, ALTER, RENAME, DROP và TRUNCATE để xử lý các bảng (và chỉ mục).

**Ngôn ngữ thao tác dữ liệu** Bao gồm các câu lệnh để thêm, cập nhật và xóa các bản ghi.

**Ngôn ngữ kiểm soát dữ liệu**:  Thỏa thuận với việc ủy ​​quyền cho người dùng để thao tác và truy cập dữ liệu.  Grant và Revoke là hai tuyên bố được sử dụng.
    
**Grant syntax**: 
Grant select/update
On <table name>
To <user id1, user id2…useridn>;

**Revoke syntax**:
Revokeselect/update
on <table name>
from<user id1, user id2…useridn>;
    
## Một số lời khuyên thiết thực
### 1. Tự viết truy vấn:

Người kiểm thử cần có kiến ​​thức rất tốt về các câu lệnh SQL và Ngôn ngữ thao tác dữ liệu (DML). Người kiểm thử cũng nên biết cấu trúc DB bên trong của AUT.

Bạn có thể kết hợp GUI và xác minh dữ liệu trong các bảng phối cảnh để có độ bao phủ tốt hơn. Nếu bạn đang sử dụng máy chủ SQL thì bạn có thể sử dụng Trình phân tích truy vấn SQL để viết các truy vấn, thực hiện và truy xuất kết quả.

Đây là cách tốt nhất và mạnh mẽ để kiểm tra cơ sở dữ liệu khi ứng dụng có mức độ phức tạp nhỏ hoặc trung bình.

Nếu ứng dụng rất phức tạp thì người kiểm tra có thể khó hoặc không thể viết tất cả các truy vấn SQL cần thiết.Đối với các truy vấn phức tạp, bạn có sự giúp đỡ từ nhà phát triển. Tôi luôn đề xuất phương pháp này vì nó giúp bạn tự tin khi thử nghiệm và cũng tăng cường các kỹ năng SQL của bạn.

### 2. Quan sát dữ liệu trong mỗi bảng:

Bạn có thể thực hiện xác minh dữ liệu bằng các kết quả của hoạt động CRUD. Điều này có thể được thực hiện thủ công bằng cách sử dụng UI ứng dụng khi bạn biết tích hợp cơ sở dữ liệu. Nhưng đây có thể là một nhiệm vụ tẻ nhạt và cồng kềnh khi có dữ liệu khổng lồ trong các bảng cơ sở dữ liệu khác nhau.

Để kiểm tra dữ liệu thủ công, người kiểm tra cơ sở dữ liệu phải có kiến ​​thức tốt về cấu trúc bảng cơ sở dữ liệu.

### 3. Nhận truy vấn từ các Developer:

Đây là cách đơn giản nhất để kiểm tra cơ sở dữ liệu. Thực hiện bất kỳ hoạt động CRUD nào từ GUI và xác minh tác động của nó bằng cách thực hiện các truy vấn SQL phối cảnh thu được developer. Nó không đòi hỏi kiến ​​thức tốt về SQL và cũng không đòi hỏi kiến ​​thức tốt về cấu trúc DB của ứng dụng.

Nhưng phương pháp này cần được sử dụng thận trọng. Điều gì xảy ra nếu truy vấn được cung cấp bởi nhà phát triển sai về mặt ngữ nghĩa hoặc không đáp ứng chính xác yêu cầu của người dùng? Quá trình đơn giản sẽ không xác nhận dữ liệu.

### 4. Sử dụng các công cụ kiểm tra tự động hóa cơ sở dữ liệu:

Có một số công cụ có sẵn cho quá trình thử nghiệm dữ liệu. Bạn nên chọn công cụ chính xác theo nhu cầu của bạn và sử dụng nó tốt nhất.
    
**Nguồn**: https://www.softwaretestinghelp.com/database-testing-process/