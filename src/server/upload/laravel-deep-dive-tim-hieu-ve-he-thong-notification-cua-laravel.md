# Lời nói đầu

Với các hệ thống hiện này gửi thông báo tin tức, thông báo xác nhận đăng ký, thông báo quên mật khẩu hay reset mật khẩu cho người dùng là vô cùng cần thiết. Đây có thể là đòi hỏi bắt buộc với các hệ thống website có tương tác nhiều với người dùng hiện này. Với Laravel nó đã cung cấp sẵn cho chúng ta các công cụ cần thiết để cài đặt và sử dụng hệ thống thông báo này thông qua các kênh khác nhau.

# Laravel notifications.

Hệ thống notifications của Laravel giúp chúng ta có thể dễ dàng gửi thông báo đến người dùng thông qua các kênh thông báo được thiết lập trong Laravel. Dưới đây là một ví dụ về một đối tượng notifications.

```
	class TestNotification extends Notification
	{
	    public function via($notifiable)
	    {
	        return ['mail', 'database'];
	    }

	    public function toMail($notifiable)
	    {
	        return (new MailMessage)
	                    ->line('The introduction to the notification.')
	                    ->action('Notification Action', url('/'))
	                    ->line('Thank you for using our application!');
	    }
	}
```

Như ta đã thấy đối tượng trên sử dụng phương thức via() để thiết lập các kênh có thể dùng để gửi thông báo, và có thể định nghĩa các phương thức khác nhau để phù hợp với cách xử lý mỗi khi thông báo được gửi qua kênh tương ứng.

Để bắt đầu gửi thông báo ta sử dụng class *Illuminate\Notifications\ChannelManager* có cài đặt 2 giao diện:

* Illuminate\Contracts\Notifications\Dispatcher
* Illuminate\Contracts\Notifications\Factory

Cài đặt của class ChannelManager:

```
<?php

namespace Illuminate\Notifications;

use Illuminate\Mail\Markdown;
use InvalidArgumentException;
use Illuminate\Support\Manager;
use Nexmo\Client as NexmoClient;
use GuzzleHttp\Client as HttpClient;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Bus\Dispatcher as Bus;
use Nexmo\Client\Credentials\Basic as NexmoCredentials;
use Illuminate\Contracts\Notifications\Factory as FactoryContract;
use Illuminate\Contracts\Notifications\Dispatcher as DispatcherContract;

class ChannelManager extends Manager implements DispatcherContract, FactoryContract
{
    /**
     * The default channel used to deliver messages.
     *
     * @var string
     */
    protected $defaultChannel = 'mail';

    /**
     * Send the given notification to the given notifiable entities.
     *
     * @param  \Illuminate\Support\Collection|array|mixed  $notifiables
     * @param  mixed  $notification
     * @return void
     */
    public function send($notifiables, $notification)
    {
        return (new NotificationSender(
            $this, $this->app->make(Bus::class), $this->app->make(Dispatcher::class))
        )->send($notifiables, $notification);
    }

    /**
     * Send the given notification immediately.
     *
     * @param  \Illuminate\Support\Collection|array|mixed  $notifiables
     * @param  mixed  $notification
     * @param  array|null  $channels
     * @return void
     */
    public function sendNow($notifiables, $notification, array $channels = null)
    {
        return (new NotificationSender(
            $this, $this->app->make(Bus::class), $this->app->make(Dispatcher::class))
        )->sendNow($notifiables, $notification, $channels);
    }

    /**
     * Get a channel instance.
     *
     * @param  string|null  $name
     * @return mixed
     */
    public function channel($name = null)
    {
        return $this->driver($name);
    }

    /**
     * Create an instance of the database driver.
     *
     * @return \Illuminate\Notifications\Channels\DatabaseChannel
     */
    protected function createDatabaseDriver()
    {
        return $this->app->make(Channels\DatabaseChannel::class);
    }

    /**
     * Create an instance of the broadcast driver.
     *
     * @return \Illuminate\Notifications\Channels\BroadcastChannel
     */
    protected function createBroadcastDriver()
    {
        return $this->app->make(Channels\BroadcastChannel::class);
    }

    /**
     * Create an instance of the mail driver.
     *
     * @return \Illuminate\Notifications\Channels\MailChannel
     */
    protected function createMailDriver()
    {
        return $this->app->make(Channels\MailChannel::class)->setMarkdownResolver(function () {
            return $this->app->make(Markdown::class);
        });
    }

    /**
     * Create an instance of the Nexmo driver.
     *
     * @return \Illuminate\Notifications\Channels\NexmoSmsChannel
     */
    protected function createNexmoDriver()
    {
        return new Channels\NexmoSmsChannel(
            new NexmoClient(new NexmoCredentials(
                $this->app['config']['services.nexmo.key'],
                $this->app['config']['services.nexmo.secret']
            )),
            $this->app['config']['services.nexmo.sms_from']
        );
    }

    /**
     * Create an instance of the Slack driver.
     *
     * @return \Illuminate\Notifications\Channels\SlackWebhookChannel
     */
    protected function createSlackDriver()
    {
        return new Channels\SlackWebhookChannel(new HttpClient);
    }

    /**
     * Create a new driver instance.
     *
     * @param  string  $driver
     * @return mixed
     *
     * @throws \InvalidArgumentException
     */
    protected function createDriver($driver)
    {
        try {
            return parent::createDriver($driver);
        } catch (InvalidArgumentException $e) {
            if (class_exists($driver)) {
                return $this->app->make($driver);
            }

            throw $e;
        }
    }

    /**
     * Get the default channel driver name.
     *
     * @return string
     */
    public function getDefaultDriver()
    {
        return $this->defaultChannel;
    }

    /**
     * Get the default channel driver name.
     *
     * @return string
     */
    public function deliversVia()
    {
        return $this->getDefaultDriver();
    }

    /**
     * Set the default channel driver name.
     *
     * @param  string  $channel
     * @return void
     */
    public function deliverVia($channel)
    {
        $this->defaultChannel = $channel;
    }
}
```

