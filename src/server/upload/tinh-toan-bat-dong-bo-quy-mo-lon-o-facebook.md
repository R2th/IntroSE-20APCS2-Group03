Chúng ta lên Face mỗi ngày, tuy nhiên không phải ai cũng chú ý tới rằng Facebook xử lý các tương tác của chúng ta như thế nào đúng không ^^ Trên thực tế, hệ thống của Facebook phải xử lý hàng tỷ request mỗi ngày. Do đó, những request này phải được xử lý bất đồng bộ để tránh việc hệ thống bị quá tải, bị chậm và UX cũng vì thế mà giảm.  

**Bài viết gốc trên blog cá nhân của mình:** https://phamduyhieu.com/tinh-toan-bat-dong-bo-quy-mo-lon-o-facebook

## 1. Thời sơ khai

Ban đầu Facebook sử dụng hệ thống bất đồng bộ đơn giản: tất cả request bất đồng bộ được xử lý và lưu trữ vào database tập trung, một bộ phận điều phối sẽ truy vấn, lựa chọn (đến trước xử lý trước) và gửi request tới worker. Trông đơn giản vl =)))

![image.png](https://images.viblo.asia/25c3b477-40c3-4d58-ad9e-4de565adcaf6.png)

 Khi lượng request tăng, họ chạy thêm nhiều woker hơn.
 
 ![image.png](https://images.viblo.asia/022d3a68-1f62-4f39-ae8c-02c3aab7012e.png)
 
Tuy nhiên đời đ như mơ :joy::joy::joy:. Hệ thống bị nghẽn lúc cao điểm nhưng lại ngồi chơi xơi nước những khung giờ khác như ban đêm chẳng hạn, gây lãng phí tài nguyên. Các kỹ sư phây búc cũng đã cố gắng maintain nhưng không giải quyết triệt để vấn đề này.

Có hàng tá thách thức trong việc xử lý request của Facebook, có thể kể đến như: 

*  **Sự ưu tiên:** xử lý request quan trọng trước (nhưng làm sao để hệ thống xác định được request nào quan trọng hơn???)
*  **Tối ưu khả năng xử lý:** làm sao để tài nguyên không bị nhàn rỗi khi không phải lúc cao điểm?
*  **Quy định sử dụng tài nguyên:** làm sao để đảm bảo các request không sử dụng quá định mức tài nguyên thông thường?

## 2. Cách mà Phây Búc xử lý


Trước hết Facebook họ chia request thành 3 loại:

* **Daily traffic:** đến từ việc bạn lướt fb hàng ngày, comment, thả phẫn nộ ảnh crush, các nhà thờ livestream mỗi cuối tuần => tương đối dễ đoán
* **Các sự kiện lớn:** tết, world cup hay live stream của những người nổi tiếng sẽ có nhiều người xem và tương tác (ví dụ như 300k của cô Phương Hằng =)))). Traffic của nó có thể dự đoán được phần nào khi chúng ta đã biết trước về sự kiện và có thể chuẩn bị cho traffic tăng đột biến.
*  **Các sự kiện bất thường:** các sự kiện này giống các sự kiện lớn nhưng chúng ta k biết trước nó, thường xảy ra trong 1 thời gian ngắn với lượng truy cập/xem tăng vọt và trở lại bình thường trong vòng vài phút/giờ. (ví dụ như livestream 1 vụ tấn công khủng bố chẳng hạn :sweat_smile::sweat_smile:)

Ngoài ra, do nhu cầu kinh doanh, các request ở cùng level còn có thể có độ ưu tiên khác nhau.


Và cách mà Facebook xử lý theo mình đánh giá là khá hay :grin::grin::grin:

* **Ưu tiên xử lý tùy theo độ trễ chấp nhận được của request**

   Các request quan trọng cần xử lý càng nhanh càng tốt sẽ được ưu tiên (thông báo livestream, phát hiện đăng nhập bất thường, …), còn lại những request có thể delay vài giây sẽ xử lý sau (like, comment). Nôm na ở đây ông Facebook duy trì độ trễ có thể chấp nhận được từ người dùng. Ví dụ không ai chấp nhận chuyện thông báo livestream đến trễ cỡ 10 phút cả, lúc nhận noti có khi người ta stream xong mẹ rồi :laughing::laughing::laughing:. Nhưng thông báo like của 1 bức ảnh crush post hôm qua thì có thể đến trễ 1 2 phút cũng không vấn đề gì.
   
