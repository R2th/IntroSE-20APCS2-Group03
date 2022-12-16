![](https://images.viblo.asia/842a9ee0-3e2c-4dc4-a8cd-e6334fb3b83b.jpg)
  Hôm nay mình giới thiệu tới các bạn Yubinbango, 1 bộ thư viện javascript dùng để validate japan postcode
# 1. Cài đặt:
Để sử dụng yubinbango js, thêm đường dẫn tới file thư viện yubinbango.js vào file html.
```html
<script src="https://yubinbango.github.io/yubinbango/yubinbango.js" charset="UTF-8"></script>
```

# 2. Cách thức hoạt động:
Yubinbango js hoạt động dựa vào các class đánh dấu được định nghĩa sẵn, ta thêm các class này vào các thẻ form và span, input, ... tương ứng.
 
Các class chủ yếu bao gồm:
- class `.h-adr`: được thêm vào thẻ form, xác định scope của yubinbango js, các class khác được thêm vào bên trong các thẻ input bên trong thẻ form.
- class `.p-country-name`:  được thêm vào thẻ span có thuộc tình style="display: none" và giá trị html là Japan, xác định quốc gia của postcode đang được validate
- class `.p-postal-code`: được thêm vào thẻ input nhập giá trị của postcode
- các class `.p-region`, `.p-locality`, `.p-street-address`, `.p-extended-address`: được thêm vào 1 hay nhiều thẻ input, thể hiện các thành phần của địa chỉ ứng với post code được nhập trong thẻ input .p-postal-code.

# 3. Ví dụ tham khảo:
Xây dựng 1 ví dụ về việc sử dụng yubinbango để validate Japan postcode
```html
<!DOCTYPE html>
<html>
<head>
  <title>YubinBango JS</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="https://yubinbango.github.io/yubinbango/yubinbango.js" charset="UTF-8"></script>
</head>
<body>
  <div class="container">
	<h2>YubinBango JS</h2>
	<form class="h-adr">
	  <span class="p-country-name" style="display:none;">Japan</span>
	  <div class="form-group">
	    <label>Postal code:</label>
	    〒<input type="text" class="form-control p-postal-code" size="8" maxlength="8" />
	  </div>
	  <div class="form-group">
	    <label>Address:</label>
	    <input type="text" class="form-control p-region p-locality p-street-address p-extended-address" />
	  </div>
	</form>
  </div>
</body>
</html>
```

Kết quả thu được
![](https://images.viblo.asia/19a2a889-035c-4305-b3c9-498b3a4c8d05.png)

Các trang web tham khảo japan postcode:
- https://japan-postcode.810popo.net/
- https://yubin.senmon.net/en/

# 4. Link tham khảo:
- https://github.com/yubinbango/yubinbango
- https://yubinbango.github.io/
- https://github.com/LeTanThanh/yubinbango_js