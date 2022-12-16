# Xây dựng các component
## Api Endpoint.
Trong phần trước, mình đã hướng dẫn các bạn mô hinh của một ứng dụng Vue cơ bản với vuex. Để có thể nhận thông tin về thời tiết, ta cần một nguồn cung cấp dữ liệu xịn từ các endpoint api. Hiện tại mình đang sử dụng các api có sẵn của openweathermap, nhưng chúng ta có thể sử dụng bất kì api khác mà bạn cảm thấy phù hợp với úng dựng của mình. Để có thể sử dụng Openweather Api, chúng ta truy cập theo đường link như sau và hãy tạo cho mình một tài khoản.
>https://openweathermap.org/api
>

Lập xong tài khoản, ta có thể tạo một key tương ứng. Mình cần key để gửi theo url mới có thể nhận dữ liệu từ Openweather. 

Ta có thể truy cập truy cập vào api với key tướng ứng để kiếm tra xem key của chúng ta đã được chưa 
>http://api.openweathermap.org/data/2.5/weather?q={tên thành phố cần kiểm tra}&appid={key của bạn}

Ta sẽ nhận được dữ liệu như sau:
![](https://images.viblo.asia/f190d8e4-8002-4fe1-bf38-060e07cd1bcd.png)

Rất khó nhìn phải không, do đó mình khuyên các bạn nên cài thêm extension để có thể hiện thị json một cách clean nhất. Với Chrome bạn có thể tải [JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) còn Firefox thì không cần do đã được tích hợp sẵn vào trình duyệt. Sau khi format ta được dữ liệu như sau: 

![](https://images.viblo.asia/67be767f-bef5-44e2-a107-7b1041b6b112.png)

Dễ nhìn hơn hẳn phải không. Nào chúng ta cùng bắt tay tạo các component để hiển thị dữ liệu này.


## Main Component

Đây là nơi sẽ hiển thị các Weather Card của các thành phố mà người dùng chọn. Từ đây người dùng có thể bấm vào các Weather Card này để chi tiết thông tin thời tiết thành phố đó hoặc mở sang trang thêm thành phố mà mình sẽ nói ở phần sau.

Đầu tiên là chúng ta tạo component.

```html
<template>
    <div class="container_wrap">
        <add-weather-card/>
    </div>
</template>

<script>
import AddWeatherCard from "@/components/AddWeatherCard";
export default {
  components: {
    AddWeatherCard
  }
};
</script>

<style>
.weather__card {
  float: left;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.1);
  justify-items: center;
  padding: 1rem;
  margin: 2rem;
  width: 18rem;
  height: 30rem;
  cursor: pointer;
  background-color: white;
  border-radius: 1.75rem;
  animation: 1.25s ease-in-out 0ms 1 fadein;
}
</style>

```

## WeatherCard Component
Trước tiên ta tạo một Weather Card có tác dụng thêm thành phố vào danh sách.
```html
<template>
    <router-link tag="section" to='/addcity' class="weather__card">
        <div class="add_section__button">
            <button  class="button__add">
                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                </svg>
            </button>
        </div>
        <div class="add_section__text">
            Add city
        </div>
    </router-link>
</template>

<style scope>
.add_section__button {
  margin-top: 100px;
}
.button__add {
  height: 100px;
  width: 100px;
  border: 3px solid transparent;
  border-radius: 50%;
  background-color: transparent;
  color: var(--dark-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  transition: transform 300ms ease-out, border-color 300ms ease-out;
}
.button__add svg {
  height: 100%;
  width: 100%;
  fill: var(--accent-color);
  transition: fill 300ms ease-out;
}
</style>
```

Đến bước này, chúng ta cần đến Vue-route để định tuyến đến hiển thị các component. Để cài vue-route ta gõ câu lệnh sau:
```
npm install --save vue-router
```

Và cần khai báo với vue là ta sẽ sử dụng vue-route. Nhưng để giúp khai báo một cách minh bạch, mình khuyên các bạn nên tách việc khai báo vue-route ra một file khác rồi import vào main.js như mình đã làm với store. Điều này giúp ta có thể quản lý code tốt hơn.

Tạo một file theo đường dẫn như sau :
> src/router/index.js
> 
```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Main',
            component: Main
        },
    ]
})
```

Và trong file main.js ta sửa lại như sau:
```javascript
import Vue from "vue";
import App from "./App.vue";
import store from "./store/index.js";
import router from "./router";
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

```

Cuối cùng để hiển thị Main Component, ta vào App Component và sửa template như sau:
```html
<template>
  <div>
    <div :class="$style.container">
      <router-view/>
    </div>
    <sidebar/>
    <sidebar-toggle/>
  </div>
</template>
```
Và úm ba la xì bùa, ta đã nhận được thành quả như sau

![](https://images.viblo.asia/5217a689-105d-48dc-90ee-7c95e89ca1b0.png)

Bạn chắc đang thắc mắc, là tại sao Vue có thể hiểu để hiện thị được như vậy. Như cách thông thường thi khi ta muốn hiển thị 1 component thì ta khai báo components trong script và gọi tên component đó ở trong template.  **<router-view/>** có tác dụng tương tự vây nhưng cơ chế hơi khác một chút. Vue sẽ đọc đường dẫn trên URL, tìm xem ứng với URL này được khai báo component nào, nếu có Vue sẽ gọi đến component đó và hiển thị ra cho người dùng.

Bây giờ chúng ta tạo một một component nữa tên là WeatherCard để hiển thị thông tin thời tiết. 
```html
<template>
    <router-link tag="section" :to="`/detail/${city}`" class="weather__card">
        <span class="city-name__text">{{city}}</span>
        <div class="weather-icon__container">
            <div v-if="condition === 'Clouds' || condition ==='Haze'">
                <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPHBhdGggc3R5bGU9ImZpbGw6IzI2OUFGMjsiIGQ9Ik00MjkuMzgyLDQxMi41MTJjNDUuNjI5LDAsODIuNjE4LTM2Ljk5LDgyLjYxOC04Mi42MTljMC0zOS4xOTYtMjcuMzA1LTcxLjk5NC02My45MjUtODAuNDY4ICBjLTAuNzQ5LTgyLjkzNC02OC4yLTE0OS45MzctMTUxLjMxMS0xNDkuOTM3Yy01Ny4wNiwwLTEwNi43MzUsMzEuNTg1LTEzMi41MTgsNzguMjIxYy03Ljg0NS0zLjM5NS0xNi40OTItNS4yODUtMjUuNTgzLTUuMjg1ICBjLTMyLjc1LDAtNTkuNzc5LDI0LjQyMS02My45MTcsNTYuMDQyQzMyLjEzMSwyMzYuOTE2LDAsMjc0LjQ5OCwwLDMxOS41OTRjMCw1MS4zMTgsNDEuNjAxLDkyLjkxOCw5Mi45MTcsOTIuOTE4ICBDMTA3LjIxMSw0MTIuNTEyLDQxOS41ODksNDEyLjUxMiw0MjkuMzgyLDQxMi41MTJ6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
            </div>
            <div v-else-if="condition === 'Rain' || condition === 'Drizzle'">
                <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIuMDAxIDUxMi4wMDEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMi4wMDEgNTEyLjAwMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIHN0eWxlPSJmaWxsOiM2OENDRUE7IiBkPSJNMjg2LjQzNCwyMjEuNzZjLTAuMDM5LTAuMTA1LTAuMDg0LTAuMjA1LTAuMTM1LTAuMzA0TDE3Mi4xNzIsMS40ODYgIEMxNzEuNjk4LDAuNTc0LDE3MC43NTcsMCwxNjkuNzI4LDBzLTEuOTcsMC41NzQtMi40NDQsMS40ODZMNTMuMTU3LDIyMS40NTZjLTAuMDUyLDAuMDk5LTAuMDk3LDAuMi0wLjEzNSwwLjMwNCAgYy0xMi4wMjgsMzIuMjA1LTEwLjc5Nyw2Ny4xNjQsMy40NjksOTguNDM3YzE0LjI2NSwzMS4yNzUsMzkuODU3LDU1LjEyLDcyLjA2MSw2Ny4xNDZjMTMuMTksNC45MjYsMjcuMDE0LDcuNjQyLDQxLjA5Miw4LjA3ICBjMC4wMjgsMC4wMDEsMC4wNTYsMC4wMDEsMC4wODQsMC4wMDFzMC4wNTYsMCwwLjA4NC0wLjAwMWMxNC4wNzctMC40MywyNy45MDItMy4xNDUsNDEuMDktOC4wNyAgYzMyLjIwMy0xMi4wMjYsNTcuNzk2LTM1Ljg3Miw3Mi4wNjItNjcuMTQ2QzI5Ny4yMjksMjg4LjkyNCwyOTguNDYyLDI1My45NjUsMjg2LjQzNCwyMjEuNzZ6Ii8+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6IzVBQkNFMjsiIGQ9Ik0xNzguNTI4LDM3My4zNDRjLTI3LjM1Ny0yNi45NTgtNDIuNTc4LTYyLjk1OS00Mi44NjEtMTAxLjM3MSAgIGMtMC4wMDEtMC4xMjMsMC4wMDYtMC4yNDgsMC4wMjEtMC4zNzFMMTY2LjM2MSwzLjI2Nkw1My4xNTcsMjIxLjQ1NmMtMC4wNTIsMC4wOTktMC4wOTcsMC4yLTAuMTM1LDAuMzA0ICAgYy0xMi4wMjgsMzIuMjA1LTEwLjc5Nyw2Ny4xNjQsMy40NjksOTguNDM3YzE0LjI2NSwzMS4yNzUsMzkuODU3LDU1LjEyLDcyLjA2MSw2Ny4xNDZjMTMuMTksNC45MjYsMjcuMDE0LDcuNjQyLDQxLjA5Miw4LjA3ICAgYzAuMDI4LDAuMDAxLDAuMDU2LDAuMDAxLDAuMDg0LDAuMDAxczAuMDU2LDAsMC4wODQtMC4wMDFjMTAuMjYzLTAuMzEzLDIwLjM4OS0xLjg1NiwzMC4yMzUtNC41NyAgIEMxOTIuNDEyLDM4NS43NjUsMTg1LjIwNiwzNzkuOTIyLDE3OC41MjgsMzczLjM0NHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM1QUJDRTI7IiBkPSJNNDYzLjA4NCwyODAuNzhjLTAuMDM5LTAuMTA0LTAuMDg0LTAuMjA1LTAuMTM1LTAuMzA0bC01Ni4yNzMtMTA4LjQ2MSAgIGMtMC40NzQtMC45MTItMS40MTUtMS40ODYtMi40NDQtMS40ODZjLTEuMDI5LDAtMS45NywwLjU3My0yLjQ0NCwxLjQ4NmwtNTYuMjczLDEwOC40NjFjLTAuMDUyLDAuMDk5LTAuMDk3LDAuMi0wLjEzNSwwLjMwNCAgIGMtNi4wNjEsMTYuMjI4LTUuNDQsMzMuODQ0LDEuNzQ5LDQ5LjYwMmM3LjE4NywxNS43NTksMjAuMDgzLDI3Ljc3NSwzNi4zMTMsMzMuODM2YzYuNjQ2LDIuNDgxLDEzLjYxMywzLjg0OSwyMC43MDYsNC4wNjYgICBjMC4wMjgsMC4wMDEsMC4wNTYsMC4wMDEsMC4wODQsMC4wMDFzMC4wNTYsMCwwLjA4NC0wLjAwMWM3LjA5MS0wLjIxNywxNC4wNTgtMS41ODUsMjAuNzA1LTQuMDY2ICAgQzQ1OC41MTYsMzUxLjcwOSw0NzUuNTkyLDMxNC4yNzgsNDYzLjA4NCwyODAuNzh6Ii8+CjwvZz4KPHBhdGggc3R5bGU9ImZpbGw6IzY4Q0NFQTsiIGQ9Ik00NjMuMDg0LDI4MC43OGMtMC4wMzktMC4xMDQtMC4wODQtMC4yMDUtMC4xMzUtMC4zMDRsLTU2LjI3My0xMDguNDYxICBjLTAuNDc0LTAuOTEyLTEuNDE1LTEuNDg2LTIuNDQ0LTEuNDg2Yy0wLjAwNSwwLTAuMDExLDAuMDAyLTAuMDE3LDAuMDAybC0yMi4xNTIsMTI4LjgyMWMtMC4wMjEsMC4xMjEtMC4wMzQsMC4yNDMtMC4wMzksMC4zNjUgIGMtMC45MzgsMTkuMDY4LDUuNjA0LDM3LjM1NiwxOC40MjIsNTEuNDk5YzUuNDkyLDYuMDYsMTEuODYsMTEuMDM4LDE4Ljg0LDE0LjgzNmMxLjkzNC0wLjUyNCwzLjg0OC0xLjEyOCw1LjczNS0xLjgzMyAgQzQ1OC41MTYsMzUxLjcwOSw0NzUuNTkyLDMxNC4yNzgsNDYzLjA4NCwyODAuNzh6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM1QUJDRTI7IiBkPSJNMzUwLjkxLDQ1Mi4xNDVsLTM3LjQ5NS03Mi4yNzFjLTAuNDc0LTAuOTEyLTEuNDE1LTEuNDg2LTIuNDQ0LTEuNDg2ICBjLTEuMDI5LDAtMS45NywwLjU3NC0yLjQ0NCwxLjQ4NmwtMzcuNSw3Mi4yNzFjLTAuMDUyLDAuMDk5LTAuMDk3LDAuMjAyLTAuMTM1LDAuMzA1Yy04LjUxMSwyMi43OTYsMy4xMDgsNDguMjY4LDI1LjkwNCw1Ni43ODMgIGM0LjUyMywxLjY4Niw5LjI2NCwyLjYxOCwxNC4wOSwyLjc2N2MwLjAyOSwwLjAwMSwwLjA1NywwLjAwMSwwLjA4NSwwLjAwMXMwLjA1NiwwLDAuMDg1LTAuMDAxICBjNC44MjItMC4xNDksOS41NjItMS4wNzksMTQuMDg5LTIuNzY4YzIyLjc5NS04LjUxMywzNC40MTQtMzMuOTg2LDI1LjkwMS01Ni43ODNDMzUxLjAwNyw0NTIuMzQ0LDM1MC45NjEsNDUyLjI0MywzNTAuOTEsNDUyLjE0NXoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzY4Q0NFQTsiIGQ9Ik0zNTEuMDQ1LDQ1Mi40NDljLTAuMDM5LTAuMTA1LTAuMDg0LTAuMjA2LTAuMTM1LTAuMzA0bC0zNy40OTUtNzIuMjcxICBjLTAuNDc0LTAuOTEyLTEuNDE1LTEuNDg2LTIuNDQ0LTEuNDg2Yy0wLjI5MywwLTAuNTc0LDAuMDU3LTAuODQ0LDAuMTQ1bC0xNS4zOTQsOTAuNTY2Yy0wLjAyMiwwLjEyMi0wLjAzNCwwLjI0OS0wLjA0MSwwLjM3NCAgYy0wLjgwNiwxNy4xMzQsNy4xOCwzMi42ODIsMTkuOTcxLDQyLjI2OGMzLjU3Ni0wLjQwMyw3LjA5LTEuMjQzLDEwLjQ4Mi0yLjUwOEMzNDcuOTQsNTAwLjcxOCwzNTkuNTU5LDQ3NS4yNDUsMzUxLjA0NSw0NTIuNDQ5eiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
            </div>
            <div v-else-if="condition === 'Storm'">
                <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDM4NS4zNDQgMzg1LjM0NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzg1LjM0NCAzODUuMzQ0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojNTBEMUVGOyIgZD0iTTMwMy4yMDQsMTExLjA1NGM0NS4zNjUsMCw4Mi4xNCwzNi43NzUsODIuMTQsODIuMTRzLTM2Ljc3NSw4Mi4xNC04Mi4xNCw4Mi4xNGwwLDBINjQuMjQ0ICAgQzI4Ljc2NSwyNzUuMzM3LDAuMDAyLDI0Ni41NzgsMCwyMTEuMDk5czI4Ljc1Ny02NC4yNDIsNjQuMjM2LTY0LjI0NGMwLjAwMywwLDAuMDA2LDAsMC4wMDksMGMxLjQ2NywwLDIuOTIsMCw0LjM2LDAgICBjLTUuMzgtNTQuOTY2LDM0LjgxOC0xMDMuODg1LDg5Ljc4NC0xMDkuMjY1YzUxLjg5OS01LjA3OSw5OC45ODgsMzAuNTc0LDEwOC4xNzYsODEuOTA1ICAgQzI3Ny45NTcsMTEzLjg3NCwyOTAuNTAxLDExMC45ODUsMzAzLjIwNCwxMTEuMDU0TDMwMy4yMDQsMTExLjA1NHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM1MEQxRUY7IiBkPSJNMjE1LjUyNCwyODkuMjU0bDIwLjU2LDI5LjM2YzIuMjk4LDMuMzE0LDEuNDc0LDcuODYyLTEuODQsMTAuMTZzLTcuODYyLDEuNDc0LTEwLjE2LTEuODRsMCwwICAgbC0yNi40LTM3LjY4TDIxNS41MjQsMjg5LjI1NHogTTE2Ni44ODQsMjg5LjI1NGwzMy4yOCw0Ny41MmMyLjI5OCwzLjMxNCwxLjQ3NCw3Ljg2Mi0xLjg0LDEwLjE2cy03Ljg2MywxLjQ3NC0xMC4xNi0xLjg0bDAsMCAgIGwtMzkuMTItNTZMMTY2Ljg4NCwyODkuMjU0eiBNMTE4LjI0NCwyODkuMjU0bDIwLjU2LDI5LjM2YzIuMjk4LDMuMzE0LDEuNDc0LDcuODYyLTEuODQsMTAuMTZzLTcuODYzLDEuNDc0LTEwLjE2LTEuODRsMCwwICAgbC0yNi4xMi0zNy42OEwxMTguMjQ0LDI4OS4yNTR6IE0yNjQuMTY0LDI4OS4yNTRsMzMuMjgsNDcuNTJjMi4yOTgsMy4zMTQsMS40NzQsNy44NjItMS44NCwxMC4xNnMtNy44NjIsMS40NzQtMTAuMTYtMS44NGwwLDAgICBsLTEyLjc2LTE4LjE2bC0yNi40LTM3LjY4SDI2NC4xNjR6Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
            </div>
            <div v-else-if="condition === 'Sunny' || condition === 'Clear'">
                <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwMCA0MDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojRkZFRDAwOyIgZD0iTTEzMC40Niw2NS4wMmMyLjEyNiwzLjQxMiwxLjA4NCw3LjkwMi0yLjMyOSwxMC4wMjljLTMuNDEyLDIuMTI2LTcuOTAyLDEuMDg0LTEwLjAyOS0yLjMyOSAgYy0wLjA4NS0wLjEzNy0wLjE2Ni0wLjI3Ny0wLjI0Mi0wLjQyTDk3LjM0LDM2Ljc4Yy0yLjEyNi0zLjQxMi0xLjA4NC03LjkwMiwyLjMyOS0xMC4wMjljMy40MTItMi4xMjYsNy45MDItMS4wODQsMTAuMDI5LDIuMzI5ICBjMC4wODUsMC4xMzcsMC4xNjYsMC4yNzcsMC4yNDMsMC40MkwxMzAuNDYsNjUuMDJ6IE03Mi4zLDExNy44NmMzLjQxMiwyLjEyNiw0LjQ1NSw2LjYxNiwyLjMyOSwxMC4wMjkgIGMtMi4wMjcsMy4yNTMtNi4yMjgsNC4zNzctOS42MDksMi41NzFsLTM1LjU2LTIwLjUyYy0zLjQxMi0yLjEyNi00LjQ1NS02LjYxNi0yLjMyOS0xMC4wMjljMi4wMjctMy4yNTMsNi4yMjgtNC4zNzcsOS42MDktMi41NzEgIEw3Mi4zLDExNy44NnogTTQ4LjMsMTkyLjY2YzQuMDMyLDAsNy4zLDMuMjY4LDcuMyw3LjNzLTMuMjY4LDcuMy03LjMsNy4zaC00MWMtNC4wMzIsMC03LjMtMy4yNjgtNy4zLTcuMyAgYzAtNC4wMzIsMy4yNjgtNy4zLDcuMy03LjNsMCwwSDQ4LjN6IE02NC45OCwyNjkuNDZjMy40MTItMi4xMjYsNy45MDItMS4wODQsMTAuMDI5LDIuMzI5YzIuMTI2LDMuNDEyLDEuMDg0LDcuOTAyLTIuMzI5LDEwLjAyOSAgYy0wLjEzNywwLjA4NS0wLjI3NywwLjE2Ni0wLjQyLDAuMjQybC0zNS40OCwyMC41NmMtMy40MTIsMi4xMjYtNy45MDIsMS4wODQtMTAuMDI5LTIuMzI5Yy0yLjEyNi0zLjQxMi0xLjA4NC03LjkwMiwyLjMyOS0xMC4wMjkgIGMwLjEzNy0wLjA4NSwwLjI3Ny0wLjE2NiwwLjQyLTAuMjQzTDY0Ljk4LDI2OS40NnogTTExNy44NiwzMjcuNjZjMi4xMjYtMy40MTIsNi42MTYtNC40NTUsMTAuMDI5LTIuMzI5ICBjMy4yNTMsMi4wMjcsNC4zNzcsNi4yMjgsMi41NzEsOS42MDlsLTIwLjUyLDM1LjU2Yy0xLjg5NCwzLjU0Ni02LjMwNSw0Ljg4Ni05Ljg1MSwyLjk5MXMtNC44ODYtNi4zMDUtMi45OTEtOS44NTEgIGMwLjA3Ni0wLjE0MywwLjE1Ny0wLjI4MywwLjI0My0wLjQyTDExNy44NiwzMjcuNjZ6IE0xOTIuNjYsMzUxLjY2YzAtNC4wMzIsMy4yNjgtNy4zLDcuMy03LjNjNC4wMzIsMCw3LjMsMy4yNjgsNy4zLDcuM3Y0MS4wNCAgYzAsNC4wMzItMy4yNjgsNy4zLTcuMyw3LjNjLTQuMDMyLDAtNy4zLTMuMjY4LTcuMy03LjNWMzUxLjY2eiBNMjY5LjQ2LDMzNC45OGMtMS44OTQtMy41NDYtMC41NTUtNy45NTcsMi45OTEtOS44NTEgIGMzLjM4LTEuODA2LDcuNTgyLTAuNjgxLDkuNjA5LDIuNTcxbDIwLjUyLDM1LjU2YzIuMTI2LDMuNDEyLDEuMDg0LDcuOTAyLTIuMzI5LDEwLjAyOXMtNy45MDIsMS4wODQtMTAuMDI5LTIuMzI5ICBjLTAuMDg1LTAuMTM3LTAuMTY2LTAuMjc3LTAuMjQzLTAuNDJMMjY5LjQ2LDMzNC45OHogTTMyNy42NiwyODIuMWMtMy41NDYtMS44OTQtNC44ODYtNi4zMDUtMi45OTEtOS44NTFzNi4zMDUtNC44ODYsOS44NTEtMi45OTEgIGMwLjE0MywwLjA3NiwwLjI4MywwLjE1NywwLjQyLDAuMjQzbDM1LjU2LDIwLjUyYzMuNTQ2LDEuODk0LDQuODg2LDYuMzA1LDIuOTkxLDkuODUxcy02LjMwNSw0Ljg4Ni05Ljg1MSwyLjk5MSAgYy0wLjE0My0wLjA3Ni0wLjI4My0wLjE1Ny0wLjQyLTAuMjQzTDMyNy42NiwyODIuMXogTTM1MS42NiwyMDcuM2MtNC4wMzIsMC03LjMtMy4yNjgtNy4zLTcuM2MwLTQuMDMyLDMuMjY4LTcuMyw3LjMtNy4zbDAsMGg0MS4wNCAgYzQuMDMyLDAsNy4zLDMuMjY4LDcuMyw3LjNjMCw0LjAzMi0zLjI2OCw3LjMtNy4zLDcuM2wwLDBIMzUxLjY2eiBNMzM0Ljk4LDEzMC41Yy0zLjQxMiwyLjEyNi03LjkwMiwxLjA4NC0xMC4wMjktMi4zMjkgIGMtMi4xMjYtMy40MTItMS4wODQtNy45MDIsMi4zMjktMTAuMDI5YzAuMTM3LTAuMDg1LDAuMjc3LTAuMTY2LDAuNDItMC4yNDNsMzUuNTYtMjAuNTJjMy41NDYtMS44OTQsNy45NTctMC41NTUsOS44NTEsMi45OTEgIGMxLjgwNiwzLjM4LDAuNjgxLDcuNTgyLTIuNTcxLDkuNjA5TDMzNC45OCwxMzAuNXogTTI4Mi4xLDcyLjNjLTEuODk0LDMuNTQ2LTYuMzA1LDQuODg2LTkuODUxLDIuOTkxICBjLTMuNTQ2LTEuODk0LTQuODg2LTYuMzA1LTIuOTkxLTkuODUxYzAuMDc2LTAuMTQzLDAuMTU3LTAuMjgzLDAuMjQzLTAuNDJsMjAuNTItMzUuNTZjMS44OTQtMy41NDYsNi4zMDUtNC44ODYsOS44NTEtMi45OTEgIGMzLjU0NiwxLjg5NCw0Ljg4Niw2LjMwNSwyLjk5MSw5Ljg1MWMtMC4wNzYsMC4xNDMtMC4xNTcsMC4yODMtMC4yNDMsMC40MkwyODIuMSw3Mi4zeiBNMjA3LjMsNDguM2MwLDQuMDMyLTMuMjY4LDcuMy03LjMsNy4zICBjLTQuMDMyLDAtNy4zLTMuMjY4LTcuMy03LjNsMCwwdi00MWMwLTQuMDMyLDMuMjY4LTcuMyw3LjMtNy4zYzQuMDMyLDAsNy4zLDMuMjY4LDcuMyw3LjNWNDguM3ogTTE5OS45OCw5OS45OCAgYzU1LjIyOCwwLDEwMCw0NC43NzIsMTAwLDEwMHMtNDQuNzcyLDEwMC0xMDAsMTAwcy0xMDAtNDQuNzcyLTEwMC0xMDBTMTQ0Ljc1Miw5OS45OCwxOTkuOTgsOTkuOTh6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
            </div>
            <div v-else-if="condition === 'Fog'">
                <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4MCA0ODAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4MCA0ODA7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiPgo8Zz4KCTxnPgoJCTxyZWN0IHg9IjAiIHk9IjQxNiIgd2lkdGg9IjQ4MCIgaGVpZ2h0PSIxNiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHJlY3QgeD0iMCIgeT0iNDY0IiB3aWR0aD0iNDgwIiBoZWlnaHQ9IjE2IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cmVjdCB4PSIxMzYiIHdpZHRoPSIxNiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHJlY3QgeD0iMCIgeT0iMTI4IiB3aWR0aD0iMzIiIGhlaWdodD0iMTYiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zOTAuMjQsMTkyLjk1MkMzNzYuMDMyLDE1MC4zODQsMzI3LjMwNCwxMjAsMjcyLDEyMGMtMTIuMDMyLDAtMjMuMjk2LDEuNTY4LTMzLjY5Niw0LjUzNiAgICBDMjI5LjE4NCw4MC44NTYsMTg5LjczNiw0OCwxNDQsNDhjLTUyLjA0LDAtOTYsNDMuOTYtOTYsOTZjMCwzNS43NTIsMjAuNjQsNjcuODQsNTMuMjI0LDgzLjkzNiAgICBjLTAuODE2LDEuMzI4LTEuNzUyLDIuNi0yLjQ0LDMuOTg0Yy0yLjE3NiwwLTQuNzUyLDAuMDI0LTcuNTEyLDAuMDU2TDg4LDIzMmMtNDguNTIsMC04OCwzNS44ODgtODgsODBzMzkuNDgsODAsODgsODBoMjg4LjI3MiAgICBDNDM1LjQwOCwzODkuOTc2LDQ4MCwzNDUuMjcyLDQ4MCwyODhDNDgwLDI0MS41MDQsNDQzLjM0NCwyMDMuMDE2LDM5MC4yNCwxOTIuOTUyeiBNNjQsMTQ0YzAtNDMuMzYsMzYuNjQtODAsODAtODAgICAgYzM4LjMwNCwwLDcyLjQ0LDI5LjE1Miw3OS4xMTIsNjYuMTkyYy0yNC45MTIsMTEuNjA4LTQzLjM2LDMyLjgxNi01My4wOCw2Mi4wMjRjLTIzLjYsMS40NzItNDQuMzY4LDkuOTYtNTguMzM2LDIyLjkyOCAgICBDODIuNjI0LDIwMi4zMjgsNjQsMTc0Ljc5Miw2NCwxNDR6IE0zNzYsMzc2SDg4Yy0zOS42OTYsMC03Mi0yOC43MTItNzItNjRjMC0zNS4yODgsMzIuMzA0LTY0LDcyLTY0bDMuNDMyLTAuMDI0ICAgIGMxLjg5Ni0wLjAxNiw1LjMyOC0wLjA1Niw4LjA3Mi0wLjA1NmMxLjgwOCwwLDMuMzEyLDAuMDE2LDMuODk2LDAuMDU2YzMuNTY4LDAuMjI0LDYuODg4LTEuODcyLDguMTEyLTUuMjQgICAgYzcuMzA0LTIwLjA0LDMzLjg2NC0zNC4zMjgsNjQuNTkyLTM0LjczNmMzLjUzNi0wLjA0OCw2LjYxNi0yLjQwOCw3LjU4NC01LjgwOEMxOTUuNzA0LDE2MC4xMjgsMjI3Ljg4OCwxMzYsMjcyLDEzNiAgICBjNDkuNDk2LDAsOTQuMzIsMjguMzkyLDEwNC4yNjQsNjYuMDRjMC44MTYsMy4wOCwzLjM3Niw1LjM4NCw2LjUyOCw1Ljg2NEM0MzAuNjA4LDIxNS4yMDgsNDY0LDI0OC4xNDQsNDY0LDI4OCAgICBDNDY0LDMzNi40NTYsNDI2LjA0OCwzNzQuMjg4LDM3NiwzNzZ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cmVjdCB4PSI1MS4wNjkiIHk9IjM1LjEyMSIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDg4IC0wLjcwNTQgMC43MDU0IDAuNzA4OCAtMTkuMzg4IDU2Ljc3MTcpIiB3aWR0aD0iMTYiIGhlaWdodD0iMzMuNDk2IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cmVjdCB4PSIyNy4wMjkiIHk9IjIxMS45OTkiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MSAtMC43MDcxIDAuNzA3MSAwLjcwNzEgLTE0Mi42NzUyIDk1LjU0OTIpIiB3aWR0aD0iMzMuOTQ0IiBoZWlnaHQ9IjE2IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cmVjdCB4PSIyMTkuMDMxIiB5PSI0NC4wMDMiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MSAtMC43MDcxIDAuNzA3MSAwLjcwNzEgMzIuMzUyIDE4Mi4xMTAyKSIgd2lkdGg9IjMzLjk0NCIgaGVpZ2h0PSIxNiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
            </div>
            <div v-else-if="condition === 'Mist'">
                <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4KPGc+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZD0iTTQyLjY2NywxODcuNzMzaDI3My4wNjdjNC43MTksMCw4LjUzMy0zLjgyMyw4LjUzMy04LjUzM3MtMy44MTQtOC41MzMtOC41MzMtOC41MzNINDIuNjY3ICAgICBjLTQuNzE5LDAtOC41MzMsMy44MjMtOC41MzMsOC41MzNTMzcuOTQ4LDE4Ny43MzMsNDIuNjY3LDE4Ny43MzN6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik0yNDcuNDY3LDI3My4wNjdINTkuNzMzYy00LjcxOSwwLTguNTMzLDMuODIzLTguNTMzLDguNTMzYzAsNC43MSwzLjgxNCw4LjUzMyw4LjUzMyw4LjUzM2gxODcuNzMzICAgICBjNC43MTksMCw4LjUzMy0zLjgyMyw4LjUzMy04LjUzM0MyNTYsMjc2Ljg5LDI1Mi4xODYsMjczLjA2NywyNDcuNDY3LDI3My4wNjd6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik0xMTkuNDY3LDIzMC40YzAtNC43MS0zLjgxNC04LjUzMy04LjUzMy04LjUzM0g4LjUzM0MzLjgxNCwyMjEuODY3LDAsMjI1LjY5LDAsMjMwLjRjMCw0LjcxLDMuODE0LDguNTMzLDguNTMzLDguNTMzICAgICBoMTAyLjRDMTE1LjY1MiwyMzguOTMzLDExOS40NjcsMjM1LjExLDExOS40NjcsMjMwLjR6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik05My44NjcsMTM2LjUzM2gxMTkuNDY3YzQuNzE5LDAsOC41MzMtMy44MjMsOC41MzMtOC41MzNjMC00LjcxLTMuODE0LTguNTMzLTguNTMzLTguNTMzSDkzLjg2NyAgICAgYy00LjcxOSwwLTguNTMzLDMuODIzLTguNTMzLDguNTMzQzg1LjMzMywxMzIuNzEsODkuMTQ4LDEzNi41MzMsOTMuODY3LDEzNi41MzN6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik0yMzguOTMzLDEyOGMwLDQuNzEsMy44MTQsOC41MzMsOC41MzMsOC41MzNINDM1LjJjNC43MTksMCw4LjUzMy0zLjgyMyw4LjUzMy04LjUzM2MwLTQuNzEtMy44MTQtOC41MzMtOC41MzMtOC41MzMgICAgIEgyNDcuNDY3QzI0Mi43NDgsMTE5LjQ2NywyMzguOTMzLDEyMy4yOSwyMzguOTMzLDEyOHoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHBhdGggZD0iTTM0OS44NjcsMTcwLjY2N2MtNC43MTksMC04LjUzMywzLjgyMy04LjUzMyw4LjUzM3MzLjgxNCw4LjUzMyw4LjUzMyw4LjUzM2g2OC4yNjdjNC43MTksMCw4LjUzMy0zLjgyMyw4LjUzMy04LjUzMyAgICAgcy0zLjgxNC04LjUzMy04LjUzMy04LjUzM0gzNDkuODY3eiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMTc5LjIsODUuMzMzaDIyMS44NjdjNC43MTksMCw4LjUzMy0zLjgyMyw4LjUzMy04LjUzM3MtMy44MTQtOC41MzMtOC41MzMtOC41MzNIMTc5LjIgICAgIGMtNC43MTksMC04LjUzMywzLjgyMy04LjUzMyw4LjUzM1MxNzQuNDgxLDg1LjMzMywxNzkuMiw4NS4zMzN6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik00NjkuMzMzLDI3My4wNjdIMjgxLjZjLTQuNzE5LDAtOC41MzMsMy44MjMtOC41MzMsOC41MzNjMCw0LjcxLDMuODE0LDguNTMzLDguNTMzLDguNTMzaDE4Ny43MzMgICAgIGM0LjcxOSwwLDguNTMzLTMuODIzLDguNTMzLTguNTMzQzQ3Ny44NjcsMjc2Ljg5LDQ3NC4wNTIsMjczLjA2Nyw0NjkuMzMzLDI3My4wNjd6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik00MTguMTMzLDM3NS40NjdIMjQ3LjQ2N2MtNC43MTksMC04LjUzMywzLjgyMy04LjUzMyw4LjUzM3MzLjgxNCw4LjUzMyw4LjUzMyw4LjUzM2gxNzAuNjY3ICAgICBjNC43MTksMCw4LjUzMy0zLjgyMyw4LjUzMy04LjUzM1M0MjIuODUyLDM3NS40NjcsNDE4LjEzMywzNzUuNDY3eiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMzY2LjkzMyw0MjYuNjY3SDE0NS4wNjdjLTQuNzE5LDAtOC41MzMsMy44MjMtOC41MzMsOC41MzNzMy44MTQsOC41MzMsOC41MzMsOC41MzNoMjIxLjg2NyAgICAgYzQuNzE5LDAsOC41MzMtMy44MjMsOC41MzMtOC41MzNTMzcxLjY1Miw0MjYuNjY3LDM2Ni45MzMsNDI2LjY2N3oiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHBhdGggZD0iTTUwMy40NjcsMjIxLjg2N2gtMzU4LjRjLTQuNzE5LDAtOC41MzMsMy44MjMtOC41MzMsOC41MzNjMCw0LjcxLDMuODE0LDguNTMzLDguNTMzLDguNTMzaDM1OC40ICAgICBjNC43MTksMCw4LjUzMy0zLjgyMyw4LjUzMy04LjUzM0M1MTIsMjI1LjY5LDUwOC4xODYsMjIxLjg2Nyw1MDMuNDY3LDIyMS44Njd6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik05My44NjcsMzI0LjI2N2MtNC43MTksMC04LjUzMywzLjgyMy04LjUzMyw4LjUzM3MzLjgxNCw4LjUzMyw4LjUzMyw4LjUzM2g2OC4yNjdjNC43MTksMCw4LjUzMy0zLjgyMyw4LjUzMy04LjUzMyAgICAgcy0zLjgxNC04LjUzMy04LjUzMy04LjUzM0g5My44Njd6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik0yMjEuODY3LDM4NGMwLTQuNzEtMy44MTQtOC41MzMtOC41MzMtOC41MzNoLTE1My42Yy00LjcxOSwwLTguNTMzLDMuODIzLTguNTMzLDguNTMzczMuODE0LDguNTMzLDguNTMzLDguNTMzaDE1My42ICAgICBDMjE4LjA1MiwzOTIuNTMzLDIyMS44NjcsMzg4LjcxLDIyMS44NjcsMzg0eiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMTg3LjczMywzMzIuOGMwLDQuNzEsMy44MTQsOC41MzMsOC41MzMsOC41MzNIMzg0YzQuNzE5LDAsOC41MzMtMy44MjMsOC41MzMtOC41MzNzLTMuODE0LTguNTMzLTguNTMzLTguNTMzSDE5Ni4yNjcgICAgIEMxOTEuNTQ4LDMyNC4yNjcsMTg3LjczMywzMjguMDksMTg3LjczMywzMzIuOHoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
            </div>
        </div>
        <div class="temperature-text__container">
            <span class="temperature__text">{{ currentTemp }}</span>
            <span class="temperature-metric__text">°</span>
            <span class="weather-condition__text">{{ condition }}</span>
            <span></span>
        </div>
        <section class="min-max__container">
            <div class="min__container">
                <svg class="min-arrow__icon" viewBox="188.5 807 21 21">
                    <path fill="#00ff9b" d="M209.5 817.5h-21L199 828z" data-name="Min Arrow" />
                </svg>

                <span class="min-temperature__text">{{ minTemp }}</span>
                <span class="min__text">Min</span>
            </div>
            <div class="max__container">
                <svg class="max-arrow__icon" viewBox="449.5 820 21 21">
                    <path fill="red" d="M449.5 830.5h21L460 820z" data-name="Max Arrow" />
                </svg>
                <span class="max-temperature__text">{{ maxTemp }}</span>
                <span class="max__text">Max</span>
            </div>
        </section>
    </router-link>
</template>

<script>
import axios from "axios";
export default {
  props: ["city"],
  data() {
    return {
      currentTemp: "",
      condition: "",
      minTemp: "",
      maxTemp: "",
      openWeatherApiKey: ""
    };
  },
  methods: {
    getCurrentConditionByName: function() {
      let vm = this;
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${
        this.city
      }&appid=${this.openWeatherApiKey}`;
      axios
        .get(url)
        .then(response => {
          vm.setDataWeather(response.data);
        })
        .catch(response => {
          console.log(response);
        });
    },
    setDataWeather: function(data) {
      this.currentTemp = parseInt(data.main.temp);
      this.condition = data.weather[0].main;
      this.minTemp = parseInt(data.main.temp_min);
      this.maxTemp = parseInt(data.main.temp_max);
    }
  },
  created() {
    this.getCurrentConditionByName();
  }
};
</script>


<style scoped>
.weather__card-dark {
  background: linear-gradient(to bottom, #711b86, #00057a);
  color: white;
}
.city-name__text {
  text-transform: uppercase;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  margin-bottom: 1rem;
}
.temperature__text {
  align-self: end;
  width: 100%;
  font-size: 4rem;
  font-weight: 100;
  letter-spacing: 0.1rem;
}
.temperature-metric__text {
  text-align: start;
  font-size: 3rem;
}
.min-max__container {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
.min__container,
.max__container {
  margin: 1rem 3rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}
.min-arrow__icon,
.max-arrow__icon {
  height: 1.25rem;
  margin: auto;
}
.max-arrow__icon {
  margin-bottom: -0.05rem;
}
.weather-condition__text {
  display: block;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  text-align: center;
}
.max__text {
  color: #ff0070;
}
.min__text {
  color: #00ff9b;
}
.max__text,
.min__text {
  font-size: 1rem;
  text-align: center;
}
.max-temperature__text,
.min-temperature__text {
  text-align: center;
  font-size: 2rem;
}
.weather-icon__container {
  width: 10rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}
.weather-icon__container > div > img {
  max-width: 100%;
}
</style>
```
Tại đây bạn điển key mà bạn lấy từ open weather để vào **openWeatherApiKey** và cài thêm axios bằng câu lệnh sau:
```
npm install --save axios
```

Trong Main Component bạn sửa lại như sau :
```html
<template>
    <div class="container_wrap">
       <weather-card v-for="city in listCity" :city='city' :key="city.id" />
        <add-weather-card/>
    </div>
</template>

<script>
import AddWeatherCard from "@/components/AddWeatherCard";
import WeatherCard from "@/components/WeatherCard";
export default {
  components: {
    AddWeatherCard,
    WeatherCard
  },
  data() {
    return {
      listCity: ["hanoi"]
    };
  }
};
</script>
```

Chúng ta có thể hiểu luông hoạt động một cách đơn gian như sau. Main sẽ chứa danh sách các thành phố, và một thành phố ta gọi 1 component WeatherCard mà được truyền dữ liệu tên thành phố qua props. Props là cơ chế giúp ta truyền data từ component cha tới component con. Và trong component con, WeatherCard lấy dữ liệu đó và sử dụng axios (tương tự ajax) gọi api để hiển thị.

Và ta đa, ta đã có sản phẩm như này: 
![](https://images.viblo.asia/df5caeb9-17eb-4238-b0de-c6713936f7ec.png)

# Tổng kết
Chúng ta đã có những bước chân để xây dựng một ứng dụng VueJs của mình. Bạn có thể tham khảo repo của mình [https://github.com/quanKM/weather-app](https://github.com/quanKM/weather-app) để có thể tự mở rộng ứng dụng của riêng mình.

# Tham Khảo
https://medium.com/@hamedbaatour/build-a-real-world-beautiful-web-app-with-angular-6-a-to-z-ultimate-guide-2018-part-i-e121dd1d55e

https://vuejs.org/v2/guide/

https://vuex.vuejs.org/