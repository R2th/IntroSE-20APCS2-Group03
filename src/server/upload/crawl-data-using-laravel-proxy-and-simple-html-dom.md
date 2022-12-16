Hôm nay mình sẽ giới thiệu các bạn làm sao có thể lấy được dữ liệu từ bất kỳ một trang web nào sử dụng laravel, proxy và html dom
Trong bài viết này mình sẽ lấy ví dụ là crawl product của amazon

## Cài đặt

Đầu tiên các bạn vào site [này](https://simplehtmldom.sourceforge.io/) download file  `simple_html_dom.php` để vào thư mục `Helpers` của laravel chẳng hạn (thư mục mình tự tạo ra, bạn có thể bỏ vào bất cứ thu mục nào bạn muốn).
sau đó mở file `composer.json` ra và thêm đường dẫn file vừa tạo vào phần `autoload`
```json
"autoload": {
        "files": [
            "app/Helpers/simple_html_dom.php" # thêm vào đây
        ],
        "psr-4": {
            "App\\": "app/"
        },
        "classmap": [
            "database/seeds",
            "database/factories"
        ]
    },
```

rồi chạy `composer dumpautoload` để file này được load vào thư viện của laravel.


## Code

Để crawl dữ liệu mình sẽ tạo ra file `command` sau đó từ `command` gọi sang phần jobs của laravel. nếu dùng thế này mình có thể đẩy toàn bộ tác vụ crawl chạy tự động cũng như đẩy phần chạy vào `queue` rồi chúng ra có thể dùng `supervisor` để start 1 lúc nhiều process lên chạy cùng 1 lúc. nhưng mình khuyên là nên để tối đa 5 process chạy 1 lúc thôi, amazone sẽ block IP nào có nhiều request đến trong 1 khoảng thời gian ngắn (cái này có thể dùng public proxy hoặc private proxy để vượt qua được).

- Đầu tiên bạn cần tạo 1 file `AwsProductCrawler.php` trong thưc mục `app/Console/Commands`  có nội dung như sau: 

```php
<?php

namespace App\Console\Commands;

use App\Jobs\AwsCrawlerLink;
use DB;
use Illuminate\Console\Command;

class AwsProductCrawler extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'aws:product';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'aws product crawler, run one time a week';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    const LIMIT = 25;

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        DB::table('merchants')->orderBy('id')->chunk(self::LIMIT, function ($merchants) {
            foreach ($merchants as $merchant) {
                AwsCrawlerLink::dispatch($merchant);
            }
        });

        return;
    }
}
```

file này có nội dung khá đơn giản, nó chỉ là lấy những merchants nào cần crawl có trong database thôi, trong bản merchant các bạn cần có merchant_id để có thể vào list của merchant này get toàn bộ product về.

Tiếp theo bạn cần tạo 1 file `AwsCrawlerLink.php` trong thư mục `Jobs` của laravel có nội dung sau:

```php
<?php

namespace App\Jobs;

use App\Helpers\AwsClient;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Mockery\Exception;

class AwsCrawlerLink implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    const CLASS_DETAIL_PRODUCT = '.a-text-normal';

    const TIME_OUT = 300;

    protected $seller;

    /**
     * Create a new job instance.
     * @param  $seller
     * @return void
     */
    public function __construct($seller)
    {
        $this->seller = $seller;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            set_time_limit(self::TIME_OUT);
            Log::debug('Start crawl product link, seller = ' . $this->seller->merchant_id);

            $awsBaseUrl = env('BASE_AWS_URL', config('common.default_aws_url'));
            $sellerBaseUrl = $awsBaseUrl . '/s?me=' . $this->seller->merchant_id;
            $endPage = $this->countPage($sellerBaseUrl);

            for ($i = 1; $i <= $endPage; $i++) {
                $urlWithPage = $sellerBaseUrl . '&page=' . $i;

                Log::debug('start get list products $urlAwsSeller =' . $urlWithPage);

                $html = AwsClient::getContent($urlWithPage);
                if (is_array($html)) {
                    continue;
                }

                $html = str_get_html($html);
                foreach ($html->find(self::CLASS_DETAIL_PRODUCT) as $productDetailUrl) {
                    if (!empty($urlDetail = $productDetailUrl->href)) {
                        $urlDetail = env('BASE_AWS_URL', 'https://www.amazon.co.jp') . $urlDetail;
                        AwsCrawlerDetail::dispatch($this->seller->id, $urlDetail);
                    }
                }
            }
        } catch (Exception $exception) {
            report($exception);
        }

        Log::debug('End crawl product, seller = ' . $this->seller->merchant_id);
        return;
    }

    private function countPage($urlAwsSeller)
    {
        Log::debug("Start get count page, url= {$urlAwsSeller}");
        $html = AwsClient::getContent($urlAwsSeller);
        if (is_array($html)) {
            return 0;
        }
        $html = str_get_html($html);
        // find end page more than 9 page
        $page = $html->find('.a-disabled', 1);
        if ($page && isset($page->plaintext)) {
            Log::debug("page count is {$page->plaintext}");
            $pageCount = $page->plaintext;
        }

        // find end page not more than 9 page
        $page = $html->find('.a-normal');
        if ($page) {
            $page = end($page);
            if (isset($page->plaintext)) {
                Log::debug("page count is {$page->plaintext}");
                $pageCount = $page->plaintext;
            }
        }

        AwsClient::cleanHtml($html);
        if (isset($pageCount)) {
            return $pageCount;
        }

        Log::error("======= Cannot get countPage urlAwsSeller = {$urlAwsSeller} or maybe count Page = 1");

        return 1;
    }
}
```

File này có nhiệm vụ lấy toàn bộ `url` của product về, xong nó tiếp tục đẩy sang `AwsCrawlerDetail` để lấy chi tiết thông tin của `products`

function `getContent` có nội dung như sau:

```php
 public static function getData($url, $proxy = false)
    {
        $client = new Client();

        try {
            if (!$proxy) {
                $content = $client->get($url);
                return $content->getBody()->getContents();
            }

            $content = $client->get($url, [
                'proxy' => $proxy,
                'connect_timeout' => 20, 
                'timeout' => 60,
                'allow_redirects' => false,
                'headers' => [
                    'User-Agent' => 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13',
                ]
            ]);
            return $content->getBody()->getContents();
        } catch (Exception $exception) {
            Log::error("(getData) Exception messages  = {$exception->getMessage()}");
            Log::error("(getData) status code = {$exception->getCode()}");

            return [
                'error' => true,
                'code' => $exception->getCode()
            ];
        }
    }
```


Cuối cùng là phần lấy thông tin chi tiết của product, cũng là phần dài và khó nhất có nội dung như sau `AwsCrawlerDetail.php`:

```php
<?php

namespace App\Jobs;

use App\Helpers\AwsClient;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\ProductStar;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class AwsCrawlerDetail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $seller_id;

    const TIME_OUT = 300; // second

    protected $detailProductUrl;
    protected $asin;

    /**
     * Create a new job instance.
     * @param $sellerId
     * @param $detailProductUrl
     * @param $asin
     * @return void
     */
    public function __construct($sellerId, $detailProductUrl, $asin = null)
    {
        $this->seller_id = $sellerId;
        $this->detailProductUrl = $detailProductUrl;
        $this->asin = $asin;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        set_time_limit(self::TIME_OUT);

        Log::debug("Start crawl product detail, url = " . $this->detailProductUrl);
        if ($this->checkAlreadyCrawl()) {
            Log::debug('product already crawl, end this product!');
            return;
        }

        try {
            $html = AwsClient::getContent($this->detailProductUrl);
            if (is_array($html)) {
                Log::debug('ignore this product content = ', $html);
                return;
            }

            $html = str_get_html($html);
            if (!$html) {
                Log::debug("content null");
                AwsClient::cleanHtml($html);
                return;
            }

            $arrProduct = $this->getProductData($html);
            $productDetail = $this->getProductDetail($html);
            $productStar = $this->getProductReviewStartDetail($html, $productDetail['review_count']);

            if (!empty($arrProduct['asin'])) {
                Log::debug('save product: ', $arrProduct);

                $product = Product::saveProduct($arrProduct, $this->asin);
                ProductDetail::saveProductDetail($product, $productDetail);
                ProductStar::saveProductStar($product, $productStar);
                Category::saveCategory($product, ['name' => $productDetail['category']]);
            }
            AwsClient::cleanHtml($html);
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
        }
        return;
    }

    public function checkAlreadyCrawl()
    {
        if ($this->asin) {
            $product = Product::where('asin', $this->asin)->first();
        } else {
            $product = Product::where('detail_aws_url', $this->detailProductUrl)->first();
        }

        if (!$product) {
            return false;
        }

        return ProductDetail::where('product_id', $product->id)
            ->whereDate('created_at', Carbon::now()->format('Y-m-d'))
            ->first();
    }

    /**
     * get product data from html dom
     * @param $html
     * @return array
     */
    public function getProductData($html)
    {
        $asin = $html->find('#cerberus-data-metrics', 0);
        if ($asin) {
            $asin = $asin->getAllAttributes();
        }

        $img = $html->find('#imgTagWrapperId img', 0);
        if ($img) {
            $img = $img->getAttribute('data-old-hires');
        }

        $sellAt = $html->find('.date-first-available .value', 0)->plaintext ?? null;

        if (!$sellAt) {
            $sellAt = $html->find('#productDetailsTable ul li', 4)->plaintext ?? null;
            $sellAt = str_replace('Amazon.co.jp での取り扱い開始日:', '', $sellAt);
        }

        return [
            'name' => $html->find('#productTitle', 0)->plaintext ?? null,
            'url_img' => $img,
            'asin' => $asin['data-asin'] ?? null,
            'seller_id' => $this->seller_id,
            'sell_at' => trim($sellAt),
            'detail_aws_url' => $this->detailProductUrl,
        ];
    }

    /**
     * get product detail from html dom
     * @param $html
     * @return array
     */
    public function getProductDetail($html)
    {
        $asin = $html->find('#cerberus-data-metrics', 0);
        if ($asin) {
            $asin = $asin->getAllAttributes();
        }

        $avgReview = $html->find('#acrPopover', 0)->title ?? 0;
        $acrCustomerReviewText = $html->find('#acrCustomerReviewText', 0)->plaintext ?? 0;

        $ranking = $html->find('#SalesRank .value', 0)->innertext ?? 0;

        if (!$ranking) {
            $ranking = $html->find('#SalesRank', 0)->innertext ?? 0;
        }

        if (!$ranking) {
            $ranking = $html->find('.pdTab', 1)->innertext ?? 0;
        }

        $ranking = $this->getCatAndRank($ranking);
        return [
            'price' => str_replace(',', '', $asin['data-asin-price']) ?? 0,
            'currency_code' => $asin['data-asin-currency-code'] ?? 'JPY',
            'avg_review' => $this->getAvgReviewFromString($avgReview),
            'review_count' => $this->getNumberFromString($acrCustomerReviewText),
            'ranking' => $this->getRankingFromString($ranking),
            'category' => $this->getCatFromString($ranking),
        ];
    }

    /**
     * get start count for product review count
     * @param $html
     * @param $total
     * @return mixed
     */
    public function getProductReviewStartDetail($html, $total)
    {
        $arr['total_star'] = $total;
        for ($i = 1; $i <= 5; $i++) {
            $star = $this->getAStart($html, $i); // percent
            $star = ($star * $total) / 100;
            $arr["star_$i"] = (int)round($star);
        }

        return $arr;
    }

    /**
     * get data a star
     * @param $html
     * @param $int
     * @return int
     */
    public function getAStart($html, $int)
    {
        $star = $html->find("#histogramTable .{$int}star", 0);
        if (!$star) {
            return 0;
        }

        $star = $star->getAttribute('aria-label');
        $star = $this->getNumberFromString($star);
        $star = (int)preg_replace("/$int/", '', $star, 1);
        return $star;
    }

    /**
     * convert rate string to number
     * @param $str
     * @return mixed
     */
    public static function getAvgReviewFromString($str)
    {
        try {
            $str = explode('うち', $str);
            if (!$str) {
                Log::error("cannot get rate 1");
                return 0;
            }

            $matches = array_map('floatval', $str);
            if (empty($matches)) {
                return 0;
            }

            $matches = array_filter($matches);
            if (empty($matches)) {
                return 0;
            }

            return min($matches);
        } catch (\Exception $exception) {
            report($exception);
        }

        Log::error("cannot get rate 2");
        return 0;
    }

    /**
     * get category and product ranking
     * @param $str
     * @return string
     */
    public function getCatAndRank($str)
    {
        if (!$str) {
            return $str;
        }

        $str = preg_replace('#(<a.*?>).*?(</a>)#m', '$1$2', $str);
        $str = preg_replace('#(<ul.*?>).*?(</ul>)#m', '$1$2', $str);
        $str = preg_replace('#(<b.*?>).*?(</b>)#m', '$1$2', $str);
        $str = preg_replace('#(<tr.*?>).*?(</tr>)#m', '$1$2', $str);
        $str = preg_replace('#(<style.*?>).*?(</style>)#m', '$1$2', $str);
        $str = trim(strip_tags($str));
        $str = str_replace('()', '', $str);

        return trim($str);
    }

    /**
     * get product ranking from string
     * @param $str
     * @return int
     */
    public function getRankingFromString($str)
    {
        if (!$str) {
            return $str;
        }

        $ranking = explode('-', $str);

        if (!isset($ranking[1])) {
            return 0;
        }

        return $this->getNumberFromString($ranking[1]);
    }

    /**
     * get category from string
     * @param $str
     * @return int|string
     */
    public function getCatFromString($str)
    {
        if (!$str) {
            return '未定';
        }

        $ranking = explode('-', $str);

        if (!isset($ranking[0])) {
            return '未定';
        }

        return trim($ranking[0]);
    }

    /**
     * get number from string
     * @param $str
     * @return int
     */
    public function getNumberFromString($str)
    {
        if (!$str) {
            return 0;
        }

        return (int)filter_var($str, FILTER_SANITIZE_NUMBER_INT);
    }
}

```
Để chạy crawl này bạn chạy lệnh sau:

```sh
php artisan aws:product
```

## Proxy

Bạn để ý trong function `getContent` mình có để 1 tham số nữa là `proxy`, bạn có thể truyền proxy vào theo dạng `http:192.162.1.15:8080` để ẩn ip server hiện tại của bạn đi. 
proxy này kiếm ở đây nhé: https://hidemy.name/en/, mình đã mua `code`  của trang này để xử dụng, các bạn có thể mua hoặc kiếm proxy từ một nguồn khác cũng được.