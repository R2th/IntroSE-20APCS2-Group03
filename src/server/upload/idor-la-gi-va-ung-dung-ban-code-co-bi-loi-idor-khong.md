# Tổng quan
Nếu bạn là một pentester thì có thể đã quen với lỗ hổng bảo mật IDOR. Nhưng nếu bạn là một lập trình viên hay QA thì có thể nó là một khái niệm hay một thuật ngữ mới hoặc khá mơ hồ. Trước khi tiếp tục đọc bài viết này có thể chúng ta đã từng gặp nhưng để hiểu về nó thì có thể không phải tất cả đã có đầy đủ thông tin. Vì vậy, bài viết này mình chia sẻ nhằm hướng tới những bạn chưa có quá nhiều kiến thức bảo mật hay những người không chuyên về bảo mật có thể theo dõi và hiểu về lỗ hổng này. Bài viết tiếp cận theo hướng giải thích đơn giản để mọi người có thể hiểu nên về mặt kỹ thuật hacking có thể không có quá nhiều. Giờ chúng ta cùng tìm hiểu nào...
# IDOR là gì
![](https://images.viblo.asia/a6bf2c80-3a69-4fbb-bc17-8ec6e2ebbe53.png)

**IDOR** là cụm từ viết tắt của **Insecure Direct Object Reference** (Tham chiếu đối tượng trực tiếp không an toàn). Lỗ hổng này nằm trong TOP 10 lỗ hổng nguy hiểm mà OWASP đã đưa ra [IDOR](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References).
Lỗ hổng này xảy ra khi chương trình cho phép người dùng truy cập tài nguyên (dữ liệu, file, thư mục, database..) một cách trực tiếp thông qua dữ liệu do người dùng cung cấp nhưng kém an toàn. Những dữ liệu này thường là những dữ liệu quan trọng, dữ liệu nhạy cảm hoặc không quyền sở hữu của hacker, những dữ liệu public và cho phép bất kì ai truy cập không thuộc phạm vi của lỗ hổng này.

Để dễ hình dung hơn mình sẽ lấy một ví dụ đơn giản như sau. Bạn đi vào cửa hàng sách và được phát cho một chiếc thẻ để mở một ô cửa cất đồ (ví dụ là ô cửa sổ 3). Sau khi mua sách xong bạn ra về và vì đi quá lâu nên bạn nhớ nhầm ô cửa của mình là ô số 13, bạn quẹt thẻ vào ô số 13 và điều bất ngờ xảy ra. Ô số 13 mở ra và bạn phát hiện đồ trong tủ không phải của mình. Vậy là chiếc thẻ kia có thể mở những ô cửa khác ngoài ô cửa số 3. Như vậy là toàn bộ hệ thống tủ đã bị lỗi IDOR vì bạn có thể mở bất kì ô cửa tủ nào.

Tiếp theo là ví dụ đối với website, giả sử https://example.com là một trang web truyền thông xã hội cho phép bạn trò chuyện với những người dùng khác. Và khi đăng ký, bạn nhận thấy rằng ID người dùng của mình trên trang web là 1234 . Trang web này có một trang cho phép bạn xem tất cả tin nhắn của mình với bạn bè. Khi bạn nhấp vào nút “Xem tin nhắn của bạn” trên trang chủ, bạn sẽ được chuyển hướng đến URL này, nơi bạn có thể xem tất cả tin nhắn trò chuyện của mình với bạn bè trên trang web:

https://example.com/messages?user_id=1234

https://example.com/messages?user_id=1235

Bạn có thể xem tin nhắn của người dùng 1233 vì không có kiểm tra danh tính trước khi máy chủ trả về thông tin cá nhân của người dùng. Máy chủ đã không xác minh rằng trên thực tế, bạn là người dùng 1235 hay bạn là kẻ mạo danh. Nó chỉ đơn giản là trả lại thông tin, như bạn đã yêu cầu tới website.

Qua ví dụ trên chắc bạn đã hình dung được lỗi IDOR là gì rồi. Tiếp theo chúng ta tìm hiểu nguyên nhân và cách kiểm tra lỗi IDOR

# Nguyên nhân và hậu quả IDOR
Nguyên nhân sâu xa của lỗ hổng IDOR nằm ở cơ chế phân quyền và kiểm soát truy cập người dùng trên website. Việc website không phân quyền đúng cũng như kiểm soát chặt chẽ việc truy cập tài nguyên của user trên hệ thống dẫn đến việc truy cập trái phép từ kẻ tấn công. Việc sử dụng tham chiếu truy cập tới đối tượng là một cách làm tiện lợi nhưng nếu không phân quyền rõ ràng theo ma trận phân quyền thì việc này lại tiềm ẩn nguy cơ lộ dữ liệu rất nguy hiểm.

IDOR không chỉ cho phép truy cập thông tin trái phép của người dùng khác mà còn có thể cho phép kẻ tấn công thực hiện thay đổi hoặc xóa dữ liệu của người dùng khác. Vì vậy lỗ hổng này có mức độ nguy hiểm rất cao, gây hậu quả nghiêm trọng tới người dùng. Đặc biệt là các hệ thống có dữ liệu quan trọng của người dùng như: mạng xã hội, tài chính - ngân hàng, y tế..

# Cách khai thác lỗi IDOR
Để khai thác lỗ hổng này hoặc kiểm tra xem ứng dụng của mình có bị lỗ hổng IDOR hay không các bạn có thể tham khảo một số phương pháp dưới đây. Các bạn nên tạo các tài khoản có quyền khác nhau (Kiểm tra việc truy cập dữ liệu tới user có quyền cao hơn) và các user có cùng quyền (Kiểm tra truy cập dữ liệu user có cùng quyền)
![](https://images.viblo.asia/edf216cf-deb7-4e2c-b997-7783700a6efc.png)

**Test thủ công:**
- Kiểm tra tất cả các end point của website có truy cập tới tài nguyên, dữ liệu người dùng có dạng truy cập theo Object reference. Một số ví dụ như: `user_id=123`, `id=123`, `code=abc`,`profile_id=123`,`folder_id=111`... Tiếp theo bạn thử thay đổi các giá trị truyền vào là các số khác, chuỗi khác có cùng định dạng để kiểm tra khả năng truy cập vào dữ liệu của user khác. Nếu truy cập được các thông tin nhạy cảm, thông tin quan trọng thì tức là Website đã bị lỗi IDOR.
- Chúng ta có thể thay đổi parameters để thử kiểm tra lỗi IDOR.
    - Ví dụ chúng ta có api truy cập là: `/api/photos?photo_id=<photo id>` thì có thể thử đoán với enpoint tườn tự : `/api/folders?folder_id=<folder id>`
    - Hoặc khi xem danh sách ảnh của chúng ta thì truy cập `/api/MyPictureList`. Chúng ta thử thay đổi thành → `/api/MyPictureList?user_id=<other_user_id>` xem có thể xem được ảnh của user khác
    - Hoặc khi xem một bài post chúng ta truy cập tới: `/api/posts/<post_id>` thì thay vì chỉ thay đổi `post_id` để xem bài viết khác được không, chúng ta có thể kiểm tra thêm `/api/posts/<post_id>/comments/` xem có thể xem được comments của bài viết không

**Test sử dụng tool:**
- Nếu sử dụng burpsuite, các bạn có thể xem bài viết sau để biết cách sử dụng extension Autorize kiểm tra lỗi IDOR [autorize](https://viblo.asia/p/tim-kiem-cac-loi-idor-chua-bao-gio-lai-de-den-the-voi-extension-autorize-gDVK2z02KLj)

# Ngăn chặn lỗi IDOR
Để ngăn chặn lỗi IDOR chúng ta chỉ cần ngăn chặn nguyên nhân gây ra lỗi:

**1. Phân quyền chặt chẽ người dùng**
- Nguyên nhân của lỗi IDOR nằm ở cơ chế phân quyền, vì vậy việc phát triển ứng dụng tuân thủ chặt chẽ việc phân quyền và kiểm tra quyền truy cập tới dữ liệu là điều quan trọng nhất. Luôn kiểm tra quyền truy cập của mỗi người dùng ở tất cả các request. Việc kiểm tra phân quyền luôn luôn cần thực hiện trên phía server, không kiểm tra ở phía client.

**2. Hạn chế tham chiếu trực tiếp tới đối tượng**
- Thay vì tham chiếu trực tiếp tới đối tượng như: `users?user_id=123` chúng ta thực hiện hash giá trị id để thành chuỗi ngẫu nhiên dạng: `users?user_id=F1244AD6A71A9C6C9E08BA6D819D119FBD7944D0`. Tham khảo thêm [tại đây](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html). Việc này không chống hoàn toàn lỗi IDOR nhưng sẽ khó khăn cho hacker có thể khai thác lỗ hổng vì chuỗi hash là rất khó đoán.

**3. Luôn luôn test cẩn thận ứng dụng.**
- Luôn thực hiện kiểm tra đầy đủ ứng dụng theo các phương pháp test mà mình đã chia sẻ ở trên. Luôn bám sát tài liệu về phân quyền để kiểm tra ứng dụng tránh ứng dụng gặp lỗi IDOR.

# Tổng kết
IDOR là một lỗ hổng nguy hiểm có thể đe dọa quyền riêng tư của người dùng và tính toàn vẹn của ứng dụng của bạn. Việc tuân thủ các cơ chế phân quyền chặt chẽ và kiểm tra ứng dụng kĩ sẽ giúp các bạn hạn chế được nguy cơ về lỗ hổng bảo mật IDOR. Mình mong muốn bài viết này sẽ giúp các lập trình viên hay QA có thể hiểu rõ cũng như biết cách kiểm tra lỗ hổng IDOR từ đó hạn chế nguy cơ bảo mật.