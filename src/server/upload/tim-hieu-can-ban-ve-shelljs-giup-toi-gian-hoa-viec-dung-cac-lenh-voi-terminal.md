# I> Giới thiệu
Hôm nay, mình sẽ giới thiệu 1 thư viện có thể áp dung  với nodejs (hoặc reactjs, angular,vuejs).
Nó giúp ta mô phỏng các dòng lệnh tương tự như Bash script, nhờ nó ta sẽ xây dựng được các đoạn mã và quản lý bằng các dòng code javascript không cần phải chạy nhiều dòng lệnh phức tạp, giảm được sự phức tạp tương tác trên terminal.
Nó hoạt động tốt trên các bản nodejs từ v6 trở lên, chi tiết tại đây: http://travis-ci.org/shelljs/shelljs

Và theo như giới thiệu, nó ứng dụng mạnh mẽ ở các thư viện và các tool:
- [Firebug](http://getfirebug.com/) 
- [JSHint](http://jshint.com) & [ESLint](http://eslint.org/) 
- [Zepto](http://zeptojs.com) 
- [Yeoman](http://yeoman.io/) 
- [Deployd.com](http://deployd.com) 
- Và [nhiều các tool khác](https://npmjs.org/browse/depended/shelljs).
# II> Bắt đầu tìm hiểu chi tiết nào
## Cài đặt :
Giờ mình sẽ tạo 1 project node đơn giản để tìm hiểu:
```
mkdir Demo
cd Demo/ 
npm install shelljs 
npm init
```
 Sau đó mình tạo 1 thư mục `scripts/` bên trong chứa file `test.js` mình sẽ viết các lệnh với `shelljs` tại đây
Ở package.json thêm dòng này: 
```
"scripts": {
 "shell": "node scripts/test.js"
},
```
=> Mỗi lần run: 
```npm run shell```
## Các shell method thông dụng:
Ở file test.js, ta require shelljs vào:
var shell = require('shelljs');
### 1. Cd(<thư mục>)
Phương thức này tương tự câu lệnh thân thuộc cd, cho phép ta cần tới thư mục muốn tới
Ví dụ: Muốn di chuyển tới thư mục cha:
```javascript
shell.cd("..") 
```

### 2. echo( <tùy chọn>,"nội dung"):
Tương tự câu lệnh echo hay dùng, ta hay dùng khi muốn in ra 1 nội dung (giá trị, thông báo) :
Ví dụ:
```javascript
shell.echo("xin chao") 
```
kết quả khi ta run 
```javascript
xin chao
```
- Tùy chọn: nếu là '-n' xóa dòng mới trước khi in ra → không in luôn dòng mới
```javascript
shell.echo('hello world');
var str = shell.echo('hello world');
shell.echo('-n', 'no newline at end');
```
### 3. cat:
Phương thức này giúp đọc nội dung trong 1 file:

Ví dụ: 
```js
const content = shell.cat("src/scripts/command.text")
shell.echo(content)

//đọc nội dung từ file và execute các tập lệnh này
shell.exec(content)
````

Kết quả ta được nội dung đọc trong file command.txt và thực thi các lệnh tròn file này
### 4. chmod:
Phương thức này mô phỏng Câu lệnh chmod cho phép mình set quyền cho thư mục/file
- Ví dụ: Ta muốn set quyền 755 cho file index.js
```javascript
 shell.chmod(755, 'index.js');
```
Kết quả là file này đã được đổi quyền:
Trước khi áp dụng đoạn code
```
drwxr-xr-x 4 gitpod gitpod 4096 Jan 15 14:26 .
drwxr-x - - 4 gitpod gitpod 4096 Jan 15 13:37 ..
-rw-r - r - 1 gitpod gitpod 0 Jan 15 14:10 index.js
drwxr-xr-x 19 gitpod gitpod 4096 Jan 15 13:39 node_modules
-rw-r - r - 1 gitpod gitpod 344 Jan 15 14:26 package.json
-rw-r - r - 1 gitpod gitpod 4336 Jan 15 13:39 package-lock.json
drwxr-xr-x 2 gitpod gitpod 4096 Jan 15 14:26 scripts
-rw-r - r - 1 gitpod gitpod 86 Jan 15 13:37 yarn.lock
```
Sau khi áp dụng đoạn code, quyền của file index.js đã thay đổi
```
drwxr-xr-x 4 gitpod gitpod 4096 Jan 15 14:26 .
drwxr-x - - 4 gitpod gitpod 4096 Jan 15 13:37 ..
-rw-r - r - 1 gitpod gitpod 0 Jan 15 14:10 index.js
drwxr-xr-x 19 gitpod gitpod 4096 Jan 15 13:39 node_modules
-rw-r - r - 1 gitpod gitpod 344 Jan 15 14:26 package.json
-rw-r - r - 1 gitpod gitpod 4336 Jan 15 13:39 package-lock.json
drwxr-xr-x 2 gitpod gitpod 4096 Jan 15 14:26 scripts
-rw-r - r - 1 gitpod gitpod 86 Jan 15 13:37 yarn.lock
```
### 5. exec:
Phương thức này hoạt động : nó sẽ thực hiện các script tương ứng. Câu lệnh này là chắc là câu lệnh hay xài nhất trong shelljs!

- Ví dụ: Khi mình có 2 thư mục: frontend(node) và backend (reacjs), mỗi lần setup mình phải vào từng thư mục setup, nhưng với exec mình có thể viết 1 đoạn giúp làm việc này
```javascript
    function setTupProject() {
      const folderSetups = ["backend,frontend"].forEach(folder => {
        shell.cd(folder);
        shell.exec('yarn')
        shell.cd('..')
      })
    }
````

### 6. Các lệnh hay dùng khác:
-  ls(< otpion > ,  < path >):  liệt kê ra các file/thư mục đang có với đường dẫn đó

Ví dụ: Liệt kê tất cả các file (-A: tùy chọn liệt kê tất cả các file)

```javascript
const ls = shell.ls("-A","src")
shell.echo(ls)
```
- mkdir() : tạo 1 thư mục mới.

Ví dụ: Tạo ra các thư mục image với document nằm trong src

```js
const createFolder = shell.mkdir("-p", "src/image", "src/document")
// câu lệnh dưới đây là tương đường
const createFolder = shell.mkdir("-p", ["src/image", "src/document"])
```


- mv(): di chuyển file/thư mục này sang 1 file/thư mục khác

Ví dụ:  Di chuyển thư mục image sang thư mục build/image:

```js
   shell.mv("-n", "image", "build/image");
```


Ngoài ra còn nhiều phương thức khác which(), exit(), error(),.... các bạn có thể tham khảo [tại đây](https://github.com/shelljs/shelljs) 

## Một số ví dụ trong thực tế :

 Một số ví dụ áp dụng để quản lý project: Ví dụ từ bộ React boilderplate, nó viết khá hay và quản lý rất xịn xò :
- setup  các app reactjs trước  khi chạy  [setup](https://github.com/react-boilerplate/react-boilerplate/blob/d19099afeff64ecfb09133c06c1cb18c0d40887e/internals/scripts/setup.js)
- Phân tích các gói [analyze](https://github.com/react-boilerplate/react-boilerplate/blob/d19099afeff64ecfb09133c06c1cb18c0d40887e/internals/scripts/analyze.js)
# III>Kết luận:
Ta có thể thực hiện các dòng lệnh với terminal qua code js, khá là hay. 
Việc áp dụng shelljs trong dự án cũng không bắt buột, nhưng nếu có thể áp dụng nó tối ưu, có thể giúp tiết kiệm được thời gian cho các câu lệnh và việc làm việc với các lệnh cũng rõ ràng hơn.

- Xem thêm document tại trang chủ của nó: https://github.com/shelljs/shelljs