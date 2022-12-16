## 1. Cypress là gì?

Cypress là công cụ kiểm thử được xây dựng cho web, nó sử dụng  JavaScript frameworks. Nó giải quyết những vấn đề khó khắn chính mà các developers và tester phải đối mặt khi kiểm thử các ứng dụng web.

Cypress thường được so sánh với Selenium, tuy nhiên Cypress khác nhau về căn bản cũng như kiến trúc. Cypress không bị ràng buộc bởi các cơ chế giống như Selenium. Nhờ đó, bạn có thể viết kịch bản test nhanh hơn, dễ dàng hơn và đáng tin cậy hơn.

Cypress cho phép bạn có thể thử ở các giai đoạn phát triển phần mềm: 
- End-to-end tests
- Integration tests
- Unit tests

Cypress là 1 công cụ miễn phí, mã nguồn mở, được cài đặt cục bộ và có Dashboard Service để ghi lại các thử nghiệm của bạn.

## 2. Tính năng

- **Time Travel**: Cypress chụp ảnh khi chạy kịch bản test. Có thể di chuột qua các câu lệnh trong *Command Log* để xem các step hoạt động thế nào.
- **Debuggability**:  Dễ dàng biết nơi nào xảy ra lỗi và thông tin cung cấp của nó rất dễ đọc.
- **Automatic Waiting**: Không cần thêm thời gian wait hoặc sleeps vào scripts của bạn, Cypress tự động đợi phần tử xuất hiện trước khi tiếp tục, sẽ không còn địa ngục async nữa.
- **Spies, Stubs, and Clocks**: Xác minh và kiểm soát hoạt động của các chức năng, phản hồi của máy chủ hoặc bộ hẹn giờ.
- **Network Traffic Control:**: Dễ dàng kiểm soát và kiểm tra các trường hợp liên quan đến băng thông mạng, bạn có thể khai báo lưu lượng mạng theo bất kì cách nào bạn mong muốn.
- **Consistent Results**: Kiến trúc không sử dụng Selenium hoặc Webdriver, các kịch bản test được thực hiện nhanh chóng, nhất quán và đáng tin cậy.
- **Screenshots and Videos**: Tự động chụp màn hình khi xảy ra lỗi và quay video toàn bộ quá trình chạy kịch bản test khi chạy từ CLI.
- **Cross browser Testing**: Hỗ trợ chạy trên Firefox, Chrome, Edge, Election và tối ưu trong một quy trình tích hợp liên tục.

## 3. Ưu nhược điểm

### 3.1. Ưu điểm

- Mã nguồn mở, không mất phí.
- Đơn giản, dễ cài đặt và viết kịch bản test.
- Document đầy đủ, chi tiết, có tích hợp sẵn các examples trong tool giúp cho người mới bắt đầu dễ tiếp cận hơn.
- Debug dễ dàng do các thao tác đã được ghi lại trong quá trình chạy kịch bản test.
- Không cần thêm thời gian wait hoặc sleeps vào scripts của bạn, Cypress tự động đợi phần tử xuất hiện trước khi tiếp tục.
- Dễ dàng kiểm soát và kiểm tra các trường hợp liên quan đến băng thông mạng, bạn có thể khai báo lưu lượng mạng theo bất kì cách nào bạn mong muốn.
- Hỗ trợ chụp ảnh lỗi và quay video toàn bộ quá trình chạy kịch bản test.
- Cung cấp trang *Dashboard service* có thể xem tổng quan, báo cáo kết qủa sau mỗi lần chạy.

### 3.2. Nhược điểm

- Cộng đồng sử dụng chưa nhiều.
- Không hỗ trợ test trên native mobile app.
- Không thể hỗ trợ tương tác với nhiều tab do chạy bên trong trình duyệt.
- Nếu là bản free thì trang *Dashboard service* có 1 số hạn chế nhất định, nếu muốn sử dụng full dịch vụ thì phải mất phí.
- Chỉ hỗ trợ Javascript.
- Hỗ trợ 1 số ít framwork: Mocha JS.
- Trình duyệt được hỗ trợ còn hạn chế: chỉ hỗ trợ Firefox, Edge, Chrome, Election.

## 4. Cài đặt

Cypress là ứng dụng desktop được cài đặt trên máy tính của bạn. 
- Ứng dụng hỗ trợ các hệ điều hành: 
   +  macOS 10.9 trở lên( chỉ dành cho 64-bit).
   + Linux:  Ubuntu 12.04 trở lên, Fedora 211 và Debian 8( chỉ dành cho 64-bit).
   + Window 7 trở lên.
- Hỗ trợ Noje.js 12 hoặc 14 trở lên.
- Nếu bạn sử dụng Linux, bạn nên cài đặt các dependencies trên hệ thống của mình

> **Ubuntu/Debian**
> ```
> apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
> ```

>  **CentOS**
> ```
> yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib
> ```

Bạn có thể cài đặt Cypress qua command hoặc download gói cài về và tiến hành cài đặt

### Cách 1: Download trực tiếp

Khi bạn không muốn sử dụng `Node` hoặc `npm` trên project của bạn hoặc muốn cài đặt nhanh chóng, bạn có thể click vào link:https://download.cypress.io/desktop. Sau khi download về máy, bạn chỉ cần giải nén, nhấn đúp, Cypress đã được cài đặt mà không cần cài bất cứ dependencies nào.

 *Lưu ý*:  việc download trực tiếp giúp bạn có thể dùng thử Cypress  version mới nhất một cách nhanh chóng. Nhưng Cypress không thể ghi lại các lần chạy trên Dashboard, để ghi lại các lần chạy vào Dashboard bạn cần cài đặt Cypress như một npm dependency. 

### Cách 2: Cài đặt quan command

*Lưu ý*: Trước khi cài đặt Cypress, bạn cần cài đặt npm/yarn để tạo và quản lý các thư viện lập trình Javascript (npm: https://stackjava.com/nodejs/huong-dan-cai-dat-cau-hinh-nodejs-npm-tren-windows.html hoặc yarn: https://viblo.asia/p/yarn-mot-cai-tien-dang-ke-so-voi-npm-yMnKMqRQK7P)
 
 Mở Terminal và gõ lệnh dưới đây để cài đặt:
 
>  - Trỏ đến thư mục bạn mong muốn cài Cypress
>  
>    ` cd /your/project/path`

>  - Qua npm install
> 
>    `npm install cypress --save-dev`

> - Qua yarn add
> 
>   `yarn add cypress --dev`
  
 Màn hình hiển thị như dưới nghĩa là bạn đã cài đăt Cypress thành công: ![](https://images.viblo.asia/19155f20-2bd8-4957-bfd4-1650e1fbd661.png)

>    Khi cài đặt xong, bạn chỉ cần mở cypress bằng command dưới và sử dụng:
>    
>    `./node_modules/.bin/cypress open`
  
>  Hoặc sử dụng npx nếu version npm > v5.2
>  
>  ` npx cypress open`

>  Hoặc yarn
>  
> ` yarn run cypress open`

## 5. Kết
  Với bài viết này tôi mong các bạn có thể hiểu sơ lược về Cypress, hẹn gặp lại các bạn ở các bài viết tiếp theo về Cypress.

Tài liệu tham khảo: https://docs.cypress.io/guides/overview/why-cypress#Debugging-tests
https://www.browserstack.com/guide/cypress-vs-selenium
https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements