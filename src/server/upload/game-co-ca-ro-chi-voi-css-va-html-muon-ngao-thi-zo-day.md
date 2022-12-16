Tôi nói trước là nó dài loằng ngoằng, với chuối lắm nhá =))

Cái này để bày trò thể hiện đẳng cấp thôi, chứ cái này mà dùng js thì phút mốt là xong

Nhưng để lấy tinh thần thì tôi cũng show hàng chút cho mn có tinh thần

{@embed: https://codepen.io/hungba124/pen/eYvmzOE}

Để tiết kiệm thêm chút thời gian ae ngồi đọc thì ta sẽ bắt đầu luôn

## HTML
Đầu tiên là code HTML, sau cái này thì tôi đoán là 1/2 ae bỏ đi tìm cái khác để đọc

```html
<div class="tic-tac-toe">
    <!-- layer 1 => 1st move => player 1 move -->
    <input class="player-1 left first-column top first-row first-diagonal turn-1" id="block1-1-1" type="radio"/>
    <label class="turn-1" for="block1-1-1"> </label>
    <input class="player-1 middle second-column top first-row turn-1" id="block1-1-2" type="radio"/>
    <label class="turn-1" for="block1-1-2"> </label>
    <input class="player-1 right third-column top first-row second-diagonal turn-1" id="block1-1-3" type="radio"/>
    <label class="turn-1" for="block1-1-3"> </label>
    <input class="player-1 left first-column center second-row turn-1" id="block1-2-1" type="radio"/>
    <label class="turn-1" for="block1-2-1"> </label>
    <input class="player-1 middle second-column center second-row first-diagonal second-diagonal turn-1" id="block1-2-2" type="radio"/>
    <label class="turn-1" for="block1-2-2"> </label>
    <input class="player-1 right third-column center second-row turn-1" id="block1-2-3" type="radio"/>
    <label class="turn-1" for="block1-2-3"> </label>
    <input class="player-1 left first-column bottom third-row second-diagonal turn-1" id="block1-3-1" type="radio"/>
    <label class="turn-1" for="block1-3-1"> </label>
    <input class="player-1 middle second-column bottom third-row turn-1" id="block1-3-2" type="radio"/>
    <label class="turn-1" for="block1-3-2"> </label>
    <input class="player-1 right third-column bottom third-row first-diagonal turn-1" id="block1-3-3" type="radio"/>
    <label class="turn-1" for="block1-3-3"> </label>
    
    <!-- layer 2 => 2nd move => player 2 move -->
    <input class="player-2 left first-column top first-row first-diagonal turn-2" id="block2-1-1" type="radio"/>
    <label class="turn-2" for="block2-1-1"> </label>
    <input class="player-2 middle second-column top first-row turn-2" id="block2-1-2" type="radio"/>
    <label class="turn-2" for="block2-1-2"> </label>
    <input class="player-2 right third-column top first-row second-diagonal turn-2" id="block2-1-3" type="radio"/>
    <label class="turn-2" for="block2-1-3"> </label>
    <input class="player-2 left first-column center second-row turn-2" id="block2-2-1" type="radio"/>
    <label class="turn-2" for="block2-2-1"> </label>
    <input class="player-2 middle second-column center second-row first-diagonal second-diagonal turn-2" id="block2-2-2" type="radio"/>
    <label class="turn-2" for="block2-2-2"> </label>
    <input class="player-2 right third-column center second-row turn-2" id="block2-2-3" type="radio"/>
    <label class="turn-2" for="block2-2-3"> </label>
    <input class="player-2 left first-column bottom third-row second-diagonal turn-2" id="block2-3-1" type="radio"/>
    <label class="turn-2" for="block2-3-1"> </label>
    <input class="player-2 middle second-column bottom third-row turn-2" id="block2-3-2" type="radio"/>
    <label class="turn-2" for="block2-3-2"> </label>
    <input class="player-2 right third-column bottom third-row first-diagonal turn-2" id="block2-3-3" type="radio"/>
    <label class="turn-2" for="block2-3-3"> </label>
    
    <!-- layer 3 => 3rd move => player 1 move -->
    <input class="player-1 left first-column top first-row first-diagonal turn-3" id="block3-1-1" type="radio"/>
    <label class="turn-3" for="block3-1-1"> </label>
    <input class="player-1 middle second-column top first-row turn-3" id="block3-1-2" type="radio"/>
    <label class="turn-3" for="block3-1-2"> </label>
    <input class="player-1 right third-column top first-row second-diagonal turn-3" id="block3-1-3" type="radio"/>
    <label class="turn-3" for="block3-1-3"> </label>
    <input class="player-1 left first-column center second-row turn-3" id="block3-2-1" type="radio"/>
    <label class="turn-3" for="block3-2-1"> </label>
    <input class="player-1 middle second-column center second-row first-diagonal second-diagonal turn-3" id="block3-2-2" type="radio"/>
    <label class="turn-3" for="block3-2-2"> </label>
    <input class="player-1 right third-column center second-row turn-3" id="block3-2-3" type="radio"/>
    <label class="turn-3" for="block3-2-3"> </label>
    <input class="player-1 left first-column bottom third-row second-diagonal turn-3" id="block3-3-1" type="radio"/>
    <label class="turn-3" for="block3-3-1"> </label>
    <input class="player-1 middle second-column bottom third-row turn-3" id="block3-3-2" type="radio"/>
    <label class="turn-3" for="block3-3-2"> </label>
    <input class="player-1 right third-column bottom third-row first-diagonal turn-3" id="block3-3-3" type="radio"/>
    <label class="turn-3" for="block3-3-3"> </label>
    
    <!-- layer 4 => 4th move => player 2 move -->
    <input class="player-2 left first-column top first-row first-diagonal turn-4" id="block4-1-1" type="radio"/>
    <label class="turn-4" for="block4-1-1"> </label>
    <input class="player-2 middle second-column top first-row turn-4" id="block4-1-2" type="radio"/>
    <label class="turn-4" for="block4-1-2"> </label>
    <input class="player-2 right third-column top first-row second-diagonal turn-4" id="block4-1-3" type="radio"/>
    <label class="turn-4" for="block4-1-3"> </label>
    <input class="player-2 left first-column center second-row turn-4" id="block4-2-1" type="radio"/>
    <label class="turn-4" for="block4-2-1"> </label>
    <input class="player-2 middle second-column center second-row first-diagonal second-diagonal turn-4" id="block4-2-2" type="radio"/>
    <label class="turn-4" for="block4-2-2"> </label>
    <input class="player-2 right third-column center second-row turn-4" id="block4-2-3" type="radio"/>
    <label class="turn-4" for="block4-2-3"> </label>
    <input class="player-2 left first-column bottom third-row second-diagonal turn-4" id="block4-3-1" type="radio"/>
    <label class="turn-4" for="block4-3-1"> </label>
    <input class="player-2 middle second-column bottom third-row turn-4" id="block4-3-2" type="radio"/>
    <label class="turn-4" for="block4-3-2"> </label>
    <input class="player-2 right third-column bottom third-row first-diagonal turn-4" id="block4-3-3" type="radio"/>
    <label class="turn-4" for="block4-3-3"> </label>
    
    <!-- layer 5 => 5th move => player 1 move -->
    <input class="player-1 left first-column top first-row first-diagonal turn-5" id="block5-1-1" type="radio"/>
    <label class="turn-5" for="block5-1-1"> </label>
    <input class="player-1 middle second-column top first-row turn-5" id="block5-1-2" type="radio"/>
    <label class="turn-5" for="block5-1-2"> </label>
    <input class="player-1 right third-column top first-row second-diagonal turn-5" id="block5-1-3" type="radio"/>
    <label class="turn-5" for="block5-1-3"> </label>
    <input class="player-1 left first-column center second-row turn-5" id="block5-2-1" type="radio"/>
    <label class="turn-5" for="block5-2-1"> </label>
    <input class="player-1 middle second-column center second-row first-diagonal second-diagonal turn-5" id="block5-2-2" type="radio"/>
    <label class="turn-5" for="block5-2-2"> </label>
    <input class="player-1 right third-column center second-row turn-5" id="block5-2-3" type="radio"/>
    <label class="turn-5" for="block5-2-3"> </label>
    <input class="player-1 left first-column bottom third-row second-diagonal turn-5" id="block5-3-1" type="radio"/>
    <label class="turn-5" for="block5-3-1"> </label>
    <input class="player-1 middle second-column bottom third-row turn-5" id="block5-3-2" type="radio"/>
    <label class="turn-5" for="block5-3-2"> </label>
    <input class="player-1 right third-column bottom third-row first-diagonal turn-5" id="block5-3-3" type="radio"/>
    <label class="turn-5" for="block5-3-3"> </label>
    
    <!-- layer 6 => 6th move => player 2 move -->
    <input class="player-2 left first-column top first-row first-diagonal turn-6" id="block6-1-1" type="radio"/>
    <label class="turn-6" for="block6-1-1"> </label>
    <input class="player-2 middle second-column top first-row turn-6" id="block6-1-2" type="radio"/>
    <label class="turn-6" for="block6-1-2"> </label>
    <input class="player-2 right third-column top first-row second-diagonal turn-6" id="block6-1-3" type="radio"/>
    <label class="turn-6" for="block6-1-3"> </label>
    <input class="player-2 left first-column center second-row turn-6" id="block6-2-1" type="radio"/>
    <label class="turn-6" for="block6-2-1"> </label>
    <input class="player-2 middle second-column center second-row first-diagonal second-diagonal turn-6" id="block6-2-2" type="radio"/>
    <label class="turn-6" for="block6-2-2"> </label>
    <input class="player-2 right third-column center second-row turn-6" id="block6-2-3" type="radio"/>
    <label class="turn-6" for="block6-2-3"> </label>
    <input class="player-2 left first-column bottom third-row second-diagonal turn-6" id="block6-3-1" type="radio"/>
    <label class="turn-6" for="block6-3-1"> </label>
    <input class="player-2 middle second-column bottom third-row turn-6" id="block6-3-2" type="radio"/>
    <label class="turn-6" for="block6-3-2"> </label>
    <input class="player-2 right third-column bottom third-row first-diagonal turn-6" id="block6-3-3" type="radio"/>
    <label class="turn-6" for="block6-3-3"> </label>
    
    <!-- layer 7 => 7th move => player 1 move -->
    <input class="player-1 left first-column top first-row first-diagonal turn-7" id="block7-1-1" type="radio"/>
    <label class="turn-7" for="block7-1-1"> </label>
    <input class="player-1 middle second-column top first-row turn-7" id="block7-1-2" type="radio"/>
    <label class="turn-7" for="block7-1-2"> </label>
    <input class="player-1 right third-column top first-row second-diagonal turn-7" id="block7-1-3" type="radio"/>
    <label class="turn-7" for="block7-1-3"> </label>
    <input class="player-1 left first-column center second-row turn-7" id="block7-2-1" type="radio"/>
    <label class="turn-7" for="block7-2-1"> </label>
    <input class="player-1 middle second-column center second-row first-diagonal second-diagonal turn-7" id="block7-2-2" type="radio"/>
    <label class="turn-7" for="block7-2-2"> </label>
    <input class="player-1 right third-column center second-row turn-7" id="block7-2-3" type="radio"/>
    <label class="turn-7" for="block7-2-3"> </label>
    <input class="player-1 left first-column bottom third-row second-diagonal turn-7" id="block7-3-1" type="radio"/>
    <label class="turn-7" for="block7-3-1"> </label>
    <input class="player-1 middle second-column bottom third-row turn-7" id="block7-3-2" type="radio"/>
    <label class="turn-7" for="block7-3-2"> </label>
    <input class="player-1 right third-column bottom third-row first-diagonal turn-7" id="block7-3-3" type="radio"/>
    <label class="turn-7" for="block7-3-3"> </label>
    
    <!-- layer 8 => 8th move => player 2 move -->
    <input class="player-2 left first-column top first-row first-diagonal turn-8" id="block8-1-1" type="radio"/>
    <label class="turn-8" for="block8-1-1"> </label>
    <input class="player-2 middle second-column top first-row turn-8" id="block8-1-2" type="radio"/>
    <label class="turn-8" for="block8-1-2"> </label>
    <input class="player-2 right third-column top first-row second-diagonal turn-8" id="block8-1-3" type="radio"/>
    <label class="turn-8" for="block8-1-3"> </label>
    <input class="player-2 left first-column center second-row turn-8" id="block8-2-1" type="radio"/>
    <label class="turn-8" for="block8-2-1"> </label>
    <input class="player-2 middle second-column center second-row first-diagonal second-diagonal turn-8" id="block8-2-2" type="radio"/>
    <label class="turn-8" for="block8-2-2"> </label>
    <input class="player-2 right third-column center second-row turn-8" id="block8-2-3" type="radio"/>
    <label class="turn-8" for="block8-2-3"> </label>
    <input class="player-2 left first-column bottom third-row second-diagonal turn-8" id="block8-3-1" type="radio"/>
    <label class="turn-8" for="block8-3-1"> </label>
    <input class="player-2 middle second-column bottom third-row turn-8" id="block8-3-2" type="radio"/>
    <label class="turn-8" for="block8-3-2"> </label>
    <input class="player-2 right third-column bottom third-row first-diagonal turn-8" id="block8-3-3" type="radio"/>
    <label class="turn-8" for="block8-3-3"> </label>
    
    <!-- layer 9 => 9th move => player 1 move -->
    <input class="player-1 left first-column top first-row first-diagonal turn-9" id="block9-1-1" type="radio"/>
    <label class="turn-9" for="block9-1-1"> </label>
    <input class="player-1 middle second-column top first-row turn-9" id="block9-1-2" type="radio"/>
    <label class="turn-9" for="block9-1-2"> </label>
    <input class="player-1 right third-column top first-row second-diagonal turn-9" id="block9-1-3" type="radio"/>
    <label class="turn-9" for="block9-1-3"> </label>
    <input class="player-1 left first-column center second-row turn-9" id="block9-2-1" type="radio"/>
    <label class="turn-9" for="block9-2-1"> </label>
    <input class="player-1 middle second-column center second-row first-diagonal second-diagonal turn-9" id="block9-2-2" type="radio"/>
    <label class="turn-9" for="block9-2-2"> </label>
    <input class="player-1 right third-column center second-row turn-9" id="block9-2-3" type="radio"/>
    <label class="turn-9" for="block9-2-3"> </label>
    <input class="player-1 left first-column bottom third-row second-diagonal turn-9" id="block9-3-1" type="radio"/>
    <label class="turn-9" for="block9-3-1"> </label>
    <input class="player-1 middle second-column bottom third-row turn-9" id="block9-3-2" type="radio"/>
    <label class="turn-9" for="block9-3-2"> </label>
    <input class="player-1 right third-column bottom third-row first-diagonal turn-9" id="block9-3-3" type="radio"/>
    <label class="turn-9" for="block9-3-3"> </label>
    
    <div class="end">
        <h3></h3><a href="">Restart</a>
    </div>
</div>
```

Đã muốn bỏ cuộc chưa nào =)))

