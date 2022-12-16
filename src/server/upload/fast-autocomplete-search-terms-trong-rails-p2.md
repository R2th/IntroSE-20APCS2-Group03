Trong phần trước chúng ta đã cài đặt và làm một số bước để xây dựng 1 hệ thống tìm kiếm tự động trên nhiều model trong ứng dụng Rails. Sau đây là các bước tiếp theo để hoàn thiện hệ thống:

6. LOADING SOULMATE INTO OUR RAILS APP

Soulmate có thể được load như `‘web-server’` riêng biệt, như nó đã là một app sinatra đầy đủ nhưng trong trường hợp của chúng tôi, chúng tôi muốn có nó trong rails. Điều này có thể làm đơn giản bằng cách thêm nó vào file `routes.rb`

`routes.rb`

```ruby
Rails.application.routes.draw do
  mount Soulmate::Server, at: "/autocomplete"

  resources :verbs
  resources :nouns

  root "home#index"
end
```

Nơi mà chúng ta có thể truy vấn soulmate tại url `/autocomplete`. Hãy truy cập `http://0.0.0.0:3000/autocomplete` và xem nó có gì. Nó nên cho bạn status của soulmate.

![anh1.png](/uploads/34f3513d-7448-475e-aff0-02cefc256649.png)

Bây giờ hãy thử truy vấn một vài data. Chúng ta sẽ bắt đầu bởi truy vấn một vài nouns. Tôi sẽ thử truy vấn term là `pro` và xem tôi có gì. truy cập: `http://0.0.0.0:3000/autocomplete/search?types[]=nouns&limit=6&term=pro`

![anh2.png](/uploads/016d1953-2d44-4db6-a94f-2c8c6d5b5da3.png)

Đối với verb, tôi sẽ thử tìm kiếm verb bất kỳ bắt đầu với các ký tự `co`. Truy cập `http://0.0.0.0:3000/autocomplete/search?types[]=verbs&limit=6&term=co`

![anh3.png](/uploads/0b28ed08-df90-47e5-a7c6-266c29c961a5.png)

Trường hợp chỉ có NOUNS và VERBS. Để tìm kiếm cả 2 chúng ta tạo lời gọi giống url như sau: `http://0.0.0.0:3000/autocomplete/search?types[]=verbs&types[]=nouns&limit=6&term=ha`. Chú ý chúng ta phải để NOUNS và VERBS dưới dạng mảng. Kết quả sẽ bao gồm sự xuất hiện của `"ha"` trong cả nouns và verbs:

![anh4.png](/uploads/56358434-9086-4203-a5cf-bcad9ef51b22.png)

7. PIECING IT ALL TOGETHER USING JQUERY AND SOULMATE.JS

`Soulmate.js` là một jQuery front-end cho gem auto-suggestion soulmate. Với soulmate.js chúng ta sẽ cung cấp ứng dụng với một auto-complete giống như tại seatgeek.com.

Hãy bắt đầu bằng cách lấy soulmate.js từ github. Sau khi tải về lấy `jquery.soulmate.js` nằm trong thư mục `soulmate.js-master/src/compiled` và thêm nó vào thư mục javascripts của app rails của mình.

```JavaScript
//= require jquery
//= require jquery_ujs
//= require jquery.soulmate
//= require turbolinks
//= require_tree
```

Tiếp theo chúng ta lấy stylesheet `demo.css` trong `soulmate.js-master/demo` và thêm nó vào thư mục `stylesheets` trong thư mục `vendor` của ứng dụng rails. Trong file này chúng ta chỉ cần các dòng từ 30 đến 115. Chúng tôi cũng có thể cho phép đổi tên nó thành `soulmate.css` để giữ cho tên của ngữ nghĩa.

```CSS
*= require_tree .
*= require soulmate
*= require_self
*/
```

`soulmate.css`

