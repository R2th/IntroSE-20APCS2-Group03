# Vấn đề
Chuyện là dự án mình đang làm chạy khá là trơn tru, mọi người đều vui vẻ và enjoy cái moment này. Vào một ngày đẹp trời, bên khách hàng đổ dữ liệu lên đến hàng triệu dòng, thật ra mình thích nói là hàng tỉ hơn nghe cho nó to lớn. Thế là không còn dùng được MySQL nữa mà phải chuyển qua Elasticsearch. Trong quá trình viết command để sync data thì mình gặp vấn đề về memory với laravel chunk cụ thể là chạy hồi hết RAM để chạy, RAM cứ tăng mãi không ngừng. Không biết tại sao chunk lại bị leak memory như vậy. Thế là khi giải quyết xong vấn đề về leak memory với chunk thì mình quyết định lên mở discussion để hỏi xem cộng đồng có ai gặp vấn đề tuơng tự và biết lí do vì sao cũng như là cách khắc phục hay không. 
# Cách mở discussion
Các bạn vào đường dẫn này: https://github.com/laravel/framework/discussions?discussions_q=
![image.png](https://images.viblo.asia/08273c59-72e1-4701-8716-e7d67bfd9b0d.png)
Sau đó, các bạn bấm vào nút `New Discussion` để mở một discussion mới. Lưu ý là nhớ tìm ở ô search về vấn đề của mình có ai discuss chưa nhé, nếu có rồi thì nhảy vô discuss cho xôm chứ đừng mở discussion mới, bị duplicate, người khác vào xem dễ confuse.
![image.png](https://images.viblo.asia/e8897494-3f33-4c33-a123-513febccab87.png)
Sau đó, các bạn bấm vào nút `New Discussion` để mở một discussion mới. Lưu ý là nhớ tìm ở ô search về vấn đề của mình có ai discuss chưa nhé, nếu có rồi thì nhảy vô discuss cho xôm chứ đừng mở discussion mới, bị duplicate, người khác vào xem dễ confuse.
Sau đó thì điền những thông tin cần thiết vào. Title thì tóm tắt vấn đề thôi xong nhớ chọn Category nữa, ở đây mình chỉ hỏi nên chỉ chọn Q&A thôi. Điền nội dung vào, nội dung thì sẽ theo format của markdown ví dụ như heading 1 thì #, heading 2 thì ##. Sau đó các bạn có check vào ô checkbox để make sure là bạn đã kiếm về nội dụng mình đang nói trong tất cả discussion rồi, không có nên bạn mới mở discussion mới mẻ này. Sau tất cả, bấm vào nút `Start new discussion`. 
![image.png](https://images.viblo.asia/be31d6c4-2444-4f64-a9ab-a3c7a1386f51.png)
Các bạn có thể bấm tab preview để xem discussion của mình sẽ trông như thế nào để nếu mà không vừa ý thì có thể vào edit lại cho vừa ý.
![image.png](https://images.viblo.asia/0311bf6a-3d59-41ad-9f92-2b4f43dd0db0.png)
Tada, vậy là xong, chờ cộng đồng vào discuss để tìm ra nguyên nhân hoặc hiểu rõ hơn về vấn đề thôi.