Rất may cho ae tôi là người tốt bụng nên mới viết hết ra cho luôn đấy nhé, chứ phải người khác là viết đoạn đầu rồi cho ae tự viết nốt rồi :v

Giải thích đơn giản thì là 9 ô => 9 lượt => 9 lớp, vì là ta cũng không thể biết được là player sẽ chọn ô nào vào lượt mình mà. Nói chung là bao nhiều ô thì bấy nhiêu lượt thôi, dùng tool hay code gì mà loop ra, mà loop được ra thì đoạn sau check if-else cho khỏe ae ạ =))

Fontend ở trên, giờ đến backend

## CSS
Quên, đoạn này vẫn tính là frontend =))

Ẩn cái tròn tròn của input radio
```css
.tic-tac-toe {
    font-family: "Open Sans", sans-serif;
    height: 450px;
    width: 450px;
    margin: auto;
    overflow: hidden;
    position: relative;
}
.tic-tac-toe input[type="radio"] { display: none }
.tic-tac-toe input[type="radio"]:checked + label {
    cursor: default;
    z-index: 10 !important;
}
```

Tạo những ô vuông màu xanh, hover qua thì nó thành màu đen, và hiện icon x-o mờ mờ.

Đoạn đầu quên nói, nhớ thêm Fontawesome 4.7 vào nhé
```css

.tic-tac-toe label {
    background-color: #78bec5;
    border-radius: 14px;
    cursor: pointer;
    color: #fff;
    display: none;
    height: 140px;
    width: 140px;
    margin: 5px;
    position: absolute;
    -moz-transition: background-color 0.3s;
    -o-transition: background-color 0.3s;
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;
}
.tic-tac-toe label:hover { background-color: #3d4250 }
.tic-tac-toe label:hover:after { opacity: 0.4 }
.tic-tac-toe label:after {
    font-family: "FontAwesome";
    font-size: 70px;
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    margin-top: -35px;
    text-align: center;
    opacity: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
.tic-tac-toe input[type="radio"].player-1 + label:after { content: "\f00d" }
.tic-tac-toe input[type="radio"].player-2 + label:after { content: "\f10c" }
```

