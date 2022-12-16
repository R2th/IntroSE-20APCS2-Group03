Một trong những bài toán gây đau đầu đối với nhiều lập trình viên là việc xử lý biểu đồ bên trong file PDF. Bởi lẽ, khi render ở định dạng file này, có sự khác biệt nhất định so với việc render trên trình duyệt.

Bài viết này sẽ giới thiệu qua về cách tích hợp và sử dụng hai thư viện khá phổ biến cho việc vẽ biểu đồ trong file PDF: ChartJS và Laravel Snappy. Trong đó, Laravel Snappy là một wrapper của thư viện `wkhtmltopdf/wkhtmltoimage` - thư viện chuyển đổi file HTML sang định dạng ảnh hoặc PDF.

Về nguyên tắc hoạt động thì Laravel Snappy đóng vai trò trung gian trong việc tạo file HTML dựa trên ChartJS và chuyển tiếp file này đến thư viện `wkhtmltopdf` để thực hiện chuyển đổi định dạng. Các xử lý này được thực hiện hoàn toàn trên server (server-side rendering).

## Cài đặt các thư viện cần thiết ##

### [wkhtmltopdf](https://github.com/h4cc/wkhtmltopdf-amd64): ###

Vì chưa có bản build cho version mới nhất trên official repository nên chúng ta có thể cài đặt thông qua forked repository dưới đây (v0.12.5).

`composer require silvertipsoftware/wkhtmltopdf-amd64`

Tại thời điểm viết bài này, version mới nhất là `0.12.6 ` (https://github.com/wkhtmltopdf/wkhtmltopdf/releases). Tuy nhiên, hiện tại chưa có bản build nào ứng với version trên.

**Thư viện hệ thống bắt buộc:**

Trường hợp hệ điều hành sử dụng là Debian/Ubuntu:
```
    sudo apt update && \
    sudo apt install fonts-ipafont \
    fontconfig \
    libfontconfig1 \
    libfreetype6 \
    libx11-6 \
    libxext6 \
    libxrender1 \
    xfonts-75dpi \
    xfonts-base \
    libx11-dev \
    libjpeg62 \
    libxtst6 \
    libpng16-16
```

### [Laravel Snappy](https://github.com/barryvdh/laravel-snappy)

```
composer require barryvdh/laravel-snappy
php artisan vendor:publish --provider="Barryvdh\Snappy\ServiceProvider"
```

### [ChartJS](https://www.chartjs.org/)

Cài đặt thư viện ChartJS thông qua `yarn` (hoặc `npm`)

`yarn add chart.js`

`npm install chart.js --save`

### [consoletvs/charts]()

```
composer require consoletvs/charts "6.*"
php artisan vendor:publish --tag=charts_config
```

Đây là thư viện hỗ trợ tích hợp các thư viện JS liên quan đến biểu đồ vào Laravel. Ngoài ChartJS, có thể sử dụng kết hợp đồng thời với nhiều thư viện khác.

## Thiết lập file config ##

- Trỏ đường dẫn trong config của Laravel Snappy tới binary file của `wkhtmltopdf` (snappy.php):
```php
....
'pdf' => [
        'enabled' => true,
        'binary'  => base_path('vendor/silvertipsoftware/wkhtmltopdf-amd64/bin/wkhtmltopdf-amd64'),
        'timeout' => false,
        'options' => [],
        'env'     => [],
    ],
....
```

- Thiết lập thư viện mặc định khi chạy lệnh tạo chart PHP class trong command line (chart.php):

```php
'default_library' => 'Chartjs',
```

## Triển khai render ##

### Thay đổi nội dung file layout của ChartJS ###

Ở version ChartJS mới nhất, có sử dụng tính năng animation, khiến biểu đồ không render được trên file PDF. Do đó, cần điều chỉnh lại các file layout mặc định để vô hiệu hóa tính năng này.

`views/charts/pdf/script.blade.php`
```php
@foreach ($chart->plugins as $plugin)
    @include($chart->pluginsViews[$plugin]);
@endforeach

<script {!! $chart->displayScriptAttributes() !!}>
    Chart.defaults.global.animation = false;
    Chart.defaults.global.responsive = false;
	
	/**
	 * Fix Segmentation fault error
	 * https://github.com/wkhtmltopdf/wkhtmltopdf/issues/3242#issuecomment-518099192
	 */
    (function(setLineDash) {
        CanvasRenderingContext2D.prototype.setLineDash = function() {
            if(!arguments[0].length){
                arguments[0] = [1,0];
            }

            return setLineDash.apply(this, arguments);
        };
    })(CanvasRenderingContext2D.prototype.setLineDash);

    var ctvChart = document.getElementById('{{ $chart->id }}').getContext('2d');
    function {{ $chart->id }}_create(data) {
        {{ $chart->id }}_rendered = true;
        document.getElementById("{{ $chart->id }}").style.display = 'block';
        window.{{ $chart->id }} = new Chart(document.getElementById("{{ $chart->id }}").getContext("2d"), {
            type: {!! $chart->type ? "'{$chart->type}'" : 'data[0].type' !!},
            data: {
                labels: {!! $chart->formatLabels() !!},
                datasets: data
            },
            options: {!! $chart->formatOptions(true) !!},
            plugins: {!! $chart->formatPlugins(true) !!}
        });
    }

    {{ $chart->id }}_create({!! $chart->formatDatasets() !!})
</script>
```

`views/charts/pdf/container.script.php`
```php
<canvas id="{{ $chart->id }}" {!! $chart->formatContainerOptions('html') !!}></canvas>
```

### Tạo chart class ###

```
php artisan make:chart LineChart
```

Nội dung template của một chart class:

```php
<?php

namespace App\Charts;

use ConsoleTVs\Charts\Classes\Chartjs\Chart;

class LineChart extends Chart
{
    /**
     * Initializes the chart.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }
}
```

Thay đổi nội dung hàm khởi tạo như sau:

```php
    public function __construct()
    {
        parent::__construct();
        // Ghi đè layout cũ để vô hiệu các tính năng làm lỗi render chart trên PDF file.
        $this->script = 'charts.pdf.script';
        $this->container = 'charts.pdf.container';
        $this->loader = false;
        $this->options([
            'responsive' => false,
            'animation' => false,
        ]);

      // Tạo nội dung và cách hiển thị của Chart tùy ý
      $this->labels(['January', 'February', 'March', 'April', 'May', 'June', 'July']);
      $this->dataset('Line dataset', 'line', [0, 10, 5, 2, 20, 30, 45])
            ->options([
                  'label' => 'Line dataset',
                  'backgroundColor' => 'rgb(255, 99, 132)',
                  'borderColor' => 'rgb(255, 99, 132)',
            ]);
      
      return $this;
    }
```

### Copy file thư viện của ChartJS ra thư mục `public` ###

`webpack.mix.js`
```js
mix.copy('node_modules/chart.js/dist/Chart.bundle.min.js', 'public/js/Chart.bundle.min.js');
```

Compile sau đó để thực hiện copy.

`yarn dev`

Hoặc copy thủ công, không qua compile (không khuyến khích):
```
cp node_modules/chart.js/dist/Chart.bundle.min.js public/js/Chart.bundle.min.js
```

### Tạo file HTML hiển thị nội dung biểu đồ ### 

`views/charts/php/show.blade.php`
```php
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta http-equiv="content-type" content="text\html; charset=UTF-8" />
        <title>Charts in PDF</title>
        <link rel="stylesheet" href="{{ public_path('css/app.css') }}">        
    </head>
    <body>
       <script src="{{ public_path('js/Chart.bundle.min.js') }}"></script>
       <script>{!! $lineChart->script() !!}</script>
    </body>
</html>
```

**Lưu ý:**

- Đường dẫn các file assets (ảnh, font, js, css, ..) phải là đường dẫn tuyệt đối. Sử dụng hàm `public_path()` thay vì `asset(), mix()` .

  Các đường dẫn `url` trong file `css` có thể gây lỗi. Do đó, cần di chuyển các đoạn code này ra ngoài blade view và sử dụng hàm `public_path()`;
    ```html
    <style>
    .logo {
        background: url("{{ public_path('/images/logo.svg') }}");
    }
    </style>
    ```

- Tránh sử dụng CDN vì có thể phát sinh các lỗi liên quan đến TLS (SSL).

### Tạo file PDF có chứa biểu đồ ###

Có thể sử dụng Facade của Laravel Snappy để render như ví dụ sau:

```php
<?php

namespace App\Http\Controllers;

use App\Charts\Pdf\LineChart;
use Barryvdh\Snappy\Facades\SnappyPdf as PDF;

class ChartController extends Controller
{
    public function showChartInPdf()
	{
		$lineChart = new LineChart();

		return PDF::loadView('charts.pdf.show', compact('lineChart'))
			->inline('charts.pdf');
	}
    
    public function downloadChartInPdf()
	{
		$lineChart = new LineChart();

		return PDF::loadView('charts.pdf.show', compact('lineChart'))
			->download('charts.pdf');
	}
}
```

## Nhược điểm của cách render trên ##

- Thư viện ChartJS sử dụng `canvas` để render lên biểu đồ, nên khi hiển thị trên file PDF, nội dung sẽ không đạt được chất lượng cao. Giải pháp thay thế có thể cân nhắc là sử dụng Google Chart với việc render bằng `svg`.

- Việc debug còn khá khó khăn khi nội dung exception của `wkhtmltopdf` không được rõ ràng, dễ hiểu.

- Chưa hỗ trợ tốt các font chữ Unicode.

- Thư viện `consoletvs/charts` cần điều chỉnh nhiều. Do đó, có thể cân nhắc khởi tạo chart trực tiếp vào blade view và thẻ `<script></script>` (hoặc file `.js`)

## ** *Tham khảo* **
**Ahmed Ali Thabet**, [*Laravel Snappy, For PDF with Charts.*](https://medium.com/@almestaadmicadiab/laravel-snappy-for-pdf-with-charts-e5c9b757d6dd)

**wkhtmltopdf**, [GitHub](https://github.com/wkhtmltopdf/wkhtmltopdf/issues/3242#issuecomment-518099192)