## Development Environment
Môi trường phát triển thì tùy vào thói quen của từng developer có thể tùy chỉnh khác nhau. Nhưng nói chung thì được chia thành 2 môi trường là: môi trường sử dụng Text editor & command line; và IDE (Integrated Development Environment) - môi trường phát triển tích hợp.
Trong bài này mình sẽ tiếp tục bằng việc sử dụng **Cloud9** là một cloud IDE service khá tuyệt vời.
Ở cloud IDE này thì còn có kết hợp 3 thành phần ko thể thiếu trong phát triển WEB là: Text Editor, File navigator, Command Line Terminal.
### Các bước để sử dụng cloud development environment
1. [Đăng ký account Cloud 9](https://c9.io/web/sign-up/free) . Để phòng tránh lạm dụng thì có cần phải điền thông tin credit card nhưng workspace của Rails tutorial là hoàn toàn free nên bạn hãy yên tâm nhé.
2. Click「DASHBOARD」.
3. Chọn「Create a new workspace」.
4. Như hình bên dưới, nhập tên của workspace (VD mình đặt là rails-study), chọn 「Private」, chọn icon 「Rails Tutorial」
 ![](https://images.viblo.asia/d32a438a-c151-4797-95a2-a785896ac911.png)
5. Click「Create workspace」
6. Hoàn thành setting workspace trên Cloud9
![](https://images.viblo.asia/65d75c16-a8a4-424d-81c6-3c9301d641ba.png)
Trong Ruby thì indent chuẩn chung là sử dụng 2 spaces nên bạn hãy thay đổi setting mặc định từ 4 thành 2 spaces nhé. Để thay đổi setting thì bạn click vào icon bánh răng cưa, chọn「Code Editor (Ace)」, rồi chỉnh giá trị setting 「Soft Tabs」. 
![](https://images.viblo.asia/a0190375-c7f5-4a9a-9e7a-6d7c0412c800.png)
### Cài Rails
Trong Development Environment ở trên thì đã bao gồm các phần mềm cần thiết nhưng chưa có Rails. Cài đặt Rails thì sử dụng lệnh `gem`. Trên Cloud IDE thì bạn hãy input lệnh này vào vùng  Command Line. Chỉ định version sau -v
```
$ gem install rails -v 5.1.2
```
![](https://images.viblo.asia/3e5b5dbb-f330-40e3-a8f1-905b3a77b788.png)

## Tạo ứng dụng
Các bước để khởi tạo ứng dụng Rails thì về cơ bản là giống nhau. Tạo bằng lệnh `rails new`.
### Bảng tóm tắt các lệnh Unix chính
| Giải thích | Command | Ví dụ|
| -------- | -------- | -------- |
| Hiển thị nội dung thư mục | ls | $ ls -l |
| Tạo thư mục | mkdir <Tên thư mục> | mkdir workspace |
| Di chuyển thư mục | cd<Tên thư mục> | $ cd workspace/ |
| Di chuyển đến thư mục trên |  | $ cd ..|
| Di chuyển đến thư mục gốc |  | $ cd ~ hoặc $ cd |
| Di chuyển đến workspace trong thư mục gốc |  | $ cd ~/workspace/|
| Di chuyển và đổi tên tập tin | mv <nguồn di chuyển> <đích di chuyển>	 <br>mv <tên hiện tại> <tên sau thay đổi> </br>| $ mv from to|
| Sao chép tập tin | cp <nguồn sao chép> <đích sao chép> | $ cp old new |
| Xóa tập tin | rm <tên tập tin> | $ rm old |
| Xóa thư mục rỗng |rmdir <tên thư mục>  | $ rmdir workspace/|
| Xóa thư mục có nội dung bên trong  | rm -rf <tên thư mục>|$ rm -rf tmp/|
| Kết hợp và hiển thị nội dung của tập tin | cat <tên tập tin> | $ cat ~/.ssh/id_rsa.pub |

### Bảng tóm tắt cấu trúc thư mục Rails mặc định
| Thư mục | Sử dụng | 
| -------- | -------- | 
| app/ | Bao gồm Model, view, controller, helper, etc | 
| app/assets | Các asset như là CSS, tập tin JavaScript, ảnh, etc... sử dụng trong app| 
| bin/ |tập tin thực thi nhị phân (binary) | 
| bin/rails | Rails script sử dụng để tạo code, khởi động console, khởi lập Web server của local, etc... | 
| config/ | setting của app  | 
| db/ | tập tin liên quan database  | 
|doc/ | hướng dẫn, tài liệu của app  | 
| lib/ | Library module  | 
|lib/assets |  Các asset như là CSS, tập tin JavaScript, ảnh, etc... sử dụng trong thư viện. | 
| log/ |  log file của app | 
|public/  | trang lỗi, dữ liệu puplic trực tiếp trên trình duyệt, etc..  | 
|test/ | test ứng dụng | 
|tmp/ |tập tin tạm thời  | 
|vendor/ |Plug-in của bên thứ 3, gem, etc | 
|vendor/assets | Các asset như là CSS, tập tin JavaScript, ảnh, etc...sử dụng trong Plug-in của bên thứ 3 và gem | 
|README.md | Mô tả ngắn gọn về app | 
|Rakefile | Task có thể sử dụng bằng lệnh rake | 
|Gemfile | File định nghĩa của Gem cần thiết trong app này | 
|Gemfile.lock | list để confirm version của gem đưucj sử dụng trong app| 
|config.ru | Tập tin cấu hình cho Rack middleware | 
|.gitignore | Pattern để chỉ định tập tin không import vào Git  | 
### Bundler
Sau khi tạo mới Rails app thì tiếp theo chạy `Bundler` thì sẽ cài đặt gem cần thiết trong app. `Bundler` thì được chạy tự động bởi rails.
Confirm nội dung Gemfile.
![](https://images.viblo.asia/08d88d11-50c6-4f11-96ca-f71e26afdf08.png)
Ví dụ bên dưới là Gemfile đã chỉ định rõ version của từng gem
```
source 'https://rubygems.org'

gem 'rails',        '5.1.2'
gem 'sqlite3',      '1.3.13'
gem 'puma',         '3.9.1'
gem 'sass-rails',   '5.0.6'
gem 'uglifier',     '3.2.0'
gem 'coffee-rails', '4.2.2'
gem 'jquery-rails', '4.3.1'
gem 'turbolinks',   '5.0.1'
gem 'jbuilder',     '2.6.4'

group :development, :test do
  gem 'byebug', '9.0.6', platform: :mri
end

group :development do
  gem 'web-console',           '3.5.1'
  gem 'listen',                '3.0.8'
  gem 'spring',                '2.0.2'
  gem 'spring-watcher-listen', '2.0.1'
end

#Trên môi trường Windows thì cần thiết bao gồm gem tzinfo-data
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
```
※Sau khi thay đổi version, add thêm gem, chạy lệnh `bundle update` thì sẽ được đồng bộ version theo.
### Rails server
Bên dưới là command khởi động app tương ứng với từng môi trường hiện tại:
**Môi trường local**
Chỉ cần chạy lệnh `rails server`
※[Refer bài trước](https://viblo.asia/p/ruby-cai-dat-ruby-on-railstao-du-an-dau-tien-Eb85oEdmZ2G#khoi-dong-server-7)
Confirm trên trình duyệt: http://localhost:3000/
**Môi trường Cloud9**
Cần thiết chỉ định IP Binding address và số port. Giá trị này là được sử dụng để truy cập vào Rails server từ phía ngoài cloud (Trên Cloud 9 thì sữ dụng biến đặc biệt 「$IP」và「$PORT」để cấp động IP addess và port. Có thể confirm được giá trị bằng việc input `echo $IP` hoặc `echo $PORT` ở command line).
```
$ rails server -b $IP -p $PORT`
```
![](https://images.viblo.asia/6f0ab4b4-b9e5-4600-ad49-8b07132aa597.png)
Để close server thì nhấn Ctrl+C.
Trong khi server đang chạy nếu bạn muốn thực hiện lệnh khác thì hãy mở 1 tab terminal khác. (Click và dấu + trên vùng terminal, chọn New Terminal hoặc nhấn tổ hợp phím Alt+T).
Share và confirm trên trình duyệt.
![](https://images.viblo.asia/30565ae0-bf5a-4fab-b29a-856fff12be43.png)
## Quản lý version bằng Git
Sau khi đã hoàn thành Rails app thì hãy quản lý version source code của app. Không phải là nếu không làm thế thì app sẽ không chạy được nhưng hầu hết Rails developer nghĩ rằng quản lý version là điều cần thiết không thể thiếu trong phát triển web. Ngoài ra, khi bạn quản lý version thì bạn có thể theo dõi lịch sử của code của project, có thể rollback lại file đã vô tình xóa nhầm.
Có rất nhiều hệ thống quản lý version, nhưng trong cộng đồng Rails thì hệ thống quản lý phiên bản phân tán Git được phát triển bởi Linus Torvalds cho Linux kernel đã trở thành xu hướng chủ đạo. Chi tiết về Git thì có thể tìm hiểu qua  [Learn Enough Git to Be Dangerous](https://www.learnenough.com/git-tutorial) là bản tiếng Anh, hoặc [Pro Git](https://git-scm.com/book/ja/v2) là bản tiếng Nhật.
### Set up
Trên môi trường Cloud IDE thì mặc định Git đã được đưa vào rồi nên không cần phải add thêm nữa.
Bạn có thể kiểm tra git đã tồn tại chưa bằng lệnh `which git`. 
Nếu vì lý do gì đó mà nó trống (chưa có) thì bạn có thể làm theo hướng dẫn ở [Getting Started – Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
Setting trong **git config**
Sau khi install, trước khi sử dụng project đầu tiên thì chúng ta cần làm một vài bước setting. Cái này gọi là system setup, mỗi 1 máy computer thì chỉ làm 1 lần.
```
$ git config --global user.name "Your Name"
$ git config --global user.email your.email@example.com
```
Lưu ý là tên và mail setting trong  **git config** này thì, sau này được công khai trên Repository.
Setup với **git init**
Lần này, mình sẽ thực hiện các bước cần thiết tạo cho mỗi Repository (viết tắt là repo). Trước tiên, di chuyển đến thư mục root của app rồi khởi tạo repo mới.
```
$ git init
```
Tiếp theo, chạy lệnh ` git add -A` thì sẽ add các file của project vào repo.
```
$ git add -A
```
Khi chạy lệnh này thì sẽ add toàn bộ các file có trong thư mục hiện tại. Tuy nhiên, nếu khớp với tên file ở pattern được mô tả trong `.gitignore` thì sẽ không add file đó vào. File `.gitignore` thì được tự động sinh ra khi chạy lệnh `rails new`.
Khi add file của project vào Git thì, đầu tiên sẽ đặt ở repository loại chế độ chờ Staging, chờ commit để an toàn. Để biết trạng thái của staging thì sử dụng lệnh `git status`.
```
$ git status
```
Để phản ánh ở repo thực sự những thay đối đang chờ ở vùng staging thì sử dụng lệnh `git commit`.
```
$ git commit -m "Initialize repository"
```
Sử dụng flag -m thì bạn có thể chỉ thị trực tiếp commit massage ở command line. Nếu không dùng flag -m thì sẽ mở ra editor mặc định của hệ thống, ở đó bạn có thể input commit massage vào.
Bạn có thể tham chiếu lịch sử của commit message bằng lệnh `log`.
Nếu có log quá dài thì bạn có thể kết thúc bằng key `q`.
### Lợi ích của Git
Như đã giới thiệu ở trên là khi sử dụng Git để quản lý version thì bạn có thể phục hồi lại file đã bị xóa nhầm.
Ví dụ, bạn hãy xóa thư mục `app/controllers/`
```
$ ls app/controllers/
application_controller.rb  concerns/
$ rm -rf app/controllers/
$ ls app/controllers/
ls: app/controllers/: No such file or directory
```
Ở đây, bằng lệnh ls sẽ hiển thị nội dung bên trong thư mục app/controllers/. Sau đó, lệnh rm -rf sẽ xóa thư mục và toàn bộ các file có trong thư mục đó.
Confirm lại trạng thái hiện tại
```
$ git status
On branch master
Changed but not updated:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

      deleted:    app/controllers/application_controller.rb

no changes added to commit (use "git add" and/or "git commit -a")
```
File đã bị xóa nhưng sự thay đổi này chỉ ở trong Working tree hiện tại nên vẫn chưa commit. Nghĩa là, Nếu bạn check out bằng lệnh `checkout` commit lần trước về thì bạn có thể back lại trạng thái trước khi xóa.
```
$ git checkout -f
$ git status
# On branch master
nothing to commit (working directory clean)
$ ls app/controllers/
application_controller.rb  concerns/
```
Thư mục và file đã xóa đã có thể phục hồi lại.
### Bitbucket
Bitbucket là một trang dành riêng cho việc lưu trữ và chia sẻ repository của Git. Có 2 lý do để push repo vào Bitbucket. Thứ nhất là tạo backup hoàn chỉnh của source code. Thứ hai là dễ dàng cộng tác với các developer khác.
1. Nếu bạn chưa có account Bitbucket thì hayc [tạo account](https://bitbucket.org/account/signup/)
2. Copy puplic key vào Clipboard. Nếu đang sử dụng cloud IDE thì bằng lệnh `cat `thì có thể hiển thị puplic key nên hãy chọn nó và copy. Trường hợp không dùng cloud IDE, nếu dùng lệnh này mà không hiển thị giống vậy thì hãy tham khảo thêm [phương pháp install puplic key vào account Bitbucket](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html)
```
$ cat ~/.ssh/id_rsa.pub
```
3. Add puplic key vào Bitbucket. Click vào ảnh đại diện chọn [Bitbucket settings] rồi chọn [SSH keys] như hình bên dưới.
![](https://images.viblo.asia/1061bd32-e2ac-4b05-8158-81304e90d319.png)  ![](https://images.viblo.asia/661efc33-6a68-4f30-bb6f-5e44eb7370e8.png)
4. Tạo repository của app đầu tiên trên Bitbucket. Nhấn [Create new repository] rồi điền thông tin tạo repo như hình bên dưới.
![](https://images.viblo.asia/c8b3557c-51dd-4227-9290-67e27a914b7b.png)
5. Add và push repository lên Bitbucket. 
Trỏ đến path của repo
```
$ cd ~workspace/hello_app/.git/
```
```
$ git remote add origin git@bitbucket.org:<username>/hello_app.git
$ git push -u origin --all
```
Lệnh đầu tiên là để add Bitbucket với repo là `origin` vào file setting của Git. Lệnh tiếp theo là push repo của local vào origin của remote.
※Hãy đền tên user thực tế thay vào chổ <username>
Sau khi chạy lệnh trên thì page repository của hello_app đã được tạo ra trong Bitbucket. Trên rang này, bạn có thể confirm file, có thể sử dụng các chức năng toàn bộ lịch sử commit.
![](https://images.viblo.asia/72b147f6-1fd2-4f02-9a5f-b1278ba6a643.png)

### Branch, Edit, Commit, Merge, Push
**Branch**
Git thì có thể tạo branch rất dễ dàng và nhanh chóng. Branch cơ bản là bản sao của repository, trên branch bạn có thể viết code mới, tự do update và test thử mà không chạm vào file gốc. Thông thường, repository cha gọi là `master` branch, topic branch (branch tạm thời chỉ dùng trong thời gian ngắn) thì sử dụng `checkout` và flag` -b` có thể tạo thành.
```
$ git checkout -b modify-README
Switched to a new branch 'modify-README'
$ git branch
  master
* modify-README
```
Lệnh `git branch` thì hiển thị danh sách toàn bộ local branch. 「* 」là thể hiện branch đó hiện tại đang sử dụng. Lưu ý là lệnh ở trên `git checkout -b modify-README` thực hiện đồng thời tạo branch mới và chuyển sang branch đó. Có gắn 「* 」 ở  branch `modify-README` thể hiện hiện tại đang sử dụng branch này.
Giá trị thực của branch thì được phát huy khi làm việc chung với developer khác nhưng ngay cả khi làm việc 1 mình thì nó cũng rất hữu dụng. `master` branch thì không bị ảnh hưởng bởi những thay đổi ở topic branch nên, dù cho code trên branch dù có bị sai thì nếu checkout master branch rồi xóa topic branch thì lúc nào cũng có thể hủy bỏ việc thay đổi. （※Bình thường thì cũng không cần thiết phải tạo branch cho những thay đổi nhỏ.）.
**Edit**
Sau khi tạo topic branch, chúng ta hãy add thêm nội dung tùy ý thay đổi file README.
```
# Ruby on Rails Study

## "hello, world!"

This is the first application for the
Ruby_Cloud development environment (Cloud9)
Hello, world!
```
**Commit**
Sau khi thay đổi xong thì hãy confirm trạng thái của branch
```
$ git status
On branch modify-README
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```
Đến thời điểm này cũng có thể chạy lệnh `git add -A` như đã giới thiệu ở phần trên nhưng cũng có  flag` -a` ở lệnh `git commit` sẽ commit đồng loạt thay đổi trong tất cả các file đang tồn tại. Flag này được sử dụng rất nhiều.
```
$ git commit -a -m "Improve the README file"
[modify-README 336f598] Improve the README file
 1 file changed, 8 insertions(+)
```
Flag -a thì hãy xử lý thận trọng. Trường hợp add thêm file mới sau lần commit cuối cùng thì trước tiên hãy chạy lệnh `git add` và cần thiết quản lý version.
**Merge**
Vì đã hoàn thành thay đổi nên sẽ merge những thay đổi này vào master branch.
```
$ git checkout master
Switched to branch 'master'
Your branch is up-to-date with 'origin/master'.
$ git merge modify-README
Updating 1c01aef..336f598
Fast-forward
 README.md | 8 ++++++++
 1 file changed, 8 insertions(+)
```
Sau khi merge thì có thể xóa topic branch bằng lệnh `git branch -d`
```
$ git branch -d modify-README
```
Bạn cũng có thể hủy bỏ phần thay đổi trên topic branch bằng lệnh `git branch -D`
```
$ git checkout -b topic-branch
$ <File đã tạo, đã edit, đã xóa...>
$ git add -A
$ git commit -a -m "Make major mistake"
$ git checkout master
$ git branch -D topic-branch
```
※Chú ý là flag -d và -D là khác nhau nhé. 
**Push**
Bây giờ chúng ta hãy thử push thay đổi trên Bitbucket và xem kết quả nhé. Chỉ cần chạy lệnh `git push` có thể lược bỏ `origin master`.
```
$ git push
```
Confirm nội dung đã thay đổi trong file README của Bitbucket cũng đã được đồng bộ theo.
![](https://images.viblo.asia/fab749a0-3636-403d-8e0c-1459fa102273.png)
## Deploy
Deploy product của Rails app là một việc phức tạp nhưng những năm gần đây đã có thể thực hiện đơn giản nhanh chóng, đã có thể lựa chọn môi trường product khác nhau. Mình sẽ bắt đầu deploy bằng Heroku- là một Hosting platform cho các ứng dụng Ruby Web có bao gồm Rails. Heroku thì nếu bạn sử dụng Git để quản lý version của source code thì có thể deploy Rails app dễ dàng.
### Setup Heroku
1. Heroku thì sử dụng database [PostgreSQL](https://www.postgresql.org/). Vì thế, hãy install `pg` gem trong môi trường thực (production) để Rails có thể truyền tin với PostgreSQL.
```
group :production do
  gem 'pg', '0.20.0'
end
```
Cuối cùng, Gemfile thành như bên dưới
```
source 'https://rubygems.org'

gem 'rails',        '5.1.2'
gem 'puma',         '3.9.1'
gem 'sass-rails',   '5.0.6'
gem 'uglifier',     '3.2.0'
gem 'coffee-rails', '4.2.2'
gem 'jquery-rails', '4.3.1'
gem 'turbolinks',   '5.0.1'
gem 'jbuilder',     '2.7.0'

group :development, :test do
  gem 'sqlite3', '1.3.13'
  gem 'byebug',  '9.0.6', platform: :mri
end

group :development do
  gem 'web-console',           '3.5.1'
  gem 'listen',                '3.0.8'
  gem 'spring',                '2.0.2'
  gem 'spring-watcher-listen', '2.0.1'
end

group :production do
  gem 'pg', '0.20.0'
end

#Trên môi trường Windows thì cần thiết bao gồm gem tzinfo-data
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
```
Để không install gem của môi trường production (pg gem) vào môi trường local thì hãy add thêm flag đặc biệt 「`--without production`」vào lệnh `bundle install`.
```
$ bundle install --without production
```
Bây giờ chạy lệnh này là cập nhật `Gemfile.lock` chuẩn bị cho deploy lên production sau này, vì cần phản ánh trong `Gemfile.lock` chỉ định version của pg gem và Ruby. Cuối cùng, chạy lệnh tiếp theo để commit thay đổi.
```
$ git commit -a -m "Update Gemfile for Heroku"
```
2. [Tạo account của Heroku](https://signup.heroku.com/). Tiếp theo, kiểm tra xem Heroku đã install trong hệ thống của mình hay chưa.
```
$ heroku version
heroku-cli/6.14.4-d011db2 (linux-x64) node-v8.4.0
```
Nếu bạn sử dụng cloud IDE thì bạn sẽ thấy hiển thị kết quả version của Heroku và có thể sử dụng heroku CLI như trên.
Nếu bạn không dùng cloud IDE thì bạn cần install nó. (tham khảo [hướng dẫn](https://devcenter.heroku.com/articles/heroku-cli) )
3.Sau khi confirm Heroku CLI (command line interface) đã được cài thì hãy login rồi add SSH key vào.
```
$ heroku login
Enter your Heroku credentials:
Email: 1988tinhtt@gmail.com
Password: *******************
Logged in as 1988tinhtt@gmail.com
$ heroku keys:add
Found an SSH public key at /home/ubuntu/.ssh/id_rsa.pub
? Would you like to upload it to Heroku? Yes
Uploading /home/ubuntu/.ssh/id_rsa.pub SSH key... done
```
4. Cuối cùng, tạo nơi thực hiện sample app ở server Heroku bằng lệnh `heroku create`
```
$ heroku create
Creating app... done, ⬢ damp-wildwood-91853
https://damp-wildwood-91853.herokuapp.com/ | https://git.heroku.com/damp-wildwood-91853.git
```
Khi chạy lệnh Heroku này thì sub domain của app Rails chuyên dụng được tạo ra, ngay lập tức có thể hiển thị trên trình duyệt. Bây giờ thì chưa có gì nhưng hãy thử deploy và hiển thị page trên Web nhé.

### Deploy trên Heroku
Trước tiên, sử dụng Git push repository vào Heroku
```
$ git push heroku master
```
Sau khi deploy, bạn hãy confirm hiển thị trên trình duyệt địa chỉ đã được tạo ra khi thực hiện lệnh `heroku create` ở trên ( https://damp-wildwood-91853.herokuapp.com/). Nếu bạn không sử dụng cloud 9 mà thao tác trên computer local thì có thể hiển thị trên trình duyệt bằng lệnh `heroku open`.
![](https://images.viblo.asia/4197f7af-54d2-4298-8fca-e5098bf94b4d.png)
### Lệnh Heroku
Lệnh của heroku thì có nhiều, từ từ sử dụng thì sẽ nắm rõ hơn nhưng trước tiên ta hãy thử dùng lệnh đổi tên app.
```
$ heroku rename rails-tutorial-hello
```
Để có thể xem danh sách các lệnh của heroku thì bạn hãy gõ lệnh `heroku help`
## Kết luận
Trong bài này, mình đã hoàn thành các bước bao gồm cài đặt, setup môi trường phát triển, quản lý version, deploy môi trường production.