Màn hình end game, là khi chơi xong ấy, không phải movie Endgame mà có ông Bàn Là bị chết đâu.

Nó sẽ có 1 dòng thông báo là ai thắng, ai thua, hay là hòa, và một nút restart => vô dụng nếu bạn nhất quyết không dùng một chút js nào kể cả onclick =))
```css
.tic-tac-toe .end {
    display: none;
    background: rgba(255, 255, 255, 0.8);
    color: #3d4250;
    position: absolute;
    bottom: 5px;
    left: 5px;
    right: 5px;
    top: 5px;
    padding-top: 110px;
    text-align: center;
    z-index: 11;
}
.tic-tac-toe .end h3 {
    font-size: 40px;
    font-weight: 300;
}
.tic-tac-toe .end a {
    background-color: #3d4250;
    color: #fff;
    border-radius: 4px;
    padding: 14px 45px;
    text-decoration: none;
    -moz-transition: background-color 0.2s;
    -o-transition: background-color 0.2s;
    -webkit-transition: background-color 0.2s;
    transition: background-color 0.2s;
    cursor: pointer;
}
.tic-tac-toe .end a:hover {
    background-color: #262934;
}
```

Vẽ những ô vuông và hiển thị nó, đến đoạn này thì có dính "backend" rồi =))
```css

.tic-tac-toe input[type="radio"].left + label { left: 0 }
.tic-tac-toe input[type="radio"].top + label { top: 0 }
.tic-tac-toe input[type="radio"].middle + label { left: 150px }
.tic-tac-toe input[type="radio"].right + label { left: 300px }
.tic-tac-toe input[type="radio"].center + label { top: 150px }
.tic-tac-toe input[type="radio"].bottom + label { top: 300px }
.tic-tac-toe input[type="radio"].player-1:checked + label:after,
.tic-tac-toe input[type="radio"].player-2:checked + label:after { opacity: 1 }
.tic-tac-toe input[type="radio"].player-1:checked + label { background-color: #dc685a }
.tic-tac-toe input[type="radio"].player-2:checked + label { background-color: #ecaf4f }
.tic-tac-toe input[type="radio"].turn-1 + label { z-index: 1 }
.tic-tac-toe input[type="radio"].turn-2 + label { z-index: 2 }
.tic-tac-toe input[type="radio"].turn-3 + label { z-index: 3 }
.tic-tac-toe input[type="radio"].turn-4 + label { z-index: 4 }
.tic-tac-toe input[type="radio"].turn-5 + label { z-index: 5 }
.tic-tac-toe input[type="radio"].turn-6 + label { z-index: 6 }
.tic-tac-toe input[type="radio"].turn-7 + label { z-index: 7 }
.tic-tac-toe input[type="radio"].turn-8 + label { z-index: 8 }
.tic-tac-toe input[type="radio"].turn-9 + label { z-index: 9 }
.tic-tac-toe input[type="radio"].turn-1 + label,
.tic-tac-toe input[type="radio"].turn-1:checked ~ .turn-2 + label,
.tic-tac-toe input[type="radio"].turn-2:checked ~ .turn-3 + label,
.tic-tac-toe input[type="radio"].turn-3:checked ~ .turn-4 + label,
.tic-tac-toe input[type="radio"].turn-4:checked ~ .turn-5 + label,
.tic-tac-toe input[type="radio"].turn-5:checked ~ .turn-6 + label,
.tic-tac-toe input[type="radio"].turn-6:checked ~ .turn-7 + label,
.tic-tac-toe input[type="radio"].turn-7:checked ~ .turn-8 + label,
.tic-tac-toe input[type="radio"].turn-8:checked ~ .turn-9 + label {
    display: block
}
```

