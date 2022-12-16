Chúng ta hẳn cũng không xa lạ gì với firebase hosting hay github action nhưng nền tảng giúp chúng ta deploy nhưng web single page . Vậy trong thế giới blockchain có nhưng dịch vụ như vậy không. Qua bài viết này mình sẽ giới thiệu về Siasky và Namebase những công cụ để deploy vô cùng thú vị.

![](https://images.viblo.asia/fdd3e8cf-a563-4f9d-a3e3-6f80e40feb27.png)
![](https://images.viblo.asia/8f619441-21c0-4856-8a8a-1eedaabd4fb2.png)

# Sia ( Decentralized storage )
Sia là cloud storage platform phi tập trung được bảo mật bằng công nghệ blockchain, nền tảng này không cần signups, không cần servers , không cần những trusted third parties. Sia network tận dụng dung lượng ổ cứng chưa được sử dụng trên khắp thế giới để tạo ra data storage marketplace đáng tin cậy hơn và chi phí thấp hơn so với các nhà cung cấp dịch vụ lưu trữ đám mây truyền thống. Sia có chạy một chain riêng và phát hành Siacoin. Có một vài thuật ngữ cần nắm rõ khi bắt đầu.

* **Node** : Là máy cài đặt Sia tương tự như khái niệm Node trong các mạng blockchain khác .
* **Renter** : Là người upload file lên network .
* **Host** : Là người cho "mượn" storage space của họ để những người khác có thể tải file của họ lên network.
* **Contracts** : Được hình thành giữa Renter và host, contracts này xác định lượng dữ liệu đang được lưu trữ, trong bao lâu và ở mức giá nào. Chúng được software và blockchain tự động tracked.
* **Siacoins** : Là đơn vị tiền trong mạng đóng vai trò như năng lượng để chạy cả network.

Khi một file được tải lên Sia, file đó sẽ được chia nhỏ, mã hóa và gửi đi khắp nơi trên thế giới. Render tải tệp lên, Host lưu trữ các file đó và mọi thứ đều được tự động hóa.Ngoài ra khi bạn tải file của mình lên, network sẽ đảm bảo rằng bạn luôn có thể truy cập chúng bằng cách sao chép chính các file đó nhiều lần. Và bạn cũng yên tâm rằng data của mình ko bị thó mất vì đối với host chỉ nhận các file đã được mã hóa để lưu trữ thôi.

Mục tiêu cốt lõi của Sia là mang lại sự phân quyền cho việc lưu trữ dữ liệu nghĩa là sia muốn bạn có thể lưu trữ dữ liệu của mình với  toàn quyền kiểm soát, đảm bảo rằng data của bạn được bảo vệ khỏi việc trộm cắp, kiểm duyệt và bạn không bao giờ bị hacker, miners, developer hoặc các cơ quan chính phủ chặn truy cập vào dữ liệu của bạn.

Skynet là layer 2 được xây trên Sia. Nó là CDN ( Content Delivery Network ) phi tập trung và còn tốt hơn vì nó có thể chia sẻ cả directory nữa. Ngay trên [trang chủ](https://siasky.net/) của Skynet bạn đã có thể test được dịch vụ này rồi .

![](https://images.viblo.asia/31326833-7981-4ecc-9783-4934e5432bf8.png)
 Chỉ cần kéo thả file hoặc directory vào sau đó skynet sẽ trả về cho bạn 1 đường link .Skynet tạo ra một đường link 46Byte được gọi là **Skylink** . Link này có thể chia sẻ cho bất cứ ai để họ có thể xem chúng .
 ![](https://images.viblo.asia/b68303f4-92f2-47c1-aae7-3cb6f0051e5e.png)

Skynet cung cấp thư viện chạy trên Nodejs, Python, Go rất tiện lợi. Mình sẽ thử demo một vài tính năng dựa vào [docs](https://nebulouslabs.github.io/skynet-docs/?javascript) của họ , sử dụng Nodejs . 

**Lưu ý : Skynet cho chúng ta deploy free với dung lượng < 1GB**

## Upload file
```js
const skynet = require('@nebulous/skynet');

(async () => {
    const skylink = await skynet.uploadFile("./image.jpg");
    console.log(`Upload successful, skylink: ${skylink}`);
})();
```
VIệc deploy này đc thực hiện thông qua sia node mà bạn cài đặt hoặc thông qua Skynet portal có sẵn mà bên phát triển duy trì . Ở ví dụ trên deploy một file bằng đường dẫn gián tiếp tới nó. Sau khi deploy xong nó sẽ trả về skylink và bạn có thể truy cập bằng link :
```js
https://siasky.net/<SKYLINK>/
```
Hoặc có thể download file đấy về bằng
```js
const skynet = require('@nebulous/skynet');

const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";

(async () => {
    await skynet.downloadFile("./dst.jpg", skylink);
    console.log('Download successful');
})();
```
## Upload Directory
Việc upload được cả một directory là vô cùng tiện lợi ví dụ chúng ta có một folder ảnh gồm 100 200 ảnh gồm các ảnh 1.png 2.png 3.png ... thì khi xem trên web chúng ta có thể xem bằng cách thêm tên file ảnh vào cuối skylink.
```js
const skynet = require('@nebulous/skynet');

(async () => {
    const url = await skynet.uploadDirectory("./images");
    console.log(`Upload successful, url: ${url}`);
})();
```
Tương tự như upload file up load directory cũng trả về skylink và chúng ta xem từng ảnh trên mạng bằng cách sử dụng url sau.
```js
https://siasky.net/<SKYLINK>/1.png
https://siasky.net/<SKYLINK>/2.png
...
```
Việc download cũng tương tự như download file
## Upload with Encryption 
Đây là tính năng khá hay khác mà skynet cung cấp, đó là kèm một lớp mã hóa và file tải lên nữa . Bằng cách thêm một tùy chọn là **skykeyName** là một đoạn string vai trò như password vào upload file.
```js
const skynet = require('@nebulous/skynet');

(async () => {
    const skylink = await skynet.uploadFile(
        "./image.jpg",
        { skykeyName: "my-skykey" }
    );
    console.log(`Upload successful, skylink: ${skylink}');
})();
```
Việc download vì thế cũng phải thêm phần skykeyName
```js
const skynet = require('@nebulous/skynet');

const skylink = "XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg";

(async () => {
    await skynet.downloadFile(
        "./dst.jpg",
        skylink,
        { skykeyName: "my-skykey" }
    );
    console.log('Download successful');
})();
```
Đến đây ta có thể thấy rằng skynet là một trang deploy frontend vô cùng tuyệt vời nó free này, không cần đăng ký ,... Tuy nhiên một điểm trừ đó là skylink là một chuỗi 46 bytes vô cùng khó nhớ vì thế để thuận tiện hơn thì giải pháp đó là kết hợp với **Handshake**

# Handshake 
Handshake về cơ bản không khác gì so với Bitcoin cũng sử dụng Proof of work nhưng khác ở chỗ tên của đồng phát hành là HNS và ngoài ra có thể dụng để mua domain .Tên miền trên Handshake là Top level domain names (.com, .net, .org) viết tắt là TLD

![](https://images.viblo.asia/cc5d90c1-49b5-43cb-b0f0-3a44bc496374.png)


Nhưng không giống như các tên miền truyền thống mà bạn chỉ có thể thuê, bạn thực sự sở hữu tên miền trên handshake sẽ sở hữu nó mãi mãi, không ai có thể lấy đi của bạn cũng như ngăn cản người khác truy cập vào nó đc . Và thay vì bị giới hạn một số ít tên như .com hay .org thì giờ đây có thể mở rộng hơn nhiều như có thể thay bằng cấc ký tự hán học , chữ nga hay thậm trí cả biểu tượng emojis nữa .

## HNS

HNS là  digital currency hay phổ thông hơn là coin của Handshake mà bạn sử dụng để mua miền trên Handshake và để trả phí cho miner, những người thêm giao dịch của bạn vào chain. 

## Namebase
Tóm tắt cực mạnh thì NameBase là trang web với giao diện khá đẹp cho phép bạn mua bán tên miền trên đó bằng HNS . Ngoài ra nó còn có một sàn giao dịch HNS vs Bitcoin, ví và trang quản lý domain mà mình đã mua.

# Skylink + Namebase
Để giải quyết vấn đề skylink quá khó nhớ chúng ta sẽ mapping nó vào namebase . Có 2 cách đó là dùng giao diện và dùng code .
##  Giao diện
Đầu tiên vào [trang chủ của namebase](https://www.namebase.io/) login bằng github mua domain ( không free :'( ) sau đó vào tab **Dashboard**  sau đó vào **Domain Manager** chọn **Manage** domain mà mình muốn setup .
![](https://images.viblo.asia/25f48011-0b30-47a4-8cb6-f870654be65c.png)
Sau đó điền và phần **Blockchain DNS records** có thể mapping **public IP** của server của bạn hoặc skylink như hình bên dưới .
![](https://images.viblo.asia/369e87c3-7bf8-4f64-bbb9-b567b88db713.png)
Sau khi save xong phải đợi một lúc để transaction của mình được mine vào blockchain và sau khi hoàn thành thay vì vào bằng skylink dài loằng ngoằng thì có thể thay bằng
```
https://siasky.net/hns/YOUR_DOMAIN_NAME/
```
## Dùng code
Đầu tiên phải vào https://www.namebase.io/pro/keys để tạo api key vào từ đó lấy được **ACCESS_KEY** và **SECRET_KEY**. Để test chúng ta tạo file **namebaseApi.js**
```js
const fetch = require('node-fetch');

 const ACCESS_KEY = '';
 const SECRET_KEY = '';

 const credentials = Buffer.from(`${ACCESS_KEY}:${SECRET_KEY}`);
 const encodedCredentials = credentials.toString('base64');
 const authorization = `Basic ${encodedCredentials}`;

 async function get(endpoint, body = null) {
   const options = {
     method: 'GET',
     headers: {
       Authorization: authorization,
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
   };
   const url = `https://namebase.io${endpoint}`;
   return fetch(url, options)
     .then(res => res.json())
     .catch(err => err);
 }

 async function put(endpoint, body) {
   const options = {
     method: 'PUT',
      body: body,
     headers: {
       Authorization: authorization,
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
   };
   const url = `https://namebase.io${endpoint}`;
   return fetch(url, options)
     .then(res => res.json())
     .catch(err => err);
 }

 async function main() {
   const args = process.argv.slice(2);

   let func, path, data;

   const domain = args[2];

   if (args[0] === 'get') {
     func = get;
   } else if (args[0] === 'put') {
     func = put;

     if (args.length < 4) throw new Error('Put requires 4 arguments');

     data = args[3];
   } else {
     throw new Error("Method should be either 'get' or 'put'");
   }

   if (args[1] === 'blockchain') {
     path = `/api/v0/dns/domains/${domain}`;
   } else if (args[1] === 'blockchain-advanced') {
     path = `/api/v0/dns/domains/${domain}/advanced`;
   } else if (args[1] === 'nameserver') {
     path = `/api/v0/dns/domains/${domain}/nameserver`;
   } else {
     throw new Error("Service should be 'blockchain', 'blockchain-advanced' or 'nameserver'");
   }

   return func(path, data);
 }

 main().then(res => {
   console.log(res);
 });
```
GIờ chạy lệnh để add skylink nào 
```js
node namebaseApi.js blockchain YOUR_DOMAIN "{ "records": [{ "type": "TXT", "host": "", "value": "skylink=YOUR_SKYLINK", "ttl": 0 }] }"
```
## Cách vào domain của mình 
Để chaỵ được các domain mình đã mua thì phải config server DNS thì mới mapping được chỉ tốn một vài phút setup thôi ![](https://images.viblo.asia/f9a3dfed-6f9e-4836-a752-91bca611e60d.png)
Sau khi config như trong hình là chúng ta có thể vào được rồi .
# Reference
* https://learn.namebase.io/
* https://blog.sia.tech/skynet-handshake-d5d16e6b632f
* https://nebulouslabs.github.io/skynet-docs/?javascript#introduction