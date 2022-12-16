Bài viết này thảo luận về một số phương pháp bảo vệ và backup dữ liệu cá nhân hay công ty quan trọng (dữ liệu nhạy cảm) trên máy tính của bạn nhằm tránh trường hợp các kẻ xâm nhập có thể đọc được dữ liệu nhạy cảm cũng như khi bạn cho người thân mượn thiết bị nhưng không muốn họ xem được một số dữ liệu nhạy cảm trên máy tính của bạn. Các phương pháp chuyên sâu để triển khai thuật toán mã hóa mình sẽ không đề cập trong bài viết này. Nếu bài viết có thiếu sót mong các bạn đóng góp phía bên dưới để bài viết được hoàn thiện hơn.

Có nhiều cách bảo vệ dữ liệu trên máy tính, những người hời hợt thường chọn những cách hời hợt như đặt mật khẩu Windows, đặt dữ liệu quan trọng trong nhiều folder con để ngăn những người thân tò mò. Người cẩn thận hơn thì tạo nhiều account Windows cho nhiều người dùng, dùng BitLocker để mã hóa ổ đĩa. Nhưng những cách đó vẫn không bảo vệ được bạn trong lúc sử dụng máy tính bằng chính tài khoản Windows đã được xác thực đại diện cho chủ sở hữu máy tính đó chính là bạn. Bạn vẫn có khả năng bị các malware tấn công và mã hóa hết dữ liệu. Có nhiều người sẽ nói rằng chỉ cần backup dữ liệu lên cloud như OneDrive, Google Drive sẽ an toàn. Nhưng bạn vẫn có nguy cơ bị tấn công lấy tài khoản đăng nhập vào các dịch vụ lưu trữ đó. Nhưng đấy chỉ là thảo luận đến vấn đề mất dữ liệu, ngoài ra chúng ta còn có nguy cơ bị đọc dữ liệu nhạy cảm và bị phát tán những dữ liệu đó ra bên ngoài. Việc bảo vệ dữ liệu trên máy tính bằng mật khẩu dựa vào phần mềm của bên thứ ba cũng không khả thi khi mà dữ liệu chỉ được bảo vệ trên máy tính còn dữ liệu dự phòng trên cloud thì không và vẫn có nguy cơ bị truy cập. Chung quy lại việc lưu trữ dữ liệu ở dạng "readable" gây ra nhiều nguy cơ bị truy cập khi chúng ta lưu trữ nó ở nhiều nơi khác nhau mặc dù càng tạo ra nhiều bản backup càng an toàn.

Giải pháp cho các vấn đề đó là chúng ta có thể chủ động mã hóa dữ liệu trước khi lưu trữ bằng các thuật toán mã hóa riêng sẽ giúp bảo vệ dữ liệu của chúng ta khỏi việc bị truy cập và sử dụng bởi một bên thứ ba. Do đó mình giới thiệu một số khái niệm và công cụ cho phương pháp này.

## 1. Phân vùng mã hóa dữ liệu
Có 2 loại chia phân vùng khi mã hóa dữ liệu là **full volume** và **adaptive volume**:
* **Full volume** là khi chúng ta chia phân vùng để chứa dữ liệu mã hóa với một dung lượng tối đa cho trước (fixed size), thường là sẽ mã hóa dữ liệu của một ổ đĩa hay định nghĩa một tệp tin để lưu trữ dữ liệu với dung lượng tối đa cho trước. Ưu điểm khi sử dụng full volume là hạn chế nguy cơ kẻ xâm nhập có thể chỉnh sửa một phần nhỏ của dữ liệu được mã hóa do nó mã hóa toàn bộ phân vùng và ngăn truy cập vào một phần nhỏ dữ liệu. Nhược điểm là khi khởi tạo phân vùng tốn một khoảng thời gian khá lâu nếu dung lượng tối đa lớn và khó khăn trong quá trình backup. Một số chương trình sử dụng cách này như là ***LUKS, Veracrypt, Truecrypt*** và ***PLAIN dm-crypt***.
* **Adaptive volume** là việc chia phân vùng không cần định nghĩa trước dữ liệu tối đa, nó sẽ tính toán số dung lượng còn lại và tự động cập nhật dung lượng đối đa tương ứng mỗi khi chúng ta giải mã phân vùng để chỉnh sửa hay thêm bớt dữ liệu. Ưu điểm là khởi tạo phân vùng mã hóa nhanh chóng. Nhược điểm là kẻ xâm nhập có thể sửa đổi vào một phần nhỏ dữ liệu đã mã hóa gây lỗi phần dữ liệu đó mà chúng ta không hay biết. Một số thuật toán mã hóa dữ liệu theo cách này như ***CryFS, gocryptfs*** và ***EncFS***.

Tùy vào nhu cầu và mục đích mà các bạn có thể chọn kiểu phân vùng mã hóa tương ứng. Mình hay sync dữ liệu với cloud nên mình sử dụng adaptive volume.

## 2. Chọn thuật toán mã hóa dữ liệu
Nếu bạn chọn adaptive volume thì có khá nhiều thuật toán hỗ trợ như cryfs, encfs, gocryptfs, cryptomator, securefs, ecryptfs,... Dưới đây là các thông tin cơ bản và hiệu năng của từng thuật toán để các bạn tham khảo:

![image.png](https://images.viblo.asia/8dfd3ebe-8a4f-49a1-ab1d-d6c9a5be0514.png)

![image.png](https://images.viblo.asia/46344abd-20c4-44a4-9f54-a304b24ac7da.png)

![image.png](https://images.viblo.asia/55c603a7-81d9-4878-8640-aa9f60a0e4b7.png)

![image.png](https://images.viblo.asia/7a9d7b63-b9d5-4de0-8a3b-116d854f4523.png)

![image.png](https://images.viblo.asia/0040d4db-27db-404a-a5a0-50a0f3024f7a.png)

*<div align="center">Thông tin của các thuật toán</div>*

![image.png](https://images.viblo.asia/4a858f95-249b-48af-891a-577f6f4af502.png)

*<div align="center">So sánh hiệu năng trên Linux</div>*

![image.png](https://images.viblo.asia/d431c5af-8187-471b-975d-9af8ae2ccf9a.png)

*<div align="center">So sánh hiệu năng trên Windows (**cppcryptfs** là một implement của **gocryptfs** dành cho Windows)</div>*

Mình đã sử dụng một vài thuật toán như **cryptomator**, **securefs**. Ở góc nhìn của một người sử dụng, mình đã gặp lỗi khi mã hóa các video của cryptomator có thể gây ra vấn đề *File not found* nên mình đã ngừng sử dụng nó dù cho team phát triển sẽ sửa chữa vấn đề đó trong bản cập nhật kế tiếp. Với securefs mình gặp một vài vấn đề khi không thể xóa một số folder. Sau cùng mình đã chọn **gocryptfs** và sử dụng phiên bản Windows của nó là **cppcryptfs** để sử dụng.

Nếu sử dụng các thuật toán khác các bạn có thể sử dụng kèm **[SiriKali](https://mhogomchungu.github.io/sirikali/)** như một GUI người dùng để thực hiện các chức năng như tạo, giải mã phân vùng,...

## 3. Hướng dẫn sử dụng cppcryptfs
Sau khi tải cppcryptfs về và chạy các bạn sẽ có giao diện như sau:

![image.png](https://images.viblo.asia/e00e29aa-ffd2-4247-9814-059c39fe8f36.png)

Chúng ta bấm qua tab **Create** tiến hành tạo phân vùng:
* Ở mục **Path** các bạn cần trỏ đến một thư mục trống đã tạo trước để làm phân vùng cho dữ liệu đã được mã hóa
* Mục **Password** và **Repeat** các bạn gõ mật khẩu được dùng để giải mã dữ liệu khi sử dụng
* **Volume name** các bạn gõ tên của ổ đĩa ảo khi phân vùng đã được mã hóa
* Các mục khác có thể giữ nguyên

![image.png](https://images.viblo.asia/47f47662-7066-4e3e-9e32-531155caeebf.png)

![image.png](https://images.viblo.asia/2d240e96-2afc-40e6-9e1b-cf06bf3451e9.png)

Sau khi tạo xong chúng ta tiến hành mount phân vùng đó ra ổ đĩa ảo để thao tác với các file.
* Ở tab **Mount** các bạn chọn ổ đĩa muốn mount ra
* Phần **Path** chúng ta trỏ đến thư mục ban nãy đã tạo phân vùng
* **Password** gõ lại mật khẩu đã dùng lúc tạo phân vùng
* Nhấn **Mount** để tạo ổ đĩa ảo

![image.png](https://images.viblo.asia/41472d8f-63f0-4747-863e-ac8895fbf1fa.png)

Chúng ta thấy một ổ đĩa ảo mới được tạo ra, bên trong này chúng ta có thể thao tác với dữ liệu chưa được mã hóa, dữ liệu chúng ta thao tác trong ổ đĩa này sẽ được mã hóa trong phân vùng ban nãy chúng ta đã tạo.

![image.png](https://images.viblo.asia/eb7b3f7d-3696-4fef-86a0-03676e797cb6.png)

![image.png](https://images.viblo.asia/84b101a0-c54e-4e17-a67a-3c87662c471b.png)

![image.png](https://images.viblo.asia/e8283d80-23c8-4d58-9c76-913d04496fc8.png)

## 4. Backup dữ liệu với FreeFileSync
Khi mã hóa như vậy sẽ bảo vệ dữ liệu khỏi việc bị đọc được nhưng không thể tránh khỏi việc phân vùng bị tấn công và các file mã hóa bị sửa đổi. Do đó chúng ta nên tạo các bản backup dữ liệu đã mã hóa lưu ở những nơi khác cũng như sync lên cloud để restore trong trường hợp cần thiết. Lí do chúng ta backup dữ liệu đã mã hóa vì để bảo vệ dữ liệu không bị đọc được bởi bên thứ ba hoặc khi chúng ta sử dụng những nhà cung cấp mà không đặt nhiều niềm tin vào họ.

Việc backup dữ liệu vào phân vùng khác cũng khá tốn thời gian nếu làm thủ công và với dữ liệu lớn. Do đó chúng ta sử dụng công cụ đặc biệt để chỉ cập nhật các file đã được sửa đổi từ phân vùng gốc sang phân vùng backup. Ở đây mình sử dụng công cụ **FreeFileSync** để làm việc đó.

Sau khi cài đặt FreeFileSync và khởi động chúng ta sẽ có giao diện như thế này:
* Ở mục **Synchronize** chúng ta chọn cách đồng bộ là **Update** để thư mục đích luôn luôn đồng bộ với thư mục gốc (đồng bộ cả việc xóa file)
* Bên dưới chúng ta chọn thư mục gốc và thư mục đích để đồng bộ với nhau

![image.png](https://images.viblo.asia/7bf32e63-6902-45de-9fee-95b9cbeeec03.png)

Sau khi chọn xong chúng ta nhấn nút **Compare** để chương trình quét những file đã được cập nhật, thêm vào hay xóa đi. Sau đó nhấn nút **Synchronize** để tiến hành đồng bộ.

Thế là chúng ta đã có bản backup của dữ liệu đã mã hóa. Vì đã mã hóa nên chỉ có người biết được mật khẩu và thuật toán sử dụng mới có thể giải mã được dữ liệu nên bạn có thể đặt file backup ở nơi nào bạn muốn.

Nếu ngại backup thủ công bạn có thể cài đặt FreeFileSync để backup tự động khi có sự thay đổi với công cụ **RealTimeSync** đi kèm ở [đây](https://freefilesync.org/manual.php?topic=realtimesync).

## 5. Chọn cloud lưu trữ dự phòng
Ngoài việc backup dữ liệu trên phân vùng khác chúng ta có thể backup dữ liệu trên một cloud dự phòng để sử dụng khi cần thiết. Dựa vào phương pháp đồng bộ của từng Cloud Storage Providers mà chúng ta có thể lựa chọn phương pháp mã hóa thích hợp.

Có 2 phương pháp đồng bộ mà một số Cloud Storage Providers phổ biến hỗ trợ:
* **Block level sync**: Đồng bộ ở mức độ block, hỗ trợ cập nhật các block đã thay đổi trong file lên cloud thay vì upload lại cả file khi có sự thay đổi. Một số cloud provider hỗ trợ như Dropbox, OneDrive (bật thủ công).
* **File level sync**: Đồng bộ ở mức độ file, tương tự như tên, chúng sẽ thực hiện upload lại một file khi có sự cập nhật dữ liệu trong file đó. Hầu hết các cloud provider đều hỗ trợ.

Với **block level sync** các bạn có thể sử dụng **full volume** để mã hóa dữ liệu để tăng tính an toàn.

Tham khảo:
* [https://marllus.com/en/technology/2020/06/15/sync-cripto](https://marllus.com/en/technology/2020/06/15/sync-cripto)
* [https://nuetzlich.net/gocryptfs/comparison](https://nuetzlich.net/gocryptfs/comparison)
* [https://help.dropbox.com/installs-integrations/sync-uploads/sync-overview](https://help.dropbox.com/installs-integrations/sync-uploads/sync-overview)