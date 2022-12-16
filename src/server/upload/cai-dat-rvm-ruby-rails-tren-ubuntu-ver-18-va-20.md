Chào các bạn, mình đây. Chúng ta sẽ cùng cài đặt rails trên ubuntu 18. và 20. nhé :kissing_heart::kissing_heart::kissing_heart:

Đầu tiên, các bạn có thể hiểu rvm là nôm na là 1 thằng quản lý các phiên bản khác nhau của `ruby` và các `bundler`. Giúp cho các bạn dễ dàng thay đổi các phiên bản khi cần thiết. Tương tự như rvm chúng ta có 1 thằng khác tên là `rbenv`. Nhưng trong khuôn khổ bài viết này mình sẽ dùng `rvm` nhé.

Okayyy, triển thôi nào :sunglasses::sunglasses:


### RVM 

Các bạn có thể tham khảo tại trang chủ của rvm

[https://rvm.io/rvm/install](https://rvm.io/rvm/install)

Đầu tiên chúng ta cần cài đặt `gnupg2` mục đích để lấy private key của rvm ⇒ Xác định phiên bản chúng ta cài đặt nhé.

```bash
sudo apt install gnupg2
```

![](https://images.viblo.asia/87c67e05-90a1-48f8-99ec-b8838e46bda5.png)


Chúng ta cần 1 private key của rvm phát hành để xác định tính hợp lệ của phiên bản rvm được cài đặt

```bash
gpg2 --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
```

![](https://images.viblo.asia/472d79d6-bc2c-4170-a8b2-e533e542c374.png)

Ok ngon rồi, giờ chúng ta sẽ di chuyển vào 1 thư mục chúng ta có quyền ghi nhé, thường là **/tmp** để cài đặt

```bash
cd /tmp
```

Chúng ta cần **download rvm** bằng **curl**(Bạn nào chưa có curl thì cài đặt nó nha) về nhé

```bash
curl -sSL https://get.rvm.io -o rvm.sh
```

Sau khi download xong rvm về thì chúng ta bắt đầu cài đặt rvm như sau nhé

```bash
cat /tmp/rvm.sh | bash
```

![](https://images.viblo.asia/6e8396fa-f6a6-449b-99af-7c40c7c4fa8c.png)

Hoặc chúng ta có thể chạy câu lệnh sau để **install rvm  + ruby bản mới nhất luôn nhé**

```bash
cat /tmp/rvm.sh | bash -s stable
```

Chú ý, sau khi cài đặt xong chúng ta cần chạy câu lệnh `source /home/hoangpn/.rvm/scripts/rvm` → Ghi **tương ứng ở ảnh trên** nhé (do mỗi máy sẽ có các đường dẫn khác nhau.)

Okay, chúng ta check rvm phát nhé

![](https://images.viblo.asia/10311eae-b508-4f33-b016-3f6f25c7810a.png)

Đến đây nếu thành công thì bạn sẽ kiêm tra được phiên bản của `rvm` như trên nhé

### Cài đặt ruby

Chúng ta sẽ tiến hành cài đặt ruby trên rvm nhé. Phiên bản nào cũng được hết, vì rvm là thẳng quản lý các phiên bản của ruby mà, switch cũng rất dễ dàng.

```bash
rvm list known
```

Để kiểm tra các phiên bản ruby mà rvm hỗ trợ, chúng ta chạy câu lệnh trên nhé


![](https://images.viblo.asia/9dc3b414-0882-469a-bc0f-e0e461c88977.png)


Okay, chúng ta lựa chọn phiên bản mà mình muốn cài đặt thôi nhé

```bash
rvm install 2.5
```

![](https://images.viblo.asia/c7ac7654-9ed8-4a3d-8888-01f6b9a25e0a.png)


Kiểm tra các phiên bản ruby install bằng cách 

```bash
rvm list
```

![](https://images.viblo.asia/a544f27c-0a3f-4790-9cb7-8482887edb5e.png)


Okay, đến đây chúng ta đã cài đặt xong ruby nhé, 1 bước cuối nữa chúng ta sẽ instal bundler nha

```bash
gem install bundler
```

![](https://images.viblo.asia/7ac751af-a5ce-45a8-bb70-e1dabd29383c.png)


### Cài đặt RAILS

```bash
gem install rails
```

Câu lệnh thần thánh để cài đặt rails thôi, ngoài ra có thể chọn version bạn mong muốn nhé.

Sau khi đợi rails cài đặt xong, hãy kiểm tra nhé

![](https://images.viblo.asia/863ee617-8cfb-4fcc-9714-5f15d79e4f81.png)


Okayyy, đến đây là chúng ta đã hoàn thành cài đặt rvm + ruby + rails trên ubuntu rồi.

### Kết

- Để cài đặt ruby, chúng ta nên dùng 1 thằng quản lý nó nào đó như `rvm` hoặc `rbenv`
- **Rails** - đơn giản chỉ là `1 gem của ruby`
- Cài đặt nhanh phiên bản mới nhất của `rvm và ruby` bằng câu lệnh :point_down::point_down::point_down:
```bash
sudo apt install gnupg2

gpg2 --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

curl -sSL https://get.rvm.io | bash -s stable
```

Cảm ơn các bạn đã đón đọc, mọi góp ý hãy comment dưới cho mình biết nhé.



___

Ủng hộ mình với cách đọc bài viết gốc nha...:point_down::point_down::point_down:

https://hoangpn.com/p/cai-dat-rvm-ruby-rails-tren-ubuntu-ver-18-va-20