Như ta thấy có 2 phương thức send() và sendNow được dùng để gửi thông báo. Cả 2 đều trả về kết quả của việc gọi phương thức tương ứng của class NotificationSender trên một đối tượng của nó. Các phương thức còn lại dùng để lấy thông tin của các kênh mà thông báo sẽ được gửi qua.

Hoặc cách đơn giản hơn là sử dụng facade *Illuminate\Support\Facades\Notification* (bên trong facade này đã sử dụng class ChannelManager) để gửi thông báo:

```
Notification::send($users, new TestNotification());
```
Dưới đây là cài đặt của Notification facade:

```
	namespace Illuminate\Support\Facades;

	use Illuminate\Notifications\ChannelManager;
	use Illuminate\Support\Testing\Fakes\NotificationFake;

	/**
	 * @see \Illuminate\Notifications\ChannelManager
	 */
	class Notification extends Facade
	{
	    /**
	     * Replace the bound instance with a fake.
	     *
	     * @return void
	     */
	    public static function fake()
	    {
	        static::swap(new NotificationFake);
	    }

	    /**
	     * Get the registered name of the component.
	     *
	     * @return string
	     */
	    protected static function getFacadeAccessor()
	    {
	        return ChannelManager::class;
	    }
	}
```

Phương thức send() nhận tham số đầu tiên là danh sách users cần gửi notification (nó có thể là một đối tượng hoặc một mảng). Bên trong phương thức send() laravel sẽ tạo đối tượng của *Illuminate\Notifications\NotificationSender*, cái mà sau này sẽ xử lý việc gửi notifications. Nó sẽ có 3 nhiệm vụ sau:

* Chuẩn bị danh sách sẽ được gửi thông báo.
* Quyết định xem thông báo sẽ được gửi ngay hoặc cho vào hệ thông queue.
* Xử lý việc gửi hoặc queue.

Ở nhiệm vụ đầu tiên, danh sách người được gửi thông báo sẽ được format thành một mảng Collection để đảm bảo có thể lặp qua tất cả các item trong danh sách.
Ở nhiệm vụ thứ 2 laravel sẽ kiểm tra nếu đối tượng notification ta truyền vào có cài đặt interface *Illuminate\Contracts\Queue\ShouldQueue* thì notification sẽ được chuyển qua queue thay cho việc gửi luôn.
Ở nhiệm vụ thứ 3 tùy vào việc queue hay gửi luôn hệ thống sẽ có xử lý riêng.

## Với việc thông báo sẽ được gửi luôn.

Nếu thông báo được xác định là sẽ gửi ngay luôn thì ChannelManager sẽ gọi phương thức sendNow() của NotificationSender, phương thức này sẽ:

