## Giới thiệu
Mình search thử "giới thiệu antd" thì ra khá nhiều kết quả, cơ mà vẫn viết lại mong có thể giúp ai đang băn khoăn khi muốn dùng antd có cái nhìn khái quát nhất. Mình cũng sẽ so sánh với material ui (mu), đối thủ nặng kí của antd. Đây là bài viết mang tính cá nhân và thuần lý lẽ nhé mn =))

## Antd
### Độ phổ biến
Ở thời điểm mình viết bài này, antd đã có tới 66.3k sao trên git, 1 con số rất ấn tượng, là thư viện UI được yêu thích nhất trong lập trình web. Chả cần phải bàn về độ xịn sò của nó, việc phổ biến cũng giúp khi gặp vấn đề, ta có thể dễ dàng search hoặc cầu cứu mạng.

### Tính thân thiện
Tính thân thiện ở đây là khả năng dễ đọc dễ dùng.
docs của antd thiết kế giống mu, có demo và API rõ ràng, cơ mà mò API của antd hơi khó ăn ngay, ko hề khó mà kiểu ko phải API nào cũng nhìn lần đầu là dùng chuẩn ngay đc =))

antd đặt tên class dễ hình dung, mạch lạc, trong khi mu thì khá rối, ko nhìn quen chắc hoa mắt. Việc class thân thiện cũng giúp ai custom = css, scss cũng dễ dàng làm quen, còn mu thì phải mất 1 thời gian.
Cả antd và mu đều có tính theming, tức là tuỳ chỉnh theme. Nhưng mu thì có thể tuỳ chỉnh theme trong code, giúp user có thể custom giao diện, mu cũng có nhiều animation đẹp mắt nữa, còn antd thì chỉ có thể tuỳ chỉnh lại những thứ mặc định như màu sắc, kích thước... khi build (https://ant.design/docs/react/use-with-create-react-app) trước khi về client, các animations của antd tương đối đơn giản, tất nhiên là vẫn đủ đẹp :v: 
Còn nếu bạn muốn custom theme ở client thì hãy style antd cùng với styled-components, nhưng mình ko khuyến khích do việc style sẽ cồng kềnh, ko nhất quán nhiều chỗ, tốt nhất là dùng scss thôi ;)

### Sức mạnh
antd rất mạnh, các bạn chỉ cần lướt qua đống components của nó là thấy nó pro thế nào, chắc chắn việc code sẽ đc tối giản đi rất nhiều nếu dùng antd cho dự án. Cơ mà mu thì cũng mạnh ngang =)) nếu dùng antd thì cần cái nào hãy import cái đó đc thì tốt, nếu dự án nhỏ mà import hết đống css của nó cũng ko cần thiết

## Kết luận
Mình sẽ tổng kết lại, antd là 1 thư viện UI cho react sang xịn mịn, cộng đồng đông đảo, nếu dùng thì hãy style = scss, chú ý đọc kĩ API vì có thể bạn sẽ bỏ lỡ cái gì đó kết hợp hay ho, do antd ko demo hết đâu. So với mu thì đứa 9 đứa 10, mu xịn hơn về UI UX còn antd thân thiện hơn, sức mạnh thì ngang nhau.