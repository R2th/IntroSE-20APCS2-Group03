Ở phần trước, chúng ta đã nói về [Trình quản lý khôi phục cơ sở dữ liệu và Thuật toán shadow-paging](https://viblo.asia/p/system-recovery-trinh-quan-ly-khoi-phuc-co-so-du-lieu-va-thuat-toan-shadow-paging-vyDZODGPlwj). Tiếp theo, bây giờ ta sẽ bàn về các Thuật toán phục hồi CSDL dựa trên LOG. Bắt đầu thôi!
## Các thuật toán phục hồi CSDL dựa trên log
Logging là kỹ thuật phổ biến nhất để quản lý phục hồi. Các bản ghi Log ghi lại các thao tác viết, cam kết, hủy bỏ của tất cả các giao dịch, hoạt động.

### Thực hiện cam kết
Xử lý hoạt động cam kết, trình quản lý khôi phục thêm các bản ghi cam kết vào cuối log và giải phóng nó ra. Trình quản lý được thiết kế sao cho nó không thừa nhận hoạt động tuôn ra cho đến khi tất cả các trang Log trong bộ nhớ bao gồm cả các trang Log đã được ghi lên đĩa và đĩa đã thừa nhận rằng đĩa đã ghi thành công. Tại thời điểm này, giao dịch đã được cam kết và người quản lý có thể thừa nhận điều này với người gọi giao dịch.

Vì tất cả bản ghi đều cập nhật trước khi tiến hành cam kết do đó trình quản lý khôi pphục đảm bảo rằng tất cả các bản cập nhật cuả giao dịch được lưu trữ ổn định, do đó nó đảm bảo nguyên tắc “force at commit” được thoả mãn.  Nó không quan trọng cho dù các trang đã được đổ vào CSDL ổn định hay chưa. Các bản cập nhật nằm trong bản ghi và bản ghi ở trong trạng thái ổn định đủ để đáp ứng quy tắc.

Xóa bản ghi để thực hiện giao dịch là một hoạt động tiềm ẩn. Nếu đĩa lưu bản ghi có thể thực hiện tuần tự K lần ghi đĩa mỗi giây, thì K là số lượng giao dịch thực hiện lớn nhất mỗi giây cho toàn hệ thống. Con số này quá nhỏ đối với các hệ thống hiệu suất cao. Đây đặc biệt là một điều phiền toái khi các trang Log thường không đầy đủ khi flush được gọi, vì vậy, toàn bộ bang thông của đĩa không được sử dụng hết. Điểm chú ý này có thể tạo ra cơ hội để cải thiện hiệu suất.

Một cách phổ biến để giảm bớt nguy cơ này là một sự tối ưu hóa được gọi là cam kết nhóm. Sauk hi một bản ghi cam kết được thêm vào, trình quản lý sẽ tạo một độ trễ ảo trước khi giải phóng các trang, nó có thể là 1/K, giống thế, một khoảng thời gian rất nhỏ vài mili giây. Trong thời gian đó, nếu có các giao dịch khác đang chạy có thể thêm các bản ghi vào cuối. – cập nhật, cam kết, hủy bản ghi. Nếu hệ thống đang bận thì các trang Log có thẻ điền vào và khi người quản lý khôi phục, nó kết thúc một trang đầy đủ. Do đó, mỗi lần giải phóng trên Log có thể thực hiện nhiều giao dịch và trình quản lý sẽ nhận được toàn bộ giá trị băng thông đĩa. Nếu hệ thống không bận, các điều trên là không quan trọng, không cần phải tất cả bang thông đĩa cần thiết hỗ trợ giao dịch. 

### Thực hiện hủy bỏ

Để xử lý thao tác hủy bỏ, người quản lí phải hoàn tác các cập nhật của bất kỳ trang CSDL nào được cập nhật bởi giao dịch. Việc này được thực hiện bằng cách truy xuất thông qua các bản ghi Log của giao dịch, bắt đầu từ bản ghi cuối cùng và cài đặt trước hình ảnh của mỗi trang đã được cập nhật bởi giao dịch.

Việc tìm kiếm tuần tự Log cho các bản ghi cập nhật là không hiệu quả. Để tránh điều này, người quản lý đã dung một danh sách liên kết của tất cả các bản ghi cập nhật của giao dịch trong Log. Tiêu đề của danh sách là một mô tả giao dịch, là một CTDL mô tả từng giao dịch mà nó biết. Bộ mô tả bao gồm một con trỏ tới bản ghi Log cuối cùng được ghi bởi giao dịch. Mỗi bản ghi cập nhật trong Log chứa một con trỏ tới bản ghi cập nhật trước đó được viết cùng một giao dịch có thể được quét.

Duy trì danh sách thật dễ. Khi một giao dịch ghi một bản cập nhật vào Log, nó bao gồm một backpointer trỏ tới bản ghi cập nhật trước đó và rồi cập nhật mô tả giao dịch để trỏ con trỏ tới bản ghi cập nhật mới đang ở cuối log. (Cấu trúc dữ liệu hỗ trợ việc hủy bỏ một tiến trình. Bắt đầu từ mô tả giao dịch, tất cả các bản ghi cập nhật có thể được quét.)

![](https://images.viblo.asia/59f5c679-3b05-4133-9cc6-53c7a50dc313.PNG)

Những vấn đề: Hệ thống phải đảm bảo rằng nó không giải phóng một trang bận từ bộ nhớ cache vào CSDL ổn định trừ khi tất cả các bản ghi cập nhật mô tả các cập nhật cho trang đó do các giao dịch không cam kết đã được ghi đè lên Log. Để làm điều này, nó cần một sự trợ giúp từ bộ quản lý bộ nhớ cache.

Chúng ta cần thêm một trường để mô tả bộ nhớ cache của mỗi khe bộ nhớ cache. Trường này chỉ ra trang Log mà chúng ta cần phải lo lắng về việc thực thi giao thức Log ghi trước. Nghĩa là nó chứa địa chỉ trang Log có chứa bản ghi cập nhật mô tả bản cập nhật cuối cùng của trang khe nhớ cache này. Hãy gọi đây là địa chỉ trang Log phụ thuộc (Không có thuật ngữ chuẩn). Mỗi khi trang CSDL P được cập nhật để trỏ đến trang có chứa bản ghi Log cập nhật. Trước khi trình quản lý bộ nhớ cache giải phóng một cache slot, nó phải kiểm tra xem trang Log phụ thuộc không nằm trong bộ nhớ cache và bận. Nếu có thì trang Log phụ thuộc phải được giải phóng trước và chắc chắn việc ghi tiêu đề log phải được thỏa mãn.

Mặc dù bộ quản lý bộ nhớ cache phải kiểm tra địa chỉ trang Log phụ thuộc mỗi khi nó giải phóng một trang từ bộ nhớ cache, điều này hiếm khi tạo ra một phần phụ bộ nhớ cache của trang Log. Lý do là: Log là một tập tin tuần tự. Ngay sau khi một trang Log đầy, người quản lý Log thông báo cho người quản lý bộ nhớ cache để giải phóng nó ra. Bởi thời gian người quản lý bộ nhớ cache quyết định dọn dẹp một trang cơ sở dữ liệu, rất có thể là trang cơ sở dữ liệu đã được ổn định trong bộ nhớ cache một lúc kể từ khi nó được cập nhật lần cuối. Ví dụ: thuật toán thay thế bộ nhớ cache thông báo rằng trang này chưa được truy cập gần đây và do đó quyết định thay thế nó. Vì trang này chưa được truy cập gần đây nên rất có thể trang Log phụ thuộc đã bị xóa sạch. Như chúng ta sẽ thấy trong giây lát, thậm chí các trang nóng cuối cùng cũng phải được làm sáng tỏ. Vì một trang nóng được cập nhật thường xuyên, nó có thể có bản ghi cập nhật ở đuôi của Log. Vì vậy, việc làm nóng một trang nóng có thể bị trì hoãn cho tới khi trang Log phụ thuộc của nó bị giải phóng.

### Thực hiện việc khởi động lại

Để thực hiện khởi động lại, người quản lý khôi phục sẽ quét Log để tìm ra các giao dịch cần phải hủy bỏ và những cập nhật cần phải được làm lại. Có nhiều thuật toán phức tạp khác nhau đang được sử dụng, chúng tôi sẽ bắt đầu với một thuật toán đơn giản và tối ưu hóa nó. 
Tất cả các thuật toán khởi động lại phụ thuộc vào trình quản lý phục hồi để thực hiện các hoạt động kiểm tra định kỳ, đồng bộ hóa trạng thái của Log với trạng thái của cơ sở dữ liệu ổn định. Thuật toán điểm kiểm tra đơn giản làm như sau:
1. Nó ngừng chấp nhận bất kỳ hoạt động cập nhật, cam kết và hủy bỏ mới nào. Nó đợi cho đến khi tất cả các hoạt động cập nhật, hoạt động hủy bỏ kết thúc.
2. Nó tạo một danh sách tất cả các hành động giao dịch với mỗi con trỏ của giao dịch trỏ tới bản ghi giao dịch cuối cùng.
3. Nó giải phóng tất cả các trang bận trong bộ nhớ cache.
4. Nó viết một bản ghi checkpoint vào Log, trong đó bao gồm danh sách các giao dịch đang hoạt động và các dấu hiệu log.
5. Nó tiếp tục chấp nhận các hoạt động cập nhật, cam kết và hủy bỏ mới

Tại thời điểm này, trạng thái cơ sở dữ liệu ổn định là chính xác phù hợp với trạng thái của Log. Chúng ta sẽ giải thích một thuật toán checkpointing hiệu quả hơn trong một thời điểm, nhưng bây giờ, hãy giả sử chúng ta đang sử dụng một thuật toán này.

Thuật toán khởi động lại quét các bản ghi về phía trước và xử lý đầy đủ từng bản ghi Log trước khi tiếp tục. Mục đích của nó là làm lại tất cả các cập nhật đã thực hiện sau khi kiểm tra cuối cùng và sau đó để hoàn tác những cái mà không cam kết. Nó bắt đầu tại điểm kiểm tra cuối cùng. Không cần phải nhìn vào các bản ghi log trước điểm cuối cùng, bởi vì các hiệu ứng của chúng đã được ghi lại đầy đủ trong cơ sở dữ liệu ổn định (xem hình 7.18). Thuật toán khởi động lại duy trì danh sách các giao dịch cam kết và hủy bỏ, ban đầu có sản phẩm nào; và danh sách các giao dịch đang hoạt động, được khởi tạo từ bản ghi checkpoint cuối cùng. Khi thuật toán khởi động lại gặp một bản ghi mới, nó thực hiện như sau:

![](https://images.viblo.asia/b70bd114-c0d8-49b2-9b30-9e0e82de3859.PNG)

* Nếu bản ghi Log là một bản ghi cập nhật, thì nó sẽ ghi lại hình ảnh sau khi cập nhật vào bộ nhớ cache, và nó sẽ thêm số nhận dạng giao dịch vào danh sách đang hoạt động nếu nó chưa có. Lưu ý rằng ngay cả khi cập nhật đã có trong cơ sở dữ liệu ổn định, không có hại trong việc ghi lại hình ảnh sau khi, bởi vì sau khi hình ảnh có chứa một hình ảnh toàn bộ trang. (Hãy nhớ giả định đơn giản của chúng tôi rằng mỗi bản cập nhật viết một trang toàn bộ.) Vì vậy, lúc tồi tệ nhất, nó chỉ làm lại công việc không cần thiết.
* Nếu bản ghi Log là một bản ghi cam kết, nó sẽ thêm giao dịch vào danh sách cam kết của nó và loại bỏ nó khỏi danh sách đang hoạt động.
* Nếu bản ghi Log là một bản ghi hủy bỏ, nó sẽ hoàn tác tất cả các bản cập nhật của giao dịch theo cách tương tự như nó thường xuyên xử lý hủy bỏ. Ngoài ra, nó thêm các giao dịch vào danh sách hủy bỏ của nó và loại bỏ nó từ danh sách hoạt động.

Khi đến cuối Log, nó đã làm lại tất cả các bản cập nhật của các giao dịch cam kết và các hoạt động giao dịch, và xóa bỏ các hiệu ứng của bất kỳ giao dịch bị hủy bỏ. Tại thời điểm này, danh sách hoạt động chứa bất kỳ giao dịch nào bắt đầu chạy trước khi thất bại nhưng không cam kết hoặc hủy bỏ trước khi thất bại. (Lưu ý rằng vì danh sách hoạt động đã được khởi tạo từ bản ghi kiểm tra cuối cùng, điều này bao gồm các giao dịch đã hoạt động tại điểm kiểm tra cuối cùng nhưng sau đó không cam kết hoặc hủy bỏ.) Các giao dịch này không thể tiếp tục chạy vì mất trạng thái bộ nhớ trong hệ thống lỗi, do đó, thuật toán khởi động lại cũng hủy bỏ chúng. Bây giờ hệ thống đã sẵn sàng để xử lý các giao dịch mới, vì trạng thái kết hợp của bộ nhớ cache và cơ sở dữ liệu ổn định bao gồm tất cả các cập nhật đã cam kết và không bị hủy bỏ.

Miễn là thuật toán khởi động lại đang chạy, người dùng không thể chạy các giao dịch. Do đó, điều quan trọng là tối ưu hóa nó để giảm thiểu thời gian chạy và do đó tối đa hóa tính sẵn sàng của hệ thống. Những tối ưu hoá này là chủ đề của phần tiếp theo.

-----

Rồi, đến đây thôi. Phần tiếp theo ta sẽ nói về việc tăng tốc khởi động lại trong thuật toán dựa trên bản ghi cơ sở.

-----
Tài liệu dịch và tham khảo - The book: 09_Philip A. Bernstein, Eric Newcomer. Principles of Transaction Processing (2nd edition). Morgan Kaufmann, 2009 - Chapter 7: System Recovery