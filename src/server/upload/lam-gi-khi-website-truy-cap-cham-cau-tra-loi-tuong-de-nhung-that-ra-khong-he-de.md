Làm gì khi website truy cập chậm? Câu trả lời tưởng dễ, nhưng thật ra không hề dễ.

Đây là câu hỏi mình được hỏi khi đi phỏng vấn cách đây một năm, lúc đó mình cũng ngu ngơ trả lời là kiểm tra log, resize image… và mình đã đậu phỏng vấn. Hôm nay mình tình cờ đọc một bài trên medium về liên quan tới chủ đề đó. Sau khi một hồi ngẫm nghĩ, mình phát hiện ra câu hỏi này rất hay, có rất nhiều cách trả lời khác nhau. Có thể bạn là backend developer, frontend developer hay full-stack developer, nhưng rất có thể bạn sẽ gặp câu hỏi này khi đi phỏng vấn. Tùy theo góc nhìn của bạn sẽ có câu trả lời khác nhau. Với mỗi cách trả lời của bạn mà nhà tuyển dụng có thể đánh giá được sự hiểu biết của bạn về cách vận hành của website, kinh nghiệm làm việc của bạn.
Hãy tưởng tượng, chúng ta là thầy thuốc, trang web là bệnh nhân và bệnh nhân này có triệu chứng truy cập chậm. Sẽ có rất nhiều nguyên nhân dẫn tới triệu chứng truy cập chậm, và cũng có rất nhiều loại thuốc để chữa trị các nguyên nhân. Tất nhiên, nếu bạn chưa biết nguyên nhân cụ thể mà bốc thuốc cho bệnh nhân là trang web. Thuốc nào cũng đều tốt, bệnh nhân không bổ ngang thì bổ dọc. 😅😅😅 Ý mình là trước tiên muốn trị dứt điểm vấn đề, chúng ta cần phải chuẩn đoán đúng bệnh. Làm cách nào để chuẩn đoán đúng bệnh? Chúng ta cần phải biết cách hoạt động của trang web, sau đó tìm xem công đoạn nào làm cho trong web bị chậm, cuối cùng là đưa ra phương pháp giải quyết. 

Tại sao câu hỏi này lại có thể đánh giá được vốn hiểu biết của bạn về cách vận hành của website? 

Trước tiên mình sẽ đi nói về điều gì sẽ xảy ra khi người dùng nhập URL vào thanh địa chỉ của browser. 

Mỗi domain name trên internet sẽ có một địa chỉ IP duy nhất. IP đó là địa chỉ của server chứa website mà người dùng muốn truy cập. Vd: www.genzLearntechs.com được map với ip: 192.168.32.11
Mỗi mapping giữ domain name với IP được gọi là DNS record

Khi bạn gõ vào thanh địa chỉ của browser:

1. Đầu tiên, browser sẽ đi kiểm tra caches để tìm DNS record. Browser sẽ kiểm tra bốn lớp caches theo thứ tự gần tới xa browser nhất.
    1. Đầu tiền, Browser sẽ chạy DNS query ở browser cache
    2. Nếu DNS query không trả về kết quả, browser sẽ kiểm trả OS cache bằng cách gọi các câu lệnh system như gethostname…
    3. Nếu vẫn không tìm được DNS record nào, browser sẽ giao tiếp với router cache để tìm DNS record.
    4. Nếu vẫn không có kết quả, browser sẽ chuyển qua tìm kiếm trên ISP cache.
2. Nếu URL không tìm thấy trong bốn lớp cache phía trên, DNS server của ISP sẽ khởi tạo DNS query để tìm địa chỉ IP tương ứng với domain name. DNS server sẽ phân giải domain name ra từng level và tìm kiếm tương ứng. Ví dụ với tên miền abc.genzlearntechs.com, DNS server sẽ redirect tới server xử lí domain có đuôi là .com ở level thứ nhất.

Ở đây, .com domain name server sẽ redirect tới genzlearntechs.com ở level thứ hai. genzlearntechs.com  domain name server lại tiếp tục redirect tới abc.genzlearntechs.com ở level thứ ba.
Lúc này server sẽ tìm được DNS record và trả về cho browser

1. Sau khi nhận được địa chỉ IP tương ứng với domain, browser sẽ thiết lập connection với server theo giao thức TCP
2. Khi TCP connection được thiết lập, browser sẽ gửi request lên server
3. Server nhận request, sau đó xử lí và trả response về cho browser. 
4. Browser nhận response trả về, xử lý, hiển thị cho người dùng.



