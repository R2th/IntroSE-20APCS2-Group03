<div align="center">
            
# Lời mở đầu
    
</div>

- XIn chào tất cả các bạn và mình đã quay trở lại rồi đây. Đây sẽ không phải là một bài viết chuyên sâu về kỹ thuật mà thiên về chia sẻ tips, trick hơn. Không phải là mình lười tìm hiểu, chia sẽ về kỹ thuật đâu mà thực ra là mình thấy mấy bài viết kiểu này thì sẽ không bị kén người đọc thiên về một kỹ thuật nào đó, vì vậy nó dễ tiếp cận người đọc hơn (nhiều views hơn :laughing::laughing:).
- Nếu như các bạn từng xem bài viết [Cải thiện tốc độ code với các phím tắt thông dụng trong VS Code](https://viblo.asia/p/cai-thien-toc-do-code-voi-cac-phim-tat-thong-dung-trong-vs-code-aWj537Op56m) này của mình thì hôm nay tiếp tục là một bài viết về code editor này. Và như tiêu đề bài viết này thì mình sẽ chia sẻ đến các bạn những **extensions** mà mình đang sử dụng và thấy nó thực sự hữu ích, không chỉ cải thiện kha khá thời gian làm việc mà còn giúp tránh được những lỗi ***nhảm nhí*** trong quá trình code nữa. 
- Tất nhiên đây chỉ là những extensions mà mình đang xử dụng nên có thể có nhiều extensions hữu ích khác mà mình chưa biết, không liệt kê trong bài viết này, nếu bạn biết extensions hữu ích nào khác thì đừng ngần ngại comment chia sẻ cho mình và nhiều người cùng biết nhé!
- Bắt đầu thôi nào! 

<div align="center">
            
# Nội dung
    
</div>

# 1. [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
![image.png](https://images.viblo.asia/ca105649-ce6a-4c75-9701-a18f36198df6.png)

- Chắc mình cũng không cần quảng cáo quá nhiều về chất lượng của extensions này nữa phải không, 9,5 triệu lượt tải và 5* đánh giá đã nói lên tất cả rồi.
- Nếu bạn đã và đang làm việc với Git thì chắc hẳn không lạ lẫm gì với câu lệnh `git blame` phải không nào. Và chức năng nổi bật nhất của GitLens cũng tương tự như vậy nhưng nó xịn hơn ở chỗ sẽ show cho các bạn biết dòng code hiện tại được sửa đổi lần cuối trong commit nào, viết bởi ai ngay trong giao diện của VS Code. 
- Và bạn sẽ không phải mất thời gian đi tìm xem "thằng nào code đoạn này mà ngu thế này" rồi ngại ngùng nhận ra cái tên của mình nằm chình ình ở đó :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye: (cái này **4fun** thôi vì tư duy đổ lỗi không tốt một tí nào cả trong công việc lẫn cuộc sống các bạn ah).

- Không chỉ vậy, GitLens còn cho phép bạn xem được lịch sử thay đổi của cả file hoặc một số dòng code nhất định giống như gif bên dưới

![](https://images.viblo.asia/460ebc26-7d61-40e1-ba9a-76905f1ad01b.gif)


# 2. [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
![image.png](https://images.viblo.asia/2810d428-2c23-4084-a87c-379e5c0dc1e4.png)

- Đúng như cái tên của nó, extensions này sẽ giúp bạn kiểm tra lỗi chính tả trong file code của bạn, nếu có một chỗ nào viết sai chính tả thì sẽ được gạch chân rất nổi bật giống như hình bên dưới. Mặc định thì nó sẽ check chính tả tiếng Anh nhé, tuy nhiên nó cũng hỗ trợ ~20 ngôn ngữ quốc tế khác, nếu cần thì các bạn có thể tìm chính xác ngôn ngữ mà mình cần.

![image.png](https://images.viblo.asia/aa021c7c-a657-4cab-9966-18e15be4ec85.png)

- Và với một đứa tiếng Anh nhàng nhàng như mình thì đây đúng là một "siêu phẩm" cứu rỗi cuộc đời mình.
# 3. [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
![image.png](https://images.viblo.asia/09891e82-7e62-4290-95f1-d3a4b5a2c388.png)

- Nếu như bạn có làm việc với docker (giống như mình) thì đây chắc chắn là một extension không thể bỏ qua. 
- Nó giúp bạn có thể quản lý các container/image một cách cực kỳ dễ dàng với những thao tác quen thuộc như là pull/run/remove một image. hoặc là view logs/stop/restart một container nhất định.

![](https://images.viblo.asia/c23cc6bc-8ff4-425f-bad7-a89b8427bbdd.jpg)


# 4. [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)

![image.png](https://images.viblo.asia/bae17f90-eac9-4db1-8454-fdb581d25c9c.png)

- Trong tình hình dịch bệnh hiện tại thì chắc nhiều bạn cũng đang phải làm việc tại nhà, và nếu không được mang máy tính công ty về thì việc setup môi trường trên máy cá nhân sẽ mất rất nhiều thời gian với những thao tác lắt nhắt.
- Và giống như tính năng sync của Chrome dựa vào tài khoản google thì **Settings Sync** sẽ sử dụng tài khoản **Github** để đồng bộ các dữ liệu cho bạn khi setup một máy tính khác, rất tiện phải không nào.

![image.png](https://images.viblo.asia/64625f5a-e1be-4023-a101-660e21af4c4b.png)
# 5. [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)

![image.png](https://images.viblo.asia/9faab44f-5a45-4a9a-ac01-99d04b33a982.png)

- Không biết các bạn đã bao giờ phải vẽ wireframe hay các lược đồ use case khi phân tích, phát triển dự án chưa. Nếu rồi thì bây giờ bạn sẽ không cần phải lên tận web draw.io nữa mà có thể vẽ ngay trực tiếp trên giao diện của Visual Studio Code. Chỉ cần tạo ra một file có đuôi `.drawio` là bạn đã có thể vẽ luôn được rồi. Và như ví dụ trong gif bên dưới thì bạn cũng có thể sửa code để tùy chỉnh hình ảnh mà bạn thu được.

![](https://images.viblo.asia/f2f38acd-8da3-4356-8356-6c0149ad0422.gif)


<div align="center">
            
# Kết luận
    
</div>

- Tất nhiên là tùy vào mỗi ngôn ngữ lập trình khác nhau thì sẽ cần sử dụng những extensions khác nhau nên trong phạm vi bài viết này mình chỉ liệt kê những extensions chung chung, không liên quan trực tiếp đến một ngôn ngữ nào cả, tuy nhiên mình vẫn hy vọng những gì mình chia sẻ trong khuôn khổ bài viết này sẽ hữu ích với các bạn trong quá trình làm việc hằng ngày. 
- Nếu bạn đang sử dụng những extensions hay ho nào khác thì đừng ngần ngại chia sẻ cho mình biết ở dưới phần comment nhé.

<div align="center">
            
# Tài liệu tham khảo
    
</div>