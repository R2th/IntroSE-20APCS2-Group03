Như các bạn đã biết hoặc cho các bạn chưa biết thì mỗi công ty sẽ một coding convention riêng. 
Vậy coding convention là gì ?

**Coding conventions**  là tập hợp những nguyên tắc chung khi lập trình nhằm làm cho code dễ đọc, dễ hiểu, do đó dễ quản lý, bảo trì hơn. 
Khi mới vào bạn sẽ chưa quen được với coding convention nên sẽ bị rất nhiều comment về convention khi gửi pull cho các trainer check.

Việc này xảy ra thường xuyên đặc biệt với các bạn mới bắt đầu thực hiện các project training đầu tiên với hàng chục comment 
chỉ về indent, rails convention, quá dòng...Vậy làm thế nào để mình có thể check các lỗi convention đó một cách dễ dàng
mà không phải mất công rò soát lại mỗi khi gửi pull lên github?

Bài viết này mình sẽ giới thiệu sơ qua về rubocop vì đã có rất nhiều bài viết về rubocop rồi, 
ngoài ra thì mình muốn nói đến một vài lỗi mà có lẽ bây giờ rất hiếm gặp khi cài rubocop.
Nào bây giờ mình sẽ nói về rubocop trước.

**I. Cài đặt rubocop.**
Thêm vào Gemfile trong `group :development, :test do`

`gem 'rubocop', '~> 0.74.0', require: false`
`gem "rubocop-rails", "~> 2.3.2", require: false`

Chạy bundle install để cài đặt.
và sau đó thì sao ... sau đó thì dùng thôi :))))))

**II. Sử dụng và config**
Như đã nói ở trên, cách sử dụng thì các bạn có thể tham khảo ở link bên dưới nhé :)))

[sử dụng gem rubocop](https://viblo.asia/p/su-dung-gem-rubocop-trong-rails-PwRkgxLXvEd)

**III. Jaro_Winkler**
Đầu tiên, tại sao lại là jaro_winkler.
Khi mình cài rubocop bằng lệnh bundle install thì nó hiển thị ra một đống lỗi.
Mình chỉ nhớ vài dòng cuối là
In Gemfile:
  rubocop was resolved to 0.73.0, which depends on
    jaro_winkler
    
( Mình k có ảnh vì hiện tại mình đã fix được rồi :))) )
Mình đã tìm hiểu rất nhiều nhưng mà rất ít thấy, và cuối cùng mình cũng đã tìm ra được nguyên nhân.
Thật ra lỗi này sẽ có thể xảy ra với các bạn chưa chạy rubocop lần nào, nếu các bạn đã chạy rồi thì hầu như sẽ k gặp phải.
Tại sao mình nói như vậy.

Bản chất của rubocop là phân tích ngữ pháp, chính tả, và nó chạy dựa trên gem jaro_winkler là một thư viện
được viết bằng C.

Khi mà chúng ta chạy câu lệnh bundle i đồng nghĩa với việc chúng ta bắt đầu install rubocop và cũng đồng 
nghĩa với việc chúng ta bắt đầu biên dịch jaro_winkler, đó là lý do tại sao mà mình nói những bạn chạy được rubocop rồi rất ít khi gặp lỗi này
bởi vì jaro_winkler của các bạn đã được biên dịch rồi :)))

Vậy thì tại sao mà có người biên dịch được và có người không ?

Thật ra lý do rất đơn giản, nhưng mà bây giờ mình nghĩ là rất ít trường hợp bởi vì chính là do version của bản biên dịch
của C đó là gcc.

Gcc version >= 4.9 thì sẽ chạy jaro_winkler ngon lành, còn gcc < 4.9 thì sẽ có lỗi 
( Còn lý do tại sao nó có lỗi thì mình chịu nhé :))))) )

Mình sẽ hướng dẫn cách cài đặt và thay đổi gcc version nhé.

```
sudo apt-get update && \
sudo apt-get install build-essential software-properties-common -y && \
sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y && \
sudo apt-get update && \
sudo apt-get install gcc-snapshot -y && \
sudo apt-get update && \
sudo apt-get install gcc-6 g++-6 -y
```

Ở đây mình cài gcc version 6 nhé.
Các bạn cop nguyên cái đống này vào và chạy cho mình :))

Nếu vì dụ gcc version trong máy bạn ban đầu là 4.8 thì sau khi cài các dòng lệnh trên, gcc version sẽ có thêm 1 phiên bản nữa là gcc 6
Tuy nhiên nếu các bạn kiểm tra version gcc bằng lệnh 
`gcc -v`
Nó sẽ vẫn hiển thị cho bạn gcc version là 4.8 bởi vì đây là giá trị default

Vậy phải làm thế nào ? Đơn giản thôi, chúng ta thay đổi version default là được mà.
Chỉ bằng 1 lệnh thôi :)))

`sudo update-alternatives --config gcc`

Đây chính là lệnh đó, sau khi thực hiện thì sẽ hiển thị ra cho bạn 1 list các version của gcc, hãy chú ý giấu * là version đang được để default nhé !!!!!
Trên đây là bài viết của mình, mọi người đọc và cảm nhận, có gì mọi người góp ý kiến cho mình nhé.
Cảm ơn đã các bạn đã đọc.

Nguồn tham khảo:

https://gist.github.com/application2000/73fd6f4bf1be6600a2cf9f56315a2d91
https://linuxconfig.org/how-to-switch-between-multiple-gcc-and-g-compiler-versions-on-ubuntu-20-04-lts-focal-fossa?fbclid=IwAR0Eo1YOIMXoxrm8onwEyof_yRI26U5oM0gMbwc-MzZ4Jn9ISapRWuDPrqY