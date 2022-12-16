Tiếp tục loạt bài viết về System Recovery, ở bài viết trước ta có nói  về trình quản lý cơ sở dữ liệu và thuật toán shadow-paging, bây giờ ta sẽ bàn về việc Tăng tốc khởi động lại hệ thống trong thuật toán dựa trên bản ghi cơ sở.
## Điểm kiểm tra mờ (Fuzzy Checkpointing)
Checkpoints là một cách quan trọng để tăng tốc độ thuật toán khởi động lại. Hệ thống càng thường xuyên tạo các điểm kiểm tra, thì càng ít nhật ký mà thuật toán khởi động lại sẽ phải xử lý, và do đó, sẽ mất ít thời gian hơn để chạy khởi động lại. Tuy nhiên, các điểm kiểm tra không phải là miễn phí.

Thuật toán điểm kiểm tra được mô tả trên thực hiện khá nhiều công việc và làm cho hệ thống dừng xử lý các yêu cầu mới trong một thời gian, cho đến khi nó hoàn tất tất cả các trang bận trong bộ nhớ cache. Chúng ta cần có một cách kiểm soát các điểm kiểm tra tốt hơn, để có thể kiểm soát được điểm kiểm tra thường xuyên và do đó tăng tốc độ thuật toán khởi động lại.

Giải pháp được gọi là điểm kiểm tra mờ. Để tạo một điểm kiểm tra, trình quản lý phục hồi thực hiện như sau:

1. Ngừng chấp nhận bất kỳ hoạt động cập nhật, cam kết và hủy bỏ mới nào.
2. Quét bộ nhớ cache để tạo một danh sách tất cả các trang bận trong bộ nhớ cache.
3. Tạo một danh sách của tất cả các hoạt động giao dịch cùng với con trỏ tới trang Log cuối cùng của nó.
4. Viết một bản ghi điểm kiểm tra vào Log, bao gồm danh sách các giao dịch đang hoạt động và các con trỏ bản ghi, và nó cho phép hoạt động bình thường tiếp tục.
5. Tiếp tục chấp nhận các hoạt động cập nhật, cam kết và hủy bỏ mới.
6. Cùng với việc chạy bản cập nhật mới, cam kết và hủy bỏ các hoạt động, nó sẽ phát hành các thao tác dọn dẹp để ghi vào cơ sở dữ liệu ổn định tất cả các trang bận trên danh sách mà nó thu thập được trong bước (2). Đây là những hoạt động ưu tiên thấp mà trình quản lý bộ nhớ cache nên làm chỉ khi có dung lượng trống. Nó có thể mất một thời gian.

Trình quản lý phục hồi được phép thực hiện điểm kiểm tra khác chỉ sau khi bước (6) hoàn thành; đó là, sau khi những trang bận cũ đã được giải phóng. Vì vậy, vào thời điểm bản ghi kiểm tra tiếp theo được viết, tất cả các bản cập nhật trước điểm kiểm tra trước đó phải nằm trong cơ sở dữ liệu ổn định.

Chúng ta hãy xem xét lại thuật toán khởi động lại với tư tưởng thuật toán điểm kiểm tra mờ. Lưu ý rằng đó là bản ghi điểm kiểm tra thứ hai từ cuối về (tức là áp chót), có thuộc tính mà chúng ta đang tìm kiếm (xem hình). Tất cả các bản cập nhật trong bản ghi trước các điểm kiểm tra áp chót phải nằm trong cơ sở dữ liệu ổn định. Thuật toán điểm kiểm tra sẽ không ghi lại bản ghi điểm kiểm tra cho đến khi nó biết điều này đúng. Vì vậy, thuật toán khởi động lại nên bắt đầu với bản ghi điểm kiểm tra áp chót. Ngược lại, trong thuật toán kiểm tra đơn giản của phần trước, tất cả các bản cập nhật trước điểm kiểm tra cuối cùng đều có trong cơ sở dữ liệu ổn định, vì vậy nó bắt đầu với điểm kiểm tra cuối cùng chứ không phải điểm áp chót.

