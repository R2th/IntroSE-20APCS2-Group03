Bài viết này sẽ tập trung vào các định nghĩa và thuật ngữ mà người ta thường gặp khi làm việc với các đối tượng kỹ thuật số. Các đối tượng đa phương tiện như hình ảnh kỹ thuật số, âm thanh và video sẽ được đề cập, vì chúng hiện đang được sử dụng rộng rãi nhất.
## Định nghĩa
*Tất cả các đối tượng kỹ thuật số có nhiều định dạng và hầu hết được nén hoặc mã hóa. Phần này xác định một số đặc điểm phổ biến nhất liên quan đến một đối tượng kỹ thuật số.*

### Định dạng thô
Khi một bức ảnh được chụp, một video được ghi lại hay một tài liệu được quét, dữ liệu kết quả được lưu trữ được gọi là định dạng thô. Một số máy ảnh ngay lập tức nén dữ liệu định dạng thô để lưu nó vào bộ nhớ. Hầu hết các video đều được nén ngay lập tức, bởi vì bộ nhớ cần để lưu trữ nếu để định dạng thô là rất lớn, thường vượt quá giới hạn lưu trữ.
### Nén
Là một thuật toán sử dụng để mã hóa thông tin kỹ thuật số để giảm kích thước lưu trữ của nó? Với một chiêc máy ảnh độ phân giải cao, ảnh có thể ảnh có kích thước trên 1 GB ở định dạng thô, video sẽ có dung lượng lớn hơn 100 GB nếu không nén. Đối với mỗi loại phương tiện, thường có nhiều định dạng nén có sẵn. Mỗi định dạng nén đều có mục đích là lưu trữ tối đa với giảm chất lượng hình ảnh tối thiểu.
### Nén tổn thất (có mất dữ liệu)
**Lossy compression** - Nén tổn thất là một thuật ngữ để chỉ ra rằng thông tin bị mất khi nén và giải nén. Nén và giải nén nhiều lần có thể dẫn đến suy giảm chất lượng đáng kể. Nén có tổn thất được biết đến nhiều nhất là định dạng nén hình ảnh JPEG được sử dụng bởi hầu hết các máy ảnh và là định dạng nén phổ biến đầu tiên được sử dụng trong các trình duyệt web. Nén âm thanh MP3 sẽ loại bỏ những dữ liệu nằm ngoài dải tần số âm thanh mà hầu hết mọi người có thể nghe thấy.

Kiểu nén này hy sinh chất lượng để tối ưu lưu trữ và tốc độ đọc ghi. Nó cho phép các trang web, chẳng hạn như YouTube truyền phát video chất lượng cao qua các kết nối mạng tốc độ trung bình.

Có bốn vấn đề chính với kiểu nén này:
* *Lưu trữ lâu dài*: Các bảo tàng tranh ảnh luôn tập trung vào tương lai nên mặc dù việc lưu trữ các đối tượng kỹ thuật số ở định dạng thô có thể không hiệu quả về mặt chi phí, nhưng vấn đề lâu dài là thông tin trong ảnh sẽ bị mất nếu được nén. Ngày nay, việc tải xuống video chât lượng cao có thể mất một giờ hoặc lâu hơn và do đó phải được nén để cho phép tải xuống và xem nhanh chóng. Nhưng trong thời gian 10 năm với những cải tiến dự kiến về tốc độ băng thông lớn và tốc độ CPU cao, các thiết bị di động sẽ có thể thường xuyên tải xuống và phát video đó trong thời gian thực.
* *Pháp lý*: Trong một vụ kiện tại tòa án, nếu một đối tượng kỹ thuật số được sử dụng làm bằng chứng, thì điều quan trọng là đối tượng đó không được sửa đổi hoặc giả mạo. Nén có tổn thất thay đổi hình ảnh, và mặc dù trông giống như bản gốc, nhưng nó không phải là hình ảnh gốc và không thể được tin tưởng.
* *Y tế*: Các phần nhỏ trên hình ảnh kỹ thuật số có thể rất quan trọng để chẩn đoán khi nhìn vào hình X-quang. Nếu thông tin bị mất khi nén, thì các bác sĩ phân tích hình ảnh sẽ không thể tin tưởng vào những gì họ nhìn thấy. Là bóng mờ hoặc bóng nhẹ trên hình ảnh là kết quả của một khối u hoặc do thông tin bị mất khi hình ảnh bị nén? Thông tin hiển thị trong hình ảnh y tế phải chính xác và không được mất thông tin.
* *Thời gian nén và giải nén*: Có thể mất rất nhiều thời gian của CPU để nén một đối tượng kỹ thuật số. Hầu hết các thuật toán nén đều nhằm có thời gian giải nén nhanh hơn thời gian nén. Trong trường hợp video, thiết bị nén có thể có CPU tốc độ cao, nhưng máy tính phát nó có thể có CPU tốc độ thấp. Ngoài ra, nếu một thiết bị di động có pin, thì CPU càng khiêm tốn.

### Nén không tổn thất (không mất dữ liệu)
Đây là thuật ngữ để chỉ ra rằng nén và sau giải nén kết quả không mất dữ liệu? Các thuật toán nén không tổn thất thường không hiệu quả như các thuật toán tổn thất. Một số định dạng nén TIF là không tổn thất. Các chuẩn nén như JPEG-2000 cho phép nén cả tổn thất và nén không tổn thất.

Các thuật toán nén không tổn thất truyền thống ban đầu được thiết kế cho văn bản. Chúng có thể đạt được độ nén rất lớn, đặc biệt, nếu văn bản chứa nhiều khoảng trống hoặc các ký tự tương tự. Khi được áp dụng cho các biểu tượng có dải màu nhỏ, chúng hoạt động khá tốt và được chấp nhận (GIF là một ví dụ), nhưng không hoạt động tốt đối với ảnh hoặc video kỹ thuật số. Các thuật toán nén ban đầu này bao gồm:
* ZIP
* Gzip
* RAR
* TAR

### Codec
Codec là một thiết bị hoặc chương trình máy tính có khả năng mã hóa hoặc giải mã luồng dữ liệu số hoặc tín hiệu. Các tập tin âm thanh và video chứa các luồng dữ liệu. Chúng được mã hóa và giải mã bằng cách sử dụng codec. Đối với video, có một codec âm thanh và codec video là hai luồng dữ liệu riêng biệt.

Một codec có thể là không tổn thất hoặc tổn thất dữ liệu. Một codec cũng có thể được sử dụng để giải mã một định dạng được mã hóa.

### Container - Thùng chứa
Định dạng thùng chứa hoặc trình bao bọc là định dạng siêu tệp, có đặc điểm kỹ thuật mô tả cách các yếu tố dữ liệu và siêu dữ liệu khác nhau cùng tồn tại trong một tệp máy tính. Các định dạng video, chẳng hạn như MPG (.mpg), Flash (.flv) và AVI (.avi) là các container, có nghĩa là các định dạng nén mà chúng sử dụng có thể thay đổi. Hai tệp loại MPG có thể sử dụng thuật toán nén âm thanh và video hoàn toàn khác nhau.
Mục tiêu của một container là đơn giản hóa và che giấu sự phức tạp của codec khỏi người dùng. Một video MKV là một thùng chứa, và nó hỗ trợ một số lượng lớn codec âm thanh và video trong đó.![](https://images.viblo.asia/0f7e0630-af10-47bb-b4e2-b0443e152c4c.png) 
*Ví dụ: 1 file mkv chưa nhiều đối tượng bên trong bao gồm âm thanh, video, phụ đề, ...*
## Thành phần đối tượng kỹ thuật số

Một đối tượng kỹ thuật số có thể được coi là nhiều hơn một hình ảnh duy nhất. Nó thực sự có thể trở thành một cấu trúc phức tạp theo đúng nghĩa của nó, thậm chí phát triển đến mức có cấu trúc phân cấp riêng.

### Cơ sở bắt đầu - đối tượng NULL
Giá trị NULL có thể có nhiều ý nghĩa, nhưng trong thế giới quan hệ, giá trị NULL là một giá trị không xác định không chỉ là trống. Một số là NULL có thể được coi là 0, nhưng giá trị NULL thực sự là một số chưa biết và có tiềm năng là bất kỳ giá trị nào.

Trong oracle, khi nói đến việc xử lý các đối tượng, một đối tượng có thể được tạo và chỉ cần đưa ra giá trị NULL.
```
myimage ORDSYS.ORDIMAGE
…
begin
myimage := NULL;
```
Một đối tượng cũng có thể được khởi tạo dưới dạng cấu trúc đối tượng của nó. Là một đối tượng có thể bao gồm nhiều loại, việc khởi tạo bao gồm thiết lập các giá trị riêng lẻ.
```
myimage ORDSYS.ORDIMAGE
…
begin
 myimage := ORDSYS.ORDIMAGE.init();
```
Trọng tâm của một đối tượng kỹ thuật số là dữ liệu phi cấu trúc bên trong nó. Đây có thể là dữ liệu đa phương tiện hoặc một số cấu trúc trong tương lai chưa được xác định. Siêu dữ liệu xung quanh đối tượng chỉ hỗ trợ nó và giúp xác định nó bây giờ. Thực tế trong tương lai là một đối tượng kỹ thuật số sẽ không cần bất kỳ siêu dữ liệu nào, vì chính nó sẽ chứa đủ thông tin để định nghĩa nó. Siêu dữ liệu có thể được xem giống như một cấu trúc lập chỉ mục, có ở đó để cải thiện hiệu suất và giúp dễ dàng tìm kiếm hơn. Nó là một cấu trúc hỗ trợ. Nó không phải là đối tượng kỹ thuật số.

Vì vậy, trường hợp NULL cho một đối tượng kỹ thuật số có thể được hiểu rộng hơn. Đó là một cấu trúc đối tượng được khởi tạo có thể có siêu dữ liệu nhưng chưa có dữ liệu phi cấu trúc được liên kết với nó. Trường hợp NULL là một trường hợp nói rằng đối tượng kỹ thuật số này có tiềm năng nhận bất kỳ giá trị nào. Nó có thể là một bức ảnh, một tệp âm thanh, một video, một tệp văn bản hoặc nhiều loại kết hợp lại.

### Bản gốc - The original image
Hầu hết các đối tượng kỹ thuật số bắt đầu với một bản gốc. Đây là bản cốt lõi. Tất cả các bản khác là để đi kèm hoặc hỗ trợ nó. Bản gốc có thể là ảnh, tệp âm thanh, video hoặc bất kỳ dữ liệu phi cấu trúc nào ở mọi kích thước.

Bản gốc không bao giờ được sửa đổi. Các dẫn xuất có thể được tạo ra từ nó và có thể được lập chỉ mục.![](https://images.viblo.asia/78749898-aedd-47e7-befe-971ff587bcff.PNG)

Như với tất cả các đối tượng kỹ thuật số, có những ngoại lệ. VÍ dụ khi máy ảnh chụp một ảnh DNG (Digital Negative), bản gốc sẽ không bao giờ được sửa đổi. Ngoại lệ xuất hiện khi các sửa đổi mà người chụp thực hiện đối với hình ảnh được lưu trữ; chúng chỉ được lưu trữ dưới dạng dữ liệu thay đổi trong bản gốc, tất cả những gì được lưu trữ là bản gốc với các vectơ thay đổi được lưu trữ riêng. Khi truy cập DNG, hình ảnh thô ban đầu được mở và tất cả các thay đổi sẽ được áp dụng. Vì vậy, mặc dù DNG ban đầu không được sửa đổi, tệp DNG thực tế đã được sửa đổi, vì các vectơ thay đổi có hiệu quả dẫn đến tệp gốc bị thay đổi.

### Đối tượng kỹ thuật số được lập chỉ mục
Mục tiêu của việc lập chỉ mục một đối tượng kỹ thuật số là để cải thiện hiệu suất tìm kiếm. Một chỉ mục truyền thống được tìm thấy trong cơ sở dữ liệu quan hệ sẽ cải thiện hiệu suất khi tìm kiếm và thực hiện các truy vấn. Trong một số trường hợp, một chỉ mục có thể được sử dụng để thực thi tính toàn vẹn tham chiếu (khóa chính).

Với một chỉ mục trên một đối tượng kỹ thuật số, mục tiêu là cải thiện thời gian truy xuất hoặc đọc ghi dữ liệu. Một đối tượng kỹ thuật số có thể khá lớn, trong khi một bản ghi quan hệ thường nhỏ. Thời gian để lấy lại 10 MB ảnh kỹ thuật số có thể tính bằng giây hoặc phút tùy thuộc vào tốc độ mạng. Nếu người dùng đang hiển thị một trang có 100 đối tượng kỹ thuật số được hiển thị trên đó, với mỗi đối tượng được hiển thị nhỏ hơn (ít pixel hơn) để cho phép tất cả chúng được xem trên màn hình, thì tổng số lượt tải xuống có thể là 100 x 10 MB hoặc 1 GB . Quy mô này lên tới 100 người dùng đồng thời và hầu hết các mạng (thậm chí cả mạng nội bộ) sẽ phải vật lộn để cung cấp hình ảnh. Thêm vào đó, các trang web có thể phải trả chi phí băng thông (ví dụ: Amazon tính phí cố định cho mỗi GB được truy xuất) và rõ ràng là việc truy xuất bản gốc của đối tượng kỹ thuật số không hiệu quả về chi phí.

Điểm quan trọng cần nhấn mạnh ở đây đó là trọng tâm để điều chỉnh, là chìa khóa cho khả năng mở rộng và phân biệt cơ sở dữ liệu phi cấu trúc với cơ sở dữ liệu quan hệ, chủ yếu xoay quanh tốc độ phân phối, chứ không phải tốc độ thực hiện truy vấn.

**Chỉ mục kim tự tháp**

Trong chỉ mục truyền thống, hình thu nhỏ được tạo ra, đây là phiên bản nhỏ hơn nhiều so với bản gốc. Đối với âm thanh và video, hình thu nhỏ này cũng có thể được gọi là đoạn trích. Hình thu nhỏ có thể thay đổi kích thước. Đối với một hình ảnh kỹ thuật số, nó có thể có chiều dài từ 80 đến 140 pixel. Đây là một phần quan trọng, hình ảnh miêu tả tốt nhất thông tin trong đó được cắt ra và thu nhỏ kích thước. Một hình thu nhỏ thường có kích thước từ 1 k đến 10 k.

![](https://images.viblo.asia/c8b9d4ff-d3cd-407a-b5df-e90961d63818.PNG)

Sử dụng ví dụ trước, nếu bây giờ người dùng yêu cầu 100 hình ảnh và nếu mỗi hình thu nhỏ có kích thước 10 k, điều này có nghĩa là chỉ có 1 MB dữ liệu được gửi. Đây là một cải tiến lớn.

Chỉ mục kim tự tháp có thể trở nên khá lớn và hàng trăm biến thể của hình ảnh có thể được tạo ở các độ phân giải khác nhau, mỗi độ phân giải nhỏ hơn bản gốc. Khi được thiết lập chính xác, nó cho phép người dùng nhanh chóng phóng to các khu vực khác nhau của hình ảnh kỹ thuật số mà không cần tải xuống bản gốc.

Nhưng như với bất kỳ loại chỉ mục nào, hiệu suất đạt được tỷ lệ với chi phí lưu trữ và chỉ mục kim tự tháp càng tinh vi thì càng cần nhiều dung lượng lưu trữ. Đối với hầu hết các tổ chức, một cấu trúc hai cấp là đủ. Điều này liên quan đến việc tạo ra một hình thu nhỏ và hình ảnh chất lượng web. Chất lượng web là phiên bản thu nhỏ lớn hơn được tạo để xem tối ưu trên hầu hết các màn hình máy tính. Chất lượng web thường là 600 pixel và có kích thước từ 100 k đến 1 MB.

Đối với video, đoạn trích có thể là trích xuất chất lượng thấp trong 10 giây của cảnh chính trong video, trong khi chất lượng web tương đương có thể là trích xuất 60 giây với chất lượng cao hơn một chút. Trailer phim sẽ được phân loại là một phần của chỉ mục kim tự tháp. Một đối tượng video cũng có thể có hình thu nhỏ hình ảnh kỹ thuật số đại diện cho nó cũng như các đoạn.

Mỗi loại đối tượng kỹ thuật số có các đặc điểm và phương thức riêng cho hình thu nhỏ là gì và cách thể hiện nó. Một tài liệu có thể có hình thu nhỏ là hình ảnh kỹ thuật số của trang đầu tiên hoặc nó có thể là một bản tóm tắt.

**Các dẫn xuất**

Một dẫn xuất là một đối tượng kỹ thuật số đã được chuyển đổi, nén và/hoặc chuyển đổi cho các mục đích phân phối các đối tượng. Một hình ảnh được lập chỉ mục như hình thu nhỏ được tạo ra cho mục đích hiệu suất. Một hoặc nhiều dẫn xuất có thể được tạo ra. Đối với một hình ảnh kỹ thuật số, nó có thể là một hình ảnh có các thuộc tính lý tưởng để được nhúng trong PowerPoint. Một cái khác có thể được tạo ra với một không gian màu CMYK để phù hợp in ra. Đối với video kỹ thuật số, dẫn xuất có thể là một với codec h264+ và một cái khác có codec MPEG-4. Đối với một tài liệu, một dẫn xuất PDF có thể được tạo ra thay DOCX.
![](https://images.viblo.asia/c02d3eb7-8e39-4b5f-980e-dfbfe680088e.PNG)

**Masters**

Một đối tượng kỹ thuật số có thể là một bức ảnh kỹ thuật số của một chiếc bình.Đối tượng chính nó đại diện cho là chiếc bình. Nhiều bức ảnh kỹ thuật số khác có thể được chụp từ chiếc bình với các góc khác nhau. Mỗi một trong số này được gọi là một master. Một trong số này có thể được đánh dấu là chủ đại diện và từ đó, hình thu nhỏ được hiển thị cho người dùng. Không có giới hạn đối với số lượng master mà một đối tượng kỹ thuật số có. Một master cũng có thể có nhiều dẫn xuất.
![](https://images.viblo.asia/5d6f825c-0257-4111-954c-95a5f784809f.PNG)

**Các thành phần**

Một đối tượng kỹ thuật số riêng lẻ có thể bao gồm nhiều thành phần. Nếu một đối tượng kỹ thuật số có nhiều master, và mỗi master có nhiều dẫn xuất, cũng như lập chỉ mục đối tượng kỹ thuật số thực tế sẽ có nhiều thành phần bên trong nó. Điều này sẽ tăng kích thước của đối tượng kỹ thuật số thực tế.

Đối tượng kỹ thuật số có thể có siêu dữ liệu liên quan đến nó. Mỗi master cũng có thể có siêu dữ liệu được liên kết với nó (ví dụ: các giá trị EXIF, XMP hoặc IPTC). Mặc dù có thể lưu trữ siêu dữ liệu trong một hình ảnh hoặc hình thu nhỏ chất lượng web, nhưng chúng được sử dụng để lập chỉ mục bằng cách không lưu trữ siêu dữ liệu bên trong, kích thước của hình ảnh kỹ thuật số sẽ giảm, giúp truy xuất chúng nhanh hơn.
![](https://images.viblo.asia/06249f10-1436-4917-bfeb-70785c89b4c1.PNG)

**Phiên bản phân cấp**

Khi một đối tượng kỹ thuật số được sửa đổi, các phiên bản trước có thể được giữ lại. Các phiên bản này có thể được lưu trữ bên trong cùng một đối tượng kỹ thuật số tương tự như bản gốc. Sự khác biệt là phiên bản là cùng một hình ảnh đã được sửa đổi. Vì những người khác nhau có thể chỉnh sửa các phần khác nhau của đối tượng hoặc thậm chí các master khác nhau, một hệ thống phân cấp có thể được hình thành có chứa tất cả các phiên bản khác nhau và những người đã sửa đổi chúng.

Đối với hệ thống phiên bản phân cấp, thách thức là dung lượng lưu trữ cần thiết để lưu trữ tất cả các phiên bản khác nhau. Ngay cả khi một byte trong siêu dữ liệu được nhúng trong hình ảnh được sửa đổi, thì phiên bản mới được yêu cầu phải được lưu trữ. Những gì các nhà cung cấp cơ sở dữ liệu xem xét là sử dụng các kỹ thuật để lưu trữ tối ưu các phiên bản này. Có thể sử dụng công nghệ được sử dụng để nén MPEG cho phân cấp phiên bản. Trong trường hợp này, mỗi phiên bản giống như một khung và chỉ có sự khác biệt giữa các phiên bản được lưu trữ theo cách nén. Mặc dù không có nhà cung cấp cơ sở dữ liệu nào cung cấp khả năng này, nhưng một tính năng như vậy sẽ có sự phân nhánh lưu trữ lớn và cho phép lưu trữ nhiều phiên bản hơn.

Mặc dù bản gốc không bao giờ nên được sửa đổi, như được giải thích với DNG. Người ta chỉ thay đổi siêu dữ liệu xung quanh nó. Như mọi khi với dữ liệu phi cấu trúc, một khi quy tắc được thiết lập, sẽ không mất nhiều thời gian để các ngoại lệ cho quy tắc được nêu ra. Bản chất của điều này có nghĩa là một thái độ mờ nhạt cần được chấp nhận khi xử lý tất cả các dữ liệu phi cấu trúc.

**Quan hệ**

Mối quan hệ là sự liên kết giữa bất kỳ hai hoặc nhiều đối tượng kỹ thuật số.
![](https://images.viblo.asia/d61c92ca-77ac-458c-bf82-03a239ec891f.PNG)


-----


-----
Tài liệu tham khảo: Managing Multimedia and Unstructured Data in the Oracle Database - Marcelle Kratochvil