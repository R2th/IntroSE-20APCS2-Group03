## First Angular Web Application
### Simple Reddit Clone
Trong seri tìm hiểu về Angular này, tôi sẽ xây dựng một ứng dụng cho phép người dụng post các bài viết (bao gồm có title và URL) sau đó thực hiện vote cho các bài đăng đó. Chức năng này nó cũng tương tự như [Reddit](https://www.reddit.com/) và [Product Hunt](https://www.producthunt.com/?bc=1#_=_)
Trong ứng dụng đơn giản này, tôi sẽ trình bày một số điểm quan trọng trong Angular như là:
* Xây dựng custom components
* Cho phép user nhập từ forms
* Render list objects cho views
* Chặn user clicks  • Deploying app lên server

Sau khi bạn và tôi tìm hiểu xong về seri này, bạn sẽ biết cách Tạo một thư mục -> Build một ứng dụng Angular cơ bản -> thực hiện deploy nó lên server.<br>
Qua đó bạn sẽ hiểu được một ứng dụng Angular thì được xây dựng như thế nào, và sau đó có thể tự tạo một ứng dụng Angular cho riêng mình. <br>
Sau khi ứng dụng của chúng ta hoàn thành nó sẽ trông như thế này:
![](https://images.viblo.asia/4eeae07e-45c7-4b92-8ce9-60cf2ee59f9d.png)

Đầu tiên, người dùng sẽ gửi một liên kết mới và sau khi gửi, người dùng có thể upvote hoặc downvote mỗi bài viết. Hệ thống sẽ tính điểm cho mỗi bài viết và bạn có thể vote cho những bài viết mà bạn thấy nó có ích.

Trong seri này tôi sẽ sử dụng TypeScript. TypeScript là một superset của JavaScript ES6 và một số loại khác. Tôi sẽ không đi sâu về TypeScript trong bài viết này, tuy nhiên chúng ta sẽ tìm hiểu ở các bài viết sau. Bạn cũng đừng lo lắng, nếu bạn chưa quen với một số cú pháp mới, nếu bạn đã từng tìm hiểu qua ES5 (JavaScript thông thường) thì bạn có thể theo dõi seri này.

## Bắt đầu
### Node.js and npm
Để bắt đầu với Angular, bạn sẽ cần cài đặt Node.js. Có một số cách khác nhau để bạn có thể cài đặt Node.js.
Bạn có thể tìm hiểu thêm ở đây [Nodejs](https://nodejs.org/download/)

**Hãy chắc chắn rằng bạn đã cài đặt Node 8.9.0 trở lên.**

> Nếu bạn sử dụng máy Mac, cách tốt nhất là bạn nên cài đặt Node.js trực tiếp từ trang web Node.js thay vì thông qua trình quản lý package khác (như là, Homebrew.) Vì nghe nói là cài đặt Node.js qua Homebrew hay gây ra một số lỗi vặt.
> 
Node Package Manager (gọi tắt là npm) sẽ được cài đặt như là một phần của Node.js. Để check xem npm có đang được cài trên máy của bạn không, bạn có thể mở terminal và gõ lệnh sau:

`$ npm -v`

Nếu version number không được in ra, thì có thể bạn chưa cài, hoặc bị lỗi gì đó.
Bạn cần cài npm phiên bản 5.6.0 trở lên.
### TypeScript
Khi bạn đã cài Node.js rồi thì bước tiếp theo là cài đặt TypeScript. Đảm bảo rằng bạn đã cài đặt phiên bản 2.1 trở lên. Để cài đặt nó, hãy chạy lệnh npm sau:

`$ npm install -g typescript`

> Có bắt buộc phải cài TypeScript không? Không bắt buộc phải cài, những tôi nghĩ là bạn nên cài đặt nó. Lý do, Angular cũng có API ES5, nhưng Angular được viết bằng TypeScript, và mọi người thường sử dụng nó trong Angular.Trong seri này tôi sẽ sử dụng TypeScript vì quả thực nó rất tuyệt vời, và nó giúp chúng ta làm việc với Angular dễ dàng hơn. 

### Browser
Tôi khuyên bạn nên dùng [Google Chrome](https://www.google.com/chrome/) để phát triển ứng dụng Angular. Và tôi sẽ sử dụng nó trong suốt seri tìm hiểu về Angular 7 này.

## Hướng dẫn đặc biệt cho người dùng Windows
Trong seri này, hầu hết tôi sẽ sử dụng Unix/Mac command. Trong đó có một số commands có thể dùng đa nền tảng như là: ls và cd. Tuy nhiên, có một số commands dành riêng cho Unix/Mac như là: ls -1p. Do đó, đôi khi bạn phải tìm những câu lệnh tương đương với hệ điều hành của bạn. Tuy nhiên, tôi nghĩ là những trường hợp như vậy sẽ rất ít, và bạn sẽ không gặp phải vấn đề đó thường xuyên. 

> Các bạn dùng Windows chú ý nhé, trong seri này tôi sẽ sử dụng Unix/Mac commands.
> 
### Angular CLI
Angular cung cấp một số những tiện ích cho phép người dùng tạo và quản lý các project bằng command line. Nó tự động hóa các tác vụ như là tạo project, add thêm controllers mới ... . Nói dung là nên sử dụng Angular CLI vì nó giúp tạo và maintain các common patterns trong ứng dụng của chúng ta. 

Để cài đặt Angular CLI, hãy chạy lệnh sau:

`$ npm install -g @angular/cli`

Sau khi cài đặt thành công, bạn có thể xem version hiện tại bằng command sau: 

`$ ng --version`

Nếu bạn đang chạy OSX hoặc Linux, có thể sẽ xuất hiện message sau:

`Could not start watchman; falling back to NodeWatcher for file system events.`

Điều này có nghĩa là bạn chưa cài watchman (đây là tool giúp Angular CLI khi cần có thể giám sát các filesystem). Nếu bạn đang chạy OSX, bạn nên cài đặt nó bằng Homebrew bằng lệnh sau:

`$ brew install watchman`

Nếu bạn đang chạy OSX, và gặp lỗi khi chạy lệnh brew. Thì điều đó có nghĩa là bạn đã cài đặt Homebrew không thành công. Bạn có thể vào trang [https://brew.sh/](https://brew.sh/) để tham khảo cách cài đặt, và thử lại lần nữa xem sao. <br>
Nếu bạn đang chạy Linux, bạn có thể vào [https://ember-cli.com/user-guide/#watchman](https://ember-cli.com/user-guide/#watchman) để tìm hiểu thêm về cách cài đặt watchman. <br>
Tuy nhiên, nếu bạn đang chạy Windows, bạn không cần cài đặt bất cứ thứ gì vì Angular CLI sẽ sử dụng trình theo dõi Node.js riêng.<br>
Nếu bạn đang tò mò về tất cả những điều mà Angular CLI có thể làm, hãy thử lệnh này:

`$ ng --help`

Đến đây, bạn đã cài đầy đủ Angular CLI và các thành phần liên quan rồi. Chúng ta hạy tạo thử project đơn giản đầu tiên nhé.
### Example Project
Hãy dùng lệnh ng new để tạo mới project

`$ ng new angular-hello-world`


Khi chạy lệnh trên sẽ output ra một số message như ở dưới đây:
```
? Would you like to add Angular routing? No
? Which stylesheet format would you like to use? CSS
CREATE angular-hello-world/README.md (1034 bytes)
CREATE angular-hello-world/.editorconfig (246 bytes)
CREATE angular-hello-world/.gitignore (587 bytes)
CREATE angular-hello-world/angular.json (3924 bytes)
CREATE angular-hello-world/package.json (1318 bytes)
CREATE angular-hello-world/tsconfig.json (435 bytes)
CREATE angular-hello-world/tslint.json (1621 bytes)
CREATE angular-hello-world/src/favicon.ico (5430 bytes)
CREATE angular-hello-world/src/index.html (304 bytes)
CREATE angular-hello-world/src/main.ts (372 bytes)
CREATE angular-hello-world/src/polyfills.ts (2841 bytes)
CREATE angular-hello-world/src/styles.css (80 bytes)
CREATE angular-hello-world/src/test.ts (642 bytes)
CREATE angular-hello-world/src/browserslist (388 bytes)
CREATE angular-hello-world/src/karma.conf.js (1001 bytes)
CREATE angular-hello-world/src/tsconfig.app.json (166 bytes)
CREATE angular-hello-world/src/tsconfig.spec.json (256 bytes)
CREATE angular-hello-world/src/tslint.json (314 bytes)
CREATE angular-hello-world/src/assets/.gitkeep (0 bytes)
CREATE angular-hello-world/src/environments/environment.prod.ts (51 bytes)
CREATE angular-hello-world/src/environments/environment.ts (662 bytes)
CREATE angular-hello-world/src/app/app.module.ts (314 bytes)
CREATE angular-hello-world/src/app/app.component.css (0 bytes)
CREATE angular-hello-world/src/app/app.component.html (1120 bytes)
CREATE angular-hello-world/src/app/app.component.spec.ts (1017 bytes)
CREATE angular-hello-world/src/app/app.component.ts (223 bytes)
CREATE angular-hello-world/e2e/protractor.conf.js (752 bytes)
CREATE angular-hello-world/e2e/tsconfig.e2e.json (213 bytes)
CREATE angular-hello-world/e2e/src/app.e2e-spec.ts (631 bytes)
CREATE angular-hello-world/e2e/src/app.po.ts (251 bytes)
...
added 1193 packages from 1038 contributors and audited 43095 packages in 21.235s
```

> Các file được tạo ở máy của bạn có thể khác một chút vì nó phụ thuộc vào version `@angular/cli` mà bạn đã cài.
>
Sẽ có rất nhiều file được tạo ra, và bạn chưa cần hiểu hết ý nghĩa của tất cả các file đó, tôi sẽ giải thích trong các bài viết sau.  Trước hết chúng ta cùng tìm hiểu về `angular-hello-world` directory, chúng ta dùng lệnh sau để xem những cái gì vừa được tạo ra
```
$ cd angular-hello-world
$ tree -F -L 1
```

```
├── README.md //a useful README
├── angular.json //angular-cli configuration file
├── e2e/ // end-to-end tests
├── node_modules/ // installed dependencies
├── package-lock.json //npm dependencies lockfile
├── package.json //npm configuration
├── src/ //our application's code
├── tsconfig.json // typescript config
└── tslint.json // linting config

3 directories, 6 files
```

Nếu bạn đang chạy OSX thì có thể cài tree command bằng lệnh sau:

`brew install tree`

Tiếp theo, chúng ta sẽ xem thư mục `src` -  Đây là dicrectory chứa sourcecode do bạn viết ra.
```
$ cd src
$ tree -F
├── app/
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   └── app.module.ts
├── assets/
├── browserslist
├── environments/
│   ├── environment.prod.ts
│   └── environment.ts
├── favicon.ico
├── index.html
├── karma.conf.js
├── main.ts
├── polyfills.ts
├── styles.css
├── test.ts
├── tsconfig.app.json
├── tsconfig.spec.json
└── tslint.json

3 directories, 18 files
```

Trên chương trình text editor của bạn, đầu tiên hãy mở file `index.html` <br>
**src/index.html**

```
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>AngularHelloWorld</title>
<base href="/">

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
<app-root></app-root>
</body>
</html>
```

Trước tiên, chúng ta xem đoạn này trước:
```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularHelloWorld</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
```
Nếu bạn quen với việc viết code HTML, thì phần đầu tiên này trông khá đơn giản, ở đây tôi đã khai báo core structure của HTML, và một chút về metadata như là `charset`, `title` và base `href`. <br>
Nào, chúng ta đi tiếp tới phần body
```
<body>
<app-root></app-root>
</body>
</html>
```
Thẻ `app-root` là nới ứng dụng của bạn sẽ được render ra. Vậy thì thẻ `app-root` là gì, và nó đến từ đâu? `app-root` là một component được định nghĩa bởi Angular application của bạn. Trong Angular, chúng ta có thể định nghĩa các thẻ HTML của riêng mình và cung cấp cho chúng chức năng tùy chỉnh.<br>
Thẻ `app-root` sẽ là một “entry point” (điểm đầu vào) cho ứng dụng của bạn.
Đầu tiên, chúng ta hãy chạy thử ứng dụng này, và xem các thành phần này nó được hoạt động ra sao.
### Writing Application Code
## Running the application
Bạn có thể dụng lệnh sau để chạy ứng dụng:
```
$ ng serve
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
...
Compiled successfully.
```
Ứng dụng của bạn sẽ chạy trên `localhos` port 4200. Do đó, hãy mở trình duyệt và truy cập đường link: [http://localhost:4200](http://localhost:4200)

Lưu ý, nếu bạn nhận được message:

`Port 4200 is already in use. Use '--port' to specify a different port`

Điều này có nghĩa là đã có một service khác đang chạy trên cổng 4200 rồi. Bạn có thể giải quyết bằng 1 trong 2 cách sau:

1. Tắt cái service đang chạy đó đi.
2. Thêm `--port` khi chạy `ng serve`. Kiểu như thế này: `ng serve --port 9001`

Sau khi dùng cách thứ 2, URL của bạn sẽ thành đổi thành: http://localhost:9001

Thêm một chú ý là, trên một số máy `localhost` có thể không hoạt động, Thay vào đó, bạn sẽ thấy một tập các số như là: `127.0.0.1`. Và khi chạy `ng serve` nó sẽ cho bạn biết URL nào mà server đang chạy, cho nên bạn cần chú ý message hiện ra, để biết được URL nào thì dùng được.
![](https://images.viblo.asia/a3eac82b-2401-46c4-aa1b-59ab6741ae20.png)
Như vậy, chúng ta đã hoàn thành một số thiết lập cơ bản, và đã biết dùng lệnh để chạy nó như thế nào. Trong bài viết lần tới, chúng ta cùng nhau viết một số code đơn giản nhé.




<br><br><br>			
*Hết. Mời các bạn tham khảo tiếp ở các bài viết lần tới*			
			
*Nguồn:  https://www.ng-book.com/2/*