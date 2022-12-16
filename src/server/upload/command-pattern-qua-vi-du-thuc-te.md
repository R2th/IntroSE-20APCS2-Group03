![](https://images.viblo.asia/56e10741-126a-4962-87be-1529f40c78f8.gif)
# Ví dụ thực tế 1
Một website bán hàng có hơn 250,000 user đăng kí. Hàng tuần website sẽ gửi message những sản phẩm bán chạy nhất trong tuần này thông qua email hoặc SMS. Việc thông báo qua email hay SMS là do người dùng setting, đã chọn thông báo qua email thì không được chọn thông báo qua SMS và ngược lại.Câu hỏi đặt ra ở đây là làm sao gửi một message thông qua 2 channels khác nhau (email channel và SMS channel) ? 2 channel này cách thức hoạt động logic khác nhau. Như vậy ta sẽ chia thành 2 group, một là group nhận thông báo qua email và group kia nhận thông báo qua SMS. Đây cũng chính là idea của Command Pattern đó là bạn có thể gửi message đến 2 group user thông qua một luồng chạy duy nhất :D
# Implement 2
Command Pattern thỉnh thoảng được gọi Action Pattern hoặc Transaction Pattern. Command Pattern thuộc loại behavioural pattern (được sử dụng để quản lí algorithms, relationships giữa các object với nhau). Định nghĩa Command Pattern trong cuốn sách Gang of Four như sau:

> Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations

Để `Encapsulate a request as an object` bạn có thể queue với những request khác nhau. Chúng ta định nghĩa class `MessageQueue` như sau, ở đây mình sử dụng ngôn ngữ là PHP
```
<?php
class MessageQueue
{
    private $queue;

    public function __construct() {
        $this->queue = array();
    }

    public function addMessage(IMessage $msg) {
        $this->queue[] = $msg;
    }

    public function execute() {
        $sendCount = 0;
        foreach ($this->queue as $msg) {
            if ($msg->send()) {
                $sendCount++;
            }
        }
        return $sendCount;
    }
}
```
Class `MessageQueue` có 2 methods. Method `addMessage` để thêm ***chanel*** cho thuộc tính queue, và method `execute` sẽ thưc thi từng channel trong `$queue`.Command Pattern queue mỗi request cho xử lí sau đó.Thực tế thì channel Email và channel SMS sẽ được thực thi từ interface ***IMessage***, mà interface bắt buộc phải có method `send()`. Ở ví dụ này method `addMessage` sẽ append các xử lý Email channel và SMS channel vào `$queue` array, và method `execute` sẽ foreach `$queue` Array và method `send()` sẽ được gọi ứng với mỗi channel khác nhau.
```
<?php
interface IMessage
{
    public function send();
}
<?php
class DailyAlertEmail implements IMessage
{
...
    public function send() {
        // actual code here to send email
        // ...
        echo "Sending message via emailn";
    }
}

class DailyAlertSMS implements IMessage
{
...
    public function send() {
        // actual code here to send the SMS
        // ...
        echo "Sending message via SMSn";
    }
}
``` 
Trước hết muốn gửi message bằng email hay sms thì phải có tất cả customer bằng cách query từ database. Trong table `customers` có column là channel ví dụ ở đây 1 là gửi bằng email và 2 là gửi bằng SMS. Ở ví dụ ở đây trường hợp đơn giản để xác định tạo instance ứng với từng channel. Nếu đúng tinh thần OOP thì ở đây có thể áp dụng Factory Design Pattern để tạo object channel tương ứng dựa vào tham số column channel của `customers`.
```
<?php
// create a new queue
$msgQueue = new MessageQueue();

$result = $db->query("SELECT * FROM customers");
while ($customer = $result->fetch(PDO::FETCH_ASSOC)) {
    if ($customer['channel'] == 1))
        $msg = new DailyAlertEmail();
    } else {
        $msg = new DailyAlertSMS();
    }
 
    // add the message object to the queue
    $msgQueue->addMessage($msg);
}

// send to all customers now
$msgQueue->execute();
```
# Ví dụ thực tế 2
Chúng ta có thể lấy cái đèn để làm ví dụ cho pattern này, có thể gọi lệnh bật/tắt đèn bằng nhiều mệnh lệnh cùng một lúc. Một ví dụ khá là gần gũi với chúng ta phải không? chúng ta cùng implement code nào để hiểu hơn
# Implement 2
Thứ nhất, ta tạo command interface:
```
//Command
public interface Command{
  public void execute();
}
```
Tạo 2 concrete commands. Một class dùng để tắt đèn, còn class kia bật đèn:
```
abstract class LightCommand implements Command {
    protected $light;
    
    public function __construct(Light $light)
    {
        $this->light = $light;
    }
}

class LightOnCommand extends LightCommand{
    public function execute()
    {
        $this->light->switchOn();
    }
}

class LightOffCommand extends LightCommand{
    public function execute()
    {
        $this->light->switchOff();
    }
}
```
Sau đó, là tạo Class Light
```
class Light {
    private $on; // Boolean
    
    public function switchOn()
    {
        $this->on = true;
    }
    
    public function switchOff()
    {
        $this->on = false;
    }
}
```
Invoker ở đây là remote control:
```
class RemoteControl {
  private $command;
  public function setCommand(Command $command){
    $this->command = $command;
  }
  public function pressButton(){
    $this->command->execute();
  }
}
```
Bước cuối cùng là sử dụng command thôi :D
```
$remoteControl = new RemoteControl();
$light = new Light();
$lightsOn = new LightOnCommand($light);
$lightsOff = new LightOffCommand($light);


$remoteControl->setCommand($lightsOn);
$remoteControl->pressButton();

$remoteControl->setCommand($lightsOff);
$remoteControl->pressButton();
```
# Wrap up
Qua 2 ví dụ trên chúng ta cũng hiểu một phần nào đó về design pattern này, pattern được sử dụng khá nhiều trong các ứng dụng như mua và bán chứng khoán, hành động undo và redo trong các ứng dụng máy tính và nhiều ứng dụng khác. Việc nắm bắt design pattern này là điều thiết yếu để ứng dụng cho các ứng dụng thực tế sẽ uyển chuyển hơn rất nhiều. Happy coding