Sau khi được làm dự án thực tế, mình có học được 1 số bài học về tech và các kinh nghiệm từ các anh leader. Hôm nay mình xin chia sẻ với các bạn, đặc biệt là giành cho các bạn mới lập trình Ruby on Rails.

## 1. Câu lệnh với TH object bị nil
```
  account.birth_day.nil? ? '' : account.birth_day.to_s(:long)
 ```
Có một số cách để thay thế câu lệnh trên, sẽ giúp câu lệnh của bạn có convention hơn và ít bị comment hơn:
```
  account.birth_day.try(:to_s, :long)
```
 **Note**: try là phương thức của Rails chứ không phải là Ruby Core nhé.
Với các phiên bản 2.3+:
```
  account.birth_day&.to_s(:long)
```
## 2. Refactor lại cấu trúc của câu lệnh điều khiển.
Nếu các tác vụ được thực hiện trong mỗi trường hợp đơn giản:
 ```
     def level_of_education
     	if account.age < 6
     	  level = "preschool"
        elsif account.age >= 6 and account.age <= 11
          level = "Elementary school"
        elsif account.age > 11 and account.age <= 15
          level = "Secondary school"
        elsif account.age > 15 and account.age <= 18
          level = "high school"
       	elsif account.age > 18 and account.age <= 23
       	  level = "University"
       	else
       	  level = "school life"
       	end
       	return level	
     end
 ```
Ok, nếu mình là 1 thằng mới học code, đương nhiên đây là cách mình lựa chọn, nhưng khi đưa cho anh đã từng làm 1 dự án thật, hoặc vài bạn pro xem thì câu review sẽ là refactor hết lại cho anh, mỗi câu 1 dòng thôi.

Với TH này, bạn có thể dùng hai cách (theo mình học được từ các anh pro): là dùng các câu lệnh trả về giá trị đơn hoặc dùng case..switch. Trong TH này thì mình lựa chọn cách dùng các câu lệnh đơn trả về giá trị, vì thực chất hàm này cũng chỉ là để trả về 1 đoạn string đó là cấp độ giáo dục của bạn thôi.
```
    def level_of_education
       return "preschool" if account.age < 6
       return "Elementary school" if account.age >= 6 and account.age <= 11
       return "Secondary school" if account.age > 11 and account.age <= 15
       return "high school" if account.age > 15 and account.age <= 18
       return "University" if account.age > 18 and account.age <= 23
       "school life"
     end
```
Trong nó ngắn gọn và dễ đọc hơn các bạn nhỉ =).

## 3. Tránh lạm dụng try khi sử dụng câu lệnh truy vấn với where

Như các bạn đã biết, với tip đầu tiên mà mình chia sẻ, try dùng để khắc phục trường hợp object bị nil. Nhưng tôi đã từng sử dụng nó một cách khá là máy móc nên đã bị phản tác dụng, vẫn bị các anh comment, code smell.
Ex:
```
  irb(main):003:0> Comment.where(user_id: 1)
    Comment Load (0.2ms)  SELECT  "comments".* FROM "comments" WHERE "comments"."user_id" = ? LIMIT ?  [["user_id", 1], ["LIMIT", 11]]
  => #<ActiveRecord::Relation []>
  irb(main):012:0> Comment.where(user_id: 1).first
    Comment Load (0.1ms)  SELECT  "comments".* FROM "comments" WHERE "comments"."user_id" = ? ORDER BY "comments"."id" ASC LIMIT ?  [["user_id", 1], ["LIMIT", 1]]
  => nil
  irb(main):013:0> Comment.where(user_id: 1).try(:first)
    Comment Load (0.1ms)  SELECT  "comments".* FROM "comments" WHERE "comments"."user_id" = ? ORDER BY "comments"."id" ASC LIMIT ?  [["user_id", 1], ["LIMIT", 1]]
  => nil
```
Các bạn có thể dễ dàng nhìn thấy, việc có và không sử dụng câu lệnh try trong TH này nó ko có sự khác biệt trong kết quả, bởi vì khi thực hiện câu lệnh truy vấn where, kết quả nhận về là **#<ActiveRecord::Relation []>**, chính vì thế mà việc sử dụng try là không cần thiết với array.

