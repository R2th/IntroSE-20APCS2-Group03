Hề lô anh em , hôm nay mình sẽ chỉ cho anh em làm thế nào để tích hợp Google Map vào trogn project Vue của chúng ta nhé.

Ứng dụng nhỏ này của chúng ta sẽ có thêm chức năng tìm kiếm đơn giản và đánh dấu vị trí trên bản đồ. Để thúc hiện việc này thì mình sử dụng package vue2-google-maps package

Và đây là các bước mà chúng ta sắp làm :

* **Bước 1**: Cài đặt Vue Project
* **Bước 2**: Cài đặt Vue2 Google Maps 
* **Bước 3**: Lấy Google Maps API Key
* **Bước 4**: Đăng kí Vue Google Maps Module
* **Bước 5**: Tạo Vue Component
* **Bước 6**: Show Google Map
* **Bước 7**: Chạy App

Bắt đầu thôiiii !!!

# Cài đặt Vue Project
Chúng ta chạy câu lệnh sau :

```javascript
npm install -g @vue/cli
```

Tiếp tục chạy để tạo ra một app Vue mới :

```javascript
vue create vue-demo-app
```

Sau đó là cd vào project nào :

```javascript
cd vue-demo-app
```

# Cài đặt Vue2 Google Maps 

Tiếp theo chúng ta tiến hành cài đặt package Vue2 Google Maps :

```javascript
npm install vue2-google-maps
```

# Lấy Google Maps API Key
Okk , bước tiếp theo chúng ta cần phải làm là lấy API key :

* Mọi người vô đây [Google Cloud Platform](https://console.cloud.google.com/getting-started?pli=1).
* Tiếp theo đó chúng ta tạo một project mới bằng cách click vô phần **select a project**, rồi **NEW PROJECT**.
* Hãy chắc chắn rằng mọi người đã click vô **APIs & Services > Credentials** ở phần bên trái của menu.
* Sau đó, click vào **Create Credentials** và chọn **API Key** .
* Copy lại API key mà chúng ta vừa nhận được trên màn hình.
* Sau đó  click vô **Credentals**, chọn  **Enable APIs and Services** , enable cả services **Maps JavaScript API** và **Places API** nữa nhé . 

# Đăng kí Vue Google Maps Module
Chúng ta cần import "vue2-google-maps" module và đưa vào trong method use(). Điều này cho phép chúng ta truy cập vào các methods và properties trong Vue template.

```javascript
import Vue from 'vue'
import App from './App.vue'

import * as VueGoogleMaps from "vue2-google-maps" // Import package

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "GOOGLE MAP API KEY GOES HERE",
    libraries: "places"
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
```

# Tạo Vue Component

Tạo một component theo đường dẫn sau nào **src/components/AddGoogleMap.vue** :

```javascript
<template>
  <div>
    <div>
      <h2>Vue Js Search and Add Marker</h2>

      <label>
        <gmap-autocomplete @place_changed="initMarker"></gmap-autocomplete>

        <button @click="addLocationMarker">Add</button>
      </label>
      <br/>
 
    </div>
    <br>
    <gmap-map
        :zoom="14"    
        :center="center"
        style="width:100%;  height: 600px;"
      >
      <gmap-marker
        :key="index"
        v-for="(m, index) in locationMarkers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>
 
<script>
export default {
  name: "AddGoogleMap",
  data() {
    return {
      center: { 
        lat: 39.7837304,
        lng: -100.4458825
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null
    };
  },
 
  mounted() {
    this.locateGeoLocation();
  },
 
  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
      });
    }
  }
};
</script>
```

Thằng **gmap-autocomplete** sẽ autocomplete hiển thị tìm kiếm vị trí, cho phép chúng ta tìm kiếm vị trí và đánh dấu. **gmap-map** sẽ hiển thị bản đồ.

# Show Google Map
Okk giờ chúng ta import component vào nào :

```javascript
<template>
   <div id="app">
      <AddGoogleMap />
   </div>
</template>
 
<script>
import AddGoogleMap from "./components/AddGoogleMap";
 
export default {
  name: 'App',
  components: {
    AddGoogleMap
  }
}
</script>
 
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscaleChạy App;
  text-align: center;
  color: #000000;
  margin-top: 50px;
}
</style>
```
# Chạy App
Giờ việc cuối cùng cần làm là chạy App và hưởng thụ thành quả thôi :

```javascript
npm run serve
```

thông thường thì nó sẽ chạy trên đường dẫn :

```javascript
http://localhost:8080
```
## 
## Kết bài

Vậy là bài tìm hiểu của chúng ta đến đây là kết thúc rồi, anh em hãy thử vọc theo nhé.

Nếu thấy giúp ích cho mình , hãy **like**, **share** và **upvote** cho mình nhé.

Many thanksss