Đây là hình mình kiếm được trên mạng: https://twitter.com/manekinekko/status/1281704000572858375?s=20
![image.png](https://images.viblo.asia/5104e5fb-696d-4aa9-afe9-28cb4c9ad84b.png)

Đây là 6 công đoạn cơ bản khi truy cập website, tuy nhiên trong đó, bước 4, 5, 6 thông thường sẽ làm website truy cập chậm và chúng ta cũng chỉ có thể can thiệp vào các bước đó.

Khi trả lời phỏng vấn, bạn có thể không cần nêu 6 công đoạn trên, nhưng nếu bạn nêu ra được, người tuyển dụng sẽ có cái nhìn khác. Còn họ nhìn như thế nào thì mình chưa biết.

Bây giờ chúng ta đã có cái nhìn tổng quan, giờ cần đánh giá xem công đoạn làm cho trang web bị truy cập chậm.

Các nguyên nhân có thể làm website bị chậm:
* Chỉ chậm đối với user ở khác vùng địa lí
* Chỉ chậm với một số thiết bị như desktop, mobile, tablet
* Toàn bộ các phần của website đều chậm hay chỉ một số module/chức năng chậm?
* Website chỉ bị chậm ở một khoảng thời gian nhất định trong ngày.
* Để biết được lý do cụ thể, chúng ta cần phải phân tích, kiểm tra log, xác định nguyên nhân để có biện pháp tối ưu thích hợp. Khi load giao diện chậm, mình thường sử dụng https://developers.google.com/speed/pagespeed/insights/ để kiểm tra xem phần nào làm cho website bị chậm. Nếu như website bị chậm do việc gọi API quá lâu thì mình sẽ đi kiểm tra log/metric ở backend, DB

### **Frontend load chậm:**

Đầu tiên và quan trọng nhất mà mình nghĩ tất cả developer phải biết đó là khi chạy frontend, chúng ta cần phải bundle code để giảm thiểu kích thước. Giúp cho việc tải trang được nhanh chóng hơn. Bạn có thể dùng webpack, vite hoặc nhiều thư viện khác để bundle code. Thư viện bundle sẽ remove các khoảng trắng, đổi tên biến từ thân thiện tới người dùng thành tên biến đơn giản hơn. Thư viện bundle sẽ xây dựng dependency tree, loại bỏ những phần code không cần thiết, chỉ bundle những phần code có sử dụng... và nhiều công đoạn khác. 

Dựa vào https://developers.google.com/speed/pagespeed/insights/ bạn có thể biết được frontend load chậm vì lí do gì.
Với một số lí do thông dụng như:

Kích thước ảnh quá lớn: Chúng ta có thể giảm kích thước ảnh. Một số phần ảnh chúng ta có thể sử dụng ở dạng thumbnail. Sử dụng một số plugin để nén ảnh. Sử dụng lazy load với ảnh

Load file js/css quá lâu: Chúng ta có thể config webpack để bundle code, loại bỏ những phần không liên quan, chỉ bundle những phần code phụ thuộc, cần dùng tới.

Áp dụng kiến trúc micro frontend

Một số khu vực địa lí bị truy cập chậm: sử dụng CDN

Ngoài ra chúng ta nên sử dụng http2. Mình sẽ có một bài viết mô tả về cách vận hành của http2, lợi điểm của nó so với http1


### **Backend phản hồi lâu:**

Bạn có thể kiểm tra log/metric để biết được API nào/thời điểm nào xử lí lâu. Mình đang làm với AWS, nó cung cấp rất nhiều dịch vụ như cloudwatch để log lại thông tin.

Nếu bạn chỉ sử dụng một machines, bạn có thể thêm thêm nhiều machines và dùng load balancer để phân phối request tới các machines đó. 

Nếu bạn sử dụng các dịch vụ cloud, bạn có thể config để khi số lượng request tới một ngưỡng nào đó có thể auto scaling

Nếu backend chậm do sử dụng các dịch vụ bên thứ ba, chúng ta có thể cache lại các thông tin của bên thứ ba.

Ngoài ra chúng ta có thể sử dụng bộ nhớ cache để hỗ trợ truy vấn một cách nhanh hơn.

Chúng ta cũng cần tối ưu code. Sau quá trình va chạm, mình thấy khá nhiều người không để ý tới vấn đề này, nhưng cái này thật sự rất quan trọng. Chúng ta cần phải tối ưu code, xử lí batch operation thay vì xử lí từng phần đơn lẻ.

### **DB xử lí lâu:**

Chúng ta có thể scaling theo hai hướng horizontally scale hoặc vertically scale

Sử dụng sharing/replicas

Cache data nếu dữ liệu ít thay đổi

Tối ưu câu query. Vấn đề này mình thấy khá nhiều dev gặp phải. Ban đầu mình bước chân vào nghề cũng gặp phải vấn đề này. Lúc đó dự án mình kinh phí còn hạn hẹp, lượng khách hàng còn ít, nên việc tối ưu scale theo chiều ngang hay chiều dọc với DB gần như là không có chi phí.  Lúc đó mình đi tối ưu nhiều query, join bảng, vị trí đặt câu điều kiện join sao cho hợp lí, giảm thiểu thời gian query. Có những lúc mình giảm thời gian query từ đơn vị giây xuống đơn vị miliseconds.

Bên trên là một số cách để xử lý vấn đề trang web truy cập chậm. Tuy nhiên chúng ta nên tìm cách tránh vấn đề xảy ra trước khi nó làm người dùng cảm thấy khó chịu.

Thêm metrics/alarm

Chạy load/performance test

Thêm automation test


Trên đây là những suy nghĩ, cũng như tìm hiểu, tổng hợp được trên mạng. Hi vọng nó có ích với bạn.


# Sau tất cả
**Sau tất cả, mình là [Ryan Cao](https://ryancao.netlify.app/about/)**, là một developer chân chính đang trên đường chém gió. Để ủng hộ mình các bạn có thể upvote bài viết này, follow [Github Caophuc799](https://github.com/Caophuc799) và đón đọc các bài viết trên [Ryan Cao blog](https://ryancao.netlify.app/) chính thức của mình để mình có thêm động lực chia sẽ những bài viết hay, ý nghĩa khác nhé