```CSS
#soulmate {
    background-color: #fafafa;
    border: 1px solid #bbb;
    display: none;
    font: 12px/14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: normal;
    list-style: none;
    margin: 0 0 0 10px;
    padding: 0;
    position: absolute;
    text-shadow: 0 0 0 white;
    /* play around with the top and left properties for correct positioning */
    top: 201px;
    left: 460px;
    width: 579px;
    z-index: 1000;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    -khtml-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    -khtml-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    -ms-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    -o-box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
 #soulmate .soulmate-type-container {
    border-top: 1px solid #ddd;
}
 #soulmate .soulmate-type-container:first-child {
    border-top: none;
}
 #soulmate .soulmate-type-suggestions {
    border-left: 1px solid #ddd;
    float: right;
    list-style: none;
    padding: 5px 0;
    width: 490px;
    letter-spacing: 0.5px;
}
 #soulmate .soulmate-suggestion {
    color: #111;
    cursor: pointer;
    font-weight: 500;
    font-size: 13px;
    padding: 5px 0 6px 12px;
    text-decoration: none;
}
 #soulmate .soulmate-suggestion.focus {
    color: white;
    margin-left: -1px;
    margin-right: -1px;
    padding-left: 13px;
    position: relative;
    text-shadow: 0 1px 1px #32629b;
    z-index: 1;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    -khtml-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    -ms-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    -o-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    background: #545454;
    background: -moz-linear-gradient(top, #545454 0, #444444 100%);
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#545454), to(#444444));
    -ms-filter: "progid: DXImageTransform.Microsoft.gradient(startColorstr=#545454,endColorstr=#444444)";
    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr=#545454,endColorstr=#444444);
}
 #soulmate .soulmate-type {
    background-color: white;
    color: #333;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 11px;
    letter-spacing: 0.5px;
    margin-right: 490px;
    padding: 10px 10px 0 10px;
    text-align: right;
    text-transform: capitalize;
    vertical-align: top;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    -khtml-border-radius: 5px;
    border-radius: 5px;
    zoom: 1;
}
 #soulmate .soulmate-type:before, #soulmate .soulmate-type:after {
    content: "";
    display: table;
}
 #soulmate .soulmate-type:after {
    clear: both;
}
```

8. ADDING A SEARCH FORM

Chúng ta sẽ đi tạo một controller `home` và cho nó làm đường dẫn root mặc định của app. Sau đó đặt form tìm kiếm trong view index của controller home.

> $ rails g controller home index

Tạo đường dẫn root đến hành động index của controller home. Trong file routes.rb sẽ giống như sau:

> root 'home#index'

Bây giờ hãy thêm một form tìm kiếm trong view index của controller home.

`index.html.erb`

```ruby
<div class="container">
	<h2>Search Nouns and Verbs</h2>
	<%= form_tag do %>
	  <%= text_field_tag "search", nil, placeholder: "Search", autocomplete: :off %>
	<% end %>
</div>
```

Một số kiểu đơn giản, nhanh chóng

`home.css.scss`

```SCSS
// Place all the styles related to the home controller here.
// They will automatically be included in application.css.
// You can use Sass (SCSS) here: http://sass-lang.com/
.container {
	width: 500px;
	margin: 0 auto;
	padding: 100px;
	text-align: center;
}

#search{
	width: 400px;
	padding: 10px;
}

li.soulmate-suggestion{
	text-align: left;
}
```

File css ở trên chúng ta sẽ có form tìm kiếm như sau:

![anh5.png](/uploads/3693925e-6182-4758-ad1a-3b72d70d3d52.png)

Đổi tên `home.js.coffee` trong `app/javascripts` thành `home.js` như chúng ta sẽ viết trong javascript thun. Trong file này sẽ gọi `soulmate.js` với các trường tìm kiếm trong form.

`home.js`

```JavaScript
var ready = function(){
  var render, select;

  render = function(term, data, type) {
    return term;
  }

  select = function(term, data, type){
    // populate our search form with the autocomplete result
    $('#search').val(term);

    // hide our autocomplete results
    $('ul#soulmate').hide();

    // then redirect to the result's link
    // remember we have the link in the 'data' metadata
    return window.location.href = data.link
  }

  $('#search').soulmate({
    url: '/autocomplete/search',
    types: ['nouns','verbs'],
    renderCallback : render,
    selectCallback : select,
    minQueryLength : 2,
    maxResults     : 5
  })

}
// when our document is ready, call our ready function
$(document).ready(ready);

// if using turbolinks, listen to the page:load event and fire our ready function
$(document).on('page:load', ready);
```

Và bây giờ chúng ta sẽ thử tìm kiếm với từ `pa` giao diện tìm kiếm sẽ như sau:

![anh6.png](/uploads/582fa0a7-13b6-46b9-91ea-6e6332662821.png)

Trên đây là các bước xây dựng tìm kiếm tự động nhanh cho ứng dụng rails.

Cảm ơn các bạn đã theo dõi bài viết! :)

Tham khảo: http://josephndungu.com/tutorials/fast-autocomplete-search-terms-rails