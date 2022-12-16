# Mở đầu
Bạn nghĩ sao về việc có 1 blog các nhân cho riêng mình. Vừa là nơi chia sẻ kiến thức của bản thân đồng thời cũng là 1 kênh để PR cho bản thân. Nhưng bạn lại không muốn mất quá nhiều thời gian để build lại blog từ đầu rồi là chọn công nghệ backend dùng gì fronend dùng gì. Rồi phải bỏ 1 số tiền cũng kha khá để thuê hosting với tên miền. Chưa kể đến là bạn không phải dân dev web thì sao?

Với hexo và github pages sẽ giải quyết các vấn đề trên giúp bạn !
# Hexo là gì
**Hexo** là một blog framework mạnh mẽ, nó tạo static web một cách đơn giản và nhanh chóng hoàn toàn bằng NodeJS. Bạn có thể viết bài bằng Markdown hoặc các markup languages khác.
# Bắt đầu ngay thôi nào 

Với hexo thì rất đơn giản để có ngay 1 website tĩnh với các câu lệnh sau: 

```
$ npm install hexo-cli -g
$ hexo init blog
$ cd blog
$ npm install
$ hexo server
```

Vậy là xong tiếp theo là truy cập vào đường dẫn http://localhost:4000  và xem kết quả:

![](https://images.viblo.asia/c6fd18d0-b7f2-4ab0-bd42-1cfd6c882e2b.png)

Và done . Rất đơn giản  phải không nào 

Tiếp theo là lên chọn 1 cái template thật lung linh , hexo cung cấp sẵn cho chúng khoảng 311 Themes tha hồ lựa chọn các bạn có thể xem qua ở đây: https://hexo.io/themes/

Mình chọn đại 1 theme và add vào website của mình: https://github.com/cofess/hexo-theme-pure

![](https://raw.githubusercontent.com/cofess/hexo-theme-pure/master/screenshot/pure.png)

Tiếp theo là clone về và để ở thư mục blog/themes/pure :

```
git clone https://github.com/cofess/hexo-theme-pure.git themes/pure
```

và sửa file config blog/_config.yml :
```yml
theme: pure
```

Vậy là đã apply thành công theme mới rồi. thử xem kết quả xem sao: 

![](https://images.viblo.asia/78655537-3bc9-489a-a0df-c777790870d9.png)

Vậy là thành công rồi! 

Để thêm 1 page hoặc 1 post chúng ta chạy câu lệnh sau :
```
hexo new [layout] <title>
```

Layout sẽ có dạng sau: 

| Layout | Path |
| -------- | -------- | 
| post     | source/_posts   |
| page     | source   |
| draft     | source/_drafts   |

Mình sẽ thêm 1 bài post vào website với câu lệnh: 

```
hexo new post first_post
```

Sau khi chạy lênh xong thì nó có tạo ra cho chúng ta 1 file ở đường dẫn \blog\source\_posts\first-post.md

mở file này lên và viết nội dung thôi:

```\blog\source\_posts\first-post.md
---
title: First post
date: 2020-05-31 00:51:14
tags: ['post']
---
this is first post
```

Lưu lại và run và kết quả :

![](https://images.viblo.asia/1bb55d60-0ac2-4323-97bd-ba82ba05815b.png)

Có 1 bài xuất hiện rồi. giờ thì copy các bài đã viết từ viblo sang thôi và chỉnh sửa 1 số nội dung về profile ở trong file \blog\themes\pure\_config.yml

![](https://images.viblo.asia/e54eab8e-b19e-4a3b-b5f4-e37c148be58f.png)

Vậy là cũng có cái blog sương sương rồi.

Các bạn hoàn toàn có thể tạo ra cá page khác nữa như page about .....

# Deploy website lên github pages
Việc tạo Github Pages khá đơn giản, trước tiên bạn phải có một tại khoản Github,  tạo mới một repo với name theo định dạng <github-username>.github.io , vì username account github của mình là phamtuananh1996 nên mình sẽ tạo một repo với name là phamtuananh1996.github.io

Khi đã tạo thành công Github Pages việc tiếp theo của chúng ta là sinh ra static web và deploy lên Github Pages để host. Khi đã deploy thì địa chỉ truy cập vào blog của bạn sẽ là: <github-username>.github.io .

Việc sinh ra static web và deploy trở nên khá đơn giản với Hexo chúng ta chỉ cần sửa file blog/_config.yml với nội dung như sau:
```
deploy:
    type: git
    repo: https://github.com/phamtuananh1996/phamtuananh1996.github.io.git
```
> Thay username thành username của các bạn.

Tiến hành cài thêm plugin **hexo-deployer-git** : 
```
$ npm install hexo-deployer-git -save
```
    
    
Để deploy thì run 2 lệnh sau:
```
$ hexo generate
$ hexo deploy
```
    
Và kết quả là đây: https://phamtuananh1996.github.io/
    
Vậy là xong !
    
    
    
    
   # Kết luận
    
   Chỉ chưa mất đến 5 phút là bạn đã có 1 blog hoàn chỉnh với hexo và github pages rồi. còn chần chờ gì nữa mà không khám phá hexo ngay. trên đây mình chỉ giới thiệu qua các chức năng cơn bản nhất thôi . 
    
  Các bạn có thể tìm hiểu thêm ở https://hexo.io/
 
    
Chào ,Thân ái và quyêt thắng :heart_eyes::heart_eyes::heart_eyes::heart_eyes: