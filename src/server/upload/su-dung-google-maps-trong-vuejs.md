**Google Maps** có ra bộ API mạnh mẽ để xây dựng và tương tác với bản đồ, trực quan hóa dữ liệu vị trí và tìm kiếm thông tự động, 

Mặc dù nhìn thì nó có vẻ hoành tráng và rất phức tạp, nhưng thực sự thì nó rất đơn giản để chúng ta có thể làm việc nó.

## Installation

Trong bài này mình sẽ sử dụng thư viện **vue2-google-maps ** 

```
npm install vue2-google-maps --save
```

## Lấy API Key


Trong tài liệu API Javascript của Maps bạn chỉ cần nhấp vào [Get API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) và làm theo hướng dẫn.

## Thêm vue2-google-maps vào Vue

Import `vue2-google-maps` vào main.js và `instantiate` plugin sử dụng API key lấy ở trên.

```js
main.js
===========================

import Vue from "vue";
import App from "./App";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "NHAP-API-KEY-O-DAY",
    libraries: "places"
  }
});

new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});

```

## Map Search Component

Tạo 1 component mới là GoogleMap.vue có nội dung như sau:


```html
components/GoogleMap.vue
================================

<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
        //mặc định là Montreal
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // nhận địa điểm thông qua autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>
```

Và bây giờ mình sẽ giải thích 1 chút về hoạt động của nó:

Chúng ta khởi tạo 1 **gmap-autocomplete** and 1 **gmap-map**. Lúc đầu, Map sẽ tạo **Center** là Montreal và sau đó khi chạy tới method **mounted()** nó sẽ gọi geolocate và thay đổi lại **center**

Khi một user search và chọn 1 option của autocomplete dropdown thì lúc đó  `gmap-autocomplete` gọi `setPlace()`, sau đó sẽ được lưu lại currentPlace. Khi click vào button `Add` nó sẽ gọi `addMarker` nơi lưu trữ vị trí đánh dấu trong các địa điểm đã được đánh dấu và sẽ trigger vào  ` gmap-map` để cập nhật. Và đồng thời cũng cập nhật trung tâm đến vị trí của điểm đánh dấu cuối cùng. 

Ngoài ra, nó còn lưu trữ từng địa điểm đầy đủ vị trí trong thuộc tính `places`

Điều này sẽ cho phép mọi dữ liệu bổ sung được trả về từ autocomplete query được sử dụng trong **component** này hoặc bất kỳ component con nào, khi cần.

## Thêm vào App.vue

Cuối cùng thì chỉ cần add `GoogleMap` component  của bạn vào `App.vue` như sau:

```html
App.vue
========================

<template>
  <div id="app">
    <google-map />
  </div>
</template>

<script>
import GoogleMap from "./components/GoogleMap";

export default {
  name: "App",
  components: {
    GoogleMap
  }
};
</script>
```

Và sau khi hoàn thành tất tần tật các bước trên thì chắc chắn app của bạn khi chạy sẽ hiện như thế này:

![](https://images.viblo.asia/4bbb9f05-27aa-4ad9-a3b7-2006253d88cd.png)

👉 Và đây chính là thế giới của bạn. Chúc bạn thành công nhé.