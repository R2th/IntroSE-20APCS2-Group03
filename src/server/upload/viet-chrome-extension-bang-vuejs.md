Ban đầu mình tính làm một series về chủ đề này nhưng sau đó tìm ra được tut này hướng dẫn rất hay từ những điều cơ bản nhất, các bạn có thể xem ở [đây](https://www.youtube.com/watch?v=hkOTAmmuv_4&list=PLRqwX-V7Uu6bL9VOMT65ahNEri9uqLWfS) để hiểu hơn các định nghĩa cơ bản của extension, sự kiện, hành động,.... Do đó ở bài này mình sẽ tập trung luôn vào cách viết extension bằng VueJS. (Ban đầu lỡ thêm bài này vào series giờ không sao bỏ ra được :-D, nhỡ các bạn có hỏi sao series có mỗi 1 bài :-D).

Sau mấy ngày tìm hiểu về Chrome extension sau đó ngồi tìm hướng dẫn cách viết extension mới bằng VueJS nhưng không có kết quả nào có mà sau khi làm theo có thể chạy được mình đã ngồi lọ mọ tự tìm hiểu, và sau hơn nửa ngày ngồi lọ mọ xem code extension của Viblo trên github (cũng viết bằng VueJS) mình cũng hiểu được vấn đề xảy ra ở đâu và hôm nay mình làm tut này cho những anh em muốn làm extension bằng VueJS nhé.

Bắt tay vào làm thôi nào 8-)
# Cài đặt
Đầu tiên nếu bạn chưa cài `vue-cli` thì ta mở terminal tại bất kì đâu và chạy câu lệnh sau:
```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```
Tiếp theo ta chọn nơi sẽ tạo project, mở terminal và chạy command:
```
vue init webpack my-extension
```
Cứ `yes` liên tục nhưng đến đoạn install `vue-router` thì chọn `no` nhé mọi người vì hiện tại ta chưa thể dùng `vue-router` trong extension, sau đó đến phần hỏi có cài đặt `eslint` hay test gì gì thì chọn `no` nhé các bạn.

