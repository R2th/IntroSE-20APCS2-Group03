Xin chào tất cả mọi người, đối với những ai lập trình web nói chung và Laravel nói riêng, thì việc lập biểu đồ là một trong những việc không thể thiếu vì nó phản ánh các số liệu, thống kê một cách trực quan và chính xác nhất, giúp chúng ta nhận ra được sự khác biệt và biết được cụ thể của từng cái so với tổng thể. Vì vậy, hôm nay mình sẽ hướng dẫn các bạn cách vẽ biểu đồ một cách nhanh gọn nhất thông qua highchart js và laravel.

### **1. Highcharts là gì?**

Highcharts là một thư viện biểu đồ được viết bằng JavaScript, cung cấp một cách dễ dàng việc thêm các biểu đồ tương tác vào trang web của bạn hoặc ứng dụng web. Highcharts hiện hỗ trợ các dạng line, spline, area, areaspline, column, bar, pie, scatter, angular gauges, angular gauges, arearange, areasplinerange,...

Hiện nay, Highcharts có thể build và hỗ trợ trên hầu hết các ngôn ngữ lập trình. Các bạn có thể tham khảo thêm các loại Hightchart [ở đây](https://www.highcharts.com/)

### 2. Kết hợp Highcharts với Laravel

Ok, bây giờ chúng ta sẽ tiến hành cài đặt và đưa highcharts vào Laravel thôi.
Trong ví dụ này, mình sẽ hướng dẫn 2 loại chart phổ biến nhất hiện nay đó chính là **Pie chart** và **Bar chart** và kết hợp chúng với Laravel 5.7 nhé.

**B1: Cài đặt thư viện**
> Ở phiên bản này chúng ta chỉ cần cài nhúng thư viện online của Highchart vào view là có thể dùng được rồi nhé.
> 
> Các bạn thêm như sau:
> 
```
    {{ Html::script('https://code.jquery.com/jquery-3.1.1.min.js') }}
    {{ Html::script('https://code.highcharts.com/highcharts.js') }}
    {{ Html::script('https://code.highcharts.com/modules/exporting.js') }}
    {{ Html::script('https://code.highcharts.com/modules/export-data.js') }}
```
**B2: Lấy data**
> Việc xử lý data để biểu thị bằng đồ thị thì Laravel hỗ trợ bạn Query builder và Eloquent. Ở đây mình dùng Query Builder để thống kê vì những câu query trong biểu đồ thường phức tạp vì phải kết hợp nhiều table, tính toán nhiều mới có thể cho ra kết quả bạn mong muốn. Các bạn có thể đọc tham khảo thêm về ORM Eloquent và QBuilder tại đây: [So sánh giữa Eloquent ORM và QueryBuilder trong Laravel](https://viblo.asia/p/so-sanh-giua-eloquent-orm-va-querybuilder-trong-laravel-maGK7MG9lj2)
```
    public function orderByYear()
    {
        $range = \Carbon\Carbon::now()->subYears(5);
        $orderYear = DB::table('orders')
                    ->select(DB::raw('year(date_order) as getYear'), DB::raw('COUNT(*) as value'))
                    ->where('date_order', '>=', $range)
                    ->groupBy('getYear')
                    ->orderBy('getYear', 'ASC')
                    ->get();

        return view('fdfadmin.chart.get_year', compact('orderYear'));
    }
// function orderByYear() mình sẽ lấy tổng các order trong vòng 5 năm tính từ năm hiện tại và fill vào **bar chart**

    public function orderByDay()
    {
        $range = \Carbon\Carbon::now();
        $get_range = date_format($range,"Y/m/d");
        $date_range = date_format($range,"d/m/Y");
        $sumProductDay = DB::table('orders')
                    ->select(DB::raw('SUM(detail_orders.amount) as countProduct'))
                    ->join('detail_orders', 'orders.id', '=', 'detail_orders.order_id')
                    ->join('products', 'detail_orders.product_id', '=', 'products.id')
                    ->where('date_order', '=', $get_range)
                    ->groupBy('date_order')
                    ->first();
        if ($sumProductDay == null)
        {

            return redirect(route('chartYear'))->with('alert',trans('chart.no_order'));
        } else {

        $totalProduct = (INT)($sumProductDay->countProduct);
        $percentProduct = round((100 / $totalProduct), 3);

        $productBuy = DB::table('orders')
                    ->select('products.name as name', DB::raw("SUM(amount) * $percentProduct as y"))
                    ->join('detail_orders', 'orders.id', '=', 'detail_orders.order_id')
                    ->join('products', 'detail_orders.product_id', '=', 'products.id')
                    ->where('date_order', '=', $get_range)                    
                    ->groupBy('product_id')
                    ->get();

        return view('fdfadmin.chart.view_order', compact('productBuy', 'date_range'));

        }            
    }
    // ở function này mình tính % từng loại order được đặt vào ngày hôm đó và fill vào **Pie chart**
```
> Để hiển thị vào view ta chỉ cần để:
```
    <div id="container" data-order="{{ $orderYear }}"></div>
```
> Vơi pie-chart thì bạn làm tương tự nhé
> 

**B3: Fill data vào chart trong file js**
> Ở bar chart có dạng cho từng cột x,y  là dạng mảng (Array):
```
(5) [1, 1, 2, 2, 24]
```
> Còn ở pie chart thì chart của mình theo mảng JSON:
```
(5) [{…}, {…}, {…}, {…}, {…}]
0: {name: "Kem chuối phủ socola", y: 4.762}
1: {name: "Bánh trứng 2", y: 9.524}
2: {name: "Bánh bông lan", y: 23.81}
3: {name: "Bánh trứng 3", y: 47.62}
4: {name: "Pizza", y: 14.286}
```
> Vì vậy khi làm các bạn để ý là data của bạn được fill theo dạng nào để điều chỉnh cho hợp lý nhé.
> 
> Bây giờ Fill data vào thôi 
> 
> Với Bar chart chúng ta Fill như sau:
> 
```
$(document).ready(function(){
    var order = $('#container').data('order');
    var listOfValue = [];
    var listOfYear = [];
    order.forEach(function(element){
        listOfYear.push(element.getYear);
        listOfValue.push(element.value);
    });
    console.log(listOfValue);
    var chart = Highcharts.chart('container', {

        title: {
            text: 'Orders by years'
        },

        subtitle: {
            text: 'Plain'
        },

        xAxis: {
            categories: listOfYear,
        },

        series: [{
            type: 'column',
            colorByPoint: true,
            data: listOfValue,
            showInLegend: false
        }]
    });
    
    $('#plain').click(function () {
        chart.update({
            chart: {
                inverted: false,
                polar: false
            },
            subtitle: {
                text: 'Plain'
            }
        });
    });

    $('#inverted').click(function () {
        chart.update({
            chart: {
                inverted: true,
                polar: false
            },
            subtitle: {
                text: 'Inverted'
            }
        });
    });

    $('#polar').click(function () {
        chart.update({
            chart: {
                inverted: false,
                polar: true
            },
            subtitle: {
                text: 'Polar'
            }
        });
    });
});

```

> **Với Pie chart ta fill như sau**
```
$(document).ready(function(){
    var productBuy = $('#container').data('order');
    var chartData = [];
    productBuy.forEach(function(element){
        var ele = {name : element.name, y : parseFloat(element.y) };
        chartData.push(ele);
    });
    console.log(chartData);
    Highcharts.chart('container', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Daily order'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: chartData,
        }]
    });    
});

```

**Cuối cùng là thành quả của mình hehe**
![Bar chart](https://images.viblo.asia/b3cb6e89-74cb-494d-91af-8f0465475821.png)
![Pie chart](https://images.viblo.asia/c9c909a1-1cfa-483a-bfc9-cb2a382ead8e.png)

> Đây là Series bài viết đầu tiên của mình về Laravel, nếu có sai sót mong các bạn góp ý và thông cảm. Bất kỳ thắc mắc hay yêu cầu gì thì các bạn comment phía dưới, mình sẽ giải đáp ạ. Cảm ơn các bạn đã theo dõi bài viết của mình.
> 
> Hẹn gặp lại các bạn vào bài viết tiếp theo.