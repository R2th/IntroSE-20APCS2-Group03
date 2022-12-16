## Vấn đề hiện tại

Một trong những vấn đề trọng tâm của của phiên bản lớn sắp tới của Ruby là optimizaton. Một trong những cải tiến đó là việc giới thiệu hàm `Symbol#name` đến với cộng đồng Rubyists.

Như nhiều người đã biết, để chuyển đổi một symbol ra thành một string, ta có thể gọi đến hàm `to_s` thần thánh, nhưng hàm này có một nhược điểm là mỗi lần gọi đến, một string object mới sẽ được tạo ra, đồng nghĩa với một ô nhớ mới sẽ bị chiếm mất:
```
2.6.3 :001 > :simba.to_s.object_id
 => 46936404941160 
2.6.3 :002 > :simba.to_s.object_id
 => 46936405013100 
2.6.3 :003 > :simba.to_s.object_id
 => 46936405033300 
```

Ta có thể tạm thời khắc phục này bằng hàm `freeze`, với một cách xử lý khá cồng kềnh
```
2.6.3 :006 > s = :simba.to_s.freeze
 => "simba" 
2.6.3 :007 > s.object_id
 => 46936405937740 
```

## Thay đổi và cách giải quyết của Ruby 3.0

Chính những vấn đề đó đã khiến cho cộng đồng các Ruby commiter quyết định định nghĩa hàm `Symbol#name` mới trả về một freeze string có nội dung giống với kết quả của hàm `to_s`.
Sẽ có nhiều người thắc mắc vì sao không đơn giản là thay đổi hàm `to_s` luôn mà lại phải định nghĩa hàm mới?
Điều này thì tôi cũng không biết được rõ, nhưng theo một số nguồn tin cho rằng, việc thay đổi cài đặt một hàm kế thừa từ `Object#to_s` đem lại nhiều rắc rối hơn là sự tiện dụng mà nó đem lại, và họ, cộng đồng phát triển ngôn ngữ Ruby đã làm thử, và đã "epic failed."

Và cuối cùng chúng ta có một pull request như sau:
[https://github.com/ruby/ruby/pull/3514/files](https://github.com/ruby/ruby/pull/3514/files)

## Tìm hiểu sâu hơn cách cài đặt

Đào sâu hơn một chút về pull request trên, ta có thể thấy hàm `name` và `to_s` được cài đặt dựa trên hai hàm C khác nhau:
```
     rb_define_method(rb_cSymbol, "to_s", rb_sym_to_s, 0);
    ...
    rb_define_method(rb_cSymbol, "name", rb_sym2str, 0);
```

Quan sát kĩ hơn một chút nữa, ta thấy hàm `rb_sym2str` được gọi đến trong hầu hết các hàm khác của symbol, thậm chí có tham gia cả trong định nghĩa của hàm `rb_sym_to_s`!
```
VALUE
rb_sym_to_s(VALUE sym)
{
    return str_new_shared(rb_cString, rb_sym2str(sym));
}
```
Giả định rằng trước đây hàm `rb_sym_to_s` là một hàm độc lập, và được gọi đến thay cho vị trí mà hiện giờ đang gọi đến `rb_sym2str`, và các hàm đó tiếp tục được gọi ở các class và gem khác nữa, thì không gian tiết kiệm được không chỉ là "một vài ô nhớ."

## Kết quả

Tất nhiên, khi gọi hàm `name`, địa chỉ ô nhớ luôn cố định
```
irb(main):001:0> :simba.name.frozen?
=> true
irb(main):002:0> :simba.name.object_id
=> 46936405973180
irb(main):003:0> :simba.name.object_id
=> 46936405973180
```

Vậy nên, nếu muốn chuyển đổi từ symbol ra string, và không muốn thay đổi gì string đó, từ Ruby 3.0 ta chắc chắn nên dùng hàm `name` thay vì `to_s`.

Ruby 3.0 được lên lịch release chính thức vào dịp cuối năm 2020, đầu năm 2010.

Nguồn tham khảo: [https://blog.bigbinary.com/2020/10/12/ruby-3-adds-symbol-name.html](https://blog.bigbinary.com/2020/10/12/ruby-3-adds-symbol-name.html)