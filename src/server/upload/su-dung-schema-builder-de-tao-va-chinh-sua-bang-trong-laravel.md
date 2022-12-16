**Schema Builder** là một class của Laravel giúp chúng ta làm việc với các cơ sở dữ liệu mà Laravel hỗ trợ với các hàm định sẵn. Trong bài viết này mình xin phép được giới thiệu cách tạo và chỉnh sửa bảng trong database một cách đơn giản với Schema Builder.

Để có thể sử dụng Schema Builder trước hết các bạn phải kết nối với database và gọi namespace **Illuminate\Support\Facades\Schema** của nó nhé.




-----
### **1.  Tạo bảng**

Để tạo bảng ta sử dụng phương thức **create**
```
Schema::create('users', function($table)
{
    $table->DataType('ColumnName');
});
```
Trong đó **DataType** là kiểu dữ liệu của cột và **ColumnName** là tên của cột.

Ví dụ mình muốn tạo một bảng có 2 trường là id và name:
```
    Schema::create('users', function ( $table) {
        $table->increments('id');
        $table->string('name');
    });
```

Demo:

![image.png](https://images.viblo.asia/1e6f8de7-ec96-4ced-a18a-d6cacf5dd61c.png)

Chạy Route vừa tạo trên browser
![image.png](https://images.viblo.asia/98b9b39e-fa40-43c3-8511-a24adfdaa7ba.png)

Kết quả:
![image.png](https://images.viblo.asia/9ca0cd70-fc4e-4128-b5f5-8dac3fbdc88b.png)


Một số lệnh tạo cột phổ biến:




| Column 1 | Column 2 | 
| -------- | -------- |
| $table->char('name', 4);   | tạo cột name có kiểu dữ liệu char với độ dài là 4  | 
| $table->date('created_at');   | tạo cột create_at có kiểu dữ liệu date| 
|$table->integer('votes');  |tạo cột votes với kiểu dữ liệu nguyên  | 
| $table->timestamp('added_on');  | tạo cột added_on vơi kiểu dữ liệu là thời gian thêm dữ liệu  | 
| $table->string('email');   | tạo cột email với kiểu dữ liệu là string  | 
|$table->float('amount');   | tạo cột amount với kiểu dữ liệu là float | 

Ngoài ra các bạn có thể tham khảo tại link :https://laravel.com/docs/5.0/schema






### **2. Chỉnh sửa bảng**
### 
Để update bảng đã có, chúng ta sử dụng phương thức **table **

```
Schema::table('users', function($table)
{
    //TODO
});
```

Để thêm cột ta dùng câu lệnh giống như cách thêm cột khi tạo bảng:
     `$table->DataType('ColumnName');`
  
 Ví dụ: thêm cột email vào bảng users:
 ![image.png](https://images.viblo.asia/47b043de-61a8-46f2-ad75-0cabb72cafc3.png)
 
 Truy cập route bằng browser:
 ![image.png](https://images.viblo.asia/d3ae28c9-11ba-4d45-a97d-3edccb16d093.png)
 
 Kết quả:
 ![image.png](https://images.viblo.asia/1b1e5ab0-a737-4a84-86b5-b733b9a7cee5.png)
 

     
 Để thay đổi tên column Name1 thành Name2 ta dùng lệnh renameColumn: 
 
 `$table->renameColumn('Name1', 'Name2');`. Cách làm tương tự thêm cột:
 ![image.png](https://images.viblo.asia/fd7f8f6d-8cd9-4d46-844c-8901ad61fb2a.png)
 
 Kết quả sau khi chạy:
 ![image.png](https://images.viblo.asia/6f1b83bf-4d5d-481c-ba97-46c195f32962.png)
 
  

Để xóa cột Column1 và Column2 trong bảng ta dùng lệnh dropColumn:

`$table->dropColumn(['Column1','Column2']);` . Cách làm tương tự thêm cột

Để đổi tên bảng Tb1 sang thành Tb2: `Schema::rename('Tb1', 'Tb2');`

Ví dụ muốn đổi  tên bảng users thành user: 
![image.png](https://images.viblo.asia/5d2bb00a-8676-4026-8e40-a51e030abb66.png)

Kết quả chạy trên trình duyệt:
![image.png](https://images.viblo.asia/85ad06c6-d401-4a13-8f79-5f2304fb52e8.png)
Kết quả trong database:
![image.png](https://images.viblo.asia/3b555b37-5ef6-4d95-b809-0c76461eb948.png)


Để xóa bảng ta dùng phương thức drop:`Schema::drop('tableName');`
Ví dụ bạn muốn xóa bảng user:
![image.png](https://images.viblo.asia/8bc42934-ec4e-46a7-a6db-92be7d6e347c.png)

Truy cập vào route trên browser:
![image.png](https://images.viblo.asia/39169db0-1a77-47b8-90e3-f3a42b41914b.png)
Kết quả:
![image.png](https://images.viblo.asia/02b20c43-c9e8-4179-bb09-26af7114d901.png)