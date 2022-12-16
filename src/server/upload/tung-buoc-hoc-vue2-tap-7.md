**Giới thiệu cơ bản về Vue 2**

Chào mừng các bạn đã quay trở lại với series Từng bước học Vue2 tập 7.

Hôm nay chúng ta sẽ tiêp tục bài học về Component ở tập trước.

Hiện tại chúng ta đang dùng nhiều cặp thẻ <task> để hiển thị nhưng như thế thì trông lại không đẹp 1 chút nào, để trông code đẹp hơn cũng là nhanh tiện chúng ta sẽ thay đổi 1 chút. Đầu tiên ở file index.html chúng ta sẽ thay các thẻ task bằng 1 cặp thẻ task-list
    ![](https://images.viblo.asia/bdd820f9-eeeb-420f-b26e-6d52b1256989.png)
    
Còn ở file main.js chúng ta sẽ thêm vào 1 component task-list và data như sau.
    ![](https://images.viblo.asia/fba2cf46-e6a2-4276-aedd-7082cbc3b56c.png)

Về phần template ở task-list cũng cần thay đổi 1 chút
    ![](https://images.viblo.asia/9b234f32-93ac-4387-9f2f-63a03d7d77d8.png)

 Giờ cũng chuyển qua trình duyệt 
    ![](https://images.viblo.asia/7b8728d6-976f-4372-b030-2715459d3cb7.png)

Không có gì hiển thị cả, cùng bật sang Inspect để xem lỗi
    ![](https://images.viblo.asia/d7c19eea-f34d-4cee-938e-ccc90a58e64a.png)

 Lỗi trên có thể hiểu là với mỗi template ở trong component thì cần 1 single root element. Vậy đơn giản chúng ta thay đổi 1 chút như sau
    ![](https://images.viblo.asia/0e345950-5e12-4956-aa4b-59b2ed309cdd.png)

 Và kết quả sẽ có
    ![](https://images.viblo.asia/b17509e1-3a1f-405e-af3a-c7072b62c525.png)

Okie, bài học hôm nay cũng dừng lại ở đây, vào tập tiếp theo mình sẽ giới thiệu đến các bạn 1 loại Component khác, cùng đón chờ nhé

Hẹn gặp lại các bạn vào bài tiếp theo trong Series nhé !!!!