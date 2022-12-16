### Lời mở đầu
Nói đến I18n thì chắc hẳn chúng ta đều hiểu là sử dụng đa ngôn ngữ vào sản phẩm của mình. Các anh em chắc cũng không xa lạ việc tích hợp I18n vào Rails nữa, chắc cũng có anh em đã nghĩ sử dụng I18n trong file Ruby giống với file Javascript, nhưng khi chạy ứng dụng thì lại không nhận. Vừa rồi mình có tìm hiểu và làm tích hợp I18n vào file Javascript trong Rails. Nên viết bài này nhằm giúp các anh em mới lần đầu sử dụng I18n vào file js.

### Cài đặt
Các bạn thêm `gem "i18n-js"` vào Gemfile.

Sau đó chạy lệnh `bundle install` để tiến hành cài đặt bình thường như những gem khác.

Vào file `app/assets/javascripts/application.js` các bạn thêm 3 dòng này:


-----
 //= require i18n
 
 //= require i18n.js
 
//= require i18n/translations

-----


Tiếp theo, các bạn thêm dòng lệnh sau vào file `config/environments/development.rb`:

`config.middleware.use I18n::JS::Middleware`

Tiếp đó các bạn tạo file `i18n-js.yml` ở thư mục `config` bằng lệnh: `rails generate i18n:js:config`

Sau khi tạo thành công, các bạn mở file đó lên, thêm dòng lệnh sau:


-----
translations:

       -file: "app/assets/javascripts/i18n/translations.js"
   
        only: "*"

-----

Còn 1 bước cuối cùng nữa là hoàn thành. Các bạn bỏ các dòng lệnh này vào file "application.html.erb":



-----

`<script type="text/javascript">

       I18n.defaultLocale = "<%= I18n.default_locale %>";

        I18n.locale = "<%= I18n.locale %>";

</script>`

-----

Như vậy là các bạn có thể thỏa thích sử dụng I18n trong file Javascript giống với các file Ruby.

Ví dụ:


-----


en:
    
     product:
   
         update:

            alert: "Not found product"

-----

-----

vi:
    
     product:
   
         update:

            alert: "Không tìm thấy sản phẩm"


-----


Lưu ý: Ở các file Js, các  bạn sử dụng theo cú pháp: I18n.t("product.name")

Chúc anh em thành công!

### Kết luận
Hi vọng thông qua bài viết này có thể giúp anh em có thể áp dụng được I18n trên file Js để cho ứng dụng của chúng ta đa dạng ngôn ngữ, dễ tiếp cận nhiều người dùng hơn.