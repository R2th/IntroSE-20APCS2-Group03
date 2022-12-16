# Bài toán đặt ra
Với Laravel, Bạn có thể dùng nhiều mô hình phát triển phổ biến như dưới đây:
1. Dùng blade kết hợp html/css/js làm frontend và dữ liệu truy vấn trực tiếp mà không thông qua API. Trường hợp này, chung source.
2. Dùng balde làm frontend, phần xử lý giao diện tích hợp Vuejs/Reactjs/Angular. Laravel dùng để làm backend, viết api. Trường hợp này, chung source.
3. Dùng Vuejs/Reactjs/Angular làm frontend và dùng Laravel làm backend (api). Frontend và backend là 2 source độc lập nhau. Frontend lấy dữ liệu thông qua API.
4. Là trường hợp 2&3 nhưng api không xử lý logic nghiệp vụ trên code đó mà chỉ là trạm trung chuyển để gọi api gateway tập trung khác.
Với trường hợp 4, câu hỏi đặt ra là làm thế nào quản lý được các api gọi sang api gateway tập trung ở server khác?
# Giải pháp
Trong Laravel vấn đề trên có thể được giải quyết thông qua việc tạo ra class base để quản lý kết nối đến api gateway.

# Triển khai
### Bước 1: Tạo thư mục App/Services
Cấu trúc thư mục và file
![](https://images.viblo.asia/a9bcc9db-cefa-4a0e-8b48-884e9ed2f962.png)

Trong đó:
1. app/Services/BaseCallService.php: file chứa xử lý kết nối sang api gateway
2. app/Services/ServiceMapping.php: file chứa khai báo thông tin các api
3. app/Services/Api/StudentService.php: file xử lý thông tin sinh viên
4. app/Services/Api/TeacherService.php: file xử lý thông tin giáo viên
### Bước 2: Code các file đã tạo
#### File BaseCallService
Đây sẽ là file xử lý kết nối sang api gateway. File này sẽ đón nhận params truyền vào, url (base url và endpoint), method cần gọi. Các thông tin được cấu hình trong file ServiceMapping và gọi chúng ra thông qua hàm getMapping().
Dữ liệu sẽ được trả về trong hàm getData(). Ngoài ra, nếu cần ngay dữ liệu giả thì gọi hàm getFakeData().
```
<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;

class BaseCallService
{
    protected $params = [];
    protected $headers = [];

    protected $isDummy = true;
    protected $endPoint;
    protected $method;
    protected $baseUrl;

    public function __construct($params)
    {
        $this->getMap();
    }

    public function getData()
    {
        if ($this->isDummy) {
            return $this->getFakeData();
        }

        try {
            $client = new Client(['base_uri' => $this->baseUrl]);
            $response = $client->request(
                $this->method,
                $this->endPoint,
                [
                    'form_params' => $this->params,
                    'timeout' => 100,
                    'connect_timeout' => 100
                ]
            );
            $body = $response->getBody();
            $contents = json_decode($body->getContents());
            $responseData = (array)$contents;

            if(is_array($responseData)){
                if(!array_key_exists('errorCode', $responseData)) $responseData['errorCode'] = 500;
                if(!array_key_exists('message', $responseData)) $responseData['message'] = '';
                if(!array_key_exists('data', $responseData)) $responseData['data'] = [];
            }

        } catch (\Exception $e) {
            $responseData = [
                'status' => 1,
                'errorCode' => 500,
                'message' => $e->getMessage(),
                'message_dev' => 'Lỗi ngoại lệ khi call api gateway',
                'data' => null
            ];
        }

        return $responseData;
    }

    public function getFakeData()
    {
        return [
            'status' => 0,
            'errorCode' => 0,
            'message' => 'Thành công',
            'message_dev' => 'Lấy danh sách thành công',
            'data' => [
                [
                    'id' => 1,
                    'fullname' => 'Phạm Văn Đoan',
                    'age' => 38,
                ]
            ]
        ];

    }

    private function getMap()
    {
        $mappings = ServiceMapping::getMapping();
        $data = $mappings[get_class($this)];

        $data['params']['appCode'] = 'WEBPORTAL';

        $this->baseUrl = $data['baseURL'];
        $this->endPoint = !empty($this->endPoint) ? $this->endPoint : $data['endPoint'];
        $this->method = $data['method'];
        $this->params = array_merge($data['params'], $this->params);       
    }
}
```
#### File ServiceMapping
File này sẽ cấu hình, khai báo các api cần gọi thông qua cái gọi là service. Như vậy, khi cần kết nối đến api gateway nào thì ta sẽ tạo ra file service tương ứng trong thư mục "app/Services/Api". Sau đó, khai báo thông tin vào đây để "BaseCallService" gọi ra để so sánh với service mà client muốn gọi.
```
<?php

namespace App\Services;

use App\Services\Api\StudentService;
use App\Services\Api\TeacherService;

class ServiceMapping
{
    const EDUPHAM = 'xxx';

    public static function getMapping()
    {
        return [
            StudentService::class => [
                'baseURL'  => 'xxx',
                'endPoint' => 'api/v1/students',
                'method'   => 'GET',
                'params'   => [
                    'lang' => 'vi'
                ]

            ],
            TeacherService::class => [
                'baseURL'  => 'xxx',
                'endPoint' => 'api/v1/teachers',
                'method'   => 'GET',
                'params'   => [
                    'lang' => 'vi'
                ]
            ],
        ];
    }
}
```
#### File StudentService
File này chuyển tiếp params do client truyền vào để nhận về kết quả từ api gateway thông qua hàm getData() ở class base.
```
<?php

namespace App\Services\Api;

use App\Services\BaseCallService;

class StudentService extends BaseCallService
{
    protected $params = [];
    protected $isDummy = false;

    public function __construct($params)
    {
        $this->params = $params;
        parent::__construct($params);
    }

    public function getFakeData()
    {
        return [
            'status' => 0,
            'errorCode' => 0,
            'message' => 'Thành công',
            'message_dev' => 'Lấy danh sách Sinh viên thành công',
            'data' => [
                [
                    'id' => 1,
                    'fullname' => 'Phạm Văn Đoan',
                    'age' => 38,
                ],
                [
                    'id' => 2,
                    'fullname' => 'Phạm Văn Đán',
                    'age' => 37,
                ],
                [
                    'id' => 3,
                    'fullname' => 'Phạm Văn Đôn',
                    'age' => 36,
                ]
            ]
        ];
    }
}
```
#### File TeacherService
File này chuyển tiếp params do client truyền vào để nhận về kết quả từ api gateway thông qua hàm getData() ở class base.
```
<?php

namespace App\Services\Api;

use App\Services\BaseCallService;

class TeacherService extends BaseCallService
{
    protected $params = [];
    protected $isDummy = false;

    public function __construct($params)
    {
        $this->params = $params;
        parent::__construct($params);
    }

    public function getFakeData()
    {
        return [
            'status' => 0,
            'errorCode' => 0,
            'message' => 'Thành công',
            'message_dev' => 'Lấy danh sách Giáo viên thành công',
            'data' => [
                [
                    'id' => 1,
                    'fullname' => 'Phạm Văn Đoan',
                    'age' => 38,
                ],
                [
                    'id' => 2,
                    'fullname' => 'Phạm Văn Đán',
                    'age' => 37,
                ]
            ]
        ];
    }
}
```
### Bước 2: Sử dụng
#### Tạo route
File: routes/api.php
```
Route::get('/students', 'Api\StudentController@listing');
Route::get('/teachers', 'Api\TeacherController@listing');
```
#### Tạo controller StudentController
File : app/Http/Controllers/Api/StudentController.php. Ở controller chỉ cần khởi tạo mới đối tượng service tương ứng rồi truyền tham số vào.
```
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Api\StudentService;

class StudentController extends Controller
{
    public function listing()
    {
        $response = (new StudentService([
            'keyword' => 'StudentService',
            'page_index' => 1,
            'page_size' => 10,
        ]))->getData();

        return response()->json($response);
    }
}
```
#### Tạo controller TeacherController
File : app/Http/Controllers/Api/TeacherController.php. Ở controller chỉ cần khởi tạo mới đối tượng service tương ứng rồi truyền tham số vào.
```
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Api\TeacherService;

class TeacherController extends Controller
{    
    public function listing()
    {
        $response = (new TeacherService([
            'keyword' => 'TeacherService',
            'page_index' => 1,
            'page_size' => 10,
        ]))->getData();

        return response()->json($response);
    }
}
```
### Bước 4: Test postman
Chạy các url tương ứng với phương thức GET để xem kết quả.
```
http://localhost:8000/api/students
```
và 
```
http://localhost:8000/api/teachers
```

Hy vọng, bài viết nhỏ này, sẽ giúp các Bạn tổ chức code được khoa học hơn, gọn gàng hơn và dễ quản lý kết nối hơn.
Chúc các bạn thành công!