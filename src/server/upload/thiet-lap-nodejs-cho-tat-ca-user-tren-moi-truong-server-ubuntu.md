Hiện nay Nodejs đã quá phổ biến đối với việc phát triển web và ứng dụng. Việc cài đặt và sử dụng nó không phải việc khó khăn với các lập trình viên. Tuy nhiên, có một điểm thú vị mà tôi muốn chia sẻ với các bạn trong bài viết này liên quan đến cài đặt Nodejs thông qua NVM (**Node Version Manager**). Thông thường khi cài Nodejs thì bạn chỉ có thể cài version mới nhất, giả sử tôi đang cài Node v8.9.16 (ví dụ đây là version mới nhất của Node v8.x.x) trên server nhưng ứng dụng chỉ tương thích với v8.9.10. Chúng ta phải làm thế nào ? Cách đơn giản nhất là chúng ta dùng NMV. Để dễ theo dõi tôi sẽ giới thiệu lần lượt cách cài đặt node thông thường và thông qua NVM. Giả định rằng tôi đang làm việc trên server Ubuntu 16.04

# Cài đặt phiên bản Distro-Stable cho Ubuntu
Ubuntu 16.04 mặc định có sẵn một version Node.Js và có thể sử dụng dễ dàng, cung cấp một trải nghiệm thống nhất qua nhiều hệ thống. Tuy nhiên đây không phải là phiên bản mới nhất. Để sử dụng phiên bản ổn định mới nhất đơn giản chúng ta sẽ sử dụng các lệnh sau:
```ps
sudo apt-get update
sudo apt-get install nodejs
```

Cài đặt npm:
```ps
sudo apt-get install npm
```

Kiểm tra version Node mới cài đặt:

```ps
nodejs -v
```

# Cài đặt sử dụng một PPA

Một lựa chọn khác mà bạn có thể cài đặt các version mới hơn của Node.Js là thêm một PPA (personal package archive) được bảo trì bởi NodeSource. Ở đây ta có thể cài đặt theo nhiều version khác nhau của Node.js. Các bạn có thể theo xem thêm [ở đây](https://github.com/nodesource/distributions/blob/master/README.md#debinstall). Giả sử chúng ta cài đặt version v8.x.x

```ps
curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
```

Bạn có thể kiểm tra nội dung của file script:
```
nano nodesource_setup.sh
```
Thực hiện cài đặt:
```
sudo bash nodesource_setup.sh
```

Kiểm tra version để biết việc cài đặt thành công:

```
nodejs -v

Output
8.9.16
```

# Cài đặt sử dụng NVM
Thay vì làm việc ở cấp hệ điều hành, NVM hoạt động ở cấp độ của một thư mục độc lập. Điều này có nghĩa là bạn có thể cài đặt nhiều phiên bản Node.js độc lập mà không ảnh hưởng đến toàn bộ hệ thống.

 Kiểm soát môi trường của bạn bằng NVM cho phép truy cập các phiên bản mới nhất của Node.js, giữ lại và quản lý các bản phát hành trước đó. 

Đầu tiên, downlaod script cài đặt:

```
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.9/install.sh -o install_nvm.sh
```

Chạy cài đặt với lệnh ```bash```:

```
bash install_nvm.sh
```

Để truy cập được các chức năng của NVM ngay lập tức:

```
source ~/.profile
```

Tìm các version của Node.Js có sẵn cho việc cài đặt ta gõ lệnh sau:
```
nvm ls-remote


Output
...
 v8.5.0
         v8.6.0
         v8.7.0
         v8.8.0
         v8.8.1
         v8.9.0   (LTS: Carbon)
         v8.9.1   (LTS: Carbon)
         v8.9.2   (LTS: Carbon)
         v8.9.3   (LTS: Carbon)
->       v8.9.4   (LTS: Carbon)
        v8.10.0   (LTS: Carbon)
        v8.11.0   (LTS: Carbon)
        v8.11.1   (LTS: Carbon)
        v8.11.2   (LTS: Carbon)
        v8.11.3   (LTS: Carbon)
        v8.11.4   (LTS: Carbon)
        v8.12.0   (LTS: Carbon)
        v8.13.0   (LTS: Carbon)
        v8.14.0   (LTS: Carbon)
        v8.14.1   (LTS: Carbon)
        v8.15.0   (LTS: Carbon)
        v8.15.1   (LTS: Carbon)
        v8.16.0   (Latest LTS: Carbon)

```

Cài đặt một version mong muốn:
```
nvm install 8.9.4
```

Sử dụng version Node mới cài đặt:
```
nvm use 8.9.4
```

Kiểm tra version đang sử dụng:

```
node -v
```

Kiểm tra các version đã cài đặt trong máy:

```
nvm ls
```
Gỡ bỏ một version:
```
nvm uninstall v8.9.4
```

Các bạn có thể tìm hiểu thêm các tính năng của NVM ở [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

# Vấn đề gặp phải trên server
Như phần trình bày ở trên các bạn có thể thấy NVM rất linh hoạt và mềm dẻo trong việc quan lý version của node.js. Tuy nhiên, tôi đã từng gặp vấn đề là: cài đặt trên môi trường server Ubuntu để host một website, trong khi web chỉ định tương thích với node v8.9.4, vì vậy tôi sử dụng nvm để thực hiện điều này, nếu tôi thực hiện cài đặt ```npm install``` trên chính server thì hoạt động bình thường nhưng khi chạy deploy, trong đó có task ```npm install``` thì bị lỗi. Vấn đề là gì vậy ? Tôi đã mất khá khá thời gian để tìm kiếm, cuối cùng cũng tìm ra nguyên nhân của nó. 

NVM cài đặt Node.js bên trong thư mục home của user đang truy cập trên server. Điều này là bình thường nếu ở môi trường deveplopment, nhưng nếu bạn muốn để host ứng dụng node, có thể bạn cần deploy qua ssh, quá trình deploy này thì không tìm thấy node đã cài đặt qua NVM kia dẫn đến việc deploy lỗi. Như vậy là để giải quyết điều này ta cần làm cho Node.js sẵn có cho tất cả user. Các bạn chạy lệnh bên dưới:

```
n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local
```

Lệnh trên thực hiện copy version của node mà bạn đã active trong NVM tới thư mục ```/usr/local/``` nơi các cài đặt là global, tiếp theo thiết lập quyền cho tất cả các user có thể truy cập.

Để chắc chắn lệnh trên làm việc tốt, các bạn kiểm tra với lệnh sau:

```
sudo -s
which node
```

Nếu thấy kết quả là:

```
/usr/local/bin/node
```

Điều này có nghĩa là các bạn đã thành công.

###
Bài viết không mang nhiều kiến thức hay, tuy nhiên tôi cho rằng nó sẽ rất ý nghĩa cho những ai gặp vấn đề tương tự. Tôi cũng mất khá nhiều thời gian để tìm kiếm và giải quyết nó. Hy vọng giúp ích được điều gì đó cho các bạn. Cám ơn các bạn đã theo dõi.

# Tham khảo

- [Making Node.js Available to All Users With nvm](https://dzone.com/articles/making-nodejs-available-to-all-users-with-nvm)
- [How To Install Node.js with NVM (Node Version Manager) on a VPS](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)