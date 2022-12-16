### Javascript và trình duyệt
Như các bạn đã biết thì javascript, với cái cộng đồng năng động như hiện tại thì nó đang phát triển rất điên cuồng.
Sự ra đời của ES6 mang lại rất nhiều cái hay ho như:
- "fat arrow" giảm thiểu syntax của function
- hay như là "promise" để xóa tan bất cập của callback
- hoặc là cái "let" mới thay thế cái "var" sida
- ...

Sắp tới đây, ES7 đang rục rịch ra lò và ES8 đã có concept các kiểu.
Javascript lớn nhanh như vậy đó cơ mà kẻ chậm chạp không phải là dev lười học (chắc vậy..), mà đơn giản chỉ là thằng
browser không chịu tiếp thu...

Để có thể chạy code bằng syntax mới của ES6, thì điều kiện cần thiết đó là cái browser đó phải hỗ trợ cho nó, bạn có thể
xem danh sách các browser đã chịu bắt kịp thời đại qua [trang web chi tiết sau](http://kangax.github.io/compat-table/es6/) 
(và sẽ không mấy ai ngạc nhiên là thằng IE chả hỗ trợ được cái méo gì mấy, đỏ lòm từ trên xuống dưới..)

### Vậy thì sao?
Do các trình duyệt chả đồng nhất, nên ít ai dám dùng syntax mới của ES6 cả. Vì lỡ rằng, viết xong chạy ngon lành trên
firefox, thì lại vẹo tức tưới khi test ở IE. Thế là, cứ xài cái cũ (ES5) cho lành...

Hoặc!
Có một công cụ nào đó, convert code ES6 bạn viết, sang code ES5 cũ.
Có một công cụ nào đó, thực hiện việc chyển đổi chỉ với dăm ba câu lệnh đơn giản.
Có một công cụ nào đó, có thể convert không chỉ là ES6, mà còn có thể convert cả Typescript, Coffeescript, ...

### Babel
  ```
  Cài đặt:
  npm install --save-dev @babel/core @babel/cli @babel/preset-env
  npm install --save @babel/polyfill
  ```
~> "Sao bảo đơn giản, mỗi cái bước cài đã lắm cái linh tinh rối rắm vậy?"
Đúng là trông hơi rối thật, nhưng tất cả đều là để giúp Babel làm được các điều vừa hứa hẹn ở trên,
nếu hít một hơi thật sâu và để ý kĩ, ta sẽ thấy nó không hề phức tạp:
- cái @babel/cli là để "thực hiện việc chyển đổi chỉ với dăm ba câu lệnh đơn giản"
- cái @babel/polyfill cung cấp cho Babel có khả năng convert code cho cả browser cổ đại cũng hiểu.
- cái @babel/core là nền tảng để tháo lắp các "phụ kiện" một cách linh hoạt.
  Trong đó, các "phụ kiện" bao gồm: @babel/preset-env để convert từ ES5++ về ES5
                                    @babel/babel-preset-react để convert JS của React về ES5
                                    @babel/preset-typescript để convert Typescript về Javascript ES5
                                    ...
Như vậy, nếu bạn cần chuyển đổi script gì đó sang Javascript ES5, đơn giản chỉ cần cài thêm "phụ kiện"
cho Babel hoạt động, rất nhẹ nhàng và không tốn mồ hôi.
  ```
  npm install --save-dev @babel/preset-gì-gì-đó
  ```

### Kết
Là vậy, chúng ta không cần phải chờ mấy cái browser dở hơi chịu cập nhật cái mới nữa, giờ thì có thể xài mọi
tính năng cool ngầu mới mẻ của Javascript mà không cần lo nghĩ. Tất cả đã có Babel lo, xin hãy cho Babel một
chút thời gian của bạn tại đây bạn nhé! [Babel Homepage](https://babeljs.io/)