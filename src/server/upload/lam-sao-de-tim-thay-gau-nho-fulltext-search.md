Xin chào. Sau một tháng lười biếng thì cuối cùng mình cũng đã tìm được cảm hứng cho bài viết kì này. Cũng không biết là cảm hứng hay là mất hứng nữa, khi "gấu không có mà gió đã về" rồi. Trời thì rét căm căm, mà đâu đâu cũng thấy chúng nó khoe nào là gấu, nào là crush. Haizz, mấy chú tưởng mỗi mấy chú có gấu thôi à. Chị đây cũng phải tìm cho ra gấu của chị nhé:D. Cơ mà chị không biết tìm gấu, chị chỉ biết fulltext-search thì làm sao bây giờ??? Đọc bài viết này để cùng tìm ra câu trả lời nhé! ;)

## 1. Khi nào sử dụng fulltext-search?
Khi không có gấu ý hả? Biết đâu đấy?

Còn ngoài ra thì là mà:
    
- Để tìm kiếm trên nhiều cột cùng một lúc. ví dụ: kết hợp người dùng với tên, họ, email và tên người dùng.
- Để sắp xếp kết quả theo mức độ phù hợp giữa nội dung tìm kiếm và kết quả.
- Để cải thiện hiệu suất của các truy vấn sử dụng `LIKE '% term%’
- Để áp dụng các mẫu tìm kiếm nâng cao như bỏ qua các kết quả bao gồm một từ cụ thể.
## 2. Ở đây không có scout hay elastic nhé!
Đơn giản vì scout thì mất phí còn elastic thì phải cấu hình. Mà mình thì không biết :D và cũng không muốn tốn phí để tìm gấu haha :D!!!

## 3. Thử tìm nào...

### 3.1 Đầu tiên là thêm index trong migration:

>>Lưu ý: Được chọn nhiều trường vì mục tiêu của fulltext-search là tìm kiếm trên nhiều trường cùng một lúc.
```php
public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->increments('id');
        $table->string('first_name');
        $table->string('last_name');
        $table->string('email')->unique();
    });

    // Full Text Index
    DB::statement('ALTER TABLE users ADD FULLTEXT fulltext_index (first_name, last_name, email)');
}
```
Và đừng quên use **Illuminate\Support\Facades\DB** để sử dụng DB đấy:
```php
use Illuminate\Support\Facades\DB;
```
Cuối cùng, hãy chạy migrate để hoàn tất bước này nhé ;)
```php
php artisan migrate
```
### 3.2 Tạo trait

Bạn nên tạo 1 file Traits/FullTextSearch.php để có thể tái sử dụng code này cho nhiều model khác nhau thay vì viết hàm search riêng cho từng model nhé:
```php
<?php
 
namespace App;
 
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
 
        foreach($words as $key => $word) {
            /*
             * applying + operator (required word) only big words
             * because smaller ones are not indexed by mysql
             */
            if(strlen($word) >= 3) {
                $words[$key] = '+' . $word . '*';
            }
        }
 
        $searchTerm = implode( ' ', $words);
 
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
        $columns = implode(',',$this->searchable);
 
        $query->whereRaw("MATCH ({$columns}) AGAINST (? IN BOOLEAN MODE)" , $this->fullTextWildcards($term));
 
        return $query;
    }
}
```

### 3.3 Định nghĩa Model

Ở đây ta sẽ include file trait vừa tạo, đồng thời định nghĩa các trường được sử dụng cho fulltext-search, đó cũng chính là các trường mà chúng ta đã chọn để  thêm index trên migration:
```php
use FullTextSearch;
protected $searchable = [
    'first_name',
    'last_name',
    'character'
];
```
### 3.4 Bình tĩnh nào, sắp xong rồi

Do MySql không đánh index với các từ có số ký tự nhỏ (thường là 4), ví dụ như: tôi (3 kí tự), nên ta sẽ phải cấu hình lại file my.cnf của mysql :
```
cd /etc/mysql/mysql.conf.d
vi my.cnf
```
Dưới dòng [mysqld], thêm ft_min_word_len, như sau:
```
[mysqld]
#
# * Basic Settings
#
user		= mysql
pid-file	= /var/run/mysqld/mysqld.pid
socket		= /var/run/mysqld/mysqld.sock
port		= 3306
basedir		= /usr
datadir		= /var/lib/mysql
tmpdir		= /tmp
lc-messages-dir	= /usr/share/mysql
ft_min_word_len = 2
```
### 3.5 Cuối cùng là hưởng thụ thành quả thôi nào :)

Giờ bạn chỉ cần gọi tới hàm search(<noi_dung_tim_kiem>) là xong.
Ví dụ một chút:
```php
User::search('gấu')->where('is_active', '=', 1)->get();
User::search('gấu dễ thương')->latest()->get();
User::search('gấu ở đâu rồi')->get();
...
```
## 4. Giờ thì bạn đã tìm thấy gấu chưa nào :P
Bạn thử đi, xem có tìm thấy gấu không :D. Nếu không thấy thì chắc là do "gấu"  không có trong database của bạn nhé, chứ không phải lỗi của fulltext-search đâu hahahahah

***Kết luận***: fulltext-search có thể giúp bạn tìm được gấu nhé, còn được hay không là phụ thuộc vào bạn thôi ahihi.

Mùa đông đến rồi, chúc các bạn tìm được "gấu" của mình nhé. Mình cũng đi tìm gấu của mình đây. Tạm biệt (có hẹn gặp lại) :) hí hí hí
            
![](https://images.viblo.asia/1c74952e-9518-4632-baca-917a860ed765.jpg)


Link tài liệu tham khảo: https://arianacosta.com/php/laravel/tutorial-full-text-search-laravel-5/