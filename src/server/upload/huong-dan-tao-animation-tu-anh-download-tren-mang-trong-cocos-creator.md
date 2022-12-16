![](https://images.viblo.asia/a3e53397-0a0f-4a18-a621-535bf24aa8db.jpg)

Chào các bạn!

Đợt rồi làm dự án mình có dịp trải nghiệm Cocos Creator(CC), để nói so sánh giữa CC và Unity cái nào hay hơn thì hơi khó với mình, vì mình cũng mới trải nghiệm nó được đâu đó 2 tuần thôi.

Nhưng có thể ngắn gọn 1 vài cảm nhận thế này:

- CC hơn Unity :
    + Nhẹ hơn: nhẹ hơn từ bộ cài, cách thức vận hành, cho tới bản build. Thật sự mình ấn tượng với việc play and run của CC, nó chạy trên web nhẹ như không ấy, trong khi đằng kia thì....
    + Mượt hơn: Cái này thì hơi cảm tính cá nhân, nhưng mình có chút cảm giác nó chạy mượt hơn thật, mình thử nghiệm trên cùng 1 máy là Galaxy s10, thì có đôi chút nghiêng về CC đó. Còn muốn đo chính xác chắc phải để dịp nào có nhiều thời gian :D
- Unity hơn CC :
    + Ổn định hơn: khá đúng với câu tiền nào của đó! ở đây tiền là nói về cái sự đồ sộ của Unity ấy, nó chiếm nhiều ổ cứng chắc cũng có lý do, trong quá trình làm việc với Unity bao năm, thật sự tới thời điểm này để làm game bằng Unity mình gần như không bao giờ gặp lỗi gì cả (nói cái Editor ấy ko phải nói code của mình nha =)) ), còn CC thì khá nhiều lỗi linh tinh, đặc biệt là nhiều khi còn phải khởi động lại CC nó mới hết lỗi cho. Khá là dị, kể cả với Collision cũng thỉnh thoảng có lỗi khó hiểu nữa, cái này chắc phải nghiên cứu thêm (Collision tạo sẵn chưa có code nha!).
    + Đầy đủ hơn: Với CC thì đôi khi bạn phải phụ thuộc khá nhiều vào các app bên ngoài, ví dụ làm animation, làm particle,... khá giống với thời đầu của Unity. Nhưng ở thời điểm hiện tại, khi Unity nó mua hết mấy cái thằng làm plugin cho nó rồi tích hợp vào cho nhanh, thì quả thật nó như là cái gara sửa chữa ô tô vậy, cái gì cũng có, với tay là có, thật sự là làm việc với Unity bạn chỉ cần có nó là đủ!
    + Có thể debug trên Editor: cái này ko biết là mình ko biết hay CC nó ko có thật, mỗi lần ấn play thì nó sẽ ko cập nhật trạng thái trên Editor nữa, bạn có sửa gì về tọa độ, biến này kia thì nó cũng sẽ reset lại game trên giả lập hoặc brower thôi, còn với Unity nó sẽ cập nhật trực tiếp vào trạng thái đang run, rất tiện lợi để debug, nhất là vụ debug liên quan tới vật lý thì lại càng quá tiện!


Thôi sơ cua vậy thôi, chứ thật ra 2 tuần chắc mình cũng chỉ được coi là cưỡi ngựa xem hoa, nhận xét linh tinh đúng ko sao sai các bạn lại nhọc công chửi :v

Ở bài viết này mình sẽ hướng dẫn cho các bạn mới vào CC như mình biết làm sao để tạo ra được 1 Animation từ 1 spritesheet lấy trên mạng về! bên Unity thì cứ quăng vào là edit được, bên CC mình mò ko ra vì vậy đành làm cách này, bạn nào có cách gì hay ho hơn comment cho mình xin học hỏi với nhé!

Bước 1: Kiếm ảnh trên mạng:
- Các bạn cứ search từ khóa "Spritesheet" thì google cho ra vô số kết quả, pick bừa 1 cái về ae mình mần với nhau nhé! ;)

