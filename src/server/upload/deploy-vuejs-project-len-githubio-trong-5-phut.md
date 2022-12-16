**Github.IO là nơi chúng ta có thể hosting các project free trực tiếp từ các repository trên github.com. Ở Github.io các bạn có thể hosting các trang web như profile cá nhân, landing page, hay các trang giới thiệu sản phẩm/project,...**

Hôm nay mình sẽ hướng dẫn các bạn cách deploy VueJS project lên github.io, nhờ đó các bạn có thể hosting project VueJS của mình một cách nhanh chóng và hoàn toàn miễn phí.

# Thiết lập project
Đầu tiên các bạn cần phải cài `vue-cli` nhé. nếu bạn chưa có thì có thể chạy command sau:
```
npm install -g @vue/cli
```
Sau đó chúng ta sẽ cùng tạo một project mới bằng `vue-cli` nhé:
```
vue create git-deploy-template
cd git-deploy-template
```
# Build project
Tiếp theo chúng ta build project để chuẩn bị cho việc upload nhé. Các bạn chạy command sau:
```
npm run build
```
Sau đó các bạn sẽ thấy ta có folder `dist` ở trong thư mục project. Bây giờ đến lúc đưa project của chúng ta lên Github.IO rồi :-D
# Tạo github repository
Bước tiếp theo chúng ta cần tạo 1 repository ở trên github nhé. Các bạn tự tạo 1 repo tên tuỳ ý, để `public` nhé ;)

# Đẩy project lên Github.IO
Ở thời điểm hiện tại (2019) thì hầu hết các nền tảng quản lý source code (github, gitlab, bitbucket,...) đều đã hỗ trợ chúng ta gần như đến tận chân răng nếu như ta muốn host nhanh project trên nền tảng của họ (githubIO, gitlab page,...)

Bắt đầu thôi nào... :-D

Ở thư mục gốc project các bạn tạo file `vue.config.js`. Với nội dung như sau:
```js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/test_github_page/' // Thay tên repository của các bạn vào đây nhé
    : '/'
}
```
Tiếp theo các bạn mở terminal/command line ở folder `dist` (nhớ là mở tại folder `dist` nhé) và chạy lần lượt các command sau:
```bash
git init
git add -A
git commit -m "deploy"
git push -f https://github.com/<tên user github>/<tên repo>.git master:gh-pages
```

Cuối cùng là mở trình duyệt tại địa chỉ: https://<tên user github>.github.io/<tên repo>/ (ví dụ như của mình là https://maitrungduc1410.github.io/test_github_page). Và cuối cùng là kết quả :3:
![Vue github.io](https://images.viblo.asia/3b6eaa26-0739-46da-8788-b8fdcf749c42.png)

Qua bài này hi vọng rằng các bạn biết được các để nhanh chóng host project VueJS lên Github.IO như thế nào.

Các bạn có thể thấy rằng nếu như ta có 1 project mà frontend (Vue, react,...) mà code tách biệt với backend. Thì ta có thể tận dùng Github.IO để host phần frontend của chúng ta. Free lại có cả HTTPS ;)

**Nhớ là Github.io mới chỉ hỗ trợ HTML, CSS, JS viết code php đẩy lên là không chạy đâu nhé, hi vọng tương lai sẽ có**

**Cám ơn các bạn đã theo dõi ^^**