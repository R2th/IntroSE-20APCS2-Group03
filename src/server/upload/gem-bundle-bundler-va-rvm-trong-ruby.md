Gem, bundle, bundler và RVM khác nhau như thế nào? Một trong những thử thách đầu tiên mà các bạn developer mới làm quen với Rails đó là phân biệt được các thuật ngữ này. Phần lớn các Rails developer bỏ qua Ruby và do đó thường dễ bị lẫn lộn giữa các thuật ngữ trên. Nếu bạn là một trong số những trường hợp vừa nêu trên thì hãy tiếp tục đọc. Trong bài viết này chúng ta sẽ cùng nhau làm rõ các khái niệm này nhé.
### **1.GEM Là Gì**
Gem là một thư viện của Ruby. Nó không có gì khác biệt với các thư viện của các ngôn ngữ bình thường khác như PHP, Java hay Python tuy nhiên thư viện trong Ruby được gọi là GEM. Đơn giản chỉ có vậy.

Lưu ý: Rails cũng là một Ruby GEM!!!

Sau khi hiểu Gem là gì thì câu hỏi tiếp theo được đặt ra đó là làm sao để cài được Gem? Câu trả lời đó là sử dụng chương trình có tên là RubyGems được cài sẵn cùng với Ruby phiên bản 1.9 trở lên. Chương trình này
có thể được chạy trên cửa sổ dòng lệnh với tên gem. Ví dụ để cài đặt một Gem có tên là drip bạn chạy câu lệnh sau:
```ruby
gem install drip
```
### **2.Bundle Là Gì**
Bundler là một công cụ quản lý việc cài đặt, cập nhật, gỡ bỏ, cấu hình cũng như quản lý version của các GEM.

Ví dụ để cài đặt Rails bạn có thể chạy câu lệnh:

```
bundle install rails
```

Ok nhưng tôi mới nghe nói là có thể sử dụng RubyGems ở trên đề cài Gem còn gì giờ sao lại còn Bundle nữa?

Câu trả lời là bạn nên sử dụng Bundle để cài đặt Gem thay vì RubyGems!

Tại sao à? Bời vì Bundle không dừng lại ở việc cài đặt cập nhật và gỡ bỏ mà một tính năng quan trọng của Bundle đó là quản lý version các Gem sẽ được cài đặt. 

Ví dụ nếu trong một dự án bạn cần hai thư thư viện A và B.

Thư viện A phụ thuộc vào thư viện C phiên bản 1.0, khi cài A thì chúng ta cũng sẽ phải cài cả C phiên bản 1.0 trở lên. Trong khi đó thư viện B cũng cần C nhưng phiên bản 1.1. Lúc này sử dụng Bundle chúng ta sẽ không cần phải lựa chọn phiên bản nào của C sẽ được cài đặt mà công việc này sẽ được thực hiện bởi công cụ này.

Đơn giản thế thôi sao vậy mà cũng phải dùng cả một thư viện như vậy sao không làm thủ công luôn đi. Nếu bạn đang thắc mắc vậy thì cứ thử tưởng tượng bạn có một dự án cần 100 thư viện và mỗi thư viện này có chỉ cần một thư viện phụ thuộc và mỗi thư viện phụ thuộc có một thư viện phụ thuộc khác.... Bạn đã hiểu tại sao rồi phải không.

Ngoài ra với những bạn có tính tò mò thì Bundle về bản chất cùng là một GEM của Ruby. Ngạc nhiên chưa? Ok nếu bạn ngạc nhiên thì hãy tưởng tượng Bundle giống như một Gem dùng để quản lý các gem khác. Tương tự như khi xài máy tính thì trên hệ điều hành chúng ta cũng có những phần mềm quản lý các phần mềm khác (hay còn gọi là software package manager).

```
gem install bundler
```

Lưu ý: Nên sử dụng Bundle để cài đặt Gem thay vì RubyGems các bạn nhé!!!

### **3. Thế Còn Bundler Là Cái Gì**
Bundler = Bundle. Đơn giản chỉ có vậy.

Còn tại sao nó có hai tên à. Cái này thì chịu thôi : ))

### **4. RVM là gì?**
RVM là viết tắt của cụm từ Ruby Version Manager là một phần mềm quản lý các phiên bản khác nhau của Ruby trên hệ thống giúp chúng ta có thể dễ dàng thay đổi giữa các phiên bản Ruby sử dụng.

Ví dụ giờ công ty bạn có hai dự án một dự án làm với Ruby 1.9 một dự án làm với Ruby 2.4. Nếu không sử dụng RVM thử tưởng tượng chúng ta sẽ phải vất vả như thế nào mỗi lần muốn chuyển qua phiên bản Ruby cần sử dụng.

Sử dụng RVM việc chuyển đổi giữa các phiên bản của Ruby này được thực hiện đơn giản thông qua một câu lệnh:
```
 rvm use 1.9
```
### **Kết Luận**

Ruby là một ngôn ngữ lập trình phổ biến bên cạnh các ngôn ngữ scripting khác như PHP, Python... Có thể bạn sẽ gặp nhiều bối rối với các thuật ngữ xuất hiện khi mới bắt đầu tìm hiểu ngôn ngữ này tuy nhiên nếu bạn vượt qua được những rào cản này chắc chắn bạn sẽ yêu thích ngôn ngữ lập trình này!
### **Tài liệu tham khảo:**
1. https://github.com/rails/rails
2. https://www.codehub.vn/Gioi-thieu-ve-RVM-trong-Ruby