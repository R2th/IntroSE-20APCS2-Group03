## Lịch sử phát triển
Từ năm 2009, khi Satoshi Nakamoto triển khai công nghệ blockchain như một thành phần cốt lõi trong Bitcoin, blockchain đã là từ thông dụng trong ngành công nghệ. Thành công của Bitcoin đã chứng minh khả năng vi diệu của nền tảng công nghệ này và hiện tại mọi người đang lên kế hoạch triển khai nó trong hầu hết mọi thứ. Theo những số liệu thống kê được trong khảo sát của diễn đàn kinh tế thế giới, đến năm 2027, 10% GDP toàn cầu có thể được lưu trữ bằng cách sử dụng công nghệ blockchain. Thật thú vị phải không?

Như bạn có thể thấy, bằng việc cho phép các giao dịch kỹ thuật số, quá trình bỏ phiếu, lưu trữ tài liệu, giao dịch và chuyển dữ liệu phi tập trung, công nghệ blockchain sẽ có mặt ở khắp mọi nơi. Vì vậy, đối với các nhà phát triển làm trong lĩnh vực này, có một câu hỏi quan trọng được đặt ra đó là việc **làm thế nào để bạn biết rằng ứng dụng blockchain của bạn đang hoạt động đúng theo cái cách mà bạn muốn?** Nói một cách đơn giản hơn đó là làm thế nào để thực hiện blockchain testing?

Đầu tiên, hãy cùng đi sâu vào hơn một chút để tìm hiểu chính xác công nghệ blockchain là gì, nó có thể giúp đỡ chúng ta như thế nào và có những gì cần phải được test trong blockchain.

## Blockchain là gì?
Một blockchain về cơ bản giống như một **cuốn sổ cái lưu trữ phân tán cơ sở dữ liệu** của các tài sản và giao dịch được thực hiện trên một mạng ngang hàng. Bạn có thể nghĩ về một blockchain như một cơ sở hạ tầng mở có thể lưu trữ các loại tài sản khác nhau.

Để hiểu về nó một cách đơn giản hơn, hãy tưởng tượng bạn phải thực hiện giao dịch chuyển `10$` từ A đến B. 

Hiện tại, trong các xử lý thông thường, giao dịch diễn ra thông qua ứng dụng của bên thứ ba hoặc hệ thống xử lý thanh toán. Đầu tiên, ngân hàng A sẽ xác định các thông tin chi tiết của ngân hàng B. Tiếp theo, với sự trợ giúp của dịch vụ xử lý thanh toán, một ngân hàng sẽ bắt đầu chuyển tiền vào ngân hàng B cùng với một số khoản khấu trừ nhất định. Sau đó, cả hai ngân hàng sẽ ghi lại giao dịch vào dữ liệu lưu trữ của họ. Tuy nhiên, phí giao dịch được tính và B nhận được khoảng 9,95 đô la. Mặc dù quá trình này khá an toàn và có nhiều phương án dự phòng để đảm bảo độ bảo mật và tính chính xác nhưng nó vẫn có một số vấn đề cơ bản trong quy trình giao dịch, bao gồm:
- Tốc độ giao dịch chưa tối ưu. Thậm chí còn chậm trễ.
- Sự phụ thuộc vào bên thứ ba duy nhất mà cho hiệu quả không bao giờ đạt 100%
- Trong trường hợp có bất kỳ lỗi phát sinh nào trong giao dịch, không ai chịu trách nhiệm và các bên thường đổ lỗi cho nhau.

### Cách blockchain loại bỏ vấn đề
Thật tốt nếu có một hệ thống mà bạn không còn phải lo lắng về những vấn đề phải đối mặt. Nơi mà bạn chỉ cần thực hiện một giao dịch và có những người đang ngồi và xác nhận giao dịch của bạn mỗi giây. Cơ chế xác thực được gọi là Proof of block. Nó được thực hiện dựa trên khóa chung được cung cấp cho dữ liệu được mã hóa và được hoàn tất bởi tất cả mọi người trong mạng ngang hàng. Hơn nữa, đây là những người thực sự chứ không phải bot. Vì vậy, không có một cơ quan nào là xác thực giao dịch duy nhất, tức là không có dịch vụ giao dịch tập trung, quá trình này sẽ được phân tán một cách hiệu quả.

Khi có nhiều hơn một số lượng người xác định thực hiện xác thực giao dịch, các chi tiết giao dịch sẽ được lưu trữ dưới dạng một khối (block) và khối đó được thêm vào ‘blockchain. Do đó, công nghệ này có tên là blockchain. Hơn nữa, một khi các khối được xác nhận và thêm vào thì sẽ là bất biến. Các khối này có một hàm băm (hash) cụ thể với mọi khối và những hash này giống như dấu vân tay, duy nhất cho mọi khối. Những người xác nhận quá trình giao dịch được gọi là người khai thác (miners). Càng nhiều số lượng người khai thác, hiệu quả giao dịch càng tốt.