![](https://images.viblo.asia/e9329a9d-788a-46b7-8fc9-f4efaab53a8c.png)
*Điểm kiểm tra mờ. Sau khi một điểm kiểm tra được ghi, tất cả các trang bộ nhớ cache bận đều được giải phóng. Các hoạt động giải phóng phải được hoàn thành trước khi điểm kiểm tra tiếp theo được viết*

Lưu ý rằng điểm kiểm tra mờ là một hoạt động tương đối nhanh. Nó cần dừng xử lý trong giây lát, để kiểm tra bộ đệm và viết một bản ghi điểm kiểm tra. Sau đó, viết ra các trang bận song song với hoạt động bình thường.

Nếu có thể, những hoạt động ghi này nên chạy với mức độ ưu tiên thấp do đó chúng không chặn các giao dịch đọc đang hoạt động. Giả sử có đủ băng thông để xử lý các lần đọc và ghi (điều này là cần thiết trong mọi trường hợp), những lần viết ngẫu nhiên này có rất ít tác động đến hiệu suất của các giao dịch đang hoạt động. Do đó, điểm kiểm tra có thể được chạy một cách thường xuyên, để giảm thiểu số lượng công việc mà khởi động lại phải làm.

Thuật toán điểm kiểm tra mờ rất quan trọng đối với hiệu suất giao dịch và tốc độ khởi động lại, nó có giá trị tối ưu hóa rất nhiều. Triển khai thương mại sử dụng nhiều tối ưu hóa thuật toán được mô tả ở đây.

## Ghi nhật ký hoạt động (Operation Logging)

Điều này không hiệu quả khi ghi toàn bộ các hình ảnh trước và sau mỗi lần một giao dịch thực hiện cập nhật vì hầu hết các bản cập nhật chỉ sửa đổi một phần nhỏ của trang. Tệ hơn nữa, nó không hoạt động chính xác nếu hệ thống cơ sở dữ liệu có khóa bản ghi-granularity. Ví dụ, giả sử hệ thống Log hình ảnh trước và sau của các trang, các bản ghi x và y nằm trên cùng một trang P, và chúng ta thực hiện như sau:

`E = w1[x] w2[y] abort1 commit2`

Khi giao dịch T1 hủy bỏ, chúng ta không thể dùng hình ảnh trước của P, vì điều này sẽ quét sạch cập nhật của T2 cho y. Đây thực chất là cùng một vấn đề mà chúng ta đã gặp phải khi bắt đầu trong bài [Mô hình hệ thống - khóa giả định](https://viblo.asia/p/system-recovery-mo-hinh-he-thong-OeVKBDMElkW), nơi mà chúng ta bàn về việc giữ khoá ghi cho đến khi giao dịch thực hiện xong.

Một giải pháp là để mỗi bản ghi cập nhật chỉ bao gồm hình ảnh trước và sau của bản ghi thực sự cập nhật trên một trang. Điều này vửa làm giảm đáng kể số lượng trang Log, vừa cho phép chúng ta hỗ trợ khóa mức bản ghi. Mặc dù nó có một tác dụng phụ. Thuật toán khởi động lại phải đọc trang từ đĩa trước khi áp dụng bản cập nhật. Điều này không cần thiết với một trang Log phân cấp, bởi vì Log chứa một bản sao đầy đủ của trang. Vì log là một hoạt động thường xuyên hơn nhiều so với khởi động lại, đây là một lợi thế, nhưng nó tạo ra một hoạt động khác cần được tối ưu hóa bởi thuật toán khởi động lại.

Chúng ta có thể giảm số lượng trang Log hơn bằng cách chỉ ghi lại mô tả thay đổi đã được thực hiện chứ không phải toàn bộ bản ghi. Mô tả phải có đủ thông tin mà chúng ta có thể hoàn tác hoặc làm lại thay đổi, nhưng không được nhiều hơn thế. Nghĩa là, nó không nhất thiết phải bao gồm toàn bộ hình ảnh trước và sau của bản ghi. Ví dụ, nếu bản cập nhật chỉ sửa đổi một trường của một bản ghi, bản ghi cập nhật chỉ cần chứa đặc trưng của bản ghi (ví dụ khóa, id của nó), đặc trưng nhận diện trường và hình ảnh trước và sau của trường được sửa đổi, cộng với tên của thao tác được thực hiện (ví dụ "update-field"), do đó, thuật toán khởi động sẽ biết làm thế nào để giải thích bản ghi Log. Một ví dụ khác, bản ghi cập nhật có thể mô tả việc chèn một bản ghi, trong trường hợp nó chỉ cần ghi lại hình ảnh sau của bản ghi và không có hình ảnh trước.

Việc giảm số lượng trang Log theo cách này đã làm phức tạp hóa thuật toán khởi động lại. Nó không còn có thể bắt đầu đơn giản tại điểm kiểm tra áp chót và làm lại hồ sơ cập nhật, bởi vì các hoạt động làm lại có thể không áp dụng được cho trang cơ sở dữ liệu ổn định ở trạng thái hiện tại. Ví dụ, sẽ là sai khi chèn một bản ghi trên một trang nếu bản ghi đó đã có sẵn, bởi vì điều đó sẽ đặt hai bản sao của bản ghi trên trang.

Thuật toán khởi động lại phải biết liệu bản ghi cập nhật có áp dụng cho một trang trước khi làm lại bản cập nhật. Để làm điều này, mỗi trang sẽ được gán tiêu đề bao gồm địa chỉ Log của bản ghi Log cuối cùng đã được áp dụng cho trang này. Đây được gọi là số thứ tự Log (LSN)
![](https://images.viblo.asia/4aaa1dfc-a298-4d33-b527-cd1cfb85d11d.png)
*Lưu trữ số thứ tự nhật ký (LSN) trong trang. Khi cập nhật một trang, bản ghi log bao gồm LSN và mô tả bản cập nhật.*
Sau khi bản cập nhật được thực hiện trên trang và ghi Log, LSN được ghi vào tiêu đề trang trước khi thả chốt trên trang. Điều này cho phép thuật toán khởi động lại biết liệu một trang có bản cập nhật trước khi làm lại nó: Nếu LSN(database-page) >= LSN(log-record), thì bản cập nhật Log đã có trên trang và không nên làm lại.
![](https://images.viblo.asia/61f02471-8e1e-474e-b9e6-8f48c0b031b2.png)
*Phiên dịch LSN trong quá trình phục hồi: Làm lại một bản cập nhật khi và chỉ khi LSN của trang chỉ ra rằng bản cập nhật không có sẵn.*

Ý tưởng LSN này rất hữu ích, nhưng nó làm phức tạp các hoạt động hoàn tác. Khi thuật toán khởi động hoàn tác một cập nhật để hủy bỏ một giao dịch T1, không có LSN mô tả chính xác trạng thái của trang liên quan đến Log. Để hình dung ra vấn đề, xem xét ví dụ trong hình. Các giao dịch T1 và T2 cập nhật các bản ghi khác nhau R1 và R2, trên cùng một trang P. T2 viết cho P (tại LSN 222) sau T1 và sau đó T2 cam kết (tại LSN 223). Khi T1 hủy bỏ (tại LSN 224), LSN nào nó nên viết trong P? Nó không thể sử dụng LSN của bản cập nhật cuối cùng P mà trước khi cập nhật nó (219), vì đó có thể nói rằng T2 của bản cập nhật đã không thực hiện, đó là sai. Nó không thể sử dụng bản cập nhật LSN của T2 (222), vì đó là bản cập nhật của T1 đã được thực hiện nhưng không thể hoàn tác.
![](https://images.viblo.asia/a1bd1332-c643-4362-8769-1270758d7b7d.png)
*Cài đặt LSN trong khi hoàn tác. Trạng thái của trang P được hiển thị sau khi log mỗi bản cập nhật. Khi hủy bỏ T1, không có LSN lưu trữ trong P sẽ mô tả chính xác trạng thái của P.*

Một giải pháp tốt hơn cho vấn đề này là Log các thao tác hoàn tác. Đó là, khi T1 hủy bỏ, mỗi lần nó hủy bỏ một hoạt động cập nhật, nói trên trang P, nó viết một bản ghi Log mô tả việc hoàn tác và nó sử dụng LSN của bản ghi Log đó trong phần đầu của trang P. Đây được gọi là bản ghi hoàn tác hoặc bản ghi Log bồi thường. Bây giờ LSN của bản ghi  mô tả chính xác trạng thái hoàn tác của trang liên quan đến Log.
![](https://images.viblo.asia/ecdcea3a-aa51-4bd2-8a4f-2e3993578810.png)
*Sử dụng log hoàn tác. Nếu thao tác hoàn tác được ghi lại, LSN của nó có thể được cài đặt trên trang P để ghi lại thực tế rằng bản cập nhật đã được hoàn tác.*

Log hoàn tác có một tác dụng phụ thú vị: Giao dịch cam kết và hủy bỏ giống hệt nhau trong Log. Cả hai đều có một chuỗi hoạt động cập nhật theo sau là một hoạt động nói rằng giao dịch được thực hiện (cam kết hoặc hủy bỏ). Thuật toán khởi động lại xử lý cả hai loại giao dịch theo cùng một cách, cụ thể là, nó làm lại các cập nhật của họ. Đối với giao dịch bị hủy bỏ, một số thao tác làm lại được áp dụng để hoàn tác bản ghi, nhưng thuật toán khởi động lại không quan tâm. Nó lặp lại chúng giống như các bản ghi cập nhật thông thường. Các giao dịch duy nhất mà thuật toán khởi động lại thực sự phải hủy bỏ bằng cách quét lùi log là những giao dịch đã hoạt động tại thời điểm xảy ra lỗi.

Giả sử một giao dịch T đang hoạt động giữa khi hệ thống gặp lỗi. Nghĩa là, T có thể đã ghi lại bản ghi cho một phần nào đó nhưng không phải tất cả các bản ghi cập nhật của nó. Khi hệ thống phục hồi, thuật toán khởi động lại thấy rằng T đã hoạt động vào thời điểm thất baị. Vì vậy, nó lùi lại tất cả các bản cập nhật của T, không chỉ là bản cập nhật cho T mà còn các bản ghi hoàn tác. Ví dụ:![](https://images.viblo.asia/3fdfb716-49ca-4b18-bfe6-488e11fab9a3.png)
Trong hình giao dịch T1 đã được hủy bỏ tại thời điểm hệ thống gặp lỗi. Trước khi thất bại, nó thực hiện việc hoàn tác cho LSN 112 và ghi lại sự kiện đó trong bản ghi hoàn tác với LSN 113. Tuy nhiên, nó đã không hoàn thành quá trình thực hiện trước khi hệ thống bị lỗi. Sau khi phục hồi, quá trình khởi động lại cho thấy T1 hoạt động khi hệ thống gặp sự cố, do đó thực hiện các thao tác lùi lại cho LSN 113, 112 và 111 theo thứ tự đó, bằng cách đó ghi lại các bản ghi hoàn tác với LSN 114, 115 và 116.

Hoạt động hủy hoàn tác bản ghi là dư thừa. Nó có thể tránh được bằng cách nối các bản ghi lùi lại khỏi chuỗi backpointers giao dịch, như thể hiện trong hình ![](https://images.viblo.asia/2d1889aa-db2d-4eef-abc9-7f58537a27ca.png) Để làm điều này, mỗi bản ghi hoàn tác trỏ đến bản ghi cập nhật tiếp theo sẽ được hoàn tác. Ví dụ, trong hình bản ghi hoàn tác với LSN 113 trỏ đến bản ghi cập nhật tại LSN 111. Để hoàn thành hủy bỏ T1 trong khi khởi động lại, thuật toán khởi động lại bắt đầu với bản ghi nhật ký cuối cùng cho T1, tại LSN 113, và theo con trỏ ngược của nó tới tiếp theo cập nhật để hoàn tác, trong trường hợp này là cập nhật tại LSN 111.

Một tối ưu hóa hữu ích nữa là tránh tìm các trang không cần thiết bằng cách ghi lại các thao tác flush trong Log. Đó là, sau khi trình quản lý bộ nhớ cache giải phóng một trang và trước khi nó cho phép cập nhật thêm trang, nó sẽ thêm một bản ghi đè lên Log, trong đó bao gồm địa chỉ trang đã được giải phóng. Bản ghi này cho biết thuật toán khởi động lại mà tất cả các cập nhật cho trang đó trước các bản ghi tuôn ra đã có trên đĩa và do đó không cần phải làm lại. Trong thực tế, nó là một điểm kiểm tra mỗi trang.

Một cách hay để sử dụng bản ghi flush trong quá trình phục hồi là để phân tích Log trước giai đoạn làm lại. Để kích hoạt quá trình này, trong mỗi điểm kiểm tra, mỗi trang trong danh sách các trang bận sẽ được tăng lên với LSN cũ nhất phải được làm lại trang đó. Điều này đòi hỏi một số ghi chép bổ sung bởi trình quản lý bộ nhớ cache, nó cần kết hợp LSN cũ nhất với mỗi khe bộ nhớ cache, chỉ định nó khi trang sạch được cập nhật lần đầu tiên và xóa nó khi trang được giải phóng. Danh sách các trang bận này với LSN cũ nhất để làm lại được gọi là bảng trang bận.

Giai đoạn tiền phân tích của thuật toán khởi động lại thực hiện quét Log sơ bộ bắt đầu tại điểm kiểm tra áp chót và tiến về phía cuối Log. Mục tiêu là tạo một bảng trang bận, trong phạm vi có thể, mô tả trạng thái của bộ nhớ cache tại thời điểm thất bại. Để khởi tạo giai đoạn khởi động lại, nó cũng xây dựng một danh sách các giao dịch hoạt động bao gồm LSN cuối cùng của mỗi giao dịch. Trong quá trình quét này, có bốn loại bản ghi Log quan tâm: update, flush, commit, và abort.

* Update (P): Nếu trang P không có trong bảng trang bận, sau đó thêm nó và đặt LSN cũ nhất là LSN của bản cập nhật này. Nếu giao dịch Ti không có trong danh sách giao dịch, sau đó thêm nó. Đặt LSN cuối của Ti là LSN của bản cập nhật này.
* Flush (P): Xoá P khỏi bảng trang bận.
* Commit hoặc Abort: Xóa Ti khỏi danh sách giao dịch.

Vào cuối giai đoạn tiền phân tích này, mỗi trang trong bảng trang bận có ít nhất một bản ghi cập nhật trong Log sau khi ghi lưu flush cuối cùng cho trang. Vì vậy, trang cần phải được cập nhật trong giai đoạn làm lại. Nói như thế ngược lại: Giai đoạn tiền phân tích tránh làm lại bất kỳ bản ghi cập nhật nào cho trang P nếu bản cập nhật cuối cùng của P trước bản ghi flush(P). Thông thường, người ta mong đợi nhiều bản ghi cập nhật để thỏa mãn giá trị  này, do đó giai đoạn tiền phân tích này tránh được vô dụng trang nạp trong quá trình làm lại và do đó tăng tốc khởi động lại.

Bảng trang bận cũng cung cấp hướng dẫn về thời điểm một trang cần được tìm nạp. Mỗi trang trong bảng trang bận cần được đọc trong quá trình khởi động lại, vì có ít nhất một bản ghi cập nhật trong Log đi kèm với bản ghi flush cuối cùng của trang. Vì bảng trang bận có chứa LSN của bản cập nhật cho mỗi trang, thuật toán khởi động lại có thể tìm nạp trước các trang theo thứ tự tăng dần của LSN cũ nhất, do đó các trang sẽ xuất hiện trong bộ nhớ cache theo thứ tự chúng cần bằng cách quét lại.

Thuật toán khởi động lại mô tả trong phần này được gọi là ARIES, và được phát triển bởi C. Mohan và các đồng nghiệp của ông tại IBM. Sự hiểu biết quan trọng nhất là giá trị của lịch sử từ điểm kiểm tra trước khi áp dụng, do đó khi kết thúc quá trình làm lại, Log và cơ sở dữ liệu đều nhất quán. Điều này giúp bạn dễ dàng thấy rằng thuật toán khởi động lại là chính xác và cho phép lập luận phức tạp dẫn đến các tối ưu hóa như việc nối các bản ghi lại và sử dụng bảng trang bận để giảm tải trang trong quá trình khởi động lại. ARIES bao gồm các tính chất khác không được mô tả ở đây, chẳng hạn như kiểm tra các điểm kiểm soát trong quá trình khởi động lại, xử lý giao dịch lồng nhau, các hành động cấp cao lồng nhau và cập nhật các cấu trúc chỉ mục.

## Kỹ thuật người dùng (User Techniques)

Mặc dù hầu hết các tối ưu hóa phục hồi hệ thống chỉ có sẵn cho người triển khai hệ thống cơ sở dữ liệu, có một số điều mà người dùng có thể làm để tăng tốc độ khởi động lại và do đó cải thiện tính khả dụng, chẳng hạn như sau:
* Nếu tần số kiểm tra có thể được điều chỉnh bởi người quản trị hệ thống, thì việc tăng nó sẽ làm giảm số lượng công việc cần thiết khi khởi động lại. Chạy điểm chuẩn với các tần số điểm kiểm tra khác nhau sẽ giúp xác định chi phí sử dụng điểm kiểm tra thường xuyên để cải thiện thời gian hồi phục. Tùy thuộc vào chi phí của thuật toán kiểm tra được sử dụng, điều này có thể yêu cầu mua thêm phần cứng, để đảm bảo hiệu suất giao dịch thỏa đáng trong khi checkpointing đang được thực hiện.
* Phân vùng cơ sở dữ liệu trên nhiều đĩa. Thuật toán khởi động lại thường là I/O-bound. Mặc dù nó đọc Log tuần tự (nhanh), nó truy cập cơ sở dữ liệu một cách ngẫu nhiên. Lan truyền cơ sở dữ liệu qua nhiều đĩa làm tăng băng thông đĩa hiệu quả và có thể làm giảm thời gian khởi động lại.
* Tăng tài nguyên hệ thống có sẵn cho chương trình khởi động lại. Sau khi hệ điều hành phục hồi từ thất bại, nó chạy các tập lệnh khôi phục bao gồm gọi thuật toán khởi động lại cơ sở dữ liệu. Nó có thể không phân bổ tài nguyên bộ nhớ chính tối ưu, nếu còn để mặc định riêng của mình. Thuật toán khởi động lại có lợi từ bộ nhớ cache khổng lồ, để giảm I/O. Nếu phân bổ bộ nhớ có thể được kiểm soát, điều chỉnh nó có thể giúp giảm thời gian khởi động lại.

-----

-----
Tài liệu dịch và tham khảo - The book: 09_Philip A. Bernstein, Eric Newcomer. Principles of Transaction Processing (2nd edition). Morgan Kaufmann, 2009 - Chapter 7: System Recovery