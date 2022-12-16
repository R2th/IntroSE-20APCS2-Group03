# Ấn tượng đầu tiên
Ấn tượng đầu tiên vô cùng là quan trọng, cho dù đó là cuộc hẹn hò đầu tiên, hay trong một cuộc phỏng vấn xin việc hoặc đơn giản hơn đó là chọn cách trang trí mới cho ngôi nhà của bạn.

Một trong những điều đầu tiên bạn thấy khi bạn truy trang cá nhân của ai đó trên Facebook là những hình ảnh. Những hình ảnh này là một phần không thể thiếu trong trải nghiệm Facebook, nhưng đôi khi chúng có thể được tải xuống và hiển thị chậm. 
Điều này đặc biệt đúng đối với những người sử dụng kết nối mạng di động, thường khiến bạn nhìn chằm chằm vào một hộp màu xám trống không khi bạn đợi hình ảnh tải xuống. Đây là một vấn đề trong các thị trường đang phát triển như Ấn Độ, Việt Nam, nơi mà nhiều người mới sử dụng Facebook chủ yếu bằng mạng 2G.

> **Chúng ta có thể thiết kế và xây dựng cái gì giúp để lại ấn tượng đầu tiên một cách tốt hơn là những ô vuông xám xịt?**
> 
![](https://images.viblo.asia/6d9d1304-3736-4d4a-842e-59d211198f21.jpg)

Ban đầu, chúng tôi tập trung vào ảnh bìa, ảnh đại diện, có độ phân giải cao ở đầu profile và fanpage. Ảnh bìa là một trong những phần dễ thấy nhất của các màn hình này, nhưng cũng là một trong những ảnh có tốc độ tải chậm nhất.

> **Có hai lý do lớn cho việc này.**

Đầu tiên, ảnh bìa thường đạt 100 KB, ngay cả sau khi nén JPEG. Đó là dữ liệu rất lớn khi bạn nhận ra rằng kết nối 2G chỉ có thể truyền dữ liệu tối đa lên đến 32 KB / giây.

Lý do thứ hai là subtler. Trước khi tải xuống một hình ảnh, ứng dụng tạo request network cho URL của hình ảnh từ máy chủ GraphQL. Sau đó, để thực sự có được hình ảnh, nó sử dụng URL đó để tiếp tục thực hiện request network một lần nữa cho CDN để nhận các byte hình ảnh. Độ trễ của request network tới CDN này có thể khá dài, thường dài hơn nhiều so với request network đầu tiên.
> **Chúng tôi cần phải giải quyết cả hai vấn đề này cùng một lúc.**
> 
![](https://images.viblo.asia/de89ad7d-fb02-4944-bd2f-761d788192ef.jpg)
# **200 bytes**

Để giải quyết những vấn đề này, chúng tôi đã tự hỏi liệu chúng tôi có thể tạo một ấn tượng trực quan về hình ảnh chỉ bằng 200 byte hay không. Tại sao 200 byte? Để loại bỏ request network tới CDN, chúng tôi cần một số bản fax(copy) của chính hình ảnh đó trong lần request network đầu.

> **Điều này có nghĩa là hình ảnh phải là một phần của GraphQL**

Nhưng GraphQL không được thiết kế để xử lý dữ liệu hình ảnh có kích thước đầy đủ. Nó đã được xác định rằng nếu chúng ta có thể thu nhỏ một ảnh bìa xuống 200 byte, nó có thể được phân phối hiệu quả thông qua GraphQL. Nếu giải pháp này thành công, nó sẽ giải quyết cả hai yêu cầu là giảm dung lượng truyền tải và loại bỏ request network tới CDN, đây thực sự là giải pháp tuyệt vời
Chúng tôi ước tính rằng điều này sẽ cho phép chúng tôi hiển thị preview photo (ảnh xem trước) trước khi hình ảnh gốc hoàn thành việc tải xuống , giảm tổng thời gian chờ để hiển thị profile và cover fanpage đáng kể. Cuối cùng, chúng tôi vẫn muốn tải xuống và hiển thị hình ảnh có kích thước đầy đủ từ CDN, nhưng điều này có thể được thực hiện ở chế độ background trong khi vẫn đảm bảo trải nghiệm người dùng vẫn cảm thấy vui nhộn và thú vị.

> **Thách thức bây giờ đã trở thành làm thế nào để bóp một bức ảnh bìa thành 200 byte!**
> 
![](https://images.viblo.asia/e165db6b-669f-4a3c-9097-b08df2315e27.jpg)

**Hiển thị đúng hình ảnh**

Chúng tôi cảm thấy rằng một “ấn tượng” mơ hồ của một bức ảnh sẽ cung cấp một cái gì đó vừa thú vị vừa phù hợp, kích thích trí tò mò của người dùng với hình ảnh gốc. Sau khi đã thống nhất trải nghiệm người dùng, chúng tôi cần tìm ra các chi tiết kỹ thuật để thực hiện điều đó. Độ phân giải thấp nhất mà chúng ta có thể sử dụng là gì? Chúng ta nén hình ảnh bằng cách nào? Chúng ta hiển thị hình ảnh trên máy người dùng như thế nào? Đây chính là thời điểm mọi thứ trở nên thú vị.

Hiển thị hình ảnh là phần đơn giản nhất: Cái hình mà bạn nhìn thấy mờ mờ như nhìn bằng kính bị dính nước là tương đối dễ dàng để thực hiện với một filter có tên Gaussian blur. Ưu điểm về bộ lọc làm mờ này, bên cạnh việc nhìn tốt, là nó “giới hạn băng tầng” tín hiệu. Về cơ bản, “giới hạn băng tần” có nghĩa là bỏ các chi tiết và thay đổi các chi tiết trong hình ảnh gốc. Chúng tôi càng tăng độ làm mờ hình ảnh được hiển thị, hình ảnh gốc của chúng tôi càng theo đó nhỏ hơn(bao gồm kích cỡ, dung lượng).

**Độ phân giải và nén hình ảnh**

Để hiểu rõ hơn, chúng tôi càng làm mờ hình ảnh của chúng tôi, độ phân giải thấp hơn thì chúng tôi càng có thể nén nhiều hơn. Tại điểm cực hạn, nếu chúng ta chỉ giảm xuống màu trung bình của tất cả các điểm ảnh trong một hình ảnh (còn được gọi là các thành phần DC hay là F(0) của một hình ảnh), thì với một “pixel” duy nhất nó sẽ chiếm dung lượng tương đương 3 byte — mỗi byte một cho RGB!. Chúng tôi biết rằng, cần nhiều hơn 1pixel để hiển thị được hình ảnh, nhưng chúng tôi cần bao nhiêu pixel ?

Với hiệu ứng kính mờ cuối cùng mà chúng ta muốn đạt được trên client, chúng ta có thể xác định bán kính mờ cần thiết cho bộ lọc Gaussian của chúng ta. Từ bán kính mờ đó, chúng tôi sau đó có thể tính toán hình ảnh có độ phân giải thấp nhất nhưng vẫn có thể cung cấp cho chúng tôi hình ảnh cuối cùng mong muốn. Đối với kích thước hiển thị ảnh bìa của chúng tôi, chúng tôi nhận thấy độ phân giải này rơi vào khoảng 42 pixel. Nếu hình ảnh lớn hơn 42 × 42 pixel, chúng tôi nhận thấy không có thêm chi tiết được bổ sung; về cơ bản, chúng tôi sẽ lãng phí dữ liệu. Nhưng giả sử 3 byte cho mỗi pixel (đối với các thành phần RGB), nó vẫn sẽ là 42x42x3 tương đương 5,292 byte — cao hơn nhiều so với mục tiêu 200 byte mong muốn.

Chúng tôi đã bắt đầu đánh giá các kỹ thuật nén tiêu chuẩn để tìm cách tốt nhất để nén dữ liệu này thành 200 byte. Thật không may, nếu đơn giản chỉ cần dùng các thủ thuật nén dữ liệu thông thường như entropy encoding, with, say, zlib, thì chúng tôi cũng vẫn không đạt được mục đính. File vẫn còn quá lớn

Sau đó chúng tôi đã phân tích một loạt các kỹ thuật bên ngoài khác, chúng tôi đã quyết định không sử dụng các mã/thư viện khác dùng để nén ảnh mà chúng tôi đã có thì tốt hơn.

Vì vậy, chúng tôi đã xem mã hóa hình ảnh JPEG, đây là một codec hình ảnh rất phổ biến. Đặc biệt là vì hình ảnh của chúng ta sẽ bị làm mờ rất nhiều trên client, và do đó sẽ hạn chế được băng thông dữ liệu hình ảnh của chúng ta, JPEG nén hình ảnh này khá hiệu quả cho mục đích của chúng ta.

Thật không may, JPEG header tiêu chuẩn có kích thước hàng trăm byte. Trên thực tế, JPEG header thực sự lớn hơn nhiều so với 200 byte đặt ra của chúng tôi. Tuy nhiên,nếu không bao gồm JPEG header, bản thân dữ liệu được mã hóa đạt ngưỡng tiệm cận 200 byte của chúng tôi. Chúng tôi chỉ cần tìm ra cách làm việc với JPEG header này!

![](https://images.viblo.asia/b673fc96-c9f9-42a3-9077-e48481d4c2bd.jpg)

# JPEG chính là vị cứu tinh
Có một vài bảng trong JPEG header, có chứa kích thước của nó. Câu hỏi sau đó đã trở thành: Có thể tạo ra một JPEG header cố định(fixed) có thể được lưu trữ trên client và không cần phải truyền đi không? Trong trường hợp đó, chỉ có dữ liệu chính(payload) cần phải được gửi, Đây sẽ chính là định dạng giúp chúng tôi giải quyết vấn đề. Cuộc điều tra bắt đầu.

Đối với một giá trị Q cho trước, bảng lượng tử hóa(the quantization table) được cố định; thông qua các thử nghiệm và đo lường, một Q20 đã tạo ra một hình ảnh đáp ứng nhu cầu hiển thị của chúng tôi. Vì vậy, đây là giải pháp tốt tốt . Hình ảnh của chúng tôi mặc dù không phải là kích thước cố định nhưng được giới hạn ở mức 42 × 42 (chúng tôi giữ nguyên tỷ lệ co trong định dạng đã giảm). Với JPEG header kích thước của nó có thể lên đến 2 byte và có thể được đặt dưới client nếu chúng tôi có thể làm cho header hợp lệ. Khi chúng ta xem xét phần còn lại của JPEG header, bảng duy nhất có thể thay đổi với các hình ảnh và tùy chọn khác nhau là bảng Huffman.

Điều này đòi hỏi nhiều công việc hơn một chút, bởi vì cần có sự cân bằng giữa các thay đổi đối với Q, như là dữ liệu hình ảnh, kích thước hình ảnh, có nghĩa là các giá trị tần số khác nhau trong bảng Huffman, điều này sẽ dẫn đến các mức nén khác nhau và số byte payload cuối cùng khác nhau . Nén một vài hình ảnh trong khi cố gắng cân bằng các yếu tố khác nhau mất rất nhiều thời gian, nhưng cuối cùng, chúng tôi có một bảng Huffman mà chúng tôi có thể sử dụng làm tiêu chuẩn để tính số byte mà chúng tôi muốn trên các hình ảnh thử nghiệm.

Vì chúng ta đối phó, xử lý với một số lượng hình ảnh khổng lồ , nên luôn có khả năng giải pháp này không có khả năng mở rộng, có thể có trường hợp ngoài khả năng dự tính của chúng tôi, chúng tôi không có khuôn mẫu thực sự nào cả, v.v. Cuối cùng, chúng tôi đánh số phiên bản của header. Nếu chúng tôi tìm thấy bất kỳ trường hợp ngoài khả năng dự tính nào hoặc tìm thấy bảng tốt hơn trong tương lai, chúng tôi có thể cập nhật số phiên bản cho những hình ảnh đó và chuyển các bảng mới xuống client. Vì vậy, định dạng header cuối cùng đã trở thành một byte cho số phiên bản, hai byte một cho chiều rộng và một cho chiều cao, và cuối cùng là khoảng 200 byte payload. Máy chủ sẽ chỉ gửi định dạng này như là một phần của phản hồi GraphQL và sau đó client có thể chỉ cần gắn thêm phần thân JPEG vào JPEG header được xác định trước, ghép chiều rộng và chiều cao, và coi nó như một hình ảnh JPEG thông thường. Sau khi giải mã JPEG như thông thường, client có thể chạy hiệu ứng Gaussian blur và scale nó để phù hợp với kích thước khung hình muốn hiển thị. Cuối cùng chúng tôi đã có một định dạng header đáp ứng yêu cầu của chúng tôi — một giải pháp hiệu quả cao cho phép chúng tôi tái sử dụng sơ đồ mã hóa hình ảnh JPEG tương đối phức tạp trong khi chỉ truyền dữ liệu payload duy nhất cho mỗi ảnh bìa.


Trong hệ thống phân tích dữ liệu của chúng tôi, chúng tôi đã thấy những cải tiến lớn, nhất là đối với những người có kết nối chậm,việc này đã giúp tăng tốc độ tải profile và fanpage lên 30%. Ngay cả trên các kết nối nhanh nhất, điều này đảm bảo rằng mọi người sẽ luôn nhìn thấy ảnh bìa trước tiên và ngay lập tức, làm cho trải nghiệm tổng thể của họ liền mạch hơn. Phải mất rất nhiều thời gian, công sức, sáng tạo để làm cho nó hoạt động, nhưng nhờ vào sự chăm chỉ của mọi người, nó đã được đền đáp một cách xứng đáng!

**Nguồn bài viết được dịch từ Facebook Developer:**
https://code.fb.com/android/the-technology-behind-preview-photos/