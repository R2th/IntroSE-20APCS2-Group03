# Cài đặt app trên pusher.
1. Vào trang https://dashboard.pusher.com/accounts/sign_up và đăng ký cho mình một tài khoản (có thể sử dụng tài khoản của github hoặc google)
2. Sau khi đăng ký và đăng nhập thành công, tạo một app mới trên pusher
 ![](https://images.viblo.asia/f9811f6c-46a3-4439-86bd-d9d9eec2c0a3.png)
# Cài đặt project
Tạo một project mới, ở đây mình lấy tên là group-chat. Sử dụng câu lệnh:
> laravel new group-chat
> 
hoặc dùng composer
> composer create-project --prefer-dist laravel/laravel group-chat
> 
Cài đặt dependencies javascript
> npm install
> 
Cần cài đặt thêm hai thư viện  Laravel Echo và Pusher JS để hỗ trợ với việc chat realtime
> npm install --save laravel-echo pusher-js
> 
# Config
Cần config file .env với những thông số tương ứng của app mà bạn đã tạo trên pusher
![](https://images.viblo.asia/b9e6cbfc-fd6b-4714-944d-65bbdd70ea56.png)
```
BROADCAST_DRIVER=pusher

PUSHER_APP_ID=your-pusher-app-id
PUSHER_APP_KEY=your-pusher-app-key
PUSHER_APP_SECRET=your-pusher-app-secret
PUSHER_APP_CLUSTER=your-pusher-app-cluster
```
Tiếp theo, vào file resources/js/bootstrap.js và bỏ comment những dòng dưới đây để tạo một Echo mới
```
import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    encrypted: true
});
```
# Migration
Trong ứng dụng chat group, cần một số bảng và model sau:
* User tương ứng với bảng users để lưu thông tin người dùng (dùng migration mặc định của laravel)
* Conversation tương ứng với bảng conversations để lưu lại nội dung chat trong các group
* Group tương ứng với bảng groups để lưu lại các nhóm chat
* Bảng group_users để lưu lại thông tin người dùng có trong group chat nào.

Tạo model với migration tương ứng bằng các câu lệnh sau:
> php artisan make:model Conversation -m
> 
> php artisan make:model Group -m
> 
> php artisan make:migration create_group_user_table --create=group_user
> 
##  Bảng groups
Bảng groups sẽ gồm các trường
* id: lưu lại id của group
* name: lưu lại tên của group

```
    public function up()
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });
    }
```
## Bảng group_user
Bảng group_user gồm các trường: id, group_id: id, user_id thể hiện một user có thể join nhều group chat và một group chat gồm nhiều user khác nhau.
```
    public function up()
    {
        Schema::create('group_user', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('group_id');
            $table->unsignedInteger('user_id');
            $table->timestamps();
        });
    }
```
## Bảng conversations
Bảng conversations sẽ gồm các trường:
* id: id của trò chuyện
* message: nội dung của message
* user_id: id của người gửi đi message
* group_id: message đó được gửi đến group nào
```
    public function up()
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->increments('id');
            $table->text('message')->nullable();
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('group_id');
            $table->timestamps();
        });
    }
```
# Tạo một group chat mới
Để người dùng có thể tiến hành chat, họ phải tạo một group chat mới với tất cả những người có thể đọc và gửi tin nhắn trong group này
Tạo GroupController với câu lệnh
>  php artisan make:controller GroupController
>  
Tạo route:
```
Route::resource('groups', 'GroupController');
```
Trong GroupController, thêm phần code dưới đây
```
    public function store()
    {
        $group = Group::create(['name' => request('name')]);

        $users = collect(request('users'));
        $users->push(auth()->user()->id);

        $group->users()->attach($users);

        return $group;
    }
```
Tạo một group chat mới, đồng thời thêm người dùng vào trong group đó

Khi một group chat mới được tạo, tất cả người dùng trong group sẽ nhận được popup thông báo về group đó và popup đó là realtime

Cần có một sự kiện được phát đi trên Pusher cho tất cả người dùng trong nhóm chat, nó phải được implement ShouldBroadcast interface. Sử dụng câu lệnh sau để tạo event
>   php artisan make:event GroupCreated
>   
Phương thức này cần phải trả về channels mà sự kiện sẽ được phát
```
     public function broadcastOn()
    {
        $channels = [];

        foreach ($this->group->users as $user) {
            array_push($channels, new PrivateChannel('users.' . $user->id));
        }

        return $channels;
    }

```
Sự kiện sẽ được phát trong chỉ một nhóm cụ thể nào đó.

Cần start queue để bắt đầu lắng nghe các jobs và phát đi các sự kiện. Chỉnh sửa lại file GroupController như dưới đây để phát đi sự kiện cho tất cả người dùng trong nhóm chat khi nhóm chat được tạo
```
    public function store()
    {
        $group = Group::create(['name' => request('name')]);

        $users = collect(request('users'));
        $users->push(auth()->user()->id);

        $group->users()->attach($users);

        broadcast(new GroupCreated($group))->toOthers();

        return $group;
    }

```
# Xác thực
Cần phải xác thực rằng người dùng hiện tại có quyền được lắng nghe channel private này. Laravel Echo sẽ tự động gọi các route được cho phép nếu ta đang lắng nghe các channel private. Nhưng, chúng ta vẫn cần viết logic xác thực để thực sự cấp quyền cho người dùng. Nó được thực hiện trong file routes/channels.php
```
    Broadcast::channel('users.{id}', function ($user, $id) {
        return (int) $user->id === (int) $id;
    });
```
# Lắng nghe sự kiện tạo group chat mới
Bên client cần lắng nghe sự kiện khi tạo một group chat mới, sử dụng Echo.private(channel):
```
    listenForNewGroups() {
        Echo.private('users.' + this.user.id)
            .listen('GroupCreated', (e) => {
                this.groups.push(e.group);
            });
    }
```
Như vậy khi một nhóm mới được tạo nó sẽ phát sự kiện trên Pusher đến những thành viên  trong nhóm đó. Sau đó pusher lắng nghe private channel và đẩy nhóm chat mới vào mảng các nhóm chat trong Vue component (nếu sử dụng kết hợp VueJS)
# Thực hiện gửi một tin nhắn mới
Tạo controller cho việc gửi đi một tin nhắn mới
> php artisan make:controller ConversationController
> 
Route cho controller này
```
Route::resource('conversations', 'ConversationController');
```
Khi một tin nhắn mới được gửi vào trong nhóm chat. Cần phải lưu lại nó trong database
```
    public function store()
    {
        $conversation = Conversation::create([ 
            'message' => request('message'),
            'group_id' => request('group_id'),
            'user_id' => auth()->user()->id,
        ]);

        return $conversation->load('user');
    }
```
Cũng tương tự như việc tạo một nhóm chat mới, khi gửi đi một tin nhắn mới cũng cần phải tạo sự kiện và truyền đi trên pusher
> php artisan make:event NewMessage
> 
Event này cũng cần phải implement  ShouldBroadcast interface

Phương thức broadcastOn cũng sẽ trả về một private channel, chỉ những người dùng có trong group chat này mới nhận được sự kiện được phát đi khi tin nhắn được gửi vào nhóm
```
    public function broadcastOn()
    {
        return new PrivateChannel('groups.' . $this->conversation->group->id);
    }
```
Sự kiện tin nhắn được gửi vào trong nhóm chat cũng cần phải được phát đi tương tự như sự kiện tạo một group chat
```
    public function store()
    {
        $conversation = Conversation::create([
            'message' => request('message'),
            'group_id' => request('group_id'),
            'user_id' => auth()->user()->id,
        ]);

        $conversation->load('user');

        broadcast(new NewMessage($conversation))->toOthers();

        return $conversation->load('user');
    }
```
Tương tự với xác thực tạo nhóm chat
```
    Broadcast::channel('groups.{group}', function ($user, Group $group) {
        return $group->hasUser($user->id);
    });
```
# Lắng nghe khi có tin nhắn mới
Việc lắng nghe khi có tin nhắn mới trong nhóm chat cũng sử dụng Echo.private(channel):
```
    listenForNewMessage() {
        Echo.private('groups.' + this.group.id)
            .listen('NewMessage', (e) => {
                this.conversations.push(e);
            });
    }
```
Như vậy các bước trên sẽ giúp bạn thiết lập phần server để gửi tin nhắn realtime với việc sử dụng pusher.

Lưu ý, bạn cần phải thiết lập queue trong laravel và chạy queue work.
# Tham khảo
> https://pusher.com/tutorials/group-chat-laravel/