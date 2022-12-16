### Giới thiệu
```ruby
t('my.messages.hello')

# same as 'my.messages.hello'
t(:hello, scope: 'my.messages')
t(:hello, scope: [:my, :messages])

t('my.messages.hello', default: "Hello")
```
Có lẽ khi gặp nhưng đoạn code trên sẽ là quen thuộc nếu ai đã và đang làm việc việc với Rails (có gi đó sai sai). Nhưng có nhưng thứ có thể chúng ta vẫn chưa thực sự hiểu về nó hay có thể áp dụng nó 1 cách dễ dàng vậy hôm nay mình sẽ tổng hợp 1 cách đơn giản nhất để mọi người có thể áp dụng nó ngay được.
### I18n là gi?
Việc các trang web hiển thị với nhiều ngôn ngữ khác nhau là rất cần thiết. Quốc tế hóa trong tiếng Anh gọi là Internationalization, vì có 18 chữ cái ở giữa chữ cái i và chữ cái n nên hay được gọi ngắn gọn là i18n.
### Các cách sử dụng i18n.
#### 1. Interpolation
- Truyền biến vào trong i18n
```ruby
t('hello', name: "John")
```
```
hello: "Hello %{name}"
```
-----
#### 2. Lazy lookup
- Bình thường chúng ta thường phải gọi i18n 1 cách dài dòng như là `I18n.t books.index.title` nhưng cách đó xưa rồi Rails đã hỗ trợ chúng ta việc lazy trong i18n từ đó ta có thể gọi ngắn gọn như sau:
```
# from the 'books/index' view
t('.title')
```
```
en:
  books:
    index:
      title: "Ruby on Rails sun *"
```
-----
#### 3. Plural
Thật thú vị đó là trong rails hỗ trợ việc tự động chia số nhiều điều đó không thể ở trong model, và nó còn thể hiện ở việc i18n:
```
t(:inbox, count: 1)  #=> 'one message'
t(:inbox, count: 2)  #=> '2 messages'
```

```
inbox:
  one: 'one message',
  other: '%{count} messages'
```
-----
#### 4. Time
Không nhưng phục vụ cho việc đa ngôn ngữ rails cung cấp cho chúng ta việc có thể fomat time như sau:
```
l(Time.now)
l(Time.now, format: :short)
```
```
en:
  time:
    formats:
      default: "%a, %d %b %Y %H:%M:%S %z"
      long: "%B %d, %Y %H:%M"
      short: "%d %b %H:%M"
```
#### 5. Date
Và Date cũng vậy.
```
l(Date.today)
```
```
en:
  date:
    formats:
      default: "%Y-%m-%d" # 2015-06-25
      long: "%B %d, %Y"   # June 25, 2015
      short: "%b %d"      # Jun 25
 ```
-----
##### NOTE: Chị có Fan cuồng mới có thể nhận ra 1 điều thú vị là đó là rails không đặt cách gọi tùy ý đó là 2 cú pháp ta thường gặp sau: :D
```
I18n.t # t: Lookup text translations
và
I18n.l # l: Localize Date and Time objects to local formats
```

#### 6. Model name
Ngoài việc translate cho view, format time,... I18n còn xuất hiện và phục vụ cho model:
```
User.model_name.human            #=> "User"
Child.model_name.human(count: 2) #=> "Children"
```
```
en:
  activerecord:
    models:
      user: "User"
      child:
        one: "Child"
        other: "Children"
```
#### 7. Attributes
Hay attributes:
```
User.human_attribute_for :name   #=> "Name"
```
```
en:
  activerecord:
    attributes:
      user:
        # activerecord.attributes.<model>.<field>
        name: "Name"
        email: "Email"
```
#### 8. Errors message
Và tuyệt với hơn nữa là bắn message lỗi.
```
error_messages_for(...)
```
```
activerecord:
  errors:
    models:
      venue:
        attributes:
          name:
            blank: "Please enter a name."
```

```
activerecord.errors.models.[model_name].attributes.[attribute_name].[error]
activerecord.errors.models.[model_name].[error]
activerecord.errors.messages.[error]
errors.attributes.[attribute_name].[error]
errors.messages.[error]
Where [error] can be:
```
```
validates
  confirmation - :confirmation
  acceptance   - :accepted
  presence     - :blank
  length       - :too_short (%{count})
  length       - :too_long (%{count})
  length       - :wrong_length (%{count})
  uniqueness   - :taken
  format       - :invalid
  numericality - :not_a_number
  ```
-----
#### 9. Form label
Hỗ trợ form label:
```
form_for @post do
  f.label :body
```
```
helpers:
  # helpers.label.<model>.<field>
  label:
    post:
      body: "Your body text"
```
#### 10. Submit button
Ngoài ra còn hỗ trợ đến từng buttons và rất nhiều hỗ trợ khác.
```
form_for @post do
  f.submit
```
```
helpers:
  submit:
    # helpers.submit.<action>
    create: "Create a %{model}"
    update: "Confirm changes to %{model}"

    # helpers.submit.<model>.<action>
    article:
      create: "Publish article"
      update: "Update article"
```
-----
#### 11. Delimited 
```
number_to_delimited(2000)             #=> "2,000"
number_to_currency(12.3)              #=> "$12.30"
number_to_percentage(0.3)             #=> "30%"
number_to_rounded(3.14, precision: 0) #=> "3"
number_to_human(12_000)               #=> "12 Thousand"
number_to_human_size(12345)           #=> "12.3 kb"
```
```
number_to_delimited(n)
```
```
number:
  format:
    separator: '.'
    delimiter: ','
    precision: 3
    significant: false
    strip_insignificant_zeroes: false
```
#### 12. Currencies
```
number_to_currency(n)
```
```
number:
  currency:
    format:
      format: "%u%n" # %u = unit, %n = number
      unit: "$"
      separator: '.'
      delimiter: ','
      precision: 3
      # (see number.format)
```
#### 13. Percentage
```
number_to_percentage(n)
```
```
number:
  percentage:
    format:
      format: "%n%"
      # (see number.format)
```
#### Settting
Và điều quan trong để sử dụng I18n ta phải có config sau:
```
I18n.backend.store_translations :en, ok: "Ok"
I18n.locale = :en
I18n.default_locale = :en

I18n.available_locales

I18n.translate :ok   # aka, I18n.t
I18n.localize date   # aka, I18n.l
```
### Related
https://devhints.io/rails-i18n