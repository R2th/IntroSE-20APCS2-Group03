![](https://images.viblo.asia/7afbce0b-7025-41e0-93bf-1492915fc879.png)

Ở [bài viết trước](https://viblo.asia/p/laravel-xay-dung-admin-panels-don-gian-voi-backpack-3P0lP04plox), mình đã giới thiệu với các bạn **Backpack** là gì và đã thực hiện 1 demo nho nhỏ. Như các bạn có thể thấy, nó đã hỗ trợ tối đa các tác vụ CRUD, giúp cho việc xây dựng Admin Panel trở nên đơn giản hơn rất nhiều. Và ở bài viết lần này, mình sẽ giới thiệu cụ thể hơn với mọi người từng tác vụ trong Create/Read/Update/Delete mà Backpack đã tối ưu giúp chúng ta như nào nhé :D

Mình sẽ tiếp tục từ Demo ở [bài viết trước](https://viblo.asia/p/laravel-xay-dung-admin-panels-don-gian-voi-backpack-3P0lP04plox), nếu ai chưa theo dõi thì có thể quay lại tìm hiểu qua đã nhé :v: Let's go...

# Yêu cầu

Để tạo CRUD Panel, bạn sẽ cần:

* 1 bảng trong cơ sở dữ liệu (và có thể là các bảng được connect relationship);
* 1 Eloquent Model trỏ đến bảng DB đó;

Nếu chưa có Model, đừng lo lắng, **Backpack** cũng bao gồm một cách nhanh hơn để tạo database migrations và model như mình đã đề cập ở bài trước. :smile:

Sự khác biệt duy nhất giữa việc tạo CRUD truyền thống và sử dụng **Backpack\CRUD** là:

* Controller sẽ được `extend Backpack\CRUD\app\Http\Controllers\CrudController`, cho phép dễ dàng xử lý các action phổ biến nhất như: Create, Update, Delete, List, Show, Reorder, Revisions.
* Model sẽ `use \Backpack\CRUD\CrudTrait;`

Điều này có nghĩa là: 

* Có thể dễ dàng thấy logic cho từng operation, bằng cách kiểm tra các method trên controller hoặc các trait sẽ sử dụng;

* Có thể dễ dàng overwrite những gì bên trong mỗi operation;

* Có thể dễ dàng thêm custom operations khác mà **Backpack** đã tạo sẵn;

# CRUD Panel

## 1. List

Chế độ xem List đơn giản có thể trông như thế này:

![](https://images.viblo.asia/0db9ad87-09b7-4cd6-bc4e-724b9b3c4aa9.png)

Nhưng thực tế sẽ có rất nhiều action sử dụng bộ lọc, custom button,operation, xem chi tiết, export button,... sẽ trông khá chuyên nghiệp như phía dưới :v

![](https://images.viblo.asia/1ec05bba-a7e8-42ac-b910-317cb93e3ab1.png)

Việc List được thực hiện bên trong method `setupListOperation()`. Mặc định **Backpack** đã xác định các cột trong bảng cơ sở dữ liệu được show bằng `CRUD::setFromDb();`. Tuy nhiên, thực tế sẽ có những dữ liệu không muốn show ra nên chúng ta có thể tùy chỉnh việc List ra những dữ liệu cần thiết. Tất cả các column phải có name, label và type xác định, nhưng một số có thể yêu cầu một số attribute bổ sung. Ví dụ mình chỉ muốn show ra Name của Tag ở Tag List thì sẽ thực hiện như sau:

```
protected function setupListOperation()
    {
        $this->crud->addColumn([
            'name' => 'name', // The db column name
            'label' => "Name", // Table column heading
            'type' => 'Text'
        ]);
    }
```

Hãy thử reload lại trang và xem kết quả. Không chỉ có vậy, **Backpack** có hơn 22 loại column có thể sử dụng. Thêm vào đó, có thể dễ dàng tạo loại column của riêng mình. Bạn có thể tìm hiểu [Column Documention ](https://backpackforlaravel.com/docs/4.1/crud-columns##creating-a-custom-column-type)để có cái nhìn chi tiết về các loại column, API và cách sử dụng nó :D

**Backpack** còn cung cấp cách để admin lọc kết quả trong bảng ListEntries vô cùng đơn giản bằng cách thêm vài dòng lệnh sau vào function  `setupListOperation()`:

```
$this->crud->addFilter([
            'type'  => 'text',
            'name'  => 'Name',
            'label' => 'Tag Name'
        ],
            false,
            function($value) { // if the filter is active
                 $this->crud->addClause('where', 'name', 'LIKE', "%$value%");
            }
        );
```

Phần code phía trên đã thêm vào 1 filter là Tag Name có type là `text` thực hiện việc lọc theo tag name mà bạn nhập vào:

![](https://images.viblo.asia/c692b5ad-12ef-40e6-89a6-d96df445b3d9.gif)

Để tìm hiểu thêm về bộ lọc của **Backpack**, bạn có thể xem [Filters documentation](https://backpackforlaravel.com/docs/4.1/crud-filters).

Với **Backpack**, bạn cũng có thể xuất DataTable sang PDF, CSV, XLS dễ dàng bằng việc thêm vào `$this->crud->enableExportButtons();`.

## 2. Create

Thao tác này cho phép quản trị viên thêm các mục mới vào bảng cơ sở dữ liệu. Cần nhớ là tất cả các thuộc tính có thể chỉnh sửa phải được `$fillable` trong Model của bạn.

Cũng tương tự như thao tác List. Việc Create được thực hiện bên trong method `setupCreateOperation()`. Mặc định **Backpack** đã xác định các field cần nhập bằng `CRUD::setFromDb();`. Tuy nhiên bạn cũng có thể tùy chỉnh để nhập thêm field bất kì, ví dụ mình chọn icon cho Tag, thêm đoạn code như sau:

```
$this->crud->addField(
            [   // icon_picker
                'label'   => "Icon",
                'name'    => 'icon',
                'type'    => 'icon_picker',
                'iconset' => 'fontawesome' // options: fontawesome, glyphicon, ionicon, weathericon, mapicon, octicon, typicon, elusiveicon, materialdesign
            ]
        );
```

![](https://images.viblo.asia/bf9c0137-ce64-409c-960f-c22800ad1e54.gif)

Để biết thêm về cách thao tác với các field, bạn hãy tìm hiểu thêm về [Fields documentation](https://backpackforlaravel.com/docs/4.1/crud-fields#fields-api).

Hãy nhớ thêm ` CRUD::setValidation(TagRequest::class);` để chỉ định validate cho request bằng `TagRequest` nhé, nó chỉ khác một chút so với việc DI `FormRequest` trong function thông thường mà thôi :D. 

`CrudController` là một RESTful controller, vì vậy **Create** sử dụng hai route:

* GET tới `/entity-name/create` - trỏ tới create() Add New Entry form( create.blade.php);
* POST tới `/entity-name` - trỏ đến store() thực hiện việc lưu vào database;

Các method `create()` sẽ hiển thị tất cả các field bạn đã xác định cho hoạt động này bằng cách sử dụng Fields API, sau đó method store() sẽ validation từ FormRequest bạn đã chỉ định, sau đó tạo ra enttry bằng cách sử dụng Eloquent Model. Chỉ các thuộc tính được chỉ định dưới dạng fields và có $fillable trên Model sẽ thực sự được lưu trữ trong cơ sở dữ liệu.

Ngoài ra Create và Update form đều kết thúc bằng button Save với drop menu. Mỗi option trong danh sách thả xuống đó là một Save action - chúng xác định vị trí người dùng được chuyển hướng sau khi quá trình lưu hoàn tất. Có ba Save action mặc định được **Backpack** hiển thị. Bao gồm:

* save_and_back (Lưu và quay lại URL trước đó)
* save_and_edit (Lưu và chỉnh sửa mục nhập hiện tại)
* save_and_new (Lưu và chuyển đến Create page để tiếp tục tạo mới)

Ngoài những Save action mặc định như trên thì chúng ta cũng có thể tạo Save action cho riêng mình hoặc thay thế, xóa bỏ những save action mặc định của Backpack bằng cách chỉnh sửa bên trong `setupCreateOperation()` hoặc `setupUpdateOperation()`. Bạn có thể thay đổi các nút Save được hiển thị cho mỗi thao tác bằng cách sử dụng các method như: `addSaveActions()`, `replaceSaveActions(),` `removeSaveActions()`, `orderSaveActions()`,...

## 3. Update

Thao tác này cho phép quản trị viên chỉnh sửa các mục nhập từ cơ sở dữ liệu. Vẫn phải nhớ rằng tất cả các thuộc tính có thể chỉnh sửa phải nằm trong $fillable trên Model của bạn đấy nhé.

Tương tự như tác vụ Create thì Update sẽ được thực hiện bên trong `setupUpdateOperation()`. **Backpack** cũng đã xác định các field được chỉnh sửa tương ứng với các field trong DB bằng `CRUD::setFromDb();`. Ta cũng có thể sử dụng API fields để custom lại tương tự như Create.

Chỉ định file FormRequest nào sẽ sử dụng để xác thực và ủy quyền bên trong `setupUpdateOperation()`. Bạn có thể pass FormRequest giống như đã `setValidation` cho Create nếu không có sự khác biệt. 

Ở đây Update cũng sử dụng hai route:

* GET tới `/entity-name/{id}/edit` - trỏ tới edit() Edit form (edit.blade.php);
* POST tới `/entity-name/{id}/edit` - trỏ đến update() sử dụng Eloquent để update entry trong cơ sở dữ liệu;

Các method edit() sẽ hiển thị tất cả các fields bạn đã xác định cho hoạt động này bằng cách sử dụng Fields API, sau đó update() method sẽ kiểm tra xác nhận từ FormRequest, sau đó tạo entry bằng cách sử dụng Eloquent Model. Chỉ các thuộc tính đã thêm type field và có $fillable trên Model mới thực sự được cập nhật trong cơ sở dữ liệu.

Bạn hãy thử demo tương tự như với Create xem sao nhé :D

## 4. Delete

Thao tác CRUD này cho phép quản trị viên xóa một hoặc nhiều mục khỏi bảng cơ sở dữ liệu. Trong trường hợp thực thể của bạn có SoftDeletes, nó sẽ thực hiện xóa mềm. Quản trị viên sẽ không biết rằng mục nhập của mình đã bị xóa cứng hay mềm, vì nó sẽ không còn hiển thị trong dạng xem ListEntries.
### 4.1 Delete a single Item

**Backpack** sử dụng AJAX gửi một DELETE request được thực hiện theo route `/entity-name/{id}`. Để kích hoạt action Delete thì bạn chỉ cần `use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;` vào EntityCrudController của mình. Thao tác này sẽ làm cho nút Delete hiển thị trong chế độ xem List và sẽ kích hoạt các route và chức năng cần thiết cho action này.

Trong trường hợp bạn cần ghi đè cách hoạt động của thao tác này, chỉ cần tạo một `destroy()` method trong EntityCrudController của bạn:

```
use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation { destroy as traitDestroy; }

public function destroy($id)
{
    $this->crud->hasAccessOrFail('delete');

    return $this->crud->delete($id);
}
```

Bạn cũng có thể ghi đè lên nút Delete bằng cách tạo một tệp có cùng tên bên trong `resources/views/vendor/backpack/crud/buttons/`. Bạn có thể dễ dàng publish nút Delete ở đó để thực hiện các thay đổi bằng cách sử dụng: 

```
php artisan backpack:publish crud/buttons/delete
```

### 4.2 Delete multiple Items(Bulk Delete)

Ngoài nút Delete ứng với mỗi bản ghi thì bạn có thể hiển thị các hộp lựa chọn bên cạnh mỗi bản ghi và cho phép quản trị viên của bạn lựa chọn và xóa nhiều bản ghi cùng một lúc.

Tương tự như xóa 1 Item thì Backpack cũng sử dụng AJAX, gửi 1 DELETE request được thực hiện theo route `/entity-name/bulk-delete`, gọi đến `bulkDelete()` method trong EntityCrudController. Bạn cũng cần phải  `use \Backpack\CRUD\app\Http\Controllers\Operations\BulkDeleteOperation;` trong EntityCrudController của mình.

Trong trường hợp bạn cần ghi đè cách hoạt động của thao tác này, chỉ cần tạo một bulkDelete() method trong EntityCrudController của bạn:

```
use \Backpack\CRUD\app\Http\Controllers\Operations\BulkDeleteOperation { bulkDelete as traitBulkDelete; }

public function bulkDelete($id)
{
    // your custom code here
}
```

Bạn cũng có thể ghi đè nút Bulk Delete bằng cách tạo một tệp có cùng tên bên trong `resources/views/vendor/backpack/crud/buttons/`. Bạn có thể dễ dàng publish nút xóa ở đó để thực hiện các thay đổi bằng cách sử dụng:

`php artisan backpack:publish crud/buttons/bulk_delete`

# Tổng kết

Vậy là ở bài viết này, mình đã giới thiệu cụ thể hơn với mọi người việc Backpack đã hỗ trợ tối đa trong việc tạo CRUD Panel như nào. Việc xử lý CRUD API và viết frontend tương ứng đã không trở nên quá phức tạp nữa, như mình đã Demo thì chúng ta chỉ cần thêm vài dòng code là **Backpack** đã render cho chúng ta form, button, option,... và còn nhiều hơn thế mà mình không thể demo hết ở đây được. 

Mong rằng bài viết sẽ được mọi người đón đọc và có thể bài viết lần sau, mình sẽ giới thiệu thêm vài operations khác hoặc sẽ đi vào chi tiết hơn nữa :D Cảm ơn mọi người!

# Tài liệu tham khảo

https://backpackforlaravel.com/docs/4.1/crud-operations