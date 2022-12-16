## Giới thiệu
Chào các bạn, chắc hẳn mọi người đều nhớ có một thời, comment bằng ảnh GIF trở thành một trào lưu, và đến giờ nó cũng chưa hề hạ nhiệt. Một phần vì những ảnh GIF đó thể hiện được cảm xúc của người comment rõ hơn là emotion, có nhiều hình vui nhộn, sống động.

Các bạn có thể sử dụng sdk của Facebook để bê nguyên phần comment của người ta, hoặc tự mình tạo ra phần comment sử dụng GIF và emotion. Bài này mình sẽ demo với GIF nhé. 

Kho ảnh GIF mình sẽ lấy ở trang này: https://tenor.com/gifapi/documentation

Trong trang đó bạn tạo tài khoản, sau đó tạo apps của mình để lấy được API key.
## Demo
Trong phần demo này, mình sẽ sử dụng Laravel 5.4. Các bước thực hiện sẽ được liệt kê dưới đây:

### 1. Tạo route
Đầu tiên chúng ta sẽ tạo routes cho hệ thống comment trong file `route/web.php`:
```php
Route::resource('comments', 'CommentsController');
Route::get('/comments/getGif', 'CommentsController@getGifImage');
```

Vì nội dung khá dài nên ở đây mình sẽ không hướng dẫn các bước list và lưu comment mà chỉ hướng dẫn làm thế nào để lấy ảnh GIF để comment thôi.
### 2. Tạo controller
Mình tạo file `app/Http/Controllers/CommentsController.php`:
```php
<?php

namespace App\Http\Controllers\Web;

use Illuminate\Support\Facades\View;
use Illuminate\Http\Request;
use App\Models\Comment;

class CommentsController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }
   
    public function getGifImage()
    {
        return View::make('web.comments.popup_gif_image')  //day la phan noi dung hien thi anh gif
            ->render();
    }
}

```
### 2. Tạo file blade: comment.blade.php
Phần này sẽ hiển thị 1 ô để người dùng comment, một button GIF để người dùng chọn ảnh GIF và 1 button POST để post comment.
```php
    {{ Form::open([
        'url' => action_locale('CommentsController@store'),
        'method' => 'POST',
        'class' => 'comment-to-top form-create-comment form-comment',
    ])  }}
       {{ Form::textarea('content', null, [
            'class' => 'comment-input post-comment form-control',
            'placeholder' => 'Write a comment...',
            'rows' => 4,
        ]) }}
        <div class="create-comment-form">
            <div class="btn-group--left">
                <a class="btn-gif show-gifs-selection" href="javascript:;">
                    <span>GIF</span>
                </a>
                <div class="popup-gif-search"></div>
            </div>
            <div class="btn-group--right">
                <button class="send-comment" id="post-btn" type="button">
                    POST
                </button>
            </div>
        </div>
   {{ Form::close() }}
```

### 3. Tạo file blade popup_gif_image.blade.php
Khi kích vào button `GIF` thì sẽ hiện ra một popup bao gồm 1 ô search + một số ảnh GIF cho người dùng lựa chọn. Và đây là phần hiển thị nội dung đó, ảnh GIF được lấy ra sẽ được append vào class `.body-result-gifs`.
```php
<div class="gifs-comment-block" id="gifs-search-block">
    <div class="popup-gif">
        <div class="popup-content">
            <div class="search-for-text">
                <input type="text" id="search-gif-input"
                    class="form-control text-search-gif pull-left input-sm"
                    placeholder="Search images">
                <i class="fa fa-search search-image-gif" id="search-gif-btn" aria-hidden="true"></i>
            </div>
            <div class="body-result-gifs"></div>
        </div>
    </div>
</div>

```

### 4. Tạo file comment.js
```javascript
$(function () {
    baseUrlLocale = function () {
        return BASE_URL + '/' + BASE_LOCALE + '/';
    };

    $(window).on('click', function() {
        $('.popup-gif-search').html('');
    });
    
    // khi click vao nut GIF
    $('body').on('click', '.show-gifs-selection', function (event) {
        event.stopPropagation();
        getGifPopup($(this).parents('.form-comment'));

    });
    
    // khi click vao nut search anh GIF tren popup
    $('body').on('keydown', '#search-gif-input', function (e) {
        if (e.which == 13) {
            searchGif($(this).parents('.gifs-comment-block'));
            return false;
        }
    });
});
 
// hien thi popup
function getGifPopup(element) {
    var popupArea = element.find('.popup-gif-search');
    var gifPicker = element.find('#gifs-search-block');

    if (gifPicker) {
        gifPicker.css('display', 'none');
        $('.popup-gif-search').html('');
    }

    $.ajax({
        'url': baseUrlLocale() + 'comments/getGif',
        'type': 'GET',
        success: (response) => {
            popupArea.html('').append(response);
            var gifPicker = element.find('#gifs-search-block');
            element.find('#search-gif-input').val('');
            gifPicker.css('display', 'block');
            delete $.ajaxSettings.headers["X-CSRF-TOKEN"];
            $.ajax({
                'url': 'https://api.tenor.co/v1/trending?key=api_key&limit=40',
                'type': 'GET',
                success: (data) => {
                    popupArea.find('.body-result-gifs').html('');
                    $.each(data.results, function(key, value) {
                        popupArea.find('.body-result-gifs').append('<img class="gif-image" alt="" src="' + value.media[0]['gif']['url'] + '">');
                    });

                    initGifScroll();
                }
            });

        }
    });
}

//scroll de chon image GIF
function initGifScroll() {
    $('.body-result-gifs').addClass('open');
    $('.body-result-gifs').jScrollPane();
    $('.body-result-gifs').removeClass('open');
}

// search anh GIF
function searchGif(element) {
    var keyword = element.find('.text-search-gif').val();

    if (keyword) {
        delete $.ajaxSettings.headers["X-CSRF-TOKEN"];
        $.ajax({
            'url': 'https://api.tenor.co/v1/search?tag=' + keyword + '&key=app_key&limit=10',
            'type': 'GET',
            success: (data) => {
                $('#gifs-search-block .body-result-gifs .jspPane').html('');
                $.each(data.results, function(key, value) {
                    $('#gifs-search-block .body-result-gifs .jspPane').append('<img class="gif-image" alt="" src="' + value.media[0]['gif']['url'] + '">');
                });
            }
        });
    }
}   
```
Các bạn nhớ thêm app_key vào code để lấy được link api nhé. Bạn thử truy cập vào link này: https://api.tenor.co/v1/trending?key=HX6I6FBY3S97&limit=10 của mình, dữ liệu hiển thị rất dễ nhìn phải không. Mình chỉ việc lấy ra url để thêm vào thẻ img, hiển thị ra bên ngoài.
Ngoài ra còn có các option lấy ảnh GIF, các bạn có thể tham khảo thêm ở link này: https://tenor.com/gifapi/documentation#quickstart
## Kết luận
Việc lấy ảnh GIF này thật ra rất đơn giản. Sau khi comment bằng ảnh GIF thì các bạn cũng chỉ cần lấy url của nó lưu vào trong db mà thôi. Cảm ơn các bạn đã theo dõi.