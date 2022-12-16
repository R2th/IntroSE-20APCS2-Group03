* Ở bài này, chúng ta sẽ xây dựng 1 hệ gợi ý item-based từ đầu. Chúng ta sẽ sử dụng machine learning để so sánh độ tương đồng giữa 2 sản phẩm trong bộ dữ liệu sử dụng trong bài.

* Với machine learning, bạn có thể có rất nhiều giải thuật để áp dụng và việc lựa chọn sẽ phụ thuộc vào bộ data của bạn và mục đích của bạn. Vì vậy hãy thử vài thuật toán để lựa chọn ra thuật toán tốt nhất cho mục đích của bạn.
* Ở ứng dụng demo này sẽ có 3 giải thuật được sử dụng.
# Nhóm giải thuật Giám sát và Không giám sát
Cách giải thuật trong machine learning được chia làm 2 nhóm: học Giám sát và học Không giám sát

Học giám sát được sử dụng khi bạn đánh nhãn dữ liệu và bạn biết chính xác kết quả đầu ra. Nó kiểu kiểu như 1 giáo viên sửa lại các kết quả của thuật toán cho tới khi nó cho kết quả chấp nhận được

Học không giám sát là khi dữ liệu không được gán nhãn và bạn sẽ không biết kết quả chính xác của dữ liệu là gì. Thuật toán sẽ đưa ra và định dạng dữ liệu và qua đó bạn có thể phát hiện các đặc điểm và hiểu rõ hơn về dữ liệu.
# Lọc cộng tác hướng người dùng và lọc cộng tác hướng sản phẩm
Có 2 cách để biểu diễn sự gợi ý cho người dùng

Cách đầu tiên là hướng người dùng(**user-based**). Cách này hiểu đơn giản là bạn và 1 anh hàng xóm cùng thích chung 1 số hoạt hình như Doraemon, One Piece, …. và khi anh hàng xóm bắt đầu xem Siêu nhân Gao thì bạn cũng sẽ được giới thiệu để xem phim ấy.
Cách còn lại là hướng sản phẩm(**item-based**). Cách này thì không dựa vào việc người khác thích gì mà dựa vào việc bạn thích gì và hệ thống sẽ gợi ý ra các sản phẩm có đặc tính tương tự. Ví dụ như bạn thích Siêu nhân Gao thì hệ thống sẽ có các phim Siêu nhân Khủng Long, Siêu nhân Cuồng phong, Siêu nhân Thần kiếm, Siêu nhân Đạo chính choảng Siêu nhân Cảnh sát,…..
# Xây dựng ứng dụng
Với app thử nghiệm ở mục này, chúng ta sẽ xây dựng hệ gợi ý hướng sản phẩm với nhóm thuật toán Giám sát.

Chúng ta sử dụng các đặc tính của sản phẩm, trường hợp này là thời trang(chất liệu, màu sắc, độ ấm,…), giá và loại sản phẩm làm cơ sở cho việc tính toán độ tương đồng. Các thuật toán sử dụng là [Hamming Distance]
(https://en.wikipedia.org/wiki/Hamming_distance) cho đề xuất sản phẩm, [Euclidean Distance](https://en.wikipedia.org/wiki/Euclidean_distance) cho giá của sản phầm và [Chỉ mục Jacard](https://en.wikipedia.org/wiki/Jaccard_index) cho phân loại sản phẩm.
![](https://images.viblo.asia/495e2d5e-f0ce-48f8-bb10-f40e2d5ec698.png)

## Bước 1
Tạo project Laravel mới
```bash
composer create-project --prefer-dist laravel/laravel laravel-recommender-system
```
## Bước 2
Lấy bộ dữ liệu ở link dưới đây và lưu vào `./storage/data` trong project Laravel của bạn. Nếu bạn định sử dụng cho môi trường production thì lời khuyên đặc biệt trong trường hợp này là bạn hãy làm các model Eloquent và seed data vào cơ sở dữ liệu thay vì dùng JSON.

[[storage/data/products-data.json]](https://github.com/oliverlundquist/laravel-recommender-system/blob/ed525e911ce1240f9bda6cb3c845fe494cc5e243/storage/data/products-data.json)
## Bước 3
Ở đây 1 class chứa toàn bộ các thuật toán cần thiết được tạo ra để tính độ tương đồng. Copy code dưới đây và đặt vào `Similarity.php` trong `./app`.
```php
<?php declare(strict_types=1);

namespace App;

class Similarity
{
    public static function hamming(string $string1, string $string2, bool $returnDistance = false): float
    {
        $a        = str_pad($string1, strlen($string2) - strlen($string1), ' ');
        $b        = str_pad($string2, strlen($string1) - strlen($string2), ' ');
        $distance = count(array_diff_assoc(str_split($a), str_split($b)));

        if ($returnDistance) {
            return $distance;
        }
        return (strlen($a) - $distance) / strlen($a);
    }

    public static function euclidean(array $array1, array $array2, bool $returnDistance = false): float
    {
        $a   = $array1;
        $b   = $array2;
        $set = [];

        foreach ($a as $index => $value) {
            $set[] = $value - $b[$index] ?? 0;
        }

        $distance = sqrt(array_sum(array_map(function ($x) { return pow($x, 2); }, $set)));

        if ($returnDistance) {
            return $distance;
        }
        // doesn't work well with distances larger than 1
        // return 1 / (1 + $distance);
        // so we'll use angular similarity instead
        return 1 - $distance;
    }

    public static function jaccard(string $string1, string $string2, string $separator = ','): float
    {
        $a            = explode($separator, $string1);
        $b            = explode($separator, $string2);
        $intersection = array_unique(array_intersect($a, $b));
        $union        = array_unique(array_merge($a, $b));

        return count($intersection) / count($union);
    }

    public static function minMaxNorm(array $values, $min = null, $max = null): array
    {
        $norm = [];
        $min  = $min ?? min($values);
        $max  = $max ?? max($values);

        foreach ($values as $value) {
            $numerator   = $value - $min;
            $denominator = $max - $min;
            $minMaxNorm  = $numerator / $denominator;
            $norm[]      = $minMaxNorm;
        }
        return $norm;
    }
}
```
## Bước 4
Khi đã có 1 class chứa tất cả các giải thuật thì chúng ta cũng cần 1 class chứa các phép tính độ tương đồng. Tất cả code dưới đây là trong `ProductSimilarity.php` ở thư mục `./app`.

Phương thức `calculateSimilarityMatrix` sẽ tính toán sự giống nhau giữa tất cả các sản phẩm và tạo ra một ma trận. Nếu bạn định sử dụng hệ gợi ý này trong production hoặc nếu bạn có nhiều sản phẩm, bạn nên tạo một lệnh Artisan gọi chức năng này tuần tự thông qua Scheduler và lưu trữ kết quả trong Redis hoặc các cơ sở dữ liệu NoS QLtương tự. Bằng cách đó, bạn có ma trận tương tự đầy đủ được lưu trong bộ nhớ cache và không phải tính toán nó mỗi khi có request.
```php
<?php declare(strict_types=1);

namespace App;

use Exception;

class ProductSimilarity
{
    protected $products       = [];
    protected $featureWeight  = 1;
    protected $priceWeight    = 1;
    protected $categoryWeight = 1;
    protected $priceHighRange = 1000;

    public function __construct(array $products)
    {
        $this->products       = $products;
        $this->priceHighRange = max(array_column($products, 'price'));
    }

    public function setFeatureWeight(float $weight): void
    {
        $this->featureWeight = $weight;
    }

    public function setPriceWeight(float $weight): void
    {
        $this->priceWeight = $weight;
    }

    public function setCategoryWeight(float $weight): void
    {
        $this->categoryWeight = $weight;
    }

    public function calculateSimilarityMatrix(): array
    {
        $matrix = [];

        foreach ($this->products as $product) {

            $similarityScores = [];

            foreach ($this->products as $_product) {
                if ($product->id === $_product->id) {
                    continue;
                }
                $similarityScores['product_id_' . $_product->id] = $this->calculateSimilarityScore($product, $_product);
            }
            $matrix['product_id_' . $product->id] = $similarityScores;
        }
        return $matrix;
    }

    public function getProductsSortedBySimularity(int $productId, array $matrix): array
    {
        $similarities   = $matrix['product_id_' . $productId] ?? null;
        $sortedProducts = [];

        if (is_null($similarities)) {
            throw new Exception('Can\'t find product with that ID.');
        }
        arsort($similarities);

        foreach ($similarities as $productIdKey => $similarity) {
            $id       = intval(str_replace('product_id_', '', $productIdKey));
            $products = array_filter($this->products, function ($product) use ($id) { return $product->id === $id; });
            if (! count($products)) {
                continue;
            }
            $product = $products[array_keys($products)[0]];
            $product->similarity = $similarity;
            $sortedProducts[] = $product;
        }
        return $sortedProducts;
    }

    protected function calculateSimilarityScore($productA, $productB)
    {
        $productAFeatures = implode('', get_object_vars($productA->features));
        $productBFeatures = implode('', get_object_vars($productB->features));

        return array_sum([
            (Similarity::hamming($productAFeatures, $productBFeatures) * $this->featureWeight),
            (Similarity::euclidean(
                Similarity::minMaxNorm([$productA->price], 0, $this->priceHighRange),
                Similarity::minMaxNorm([$productB->price], 0, $this->priceHighRange)
            ) * $this->priceWeight),
            (Similarity::jaccard($productA->categories, $productB->categories) * $this->categoryWeight)
        ]) / ($this->featureWeight + $this->priceWeight + $this->categoryWeight);
    }
}
```
## Bước 5
Sau đây là route và view
```php
// routes/web.php
<?php



/*

|--------------------------------------------------------------------------

| Web Routes

|--------------------------------------------------------------------------

|

| Here is where you can register web routes for your application. These

| routes are loaded by the RouteServiceProvider within a group which

| contains the "web" middleware group. Now create something great!

|

*/



Route::get('/', function () {

    $products        = json_decode(file_get_contents(storage_path('data/products-data.json')));

    $selectedId      = intval(app('request')->input('id') ?? '8');

    $selectedProduct = $products[0];



    $selectedProducts = array_filter($products, function ($product) use ($selectedId) { return $product->id === $selectedId; });

    if (count($selectedProducts)) {

        $selectedProduct = $selectedProducts[array_keys($selectedProducts)[0]];

    }



    $productSimilarity = new App\ProductSimilarity($products);

    $similarityMatrix  = $productSimilarity->calculateSimilarityMatrix();

    $products          = $productSimilarity->getProductsSortedBySimularity($selectedId, $similarityMatrix);



    return view('welcome', compact('selectedId', 'selectedProduct', 'products'));

});
```
Và `welcome.blade.php`
```php
<!doctype html>

<html lang="en">

  <head>

    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <title>Recommender System in Laravel</title>

    <style>

        .large-product-image {

            width: auto;

            height: 200px;

        }

    </style>

  </head>

  <body>

    <div class="container">

        <div class="row mb-5" style="border-bottom: 1px solid #ccc">

            <div class="col text-center">

                <img class="p-3" style="height: 80px; width: auto; border-top: 1px solid #ccc; background-color: #f7f7f7" src="{{ $selectedProduct->image }}" alt="Product Image">

                @foreach ($products as $product)

                <a href="/?id={{ $product->id }}" style="text-decoration: none;">

                    <img class="p-3" style="height: 80px; width: auto;" src="{{ $product->image }}" alt="Product Image">

                </a>

                @endforeach

            </div>

        </div>

        <div class="row">

            <div class="offset-3 col-6">

                <h5>Selected Product</h5>

            </div>

        </div>

        <div class="row mb-5">

            <div class="offset-3 col-6">

                <div class="card">

                    <div class="text-center" style="background-color: #ccc">

                        <img class="large-product-image" src="{{ $selectedProduct->image }}" alt="Product Image">

                    </div>

                    <div class="card-body">

                        <p class="card-text text-muted">{{ $selectedProduct->name }} (${{ $selectedProduct->price }})</p>

                    </div>

                </div>

            </div>

        </div>

        <div class="row">

            <div class="offset-3 col-6">

                <h5>Similar Products</h5>

            </div>

        </div>

        @foreach ($products as $product)

        <div class="row mb-5">

            <div class="offset-3 col-6">

                <div class="card">

                    <div class="text-center" style="background-color: #ccc">

                        <img class="large-product-image" src="{{ $product->image }}" alt="Product Image">

                    </div>

                    <div class="card-body">

                        <h5 class="card-title">Similarity: {{ round($product->similarity * 100, 1) }}%</h5>

                        <p class="card-text text-muted">{{ $product->name }} (${{ $product->price }})</p>

                    </div>

                </div>

            </div>

        </div>

        @endforeach

    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

  </body>

</html>
```
## Bước 6
Chạy `php artisan serve` và xem kq 
![](https://images.viblo.asia/cda0edcb-7a98-4709-ba3c-bb4901bfeabc.png)
# Chỉnh sửa về trọng số
Với ví dụ bên trên thì trọng số được đánh ở các thuộc tính là hoàn toàn giống nhau. Bạn có thể tuỳ chỉnh trọng số nếu cảm thấy yếu tố A quan trọng hơn, yếu tố B ít quan trọng,….  Yếu tố bạn cảm thấy quan trọng hơn thì hãy đánh trọng số cao và trọng số thấp nếu ít quan trọng.
# Tham khảo
https://oliverlundquist.com/2019/03/11/recommender-system-with-ml-in-laravel.html