## 4. Việc sử dụng thêm Gem có phải lúc nào cũng được chấp nhận?
Với một dự án lớn, mỗi lần đề xuất sử dụng gem mới, sẽ phải được sự chấp nhận của teamlead, vì đó là người biết được lợi ích và tác hại của việc thêm gem mới là gì? Thông thường, việc thêm mới nếu chỉ được dùng cho một chức năng đơn giản, hoặc chỉ sử dụng 1,2 hoặc đến 3 lần, thì khả năng được approve thêm gem là coi như bỏ.

Với trường hợp này, việc đọc hiểu gem là rất cần thiết. Đương nhiên cách thêm gem đã bị loại, nhưng việc tận dụng logic xử lý của gem đó thì là thoải mái.

Ví dụ: Người dùng có thể bình luận vào 1 bài báo, nội dung comment có thể chưa các thẻ a, và KH yêu cầu nội dung comment chỉ chứa 30 chữ. Bài toán đặt ra là bạn phải edit lại nội dung sao cho hợp lý đủ 30 ký tự, và hiển thị được thẻ a:

Input comment với nội dung: 123456789123456789123456<a href=“http://www.google.com”>google</a>

Comment sẽ được hiển thị là **123456789123456789123456[google](https://www.google.com.vn/)**

Và tôi tìm thấy gem truncate_html, nó có thể thực hiện điều này 1 cách đơn giản, nhưng thật đen đủi khi yêu cầu thêm gem bị reject. Và lúc đó, tôi được anh hướng dẫn sử dụng cách mà gem này nó làm để xử lý vấn đề: https://github.com/hgmnz/truncate_html/blob/master/lib/truncate_html/html_truncator.rb#L14

=> thiết kế 1 hàm cho mình theo cách mà gem xử lý
```
def truncate_body_comment(summary, length, omission = "...")
      regex = %r{(<a[^>]+>[^<]+<\/a>|<br>|<br \/>)}
      html = "".html_safe
      arr = summary.to_s.gsub(/\r\n|\r|\n/, "<br>").split(regex)
      arr.each.with_index(1) do |x, index|
        break if length <= 0
        origin = strip_tags(x)
        str = origin[0...length]
        length -= str.length
        str << omission if length <= 0 && (index < arr.length || origin != str)
        html << (x =~ regex ? x.gsub(origin, str).html_safe : str)
      end
     html
end
```

Sau đó bạn chỉ cần gọi 
```
  truncate_body_comment(comment.body, 30)
```
Như vậy là bài toán đã được giải mà không phải thực hiện việc sử dụng thêm 1 gem nữa.

## 5. Không nên dùng biến @ ở partial.
```
  # app/views/users/_icon.slim
     - icon = (@user.age > 18) ? "icon_18.png" : "icon_default.png"
     .icon_for_user
        = link_to "#" do
  	   = image_tag icon, alt: "icon"

  # app/views/users/show.slim
     = render "icon"
```
Việc sử dụng instance variable:

- Gây khó khăn cho việc maintain app trong tương lai.
- Tạo ra sự phụ thuộc trong partial -> khó cho việc tái sử dụng partial (do partial được sử dụng ở nhiều nơi).

Hướng giải quyết: thay thế việc sử dụng instance variable bằng cách sử dụng local variable
```
  # app/views/users/_icon.slim
     - icon = (user.age > 18) ? "icon_18.png" : "icon_default.png"
     .icon_for_user
        = link_to "#" do
  	   = image_tag icon, alt: "icon"

  # app/views/users/show.slim
     = render "icon", user: @user
```

Trên đây mình có chia sẻ với các bạn về một số bài học mà mình đã học được từ các anh leader trong dự án thực tế mà mình đã làm việc. Mong rằng sẽ giúp ích cho các bạn mới bắt tay vào lập trình ROR.