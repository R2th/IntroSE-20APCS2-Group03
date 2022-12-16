![](https://images.viblo.asia/af967c10-839a-4c10-b93a-687f5d6ada0e.png)

Laravel là framework PHP được phát triển và sử dụng rộng rãi trong vài năm trở lại đây, các version Laravel từ liên tục được cập nhật và nâng cấp đều đặn một năm vài lần. Tuy có cập nhật nhưng nói chung về việc sử dụng framework của developer không có gì thay đổi nhiều do cấu trúc thư mục của framework gần như vẫn xoay quanh các thành phần chính :
1. Controllers
2. Models
3. Migrations
4. Repositories
5. Routes
6. Views

Với một project CRUD cơ bản việc phải lặp lý lặp lại hành động tạo controller, models, repositories ... khiến developer đôi khi thấy thực sự nhàm chán, chưa kể việc phải copy paste giao diện html từ module này sang module khác mà chỉ thay thế mỗi cái tên, hoặc tiêu đề. Hơn nữa việc setup các package, theme tốn rất nhiều thời gian. Để giải quyết vấn đề này trong bài viết hôm nay mình xin giới thiệu package **Infyom**, một package laravel mạnh mẽ cho phép auto generate gần như tất cả những gì được coi là nhàm chán nhất trong một project laravel.
**Infyom** cho phép sử dụng command line đơn giản để generate api doc, controller, migration, model ...  và thậm chí là cả theme admin LTE, bootstrap, metronic ... Hãy hình dung chỉ cần vài command đơn giản bạn đã tạo được một màn hình quản lý user có sẵn các chức năng thêm, sửa, xóa, sắp xếp, phân trang ... Quá nhàn phải không? Hiện nay blade của laravel đang dần được thay thế bằng các thư viện Front-end có trải nghiệm tốt hơn như ReacJS, Vuejs ... nên phần đáng chú ý của **Infyom** là auto-generate CRUD api. Chúng ta cùng xem nó có gì.
## 1. Setup
Việc setup Infyom hoàn toàn tương tự như các package của laravel khác.
Hiện tại version của Infyom được cập nhật liên tục cho phù hợp với version tương ứng của Laravel. Cho nên bạn đang dùng version laravel nào thì dùng version Infyom tương ứng. Vì laravel 8 vừa ra lò nên **Infyom** chưa kịp cập nhật, hiện tại đang là version **Infyom** 7.
Có thể trong tối nay v8 sẽ có :)
```json
"require": {
    "infyomlabs/laravel-generator": "7.0.x-dev"
}  
```
```
composer install
php artisan vendor:publish
```
Tiếp theo là mở `app\Providers\RouteServiceProvider.php ` và sửa ` mapApiRoutes` như sau:
```PHP
Route::prefix('api')
    ->middleware('api')
    ->as('api.')
    ->namespace($this->namespace."\\API")
    ->group(base_path('routes/api.php'));     
```
Việc này sẽ cho phép chúng ta phân tách các controller liên quan đến API sẽ được tự động generate trong thư mục `Http/Controllers/API.`
Tiếp theo nếu bạn muốn tạo ra các thư mục làm việc cơ bản cho dự án thì chỉ cần 
```
php artisan infyom:publish
```
Và cấu trúc thư mục của bạn sẽ tương tự như thế này, đó là có sẵn những file base và thư mục cần thiết
![](https://images.viblo.asia/fc270e39-2522-4c33-b722-d8f2422cd730.png)

## 2. How to use ?
Cách sử dụng khá đơn giản chúng ta có thể tham khảo tại trang chủ https://labs.infyom.com/laravelgenerator/docs/7.0/introduction
Giống như những pakage khác sau khi publish chúng ta sẽ có một file rất quan trọng nằm trong  `config/infyom/laravel_generator.php`
Trong đây chủ yếu là những option dạng true/false, nếu không cần dùng cái gì bạn chỉ cần để là false, ngược lại thì là true. Ví dụ 
```php
'options' => [

        'softDelete' => false,

        'save_schema_file' => true,

        'localized' => false,

        'tables_searchable_default' => false,

        'repository_pattern' => true,

        'excluded_fields' => ['id'], // Array of columns that doesn't required while creating module
    ],
```
Nếu muốn dùng softDelete cho table thì bạn cần chuyển nó sang true thay vì false như mặc định. Có một điểm yếu là bạn không có option command nào để chỉ định xem table nào sẽ có softDelete và table nào là không dùng softDelete. Nên trước khi khởi tạo table bạn cần vào config này để sửa thủ công.
Sau khi config xong chúng ta sẽ thử tạo api cho module với đầy đủ chức năng CRUD, ví dụ Category
```
php artisan infyom:api Category
```
Sau khi chạy lệnh trên nó sẽ hỏi chúng ta nhập vào các field của table vào
```bash
Specify fields for the model (skip id & timestamp fields, we will add it automatically)
Read docs carefully to specify field inputs)
Enter "exit" to finish
Field: (name db_type html_type options) []:
```
trong đó:
* name: là tên field, ví dụ: category_name
* db_type: kiểu dữ liệu, ví dụ: `string`. Nếu muốn thêm số lượng ký tự thì nhập `string,255`
* html_type: là kiểu html trong form, ví duj: input, textarea ...
* options: thông tin bổ sung nếu có, cái này thường bỏ qua.

Tiếp theo infyom sẽ hỏi bạn về validation của field này ví dụ : required, unique  ...
```bash
Enter validations:  []:
 > required
```
Nếu không muốn nhập thêm bất kỳ field nào nữa thì bạn chỉ cần nhất `Enter` để bỏ qua.
Sau khi tạo xong, danh sách các file được tạo sẽ như thế này, bao gồm cả file migration
```bash
> infyom php artisan infyom:api Category
Specify fields for the model (skip id & timestamp fields, we will add it automatically)
Read docs carefully to specify field inputs)
Enter "exit" to finish

 Field: (name db_type html_type options) []:
 > category_name string input

 Enter validations:  []:
 > required

 Field: (name db_type html_type options) []:
 > status integer input

 Enter validations:  []:
 > required

 Field: (name db_type html_type options) []:
 > 


Migration created: 
2020_10_04_070331_create_categories_table.php

Model created: 
Category.php

Repository created: 
CategoryRepository.php

Factory created: 
CategoryFactory.php

Create Request created: 
CreateCategoryAPIRequest.php

Update Request created: 
UpdateCategoryAPIRequest.php

API Controller created: 
CategoryAPIController.php

categories api routes added.

RepositoryTest created: 
CategoryRepositoryTest.php

ApiTest created: 
CategoryApiTest.php

Schema File saved: 
Category.json

 
Do you want to migrate database? [y|N] (yes/no) [no]:
 > yes

Migration table created successfully.
Migrating: 2014_10_12_000000_create_users_table
Migrated:  2014_10_12_000000_create_users_table (0.1 seconds)
Migrating: 2014_10_12_100000_create_password_resets_table
Migrated:  2014_10_12_100000_create_password_resets_table (0.11 seconds)
Migrating: 2019_08_19_000000_create_failed_jobs_table
Migrated:  2019_08_19_000000_create_failed_jobs_table (0.06 seconds)
Migrating: 2020_10_04_070331_create_categories_table
Migrated:  2020_10_04_070331_create_categories_table (0.06 seconds)
Generating autoload files
```
Hệ thống sẽ hỏi bạn có muốn chạy migrate để tạo database không, bạn có thể chọn Yes/No. Ở đây mình chọn Yes và do dự án mới tạo nên nó chạy luôn cả những file migation đang có sẵn.

> Tuy nhiến cần chú ý, nếu sau khi gõ yes mà bạn gặp bất kỳ lỗi nào ví duj: lỗi chưa tạo database, không connect  được ... Thì sau khi khắc phục lỗi, bạn cần chạy migation bằng lệnh của laravel như bình thường.
```
php artisan migrate
```
Vậy là khơi tạo thành công những file cần thiết cho dự án, hơn nữa khi mở những file này ra đã có sẵn luôn code CRUD cho các bạn, việc cần làm là edit lại theo nhu cầu và sử dụng là được.

Rồi, nhưng đôi khi bạn làm sai và muốn thao tác lại từ đầu thì sao, Infyom cung cấp cho bạn lệnh rollback để hoàn tác những việc vừa làm
```bash
php artisan infyom:rollback $MODEL_NAME $COMMAND_TYPE 
```
Trong đó :
* $MODEL_NAME: Tên Model ở đây của mình là Category
* $COMMAND_TYPE : api, scaffold hoặc api_scaffold, ở ví dụ của mình là `api`

> Tuy nhiên lại có một điều không vui lắm là nếu bạn đã chạy file migration thì việc rollback này sẽ không delete table đó trong database đi, mà muốn delete table trong db đi thì bạn phải chạy lệnh `migration:rollback` của laravel trước. Thật không hiểu lắm về dụng ý của nhà phát triển Infyom =)). Tuy nhiên bù lại khi nhìn trong đống file mà Infyom tạo ra bạn sẽ rất vui, vì đây là công việc mà developer nào cũng ghét đó là viết Test. Infyom đã viết test luôn cho bạn cả controller lẫn repository rồi. (Phê)

Ngoài ra nếu không muốn tạo luôn các file như vậy, bạn có thể tạo riêng lẻ từng file bằng những command mà Infyom cung cấp dưới đây:

### Tạo migration
```bash
php artisan infyom:migration $MODEL_NAME 
```

### Tạo model
```bash
php artisan infyom:model $MODEL_NAME 
```

### Tạo controller
```
php artisan infyom.api:controller $MODEL_NAME 
```

### Tạo repository
```
php artisan infyom:repository $MODEL_NAME 
```

### Tạo request
```
php artisan infyom.api:requests $MODEL_NAME 
```

### Tạo test
```
php artisan infyom.api:tests $MODEL_NAME 
```
Ngoài ra còn nhiều command khác liên quan đến tạo template, tuy nhiên trong phạm vi bài này mình không đề cập, các bạn có thể tham khảo thêm ở trang chủ của Infyom https://labs.infyom.com/laravelgenerator/docs/7.0/generator-commands

### Tạo relationship
```
php artisan infyom:api_scaffold Post --relations
```
Phần này khá dài các bạn có thể đọc thêm trong https://labs.infyom.com/laravelgenerator/docs/7.0/relationships nhé. Có hết những quan hệ mà bạn cần và khi khởi tạo table Infyom sẽ tự động tạo ra cho bạn luôn.

## 3. Kết luận
Như vậy là mình đã giới thiệu cho các bạn một package khá hay giúp giảm thiểu những công việc nhàm chán trong quá trình viết code, hy vọng các bạn sẽ đem infyom áp dụng vào dự án của mình để cùng trải nghiệm. Một package dù xịn như nào thì cũng sẽ tồn tại điểm mạnh và yếu, hy vọng là các bạn sẽ biết cách áp dụng đúng lúc đúng chỗ tùy thuộc vào hoàn cảnh của dự án. Thanks!

## 4. Tham khảo
https://labs.infyom.com/laravelgenerator/