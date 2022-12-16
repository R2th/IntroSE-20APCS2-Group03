Ở phần trước mình đã cài đặt và setup những bước đầu để tạo một mini game với vuejs các bạn có thể xem part 1 ở đây
 https://viblo.asia/p/xay-dung-mini-game-voi-vuejs-part-1-Az45bGLLKxY
 Ở phần này  mình sẽ bắt tay vào xây dựng những chức năng chính của game. Đầu tiên là ý tưởng mình sẽ xây dựng một game đơn giản các bạn có thể dễ dàng follow. Mình sẽ xây dựng 2 nhân vật là You mà Monster, 2 đối tượng này sẽ attach nhau và ai hết máu trước sẽ thua. Rồi giờ chúng ta sẽ bắt đầu thực hiện.
 
## 1. Xây dựng game room
Từ thư mục components chúng ta tạo một file Game.vue file và giờ chúng ta sẽ code trên file này. Từ trang home khi click vào ảnh biểu tượng game chúng sẽ dẫn đến dây. 

Đầu tiên chúng ta sẽ kiếm 2 cái ảnh cho 2 nhân vật. Mình có 2 ảnh là you.jpg và monster.jpg lưu 2 ảnh này trong thư mục assets. 
```
Thêm Bootstrap styles và JavaScript
```
npm install bootstrap jquery popper.js
```
trong index.js thêm import

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
```

