Xuất phát từ nhu cầu nho nhỏ của bản thân trong việc học tiếng nhật, khi nói chuyện với bạn bè nhật trong mấy nhóm zatsudan!!! , mình muốn lưu lại những câu hội thoại hay để sau có thể xem và dùng lại. Tất nhiên để mà giỏi được thì phải tự nhớ và dùng thường xuyên.

Cách thủ công mà mình vẫn hay làm đó là lọ mọ lên slack, cuộn từng dòng message, xem câu nào hay và đặc biệt phải là của người nhật mình mới lưu vào (vì câu người nhật nói ra hiển nhiên sẽ là ngon hơn mà :D ). Sau một thời gian xuất hiện vài vấn đề: 
* Nhiều khi vì công việc bận cả ngày, mình không còn thời gian lên đó để xem và góp nhặt được nữa.
* Khi ở trong nhiều nhóm slack thì tham vọng lại càng lớn hơn là muốn tất cả message từ các nhóm đó.
* Bớt được mấy tab trình duyệt, nhìn đỡ rối trên thanh tab :upside_down_face:

Sau cùng, mình cũng tìm được một cách bớt thủ công hơn một chút đó là cho message tự động add từ slack vào google sheet mỗi khi có người nào nhắn trên đó. Tối đến chỉ việc ngồi xem file sheet, dịch ra tiếng việt và học thôi :nerd_face: . Một cách học mà đối với các bạn có vẻ hơi dị, nhưng freestyle mà, biết đâu lại giúp ích cho một ai đó với công việc của họ.

> :warning: Do việc thực hiện sử dụng một phần mềm bên thứ 3, nên cân nhắc kĩ khi sử dụng vì có thể lộ thông tin mật với khách hàng.
 
Việc cài đặt khá đơn giản. Mình sẽ dùng phần mềm Zapier, nó có thể giải quyết những vấn đề trên.

