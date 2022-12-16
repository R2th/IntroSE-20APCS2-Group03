Xin chào mọi người, thời gian gần đây thì mình có tìm hiểu vể [Angular](https://angular.io) mà cụ thể là Angular 8 nên hôm nay mình sẽ hướng dẫn các bạn cài đặt môi trường cho Angular và Rails API. Như các bạn đã biết thì Angular là open source JS framework để build web app bằng Html và JS. 

Trước đây thì angularJS thì nó base dựa vào controller nhưng từ angular 2 trở lên thì nó lại base dựa trên component. Các features của Angular 8 đó là components, TypeScript và service. Còn các components của angular 8 thì nó chính là MOdules, component, template, metadata, và service. Qua đây thì cũng giúp cho các bạn lưu ý rằng, muốn học Angular thì các bạn nên bám theo sườn của Feature và Component thì sẽ nắm được phần nào về angular. và chúng ta đi vào phần chính của bài viết này.
## I. Cài đặt angular 8
Để cài đặt được angular thì chúng ta cần phải cài đặt
+ Node.js version 10.9.0 or cao hơn
+ Npm package manager: Angular, Angular CLI và Anuglar app để phụ thuộc vào thư viện được cung cấp duới dạng npm package. Để cài đặt thì các bạn follow link [cài đặt npm](https://docs.npmjs.com/cli/install) này.
### Step 1: Install Angular CLI
Ở đây thì mình sử dụng Angular CLI để tạo project, gen application, thư viện và một loạt các task để testing, bulding và deployment. Để cài đặt angular cli thì các bạn mở terminal/console lên và run:
```
npm install -g @angular/cli
```
### Step 2: Tạo workspace và Init app
Sau khi cài đặt xong angular cli thì chúng ta vào luôn tạo 1 app angular bằng command line:
```
ng new angular-rails
```
Trong quá trình chạy thì nó sẽ hỏi một số cái để cài đặt app của bạn ví dụ như 
```
Would you like to add Angular routing? (y/N)
```
thì chúng ta điền `y` và Enter. Sau đó thì đến với format style thì ở đây tùy các bạn lựa chọn format mà bạn muốn sử dụng, mình thì mình sử dụng SCSS. Muốn chọn thì các bạn bấm mũi tên lên xuống để chọn và Enter thôi.
```
? Which stylesheet format would you like to use? 
  CSS 
❯ SCSS   [ https://sass-lang.com/documentation/syntax#scss                ] 
  Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ] 
  Less   [ http://lesscss.org                                             ] 
  Stylus [ http://stylus-lang.com                                         ] 
```
Sau khi chạy xong đoạn này thì chúng ta sẽ thấy một thư mục angular-rails và chần chừ gì nữa mà không cd vào đó để xem bên trong có gì. :v: 
Có một số file quan trọng trong app là:
| Folder/File | Mô tả |
| -------- | -------- |
| .editorconfig     | File config cho trình chỉnh sửa code như trim, indent_size...|
|.gitignore|File quá quen thuộc rồi :v:|
|README.md|File mô tả app|
|angular.json|Là một file khá là quan trọng, là file config tất cả project về không gian, các option về build. serve, test tool....|
|package.json	|File config các npm package dependencies sử dụng trong project|
|src/|mình sẽ nói kỹ ở dưới|
|node_modules/|File chứa các module, package mà chúng ta sư dụng trong app|
|tsconfig.json|Config Typescript|
|tslint.json|Config TSLint|

Thư mục `src/` và các thư mục con trong nó và hầu như thì chúng ta làm việc trên folder này là chủ yếu. Vậy thì nó bao gồm những thứ như sau:
| Folder/File | Mô tả |
| -------- | -------- |
| app/     | Chứa các files component để chứa các logic và dữ liệu được định nghĩa      |
| assets/     | Chứa image và một số file asset khác    |
|environments/|Chứa các option config cho môi trường. Mặc định, sẽ có một số môi tường phát triển tiêu chuẩn và production. Bạn có thể thêm một số config cho môi trường vào đây|
| favicon.ico  | Không ai lạ gì cái này cả, nó chính là cái icon xuất hiện trên tab của trình duyệt / bookmark  |
|index.html | Đây là trang index mà chúng ta hiển thị lên, mở lên bạn có thể thấy rằng trong body nó có gọi cái app-root, thì app-root là một component cha của tất cả các component để gen template vào đây |
| main.ts|`The main entry point for your application. Compiles the application with the JIT compiler and bootstraps the application's root module (AppModule) to run in the browser. You can also use the AOT compiler without changing any code by appending the --aot flag to the CLI build and serve commands.`  ([original](https://angular.io/guide/file-structure#application-source-files))|
|polyfills.ts	   |  Nó cung cấp các polyfill script để hỗ trợ trình duyệt |
|styles.scss|Nó là file chứa file style css cho app, ở đây chúng ta có thể include các file nhỏ vào đây|
|test.ts|File định nghĩa cấu hình unit test|
Còn các bạn muốn chi tiết hơn nữa thì các bạn có thể tham khảo ở [Angular File Structure](https://angular.io/guide/file-structure)
Xong phần mô tả rồi thì chúng ta khởi tạo serve để xem mặt mũi nó như thế nào bằng:
```
ng serve --open
```
và sau đó truy cập vào `http://localhost:4200`. 

OK, vậy là tạm thời chúng ta đã xong phần angular rồi, tiếp theo là phần rails API,
## II. Cài đặt Rails API
Ở đây mình lựa chọn đặt rails API ở trong angular project luôn,.
Mở terminal lên và hãy chắc chắn rằng bạn đang ở project `angular-rails` nhé, sau đó chúng ta create rails api
```
rails new rails-api --api --skip-yarn --skip-action-cable --skip-coffee --skip-javascript --skip-test --skip-system-test -d mysql
```
ở đây thì mình chọn option `--api` và sử dụng mysql nhé. Sau khi run xong thì bạn cần phải chạy một số thứ như là: config db mysql, bundle
Ở đây thì chúng ta sẽ thấy vấn đề đó là, cả angular và rails đều phải khởi tạo server để chạy, và mỗi lần như thế thì chúng ta cần phải chạy 2 tab khác nhau nên là cũng k tiện lắm, nên hôm rồi mình có đọc bài viết của anh **NamNV** ở bài viết [Anuglar+Rails](https://viblo.asia/p/angular-4-with-rails-3P0lPyV85ox#_angular-build-rake-task-4) thì anh có mô tả về việc này, và mình cũng áp dụng nó vào project của mình:
```ruby
# angular-rails/rails-api/lib/tasks/dev.rake

namespace :dev do
  desc "Start development (include Angular build and Rails server)"
  task start: :environment do
    stop_rails_server_and_angular_build
    puts "Start Angular build..."
    angular_pid = spawn "cd .. && ng build --watch"
    puts "Start Rails server..."
    begin
      system "rails s -p 3333"
    rescue SystemExit, Interrupt
      stop_rails_server_and_angular_build
    end


    Process.detach angular_pid
  end

  desc "Stop development (kill Angular build process and stop Rails server)"
  task stop: :environment do
    stop_rails_server_and_angular_build
  end
end

def stop_rails_server_and_angular_build
  rails_server_pid = File.read Rails.root.join("tmp", "pids", "server.pid") rescue nil
  angular_build_pids = `ps ax | grep -w '[n]g' | awk '{print $1}'`.split("\n")
    .join(" ")

  puts "Stop Rails server..."
  system "kill -9 #{rails_server_pid}"
  puts "Stop Angular build process..."
  system "kill -9 #{angular_build_pids}"
end
```
và cứ mỗi lần chúng ta cần khởi tạo server thì chỉ cần cd đến rails-api và chạy:
```
rake dev:start
```
## III. Cấu hình Nginx 
Về nginx thì các bạn có thể cài đặt và cấu hình chung cho nó tại [đây](https://www.cyberciti.biz/faq/install-and-configure-nginx-on-ubuntu-linux-18-04-lts/)
Còn về project:
bạn tạo một file config tại site-enabled của nginx
```
sudo nano /etc/nginx/sites-enabled/angular_rails.conf
```
còn nội dung thì như sau:
```
upstream angular_rails {
  server 127.0.0.1:3333;
}

server {
  listen 80;
  listen [::]:80;
  server_name demo_angular.local;
  root %{path}/angular-rails/dist;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_pass http://angular_rails;
  } 
  
  error_page 500 502 503 504 /500.html;
  client_max_body_size 4G;
  keepalive_timeout 10;
}
```
Bạn để ý rằng là ở trên phần file task khởi tạo serve phía trên thì mình có chạy `rails s -p 3333` thì ở dưới phần config nginx này mình cũng phải để cổng upstream là 3333 để nó map với nhau. Cofn về `%{path}` thì các bạn copy thư mục gốc của các bạn rồi ghi đè vào đó. Một lưu ý cho config này nữa là mình có 2 cái location. Cái đầu tiên là `/` thì mình cho trỏ đến thư mục dist của angular vì đó là thư mục mà nó build toàn bộ project vào đó, các bạn có để ý rằng là cứ save cái gì thì nó đều run một đoạn tương tự là:
```
Date: 2020-01-14T04:09:49.292Z - Hash: ec147281d0465c21a485
5 unchanged chunks
chunk {main} main.js, main.js.map (main) 67.5 kB [initial] [rendered]
Time: 97ms

Date: 2020-01-14T04:10:02.402Z - Hash: f08a816f8e50de090a50
5 unchanged chunks
chunk {main} main.js, main.js.map (main) 67.7 kB [initial] [rendered]
Time: 100ms
```
và cái location thứ 2 là `/api` nghĩa là router vào map với cái `/api` vi dụ như (`/api/v1/books`, `/api/v2/books`) thì nó sẽ vào cái location này và trỏ đến rails project. Config xong nginx serve thì chúng ta config host:
```
sudo nano /etc/hosts
```
và điền host:
```
...
127.0.0.1 demo_angular.local
```
`demo_angular.local` là phần `server_name` đã điền vào config phía trên.

Vậy là cơ bản đã xong. Bạn hãy chạy `rake dev:start` và truy cập vào `demo_angular.local` thôi. :). Ở phần tiếp theo, mình sẽ viết 1 bài về api trong rails để gọi ở angular.

**Tham khảo thêm**: https://angular.io

**Github:** https://github.com/TranHaiQuan/angular-rails

#### Happy new year! :fireworks::fireworks::fireworks::fireworks::fireworks::fireworks: