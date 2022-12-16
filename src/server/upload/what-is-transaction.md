Hey, chào mọi người, hôm nay bất ngờ mình nhận dc một câu hỏi của 1 anh cùng team "chú có biết transaction là gì không?". Một câu hỏi tưởng như là không khó nhưng đã làm khó mình :v vì ở trường mình cũng chưa từng nghe qua khái niệm về transaction. Và cũng chính câu hỏi đó đã khiến mình dành thời gian tìm hiểu về nó :D.
## Transaction là gì?
Transaction là một tiến trình xử lý có các định điểm đầu và điểm cuối, được chia nhỏ thành các operation, tiến trình được thực thi một cách tuần tự và đọc lập các operation đó theo nguyên tắc tất cả đều thành công hoặc một operation thất bại thì toàn bộ tiến trình sẽ thất bại. Nếu việc thực thi một operation nào đó bị lỗi đồng nghĩa với việc dữ liệu phải trở lại trạng thái ban đầu.

Nghe có vẻ khó hiểu quá nhỉ :P lấy một vài ví dụ để chúng ta dễ hình dung nha:

**Ví dụ 1:** Một ví dụ đơn giản nhất là việc thực hiện cài đặt phần mềm hoặc gỡ bỏ phần mềm. Ví dụ này có thể được coi là một transaction vì việc cài đặt hay gỡ bỏ sẽ được chia thành các bước, thực hiện một cách tuần tự từ bước đầu đến bước cuối, nếu toàn bộ các bước thực thi thành công đồng nghĩa với việc cài đặt hay gỡ bỏ thành công và ngược lại, nếu một bước nào đó thất bại thì tiến trình cài đặt hoặc gỡ bỏ này sẽ rollback trở lại và không có bất kỳ thay đổi nào trên máy tính.

**Ví dụ 2:** Đây là một ví dụ rất rõ về transaction, ví dụ này chính là việc thực hiện giao dịch chuyển khoản. Tài khoản A chuyển tiền cho tài khoản B thì chúng ta phải thực hiện ít nhất 2 thao tác là trừ tiền ở tài khoản A và cộng tiền vào tài khoản B. Nếu 1 trong 2 thao tác bị thất bại thì việc chuyển khoản sẽ bị thất bại và dữ liệu sẽ được trả lại như lúc ban đầu.

Vậy để xác định đâu là một transaction thì làm thế nào? Để làm được điều đó chúng ta cần chú ý đến những yếu tố sau:

1. Trong tiến trình xử lý cần xác định điểm đầu và điểm cuối, tức là khi nào tiến trình bắt đầu và khi nào tiến trình được coi là kết thúc.
2. Tiến trình phải được chia nhỏ thành các operation
3. Thực thi một cách tuần tự các operations
4. Tất cả các operation đều thực thi thành công thì tiến trình mới được coi là thành công. Nếu chỉ một operation thực thi thất bại thì coi như toàn bộ transaction là thất bại.
5. Nếu transaction thất bại thì toàn bộ dữ liệu phải trở lại trạng thái ban đầu

## Các kiểu của transaction
Transaction có các kiểu khác nhau chúng được phân biện bằng việc chia các operations như thế nào. Có 2 kiểu transaction:
1. Flat Transaction: Việc chia các operation là ngang hàng nhau. Thực thi các operation là tuần tự từ trái sang phải hoặc từ trên xuống dưới.
2. Nested Transaction: Các operation lồng nhau, việc thực thi các operation dựa theo nguyên tắc từ trong ra ngoài. Như vậy khi nhìn vào hình vẽ chúng ta thấy các operation ở dạng này có vẻ phụ thuộc vào nhau nhưng khi thực thi thì là độc lập theo nguyên tắc operation trong thực thi xong thì mới đến operation ngoài.

## Các thuộc tính của Transaction
* **Atomicity:** Một transaction xác định ranh giới của nó rất rõ ràng, tức xác định điểm bắt đầu và kết thúc của tiến trình. Như vậy có thể coi nó như một đơn vị thực thi và đơn vị thực thi này thực hiện theo nguyên tắc “all or nothing”. Nghĩa là nếu một thành phần nào đó trong transaction thực thi lỗi thì đồng nghĩa với việc không có gì xảy ra tức không có gì thay đổi về mặt dữ liệu.
* **Consistency:** Dữ liệu nhất quán với transaction ở thời điểm bắt đầu và kết thúc hay bảo đảm rằng Database thay đổi một cách chính xác trạng thái theo một transaction đã được commit thành công.
* **Isolation:** Các transaction có khả năng hoạt động một cách độc lập và không liên quan đến nhau.
* **Durability:** Dữ liệu của transaction sau khi thực thi xong được cố định, chính thức và bền vững. Nghĩa là những thay đổi đã được cố định, không có chuyện có thể chuyển lại trạng thái dữ liệu lúc trước khi thực hiện transaction.

## Tìm hiểu về các Isolation Levels trong Transaction
Như đã đề cập ở trên Isolation là các transaction có khả năng hoạt động một cách độc lập và không liên quan đến nhau. Các Isolation Levels được xác định thông qua các hiện tượng sau:
* **Dirty Reads** điều này xảy ra khi một transaction tiến hành đọc dữ liệu mà chưa được commited. Ví dụ: transaction A cập nhập 1 dữ liệu, transaction B đọc dữ liệu sau khi A cập nhật xong. Nhưng vì lý do nào đó A không commit thành công, dự liệu quay trở lại trạng thái ban đầu, khi đó dữ liệu của B trở thành Dirty.
* **Nonrepeatable reads** xảy ra khi một transaction đọc cùng 1 dữ liệu 2 lần nhưng lại nhận được giá trị khác nhau. Ví dụ: transaction A đọc 1 dữ liệu, transaction B cập nhật xóa dữ liệu đó. Nếu A đọc lại dữ liệu đó nó sẽ lấy các giá trị là khác nhau.
* **Phantom reads** là rủi ro xảy ra với lệnh read có điều kiện. Ví dụ: giả sử transaction A đọc một tập hợp các dữ liệu đáp ứng một số điều kiện tìm kiếm, transaction B tạo ra một dữ liệu mới khớp với điều kiện được tìm kiếm cho transaction A. Nếu A thực hiện lại với điều kiện như vậy thì nó sẽ nhận dc một tập hợp các dữ liệu là không đồng nhất.

Như vậy, để tránh được các trường hợp kể trên chúng ta cần phải khóa dữ liệu, không cho những tiến trình xử lý khác thực hiện các operations trên dữ liệu khi transaction hiện tại đang làm việc và việc khóa này sẽ được giải phóng ở cuối transaction. Có 3 loại khóa dữ liệu là: write locks, read locks, rang locks. Isolation Levels chỉ ra những mức độ khóa khác nhau. Dưới đây là các Isolation Levels:
![](https://images.viblo.asia/4b0fe830-6171-4701-8543-b6710499044c.png)

**Read uncommitted**  Khi transaction thực hiện ở mức này, các truy vấn vẫn có thể truy nhập vào các bản ghi đang được cập nhật bởi một transaction khác và nhận được dữ liệu tại thời điểm đó mặc dù dữ liệu đó chưa được commit. Nếu vì lý do nào đó transaction ban đầu rollback lại những cập nhật, dữ liệu sẽ trở lại giá trị cũ. Khi đó transaction thứ hai nhận được dữ liệu sai.

**Read committed** Transaction sẽ không đọc được dữ liệu đang được cập nhật mà phải đợi đến khi việc cập nhật thực hiện xong. Vì thế nó tránh được dirty read như ở mức trên.

**Repeatable read** Mức isolation này hoạt động nhứ mức read commit nhưng nâng thêm một nấc nữa bằng cách ngăn không cho transaction ghi vào dữ liệu đang được đọc bởi một transaction khác cho đến khi transaction khác đó hoàn tất.

**Serializable** Đây là mức cao nhất của isolation levels, đảm bảo read và write locks. Trong trường hợp phép read có mệnh đề điều kiện, Serializable cũng cần đòi hỏi range lock để tránh phantom reads.

## Kết luận:
Nói tóm lại transaction giúp chúng ta có thể toàn vẹn dữ liệu. "Toàn vẹn dữ liệu" cái này quen nè ở trường các thầy cũng hay bảo chúng ta là phải toàn vẹn dữ liệu thì ra nó chính là transaction. Hóa ra mình cũng được học đó chỉ là phiên bản tiếng việt mà thôi :v. Bài viết này có sự tham khảo từ:

https://www.tutorialspoint.com/sql/sql-transactions.htm

https://docs.microsoft.com/en-us/sql/odbc/reference/develop-app/transaction-isolation-levels?view=sql-server-2017

Cảm ơn các bạn đã theo dõi. Chúc các bạn học tập hiệu quả. Bài viết có nhiều thiếu sót mong các bạn thông cảm.