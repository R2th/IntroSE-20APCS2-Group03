> Xin chào mọi người, như mọi người có thể đã biết thì kể từ 28/11/2022 Heroku đã chính thức ngừng cung cấp các plan miễn phí (Free Heroku Postgres, free Heroku Data for Redis®, and free Heroku Dynos). Hiện tại, heroku yêu cầu người dùng nâng cấp lên các plans giá rẻ hoặc cao hơn để tiếp tục sử dụng dịch vụ.

Với mong muốn đi tìm dịch vụ khác miễn phí thay thế Heroku để deploy cái project laravel làm demo, tìm một hồi thì cũng gặp được một bạn Voz giới thiệu đến **Railway.App**. Sau một hồi ngồi vọc vạch thì mình thấy nó khá dễ sử dụng và muốn chia sẻ với mọi người. Ở bài viết này xin mạn phép hướng dẫn mọi người vài bước đơn giản để deploy project laravel trên Railway.app.

## Railway.App??

### Giới thiệu

**Railway.Ap**p mới được triển khai vào đầu năm 2021 đến nay với mong muốn cung cấp giải pháp dễ dàng và tiết kiệm để deploy một ứng dụng production chỉ trong vài phút.

Railway hỗ trợ triển khai project của bạn dựa trên **Nixpacks**, một open-source tool phát triển bởi Railway team. Bạn chỉ cần đưa project lên, Nixpacks sẽ dựa trên project của bạn để tạo image phù hợp và chạy project đó.

Bạn sẽ bắt đầu với gói miễn phí (*Starter plan*) sau khi xác thực tài khoản. Starter có `$5 hoặc 500 giờ sử dụng/ tháng`, số giờ sẽ tính cho thời gian mà các services chạy, còn $5 là khoản chi trả cho RAM và CPU nếu project của bạn vượt giới hạn mức của plan. 