Một khối trong chuỗi blockchain sẽ bao gồm dữ liệu, hash và hash của khối trước đó. Vì nó chứa hash của một khối trước do đó trong một blockchain, tất cả các khối đều chứa dữ liệu cho các khối trước đó. Vậy nên gần như không thể để cho blockchain bị hỏng.

*Vì vậy, bạn có thể coi blockchain là một cuốn sổ cái phân tán, nơi có rất nhiều người đang tích cực cập nhật và xác thực các chi tiết giao dịch của bạn dựa trên khóa giải mã được cung cấp. Và một khi nhiều hơn số người cụ thể xác nhận giao dịch, một khối mới được thêm vào blockchain.*

## Tại sao testing là cần thiết trong blockchain?
Một khối sau khi được thêm vào blockchain sẽ ở đó mãi mãi và nếu bạn cố gắng thay đổi dữ liệu trong một số khối ở giữa chuỗi, các khối sau trở nên không hợp lệ. Một thay đổi duy nhất trong khối của blockchain sẽ khiến mọi khối tiếp theo cũng thay đổi. Điều này rất quan trọng bởi bất cứ khi nào một khối mới được thêm vào, nó sẽ được thêm vào đúng cách vì nó không thể thay đổi vào một ngày sau đó. Vậy nên việc khai thác một blockchain trở nên phức tạp và do đó việc kiểm tra blockchain lại càng trở nên phức tạp hơn.

Thêm vào đó, testing sẽ đóng góp cho các giao dịch lớn trải qua quá trình xác nhận, mã hóa, giải mã, truyền tải, v.v ... để đảm bảo rằng các quy trình này diễn ra suôn sẻ.

## Những gì bạn cần phải test trong Blockchain?

1. Kích thước khối: Giới hạn cố định tối đa của một khối là 1 megabyte. Sau khi giới thiệu bitcoin, kích thước trung bình của một khối trong 18 tháng đầu tiên xuất hiện dưới 30 KB. Nhưng vào tháng 12 năm 2017, nó đã dao động khoảng 1 MB. Điều gì xảy ra nếu kích thước của một khối vượt quá 1 MB? Thực ra hiện tại điều này vẫn chưa được quyết định là sẽ làm thế nào với các khối trên 1 MB.

2. Kích thước chuỗi: Không có giới hạn về kích thước của chuỗi. Vì vậy, thật thú vị khi kiểm tra nó cho chức năng và hiệu suất của nó. Ví dụ, kích thước chuỗi bitcoin của chuỗi bitcoin tiếp tục tăng lên từng ngày. Nếu bạn muốn biết kích thước chuỗi hiện tại, chỉ cần nhấn vào [đây](https://blockexplorer.com/api/status?q=getBlockCount) (nó gần 599920 khi tôi viết bài này).
3. Load: Với rất nhiều người trên blockchain, load trở thành một tham số chính để kiểm tra trong blockchain. Hãy lấy ví dụ về bitcoin. Hiện tại nó có thông lượng tối đa là 3-4 giao dịch mỗi giây nhưng nếu giao dịch / giây tăng như trong trường hợp Visa (2000), Paypal (193), v.v ... Do đó, load vẫn là vấn đề lớn với blockchain khi hiệu suất của nó giảm khi tải tăng.
4. Bảo mật: Vì có nhiều công cụ khai thác liên quan đến giao dịch, nên việc đảm bảo an ninh hơi phức tạp. Vâng, có một hệ thống bảo mật nhiều lớp trong một blockchain. Nếu một trong các lớp đã bị hack, các giao dịch tức thời không thể dừng lại. Do đó, cần phải kiểm tra xem một lớp bảo mật có ảnh hưởng đến lớp kia không.
5. Truyền dữ liệu: Dữ liệu được mã hóa và giải mã được truyền từ máy tính sang máy tính vì vậy cần phải kiểm tra xem quá trình truyền có hoạt động hoàn hảo hay không. Là dữ liệu được gửi nhận ở đầu bên kia hoặc có sự mất mát ở giữa. Vì vậy, nó trở nên cần thiết để đảm bảo rằng dữ liệu không bị mất.
6. Bổ sung khối: Mỗi khối mới được thêm vào chuỗi sau khi tính hợp lệ của giao dịch được xác thực. Vì vậy, phải kiểm tra rằng không nên có bất kỳ rò rỉ nào trong hệ thống bổ sung khối và khối phải được thêm vào sau khi xác thực.
7. Dữ liệu mật mã: Mật mã học là xương sống của công nghệ blockchain. Vì vậy, cần phải đảm bảo rằng dữ liệu được mã hóa và giải mã chính xác.

Đây chỉ là sự khởi đầu của sự xuất hiện của công nghệ Blockchain - vẫn còn nhiều điều hơn nữa để học hỏi và thể hiện trong thời gian tới. Vì vậy, chúng ta sẽ thấy nhiều blockchain hơn trong những năm tới với tốc độ chiếm lĩnh thế giới công nghệ.

Nguồn: [All you need to know about Blockchain Testing](https://blog.goodaudience.com/all-you-need-to-know-about-blockchain-testing-db5f13771ab5)