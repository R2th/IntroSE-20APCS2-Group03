Những ngày giãn cách này có vẻ chúng ta ai cũng cảm thấy khá mệt mỏi. Công việc cũng lặp đi lặp lại, vậy tại sao mọi người không thử tìm hiểu một thứ mới mẻ để học cải thiện tinh thần nhỉ. Bài viết này mình sẽ viết những kiến thức cơ bản đầu tiên để tiếp cận được với NodeJS. Chúng ta cùng bắt đầu thôi nhé.
### Node.js là gì?
Node.js là một nền tảng (không phải framework) được xây dựng, vận hành trên JavaScript engine V8 của Chrome. Node.js bao gồm mọi thứ bạn cần để thực thi chuơng trình đựoc viết bằng ngôn ngữ JavaScript.

Node.js được ra đời khi các nhà phát triển của JavaScript mở rộng ngôn ngữ này từ việc chạy trên trình duyệt (client) thành ngôn ngữ có thể chạy trên máy máy chủ (server) như một ứng dụng độc lập. Và từ đó JavaScript đã trở thành một ngôn ngữ có thể làm được những thứ mà ngôn ngữ backend như PHP, Python... có thể làm. 
Hiện tại JavaScript cũng vẫn là ngôn ngữ được ưu tiên trong việc phát triển website nhờ tính đa năng của nó. Lập trình viên FullStack Javascript cũng là từ khóa mà các nhà tuyển dụng luôn săn đón.
![image.png](https://images.viblo.asia/aca82d59-921f-421b-98c3-8d4b5a3c9504.png)
### 

# 2. Cài đặt:
### Ubuntu
- Để cài đặt mình sẽ hướng dẫn mọi người sử cài đặt Node.js có sẵn trên repo của Ubuntu, rất dễ dàng để thực hiện bằng command chúng ta chạy các lệnh sau:

Update và cài đặt package Node.js
``` bash
sudo apt-get update
```
```bash
sudo apt install nodejs
```
Khi thành công chúng ta có thể kiểm tra phiên bản Node.js đã được cài đặt: 
```bash
node -v 
hoặc
node --version
```

Thông thường chúng ta thường sẽ cài đặt Node.js cùng với Node Package Manager (npm) để quản lý các package đuợc cài đặt trong ứng dụng sử dụng Node.js. Để cài đặt npm, chúng ta sử dụng lệnh:
```bash
sudo apt install npm
```
Và kiểm tra lại :
```
npm -v
hoặc 
npm --version
```
###  Windows:  

chúng ta vào : https://nodejs.org/en/download/

![image.png](https://images.viblo.asia/640a386d-b968-44d3-bff7-3180c03ec20a.png)

Click vào phiên bản dành cho Window: node-v14.7.5-x86.msi (phiên bản ổn định nhất hiện tại).


![237465224_590734445671264_2939895201163560932_n.png](https://images.viblo.asia/8b33d11f-2297-4b13-a8a1-795da3535e95.png)

![240583678_836577167000572_9219880207078762542_n.png](https://images.viblo.asia/8a779e8a-f8e9-4b73-b9fa-c1a1fb3efaa9.png)

![236419117_1154332978391079_5526240641033560431_n.png](https://images.viblo.asia/e59c170e-8a56-4f5a-bbcb-0c4458327a30.png)

![239675294_537207204001981_2233486779077817306_n.png](https://images.viblo.asia/df1945cc-e4a3-4d9b-9cd9-b1de740c1fff.png)

![240127115_3052166738436417_8966104720160720734_n.png](https://images.viblo.asia/369a32ad-ce0c-4e64-8e25-e1f3c73db678.png)


Khi cài đặt xong chúng ta vào cmd kiểm tra lại : 
![235465162_355701659602139_4804806638287057149_n.png](https://images.viblo.asia/98e16fea-6772-4adb-9ac2-be1de20ace70.png).


# 3. Hello world: 

Với bất kỳ một ngôn ngữ, nền tảng , framework hay thư viện nào. Mình nghĩ cách tiếp cận đầu tiên của chúng ta là tạo một ứng dụng ```Hello world!``` và Node.js cũng không ngoại lệ. 

Mình sẽ tạo một thư mục demo ngay bên ngoài Desktop: 

```bash
mkdir ~/Desktop/demo
```
Trong folder này mình tạo một file app.js để viết mã nguồn vào đây :

```bash
touch ~/Desktop/demo/app.js
```

### Chạy phía server
Trong file app.js này mình sẽ in ra dòng chữ "Hello world" ra màn hình terminal: 
```js
console.log("Hello world");
```

Để chạy đoạn mã javascript này với Node.js chúng ta sử dụng lệnh:  node + file
```bash
node app.js
```
kết quả: 
![image.png](https://images.viblo.asia/057a8848-d170-46fd-9e50-1fd8e8a2ae89.png)

### Chạy và hiển thị trên client

Đấy là với cách chạy trên terminal. Vậy nếu chúng ta cần chạy và hiển thị trên trình duyệt thì chúng ta cần gì:
Chúng ta cần require thêm một package đấy là ```http``` để có thể hiển thị được trên client.  Package này đã có sẵn trong node.js vì vậy chúng ta không cần cài đặt thêm với ```npm```

```app.js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
Chạy node: 
![image.png](https://images.viblo.asia/961d8719-4cd9-484d-b696-2051c31c11e9.png)
Mở trình duyệt lên và xem thành quả :

![image.png](https://images.viblo.asia/4d76fa6d-a05a-446c-9760-68af81bcb965.png)

# 4. Kết bài
Mọi thứ phức tạp đều từ những thứ cơ bản nhất. Hy vọng bài viết thực tiễn và không nhàm chán đối với mọi người. Trong bài viết này mình đã giới thiệu tới mọi người cách cài đặt cũng như chạy những dòng lệnh đầu tiền với Node.js. Hy vọng mùa dịch này mọi người hãy ở nhà chung tay đẩy lùi dịch bệnh và học hỏi thêm những kiến thức có ích cho mình để hết dịch rồi chúng ta có thể có nền tảng tốt phục vụ cho công việc. Cảm ơn mọi người đã theo dõi bài viết. Cùng đón đọc tập tiếp theo về Node.js của mình nhé.