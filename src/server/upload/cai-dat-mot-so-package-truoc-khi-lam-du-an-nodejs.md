![](https://images.viblo.asia/00ea1f44-6099-4fb2-a12b-583ab68eb72d.png)

# Bắt Đầu
Tiếp tục về series `Nodejs` cơ bản hôm nay mình sẽ giới thiệu một số thứ mình thấy là cần thiết khi làm dự án `Nodejs`( đi đánh giặc thì phải cần  chuẩn bị vũ khí chứ đúng không :D ).  Trong bài viết này mình sẽ giới thiệu đến mọi người đó là `Yarn` và `Nodemon` ngoài ra hình cũng sẽ giới thiệu các tùy chỉnh câu lệnh chạy project nodejs. Cùng vào tìm hiểu chi tiết từng cái một nhé 
# Yarn 
#### Yarn là gì?
`Yarn` là  công cụ quản lý thư viện javascript mã nguồn mở tốc độ cao, tin cậy và bảo mật nhằm thay thế NPM. `Yarn` có những ưu điểm vượt trội hơn `npm` như:
* YARN tải đồng thời nhiều gói cùng lúc nên tốc độ download sẽ nhanh hơn là tải từng gói một như `npm`.
* YARN sẽ tạo cache cho tất cả các gói đã được tải về,hỗ trợ việc cài đặt offline....

Còn rất nhiều ưu điểm của `yarn` nhưng trong phạm vi bài viết này mình xin phép không đi chi tiết vào vấn đề này. Các bạn chỉ cần biết `Yarn` được tạo ra bởi các ông lớn như facebook, google... thì làm sao mà nó không ngon, không sịn cho được :D. Ở bài trước mình đã cài `Nodejs` và đã có sẵn `npm` rồi nên mình sẽ cài `Yarn` thông qua `npm` luôn. Để cài đặt bạn chỉ cần mở terminal lên và chạy lệnh : 
```php
npm install -g yarn
```
`-g` là viết tắt của `global` nghĩa  là cài đặt `yarn` trên phạm vi toàn cục chỉ cần mở terminal lên là đã có yarn ở đó rồi. Để kiểm tra xem đã cài `yarn` thành công hay chưa bạn chỉ cần gõ :
```php
yarn -v
```
thấy hiện như này là đã cài đặt thành công :D

![](https://images.viblo.asia/81b8d609-0e22-4da7-bd0d-83b5d4316f41.png)

Tiếp theo chúng ta sẽ cài đặt đặt `nodemon`
# Nodemon
#### Nodemon là gì ?
`Nodemon` là một công cụ giúp phát triển các ứng dụng trên `Nodejs` một các hiệu quả bằng việc tự động khởi chạy lại ứng dụng khi phát hiện thay đổi trong các file. @@ ở bài 2 mà giới thiệu `nodemon` cũng hơi khó hiểu nhỉ, thực ra mình định giới thiệu nó ở những bài sau cơ nhưng mà nghĩ lại thì đằng nào cũng giới thiệu cài `yarn` rồi thì giới thiệu để cài đặt `nodemon` luôn, chuẩn bị một lần rồi những bài sau chỉ việc code thôi :D. Nói thì dài dòng nhưng tóm lại các bạn chỉ cần hiểu là khi mình thay đổi trong code thì phải tắt sever đi rồi chạy lại cái lệnh `node index.js` thì nó mới thực thi những cái mình vừa thay đổi đó, mất việc v~. Đấy bây giờ bạn cài `nodemon` vào thì nó sẽ thực hiện thay cho bạn mà bản chẳng cần làm gì nữa tiện ghê :). Bây giờ có `yarn` rồi nên sẽ cài `nodemon` bằng yarn nhé :D chỉ cần chạy lệnh :
```php
yarn add nodemon --dev
```
`--dev` ở đây là đê lưu vào `devDependencies` trong `package.json` nhé vì mình chỉ muốn cài `nodemon` ở môi trường `develop` . Cái này mình cũng đã nói ở bài trước rồi đó :D. Tiếp theo sẽ là phần cài đặt câu lệnh chạy `Nodejs`.

# Cài linh tinh
Ở bàì trước thì chúng ta đã biết câu lệnh để chạy `Nodejs` là `node index.js` thế giờ mình chả muốn chạy câu lệnh đó nữa gì nhàm quá ai cũng giống ai thì làm thế nào. Đơn giản thôi bạn chỉ cần thêm một chút trong file `package.json` là được. Bạn chỉ cần sửa lại phần `scripts` như thế này 
```php
  "scripts": {
    "dev": "node index.js"
  },
```
Rồi bây giờ mở terminal lên và chạy 
```php
yarn dev
```
Xem kết quả nhé thực ra kết quả chả khác gì bài đầu tiên mà mình chạy bằng câu lệnh `node index.js` :v. Ở đây bạn thấy `dev` = với `node index.js` nên thực tế câu lệnh chạy là `yarn node index.js` :v. Vì thế bạn có thể thay từ `dev` bằng bất kì từ gì bạn muốn, nhớ là khi chạy lệnh `yarn` + từ mà bạn thay thế là được :v.
# Kết luận
Vậy là mình đã giới thiệu xong một `package` và cài đặt vài thứ linh tinh mà mình cảm thấy cần thiết để bắt đầu học `nodejs`, đương nhiên thực tế khi làm dự án còn phải cài rất nhiều`package` nữa. Nhưng thôi mấy cái đó khi nào cần dùng thì chúng ta sẽ cài thêm vào.Bài này mình xin phép dừng ở đây, ở bài sau mình sẽ tiếp tục tìm hiểu về các thành phần cơ bản của `Nodejs` như  `Template engines` `Query parameters`...Nếu có thắc mắc hay bổ sung gì cho bài viết các bạn hãy cmt xuống phía dưới để mìn được biết nhé. Cảm ơn các bạn đã theo dõi :).