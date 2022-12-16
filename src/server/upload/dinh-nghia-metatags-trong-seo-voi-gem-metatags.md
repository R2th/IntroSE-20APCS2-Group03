## Khái niệm
**Meta Tag** là thẻ dùng để cung cấp các thông tin về website một cách tóm gọn đối với các trình duyệt lẫn người dùng hay bot từ các search engine. 

Thẻ **Meta Title:** Dùng để mô tả nội dung của trang HTML của bạn, phần này thường là tiêu đề cho bài viết của bạn (Title cho bài viết khác với Title cho website…).

Thẻ **Meta Description**: Dùng để mô tả nội dung Website của bạn. Các công cụ tìm kiếm sẽ dùng nội dung này để mô tả ngắn gọn nội dung trang Web khi thể hiện kết quả cho người dùng. Thẻ Meta Description nên bao gồm nhiều từ khoá được tổ chức trong một câu có ý nghĩa, như đặt các cụm từ khoá (keyword phrases) ở đầu Description để đạt được thứ hạng cao nhất có thể hay cố gắng giữ Description trong khoảng 255 ký tự.

Thẻ **Meta Keywords**: dùng để cung cấp thêm thông tin cho các công cụ tìm kiếm về nội dung Website của bạn. Bạn nên kèm theo nhiều cụm từ hay cụm từ ngăn cách bằng dấu phẩy trong thẻ Meta Keywords.

## Import gem
Thêm "meta-tags" vào Gemfile:
```
gem "meta-tags"

và chạy bundle install
```
Để overide lại các giá trị mặc định của nó ta tạo file config riêng:
```
config/initializers/meta_tags.rb

MetaTags.configure do |config|
....
end
#hoặc chạy lệnh
rails generate meta_tags:install

```
## Sử dụng
- Trong controller:
+ Bạn có thể định nghĩa một số biến instance
```
@page_title       =  "This is title page"
@page_description =  "This is description page."
@page_keywords    =  "This is keyword page"
```
+ Sử dụng thẻ set_meta_tags
```
set_meta_tags title: "This is title page",
              description: "This is description page.",
              keywords: "This is keyword page"
```
- Trong views:
+ Sử dụng trực tiếp thẻ
```
<% title "This is title page" %>
<% description "This is description page" %>
<% keywords "This is keyword page" %>
```
+ Sử dụng thẻ set_meta_tags
```
<% set_meta_tags title: "This is title page",
                 description: "This is description page",
                 keywords: "This is keyword page" %>
```
## Một số tùy chọn để customize
```
:site	site title
:title	page title
:description	page description
:keywords	page keywords
:charset	page character set
:prefix	text between site name and separator
:separator	text used to separate website name from page title
:suffix	text between separator and page title
:lowercase	when true, the page name will be lowercase
:reverse	when true, the page and site names will be reversed
:noindex	add noindex meta tag; when true, 'robots' will be used, otherwise the string will be used
:index	add index meta tag; when true, 'robots' will be used, otherwise the string will be used
:nofollow	add nofollow meta tag; when true, 'robots' will be used, otherwise the string will be used
:follow	add follow meta tag; when true, 'robots' will be used, otherwise the string will be used
:noarchive	add noarchive meta tag; when true, 'robots' will be used, otherwise the string will be used
:canonical	add canonical link tag
:prev	add prev link tag
:next	add next link tag
:image_src	add image_src link tag
:og	add Open Graph tags (Hash)
:twitter	add Twitter tags (Hash)
:refresh	refresh interval and optionally url to redirect to
```

## Tài liệu tham khảo
https://rubygems.org/gems/meta-tags/versions/2.1.0