* Đảm bảo Id của thông báo này được thiết lập.
* Gửi đối tượng thông báo tới các kênh thông báo khác nhau.
* Bắt ra một vài event.

Đầu tiên laravel sẽ bắn ra event *Illuminate\Notifications\Events\NotificationSending*, nếu có bất cứ listener nào trả về false thì thông báo sẽ không được gửi. Sau đó là event *Illuminate\Notifications\Events\NotificationSent* nếu thông báo được gửi.

Để gửi gửi thông báo, laravel sẽ gọi phương thức build() để tạo một đối tượng của kênh mà sẽ được sử dụng để gửi và gọi phương thức send() trên đối tượng đó.

Ngoài ra với phương thức sendNow() ta có thể truyền thêm tham số thứ 3 để chỉ ra kênh mà ta muốn gửi thông báo đồng thời override kênh được chỉ định sẵn cả class Notification ở trên.

```
	Notification::sendNow($users, new TestNotification(), ['slack', 'mail']);
```

Dưới đây là phương thức sendNow():

```
    public function sendNow($notifiables, $notification, array $channels = null)
    {
        return (new NotificationSender(
            $this, $this->app->make(Bus::class), $this->app->make(Dispatcher::class))
        )->sendNow($notifiables, $notification, $channels);
    }
```

## Gửi các thông báo bằng queue

Việc gửi thông báo thông qua queue sẽ được laravel thực hiện như sau: tương ứng với mỗi người dùng cần gửi laravel sẽ tạo ra một job cho việc gửi thông báo cho mỗi channel mà ta muốn gửi. Tức là nếu số người dùng là m và số kênh ta muốn gửi qua là n thì số job được đẩy vào queue sẽ là m * n. Tại sao laravel lại phải tạo nhiều job đến vậy thì lý do là nếu chúng ta đẩy việc gửi tất thông báo vào cùng một job thì rất dễ xảy ra trường hợp nếu job fail thì tất cả các thông báo cho người dùng sẽ bị fail và không được gửi. Nếu job thực hiện retry thì các thông báo đã được gửi sẽ bị gửi lại gây ra việc trùng lặp thông báo.

Laravel cũng tạo ra số định danh duy nhất cho các thông báo ứng với mỗi người dùng. Nó được dùng làm primary key cho trường hợp ta sử dùng Database channel.

Bên trong class *Illuminate\Notifications\NotificationSender* phương thức queueNotification() được gọi trong trường hợp các thông báo cần được gửi bằng queue.

```
    protected function queueNotification($notifiables, $notification)
    {
        $notifiables = $this->formatNotifiables($notifiables);

        $original = clone $notification;

        foreach ($notifiables as $notifiable) {
            $notificationId = Uuid::uuid4()->toString();

            foreach ($original->via($notifiable) as $channel) {
                $notification = clone $original;

                $notification->id = $notificationId;

                $this->bus->dispatch(
                    (new SendQueuedNotifications($this->formatNotifiables($notifiable), $notification, [$channel]))
                            ->onConnection($notification->connection)
                            ->onQueue($notification->queue)
                            ->delay($notification->delay)
                );
            }
        }
    }
```

Bên trong phương thức này laravel tạo định danh cho mỗi notification và gửi một đối tượng của *Illuminate\Notifications\SendQueuedNotifications* cho queue, đối tương này có nhiệm vụ lưu các thông tin liên quan tới các người được gửi, nội dung thông báo, kênh mà thông báo được gửi qua, và một số thông tin cần thiết cho việc chạy job gửi thông báo như:

* Queue connection sẽ được sử dụng
* Queue sẽ được sử dụng.
* Các thông số trước khi gửi.

Các tham số trên có thể được thiết lập thông qua các phương thức của *Illuminate\Bus\Queueable* trait nếu ta sử dụng trait này bên trong class notification.

```
	Notification::send($users, 
	    (new TestNotification())->onConnection(...)->onQueue(...)->delay(...)
	);
```

Hoặc đặt cho chúng là các thuộc tính của class notification:

```
	class PolicyUpdateNotification extends Notification implements ShouldQueue
	{
	    public $connection = 'redis';

	    public $queue = 'urgent';

	    public $delay = 60;
	}
```
# Tài liệu tham khảo
1.) https://divinglaravel.com/notifications