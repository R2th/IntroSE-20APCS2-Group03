# Lời nói đầu
Xin chào các bác, em đã trở lại rồi đây :)). hôm nay xin phép các bác là em đi nhanh  qua phần chào hỏi nhé,kkk. Hôm nay em viết một bài về VueJS các bác nhé, tại dạo gần đây cũng bắt đầu làm dự án liên quan đến VueJS, nên em tiện chia sẻ luôn những kiến thức mà mình học hỏi và tìm hiểu được. Trong bài này thì em viết về Life Cycle Hooks trong VueJS hay còn gọi là vòng đời của VueJS.Chắc chắn bác nào đã làm việc mà sử dụng framework VueJS thì cũng chẳng lạ gì với VueJS Life Cycle Hooks, tuy nhiên với nhiều bác mới làm quen với VueJS thì có thể vẫn rất mung lung về bản chất củng từng phương thức trong Life Cycle Hooks.Vậy nên trong bài này em và các bác sẽ cùng đi tìm hiểu chi tiết về từng phương thức trong Life Cycle Hooks nhé.
# Khái niệm
Vòng đời của VueJS hay còn gọi là cách thức, cơ chế hoạt động của VueJS. Khi các bác tạo một đối tượng, cập nhật, huỷ bỏ… đều được đưa vào vòng đời của VueJS. Ở đây em có nhắc tới khái niệm Hooks. Hooks có thể được hiểu là các phương thức, các hàm được cung cấp sẵn, có thể can thiệp vào từng giai đoạn của vòng đời.

Nếu bác nào từng lập trình WordPress thì sẽ hiểu Hooks ở đây vì WordPress hoạt động chủ yếu dựa vào Hooks và Action.

Để hiểu rõ hơn, chúng ta cùng xem qua sơ đồ sau:
![](https://images.viblo.asia/40266397-473d-4ff2-aef7-c4cf4e892b83.png)

Nhìn vào sơ đồ khối logic ta thấy từ khi khởi tạo đến khi huỷ bỏ, một đối tượng Vue sẽ đi qua các hook khác nhau. Cụ thể VueJS đã cung cấp cho chúng ta một số hook là: beforeCreate(), created(), beforeMount(). mounted(), beforeUpdate(). updated(), beforeDestroy(). destroyed().
<br>
# Khởi tạo project
Để đi sâu vào tìm hiểu từng phương thức trên các bác cần khởi tạo một mini project để test nhé.
các bác chạy các lệnh dưới đây để khởi tạo:
<br>
```bash
vue init webpack test_life_cycle_hook
```
sau khi chạy xong các bác cứ bấm `enter` là được.Sau đó chay các lệnh sau:
```bash
cd test_life_cycle_hook
npm install
npm run dev
```
Sau khi mọi thứ installed thì các bác chạy lên trình duyệt là ok.
<br>
![](https://images.viblo.asia/02372a50-a1a0-4d5a-8f03-d1daf4ea8eb3.PNG)
<br>
## Khởi tạo Component
Component là thứ được nhắc đến ở đây. Là một trong những tính năng mạnh mẽ nhất của VueJS bởi khả năng tái sử dụng. Khi component chạy, Hook khởi tạo sẽ thiết lập những gì liên quan đến component, trước khi đưa vào DOM. Chúng ta không thể truy xuất DOM và phần tử đã được hook khởi tạo mounting (`this.$el`), em sẽ nói thêm ở phần Mounting.
### beforeCreate()
Hook beforeCreate sẽ được gọi đồng bộ ngay sau khi Vue được khởi tạo. Các data (dữ liệu) và event (sự kiện) chưa được thiết lập. Ví dụ với đoạn code sau:
```
<script>
    export default {
    	data() {
    		return {
    			content: 'data in beforeCreate'
    		}
    	},
    	beforeCreate() {
    		console.log('beforeCreate Hook')
    		console.log(this.content)
    	}
    }
</script>
```
Sau khi chạy đoạn code trên, mở cửa sổ console của trình duyệt và có kết quả:
![](https://images.viblo.asia/d086cd9f-02e5-4069-a8d9-dbe536a6bc7c.PNG)

<br>
Dễ dàng nhận thấy this.content không nhận được giá trị từ data và log ra undefined.
### created()
Lúc này, các data và event đã được thiết lập.
```
<script>
    export default {
    	data() {
    		return {
    			content: 'data in created'
    		}
    	},
    	created() {
    		console.log("Created Hook")
    		console.log(this.content)
    	}
    }
</script>
```
Và kết quả:
![](https://images.viblo.asia/323ae852-d428-48ce-b26c-e39978f47a4b.PNG)

Tuy nhiên, Các template và Virtual DOM chưa được mount và render, các bác không thể truy cập đến $ el.
```html
<script>
    export default {
    	created() {
    		console.log("This Object:")
    		console.log(this)
    		console.log("This $el:")
    		console.log(this.$el)
    	}
    }
</script>
```
Kết quả:
![](https://images.viblo.asia/ee3e3ab3-935b-4e06-8764-f05f6f1f860d.PNG)

<br>
$el là phần tử HTML mà Vue quản lý hoặc có thể hiểu là thành phần HTML bao toàn bộ một Vue component. `$el` sẽ có thể truy cập nếu chúng ta option (cài đặt) cho el.

cung cấp cho lớp Vue một phần tử DOM để các lớp Vue gắn kết (mount) vào. Nó có thể là CSS selector hoặc phần tử HTML. Khi el được mounted vào lớp Vue, chúng ta có thể truy cập đến các phần tử bằng cách gọi `this.$el` hoặc `vm.$el` ( khi khai báo vm = new Vue).

Nếu có option el, ngay lập tức lớp Vue sẽ thực hiện biên dịch (compile). Mặt khác, nếu không có option el, người dùng sẽ cài đặt thủ công bằng cách gọi `this.$mount` hoặc `vm.$mount()`.
## Mounting (Chèn phần tử DOM)
**Mounting hook** được sử dụng nhiều nhất. Ở giai đoạn này, Vue cho phép truy xuất vào các component ngay lập tức, sau khi component được render lần đầu tiên.

**Sử dụng**: Nếu muốn thay đổi DOM trước hoặc sau khi render.

**Không sử dụng được**: Liên quan đến dữ liệu (data).
### beforeMount()
Hook này khá ít dùng, có thể cần không động đến. Nó sẽ thực hiện sau khi render function hoàn tất và trước khi render chính thức phần tử DOM của lớp Vue. Tại đây, các bác vẫn chưa thể truy cập đến `$el`. Cũng giống như `created()` hook ở trên, tuy nhiên mọi thứ như template, DOM đã sẵn sàng để render vào `$el`.

Chú ý: Hook này không được gọi ở server-side.
### mounted()
Trong mounted hook, chúng ta có thể hoàn toàn truy cập đến component, template và DOM thông qua **this.$el** (hoặc **vm.$el**).

Hook này được sử dụng thường xuyên. Có thể sử dụng để thay đổi DOM, fetching data ( cũng có thể dùng created() hook) hay tích hợp các thư viện khác.

Ví dụ sau sẽ mô tả sự khác nhau giữa **created() hook** và **mounted() hook**:
```
export default {
    	mounted() {
    		console.log("This Object:")
    		console.log(this)
    		console.log("This $el:")
    		console.log(this.$el)
    	}
    }
```
Nếu như ở trên **created() hook** không thể truy cập được **this.$el** thì **mounted() hook** hoàn toàn có thể:
![](https://images.viblo.asia/5656de2a-dbda-4e57-bde7-c372401d7cd1.PNG)
<br>
Như các bạn đã thấy, mình đã có thể truy cập được phần tử DOM.
## Updating (Thay đổi và Re-render)
Updating hook sẽ được gọi khi có sự thay đổi trong component. Nó sẽ khiến component re-render. Hook này sẽ đưa component của bạn vào chu kỳ watch-compute-render.

**Sử dụng**: Khi muốn biết component nào được re-render.

**Không sử dụng**: Khi muốn biết các thay đổi ở component. Thay vào đó, hãy dùng các thuộc tính của VueJS như **watcher** hay **computed**.
### beforeUpdate()
Hook này được gọi ngay sau khi có sự thay đổi dữ liệu (data) trên component. Và được thực hiện trược khi DOM re-render. Bạn có thể lấy được dữ liệu mới (new data) tại đây.
<br>
Ví dụ đoạn code sau:
```
<template>
	<div class="pull-right">{{ data }}</div>
</template>

<script>
    export default {
    	data() {
    		return {
    			data : 0
    		}
    	},
    	created() {
    		setInterval(() => {
    			this.data++
    			console.log("Change data count of component: " + this.data)
    		}, 1000)
    	},
    	beforeUpdate() {
    		console.log("Data beforeUpdate: " + this.data)
    	}
    }
</script>
```
<br>
Ở đây mình sẽ cho data đếm tăng dần sau mỗi 1 giây. Mở log trên trình duyệt ta nhận được:
<br>

![](https://images.viblo.asia/69c6da88-a905-498f-9549-25e89e18a7ed.png)

Quá trình diễn ra lần lượt như sau. Hook `created()` được chạy đầu tiên và thay đổi giá trị của data. Ngay khi nhân được sự thay đổi dữ liệu của component, `beforeUpdate()` hook sẽ lấy dữ liệu data mới được update và log ra console. Cuối cùng mới đến DOM re-render và hiển thị giá trị ở template (như giá trị 6 phía bên trái hình ảnh).
### updated()
Sau hook `beforeUpdate()`, sau khi DOM đã re-render. Dữ liệu truy xuất được là dữ liệu sau khi được thay đổi của component, cũng là dữ liệu lấy được trong `beforeUpdate()`.

Một chú ý ở đây: Nên tránh việc thay đổi data khi sử dụng hook này. Mà thay vào đó hãy sử dụng các thuộc tính `watcher` hay `computed`.

Để minh hoạ quá trình Mounting, chúng ta cùng xét đoạn code sau:
```
<template>
	<div class="pull-right">{{ data }}</div>
</template>

<script>
    export default {
    	data() {
    		return {
    			data : 0
    		}
    	},
    	created() {
    		setInterval(() => {
    			this.data++
    			console.log("Change data count of component: " + this.data)
    		}, 1000)
    	},
    	updated() {
    		console.log("Data updated: " + this.data)
    	},
    	beforeUpdate() {
    		console.log("Data beforeUpdate: " + this.data)
    	}
    }
</script>
```
Kết quả:
<br>
![](https://images.viblo.asia/c82ca9c1-0d72-4db3-893a-4aa4c394548f.PNG)
<br>
Như vậy, hook `updated()` thực hiện ngay sau hook `beforeUpdate()`, sau khi DOM re-render. Dữ liệu trong hook `updated()` cũng giống hook `beforeUpdate()`.
## Destruction (Huỷ bỏ)
**Destruction Hook** dùng để thực hiện các hành động khi component của bạn bị huỷ bỏ. Hay nói cách khác là xoá khỏi DOM. Nếu bạn sử đã từng sử dụng Vue Router hay tạo các ứng dụng SPA thì chắc chắn sẽ hiểu rõ. Việc huỷ bỏ component cũ và thay thế component mới sẽ tiết kiệm bộ nhớ rất nhiều cũng như cải thiện tốc độ. Đó cũng là một điểm mạnh của Vue component.
### beforeDestroy()
**beforeDestroy() hook** được gọi ngay trước khi huỷ bỏ component. Đây là giai đoạn thích hợp nhất để bạn xoá bỏ các data, events để dọn dẹp.
### destroyed()
destroyed() hook được gọi khi component đã bị xoá bỏ khỏi DOM.

Chúng ta cùng xét ví dụ:
```html
<template>
	<div id="root" class="pull-right">
	  <test-component v-if="show"></test-component>
	  <button class="btn btn-default" @click="show = !show">Action</button>

	</div>
</template>

<script>
	import Vue from 'vue'

	Vue.component('test-component', {
		template: '<div>VueJS {{ content }}</div>',
		data() {
		    return {
		    	content : 'ITMagical',
		    	interval : ''
		    }
	  	},
	  	beforeDestroy() {
	  		console.log('beforeDestroy')
	  	},
	  	destroyed() {	  		
	  		console.log('destroyed && content = ' + this.content)
	  	},
	  	created() {
	  		this.interval = setInterval(() => {
	  			console.log('not removed')
	  		},1000)
	  	}
	})

	export default {
		data() {
			return {
		      	show : true
		    }
		}
	}
</script>
```
Chức năng của đoạn code trên chỉ đơn giản là Ẩn/Hiện nội dung “VueJS ITMagical” và log ra console “not remove” sau mỗi giây. Dữ liệu này nằm trong một Vue component đặt tên là test-component.

Việc ẩn/hiện ở đây bản chất là mình sẽ huỷ bỏ / thêm component. Và vấn đề cần nhắc đến là việc clean up data khi xoá component.

Trước tiên, ta chạy đoạn code trên:
<br>
![](https://images.viblo.asia/a64bc7fd-1555-414f-8319-63edc1d0e8e1.png)
<br>
![](https://images.viblo.asia/15343b45-64fd-42c0-b174-f2998ed7f67d.png)
<br>
Đây là ví dụ khi chưa xoá dữ liệu ở **beforeDestroy() hook**. Các bạn có thể thấy, sự kiện log ra console “not remove” vẫn tiếp tục chạy kể cả khi component đã bị xoá khỏi DOM. Điều này gây lãng phí tài nguyên, là nguyên nhân gây ra giật lag. Nếu mình set thời gian không phải 1s thì có lẽ trình duyệt máy mình cũng sẽ treo :D.

Do đó, chúng ta nên clean up dữ liệu ngay tại **beforeDestroy() hook**. Đoạn code trên mình sửa lại:
```html
<template>
	<div id="root" class="pull-right">
	  <test-component v-if="show"></test-component>
	  <button class="btn btn-default" @click="show = !show">Action</button>

	</div>
</template>

<script>
	import Vue from 'vue'

	Vue.component('test-component', {
		template: '<div>VueJS {{ content }}</div>',
		data() {
		    return {
		    	content : 'ITMagical',
		    	interval : ''
		    }
	  	},
	  	beforeDestroy() {
	  		this.content = null
	  		delete this.content
	  		clearInterval(this.interval)
	  		console.log('beforeDestroy')
	  	},
	  	destroyed() {	  		
	  		console.log('destroyed && content = ' + this.content)
	  	},
	  	created() {
	  		this.interval = setInterval(() => {
	  			console.log('not removed')
	  		},1000)
	  	}
	})

	export default {
		data() {
			return {
		      	show : true
		    }
		}
	}
</script>
```
Và kết quả:
<br>
![](https://images.viblo.asia/c2ea2cda-784b-4b3f-a76c-e7ad29d15253.png)
<br>
![](https://images.viblo.asia/9228af40-0ff4-4d79-918c-6d098ee0fe09.png)
<br>
# Kết luận
Bài này em đã giới thiệu cho các bác về Vòng đời của Vue (Lifecycle), các hook thường sử dụng và các ví dụ minh hoạ. Mong rằng sẽ hữu ích cho các bác.
# Tài liệu tham khảo
https://css-tricks.com/intro-to-vue-3-vue-cli-lifecycle-hooks/
<br>
http://itmagical.com/vuejs/tim-hieu-vong-doi-cua-vuejs-vuejs-lifecycle-hooks.html