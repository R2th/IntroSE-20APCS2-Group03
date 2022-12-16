<div align="center">
    
# Lời nói đầu
</div>

Xin chào tất cả các bạn, mình đã quay trở lại rồi đây. Trước đây mình toàn viết mấy bài về thuần technical nên có vẻ nó cũng hơi chán, nay xin phép đổi gió sang kiểu bài chia sẻ tips, tại hôm trước đọc được bài này thấy cũng hay hay!
- Bài viết "phần lớn" được dịch từ: https://www.keycdn.com/blog/benefits-of-responsive-web-design
- Nếu có chỗ nào mình dịch chưa ổn thì rất mong mọi người góp ý để mình có thể hoàn thiện hơn! :+1::+1::+1::+1::+1:

<div align="center">
    
# Nội dung
</div>

<div align="center">
    
## Responsive Web Design là gì?
</div>

Ngày nay, khi mà các thiết bị di động (smartphone, tablet) ngày càng trở nên phổ biến trong xã hội thì số lượng người truy cập Website từ những thiết bị này chiếm một con số không nhỏ. Và rõ ràng khi truy cập vào 1 trang web trên máy tính và trên các thiết bị di động sẽ có cách hiển thị khác nhau (màn hình ngang/dọc, kích thước màn hình). 

![](https://images.viblo.asia/1660a517-ed4b-4c0e-9fba-2a08062487d3.png)
<div align="center">
    Số lượng người dùng thiết bị Desktop/Mobile qua các năm 
</div>

<br>
<br>


Và **Responsive** là cách để làm cho website có thể tự điều chỉnh kích thước theo màn hình, giúp cho người dùng có được trải nghiệm tối ưu mà không ảnh hưởng bởi loại thiết bị mà họ dùng để truy cập vào website. Lợi ích đầu tiên là trang web có thể tải một cách nhanh chóng mà không bị biến dạng, để cho người dùng không cần phải resize bằng tay.


![](https://images.viblo.asia/db11cb20-874a-4e9e-a38f-3119b1d403f1.jpg)

<br>

Để thực hiện responsive cho một trang web thì có một vài nguyên tắc cốt lõi, trong đó có 3 thành phần chính (mình sẽ để nguyên tên tiếng Anh để các bạn nhớ **key word** để search, với cả dịch ra nó nghe củ chuối lắm) như sau:
- **Fluid Grids**: là hệ thống lưới phân chia tỉ lệ dựa trên màn hình của người dùng, đảm bảo rằng tất cả các thành phần (**elements**) sẽ được thay đổi kích thước dựa trên quan hệ với các thành phần khác, thay vì fix cứng layouts để hiển thị giống hệt nhau với mọi màn hình. Cách đơn giản là chia **width**(chiều ngang) của cả trang ra thành 12 phần bằng nhau, và set tỉ lệ cho từng thành phần.

![](https://images.viblo.asia/94dfaa2e-584b-4fcd-9516-53d82812d40d.png)

- **Media Queries**: là một trong những module mới được thêm vào trong CSS3, nó cho phép websites thu thập dữ liệu từ thiết bị của người dùng, từ đó áp dụng CSS styles phù hợp với từng kích thước màn hình. Đại lại xử lí logic sẽ như kiểu là
```php
if ($witdh > xxx) {
    //áp styles kiểu này
}
```

thì với Media Queries sẽ như thế này (tức là nếu màn hình nhỏ hơn 1100px thì không cho hiển thị `.foobar`)

```css
@media (max-width: 1100px) {
    .foobar {
        display: none;
    }
}
```

- **Flexible Images**: đây có lẽ là phần khó khăn nhất để làm responsive web: thay đổi kích thước của ảnh. Một cách đơn giản đó là sử dụng thuộc tính `max-width` của CSS, nó sẽ đảm bảo hình ảnh được tải với kích thước gốc, trừ khi màn hình hiển thị nhỏ hơn `width` của bức ảnh. Với `max-width` là 100%, hình ảnh sẽ co lại theo tỉ lệ của màn hình hoặc trình duyệt. Thay vì bạn fix cứng height và width bằng code, thì hãy sử dụng CSS để trình duyệt tự động điều chỉnh kích thước ảnh. `Một điều cần chú ý là các phiên bản trình duyệt cũ có thể gặp vấn đề render khi thay đổi kích thước của ảnh`. 
    - Và khi bức ảnh càng lớn thì có thể tốc độ có thể bị giảm đi đáng kể. Vì vậy, một phương pháp khác được đưa ra là sử dụng `srcset` và `sizes` trong bài [này](https://www.keycdn.com/blog/responsive-images) (mình sẽ cố gắng dịch bài này một cách nhanh nhất ^^)


<div align="center">
    
## 10 lợi ích khi sử dụng Responsive Design
</div>

### 1. Có nhiều lượt truy cập hơn từ thiết bị di động
Theo như báo cáo của [SimilarWeb](https://www.similarweb.com) thì những websites hàng đầu ở Mỹ năm 2015 có tới hơn một nửa lượt truy cập đến từ các thiết bị di động. Vì thế, việc một trang web có thể hiển thị được trên các màn hình nhỏ ngày càng trở nên quan trọng, nó làm cho trải nghiệm người dùng trở nên tốt hơn. Trong khi một số doanh nghiệp vẫn lựa chọn phát triển một phiên bản website độc lập cho thiết bị di động, thì `responsive design`  nổi lên với mức độ linh hoạt cao hơn và chi phí phát triển thấp hơn.

### 2. Giảm chi phí, tăng tốc độ phát triển trên di động
Khi làm ra một `responsive website` thì sẽ tốn ít thời gian hơn là làm một ứng dụng di động độc lập song song với website cho desktop. Và như các cụ đã dạy **"Thời gian là vàng bạc"**, vì vậy giảm được thời gian phát triển chính là giảm thiểu chi phí. Không chỉ riêng việc  tạo ra sản phẩm, mà khi cấu hình, bảo trì cũng tốn nhiều nhân lực hơn, vì để code mobile app, bạn thường sẽ phải tìm thêm dev mobile riêng (hoặc là bỏ thời gian đào tạo thêm).

### 3. Ít phải bảo trì hơn
Như đã nói ở trên, nếu bạn làm 1 bản website riêng và 1 bản mobile riêng thì bạn sẽ cần tester, dev riêng cho từng phiên bản. Gần như là gấp đôi công việc bảo trì, thậm chí là cần 2 đội quản trị riêng, đội thiết kế riêng. 

Còn với `responsive website` thì dev cũng như là doanh nghiệp sở hữu có thể có nhiều thời gian hơn để phát triển thêm những tính năng quan trọng hơn như là marketing và sáng tạo nội dung. Còn đối với khách hàng sử dụng, thay vì họ phải lên cửa hàng ứng dụng (App Store/Google Play) để tải app thì họ có thể xem trực tiếp bằng trình duyệt có sẵn trên điện thoại, tiện lợi hơn rất nhiều!

### 4. Cải thiện tốc độ tải trang
Theo một nghiên cứu về trải nghiệm người dùng, đối với người dùng di động thì họ thường có xu hướng rời đi nếu như website có thời gian tải lâu hơn 3 giây. Vì vậy nếu một website không được tối ưu cho smartphones hay tablets thì việc tải trang trên thiết bị di động sẽ rất lâu, từ đó dẫn đến việc bạn sẽ mất một lượng lớn người dùng sử dụng các thiết bị di động!

Và để cải thiện tốc độ tải trang của website, bạn có thể cân nhắc sử dụng các kĩ thuật nâng cao hiệu năng ví dụ như là [caching](https://www.keycdn.com/support/cache-definition-explanation) và `responsive image`.

### 5. Giữ chân người dùng
Khi mà bạn đã đem đến cho người dùng một trải nghiệm tốt (tải trang nhanh/ít phải thao tác phóng to, thu nhỏ) thì không có lí do gì để người dùng không tiếp tục sử dụng và khám phá thêm về website của bạn. Từ đó, bạn có thể giữ chân được người dùng, kéo dài thời gian mỗi phiên làm việc của người dùng. Và đây cungx là một tiêu chí để đánh giá một website trên [Google Analytics](https://marketingplatform.google.com/about/analytics/?hl=vi).

### 6. Tỉ lệ  chuyển đổi cao hơn
Giảm thiểu tỉ lệ người dùng rời đi chỉ là một nửa của cuộc chiến. Tạo ra trải nghiệm đồng nhất cho người dùng trên tất cả các thiết bị chính là cách để chuyển đổi người dùng. Khi người dùng quyết định sử dụng một dịch vụ, họ không muốn bị điều hướng đến một `device-specific website` (mình cungx không biết dịch tiếng Việt thế nào cho cái này nó mượt nữa)  vì sẽ tốn thời gian hơn. 

Việc một website có giao diện đồng nhất trên tất cả nền tảng sẽ khiên cho người dùng có cảm giác chuyên nghiệp hơn, có trải nghiệm người dùng tốt hơn và sẽ tiếp tục sử dụng dịch vụ thay vì chuyển sang dịch vụ của đối thủ cạnh tranh.

### 7. Dễ dàng tạo báo cáo phân tích (analytics report) hơn
Biết được chi tiết số lượt truy cập người dùng đến từ thiết bị nào và người dùng tương tác với website ra sao là một bước vô cùng quan trọng để quyết định các chiến lược phát triển và cải tiến sản phẩm. Nếu có nhiều phiên bản thì bạn sẽ khó khăn hơn trong việc theo dõi thao tác điều hướng của người dùng. 

Còn khi sử dụng `responsive website` thì việc theo dõi sẽ trở nên đơn giản hơn rất nhiều. Và như đã giới thiệu ở trên thì [Google Analytics](https://marketingplatform.google.com/about/analytics/?hl=vi) là một công cụ rất hiệu quả để theo dõi cũng như là phân tích về website.

### 8. Cải thiện về SEO
Điều mà 1 người làm website quan tâm nhất đó chính là có được nhiều lượt truy cập và sử dụng. Và để đạt được điều này, bạn sẽ cần tìm hiểu về khái niệm **SEO** (**Search Engine Optimization**: phương pháp được sử dụng nhằm cải thiện thứ hạng của một website trên trang kết quả công cụ tìm kiếm ví dụ như Google, Bing, ...).

`Responsive website` sẽ đem lại phản hồi duy nhất thay vì các phiên bản riêng biệt cho các nền tảng khác nhau. Điều này giúp tránh được vấn đề trùng lặp về nội dung, cải thiện đến thứ hạng tìm kiếm và tất nhiên là nó sẽ tốt cho **SEO**.

### 9. Cải thiện trải nghiệm trực tuyến đối với trình duyệt
Trong cuộc sống, ấn tượng lần đầu tiên gặp mặt là rất quan trọng. Ví dụ như khi lần đầu gặp 1 người mà bạn đã để lại ấn tượng xấu thì từ đó họ sẽ luôn có một cái nhìn không thiện cảm về bạn và bạn sẽ cần rất nhiều thời gian để cải thiện điều đó.

Và việc truy cập vào 1 website cũng vậy. Bất kể người dùng sử dụng thiết bị nào để truy cập vào trang web thì hãy cố gắng đem đến cho họ một trải nghiệm tích cực nhất và đồng nhất.

Đừng bao giờ giải thích với người dùng là trên điện thoải nó mới bị thế, lên máy tính mà xem! Họ sẽ không nghe đâu và bạn đang dần mất khách rồi đấy!

### 10. Trải nghiệm ngay cả khi không có internet
Hầu hết các thiết bị di động (smartphones/tablets) bây giờ đều đã tương thích với HTML5. Và với HTML5, bạn có thể tiếp tục xem nội dung của website kể cả khi không có kết nối internet. 

Nếu bạn quan tâm đến vấn đề này, hãy thử tìm kiếm từ khóa [Offline Browsing in HTML5 with ApplicationCache](https://www.sitepoint.com/offline-browsing-in-html5-with-applicationcache/) xem sao nhé!

Có kha khá thứ hay ho và thú vụ đấy!

<div align="center">
    
## Một số tips hay ho
</div>

- Ngày nay, các thiết bị mới được phát triển liên tục, và kích thước màn hình ngày càng lớn hơn, đặc biệt là sự xuất hiện của màn hình cong (tiêu biểu là [Samsung Galaxy Fold](https://www.samsung.com/global/galaxy/galaxy-fold/)) thì chắc chắn `Responsive Web Design` sẽ còn rất phát triển trong tương lai :heart_eyes::heart_eyes::heart_eyes::heart_eyes::heart_eyes:
- Tiếp theo, hãy nhớ rằng, bạn là dev, còn người trực tiếp sử dụng sản phẩm là người dùng. Vì vậy đừng khăng khăng giữ lấy quan điểm phát triển sản phẩm của mình mà hãy tiếp nhận thêm các phản hồi từ người dùng và cân nhắc để cho sản phẩm của mình ngày một tốt hơn. Điều này là rất quan trọng.
- Khi thiết kế `responsive website`, không cần phải quan tâm đến tất cả các kích thước màn hình mà chỉ nên quan tâm đến kích thước màn hình nhỏ nhất và lớn nhất. Tập trung và chế độ cho màn hình nhỏ nhất có thể giúp bạn quyết định được xem yếu tố nào là quan trọng nhất đối với thiết kế tổng thể của trang web.


<div align="center">
    
# Lời kết
</div>

Hy vọng bài dịch này của mình không quá khó hiểu với các bạn (nếu có thì các bạn cứ comment để mình điều chỉnh/giải thích nhé) và đem lại kiến thức cho những bạn làm lập trình web nói chung cũng như là các bạn front-end nói riêng!

<br>

Cảm ơn các bạn đã theo dõi bài viết! Nếu thấy bài viết có ích, hãy 'upvote' để ủng hộ mình và 'clip' để dễ dàng xem lại sau này nhé! 

:bow::bow::bow::bow::bow::bow: 

<div align="center">
    
# Tài liệu tham khảo
</div>

- Bài gốc: https://www.keycdn.com/blog/benefits-of-responsive-web-design