> Khi mà trên mạng có quá nhiều các tutorial để code ra một app React Native (gọi tắt là RN), những vấn đề liên quan dường như lại lãng quên.
> Xin mời các bạn cùng theo dõi vài chục câu hỏi vì sao, về những thắc mắc xung quanh React Native.
> 
### RN ngon lắm, code cả Ios lẫn Android luôn, thay thế native code luôn?

Không, không và ... không. Dù cho mọi báo đài đi quảng bá RN thế nào đi chăng nữa, thì cái yếu tố cốt lõi để khác hàng quyết định sử dụng cái gì đó chính là: **Hiệu năng**.
Và RN không thể đú được native code ở điều đó. Vậy câu hỏi đặt ra là: nếu nó chậm hơn (vãi) thì sinh ra nó để làm gì? Câu trả lời là dùng để prototype app, thường sẽ là các app
MVP hoặc các app chỉ có các tính năng cơ bản như xài bản đồ, quét QR code, v.v. Và đúng rồi, với doanh nghiệp, RN là câu trả lời cho nhu cầu phát triển một app ăn xổi, làm nhanh, giá rẻ.

Đó là với doanh nghiệp, còn về góc độ dev, RN cho phép các React dev có thể phát triển được mobile app, và theo tôi như vậy là tuyệt vời lắm rồi.


### RN tiện lắm, chỉ cần code mỗi JavaScript là có thể phát triển cả Ios và Android luôn?

Đúng... và sai. Dẹp qua vấn đề về hiệu năng, ta quay ra xem cái vụ hứa hẹn write one, run every của RN. Có vẻ như một dev chỉ cần code và maintain app với JS mà thôi.
Nhưng thực tế, nó là một cú lừa. Dù đúng là đa phần ta chỉ code JS, nhưng ngoài ra phần phải thiết lập các module của native. Tức, thay vì maintain app chỉ với JS (như hứa hẹn trên trang chủ),
thì một RN dev phải cân luôn cả hai thể loại native, thế là thành **3** :v...


### RN nhanh hơn Flutter, hãy dùng RN? 

Nhiều người hay hỏi câu này, câu trả lời ngắn gọn thì là do cơ chế render của hai ông này khác nhau, nên tùy vào từng trường hợp mà sẽ nhanh chậm khác nhau.
Nên theo tôi cái câu hỏi chính xác hơn đó là: nên học cái gì?

Như đã nói ở trên, miếng bánh lớn trên thị trường đã bị native app chiếm hết rồi, còn một phần nhỏ bẻ thì hai ông xâu xé. Thắng thua chả còn quan trọng nữa.
Mục đích vẫn chỉ là làm app ăn xổi, app đại chúng. Learning curve của hai framework này đều rất ngắn, hãy chọn bất kì cái nào mà bạn thấy thích thú, vì cộng đồng của cả hai
đều rất mạnh mẽ (được chống lưng hết bởi mấy ông lớn). 


### Expo có thể thay thế native-tool?

Expo là cái framework mới, được sinh ra để xử lí vấn đề thiết lập các native module, tức là để hoàn thiện lời hứa "code một phát ăn cả hai phát, chỉ với JS" của RN.
Nghe cũng xịn ghê đấy, nhưng với các dự án nghiêm túc, t vẫn sẽ chọn native-tool, vì nó cho phép ta tùy ý thiết lập các native module (ở expo, dù có tự động thiết lập đi chăng nữa, thì số lượng module được hỗ trợ rất hạn chế,
tất nhiên là số lượng module được hỗ trợ ngày càng tăng, nhưng ở thời điểm hiện tại thì vẫn chưa đủ dùng). 

Vậy thì việc thiết lập các native module ắt phải quan trọng lắm? Đúng, quan trọng và thường xuyên, vì ngoài việc code JS ra thì phần lớn thời gian của một RN dev là nâng cấp phiên bản module rồi fix lỗi degrade :v


#### To Be Continue...