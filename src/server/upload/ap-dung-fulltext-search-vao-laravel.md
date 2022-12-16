### **Ưu/nhược điểm của fulltext search so với search thông thường**<br>
về vấn đề này mời các bạn xem [tại đây](https://viblo.asia/p/gioi-thieu-ve-full-text-search-BAQ3vV61vbOr)<br>
### 1. **Thêm index trong migration**<br>
Fulltext là 1 kiểu index chấp nhận 1 hay nhiều cột. Vì `Laravel` không có hàm hỗ trợ tạo index fulltext nên ta sẽ phải tự viết.
```
    public function up()
    {
       Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            DB::statement('ALTER TABLE users ADD FULLTEXT `search` (`email`, `name`)');
            DB::statement('ALTER TABLE users ENGINE = MyISAM');
        });
     }
```
Ở đây ta sử dụng `Storage Engine MyISAM` thay vì `InnoDB`. Để biết sự khác nhau giữa 2 engine này xin mời xem [tại đây](https://viblo.asia/p/myisam-innodb-in-mysql-924lJOkm5PM)

### 2. **Định nghĩa trường searchable** <br>
Vào trong `User` `model` và thêm đoạn code dưới đây. Ta cần phải thêm đúng tên cột đã được định nghĩa trong bước 1.
```
    /**
     * The columns of the full text index
     */
    protected $searchable = [
        'email',
        'name'
    ];
```

Nếu ta không định nghĩa đúng các tên các cột, `MySql` sẽ không thể tìm ra được index và sẽ trả về lỗi `SQLSTATE[HY000]: General error: 1191 Can't find FULLTEXT index matching the column list`. 
<br>

### 3. **Tạo Trait** <br>
    Trong một project sẽ không chỉ có 1 `model` cần search. Thay vì viết code search trong tất cả các model đó, ta sẽ tạo 1 `trait` để tránh bị lặp lại code. <br>
    Tạo thư mục `Traits` trong `app` và file `fulltextsearch.php`
```
<?php

namespace App\Traits;

trait FullTextSearch
{
    /**
     * Replaces spaces with full text search wildcards
     *
     * @param string $term
     * @return string
     */
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
            if (strlen($word) >= 2) {
                $words[$key] = '+' . $word . '*';
            }
        }
 
        $searchTerm = implode(' ', $words);
 
        return $searchTerm;
    }
 
    /**
     * Scope a query that matches a full text search of term.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $term
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $term)
    {
        $columns = implode(',', $this->searchable);
 
        $query->whereRaw("MATCH ({$columns}) AGAINST (? IN BOOLEAN MODE)", $this->fullTextWildcards($term));
 
        return $query;
    }
}
```
Bởi vì MySql không đánh index ở các từ có số ký tự nhỏ (mặc định là 4) nên ta sẽ phải thay đổi trường `ft_min_word_len` ở dưới dòng `[mysqld]` trong file `my.cnf`.<br>
trên `ubuntu`: <br>
sửa file trong `/etc/mysql/my.cnf`. Nếu bạn dùng `XAMPP` thì sửa trong file `[thư mục cài xampp]/etc/mysql/my.cnf`<br>
```
ft_min_word_len = 2 //nếu dùng MyISAM
innodb_ft_min_token_size=2 //nếu dùng InnoDB
```
Ngoài ra, nếu các từ bạn search là `stopword` thì MySQL sẽ bỏ qua các từ này. Nếu bạn muốn bỏ `stopword` thì thêm dòng `ft_stopword_file = ""` vào trong file `my.cnf`.
> Ở đây, ta sử dụng chế độ `IN BOOLEAN MODE`. MySql còn có chế độ khác là `IN NATURAL LANGUAGE MODE`. Bạn có thể tìm hiểu thêm [tại đây](https://butchiso.com/2011/12/mysql-full-text-search-p2.html#natural-language-mode-v%C3%A0-boolean-mode).
### 4. **Sử dụng** <br>
```
// assuming 'arian' is the in column first_name, and 'acosta' in last_name
// all the following queries will work!
User::search('arian acosta')->get();
User::search('acosta arian')->get();
User::search('ari aco')->get();
User::search('arian')->get();
User::search('arian acosta somethingelse')->get();
 
// refining the query
User::search('arian')->where('is_active', '=', 1)->get();
User::search('arian')->latest()->get();
User::search('arian')->paginate();
```

bài này mình dịch từ trang [https://arianacosta.com/php/laravel/tutorial-full-text-search-laravel-5/](https://arianacosta.com/php/laravel/tutorial-full-text-search-laravel-5/)