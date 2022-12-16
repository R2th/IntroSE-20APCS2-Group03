### Giới thiệu
Thu thập dữ liệu (crawl data) là một thuật ngữ không có gì là xa lạ trong ngành marketing, Dịch Vụ Seo. Vì crawl là kỹ thuật mà các robots của các công cụ tìm kiếm phổ biến hiện nay sử dụng như Google, Yahoo, Bing, Yandex, Baidu…  Crawler có công việc chính là thu thập dữ liệu từ một trang web bất kì, hoặc chỉ định trước rồi phân tích cú pháp mã nguồn HTML để đọc dữ liệu và bóc tách thông tin dữ liệu theo yêu cầu mà người dùng đặt ra hoặc các dữ liệu mà Search Engine yêu cầu.

### Laravel Dusk là gì
Laravel Dusk là một công cụ tự động hóa trình duyệt  do Laravel cung cấp. Nó có khả năng truy cập ứng dụng web của bạn hoặc bất kỳ trang web nào khác trong trình duyệt, tương tự như một người dùng thực tế đang điều hành trang web của bạn. Mặc dù mục đích chính của Laravel Dusk là kiểm tra tự động hóa,tuy nhiên nó cũng có thể được sử dụng để quét web.

### Cài đặt Laravel Dusk
Việc cài đặt Laravel Dusk khá là đơn giản. Chúng ta có thể sử dụng composer để làm việc đó : 
```
composer require --dev laravel/dusk
```

Sau khi package đã được cài, chúng ta có thể dùng lệnh artisan để cài đặt và sinh ra các file mặc định :
```
php artisan dusk:install
```

### Chuẩn bị file migration và bảng cơ sở dữ liệu
Để lưu dữ liệu sau khi crawl, chúng ta tạo 1 bảng **Page**
```
php artisan make:model Page -m
```

File migration của chúng ta sẽ trông như này : 
```
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->increments('id');
            $table->string('url','1024');
            $table->text('title')->nullable();
            $table->unsignedInteger('status')->nullable();
            $table->boolean('isCrawled');
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
        Schema::dropIfExists('pages');
    }
}
```

### Dusk Spider Test
Bây giờ chúng ta sẽ cùng thử chạy Laravel Dusk nhé
```
php artisan dusk:make duskSpiderTest
```

Nội dung file duskSpiderTest sẽ như sau: 
```

<?php

namespace Tests\Browser;

use App\Page;
use Facebook\WebDriver\WebDriverBy;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class duskSpiderTest extends DuskTestCase
{

    protected static $domain = 'laravel.com';
    protected static $startUrl = 'https://laravel.com/';


    public function setUp(): void{
        parent::setUp();
        $this->artisan('migrate:fresh');
    }

    /** @test */
    public function urlSpider()
    {

        $startingLink = Page::create([
            'url' => self::$startUrl,
            'isCrawled' => false,
        ]);

        $this->browse(function (Browser $browser) use ($startingLink) {
            $this->getLinks($browser, $startingLink);
        });
    }

    protected function getLinks(Browser $browser, $currentUrl){

        $this->processCurrentUrl($browser, $currentUrl);


        try{

            foreach(Page::where('isCrawled', false)->get() as $link) {
                $this->getLinks($browser, $link);
            }


        }catch(Exception $e){

        }
    }

    protected function processCurrentUrl(Browser $browser, $currentUrl){

        //Check if already crawled
        if(Page::where('url', $currentUrl->url)->first()->isCrawled == true)
            return;

        //Visit URL
        $browser->visit($currentUrl->url);

        //Get Links and Save to DB if Valid
        $linkElements = $browser->driver->findElements(WebDriverBy::tagName('a'));
        foreach($linkElements as $element){
            $href = $element->getAttribute('href');
            $href = $this->trimUrl($href);
            if($this->isValidUrl($href)){
                //var_dump($href);
                Page::create([
                    'url' => $href,
                    'isCrawled' => false,
                ]);
            }
        }

        //Update current url status to crawled
        $currentUrl->isCrawled = true;
        $currentUrl->status  = $this->getHttpStatus($currentUrl->url);
        $currentUrl->title = $browser->driver->getTitle();
        $currentUrl->save();
    }


    protected function isValidUrl($url){
        $parsed_url = parse_url($url);

        if(isset($parsed_url['host'])){
            if(strpos($parsed_url['host'], self::$domain) !== false && !Page::where('url', $url)->exists()){
                return true;
            }
        }
        return false;
    }

    protected function trimUrl($url){
        $url = strtok($url, '#');
        $url = rtrim($url,"/");
        return $url;
    }

    protected function getHttpStatus($url){
        $headers = get_headers($url, 1);
        return intval(substr($headers[0], 9, 3));
    }
}
```

- **startUrl** và **domain** là website mà chúng ta sẽ crawl
- **setUp** method dùng để làm mới lại database mỗi lần chạy test
- Chúng ta bắt đầu lấy dữ liệu trong hàm **urlSpider** trong đó sẽ gọi đến hàm **getLinks**
- **getLinks** xử lý các url, lấy tất cả link của web hiện tại và đưa vào database
- **isValidUrl**, **trimUrl** là hàm để kiểm tra link có đúng yêu cầu

Cuối cùng chạy dusk bằng lệnh artisan nhé : 
```
php artisan dusk --filter urlSpiderTest
```

Bài viết được dịch từ [Crawling website using Laravel Dusk](https://medium.com/@tushargugnani_54389/crawling-website-using-laravel-dusk-spider-bbbbe487a21)