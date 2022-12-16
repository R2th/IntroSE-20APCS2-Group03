![](https://images.viblo.asia/a9e9dc2b-f2e8-4c47-ad1b-82ed91edcf24.png)

# Lời mở đầu
Với phần lớn người sử dụng máy tính trên toàn thế giới, **Linux** vẫn giống như một thứ gì đó khá là đáng sợ. Họ cho rằng nó rất khó để sử dụng cho công việc thường ngày. Với sự phổ biến và thống trị gần như tuyệt đối của **Microsoft** với hệ điều hành **Windows**, **Linux** vẫn chỉ là một người tí hon đứng trước một gã khổng lồ. Nhưng như vậy không có nghĩa là **Linux** có ít người sử dụng. Người sử dụng hệ điều hành **Linux** đang ngày một gia tăng. Mặc dù với nhiều người sử dụng **Linux** không phải một điều dễ dàng, nhưng phần đông trong số họ vẫn có một ý nghĩ muốn khám phá nó. Ban đầu chỉ là một vài người, rồi dần dần những người này lại phổ biến cho nhiều người khác. Thêm vào đó, một số nhà sản xuất máy tính cũng dần quyết định cài đặt các biến thể của hệ điều hành **Linux** để giảm thiểu chi phí thiết bị. Hiện nay, hàng năm có khoảng 250 triệu chiếc máy tính được bán ra thì trong số đó cũng có khoảng 4,5 triệu (1,8%) chiếc máy tính được cài đặt sẵn hệ điều hành **Linux**.

**Linux** không hề khó sử dụng như mọi người vẫn nghĩ. Thậm chí, hiện tại hệ điều hành **Windows** (với phiên bản mới nhất là Windows 10) cũng đã cập nhật chế độ dòng lệnh **Bash** - một chương trình vốn chỉ được phổ biến trong các hệ thống **Linux** và **UNIX**. Cá nhân mình cũng đã có một thời gian không ngắn sử dụng hệ điều hành **Linux** này, mình sẽ chia sẻ với các bạn một vài thủ thuật nhỏ khi sử dụng các dòng lệnh trên **Linux**. Hi vọng qua bài viết của mình các bạn có thể dễ dàng sử dụng và thao tác nhanh chóng trong cửa sổ dòng lệnh.

# 1. Sử dụng phím Tab để tự động hoàn thành câu lệnh
Khi sử dụng **Linux**, chắc chắn bạn sẽ phải sử dụng đến hệ thống dòng lệnh. Nếu như bạn là người thao tác thường xuyên thì không có gì để nói, nhưng nếu như bạn ít khi sử dụng hệ thống này thì việc nhớ một câu lệnh cũng là khá phức tạp. Nhưng không sao, với phím `Tab` mọi thứ sẽ trở nên nhanh chóng và đơn giản hơn. Bạn chỉ cần gõ một phần của lệnh, hoặc tên file, tên thư mục rồi sau đó gõ `Tab`, và một số gợi ý sẽ xuất hiện cho bạn. Bạn sẽ không cần thiết phải nhớ một số câu lệnh dài dòng nữa.

![](https://images.viblo.asia/d52495d5-e9b6-42aa-a40a-f1e6d2ff2fb2.png)

# 2. Quay trở về thư mục home
Thư mục `home` là một thư mục khá quan trọng trong hệ thống **Linux** và **UNIX**, nó là nơi chứa các tài liệu văn bản, hình ảnh, video ... của người sử dụng. Thông thường khi ta bắt đầu một phiên làm việc với hệ thống dòng lệnh thì ta cũng sẽ bắt đầu tại thư mục này. Và khi ta đang làm việc ở một thư mục khác, tự nhiên ta muốn trở về thư mục `home`. Nếu như bình thường ta có thể gõ đường dẫn đầy đủ của thư mục này. Tuy nhiên ta có một cách đơn giản hơn là sử dụng ký hiệu `~` - được gán cho thư mục `home` để dễ dàng truy xuất.

![](https://images.viblo.asia/263f155b-fa47-433d-a4eb-b27873a86a47.png)

> Có một cách còn nhanh hơn nữa là gõ lệnh `cd` không đi kèm tham số nào, khi đó thư mục làm việc cũng sẽ được chuyển về `home`.

# 3. Thực thi nhiều câu lệnh cùng lúc
Đôi khi có những lúc ta phải thực thi nhiều câu lệnh theo một thứ tự nhất định, và thật mất thời gian khi cứ phải chờ câu lệnh này kết thúc rồi mới được chạy câu lệnh tiếp theo.
Có 2 cách để làm điều này:
- Sử dụng `&&`: Yêu cầu câu lệnh trước phải thực thi thành công thì câu lệnh tiếp theo mới hoạt động được.
- Sử dụng `;`: Các câu lệnh sẽ thực hiện mà không cần quan tâm đến câu lệnh trước đó thực thi như thế nào.

![](https://images.viblo.asia/c1be8c82-c712-4eed-aedf-47d29a979cee.png)

# 4. Sử dụng lại câu lệnh trước đó là một phần của câu lệnh hiện tại
Với cú pháp `!!`, bạn có thể sử dụng lại câu lệnh vừa gõ là một phần của câu lệnh mới hoặc đơn giản là thực thi lại câu lệnh vừa gõ xong.

![](https://images.viblo.asia/3b52c46e-e603-4843-8734-59e42b390c54.png)

# 5. Kết thúc một chương trình đang chạy
Cái này thật ra cũng không có gì phức tạp cho lắm. Bạn chỉ cần nhớ tổ hợp phím `Ctrl + C` là đủ rồi. Mỗi khi một câu lệnh đang ở tình trạng lặp vô hạn, bạn có thể thử tổ hợp phím này để kết thúc nó ngay lập tức.

# 6. Xóa hết nội dung file
Đôi khi một file có nội dung quá dài và không thực sự cần thiết, bạn có thể sử dụng cú pháp `> file_path` để xóa hết nội dung của file đó đi. Tất nhiên có một cách khác là bạn có thể xóa file đó đi rồi tạo lại file mới cùng tên.

![](https://images.viblo.asia/4acf75bd-3d96-4951-8514-026208889cd3.png)

# 7. Sử dụng tùy chọn --help
Mặc dù không phải một quy chuẩn nhưng hầu như toàn bộ các câu lệnh hiện tại trong hệ thống dòng lệnh thường sẽ cung cấp một tùy chọn là `--help` dùng để hướng dẫn hoặc gợi ý cách sử dụng lệnh. Vì vậy nếu như bạn không biết cách sử dụng một lệnh nào đó, có thể thử tùy chọn help để xem hướng dẫn.

![](https://images.viblo.asia/fb5041e4-d715-49a5-81ad-d93edb6b43b7.png)

# 8. Sử dụng less hoặc more để xem nội dung file
Mặc dù `cat` vẫn là câu lệnh phổ biến nhất để xem nội dung của một file, tuy nhiên với một file có dung lượng lớn với hàng trăm nghìn dòng thì cũng rất khó để ta cố cái nhìn tổng quan về file đó hoặc đơn giản là tìm đến phần mà ta quan tâm trong file. Thay vào đó, ta có thể sử dụng `less` hoặc `more` để xem nội dung file, với tùy chọn để phân trang, hiển thị số dòng, tìm kiếm ...

![](https://images.viblo.asia/9930839b-2a2c-4034-8d3f-cbc1ae822bdb.png)

# 9. Đọc file log theo thời gian thực
Một số chương trình trong hệ thống, đặc biệt là các `web server` thường sẽ hay ghi log vào một file khi chương trình vẫn đang chạy. Qua một thời gian dài, số lượng log tương đối nhiều, với tình trạng này, ta có thể sử dụng lệnh `tail -f log_file_path` để có thể xem log ngay khi chương trình ghi lại.

# 10. Tìm kiếm câu lệnh đã từng sử dụng
Bằng việc sử dụng tổ hợp phím `Ctrl + r`, bạn có thể tìm kiếm trong lịch sử các câu lệnh đã từng thực thi một cách nhanh chóng mà chỉ cân nhớ một phần lệnh là đủ.

![](https://images.viblo.asia/0cfe37f4-66cc-4d12-9276-7752f1caa3ca.png)

# 11. Tìm câu lệnh để sử dụng
Bạn có thể sử dụng câu lệnh `apropos key_word` để thử xem trong hệ thống của mình có câu lệnh nào thực thi đúng như mô tả của bạn không.

![](https://images.viblo.asia/fa5a0fd1-050c-4da9-bffc-b2a0514c136f.png)

# 12. Loại bỏ hoàn toàn một file khỏi đĩa cứng
Câu lệnh `rm` chỉ có tác dụng xóa đi liên kết của file bị xóa với root `/`, ta vẫn có thể khôi phục lại được file đó bằng 1 số công cụ phổ biến. Tuy nhiên có trường hợp ta cần phải xóa hoàn toàn một file và không cho phép khôi phục lại.

Để làm được điều này, ta dùng lệnh `shred -zvu file_path`.

# 13. Hiển thị các câu lệnh có sẵn của SHELL
Để có thể biết `SHELL` đang làm việc hỗ trợ những cú pháp lập trình như thế nào, bạn có thể sử dụng lệnh `help` để xem danh sách đó.

![](https://images.viblo.asia/516f61fd-bf12-4f49-807b-b262b5494ebc.png)

# 14. Xem mô tả của manpage cho một từ khóa cụ thể
`Manpage` là một công cụ hữu ích, nhờ nó ta có thể biết được một câu lệnh có thể có những từ khóa như thế nào. Tuy nhiên để có thể biết chính xác ta cần sử dụng câu lệnh gì thì thật không dễ dàng. May mắn thay, ta có thể sử dụng tùy chọn `-k` của lệnh `man` để tìm các manpage có desciption thỏa mãn.

![](https://images.viblo.asia/23510c0f-d869-4bd8-bbb4-62f7a6642038.png)

# 15. Kiểm tra những file chiếm nhiều dung lượng ổ cứng
Một ngày nào đó, bạn phát hiện ra rằng ổ cứng của bạn sắp out-of-space. Bạn không biết cụ thể file nào đang chiếm dụng không gian lưu trữ như vậy. Lúc này bạn có thể sử dụng câu lệnh sau để biết được những file nào đang chiếm dụng ổ cứng nhiều nhất.
> `du -hsx * | sort -rh | head -nx`

![](https://images.viblo.asia/45e9ddb3-54d8-4277-816e-ada839018da9.png)

# Kết luận
Trên đây chỉ là một số câu lệnh cơ bản để giúp chúng ta có thể sử dụng dòng lệnh Linux một cách nhanh chóng và hiệu quả hơn. Một số lệnh là do mình trải nghiệm và phát hiện ra, còn một số là do mình tìm thấy ở một số tài liệu trên mạng. Mình hi vọng các bạn có thể đóng góp thêm các câu lệnh mà các bạn cho là hữu ích bằng cách comment bên dưới bài viết, mình xin cảm ơn ^^
# Tài liệu tham khảo
- https://medium.com/@snk.nitin/linux-commands-and-cool-tricks-8fe6ac855b06
- https://www.tecmint.com/linux-command-line-tricks-and-tips-worth-knowing/
- https://www.makeuseof.com/tag/7-neat-linux-tricks-newbies-need-know/
- https://itsfoss.com/linux-command-tricks/