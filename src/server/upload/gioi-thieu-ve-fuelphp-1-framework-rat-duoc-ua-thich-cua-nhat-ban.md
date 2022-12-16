# Giới thiệu
PHP hiện là ngôn ngữ Backend cho lập trình web có cộng đồng theo học lớn nhất. Bên cạnh đó cũng là một lượng Framework khổng lồ, mọc lên như nấm sau mưa :scream: Không ai có thể học hết được đống Framework này, và việc học Framework gì phụ thuộc rất lớn vào công ty/đối tượng khách hàng. Vậy nên, những bạn muốn làm cho công ty Nhật hay khách hàng Nhật, mình nghĩ **FuelPHP** sẽ là một Framework không nên bỏ qua.

*Bật mí: FuelPHP là người anh em thất lạc của CodeIgniter đó ( Được viết bởi lão làng Harro Verton và đồng bọn - người đóng góp khá nhiều đến core của CI ), mà ít ai biết và cũng ít người quan tâm :rofl:*
*Bài viết này dành cho các bạn đã có kiến thức về PHP và mô hình MVC căn bản*

## Vậy FuelPHP có gì đáng để học?
- Những bạn làm Laravel quen rồi qua FuelPHP sẽ thấy nhiều điểm tương đồng: artisan - oil, eloquent - orm, migration, các class hỗ trợ toàn static function,...
- Dễ học hơn so với Laravel (Theo mình là vậy). Docs viết khá đầy đủ và dễ đọc. Tuy nhiên, không thích hợp cho người mới học PHP.
- Biết thêm chút mà thêm vào hồ sơ xin việc cho dễ :grinning:
- Các công ty Nhật rất ưa chuộng

## Demo
Mục tiêu của mình sẽ là tạo một trang demo để quản lý thú cưng. Với mỗi con thú cưng, bạn muốn nắm rõ được thông tin về:
* Tên
* Ngày nhập
* Liệu nó còn trong vườn thú cưng không?
* Thông tin về thú cưng

Vì mình dùng **Windows**, nên các bạn dùng Linux chịu khó vào https://fuelphp.com/docs/installation/instructions.html để xem hướng dẫn cách cài đặt nhé. Mình sẽ tạo trang này một cách nhanh chóng. Bắt đầu thôi nhỉ :grinning:

### Cài đặt
1. Bạn cần cài trước WAMP Stack. Ở đây mình dùng WAMPServer. Các bạn có thể tải ở 
>  http://www.wampserver.com/en/
2. Để cài FuelPHP, các bạn vào trang chủ tải file zip về 
>  https://fuelphp.com/docs/installation/download.html

Sau khi tải xong các bạn bung nén vào thư mục gốc (thư mục www trong WampServer hay htdocs trong Xampp...)

