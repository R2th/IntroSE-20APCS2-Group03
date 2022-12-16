# Giới thiệu
Reactjs hiện đang là một trong những sự lựa chọn hàng đầu của các lập trình viên về phát triển các ứng dụng web, đối với framework Ruby on Rails thì cũng đã tích hợp được React vào trong source code của project. Có nghĩa là chúng ta chỉ cần 1 server để deploy và có thể chỉ cần sử dụng Rails routes mà không cần dùng đến React routes. Để làm được điều này thì có một vài cách, trong trường hợp này mình sử dụng gem webpacker và gem react_on_rails để thực hiện.
# Tạo project sử dụng gem react_on_rails
Đầu tiên chúng ta tạo 1 project rails như bình thường:
![](https://images.viblo.asia/cb5e3dbd-4929-41b2-bd99-47007d0f1ec1.png)

Sau đó mở file Gemfile và thêm vào 2 dòng sau:

`gem "webpacker", "~> 3"`
`gem "react_on_rails", "11.1.4"`

sau đó quay lại terminal và chạy `"bundle install"`
![](https://images.viblo.asia/3647de87-0f5b-43be-b916-96c5edba33a6.png)

Bạn nào chưa cài `yarn` thì ấn vào [đây](https://yarnpkg.com/lang/en/docs/install/#debian-stable) để xem cách cài nhé, `yarn` nó cũng có chức năng như `npm` thôi :D

Tiếp theo chạy lần lượt 2 câu lệnh này để cài đặt webpacker và reactjs
![](https://images.viblo.asia/8cbde7d5-b954-43c5-9038-52e55b11b34e.png)
![](https://images.viblo.asia/367a1df3-2b94-41d8-a870-47cf9e09190a.png)

Sau khi xong chúng ta cần commit lại và tiếp tục chạy câu lệnh sau để react_on_rails tự cài đặt:
![](https://images.viblo.asia/9c359371-b87f-4ba7-a669-8733370f8e7a.png)

Cơ bản là xong rồi, chúng ta chạy câu lệnh sau để start project:
![](https://images.viblo.asia/289c0109-7dfa-4c6e-8ba1-b96e3372a82a.png)

Nếu bạn nào chưa cài `foreman` thì cài như sau là được, nhớ chạy bằng sudo nha (mình chụp nhanh quá quên thêm sudo :D ):
![](https://images.viblo.asia/3c1b6231-cda2-4b30-8475-2f86e13bcda4.png)

Ok, giờ thì mở trình duyệt lên và truy cập `localhost:3000/hello_world` để xem kết quả nhé, và đã xuất hiện dấu hiệu của react
![](https://images.viblo.asia/b1876ee8-308f-4337-9cef-2cea6ab8748b.png)

Sau khi đã hoàn thành project, nếu bạn đang sử dụng sqlite thì cần chuyển sang postgre hoặc mysql, sau đó thêm file có tên là ```Procfile``` vào trong project ( cùng cấp với các folder app, config, ...) để có thể start được project bên phía heroku. Nội dung bên trong ghi như sau:
```web: bundle exec puma -C config/puma.rb``` sau đó lưu lại và commit tất cả trước khi deploy.
![](https://images.viblo.asia/d75d17f6-fbe2-4c14-989d-6b9b4946fb9b.png)
# Deploy project lên heroku 
Cấu hình server heroku: 

Chúng ta sẽ tạo 1 app như bình thường:
![](https://images.viblo.asia/81e264c7-8f08-43f7-8346-978ee0b37fea.png)
Tiếp theo chọn vào mục Setting, lăn chuột xuống phần Buildpacks và thêm buildpack như mình:
![](https://images.viblo.asia/ad392ade-4da8-4eea-a10d-30e0b604426e.png)
Nhớ thêm đúng thứ tự như mình nhé.
Sau đó mở terminal lên và chạy lệnh ```heroku git:remote -a test-0874``` thay test-0874 bằng tên app heroku của bạn là được, rồi chạy lệnh ```git push heroku master``` là xong.
![](https://images.viblo.asia/5dea22be-74d2-45cd-affe-0278226230d2.png)
Chúc các bạn thành công!!! :D
# Tham khảo
* [https://shakacode.gitbooks.io/react-on-rails/content/docs/tutorial......](https://shakacode.gitbooks.io/react-on-rails/content/docs/tutorial.html?fbclid=IwAR0dtkNdn0n7BmppsTeCa_N6mF_lmSILQsQLGnNAQNU6VUa_j2qkhR6t1rY)
* [https://github.com/shakacode/react_on_rails](https://github.com/shakacode/react_on_rails)
* [https://yarnpkg.com/lang/en/docs/install/#debian-stable](https://yarnpkg.com/lang/en/docs/install/#debian-stable)