![](https://images.viblo.asia/72ab07c3-a52a-4733-9908-b4d4d4bc117b.jpeg)

Web Framework nhìn chung chia làm 2 loại là full-feature framework và micro framework. Trong Python, tiêu biểu cho full-feature framework là Django, micro framework là Flask.

Full-feature framework và micro framework đơn giản chỉ khác nhau về số lượng feature được đóng gói kèm theo trong framework.

Full-feature framework sẽ bao gồm tất tần tật từ routing, template engine, session, persistence, authentication & authorization... đến các advanced feature hơn như caching, scheduler, worker…

Micro framework thông thường chỉ có routing và filter/middleware kèm theo. Các thành phần khác muốn sử dụng thì tự thêm vào thông qua extension/plugin/module...

Nếu phân loại theo server thì Python Web Framework có hai nhóm. Một nhóm sử dụng WSGI, nhóm còn lại sử dụng ASGI. WSGI ra đời trước, sử dụng cơ chế blocking I/O truyền thống như Apache Httpd, Java Servlet... ASGI có sau này, sử dụng cơ chế non-blocking I/O tương tự như đám Nginx, Nodejs, Vertx...

WSGI có các framework hỗ trợ: Django, Flask, Pyramid, TurboGears…

ASGI có các framework hỗ trợ: FastAPI, Falcon, Sanic, Hug...

Hiện tại có một số framework cho phép bạn lựa chọn giữa WSGI và ASGI khi bootstrap new project. Tùy theo sở thích và yêu cầu mà bạn nên cân nhắc lựa chọn server cho phù hợp.

Quay trở lại với câu hỏi ban đầu là nên học Python Web Framework nào trong năm 2021? Ngắn gọn thôi: full-feature thì Django, micro thì FastAPI. Đơn giản là hai anh chàng này xịn xò nhất hiện nay, cộng đồng mạnh, tính năng hiện đại.

Django thì quá đỉnh rồi, đã được thử lửa mấy chục năm rồi. Làm web, làm REST API đều ổn. Write model, write chút routing rồi generate code phát một là có cả admin dashboard, rất phù hợp với những thứ cần làm MVP thật nhanh. Tất nhiên là muốn customize sâu thì cũng phức tạp đấy không đơn giản như nhập môn đâu! :D

FastAPI - anh chàng này là lính mới, mới có tầm 2–3 năm trở lại đây thôi nhưng phát triển rất nhanh. Bản chất anh này cũng dựa trên các project có sẵn như Starlette, Pydantic, Swagger... nhưng đóng gói lại, viết thêm một số high-level API cho dễ dùng. FastAPI rất phù hợp để làm REST API và microservices vì lightweight và tương đối dễ customize. Meete đã sử dụng trên production gần 2 năm qua và đánh giá resource usage và performance rất ổn.

À thêm cái nữa là anh tác giả FastAPI rất nice nhé, có vấn đề bạn có thể phản hồi trực tiếp với anh trên Twitter.

Ok nhé! Giờ thì học thôi! :D

[Source](https://medium.com/@tu/n%C3%AAn-h%E1%BB%8Dc-python-web-framework-n%C3%A0o-trong-n%C4%83m-2021-fc2a2f35946)