![](https://images.viblo.asia/59ac97b7-cee9-47ca-8e7d-de9d5f52327c.png)

Bước 2: Đưa ảnh vào Photoshop tách background:
- Đôi khi ảnh lấy về là free vì vậy chúng ta không thể đòi hỏi nó là png hay được được tách background cho rồi, vì vậy nhọc công chút để có thành quả ngon nha!

![](https://images.viblo.asia/8dfc8834-ccd1-4d1f-9191-28070e61c960.png)

- Các bạn chọn như hình, sau đó ấn nút Delete, rồi save hình lại là ta đã có 1 hình png không có background đề dùng rồi ;)

Bước 3: Đưa ảnh vào TexturePacker để tách:
- Sở dĩ phải đưa vào để tách là vì mình không biết cách dùng ngay ảnh này làm animation, vì vậy mình sẽ tách nó ra trước, sau đó lại cho vào để sinh file plist animation :v
- Sau khi bật TexturePacker lên, các bạn ấy vào nút Split sheet, sau đó kéo ảnh vào:

![](https://images.viblo.asia/ecf60ded-d1f9-4ba8-b3ed-26451a5772eb.png)

![](https://images.viblo.asia/261bf2e2-6af8-4f08-8d7c-15dcbc1e3884.png)

- Sau khi ấn save các bạn sẽ được 1 thư mục với các ảnh đã được cắt ra như sau:

![](https://images.viblo.asia/8580a9f2-90be-4f5a-9f6c-eba32f61d31c.png)

Bước 4: Tạo plist từ thư mực ảnh vừa có được:
- Các bạn mở TexturePacker ra, kéo cả thư mục ảnh vừa có được ở trên vào để tạo animation.

![](https://images.viblo.asia/e32e4ec4-4c62-4bbe-9fb1-f861025fe6ec.png)

- Sau đó các bạn ấn Publish sprite sheet là đã có file plist, kèm theo 1 ảnh đã được đóng gói lại.

P/s: Tới bước này chắc nhiều bạn sẽ hỏi mình là ủa chứ trong CC không dùng tất cả các ảnh lẻ kia để làm 1 animation được à? câu trả lời là hoàn toàn có thể được, nhưng khi mình thử nghiệm thì thấy việc đóng gói này sẽ có tốc độ render nhanh hơn (có thể thấy được khi run nó hiện ở góc bên trái phía dưới), Cái này thì đợi các chuyên gia đánh giá thôi, còn mình thì cũng chỉ biết dựa vào kinh nghiệm cá nhân thôi! 

Bước 5: Tạo animation trong CC với file Plist và ảnh gộp vừa tạo:
- Các bạn copy ảnh và file plist vừa có được ở bước 4, sau đó tạo 1 sprite node như bình thường.

![](https://images.viblo.asia/eaf33dcc-525a-49d3-a82d-6f611bfa4364.png)

- Add Animation component vào sprite trên.

![](https://images.viblo.asia/6234ffd6-212c-40b0-83fa-ba6647d9b769.png)

- Tiếp tục ấn Create a new Clip file.

![](https://images.viblo.asia/6a644f51-c181-4d7f-a95d-664d19a34f20.png)

- Ấn vào nút edit góc bên trái phía trên của cửa sổ Timeline.

![](https://images.viblo.asia/4d062bab-8771-4fc2-992b-dd41cadf0ade.png)

- Add Property có tên là cc.Sprite.spriteFrame.

![](https://images.viblo.asia/1ac4cc86-6de5-478a-b673-394f3f468df7.png)

- Kéo toàn bộ các Frame trong file plist vào trong Timeline hàng spriteFrame.

![](https://images.viblo.asia/92c1abdf-b07d-4a4a-b4fa-9dffe23c322a.png)

- Các bạn có thể set Sample hoặc Speed để thay đổi tốc độ của animation.
- Chọn WrapMode là loop để animation chạy liên tục.

![](https://images.viblo.asia/a8bd9b84-d4ed-4aae-a822-c301642b61ec.png)

- Ấn lại vào nút edit góc bên trái phía trên của cửa sổ Timeline sau đó save animation lại.
- Kéo animation vừa tạo vào property Default Clip của sprite node tạo ở bước trên. Nhớ chọn Play On Load nha!

![](https://images.viblo.asia/7ef87c6d-fc5f-45ad-af5a-0cb100fcab88.png)

- Ấn run để thấy thành quả! ^_^

Cảm ơn các bạn đã kiên nhẫn đọc bài tới đây nhé! Chúc các bạn sẽ có những game thú vị và thành công ^_^