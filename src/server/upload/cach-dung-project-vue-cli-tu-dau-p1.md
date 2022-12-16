# 1 Tạo một Repository từ github
*  Step1 : Truy cập vào [github](https://github.com/) để tạo một repository

![](https://images.viblo.asia/909c10fa-bf74-4ad7-92cb-d1f9d8de0d64.png)

* Step2 : Chọn thư mục lưu trữ trên máy tính
![](https://images.viblo.asia/a6d321e4-f32c-4fcf-a32c-e9a593ba1d7e.png)

> Bạn có thể chọn một thư mục bất kỳ. Mình khuyên bạn nên để trong ở D

### Step3:  Mở gitbash và clone project rỗng bạn vừa tạo trên github
> Đầu tiên nếu chưa có gitbash bạn có thể vào đây để tải [https://git-scm.com/downloads](https://git-scm.com/downloads)

![](https://images.viblo.asia/ca93ad63-f52b-469e-b7bb-3d208b755a10.png)

![](https://images.viblo.asia/72447ccc-671f-49de-8806-4496db51da7e.png)

![](https://images.viblo.asia/afa6d75f-60cc-4ee3-9ed6-55fd93603656.png)

`câu lệnh : git clone + pase` 
Các câu lệnh command cơ bản của git https://topdev.vn/blog/git-la-gi/

![](https://images.viblo.asia/bec430ff-a3bc-452b-a000-acdca8c84c90.png)

# 2 Tạo project bằng vue cli
> * Tên package của vue-cli cũ là` vue-cli` và tên hiện tại là `@vue/cli`
> * Nếu máy bạn đã cài vue-cli (1.x or 2.x) package installed globally bạn cần uninstall trc `npm uninstall vue-cli -g or yarn global remove vue-cli.`
> * Vue CLI bắt buộc bạn phải sử dụng  Node.js version 8.9 hoặc trên 8.11.0

* step1 : chạy lệnh khởi tạo một new package bạn có thể bật TERMINAL của VS code để chạy nếu bạn sử dụng VScode giống mình
```
npm install -g @vue/cli 
or
yarn global add @vue/cli
```

![](https://images.viblo.asia/d1263efc-e7ab-4819-a063-a59998955723.png)

Nếu thành công bạn sẽ nhận được một thông báo Success . Bạn đã có quyền truy cập vue binary trong command line bạn có thể kiểm tra version bằng câu lệnh `vue --version`

* step2 : khởi tạo một project mới
Sau khi cài đặt xong global bạn đã có thể sử dụng *.vue để chạy. Nhưng mục đích của chúng ta là một cấu trúc CLi hoàn thiện nên chúng ta sẽ sử dụng lệnh` vue create vue-cli-version1` để khởi tạo một project  vue-cli-version1

![](https://images.viblo.asia/1336d7b0-2a6a-4e4a-8be7-7d4c16d30ddc.png)

Sau khi bạn chạy câu lệnh - bạn sẽ thấy một lựa chọn

![](https://images.viblo.asia/5cff8063-a1f4-487f-aaad-a31e76b3f50c.png)

Nếu bạn ấn tiếp tục phím Enter - hệ thống sẽ tự động cài mặc định cho bạn [babel](https://cli.vuejs.org/core-plugins/babel.html) và [eslint](https://github.com/vuejs/eslint-plugin-vue)
Còn nếu bạn chọn `Manully select features` bạn sẽ có một số lựa chọn để cấu hình cho project của mình

![](https://images.viblo.asia/e18baf57-77da-4840-bbd6-29fd8c1867d0.png)

Những thứ này chúng ta sẽ đi nói ở phần tiếp theo
chúng ta chọn default và ấn enter để tạo một project mới. Sau khi tạo thành công bạn cũng sẽ nhận được một thông báo success . Chúc mừng bạn bạn đã tạo thành công một project bằng vuecli.
Bạn cũng có thể sử dụng`vue create --help` để xem một số lệnh tuỳ chọn

* step3 : chạy project
```
npm run serve
hoặc
yarn serve
```
Để chạy project mới tạo của bạn