Vuejs là một công cụ xây dựng frontend, bên cạnh đó nó còn làm được rất nhiều thứ hay ho. Bài này mình sẽ làm một mini game với vue-cli trên môi trường ubuntu
## 1. Cài đặt project
### a, Cài đặt Vue-CLI
Cài nodejs và npm
```
sudo apt update
sudo apt install nodejs
sudo apt install npm
```
Để kiểm tra phiên bản nào của Node.js bạn đã cài đặt sau các bước ban đầu này, hãy nhập:
```
nodejs -v
```
Phiên bản mới nhất npm
```
npm install npm@latest -g
```
Cài đặt Vue-CLI:
```
npm install -g vue-cli
```
Nếu khi cài gặp lỗi **/usr/bin/env: ‘node’: No such file or directory** thì cạc bạn chạy lệnh sau để fix nhé:
```
ln -s /usr/bin/nodejs /usr/bin/node
```
### b, Tạo project
chạy lệnh dưới đây:
```
vue init webpack mini-game

? Project name mini-game
? Project description A Vue.js project
? Author thanh
? Vue build runtime
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recom
mended) npm

```
Giờ chúng ta đã có một project tên là mini-game, tiếp theo
```
 cd mini-game
  npm run dev
```
Sau đó trên command sẽ có đường dẫn để localhost đến project
và sau khi cài xong đây là thành quả:
![](https://images.viblo.asia/d56bef26-9e37-4379-8598-50c06d7fca67.png)

## 2. Xây dựng ứng dụng
Đầu tiên chúng ta cần sử lại chút giao diện
Vào file App.vue và sửa lại code như sau:
```html
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

  export default {
    name: "App"
  };
</script>

<style>
  #app {
    display: block;
    background-color: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background: linear-gradient(to right, rgb(76, 0, 255), rgb(0, 219, 222));
    background-image: linear-gradient(
            to right,
            rgb(135, 140, 175),
            rgb(0, 219, 222)
    );
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: initial;
  }
</style>
```

Trong router/index.js tạo một route tới trang home:
```
routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
```
Giờ chúng ta tạo một component Home.vue trong thư mục components 
```html
<template>
    <div class="wrap">
        <div class="game">
            <div class="game-room">
                <router-link id="link-game" to="game-room">
                    <h5>Game Room</h5>
                    <img src=".././assets/g.png" class="game-img">
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
    };
</script>

<style>
    .game {
        width: 200px;
        margin: auto;
        text-align: center;
        margin-top: 30%;
    }
    .game-img {
        height:100px; width:120px; 
    }
</style>
```
Giờ chúng ta cần tạo một route đến game room
trong router/index.js tạo thêm một route như sau:
```
routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/game-room',
      name: 'Game',
      component: Game,
    },
  ]
```
Đến đây chúng ta đã thực hiện xong các bước cơ bản để có một trang home với một đường dẫn tới game room
![](https://images.viblo.asia/d0322cca-5b6d-4cb5-9a52-b8fb4c06b166.png)https://images.viblo.asia/d0322cca-5b6d-4cb5-9a52-b8fb4c06b166.png

Giờ khi click vào ảnh chúng ta sẽ phải dẫn đến game room, vậy giờ chúng ta cần làm là tạo ra một trang game room nữa. Trong component tạo một file tên là Game.vue để xử lí các tác vụ của chương trình chúng ta muốn. Bài này mình tập trung xây build một project vue cli là chính, phần sau mình sẽ bắt tay vào các chức năng của game.

link tham khảo: 
https://allaravel.com/tutorials/lap-trinh/vuejs-framework/vue-cli-xay-dung-ung-dung-mau-vue-js-trong-nhay-mat/