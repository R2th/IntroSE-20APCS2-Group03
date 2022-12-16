## Mở đầu
 Bạn là một developer **fullstack**? Bạn đã qua cái thời kỳ search trên mạng và tìm ra những thư viện của **js, css** để dùng trong dự án. Hay thư viện nâng cấp version thì phải thay đổi lại những thư viện liên quan... nghĩ tới thôi đã thấy là không sống thọ được rồi :D :D :D 
 ```Vậy các bạn cùng đi tìm hiểu xem người ta quản lý css,js như thế nào nhé?```

-----


## Bower là gì?
Bower là một công cụ quản lý resource cho lập trình front-end được open source bởi Twitter. Đã qua cái thời bạn phải download từng thư viện CSS hay JS về bỏ vào project của bạn, rồi nâng cấp version bằng tay khi down đi down lại version mới. Bower giúp tìm kiếm, cài đặt, nâng cấp và cố định dependency cho một front-end project.

--> Chúng ta hãy cùng cài đặt bower cho project nhé.

**1. Đầu tiên chúng ta cài đặt nodejs** 
```
sudo apt-get install python-software-properties
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install nodejs
```
Để kiểm tra nodejs và npm 
```
node --version
npm --version
```
Nếu như các bạn cài đặt thành công  nodejs thì các bạn đã có npm. Vậy npm là gì theo nguồn Wiki thì:

>npm is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry. The registry is accessed via the client, and the available packages can be browsed and searched via the npm website. The package manager and the registry are managed by npm, Inc.

-----


**2. Dùng npm để cài đặt bower**
```
sudo npm install -g bower
```
Kiểm tra version của bower như sau:
```
bower --version
```

-----


**3. Dùng bower để install các thư viện js, cs**

  Chức năng chính của bower là quản lý các thư viện, package js, css cho project của bạn. Nếu bạn cần download một package nào thì bạn có thể xem thử bower có hỗ trợ thư viện đó không tại [đây](https://bower.io/search/). 
  ```
  bower install <package>
  ```
  Dùng lệnh này nó sẽ download version mới nhất của package đó. Nếu như bạn muốn download 1 package với version chỉ định thì có thể dùng câu lệnh sau:
  ```
  bower install <package>#version
  VD: bower install bootstrap#3.2.0
  ```
  Ngoài ra nó còn có thể download từ github với câu lệnh sau:
  ```
  bower install git@github.com:twbs/bootstrap.git
  bower install https://github.com/twbs/bootstrap.git
  ```
  Nếu muốn update version của các thư vện trong project (điều này các bạn nên hạn chế làm vì nó gây ra những lỗi trên trời rơi xuống vì xung đột version giữa các thư viện, tốt nhất là đừng ham của lạ )
  ```
  bower update
  ```
  

-----


**4. Sử dụng file bower.json**

Nếu các bạn đã dowload bower thành công thì chắc chắn các bạn sẽ thấy có 1 file bower.json xuất hiện trong project của bạn. Vậy nó là gì và dùng để làm gì? Lúc mở bài mình cũng đã có nói là nếu như các bạn làm việc nhóm tầm 5 người thì việc đồng nhất các thư viện với nhau rất khó và việc chuyển project qua lại với các thành viên cũng rất khó bởi vì lượng thư viện càng nhiều thì size project càng lớn.
```
{
  "name": "Name project",
  "description": "",
  "main": "bower.json",
  "authors": [
    "Ho Thien Trang <ho.thi.thien.trang@framgia.com>"
  ],
  "license": "MIT",
  "private": true,
  "dependencies": {
    "jquery": "^1.11.3",
    "bootstrap": "^3.3.7",
    "bootstrap-tagsinput": "0.6.1",
  }
}
```
Nói tóm lại thì file này giúp các bạn quản lý các thư viện js, css có trong project của mình. Nếu người khác muốn deploy project của bạn thì chỉ cần chạy lệnh
```
bower install
```
thì toàn bộ những thư viện, package được định nghĩa trong file này sẽ được dowload về và để ở thư mục **bower/**

-----
## Kết luận
Hy vọng qua bài viết này các bạn đã biết cách để dùng bower để quản lý project của mình thật chuyên nghiệp. Cảm ơn và hy vọng gặp lại các bạn trong tương lai gần!
:D :D :D