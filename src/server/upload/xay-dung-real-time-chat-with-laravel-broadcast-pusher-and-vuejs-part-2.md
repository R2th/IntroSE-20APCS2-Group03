# Lời nói đầu
Xin chào các bác, em quay trở lại rồi đây =)) trong bài viết trước thì em đã đi qua phần 1 của series "Xây Dựng Real Time Chat With Laravel Broadcast, Pusher and Vuejs". Nói series cho nó to tát chút chứ thực tế có 2 phần thôi các bác ạ :v.trong phần trước thì em đã đi khái quát về xây dựng giao diện và một số feature chính của app. Trong phần 2 này em sẽ chia sẻ nốt những điều cần phải làm để có thể tạo ra 1 chat app realtime, cụ thể là configure pusher. Bây giờ thì cùng bắt tay vào làm các bác nhé.

# Configure Pusher
Thực tế việc để config pusher cũng khá đơn giản. Đầu tiên các bác truy cập vào địa chỉ `Pusher.com` chọn signup. Các bác có thể sign up với tài khoản google hoặc github sau khi đăng nhập các bác click chon button `create new app` để tạo app như sau:

![](https://images.viblo.asia/0098cb2c-cf42-488f-b1df-b0dded63eb3a.png)

Sau khi tạo xong app thì các bạn chọn tab `App Keys` tại đây sẽ chứa những thông tin như `app_id, key, secret, cluster` và các thông tin này các bác dùng để điền vào file .ENV của project như sau:

```
PUSHER_APP_ID=485156
PUSHER_APP_KEY=ce59de9ad49...
PUSHER_APP_SECRET=8db65b775291f7...
PUSHER_APP_CLUSTER=ap1
```

và đừng quên thay đổi biến `BROADCAST_DRIVER` về dạng pusher nhé
```
BROADCAST_DRIVER=pusher
```
 Tiếp theo chúng ta phải vào file `config/broadcasting.php` để config lại cluster như sau:
 ```
 'options' => [
            'cluster' => 'ap1',
            'encrypted' => true
        ],
 ```
 
 sau khi đã config xong nhưng thứ trên, chúng ta tiếp tục cần install laravel echo 
 ```
 npm install --save laravel-echo pusher-js
 ```
 sau đó vào file `resource/assets/js/boostrap.js` bỏ comment đọạn code sau và nhập thông tin key và cluster vào đó
 ```
 import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'ce59de9ad4983...',
    cluster: 'ap1',
    encrypted: true
});
 ```
 
 xem ra việc config pusher đã hoàn thành rồi. bây giờ hãy vào route.php để định nghĩa một vài thứ nhé
 ```
 Route::get('chat','ChatController@chat');
Route::post('send', 'ChatController@send');

Route::get('check', function() {
	return session('chat');
});
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/getOldMessage', 'ChatController@getOldMessage');
Route::post('/deleteSession', 'ChatController@deleteSession');
Route::post('/saveToSession', 'ChatController@saveToSession');
 ```
 Như ở phần 1 thì em đã tạo ra 1 event đó là chatEvent các bác có thể xem được tại `app/Events/chatEvent` chúng ta sẽ sử dụng nó trong  file app.js như sau:
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
 
 # kết thúc
Vậy đến đây là em cũng đã xong "series" về real time chat rồi, các bác chạy thử có vẫn đề đề gì các bác cứ comment phía dưới nhé. Bài viết còn nhiều thiếu sót mong các bác thông cảm.Em trân thành cảm ơn. 
source code: `https://github.com/TienDuong2501/chat-real-time-laravel-vuejs `