![](https://images.viblo.asia/be6fb444-ba19-4b80-95db-81f70f26a10a.png)

3. TADA! App của bạn đã có thể vào được qua http://localhost/ten_app_cua_ban/public/, còn cách xóa đuôi public thì mình sẽ hướng dẫn chi tiết nếu mình viết series hướng dẫn FuelPHP (Căn bản là tạo Virtual Host và set Document Root vào thư mục public là được) 

![](https://images.viblo.asia/d6971175-4a3b-4c98-a6f6-f03c10087cda.jpg)

### Xây dựng tính năng quản lý thú cưng
Để quản lý thú cưng, ta phải làm những việc sau:
- Cài đặt ORM (Chúng ta sẽ dùng ORM của FuelPHP, cái này giống Eloquent bên Laravel vậy)
- Khai báo thông tin đăng nhập database
- ~~Tạo 1 cái bảng trong database tên là pets~~
- ~~Tạo 1 cái Model cho Pet~~
- ~~Tạo 1 cái Controller cho việc lấy thông tin và hiển thị View của Pet~~
- ~~Tạo 4 cái View tương ứng 4 trang thêm, sửa, xóa, danh sách~~

Trông lắm thứ phải làm ghê :scream: Thật mất thời gian cho mấy trang thêm sửa xóa lặp đi lặp lại này phải không nào, vậy nên ta sẽ dùng **oil** trong FuelPHP để thực hiện công việc này (Giống artisan)

### Cài đặt ORM
Các bạn vào sửa file config.php, trong  `fuel\app\config\config.php`  bỏ comment phần always_load và package orm ra, trông nó sẽ ntn:

![](https://images.viblo.asia/c31122ed-bad2-4460-bc95-38fa5901b21c.jpg)

### Khai báo thông tin đăng nhập database
FuelPHP mặc định dùng hệ csdl MySQL. Bạn có thể khai báo trong file  `fuel/app/config/{TEN_MOI_TRUONG}/db.php`. Mặc định FuelPHP sẽ chạy chế độ development nên các bạn vào đường dẫn `fuel/app/config/development/db.php` và nhập đoạn code phía dưới. 

* Thay dbname, username, password thích hợp nhé các bạn*

```
return array(
	'default' => array(
		'connection'  => array(
			'dsn'        => 'mysql:host=localhost;dbname=fuel_dev',
			'username'   => 'root',
			'password'   => 'password',
		),
	),
);
```

### Sử dụng Oil để sinh Scaffold
Sau khi cấu hình xong database, bạn vào thư mục gốc của ứng dụng, mở Command Line lên, gõ lệnh theo cú pháp sau:
```
php oil generate scaffold MODEL ATTR_1:TYPE_1[CONSTRAINT] ATTR_2:TYPE_2[CONSTRAINT] ...
```

Trong đó: 
* MODEL là tên Model mong muốn, nên đặt tên là một thì Tiếng Anh số ít (Vdụ: pet). Khi đó table sinh ra trong db tên nó sẽ là số nhiều: pets, tên model là Model_Pet
* ATTR_1, ATTR_2: tên các trường csdl
* TYPE_1, TYPE_2: tên kiểu dữ liệu, gồm các giá trị `string hoặc varchar, int, date, float, text, bool,...`
* CONSTRAINT: constraint trong csdl

*Ta có thể thêm :null vào sau type dữ liệu để cho phép trường đó nhận giá trị null*

Ta sẽ nhập:
```
php oil generate scaffold pet name:string issue_date:date is_available:bool info:text:null
```

Oil còn nhiều chức năng khác nữa, nếu bạn muốn tìm hiểu thêm có thể vào trang
> https://fuelphp.com/docs/packages/oil/intro.html

![](https://images.viblo.asia/7468031d-408b-448c-bbfb-2bcee36df953.PNG)

Như các bạn thấy trong hình, oil đã sinh ra cho bạn **migration, model, controller, view thêm sửa xóa luôn**. Việc cần làm bây giờ là chạy nốt migration thôi. Bạn gõ tiếp lệnh này vào

```
php oil refine migration:up
```
Xong rồi đó, giờ bạn đã có thể vào đường dẫn và tận hưởng thành quả thôi  :grinning:
```
http://localhost/ten_app_cua_ban/public/pet
```
![](https://images.viblo.asia/7f2b8539-7994-4178-8d2d-4f736390faec.PNG)

Ấn nút thêm mới nào (Add New Pet).

![](https://images.viblo.asia/2896dd64-cef6-490e-a1d4-ce7c99daa673.jpg)

Sau khi nhập đầy đủ trông nó sẽ như thế này: 
![](https://images.viblo.asia/48d75756-162d-4f73-bc42-3fdc3773e7cd.PNG)

## Lời kết
Vậy là trong ít phút các bạn đã tạo được một trang quản lý thú cưng đơn giản không nào :sunglasses: Tuy nó còn sơ khai, nhưng nó cũng là một khởi đầu rất tốt để có thể phát triển bất cứ tính năng nào :grin: 

Nhìn chung thì mình thấy FuelPHP có đủ tính năng một Framework cần có (tiếc nhất là không tích hợp sẵn template engine như Blade, Smarty hay Twig ...), chạy khá nhẹ và dễ học nếu có kiến thức về OOP. 

Cảm ơn các bạn đã xem. Hi vọng bài viết của mình giúp ích được cho các bạn. Trong tương lai mình sẽ ra series hướng dẫn chi tiết từng phần của Framework này cho các bạn muốn tìm hiểu thêm.