*  **Xử lý request linh hoạt theo thời gian**

    Dự doán trước dữ liệu người dùng sẽ sử dụng, xử lý trước và lưu vào cache. Khi người dùng cần, hệ thống sẽ đọc từ cache luôn mà không cần xử lý. Công nhận là fb khôn :relieved::relieved::relieved:. Như vậy là họ đã chuyển việc tính toán từ lúc cao điểm sang lúc nhàn rỗi, giúp giảm trễ, tối ưu tài nguyên và chấp nhận có thể xử lý trước đó bị thừa.
    
    ![image.png](https://images.viblo.asia/c9966533-9007-4cc2-b842-b35faafc1f85.png)
    
    Hoặc hoãn việc xử lý request lại trong giai đoạn cao điểm và xử lý sau.
    Ví dụ khi bạn tải 1 video nặng lên fb, nó sẽ tạo thông báo *video của bạn đang được xử lý và sẽ được thông báo khi hoàn tất*.

*  **Xử lý theo batch**

      Cách xử lý theo batch thì cũng không còn xa lạ gì. Tuy nhiên vấn đề ở đây không chỉ **worker** bị quá tải, mà **bộ phận xử lý bất đồng bộ** (đưa job vào queue, lấy ra, lựa chọn và gửi tới worker) cũng bị quá tải. Việc fb gộp các request lại thành 1 job lớn, sau đó mới gửi cho phía worker đã giúp giảm tải cho bộ phận trung chuyển này. ( việc này không cải thiện cho phía worker do sau đó vẫn phải tách thành các request như ban đầu rồi xử lý).
      
      VD  thực tế luôn cho nóng =)) Ông nào mà ở HN thì không lạ gì cảnh xe chở thức ăn cho **trim** chạy đầy đường, phóng nhanh lạng lách khiếp vcl :persevere::persevere::persevere: Thì ở đây **đội xe điều phối** này cũng giống như **bộ phận xử lý bất đồng bộ**  trong hệ thống karaoke, nhận request từ 1 quán trong hệ thống, sau đó điều đào tới nơi có nhu cầu. Và trong giờ cao điểm tầm 9 10h tối hết tăng 1 sang tăng 2 thì việc điều đào cũng hay bị quá tải :sweat_smile::sweat_smile::sweat_smile:. Và đương nhiên họ cũng thông minh áp dụng xử lý request theo batch (1 *xe* thường chở 4, 5 *đào* chứ tôi năm nay 70 tuổi chưa thấy xe nào chạy đơn lẻ bao giờ cả :kissing_heart::kissing_heart::kissing_heart:

*  **Quy định việc phân bổ tài nguyên**

    Khi request sử dụng vượt quá lượng tài nguyên được phân bổ, cảnh báo sẽ được gửi tới các kỹ sư và request đó sẽ bị giới hạn về tài nguyên theo hạn ngạch phân bổ ban đầu. Tuy nhiên, như đã nói ở trên, fb có tính đến các sự kiện bất thường, vậy nên họ vẫn phải đảm bảo hạn ngạch tài nguyên linh hoạt để không giới hạn tài nguyên của các sự kiện này.
    
      Ngoài ra, không chỉ có các **worker** hay **bộ phận xử lý bất đồng bộ** của hệ thống bị quá tải mà ngay cả **bộ phận tiếp nhận request** cũng có thể bị quá tải => cần phải giới hạn ngay từ giai đoạn tiếp nhận **request** đầu vào để đảm bảo không bị tắc nghẽn ở giai đoạn đầu.



## 3. Các thách thức mới

Các giải pháp trên đã giải quyết phần nào các vấn đề hiện tại của fb. Tuy nhiên, vẫn còn nhiều thách thức đang chờ fb vào việc =)))

-	Hệ thống ngày càng trở nên phức tạp, khó khăn hơn khi xử lý sự cố => cần có các công cụ xử lý sự cố trực quan hơn, dễ dùng hơn
-	Cần có quy trình quản lý và giải trình tài nguyên tốt hơn cho cả người dùng và người duy trì hệ thống. Nó sẽ giúp chúng ta dự đoán về nhu cầu trong tương lai tốt hơn và cải thiện việc phân bổ tài nguyên 1 cách công bằng cho các request, đảm bảo tính linh hoạt cho 1 số trường hợp có traffic bất thường. Cái này chắn chắn ông fb phải dùng AI hỗ trợ.

Chúng ta hãy cùng lót dép hóng fb họ giải quyết các vấn đề của họ dư lào rồi học hỏi nha.

Bài này đến đây hơi dài rồi, tôi chim cút đây :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye: See yaaa!!!

À thấy hay thì cho 1 vote nha :ok_hand::point_left: không thì gửi địa chỉ đây :pout::pout::pout:


### Tài liệu tham khảo
https://engineering.fb.com/2020/08/17/production-engineering/async/