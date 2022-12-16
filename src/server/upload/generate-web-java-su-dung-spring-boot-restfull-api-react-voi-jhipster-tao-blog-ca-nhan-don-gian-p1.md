# Giới Thiệu về Jhipster
- Ở bài viết này mình sẽ giới thiệu đến các bạn Jhipster. Đây là một công cụ rất hữu ích giúp các bạn có thể tạo ra 1 project java web một cách nhanh chóng và đầy đủ các chức năng cần thiết. Jhipster hỗ trợ cho chúng ta rất nhiều công nghệ khác nhau. Phía Backend bạn thể dùng nhiều công nghệ như Spring boot, Spring Sercurity, Maven, Grandle,... Phía Frontend bạn có thể dùng các framework như React, Angular, VueJs, ... Bạn cũng có thể sử dụng nhiều loại cơ sở dữ liệu khác nhau cả Sql và NoSql như MySql, Cassandra, MongoDb,... Sau khi generate code bạn còn có thể tùy chọn việc deloy code của mình lên server, Jhipster hỗ trợ nhiều cách khác nhau như: Docker, Aws, HeroKu, Google Cloud Flatform,...


    ![](https://images.viblo.asia/b10ad135-1d70-4651-9597-ead7fd428330.png)
    ![](https://images.viblo.asia/32a159bc-355a-40c2-a83b-9faccc24e338.png)
    ![](https://images.viblo.asia/349ede72-2af1-42dc-a73c-3dc78cfc0fd9.png)
# Chuẩn bị
- Phần giới thiếu như vậy là đủ rồi bây giờ mình sẽ bắt đầu vào việc tạo project demo thử nhé. Nói sơ qua thì ở project này mình sẽ tạo 1 trang blog cá nhân nhỏ. Trang web này sẽ sử dụng spring restfull api + react + mysql. Sau đó mình sẽ deloy lên vps và chạy thông qua docker. 
##### Bạn cần cài 1 số thứ như sau:
- Jdk (tất nhiên rồi :v)
- NodeJs
- Yarn
- Yeoman
Các thứ này bạn tự cài nhé, trên google có rất nhiều hướng dẫn á. Mối một hệ điều hành có các cách cài khác nhau nên mình không hướng dẫn ở đây :D
Sau đó bạn dùng lệnh sau để cài Jhipster:
    ```
    npm install -g generator-jhipster
    ```
Hoặc bạn có thể thay `npm` bằng `yarn` cũng được. Trong trường hợp nếu bạn muốn sử dụng front-end bằng `vuejs` thì bạn cần phải sử dụng thêm lệnh sau để install:
    ```
    npm install -g generator-jhipster-vuejs
    ```
Ok vậy là ta đã xong phần cài đặt môi trường. Lưu ý rằng lệnh cài đặt trên có thể yêu cầu quyền root nên nếu lỗi thì bạn thử thêm `sudo` xem nhé :D
##### Sau đó đến phần intit project:
- Đầu tiên bạn cần tạo một thư mục để lưu code đã:
    ```
    mkdir myblog && cd myblog
    ```
 - Sau đó sử dụng lệnh sau để jhipster bắt đầu generate code:
     ```
     jhipster
     ```
     hoặc nếu bạn muốn sử dụng vuejs cho frontend thì bạn hãy sử dụng lệnh sau:
     ```
     jhipster --blueprint vuejs
     ```
  - Tiếp theo jhipster sẽ hỏi chúng ta các tùy chọn với project:
     ![](https://images.viblo.asia/e2dbb739-0008-42d9-9212-363978714244.png)
     
   - Ở đây bạn cần chú ý đến một số chỗ config như loại db sử dụng cho môi trường phát triển (development) và loại db sử dụng cho môi trường thực tế (product). Ngoài ra còn có tùy chọn sử dụng `Multilangue`: ở đây mình sử dụng tiếng việt là ngôn ngữ chính và tiếng anh là ngôn ngữ phụ cho trang web. Sau khi generate thành công ta sẽ nhận được thông báo sau:
     ![](https://images.viblo.asia/0282fc17-9c11-481d-91b2-268709b84e00.png)
    - Ta xem qua phần code được generate nhé:  
    ![](https://images.viblo.asia/1cb3bda0-c6ca-42f0-ae03-10d8ed35fdf3.png)
    - Ta chạy tiếp lệnh sau để run thử project nhé:
         ```
         ./nvn
         ```
     -  Lúc này maven sẽ giúp ta tải các thư viện và run project :D :
![](https://images.viblo.asia/1185d37e-cf62-4b78-90d3-8728a9927658.png)
     - Bạn vào thử link http://localhost:8080/ để xem project chạy chưa nhé:
     ![](https://images.viblo.asia/7b0ce932-6295-49b6-924c-7330cfb21c3c.png)
     - Lúc này web đã chạy thì bạn có thể đăng nhập vào bằng tài khoản admin/admin nhé. Có thể bạn sẽ ngạc nhiên với những gì mà jhipster đã generate ra cho bạn đó :D
     - Tất nhiên lúc này trang web của chúng ta vẫn chưa có gì ngoài cái khung quản lý và đây cũng chỉ là môi trường phát triển thôi chưa sử dụng được đâu =))
# Generate code
#### Generate entity
 - Tiếp theo với mõi entity bạn muốn tạo hãy gõ lệnh:
    ```
    jhipster entity {tên của entity bạn muốn tạo}
    ```
 - Sau đó jhipster sẽ hiện lên các các câu hỏi để bạn có thể tùy chọn tên các trường, kiểu dữ liệu của các trường, validate và cả kiểu quan hệ với các entity khác nữa.
    ![](https://images.viblo.asia/69047a0d-015c-4ea5-9769-75957e8959ff.png)

 - Hoặc nếu các bạn lười sử dụng console như này để generate code thì bạn có thể vào trang `https://start.jhipster.tech/#/design-entities` để tạo 1 file mô tả các entity. Sau đó ta có thể generate online rồi jhipster sẽ push code trực tiếp vào github của chúng ta luôn. Hoặc bạn có thể tải file này về và generate tại máy với lệnh: 
    ```
    jhipster import-jdl ./my-jdl-file.jdl --json-only
    ```
 - Sau khi generate xong, bạn run lại project và đăng nhập vào trang admin để check:
     ![](https://images.viblo.asia/22a8bd3d-c7dd-4a63-8c6c-d1f82bd5a729.png)

 - Ở đây là giao diện quản lý entity của mình, Jhipster đã generate ra cả fake data cho chúng ta test luôn rồi :D

    ### Phần đầu đến đây là kết thúc rồi. Các bạn vọc vạch nhé. Nếu có gì khó khăn có thể hỏi mình. Ở phần tiếp theo mình sẽ viết tiếp về việc tối ưu lại trang web và deloy trang web lên VPS nhé. Hẹn gặp các bạn ở phần sau :D