## Giới thiệu về Swagger

RESTful API là một tiêu chuẩn dùng trong việc thiết kế API cho các ứng dụng web (thiết kế Web services) để tiện cho việc quản lý các resource. Nó chú trọng vào tài nguyên hệ thống (tệp văn bản, ảnh, âm thanh, video, hoặc dữ liệu động…), bao gồm các trạng thái tài nguyên được định dạng và được truyền tải qua HTTP, các RESTful API được xây dựng để cung cấp quyền sử dụng cho các đối tác 1 phần tài nguyên của mình. 

Với việc các đối tác thứ 3 được sử dụng API của chúng ta, tài liệu mô tả về API sẽ thuận tiện cho việc cung cấp về cách sử dụng tài nguyên thông qua APIs 1 cách hiệu quả và 1 công cụ khá nổi tiếng dùng để viết document APIs: Swagger. 

Swagger là 1 open source dùng để phát triển, thiết kế, xây dựng và làm tài liệu cho các hệ thống RESTfull Web Service.


![](https://images.viblo.asia/cc476a90-80bb-4932-bdf6-dfb958cd4f8d.png)


Trong bài viết hôm nay mình sẽ giới thiệu cho các bạn một thư viện hỗ trợ viết và generate api documentation một cách dễ dàng và tiện lợi trong Framework Laravel.

## Setup Swagger cho project

### Init laravel project 

Công việc này khá là quen thuộc với các bạn đã làm việc với Laravel, chúng ta cần clone Laravel app từ Github về bằng các command dưới đây : 

``` shell
$ git clone git@github.com:laravel/laravel.git my-laravel
$ cd my-laravel
$ cp .env.example .env
$ sudo chmod -R 777 storage/
$ composer install
```

### Cấu hình cho Swagger

L5-Swagger là một thư viện hỗ trợ khá tốt cho toàn bộ công đoạn làm việc với Swagger bao gồm cả việc hiển thị UI và generate file config từ các API có sẵn. Document của thư viện cũng mô tả khá rõ ràng về các chức năng, và cách cài đặt.

```shell
$ composer require "darkaonline/l5-swagger:8.0"
```
Bởi mình sử dụng Laravel phiên bản 8.0 (mới nhất ) nên mình cũng cần chọn đúng version L5-swagger tương ứng luôn.

Tiếp đó, chúng ta bổ sung file cấu hình cho Swagger trong project Laravel

```php:config/l5-swagger.php
<?php

return [
    'default' => 'default',
    'documentations' => [
        'default' => [
            'api' => [
                'title' => 'L5 Swagger UI',
            ],

            'routes' => [
                /*
                 * Route for accessing api documentation interface
                */
                'api' => 'api/documentation',
            ],
            'paths' => [
                /*
                 * File name of the generated json documentation file
                */
                'docs_json' => 'api-docs.json',

                /*
                 * File name of the generated YAML documentation file
                */
                'docs_yaml' => 'api-docs.yaml',

                /*
                 * Absolute paths to directory containing the swagger annotations are stored.
                */
                'annotations' => [
                    base_path('app'),
                ],

            ],
        ],
    ],
    ],
    ....
];
```

trong này chúng ta cần lưu ý dòng config cho đường dẫn để truy cập Swagger UI , nơi lưu các file document

##  Ví dụ cách viết API document

Trong khi viết API document cho các endpoint, chạy câu lệnh sau để Swagger UI cập nhật thông tin: 
```shell
$ php artisan l5-swagger:generate
```
Nếu không muốn mỗi lần thay đổi api documentation đều phải chạy câu lệnh trên thì ta set trong file 
```php:.env
L5_SWAGGER_GENERATE_ALWAYS=true
```
Một số annotation thường được sử dụng : 

- @OA\Swagger: Chứa thông tin cơ bản về swagger
- @OA\Info: Thông tin cấu hình
- @OA\SecuritySchema: Mô tả các phương pháp xác thực được sử dụng trong API (Swagger Authencation).
security: API nhận access_token xác thực từ securitySchema
- @OA\<Method-name>: Định nghĩa kiểu phương thức HTTP mà chúng ta sẽ sử dụng ( GET, POST, PUT, DELETE,...).
- `path`: Định nghĩa đường dẫn api gọi tới function.
- `summary`: Tóm tắt chức năng của đầu api.
- `operationId`: Tên của function.
- `tags`: Định nghĩa tags, gom tất cả các đầu API có trong một Controller thành một nhóm để người dùng dễ nhìn.
- @OA\Parameters: các parameters được truyền cho API. Trong này ta có thể set tham số truyền vào:
  - `required`: không null thì để true, ngược lại false
  - query: bạn sẽ tạo cho người dùng một input nhập vào giá trị theo các field định sẵn để gửi những query request (sử dụng trong methods GET).
  - header: khai báo những giá trị trong header của request mà bạn cần truyền lên.
  - type: type request truyền lên.
- @OA\Response: là phần trả về của server. Có thể định nghĩa những HTTP code: 200, 404, 500,... với những mô tả cho từng trường hợp riêng


### API Get danh sách orders

Giả sử chúng ta có một API thực hiện công việc get về danh sách order, trong đó :

- endpoint là : `/orders/`
- API yêu cầu xác thực bằng JWT token 
- API chấp nhận params : `status` là trạng thái của order

Như vậy chúng ta có thể viết API document cho API này trong chính file Controller của nó đơn giản như sau : 

```php: app/Http/Controller/Order.php
    /**
     * get list orders
     *
     * @OA\Get(
     *     path="/orders",
     *     tags={"orders"},
     *     security={{"BearerAuth":{}}},
     *     @OA\Parameter(
     *          in="query",
     *          name="status",
     *          required=false,
     *          description="Order status",
     *          @OA\Schema(
     *            type="string"
     *          )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Orders",
     *         @OA\JsonContent(ref="#/components/schemas/OrdersPaginationResource")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResource"),
     *     )
     * )
     * @param  Request $request
     * @return OrdersPaginationResource
     */
    public function index(Request $request): OrdersPaginationResource
    {
        // Logic lấy danh sách $orders

        return OrdersPaginationResource::make($orders);
    }
```

Trên phần document có sử dụng 1 schemas tên là `OrdersPaginationResource`, nó chứa thông tin mô tả cho dữ liệu mà API sẽ response. Bởi vì thành phần này có thể được sử dụng lại nhiều lần ở các API khác nên chúng ta viết thành schemas : 

```php:App\Http\Resources\OrdersPaginationResource.php

/**
 * @OA\Schema(
 *     properties={
 *          @OA\Property(
 *              property="meta",
 *              ref="#/components/schemas/MetaResource"
 *          ),
 *          @OA\Property(
 *              property="data",
 *              type="object",
 *                  @OA\Property(property="id", type="integer"),
 *                  @OA\Property(property="status", type="string"),
 *                  @OA\Property(property="created_at", type="string"),
 *                  @OA\Property(property="user_id", type="integer"),
 *                  @OA\Property(property="information", type="object",
 *                      @OA\Property(property="order_id", type="integer"),
 *                      @OA\Property(property="id", type="integer"),
 *                  ),
 *                  @OA\Property(property="subject", type="object",
 *                      @OA\Property(property="first_name", type="string"),
 *                      @OA\Property(property="middle_name", type="string"),
 *                      @OA\Property(property="last_name", type="string"),
 *                  ),
 *          )
 *     }
 * )
 */
class OrdersPaginationResource extends SuccessResource
 ...
```

Trên http://127.0.0.1:8002/api/documentation sẽ thể hiện mô tả cho endpoint này, bao gồm cả mô tả request, response: 
![](https://images.viblo.asia/9b660523-670a-4598-9317-3c52ffc919ec.png)


### API Get  thông tin order

Giả sử chúng ta có một API thực hiện công việc thông tin order, trong đó :

- endpoint là : `/orders/{id}` ,`id` là id của order
- API yêu cầu xác thực bằng JWT token 

Như vậy chúng ta có thể viết API document cho API này trong chính file Controller của nó đơn giản như sau : 

```php: app/Http/Controller/Order.php
    /**
     * get order detail
     *
     * @OA\Get(
     *     path="/orders/{id}",
     *     tags={"orders"},
     *     security={{"BearerAuth":{}}},
     *     @OA\Parameter(
     *          in="path",
     *          name="id",
     *          required=true,
     *          description="Order id",
     *          @OA\Schema(
     *            type="integer"
     *          )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="An order",
     *         @OA\JsonContent(ref="#/components/schemas/OrderResource")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResource"),
     *     )
     * )
     * @param  int $id
     * @return OrderResource
     */
    public function show(int $id): OrderResource
    {
        // Logic tìm order

        return OrderResource::make($order);
    }
```

Viết document cho schemas `OrderResource` cũng tương tự như `OrdersPaginationResource` được định nghĩa ở trên.

![](https://images.viblo.asia/37669f1f-9a99-4a20-8152-05a3406d16b6.png)

### API create order

Giả sử chúng ta có một API thực hiện công việc get về danh sách order, trong đó :

- endpoint là : `/orders`
- API yêu cầu xác thực bằng JWT token 
- API có request body phức tạp gồm nhiều thông tin

Như vậy chúng ta có thể viết API document cho API này trong chính file Controller của nó đơn giản như sau : 

```php:App\Http\Controllers\OrderController.php
    /**
     * Create order
     *
     * @OA\Post(
     *     path="/orders",
     *     tags={"order"},
     *     security={{"BearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/CreateOrderRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="An order",
     *         @OA\JsonContent(ref="#/components/schemas/OrderResource")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResource"),
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation errors",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorResource"),
     *     )
     * )
     * @param  CreateOrderRequest $request
     * @return OrderResource
     */
    public function createOrder(CreateOrderRequest $request)
    {
        // Logic tạo order

        return OrderResource::make($order);
    }
  ```
  
  Với request body, mình cũng viết thành 1 schemas để tận dụng nó cho các API khác 
  
  ```php
  /**
 * @OA\Schema(
 *     properties={
 *          @OA\Property(property="is_pdf_format", type="boolean"),
 *          @OA\Property(property="is_indexing", type="boolean"),
 *          @OA\Property(property="special_instruction", type="string"),
 *          @OA\Property(property="deadline", type="string", format="date"),
 *          @OA\Property(property="is_rush", type="boolean"),
 *          @OA\Property(property="party", type="object",
 *              @OA\Property(property="company", type="string"),
 *              @OA\Property(property="address", type="string"),
 *              @OA\Property(property="city", type="string"),
 *              @OA\Property(property="state", type="string"),
 *              @OA\Property(property="zip_code", type="integer"),
 *              @OA\Property(property="phone", type="string"),
 *              @OA\Property(property="fax", type="string"),
 *              @OA\Property(property="file", type="string"),
 *          ),
 *          @OA\Property(property="release_form", type="object",
 *              @OA\Property(property="type", type="string", enum={"AA", "CC"}),
 *              @OA\Property(property="prepare_release", type="string", enum={"AA", "BB"}),
 *          ),
 *     }
 * )
 */
class CreateOrderRequest extends FormRequest
 ...
  ```
  ![](https://images.viblo.asia/7c9e815c-cfa5-4c82-bf6c-b21187350bfb.png)
  
## Tạm kết
  
  
Như với hầu hết các hướng dẫn, có rất nhiều điều về Swagger và tài liệu nói chung, bạn nên truy cập vào package trên Github để hiểu rõ hơn về cách mọi thứ hoạt động và cú pháp liên quan đến các yêu cầu phức tạp hơn.