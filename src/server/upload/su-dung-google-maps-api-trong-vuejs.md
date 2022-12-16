# Giới thiệu
Dạo gần đây mình có phải làm việc một chút với google map nhưng lại là trong vue. Và nếu tìm hiểu về google map thì các bạn cũng có biết để tích hợp google map vào trang web của mình thì sẽ phải chèn một đường link script của google vào, tuy nhiên nếu bạn làm việc với SPA (ở đây mình nói đến Laravel + Vue) thì bạn cũng biết sẽ chỉ có một trang blade chính từ đó mà render các page Vue. Để nhanh thì bạn cũng có thể chèn thằng vào trang đó, nhưng rõ ràng đó không phải là một cách hay rồi. Sau đó thì mình đã có tìm hiểu nhiều hơn và tìm ra được cách thức để sử dụng google map trong Vue hữu dụng hơn rất nhiều. Cùng xem ở dưới đây nhé.

À bài viết này sẽ chỉ hướng dẫn cách tích hợp google map vào vue mà không hướng dẫn cách config google map từ console đâu nhé. Nghĩa là bài viết này sẽ đi từ việc bạn đã có một chiếc api key của google map rồi.
# vue2-google-maps Plugin
Nếu bạn search google với từ khóa "`using google map in vuejs`" thì chắc chắn trong những kết quả đầu tiên bạn sẽ nhìn thấy tên cái plugin.

Việc lựa chọn cách này có một ưu điểm là nhanh, tiện. Bạn chỉ cần chạy lệnh cài đặt và với vài dòng code cơ bản là đã tích hợp xong, sẵn sàng để sử dụng.

> https://github.com/xkjyeah/vue-google-maps

Và theo như tài liệu của nó thì việc đầu tiên mình phải làm là sử dụng câu lệnh để cài đặt nó vào project của mình

> npm install vue2-google-maps

Tiếp theo là bạn sẽ tạo ra một file js để khai báo với thằng vue là mình sẽ sử dụng đến cái plugin này, ở đây có hai hướng, nếu bạn muốn ở đâu cũng có thể gọi đến component vue và không phải khai báo lại thì bạn sẽ khai báo ngay trong file js dùng để render vue vào blade laravel. Đại loại thì là cái file js có đoạn code này nè
```
const app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {App}
});
```

Rồi còn nếu bạn không có nhu cầu sử dụng map ở nhiều nơi mà chỉ trong một vài page thì khuyến khích bạn nên tách nó ra một file js riêng trong thư mục đặt những cái dùng chung để có thể gọi lại (thường là `utils`). Mình tạm đặt tên nó là `utils/gmaps.js` đi. Và ở page mà mình muốn sử dụng bạn chỉ cần
gọi
```
import 'utils/gmaps.js';
```
là xong. Lưu ý về đường dẫn bạn gọi đến thư mục utils này phải chính xác nhé.

Nội dung của phần khai báo sẽ như sau.

```
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_API_TOKEN',
  },
  installComponents: true
})
```

Và việc thiết lập chỉ cần như vậy là xong, Từ đây bạn có thể khởi tạo map của mình bằng cách sử dụng component trong template của vue rồi

```
<GmapMap
  :center="{lat:10, lng:10}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>

```

