# Giới thiệu
![](https://images.viblo.asia/4d89d029-9173-407e-83f7-70cbc6b0ab81.PNG)

- Datatable là một viện thư viết bằng javascript giúp cho việc truy cập dữ liệu trong các bảng HTML.
- Có 2 loại người dùng tương tác với giao diện phần mềm:
- Người dùng cuối: Những người sử dụng giao diện Datatables, VD: Tìm kiếm, xem giới hận record trên 1 màn hình, sắp xếp, phân trang ...
- Người phát triển: Những người làm việc với Datatable để tạo ứng dụng, service ....
# Cài đặt
- CDN: 
- ` <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.css">`
  
- `<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.js"></script>`
- NPM:
```bash
npm install datatables.net    # Core library
npm install datatables.net-dt # Styling
```
```js
var $  = require( 'jquery' );
var dt = require( 'datatables.net' )();
```
- Để sử dụng ta chỉ cần đặt id cho table và dùng jQuery để gọi phương thức `DataTable()` 
```js
$(document).ready( function () {
    $('#table_id').DataTable();
} );
```
# Một số tùy chọn
- Điều chỉnh các thanh control trên table
```js
$('#table-product').DataTable({
    data: this.products, // Dữ liệu dùng để hiển thị cho bảng, có thể là array, object ...
    columns: [
        { data: 'product_category.name' },
        { data: 'name' },
        { data: 'slug' },
        { data: 'quantity' },
        { data: 'price' },
    ], // Các thuộc tính của product sẽ  match với từng collumn
    searching: false, // Mặc định là true, set false để tắt chức năng search
    ordering:  false, // Mặc định là true, set false để tắt chức năng sắp xếp theo collumn
    paging: false, // Mặc định là true, set false để tắt chức năng phân trang
    scrollX: 400, // Nội dụng của table sẽ hiện thị với with 400px, Nếu quá thì sẽ có thanh scroll
    scrollY: 400, // Nội dụng của table sẽ hiện thị với hieght 400px, Nếu quá thì sẽ có thanh scroll
    processing: true,
    info: false, // Tắt thông tin về table VD: Showing 1 to 14 of 14 entries
});
```
- Kết quả
![](https://images.viblo.asia/4e6b9b03-8d8d-4511-ae29-bfb00bee4111.PNG)

- Thay đổi ngôn ngữ
```js
$('#table-product').DataTable({
    language: {
        processing: "Message khi đang tải dữ liệu",
        search: "Placeholder của input tìm kiếm",
        lengthMenu: "Điều chỉnh số lượng bản ghi trên 1 trang _MENU_ ",
        info: "Bản ghi từ _START_ đến _END_ Tổng công _TOTAL_ bản ghi",
        infoEmpty: "Khi không có dữ liệu, Hiển thị 0 bản ghi trong 0 tổng cộng 0 ",
        infoFiltered: "(Message bổ sung cho info khi không search đc record nào _MAX_)",
        infoPostFix: "Alo Alo", // Cái này khi thêm vào nó sẽ đứng sau info
        loadingRecords: "",
        zeroRecords: "Khi tìm kiếm không match với record nào",
        emptyTable: "Không có dữ liệu",
        paginate: {
            first: "Trang đầu",
            previous: "Trang trước",
            next: "Trang sau",
            last: "Trang cuối"
        },
        aria: {
            sortAscending: ": Message khi đang sắp xếp theo column",
            sortDescending: ": Message khi đang sắp xếp theo column",
        }
    },
});
```
- Kết quả
![](https://images.viblo.asia/36f418d8-6b3b-421f-98e3-e398b2b3cb28.PNG)
# Server side
- Khi sử dụng syntax `('#table-product').DataTable()` thì các thao tác tìm kiếm, phân trang, sắp xếp... đều được xử lý ở phía Client.
- Điều này thích hợp với các table có số lượng record nhỏ cỡ < 10.000. Nếu dữ liệu quá lớn thì cách làm như vậy không tốt vì server phải trả về số lượng record rất lớn.
- Do đó nên sử dụng server side, tức là khi có bất kỳ yêu cầu nào như tìm kiếm, phân trang, sắp xếp thì đều gửi request lên server và trả về dữ liệu cần thiết.
- Để sử dụng chức năng này trong table ta cần kích hoạt như sau.
```js
$('#table-product').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
        url: '/admin/products',
        dataType: 'json',
        type: 'GET',
    },
});
```
- Khi sử dụng chức năng tìm kiếm, sắp xếp, phân trang ... thì Client sẽ gửi request lên server. VD:
```php
array:7 [
  "draw" => "2"
  "columns" => array:5 [
    0 => array:5 [
      "data" => "product_category.name"
      "name" => null
      "searchable" => "true"
      "orderable" => "true"
      "search" => array:2 [
        "value" => null
        "regex" => "false"
      ]
    ]
    1 => array:5 [
      "data" => "name"
      "name" => null
      "searchable" => "true"
      "orderable" => "true"
      "search" => array:2 [
        "value" => null
        "regex" => "false"
      ]
    ]
    2 => array:5 [
      "data" => "slug"
      "name" => null
      "searchable" => "true"
      "orderable" => "true"
      "search" => array:2 [
        "value" => null
        "regex" => "false"
      ]
    ]
    3 => array:5 [
      "data" => "quantity"
      "name" => null
      "searchable" => "true"
      "orderable" => "true"
      "search" => array:2 [
        "value" => null
        "regex" => "false"
      ]
    ]
    4 => array:5 [
      "data" => "price"
      "name" => null
      "searchable" => "true"
      "orderable" => "true"
      "search" => array:2 [
        "value" => null
        "regex" => "false"
      ]
    ]
  ]
  "order" => array:1 [
    0 => array:2 [
      "column" => "0"
      "dir" => "asc"
    ]
  ]
  "start" => "0"
  "length" => "10"
  "search" => array:2 [
    "value" => "1"
    "regex" => "false"
  ]
  "_" => "1578925228907"
]
```
- Bây giờ mình sẽ xử lý yêu cầu, đây là fn mình đã xử lý yêu cầu.
```php
public function index(Request $request)
{
    if ($request->ajax()) {
        $total_data = Product::count(); // Đếm số record trong bảng product
        $col_order = ['name', 'slug', 'quantity', 'price']; // Định nghĩa danh sách các cột tương ứng với table
        $limit = (int)$request->input('length'); // Giới hạn số lượng bản ghi trên page
        $start = (int)$request->input('start'); // Bắt đầu từ record thứ mấy
        $order = $col_order[(int)$request->input('order.0.column')]; // Xác định cột sắp xếp.
        $dir = $request->input('order.0.dir'); // Sắp xếp theo ASC hay DESC
        if (empty($request->input('search.value'))) { // Nếu không có dữ liệu search
            $products = Product::with('productCategory')
                ->offset($start)->limit($limit)
                ->orderBy($order, $dir)
                ->get();
            $total_filter = count($products);
        } else {
            $search = $request->input('search.value');
            $products = Product::with('productCategory')
                ->where('name', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%")
                ->orWhere('quantity', 'like', "%{$search}%")
                ->orWhere('price', 'like', "%{$search}%")
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
            $total_filter = count($products);
        }
        $data = [];
        foreach ($products as $key => $product) { // Định dạng lại dữ liệu
            $tempt['category'] = $product->productCategory->name;
            $tempt['name'] = $product->name;
            $tempt['slug'] = $product->slug;
            $tempt['quantity'] = $product->quantity;
            $tempt['price'] = $product->price;
            array_push($data, $tempt);
        }
        $result = [
            'draw' => (int)$request->input('draw'),
            'recordsTotal' => (int)$total_data,
            'recordsFiltered' => (int)$total_data,
            'data' => $data,
        ];

        return response()->json($result);
    }

    return view('admin.product.index');
}
```
- Kết quả

![](https://images.viblo.asia/2e81e803-e9c0-422d-a076-8a249de714dc.gif)

# Kết luận
- Trên đây là những chia sẻ của mình về datatable một thư viện rất tiện ích khi làm việc với table.
- Ngoài ra còn rất nhiều thứ hay ho khác của datable, các bạn có thể tham khảo thêm tại trang chủ [tại đây](https://datatables.net/).