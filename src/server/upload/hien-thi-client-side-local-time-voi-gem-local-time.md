# Giới thiệu

Gem local_time giúp chúng ta hiển thị date time của người dùng với giờ local của họ rất dễ dàng. Nó hỗ trợ sẵn rails helper để render thành thẻ <time> trong UT, sau đó js của nó sẽ chuyển thẻ đó luôn từ UTC thành giờ local của browser.
    
 
#  Cài đặt
* Thêm `gem "local_time" ` vào Gemfile.
    
  =>  ` bundle install`
    
*  Thêm local-time.js trong application.js
 ```js
//= require local-time
```
# Cách sử dụng và ví dụ
Gem này đã hỗ trợ sẳn helper dưới đây:
 
### Time và date helpers
*  **Default**
```rb
 <%= local_time(time) %>
```
**ví dụ**
```rb
<%= local_time(comment.created_at) %>
```
    
*   **Format với strftime**
    
 Hiển thị datetime (default format)
 ```rb
 <%= local_time(time, '%B %e, %Y %l:%M%P') %>
```
  Hiển thị date (default format)
 ```rb
 <%= local_date(time, '%B %e, %Y') %>
```
Dùng strftime format đã define trong App: 
```rb
<%= local_time(date, :long) %>
```
 Trong đó format này, nó sẽ scan trong App của mình theo thứ tự sau:
    
 `I18n.t("time.formats.#{format}")`, `I18n.t("date.formats.#{format}")`, `Time::DATE_FORMATS[format]` và `Date::DATE_FORMATS[format] `
    
Những strftime format được hỗ trợ:
    
` %a %A %b %B %c %d %e %H %I %l %m %M %p %P %S %w %y %Y %Z`
    
### Time ago helpers
 Hiển thị lượng thời gian đã trôi qua so với thời gian hiện tại
 ```
 <%= local_time_ago(time) %>
```
 ví dụ với tiêng Anh:
   
* Recent: "a second ago", "32 seconds ago", "an hour ago", "14 hours ago"
* Yesterday: "yesterday at 5:22pm"
* This week: "Tuesday at 12:48am"
* This year: "on Nov 17"
* Last year: "on Jan 31, 2012"
     
### Configuration
**Internationalization (I18n)**
     
 Default của nó sẽ là tiêng Anh, những bạn cũng có thể tạo thêm các ngôn ngữ khác nhau.
Bạn có thể tạo file locale mới như sau với những format như file default của nó [en translations](https://github.com/basecamp/local_time/blob/master/lib/assets/javascripts/src/local-time/config/i18n.coffee):
     
```
LocalTime.config.i18n["es"] = {
  date: {
    dayNames: [ … ],
    monthNames: [ … ],
    …
  },
  time: {
    …
  },
  datetime: {
    …
  }
}

LocalTime.config.locale = "es"
```
 
     
Bạn tìm hiểu chi tiết tại official document ở đây: 
   
 https://github.com/basecamp/local_time