Đây là kết quả cuối cùng của mình.
![](https://images.viblo.asia/9f0de5a6-9eb5-4178-9b6a-4439197740ab.PNG)

 ### Nội dung
1. Đăng kí tài khoản Zapier
2. Tạo file google sheet
3. Đặt tên cho service
4. Thiết lập Slack trong Zapier
5. Thiết lập Google sheet trong Zapier

### Đăng kí tài khoản Zapier
Các bạn vào trang [Zapier](https://zapier.com/home) đăng kí tài khoản.
> :warning: **lưu ý** : ví dụ bạn lựa chọn đăng kí Zapier bằng gmail thì cả 3 tài khoản Google sheet, Slack, Zapier đều phải chung từ một tài khoản gmail.

### Tạo file google sheet
Bạn cần tạo một file google sheet trước gồm các trường mà bạn muốn add từ slack vào. Ví dụ Username, Message,.. Ví dụ mình chỉ muốn biết tên người đã chat và message của người đó thì mình sẽ tạo file sheet như sau:
![](https://images.viblo.asia/01e3c05a-3779-4e53-b356-00343bb4f348.PNG)

```
Tên file : Add message from slack to sheet
Tên sheet : Message_list
Cột Member Name và Message
```
Những thông tin này cần tạo trước để add vào trong zapier.

Tại màn hình Dasboad bạn sẽ lựa chọn connect giữa 2 ứng dụng slack và google sheet như hình dưới :
![](https://images.viblo.asia/3ef1e860-3cfb-4705-a923-bcb5b40d6537.PNG)
Tại phần **When this happens...** của **Slack** và **with this one!** của **google sheet**, sẽ là những action để bạn có thể thao tác giữa 2 ứng dụng này. Có nghĩa là ngoài mục đích của cá nhận mình chỉ muốn tự động thêm message từ slack mỗi khi có người chat vào trong ggSheet, thì các bạn có thể thử với nhiều action khác. Quay lại với mục đích của mình thì sẽ lựa chọn option như bên dưới :
![](https://images.viblo.asia/a46cf1c7-1064-4f67-9536-dd9a33183506.PNG)
Nghĩa là chỉ cần có **message mới hoặc thread của bất kì ai trong bất kì channel nào** xuất hiện trên slack thì sẽ tự động tạo thêm vào trong google sheet.
Sau đó các bạn nhấn chọn `Use Zap`.

### Đặt tên cho service
Tại màn hình mới, góc trên bên trái, các bạn điền tên service của Zapier tùy ý.
![](https://images.viblo.asia/758967e6-94c8-4d90-9e8f-b75cec914e1e.PNG)

### Thiết lập Slack trong Zapier
Tiếp theo, tại phần **Choose Account** các bạn sẽ chọn tài khoản slack và Workspace. Click vào phần selectbox đó và chọn `Add a New Account` sẽ hiện ra popup yêu cầu chọn Workspace ở góc trên bên phải màn hình. 
![](https://images.viblo.asia/bafb9492-4023-447a-8e01-74d870228d63.PNG)
Sau đó nhấn `Allow`. 
![](https://images.viblo.asia/92ee4d87-7ed6-4f69-8c74-f30f6d5ed6f7.PNG)
Nhấn `CONTINUE` -> `CONTINUE`-> `TEST & CONTINUE` (chỉ là test xem đã connect tới slack chưa, skip cũng dc)

### Thiết lập Google sheet trong Zapier
Tiếp theo, tại phần **Choose Account** các bạn chọn tài khoản google sheet (lưu ý là chọn tài khoản mà đã đăng kí Zapier và slack nhé). Và chọn `CONTINUE`.
![](https://images.viblo.asia/301e800e-97df-416e-a7fa-a98dade84620.PNG)

Sau đó, tại mục **Customize Spreadsheet Row** chọn folder chứa file, tên file, tên sheet, tên các cột (tên các cột sẽ được hiển thị sau khi bạn chọn tên sheet). Chính là thông tin file sheet bên trên mình có nói phải tạo trước. (Thực ra ko cần tạo trước cũng dc, các bạn sẽ mất thêm vài thao tác đồng bộ :laughing:)
![](https://images.viblo.asia/d1dacc83-d459-4a72-9815-c4cda64052c3.PNG)

Ở mục Member Name và Message (xin nhắc lại đây là tên cột trong file sheet mình đặt nhé), các bạn sẽ có nhiều lựa chọn về thông tin muốn push vào cột đó trong sheet. Nó sẽ có ví dụ ngay mỗi lựa chọn. Sau đó nhấn `CONTINUE`-> `CONTINUE`-> `TEST & CONTINUE` (chỉ là test xem đã connect tới ggSheet chưa bằng việc sẽ thử gửi data mẫu, skip cũng dc).

Lúc này, bạn cần ON service này lên, có thể bằng nhiều cách. Một là sau khi **TEST & CONTINUE** sẽ có hoặc ko test thì sẽ có thông báo ON như bên dưới.
![](https://images.viblo.asia/890511cb-878b-4e75-ae08-723fbdcdeab6.PNG)
hoặc góc trên bên phải như hình bên .
![](https://images.viblo.asia/696521eb-3789-4cba-9b4b-c8383e421e15.PNG)

Bước cuối cùng, quay lại slack, di chuột đến một tin nhắn trước đó chọn vào biểu tượng 3 chấm dọc như hình dưới và chọn **Push to Zapier... Zapier**
![](https://images.viblo.asia/4236a5ff-839e-48c1-a883-fd2ac7c97876.PNG)

Âu kây, vậy là đã xong. Các bạn thử chat trên slack và kiểm tra sheet nhé. Mình xin nhắc lại là, có rất nhiều lựa chọn cả về ứng dụng lẫn action trên đó các bạn có thể thử.

Rất mong nhận được sự đóng góp ý kiến từ các bạn. Mình xin cảm ơn.

Tham khảo : https://slack.com/intl/ja-jp/slack-tips/add-slack-messages-to-google-sheets