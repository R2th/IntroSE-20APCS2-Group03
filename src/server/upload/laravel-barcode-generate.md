## Giới thiệu
Tích hợp hệ thống mã vạch với một ứng dụng thực sự là tính năng được mong muốn nhất trong xu thế phát triển thương mại điện tử hiện nay. Nó làm cho quy trình làm việc của ứng dụng của bạn nhanh hơn và mang lại trải nghiệm người dùng tốt hơn. Trong phạm vi bài viết này, tôi sẽ đề cập đến lý do tại sao mã vạch lại quan trọng đối với ứng dụng, trường hợp sử dụng là gì, hướng dẫn cách tạo mã vạch và đọc mã vạch trong laravel.

### 1. Vai trò và các use case:
**Tầm quan trọng:**

Giả sử, chúng ta có một bảng sản phẩm trong cơ sở dữ liệu ứng dụng của mình, trong đó 10K sản phẩm trở lên tồn tại và mỗi sản phẩm có một ID duy nhất như P-00001, P-00002, P-00003, v.v. Nếu lập hóa đơn cho khách hàng, chúng ta phải nhập thủ công một hoặc nhiều mã sản phẩm vào ô tìm kiếm và tìm, đó là một công việc tốn nhiều thời gian. Trong trường hợp này, chúng ta có thể dễ dàng giải quyết vấn đề bằng cách sử dụng mã vạch cho từng mã sản phẩm. Khi chúng ta lập hóa đơn cho khách hàng, chúng tôi chỉ cần quét mã vạch bằng máy đọc mã vạch và máy đọc mã vạch ngay lập tức tự động nhập mã sản phẩm để mình không phải nhập mã thủ công trên thanh tìm kiếm. Nó làm cho quy trình làm việc nhanh hơn và ít lỗi hơn.

**Use case:**
- Mã vạch cho sản phẩm
 
    Mỗi sản phẩm sẽ có một mã vạch để chúng ta dễ dàng đọc mã vạch và tìm thấy chúng một cách nhanh chóng khi tìm kiếm sản phẩm hoặc làm hóa đơn cho khách hàng.
- Mã vạch cho Hóa đơn.
    
    Chúng ta có thể sử dụng mã vạch cho mỗi hóa đơn để có thể dễ dàng tìm thấy hóa đơn cụ thể khi cần mà không cần nhập mã hóa đơn dài theo cách thủ công.
- Mã vạch cho ID nhân viên / ID sinh viên / ID khách hàng / ID dịch vụ v.v...
    
    Chúng ta có thể sử dụng mã vạch bất kỳ ID duy nhất nào. Để chúng ta có thể tìm thấy bản ghi một cách nhanh chóng và làm mọi thứ liên quan đến ID đó.

Ở đây tôi đã liệt kê một vài trường hợp sử dụng phổ biến. Chúng ta có thể sử dụng mã vạch cho mỗi thứ có một số nhận dạng duy nhất trong ứng dụng của mình.

### 2. Tạo mã vạch

**Bước 1:** Cài đặt package

Trong kho package của Laravel đã có sẵn [milon/barcode](https://github.com/milon/barcode) để phục vụ công việc này. Bạn có thể chọn version khác nhau của package phù hợp với phiên bản của Laravel mà bạn đang sử dụng.

```
composer require milon/barcode
```

**Bước 2:** Tạo mã vạch

Trong ví dụ này, tôi sẽ tạo mã vạch cho Product ID dạng P-00001, P-00002, P-00003, v.v. Bạn có thể tạo bất kỳ ID tùy chỉnh nào với [Laravel ID generator package](https://github.com/haruncpi/laravel-id-generator) rất dễ dàng!

Nhãn in mã vạch có một kích thước cụ thể. Kích thước phổ biến nhất cho nhãn dán mã vạch là 100X150 mm. Theo đó, chúng ta sẽ tạo mã vạch sẽ có tên sản phẩm, giá bán, mã vạch và ID sản phẩm.


```php
// Controller
public function generateBarcode(Request $request){
	$id = $request->get('id');
	$product = Product::find($id);
    
	return view('barcode')->with('product',$product);
}
```

```html
{{--View--}} 
<div class="barcode">
  <p class="name">{{$product->name}}</p>
  <p class="price">Price: {{$product->sale_price}}</p>
  <div>{!! DNS1D::getBarcodeHTML($product->code, "C128",1.4,22) !!}</div>
  <p class="pid">{{$product->code}}</p>
</div>
```

`DNS1D::getBarcodeHTML()` nhận 4 tham số:

- Tham số đầu tiên nhận vào là mã sản phẩm mà chúng ta muốn tạo mã vạch.
- Thứ 2 là đối với loại mã vạch. Ở đây chúng tôi đã sử dụng mã vạch loại C128. Cho phép mã vạch chữ và số.
- Thứ 3 là chiều cao mã vạch.
- Thứ 4 là chiều rộng mã vạch.

Kết quả:
![](https://images.viblo.asia/544fade6-02ed-4753-920d-b7db60a0595c.png)

Ngoài mã vạch, package này còn cung cấp cho chúng ta các loại mã khác nhau
```html
  <div>{!! DNS1D::getBarcodeHTML($product->code, 'POSTNET') !!}</div></br>
  <div>{!! DNS1D::getBarcodeHTML($product->code, 'PHARMA') !!}</div></br>
  <div>{!! DNS2D::getBarcodeHTML($product->code, 'QRCODE') !!}</div></br>
```
Kết quả:

![](https://images.viblo.asia/fafd5182-ba40-466f-bc9a-c9b6dd31e56e.png)

### 3. Đọc mã vạch

Sau khi tạo mã vạch, in và gắn thẻ cho từng sản phẩm hoặc in mã vạch trên hóa đơn / thẻ khách hàng / thẻ sinh viên / thẻ nhân viên, v.v. Chúng ta cần một máy quét mã vạch để quét và nhập mã vào ứng dụng. Để giải quyết việc này, bạn có thể mua một máy đọc mã vạch hoặc bạn có thể sử dụng ứng dụng [Android Barcode Client-Server](https://play.google.com/store/apps/details?id=com.learn24bd.barcode) miễn phí.

Trong quá trình phát triển và vận hành hệ thống mã vạch, chúng ta có thể sử dụng một ứng dụng android miễn phí có tên là Barcode Client-Server như đã nhắc ở phía trên. Ứng dụng này giúp chúng ta quét mã vạch và gửi mã đã quét đến ứng dụng quản lý bán hàng của chúng ta ngay lập tức. Cách sử dụng:

- Download BarcodeServer zip file từ link https://github.com/haruncpi/barcode-server
- Giải nén tệp zip và chạy BarcodeServer.exe
- Tải xuống và mở ứng dụng Android Barcode Client-Server và kết nối nó với server IP của bạn.

Video hướng dẫn: https://youtu.be/fF6XbvfqmME

## Kết luận
Trên đây mình đã hướng dẫn các bạn cách tạo mã vạch và đọc chúng trong Laravel. Hy vọng bài viết sẽ giúp ích cho các bạn trong quá trình làm việc và học tập.
Thank you :heart_eyes:

Nguồn:

- https://laravelarticle.com/laravel-barcode-tutorial
- https://github.com/milon/barcode