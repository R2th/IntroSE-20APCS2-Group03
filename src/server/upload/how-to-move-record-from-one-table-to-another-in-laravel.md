# **1.Giới thiệu**
![](https://images.viblo.asia/3f2bc401-64cb-4a48-9042-c632715d0a33.png)

Vào 1 ngày đẹp trời, bạn muốn di chuyển tất cả bản ghi từ table **users** sang  table **Inactive_users** với yêu cầu là **last_login** của user hơn 3 năm , tưc có thể là các user đó không còn hoạt động nữa.

Với yêu cầu trên thì tất nhiên chúng ta sẽ dùng **SQL** để Query và **export** nó ra file csv,sql,.. để import vào bảng **Inactive_users**, hoặc có thể dùng query  **INSERT INTO SELECT**

Nhưng để làm điều đó với Laravel thì sao ?

Laravel không hỗ trợ bất kỳ phương thức nào để di chuyển toàn bộ bản ghi từ bảng này sang bảng khác trong cơ sở dữ liệu, nhưng chúng ta có thể được thực hiện một cách gián tiếp thông qua method **replicate()** , method **save()**  và  **delete()** của Model.

Cùng nhau khai sáng nào anh em ! 
# **2.Bắt đầu**
Quay trở lại với vị dụ trên, chúng ta sẽ di chuyển các bản ghi từ table **users** sang table **Inactive_users** với điều kiện là **last_login** của user đã hơn 3 năm.

Chúng ta sẽ tiến hành với các bước sau:

1. Create a new instance with **replicate()** method based on the old or original record.
2. Store this new instance with s**ave()** method and setTable() method in the new table.
3. Delete the old record from the original table with **delete()** method of a model.

### Test 

Anh em tự  tạo migration DB , và seed dữ liệu nhé.  
```
<?php

use App\User;
use Illuminate\Support\Facades\Route;

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
    User::query()
        ->where('last_login', '>', now()->subYears(3))
        ->each(function ($oldRecord) {
            $newRecord = $oldRecord->replicate();

            $newRecord->setTable('inactive_users');
            $newRecord->save();

            $oldRecord->delete();
        });

    return view('welcome');
});

  });
```

### Kết quả 

![](https://images.viblo.asia/4531095a-f9e5-4855-a813-6f8f7587b1b8.png)


![](https://images.viblo.asia/172cf77c-a3a4-4449-88fc-5daf1f5dd3e8.png)

# **3.Kết luận**
Hy vọng với những chia sẻ nhỏ nhày sẽ giúp anh em có thêm 1 giải pháp khi di chuyển toàn bộ record từ table này sang table khác.

Thân ái, chào tạm biệt, quyết thắng !