Đến đây là được nửa đường rồi, bạn đã có thể hiển thị game và chơi được, nhưng nó sẽ không hiển thị kết quả, tiếp sau chúng ta sẽ xử lý đoạn đó.

+ Đầu tiên, khi chọn hết các ô, thức là đã xong game => hiển thị màn hình end game, kết quả thì cứ mặc định là Hòa đi

```css
.tic-tac-toe input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ .end {
    display: block
}
.tic-tac-toe input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ .end > h3:before {
    content: "It is a tie!"
}
```
+ TH player 1 thắng thì sao? Vậy thì ta phải xem trường hợp nào player 1 sẽ thắng, là khi họ chọn được 1 hàng, 1 cột hoặc 1 đương chéo, theo ngôn ngữ code thì là khi chọn [1-1, 1-2, 1-3] hoặc [1-1, 2-1, 3-1] hoặc [1-1, 2-2, 3-3],... CSS thì không có if-else rồi, cho nên là đành liệt kê hết các trường hợp ra thôi, VIẾT TAY nhé, may giời là nó chỉ có 9 ô, có 8 trường hợp thôi

```css
/* hiển thị màn hình end và thông báo player 1 win, dồn đoạn hiển thị chung với đoạn trên cũng đc */
.tic-tac-toe .player-1.first-column:checked ~ .player-1.first-column:checked ~ .player-1.first-column:checked ~ .end,
.tic-tac-toe .player-1.second-column:checked ~ .player-1.second-column:checked ~ .player-1.second-column:checked ~ .end,
.tic-tac-toe .player-1.third-column:checked ~ .player-1.third-column:checked ~ .player-1.third-column:checked ~ .end,
.tic-tac-toe .player-1.first-row:checked ~ .player-1.first-row:checked ~ .player-1.first-row:checked ~ .end,
.tic-tac-toe .player-1.second-row:checked ~ .player-1.second-row:checked ~ .player-1.second-row:checked ~ .end,
.tic-tac-toe .player-1.third-row:checked ~ .player-1.third-row:checked ~ .player-1.third-row:checked ~ .end,
.tic-tac-toe .player-1.first-diagonal:checked ~ .player-1.first-diagonal:checked ~ .player-1.first-diagonal:checked ~ .end,
.tic-tac-toe .player-1.second-diagonal:checked ~ .player-1.second-diagonal:checked ~ .player-1.second-diagonal:checked ~ .end {
    display: block
}
.tic-tac-toe .player-1.first-column:checked ~ .player-1.first-column:checked ~ .player-1.first-column:checked ~ .end h3:before,
.tic-tac-toe .player-1.second-column:checked ~ .player-1.second-column:checked ~ .player-1.second-column:checked ~ .end h3:before,
.tic-tac-toe .player-1.third-column:checked ~ .player-1.third-column:checked ~ .player-1.third-column:checked ~ .end h3:before,
.tic-tac-toe .player-1.first-row:checked ~ .player-1.first-row:checked ~ .player-1.first-row:checked ~ .end h3:before,
.tic-tac-toe .player-1.second-row:checked ~ .player-1.second-row:checked ~ .player-1.second-row:checked ~ .end h3:before,
.tic-tac-toe .player-1.third-row:checked ~ .player-1.third-row:checked ~ .player-1.third-row:checked ~ .end h3:before,
.tic-tac-toe .player-1.first-diagonal:checked ~ .player-1.first-diagonal:checked ~ .player-1.first-diagonal:checked ~ .end h3:before,
.tic-tac-toe .player-1.second-diagonal:checked ~ .player-1.second-diagonal:checked ~ .player-1.second-diagonal:checked ~ .end h3:before {
    content: "Player 1 wins!" !important
}
```

