Chuyện là gần đây Gitlab có bản Security Release mới, trong đó có một lỗi **Arbitrary file read via group import feature**	khá là thú vị, ảnh hưởng đến tất cả các phiên bản GitLab CE/EE có đầu là 14.5 trở lên nên mình cùng với anh @vigov5 đã thử setup lên research bug này xem sao :D. Bạn đọc có thể đọc thêm thông tin tại đây
https://about.gitlab.com/releases/2022/01/11/security-release-gitlab-14-6-2-released/#arbitrary-file-read-via-group-import-feature

Mình chưa setup debug Ruby on Rails bao giờ, nên đã mất 2 ngày trời setup. Viết lên đây vừa là chia sẻ cho bạn đọc cũng như là một nơi lưu trữ lỡ mình có lỗi ở đâu đó thì còn có cái vào đọc lại =))

# Setup
Để setup debug Ruby (cụ thể hơn thì là setup debug Gitlab) thì bạn cần khá là nhiều thứ và có nhiều cách để debug, mình đã thử được 2 cách debug khá ổn, nhưng trong bài này chắc là mình chỉ viết trọng tâm vào 1 cách thôi, các còn lại tương tự ấy mà :D. Đầu tiên các bạn cần: 
- Ruby Mine (mình chọn IDE này vì đồ của JetBrains debug lúc nào cũng ngon)
   https://www.jetbrains.com/ruby/
- Docker (Docker giúp cài đặt môi trường sạch sẽ, ít lỗi)
- Một máy tính cấu hình đủ khoẻ, Gitlab khá ngốn tài nguyên, còn với các project nhẹ nhàng khác thì cấu hình yếu chút cũng được
- Kiên trì kiên trì và kiên trì :(

> Một chiếc note nho nhỏ: Môi trường debug của mình hiện tại đang sử dụng là Windows, kết hợp kèm với WSL2 để chạy Linux, đối với Linux thì làm tương tự nhưng ít bước hơn Windows, các bạn có thể lược bỏ bước nếu muốn nhé.
## Setup env với docker
1. Clone repo https://gitlab.com/gitlab-org/gitlab-development-kit (Ở đây mình sử dụng gitlab-deveopment-kit vì chính Gitlab cũng bảo rằng mình cần dùng cái này để tránh gặp lỗi trong quá trình setup, do Gitlab có quá nhiều thành phần)
2. ```bash
    cd gitlab-development-kit
    docker build -t gdk:base .
    docker run -it --name gitlab gdk:base bash .
    ``` 
    Sử dụng câu lệnh trên để build một image env với ruby
3. Vào trong docker trên, chạy lệnh one line duy nhất để dựng môi trường hoàn chỉnh
    ```bash:~
    curl "https://gitlab.com/gitlab-org/gitlab-development-kit/-/raw/main/support/install" | bash
    ```
    Lệnh  này sẽ giúp các bạn cài môi trường Gitlab sạch sẽ, kiểu gì cũng xài được, nếu lỗi thì gõ lại cái lệnh đó là được, khi nào báo Success thì là ok
4. Mở một terminal khác gõ lệnh
    ```bash
    docker commit gitlab gdk:ready
    ```
    để lưu lại thành docker image, tiện sau này có sử dụng lại đỡ phải ngồi chờ build cái đống trên bước 3 (lâu phết đấy)
    ![image.png](https://images.viblo.asia/295506c1-53d0-4c71-a6bf-b3c28dba28ba.png)
    Sau khi lưu xong thì chúng ta sẽ có 1 cái image từ 2gb lên 12gb =)) 
5. ```bash
    docker run -it -p 3000:3000 -p 12345:12345 gdk:ready bash
    ```
    Truy cập vào trong docker image `gdk:ready` vừa mới lưu lại xong.
    Nếu ở phần này các bạn bị lỗi không mở được port 3000 thì bên dưới mình sẽ hướng dẫn cách fix nhé 
6. Bên trong docker vào thư mục gitlab-development-kit chạy
    ```bash:~/gitlab-development-kit
    gdk stop
    gdk start webpack gitlab-workhorse rails-background-jobs sshd praefect praefect-gitaly-0 redis postgresql
    ```
    Lệnh này sử dụng để khởi động các dịch vụ cần thiết của Gitlab

**Vậy là xong các bước dựng env, tiếp theo đến bước debug với RubyMine**
## Debug Gitlab với Ruby Mine
1. Cài đặt Ruby Mine lên Windows/Linux tuỳ ý (ở đây mình sử dụng Windows)
2. Cài đặt SDK Ruby cho Ruby Mine, ở đây mình sử dụng WSL2 để cài đặt cho nó đơn giản, bạn nào k thích dùng WSL2 thì có thể cài Ruby cho Windows tại https://rubyinstaller.org/downloads/
    Trên WSL2 gõ 
    ```bash
    sudo apt-get install rails
    ```
    là được, chờ xíu là xong, ở đây mình đang sử dụng base kali-linux
3. Tại Ruby Mine, vào File -> Settings -> Search `Ruby SDK and Gems`
    Ở thư mục gitlab chọn dấu + -> New remote ... rồi làm như hình là xong
    ![image.png](https://images.viblo.asia/0c8b8c2a-371b-456b-9019-ee76e33e2be6.png)
    Ruby Mine có hỗ trợ rất nhiều kiểu SDK, từ local tới remote, rất là tiện 👍
4. Clone repo gitlab trên máy local
    ```bash:~
    git clone https://gitlab.com/gitlab-org/gitlab
    ```
    Ở đây mình clone trên WSL2 luôn
    ```bash:~/gitlab
    git checkout v14.6.1-ee
    ```
    để về version bị lỗi
    > Chú ý, trên Docker các bạn cũng checkout về nhánh này để chạy code version này nhé.
5. Tiếp tục vào Run -> Edit configurations 
    ![image.png](https://images.viblo.asia/b8af24cb-74ee-46b0-8820-502e4814fac8.png)
    Các bạn cài đặt như hình là xong. Phần remote port để là 12345 do nãy mình có map port docker 12345 ra ngoài rồi. Phần remote root folder thì giống như hình còn phần local root folder thì để đường dẫn là thư mục gitlab trên máy các bạn.  
    Phần localport 26162 là dispatcher-port, sử dụng để connect multi-process debugging, tuy nhiên mình đang không sử dụng được port này, giao diện thì cứ bắt điền nên cứ điền vậy, phần bước 6 mình bỏ nó ra khỏi command khởi chạy server là được.
6. Trên container docker gõ 
    ```bash
    gem install ruby-debug-ide
    ```
    Để cài package debug với IDE, sau đó chạy 
    ```bash:~/gitlab-development-kit/gitlab$
    rdebug-ide --host 0.0.0.0 --port 12345 -- bin/rails s -b 0.0.0.0
    ```
    Lúc này trên container docker sẽ chờ tín hiệu nhận debug từ Ruby Mine, ấn nút Debug hoặc Shift + F9 để connect, lúc này Ruby Mine sẽ kết nối với Server thông qua port 12345 để debug, sau đó chờ server start lên là được  
    ![image.png](https://images.viblo.asia/49b872d6-f564-4938-8752-2ba2de9173e5.png)
    Trên máy local truy cập vào http://localhost:3000 xem có vào được Gitlab chưa, nếu vào được thì là ok :D 
    ![image.png](https://images.viblo.asia/687c4fdb-72d6-4d87-ac8d-9536f41c0f69.png)
    Đăng nhập thử với pass mặc định `root / 5iveL!fe`
7. Tuy nhiên các bạn sẽ gặp vấn đề là k debug được, do default Gitlab chạy có nhiều Worker, cần phải tắt Worker đi để cho nó chạy Single thôi là có thể debug được (cảm ơn anh @vigov5 rất nhiều vì cái này)
    ```bash:~/gitlab-development-kit/gitlab
    vim config/puma.rb
    ```
    ![image.png](https://images.viblo.asia/02f577b9-5d6d-40e1-ac1a-d307b4c96662.png)
    Lặp lại bước 6 là có thể debug được gòi :D 
    ![image.png](https://images.viblo.asia/dfb62f16-ed10-4bce-bc46-07b33120502a.png)

# Kết
Trên đây là một cách debug webapp Ruby sử dụng Ruby Mine, cũng có thể sử dụng VSCode debug cũng được, nhưng cá nhân mình thích Ruby Mine hơn vì tính tiện dụng của nó, thay vì docker các bạn cũng có thể sử dụng WSL2 hay cài đặt trực tiếp lên Windows nhưng mà nó có khá nhiều lỗi + Gitlab là một project khá lớn cần cài đặt các thành phần bổ trợ khá nhiều nên mình thấy cách trên có vẻ tối ưu nhất, các project khác các bạn có thể làm tương tự 

### Extend
Lúc setup debug mình có gặp một lỗi liên quan đến Windows, nó không cho phép mình mở port 3000 map từ Docker ra ngoài, hoá ra là nó bị `excludedport`, cách fix như sau
```bash
netsh interface ipv4 show excludedportrange protocol=tcp
```
Sử dụng lệnh này để check xem mình có đang bị Exclusion port nào k, nếu port mình đang muốn mở ở trong khoảng start port - end port thì cần xoá nó đi

Mở powershell quyền Administrator lên
```bash
net stop winnat
netsh interface ipv4 delete excludedportrange protocol=tcp startport=2972 numberofports=100
net start winnat
```
Với startport và numberofport các bạn tự định nghĩa nhé. 

Bạn nào bị lỗi migrate db thì làm theo như này nha
```bash
gdk@5a16e8ed2f0c:~/gitlab-development-kit/gitlab$ rake db:drop
Dropped database 'gitlabhq_development'
Dropped database 'gitlabhq_test'
gdk@5a16e8ed2f0c:~/gitlab-development-kit/gitlab$ rake db:create
Created database 'gitlabhq_development'
Created database 'gitlabhq_test'
gdk@5a16e8ed2f0c:~/gitlab-development-kit/gitlab$ rake db:migrate
gdk@5a16e8ed2f0c:~/gitlab-development-kit/gitlab$ rake db:seed:replant
gdk@5a16e8ed2f0c:~/gitlab-development-kit/gitlab$ rake db:seed_fu
```
See you ở bài phân tích mình nêu ngay đầu nheeeeeee

## Ref
- https://medium.com/@Bartleby/ports-are-not-available-listen-tcp-0-0-0-0-3000-165892441b9d
- https://gitlab.com/gitlab-org/gitlab
- https://gitlab.com/gitlab-org/gitlab-development-kit
- https://www.jetbrains.com/ruby/