Tuy nhiên thì bên cạnh cái lợi là nhanh ra thì cách này lại có một chút nhược điểm. Trong quá trình sử dụng thì mới đầu mình thấy à làm như vậy là ổn rồi tuy nhiên nhu cầu sử dụng của mình lại bắt đầu lớn hơn. Mình cần dùng thêm một số service của google chẳng hạn. Ở doc thì mô tả đơn giản như sau
```
<template>
  <GmapMarker ref="myMarker"
    :position="google && new google.maps.LatLng(1.38, 103.8)" />
</template>
<script>
import {gmapApi} from 'vue2-google-maps'

export default {
  computed: {
    google: gmapApi
  }
}
</script>
```
Tuy nhiên mình làm theo thì vẫn loay hoay mãi toàn bị báo là cái giá trị của thằng google là null / undefine đơn giản vì js là bất đồng bộ mà, cái thằng google nó chưa kịp load thì cái chỗ mình cần dùng đã chạy rồi, và sau một thời gian miệt mài tìm tìm tìm thì có một cách tạm để khắc phục đó là dùng đến  cách gọi `this.$gmapApiPromiseLazy().then(//... your code here)` để chắc chắc rằng thằng google của bạn đã load xong. (https://github.com/xkjyeah/vue-google-maps/wiki/vue-google-maps-FAQ#where-is-my-google)

Đấy là một điều hơi phiền mà mình cảm nhận được, và bên cạnh đó thì chắc chắc thằng này có những nhược điểm của một plugin như yêu cầu khi bạn sử dụng nó lớn hơn cái mà plugin này cung cấp được. Rõ ràng nếu bạn cần đến một thứ mà google service đã cung cấp nhưng mà plugin này chưa phát triển đến thì chẳng nhẽ bạn sẽ phải bỏ ngỏ đợi đến lúc nhà phát triển này phát triển đến phần bạn cấn sao, mà còn không biết đợi đến bao giờ.

May mắn cho mình là sau một thời gian tìm kiếm miệt mài trên google thì mình đã tìm được một cách khá hay để sử dụng map trong vue. Mình xin chia sẻ lại ở dưới.
# Loading Google Maps API
> Tài liệu tham khảo: https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/

Theo như mình hiểu được thì việc tích hợp này cơ bản sẽ dựa vào việc bạn tạo element script và nối vào header của trang. Có thể bạn sẽ thắc mắc ơ mình đã nói ngay từ đầu là việc đưa script vào cái blade là không hay giờ lại muốn đưa vào là sao. Cái việc đưa vào kia là tất cả các trang mình đều sẽ load còn cái này thì mình sẽ viết ra một hàm trong file js riêng. Chỗ nào cần đến thì mình mới khai báo để append vào thôi.

Cùng bắt tay vào làm thử nhé.

Mình cũng sẽ tạo một folder `utils` với file gmaps tương tự như cách trên với nội dung như sau:
```utils/gmaps.js
const API_KEY = 'YOUR_API_KEY';
const CALLBACK_NAME = 'gmapsCallback';

let initialized = !!window.google;
let resolveInitPromise;
let rejectInitPromise;
/**
 * Promise xử lý quá trình khởi tạo
 * trạng thái của google maps script.
 */
const initPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve;
  rejectInitPromise = reject;
});

export default function init() {
  /**
   * Nếu Google Maps đã được khởi tạo trước đó
   * return promise
   */
  if (initialized) return initPromise;

  initialized = true;
  
  /**
   * Hàm call back được gọi khi google được load thành công
   * Ở đây nó sẽ thực hiện resolve ra biến window.google chính là google object
   * được dùng để khởi tạo google map, google service như trong document của google.
    */
  window[CALLBACK_NAME] = () => resolveInitPromise(window.google);

  /**
    * Tạo một element là script với src là đường dẫn để gọi google map
    * và chèn nó vào head của page
    * nếu có lỗi xảy ra sẽ reject promise để khi gọi để những chỗ gọi đến nó có thể catch được.
    */
     
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`;
  script.onerror = rejectInitPromise;
  document.querySelector('head').appendChild(script);

  // return promise để chỗ gọi biết được rằng đã được xử lý xong.
  return initPromise;
}
```

Chắc đọc xong đống comment code ở trên thì bạn cũng sẽ hiểu được hết hoặc phần nào về ý tưởng sử dụng google map trong vue.  
Như vậy bây giờ với những chỗ cần dùng google map thì mình chỉ cần `await` cái function init này để lấy được đối tượng google object và sử dụng thôi.

Thử nhé:
```
<template>
  <div class="App"/>
</template>

<script>
import gmapsInit from './utils/gmaps';

export default {
  name: 'App',
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);

      geocoder.geocode({ address: 'VietNam' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.App {
  width: 100vw;
  height: 100vh;
}
</style>
```

Đoạn code trên ví dụ về việc sử dụng `Geocoder` để chuyển đổi địa chỉ từ dạng string sang dạng tọa độ và từ đó khởi tạo một cái map cơ bản.

Rồi bây giờ với việc khởi tạo được đối tượng google: google object thì bạn có thể sử dụng google map trong vue như trong documentation của google rồi. Bạn thỏa sức làm mà không sợ bị giới hạn nữa, chỉ cần google cũng cấp là được :p.

Chúc bạn thành công!