+ TH player 2 win thì cũng như trên

```css
.tic-tac-toe .player-2.first-column:checked ~ .player-2.first-column:checked ~ .player-2.first-column:checked ~ .end,
.tic-tac-toe .player-2.second-column:checked ~ .player-2.second-column:checked ~ .player-2.second-column:checked ~ .end,
.tic-tac-toe .player-2.third-column:checked ~ .player-2.third-column:checked ~ .player-2.third-column:checked ~ .end,
.tic-tac-toe .player-2.first-row:checked ~ .player-2.first-row:checked ~ .player-2.first-row:checked ~ .end,
.tic-tac-toe .player-2.second-row:checked ~ .player-2.second-row:checked ~ .player-2.second-row:checked ~ .end,
.tic-tac-toe .player-2.third-row:checked ~ .player-2.third-row:checked ~ .player-2.third-row:checked ~ .end,
.tic-tac-toe .player-2.first-diagonal:checked ~ .player-2.first-diagonal:checked ~ .player-2.first-diagonal:checked ~ .end,
.tic-tac-toe .player-2.second-diagonal:checked ~ .player-2.second-diagonal:checked ~ .player-2.second-diagonal:checked ~ .end {
    display: block
}
.tic-tac-toe .player-2.first-column:checked ~ .player-2.first-column:checked ~ .player-2.first-column:checked ~ .end h3:before,
.tic-tac-toe .player-2.second-column:checked ~ .player-2.second-column:checked ~ .player-2.second-column:checked ~ .end h3:before,
.tic-tac-toe .player-2.third-column:checked ~ .player-2.third-column:checked ~ .player-2.third-column:checked ~ .end h3:before,
.tic-tac-toe .player-2.first-row:checked ~ .player-2.first-row:checked ~ .player-2.first-row:checked ~ .end h3:before,
.tic-tac-toe .player-2.second-row:checked ~ .player-2.second-row:checked ~ .player-2.second-row:checked ~ .end h3:before,
.tic-tac-toe .player-2.third-row:checked ~ .player-2.third-row:checked ~ .player-2.third-row:checked ~ .end h3:before,
.tic-tac-toe .player-2.first-diagonal:checked ~ .player-2.first-diagonal:checked ~ .player-2.first-diagonal:checked ~ .end h3:before,
.tic-tac-toe .player-2.second-diagonal:checked ~ .player-2.second-diagonal:checked ~ .player-2.second-diagonal:checked ~ .end h3:before {
    content: "Player 2 wins!" !important
}
```

HẾT!

## Kết
Như các bạn sẽ thấy, không dùng js thì hết game mà muốn restart thì chỉ có nước F5, mà cái công code thì cũng thở bằng tai rồi. Để vui chơi, lấy le với gái thì cũng được, hoặc ae nào có sở thích tự ngược thì ham thôi, tôi thì tại thấy hôm này vui quá nên làm cái này cho bớt vui chứ cũng không đam mê gì. Chúc ae tự ngược vui vẻ.