```html
<template>
    <div class="row">
        <div class="col-md-2">
        </div>
        <div class="col-md-4">
            <h1 class="text-center">YOU</h1>
            <img src=".././assets/you.jpg" style="height:300px; width:300px;">
        </div>
        <div class="col-md-4">
            <h1 class="text-center">MONSTER</h1>
            <img src=".././assets/monster.jpg" style="height:300px; width:300px;">
        </div>
        <div class="col-md-2">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Game',

        data() {
            return {
                monsterHp: 300,
                youHp: 100,
            };
        },

        methods: {},
    }
</script>
```
Đã có ảnh của 2 nhân vật giờ chúng ta thêm thanh máu, mình sẽ để  mặc định máu của monster là 300, you là 100. hai biến này sẽ hay đổi khi You và Monster attach each other. Để thêm thanh máu cho You mình sẽ thêm một <div> chứa mọt class là hp ngày dưới thẻ img và truyền vào width của nó chính là  biến hp vừa rồi.
```html
<div class="hp">
    <div class="hp text-center"  :style="{
        width: youHp + '%'
    }">
    </div>
    <!--hiển thị số màu còn lại-->
    {{ youHp }} 
</div>
```
Tương tự với Monster ban đầu máu của cả 2 sẽ có width đều là 100%
```html
<div class="hp">
    <div class="hp text-center"  :style="{
        width: monsterHp/3 + '%'
    }">
    </div>
    {{ monsterHp }}
</div>
```
Thêm chút style 
```css
<style>
    .col-md-4 {
        text-align: center;
        background: white;
        height: 420px;
        margin-top: 50px;
    }
    .hp .text-center {
        width: 300px;
        height: 40px;
        text-align: center;
        background-color: Red;
        margin: 0;
    }
    .hp {
        text-align: left;
        margin: auto;
        width: 280px;
    }
</style>
```
Và bây giờ chúng ta đã có giao diện cơ bản như dưới đây
![](https://images.viblo.asia/22b8f81d-bfb2-43ed-b753-e2f1c037e077.png)
Tiếp theo và viết các function. Đầu tiên là khởi tạo một game mới, chúng ta sẽ có nút New game khi click vào đó sẽ hiện ra một số các nút cần thiết trong game, mình sẽ làm 4 nút là Attach, Special Skill, + HP, Quit. Rồi cơ bản là thế, giờ dưới div bao mình sẽ tạo một div chứa các button đó
```html
<div class="select">
            <div class="option">
                <div v-if="!isRunning">
                    <div class="pull start" @click="start">
                        <button class="btn btn-success" id="start" >New Game</button>
                    </div>
                   <div class="pull">
                        <router-link to="/" id="back">
                            <button class="btn btn-default" id="stop">Quit</button>
                        </router-link>
                    </div>
                </div>
                <div class="running" v-if="isRunning">
                    <div class="pull" @click="attach">
                        <button class="btn btn-warning" id="attach">Attach</button>
                    </div>
                    <div class="pull" @click="skill">
                        <button class="btn btn-info" id="attach-special">Special Skill</button>
                    </div>
                    <div class="pull" @click="heal">
                        <button class="btn btn-success" id="heal">+ HP</button>
                    </div>
                    <div class="pull">
                        <router-link to="/" id="back">
                            <button class="btn btn-default" id="stop">Quit</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
```
Chúng ta cần khai báo một số biên 
- Biến isRunning = false mặc địch ban đầu, biến này khi ấn nút New game sẽ có giá trị là true 
- Khi ấn Quit thì sẽ trở về màn hình Home
- Special Skill là kĩ sử dụng kĩ năng đặc biệt, khi ấn nút này lượng máu của Monster sẽ mất gấp 3 bình thường
- +HP dùng khi số máu của You cón ít cụ thể  mình sẽ cho chức năng này hoạt động khi máu You còn dưới 50

Chúng ta cần thêm 2 biến nữa là useHp và useSkill để quy định khi dùng 2 chức năng Special Skill và + HP
Lúc này data chúng ta sẽ có 5 biến như sau:
```js
data() {
    return {
        isRunning: false,
        monsterHp: 300,
        youHp: 100,
        skillUse: 0,
        healUse: 0,
    };
},
```
đầu tiên là chức năng nút start khi ấn nút này reset tất cả về gía trị mặc định, nút Quit sẽ đưa chúng ta về trang chủ và trạng thái isRunning = false
```js
methods: {
    start: function() {
        this.isRunning = true;
        this.monsterHp = 300;
        this.youHp = 100;
        this.healUse = 0;
        this.skillUse = 0;
    },
    skill: function() {
    },
    heal: function() {
    },
    attach: function() {
    },
}
```
Tiếp theo là Attach, máu của Monster lớn hơn You và You có +hp và kĩ năng, dame lớn hơn Monster
```js
getRndInteger: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
},
attach: function () {
     if(this.checkContinue()){
        return false;
    }
    // lượng máu bạn mất mỗi lần attach
    let damageYou = this.getRndInteger(7, 10);
    this.youHp = this.youHp - damageYou;
    if (this.youHp < 0) {
        this.youHp = 0;
    }

    //  lượng máu monster mất mỗi lần attach
    let damageMonster = this.getRndInteger(10, 15);
    this.monsterHp = this.monsterHp - damageMonster;
    if (this.monsterHp < 0) {
        this.monsterHp = 0;
    }
},
```
Special Skill tấn công sẽ trừ của Monster một lượng máu lớn hơn bình thường và You sẽ được dùng 3 lần kĩ năng này
```js
skill: function() {
    if(this.skillUse >= 3) return;
    this.monsterHp -= 30;
    this.skillUse ++;
    if(this.monsterHp <= 0){
        this.monsterHp =0;
    }
},
```
Kĩ năng +HP dùng khi máu của You dưới 70 và được dùng tối đa 3 lần mỗi lần cộng thêm 20 máu
```js
heal: function() {
    if(this.youHp >= 70 || this.healUse >= 3){
        return false;
    }

    this.youHp += 20;
    this.healUse ++;
    if(this.youHp >= 100){
        this.youHp = 100;
    }
},
```
Chúng ta cần thêm một hàm để check khi kết quả, trạng thái có thể là You có thể thắng, thua, hoặc hòa
```js
checkContinue: function() {
    if(this.youHp <= 0){
        this.confirmText(confirm('You Lose! Do you want to start new game ?'))
    } else if(this.monsterHp <= 0){
        this.confirmText(confirm('You Win! Do you want to start new game ?'))
    } else if (this.youHp <= 0 && this.monsterHp <= 0){
        this.confirmText(confirm('Both of you win! Congratulations!'))
    }

    return false;
},
confirmText: function (confirm) {
    if(confirm){
        this.start();
    }else{
        this.isRunning =false;
    }

    return true;
}
```
Vậy là xong, sau khi xong các bước trên kết quả của chúng ta sẽ như sau:
![](https://images.viblo.asia/22b8f81d-bfb2-43ed-b753-e2f1c037e077.png)
Chương trình này khá đơn giản phù hợp với các bạn mới học vuejs, các bạn có thể tham khảo bài viết này!
    
LInk tham khảo.vuejs.org/