# 1. Giới thiệu về Heroku

Như các bạn đã biết để deploy 1 project thì bạn cần có host và tên miền. Tuy nhiên, không phải ai cũng có thể thuê riêng một host và một tên miền để làm việc đó, nhất là với các bạn sinh viên. Thay vào đó, ta có thể sử dụng Heroku, một nền tảng cho phép chúng ta có thể deploy sản phẩm của mình lên mạng với một tên miền miễn phí. Hôm nay, mình sẽ hướng dẫn các bạn cách deploy một project Laravel lên Heroku. Có rất nhiều cách để đẩy deploy code của bạn lên Heroku nhưng mình xin phép hướng dẫn cách mà mình nghĩ là đơn giản nhất.
![](https://images.viblo.asia/6baaeaf9-cced-4f42-99a4-96e7985425cd.png)
# 2. Lưu trữ source code trên Github
Việc đầu tiên không chỉ áp dụng cho việc deploy lên Heroku mà còn là việc áp dụng với mọi lập trình viên chuyên nghiệp đó là lưu trữ source code của mình trên mạng. Ở đây mình dùng Github. Lí do sao không phải SVN … thì mình sẽ nói sau. Căng nhỉ giờ một số bạn không biết push code lên git thì làm sao đây. Thôi hướng dẫn luôn.

Truy cập vào Git đăng kí một cái tài khoản nếu chưa có. Sau đó tạo 1 Repository để lưu trữ code.
![](https://images.viblo.asia/3dd2a430-1112-4a39-abef-2396bd0dc974.png)

Sau đó vào tạo tên các các thứ, cái nào quan trọng thì để chế độ private còn muốn show ra như kiều đồ án thì cứ public mà táng.

![](https://images.viblo.asia/91c269a4-53ed-4792-8c04-86c55f75ca0a.png)
Sau đó sẽ nhảy vào trang dashboard của repo mình vừa tạo, ở đây có ta copy đường dẫn SSH và gõ lệnh tên git bash đối với bạn vấn dùng windows.

Cài git thế nào thì tự tìm hiểu nha. Nói chung là git base với terminal không khác nhau mấy, mình dùng terminal thì các bạn cứ coi nó là git base đi nhé. Vì mình dùng ubuntu. Tôi cá mấy bạn đang làm đồ án vẫn dùng window để chơi game mà :3. Chuột phải chọn terminal ở đâu cũng được, chọn luôn desktop đi nhé. Bạn nào dùng window thì là git base.
```

git clone duong_dan_ssh_ban_vua_copy_ben_tren

```
OK xong khi chạy xong lệnh đó bạn có 1 thư mục cùng tên với tên của repositories và 1 file .git (Nhớ để chế độ hiện Show hidden files). Copy toàn bộ các file project Laravel của bạn vào thư mục đó. Kiểm tra lại bằng lệnh
```
git remote -v
origin git@github.com:Kenini1805/doandemo.git (fetch)
origin git@github.com:Kenini1805/doandemo.git (push)
```
nếu có 2 dòng kiểu kiểu thế kia là ok. Tạo 1 branch mới cho việc lưu trữ code bằng lệnh
```
git checkout -b ten_branch
```

Mình hay để branch đầu tiên tên là master.Tiếp tục là việc đẩy code lên git bằng 4 lệnh cơ bản.
```
git status // kiểm tra trạng thái
git add .
git commit -m 'deploy'
git push origin HEAD
```
# 3. Xử lí bên Heroku
## 3.1 Đăng kí, cài đặt cơ bản

Để chuẩn bị cho việc deploy, bạn cần chuẩn bị những bước sau đây:

Đăng kí 1 tài khoản trên Heroku (nếu chưa có), link đăng ký: https://signup.heroku.com/
Chuẩn bị 1 project Laravel muốn deploy lên Heroku Sau khi đã chuẩn bị được những bước trên, chúng ta sẽ bắt đầu với việc deploy project của mình.
Sau khi chuẩn bị được những việc cần thiết nói trên, bạn đăng nhập vào tài khoản Heroku của mình. Ở trang Dashboard, bạn chọn New và Create new app ở góc trên bên phải để tạo repository trên Heroku:
![](https://images.viblo.asia/471798c9-d7e9-4501-b2e7-6b0ae4ac7e9e.png)

Sau đó ta chọn tên app của mình còn phần Choose a region sẽ để mặc định và ấn Create app. Sau khi tạo app thành công, Heroku sẽ tự động redirect bạn về trang quản trị của app đó.![](https://images.viblo.asia/3c2905e2-7a6f-44a0-b959-30f4c0e08b12.png)



Sau khi đã chuẩn bị các thao tác cần thiết trên Heroku việc tiếp theo chúng ta cần làm là cài đặt Heroku CLI trên máy tính các nhân để có thế deploy lên Heroku, link cài đặt ở đây. Tùy thuộc vào hệ điều hành mà bạn đang sử dụng, bạn hãy chọn bản tương ứng.

Việc tiếp theo là chạy tạo file Procfile nhằm config đường dẫn tới file index trong folder laravel của chúng ta bằng terminal. Bạn nào dùng window thì cmd hoặc Power Shell.


```
echo web: vendor/bin/heroku-php-apache2 public/ > Procfile
```

Sau khi thực hiện lệnh trên sẽ tạo cho chúng ta 1 file có tên là Procfile với nội dung như sau:
```
web: vendor/bin/heroku-php-apache2 public/
```
## 3.2 Thêm cơ sở dữ liệu

Đối với mỗi project, có lẽ không thể thiếu sự góp mặt của một CSDL. Heroku cũng cung cấp cho bạn CSDL miễn phí gọi là Heroku Postgres. Không những thế, Heroku cũng có sẵn rất nhiều các add-ons khác cho app của bạn như Heroku Redis, mLab MongoDB, … và rất nhiều các add-ons khác liên quan đến cơ sở dữ liệu, giám sát, email/sms, caching. Tuy nhiên không phải tất cả các add-ons này đều miễn phí và mặc dù rất nhiều add-ons có sẵn Free plan nhưng bạn vẫn cần phải cung cấp thông tin thẻ Visa trước để có thể sử dụng. Nếu có thẻ visa bạn có thể yên tâm cung cấp vì chỉ khi bạn vượt quá giới hạn của Free plan mới bị tính phí và trước khi vượt quá Heroku sẽ gửi thông báo cho bạn. Bạn có thể xem các add-ons mà Heroku hỗ trợ ở đây.

Quay lại với việc tạo CSDL, từ trang quản trị của app vừa tạo, ta chọn tab Resources và tìm kiếm add-ons có tên là Heroku Postgres.
![](https://images.viblo.asia/c07167ba-d793-47dc-a3d2-ca9be4e8c76f.png)

Bạn chọn Heroku Postgres sau đó đợi vài giây sẽ hiện ra bảng cho phép bạn chọn Plan mong muốn. Tất nhiên ở đây chúng ta chỉ deploy để demo nên sẽ chọn plan là Hobby Dev – Free:
![](https://images.viblo.asia/9854a5c2-cd69-4856-bc4a-f10cc12c86a2.png)


Sau đó bạn bấm Provision, vài đợi giây lát để Heroku có thể thêm add-ons vào cho app của bạn. Khi đã thêm thành công, trong tab Resources, ở bên dưới khung tìm kiếm add-ons mà bạn vừa dùng để tìm Heroku Postgres sẽ xuất hiện add-ons mà bạn vừa thêm vào.

Tiếp đến bạn sẽ chọn tab Settings để lấy thông tin về cần thiết để điền vào <Setting> để app bạn có thể kết nối đến CSDL này sau khi deploy.
![](https://images.viblo.asia/b27c306d-5fe0-4e78-8014-f30423b6e566.png)

Sau khi lấy được thông tin bạn chuyển lại trang dashboard vào thư mục setting và click vào Reveal Config Vars
![](https://images.viblo.asia/1a3f5c31-bdce-4796-af63-b765ef399c18.png)

Điền toàn bộ thông tin bạn đã lấy được từ lúc settings Heroku Postgres vào đây
![](https://images.viblo.asia/adfe8114-b358-4dc5-a6cd-b4d48c16430e.png)


## 3.3 Deploy

Giờ đến phần quan trọng nhất. Heroku có hỗ trợ việc kết nối giữa Heroku và Github. Giờ bạn đã hiểu sao phần trước mình bảo dùng Git rồi chứ. Việc của bạn bây giờ là kết nối heroku với git.
![](https://images.viblo.asia/ce0bd553-bab2-41e5-aa14-419c83b69a7e.png)

Nhấn vào vùng khoanh đỏ để kết nối Heroku với Git. Sau đó chọn nhánh mà mình đã push code lên để deploy. Ở đây do bạn chỉ có 1 nhánh đầu tiên lúc tạo ở phần 1. Sau đó nhấn deploy đợi kết quả thôi.

![](https://images.viblo.asia/ee0ed61b-d05a-4eee-8b0b-d6416fb3ceaf.png)

Kết quả sẽ là 

![](https://images.viblo.asia/c76ec660-fad7-40af-9b3b-d85ab8b51610.png)

Việc cuối dùng là migrate để tạo bảng trong cơ sở dữ liệu và seed data.  Ở góc trên bên tay phải, các bạn chọn More và Run console:
![](https://images.viblo.asia/fd06a960-81f0-4624-939d-c1953943be54.png)

Một khung giống như terminal sẽ hiện ra cho phép các bạn gõ lệnh như trên terminal máy tính cá nhân của các bạn. Chúng ta tiến hành tạo bảng bằng lệnh

```
php artisan migrate
```

Làm tương tự với để seed dữ liệu

```
 php artisan db:seed
```

Cuối cùng chúng ta sẽ thử truy cập vào router nào đó của trang web để xem kết quả. Ở góc trên bên phải bạn chọn Open app ở góc trên bên phải heroku sẽ tự đổng mở cửa sổ mới dẫn tới trang web của bạn với tên miền mặc định heroku cung cấp.


Sau một hồi thì đây là [thành quả](http://doank55.herokuapp.com/) mình đạt được. Mình demo thôi lên ngại tải ảnh về lưu quá. Lỗi xíu ảnh
# 4. Tổng kết

Đây là bài viết lâu nhất của mình, hướng dấn step by step hi vọng các bạn có thể tự deploy được 1 project laravel lên Heroku dành cho cả các bạn chưa biết dùng git nên nhiều chỗ hơi dài dòng lan man với những ai đã quen với git. 
Bài viết được lấy từ nguồn từ [blog chính chủ](https://storyofsu.com/deploy-mot-project-laravel-len-host-free/) (honho).

Phần nào có lỗi cứ comment bên dưới mình sẽ giải đáp.
Cảm ơn mọi người đã đọc bài viết của mình.