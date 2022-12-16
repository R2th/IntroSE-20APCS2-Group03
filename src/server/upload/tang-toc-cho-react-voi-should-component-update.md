Tốc độ của react là rất tốt, đối với những dự án nhỏ hoặc view ít phức tạp react render lại view rất nhanh. Tuy nhiên đối với những trang lớn việc render lại view cho tất cả các component không cần thiết khiến cho ứng dụng react của bạn trở nên chậm chạp, thao tác không mượt ảnh hưởng lớn đến cảm nhận của người dùng. Dưới đây tôi xin đưa ra ví dụ chi tiết

### Ví dụ cơ bản

Tôi lấy có một ứng dụng đơn giản với một vài component input. Bạn có thể xem chi tiết tại đây [Ví dụ 1](https://codepen.io/ngoc-thoai-nguyen/pen/LJveEb)

Trong ví dụ trên tôi sẽ ghi (log) lại mỗi lần component render lại. Ta thấy mỗi lần thay đổi từng input ta thấy tất cả các component khác đều render lại. Trong ví dụ trên ta có 4 ô input, mặc dù chỉ thay đổi 1 ô input thì tất cả 3 ô input kia đều được render lại. Việc render lại tất cả như thế này có vẻ thừa thãi không cần thiết, làm cho ứng dụng của bạn chậm hơn khá nhiều
![](https://images.viblo.asia/f1748dd0-7478-40aa-a352-2f01fd944196.gif)

Ta có thể cải tiến bằng cách ở mỗi component ta sẽ kiểm tra xem component này có cần render lại nội dung không. Nếu nội dung không có gì thay đổi thì ta cũng không cần phải render lại component này. Như vậy, ta sẽ tránh được những xử lí render không cần thiết.

Bạn có thể theo dõi phần sửa lại tại đây [Ví dụ 2](https://codepen.io/ngoc-thoai-nguyen/pen/eLoyZY)

![](https://images.viblo.asia/e9766c65-4fe4-4f95-a46c-09af96bbdd56.gif)

Trên đây là 2 ví dụ với nội dung trang web là rất nhỏ nên việc render lại toàn bộ trang cũng là rất nhanh nên bạn rất khó có thể so sánh hiệu năng. Ta thấy mặc dù ở ví dụ 1 việc render lặp đi lặp lại rất nhiều nhưng khi bạn điền thông tin vào các ô input rất nhanh đi nữa thì tốc độ phản hồi của cả 2 ví dụ gần như là như nhau.

### Đánh giá hiệu năng

Để đánh giá hiệu năng tốt hơn tôi sẽ làm trang lớn hơn với nhiều thành phần hơn

[Ví dụ 3](https://codepen.io/ngoc-thoai-nguyen/pen/qMwpaR) không sử dụng component should update
![](https://images.viblo.asia/13c9a058-6f4e-440b-837d-9ee0251be77c.gif)

Trong ví dụ trên ta thấy với mỗi thay đổi rất nhiều component bị render lại một cách không cần thiết. Ta có thể thấy khi gõ nhanh vào một ô input trang web phản hồi lại rất chậm gây khó chịu cho người dùng

[Ví dụ 4](https://codepen.io/ngoc-thoai-nguyen/pen/qMwpaR) có sử dụng component should update
![](https://images.viblo.asia/3df82b16-8c73-426b-b614-757face2261f.gif)

Ở ví dụ này ta thấy cũng cùng nội dung trang web như ứng dụng trên. Tuy nhiên ta đã cải tiến chỉ render lại khi cần thiết, ta cảm nhận được rõ rệt ứng dụng phản hồi lại rất nhanh không bị chậm như ví dụ 3 ở trên

Hi vọng bài viết sẽ giúp các bạn viết được một app react ngon tốc độ tốt. Cảm ơn bạn đã theo dõi bài viết !

### Tham khảo

1. [Ví dụ demo](https://codepen.io/ngoc-thoai-nguyen/pen/qMwpaR)
2. Tài liệu [react document](https://reactjs.org/docs/optimizing-performance.html)
3. [github code](https://github.com/ngocthoaia1/report-react-component-should-update/tree/master)