<div align="center">

# Lời mở đầu
</div>

Đối với developer nói chung và web developer nói riêng thì việc có thể show off sản phẩm của mình làm ra cho nhiều người biết tới và sử dụng là vô cùng tuyệt vời. Và cũng có khá nhiều cách để có thể thực hiện được việc này: 
- Gọi người khác đến xem sản phẩm chạy trên máy local của bạn (ngày xưa sinh viên mình toàn dùng kiểu này :D :D) 
- Public localhost giống như [**bài viết này**](https://viblo.asia/p/gioi-thieu-ve-serveo-cong-cu-cho-phep-public-localhost-server-3P0lP9go5ox).
- Sử dụng host free: cái này phù hợp với những anh em đang mày mò tìm hiểu, học tập là chính và nó không mất phí :+1::+1::+1::+1:
    - Nếu site của bạn là static web: hãy deploy trong 1 nốt nhạc theo như [**bài viết này**](https://viblo.asia/p/ban-da-biet-cach-deploy-static-site-chi-trong-mot-not-nhac-ORNZqkXG50n).
    - Nếu site của bạn là dynamic web: hãy đọc tiếp bài viết này
- Xịn hơn nữa thì bạn có thể mua hosting, domain để deploy (mua ở đâu thì các bạn tự google nhé, giờ list vào đây thì lại mang tiếng là quảng cáo :grinning::grinning::grinning:)

<div align="center">

# Nội dung
</div>

<div align="center">

## Tìm hiểu về Heroku
</div>


> Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.

- Theo như định nghĩa trên trang chủ https://www.heroku.com/ thì heroku là một dịch vụ cung cấp cho người dùng (developers) môi trường để xây dựng, phát triển ứng dụng của mình trên cloud. Và cũng tiện nói về PaaS thì nếu bạn nào muốn tìm hiểu thêm thì có thể thao khảo [**bài viết này**](https://vn.cloud-ace.com/blog/about-saas-paas-iaas-daas/) (có đề cập đến các dịch vụ đám mây khác như là **IaaS**, **PaaS**, **SaaS** và **DaaS**)

- Nói tóm lại là bạn có thể deploy trang web của bạn lên heroku hoàn toàn miễn phí. Ngoài lý do miễn phí ra thì một nguyên nhân nữa giúp Heroku trở nên phổ biến là nó hỗ trợ khá nhiều ngôn ngữ (**Ruby**, **Python**, **Java**, **PHP**, ...).
- Do phần nội dung phía sau (deploy project lên Heroku) sẽ khá là dài nên lý thuyết tạm dừng ở đây nhé các bạn. Nếu các bạn muốn tìm hiểu sâu hơn có thể đọc trong phần document (mình đã để link ở phần tài liệu tham khảo).

<div align="center">

## Cách deploy một project lên Heroku
</div>

### 1. Chuẩn bị
- Chuẩn bị một project Laravel mà bạn muốn deploy.
- Đăng ký tài khoản trên Heroku (tất nhiên rồi, bạn sử dụng dịch vụ của họ mà)
- Cài đặt **Heroku CLI** (**command line interface**): để cài đặt Heroku CLI thì bắt buộc máy của bạn đã có cài đặt Git, cái này thì chắc anh em cũng đã quen thuộc rồi đúng không? Tuỳ vào OS mà bạn đang sử dụng thì có thể có các cách khác nhau để cài Heroku CLI:
    - Window: tải file exe tương ứng vs [64bit](https://cli-assets.heroku.com/heroku-x64.exe) và [32bit](https://cli-assets.heroku.com/heroku-x86.exe) rồi cài đặt như một ứng dụng bình thường.
    - Ubuntu:
        ```bash
        sudo snap install --classic heroku
        ```
    - MacOS: 
        ```bash
        brew tap heroku/brew && brew install heroku
        ```
- Như vậy là những thứ cần thiết đã được chuẩn bị xong, chúng ta sẽ bắt đầu từng bước deploy project Laravel của chúng ta lên Heroku.

### 2. Các bước thực hiện:
- **Bước 1**: Tạo repository 
    - Sau khi đăng nhập, ở màn hình dashboard, ấn vào "**Create new app**" để chuyển sang màn tạo repository bao gồm điền tên và chọn khu vực (**United States** hoặc **Europe**)
    ![](https://images.viblo.asia/9a07a231-4508-4b39-958f-a95312070126.jpg)
    - Sau đây là màn quản lý của ứng dụng của bạn:
    ![](https://images.viblo.asia/bfebbde8-0c44-4f4c-9f27-a00fde607209.jpg)
    
- **Bước 2**: Tạo database
    - Để tạo database cho project của bạn, từ màn quản lý ứng dụng như trong ảnh phía trên, chọn sang tab **Resources**. Ở phần Add-ons bạn tìm kiếm **Heroku Postgres**
    ![](https://images.viblo.asia/d872badb-77f1-43c8-8122-2786309b136a.jpg)
    - Một popup hiện lên cho bạn lựa chọn các gói tương ứng (cứ free mà triển thôi nhé các bạn)
    ![](https://images.viblo.asia/768e22e5-3846-4a66-b72e-7ea6eec9d023.jpg)
    - Tiếp theo ấn vào tên **Heroku Postgres** để di chuyển đến trang chi tiết quản lý database. Như các bạn có thể thấy ở trong ảnh thì database mới tạo ra có dung lượng 7,9Mb, chưa có bảng nào và không hỗ trợ bảo trì và rollback database (do bạn đang sử dụng gói free nên sẽ không thể sử dụng 2 chức năng này, nếu muốn trải nghiệm thì bạn có thể thử thay đổi sang gói trả phí)
    ![](https://images.viblo.asia/78ef7fb9-5486-4eb3-88e5-22918589803e.jpg)
    ![](https://images.viblo.asia/b5bbc3c5-e664-4eeb-bbef-1335b89cf836.jpg)
    <div align="center">
        Để sử dụng 2 chức năng trên, bạn sẽ phải nâng cấp lên gói Standard hoặc Premium
    </div>
    
    - Tiếp theo, chọn tab **Settings** và click vào **View Credentials** để lẩy thông tin cấu hình cho database:
    ![](https://images.viblo.asia/700b8a41-bde2-4ef5-b8fb-e969e1c19453.jpg)

- **Bước 3**: Settings cấu hình repositories trên Heroku:
    - Nếu như các bạn đã biết thì khi đẩy source code lên github thì một số file sẽ không được đẩy lên mà phải cho vào list **.gitignore**. Vì vậy, Heroku sẽ không thể nhận được những biến môi trường trong file **.env**. Vì lý do đó mà chúng ta sẽ phải khai báo những biến môi trường ấy ở trong phần **Settings/Config Vars**:
    ![](https://images.viblo.asia/f799623d-a3f2-4841-bad1-bdffe43800be.jpg)
    - Thêm **Buildpack**: như trong project Laravel của mình thì sẽ tạo thêm Buildpack PHP:
    ![](https://images.viblo.asia/77d9b7c4-866f-4936-b17f-dc3f6532785d.jpg)

- **Bước 4**: Cấu hình Heroku trong source code:
    - Trong thư mục public, chúng ta sẽ tạo file Procfile với nội dung như sau:
        ```
        web: vendor/bin/heroku-php-apache2 public/
        ```

- **Bước 5**: Heroku login và tiến hành deploy
    - Trong giao diện commandline, 
        ```bash
        heroku login
        ```
        nếu thu được kết quả giống như hình ảnh bên dưới thì tức là bạn đã login thành công:
        ![](https://images.viblo.asia/ad7cd4b3-69b8-45c8-ab3c-8d3bf97d6574.jpg)
    - Thêm remote repositories trên Heroku:
        ```bash
        heroku git:remote -a vuong-thai-95
        ```
        ![](https://images.viblo.asia/8c6eb628-f411-4ba8-b736-ebd47aa2a550.jpg)

    - Push code lên remote heroku vừa add: 
        ```bash
        git push heroku master
        ```
        Sau khi push code thành công và chờ build lại thì kết quả thu được sẽ giống như hình bên dưới
        ![](https://images.viblo.asia/341f5b5e-ecbe-48d9-b8ca-53ba9a00214c.jpg)

- **Bước 6**: chạy command trên Heroku:
    - Sau khi bạn build code thành công giống như ảnh phía trên, quay trở lại màn hình dashboard quản lý repositories của bạn. Click vào **More** và chọn vào dòng **Run console** 
     ![](https://images.viblo.asia/71dc4026-7b4e-47ef-b140-103df5d60d7f.jpg)
    - Chạy câu lệnh `php artisan migrate` để tiến hành tạo bảng trong database.

- **Bước 7**: cuối cùng bạn click vào **Open App** để xem thử thành quả của mình nhé. Còn đây là của mình. Chúc các bạn thành công!
    ![](https://images.viblo.asia/d5b3bad9-a654-4ff5-adea-175dd2a299dd.jpg)

    
<div align="center">

# Tổng kết
</div>

Như vậy là mình đã hướng dẫn các bạn cách để có thể deploy một project lên host free là Heroku. 
- Nếu cảm thấy bài viết này hữu ích với bạn, hãy upvote ủng hộ giúp mình nhé. 
- Còn nếu các bạn gặp phải khó khăn gì trong quá trình thực hiện thì hãy comment xuống dưới, mình sẽ cố gắng hỗ trợ giúp bạn.

Hãy cùng nhau xây dựng một cộng đồng chia sẻ kiến thức IT đông đảo và mạnh mẽ nhé.

<div align="center">

# Tài liệu tham khảo
</div>

- Heroku Document: https://devcenter.heroku.com/categories/reference
- Viblo: https://viblo.asia/tags/heroku
- [Google](https://www.google.com/search?sxsrf=ALeKk017VAmFHcwahZLotGpNeFVPLDnzvg%3A1608259352895&ei=GBfcX8mVNo_7-QbHvoL4BQ&q=deploy+web+to+heroku&oq=deploy+web+to+herok&gs_lcp=CgZwc3ktYWIQARgAMgIIADIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB46BAgjECc6BAgAEEM6BQgAELEDOggIABCxAxCDAToECC4QQzoFCC4QsQM6BwgjEOoCECc6BQgAEM0COgUIABDLAToFCCEQoAFQ4qgLWL2ODGDyngxoB3ABeACAAWiIAYAPkgEEMjIuMZgBAKABAaoBB2d3cy13aXqwAQrAAQE&sclient=psy-ab)