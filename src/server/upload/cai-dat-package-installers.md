Tôi nghĩ hầu hết chúng ta đã làm việc với Laravel một thời gian thì rất quen thuộc với quá trình cài đặt các package thông qua composer, đăng ký trong service provider, xuất bản config file, cập nhật tệp env, và liệu có lần nào bạn quên mất một trong các bước đó, có thể việc copy paste và chuyển từ trình duyệt sang trình soạn thảo đã khiến bạn bị lẫn,nếu vậy thì phương pháp khắc phục là gì nhỉ? Và với việc phát hành Laravel 5.5, chúng ta đã có một cải tiến khá lớn cho quy trình này với  [package discovery](https://laravel.com/docs/5.5/packages#package-discovery) tuy nhiên bên ngoài trải nghiệm này không thực sự thay đổi nhiều.

Vào thời điểm mà tôi đã bắt đầu xây dựng tích hợp [Honeybadger](https://www.honeybadger.io/for/laravel/?utm_source=laravelnews&utm_medium=blog&utm_campaign=laravel&utm_content=Honeybadger) cho Laravel, tôi hầu như chưa bao giờ thấy các lệnh cài đặt cho các gói PHP. Lựa chọn duy nhất mà lúc đó tôi nghĩ tới là Laravel Spark. Khi chúng tôi bắt đầu phác thảo các tính năng cho sự tích hợp, [Josh](https://twitter.com/joshuap) đề xuất xây dựng một lệnh cài đặt tương tự như những gì họ có trong Ruby gem. Tôi nghĩ đây là một ý tưởng thực sự gọn gàng giúp quá trình cài đặt dễ dàng hơn.

Tôi đã có một số mục tiêu rất cụ thể để thêm tính năng này
* Khả năng hiển thị của tất cả các tác vụ được thực hiện (thành công và thất bại)
* Tránh càng nhiều công việc thủ công càng tốt
* Sử dụng lời nhắc lệnh cho bất kỳ thông tin bắt buộc nào
* Tương thích với Laravel và Lumen

# Hiển thị
Tôi thực sự không muốn đi sâu vào background, sửa đổi một loạt tệp của bạn và chỉ cần quay lại với thông báo rằng mọi thứ đã thành công, và chúng ta sẽ tránh việc rườm rà trong quá trình thực hiện.

Tôi cũn đã xem qua một package của [Nuno Maduro](https://twitter.com/enunomaduro) là [nunomaduro/laravel-console-task](https://github.com/nunomaduro/laravel-console-task). Tuy nhiên tôi thực sự thích một API đơn giản và đầu ra thật dễ hiểu. TUy nhiên trong quá trình làm việc với Lumen tôi đã gặp phải một số vấn đề nên tôi sẽ tạo ra một class đơn giản để phục vụ cho các tác vụ của mình.
```
<?php

namespace Honeybadger\HoneybadgerLaravel;

use Illuminate\Console\OutputStyle;

class CommandTasks
{
    /**
     * @var \Illuminate\Console\OutputStyle
     */
    protected $output;

    /**
     * @var array
     */
    protected $results = [];

    /**
     * Set command output.
     *
     * @param  \Illuminate\Console\OutputStyle  $output
     * @return self
     */
    public function setOutput(OutputStyle $output) : self
    {
        $this->output = $output;

        return $this;
    }

    /**
     * Add task with result to the stack.
     *
     * @param  string  $name
     * @param  bool  $result
     * @return self
     */
    public function addTask(string $name, bool $result) : self
    {
        $this->results[$name] = $result;

        return $this;
    }

    /**
     * Send results to the command output.
     *
     * @return void
     */
    public function outputResults() : void
    {
        collect($this->results)->each(function ($result, $description) {
            $this->output->writeLn(vsprintf('%s: %s', [
                $description,
                $result ? '<fg=green>✔</>' : '<fg=red>✘</>',
            ]));
        });
    }

    /**
     * Get the results of all tasks.
     *
     * @return array
     */
    public function getResults() : array
    {
        return $this->results;
    }
}
```

Điều này giúp tạo ra một tác vụ đơn giản và khá dễ sử dụng
```
$this->tasks->addTask(
    'Write HONEYBADGER_API_KEY to .env',
    $this->installer->writeConfig(
        ['HONEYBADGER_API_KEY' => $this->config['api_key']],
        base_path('.env')
    )
);
```
![](https://images.viblo.asia/4187ba77-964d-4f9e-a2aa-3c931f045718.png)

# Tránh việc thủ công
Toàn bộ điểm sử dụng trình cài đặt là làm cho quá trình cài đặt nhanh chóng, dễ dàng và thú vị. Tôi đã tìm thấy một trong những bất cập lớn nhất khi cài đặt các gói mới khi cập nhật cả tệp .env và tệp .env.example.

```
public function writeConfig(array $config, string $filePath) : bool
{
    try {
        $env = new DotenvEditor;
        $env->load($filePath);
    } catch (InvalidArgumentException $e) {
        return false;
    }
     collect($config)->each(function ($value, $key) use ($env) {
        $env->set($key, $value);
    });
     return $env->save();
}
```

Sau đó chúng ta có thể sử dụng phương thức đó để ghi vào cả hai tệp env. Chúng tôi sẽ viết một giá trị trống cho tệp .env.example và chúng tôi sẽ viết API mà chúng tôi đã thu thập thông qua đầu vào lệnh vào tệp .env

```
private function writeEnv() : void
{
    $this->tasks->addTask(
        'Write HONEYBADGER_API_KEY to .env',
        $this->installer->writeConfig(
            ['HONEYBADGER_API_KEY' => $this->config['api_key']],
            base_path('.env')
        )
    );
     $this->tasks->addTask(
        'Write HONEYBADGER_API_KEY placeholder to .env.example',
        $this->installer->writeConfig(
            ['HONEYBADGER_API_KEY' => ''],
            base_path('.env.example')
        )
    );
}
```
Tôi cũng muốn xuất bản các tập tin cấu hình cho cả Laravel và Lumen. Với Laravel khá dễ dàng, bạn có thể gọi lệnh vendor: publish.
```
public function publishLaravelConfig() : bool
{
    return Artisan::call('vendor:publish', [
        '--provider' => HoneybadgerServiceProvider::class,
    ]) === 0;
}
```

Lumen cho thấy có một chút khó khăn vì nó thiếu rất nhiều lệnh đi kèm với Laravel
```
public function publishLumenConfig(string $stubPath = null): bool
{
    if (! is_dir(base_path('config'))) {
        mkdir(base_path('config'));
    }
     return copy(
        $stubPath ?? __DIR__.'/../config/honeybadger.php',
        base_path('config/honeybadger.php')
    );
}
```
Sau khi chúng tôi có tất cả cấu hình tại chỗ, chúng tôi sẽ gửi ngoại lệ kiểm tra đến Honeybadger. Chúng tôi thực hiện việc này để đảm bảo rằng tất cả các bước cấu hình và cài đặt hoạt động chính xác.
![](https://images.viblo.asia/7c10c892-8d29-44f0-ad00-0eff31f374ad.png)
# Cấu hình
Điều đầu tiên chúng ta thực hiện trước khi thực hiện bất kỳ nhiệm vụ cài đặt nào mà chúng ta muốn làm đó là thu thập tất cả các giá trị cấu hình để chúng ta có thể thực hiện tất cả việc cài đặt chỉ với một lần một cách nhanh chóng.
```
public function handle()
{
    $this->config = $this->gatherConfig();
}

private function gatherConfig() : array
{
    return [
        'api_key' => $this->argument('apiKey') ?? $this->promptForApiKey(),
        'send_test' => $this->confirm('Would you like to send a test exception now?', true),
    ];
}

private function promptForApiKey() : string
{
    return $this->requiredSecret('Your API key', 'The API key is required');
}
```

Một điều tôi cần là đảm bảo rằng khóa API đã được yêu cầu. Tôi đặt cùng một phương pháp khá đơn giản để tiếp tục nhắc API cho đến khi nó được nhập vào.
```
trait RequiredInput
{
    public function requiredSecret($question, $failedMessage)
    {
        $input = $this->secret($question);
         if (is_null($input)) {
            $this->error($failedMessage);
             return $this->requiredSecret($question, $failedMessage);
        }
         return $input;
    }
}
```