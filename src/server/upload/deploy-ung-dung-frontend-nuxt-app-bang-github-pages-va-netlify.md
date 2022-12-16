# Mở Đầu 
Hello các bạn hôm nay mình sẽ trở lại với bài viết deploy một ứng dụng nuxt (Frontend) bằng 2 cách đó là github pages và Netlify, cái này mà mình xây dựng một trang Blog cá nhân rồi deploy lên và vứt vào phần mô tả trong trang cá nhân trên facebook  cũng là một cách hay để gây ấn tượng với mọi người vào trang cá nhân của mình ấy nhỉ :D, biết đâu lại có người yêu :D. Cùng bắt đầu luôn nhá 
# Deploy với Github pages
Công việc đầu tiên mà chúng ta phải làm đó là tạo một repository trên [GitHub](https://github.com/) và đẩy phần code của bạn lên đó :D. Tiếp theo chúng ta cần sửa lại trong file `nuxt.config.js` chúng ta cần thêm 
```js
export default {
   mode: 'static',
   router: {
      base: 'tên repository'
   },
}
```
Tiếp theo là install  `gh-pages` vào `devDependencies` vì mình đang dùng yarn nên câu lệnh sẽ là 
```
yarn add gh-pages -D
```
Tiếp theo trong `package.json` phần `file` thêm các câu lệnh để phục vụ deploy 
```
 "predeploy": "nuxt generate",
 "deploy": "gh-pages -d dist"
```
Sắp xong rồi đấy bây giờ chúng ta chỉ cần chạy lệnh để tiến hành deploy app của chúng ta lên github pages thôi,
```
yarn deploy
```
Thế là đã hoàn thành 90% rồi đấy :D. Cuối cùng là chúng ta lên github truy cập vào repository mình nói ở trên chọn phần `settings` rồi chọn `Pages` ở phía bên trái, sẽ xuất hiện URL của ứng dụng như hình bên dưới :). Bạn chỉ cần click vào đó github sẽ chuyển hướng sang trang mà ứng dụng của bạn đã được deploy ở đó 

![Screenshot from 2022-05-28 20-37-09.png](https://images.viblo.asia/3f1086a5-6148-4bc7-bd33-28d140f9a31e.png)

Oke vậy là ứng dụng của chúng ta đã được deploy lên rồi đó
![Peek 2022-05-28 20-40.gif](https://images.viblo.asia/f6e88a8f-266a-44c2-8d00-82e8a22bb2ac.gif)

Cùng tìm hiểu cách thứ 2 nhé :D
# Deploy với Netlify
Tiếp theo sẽ là deploy với [Netlify](https://www.netlify.com/), đầu tiên chúng ta cần phải tạo một tài khoản trên `Netlify`, mình thì mình sẽ đăng kí luôn bằng tài khoản github, phần đăng kí này cũng không có gì nên mình sẽ không nói đến nhé, mọi người chỉ cần đăng kí và làm theo hướng dẫn là được. Mình thấy đăng nhập bằng github khá là tiện vì sau này khi bạn có repo mới thì trên `Netlify` nó cũng update được cái repo mới đó luôn. Đây là giao diện sau khi mình đăng nhập vào có luôn các repo của mình trên github rồi (ngon).
![Screenshot from 2022-05-28 20-50-56.png](https://images.viblo.asia/12d0c351-b199-455c-87ed-05fdca850136.png)

Tiếp theo để deploy ứng dụng lên bạn cần chọn `Builds` rồi click vào button `New site from Git`

![Screenshot from 2022-05-28 20-55-36.png](https://images.viblo.asia/69702595-9b3b-45a3-8bac-3574c1285fcd.png)

Ở đây các bạn có thể chọn source code từ `github`, `gitlab` ... ở đây mình chọn github nó sẽ có 1 bước xác thực, sau khi xác thực xong thì nó sẽ hiển thị ra tất cả các repository trên github của bạn, bây giờ bạn muốn deploy repository nào thì chỉ việc chọn repository đó thôi. Sau khi chọn xong thì nó sẽ như thế này 
![Screenshot from 2022-05-28 21-00-53.png](https://images.viblo.asia/0228439a-a546-46ef-86a3-2cfd6a69f95a.png)

Nó sẽ có các setting cho các câu lệnh run, build. Có `Show Advanced` để có thể cấu hình được các biến môi trường, có một mẹo là có thể thêm tệp cấu hình `netlify.toml` vào repository của bạn để nó linh hoạt hơn nữa. Cuối cùng là ấn nút `Deploy site` để tiến hành deploy ứng dụng. Sẽ mất một chút thời gian để app của chúng ta được build và deploy

![Screenshot from 2022-05-28 21-06-33.png](https://images.viblo.asia/53719bf6-7367-4f5b-bd97-fc1835774045.png)

Sau khi deploy xong thì chúng ta sẽ có 1 tiên miền miễn phí cho ứng dụng, cùng click vào để xem kết quả nhé :D.

![Peek 2022-05-28 21-12.gif](https://images.viblo.asia/93285fdc-d3aa-4310-a451-fc9e25895a28.gif)

Ngoài tên miền miễn phí mặc định thì `Netlify` còn cho phép chúng ta cấu hình tên miền riêng và trỏ đến serve chứa app chúng ta vừa deploy lên. Các bạn có thể tìm hiểu thêm phần này nhé :v: 
# Kết Luận
Như vậy là mình đã giới thiệu đến các bạn 2 cách để deploy một ứng dụng Frontend lên server, mỗi cách lại có nhưng ưu nhược điểm khác nhau tùy thuộc vào nhu cầu và mục đích mà các bạn có thể lựa chọn phương pháp cho phù hợp nhé. Bài viết của mình đến đây là hết rồi mọi người có thắc mắc hay góp ý  gì cho bài viết của mình thì hãy comment xuống phía dưới nha. À quên mình cũng đang đua top 10 cho sự kiện Mayfest (no hope) :D nếu được thì hãy cho mình 1 upvote +  1 bookmark nhé tại quà top 10 cho sự kiện Mayfest của Viblo năm nay to quá ạ. Một lần nữa cảm ơn các bạn !!!