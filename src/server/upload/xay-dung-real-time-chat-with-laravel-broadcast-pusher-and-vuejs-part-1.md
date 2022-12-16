Xin chào các bác!! em đã quay trở lại rồi đây :D tiếp nối những bài viết trước đó về Vuejs kết hợp Laravel, trong bài viết này em tiếp tục với nội dung của VueJS và Laravel. Tuy nhiên những bài viết trước hướng chủ đạo là đi vào những khái niệm trong Vuejs. Để đổi gió một chút, trong bài bài viết này em xin phép đi vào xây dựng sản phẩm luôn. Tiêu đề em ghi rất rõ nội dung bài viết rồi "Xây Dựng Real Time Chat With Laravel Broadcast, Pusher and Vuejs part 1". Đây chỉ là một ứng  dụng chat đơn giản, không đòi hỏi nhiều sự tư duy và kỳ công trong quá trình code, nên bác nào có đọc được bài viết này mà thấy có nhiều chỗ chưa hợp lý thì cũng đừng ném đá em nhé :))), các bác có thể góp ý về cách trình bày hay technichcal để em có thể cải thiện hơn về chất lượng cho những bài viết tiếp theo. Bây giờ thì, bắt đầu thôi.
# Setting up Project
Tất nhiên rồi, trước khi nhảy vào code thì chúng ta phải set up vài thứ đã chứ nhể. và chắc chắn đầu tiên chúng ta 1 setup một project laravel rồi :)))
```
composer create-project --prefer-dist laravel/laravel real_time_chat_app "5.5.*"
``` 
Sau đó là chạy: 
```
npm install
```

cài xong npm thì tiếp tục đến với cài đặt thư viện boostrap. Ở đây thì mình sẽ cài bản 4.0 của boostrap, tuy nó đã có bản mới nhất là 4.1 nhưng mình vẫn dùng bản 4.0 nhé =)) thực tế nó cũng ko có khác biệt nhiều. các bạn vào trang documentation của boostrap rồi chạy lệnh sau
```
npm install bootstrap
```
sau khi cài đặt sau boostrap thì các bạn vào file `resource/assets/sass/app.scss` tại phần mà chúng ta import boostrap thì các bạn sửa thành như sau:
```
@import "node_modules/bootstrap/scss/bootstrap.scss";
```
tương tự thì tại file `resource/assets/sass/_variables.scss` các bạn cũng sửa `$font-size-base: 14px;` thành:
```
$font-size-base: 0.875rem;
```
Tiếp theo cùng xây dựng giao diện chính của app.Trong view các bạn tao ra file chat.blade.php như này:
```
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title>Document</title>
	<link rel="stylesheet" href="{{ asset('css/app.css') }}">
	<style>
		.list-group{
			overflow-y: scroll;
				height: 300px;
		}
	</style>
</head>
<body>
	
	<div class="container" id="app">
		<div class="row">
			<div class="offset-4 col-4 offset-sm-1 col-sm-10">
				<li class="list-group-item active ">Chat Room <span class="badge badge-danger badge-pill">@{{ numberOfUser }}</span> </li>
				<ul class="list-group" v-chat-scroll>
					
					<span class="badge badge-pill badge-primary">@{{ typing }} </span>
					<message v-for="value,index in chat.message"
					:key=value.index
					:color=chat.color[index]
					:user = chat.user[index]
					:time = chat.time[index]> @{{ value }} </message>
				</ul>
				<input type="text" class="form-control"
				placeholder="type your message here" 
				v-model="message" 
				@keyup.enter = "send"
				>
				<br>
				<a href="" class="btn btn-warning btn-sm" @click.prevent="deleteSession">Delete Chats</a>
			</div>
			
		</div>
	</div>
	


	<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
```
Chưa gì đã có nhiều biến, tham số truyền vào quá rồi đúng không? :D các bác cũng đừng lo lắng nhé, nó có sự kết nối với các file phía sau nữa mà . Tuy nhiên ở đây các bác lưu ý 1 chút là chúng ta có sử dụng cái plugin `v-chat-scroll` nên để chạy được thì cần phải install nó. nên sau khi tạo xong file này thì các bác chạy thêm dòng lệnh này nữa nhé
```
npm install --save vue-chat-scroll
```
Tại resources/js/app.js có nội dung như sau:
```

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue';
//for auto scroll
import VueChatScroll from 'vue-chat-scroll';
Vue.use(VueChatScroll);

//for notification

import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout: 5000})






Vue.component('message', require('./components/Message.vue'));

const app = new Vue({
    el: '#app',
    data : {
    	message : '',
    	chat : {
    		message : [],
    		user : [],
    		color : [],
    		time : []
    	},
    	typing : '',
    	numberOfUser : 0
    },
    watch : {
    	message() {
    		Echo.private('chat')
		    .whisper('typing', {
		        name: this.message
		    });
    	}
    },
    methods : {
    	send() {
    		if(this.message.length != 0)
    		this.chat.message.push(this.message);
    		this.chat.user.push('you');
    		this.chat.color.push('success');
    		this.chat.time.push(this.getTime());

    		axios.post('/send', {
		    message : this.message,
		    chat : this.chat
			  })
			  .then(response => {
			    console.log(response);
			    this.message = '';
			  })
			  .catch(error => {
			    console.log(error);
			  });
		},
		getTime(){
    		let time = new Date();
    		return time.getHours()+':'+time.getMinutes();
    	},
		getOldMessages(){
            axios.post('/getOldMessage')
                  .then(response => {
                    // console.log(response);
                    if (response.data != '') {
                        this.chat = response.data;
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
        },
        deleteSession(){
            axios.post('/deleteSession')
            .then(response=> this.$toaster.success('Chat history is deleted') );
        }

    },
    mounted(){
    	this.getOldMessages();
    	Echo.private('chat')
	    .listen('ChatEvent', (e) => {
	    	this.chat.message.push(e.message);
	    	this.chat.user.push(e.user);
	    	this.chat.color.push('warning');
	    	this.chat.time.push(this.getTime());

	    	axios.post('/saveToSession', {
	    		chat: this.chat
	    	})
			  .then(response => {
			  })
			  .catch(error => {
			    console.log(error);
			  });
	    })
	    .listenForWhisper('typing', (e) => {
	    	if(e.name != '') {
	    		this.typing = 'typing...';
	    	} else {
	    		this.typing = '';
	    	}
        
    	});

    	Echo.join(`chat`)
	    .here((users) => {
	    	this.numberOfUser = users.length;
	    })
	    .joining((user) => {
	    	this.numberOfUser +=1;
	    	this.$toaster.success(user.name + ' is joined the chat room');
	    })
	    .leaving((user) => {
	    	this.numberOfUser -= 1;
	    	this.$toaster.warning(user.name + ' is leaved the chat room');
	    });
	    }
});
```

Các bác có thể thấy là trong file app.js này em đã import vào 1 số plugin và có require môt component Message.vue. Vậy việc của chúng ta tiếp theo là tạo ra file resource/assets/js/component/Message.vue.
```
<template>
    <div>
        <li class="list-group-item" :class="className"><slot></slot>
            <span id="time">{{ time }}</span></li>
        <small class="badge float-right" :class="badgeClass">{{user}}</small>
    </div>
    
</template>

<script>
    export default {
        props : [
            'color',
            'user',
            'time'
        ],
        computed : {
            className(){
                return 'list-group-item-' + this.color;
            },
            badgeClass(){
                return 'badge-'+this.color;
            }

        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

<style>
    #time {
        font-size: 9px;
        margin-top: 10px;
        color:black;
    }
</style>
```
Vậy là "KHÁ ỔN" bên phía frontend rồi =))chúng ta đến với xử lý bên server nào. Việc đầu tiên chúng ta sẽ làm đó là cài đặt Pusher với câu lệnh sau:
```
composer require pusher/pusher-php-server "~3.0"
```
Sau khi cài đặt xong Pusher, thì các bác vào file `config/app.php` tại đây thì các bác bỏ comment dòng provider `App\Providers\BroadcastServiceProvider::class,`. Sau đó các bác vào file config/broacasting.php chuyển `options` như sau:
```
'options' => [
                'cluster' => 'ap1',
                'encrypted' => true
            ],
```
Bất kỳ khi nào chúng ta broadcasting bất kỳ message nào thì chúng ta phải broadcast message đó thông qua` event`. Giờ thì cùng khởi tạo `event`. Vào app/Providers/EventServiceProvider 
```
protected $listen = [
        'App\Events\ChatEvent' => [
            'App\Listeners\ChatListener',
        ],
    ];
```
chạy lệnh create `event` 
```
php artisan event:generate 
```
Sau khi đã tạo xong event thì các bác vào app/Events/ChatEvent.php các bác thêm các nội dung như sau:
```
<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\User;

class ChatEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $message;
    public $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message, User $user)
    {
        $this->message = $message;
        $this->user = $user->name;
        $this->dontBroadcastToCurrentUser();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('chat');
    }
}

```
Tiếp theo là tạo ChatController.
```
php artisan make:controller ChatController
```
nội dung của chatController như sau:
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ChatEvent;
use App\User;
use Auth;

class ChatController extends Controller
{
	 /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function chat()
    {
        return view('chat');
    }

    public function send(request $request)
    {
        $user = User::find(Auth::id());
        $this->saveToSession($request);
        event(new ChatEvent($request->message,$user));
    }
    public function saveToSession(request $request)
    {
        session()->put('chat',$request->chat);
    }

    public function getOldMessage()
    {
        return session('chat');
    }

    public function deleteSession()
    {
        session()->forget('chat');
    }

}
```
vậy là cũng hòm hòm rồi đó các bác :)) ở phần tiếp theo em sẽ tiếp tục phần configure pusher để thực hiện realtime. cảm ơn các bác đã ghé đọc, bài viết còn nhiều thiếu sót nên em rất mong các bác nhiệt tình đóng góp ý kiến để em cải thiện hơn về chất lượng trong những bài tới, trân thành cảm ơn!!