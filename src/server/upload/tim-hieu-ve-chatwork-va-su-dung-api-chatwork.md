# Mở đầu
Chào mọi người, tiếp tục phần nghịch ngợm về API của tớ :v: . Thì hôm nay tớ lại nổi hứng về những phần mềm giao tiếp giữa nhân viên với nhau ở trong công ty. Trong công ty mình sử dụng Chatwork thì hôm nay tớ xin chia sẻ một số api Chatwork đơn giản. Nếu mọi người có ý tưởng nào hay thì comment chia sẻ với tớ nhé. 

# Hướng dẫn
## Tạo app laravel
```
    composer create-project laravel/laravel demoChatWork
```
Có thể sử dụng composer để cài đặt một số package hỗ trợ cho api  có thể chia sẻ ra một số mình biết: 
    
   *  Package do công ty tớ viết : ```asterisk/chatwork-php```  
       Link tham khảo https://viblo.asia/p/ban-da-thu-nghich-sun-asteriskchatwork-php-chua-aWj537mw56m
   * Guzzle Client được tích hợp sẵn trong laravel
   * cURL thư viện của php 
 
Trong phần này tớ  sử dụng guzzle vì nó phù hợp đỡ phải cài đặt thêm và dễ sử dụng.

## Lấy token
Trên phần profile => interations => trang API setting sẽ hiện ra và kết quả sẽ là như thế này :
![](https://images.viblo.asia/ba0ac61b-1d90-4df7-b409-902a75fc26e5.png)

Mỗi tài khoản cá nhân sẽ có mã này và chúng ta cần bảo mật nó nếu không mọi thông tin và tin nhắn của chúng sẽ bị lộ.
Tài khoản có domain thì cần phải xác nhận của admin.
## Một số thông tin cơ bản chatwork
* Chatwork sử được cài đặt dựa theo nguyên lý rest.
* Endpoint có format ```https://api.chatwork.com/v2``` sau v2 sẽ là các path cho mỗi api phù hợp và sau này có nếu version được cải tiến thì sẽ thay đổi v2 thành những phần cao hơn ==> đây là mục đích mình sử dụng guzzle.
* Đối với request các connect cần được kết nối bằng https và HTTP request head cần phải có api token, sẽ được set bởi key X-ChatWorkToken.
* Giới hạn số lần sử dụng api mỗi lần request API lên tới 300 lần trong 5 phút (1s 1 request). 
## Sử dụng thôi
Trong này tạo controller để lấy thông tin trả về từ chat chatwork nào :vulcan_salute: -> 
```php artisan make:controller ChatWorkController```

**Test xem request có đúng không đã.**

Trong controller: 
```
<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ChatWorkController extends Controller
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.chatwork.com/v2/',
            'headers' => [
                'X-ChatWorkToken' => 'bfe5ae7ce4889034b128f7e3058f*******'
            ]
        ]);
    }

    public function me()
    {
        $result = $this->client->get('me');

        dd($result->getBody()->getContents());
    }
}
```
* Trong controller này tớ có cài đặt một số option trong construct như uri và token để chat work xác thực.
* function me dùng để lấy thông tin cá nhân của tớ.
### Thống kê số lượng chat và task
trong phần này sẽ giúp chúng ta lấy được sô lượng chat chưa đọc, số tin nhắn TO tới bạn mà chưa đọc và số task chưa hoàn thành
```
    public function myStatus()
    {
        $result = $this->client->get('my/status');
        dd(json_decode($result->getBody()->getContents()));
    }
```
và kết quả trả về :
![](https://images.viblo.asia/cf1cc28c-1256-45ce-b828-79689466cba1.png)
### Thao tác room trong  chatwork
Ở  phần này đều có endpoint liên quan tới room là **https://api.chatwork.com/v2/rooms** tùy thuộc vào từng path sẽ có từng API cụ thể.
Cái tớ quan tâm nhất là gửi tin nhắn nhận tin nhắn nên mình sẽ demo cụ thể phần gửi và nhận.

Bạn quan tâm những phần khác có thể đọc qua docs của nó link tớ sẽ để ở cuối trang.

#### Lấy message trong rooms cụ thể.
Để lấy được ID của room thì chúng ta cần thao tác : Click vào nút setting ->  group chat setting và kết quả sẽ là như này 
![](https://images.viblo.asia/8aa0eb9c-dfe9-46fe-84d6-3d0ffc01911e.png)
Hoặc có thể lấy code từ thanh url 

code của tớ:
```
    public function getMessage($roomId)
    {
        $result = $this->client->get("rooms/{$roomId}/messages");
        dd(json_decode($result->getBody()->getContents()));
    }
```
* Trong phần này tớ chưa chỉ định parameter thì kết quả trả về phần khác biệt với phần đã lấy từ trước đó (có thể lấy tối ra 100 mess)  có nghĩa là dù bạn có đọc được rồi hay như thế nào thì trong API nó vẫn sẽ gọi và lấy dữ liệu dựa trên api trước bạn lấy tới đâu.
* nếu set parameter `?fprce=1` nó sẽ không quan tâm gì đến khác biệt api trước và sau chúng sẽ tự động lấy 100 tin nhắn mới nhất.

#### Gửi message đến từng room
File  **sendMessage.blade.php** của tớ .
```
<div class="container">
    @if(session('message'))
        {{ session('message')  }}
    @endif
    <form action="{{route('send')}}" method="post">
        @csrf
        <select name="group">
            @foreach($rooms as $room)
                @if ($room->type == 'group')
                    <option value="{{ $room->room_id }}">{{$room->name}}</option>
                @endif
            @endforeach
        </select>
        <input type="text" name="message">
        <button type="submit">send</button>
    </form>
</div>
```
Code của tớ:
```
// lấy tất cả danh sách chat
    public function sendMessage()
    {
        $rooms = $this->client->get('rooms');;
        $rooms = json_decode($rooms->getBody());

        return view('sendMessage', compact('rooms'));
    }
    
 // thực hiện gửi tin nhắn
    public function sendToChatWord(Request $request)
    {
        $this->client->post("rooms/{$request->input('group')}/messages", [
            'form_params' => [
                'body' => $request->input('message'),
            ],
        ]);

        return redirect()->back()->with('message', 'thanh cong');
    }
```
Tớ chưa cài đặt TO cho ai, TO ALL hay như thế nào tùy thuộc mọi người xử lý để chọn option phù hợp.

**Điểm bất lợi ở đây khá căng nếu không lọc dữ liệu từ phía chatwork vì nó trả toàn bộ dữ liệu trong danh bạ mà chưa có một option nào để mình có thể lấy dữ liệu phù hợp.**

kết quả mong muốn khá ok :

![](https://images.viblo.asia/c68e5e93-a32f-4189-a215-7fd05e29878f.gif)

## Đặt vấn đề
Trong khoảng thời gian từ tháng 8 năm ngoái tớ bắt đầu sử dụng chatwork thì mình nhận ra một số bất cập của chatwork
* Không có icon vui nhộn khi nhắn tin mà cần cài extensions.
* Tài khoản free thì bị giới hạn tham gia box (14 box chat).
* Không có gọi trực tiếp (hoặc là tính năng chưa được tích hợp vì mình thấy có liên kết với zoom).

Ngoài những vấn đề trên thì Chatwork vẫn là sự lựa chọn tốt cho doanh nghiệp vì nó là công cụ có tính bảo mật cao, nó đã được cấp các chứng nhận về an toàn thông tin như “chứng nhận ISO27001(ISMS)” và “ISO27018”. Ngoài việc giúp giao tiếp dễ dàng thì Chatwork còn có thể liên kết với Gmail, Twitter, hệ thống kế toán,… Không chỉ vậy, Chatwork còn có tính tương thích với nhiều thiết bị nên người dùng có thể sử dụng nó bằng PC ở công ty hoặc bằng điện thoại smartphone khi công tác bên ngoài.

**Tất cả vấn đề trên cũng đã và đang được xử lý ngoài tài khoản free :D để tiếp tục mình lại xin làm một số mẹo nhỏ để bạn có thể nhận được toàn bộ tin nhắn từ box mà chưa tham gia**
### Ý tưởng khá đơn giản
* Tạo một account clone nhận toàn bộ tin nhắn và gửi đến nick chính
* Lập lịch cho crontab chạy liên tục để xử lý chúng.
* Mỗi khi muốn gửi tin nhắn thì chỉ cần vào chọn group to cho ai là ok.

### tiến hành thôi
Tạo cơ sở dữ liệu
Tạo bảng group chứa thông tin group
```
php artisan make:model group -m
```
Tạo bảng connectAccount chứa thông tin của nick clone
```
php artisan make:model connectAccount -m
```
trong quan hệ này tớ là người nhận và gửi tin nhắn thì account sẽ làm chủ thì mình chỉ lấy quan hệ giữa 1-n (account - group)

File migrate sẽ là :
```
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('group_id');
            $table->integer('account_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('groups');
    }
}

```
```
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConnectAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('connect_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('token');
            $table->string('email')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('connect_accounts');
    }
}

```
Tạo thêm 1 acclone để tham gia box nào link https://go.chatwork.com/vi/.

OK nhé. giờ bắt đầu code thôi anh em.
tạo 2box chat nào
![](https://images.viblo.asia/94c34d5d-3afa-4793-baa4-b13bbd944717.png)

id của box chat nếu là thành viên thì bạn có thể lấy trên thanh url. và thêm chúng vào cơ sở dữ liệu để quản lý nhé :v cái phần thêm cơ sở dữ liệu mình thao tác bằng cơm cho nhanh.

#### Tạo cronjob để chạy nắng nghe sự kiện xem có ai gửi message đến box mà bạn không vào được
Tạo Command tùy chỉnh để chạy contab trên linux
```
php artisan make:command ListenGroup
```
sau khi chạy lệnh này bạn sẽ thấy folder trong thư mục `app\Console\Commands\ListenGroup`
```
<?php

namespace App\Console\Commands;

use App\Models\connectAccount;
use App\Models\group;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class ListenGroup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'listen:group';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Lắng nghe tin nhắn của group';

    protected $client;
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->client = new Client([
            'base_uri' => 'https://api.chatwork.com/v2/',
            'headers' => [
                'X-ChatWorkToken' => 'bfe5ae7ce4889034b128f7e3058******'
            ]
        ]);
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $groups = group::all();
        $groups->load('connect');
            foreach ($groups as $group) {
                $results = $this->client->get("rooms/{$group->group_id}/messages");
                $results = json_decode($results->getBody());
                if ($results) {
                    foreach ($results as $result) {
                        $message = $result->account->name . " o trong box ". $group->name . "gui tin nhan co tieu de la : " . $result->body;
                        $this->client->post("rooms/228283306/messages", [
                            'form_params' => [
                                'body' => $message,
                            ],
                        ]);
                    }   
                }
            }
        return 0;
    }
}
```
* Ở trong này mình sẽ lấy toàn bộ group trong csdl để lắng nghe xem ai nhắn tin hay không
* Tạo 1box cố định để taskschuling gửi tin nhắn vào box tránh bị spam vào nic chính.
* Còn setcontab theo thời gian bạn có thể tham khảo ở đây : https://viblo.asia/p/laravel-cronjob-va-task-scheduling-ByEZkxPylQ0
Tùy thuộc từng thời gian mà bạn có thể nhận sử lý, lưu ý trong API chatwork giới hạn gọi api 60lần/1p. 

Kết quả sẽ là như thế này: 
![](https://images.viblo.asia/32131a59-dc1b-4c9f-b0cf-f5a825378ab7.gif)
# Kết bài
Đây là một bài viết chia sẻ bài tập mà mình đặt ra, có thể bài viết này nó không được hay, thì tớ vẫn mong muốn đóng góp từ mọi người để bài viết của tớ chất lượng hơn.
Trong demo này tớ làm trên local ở máy tính cá nhân chưa có public trên heroku nếu có thời gian tớ sẽ deploy chúng lên
Cảm ơn mọi người đã đọc hết bài viết của tớ. :v: