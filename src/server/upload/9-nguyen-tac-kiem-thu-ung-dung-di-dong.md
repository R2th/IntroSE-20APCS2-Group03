Ứng dụng di động có những đặc điểm khác với những nền tảng khác. Chúng hoạt động trong một không gian nhỏ, phần cứng hạn chế, phải hoạt động tốt trên nhiều các thiết bị khác nhau. Để đảm bảo một ứng dụng có thể hoạt động tốt và đảm bảo những đặc điểm như vậy thì cần một quy trình đảm bảo chất lượng đúng đắn.

Thường thì sẽ có rất nhiều quy tắc bạn sẽ phải ghi nhớ khi thử nghiệm ứng dụng di động. Tôi đã soạn ra một danh sách các phương pháp và thủ thuật mà mọi người thử nghiệm nên có. Đây không phải là một danh sách đầy đủ mà là một tổng quan rộng lớn về các phương pháp tiếp cận và thực tiễn tốt sẽ giúp bạn có cái nhìn tổng quát về thử nghiệm các ứng dụng di động.

### 1. Hãy luôn kiểm thử trên thiết bị di động

![](https://images.viblo.asia/3ce070ee-96b2-4dc8-8ad0-f51cca1f3d28.png)https://images.viblo.asia/3ce070ee-96b2-4dc8-8ad0-f51cca1f3d28.png

Quy tắc quan trọng nhất khi thử nghiệm ứng dụng di động là: Bạn không kiểm thử ứng dụng trên môi trường giả lập.

Tôi nhấn mạnh điều này bởi vì các ứng dụng của bạn sẽ không được sử dụng trên môi trường giả lập, người dùng không quan tâm đến môi trường giả lập và môi trường giả lập không đại diện cho tình trạng thực sự của ứng dụng. Chúng ta chỉ nên dùng môi trường giả lập trong quá trình phát triển. 

3 quy tắc tiếp theo là:
- Luôn sử dụng nhiều hơn một thiết bị khi kiểm thử.
- Luôn sử dụng nhiều hơn một kích thước màn hình hoặc độ phân giải.
- Luôn sử dụng nhiều hơn một phiên bản hệ điều hành.

Lý tưởng nhất là bạn sẽ kiểm tra ứng dụng của mình trên mọi thiết bị trên thị trường. Tuy nhiên điều này là không thể, đặc biệt là trong trường hợp các hệ sinh thái không đồng nhất như Android, bạn sẽ phải ưu tiên kiểm thử trên các thiết bị và các phiên bản hệ điều hành được sử dụng phổ biến nhất.
Ví dụ khi bạn kiểm thử giao diện, sẽ có những lỗi về font chữ, layout xảy ra trên nhưng thiết bị có màn hình nhỏ và độ phân giải thấp, hoặc có những tính năng chỉ hỗ trợ trên Android 6 mà không hỗ trợ trên Android 4. Vì vậy, kiểm thử trên nhiều thiết bị sẽ đảm bảo ứng dụng sẽ làm hài lòng nhiều người dùng hơn.

### 2. Quản lý thời gian kiểm thử

Nếu bạn đang thử nghiệm chức năng "sửa lỗi bật / tắt tiếng", sẽ phải cần đến 10 giờ để xem lại tất cả kịch bản không liên quan đến chức năng bật tắt tiếng.
Để tiết kiệm thời gian kiểm thử, bạn hãy khoanh vùng những chức năng có thể bị ảnh hưởng khi sửa lỗi bật/tắt tiếng  và kiểm thử vùng ảnh hưởng đó. Không cần thiết phải kiểm thử lại toàn bộ các kịch bản.

Đến khi các nhà phát triển của bạn triển khai các bản dựng beta, bạn có thể thực hiện nhanh chóng các tính năng cơ bản của ứng dụng để xem liệu có bất kỳ điều gì khác bị ảnh hưởng không.

Khi ứng dụng thực hiện tích hợp nhiều chức năng và sửa lỗi, có lẽ bạn nên thực hiện kiểm thử đầy đủ (kiểm tra hồi quy). Các tính năng mới sẽ tích hợp trơn tru với các tính năng cũ, các lỗi khó chịu đã gặp sẽ không xảy ra và ứng dụng sẽ hoạt động như một tổng thể thống nhất.  Nhiều lỗi được báo cáo bởi nhóm đảm bảo chất lượng có nghĩa là ít lỗi hơn được báo cáo bởi người dùng cuối và điều này khiến mọi người hài lòng.

### 3. Luôn xem lại chức năng

Ứng dụng của bạn có chức năng là tìm và mua vé cho các buổi hòa nhạc jazz . Bạn cần đảm bảo rằng người dùng sẽ có thể tìm và mua vé cho các buổi hòa nhạc jazz bằng ứng dụng của bạn. Dù ứng dụng đơn giản hay phức tạp thì ứng dụng nên thực hiện được những chức năng chính của nó ngày này qua ngày khác.

Khi thực hiện kiểm tra chức năng, bạn nên kiểm tra xem ứng dụng có hoạt động đúng theo kịch bản đã đề ra không và nghĩ về các tình huống có thể xảy ra trong tương lai.

Khi thử nghiệm một ứng dụng phức tạp, bạn cần kiểm thử bằng một tập hợp bộ testcase để có thể đảm bảo mọi chi tiết nhỏ nhất của chức năng sẽ không bị bỏ qua . Thay vì học lại ứng dụng mỗi lần, chỉ cần tham khảo bộ testcase của bạn và cập nhật nó khi cần. Việc làm này sẽ rất tốt cho bạn, cũng như bất kỳ người thử nghiệm hoặc người quản lý dự án nào khác cố gắng hiểu ý nghĩa của tất cả các tính năng đó.

### 4. Luôn xem lại trải nghiệm người dùng

Kiểm tra khả năng sử dụng của ứng dụng liên quan đến các tham số khó đo lường. Thiết bị di động nhỏ và có rất ít nút bấm vật lý, vì vậy các ứng dụng đòi hỏi phải dễ chịu và có thể sử dụng được. Bạn cần tự hỏi bản thân những câu hỏi sau trong khi thử nghiệm ứng dụng:
- Ứng dụng này nhanh và trực quan hay chậm và rắc rối?
- Ứng dụng này điều hướng đơn giản và rõ ràng không?
- Ứng dụng này có vẻ tốt về vấn đề bố cục hoặc văn bản không?
- Bao giờ tôi sẽ cài đặt và sử dụng nó?
- Nó có làm tôi vui vẻ và thoải mái khi sử dụng không?

Chúng có thể nghe có vẻ trừu tượng, nhưng bạn nên cố gắng ghi lại một số quan điểm chung khi sử dụng ứng dụng. Ứng dụng của bạn có thể trông đẹp trên bản design nhưng trên thực tế nó lại gây khó chịu cho người dùng.

### 5. Đừng debug

Đừng tìm nguyên nhân lỗi giúp nhà phát triển. Bạn chỉ nên truyền đạt những gì đã sai và làm thế nào để xảy ra lỗi đó.

Hãy báo cáo phiên bản ứng dụng , thông tin thiết bị di động bạn đã sử dụng, hệ điều hành và các bước để tạo ra lỗi. Nếu báo cáo lỗi của bạn đơn giản chỉ là hiện tượng lỗi trên màn hình thì sẽ rất khó khăn cho các nhà phát triển khi sửa lỗi, hãy cung cấp nhiều thông tin nhất mà bạn có. 

### 6. Hãy kiên nhẫn và kỹ lưỡng

![](https://images.viblo.asia/b79fc392-fe46-4a36-8eab-9e4999f41a36.png)https://images.viblo.asia/b79fc392-fe46-4a36-8eab-9e4999f41a36.png

Lỗi luôn nằm trong các chi tiết nhỏ. Nếu bạn kiểm thử một cách xơ xài, không cẩn thận thì sẽ để lọt rất nhiều lỗi. Dưới đây là một vài câu hỏi bạn nên liên tục tự hỏi:
- Tôi đã bỏ lỡ một kịch bản quan trọng nào không?
- Tôi có hiểu ứng dụng này phải làm gì không?
- Tôi chỉ lướt qua ứng dụng hay nhìn kỹ?
- Tôi có thể phân biệt giữa một lỗi và một tính năng không?

Đôi khi bạn có thể đánh giá quá cao sự quen thuộc của mình với ứng dụng và cho rằng một cái gì đó hoạt động đúng. Đừng bao giờ cho rằng nó hoạt động đúng, luôn luôn cho rằng nó  có thể là lỗi.

### 7. Tính thích nghi của ứng dụng

Bạn muốn biết ứng dụng của bạn có khả năng phục hồi như thế nào không? Hãy làm một số thử nghiệm stress test. Hãy thử sử dụng nhanh và ấn vào khắp các khu vực trên màn hình thiết bị. Khi bạn thực hiện stress test, bạn sẽ đảm bảo rằng ứng dụng vẫn hoạt động được như khi người dùng thực hiện các thao tác không bình thường

Người dùng thông thường sẽ không gỡ cài đặt ứng dụng, xóa bộ nhớ cache, cập nhật và đặt lại hệ điều hành của họ trước khi cập nhật. Hãy kiểm thử ứng dụng như thể bạn là một người dùng bình thường. Hãy để nó ở trên một thiết bị có phiên bản hệ điều hành được hỗ trợ tối thiểu. Nếu nó bắt đầu gặp sự cố, hãy báo cáo hiện tượng đó.

### 8. Hãy luôn chú ý phần cứng của thiết bị

Hầu hết các ứng dụng ngày nay sẽ liên lạc với một máy chủ và kết nối vói một số loại kết nối internet. Điều này là rất quan trọng và cần phải được kiểm tra kỹ lưỡng. Một người dùng thông thường sẽ sử dụng ứng dụng của bạn trên các mạng từ Wi-Fi cực nhanh đến EDGE chậm chạp. 
Khi bạn vào tầng hầm và mất kết nối, những người khác có thể cố gắng tiếp tục kết nối và ngắt kết nối internet. Bất kể, ứng dụng của bạn cần phải hoạt động trong mọi trường hợp. Nếu không có kết nối, người dùng nên biết vấn đề. Không nên có sự cố và  hình icon tải trên màn hình.
Khi đó nên có một thông điệp cần được truyền đạt rõ ràng đến người dùng, ví dụ "Này anh bạn, vui lòng bật cái này hoặc cái kia để tính năng này hoạt động."

Cuối cùng, nếu bạn chuyển ứng dụng của bạn xuống nền và tiếp tục sử dụng một vài giờ sau đó , hãy đảm bảo rằng ứng dụng không bị thoát hoặc làm cạn kiệt pin trong thời gian này.

### 9. Hãy nhờ đến những sự giúp đỡ khác

![](https://images.viblo.asia/f881c045-a7dc-41de-9e23-e028fa4b30b6.png)

Nếu bạn cảm thấy mệt mỏi hoặc cảm thấy như bạn không nhìn thấy ứng dụng rõ ràng, hãy nhờ một người bạn để có một cái nhìn khác. Nhìn vào một cái gì đó quá lâu và ở một khoảng cách cực kỳ gần sẽ thu hẹp sự hiểu biết quan trọng của bạn.

Cuối cùng, tất cả những gì chúng tôi muốn đạt được là giúp xây dựng các ứng dụng mà mọi người sẽ thích sử dụng và giữ như một phần của cuộc sống hàng ngày của họ. Còn nhiều điều nữa chúng tôi có thể đề cập, nhưng tôi đoán mọi người đều có phương pháp của riêng họ khi thực hiện thử nghiệm ứng dụng di động.

Nguồn tham khảo: https://infinum.co/the-capsized-eight/10-app-testing-principles?fbclid=IwAR3zK30EMYWNTLHB8JDWbFBqTkXn8nGmlUJeNuQGh4-XNXOZ683yQ24l3Q8