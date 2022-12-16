Trong phần này tôi sẽ hướng dẫn cách tạo một ứng dụng **CRUD** đơn giản với Yii2 Framework. Chúng ta sẽ sử dụng công cụ [**Gii**](https://www.yiiframework.com/doc/guide/2.0/vi/tool-gii) (được tích hợp sẵn trong bộ vendor của Yii) để tự động tạo mã nguồn đơn giản và bạn chỉ cần nhập các thông tin theo hướng dẫn hiển thị trên công cụ này.

## Cấu hình
Công cụ Gii được cung cấp như một module. Chúng ta có thể cài đặt Gii bằng cách cấu hình các thuộc tính của ứng dụng ở phần modules config. Ở đây chúng ta sẽ sử dụng yii2 basic (có thể tải tại https://www.yiiframework.com/download). Các thuộc tính sẽ được cấu hình trong file 
**config/web.php**
```
$config = [ ... ];

if (YII_ENV_DEV) {
    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        
    ];
}
```
**Lưu ý:** Chúng ta có thể thêm thuộc tính cấu hình địa chỉ IP được phép truy cập công cụ Gii với thuộc tính **allowedIPs**
```
'allowedIPs' => ['127.0.0.1', '::1'],
```
Bây giờ bạn có thể truy cập vào công cụ Gii qua đường dẫn:
> http://yourdomain/gii
## Cài đặt ứng dụng
### Tạo database cho ứng dụng
Chúng ta sẽ tạo một cở sở dữ liệu cơ bản, có thể tham khảo đoạn mã sau:
```
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  `status` smallint(1) DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;
```
### Tạo Model bằng công cụ Gii
Chúng ta có thể truy cập công cụ Model Generator tạo Model thông qua giao diện hoặc truy cập đường dẫn:
> http://yourdomain/gii/model

Nhập thông tin tên bảng và tên Model Class (mặc định sẽ sử dụng tên bảng)
*  Tên bảng: post
*  Tên lớp: Post

![](https://images.viblo.asia/c30607f5-c0a5-4780-9e92-92e44a173a70.jpg)

Tiếp đến, nhấn vào nút "Preview" và chọn "Generate". Bạn sẽ thấy class models/Post.php ở danh sách các class được tạo ra. 

### Tạo CRUD
**CRUD** sẽ tạo ra một ứng dụng thêm mới, xem, cập nhật, xóa (CRUD) đơn giản. Ví dụ với bảng post và model "Post", truy cập đường dẫn http://yourdomain/gii/crud điền thông tin như sau:
* Model Class: app\models\Post
* Search Model Class: app\models\PostSearch
* Controller Class: app\controllers\PostController
* View Path: @app/views/post

Tiếp đến, chọn vào nút "Preview" và chọn "Generate". Chúng ta sẽ sẽ thấy một danh sách các tập tin được tạo ra, như hình dưới
![](https://images.viblo.asia/8e8ba802-fada-4f56-9e45-28b0fd421daa.jpg)

Bây giờ chúng ta có thể kiếm tra ứng dụng bằng đường dẫn:
> http://yourdomain/post
> 
Đây là kết quả sau khi chúng ta sử dụng công cụ Gii để tạo ra một ứng dụng CRUD đơn giản:
![](https://images.viblo.asia/40a5b4b3-7669-42af-a4f1-6d6ef11d8415.jpg)

![](https://images.viblo.asia/6044bbb9-04ec-4e25-96ff-a632a4914b2d.jpg)

Và chúng ta có thể tùy chỉnh lại các thuộc tính của các widget như: [ActiveForm](https://www.yiiframework.com/doc/api/2.0/yii-widgets-activeform), [Gridview](https://www.yiiframework.com/doc/api/2.0/yii-grid-gridview), [ListView](https://www.yiiframework.com/doc/api/2.0/yii-widgets-listview).
### Một số tùy chỉnh
Một số tùy chỉnh cơ bản để ứng dụng có thể trở lên chuyên nghiệp hơn:
* Tích hợp thêm [Pjax](https://www.yiiframework.com/doc/api/2.0/yii-widgets-pjax) để phân trang và tìm kiếm sử dụng Ajax request:
```
use yii\widgets\Pjax;

Pjax::begin();
    echo GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],
            'id',
            'title',
            'slug',
            'updated_at',
            'status'
            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]);
Pjax::end();
```
*  Tùy chỉnh columns hiển thị:
```
[
    'attribute' => 'updated_at',
    'options' => ['width' => '15%'],
    'value' => function($model){
        return date("d-m-Y H:i:s", $model->updated_at);
    }
],
[
    'attribute' => 'status',
    'format' => 'html',
    'label' => false,
    'options'=> ['width' => '2%'],
    'contentOptions' => ['class' => 'text-center'],
    'value' => function($model){
        $string = '';
        switch ($model->status) {
            case 1:
                $string = '<span class="btn btn-xs btn-success">Active</span>';
                break;

            case 0:
                $string = '<span class="btn btn-xs btn-danger">Blocked</span>';
                break;
        }
        return $string;
    }
],
```
## Kết luận
Hy vọng sau bài viết này, các bạn có thể tạo cho mình một ứng dụng đơn giản cho website của mình. Chúc các bạn thành công !

> Tài liệu tham khảo:
> 
> https://www.yiiframework.com/doc/guide/2.0/en/intro-yii