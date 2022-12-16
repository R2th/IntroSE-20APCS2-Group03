# Performance tool
## Giới thiệu
Biết địch biết ta, trăm trận trăm thắng. Muốn hiểu một đối thủ chúng ta phải biết nguồn gốc của hắn mọi điều mà hắn đã trải qua, muốn đội quân của ta càng mạnh thì ta cần phải biết khắc phục các điểm yếu của từng tiểu đội, từng thành viên trong tiểu đội đó. Một trang web cũng vậy, muốn  một trang web có thể được điểm cao trong mắt người dùng chúng ta cần tối ưu nó. Muốn cải thiện được thì chúng ta cần phải biết các chuỗi sự kiện xảy ra với trang web của mình khi nó được load lên trình duyệt, tối ưu từng sự kiện trong đó. Muốn nắm bắt được timeline của trang web, chúng ta đã có `Perfomance tool` .

Performance tool là một trong những tool "nâng cao" của chrome dành cho nhà phát triển. 
![](https://images.viblo.asia/e891d6c4-96fc-4a8a-844e-40f79180e56c.PNG)


## Chức năng chính
Với cái nhìn tổng quan theo đánh giá của mình thì đây là một tool gây "hoa mắt". Nhưng lượng thông tin mà nó đem lại thật sự là nhiều và cần thiết. 
- Trên cùng là thanh thời gian.
### Thứ nhất phải kể đến là FPS
![](https://images.viblo.asia/c82b1b1d-be09-46f6-90f4-3b6e4b7b2e54.PNG)

Một thanh nhỏ ghi lại số lượng khung hình theo thời gian. Bạn có thể nhìn thấy ở đây một vài vệt màu hồng hay màu đỏ, đây là điểm mà bạn cần cải thiện vì nó đang thể hiện là số khung hình rên một giây của bạn quá ít gây ảnh hưởng đến người sử dụng.

FPS đỏ là một lỗi đặc biệt dễ sảy ra vì nó liên quan đến hình ảnh người dùng nhận được, nên nó đặc biệt dễ thấy.

### Sau đó là biểu đồ CPU:
![](https://images.viblo.asia/5cb908bf-74fb-48f5-b2cb-55dc3574bfda.PNG)

biểu đồ CPU được thể hiện theo các màu sắc khác nhau như trong bảng Summary mà bạn có thể thấy ![](https://images.viblo.asia/7ada2e69-ac71-432f-b894-4b535d443967.PNG)

bằng cách chọn, lăn chuột giữa tại vùng này bạn có thể tóm lược được các hoạt động diễn ra của CPU, ví dụ như hình trên thể hiện tổng thời gian load trang web là 2857ms trong đó có 1216ms là Scripting.
CPU lên cao theo trục x thể hiện máy của bạn đang phải sử dụng rất nhiều % CPU để load trang, kéo dài theo trục y thể hiện việc sử dụng % CPU này trong khoảng thời gian bao lâu. Như vậy, nếu bạn nhìn thấy một thanh "đen ngòm" từ đầu đến cuối biểu đồ CPU thì chứng tỏ web của bạn đang cần quá nhiều CPU. Khi mà cần quá nhiều mà không được đáp ứng thì sẽ sinh ra việc xử lý không tốt dẫn đến nhìn cảm giác như trang web bị đơ.

###  Các frame theo thời gian: 
Theo cách hiểu của mình thì đây là một cách trực quan cho developer có thể nắm bắt được trạng thái của trang web theo thời gian qua hình ảnh. Bạn có đưa chuột hover qua lại xem frame.
![](https://images.viblo.asia/a8cb3e29-07b4-4e84-aee8-0fad3200708e.PNG)

### Timeline: Network, Frames, Main...:

Có lẽ đây là cái quan trọng nhất trong `Perfomance tool` vì nó như một thư ký của bạn, ghi lại các việc bạn đã làm và tổng kết xem kết quả việc làm đó như thế nào. Có thể chọn và kéo Timeline để tìm khoảng thời gian mong muốn.
- Network: ![](https://images.viblo.asia/4cbf1d99-85c2-466f-9ec3-306d48c1b582.PNG)
Timeline Network thể hiện các request gửi lên, thời gian, cấp độ, trực quan về thứ tự các request này. 
- Main:
Các thanh màu xanh, cam, tím... được giải thích ở phần Summany.
Các thanh nằm xếp chồng lên nhau thể hiện rằng các sự kiện phía trên gây ra các sự kiện phía dưới. Click vào từng thanh để xem chi tiết, phóng to để có thể xem rõ hơn. Với các thanh có phía trên bên phải là một hình tam giác màu đỏ đấy là thư ký chrome đang nhắc bạn một số note gì đó ví dụ như một `bottleneck`, `Long task`... mà bạn có thể sửa để cải thiện trang web của mình.
![](https://images.viblo.asia/e10fa6a0-a979-4d9f-9df1-c37e904711e3.PNG)
...
## Sử dụng
Để tăng perfomance của một trang web đầu tiên chúng ta nên tìm kiếm trên FPS xem chỗ nào là điểm đỏ, bottleneck để khắc phục.

Tiếp theo, nên kiểm tra biểu đồ CPU để tìm ra chỗ nào cần CPU cao. Chrome có hỗ trợ giảm CPU để test các trường hợp này một cách rõ hơn. Chẳng hạn bạn muốn test cho CPU của máy điện thoại thì nên giảm CPU throttling xuống. Khi tìm được chỗ có CPU cao thì cần cải thiện code sao cho CPU  không cần sử dụng quá nhiều mà vẫn load trang ổn định như vậy tránh giật lag khi load.
![](https://images.viblo.asia/115b0aeb-358b-431e-96c5-63536ad46629.png)

# Tổng kết
Performance tool là trợ giúp tuyệt vời để giải quyết bài toán về perfomance cho website. Vì vậy đừng ngại ngần mà tìm hiểu nó nhé :+1: 

Cảm ơn bạn đã đọc bài viết của mình. Tài liệu tham khảo:  [developers.google.com](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance)