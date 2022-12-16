# Mở đầu
Có lẻ khi nhắc đến Ckeditor thì nhiều người sẽ không còn xa lạ với nó.Ckeditor giống như một bộ hổ trợ cho quá trình soạn thảo, nó có nhiều tiện ích giúp cho quá trình biên soạn trở nên đẹp đẽ hơn, chuyên nghiệp hơn.
Đối với ứng dụng rails, việc thêm ckeditor không có gì quá mới mẻ và khó khăn.Tuy nhiên bài chia sẻ của mình hôm nay, sẽ giới thiệu thêm cho mọi người một điều khá hay ho về ckeditor.Đó là việc thay đổi lớp "áo khoác-skin" cho ckeditor của bạn, để nó trở nên chuyên nghiệp và vừa mắt hơn, thay vì bộ áo cũ rích và quá nhàm chán.
# Thiết lập ckeditor
Mình xin nói lại việc thêm ckeditor vào ứng dụng rails cho nhưng ai chưa biết.
Đầu tiên hãy thêm gem 'ckeditor_rails' vào gem file của bạn.Sau đó đừng quen bundle install nhé.
Tiếp theo hãy thêm `//= require ckeditor-jquery` vào application.js của bạn.
Để thêm được ckeditor khi soạn thảo, bạn chỉ cần thêm class = "ckeditor" vào text-area của bạn.
Bạn có thể tham khảo ví dụ sau: 

![](https://images.viblo.asia/c066648a-e22a-4605-b3d5-15b9bbc6ce1a.png)

Như vậy là mọi thứ đã xong, à đừng quên restart lại server của bạn để mọi thứ có thể hoạt động nhé.
Và đây là kết quả của chúng ta:

![](https://images.viblo.asia/62f527e7-6cec-419c-a00e-119033eb3f3b.png)

Như các bạn đã thấy.Hiện tại ckeditor đang có lớp skin vô cùng không đẹp, khá nhàm chán.
Đến đây thì cho mình ngoài lề 1 tý, mình nghĩ đã là con người thì ai cũng yêu thích cái đẹp, cái đẹp sẽ giúp chúng ta hưng phấn hơn, giúp mắt chúng ta dễ chịu hơn...
Nên đó là lý do, ckeditor hổ trợ thêm các skin khác để mọi người lựa chọn, để làm nó bắt mắt hơn
Mọi người có thể tham khảo chúng ở đây: https://ckeditor.com/cke4/addons/skins/all
# Bắt đầu "thay áo" cho ckeditor nào
Trước tiên các bạn hãy vào link ở trên của mình để lựa chọn các skin yêu thích cho mình.Thích cái nào, các bạn hãy vào download skin đó về.
Sau khi download, hãy giải nén chúng(1 bộ skin khá nhẹ, chỉ vài chục đến vào trăm kb thôi) và tiến hành như sau.
Thêm folder `assets/javascripts/ckeditor/skins.`
hãy bỏ các bộ skin mà các bạn đã tải về và giải nén vào thư mục skins này.
Chưa xong, hãy tạo thêm file `config.js` trong folder ckeditor.Và hãy xem tôi làm gì ở đây.
```
CKEDITOR.editorConfig = function( config )
    {
      config.allowedContent = true;
      config.language = 'en';
      // ['prestige', 'office2013']
      config.skin = 'office2013'
    };
```
Ở đây, chúng ta có thể config ngôn ngữ cho ckeditor của mình.Ngoài ra hãy chú ý, config.skin, đây là thứ hay ho chúng ta đã nói đến.
Hãy config skin cho ckeditor của bạn theo tên skin mà các bạn thêm trong skins của mình.Ở đây tôi đã tải về 2 skins của mình là prestige và office2013.
Và tôi đã lựa chọn office2013 cho ckeditor của mình.
Và hãy xem kết quả nhé: 

![](https://images.viblo.asia/4e22c00d-b128-451d-97b1-7b17b756f03a.png)

Rất giống với word office quen thuộc của chúng ta đúng không, và nhìn mọi thứ có vẻ đã đẹp đẽ hơn.
À còn 1 điều nữa, trong mỗi bộ skin các bạn tải về, sẽ có 1 file editor.css .Nếu bạn nào muốn thay đổi nhiều hơn cho skin đó, thì có thể chọc phá ở đây nhé. =))
Như vậy là mình đã giới thiệu cho các bạn cách thay áo cho ckeditor.
Chúc mọi người chọn được skin ưa thích cho mình.