![railway plans](https://images.viblo.asia/6a2cb241-a8e9-4e38-9316-c66a47ff7630.png)

Khi hết tài nguyên (dùng hết $5 hoặc 500 giờ chạy tùy theo cái nào đến trước) thì project của bạn sẽ bị ngưng và phải *start lại thủ công vào tháng tiếp theo*. Bạn cũng có thể thêm thẻ tín dụng để nâng các giới hạn.

### Đăng ký tài khoản Railway

Việc đăng ký rất đơn giản, bạn chỉ cần xác thực bằng tài khoản github là có thể bắt đầu sử dụng được tài khoản của mình ở **Railway**. Nhớ đồng ý với điều khoản, kết nối với Github để verify tài khoản và nhận $5 và 500 giờ sử dụng/tháng.

![railway.app_login_github.png](https://images.viblo.asia/60155569-14a3-4f0a-8cf9-c2da55bd3af0.png)

![railway.app verify account](https://images.viblo.asia/421283bc-0137-4e12-bfdb-50ef9c7d8f5d.png)

## Chuẩn bị Deploy project Laravel

Để bắt tay vào việc deploy project laravel của bạn thì cần phải chuẩn bị trước một chút. Đương nhiên là một project trên tài khoản github mà bạn vừa liên kết với Railway rồi. Ngoài ra, Railway cũng hỗ trợ deploy từ local, bạn có thể thamkhảo thêm https://docs.railway.app/. 

Phần này sẽ giới thiệu trước một số thuật ngữ.

**Projects**

Ở trên Dashboard sẽ liệt kê tất cả các projects của bạn. Mỗi project sẽ bao gồm các services và environments - hỗ trợ cho bạn triển khai nhiều môi trường (develop, staging, product) cho project đó.

![railway  projects canvas.png](https://images.viblo.asia/229a55e2-24c2-4a84-ad0b-9d5327840888.png)

**Services**

Mỗi *project* thì có thể bao gồm nhiều *services*. Có 2 loại là: 
* Persistent database services (PostgreSQL, MySQL, MongoDB, Redis)
* Ephemeral deployment services (Hỗ trợ template cho nhiều ngôn ngữ và nhiều framework khác nhau https://railway.app/templates)

Như đã giới thiệu từ trước,* Railway Nixpacks* sẽ đọc mã nguồn của bạn và tự tạo ra một bản image phù hợp. Trên một dự án Laravel tiêu chuẩn, Nixpacks sẽ thiết lập *Nginx* để xử lý các requests, *PHP* với phiên bản yêu cầu của dự án của bạn, *NodeJS* với trình quản lý package của bạn Yarn, pnpm hoặc npm.

## Deploy project Laravel trên Railway

### Create new project with Railway

Việc bắt đầu dự án mới với Railway rất đơn giản. Truy cập https://railway.app/new hoặc chọn *Create a New Project* tại Dashboard. Thiết lập kho lưu trữ mà bạn muốn. 

![railway create new project.png](https://images.viblo.asia/ecd47577-8c55-413a-a499-a25a04c41c6f.png)

Ở bài hướng dẫn này mình sử dụng `Deploy from Github repo`. Bạn cần cấp quyền cho *Railway App* sử dụng repository github để triển khai. Ở đây mình đã cấp quyền trước đó rồi nên sẽ có lựa chọn để deploy ngay (Deploy now).

![railway deploy form github.png](https://images.viblo.asia/83fa9bf8-7520-4346-997a-87c00d90db5e.png)

Project của bạn sẽ bắt đầu deploy service đầu tiên (service laravel), bước `Build` và `Deploy` có thể chạy suôn sẻ. Cũng đừng quá lo lắng khi bạn không thể truy cập trang đích ngay vì Laravel cần thiết lập một vài biến và chạy một vài lệnh, chúng ta sẽ hoàn tất trong các bước tiếp theo.

![railway laravel first deploy.png](https://images.viblo.asia/3dbaa0a6-2cec-4454-b4cd-634073e09843.png)

### Create database to deploy project in Railway

Vì hệ thống sẽ được reset mỗi lần deploy nên không thể sử dụng CSDL cục bộ như SQLite. *Railway* cung cấp các DBMS như MySQL, PostgreSQL, MongoDB và Redis.

Trong **Railway Project**, chọn nút thêm mới **New** và chọn DBMS phù hợp với dự án của bạn.

![chose a dbms in railway1.png](https://images.viblo.asia/4af126ca-4ccb-4f66-9176-16cf03aadac8.png)

![chose a dbms in railway2.png](https://images.viblo.asia/4f5ba7c3-5300-483a-91d2-8fa3cc75d2a8.png)

Sau khi service `MySQL` được khởi tạo xong, bạn có thể xem các thông tin đăng nhập tại tab **Variables** dưới dạng *KEY* và *value* bị ẩn đi.

![mysql variables railway.png](https://images.viblo.asia/28403506-aa2c-442a-b5b7-7559c6240a3c.png)

Bạn có thể sao chép các giá trị này vào *Enviroment variable*s của Laravel (ở bước sau) hoặc sử dụng biến dạng `${{ KEY }}` (ví dụ `${{ MYSQLDATABASE }}`) để project có thể kết nối vào DB.

### Config enviroment variables cho Laravel service

Để Laravel có thể chạy được thì ta cần cấu hình lại file `.env` tuy nhiên ở đây ta có thể cấu hình các biến môi trường trực tiếp trên service.

![config laravel env.png](https://images.viblo.asia/389b4348-842b-44f5-b1ae-ba3719f4cedf.png)

Có thể chọn **Raw Editor** để sửa 1 cục giống khi bạn edit file `.env`

![raw editor project varibales.png](https://images.viblo.asia/5eacb711-defe-48b1-af08-dbb0dad8153f.png)

Sử dụng https://generate-random.org/laravel-key-generator?count=1 để generate APP_KEY và thêm vào biến hệ thống

Các biến môi trường của Laravel để connect tới DB bạn có thể tham khảo đoạn sau:

```
DB_CONNECTION=mysql
DB_HOST=${{ MYSQLHOST }}
DB_PORT=${{ MYSQLPORT }}
DB_DATABASE=${{ MYSQLDATABASE }}
DB_USERNAME=${{ MYSQLUSER }}
DB_PASSWORD=${{ MYSQLPASSWORD }}
```

![file env laravel.png](https://images.viblo.asia/15685709-3292-411b-bbea-e8144de05089.png)

(trên ảnh mình sai `DB_USERNAME=${{ MYSQLUSER }}` nha mọi người 😉)

Mỗi lần sửa lại các biến môi trường của service, một bản deploy sẽ được build lại từ đầu.

### Custom Build command cho Laravel khi build Services

Mặc định, *Nixpacks* chỉ chạy một số lệnh đơn giản khi build project PHP . Để chạy các lệnh như `php artisan migrate` hay clear cahce bạn cần custom lại Nixpacks để phù hợp với project của mình.

![nixpacks php default.png](https://images.viblo.asia/b21743c0-133a-4ca9-a514-0eda3df8b9cf.png)

Cách tốt nhất để custom lại là thêm biến môi trường `NIXPACKS_BUILD_CMD` giống như bạn thêm ở bước **Config enviroment variables cho Laravel service**

Như ảnh trên, trong bước `build`, Nixpacks chỉ chạy lệnh `[yarn|pnpm|npm] [prod|build]`. Khi ta overide lại bước này thì cũng cần thêm lại lệnh đó để build các tài nguyên assets. Phía dưới là `NIXPACKS_BUILD_CMD` của mình:

```
NIXPACKS_BUILD_CMD = php artisan optimize && php artisan config:clear && php artisan cache:clear && php artisan migrate --force && npm install bower && ./node_modules/bower/bin/bower install && npm run prod
```

![NIXPACKS_BUILD_CMD laravel.png](https://images.viblo.asia/7c0f1e71-b49c-4315-bc37-da431c57f90a.png)

Mình minh họa một cách tiếp cận đơn giản bằng cách chạy từng lệnh trong một chuỗi với `&&`, nhưng bạn có thể đặt tất cả lệnh này vào composer script, bash script hoặc Makefile.

### Add custom acccess domain to project Railway

Theo mặc định, Project của bạn sẽ không được truy cập công khai. Bạn có thể đi tới Tab **Settings** của service Laravel để thêm miền phụ có sẵn hoặc tên miền tùy chỉnh của riêng bạn.

![Add domain to railway project.png](https://images.viblo.asia/b1858169-21f6-4810-9eea-06f5a169a3f7.png)

Bây giờ bạn đã có thể truy cập đường dẫn project của bạn rồi!

![my first project laravel in railway.png](https://images.viblo.asia/c8097681-fc2f-43cb-bf5b-e7c0ed01dfd9.png)

## Một vài cài đặt thêm
### Thêm https protocol
Mặc định thì Laravel sẽ sử dụng phương thức `http` để render ra link assets. Mà railway có hỗ trợ `https` khiến ứng dụng không thể tải được các tài nguyên assets.

Bạn nên buộc các URL sử dụng giao thức `https` bằng cách thêm đoạn code sau vào hàm `boot()` trong file `App/Providers/AppServiceProvider` 

```php
public function boot()
{
    if ($this->app->environment('production')) {
        URL::forceScheme('https');
    }
}
```

### Sử dụng Redis và s3 để lưu trữ liên tục
*Why are my file uploads missing/deleted from the Application?*
Do ngoài DB ra thì các services khác không có hệ thống lưu trữ file liên tục cho nên khi Services build lại sẽ mất hết dữ liệu cũ.

Mặc định Laravel sẽ sử dụng file driver để lưu cache, queue, log, session nên trong tình huống này có thể hoạt động không bình thường, làm ngắt kết nối người dùng sau mỗi lần deploy.

Chúng ta có thể sử dụng Redis để lưu trữ thay vì file. Tạo một service giống như bạn tạo service MySQL.

![image.png](https://images.viblo.asia/4625613c-ce03-428e-8e33-353adad7a8c5.png)

Sửa các biến môi trường driver của laravel về Redis và thêm biến mỗi trường kết nối với Redis

![image.png](https://images.viblo.asia/7a76c0b4-cc2f-438f-bfab-cb7e0a748f5c.png)

Còn đối với file thì bạn nên sử dụng các dịch vụ lưu trữ như `s3` của AWS để thay thế.

### Creating a worker server 
Railway chỉ cho phép 1 tiến trình duy nhất chạy xuyên suốt với mỗi services, **service laravel** của chúng ta hiện tại đang chạy tiến trình của nginx và php.

Nếu bạn cần 1 tiến trình để chạy `queue` cho project của mình?

Hãy tạo 1 service mới, cũng chọn repository đó một lần nữa. Sau đó copy toàn bộ biến môi trường của service laravel để chúng chạy chung 1 config. Bạn hãy overide lại biến `NIXPACKS_START_CMD` để chạy tiến trình `Laravel queue worker` 

![image.png](https://images.viblo.asia/f0b909d0-ef72-42a0-a983-617d0ff9727c.png)

## Conclusion
Hy vọng là bài hướng dẫn này sẽ giúp ích mọi người deploy project Laravel lên internet bằng Railway. Vì tài nguyên của Railway cho có hạn nên chỉ có thể dùng để test, nghiên cứu và demo thôi.

Mình cảm thấy **Railway** sẽ là lựa chọn thay thế miễn phí hoàn hảo hiện nay cho Heroku. Mọi người còn trang nào khác ngon hơn hãy cùng chia sẻ nhé?

Mong các bạn xài chừng mực, hợp lí, đừng lập nhiều tài khoản spam. Nếu thế thì chẳng còn dịch vụ nào free mà ngon cho mọi người dùng nữa. Thân!

Tham khảo: https://invariance.dev/2022-08-04-deploy-laravel-on-railway.html

Biên tập: nampt.me