# 1. Mở đầu
Trong các ứng dụng có nhiều **secrets** và **credentials** khác nhau mà chúng ta cần sử dụng như **API keys**, **secrets**,... Đối với những **secrets** đó, chúng ta cần quản lý **credentials** một cách thuận tiện và an toàn.

* Rails 5.1 đã thêm một tính năng sử dụng **secrets** để quản lý việc xác nhận thông tin đăng nhập.

* Rails 5.2 đã thay thế **secrets** bằng **credentials**, vì các **secrets** được mã hóa và không được mã hóa khiến việc quản lý chúng trở nên khó khăn hơn.

Một tập hợp các tệp đã được sử dụng để quản lý các **credential** này:

* config/credentials.yml.enc
* config/master.key

```config/credentials.yml.enc``` là một tệp được mã hóa lưu trữ các **credential**.

```config/master.key``` chứa ```RAILS_MASTER_KEY``` được sử dụng để giải mã ```config/credentials.yml.enc```. 

## 1.1 Tương tác với credentials

Như ```config/credentials.yml.enc``` được mã hóa, chúng ta không nên trực tiếp đọc hoặc ghi vào nó. Thay vào đó, sử dụng các tiện ích được cung cấp bởi Rails để **abstract encryption** và **decryption**

## 1.2 Add/Update credentials
Có thể edit **credential** bằng command như sau
```
$ EDITOR=vim rails credentials:edit
```
Câu lệnh này sẽ mở trình chỉnh sửa VIM với version được giải mã của tệp **credentials**.

Có thể thêm thông tin đăng nhập mới ở định dạng YAML như sau
```ruby
aws:
  access_key_id: 123
  secret_access_key: 345
github:
  app_id: 123
  app_secret: 345
secret_key_base: 
```

Khi lưu nó, nó sẽ mã hóa lại bằng chính master key.

Nếu editor mặc định không được đặt và chưa chỉ định editor, thì nhận được thông báo sau:

```ruby
$ rails credentials:edit
No $EDITOR to open file in. Assign one like this:

EDITOR="mate --wait" bin/rails credentials:edit

For editors that fork and exit immediately, it's important to pass a wait flag,
otherwise the credentials will be saved immediately with no chance to edit.
```

## 1.3 Đọc credentials bằng command

```ruby
> Rails.application.credentials.config
#=> {:aws=>{:access_key_id=>"123", :secret_access_key=>"345"}, :github=>{:app_id=>"123", :app_secret=>"345"}}
> Rails.application.credentials.github
#=> {:app_id=>"123", :app_secret=>"345"}
> Rails.application.credentials.github[:app_id]
#=> "123"
```

## 1.4 Quản lý multi environment credentials trước Rails 6
Không có hỗ trợ nào được build cho **multiple environment credentials** trước Rails 6. 

Có thể quản lý **credentials** cho các môi trường khác nhau nhưng tùy thuộc vào việc chỉ định rõ ràng **credentials** nào sẽ sử dụng cho một môi trường cụ thể.

Có thể lưu trữ **credentials** trong một tệp duy nhất như sau:
```ruby
development:
  aws:
    access_key_id: 123
    secret_access_key: 345

production:
  aws:
    access_key_id: *******-****-****-*****-*********
    secret_access_key: *******-****-****-*****-********* 
```

Thử lại bằng lệnh sau

```ruby
> Rails.application.credentials[Rails.env.to_sym][:aws][:access_key_id]
#=> "123"
```

Một số vấn đề xảy ra:

* Chỉ có 1 master key và mọi người trong nhóm phát triển đều có quyền truy cập vào nó. Điều đó có nghĩa là mọi người trong nhóm phát triển đều có quyền truy cập vào môi trường production.
* Cần chỉ định rõ ràng **environment credentials** nào sẽ sử dụng trong code.

# 2. Quản lý multi environment credentials với Rails 6
Rails 6 đã support cho **credentials** đa môi trường. Cung cấp tiện ích để dễ dàng tạo và sử dụng **credentials** trên môi trường cụ thể. Mỗi loại đều có **encryption keys** riêng.

## 2.1 Global Credentials
Những thay đổi được thêm vào trong PR trên là tương thích ngược. Nếu không có **credentials** cho môi trường cụ thể thì Rails sẽ sử dụng **credentials** chung và **master key** trong các tệp sau:

* config/credentials.yml.enc
* config/master.key

Chỉ sử dụng cấu hình chung cho môi trường **development** và **test** và chia sẻ ```config/master.key``` với toàn bộ nhóm.

## 2.2 Tạo credentials cho môi trường Production
Để tạo **credentials** cho môi trường **production**, có thể chạy lệnh sau:

```ruby
$ rails credentials:edit --environment production
```

Kết quả như sau

* Tạo ```config/credentials/production.key``` nếu thiếu. 
* Tạo ```config/credentials/production.yml.enc``` nếu thiếu.
* Decrypts và mở tệp **production credentials** trong editor mặc định.

Chia sẻ ```production.key``` với các thành viên có quyền truy cập để deploy production.

Thêm **credentials** như sau:

```ruby
aws:
  access_key_id: *******-****-****-*****-*********
  secret_access_key: *****************************
```

Tương tự, có thể tạo **credentials** cho các môi trường khác nhau như staging.

## 2.3 Sử dụng credentials trong Rails

Đối với bất kỳ môi trường nào, Rails sẽ tự động phát hiện **credentials** nào để sử dụng. **credentials** của môi trường cụ thể sẽ được ưu tiên hơn **global credentials**. 

Nếu có **credentials** của môi trường cụ thể thì sẽ được sử dụng nếu không Rails sẽ mặc định là **global credentials**.

Môi trường Development:
```ruby
$ rails c
> Rails.application.credentials.config
#=> {:aws=>{:access_key_id=>"123", :secret_access_key=>"345"} }}
> Rails.application.credentials.aws[:access_key_id]
#=> "123"
```

Môi trường Production:
```ruby
$ RAILS_ENV=production rails c
> Rails.application.credentials.config
#=> {:aws=>{:access_key_id=>"*******-****-****-*****-*********", :secret_access_key=>"***************************"}}
> Rails.application.credentials.aws[:access_key_id]
#=> "*******-****-****-*****-*********"
```

## 2.4 Lưu trữ encryption key qua environment variables
Có thể đặt giá trị của **encryption keys** trong biến môi trường cụ thể Rails sẽ tự động phát hiện và sử dụng nó.

Có thể sử dụng biến môi trường chung **RAILS_MASTER_KEY** hoặc biến môi trường cụ thể như **RAILS_PRODUCTION_KEY**

Nếu biến này được đặt thì không cần tạo file ```*.key```. Rails sẽ tự động phát hiện các biến này và sử dụng chúng để encrypt/decrypt cho file credential.

Ví dụ trên Heroku hoặc các nền tảng tương tự như sau:

```ruby
# Setting master key on Heroku 
heroku config:set RAILS_MASTER_KEY=`cat config/credentials/production.key`
```

**Cảm ơn các bạn đã theo dõi đến đây! Xin chào và hẹn gặp lại ^^!**

**Link tham khảo**: https://blog.saeloun.com/2019/10/10/rails-6-adds-support-for-multi-environment-credentials#interacting-with-credentials