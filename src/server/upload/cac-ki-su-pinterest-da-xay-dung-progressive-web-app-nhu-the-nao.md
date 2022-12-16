Ý tưởng xây dựng 1 Progressive Web App (viết tắt là PWA) không phải là mới, được Google giới thiệu lần đầu vào năm 2015 với mục đích mang lại thật nhiều lợi ích cho cả người dùng và các nhà phát triển.

Sau nhiều quá trình cố gắng, các engineers Pinterest đã xây dựng thành công Progressive Web App với trải nghiệm người dùng tuyệt vời trong trình duyệt trên mobile.

Và đây là kết quả họ đã đạt được sau khi xây dựng thành công Progressive Web App:

![](https://images.viblo.asia/0d2f2e1a-9aa3-45fe-b0a4-170d9a111a1e.png)

Qua kết quả trên thấy được, thời gian sử dụng ứng dụng đã tăng lên 40%, doanh thu từ quảng cáo đã tăng đến 44%, số lượng click vào quảng cáo đã đạt đến 50%, và số lượng tương tác đã tăng đến 60%.

Trong khi đó ở native app và phiên bản web trên desktop thì tốc độ tăng trưởng thấp hơn rất nhiều.

Từ kết quả trên ta thấy được 1 điều, khi trải nghiệm người dùng tốt sẽ dẫn đến lượng tương tác của người dùng tăng lên, và kéo theo doanh thu cũng tăng theo.

Vậy chúng ta cùng tìm hiểu xem các kĩ sư Pinterest đã xây dựng thành công ứng dụng Progressive Web App lớn nhất thế giới như thế nào nhé.

Trước khi bắt đầu, cùng điểm qua xem Progressive Web App nó là gì đã nhé.
![](https://images.viblo.asia/d7aeb80b-2cba-48f5-b020-eebb4ea22d47.png)

## Progressive Web App là gì?
Đầu tiên mình nhấn mạnh là Progressive Web App không phải là 1 framework hay 1 công nghệ gì mới. Nó là 1 sự kết hợp tốt nhất của web và tốt nhất của ứng dụng.

Nó sẽ giúp cho chức năng trên web tương tự như chức năng trên mobile. Tương tự đến mức mà người dùng khó phân biệt được mình đang dùng trên trình duyệt hay là đang dùng trên native app.

Progressive Web App sẽ làm được những gì?

* Tải nhanh: tốc độ tải dữ liệu cực nhanh, áp dụng cơ chế cache sẽ giúp cho ta có thể xem được dữ liệu khi mà đang offiline.
* Trải nghiệm người dùng tốt: Vì giao diện dùng trên Progressive Web App khá giống với trên native app. Nên sẽ giúp trải nghiệm người dùng tốt hơn. Ví dụ có thể gửi được thông báo, rồi có thể sử dụng quyền truy cập đến thiết bị như native app.

## Tại sao Pinterest quyết định sử dụng Progressive Web App?
Qua dữ liệu thống kê thấy được, 80% tổng số lượng người dùng Pinterest đang sử dụng trình duyệt browser trên mobile thay vì sử dụng ứng dụng native app.

Mặc dù số lượng người dùng download app cũng tăng lên theo ngày nhưng mà cũng có không ít số lượng review không tốt. Đây là 1 ví dụ:
![](https://images.viblo.asia/6ad2982c-d73b-4c37-81fd-7eaa1b41417f.png)
![](https://images.viblo.asia/58d03bfe-5066-4098-affb-e989e0fe56dc.png)
Cách đây 2 năm (năm 2017), bên Pinterest đã tập trung build 1 đội viết lại trang web trên mobile sử dụng Progressive Web App.

Có 2 lí do khiến Pinterest đầu tư rất nhiều vào mobile web.

* **Đầu tiên là vì người dùng**. Progressive Web App sẽ giúp những người có mạng internet tốc độ thấp hay gói dữ liệu hạn chế có khả năng trải nghiệm tốt hơn. Với hơn 1 nửa người dùng không ở US, việc xây dựng 1 mobile web tốt, tốc độ tải trang nhanh, tiết kiệm băng thông sẽ giúp Pinterest dễ truy cập hơn trên toàn cầu, và cuối cùng sẽ giúp trải nghiệm người dùng tốt hơn.
* **Lí do thứ 2 là dựa trên dữ liệu (data-driven)**. Do trải nghiệm người dùng trên native app không được tốt nên có 1 tỉ lệ rất nhỏ người dùng do không authen được nên đã chuyển sang dùng mobile web. Nhưng số lượng người dùng trên native app vẫn lớn hơn và có độ tương tác tốt hơn rất nhiều so với trên mobile web, và để chuyển đổi người dùng từ native app sang mobile web không phải là việc dễ dàng gì. Nhưng Pinterest nghĩ họ có thể làm tốt hơn.

Vậy kĩ sư Pinterest đã làm nó như thế nào?
Vào tháng 7/2017, Pinterest đã thành lập ra 1 nhóm kết hợp từ các engineer từ nền tảng web và growth teams. Trong nội bộ Pinterest gọi nó là Project Duplo.

Vào thời điểm đó, mobile web chỉ chiếm khoảng 10% tổng số lượt signup (đăng kí tài khoản). Cùng thời điểm thì website trên nền tảng desktop đã tăng gấp 5 lần.

Mốc thời gian:
* Tháng 7/2017: Bắt đầu dự án Duplo
* Tháng 8/2017: Launch 1 trang web mới trên mobile cho 1 tỉ lệ phần trăm người dùng đã logged-in.
* Tháng 9/2017: Ship trang web mới trên mobile cho toàn bộ người dùng đã logged-in vào
* Tháng 1/2018: Launch 1 trang web mới trên mobile cho tỉ lệ phần trăm của người dùng đã logged-out
* Tháng 2/2018: Ship trang web mới trên mobile cho toàn bộ người dùng đã logged-out.

Lí do mà các kĩ sư Pinterest có thể hoàn thành xong 1 phiên bản trên mobile web chỉ mất có 3 tháng là do họ có sử dụng 1 open source do chính họ tạo ra có tên là [Gestalt](https://github.com/pinterest/gestalt).

Ở Pinterest họ đang sử dụng React cho tất cả web development. Các bộ phận trong Gestalt được xây dựng để bao gồm các design language, giúp dễ dàng tạo ra các trang khá đẹp mà không phải lo lắng về CSS.

Gestalt tạo ra 1 bộ các component dành riêng cho thiết bị di động để tạo ra các trang có khoảng cách nhất quán với toàn bộ trang. Điều đó giúp cho quá trình xây dựng website trở nên nhanh và đơn giản hơn.
![](https://images.viblo.asia/215b8b13-4aaf-4e5d-8ec4-862d8c3c6436.png)

Ngoài Gestalt thì Pinterest cũng sử dụng 1 số thư viện khác nữa như React , Reac-router v4 , redux , redux-thunk , Reac -redux , normalizr , reselect , Flow và prettier .

## Làm thế nào để làm tốc độ tải trang được nhanh hơn?
Hiệu năng luôn là vấn đề được quan tâm, bởi vì nó ảnh hưởng rất lớn đến mức độ tương tác của người dùng đến hệ thống. Đặc biệt với những người có tốc độ mạng kém hay bị giới hạn. Chẳng ai thích thú gì khi phải load những trang khá nặng mà mạng đang dùng thì khá chậm phải không nào.

Sau khi tối ưu, Pinterest đã giảm kích thuớc file Javascript từ 490kb xuống còn 190kb. Việc này đạt được nhờ code-splitting ở tầng route, đặc biệt dùng component <Loader> sẽ giúp các bạn làm được điều đó.

Ngoài ra nhờ việc sử dụng hệ thống preloading được đặt ở phía client side đã giúp cho tốc độ tải trang được nhanh hơn, làm trải nghiệm người dùng được tốt hơn.

Cụ thể các bạn có thể đọc bài viết về tối ưu Progressive Web App ở đây nhé: [A Pinterest Progressive Web App Performance Case Study](https://medium.com/dev-channel/a-pinterest-progressive-web-app-performance-case-study-3bd6ed2e6154)

Chỉ trong 1 năm, phía mobile web đã có trên 600 file javascript, và tất cả nó đã được build vào 1 file được gọi là file bundle. Điều này sẽ rất khó trong việc đo lường để tối ưu hiệu năng.

Do đó, Pinterest đã phân tán các file javascript đó trên các trang web con dạng * .pinimg.com và đảm bảo rằng các dependencies trong mobile web luôn luôn được clean.
![](https://images.viblo.asia/68f27b9d-c6e3-4652-93b1-abe2af39c09d.png)
 
Nhìn vào hình ảnh trên chúng ta thấy được là các file js đang được nằm phân tán trên các website khác của pinterest (s.pinimg.com) và những file này đều được trả về từ Service Worker.

Để file bundle không vượt quá giới hạn cho phép, phía Pinterest đã tạo ra những graph để report các file bundle đã được build và sẽ thông báo khi có file nào vượt quá kích thước cho phép.

Cái thứ 2 mà Pinterest đã làm là đã customize eslint rule để không cho phép import những files hay directories mà có thể là nguyên nhân gây “phình” to file bundle. Ví dụ như mobile web sẽ không cho phép import từ những file trên desktop web. Đương nhiên họ sẽ có 1 thư mục dùng chung cho cả 2 mobile web với desktop web.

Và đây là kết quả khi họ tối ưu tốc độ load trang web:
![](https://images.viblo.asia/8d99908b-d0b6-4429-a8f7-fe206a72c455.png)
Sau khi đã tối ưu được tốc độ load trang, thì điều tiếp theo họ nghĩ là làm thế nào để hiển thị dữ liệu được nhanh hơn.

Như chúng ta đã biết, với React thì cái driver lớn nhất mà ảnh hưởng đến hiệu năng phía client side đó chính là redux store (1 trong những component có thể giúp cho quá trình thay đổi route 1 cách tức thì).

Ví dụ như màn hình list pins đang hiển thị hình ảnh vs title của pin. Từ màn hình list pins, chúng ta click vào 1 pin để xem chi tiết.

Khi đó dữ liệu về ảnh với title của pin ở màn hình list sẽ được mang sang màn hình detail pin để hiển thị ngay lập tức.

Đồng thời, Pinterest sẽ gửi thêm 1 request để lấy thêm dữ liệu về pin (như thông tin về owner của pin, description của pin, số lượng follow …). Khi đó người dùng có cảm giác tốc độ hiển thị dữ liệu khá nhanh, điều đó làm cho trải nghiệm người dùng cũng được tốt hơn.

Ngoài ra “trái tim” của trang web mới này đó là nó support cả phần app shell, add đến homescreen, push notifications and asset caching.

Service Worker sẽ cache lại server-rendered đối với từng người dùng cụ thể, và phục vụ cho lần page load tiếp theo.

Đặc biệt Pinterest đã rất “biết ơn” Apple đã tích hợp Service Worker trên Safari, để giúp cho người dùng có trải nghiệm tốt hơn như trên native app.

## Kết quả đạt được

Bây giờ đến phần mà các bạn mong chờ: đó là những con số.

* Active users hoạt động trên mobile web đã tăng lên 103% so với năm trước, với 156% ở Brazil và 312% ở India.
* Thời gian sử dụng mobile web đã tăng lên đến 296%
* Số lượng pin đã tăng lên 401%
* Số lượng người dùng muốn save Pin đến board tăng đến 295%
* Và đặc biệt hơn, số lượng login đã tăng lên 370%, số lượng signup đã tăng 843% trên 1 năm.

Thời đại công nghệ ngày nay, quả thực trải nghiệm người dùng rất quan trọng, nó quyết định đến sự sống còn của dịch vụ.

Nếu bạn nào đang có ý định phát triển Progressive Web App thì hi vọng qua bài này sẽ giúp 1 phần nào đó.
    
Nguồn: https://nghethuatcoding.com/2019/05/02/cac-ki-su-pinterest-da-xay-dung-progressive-web-app-nhu-the-nao/