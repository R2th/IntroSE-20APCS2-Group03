## 1. Mở đầu
<hr>

Mỗi khi làm xong một một ứng dụng web với Laravel thì chắc hẳn ai cũng muốn đưa sản phẩm của chúng ta từ môi trường local trên máy lên chạy ở môi trường thực tế để có thể đưa ra cho mọi người sử dụng. Trong bài viết ngày hôm nay, mình sẽ hướng dẫn các bạn deploy ứng dụng Laravel của mình lên [Digital Ocean](https://m.do.co/c/317ae4174798) - một bên cung cấp dịch vụ máy chủ khá nổi tiếng.

## 2. Chuẩn bị
<hr>

Ở bài viết này, chúng ta sẽ cùng nhau deploy sản phẩm của mình lên một `VPS` - máy chủ ảo cá nhân chứ không phải một share host thông thường cho nên chúng ta sẽ được tự tay cài đặt tất tần tật những gì chúng ta cần và muốn cho máy chủ của chúng ta. Việc tự tay làm như vậy có thể giúp các bạn có thêm kiến thức về việc deploy cũng như việc làm việc với máy chủ web. Chính vì thế, để có thể bắt đầu thì các bạn cần chuẩn bị một số thứ như sau:
- Một project Laravel của cá nhân bạn (ở đây mình sẽ sử dụng một project Laravel mới hoàn toàn của mình).
- Một tài khoản Github để có thể clone và pull/ push code lên đó.
- Một tài khoảng trên [Digital Ocean](https://m.do.co/c/317ae4174798) và tất nhiên bạn cũng cần có một thẻ Visa hoặc 1 tài khoản Paypal để có thể thuê VPS.

Nếu bạn đáp ứng được toàn bộ các yêu cầu nói trên thì chúng hãy cùng bắt đầu.

## 3. Tạo droplet
<hr>

Trước khi có thể tạo  `Droplet` thì chúng ta hãy tiến hành tạo một `ssh key` để sau đó có thể dùng nó để truy cập vào server thay cho việc dùng username và password. Để tạo `ssh-key` thì chúng ta hãy mở terminal lên và gõ như sau để tạo key:
```bash
ssh-keygen
```

Bạn hãy nhớ lấy đường dẫn mà bạn tạo lưu cặp key này và thông thường nó sẽ có dạng như sau `/home/[username]/.ssh/[key_name]` đối với `Ubuntu` còn tùy vào hệ điều hành sẽ có lệnh tạo key hoặc đường dẫn khác nhau. Sau khi tạo xong key thì bạn hãy mở file chứa public key có tên thông thường sẽ là `[key_name].pub` và copy lấy nội dung file này để dùng sau đây.

Sau khi đã có thông tin về key và đã tạo thành công tài khoản trên Digital Ocean thì bạn hãy đăng nhập vào đó và bên tay trái chúng ta hãy chọn mục `ACCOUNT -> Billing`.

![](https://images.viblo.asia/295d7eed-3388-48df-b99e-beb91dcf9810.png)

Sau đó bạn quay chuột xuống phần `Payment methods` để có thể chọn nhập thông tin thẻ Visa của mình hoặc Paypal. Sau khi hoàn thành các công việc trên thì bạn có thể thể bắt đầu việc tạo `Droplet` hay `VPS` của mình bằng cách nhấn vào nút `CREATE` và chọn `Droplets`:

![](https://images.viblo.asia/047acec4-6fa2-4cd2-a85d-9f66b59556c8.png)

Trong giao diện của phần tạo `Droplet` thì chúng ta sẽ lần lượt chọn các option như sau:
- Ở phần hệ điều hành bạn hãy chọn `Ubuntu 18.04`:

![](https://images.viblo.asia/5c6a7e67-29b9-4233-97de-3626604152ba.png)

- Tiếp đến ở phần plan thì ta sẽ chọn `Standard`. Tùy độ lớn hoặc yêu cầu đối với sản phẩm của bạn thì bạn có thể tự tham khảo các plan khác.

![](https://images.viblo.asia/67e71433-1d67-4c80-9036-0da7d27e62f1.png)

- Ở phần lựa chọn cấu hình thì cũng tùy thuộc vào yêu cầu về phần cứng của trang web của bạn ít hay nhiều mà bạn có thể chọn cấu hình tương ứng. Ở đây để demo mình sẽ chọn cấu hình thấp nhất là 5$ (lưu ý bạn có thể chọn 5$ như mình và sau này nếu cần hơn thì [Digital Ocean](https://m.do.co/c/317ae4174798) cũng cung cấp cho chúng ta lựa chọn để mở rộng luôn mà không cần tạo mới)

![](https://images.viblo.asia/f81d2177-01af-43b8-a62a-4ec214101129.png)

- Trong phần lựa chọn vị trí mà chúng ta đặt VPS thì bạn nên chọn địa điểm gần nhất đối với khu vực mà người dùng của bạn sẽ hay sử dụng trang web. Với trường hợp trang web của bạn dùng ở Việt Nam là chủ yếu thì ta sẽ chọn đặt máy chủ ở Singapore:

![](https://images.viblo.asia/8b6db9ac-9062-4716-a04e-fb97fd1344ab.png)

- Ở bước tiếp theo ta sẽ cần dùng đến nội dung của cái `ssh key` mà chúng ta tạo ra trước đó trong file có tên là `.pub`. Bạn hãy mục `SSH Keys` sau chọn nút `New SSH Key`:

![](https://images.viblo.asia/340ba157-fd9b-4040-8d18-6558af094545.png)

- Sau đó nó sẽ hiện thỉ 1 cái khung cho phép bạn nhập nội dung key trong file có đuối là `.pub` như mình nói ở trên và và một cái tên bất kì bạn chọn cho key của mình:

![](https://images.viblo.asia/ae3f038e-3ba0-4ac3-9325-22220d9459b6.png)

- Sau khi nhập đầy đủ các thông tin thì bạn hãy bấm `Add SSH Key`. Lúc này ở giao diện bên ngoài sẽ xuất hiện key mà bạn vừa tạo và bạn hãy tích chọn vào cái key đó

![](https://images.viblo.asia/e33451c3-3740-420b-bfb3-0f1db55c8c06.png)

- Cuối cùng thì ta sẽ phải chọn số lượng máy chủ muốn tạo và ở đây sẽ là 1 và tên mà chúng ta muốn đặt cho nó:

![](https://images.viblo.asia/29a60df6-306a-465e-a39b-fba26e23ffe5.png)

- Sau khi chọn số lượng và tên xong bạn lăn xuống cuối cùng và chọn `Create Droplet` và đợi một tí để [Digital Ocean](https://m.do.co/c/317ae4174798) tạo `Droplet` cho bạn. Sau khi tạo xong thì nó sẽ tự redirect bạn về giao diện Project và bạn sẽ thấy `Droplet` mà mình vừa tạo xuất hiện:

![](https://images.viblo.asia/61e22a1d-ffb6-4f94-a5f5-d5a8dab47eaf.png)

Khi việc tạo đã hoàn tất thì bạn có thể lấy địa chỉ IP tương ứng với `Droplet` của bạn chính là địa chỉ IP của máy chủ mà bạn mới tạo. Để có thể truy cập vào nó thì ta quay lại với máy tính của chúng ta, mở terminal lên và gõ lệnh:

```bash
ssh root@[IP]
```

Tiếp đó bạn chọn `Yes` và nếu kết nối thành công tới máy chủ thì trên terminal của chúng ta sẽ có giao diện như sau:

![](https://images.viblo.asia/bdc86cc3-c089-4afb-8bf2-9b427d338d6e.png)

Đến đây là chúng ta đã hoàn thành bước đầu tiên đó là tạo máy chủ trên [Digital Ocean](https://m.do.co/c/317ae4174798). Tiếp theo chúng ta sẽ tiến hành cài đặt một số phần mềm cần thiết để deploy trang web Laravel của chúng ta lên đó

## 4. Cài đặt phần mềm
<hr>

### a. Tạo mới user
Khi đã truy cập vào được máy chủ thì chúng ta sẽ thao tác toàn bộ thông qua terminal vì tất nhiên là sẽ không hề có bất cứ GUI nào trên này rồi. Nếu bạn đang sử dụng hệ điều hành Linux thì không có gì khó khăn cả còn nếu bạn đang sử dụng Window thì cũng không sao, nếu bạn đã kết nối được đến máy chủ giống như hình ở trên của mình rồi phần cài đặt sau bạn có thể làm theo mình. Trước khi tiến hành cài đặt các phần mềm cần thiết cho máy chủ của chúng ta thì ta nên tạo một user mới thay vì dùng luôn quyền root mặc định như trên. Lý do vì sao thì bạn có thể tìm đọc ở trên mạng :D nhưng chủ yếu ở đây liên quan đến vấn đề về Security. Để tạo user mới ta sẽ lần lượt chạy các lệnh như sau:

```bash
useradd -d /home/[username] -m [username] // Tạo một user mới và folder mặc định cho user
usermod -s /bin/bash [username] // Tạo shell riêng cho user mới
usermod -aG sudo [username] // Thêm user vào nhóm sử dụng quyền sudo
passwd [username] // Đặt password cho user
su - deploy // Chuyển qua đăng nhập bằng user mới
```

Ở đây bạn sẽ thay thế toàn bộ phần `[username]` trong các lệnh nói trên bằng tên mà bạn muốn trong trường hợp của mình sẽ đặt tên là `deploy` thì mình sẽ thu được kết quả như sau:

![](https://images.viblo.asia/14be429d-5080-46bf-9fe6-3cec57efec41.png)

Sau khi đã tạo user xong thì lúc này đẽ lần sau khi ssh vào server ta sẽ dùng user này luôn thì ta sẽ cần tạo thêm một căp `ssh key` mới trên máy tính của chúng ta như cách mà mình đã nói với bạn ở trên và bạn lưu ý key này hãy đặt tên khác và sao cho nhìn vào key bạn có thể nhớ nó dùng để làm gì. Lưu ý ở đây bạn không cần tắt cái terminal đang kết nối đến server mà chỉ cần mở thêm 1 cái terminal khác lên để tạo key. Giả sử trong trường hợp của mình thì mình sẽ đặt key là `id_rsa_deploy_deploy-tutorial` sẽ bão gồm tên user và tên máy chủ để sau chúng ta có thể biết được key này đang được dùng ở đâu. Sau khi tạo xong thì bạn cũng copy nội dung file `id_rsa_deploy_deploy-tutorial.pub` lại và quay với terminal đang kết nối đến server dưới username là deploy và thực hiện các lệnh sau:

```bash
mkdir .ssh // Tạo folder .ssh
cd .ssh/ // Di chuyển terminal vào trong folder này
touch authorized_keys // Tạo file authorized_keys
vi authorized_keys // Mở file vừa tạo lên
```

Sau khi bạn mở file vừa tạo lên thì lúc này bạn sẽ chuyển qua cái phần mềm editor mặc định đó là `vim`. Để có thể edit nội dung trong này bạn bấm phím `i` trên bàn phím sau đó bấm tổ hợp `Ctrl+Shift+V` để paste cái key mới mà ta vừa tạo phúa trên vào đây (lưu ý là hãy copy cái key đó trước khi gõ tổ hợp phím này). Sau đó ta sẽ bấm lần lượt các phím sau `esc`, `:`, `w`,`q` và bấm Enter để tiến hành lưu lại cái key ta vừa paste vào file và đồng thời thoát khoải giao diện của `vim`. Sau khi đã lưu key thành công thì ta sẽ tiếp thực hiện một số lệnh sau để cấp quyền cho file và folder vừa tạo:
```bash
chmod -R 700 authorized_keys // Cấp quyền đọc, ghi, thực thi đối với nhóm user root cho file authorized_keys
cd .. // Quay lại folder trước đó
chmod -R 700 .ssh/ // Cấp quyền đọc, ghi, thực thi đối với nhóm user root cho folder .ssh
```

Đây là hình ảnh cho việc thực hiện của mình:

![](https://images.viblo.asia/826c9f29-c28c-4d87-b3fc-c8a2e429b068.png)

Sau khi đã làm xong toàn bộ các bước nói trên thì ta sẽ gõ lệnh `exit` và bấm enter để đăng xuất khỏi user vừa tạo và tiếp tục gõ exit lần nứa để ngắt kết nối đến server. Sau đó bạn gõ lại lệnh:
```bash
ssh [username]@[IP] // Với username là username mới mà bạn vừa tạo trước đó và IP là địa chỉ IP server của bạn
```
Trong trường hợp của mình thì mình sẽ gõ là:
```bash
ssh deploy@157.245.155.9
```
Sau khi bấm enter nếu bạn kết nối thành công vào server dưới username mà bạn vừa chọn thì nghĩa là bạn đã hoàn tất việc tạo user

![](https://images.viblo.asia/71ec85e5-0012-4ac4-9bd3-82d2ea0dc455.png)

Sau khi hoàn tất việc tạo user mới thì bây giờ chúng ta sẽ thao tác chủ yếu trên user này thôi và để chạy được trang web của chúng ta sẽ cần cài một số phần mềm như sau:
- Một phần mềm máy chủ web có thể là Nginx hoặc Apache. Ở đây do mình quen làm việc với Nginx hơn nên chúng ta sẽ cài Nginx
- Để chạy được Laravel thì chúng ta cũng sẽ cần cài đặt PHP và ở đây sẽ là phiên bản 7.3
- Phần mềm để quản lý các package trong PHP mà chắc hẳn ai cũng biết đó là `Composer`

### b. Cài đặt Nginx

Để cài đặt Nginx ta chỉ cần thực hiện lần lượt các lệnh như sau:
```bash
sudo apt update
sudo apt install nginx
```
Bạn chạy lần lượt từng lệnh trên và đợi trong giây lát để hoàn tất quá trình cài đặt Nginx:

![](https://images.viblo.asia/edbce1dc-bc4f-4fc5-a7db-af3170d7c0bd.png)

Sau đó bạn thử gõ lệnh sau để kiểm tra việc cài đặt có thành công không:
```bash
nginx -v
```
Nếu bạn thu được dòng chữ giống kiểu `nginx version: nginx/1.14.0 (Ubuntu)` thì nghĩa là việc cài được Nginx. Tiếp đó bạn nên bật firewall lên để tăng tính an toàn cho máy chủ bằng cách gõ lệnh:
```bash
sudo ufw enable
```
Sau đó bạn chọn `Y` để firewall được bận lên. Tiếp đến bạn cần cho phép kết nối từ bên ngoài đến máy chủ web Nginx của chúng ta bằng việc thực hiện lệnh:
```bash
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Ngĩn HTTPS'
sudo ufw allow 22 // bạn hãy nhớ gõ lệnh này vì nếu không bạn sẽ không thể ssh vào server nữa vì firewall sẽ block port 22
```
Cuối cùng bạn gõ lệnh sau để kiểm tra trạng thái của firewall `sudo ufw status` thì sẽ thu được kết quả như sau:

![](https://images.viblo.asia/3e85f3dc-e85c-44f7-a1ae-a5bc4575be5d.png)

### c. Cài đặt PHP

Tiếp theo chúng ta sẽ tiến hành cài đặt PHP 7.3 cùng với các extension thông dụng của nó. Bạn lần lượt chạy các lệnh sau:
```bash
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt install php7.3 php7.3-cli php7.3-common php7.3-mysql php7.3-cgi php7.3-curl php7.3-zip php7.3-mbstring php7.3-gd php7.3-xml php7.3-xsl php7.3-dev php7.3-bz2  php7.3-sqlite php7.3-sqlite3 php7.3-memcached php7.3-fpm php7.3-xdebug php7.3-bcmath php7.3-intl
```

Sau khi quá trình tải và cài đặt kết thúc thì chúng ta cũng tiến hành kiểm tra việc lại giống với khi mà chúng ta cài Nginx bằng cách gõ lệnh:
```bash
php -v
```

Nếu bạn thu được kết quả có dạng như:

![](https://images.viblo.asia/d4307586-c590-4d60-a9d8-04cd9e4e13db.png)

Thì nghĩa là việc cài đặt PHP 7.3 và các extension cần thiết đã thành công và chúng ta có thể chuyển qua bước tiếp theo.

### d. Cài đặt composer

Cuối cùng chúng ta sẽ tiến hành cài đặt `Composer` lên bằng cách thực hiện lần lượt các lệnh theo hướng dẫn trên trang chủa của `Composer` ở [đây](https://getcomposer.org/download/). Tuy nhiên trước khi thực hiện các lệnh đó thì bạn cần chạy thêm lệnh sau để cài hai phần mềm cần thiết cho quá trình cài đặt `Composer`.
```bash
sudo apt-get install curl unzip
```

Sau đó bạn chạy lần lượt các 2 lệnh đầu tiên theo hướng dẫn trên trang chủ ở [đây](https://getcomposer.org/download/). Đói với lệnh thứ 3 ở tên trang chủa là :
```bash
php composer-setup.php
// thì chúng ta sẽ thay thế bằng lệnh sau
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

Cuối cùng ta chạy nốt lệnh `php -r "unlink('composer-setup.php');"` để xóa file setup đi và kiểm tra quá trình cài đặt bằng lệnh:
```bash
composer -v
```

![](https://images.viblo.asia/7f79b267-880f-4992-9a04-4e11d7600b98.png)

Đến đây là chúng ta đã cài đặt được những phần mềm cơ bản nhất để có thể chạy được project Laravel mới.

## 5. Cài đặt project Laravel
<hr>

Để chạy được project Laravel thì đầu tiên chúng ta sẽ phải clone cái repo chứa project đó về server của chúng ta cái đã. Ở đây để tránh việc mỗi lần clone hoặc pull code mới ta phải nhập lại username và password cho Github thì mình sẽ add một cái `ssh-key` mới vào Github. Đầu tiên ta sẽ tạo mới `ssh key` của  server giống như cách làm ở trên mà mình đã nói tuy nhiên lần này ta làm trên server:
```bash
ssh-keygen
```
Tiếp đó bạn nhập vào đường dẫn lưu trữ sẽ là `/home/[username]/.ssh/id_rsa_github` với `[username]` là username mà bạn đặt của mình sẽ là `/home/deploy/.ssh/id_rsa_github` và bấm enter liên tiếp (chú ý không nhập password cho key). Sau khi đã tạo key thành công thì bạn sẽ gõ lệnh sau để lấy được `public key` vừa tạo:
```bash
cat /home/deploy/.ssh/id_rsa_github.pub
```
Lệnh trên sẽ in toàn bộ `public key` ra cửa sổ terminal của bạn bạn chỉ cần copy nó lại. Tiếp theo ta sẽ truy cập vào repo của bạn trên Github và chọn mục `Settings`:

![](https://images.viblo.asia/2ebe1b41-0572-4082-9f5d-341f318cb835.png)

Trong giao diện `Settings` thì ở phần bên tay trái bạn chọn mục `Deploy Keys`:

![](https://images.viblo.asia/07a20acf-6c1e-43a0-826d-84bc6cf26ded.png)

Trong mục này thì bạn tiếp tục chọn `Add deploy key` và nhập lần lượt tên mà bạn muốn đặt cho key này và `public key` mà bạn vừa copy ở bên server bỏ vào đây và chọn `Add key` để hoàn tất quá trình này:

![](https://images.viblo.asia/507f9483-53e8-4464-9906-2463937fbbcf.png)

<hr>

![](https://images.viblo.asia/7ae7e323-c124-46df-a7f0-8e6b14db9f00.png)

<hr>

![](https://images.viblo.asia/dc55c2c9-5762-4164-a347-169169ced348.png)

Cuối cùng bạn quay lại phần `Code` trong repo của bạn và copy cái link download dưới dạng ssh lại:

![](https://images.viblo.asia/e0dd3f35-d36e-4dc0-b79c-6cba46b2bdc1.png)

Bây giờ chúng ta lại quay lại với terminal của server. Ta sẽ tạo thêm một folder mới đặt tên là `workdir` dùng để chứa các trang web của bạn với lệnh `mkdir workdir && cd workdir/`. Sau đó ta sẽ tiến hành clone code trên github của chúng ta vê thông qua cái đường dẫn mà ta vừa copy như sau:
```bash
git clone git@github.com:dqhuy78/deploy-tutorial.git
```

Trong trương hợp bạn đã thêm key thành công rồi nhưng vẫn báo lỗi permission denied khi clone thì bạn sẽ lần lượt thực hiện các lệnh như sau:
```bash
cd /home/[username]/.ssh // Di chuyển terminal vào folder .ssh
touch config // Tạo file config
vi config // Edit file config
```

Sau khi thực hiện các lệnh nói trên sẽ mở ra cái `vim` editor thì bạn bấm phím `i` để có thể edit và copy phần sau vào file:
```bash
Host github.com
   HostName github.com
   User git
   IdentityFile /home/deploy/.ssh/id_rsa_github
```

Bạn chú y hãy cập nhật lại phần được dần đến `ssh key` của bạn. Nếu bạn làm theo hướng dẫn của mình từ đầu thì nó sẽ có dạng `/home/[username]/.ssh/id_rsa_github` với `[username]` là username mà bạn đặt và lưu ý lần này không có cái `.pub` ở cuối nhé. Cuối cùng thì bạn bấm lần lượt các phím `esc`, `:`, `w`,`q` để lưu lại thay đổi và thoát khỏi file config. Sau đó bạn thử clone lại code sẽ được ngay. Tiếp đso bạn dùng lệnh `cd` để di chuyển vào folder chứa code của bạn và bắt đầu tải vendor bằng lệnh:
```bash
composer install
```

Chờ trong giây lát cho đến khi lệnh trên chạy xong thì bạn sẽ thực hiện tiếp lệnh sau:
```bash
cp .env.example .env // Tạo file .env
php artisan key:generate // Tạo key trong file .env
chown -R www-data:www-data storage/*  // Cấp quyền cho folder storage
```

Tiếp theo ta sẽ cần tạo một file cấu hình bên Nginx như sau. Bạn di chuyển vào folder của Nginx. Trong đây bạn sẽ tạo một file mới với tên là `my-project` và edit nội dung file này.
```bash
cd /etc/nginx/sites-available/
sudo touch my-project
sudo vi my-project
```

Sau khi mở được `vim` lên thì bạn lại bấm `i` để có thể edit và copy nội dung sau cấu hình sau cho vào file đó:
```bash
server {
            listen 80 default_server;
            listen [::]:80 default_server;
            
            root [đường dẫn đến folder public trong project của bạn];
            
            index index.php index.html index.htm;
            try_files $uri $uri/ @rewrite;
            location @rewrite {
                rewrite ^/(.*)$ /index.php?_url=/$1;
            }
            error_log /var/log/nginx/my-project-error.log debug;
            access_log /var/log/nginx/my-project-access.log;

            location ~ \.php$ {
                fastcgi_split_path_info ^(.+?\.php)(/.*)$;
                if (!-f $document_root$fastcgi_script_name) {
                    return 404;
                }
                include fastcgi_params;
                fastcgi_pass unix:///var/run/php/php7.3-fpm.sock;
                fastcgi_index index.php;
                fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
                fastcgi_param DOCUMENT_ROOT $realpath_root;
                fastcgi_param REALPATHTEST $realpath_root;
                internal;
            }
}
```
Bạn hãy thay phần đường dẫn đến nói trên bằng đường dẫn thực tế có dạng `/home/[username]/workdir/[project-name]/public` với:
- [username] của mình là deploy
- [project-name] của mình là deploy-tutorial

Sau khi copy và edit lại đường dẫn bạn lại lần lượt bấm các phím sau để lưu lại `esc`, `:`, `w`, `q`. Tiếp theo bạn thực hiện một lệnh như sau để loại bỏ cái config trang mặc định của Nginx:
```bash
sudo rm /etc/nginx/sites-enabled/default 
```

Tiếp đến bạn gõ lệnh sau để kích hoạt file cấu hình của chúng ta:
```bash
sudo ln -f /etc/nginx/sites-available/my-project /etc/nginx/sites-enabled/
```

Sau đó bạn cần restart lại `Nginx` với lệnh `sudo service nginx restart`. Cuối cùng bạn hãy lấy IP của server này của bạn đem paste lên url trên trình duyệt web sẽ thu được kết quả như sau:

![](https://images.viblo.asia/3de2e23d-6542-4878-b039-838f89c44241.jpg)

Vậy là bước đầu chúng ta đã đưa trang web Laravel lên được máy chủ web và bạn có thể chia sẻ IP cho người khác cùng xem được trang của bạn. Tuy nhiên trên thực tế thì bạn sẽ cần thêm một cái domain để dễ nhớ và chuyên nghiệp hơn :D.

## 6. Kết bài
<hr>

Bài viết của mình đến đây là khá dài rồi nên mfinh xin kết thúc phần một tại đây. Ở phần tiếp theo, mình sẽ hướng dẫn nốt các bạn cài `MySQL 8` và các thành phần cần thiết khác cho một ứng dụng Laravel cơ bản. Hẹn gặp lại các bạn ở bài viết tiếp theo.