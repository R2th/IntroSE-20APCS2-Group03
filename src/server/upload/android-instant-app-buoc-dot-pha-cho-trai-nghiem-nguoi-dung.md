![alt](https://developer.android.com/topic/google-play-instant/images/gpi-logo.webp)


-----

Google lần đầu tiên giới thiệu Instant Apps tại sự kiện dành cho các nhà phát triển Google I/O vào tháng 5/2016. Dự án này chính thức đi vào hoạt động vào hồi đầu năm 2017. Nhưng trước khi tìm hiểu về Instant App cũng như những lợi ích lớn lao mà nó mang lại, chúng ta hãy cùng xem đoạn video giới thiệu của Google để có những cái nhìn đầu tiên nhé ^^

{@youtube: https://youtu.be/J7EZgXJQGz0}
# InstantApp là gì? 
* Như đoạn giới thiệu trên chắc bạn cũng đã dễ dàng đoán được phải không? Hiểu một cách đơn giản **Instant App là một ứng dụng native giúp cho người dùng có thể ngay lập tức sử dụng ứng dụng của các nhà phát triển mà không cần cài đặt.** Để xây dựng ứng dụng như vậy, các nhà phát triển cần tạo ra các module riêng và tích hợp với [deep link](http://genk.vn/giai-ngo-ve-deep-link-tai-sao-deep-link-lai-co-y-nghia-quan-trong-trong-marketing-cac-ung-dung-mobile-20160811174253108.chn), sau đó người dùng có thể nhấp vào URL để dùng thử ứng dụng như ví dụ game Clash of Clans bên trên.
 
* Instant App vẫn được tải về như các app bình thường khác nhưng thay vì ở lại trên điện thoại của bạn, nó làm việc giống như bạn truy cập một website và sau đó thoát ra, nó chỉ lưu ứng dụng đó tạm thời và được xóa ngay khi bạn thoát ra. Nó có thể được coi như một phiên bản thu gọn của một ứng dụng hoàn chỉnh. 

* Instant Apps trước đây hỗ trợ từ phiên bản Android 4.3 trở lên, nhưng hiện tại chỉ tương thích với 6.0. Google cho biết sẽ sớm hỗ trợ Android 5.0 trong thời gian tới

* Kể từ khi Android Instant Apps được ra mắt tại Google I/O vào tháng 6/2017, Google đã nỗ lực để nâng cao tính khả dụng và mở rộng số lượng thiết bị được hỗ trợ của Instant Apps. Mình lấy một vài (trong rất nhiều) ứng dụng sử dụng Instant App trên Google play store, hãy thử và cảm nhận ngay nào ;) 
    * [Hollar](https://play.google.com/store/apps/details?id=com.hollar.android)
    * [Skyscanner](https://play.google.com/store/apps/details?id=net.skyscanner.android.main)
    * [NYTimes Crossword](https://play.google.com/store/apps/details?id=com.nytimes.crossword)
    * [BuzzFeed News](https://play.google.com/store/apps/details?id=com.buzzfeed.android)
    * [Onefootball Live Soccer Scores](https://play.google.com/store/apps/details?id=de.motain.iliga)
    * [Red Bull TV](https://play.google.com/store/apps/details?id=com.nousguide.android.rbtv)
    * [Dotloop](https://play.google.com/store/apps/details?id=com.dotloop.mobile)
    * [Share The Meal](https://play.google.com/store/apps/details?id=org.sharethemeal.app)
# Ý nghĩa đối với người dùng?
* Có lẽ đây là điều mà các nhà phát triển, các lập trình viên quan tâm nhất phải không? Ở phần này mình sẽ đưa ra các ví dụ cho các bạn nhận thấy được ý nghĩa của nó một cách đơn giản nhất nhé. 

* Đầu tiên có thể nói tới là Instant App sẽ là một trải nghiệm rất mới đối với người dùng, một cách thức tiếp cận hoàn toàn mới đối với ứng dụng của chúng ta. Là một người dùng hay là một developer đặt mình vào vị trí người dùng, mình cá là bạn thấy có rất nhiều ứng dụng kiểu như chỉ dùng một lần hoặc hiếm khi sử dụng. Trong khi đó thì chúng vẫn tốn khá nhiều bộ nhớ của máy và các thiết bị có bộ nhớ 16 GB (thậm chí ít hơn) còn rất nhiều. Và người dùng phải khó chịu khi cài ứng dụng, và gỡ cài đặt ngay sau đó nếu không cần thiết nữa hoặc dùng thử mà không thích phải không? Với Instant App chắc chắn sẽ giúp cho người dùng tiết kiệm thời gian sử dụng và tận hưởng những hiệu quả cao hơn từ thiết bị của họ. Một ví dụ về Instant App mà Google đưa ra tại Google I/O là người dùng có thể dễ dàng và nhanh chóng thanh toán bằng Android Pay khi chưa cài ứng dụng. Điều đó sẽ rất tuyệt vời trong trường hợp kết nối mạng của bạn kém hay bộ nhớ điện thoại của bạn không đủ để cài thêm ứng dụng phải không ? 
{@youtube: https://youtu.be/X3-IgeHLFAY?t=81}

* Một ví dụ hữu ích khác là khi bạn phát triển một ứng dụng như Instagram hay như Youtube chẳng hạn, và người dùng thấy một bức ảnh hay một video thú vị muốn chia sẻ với bạn bè thì với Instant App tích hợp, chỉ cần đơn giản gửi 1 link cho bạn bè và họ có thể dễ dàng và cực kì nhanh chóng xem được mà chẳng cần phải cài ứng dụng.
 
*  Trong tương lai gần, có thể nói Instant App là một bước tiến lớn đối với trải nghiệm người dùng. Khi mà tốc độ các kết nối ngày càng nhanh chóng và lưu trữ đám mây trở nên phổ biến; thì việc sử dụng một ứng dụng ngay lập tức và không cần cài đặt là một điều thực sự tuyệt vời.
#  Với các nhà phát triển thì sao? 
* Google cũng đã thu thập dữ liệu từ một số ứng dụng lớn và cho thấy rằng tính năng Instant Apps đã ảnh hưởng rất nhiều đến các chỉ số quan trọng của các ứng dụng này, đặc biệt là tương tác của người dùng và cài đặt tổng thể.

* Vimeo (một trong những nền tảng xem video trực tuyến phổ biến nhất trên thế giới) đã rất tự hào khi có hơn 500 triệu người dùng hàng ngày, nhưng họ muốn mở rộng thêm cơ sở người dùng và cho phép người dùng của họ có thể dễ dàng truy cập vào một trải nghiệm đầy đủ như đang sử dụng ứng dụng gốc. Do đó họ đã sử dụng ứng dụng tính năng Instant Apps, và họ thấy rằng thời gian trung bình của các phiên sử dụng (sessions) của người dùng đã tăng lên khoảng 130%. Công ty thương mại điện tử của Mỹ, Jet, cũng đã sử dụng tính năng Instant Apps để người dùng có thể mua sắm từ thiết bị di động dễ dàng hơn và nhanh hơn, và kết quả là tỷ lệ chuyển đổi đã tăng thêm 27%. Tờ New York Times cũng nhìn thấy số lượng trung bình của các câu đố ô chữ trên mỗi người dùng tăng gấp đôi khi họ áp dụng tính năng Instant Apps cho ứng dụng của họ. Hay như nền tảng bất động sản Dotloop cũng đã chứng kiến ​​sự gia tăng 62% trong việc ký kết tài liệu diễn ra trong ứng dụng. Onefootball có trụ sở tại Berlin thấy sự gia tăng ​​52% người dùng đọc các bài báo về dịch vụ và chia sẻ bài báo thông qua Instant App. Trong khi đó, Realtor.com đã tận dụng sức mạnh của Instant Apps để chia ứng dụng gốc của họ thành các mô-đun và thấy số lượng trung bình của mỗi lần người dùng xem trang tăng lên gấp đôi. (Nguồn: [http://gamestudio.vn](http://gamestudio.vn/tin-tuc/20-tin-cong-nghe/android-instant-apps-hien-da-duoc-su-dung-tren-500-trieu-thiet-bi-tren-toan-cau-1490.html))
# Xây dựng một ứng dụng tích hợp Instant App
* Ở bài viết này mình chỉ muốn hướng cho bạn một cái nhìn tổng quan nhất về Instant App, cũng như tầm phát triển và ý nghĩa mà nó mang lại. Nếu bạn quan tâm ở bài viết tiếp theo mình sẽ hướng dẫn xây dựng một ứng dụng tích hợp Instant App và các điểm cần lưu ý khi phát triển một ứng dụng như vậy.
* ^^ Hoặc bạn có thể tìm hiểu sâu hơn về Instant App, xây dựng một ứng dụng tại: [Android Developer - Google Play Instant](https://developer.android.com/topic/google-play-instant/) 
> Cảm ơn bạn đã đọc bài viết của mình. Dưới đây là những website mình đã tham khảo:
>
> *  [Android Developer - Google Play Instant](https://developer.android.com/topic/google-play-instant/) 
>  
>  * [Some useful insights on Instant apps](https://medium.com/nos-digital/some-useful-insights-on-instant-apps-67cc7d177695)
>  
> * [Android Instant Apps](https://medium.com/inloopx/android-instant-apps-part-1-ba568d85a888)
> 
> * [Android Instant Apps: what do they mean for users and developers?](https://www.androidauthority.com/android-instant-apps-693316/)
> 
> * [Android Instant Apps hiện đã được sử dụng trên 500 triệu thiết bị trên toàn cầu](http://gamestudio.vn/tin-tuc/20-tin-cong-nghe/android-instant-apps-hien-da-duoc-su-dung-tren-500-trieu-thiet-bi-tren-toan-cau-1490.html)