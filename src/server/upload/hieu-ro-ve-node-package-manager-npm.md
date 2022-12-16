***Node package manager*** hay còn gọi là `NPM`, là một kho lưu trữ các libs, packages của hệ sinh thái node js; cũng giống như các kho lưu trữ khác: NuGet của .Net, Composer của PHP, Maven của java, Pip của python, ...; `NPM` hỗ trợ tối đa cho việc install, uninstall, update, control version các packages trong dự án *Node - javascript*. Sau đây mình xin tổng hợp một số câu lệnh `NPM` hay dùng trong quá trình làm dự án.

### Khởi tạo project 
Một dự án *Node - javascript* thì không thể thiếu file `package.json`, file này sẽ chứa thông tin của project, các câu lệnh run script, và quan trọng nhất là thông tin các **libs** (hay còn gọi là **packages**, **dependences**) và version của nó, để khởi tạo file này thì run command sau:
```js
npm init
```
![](https://images.viblo.asia/baf8e73a-ca2c-4f70-a3ed-ecdb2180f8ce.png)

 Run và fill các thông tin theo các câu hỏi trong terminal (những thông tin này ta có thể edit trực tiếp trong file `package.json` sau khi khởi tạo)
 Chúng ta có thể bỏ qua phần nhập thông tin và để `npm` tự fill các thông tin default bằng câu lệnh `npm init -y`
 
 ### Cài đặt thư viện (libs or packages or dependences)
 Tuỳ vào mục đích sử dụng, sẽ có một số cách cài đặt sau:

##### 1.1. Cài đặt dependences cho project
Run những lệnh sau sẽ tự động save vào phần `dependences` của file `package.json`
```js
// Cài đặt một package
npm install lodash

// or
npm i lodash

// Cài đặt một lúc nhiều packages
npm i lodash mobx express

// Cài đặt một version xác định
npm i lodash@4.17.20
```
![](https://images.viblo.asia/031b6556-ae9f-4a12-85e3-617c94d11693.png)

##### 1.2. Cài đặt dev dependences cho project
Dev dependences là các packages sẽ dùng cho mục đích phát triển trên môi trường *Develop* mà không cần build ra trên môi trường *Production* như các tools `eslint`, `webpack`, `babel`, ...
Run những lệnh sau sẽ tự động save vào phần `devDependencies` của file `package.json`
```js
npm i eslint webpack babel --save-dev
```
![](https://images.viblo.asia/6f010788-b1f9-456f-bba6-8414220f68bd.png)

Sau khi run những lệnh trên thì sẽ có những thông tin sau:
* **Package name và version trong file package.json:** chúng ta sẽ push file này lên git repo để những member trong project sẽ pull về và run lệnh `npm i` để cài đặt tất cả các packages có trong file này.
* `File package-lock.json:` file này sẽ lưu lại log chính xác các version của package đã cài đặt, file này cần push lên git repo.
* `Folder node_modules:` folder này sẽ chứa source code các packages trong project. Lưu ý là đừng bao giờ push folder này lên git repo nhé, nhưng member khác sẽ run lệnh `npm i` để tạo ra folder này ở máy local của họ :laughing:.

![](https://images.viblo.asia/d58b1c19-2164-44e5-abe8-af7b584041c2.png)

##### 2. Cài đặt package global
Có những packages mà chúng ta muốn cài đặt *global*, tức là không thuộc trong một project xác định nào; ở bất kì vị trí folder nào của terminal đều có thể sử dụng được
```js
npm i nodemon pm2 ngrox -g
```
Run lệnh này sẽ không lưu thông tin package vào trong file `package.json` của project.


##### 3. Run trực tiếp package mà không cần cài đặt  - npx : an NPM package runner
`npx` sẽ thực thi trực tiếp package từ *npm registry* mà không cần cài đặt về máy local, như vậy sẽ có một số lợi ích như:
* Không tốn bộ nhớ máy local.
* Luôn luôn thực thi với version mới nhất trên npm registry.

```js
// Ví dụ khởi tạo một react project thông qua tool: create-react-app
npx create-react-app hello_react
```

### Tìm hiểu về version trong package.json
Làm thế nào để update package version một cách an toàn; ký tự `^` và `~` có ý nghĩa gì trong version; làm thế nào để upgrade một `major` version cao hơn của package, chúng ta sẽ cùng tìm hiểu tiếp theo nào.

##### 1. Cách đánh dấu version
`NPM` package version có 3 phần: `Major.Minor.Patch`
* **Major:** đây là phần tăng version nhằm mục đích thay đổi lớn đến cấu trúc, cách thức hoạt động của package hiện tại và có thể ảnh hưởng đến các projects đang sử dụng chúng (hay gọi là *breaking changes*).
* **Minor:** Đây là phần tăng version nhằm mục đích thêm các tính năng mới mà không làm thay đổi cấu trúc, cách thức hoạt động của package hiện tại và không ảnh hưởng đến các projects đang sử dụng chúng.
* **Patch:** Đây là phần tăng version nhằm mục đích fix bugs, fix những phần nhỏ mà không làm thay đổi cấu trúc, cách thức hoạt động của package hiện tại và không ảnh hưởng đến các projects đang sử dụng chúng (hay gọi là bản vá).

##### 2. Tìm hiểu ký hiệu `^` và `~` trong version
Ký hiệu `^` trước version. Điều này có nghĩa là có thể update lên `latest minor version` một cách an toàn mà ko sợ app bị crash hay bị ảnh hưởng. Ví dụ version hiện tại trong `package.json` là `^15.2.1` thì có thể update lên version mới nhất `^15.9.4` một cách an toàn, miễn nó là `^15.x`.

Ký hiệu `~` trước version. Điều này có nghĩa là có thể update lên `latest pacth version` một cách an toàn mà ko sợ app bị crash hay bị ảnh hưởng. Ví dụ version hiện tại trong `package.json` là `~15.2.1` thì có thể update lên version mới nhất `^15.2.15` một cách an toàn, miễn nó là `^15.2.x`.

##### 3. Update npm packages version
###### 3.1 Xem tất cả các version của package:
```js
npm view lodash versions
```

###### 3.2 Xem latest version của package:
```js
npm view lodash version
```

###### 3.3 Kiểm tra và update những package đã out of date:
```js
npm outdated
```
![](https://images.viblo.asia/7fca1e23-c0f7-4dee-b55c-b10c15f75dc9.png)
như hình trên thì sẽ list ra các thông tin như:
* `Current:` version hiện tại đang sử dụng trong project.
* `Wanted:` latest safe version (prefix `^` hoặc `~` trong version) mà chúng ta có thể update an toàn.
* `Latest:` version mới nhất trên *npm registry*.

Như vậy chúng ta cần update tất cả các package đã outdated lên version `Wanted` như sau
```js
npm update

// Hoặc chỉ định những packages muốn update
npm update antd babel-loader
```

###### 3.4  Update latest major version - breaking changes
Để update lên latest version một cách an toàn thì điều đầu tiên chúng ta cần làm là vào check *changelog* của package (trang chủ doc release note hoặc github release note) để biết về những phần đã thay đổi, những phần thêm mới để đánh giá mức độ ảnh hưởng đến project đang sử dụng.
```js
// npm install <packagename>@latest
npm install react@latest react-dom@latest
```
Sau khi update latest version thì chúng ta cần check lại hoạt động của app và update những phần thay đổi theo version mới của package. Update theo những lệnh trên sẽ phản ánh vào file `package.json`, `package-lock.json`, folder `node_modules`.

 ### Kết luận
 Mình đã list ra các điều cần lưu ý khi sử dụng NPM, hy vọng sẽ giúp ích cho mọi người khi làm việc với NPM. Cám ơn đã đọc bài viết!  :D :heart_eyes::stuck_out_tongue_winking_eye: