## Mở đầu
Logging là một việc cực kì quan trọng, và Cloudwatch là một nền tảng visualize và query log khá tốt đến từ  AWS, chắc chắn các hệ thống trên AWS thường đều log tới e này, hôm nay mình xin giới thiệu cách để  laravel 8 có thể dễ dàng push log tới Cloudwatch, bắt đầu thôi :grin:

## Cách implement 
Cài package
```
composer require maxbanton/cwh:^2.0
```

Tạo class **CloudWatchLoggerFactory** để tạo drive custom push lên cloudwatch

```php
class CloudWatchLoggerFactory
{
    /**
     * Create a custom Monolog instance.
     *
     * @param  array  $config
     * @return \Monolog\Logger
     */
    public function __invoke(array $config)
    {
        $sdkParams = $config['sdk'];
        $tags = $config['tags'] ?? [];
        $name = $config['name'] ?? 'cloudwatch';

        // Instantiate AWS SDK CloudWatch Logs Client
        $client = new CloudWatchLogsClient($sdkParams);

        // Log group name, will be created if none
        $groupName = $config['group'];

        // Log stream name, will be created if none
        $streamName = $config['stream'];

        // Days to keep logs, 14 by default. Set to `null` to allow indefinite retention.
        $retentionDays = $config['retention'];

        // Instantiate handler (tags are optional)
        $handler = new CloudWatch($client, $groupName, $streamName, $retentionDays, 10000, $tags);

        // Create a log channel
        $logger = new Logger($name);

        // Set handler
        $logger->pushHandler($handler);

        return $logger;
    }
}
```

Trong config/logging.php, thêm setting  driver custom cho loại log này :D

```php
    'channels' => [
        'stack' => [
            'driver' => 'stack',
            'channels' => ['single'],
            'ignore_exceptions' => false,
        ],
        'cloudwatch_error_log' => [
            'driver' => 'custom',
            'via' => \App\Services\CloudWatchLoggerFactory::class,
            'sdk' => [
                'region' => env('AWS_DEFAULT_REGION', 'ap-northeast-1'),
                'version' => 'latest',
            ],
            'retention' => 30,
            'level' => 'info',
            'group' => env('CLOUDWATCH_LOG_GROUP', 'group-log'),
            'stream' => env('CLOUDWATCH_LOG_STREAM', 'error-log'),
        ],
```

Lựa chọn exception hợp lí để push lên cloudwatch, ở đây mình sẽ edit trong app/Exceptions/Handler.php, đây là nơi laravel hỗ trợ cho chúng ta custom cho toàn bộ quá trình handle Exception, bao gồm việc logging error và format response error của API,  như lỗi 404 thì trả về thế nào, lỗi 500 thì trả về thế nào, ... về phần mình, mình đính kèm thêm param request vào lỗi, như vậy chúng ta sẽ nắm bắt được chính xác request nào đã gây ra lỗi, thuận tiện hơn cho việc debug.

```php
    /**
     * Report or log an exception.
     *
     * @param  Throwable  $e
     * @return void
     *
     * @throws Throwable
     */
    public function report(Throwable $e)
    {
        $exceptionExcluse = [
            RouteNotFoundException::class,
            NotFoundHttpException::class,
            AuthorizationException::class,
            ValidationException::class,
        ];

        if (!in_array(get_class($e), $exceptionExcluse)) {
            $this->logPrettyError($e);
        }

        parent::report($e);
    }

```

Như các bạn thấy, các lỗi common như RouteNotFoundException hay NotFoundHttpException hoặc ValidationException, là do user nhập sai url hoặc form input thôi, nên ko đủ quan trọng để chúng ta phải log lại để điều tra :#)

Hàm log lỗi thêm param request:
```php
    private function logPrettyError(Throwable $e)
    {
        $request = request();

        $log = [
            'access' => [
                'request' => $request->all(),
                'method' => $request->method(),
                'path' => $request->path(),
            ],
            'error' => [
                'class' => get_class($e),
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ],
        ];

        getLogger()->error(json_encode($log));
    }
```

Đừng quên chọn driver logging đúng với môi trường cần log cloudwatch nhé (thường là STG và PROD)
```
LOG_CHANNEL=cloudwatch_error_log
CLOUDWATCH_LOG_GROUP=
CLOUDWATCH_LOG_STREAM=
```

Thêm 2 helper để viết log trong code được tiện lợi hơn 
```php
/**
 * Get logger
 */
if (!function_exists('getLogger')) {
    function getLogger()
    {
        return Log::channel(env('LOG_CHANNEL', 'daily'));
    }
}

/**
 * Log info
 */
if (!function_exists('logInfo')) {
    function logInfo($info)
    {
        getLogger()->info($info);
    }
}

/**
 * Log error
 */
if (!function_exists('logError')) {
    function logError($e)
    {
        $logger = getLogger();

        if ($e instanceof Exception) {
            $logger->error($e->getMessage() . ' on line ' . $e->getLine() . ' of file ' . $e->getFile());
        } else {
            $logger->error($e);
        }
    }
}
```

## Cách filter trên cloudwatch thuận tiện cho việc đọc log
Dựa trên việc log phía trên, mình có 1 số cách query đọc log thuận tiện hơn
- query log lấy 20 cái gần nhất 
```
fields @timestamp, @message | sort @timestamp desc | limit 25
```
- query get số lượng message chứa Exception trong vòng 1h
```
filter @message like /Exception/ 
    | stats count(*) as exceptionCount by bin(1h)
    | sort exceptionCount desc
    
```
![](https://images.viblo.asia/57715ad3-f15b-4599-9ba4-dbb48f078269.png)


- query log không chứa Exception
```
fields @message | filter @message not like /Exception/
```
- query đọc log lỗi đến từ API product
```
fields @timestamp, @message
| sort @timestamp desc
| filter @message like /ERROR(.*)api\\\/v1\\\/products/
```

![](https://images.viblo.asia/f7d64101-462f-402c-93e1-6fa2c3a1b09a.png)

Tham khảo:
https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html



### Hy vọng việc logging cloudwatch với laravel sẽ cực kì dễ dàng cho bà con, thank for reading :grin: