Mình ko biết gì nhiều về backend, nên thực tế để làm 1 cái gì đó thì thường dùng cms hoặc có bạn backend làm làm cùng. Từ đó mình đã tìm hiểu và biết được wordpress có cung cấp api, nghĩa là ở phía backend mình dùng wordpress nhưng chỉ trang admin để soạn bài, bên frontend thì có thể dùng react hoặc bất cứ framework nào để làm SPA. Thế là mình đã thử xem có gì hay ho.
## install wordpress
môi trường là mac os
* [ install MAMP ](https://wpshout.com/how-to-install-mamp-on-your-mac/) - no như kiểu xampp vậy
* [download wordpress](https://wordpress.org/download/)
* ![](https://images.viblo.asia/7925f5bb-fcac-4231-9ce5-ff5571c6a1a0.png)https://images.viblo.asia/7925f5bb-fcac-4231-9ce5-ff5571c6a1a0.png
* Unzip file WordPress zip vừa download vào kéo nó vào folder của bạn, ở đây mình đặt trong home và tên là "site" luôn
* ![](https://images.viblo.asia/3a29f8c3-9ac6-426f-ae71-d481baa481e3.png)https://images.viblo.asia/3a29f8c3-9ac6-426f-ae71-d481baa481e3.png
* install MAMP rồi click "Open WebStart Page"
* ![](https://images.viblo.asia/58170f3a-6d9c-4c71-af56-27eda99ed25f.png)
* Vào tool -> chọn phpadmin rồi tạo db như bình thường
* ![](https://images.viblo.asia/01d8e666-4d3c-4d40-8985-8702fa80f7dd.png)
* Rồi cài đặt wp như bình thường
## Api wordpress
Khi click Open WebStart Page thì bạn sẽ thấy cái link của nó như này: "http://localhost:8888/MAMP/?language=English" -> bạn đổi thành "http://localhost:8888/ten-folder-luc-unzip-wordpress"
ko chạy thì vào mamp chọn references/webserver rồi trỏ lại đường dẫn
Xong xuôi nó sẽ đưa bạn về trang wordpress admin như này
![](https://images.viblo.asia/03a1cde5-724c-4641-bee1-d706d446f765.png)

Giờ bạn trỏ đường dẫn trên link thành như này "http://localhost:8888/wordpress/wp-json/wp/v2"
nó sẽ mở ra cho bạn 1 object, trong key routes thì là các api nó cung cấp, cái này như kiểu docs đơn giản vậy
![](https://images.viblo.asia/761f6c05-bd1b-44de-8b4d-c181ad368465.png)
Từ đây mình sẽ thử vài cái routes get categories, get  posts
Ví dụ như đây là get categories về
![](https://images.viblo.asia/45c96af9-5e21-4d24-a687-685864fde499.png)
Để biết rõ hơn xem wordpress nó cung cấp những api gì thì các bạn xem ở đây https://developer.wordpress.com/docs/api/
Mà đã get dc api về rùi thì sử dụng nó với react cũng không khó nữa, vì thực tế mục đích mình chỉ là dùng phía frontend thôi 
Còn custom api thì hơi khó vs mình. 
React thì phần sau nói tiếp nhớ :v