Chào các bạn, mình đây. Chúng ta sẽ cùng cài đặt node trên ubuntu 18. và 20. nhé

Letttt go :wink::wink:

Chúng ta có thể sử dụng package mặc định của ubuntu để cài đặt node và npm luôn, nhưng ở đây mình sẽ dùng **nvm** để quản lý các phiên bản của node. ⇒ Sẽ rất thuận tiện cho các bạn sau này

### Cài đặt NVM

Chúng ta có thể vào thằng github của nvm nhé

[https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

Trước hết chúng ta update ubuntu

```bash
sudo apt-get update

sudo apt update
```

Cài đặt **nvm**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash
```

Lưu ý: Hãy cài đặt **curl** nếu máy bạn chưa cài nhé

```bash
sudo apt-get install curl
```

Sau đó mở file `~/.bash_profile`, `~/.zshrc`, `~/.profile`, hoặc `~/.bashrc` (tương ứng với mỗi máy dùng shell nào nhé) và paste dòng sau vào trong file

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Thế là xong, chúng ta có thể kiểm tra nvm cài đặt thành công hay chưa bằng câu lệnh `nvm -v`

### Cài đặt node + yarn

Dùng nvm cài đặt node bằng câu lệnh như sau

```bash
nvm install node # "node" is an alias for the latest version
```

WOWW, xong, chúng ta kiểm tra node version thôi

```bash
node -v
```

Rất đơn giản phải hem, ngoài ra chúng ta có thể cài nhiều phiên bản khác nhau của node, và switch dễ dàng qua lại các phiên bản với nhau nhờ vào **nvm ⇒ Đây chính là điểm mà mình thấy hay nhất của nvm.**

Tiếp theo thì cài đặt yarn thôi

```bash
npm install -g yarn
```

Xong. Chúng ta cùng kiểm tra lại 1 lần nữa nhé

```bash
nvm -v
node -v
npm -v
yarn -v
```

![](https://images.viblo.asia/f5f879ea-d092-46e4-a228-58d01deb716a.png)

### Kết

- Để cài đặt node, chúng ta nên dùng 1 thằng quản lý nó như `nvm`
- 
- **Rails** - đơn giản chỉ là `1 gem của ruby`
- Cài đặt nhanh `nvm` và `node` bằng câu lệnh 

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash

nvm install node # "node" is an alias for the latest version

node -v # for check node version
```

Cảm ơn các bạn đã đón đọc, mọi góp ý hãy comment dưới cho mình biết nhé.

___

Ủng hộ mình với cách đọc bài viết gốc nha...:point_down::point_down::point_down:

https://hoangpn.com/p/cai-dat-nvm-node-yarn-tren-ubuntu-18-va-20