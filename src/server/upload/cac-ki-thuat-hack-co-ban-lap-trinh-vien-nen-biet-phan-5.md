## Part 1-4
[Part 1](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-1-gDVK2BvrKLj) - [Part 2](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-2-4dbZN92gKYM) - [Part 3](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-3-bWrZnWQ9lxw) - [Part 4](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-4-GrLZDJon5k0)
## Part 5
### Denial of service attacks
Tấn công từ chối dịch vụ, viết tắt là DoS, nâng cấp một chút thì thành DDoS (Distributed Denial of Service - tấn công từ chối dịch vụ phân tán), cái này thì ae làm dịch vụ web chả lạ gì rồi. Dễ hiểu thì nó là kiểu tấn công nhắm làm người dùng không thể lấy được tài nguyên từ server dịch vụ.

Có nhiều loại, như gửi dữ liệu lỗi làm chết server, bóp băng thông, làm quá tải server với những thông tin rác dẫn đến phản hồi chậm,...

Việc này không chỉ giới hạn ở dữ liệu hạy băng thông, thâm trí việc tác động vật lý đến phần cứng, hay thực thi malware gây lỗi, làm quá tải tài nguyên bằng cách tải lên một đống ảnh dẫn đến server hết dung lượng,... cũng có thể được coi là DDoS.

Dùng từ chuyên ngành thì các bạn có thể tìm hiểu về SYN Flood, UDP Flood, Smurf Attack, Slowloris,... Nhưng như đã nói ở phần 1 và các phần khác, đây là bài viết tổng hợp, tôi cũng không phải chuyên gia nên sẽ không nói kỹ về những điều này ở đây, có thể sẽ vào một bài khác vào thời gian nào đó =))
#### Phòng chống
Nói chung thì việc này cũng khó khăn, với kinh nghiệm làm việc trực tiếp từ trước đến nay thì tôi cũng chỉ biết được việc phát hiện lưu lượng truy vấn bất thường từ một IP nào đó rồi tiến hành chặn, hoặc yêu cầu xác thực mới được dùng tiếp, chứ cũng không biết còn cách gì khác không. Các cách dưới đây là tôi lấy từ trang [hacksplaining](https://www.hacksplaining.com/prevention/denial-of-service-attacks), nhưng thấy cũng có vẻ chung chung lắm
##### 1. Dùng CDN cho ảnh, CSS và các tài nguyên khác
##### 2. Cache lại nhưng thông tin thường truy xuất vào bộ nhớ đệm để giảm thiểu truy vấn Database
##### 3. Cache các tài nguyên hiếm thay đổi để trình duyệt không phải load nhiều
##### 4. Executing long-running processes (like accessing APIs or sending emails) in an asynchronous job queue, rather than in the web-process itself.
##### 5. Automating web-server deployment
##### 6. Chia các ứng dụng phức tạp thành các service con
##### 7. Thêm web-page analytics để phát hiện các trường hợp truy vấn bất thường


### Email spoofing
Giả mạo email, tiêu biểu nhất là "phishing", giả mạo một trang uy tín nào đó, báo rằng tài khoản của bạn có vấn đề, yêu cầu thay đổi mật khẩu hoặc cung cấp thông tin xác thực, người dùng làm thì thì xác cmn định (╯°□°）╯︵ ┻━┻

![](https://images.viblo.asia/b9860670-fba0-4aab-a1cd-484810c07794.PNG)

Nghe thấy giống mấy trò lừa đảo, giả mạo cơ quan chức năng không? Nó cũng là một dạng hacking đấy, gọi là Human Hacking.

#### Phòng chống
##### 1. Dùng Sender Policy Framework (SPF): nêu rõ máy chủ nào được phép gửi email từ miền của bạn
##### 2. Dùng Domain Key Identified Mail (DKIM): Chứng minh email hợp lệ và chưa bị sửa đổi

Cơ mà phòng chống vậy mà người dùng vẫn bấm link thì xác định là cái nịt cũng chưa chắc đã còn =))

Nhắc thêm cho ae, không phải chỉ có gà mới bị đâu nhé, tôi có đưa em cùng ngành, bị móc mất cái IPhone, tối về thì thấy có mail giống của Táo bảo tài khoản có truy cập bất thường, bấm link để kiểm tra, nó bấm thật rồi đăng nhập thật, rồi mất luôn cái IMây, đến lúc hoảng hồn tỉnh lại, thấy cái domain sai sai thì mọi sự đã rồi...

### Malvertising - Quảng cáo độc hại
Mọi người hay bảo truy cập mấy trang không lành mạnh thì dễ nhiễm virus, nó phần lớn là do cái thứ này, thậm trí những trang lành mạnh đôi khi cũng bị, thậm trí không cần người dùng click vào quảng cáo vẫn bị, thậm trí còn không thấy có một dấu hiệu nào. Điều này được thực hiện bằng cách chèn tập lệnh đặc biệt trong quảng cáo, nó được thực thi ngay khi người dùng xem.

Thậm trí nhưng trang có độ tin cậy cao cũng đôi khi bị. Hacker sẽ bắt đầu với việc tuân thủ nguyên tắc, thiệt lập danh tiếng, rồi khi được nới lỏng giám sát thì mới bắt đầu phát tán mã độc vào quảng cáo. Hoặc khó chơi hơn, khi mã độc được chia thành nhiều đoạn code vô hại và thêm vào nhiều quảng cáo khác nhau, khi người dùng xem, nó sẽ tải một phần về và dần từ build thành mã độc.

#### Phòng chống
##### 1. Làm việc với các mạng quảng cáo có uy tín.
##### 2. Thực hiện thẩm định đối với các đại lý và nhà quảng cáo.
##### 3. Thực hiện chính sách bảo mật nội dung.
##### 4. Sử dụng công cụ báo lỗi client-side.
##### 5. Log lại các URL dẫn ra ngoài trang web.