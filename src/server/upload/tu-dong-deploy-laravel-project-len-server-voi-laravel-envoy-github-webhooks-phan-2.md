# Đặt vấn đề
Xin chào các bạn! Mình đã quay trở lại rồi đây. [Bài trước](https://viblo.asia/p/tu-dong-deploy-laravel-project-len-server-voi-laravel-envoy-github-webhooks-phan-1-vyDZOx8Glwj) mình đã cùng các bạn đã tạo thành công công cụ giúp chúng ta triển khai laravel app lên máy chủ một cách dễ dàng nhất sử dụng **envoy**. Mỗi khi pull mới được merger vào master bạn chỉ cần chạy một câu lệnh duy nhất `envoy run deploy` là chương trình của mình bắt đầu được deploy lên server rồi. Mặc dù việc chạy một câu lệnh rất đơn giản nhưng việc lặp đi lặp lại nhiều lần sẽ khiến chúng ta tốn khá nhiều thời gian. Và bạn có thể có lúc hơi bận một chút quên không chạy lệnh deploy sau khi merge code thì mã chương trình mới không được triển khai lên server được. Một điều nữa là chỉ có máy có quyền deploy (có ssh key truy cập vào server) hoặc một người dùng có tài khoản ssh vào server thì mới chạy deploy được. Nếu như thành viên đó bận đột xuất hay công việc gì đó mà không thể thực hiện deploy ngay được sẽ dẫn đến tình trạng bị trì trệ trong quá trình triển khai lên server.

Để giảm bớt gánh nặng cho mình cũng như các thành viên trong team thì chúng ta phải nghĩ đến những phương pháp tự động. Để việc deploy tự động thì có rất nhiều cách: bạn có thể sử dụng một dịch vụ CI/CD nào đó như gitlab CI, viblo CI, CircleCI,... Nhưng hôm nay mình sẽ giới thiệu với các bạn một công cụ khác, đúng hơn là chúng ta sẽ cùng tạo một công cụ. Như tiêu đề bài viết của mình: *Tạo công cụ* Tự động deploy Laravel project lên server với Laravel Envoy Github Webhooks.

# Những điều cần biết
## Github webhook
### API
Đầu tiên chúng ta cần phải hiểu Web hook là gì? Để hiểu được khái niệm này thì bạn phải hiểu API là gì?

API nếu xét theo tên đầy đủ của nó ***Application Programming Interface*** dịch ra tiếng Việt sẽ là ***giao diện lập trình ứng dụng***. Hơi khó hiểu phải không? Đúng vậy, mình cũng không thể diễn tả chính xác định nghĩa *API là gì?* cho bạn hiểu được. Nó là một khái niệm khá rộng nhưng các bạn có thể hiểu đơn giản như thế này API là phương thức kết nối với các thư viện và ứng dụng khác.

Khi nói đến API, mình là người làm web thì mình sẽ nghĩ đến ngay web API. Một ứng dụng A sẽ gửi request đến một ứng dụng B để lấy dữ liệu trả về. Phần xử lý request và trả về dữ liệu ở bên ***ứng dụng B*** đó chính là một API. API là một phần của máy chủ từ xa có thể nhận request và gửi phản hồi. API có ý nghĩa rất rộng: web, app, các thiết bị, và ở các thư viện nữa. Đối với ứng dụng laravel khi bạn viết `$model->get()` là bạn đã sử dụng API `get` của model trong laravel rồi. Để dễ hiểu hơn hãy tưởng tượng bạn là một khách hàng vào nhà hàng và gọi đồ ăn. API sẽ như là người phục vụ. Người phục vụ sẽ mang đến cho bạn một món ăn khác nhau dựa trên yêu cầu của bạn. Bạn không biết người đầu bếp làm món ăn đó như thế nào mà bạn chỉ biết thực đơn (các món ăn có thể yêu cầu) và gọi thôi.

### Hook

Sau khi có cái nhìn chính xác về API rồi chúng ta sẽ quay lại xem Hook là gì. Hook dịch ra tiếng Việt là "móc", "cái móc", "móc nối". Có thể hiểu là thành phần gắn kết ứng dụng hiện tại với ứng dụng khác. Hook là một khái niệm ngược lại với API. Web API sẽ nhận request và trả về response. Web hook sẽ hoạt động ngược lại. Nó sẽ gửi request và nhận về response. Tức là bạn phải cung cấp một API cho Web hook. Nó sẽ gửi request với các params vào api url của bạn. Các params là gì thì sẽ do Hook quy định chứ không phải API của bạn. Bạn sẽ sử dụng các param nhận được để thực hiện công việc tiếp theo. 

Webhooks hoạt động dựa trên các sự kiện. Tức là khi trên server cung cấp webhook xảy ra một sự kiện nào đó (ví dụ trên git có sự kiện merge code chẳng hạn) thì nó sẽ gửi request đến api url mà mình cấu hình cho nó.

### Github Webhook

Cũng giống như các web hook khác Github Webhook cung cấp một cách thức để gửi thông báo đến máy chủ bên ngoài khi có một hành động nhất định xảy ra trên kho lưu trữ (repository) hoặc tổ chức (organization) của bạn. Nếu bạn đăng ký một sự kiện trên github thì khi có sự kiện đó xảy ra Git sẽ gửi một http request tới url đã được cài đặt từ trước. Sử dụng webhook thì bạn có thể làm được rất nhiều việc: (i) theo dõi các vấn đề (issue) từ bên ngoài, (ii) kích hoạt CI, (iii) thực triển khai ứng dụng lên máy chủ,...

Bài viết này mình sẽ sử dụng webhook để triển khai ứng dụng của mình lên server mỗi khi push code mà không cần thao tác gì thêm.

## Develop và debug

Như bạn đã biết bạn có thể truy cập được những API ở bên ngoài internet rất dễ dàng. Dùng trình duyệt, postman hay một công cụ gửi request nào đó là bạn có thể debug xem api đó có những gì để xử lý. Các ứng dụng từ local cũng có thể truy xuất trực tiếp các API bên ngoài mà không cần cài thêm phần mềm trợ giúp nào. Tuy nhiên web hook lại ngược lại, server cung cấp hook (ở đây là github) sẽ là thiết bị truy xuất. Nó sẽ gửi request đến url bạn cài đặt cho nó.

Nếu ứng dụng của bạn được đặt trên local thì server sẽ không thể truy xuất được vào ip máy bạn hay một tên miền nào đó bạn tự đặt cho máy của mình. Vì đơn giản hệ thống mạng bạn bạn dùng hằng ngày có sử dụng kỹ thuật NAT. Địa chỉ IP của máy bạn nhận được chỉ là địa chỉ nội bộ. Tất cả các request bạn gửi ra bên ngoài sẽ được "ủy quyền" dưới ip global của modem. Tức là máy tính của bạn có thể truy cập được ra bên ngoài internet nhưng bên ngoài không thể truy cập được tới máy bạn. Vì vậy bạn không thể cấu hình web hook url trên server là ip local của máy bạn để chạy debug được. Web hook url đó phải là link api tương ứng với Ip hoặc tên miền có thể truy cập từ ngoài internet.

Như vậy muốn debug và lập trình được ta phải sử dụng server có một ip global để code trên đó sao. Chúng ta không nên làm như vậy vì nó sẽ mất nhiều công sức để viết chương trình. Bạn có thể sử dụng một công cụ để đưa local của máy mình ra được internet ví dụ như [ngrok](https://ngrok.com/download) chẳng hạn.

Nếu bạn có một server với Ip global thì bạn có thể tạo một đường hầm (tunnel) bằng ssh để đưa môi trường local của bạn lên internet. Để làm được điều này bạn phải đảm bảo rằng máy chủ của bạn phải bật 2 tùy chọn sau trong file `/etc/ssh/sshd_config`

```
AllowTcpForwarding yes
GatewayPorts yes
```

Khi bạn thay đổi cài đặt sshd hãy nhớ restart lại service nhé
```
sudo systemctl restart sshd
```

Thiết lập đường hầm bằng câu lệnh sau:
```
ssh -f -n -N -R 8888:localhost:3000 user@1.2.3.4
```

Giải thích các thuộc tính:
- `1.2.3.4` là địa chỉ IP của máy chủ
- `user` là tên đăng nhập của người dùng vào máy chủ
- `8888` là cổng máy chủ lắng nghe
- `3000` là cổng máy của mình lắng nghe
- `-n` để ngăn đọc từ stdin (không cho sử dụng đường hầm bằng dòng lệnh)
- `-N` không cho thực hiện các lệnh từ xa mà chỉ chuyển tiếp cổng
- `-R` các kết nối vào máy chủ từ xa sẽ vào máy cục bộ của mình
- `-f` khởi chạy trong nền. Tùy chọn này cho phép câu lệnh sẽ chạy trong nền và bạn sẽ có thể thực hiện câu lệnh tiếp theo. Nếu không có tùy chọn này thì bạn sẽ nhận được một trạng thái treo của terminal khi đường hầm được tạo ra.

Sau khi chạy xong câu lệnh trên, khi bạn truy cập vào địa chỉ `1.2.3.4:8888` thì cũng giống như việc bạn truy cập vào `localhost:3000` trên máy của bạn vậy.

# Triển khai
Mình sẽ triển khai chương trình với kịch bản đơn giản như sau: 
- Người dùng push một commit lên repository trên github
- Github gọi api deploy trên server của mình
- Server khi nhận được request gửi đến sẽ xử lý request đó và thực hiện lệnh `envoy run deploy`

Để dễ dàng cho việc develop và debug mình sẽ sử dụng cách tạo đường hầm kết nối với server có IP global của mình để đưa máy mình ra ngoài internet bằng câu lệnh mình đã phân tích ở trên:
```
ssh -f -n -N -R 8888:localhost:3000 hoanghoi@1.2.3.4
```

Máy local mình sẽ tạo một server nodejs, lắng nghe ở cổng 3000. Khi truy cập vào địa chỉ `1.2.3.4:8888` tức là bạn đã truy cập vào server node js trong máy local. Đây sẽ là địa chỉ mình cung cấp cho webhook của github.

## Cấu hình hook
Cấu hình hook rất đơn giản như sau.
### Vào phần cài đặt của prioject
![](https://images.viblo.asia/ece8c7a4-e03c-4f0c-8a73-31c7a909722f.png)

### Vào phần Webhooks
![](https://images.viblo.asia/a74ca081-4c58-476c-be09-b701d1eb1976.png)

### Click vào `Add webhook`
![](https://images.viblo.asia/a38254e6-14d9-4f53-a3da-f836ffe6a68a.png)

Điền thông tin và ấn nút `Add` là xong
- `Payload URL` là link API của mình
- `Secret` là mã bí mật để mình tạo khóa `sha1` xác thực request gửi đến api của mình chính là git gửi
- Tích vào lựa chọn `Active` để hook có thể hoạt động 
- Chọn lựa chọn `Just the push event` để mỗi khi có dự kiện push code thì hook sẽ được gọi. Có rất nhiều sự kiện khác bạn có thể sử dụng chọn mục `Let me select individual events.` để lựa chọn các sự kiện mà bạn cần dùng.

## Tạo api phục vụ hook
### Tạo hàm deploy
Câu lệnh deploy của mình sẽ là `envoy run deploy`, với điều kiện câu lệnh đó phải được chạy trong thư mục có file `Envoy.blade.php` mà mình tạo ra. Như vậy để chạy câu lệnh này một cách đơn giản nhất thì file `server.js` phải được để cùng thư mục với file `Envoy.blade.php`. Bạn có thể sử dụng lệnh `pwd` để biết mình đang ở thư mục nào.

Mình  sử dụng `childProcess` để chạy lệnh bash trong nodejs. Hàm deploy sẽ được viết đơn giản như sau:
```
let childProcess = require('child_process');

function deploy() {
    childProcess.exec('envoy run deploy', function(err, stdout, stderr) {
        if (err) {
            console.error(err);
        }
        console.log(stdout);
        console.log(stderr);
    });
}
```

### Tạo API deploy
Bây giờ ta sẽ tạo một server để khi github gọi đến nó thì sẽ chạy hàm deploy.
- Tạo một server `http` để handle tất cả các request đến
- Sử dụng `crypto` để tạo mã sha1 xác thực request gửi đến đó chính là github gửi có chữ ký là dữ liệu gửi đến mã hóa cùng với `secret` mình nhập vào

```
require('dotenv').config()
const http = require('http');
const crypto = require('crypto');
const childProcess = require('child_process');
const secret = process.env.WEBHOOK_SECRET || 'secret_abc';
const port = process.env.PORT || 3000;

function deploy() {
    console.log('Processing...')
    childProcess.exec('envoy run deploy', function(err, stdout, stderr) {
        if (err) {
            console.error(err);
        }
        console.log(stdout);
        console.log(stderr);
    });
}

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        // Tạo mã sha1 từ secret và dữ liệu body nhận được
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        // So sánh mã được tạo ra và mã trong header gửi kèm. Nếu đúng thì chạy deploy
        if (req.headers['x-hub-signature'] == sig) {
            deploy();
        }
    });

    res.end();
}).listen(port, () => console.log(`App listening on port ${port}!`));
```

# Kết luận
Như vậy là chúng ta đã tạo xong một server đơn giản để thực hiện deploy khi có sự kiện push code lên github. Bạn có thể viết thêm một số chức năng nữa như ghi logs các bản build, xử lý các trường hợp push code nhiều lần mà bản build chưa chạy xong, tạo một màn hình theo dõi trên nền web hoặc là viết thêm chương trình bắt các sự kiện khác (tạo pull request, issues),...

**Ưu điểm** của việc chính server thực hiện deploy:
- Tốc độ deploy nhanh. Nếu bạn sử dụng `rocketeer` để deploy từ xa thì sẽ chậm hơn do server và máy của bạn liên tục truyền các câu lệnh và kết quả thực hiện câu lệnh với nhau. Như vậy việc deploy sẽ phụ thuộc vào tốc độ mạng của máy bạn và server. Việc tương tự cũng sẽ xảy ra khi bạn dùng với CI.
- Ít xảy ra lỗi hơn. Vì server tự triển khai mà không kết nối với máy tính nào khác nên sẽ ít xảy ra mấy lỗi vặt hơn. Ví dụ nếu dùng cách thông thường thì máy bạn có thể sẽ tự dưng mất mạng chẳng hạn thì lúc đó quá trình chạy deploy sẽ dừng lại
- Không phụ thuộc vào các yếu tố, dịch vụ bên ngoài. Ví dụ nếu bạn sử dụng máy bạn để chạy lệnh `rocketeer` deploy thì sẽ phải để máy bạn hoạt động liên tục trong lúc deploy. Khi bạn dùng dịch vụ CI bên khác thì phải phụ thuộc vào nó. Giả sử một ngày đẹp trời CI bảo trì thì bạn không thể deploy được.

**Nhược điểm**:
- Cài đặt phức tạp
- Khó theo dõi trạng thái của việc deploy (tuy nhiên bạn có thể tự viết thêm phần này)

Bài viết của mình xin kết thúc tại đây. Hi vọng sẽ giúp ích được cho các bạn. Nếu bạn thấy hay thì hãy upvote và chia sẻ cho bạn bè cùng đọc. Đừng quên Follow mình để nhận được thông báo khi mình có bài viết mới nhé. Chúc các bạn có một ngày tốt lành!
# Phụ lục các câu lệnh

### Tạo đường hầm (tunnel) 
```
ssh -f -n -N -R 8888:localhost:3000 hoanghoi@1.2.3.4
```

**Kết quả:** Truy cập vào `http://1.2.3.4:8888` ở ngoài internet sẽ giống như từ máy mình truy cập vào địa chỉ `http://localhost:3000`

### Xem các cổng đang được lắng nghe
```
sudo netstat -plnt
```

**Kết quả:** Các cổng đang có dịch vụ lắng nghe trên đó

### Hiển thị các process đang chạy
```
ps aux
```

- `a`: Hiển thị process của tất cả người dùng
- `u`: Hiển thị người sở hữu process đó, tức là user tạo process đó
- `x`: Hiển thị cả process không gắn với terminal. Tức là bao gồm những ứng dụng không chạy từ terminal. Ví dụ: `chrome` không chạy từ terminal, `httpd` không chạy từ terminal, `ssh` tạo đường hầm ở trên thì chạy từ terminal

Để lọc lấy process nào đó thì ta thêm `grep` vào.

Lấy process tạo đường hầm ở trên thì ta sẽ dùng lệnh
```
ps aux | grep ssh
```

Nhìn vào command ở cuối `ssh -f -n -N -R 8888:localhost:3000 hoanghoi@1.2.3.4` thì đó chính là process mình cần tìm.

**Chú ý:**
- PID của process là giá trị thứ 2 (sau tên người dùng) nếu bạn chạy các câu lệnh trên.

### Dừng một process đang chạy ngầm
```
sudo kill 12345
```

`12345` là id của process đó (`PID`)