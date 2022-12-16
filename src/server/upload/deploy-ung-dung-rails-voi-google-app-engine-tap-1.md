Chao,
Xin chào các bạn, hôm nay mình sẽ viết bài đầu tiên về hướng dẫn deploy ứng dụng-cụ thể là ứng dụng Ruby on Rails bằng Google Cloud Engine. Bắt đầu nhé
# Giới thiệu chung
Hiện nay ngoài AWS thì GAE(Google app engine) cũng là một công cụ hổ trợ server rất tốt cho việc deploy những dự án mà các bạn đang phát triển. Và cơ duyên trong dự án đã giúp mình tìm tòi được một chút kiến thức để chia sẽ với các bạn.

Nhìn chung, con GAE này nó dễ ăn hơn nhiều so với con AWS. Với tôn chỉ "Hạ tầng tụi tao lo, tụi mày lo phát triển" của bọn Google thì việc deploy một ứng dụng trở nên dễ dàng hơn rất nhiều cho các bạn developer, đặc biệt là với những bạn chưa có kinh nghiệm nhiều trong việc build môi trường server như mình.

# Đăng ký tài khoản Google Cloud
Bước đăng ký này mình sẽ không đi trong bài giới thiệu mọi người nhé. Vì nó cũng chỉ là bước tạo account để tiếp tục thao tác trên hệ thống của nó thôi. Chúng ta sẽ bắt đầu với những thứ khác vui hơn (go)

# Các cách thức để deploy ứng dụng lên GAE
Cái này mình thấy tiện cực kì nè. 
## Sử dụng CloudShell cuả Google Cloud
Google cloud hổ trợ cho mình một tool editor gọi là CloudShell-nó giống với terminal của Linux ấy. Ở đây bạn có thể clone project từ Git để tiếp tục cài đặt và deploy nó lên server

## Sử dụng SDK để deploy ngay tại máy tính cá nhân của bạn
Xin lỗi khi mình không nhớ được SDK là gì và cũng lười search lại quá :D. Nhưng hình dung tương đối thì nó là một phương thức connect từ server đến máy tính cá nhân của bạn. Ví dụ như bạn đang xài Linux(Hầu như ruby dev đều đang xài Linux or Mac) thì nó sẽ hiểu terminal của máy tính cá nhân bạn như là một CloudShell. Bạn có thể thực hiện các command line của Google trên đấy để hổ trợ việc deploy ứng dung.

Mình sẽ hướng dẫn cách từng cách deploy một trong phần sau nhé ;)


# Deploy bằng CloudShell
## KHỞI ĐỘNG CLOUDSHELL
Sau khi đăng ký vào tài khoản Google cloud, khởi tạo một App Engine, trên thanh top menu của ứng dụng, bạn sẽ thấy icon của Cloud Shell.
![](https://images.viblo.asia/9cdce81b-5631-4553-ac1f-6826fb735254.png)

Cái nút trắng trắng có dấu >_ chính là Cloud Shell đấy. Chúng ta click vào đó và Editor Cloud Shell sẽ mở ra.
### Bắt đầu nhanh với deploy một ứng dụng demo của google bằng Cloud Shell
![](https://images.viblo.asia/8bbd034e-e6da-4717-80d1-56195cb8816a.png)
Với những bạn lần đầu làm quen với Google cloud engine thì có thể thực hành trước với một demo của google cho việc deplopy ứng dụng

- Đầu tiên, lick vào nút LEARN để xổ ra các tutorial 

![](https://images.viblo.asia/8b29c1a3-aa15-4e85-848d-b8b514d00501.png)

Một list các tutorial sẽ được xổ ra. Nó giải quyết gần như hoàn toàn những thắc mắc bạn đầu của bạn và những demo cụ thể để bạn có thể sử dụng dịch vụ này.
- Bây giờ chúng ta sẽ chọn`App Engine Quickstart` để tiến hành deploy một ứng dụng demo Ruby được public trên repo git của google lên server.
Sau đấy bạn chọn ngôn ngữ để get app Hello World. Dĩ nhiên chúng ta sẽ chọn Ruby cho mục này.

- Ấn `Next` rồi chọn project của bạn và tiếp tục ấn `Next`

![](https://images.viblo.asia/a67be4e0-2143-4991-9474-e9eeec2252c6.png)


Đến đây thì bạn sẽ thấy google nó cung cấp cho chúng là 2 command git.
```
git clone \
    https://github.com/GoogleCloudPlatform/ruby-docs-samples
```

Dòng lệnh trên là lệnh clone một project public của google trên git

```
cd \
    ruby-docs-samples/appengine/hello_world
```


Dòng thứ hai là bạn trỏ đến đúng app engine Hello World mà mình sẽ deploy thử.

Và 2 command line này mình sẽ chạy trên Cloud Shell.
 
 
- Ấn `Next` để đến các bước config trước khi deploy

Bạn lần lượt chạy các lệnh:

```
cat app.rb

cat app.yaml
```

app.rb là file chưa base code của bạn, còn app.yaml là file cấu hình của google. Ở đây sẽ lưu các thông số mà bạn muốn khai báo với google như bộ như server, số lượng instance... và các biến môi trường-ENV của ứng dụng(chúng ta sẽ gặp lại file .yaml này ở những phần sau).

- Chạy lệnh:
```
bunlde install

bundle exec ruby app.rb -p 8080
```

Trước khi deploy thì chúng ta cần kiểm tra trước những cài đặt và đảm bảo được con app của chúng ta đang chạy ngon lành với file app.rb. Nên sau khi chạy 2 lệnh trên thành công thì bạn đã có thể preview Web app bằng cách click vào `Web previrew`

![](https://images.viblo.asia/2e478311-f1e5-459d-9a2e-3c466a282b01.png)


- Ấn `Next` nếu không có ý kiến gì, và chúng ta sẽ đến phần kết của câu chuyện :D

![](https://images.viblo.asia/c9661185-f76a-4a49-87d0-a2226c160f16.png)


Bạn cần một nơi để deploy ứng dụng lên, gọi nó là region. Nên trước khi deploy thì bạn cần chạy lệnh
```
gcloud app create
```

để tạo rgion.

Và sau đó thì:

```
gcloud app deploy
```

để doploy ứng dụng đầu tiên lên app engine mà bạn đã tạo. XONG :v: 


Khi chạy trên Cloud Shell đến lệnh app deploy hoàn thành. Bạn sẽ có được url để xem kết quả trong log. 

Và đây chỉ là một ứng dụng demo đơn giản, còn với ứng dụng phát triển thực tế thì mọi thứ sẽ khó hơn nhiều. Và mình sẽ ưu tiên viết một bài về SDK với ứng dụng thực tế sau. 

Với hướng dẫn trên thì chúng ta vừa làm quen với Google Cloud Engine qua việc deploy một ứng dụng Ruby demo bằng Cloud Shell của Google. Trong những bài sau, mình xin hướng dẫn tới các bạn cách còn lại là dùng SDK để deploy ứng dụng, các cấu hình cần thiết, file yaml, custom domain, SSL trên Google Cloud và sử dụng storage để lưu trữ hình ảnh hiển thị trên production. Hy vọng vài chủ để này sẽ giúp ích ít nhiều cho các bạn. 
See u :v: