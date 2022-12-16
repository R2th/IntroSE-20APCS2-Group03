Bài viết gốc: [dnlblog.com](https://www.dnlblog.com/posts/nhung-viec-can-lam-khi-deploy-mot-rails-app-su-dung-docker-va-circleci)

Khi bạn sử dụng docker cho ứng dụng của mình, việc deploy trở nên đơn giản hơn rất nhiều. Nếu bạn kết hợp với CircleCI nữa thì mọi thứ còn tuyệt vời hơn nữa. Ngày hôm nay mình sẽ nói về những công việc mà mình thường làm khi deploy một trang web. Tất nhiên là tùy thuộc vào cấu trúc và độ phức tạp của trang web mà sẽ có những đặc thù riêng, tuy nhiên với một trang web vừa và nhỏ thì những bước dưới đây theo mình là tương đối đầy đủ. Nào chúng ta hãy cùng bắt đầu nhé!

## App config

* Việc đầu tiên cần làm là set biến môi trường trong Rails:
```
RAILS_ENV=production
```
Điều này là rất quan trọng vì nếu `RAILS_ENV` không được set thì mặc định ứng dụng của bạn sẽ được chạy ở môi trường `development`, từ đó dẫn đến nguy cơ lộ thông tin khi có lỗi xảy ra.

* Nếu bạn sử dụng phiên bản Rails từ 5.2 hoặc thấp hơn thì có một biến môi trường quen thuộc nhưng cũng rất quan trọng đó là `SECRET_KEY_BASE`:
```
SECRET_KEY_BASE=very-secret-and-secure
```
Với những phiên bản Rails cao hơn, mặc định Rails sử dụng `config/credentials.yml.enc` và `config/master.key` để lưu trữ những thông tin liên quan đến môi trường và bảo mât. Các thông tin bên trong `credentials.yml.enc` được mã hóa và bạn chỉ có thể chỉnh sửa nội dung của nó thông qua `master.key`. Vì vậy, bạn phải đưa `master.key` vào `.gitignore`. Hãy chạy lệnh sau để tạo nếu như project của bạn chưa có 2 file này:
```
EDITOR=vi rails credentials:edit  
```
Bạn cũng có thể sử dụng biến môi trường `RAILS_MASTER_KEY` để thay cho `master.key` nhưng hãy chắc chắn rằng giá trị của `RAILS_MASTER_KEY` phải giống như nội dung trong `master.key`.

* Tiếp theo, nếu ứng dụng của bạn có sử dụng các tài nguyên tĩnh, bạn cần phải set biến môi trường để thông báo việc này:
```
RAILS_SERVE_STATIC_FILES=true
```
Để dễ dàng cho việc xem log trên server, bạn cần thêm biến môi trường sau:
```
RAILS_LOG_TO_STDOUT=true
```
* Một trong những file quan trọng bạn cần phải để ý tới khi deploy một ứng dụng Rails đó là config/environments/production.rb . Những việc bạn cần làm là kiểm tra log level hiện tại của môi trường là gì. Thông thường, trên môi trường production, chúng ta sẽ chỉ để level là info.

```ruby
config.log_level = :info
```

* Tiếp theo bạn cần phải chắc chắn rằng:

```
config.assets.compile = false
```
Nguyên nhân là do trên môi trường production, các assets sẽ không được compile lại với mỗi request nữa, điều này sẽ giúp cho ứng dụng của bạn chạy nhanh hơn.

## Create user deploy

Vì lý do bảo mật, bạn không nên sử dụng user `root` để deploy. Cách tốt hơn là tạo ra một user với các quyền vừa đủ để thực hiện công việc này. Dưới đây là các bước bạn cần thực hiện:

* Login vào server và thực hiện việc tạo user với quyền sudo:
```
sudo useradd -s /bin/bash -d /home/deployer -m -G root deployer
```
* Set password cho user vừa tạo:
```
sudo passwd deployer
```
* Tạo thư mục `.ssh` để có thể login vào server bằng user này thông qua ssh:
```
sudo mkdir /home/deployer/.ssh/
sudo chmod 0700 /home/deployer/.ssh/
```
* Lấy `public_key` dưới máy local:
```
cat ~/.ssh/id_rsa.pub
```
* Quay trở lại server, sử dụng `public_key` để đăng ký ssh:
```
sudo -- sh -c "echo 'your_local_public_key' > /home/deployer/.ssh/authorized_keys"
```
* Để chắc chắn chỉ có user mà bạn vừa tạo mới có quyền access vào thư mục `.ssh`, bạn cần chạy thêm lệnh:
```
sudo chown -R deployer:deployer /home/deployer/.ssh/
```
* Đến đây hãy kiểm tra lại xem mọi thứ đã hoạt động hay chưa bằng việc thử login vào server từ dưới local:
```
ssh deployer@your_host
```
## Add swap space
Nếu bạn sử dụng cloud platform, trong trường hợp là server linux thì mặc định, lúc khởi tạo một instance, server của bạn sẽ không có phân vùng swap. Hiểu đơn giản, đây giống như một bộ nhớ tạm thời, hệ điều hành sẽ sử dụng đến nó khi dung lượng sử dụng RAM đã đạt đến một giới hạn nào đó.

* Kiểm tra phân vùng swag.
```
sudo swapon --show
```
Nếu như không thấy thông tin về phân vùng nào được hiển thị thì điều này cũng có nghĩa là server của bạn chưa có phân vùng swap.

* Tạo phân vùng swap.
```
sudo fallocate -l 2G /swapfile
```
Dung lượng của phân vùng swap sẽ tùy thuộc vào dung lượng RAM của server. Thường thì nó sẽ gấp đôi dung lượng RAM nhưng cũng không nên lớn hơn 4GB.

* Kiểm tra xem bạn đã tạo thành công hay chưa.
```
ls -lh /swapfile 
```
* Set quyền cho swapfile.
```
sudo chmod 600 /swapfile
```
* Khai báo với hệ điều hành để nó sử dụng swapfile.
```
sudo mkswap /swapfile
sudo swapon /swapfile
```
Đến đây bạn đã tạo xong phân vùng swap và server của bạn có thể sử dụng nó giống như một RAM ảo. Tuy nhiên, những thay đổi này sẽ chỉ có hiệu lực trên một phiên làm việc. Để khắc phục điều này, bạn phải đưa phân vùng swap vừa tạo vào `/etc/fstab`:
```
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```
Bây giờ mỗi khi server reboot, phân vùng swap sẽ được tự động khởi tạo.

## Add Github SSH
Để có thể deploy thì trước tiên bạn cần phải pull được code về đã. Vì vậy bạn cần phải kết nối được với Github. Tất nhiên là chúng ta hoàn toàn có thể thực hiện được điều này bằng cách sử dụng email và password để login nhưng sử dụng ssh sẽ khiến mọi thứ đơn giản hơn nhiều.

* Login vào server bằng user vừa tạo ở trên.
* Di chuyển vào thư mục ~/.ssh.
```
cd ~/.ssh
```
* Generate `public_key`.
```
ssh-keygen -t rsa -b 4096 -C "your_email@gmail.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```
* Copy `public_key` vừa tạo lên Github.
```
cat id_rsa.pub
```

## Docker config
Chúng ta đang login vào server bằng user vừa tạo ở trên, do đó nếu bạn sử dụng docker để deploy, có thể bạn sẽ gặp phải một lỗi khó chịu đó là user deployer không có quyền thực thi các lệnh của docker. Để xử lý vấn đề này, bạn chỉ cần chạy lệnh sau:
```
sudo groupadd docker
sudo usermod -aG docker deployer
```
* Sau đó bạn hãy restart lại docker, login lại và kiểm tra.
```
sudo service docker restart
```
* Khi bạn muốn quản lý các containers dễ dàng hơn thì `docker-compose` sẽ là một lựa chọn. Bạn hãy chạy lệnh dưới đây để cài đặt:
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
* Sau đó là set quyền để sử dụng `docker-compose`:
```
sudo chmod +x /usr/local/bin/docker-compose
```

## Deploy
Sau khi đã chuẩn bị mọi thứ xong xuôi, bây giờ sẽ là lúc chúng ta sử dụng CircleCI để thực hiện deploy tự động. Ý tưởng của việc này là ta sẽ ssh vào server từ CircleCI và thực hiện deploy giống như khi bạn login vào server bằng user deployer. Để thực hiện được việc này, bạn cần phải có một cặp public_key và private_key. Các bước thực hiện sẽ giống như khi bạn config để ssh vào server từ dưới local của mình. Do đó public_key vẫn sẽ được lưu ở /home/deployer/.ssh/authorized_keys trên server, chỉ khác ở chỗ, với private_key bạn sẽ lưu nó trên CircleCI.

#### Local

* Dưới máy local bạn tạo ssh key bằng lệnh:
```
ssh-keygen -m pem -t rsa -C "your_email@gmail.com"
```
Trong lúc tạo, hãy nhớ đặt tên cho file ssh của bạn là circleci để tránh ghi đè vào các file ssh đã được tạo trước đó.

* Lấy nội dung `private_key` :
```
cat /home/your_name/.ssh/circleci_rsa.pub
```
* Lấy nội dung `public_key` :
```
cat /home/your_name/.ssh/circleci_rsa.pub
```
#### CircleCI
Trên CIircleCI trong phần **Project Settings / SSH Keys**, kéo xuống dưới cùng rồi sau đó chọn **Add an SSH Key**, copy `private_key` ở trên rồi sau đó lưu lại. CircleCI sẽ tạo ra một `fingerprint` tương ứng với một `pirvate_key`. Để dễ dàng cho việc thay đổi, bạn cũng nên lưu một số giá trị vào biến môi trường trên CircleCI:

* `$FINGERPRINT` : Là `fingerprint` tương ứng với `private_key` .
* `$SSH_USER`: Tên user bạn sử dụng để login vào server, trong trường hợp này là `deployer`.
* `$SSH_HOST`: Địa chỉ IP của host.

Cuối cùng, bạn thêm một job vào `.circleci/config.yml` với nội dung sau:
```yaml
deploy:
  machine: true
  steps:
    - add_ssh_keys:
        fingerprints:
          - $FINGERPRINT
    - run:
        name: Deploy over SSH
        command: ssh -o StrictHostKeyChecking=no -v $SSH_USER@$SSH_HOST "sh ./deploy.sh $CIRCLE_BRANCH"
```
Để ý đến biến `$CIRCLE_BRANCH`, đây thực ra là biến môi trường do CircleCI cung cấp, giá trị của nó chính là tên branch bạn chạy job deploy .

#### Server
* Login vào server bằng user `deployer`. Sau đó copy `public_key` mà bạn vừa lấy được ở trên vào `~/.ssh/authorized_keys` :
```
sudo -- sh -c "echo 'your_local_public_key' > /home/deployer/.ssh/authorized_keys"
```
* Tạo file `~/deploy.sh` với nội dung sau:
```
#!/bin/bash
cd your_app_repo/
git fetch --all
git reset --hard origin/$1
docker-compose stop && docker-compose build && docker-compose up -d
```
Nếu mọi thứ suôn sẻ, đến đây bạn có thể push code lên branch mà bạn muốn deploy và kiểm tra nhé.

## Bonus

Trong quá trình deploy có thể sẽ xảy ra rất nhiều vấn đề, dưới đây là một số cách khắc phục:

##### Trang web không hiển thị được ảnh:

Nguyên nhân có thể đến từ Nginx trong trường hợp bạn dùng **Cloudflare** để sử dụng https. Lúc này, hãy kiểm tra lại Nginx để xem nó đã được cấu hình với những config dưới đây hay chưa:
```
proxy_set_header X-Forwarded-Ssl on;
proxy_set_header X-Forwarded-Port $server_port;
```
##### Lỗi khi chạy bundle install:
Trong quá trình chạy bundle install có thể sẽ xảy ra lỗi với nguyên nhân đến từ việc các gem mà bạn sử dụng phụ thuộc vào các packages khác nhưng trên server chúng chưa được cài đặt. Trong trường hợp này bạn cần lên mạng search và cài đặt đầy đủ các packages cần thiết trước khi install những gem đó. Một lỗi phổ biến liên quan đến nokogiri và cách khắc phục là:
```
sudo apt-get install build-essential patch ruby-dev zlib1g-dev liblzma-dev
```
##### Liên quan đến assets:
Một lỗi thường gặp đến các tài nguyên như css, js...
```
bundle exec rails assets:clean assets:precompile
```
Trang web của bạn sẽ không thể chạy được trên production nếu như bạn quên không chạy dòng lệnh trên trước khi start server.