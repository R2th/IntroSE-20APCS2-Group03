Hôm nay mình sẽ hướng dẫn các bạn xây dựng một server lưu trữ private các node package sử dụng **Verdaccio**

Ở các dự án thực tế, chúng ta hay gặp trường hợp phải tách code thành những module riêng để có thể tái sử dụng chúng ở nhiều nơi. Khi "micro hoá" sẽ xảy ra nhiều vấn đề phải quan tâm như versions của packages, phân quyền truy cập packages, hay vừa sử dụng chung được với các packages của npmjs...Với Verdaccio, lập trình viên sẽ tiết kiệm được nhiều thời gian để làm những công việc trên.

## I. Verdaccio là gì?
- Hiểu đơn giản, như [trang chủ Verdaccio](https://verdaccio.org/docs/what-is-verdaccio) có chú thích: 
> Verdaccio is a lightweight private npm proxy registry built in Node.js
- Được xây dựng trên NodeJs, Verdaccio là một open source có khả năng lưu trữ những packages + packages versions với database của riêng nó và cũng có thể đóng vai trò như một proxy tới những registry khác (như https://registry.npmjs.org/).

## II. Prerequisites
- Node v12 hoặc cao hơn
- Node package manager của bạn: npm, pnpm hay yarn (lưu ý không support npm@5.x)
- Version hiện tại của Verdacccio: **v5.8.0**

## III. Cài đặt Verdaccio
- Chạy câu lệnh sau để install (chạy 1 trong 3 tuỳ theo npm của bạn): 
    + Với npm: `npm install -g verdaccio`
    + Với pnpm: `pnpm install -g verdaccio`
    + Với yarn: `yarn global add verdaccio`
- Mở  terminal/cmd, kiểm tra cài đặt thành công bằng câu lệnh: `verdaccio`
     + Kết quả: ![image.png](https://images.viblo.asia/cb873a4b-f290-4272-8058-805f80225a97.png)
- Mặc định verdaccio sẽ chạy trên port: 4873, vào [http://localhost:4873](http://localhost:4873), giao diện của Verdaccio sẽ trông như thế này: 
![image.png](https://images.viblo.asia/2f55b5df-a8fe-4d94-95a9-8f9a3002f077.png)
 <div align="center">4fun: Bạn có thể donate ủng hộ Ukraine ở header nhé =))</div>
 
- Bây giờ chúng ta đã có thể push những package được rồi

## IV. Tạo 1 package sample
- Tạo folder và đặt tên là tên package: **package-sample**
- Chạy câu lệnh `npm init -y`
- Sửa package.json như bên dưới: 
![image.png](https://images.viblo.asia/6fcb862f-c5d6-4535-9804-b7b5f2723460.png)
<div align="center"> lưu ý @your-company sẽ là scope của package, mình sẽ nói trong phần sau</div>


- Tạo file index.js ở root folder
<br>
- Ở đây mình thêm 1 log ở index.js thôi nhé: 
![image.png](https://images.viblo.asia/f5a25d6a-572b-4732-afb2-cfd734af0eca.png)
- Tiếp theo chúng ta sẽ publish lên Verdaccio, trước tiên cần config registry cho package, có những cách sau:

     + Set default registry bằng command:      
           - Với npm: `npm set registry http://localhost:4873/` <br>
           - Với yarn hay pnpm bạn search google cú pháp nhé

     +  Thêm registry chỉ khi cần, `npm install --registry http://localhost:4873`

     +  Define trong file .npmrc  (mình dùng cách này trong bài):
![image.png](https://images.viblo.asia/7e438dec-21e0-425b-9939-23c339515404.png)

     + Hoặc define ở field publishConfig trong package.json: 
![image.png](https://images.viblo.asia/86876a90-8397-43f0-84c1-7f9e0795f7e2.png)

- Ở root sample-package project, chạy `npm login`, sau đó điền thông tin username, pass, email. Ở đây nếu chưa có username này thì Verdaccio sẽ tạo mới cho bạn:
![image.png](https://images.viblo.asia/4a6d1e3d-dc13-4972-994d-cd03ba119d03.png)

- Chạy câu lệnh `npm publish`, khi deploy thành công terminal sẽ log ra cho bạn biết những thông tin về package như sau:
![image.png](https://images.viblo.asia/254757c6-2f49-4376-b92a-24cb7a135c4d.png) 

- Mở lại host UI của Verdaccio và kiểm tra, chúng ta thấy package đã được upload thành công:
![image.png](https://images.viblo.asia/b49f91f5-7dea-47ab-a59d-64fadc67b0b3.png)
<div align="center">Màn hình trang chủ</div>

![image.png](https://images.viblo.asia/72ad1d8b-ad1f-4ca6-926e-2422a33a1534.png)
<div align="center">Màn hình chi tiết package</div><br><br>

## V. Cài đặt package-sample từ một project khác
- Ở một project bất kì nào đó của bạn, chạy câu lệnh: `npm install @your-company/package-sample --registry http://localhost:4873`
- Package đã được cài đặt thành công:
![image.png](https://images.viblo.asia/dd26414e-f04d-4334-a5ae-04f37d6fc328.png)
- Import vào project hiện tại và kiểm tra log: 
![image.png](https://images.viblo.asia/7ea82f91-f548-47eb-86f7-555f73d2c9db.png)

## VI. Sử dụng Verdaccio với Docker
- **Prerequisites**: Đã cài đặt docker/docker-compose
- Tạo folder service và thêm file docker-compose.yml ở root: 
![image.png](https://images.viblo.asia/85b92aa7-28d4-4050-b272-46f44b2eccc6.png)
- Ở root project, tạo folder conf và thêm file config.yaml và file htpasswd
    + Config sample: https://verdaccio.org/docs/configuration/#default-configuration
    + File htpasswd: để lưu thông tin user đã đăng kí khi login vào Verdaccio

- Run câu lệnh `docker-compose up`, docker sẽ run project trên port 4873 tạo ra folder storage ở root project. Chúng ta đã có thể publish các package lên registry. Các package được publish sẽ được lưu vào folder storage.

## VII. Thêm nữa về Verdaccio
- Config.yaml 
    + Verdaccio có thể là một proxy tới registry khác:
![image.png](https://images.viblo.asia/db9550b8-41ac-495e-888b-c363a47dcd0c.png)
    + Authenticate và Authorization, chúng ta có thể config những user nào được access/publish package. Ví dụ bên dưới, những user login bằng teamA hoặc teamB mới có quyền publish package version mới lên Verdaccio. Access $all có nghĩa là tất cả đều có thể truy cập/download package. Lưu ý thứ tự của các packages trong config, vì các package sẽ được match từ **top to bottom** 
    
![image.png](https://images.viblo.asia/22f1eec0-e073-44f1-a8ec-3ad25dce2869.png)

- Nếu bạn install một package không có trong storage mà ở npmjs.org chẳng hạn, server sẽ cố gắng fetch package về từ registry khác bạn đã thêm trong config (e.g. npmjs.org). Nếu npmjs.org không hoạt động, server sẽ tìm kiếm chúng trong cache. Một khi một package được install thành công, chúng sẽ được cache lại ở server cho những lần tiếp theo mà không cần fetch từ npmjs.org nữa.

Trên đây mình đã hướng dẫn các bạn xây dựng một server lưu trữ package với Verdaccio + Docker. Sẽ có bài viết deploy Verdaccio bằng kubernetes, mình sẽ bổ sung sau nhé ^^


### Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:

+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

<br>
Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:

+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.


Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email `khalx.se@gmail.com` của mình nha .


Cảm ơn các bạn đã đọc.