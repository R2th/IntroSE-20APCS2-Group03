Trong 2 bài viết trước mình có nhắc tới `JAM Stack`, `JAM Stack` là viết tắt cho Javascript, API và Markup. Gần đây, JAM stack trở nên phổ biến hơn bên cạnh các stack hiện có như LAMP, MEAN. Các static web mà chúng ta xây dựng trong 2 bài trước, mình sẽ triển khai chúng lên `Netlify`, một static hosting (có option miễn phí ).

## Giới thiệu về JAM Stack
### JAM Stack là :

- Javascript (J): Front end framework, chạy hoàn toàn bên phía client, có thể dùng bất cứ framework phổ biến nào như VueJS, ReactJS, AngularJS
- API (A): Các HTTP API tự tạo hoặc các vendor API có thể được truy cập bằng Javascript Client.
- Markup (M): Template được build trước khi deploy, sau đó push lên server và lúc nào server có thể coi như một trang web tĩnh (static website).

Các ứng dụng sử dụng JAM Stack được deploy đơn giản, source code được lưu trữ trên Git, khi muốn thay đổi nội dung website thì ta thay đổi source code và push lên Git. Account Github được liên kết với Netlify App sẽ khiến  cho Netlify nhận ra thay đổi và tiến hành build lại source code và lưu lại trên đó.

### JAM Stack có điểm mạnh gì?

- Tốc độ load nhanh: Tất cả các trang của website đều được build thành các trang tĩnh và host lên, chúng không cần truy cập tới DB. Việc cache sẽ sử dụng `Service Worker` để cache nội dung website trên client.
- Bảo mật tốt
- Offline support: Với Service Worker thì người dùng vẫn có thể truy cập trang web của bạn khi không có internet.
- Chịu tải tốt
- Chi phí thấp : Với việc sử dụng JAM Stack, có rất nhiều lựa chọn các nhà cung cấp hosting từ giá rẻ tới miễn phí.

## Netlify

[Netlify](https://netlify.com) là một nền tảng all-in-one cho việc triển khai dự án web. Thay  thế cho các kiến trúc hosting cũ, `Netlify` cung cấp CI, deployment pipeline với quy trình đơn giản. 

![](https://images.viblo.asia/b877d087-287f-453f-af39-00fee27ed25b.png)

### Liên kết tài khoản Netlify với Github repository.

Sau khi đăng ký tài khoản Netlify, để triển khai 1 trang web mới lên `Netlify`, bạn click vào `New site from Git`.

Bạn phải cho phép Netlify access vào tài khoản Github của bạn thông qua Github App, sau đó ở bước 2, bạn chọn Github Repository của website cần triển khai.
![](https://images.viblo.asia/d93408d4-2e74-413e-9e7f-10e6abe5a37e.png)

Ở đây mình sẽ triển khai chính website được dựng bằng Gridsome trong bài viết trước, vì thế mình sẽ điền

```
# Build command
gridsome build
# Publish directory
dist
```

Và chọn `Deploy Site`.

![](https://images.viblo.asia/04e0c249-4bcd-418c-8181-e6d58a1435a6.png)

Bạn có thể vào trang Deploy Log để xem quá trình build ứng dụng 

![](https://images.viblo.asia/bf4fdcff-acbe-479c-8fc9-5b5d92d42ac0.png)

Output của phần logs như vậy là thành công 
```bash
5:07:31 PM: 0 new functions to upload
5:07:31 PM: Starting post processing
5:07:31 PM: Post processing done
5:07:32 PM: Site is live
5:07:49 PM: Finished processing build request in 53.638337233s
```

Kết quả là bạn sẽ nhận được 1 trang preview như này https://5ed0df6612552aca80108a9e--hungry-poincare-77411b.netlify.app/