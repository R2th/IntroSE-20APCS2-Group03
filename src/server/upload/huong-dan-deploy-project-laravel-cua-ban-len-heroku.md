## Giới thiệu
Đối với mỗi lập trình viên, khi làm xong một project nhỏ và muốn thêm nó vào LinkedIn hoặc page cá nhân của mình để cho mọi người xem được thì đều cần deploy nó lên 1 server nào đó với 1 tên miền. Tuy nhiên, không phải ai cũng có thể thua riêng một host và một tên miền để làm việc đó,  nhất là với các bạn sinh viên. Thay vào đó, ta có thể sử dụng [Heroku](https://heroku.com), một nền tảng cho phép chúng ta có thể deploy sản phẩm của mình lên mạng với một tên miền miễn phí. Hôm nay, mình sẽ hướng dẫn các bạn cách deploy một project Laravel lên Heroku.

## Mở đầu
Để chuẩn bị cho việc deploy, bạn cần chuẩn bị những bước sau đây:
+ Đăng kí 1 tài khoản trên Heroku (nếu chưa có), link đăng ký: https://signup.heroku.com/
+ Chuẩn bị 1 project Laravel muốn deploy lên Heroku
Sau khi đã chuẩn bị được những bước trên, chúng ta sẽ bắt đầu với việc deploy project của mình.

## Tạo repository trên Heroku
Sau khi chuẩn bị được những việc cần thiết nói trên, bạn đăng nhập vào tài khoản Heroku của mình. Ở trang Dashboard, bạn chọn **New** và **Create new app** ở góc trên bên phải để tạo repository trên Heroku:

![](https://images.viblo.asia/8fd52f52-9e2b-4908-9ab6-6af5b80145b5.png)

Sau đó ta chọn tên app của mình còn phần **Choose a region** sẽ để mặc định và ấn **Create app**:

![](https://images.viblo.asia/fb3b70a4-e6fc-46e8-8495-b1bd7b54b441.png)

Sau khi tạo app thành công, Heroku sẽ tự động redirect bạn về trang quản trị của app đó:

![](https://images.viblo.asia/621f5fb5-0135-4815-9e24-18c861a5bd98.png)

Đến đâu là ta đã thành công tạo app Heroku và có thể chuẩn bị để deploy project của mình lên.

## Thêm cơ sở dữ liệu
Đối với mỗi project, có lẽ không thể thiếu sự góp mặt của một CSDL. Heroku cũng cung cấp cho bạn CSDL miễn phí gọi là **Heroku Postgres**. Không những thế, Heroku cũng có sẵn rất nhiều các add-ons khác cho app của bạn như **Heroku Redis**, **mLab MongoDB**, ... và rất nhiều các add-ons khác liên quan đến cơ sở dữ liệu, giám sát, email/sms, caching. Tuy nhiên không phải tất cả các add-ons này đều miễn phí và mặc dù rất nhiều add-ons có sẵn Free plan nhưng bạn vẫn cần phải cung cấp thông tin thẻ Visa trước để có thể sử dụng. Nếu có thẻ visa bạn có thể yên tâm cung cấp vì chỉ khi bạn vượt quá giới hạn của Free plan mới bị tính phí và trước khi vượt quá Heroku sẽ gửi thông báo cho bạn. Bạn có thể xem các add-ons mà Heroku hỗ trợ ở [đây.](https://elements.heroku.com/addons)

Quay lại với việc tạo CSDL, từ trang quản trị của app vừa tạo, ta chọn tab **Resources** và tìm kiếm add-ons có tên là **Heroku Postgres**. Tuy nhiên bạn chỉ cần bấm chữ "H" là Heroku đã gợi ý luôn cho bạn:

![](https://images.viblo.asia/2e98a3ec-2aef-400a-aa43-ff413615cb37.png)

Bạn chọn **Heroku Postgres** sau đó đợi vài giây sẽ hiện ra bảng cho phép bạn chọn Plan mong muốn. Tất nhiên ở đây chúng ta chỉ deploy để demo nên sẽ chọn plan là **Hobby Dev - Free**:

![](https://images.viblo.asia/a0d4c95b-b805-417d-b219-3bc8a3d3008e.png)

Sau đó bạn bấm **Provision**, vài đợi giây lát để Heroku có thể thêm add-ons vào cho app của bạn. Khi đã thêm thành công, trong tab **Resources**, ở bên dưới khung tìm kiếm add-ons mà bạn vừa dùng để tìm **Heroku Postgres** sẽ xuất hiện add-ons mà bạn vừa thêm vào:

![](https://images.viblo.asia/e4273d41-863c-4966-83c4-efb3e3c09efc.png)

Tiếp đó, ta sẽ click chọn vào **Heoku Posgres** vừa thêm vào để chuyển qua trang quản trị của CSDL:

![](https://images.viblo.asia/3f61e882-6e66-48e2-8f91-bb6564c37df3.png)

Trang này sẽ cung cấp cho chúng ta một số thông tin như:
+ Plan đang sử dụng
+ Số bảng trong CSDL
+ Sô record
+ Số connections đến CSDL, ...

Tiếp đến bạn sẽ chọn tab **Settings** để lấy thông tin về cần thiết để điền vào file **.env** để app bạn có thể kết nối đến CSDL này sau khi deploy:

![](https://images.viblo.asia/327bb6d7-c547-4112-9322-df82022aa083.png)

Bạn click chọn **View Credentials** ở phía bên tay phải sẽ thấy những thông tin config cho file **.env** của Laravel:

![](https://images.viblo.asia/1d22197a-af47-459c-8bf7-c088ce1d72a8.png)

## Cài đặt Heroku CLI
Sau khi đã chuẩn bị các thao tác cần thiết trên Heroku việc tiếp theo chúng ta cần làm là cài đặt **Heroku CLI** trên máy tính các nhân để có thế deploy lên Heroku, link cài đặt ở [đây](https://devcenter.heroku.com/articles/heroku-cli). Tùy thuộc vào hệ điều hành mà bạn đang sử dụng, bạn hãy chọn bản tương ứng. 

Ngoài cách cài đặt **Heroku CLI** như trên bạn cũng có thể deploy Laravel thông qua Github tuy nhiên bạn sẽ phải bỏ ignore file **.env** để deploy được điều này đồng nghĩa với việc các thông tin config trong này của bạn người khác cũng có thể xem được trừ khi bạn dùng tài khoản trả phí và có private-repo.

Quay lại với việc cài đặt **Heroku CLI**, sau khi cài xong bạn mở terminal trên máy tính mình lên và đăng nhập vào tài khoảng Heroku. Ở đây mình sẽ sử dụng terminal có sẵn trong VSCode:

![](https://images.viblo.asia/9945991e-9099-4a90-9dca-53bc4e236d6f.gif)

Tới đây bạn đã đăng nhập thành công vào tài khoản của mình và ta có thể chuyển sang bước deploy.

## Deploy project Laravel
Như bạn biết, trong Laravel thì các biến môi trường của chúng ta thường được lưu trong file **.env**. Tuy nhiên file này sẽ chứa nhiều thông tin nhạy cảm và cần được bảo vệ nội dung của nó nên mặc định file này sẽ được ignore khỏi git trong suốt quá trình làm việc của bạn. Vì thế để có thể sử dụng được các biến môi trường trong file **.env** trên `Heroku` thì ta sẽ làm như sau:
- Đầu tiên bạn truy cập vào App mà bạn đã tạo trên `Heroku` và chọn mục setting:

![](https://images.viblo.asia/76423ce0-a6ba-4e6a-8dfa-525691c03d01.png)

- Tiếp đó bạn chọn `Reveal Config Vars` nó sẽ mở ra phần cho phép bạn khai báo các biến môi trường tương tự như file **.env**:

![](https://images.viblo.asia/f0462841-54f5-45cc-84fd-0f72d772a534.png)

Bạn có thể thêm lần lượt các biến môi trường cần thiết cho ứng dụng của bạn và đây và nó hoạt động giống như file **.env** vậy với mỗi biến sẽ gồm **KEY** và **VALUE**.

<br>

Sau khi đã config phần biến môi trường thì nhiệm vụ tiếp theo của chúng ta là tạo file config cho `Heroku`. File này giống như file config để `Heroku` có thể biết vị trí của file **index.php** trong ứng dụng của bạn. Ở đây cụ thể với `Laravel` thì file đó sẽ nằm trong folder `public`. Nếu bạn có một chút kiến thức về webserver thì nó sẽ giống như phần config entry-point cho ứng dụng của bạn còn nếu bạn không biết thì cũng không có vấn đề gì :D :D :D

```
$ echo web: vendor/bin/heroku-php-apache2 public/ > Procfile
```

Sau khi thực hiện lệnh trên sẽ tạo cho chúng ta 1 file có tên là **Procfile** với nội dung như sau:

![](https://images.viblo.asia/ea1c3e9b-b550-4142-8dc5-461e3482ff01.png)

*Chú ý: Nếu bạn sử dụng package faker để tạo dữ liệu demo thì trong file **package.json** ta cần chuyển package đó từ mục **require-dev** vào mục **require**:

![](https://images.viblo.asia/b634fc23-09b2-43d1-909b-7100f8f2ea61.png)

Nếu project của bạn chưa thực hiện init repository thì sẽ gõ lệnh để tạo repository trước:
```
$ git init
```
Trong trường hợp bạn đã init rồi thì có thể bỏ qua bước trên và đi vào phần sau:
```
$ heroku git:remote -a laravel-demo-deploy 
// tạo remote đến app của chúng ta trên herroku, ở đây của mình là ${laravel-demo-deploy}
```
Sau đó ta tiến hành add và commit các thay đổi đã thực hiện bằng các lệnh:
```
$ git add .
$ git commit -m"Deploy"
```
Cuối cùng ta tiến hành deploy lên heroku bằng lệnh:
```
$ git push heroku master![](https://images.viblo.asia/383bbc6e-174c-448c-be43-d238561d1599.png)
```
Trong trường hợp bạn không push từ nhánh master thì cần dùng lệnh:
```
$ git push heroku <your-branch>:master
// Với your-branch là  nhánh hiện tại của bạn
```
Không giống với việc push lên github, ở đây sau khi code bạn đã được push lên heroku sẽ đồng thời được build lên nên sẽ mất một lúc. Đây là kết quả sau khi chạy lệnh thành công:

![](https://images.viblo.asia/fb5692c7-873d-4a29-a43a-28f6c6488643.png)

Sau khi bước trên thành công, ta quay lại trang quản trị của Heroku sẽ thấy hiển thị kết quả của việc build:

![](https://images.viblo.asia/98a675d0-a481-4e94-9b93-aea7cfec471f.png)

Sau khi build thành công, ta sẽ tiến hành tạo các bảng trong CDSL và chạy seeder. Ở góc trên bên tay phải, các bạn chọn **More** và **Run console**:

![](https://images.viblo.asia/383bbc6e-174c-448c-be43-d238561d1599.png)

Một khung giống như terminal sẽ hiện ra cho phép các bạn gõ lệnh như trên terminal máy tính cá nhân của các bạn. Chúng ta tiến hành tạo bảng bằng lệnh:
```
$ php artisan migrate
```
![](https://images.viblo.asia/eca8efc1-859a-4b57-8448-6456d0d37c2c.png)

Và đây là kết quả chúng ta thu được sau khi tạo bảng:

![](https://images.viblo.asia/09cd5fa1-3d5c-4b47-9718-1fc76abb5d64.png)

Sau đó ta tiếp tục thực hiện việc seed data bằng cách chọn **Run another command** ở góc dưới bên phải. Như đã nói qua ở trên, nếu bạn dùng faker cho việc seed dữ liệu thì cần chuyển package faker từ mục **require-dev** sang mục **require** trong file package.json nếu không sẽ bị lỗi. Kế quả việc chạy seeder:

![](https://images.viblo.asia/59cd3a9a-33eb-41aa-9b48-452546cfce01.png)

![](https://images.viblo.asia/bd9b1ffa-f7bd-4cb5-98c5-98e2d87b2bf2.png)

Cuối cùng chúng ta sẽ thử truy cập vào router nào đó của trang web để xem kết quả. Ở góc trên bên phải bạn chọn **Open app** ở góc trên bên phải heroku sẽ tự đổng mở cửa sổ mới dẫn tới trang web của bạn với tên miền mặc định heroku cung cấp:

![](https://images.viblo.asia/1cbfadc3-910e-47fc-b664-4b62807e9b95.png)

Và đây là kết quả mà chúng ta thu được (đây là trang mặc định mình dùng để test):
![](https://images.viblo.asia/10669200-7edd-457c-938d-0caccd9a4bd3.gif)

Ta cũng truy cập thử vào url khác để kiểm tra xem việc seed dữ liệu có thành công không:

![](https://images.viblo.asia/20172bff-c81a-4d3e-b89d-e46932bade50.png)

Ta cũng có thể truy cập vào trang quản trị của CSDL mà chúng ta cài ở phần add-ons sẽ thấy những thay đổi về số bảng cũng như số lượng bản ghi có trong CSDL:

![](https://images.viblo.asia/620e2473-108b-46a7-aa55-deb158f199ee.png)

## Kết thúc
Mong ra qua bài viết của mình có thể giúp các bạn deploy project laravel của mình lên một cách dễ dàng. Nếu bạn có thắc mắc hãy comment ở bên dưới mình sẵn sàng trả lời. Cám ơn bạn đã đọc bài :)