Sau đó ta mở lại terminal ở `my-extension` và chạy `npm start` và mở project ở trình duyệt test thử, nếu màn hình hiện như bên dưới là ok rồi đó :-D:
![Vue_CLI](https://images.viblo.asia/793ff61e-0eae-49b6-96c7-28a944dd7577.png)
# Tạo extension
Sau bước cài đặt ở trên các bạn hãy chạy `npm run build` để build project VueJS, các bạn có thể thấy ta đã có thư mục mới là `dist` trong đó chưa code sau khi build, và đó chính là phần ta cần dùng để nói với Chrome rằng hãy load phần này lên như một extension, nhưng nếu các bạn đưa ngay vào Chrome extension sẽ chưa thể chạy được đâu nhé. Ta phải thiết lập trước một số bước sau nhé
### Tạo manifest file
Trước hết ta cần một file tên là `manifest.json` đây là file bắt buộc cần phải có, nó giống như một file cấu hình cho extension của bạn vậy. 

Mục đích của mình là sau khi ta build project VueJS sẽ copy hoặc generate luôn ra file `manifest.json` ở trong thư mục `dist` luôn. Để làm điều đó ta tạo mới thư mục `template`, và tạo file tên là `manifest.template.json`, mỗi lần build ta sẽ copy file manifest này vào thư mục dist luôn:
`manifest.json`
```json
{
  "name": "My first extension",
  "short_name": "Extension VueJS",
  "description": "This is my first extension written in VueJS",
  "version": "0.0.1",
  "manifest_version": 2,
  "icons": {
    "16": "images/icon-16.png",
    "128": "images/icon-128.png"
  },
  "browser_action": {
    "default_icon": {
      "19": "images/icon-19.png",
      "38": "images/icon-38.png"
    },
    "default_title": "Hello this is my extension",
    "default_popup": "index.html"
  },
  "omnibox": {
        "keyword": "hello"
    },
  "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
  "permissions": [
    "bookmarks",
    "clipboardRead",
    "clipboardWrite",
    "commands",
    "contentSettings",
    "contextMenus",
    "cookies",
    "debugger",
    "declarativeContent",
    "history",
    "management",
    "notifications",
    "pageCapture",
    "proxy",
    "tabCapture",
    "tabs",
    "topSites",
    "webNavigation",
    "webRequest",
    "webRequestBlocking",
    "<all_urls>"
  ]
}
```
Giải thích một chút: hầu hết phần đầu của file `manifest` các bạn đọc sẽ hiểu (có gì thì comment cho mình nhé), mình sẽ giải thích một số chỗ có thể khó hiểu nhé:
* Trường `browser_action`: trong đó mình định nghĩa icon mặc định cho extension, 16px là khi hiển thị trên thanh bar trình duyệt, 128px là hiển thị ở trong trang extension của chrome  (các bạn có thể xem ở ảnh dưới cách mở extension trên Chrome), bên cạnh đó mình có `default_title` là title lúc bạn hover vào icon extension trên thanh bar trình duyệt, `default_popup` là trang UI mà chúng ta muốn load lên (là nơi VueJS, điều kì diệu được hình thành :-D)
![Chrome_extension](https://images.viblo.asia/d67acec2-2b86-46f1-8f3b-2e10d340f8ca.png)
* `omnibox`: cái này khá là hay, trường này để thiết lập khi chúng ta gõ vào thanh tìm kiếm một từ khoá thì mặc định nó sẽ được trở thành từ khoá mặc định (lát nữa các bạn sẽ thấy điều kì diệu đó :-D)
* `content_security_policy`: đây là một trong những điều quan trọng nhất để chạy được ứng dụng VueJS như một extension (vì thiếu dòng này mà mình mất gần 1 ngày không thể chạy được app :) ). vì build project VueJS theo cách này thì sau khi build VueJS sử dụng một số hàm `eval` bị chặn bởi extension nên ta cần trường này để mở chặn.
* `permissions`: trường này giống như kiểu chúng ta xin quyền từ trình duyệtduyệt: quyền truy cập lịch sử, cookie,...(mình liệt kê nhiều thế chứ dùng không hết đâu :), tuỳ các bạn có thể sáng tác và dùng đến sau này)
### Extension icon
Ở phần trên mình có nói tới icon của extension mà không thấy icon ở chỗ nào. các bạn tải về bộ icon của mình ở [đây](https://drive.google.com/drive/folders/11aLWR-g-3EC_VbgU80fJ4js7h_T4hfV2?usp=sharing). Sau đó các bạn copy thư mục `images` vào folder `template` nhé.
### Config
Sau đó để copy toàn bộ thư mục `template` vào thư mục `dist` sau khi build project ta mở `build/webpack.prod.conf.js`, tìm dòng có `new CopyWebpackPlugin` và sửa lại nội dung như sau:
```js
new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, '../static'),
    to: config.build.assetsSubDirectory,
    ignore: ['.*']
  },
  {
    from: path.resolve(__dirname, '../template/manifest.template.json'),
    to: path.resolve(__dirname, '../dist/manifest.json'),
  },
  {
    from: path.resolve(__dirname, '../template/images'),
    to: path.resolve(__dirname, '../dist/images'),
  }
])
```
Code bên trên đơn giản là copy các file trong `template` vào `dist` sau khi được build.
# Test thôi nào ^^
Vậy là các bước setup đã thành công, bây giờ ta chạy lại `npm run build` một lần nữa, các bạn có thể thấy trong folder `dist` đã có file `manifest.json` và folder `images`.

Sau đó để chạy project này như một extension ta làm như sau. Mở Chrome extension như hình dưới:
![Chrome_extension_open](https://images.viblo.asia/d67acec2-2b86-46f1-8f3b-2e10d340f8ca.png)
Sau đó kéo thả folder `dist` vào là xong, sau đó các bạn có thể thấy ở thanh bar trình duyệt đã có extension của chúng ta YEAHHHHHH :-D.
![](https://images.viblo.asia/1ce8910a-db39-409f-aea7-ddb25fdb2d4e.png)

Ta cùng xem qua chút nhé. Đầu tiên các bạn thử hover vào sẽ thấy dòng text ta định nghĩa ở `default_title` trong `manifest.json`. Click vào sẽ thấy trang VueJS hiện lên (tuyệt vời <3 ). Tiếp theo như bên trình mình có nói tới trường `omnibox` bây giờ các bạn thử gõ vào thanh URL từ khoá `hello` và bấm phím `space` các bạn có thể thấy xuất hiện từ khoá mặc định (chính là trường `short_name`)
# Gọi API
Xem đến đây các bạn có thể có thắc mắc thế có thể gọi được API như bình thường không? Thì câu trả lời là có nhé :-D, việc viết extension bằng VueJS cũng không khác lắm so với viết ứng dụng web như bình thường. 

Sau đây ta thử gọi API trong và xuất kết quả ra extension xem sao nhé. Đầu tiên ta cần cài đặt `axios` (hoặc các bạn có thể sử dụng `vue-resource` đều ok nhé).
```bash
npm install axios --save
```
Sau đó ta khai báo axios global ở trong file `src/main.js` như sau:
```js
import Vue from 'vue'
import App from './App'

window.axios = require('axios');

axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```
Sau đó ta tạo một file `Cat.vue` ở trong folder `components` với nội dung như sau:
```html
<template>
	<div class="cat-images">
		<div class="title">
			<h2>WELCOME TO CAT WORLD</h2>
		</div>
		<swiper :options="swiperOption">
		    <swiper-slide v-for="(cat, index) in cats" :key="index">
		    	<img :src="cat.url[0]">
		    </swiper-slide>
		    <div class="swiper-pagination" slot="pagination"></div>
		    <div class="swiper-button-prev" slot="button-prev"></div>
	        <div class="swiper-button-next" slot="button-next"></div>
		</swiper>
	</div>
</template>

<script>
	var parseString = require('xml2js').parseString;
	export default {
		data() {
			return {
				cats: [],
				swiperOption: {
			        pagination: {
			            el: '.swiper-pagination'
			        },
			        navigation: {
				        nextEl: '.swiper-button-next',
				        prevEl: '.swiper-button-prev',
				    },
			    }
			}
		},
		mounted() {
			this.getCatImages()
		},
		methods: {
			getCatImages() {
				axios.get('http://thecatapi.com/api/images/get?format=xml&results_per_page=20&type=gif')
				.then(response => {
					let self = this
					parseString(response.data, function (err, result) {
						self.cats = result.response.data[0].images[0].image
				    }); 
				})
				.catch(error => {
					console.log(error)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.title {
	text-align: center;
}
</style>
```
Ở đoạn code trên đơn giản là mình gọi API lấy ảnh mèo về sau đó đưa vào xuất ra màn hình, và mình có dùng thêm hiệu ứng swiper và dữ liệu lấy về phải chuyển từ xml sang json nên ta cần cài đặt một số gói, các bạn chạy 1 lệnh sau là được:

À và các bạn chú ý là project mặc định ban đầu chưa có sass loader nên nếu các bạn viết thẻ `style` bên trên sử dụng `lang="scss"` sẽ báo lỗi nhé mà ta cần phải cài `sass-loader` và `node-sass`
```bash
npm install --save vue-awesome-swiper swiper xml2js sass-loader node-sass
```
Sau đó ta quay lại file `App.vue` và thêm component Cat vào như sau:
```html
<template>
    <div id="app">
        <Cat></Cat>
    </div>
</template>

<script>
import Cat from './components/Cat'

export default {
    components: {
        Cat
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
Cuối cùng là quay lại `main.js` để khai báo component `VueAwesomeSwiper`:
```js
import Vue from 'vue'
import App from './App'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

window.axios = require('axios');

axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```
Ổn rồi đó các bạn :-D. Chạy lại `npm run build`, sau đó quay lại tab Extension của Chrome click Refresh(biểu tượng mũi tên xoay tròn nhé). Cuối cùng là click lại vào extension của chúng ta trên thanh bar trình duyệt và xem nàooooo 8-):
![](https://images.viblo.asia/1f099bc7-5634-4818-906b-e7d731efa354.png)
# Kết luận và lưu ý
Vậy là qua bài này các bạn đã biết thêm một cách có thể tạo Chrome Extension bằng VueJS, nói chung các bạn có thể thấy việc phát triển không khác lắm so với ứng dụng web bình thường, từ đó thoả sức sáng tạo, và đưa lên trình duyệt để có thể nhìn thấy đứa con tinh thần của mình hằng ngày :-D, hoặc có thể đẩy lên store cho người khác sử dụng(nhưng phải đăng kí developer account nhé :)).

Nhưng mình có một lưu ý quan trọng như sau:
* extension sẽ chặn không cho các bạn import  css, js bằng tag mà `src` là từ external ví dụ như `cdn` mà chỉ chấp nhận resource ở local, nếu vẫn muốn sử dụng thì các bạn hãy down các resource đó về sau đó import vào. Nhưng theo mình cách tốt nhất nếu muốn sử dụng thư viện nào ta hãy sử dụng npm nhé.
* Khi các bạn gọi API ở server local (kiểu `http://localhost:8000/users`) sẽ bị block xuất hiện lỗi `Access-Control-Allow-Origin` nhé.
 
Toàn bộ code các bạn có thể xem ở [đây](https://github.com/maitrungduc1410/my-extension). Nếu có thắc mắc ở đâu các bạn comment bên dưới cho mình nhé. Cám ơn các bạn đã theo dõi^^!