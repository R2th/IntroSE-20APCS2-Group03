# I. Lý do chúng ta nên sử dụng tường lửa thông minh
Với sự phổ biến ngày càng tăng của các thiết bị kết nối internet trong nhà, chẳng hạn như máy quay web, bộ ổn nhiệt, chuông cửa và hệ thống chiếu sáng - thường được gọi là Internet of Things (IoT) - việc đảm bảo các thiết bị đó hoạt động một cách ổn định và an toàn là một việc vô cùng quan trọng do mạng internet tồn tại rất nhiều mối nguy cơ, đe dọa tiềm ẩn. Khả năng chúng ta bị tấn công là vô cùng cao.  

Một vài số liệu thực tế: 
![](https://images.viblo.asia/02046128-671a-4dd0-8ea9-8b165b10a43b.png)

* 55% số lượng các cuộc tấn công mã độc không bị phát hiện bởi phần mềm diệt virus
* 70% thiết bị có kết nối Internet tồn tại lỗ hổng an ninh
* 75% là tỉ lệ hacker chiếm thành công các thiết bị nối mạng của bạn
* 90% các thiết bị đều chứa thông tin cá nhân

Thông thường, để bảo vệ chúng khỏi các mối đe dọa từ mạng ta cần cài đặt các phần mềm diệt virus, antimalware,.. trên từng thiết bị. Tuy nhiên với số lượng thiết bị kết nối quá nhiều thì sẽ gây mất thời gian cài đặt và không mang lại hiệu quả tốt nhất. Vì thế ta cần cài đặt tường lửa để việc bảo vệ toàn bộ hệ thống mạng dễ dàng và nhanh chóng hơn.

Với tường lửa thông thường ta cần cấu hình, thiết lập các luật để nó có thể ngăn chặn các mối đe dọa, xâm nhập trái phép tới hệ thống mạng. Các gói tin gửi đến sẽ được kiểm tra một số thông tin như là IP, phương thức truyền, cổng,.. nếu thỏa mãn các luật của tường lửa thì nó sẽ vượt qua. Nhưng việc kiểm tra cũng chỉ dừng lại ở phần thông tin, còn phần nội dung gói tin sẽ không được phân tích có thể khiến hệ thống của chúng ta gặp nguy hiểm nếu gói tin chứa các hành động phá hoại. Hơn nữa với tốc độ phát triển của công nghệ, các hacker ngày càng tinh vi hơn việc vượt qua tường lửa là khá dễ dàng. Điều này đòi hỏi ta cũng phải liên tục cập nhập sao cho phù hợp với thời đại. Vậy tường lửa có thể làm như vậy ? Liệu nó có thể tự thay đổi để chống lại được các kiểu tấn công, xâm nhập mới nhất ? 

Với cuộc cách mạng 4.0 hiện nay, trí tuệ nhân tạo AI đang được nghiên cứu phát triển. Vậy tại sao chúng ta không kết hợp tường lửa truyền thống với AI để có thể cho ra một thế hệ tường lửa mới có thể tự nhận thức được các cuộc tấn công và có giải pháp phù hợp để ngăn chặn chúng ? Đó là lý do tường lửa thông minh ra đời

# II. Tổng quan về tường lửa thông minh
## 1. Định nghĩa tường lửa thông minh
"Tường lửa thông minh" là một loại sản phẩm bảo mật đang nổi lên được thiết kế để giúp người dùng bảo vệ tất cả thiết bị được kết nối của họ.

Tường lửa thông minh (Smart Firewall) về cơ bản là tường lửa. Phần "thông minh" của thiết bị là phân tích lưu lượng mạng của bạn theo thời gian thực để xác định mối đe dọa hoặc hoạt động đáng ngờ, chặn chúng và thông báo cho bạn biết về hoạt động.
## 2. Nguyên lý hoạt động của tường lửa thông minh
### a. Cấu tạo 
![](https://images.viblo.asia/25394bf4-014c-4fd4-94af-72cff4230b28.png)

**Hệ thống gồm 3 thành phần:**

* Hệ thống phát hiện xâm nhập (Intrusion Detection System - IDS)
* Hệ thống tính toán thông minh (Intelligent Agent)
* Hệ thống tường lửa (FireWall) 

**Hệ thống phát hiện xâm nhập IDS**

IDS là một hệ thống an ninh giám sát máy tính hệ thống, thiết bị mạng,  mạng lưới giao dịch và phân tích lưu lượng truy cập để đánh giá khả năng có thể bị xâm nhập hoặc hệ thống có bị tấn công hay không

IDS kiểm tra tất cả hoạt động của những thiết bị ra và vào mạng và phát hiện những dấu hiệu bất thường mà có thể dẫn đến một cuộc tấn công mạng

IDS bao gồm các thành phần chính: thành phần thu thập gói tin (information collection), thành phần phân tích gói tin (detection), thành phần phản hồi (response)

**Hệ thống tính toán thông minh**

Trong hệ này sẽ bao gồm các tập luật được sử dụng để chống lại các cuộc tấn công, xâm nhập và một hệ thống chuyên gia được sử dụng để tính toán các phép tính phức tạp

Hệ thống này đóng vai trò quan trọng xem các luật nào cần được thiết lập để chống lại cuộc tấn công hiện thời, các luật nào cần bỏ để có thể tăng thêm hiệu năng cho hệ thống

**Hệ thống tường lửa**

Là tường lửa truyền thống, có chức năng điều khiển các thiết bị mạng để cho phép truyền hoặc chặn các gói tin được gửi đến

### b. Nguyên lý hoạt động

Đầu tiên, khi gói tin được gửi đến IDS có nhiệm vụ kiểm tra xem liệu đó có phải là một cuộc tấn công hay không bằng cách phân tích gói tin. Nếu có dấu hiệu tấn công thì lập tức IDS sẽ đưa ra cảnh báo và gửi dữ liệu gói tin và các thông tin về cuộc tấn công sẽ được chuyển đến hệ thống tính toán để có thể đưa ra giải pháp phù hợp.

Tại hệ thống tính toán, nó sẽ tiến hành phân tích dữ liệu vừa nhận kết hợp với những dữ liệu đã thu thập trước đó trong Rule base và đưa ra thông tin về kiểu tấn công, thời gian bị tấn công, địa chỉ IP của kẻ tấn công  mà hệ thống đang đối diện. Hệ thống tính toán cũng có chức năng xác nhận liệu cảnh báo của IDS có ổn hay không nhờ vào dữ liệu gói tin nó gửi. Sau khi đã phát hiện được cách thức tấn công các luật mới sẽ được tạo ra. Khi cuộc tấn công kết thúc các luật sẽ được hủy để tăng hiệu năng hệ thống. Các logs nhật kí của tường lửa cũng sẽ được gửi lên phần Rule base của hệ thống tính toán để lấy làm dữ liệu cho sau này 

## 3. Ưu, nhược điểm
### a. Ưu điểm

* **Thông minh:** Như đã nói ở trên, ưu điểm lớn nhất và nổi bật nhất của “Smart Firewall” là khác phục được việc không thể đọc và phân tích các gói tin tốt, xấu để có biện pháp giải quyết. Tường lửa thông minh giải quyết rất tốt điều này. Sự hướng tới của tường lửa thông minh là một “hệ thống miễn dịch”, có khả năng phán đoán và giải quyết vấn đề.

* **An toàn:** Tường lửa thông minh sẽ giám sát tất cả các kết nối vào và ra máy tính của bạn, nó theo dõiAn toàn: lưu lượng mạng, truy cập đến và đi vào máy tính của bạn.
⦁	Tin cậy: Sự hướng đến của “Smart firewall” là đảm bảo an toàn cho hệ thống mà không phải sử dụng con người. 
* **Không ngừng phát triển:** Sự thông minh của “Smart Firewall” chính là biết học hỏi và tiến hóa. Nó sẽ không ngừng học hỏi, cập nhập để có thể bắt kịp được những xu hướng hacking mới nhất.
### b. Thách thức 

Tường lửa thông minh là một lĩnh vực mới. Khi bước vào nghiên cứu tường lửa thông minh, là bước vào một lĩnh vực rất mới “Clustering Concept-Drifting Categorical Data”. Việc phân loại dữ liệu chính là thách thức lớn nhất trong phát triển tường lửa thông minh

## 4. So sánh với tường lửa truyền thống

![](https://images.viblo.asia/61fda969-aa25-4f07-a9e5-c022b24f2fff.png)

Smart Firewall là thiết bị dựa trên phần cứng có thể làm tốt việc quản lý nhiều thiết bị hơn là một bức tường lửa phần mềm điển hình. Sự hạn chế lớn nhất của tường lửa thông thường là nó không đủ thông minh như con người để có thể đọc được những loại thông tin và phân tích sự tốt xấu của chúng. Firewall chỉ có thể ngăn chặn sự xâm nhập của các nguồn thông tin không mong muốn nhưng phải xác định rõ các thông số địa chỉ.

Đây chính là sự khác nhau cơ bản nhất của “tường lửa thông minh” và tường lửa thông thường, khi mà “smart firewall” khắc phục được nhược điểm này do nó được sử dụng công nghệ AI. Smart firewall tập trung vào việc phân tích và cảnh báo các nguy hiểm từ khi chúng chưa xảy ra, và đưa ra những giải pháp ngăn chặn phù hợp. Đó chính là tính năng nổi bật nhất và khác biệt rõ nhất so với tường lửa truyền thống, khả năng học hỏi hành vi (Behavior Learning). 

Tường lửa thông minh theo dõi các cuộc giao tiếp giữa máy tính của bạn với các máy tính khác trên Internet và bảo vệ máy tính của bạn khỏi những vấn đề sau:

![](https://images.viblo.asia/229b694e-5937-4b0f-88e3-56eed515f057.png)

Smart Firewall, cung cấp khả năng tự động bảo vệ để chống lại các cuộc tấn công không gian mạng đang tiến triển. Nó là một bức tường lửa tương thích với các thiết bị hiện có, sử dụng các máy tính không được giám sát để cập nhật danh sách các gói mà nó bảo vệ dựa trên thông tin bên ngoài và kinh nghiệm trước đó.

Smart FireWall sẽ liên tục theo dõi bất kỳ lỗi nào có thể xảy ra trong phần mềm. Để so sánh với tường lửa hiện tại, Smart FireWall sẽ chỉ tập trung vào các lĩnh vực cần được bảo vệ nhiều nhất trong khi các bức tường lửa hiện tại bảo vệ toàn bộ hệ thống. Một tính năng khác của Smart FireWall là nó sẽ thực hiện các xu hướng hacking hiện tại, khai thác, và các lỗi phần mềm mới và điều chỉnh máy tính để chuẩn bị cho những mối đe dọa này.

Một ví dụ đơn giản như tính năng tường lửa của Windows giám sát tất cả các thông tin liên lạc đến với máy tính của bạn. Tuy nhiên, Windows Firewall không giám sát các thông tin liên lạc đi từ máy tính của bạn lên Internet. Tuy nhiên “Smart Firewall” theo dõi tất cả các kết nối đến và tất cả các kết nối ra bên ngoài của máy tính. Tính năng Tường lửa thông minh tự động tạo ra các quy tắc của chương trình cho mỗi chương trình bạn chạy.

Cuối cùng một tính năng khác cũng vô cùng quan trọng, đó chính là tự động cập nhập. Với tường lửa thông thường, chúng ta cần kiểm tra cập nhập thường xuyên. Việc làm này đôi khi sẽ gây phiền toái và mất thời gian. Còn với Smart Firewall thì khác, nó sẽ được liện tục cập nhập mà bạn chả cần phải động tay đến.