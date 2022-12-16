Với những người tiếp cận với framework rails thông qua quyển thánh kinh Railstutorial(https://www.railstutorial.org/book) hẳn đã quen với việc deploy rails app với heroku( Chapter 1: From zero to deploy) và sử dụng hệ quản trị cơ sở dữ liệu sqlite ở development và postgresql ở production. Tuy nhiên đối với cơ sở dữ liệu mysql thì sẽ cần phải config lại một vài chỗ mới có thể deploy trên heroku

# 1. Thiết lập môi trường phía local
Đầu tiên muốn deploy ứng dụng lên heroku chúng ta cần phải có 2 thứ khá quan trọng là `tài khoản heroku` và `code của ứng dụng`
### 1.1 Tài khoản heroku
Nếu chưa có tài khoản heroku thì tạo tài khoản tại địa chỉ:
>  https://www.heroku.com/

Đăng nhập với heroku sẽ tương tự như trong Chapter 1 của tutorial:  

> https://www.railstutorial.org/book/beginning

Tạo một app trên heroku với câu lệnh **heroku create**
Sau đó chúng ta sẽ nhận được đường link của ứng dụng và link git heroku
![](https://images.viblo.asia/e788342a-b53a-4207-8af4-4cb466a82bd7.png)


### 1.2 Thiết lập môi trường sử dụng hệ quản trị mysql ở phía development
Trước hết tạo một repo trên github.com và một project ở local
> rails new deploy_mysql -d mysql

![](https://images.viblo.asia/3bb5826d-5b62-458a-90f0-e9553e9a7785.png)

Config lại file config/database.yml để sử dụng mysql:
![](https://images.viblo.asia/4e77b597-2205-4f09-add0-326b86fdff4b.png)


> Cài đặt thêm **gem "mysql2", "~> 0.3.20"** vào Gemfile

Cuối cùng chúng ta tạo remote với link git của heroku như đã có được ở phần 1.1 với câu lệnh 
`git remote add heroku *link_git*` để có thể push code lên production

Như vậy chúng ta đã setup hoàn chỉnh cho việc sử dụng hệ quản trị mysql cho ứng dụng Rails

# 2. Thiết lập tài khoản heroku
### 2.1 Cài đặt nơi lưu trữ cơ sở dữ liệu
Do Heroku không hỗ trợ mysql như một lựa chọn mặc định, do đó chúng ta phải config và lựa chọn Data stores tại https://elements.heroku.com/addons
![](https://images.viblo.asia/5438ab48-f53d-4b1f-b0e3-86afe63a859e.png)

Tại đây chúng ta có hai lựa chọn (miễn phí) cung cấp MariaDB hoặc MySQL:

![](https://images.viblo.asia/7ec0f3a2-2707-4b49-9a07-b2b73ebf8852.png) 
![](https://images.viblo.asia/119c5ba5-847f-4008-aba4-4b63a189e142.png)

Trong ví dụ lần này mình sẽ chọn JawsDB MySQL
![](https://images.viblo.asia/21fd742a-ef9e-4712-9254-33bede1e06d6.png)

Click chọn button **Install JawsDB MySQL**

Tại đây chúng ta chọn plan mặc định là Kitefin Shared (Gói free) và add app đã tạo tương ứng vào (Trong ví dụ lần này app của mình đã tạo trong phần 1.1 có tên là fast-water-37314)
![](https://images.viblo.asia/20e8cefa-f0b4-419f-866d-a7a539ecfd22.png)

Tiếp đó lựa chọn **Provision add-on**

Với tài khoản chưa được verify bằng credit card sẽ xuất hiện thông báo 
![](https://images.viblo.asia/8b01fc20-2e4c-4118-a33c-6e3b1af18f39.png)

Truy cập https://heroku.com/verify để verify tài khoản với credit card. Tài khoản mình đã verify sẽ có dạng :

![](https://images.viblo.asia/9c7f22ad-17ae-4b23-8e69-3009a0bfff0c.png)

Sau khi update Credit Card và **Provision add-on** sẽ redirect đến màn hình chứa thông tin để setting cho JawsDB
![](https://images.viblo.asia/d24d55b8-9f91-4411-901e-2665e3f079db.png)

### 2.2 Deploy code lên production 
Trước hết tạo commit và push code hiện tại lên heroku

`git add .`

`git commit -m "deploy"`

`git push heroku *nhánh hiện tại*:master`

và như thế code mới nhất đã có trên repo heroku:
![](https://images.viblo.asia/dce30c2f-bccc-4ed0-aaff-4706921812a2.png)

### 2.3 Kết nối với hệ quản trị trên production 
Trước hết, để xem tất cả các biến cấu hình heroku sử dụng lệnh:

`heroku config`

Khi đó chúng ta sẽ thấy các biến như **JAWSDB_URL**, **RACK_ENV, LANG**, **RAILS_LOG_TO_STDOUT**,....

Các ứng dụng Ruby on Rails có thể sử dụng cơ sở dữ liệu được cấp phép bằng cách đặt lại biến môi trường DATABASE_URL của chúng với giá trị được giữ bởi JAWSDB_URL. Từ đó heroku có thể tự động tạo ra một file database.yml tương ứng giống như ở development. Những thao tác này ta có thể thao tác thông qua GUI ở phần Setting của app tương ứng trong https://dashboard.heroku.com/apps
Tuy nhiên ở đây mình sẽ setup bằng dòng lệnh (và theo mình thì nó khá đơn giản so với GUI):

* Lấy giá trị của JAWSDB_URL từ tài khoản heroku:

```
 heroku config:get JAWSDB_URL
```
![](https://images.viblo.asia/5a41b933-27d2-44a1-a06d-f535bed8504b.png)

* đặt tham số DATABASE_URL của bạn thành giá trị được trả về bởi lệnh trước đó.

> heroku config:set DATABASE_URL="mysql2://qzwqu13lmp9eycfl:fhidlw6xq2uxc1ri@nuskkyrsgmn5rw8c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/etfozt12vh9mbpgs"
> 


`LƯU Ý: Do sử dụng gem mysql2 nên đường dẫn set cho DATABSEURL sẽ set giá trị JAWSDBURL có chút thay đổi là chuyển từ mysql -> mysql2 `


* Cập nhật lại với câu lệnh
> bundle install
> 
* JawsDB bây giờ đã sẵn sàng để sử dụng với ứng dụng Rails .Giờ chúng ta chỉ cần thiết lập cơ sở dữ liệu bằng những câu lệnh đơn giản
> heroku run rake db:create db:migrate
> 

# 3. Kết luận
Do sự phổ biến của mysql, chúng ta có thể sử dụng ngay tại môi trường development cũng như production, và đối với rails, heroku là một môi trường miễn phí rất hấp dẫn, chúng ta có thể demo ứng dụng của mình hoàn toàn miễn phí trên heroku mà không nhất thiết phải sử dụng postgreSQL(hệ QTCSDL mặc định của heroku). Đối với bài viết này mình đã hướng dẫn cách setup đối với mySQL(một HQTCSDL khá phổ biến), chúc các bạn thành công 

# 4.Nguồn

https://devcenter.heroku.com/articles/jawsdb