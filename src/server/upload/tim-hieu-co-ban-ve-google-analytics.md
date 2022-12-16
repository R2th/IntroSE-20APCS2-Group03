<div align="center">
    
# Lời mở đầu
    
</div>

![](https://images.viblo.asia/3caacbee-7a30-4a5e-963c-c05a9d879977.jpg)

- Xin chào các bạn, mình "lại" quay trở lại rồi đây. Và như tiêu đề cũng như là thumbnail của bài viết thi mọi người cũng đã có thể đoán được đối tượng của bài viết ngày hôm nay là gì rồi. Để tìm hiểu cũng như là sử dụng được công cụ này thì chắc chắn một bài viết là không đủ nên chắc mình sẽ viết thành một series cho các bạn có thể dễ dàng theo dõi, các bạn hãy "kiên nhẫn" đón xem nhé.

<div align="center">
    
# Nội dung
    
</div>

## 1. Google Analytics là gì?
- Theo như "quảng cáo" trên [trang chủ](https://analytics.google.com/) thì đây là một sản phẩm cung cấp những công cụ "**miễn phí**" cần thiết để thu thập, phân tích dữ liệu trên trang web của bạn (số người truy cập, lượt truy cập, ...), từ đó bạn có thể cải thiện khả năng CEO và marketing giúp cho nó có thể tiếp cận được tới nhiều người dùng hơn. 
- Ví dụ: nếu bạn biết được khung giờ nào trang web (có thể là [Facebook](https://www.facebook.com/) hoặc chính bản thân [Viblo](https://viblo.asia/)) có nhiều lượt truy cập nhất (hoàn toàn có thể nắm được thông qua GA) thì bạn có thể canh giờ đó để đăng bài viết lên, khi ấy bài viết của bạn sẽ có thể tiếp cận được nhiều người nhất. 

    (và tất nhiên là mình không nắm được thông tin này của Viblo nên mới đăng bài viết vào một thời điểm bất kỳ như thế này, hy vọng bài viết vẫn có thể đến được với nhiều bạn đọc :sweat_smile::sweat_smile::sweat_smile::sweat_smile:)

## 2. Cài đặt sử dụng GA như thế nào? 

### 2.1. Tạo tài khoản
- Khi tạo tài khoản GA sẽ gồm 3 bước như trong hình (cách điền thông tin chi tiết cho từng bước các bạn có thể tham khảo tại [**đây**](https://support.google.com/analytics/answer/1008015?hl=vi)), sau đó cứ ok vs next thêm vài lần là sẽ hoàn tất việc tạo tài khoản, rất nhanh và đơn giản.

![](https://images.viblo.asia/7d2eab6a-5a3c-40a6-9583-5ff88616a4b1.jpg)

### 2.2. Thêm tracking code của GA
- Ở đây sẽ có 2 cách như sau:
    - Thêm một Global site tag (gtag.js) mới vào thẻ <head> trong file HTML (code này lấy từ trong phần settings của GA nhé, **đừng copy này** của mình, mình để đây để các bạn biết format của nó trông như thế nào thôi)
        ```html
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1Q7H19GF3Z"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-1Q7H19GF3Z');
        </script>
        ```
    
    - Nếu như bạn đã có gtag.js rồi (đã từng tạo một property trên GA) thì có thể vào theo menu **Admin** -> **Tracking Info** -> **Tracking Code** và click vào **Connected Site Tags**,  sau đó bạn connect measurement Id của bạn vào. Nếu bạn chưa biết lấy MeasurementId ở đâu thì nó đây nhé.
    ![](https://images.viblo.asia/62c882fd-716f-4179-9dd0-edf224508d7d.jpg)

- Về cơ bản thì phần setup đã xong, tuy nhiên bạn sẽ cần chờ để GA có thể thu thập dữ liệu thì mới có thể có data để hiển thị được thành những biểu đồ trực quan được (và những hình ảnh vê số liệu dưới đây chỉ mang tính chất minh họa thôi nhé)

## 3. Một số thông số chính mà GA đo lường được
- GA có thể tracking rất nhiều thông số nên mình không thể liệt kê ra hết được, và với vai trò là một developer chứ không phải là một người làm marketing thì mình nghĩ chỉ cần quan tâm đến một số thông số chính sau đây thôi: 
    
### 3.1. Số lượng người truy cập
- Tất nhiên rồi, khi bạn làm một trang web thì chắc chắn bạn sẽ quan tâm xem có bao nhiêu người truy cập vào trang web của bạn phải không nào. Có thể bạn sẽ nghĩ theo hướng yêu cầu user đăng ký/đăng nhập rồi tự tracking cũng được mà, tuy nhiên như vậy sẽ bị thiếu hụt rất nhiều vì khi vào một trang web mới, đâu phải ai cũng sẵn sàng đăng nhập vào đâu. 
- Vì vậy GA (và cụ thể ở đây là tracking code) sẽ dựa vào thông tin trình duyệt/cookie để tạo ra một client ID cho người dùng đó mà không cần người dùng phải đăng nhập. Và cũng vì dựa trên trình duyệt/cookie nên nếu cùng một user mà sử dụng một trình duyệt khác hoặc clear cookie rồi vào lại thì GA sẽ tạo một client ID mới và tính đây là user mới hoàn toàn.
    
    ![](https://images.viblo.asia/a93bfe49-f37d-48ee-bb8d-a0d7455a7499.gif)

### 3.2. Số lượng pageviews
- Cũng giống như là lượt xem trên youtube hay như viblo, số pageviews sẽ phản ánh được trang web của bạn đã được truy cập bao nhiêu lần. Và những content có lượt pageviews cao chứng tỏ nó đang được nhiều người quan tâm.
- Không giống như youtube hay viblo (chắc là sẽ có logic tính views kiểu sau bao lâu thì mới tính 1 view, vì mình reload lại trang mấy lần mà không thấy tăng views) thì cách tính của GA rất đơn giản, cứ mỗi lần truy cập vào trang thì pageviews sẽ được tính và tăng lên ngay. Vì thế GA cung cấp thêm cho húng ta Unique Pageviews giống như hình bên dưới:
    
    ![](https://images.viblo.asia/69c5e191-a14c-48e3-a3cb-d5bb87f178d7.png)

        
- Và như bạn thấy thì GA không chỉ thống kê pageviews của trang chủ mà có thể tracking chi tiết từng trang con ở bảng phía dưới, nếu website của bạn là trang tin tức hoặc blog chẳng hạn, bạn sẽ biết được bài viết nào đang có nhiều view, chứng tỏ là nó đang hot thì từ đó có thể chạy quảng cáo hoặc viết thêm những bài tương tự để có thể tiếp cận được với nhiều người dùng hơn.
    
### 3.3. Bounce Rate
- Bounce Rate đại diện cho **tỉ lệ** khách truy cập vào trang web và **rời khỏi ngay sau đó** thay vì xem thêm các trang khác trong website ấy. Và ngược lại với 2 chỉ số đã nói ở trên (càng cao càng tốt) thì người quản trị sẽ muốn Bounce Rate càng thấp càng tốt. 
- Đây cũng là một chỉ số mà cả developer và người làm marketing website cần quan tâm, mình có tìm hiểu thì GA tính Bounce Rate theo công thức: 
    
    <div align="center">

    $BounceRate = \frac{Tổng Lượt Thoát}{TổngLượtTruyCập}.$

    </div>
    
    Cả 2 chỉ số này được tính trên cùng một trang và trong cùng một khoảng thời gian nhất định.
    
- Và để giảm BounceRate xuống thì mình nghĩ cách đơn giản nhất là cải thiện phần gợi ý các nội dung tương tự, giống như khi bạn xem video trên youtube hoặc là lướt mua hàng trên shopee, chắc chắn là hệ thống gợi ý của 2 ông lớn trên sẽ giữ chân được bạn rất lâu trên trang web của họ.
    
<div align="center">
    
# Tổng kết
    
</div>

- Trong bài viết này mình đã giới thiệu sơ qua cho cá bạn về công cụ Google Analytics và những thông tin cơ bản nhất khi tracking một website. Rất mong bài viết đã mang lại những thông tin hữu ích cho bạn đọc, và các bạn sẽ đón chờ các bài viết tiếp theo trong series này của mình.
- Hẹn gặp lại các bạn trong các bài viết sau.
    
<div align="center">
    
# Tài liệu tham khảo
    
</div>
    
- GA Homepage: https://analytics.google.com/
- Google support: https://support.google.com/analytics#topic=9143232
- Viblo: https://viblo.asia/tags/google-analytics