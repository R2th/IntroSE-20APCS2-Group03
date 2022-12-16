Đối với một developer mà nói, mục đích cuối cùng của chúng ta khi phát triển một sản phẩm là có thể đưa sản phẩm ấy đến được với người dùng, và deploy là bước cuối cùng mà chúng ta cần thực hiện. Trong bài viết hôm nay, mình sẽ cùng các bạn tập tành deploy một ứng dụng Django lên Server nhé. Let's do it! 
# 1. Chuẩn bị
Trong bài viết này, chúng ta sẽ cùng nhau deploy sản phẩm của mình lên một `VPS` chứ không phải một `Shared Hosting` nên chúng ta sẽ phải tự tay cài đặt tất cả những gì mà ứng dụng của chúng ta cần trên Server này. <br>
Việc tự tay cài đặt giúp cho chúng ta có thêm kiến thức về deploy cũng như các thao tác làm việc với server. <br>
Vì vậy, trước khi bắt đầu chúng ta sẽ cần chuẩn bị một số thứ như sau:
- Một project Django.
- Một tài khoản Github để lưu trữ source code.
- Một "chiếc" VPS (Có thể sử dụng các platforms cung cấp dịch vụ VPS như: [AWS](https://aws.amazon.com/vi/), [Azure](https://azure.microsoft.com/en-us/), [Digital Ocean](https://www.digitalocean.com/), ...) và để tạo được tài khoản trên các platforms này thì bạn cần phải có thẻ Visa, hoặc thẻ Debit). 
 Đối với Azure, chỉ cần bạn có tài khoản mail `.edu` sẽ được free 12 tháng sử dụng, nên mình sẽ dùng Azure cho bài này.

# 2. Tạo VPS
Đầu tiên, các bạn truy cập vào https://portal.azure.com/#home để có thể thấy được các dịch vụ mà `Azure` cung cấp.

Ở phần giao diện `Home`, chúng ta lần lượt chọn các options như sau để có thể tạo được một `VPS`:

- Trong `Azure services` chúng ta chọn `Virtual Machines`.
![](https://images.viblo.asia/b3c5e6d8-c84a-4906-a898-743c89952114.png)

- Tiếp tục chọn `Create` và `Virtual Machine`
![](https://images.viblo.asia/b5a19935-d0ae-4d8d-a567-e7a011b1c21f.png)

- Khi này, màn hình tạo `Virtual Machine` sẽ xuất hiện: 
![](https://images.viblo.asia/7e1721c0-c53d-4ba8-8157-30276aad26e2.png)

Ở đây các phần như `name` thì các bạn có thể đặt tự do nhé (vì chúng ta đang tập tành mà :D ), còn các phần còn lại các bạn chọn giống mình.
- Các bạn bấm vào `Review + create`, và cuối cùng chọn `Create` nha. Khi này sẽ có một cửa sổ hiện lên để chúng ta download `private key` nhằm cho việc truy cập đến `VPS` này nha.
![](https://images.viblo.asia/43364437-d635-4005-998e-b13b6f369d58.png)

- Đợi một lúc, nó sẽ tự redirect chúng ta đến khi thấy được trang này tức là quá trình tạo một `VPS` của chúng ta đã thành công rồi đó.
![](https://images.viblo.asia/e7505c8e-d7f1-438e-8328-61a35a8276f3.png)

- Để kiểm tra thông tin về `virtual machine` của chúng ta, chọn `Go to resource`.
![](https://images.viblo.asia/71a23cbf-a0ec-4719-9266-24d291e7fed3.png)

Thông tin của `virtual machine` nằm trong phần mình đã khoanh đỏ, các bạn chú ý đển `Operating System` chính là hệ điều hành mà chúng ta sử dụng cho VPS này. Và `Public IP address` chính là địa chỉ public để chúng ta truy cập trực tiếp từ browser.
# 3. Connect tới VPS
## 3.1. Connect tới VPS bằng user `root`
- Để xem hướng dẫn connect tới VPS, chúng ta chọn lần lượt `Connect` và `SSH`
![](https://images.viblo.asia/57adbd0c-8880-48c2-b8bf-194041be7569.png)

- Khi đó chúng ta sẽ thấy được tất cả hướng dẫn để truy cập vào `VPS` qua `private_key`.
![](https://images.viblo.asia/512c5c98-8a32-4665-b3be-2acf889ac26b.png)

Note:
- Ở bước 2, chúng ta phải đảm bảo chỉ cấp quyền 400 (read-only) đối với file `.pem` mà chúng ta vừa download ở bước #2.4
- Trong bước 3, chúng ta nhập đường dẫn đến thư mục chứa file `.pem` ở trên.
- Cuối cùng, chúng ta copy command ở bước 4 về và paste chúng vào terminal nha.
![](https://images.viblo.asia/0d3d12bb-e1a6-40ef-aba7-1ac49eb8609e.png)

Như vậy là chúng ta đã thành công connect đến `VPS`. 

**Mặc định khi kết nối vào VPS, user sẽ là `root (azureuser)`, nếu chúng ta không tạo một user mới để deploy, trong trường hợp bị lost file chứa ssh-key, hoặc thay đổi ssh-key thì sẽ không thể nào kết nối lại được vào server ubuntu nữa.**

**Phải generate ssh-key cho user này để có thể truy cập trực tiếp đến user từ máy local hoặc từ bất kỳ máy nào mà nó ủy quyền thông qua ssh-key đó.**

## 3.2. Connect tới VPS bằng user `deploy`
- Ở đây mình đang đứng ở vai trò user `root` nên mình sẽ tạo một user nữa là `deploy`:
![](https://images.viblo.asia/64c1fb48-49bf-4c86-b1be-2c86a624aa0e.png)

- Tiếp theo, switch sang user `deploy` mới tạo:<br>
![](https://images.viblo.asia/e57f26b0-2db5-4631-97a5-e7cbe2ade653.png)

Giờ đây, bạn đã có thể cho phép bất kì ai truy cập vào server với account user `deploy`, còn user `root (azureuser)` thì chỉ có mình bạn mới có thể truy cập được. <br>

Cấp quyền truy cập vào `user deploy` từ máy tính local:
- Sinh SSH key ở local:
```python
# Local
$ cd ~/.ssh/
$ ssh-keygen -t rsa
```
- Lấy `public key` của local đặt vào server, tương ứng cho user deploy (file public key sẽ nằm trong folder`~/.ssh/` và có đuôi file `.pub`)
```python
# User root
$ su deploy
$ cd
$ mkdir .ssh
$ nano ~/.ssh/authorized_keys
```

- Cuối cùng, chúng ta đã hoàn toàn có thể connect tới VPS thông qua user `deploy`.
![](https://images.viblo.asia/c0507fd3-50e1-4669-9fb2-6622f24c8306.png)

Tuy nhiên, hiện tại thì user `deploy` này chưa thể chạy với quyền `sudo`:
![](https://images.viblo.asia/7eaa886a-a6f1-4f6a-8348-fe824d1ccd50.png)

nên chúng ta phải cấp quyền `sudo` cho nó:
```python
# User root
$ sudo nano /etc/sudoers
$ sudo usermod -a -G sudo deploy
```
# 4. Cài đặt môi trường
## 4.1. Cài đặt Nginx
Chúng ta có thể cài đặt `nginx` cho VPS bằng lệnh `sudo`:
```
$ sudo apt update
$ sudo apt install nginx
```
Sau đó, chúng ta kiểm tra status của `nginx server`:
```
$ sudo service nginx status
```
![](https://images.viblo.asia/c611d84c-aad2-4b1c-9aca-d607f44d10fd.png)

Tiếp theo, chúng ta cần bật `firewall` để tăng tính an toàn cho server bằng cách:
```
$ sudo ufw enable
```
Sau đó, bọn chọn `Y` để firewall được bật lên. Tiếp đến, cần cho phép kết nối từ bên ngoài đến `Apache` bằng việc thực hiện command:
```
$ sudo ufw allow 'Nginx HTTP'
$ sudo ufw allow 22 // bạn hãy nhớ gõ lệnh này vì nếu không bạn sẽ không thể ssh vào server nữa vì firewall sẽ block port 22
```
Cuối cùng, gõ lệnh `sudo ufw status` để xem kết quả:

![](https://images.viblo.asia/01376d8e-125a-4f68-8f16-aed44fb0eab4.png)

Khi này, chúng ta đã có thể connect tới VPS bằng cách truy cập IP trên browser:
![](https://images.viblo.asia/d6e0fd76-c0ee-47d1-a04c-0a8b73be4e15.png)

## 4.2. Cài đặt python3.7
Cài đặt `python3.8`  trên `Ubuntu` với `apt` tương đối đơn giản, bạn chỉ cần mất vài phút:
- Chạy các command dưới đây dưới `root` hoặc quyền sudo để update các package và cài đặt các điều kiện tiên quyết:
```
$ sudo apt update
$ sudo apt install software-properties-common
```
- Thêm deadsnakes PPA vào source của hệ thống:
```
$ sudo add-apt-repository ppa:deadsnakes/ppa
```
Nhấn `enter` để tiếp tục:
```python
Output
Press [ENTER] to continue or Ctrl-c to cancel adding it.
```
- Khi kho lưu trữ được kích hoạt, cài đặt `python3.7` với:
```
$ sudo apt install python3.7
```
- Kiểm tra lại bằng cách
```python
$ python --version
```
```python
Output
Python 3.7.10 
```
## 4.3. Cài đặt pip
```python
$ wget https://bootstrap.pypa.io/get-pip.py
$ sudo python3.7 get-pip.py
```
Và kiểm tra lại đã cài đặt thành công chưa nhé:
```python
$ pip --version
```
```python
Output
pip 21.1.2 from /usr/local/lib/python3.7/dist-packages/pip (python 3.7)
```

## 4.4. Cài đặt Git
Do ở trên bước **4.2** chúng ta đã update các package rồi, nên chúng ta sẽ cài đặt `Git` luôn:
```python
$ sudo apt install git
```
Và kiểm tra lại:
```python
git --version
```
```python
Output
git version 2.17.1
```

# 5. Điều chỉnh cấu hình
## 5.1. Clone project Django
Để chạy được project Django thì chúng ta sẽ phải clone cái repo chứa project đó về server của chúng ta. Để tránh việc mỗi lần clone hoặc pull code mới ta phải nhập lại username và password cho GitHub thì mình sẽ add một cái ssh-key mới vào GitHub. Đầu tiên ta sẽ tạo mới ssh-key của server giống như cách làm ở trên nhưng lần này ta làm trên server
```
$ ssh-keygen -t rsa
```
Tiếp đó, nhập vào đường dẫn lưu trữ sẽ là /home/[username]/.ssh/[name-ssh-key]. Với [username] và [name-ssh-key] là username và tên của ssh key mà bạn đặt, sau đó bấm enter liên tiếp (Chú ý không nhập password cho key). Sau khi đã tạo key thành công thì sẽ gõ lệnh sau để lấy được public key vừa tạo:
```
$ cat /home/[username]/.ssh/[name-ssh-key].pub
```
Lệnh trên sẽ in ra toàn bộ public key ra cửa sổ terminal, bạn chỉ cần copy nó lại. Tiếp theo truy cập vào repo trên GitHub và chọn mục Settings. Ở cột bên trái của tab `Settings`, chọn `Deploy keys`. Trong mục này, tiếp tục chọn `Add deploy key` và nhập lần lượt tên mà bạn muốn đặt cho key này và `public key` vừa copy ở bên server bỏ vào đây và chọn `Add key` để hoàn tất quá trình này
![](https://images.viblo.asia/492fb39b-e96c-4ddf-a2fe-ad0416ae3f1e.png)
![](https://images.viblo.asia/5dc843df-7419-4bb3-b760-7128b5f40f9f.png)

Và quay trở lại repo và copy link download dưới dạng `SSH`
```python
$ git clone git@github.com:nguyenhuuhai98/deploy_django.git
```
Sau khi clone project về, chúng ta cũng cần cài đặt thêm `virtualenv` , `django` và `gunicorn`
```
$ sudo apt install virtualenv
$ python3.7 -m virtualenv .venv
$ source .venv/bin/activate
$ pip install django gunicorn
```
Sau đó chúng ta cần phải sửa lại một chút ở file `settings.py` như sau nhé:
```python
# settings.py
...
ALLOWED_HOSTS = ['your_public_ip']
...
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static/')
...
```
## 5.2. Tạo ổ đĩa cho Gunicorn
- Đầu tiên chúng ta sẽ tạo một file `socket systemd` cho Gunicorn nhé:
```python
$ sudo nano /etc/systemd/system/gunicorn.socket
```
Và paste nội dung sau vào file:
```
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
```
- Tiếp theo, chúng ta tạo service systemd cho Gunicorn
```python
$ sudo nano /etc/systemd/system/gunicorn.service
```
Và cũng paste nội dung sau vào file:
```
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target

[Service]
User=deploy
Group=www-data
WorkingDirectory=/home/deploy/deploy_django
ExecStart=/home/deploy/deploy_django/.venv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          deploy_django.wsgi:application

[Install]
WantedBy=multi-user.target
```
- Sau khi đã hoàn tất 2 file `.socket` và `.service` ở trên, chúng ta sẽ kích hoạt `Socket Gunicorn`:
```
$ sudo systemctl start gunicorn.socket
$ sudo systemctl enable gunicorn.socket
```
## 5.3. Cấu hình Nginx
- Chúng ta sẽ tạo và mở một config mới trong Nginx
```
$ sudo nano /etc/nginx/sites-available/deploy_django
```
và sau đó paste nội dung file:
```
server {
    listen 80;
    server_name 40.76.24.197;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/deploy/deploy_django;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    } 
}
```
- TIếp theo, chúng ta cần loại bỏ config trang mặc định của Nginx và thay vào đó chính là config để chạy app của chúng ta:
```
$ sudo rm /etc/nginx/sites-enabled/default
$ sudo ln -f /etc/nginx/sites-available/deploy_django /etc/nginx/sites-enabled/
```
Và cuối cùng, chúng ta sẽ restart Nginx và nghiệm thu kết quả nhé:
```
$ sudo systemctl restart nginx
```
![](https://images.viblo.asia/4c92d83b-5132-435c-b94f-ed215f05f72c.png)

## Lời kết
Bài viết của mình chỉ đến đây thôi, các bạn đọc đến đây chứng tỏ rất kiên trì đấy =)) Vì để thao tác được bài này và setup ngon lành thì kiến thức của các bạn cũng không phải dạng vừa đâu =)) 

Alright, bật mí thêm cho các bạn về content sắp tới của mình nha: Đợt này mình đang làm một series về CI/CD các thứ và bài sau sẽ là 1 bài về Auto deploy với Circle CI. Các bạn hãy đón đọc nha <3