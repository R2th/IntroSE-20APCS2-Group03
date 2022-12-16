- Bạn thường có thói quen dùng một mật khẩu cho các tài khoản khác nhau, các ứng dụng khác nhau
- Hay bạn thường sử dụng tên người, tên thú cưng, ngày sinh, nơi ở... hoặc là kết hợp chúng để làm mật khẩu
- Hoặc thay thế chữ cái trong mật khẩu bằng ký tự đặc biệt. VD: framgia => fr@mgi@
- Nếu mật khẩu của bạn rơi vào các trường hợp trên thì nó hoàn toàn có thể bị hacker crack một cách dễ dàng.
- Còn nếu bạn sử dụng các công cụ tạo mật khẩu để tạo ra những mật khẩu dạng: **p%9y#k&yFm?** thì rất khó để bị crack, nhưng làm sao để nhớ chúng?
- Ở dự án hiện tại của mình khách hàng có giới thiệu package [USE A PASSPHRASE](http://www.useapassphrase.com/) để tạo mật khẩu, với mục đích vừa dễ nhớ, vừa có độ bảo mật cao. Nên bài viết này mình sẽ giới thiệu đến các bạn: (vì package được viết bằng javacript, mà dự án mình chỉ viết api nên mình cần sử dụng nodejs, nếu chưa từng làm việc với nodejs, bạn có thể tham khảo ở đây: [nodejs-giới thiệu](https://viblo.asia/p/nodejs-tutorial-phan-1-gioi-thieu-va-cai-dat-ung-dung-dau-tien-gVQvlwdykZJ), [nodejs-modun](https://viblo.asia/p/nodejs-tutorial-phan-2-module-trong-nodejs-MgNvWDdKGYx))

## **I. Tạo project Laravel** 
- Ta sử dụng phiên bản laravel 5.6 mới nhất tại thời điểm viết bài.
- Bước 1: Tạo project laravel bằng 1 trong 2 lệnh sau: `laravel new laravel_two_factor_auth` hoặc `composer create-project laravel_two_factor_auth`
- Bước 2: Tạo database:
- Thêm cột `passphrase` vào file **database/migrations/2014_10_12_000000_create_users_table.php** :
    ```PHP
    Schema::create('users', function (Blueprint $table) {
        $table->increments('id');
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password');
        $table->string('passphrase');
        $table->rememberToken();
        $table->timestamps();
    });
    ```
- Chạy lệnh `php artisan migrate` để tạo database.
- Bước 3: Chạy lệnh `php artisan make:auth` để tạo mẫu signup, login, logout.
## **II. Server NodeJS**
- Cài đặt NodeJS với lệnh sau:
    ```
    sudo apt-get update
    sudo apt-get install nodejs
    ```
- Cài đặt NPM:
    ```
    sudo apt-get install npm
    ```
- Để kiểm tra NPM và NodeJS đã cài đặt được chưa:
    ```
    nodejs -v
    npm -v
    ```
- Sử dụng npm cài đặt [Express](https://www.npmjs.com/package/express):
    ```
    npm install express
    ```
- Và cài đặt [Body-parser](https://www.npmjs.com/package/body-parser) với câu lệnh:
    ```
    npm install body-parser
    ```
- Cài đặt package [USE A PASSPHRASE](http://www.useapassphrase.com/) để tạo cụ mật khẩu ngẫu nhiên cho ứng dụng:
    - Thêm file [**wordlist.js**](https://github.com/mike-hearn/useapassphrase/blob/master/js/wordlist.js) vào trong thư mục **node/passphrase/wordlist.js**. Thư mục **node/** ngang hàng với thư mục **app/**.
    - Và file [**script.js**](https://github.com/mike-hearn/useapassphrase/blob/master/js/script.js) cũng vào thư mục trên **node/passphrase/script.js**.
    - Nhưng vì ở đây ta sử dụng nodejs chứ ko phải javasript nhưng package, nên ta cần custom lại như sau:
        ```JS
        // wordlist.js
        module.exports = [
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          ...
          ...
          'wordstar',
          'worrying',
          'yielding',
          'yourself'
        ];
        
        // script.js
        var wordlist = require('./wordlist');
        var crypto = require('crypto');

        module.exports = {
            generatePassword: function (numberOfWords) {
                // Cryptographically generated random numbers
                numberOfWords = parseInt(numberOfWords);
                var array = new Uint32Array(numberOfWords);
                crypto.randomFillSync(array).toString('hex');

                // Empty array to be filled with wordlist
                var generatedPasswordArray = [];

                // Grab a random word, push it to the password array
                for (var i = 0; i < array.length; i++) {
                  var index = (array[i] % 5852);
                  generatedPasswordArray.push(wordlist[index]);
                }

                return generatedPasswordArray.join(' ');
            }
        };
        ```
- Tạo file **server.js** với đường dẫn **node/server.js**
- Nội dung file này sẽ như sau:
    ```JS
    var express = require('express');
    var bodyParser = require('body-parser');
    var app = express();
    var usePassPhrase = require('./passphrase/script');
    
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    'use strict';

    app.post('/passphrase', function (request, response) {
        var wordNumber = request.body.word_number;
        var value = usePassPhrase.generatePassword(wordNumber);

        response.send({"passphrase": value});
    });

    app.listen(3000);
    ```
- Để bắt đầu chạy server nodejs ta dùng lệnh:
    ```
    node node/server.js
    ```
- Một server nodejs sẽ được chạy ở cổng 3000, ở phần dưới ta gọi server nodejs từ server laravel để tạo passphrase.
## **III. Server laravel**
- Để gọi server nodejs từ laravel ta sử dụng package [guzzlehttp/guzzle](https://packagist.org/packages/guzzlehttp/guzzle)
- Cài đặt **Guzzlehttp** với câu lệnh:
  ```
  composer require guzzlehttp/guzzle
  ```
- Guzzlehttp sẽ được thêm vào file **composer.json**:
    ```
    ...
     "require": {
        "guzzlehttp/guzzle": "~6.0",
        ...
    },
    ...
    ```
- Tiếp đến ta tạo file **AppService.php** với đường dẫn **app/Services/AppService.php**
    ```PHP
    namespace App\Services;

    use GuzzleHttp\Client;
    use GuzzleHttp\Exception\ClientException;

    class AppService
    {
        private $guzzleClient;
        private $nodeServerUrl;

        public function __construct()
        {
            $this->guzzleClient = new Client(['curl' => [CURLOPT_SSL_VERIFYPEER => false]]);
            $this->nodeServerUrl = env('NODE_SERVER_HOST', '127.0.0.1') . ':' . env('NODE_SERVER_PORT', 3000);
        }

        public function createPassphrase($data)
        {
            $dataApi = $this->guzzleClient->post(
                $this->nodeServerUrl . 'passphrase',
                ['form_params' => $data]
            );
            
            $contents = json_decode($dataApi->getBody()->getContents(), true);

            return $contents['passphrase'];
        }
    }
    ```
- Đến đây thì việc sử dụng AppService rất đơn giản, chẳng hạn như ta tạo user, đồng thời khi đó ta sẽ gọi đến hàm `createPassphrase` để tạo cụm mật khẩu phục vụ cho việc two factor authentication. Ví dụ ta sẽ sửa file **app/Http/Controllers/Auth/RegisterController.php** như sau:
    ```PHP
    ...
    use App\Services\AppService;
    ...
    ...
    protected $appService;
    
    public function __construct(AppService $appService)
    {
        $this->appService = $appService;
    }
    
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'phone_number' => 'required',
        ]);
    }
    ...
    ...
    protected function create(array $data)
    {
        $passphrase = $this->appService->createPassphrase([
            'word_number' => 4, // độ dài passphrase là 4 từ
        ]);

        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'passphrase' => Hash::make($passphrase),
        ]);
    }
    ```
- Tất nhiên là bận cần gửi email, hoặc sms thông báo cho user biết passphrase của họ là gì, để họ lưu lại đùng khi cần.

- Nếu có bất cứ khó khăn gì có thể liên hệ trực tiếp với mình hoặc tham khảo tài liệu bên dưới.

    
    > **Tài liệu tham khảo**
    > 
    > [http://www.useapassphrase.com/](http://www.useapassphrase.com/)