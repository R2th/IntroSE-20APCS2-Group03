**Hiện tại có một số thư viện có thể giúp ích cho bạn khi muốn deploy một ứng dụng app front end lên server ví dụ [pm2](https://github.com/Unitech/pm2). 
Tuy nhiên có thể bạn chưa biết thì bạn hoàn toàn thừa sức để tự build một tool đơn giản cho việc deploy code tự động lên server chỉ với vài lệnh [shell script](https://www.shellscript.sh/) cơ bản. Bài viết này của mình sẽ hướng dẫn bạn làm điều đó.**

# Những thứ bạn cần
- 1 remote server cài sẵn linux hoặc các hệ điều hành khác chạy trên linux mà bạn có thể ssh vào.
- Git repository chứ source code mà bạn sẽ deploy (cứ github cho nhanh, nếu private thì có thể chọn bitbucket).

# Setup server
Chúng ta sẽ deploy code lên server thông qua giao thức SSH, nên cần authenticate vào remote server. Cách đơn giản nhất là thông qua SSH keys.
Cá nhân mình thích giữ mọi thứ liên quan đến dự án nằm ngay trong thư mục của dự án luôn, nên mình sẽ tạo ra một SSH keys riêng cho từng project riêng lẽ.
Đầu tiên là tạo một thư mục mới trong thư mục `root` của dự án:

```shell
mkdir .deploy
```
Sau đó tạo ra một SSH key
```shell
ssh-keygen -t rsa -b 4096
```
Tại bước xác nhận nơi lưu trữ ssh key, hãy gõ địa chỉ dưới
```shell
./.deploy/id_deployer
```
Sau khi tạo xong ssh key, hãy sửa lại 1 tí permission cho nó trước khi làm những việc khác:
```shell
sudo chmod 400 ./.deploy/id_deployer
```
Vậy là đã tạo xong SSH keys cho phía client.

Bước tiếp theo là thêm SSH keys đã tạo vào file `authorized_keys` trên server remote.
Để làm điều này, đơn giản là login vào remote server qua SSH, sau đó mở file ở đường dẫn sau
```shell
vi .ssh/authorized_keys
```
Copy toàn bộ nội dung của file `.deploy/id_deployer.pub` vào file `authorized_keys` nói trên rồi lưu lại.

Hãy thử check lại xem mọi thứ đã hoạt động như mong muốn chưa bằng cách ssh vào server với SSH keys vừa tạo
```shell
ssh -i ./.deploy/id_deployer youruser@yourhost
```
Nếu kết nối được thiết lập tức là bạn đã làm đúng.

# Setup git repository
Bạn cần add SSH keys của server vào github để server có quyền pull code từ github về trong quá trình deploy.

Trước tiên cần tạo một SSH keys ở server, cách làm về cơ bản hoàn toàn giống với cách làm phía local đã hướng dẫn ở trên. Sau khi tạo thành công SSH keys, nhớ copy nội dung keys lại.

> Một số trường hợp sau khi SSH vào server sẽ sử dụng tài khoản `root`. Sẽ không phải là một ý hay nếu sử dụng tài khoản root để tạo SSH keys cho việc deploy, vì sẽ dính tới 1 số vấn đề liên quan đến bảo mật, nên đừng quên tạo 1 tài khoản riêng chỉ dành cho việc deploy, và tạo ssh keys deploy trên tài khoản đó.


Vào github của dự án, nhấn tab Settings, sau đó chọn `deploy keys` từ menu bên phải. Hoặc truy cập link bên dưới (nhớ thay link github dự án của bạn)

[https://github.com/<your_account>/<ypur_project>/settings/keys](https://github.com/<your_account>/<ypur_project>/settings/keys)

![](https://images.viblo.asia/668b1da4-b9ed-4b54-b69f-c38c1a88662a.png)

Sau đó nhấn `Add deploy key` và paste keys của server vào đó, sau đó nhấn `Add key`.

Để xác nhận đã thêm SSH keys thành công, bạn có thể thử clone source từ github về server
```shell
git clone git@github.com:you/my-awesome-app.git
```
Nếu mọi thứ OK thì bạn đã sẵn sàng cho bước tiếp theo!

# Viết script deploy tự động
Thêm file `deploy.sh` vào thư mục `root` của dự án, với nội dung như bên dưới
```shell
#!/bin/bash
GREEN='\033[0;32m'
NC='\033[0m'
echo "${GREEN}============ Starting deployment ============${NC}"
SSH_USERNAME="deploy" # Replace your deploy account here
SSH_HOST="192.168.0.11" # Replace your server IP here
SSH_KEY="./.deploy/id_deployer"

DEPLOY_PATH="~/my-awesome-app/"
DEPLOY_MODE="development"
DEPLOY_BRANCH="develop"
START=`date +%s`

# -- Login to server via ssh --
ssh -i ${SSH_KEY} ${SSH_USERNAME}@${SSH_HOST} "
  cd ${DEPLOY_PATH};
  echo '➜ Clone source';
  git reset --hard HEAD;
  git checkout ${DEPLOY_BRANCH};
  git pull origin ${DEPLOY_BRANCH};
  echo '➜ Install dependencies';
  yarn install;
  echo '➜ Build files';
  rm -Rf ./dist;
  yarn run build --mode ${DEPLOY_MODE};
  echo '➜ Build done';
";
END=`date +%s`
RUNTIME=$((end - start))
echo "\n${GREEN}✔ 🎉  Deployed successfully.${NC}\n"
```
Nhìn vào đoạn script trên chắc ai cũng hiểu rồi, tuy nhiên mình cũng xin nói lại tí cho chắc:
> `SSH_USERNAME` username dùng để ssh vào server
> 
> `SSH_HOST` IP của server
> 
> `SSH_KEY` đường dẫn đến file SSH đã được add vào server
> 
> `DEPLOY_PATH` Thư mục chứa code sau khi deploy
> 
> `DEPLOY_MODE` build mode có thể là `production` hay `development` gì đấy tùy bạn
> 
> `DEPLOY_BRANCH` chọn nhánh cần deploy.

#### Làm thế nào để sử dụng?

Đơn giản thôi, chạy lệnh `sh` sau đó ngồi rung đùi thôi!

```shell
sh deploy.sh
```

Đừng quên thêm update file `.gitignore` của dự án để không public file SSH keys lung tung ra bên ngoài.
```
.deploy/*
```

# Todo
Còn điều gì cần làm nữa không? Còn!

Trên thực tế mình cần deploy lên nhiều con server khác nhau hoặc cùng 1 server nhưng nhiều cổng khác nhau hoặc deploy từ code của các nhánh khác nhau.

Đoạn code trên hoàn toàn có thể sửa lại 1 chút để linh động trong trường hợp đó. Ví dụ:

```shell
sh deploy # => deploy lên môi trường development
sh deploy stg # => deploy lên môi trường staging
```
Hoặc bạn có thể làm gì tùy thích, chỉ cần đọc sơ qua chút về [lập trình shell](https://www.shellscript.sh/)  thì ai cũng có thể làm được.

Nhưng đó là việc của bạn, mình chỉ chia sẻ ở mức cơ bản, đến đấy thôi :smile:

#### - Hết!-