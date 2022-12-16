#  I. Lời nói đầu.
Chào mọi người! mình từng viết một bài hiển thị gợi ý tìm kiếm với ajax (link bài: https://viblo.asia/p/goi-y-tim-kiem-voi-ajax-trong-laravel-XL6lAxVrZek) và trong bài đấy mình có nói sẽ viết một bài về gợi ý tìm kiếm nhưng với Typeahead  một thư viện và áp dụn cho việc gợi ý tìm kiếm của JavaScript. Tuy nhiên mình mới tìm hiểu được một cái kinh điển hơn nhiều và hôm nay mình sẽ viết về nó. 
     
Full text search nếu bạn tìm kiếm từ khóa này thì không thiếu tài liệu cho bạn nghiên cứu và làm theo nhưng chắc chắn sẽ có khá nhiều vấn đề sẽ sảy ra. MÌnh cũng thế nhưng nay đã sử lý được mớ rắc rối đấy nên chía sẻ với mọi người, nếu hay thì áp dụng sai sót thì anh em đóng ghóp ý kiến nhé!
 
#  II. Fulltext search trong Laravel.
Không nói nhiều mình sẽ không nói mấy cái lý thuyết dài ngoằng nữa các bạn thích lý thuyết lên mạng tra có cả rừng luôn. Vào thẳng vấn đề luôn nhé!. Bài này mình sẽ áp dụng fulltext search cho gợi ý tìm kiếm trong laravel và dĩ nhiên các bạn có thể dùng nó làm search cho trang của mình luôn. Thực hành luôn nè. lưu ý (với win thì các bạn dùng lệnh trêm command còn unbutu thì terminal đều ok)
  
##   1. Tạo dữ liệu ( khởi động).
Mấy cái lệnh tạo controller với migrate,... thì mình khỏi viết nhé bạn nào không biết mấy lệnh đấy thì tra google hoặc vào link bài viết mình để bên trên có các câu lệnh mẫu tạo mấy cái này đấy. Mình nói cái chính cho nhanh.
    
Các bạn tạo cho mình migrate có tên bảng là users và thêm trường dữ liệu cho nó dưới đấy là demo migrate của mình luôn các bạn coppy cho nhanh nè. Mình tìm kiếm theo tên nhé nên các bạn để mỗi trường tên thôi cũng được chả sao cả.
```php    
<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100);
            $table->string('email', 100)->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
```

Rồi chạy migrate xem có bảng users chưa nào. Mà quên fulltext search thì phải đánh index mới tìm được chứ các bạn tạo cho mình các migrate để update thêm cho thằng bảng users nào. Rườn rà tý cho mấy bạn ôn lại kiến thưc thôi. Dưới đây là migrate mình đặt tên là add_user để add thêm dữ liệu cho bảng users bạn đặt tên là gì cũng được.
 
 ```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            DB::statement('ALTER TABLE users ADD FULLTEXT `name` (`name`)'); //đánh index cho cột name
            DB::statement('ALTER TABLE users ENGINE = MyISAM'); // đánh index theo kiểu MyISam ngoài ra còn có kiểu InnoDB nếu không có dòng này cũng được mysql sẽ mặc định là index kiểu MyISAM nhé
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            DB::statement('ALTER TABLE users DROP INDEX name'); // khi chạy lệnh rollback thì làm điều ngược lại với thằng trên thế thôi
        });
    }
}
 ```
 OK đánh index có hai kiểu bạn dùng kiểu nào cũng được xem link này để biết chi tiết hai kiểu đấy nhé: https://viblo.asia/p/myisam-innodb-in-mysql-924lJOkm5PM
  
 Bây giờ thì bạn tạo seeder và khởi tạo dữ liệu mấu đi nào. cái này thì mình khỏi hướng dẫn nhé cơ bản rồi bạn nào máu liều thì vô cớ sở dữ liệu thêm luôn cho máu (cái này không khuyến khích).
  
##   2. Cuộc chiến bắt đầu.
 Làm theo nhé. Tạo cho mình hai route như sau.
```php
   Route::get('/search', 'HomeController@search');
    Route::post('/search', 'HomeController@searchFullText')->name('search');
```
Có route rồi thì tạo controller có tên là HomeController giống tên controller bạn đặt cho route nhé.
Có HomeController rồi thì vào viết cho nó mấy cái abc để hiển thị view tìm kiếm nào. Tên view mình đặt là search.blade.php nhé!

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Repositories\Contracts\UserRepository;

class HomeController extends Controller
{

    // protected $user;

    // public function __construct(UserRepository $user)
    // {
    //     $this->user = $user;
    // }

    public function search()
    {
        return view('search');
    }
}
```

Các bạn chạy thử xem ra view search chưa nào đường dẫn nhớ /search nhé.
Không biết các bạn dùng repository không nhỉ mình lỡ viết vào repo rồi. Thôi mình viết trức tiếp ngoài controlller vì có thể có nhiều bạn không dùng repo.
Viết một mã ajax để bắt sự kiện khi người dùng nhập từ khóa tìm kiếm nào. Và sửa lại trang search.blade.php theo như mình nhé!.
 ```php
 <!DOCTYPE html>
<html>
<head>
  <title>Full text search</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <style type="text/css">
  .box{
    width:600px;
    margin:0 auto;
}
</style>
</head>
<body>
  <br />
  <div class="container box">
     <h3 align="center">Gợi ý tìm kiếm fulltext search</h3><br />   
     <div class="form-group">
        <div class="header-search">
            <form method="POST" id="header-search">
            <input type="text" name="search" class="form-control m-input" placeholder="Enter Country Name" />
            {{ csrf_field() }}
            </form>
        </div>
        <div id="search-suggest" class="s-suggest"></div>
    </div>
</div>
</div>
</body>
</html>

<script type="text/javascript">
    $('#header-search').on('keyup', function() {
        var search = $(this).serialize();
        if ($(this).find('.m-input').val() == '') {
            $('#search-suggest div').hide();
        } else {
            $.ajax({
                url: '/search',
                type: 'POST',
                data: search,
            })
            .done(function(res) {
                $('#search-suggest').html('');
                $('#search-suggest').append(res)
            })
        };
    });
</script>
 ```
 
Các bạn vào controller viết hàm bắt dữ liệu thằng ajax chả về nào dd xem có gì chưa nào.
 ```php
 <?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{

    public function search()
    {
        return view('search');
    }

    public function searchFullText(Request $request)
    {
        dd($request->search);
    }
}
 ```
 Ra chạy thử xem có gì chưa nè!
 ![](https://images.viblo.asia/34988286-4108-4b5d-9b6e-0e76a70b381c.png)
 
##  3. Fulltext search (tăng tốc).
 
Quên mất một điều quan trọng, các bạn tạo modal cho thằng users đi nhé, tý quên đấy. Và viết luôn cho nó mấy hàm để tìm kiếm phần viết hàm search mình cũng tìm kiếm trên mạng thôi chứ không phải tự mình viết.
 ```php
 <?php

namespace App\Eloquent;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use FullTextSearch;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

     protected function fullTextWildcards($term)
    {
        // removing symbols used by MySQL
        $reservedSymbols = ['-', '+', '<', '>', '@', '(', ')', '~'];
        $term = str_replace($reservedSymbols, '', $term);
 
        $words = explode(' ', $term);
 
        foreach ($words as $key => $word) {
            /*
             * applying + operator (required word) only big words
             * because smaller ones are not indexed by mysql
             */
            if (strlen($word) >= 1) {
                $words[$key] = '+' . $word  . '*';
            }
        }
        
        $searchTerm = implode(' ', $words);
 
        return $searchTerm;
    }
 
    public function scopeFullTextSearch($query, $columns, $term)
    {
        $query->whereRaw("MATCH ({$columns}) AGAINST (? IN BOOLEAN MODE)", $this->fullTextWildcards($term));

        return $query;
    }
}

 ```
 
 Bây giờ vô HomeControll use cái model và kết thúc đi nào. Các bạn chú ý modal user mình để trong thư mục Eloquent nên các bạn chú ý đường dẫn của mình để user cho đúng.
  ```php
  <?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Eloquent\User;

class HomeController extends Controller
{

    public function search()
    {
        return view('search');
    }

    public function searchFullText(Request $request)
    {
        if ($request->search != '') {
            $data = User::FullTextSearch('name', $request->search)->get();
            foreach ($data as $key => $value) {
                echo $value->name;
                echo '<br>'; // mình viết vầy cho nhanh các bạn tùy chỉnh cho đẹp nhé
            }
        }
        // return view('search', $data); thay vì foreach như mình bạn có thể ném cái data vào 1 cái view nào đấy nhìn cho đẹp
    }
}

  ```
  
Ra thưởng thức thành quả nào. Bạn sẽ thấy trang search của mình thật bá đạo như google vậy. Bạn thử tìm kiếm như thế này để xem thành công chưa. ví dụ bạn có tên user là Lương Xuân Cương. Bạn nhập cho minh từ khóa lần lượt  là Lương Cương, Cương Lương, Lương Xuân Cương xem có ra kết quả Lương Xuân Cương không nhé!. Bạn nào mà không ra thì đừng vội buồn mà kéo xuống dưới làm tiếp nào.
## 4. Về đích.

Vấn đề lớn đặt ra. Nếu các bạn để ý thì khi bạn gõ từ khóa nòa dưới 4 từ thì nó không tìm kiếm được, ví dụ có user tên lê văn lương bạn gõ chứ lê nó không ra. Tại sao vậy, cái này là do thằng mysql nhé. Mắc định thì mysql chỉ đánh index cho từ nó từ 4 ký tự chở lên còn dưới 4 thì nghỉ.

Không sao vấn đề này dễ giải quyết thôi. Mình dùng unbutu nên sẽ vào theo đường dẫn opt/lampp/etc tìm file my.cnf máy các bạn có thể sẽ khác một chút nhưng nếu dùng xampp thì nó lằm trong thằng etc còn trên win thì bạn vào link ngay  bên dưới này để đọc nhé trong đấy có đầy đủ về các text.

Bạn mở cái file my.cnf lên nhớ cấp quyền cho nó mới sửa được, cấp như thể nào thì lên google nhé. Bạn  thay đổi trường ft_min_word_len ở dưới dòng [mysqld] nếu không có dòng đấy thì bạn thêm mới cho nó luôn. như bên dưới nhé

ft_min_word_len = 2 //nếu dùng MyISAM, =2 là để đánh index cho từ nào có 2 ký tự chở lên bạn có thể để 1 để đánh cho tất cả.

innodb_ft_min_token_size=2 //nếu dùng InnoD

Song rồi để những cấu hình này có hiệu lực, ta phải restart lại mysql và rebuild lại index. Bạn mở terminal lên và gõ mysql - u root - p nếu không vào được thì bạn cài mấy cái nó yêu cầu vào là được. sau khi vào được mysql thì bạn chạy lệnh sau để thấy tác dụng:

REPAIR TABLE table_name QUICK;// table_name là tên bảng muốn reset Option Quick có nghĩa là chỉ rebuild lại index mà không đụng tới data.

Mình đã thành công còn các bạn.

Mọi vấn đề về thằng này thì bạn tìm hiểu ở link này nhé rất hữu ích, full mấy cái định nghĩa để đọc và có thể giải quyết thắc mắc cho bạn: https://forum.gocit.vn/threads/mysql-full-text-search.323/