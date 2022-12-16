# Giới Thiệu
Thực tế thì mình cũng chả phải là một lập trình viên chuyên game hay gì cả, chỉ là lần này mình có được nhận làm một project game ngắn hạn từ anh sếp và được recomend sử dụng Cocos Creator. Sau một thời gian không quá dài tiếp xúc với nó thì mình thấy nó cũng khá hay nên muốn chia sẻ cho mọi người về engine này

Theo như mình có được biết thì trước đây khi chưa có Cocos Creator thì mọi người vẫn sử dụng Cocos2d-x code bằng C++. Nhược điểm của thằng này là không có giao diện người lập trình phải tự tưởng tượng code và rồi chạy lên mới thấy được kết quả. Để khắc phục điều này, làm tăng hiệu suất và bắt kịp được với Unity, thì Cocos Creator đã được ra đời. Hiện tại thì thằng này chỉ hỗ trợ trên MAC và Window nên anh em nào dùng Ubuntu thì chắc sẽ hơi buồn.

Vậy Cocos2d-x là gì thì Cocos2d-x là 1 Engine hỗ trợ lập trình Game đa nền tảng : Mobile ( IOS, ANDROID, Blackberry, TIZEN, WP) Window, MacOS, HTML5,.. đại loại là đủ cả. Theo wikipedia thì tác giả của Cocos2d-x là một người trung quốc có tên là Zhe Wang.

![](https://images.viblo.asia/39d2e2a9-1a3f-4054-88ef-999c70931f59.png)

![](https://images.viblo.asia/1708063e-925d-41a0-8a44-59b2542f2db7.jpg)

<div  align="center"> 2012, at Zynga. With Rolando Abarca and Zhe Wang discussing Cocos2d-x’s and cocos2d-iphone’s roadmaps </div>

Hiện tại thì nó vẫn được những bạn láng giếng phát triển khá là mạnh và không ngừng hoàn thiện để trở thành Unity phiên bản free, nhưng chặng đường chắc vẫn còn khá dài.

# Thực Hành Tạo Và Deploy Game
Mình thì không thích dài dòng mà mình thấy các tốt nhất để học một cái gì là cứ cho vào làm luôn nó mới nhanh vỡ ra được, chứ cứ lý thuyết suông thì rất khó hình dung. 

![](https://images.viblo.asia/acf90149-7fcd-465f-a6de-e48090bf5921.png)

Đây là trang chủ để tải cocos creator : https://www.cocos.com/en/creator

Sau khi tải về và cài đặt (cài cái này khá là lâu nha) thì giao diện chính của creator sẽ như thế này

![](https://images.viblo.asia/ed4a22ca-d27e-4f53-aaa3-c06c69886824.png)

Giờ chúng ta sẽ đi luôn vào làm game đầu tiên như trong docs của cocos hướng dẫn. Dưới đây là nguồn assets làm game và game đã hoàn thành
+ Assets ban đầu : [Download the original project](https://github.com/cocos-creator/tutorial-first-game/releases/download/v2.0/start_project.zip)
+ Game đã hoàn thành : [Download the completed project](https://github.com/cocos-creator/tutorial-first-game/releases/download/v2.0/complete_project.zip)

### Assets
Sau khi tải Assets ban đầu về chúng ta sẽ import nó vào creator, rất đơn giản chỉ cần kéo thả vào thôi

![](https://images.viblo.asia/09e674de-539b-4efb-89b9-11b9b11b1ac3.png)

Phần Assets sẽ là nơi chứ các nguồn dữ liệu để ta dụng để  tạo hình 
![](https://images.viblo.asia/f634af1e-a914-46bf-b008-e7cf747a9b0b.png)

### Scene

Sau khi đã có Assets ta sẽ tạo các Scene. Scene là một bản bồ 2D và có thể mở chế độ 3D, giúp ta kéo tả, thay đổi tạo ra UI. Mỗi Scene sẽ là một màn hình kiểu như là trên web chúng ta sẽ có trang home, trang detail, trang about thì scene chính là các view đó. Ta có thể tạo nhiều scene và chuyển đổi giữa chúng trong game.

![](https://images.viblo.asia/ec5e4b2f-f24c-448c-b816-bd28ab7d0d8e.png)

Thêm khác thực thể vào Scene

![](https://images.viblo.asia/92360e29-9429-4b78-aba0-ee2d6c2fced6.png)

Ở đây ta có thể tùy kéo kéo chỉnh, thay đổi vị trí của các thực thể sao cho mình thấy ổn nhất. Có nhiều chế độ kéo thả

- Di chuyển theo chiều X - Y đầu tiên chọn bên góc trái ![](https://images.viblo.asia/bbf94ba7-4f7c-4f13-ae21-b3bbbdd670f8.png) sau đó có thể di chuyển vị trí của thực thể

![](https://images.viblo.asia/e42a0f6e-f17e-4688-ad78-2627fbb5a878.png)

- Thay đổi góc quay của thực thể. Chọn ![](https://images.viblo.asia/bbf94ba7-4f7c-4f13-ae21-b3bbbdd670f8.png) và ra scene thay đổi góc quay

![](https://images.viblo.asia/4acdc812-e0ab-4bb2-aed0-2c7bb8db6f40.png)

- Rsize kích thước thực thể chọn ![](https://images.viblo.asia/96470c5d-8ff7-485a-87c9-9d654d015093.png) và thay đổi kích thước

![](https://images.viblo.asia/08583c61-3214-441a-8458-1a9dbd24ecf5.png)

Ở trên scene ta chỉ cần nắm thế thôi là có thể kéo thả, thay đổi kích thước và dic chuyển khắp bản đồ

### Properties
Thì ngoài việc kéo thả ở scene chúng ta cũng có thể thay đổi vị trí, thay đổi độ trong suốt, thêm các script, thêm animation và rất nhiều thức khác ở trong phần này

![](https://images.viblo.asia/ddf04d3b-e582-4dbc-8bc0-b44ae34b18b9.png)

- Position chính là vị trí của thực thể đó trên scene tính theo trục tọa đọ X-Y
- Rotaion là góc nghiêng 
- Scale là kiểu phóng to theo 2 chiều x hoặc y
- Anchor là để thay đổi vị trí của thực thể so với gốc tọa độ của chính nó
- Size chính là thay đổi kích thước width-Height của thực thể
- Color là màu của thực thể
- Opacity độ trong suốt
- ...

### Node Tree 
Đây khi khu vực để ta xác định được đâu là thành phần cha con của nhau hoặc thằng nào ở lớp trên, thằng nào ở lớp dưới. 

![](https://images.viblo.asia/689c4517-d523-446d-8299-c816776caf6c.png)

![](https://images.viblo.asia/82b2fc37-6aa9-4616-882d-51ab7843c1fc.png)

thằng nào càng ở dưới tức là nó đang trên lớp cao nhất. Kiểu như ở trong css có thuộc tính z-index khi ta sử dụng position vậy. Càng ở dưới thì z-index càng cao và có thể che lớp thằng kia. Giống như cái ground đang che đi cả thằng PurpleMonster.

### Timeline
phần này dùng để tạo ra các animation đơn giảm chị cần thay đổi góc nghiêng hay thay đổi vị trí của thực thể. Đây là ví dụ về 1 animation nhảy

![](https://images.viblo.asia/97d6710c-33d1-4669-9ffd-6537a3594a40.gif)

![](https://images.viblo.asia/f4114d38-4c56-4781-9ce9-a0875dec1929.gif)



### Tạo Hình Và Bắt Sự Kiện Cho Nhân Vật
Bây giờ sau khi đã hiểu hết các phần và chức năng của nó chúng ta sẽ đi vào làm game đầu tiên nha

- Đầu tiên chúng ta cần kéo các thành phần của game vào để có một cái UI tổng quát 
![](https://images.viblo.asia/628aecf5-6a20-4906-b170-61ca6c538072.png)

- Sau khi sử dụng hết các kiến thức ở trên để kéo thả ra một UI như trong hình, thì bây giờ công việc cần làm là add thêm các script để bắt sự kiện trong game. Tạo một folder `scripts` --> và new một file `Player.js`.

Tạo folder

![](https://images.viblo.asia/61c44db5-251a-418a-a6b6-0ba0dce9a52b.png)
 
 Tạo file js
![](https://images.viblo.asia/00d3a68f-f94e-42f4-8de5-0a3992e54659.png)

- Click double vào file `Player` ta sẽ thấy một khung js có sẵn 

```js
 // Player.js
 
    cc.Class({
        extends: cc.Component,

        properties: {
            // foo: {
            //     // ATTRIBUTES:
            //     default: null,        // The default value will be used only when the component attaching
            //                           // to a node for the first time
            //     type: cc.SpriteFrame, // optional, default is typeof default
            //     serializable: true,   // optional, default is true
            // },
            // bar: {
            //     get () {
            //         return this._bar;
            //     },
            //     set (value) {
            //         this._bar = value;
            //     }
            // },
        },

        // LIFE-CYCLE CALLBACKS:

        // onLoad () {},

        start () {

        },

        // update (dt) {},
    });
```

- Giờ thêm các properties

```js
 // Player.js
 
        //...
        properties: {
            // main character's jump height
            jumpHeight: 0,
            // main character's jump duration
            jumpDuration: 0,
            // maximal movement speed
            maxMoveSpeed: 0,
            // acceleration
            accel: 0,
        },
        //...
```

- Tiếp đến ta sẽ gắn js này cho thằng thực thể `PurpleMonster` để lát nữa sẽ xử lý sự kiện trong file js này. Quay về màn hình vào phần `Node Tree` nãy mình đã nói, chọn thực thể `PurpleMonster` sau đó để ý sang phần `properties` của nó. Ta sẽ xuống button `Add Component` chọn `Custom component`  và chọn `Player`

![](https://images.viblo.asia/04c3b86e-c142-4df7-ac2a-9fc879315157.png)

- Sau khi đã add được js vào trong nó sẽ hiện ra các thuộc tính ta vừa định nghĩa trong file `Player` ở trên và ta sẽ điền các thông số vào đây.

![](https://images.viblo.asia/469a58f9-c8fe-4660-a929-55008162b5f3.png)

- Bây giờ ta sẽ viết một cái hàm nhảy cho thằng này

```js
 // Player.js
 
        properties: {
            //...
        },

        setJumpAction: function () {
            // jump up
            var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
            // jump down
            var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
            //  repeat
            return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
        },
```

- Sau khi đã có hàm nhảy rồi ta sẽ set hàm đó vào `onLoad()`. Điều này có tác dụng là nó sẽ chạy ngay sau khi thực thể lại được load ra

```js
// Player.js

        onLoad: function () {
            // initialize jump action
            this.jumpAction = this.setJumpAction();
            this.node.runAction(this.jumpAction);
        },
```

- Ok test xem chạy không nha. Chọn vào nút ![](https://images.viblo.asia/67215cf5-c958-44de-aee6-358b9573d9ba.png) ở trên cùng giữa màn hình

![](https://images.viblo.asia/8130902d-ef8b-41ad-b676-c7a4297a412a.gif)

`cc.repeatForever` sẽ giúp hành động xảy ra lặp lại mãi mãi. `cc.sequence` thực hiện hành động tuần tự. `jumpUp, jumpDown` là nhảy lên và nhảy xuống --> cứ như vậy `cc.repeatForever(cc.sequence(jumpUp, jumpDown))` sẽ làm `PurpleMonster` nhảy mãi mãi và hàm được để ở `onLoad()` nên hàm sẽ được chạy ngay sau khi khi thực thể được load.

- Đã tạo được hàm nhảy, tiếp đến chúng ta sẽ tạo hành động di chuyển sang trái,  sang phải cho nhân vật. 

```js
// Player.js

        setJumpAction: function () {
            //...
        },

        onKeyDown (event) {
            // set a flag when key pressed
            switch(event.keyCode) {
                case cc.macro.KEY.a:
                    this.accLeft = true;
                    break;
                case cc.macro.KEY.d:
                    this.accRight = true;
                    break;
            }
        },

        onKeyUp (event) {
            // unset a flag when key released
            switch(event.keyCode) {
                case cc.macro.KEY.a:
                    this.accLeft = false;
                    break;
                case cc.macro.KEY.d:
                    this.accRight = false;
                    break;
            }
        },
```


`onKeyDown` là khi ta nhấm phím, còn`onKeyUp` là khi ta nhả phím ra. Sẽ có 1 switch ở trong để kiểm tra xem ta bấm phím nào ở keydown và nhả phím nào ở keyup. Sau đó set hướng cho nó ở keydown cho hướng đấy thành `true` và khi nhả phím thì set lại thành `false` chỉ đơn giản vậy thôi.

- Nhưng bận muốn game nhận được ác hiệu lệnh đó của mình thì bạn cần khởi tạo bàn phím bằng cách như sau

```js
// Player.js

        onLoad: function () {
            // Initialize the jump action
            this.jumpAction = this.setJumpAction();
            this.node.runAction(this.jumpAction);

            // Acceleration direction switch
            this.accLeft = false;
            this.accRight = false;
            // The main character's current horizontal velocity
            this.xSpeed = 0;

            // Initialize the keyboard input listening
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   
        },

        onDestroy () {
            // Cancel keyboard input monitoring
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        },
```

Khởi tạo lắng nghe bàn phím khi load và hủy lắng nghe khi thực thể đó bị phá hủy

- Cuối cùng là phần cập nhật vị trí của nhân vật khi ta bấm nút

```js
// Player.js

        update: function (dt) {
            // update speed of each frame according to the current acceleration direction
            if (this.accLeft) {
                this.xSpeed -= this.accel * dt;
            } else if (this.accRight) {
                this.xSpeed += this.accel * dt;
            }
            // restrict the movement speed of the main character to the maximum movement speed
            if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
                // if speed reach limit, use max speed with current direction
                this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
            }

            // update the position of the main character according to the current speed
            this.node.x += this.xSpeed * dt;
        },
```

Mình đã thử test thì thấy thằng `update()` này cứ 0,01 giây nó sẽ  gọi một lần
```js
      update(dt) {
        console.log("Run in function update() time : ", dt);
      }
```

![](https://images.viblo.asia/76cac5d6-a6a6-47db-a575-30dd544bcecf.png)
Tức là nó sẽ gọi hàm gần như liên  tục

```js
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
```
Phần này sẽ kiểm tra xem người dùng đang bắt nhân vật chạy về hướng nào. Sau đó sẽ thay đổi vị trí nhân vật theo hướng đó bằng cách trừ hay công tọa đọ X với một tốc độ tăng theo thời gian. Nhưng để phòng trường hợp tăng tốc độ quá nhanh thì một phần giới hạn tốc độ được thiết lập ở ngay phía dưới.

```js
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
```
Phần cuối của hàm l à set vị trí cho nhân vật

```js
        this.node.x += this.xSpeed * dt;
```

### Tạo Hình Và Bắt Sự Kiện Cho Ngôi Sao

Sau khi đã thực hiện xong cho nhân vật tiếp đến chúng ta sẽ thực hiện cho ngôi sao. Do ngôi sao sẽ xuất hiện và mất đi khi nhân vật chạm tới nó. Tức là nó sẽ được tạo ra và phá hủy đi liên lục do vậy ở đây ta sẽ động chạm đến một khái niệm `Prefab`. Prefab là những node những thực thể ta đã tạo ra nhưng cần sử dụng đi sử dụng lại nhiều lần, nó giống như khái niệm component ở trong các framework React hay Vue vậy.

- Thì bây giờ ta sẽ tạo ra các Prefab như vậy bằng cách kéo ngôi sao vào Scene và tạo một file script rồi add vào cho nó.

![](https://images.viblo.asia/7e60ad8f-ed00-4ee8-92ea-f2f030b5edf6.png)

```js
// Star.js

    properties: {
        // When the distance between the star and main character is less than this value, collection of the point will be completed
        pickRadius: 0,
    },
```

![](https://images.viblo.asia/6f920cdb-d128-4886-9201-b35f583a56f3.png)

Rồi sau khi đã add script cho nó ta biến nó thành 1 một Prefab bằng cách. Kéo nó từ Scene xuống ô Assets vậy là xong

![](https://images.viblo.asia/325ce07d-f7dd-4026-b31b-db83b16b6f6a.gif)


![](https://images.viblo.asia/713a6c73-f94d-4d41-a725-93e77dedbec6.png)

- Tiếp đến là tạo sự kiện để set vị trí cho ngôi sao khi nó xuất hiện. Tạo một file `Game.js`

```js
// Game.js
    
        properties: {
            // this property quotes the PreFab resource of stars
            starPrefab: {
                default: null,
                type: cc.Prefab
            },
            // the random scale of disappearing time for stars
            maxStarDuration: 0,
            minStarDuration: 0,
            // ground node for confirming the height of the generated star's position
            ground: {
                default: null,
                type: cc.Node
            },
            // player node for obtaining the jump height of the main character and controlling the movement switch of the main character
            player: {
                default: null,
                type: cc.Node
            }
        },
```

`starPrefab` ta để type là Prefab. bây giờ add script này cho thằng `Canvas` kéo lên phần `Node Tree`  --> chọn `Canvas`  --> rồi  `Properties` chọn `Add Component` và chọn file script `Game`

- Rồi giờ đến phần Generate sao bằng cách random vị trí 

```js
// Game.js

        onLoad: function () {
            // obtain the anchor point of ground level on the y axis
            this.groundY = this.ground.y + this.ground.height/2; // this.ground.top may also work
            // generate a new star
            this.spawnNewStar();
        },

        spawnNewStar: function() {
            // generate a new node in the scene with a preset template
            var newStar = cc.instantiate(this.starPrefab);
            // put the newly added node under the Canvas node
            this.node.addChild(newStar);
            // set up a random position for the star
            newStar.setPosition(this.getNewStarPosition());
        },

        getNewStarPosition: function () {
            var randX = 0;
            // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
            var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
            // according to the width of the screen, randomly obtain an anchor point of star on the x axis
            var maxX = this.node.width/2;
            randX = (Math.random() - 0.5) * 2 * maxX;
            // return to the anchor point of the star
            return cc.v2(randX, randY);
        },
```

Test nào

![](https://images.viblo.asia/b56f05da-27b8-4387-8ac1-ea3d0a36092b.gif)

- Rồi giờ gắn sao vào với tổng thể game 
```js
// Game.js

        spawnNewStar: function() {
            // ...
            // Staging a reference of Game object on a star component
            newStar.getComponent('Star').game = this;
        },
```

```js
// Star.js

        getPlayerDistance: function () {
            // judge the distance according to the position of the player node
            var playerPos = this.game.player.getPosition();
            // calculate the distance between two nodes according to their positions
            var dist = this.node.position.sub(playerPos).mag();
            return dist;
        },

        onPicked: function() {
            // When the stars are being collected, invoke the interface in the Game script to generate a new star
            this.game.spawnNewStar();
            // then destroy the current star's node
            this.node.destroy();
        }, 
        
        update: function (dt) {
        // judge if the distance between the star and main character is less than the collecting distance for each frame
        if (this.getPlayerDistance() < this.pickRadius) {
            // invoke collecting behavior
            this.onPicked();
            return;
        }
    },
```

### Add score

Điểm sẽ bắt đầu từ 0 khi trò chơi bắt đầu. 1 điểm sẽ được thêm khi 1 sao được thu thập. Để hiển thị điểm số, trước tiên chúng ta nên tạo một node **Label**. Chọn `Canvas` trong  **Node Tree** , nhấp chuột phải và chọn `Create -> Create Renderer Nodes -> Node With Label`. Một node label mới sẽ được tạo dưới node `Canvas`. Tiếp theo, chúng tôi sẽ sử dụng các bước sau để thiết lập node label này:

1. Thay đổi tên node thành `score`
2. Chọn node `score` và thiết lập `position` thành `(0, 180)`
3. Chỉnh sửa thuộc tính `String` thành `Score: 0`
4. Đặt `Font Size` là `50`
5. Kéo `assets/mikado_outline_shadow`(chú ý! Biểu tượng là ![](https://images.viblo.asia/792f4115-ec41-4b62-902d-221ab44ee2bf.png))  vào thuộc tính `Font` của **Label**

![](https://images.viblo.asia/8e463323-842b-4948-ac68-d2fd97fe6c07.png)

### Thêm logic ghi điểm vào script Game

```js
// Game.js

    properties: {
        // ...
        // reference of score label
        scoreDisplay: {
            default: null,
            type: cc.Label
        }
    },
```
Tiếp đến là khởi tạo điểm trong `onLoad()`

```js
// Game.js

    onLoad: function () {
        // ...
        // initialize scoring
        this.score = 0;
    },
```
Sau đó thêm một phương thức mới được đặt tên `gainScore` :

```js
// Game.js

    gainScore: function () {
        this.score += 1;
        // update the words of the scoreDisplay Label
        this.scoreDisplay.string = 'Score: ' + this.score;
    },
```

### Invoke ghi điểm của trò chơi trong Star

```js
// Star.js

    onPicked: function() {
        // when the stars are being collected, invoke the interface in the Game script to generate a new star
        this.game.spawnNewStar();
        // invoke the scoring method of the Game script
        this.game.gainScore();
        // then destroy the current star's node
        this.node.destroy();
    },
```
### Kéo các thành phần vào logic game
Chọn `Canvas` nhìn sang `Properties` và để ý phần `Game` sẽ có các trường nhu sau

![](https://images.viblo.asia/794a92ea-6ca5-4c39-9f76-cc6bf3b2ca45.png)

Đây chính là các properties ta đã định nghĩa trong file `Game.js`. Tiếp theo ta cần kéo các thành phần cần thiết vào đây.

![](https://images.viblo.asia/3a6f9ae2-c039-407a-a144-08adb9428db3.gif)

Sau khi đã kéo các thành phần vào properties thì ta cần xóa node `star` trên **Node Tree** đi. Vì về sau ta sẽ generate các star bằng Prefab nên thằng node này sẽ không cần thiết nữa. Nếu không xóa đi nó sẽ bị hiện tượng lúc nào cũng có 2 ngôi sao và một ngôi sao không bao giờ biến mất như thế này. À tiện thể test xem kết quả luôn nhá

![](https://images.viblo.asia/af8b20d2-6188-4451-944c-349fd7743331.gif)

Xóa node `star` đi

![](https://images.viblo.asia/64dda21a-ee56-4242-9ca7-e5b603c0521a.png)

Kết quả đã ok




### Game Over
Ta sẽ thiết lập thời gian xuất hiện của ngôi sao để làm sao từ khi ngôi sao được xuất hiện mà `60s` sau chẳng hạn, mà nó không được thu thập thì sẽ `game over`.  Vây đầu tiên cần thêm biến đếm thời gian 

```js
// Game.js

    onLoad: function () {
        // ...
        // initialize timer
        this.timer = 0;
        this.starDuration = 0;
        // generate a new star
        this.spawnNewStar();
        // initialize scoring
        this.score = 0;
    },
```

Sau đó thêm logic đặt lại bộ định thời vào cuối `spawnNewStar` phương thức, trong đó `this.minStarDuration` và `this.maxStarDuration` là các thuộc tính của `Game` được khai báo ở đầu. Chúng được sử dụng để quy định tỷ lệ ngẫu nhiên của thời gian sao:

```js
// Game.js

    spawnNewStar: function() {
        // ...
        // reset timer, randomly choose a value according the scale of star duration
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },
```

Thêm logic cập nhật bộ đếm thời gian và phán đoán vượt quá thời lượng cho phương thức `update`:

```js
// Game.js

    update: function (dt) {
        // update timer for each frame, when a new star is not generated after exceeding duration
        // invoke the logic of game failure
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
```

Cuối cùng, thêm phương thức `gameOver` 

```js
// Game.js

    gameOver: function () {
        this.player.stopAllActions(); //stop the jumping action of the player node
        cc.director.loadScene('game');
    }
```

Để người chơi biết rằng ngồi sao sắp biến mất ta cần có cho nó một hiệu ứng bằng cách giảm `opacity` của nó xuống làm nó mờ dần đi.

```js
// Star.js

    update: function() {
        // ...
        // update the transparency of the star according to the timer in the Game script
        var opacityRatio = 1 - this.game.timer/this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
```

### Thêm hiệu ứng âm thanh cho Player
Game mà im lặng thì rất khô khan, bây giờ chúng ta sẽ thêm cho nó hiệu ứng âm thanh khi nó thực hiện các hành động.

- Đầu tiên, thêm hiệu ứng âm thanh nhảy. Mở `Player.js` và thêm thuộc tính tham `jumpAudio`

```js
// Player.js

    properties: {
        // ...
        // jumping sound effect resource
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
    },
```

Sau đó viết lại phương thức `setJumpAction`  chèn cuộc gọi lại để phát hiệu ứng âm thanh và phát âm thanh bằng cách thêm phương thức `playJumpSound` 

```js
// Player.js

    setJumpAction: function () {
        // jump up
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // jump down
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // add a callback function to invoke other defined methods after the action is finished
        var callback = cc.callFunc(this.playJumpSound, this);
        // repeat unceasingly, and invoke callback to play sound after landing each time
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },

    playJumpSound: function () {
        // invoke sound engine to play the sound
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
```

### Hiệu ứng âm thanh khi ghi điểm
Thêm thuộc tính âm thanh ghi điểm vào `Game.js`
```js
// Game.js

    properties: {
        // ...
        // scoring sound effect resource
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }
    },
```

Sau đó chèn vào phương thức `gainScore` 

```js
// Game.js

    gainScore: function () {
        this.score += 1;
        // update the words of the scoreDisplay Label
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        // play the scoring sound effect
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
```
Tiếp đến làm tương tự như kéo cá thành phần, giờ  ta sẽ kéo các file audio vào ô thuộc tính tương ứng.

![](https://images.viblo.asia/74db4e93-2309-4cd1-9b76-e028e59d82f1.gif)


![](https://images.viblo.asia/7d11a2ba-4157-49fd-a978-d94a5216ab11.png)

![](https://images.viblo.asia/2deab677-5da6-43e3-8251-8c4396cfa5b9.png)

Đã hoàn tất giờ chúng ta thử trả nghiệm thôi

# Build và Deploy
### Build
Phần **Build** của nó rất đơn giản. Chọn **Project** -> chọn **Build**

![](https://images.viblo.asia/4fff62e4-0a0a-4163-9d1f-947f77ee09b6.png)

Tiếp đén chọn **Build** và chờ thanh **Build...** hiện conpleted là được

![](https://images.viblo.asia/a9a84194-006e-47a8-8d68-e10bf2950883.png)

![](https://images.viblo.asia/7e58fa2b-1bdd-48de-bc9c-1c0fd2bfa2e0.png)

Vậy là đã build xong giờ có thể test kết quả build bằng cách chọn **Play**

### Deploy
Để đơn giản hóa việc deploy chúng ta sẽ sử dụng **surge**: https://surge.sh/

![](https://images.viblo.asia/a6c7bce1-f64d-483c-9675-27e7d2e9d772.png)

- insttall rất đơn giản

```shell
    npm install --global surge
```

sau khi đã cài đặt ta sẽ vào thư mục mà vừa nãy ta build ra và mở terminal 
![](https://images.viblo.asia/2ea75f8a-6328-4d2e-afb9-c902deef347c.png)

Chạy lệnh `surge`

![](https://images.viblo.asia/269fbe19-4941-4866-857c-792f238a11f4.png)

Sau đó thiết lập tên domain là xong

![](https://images.viblo.asia/f5de44ae-84b1-4be5-bc2c-f4a1b663f023.png)

Và đây là kết quả :
http://gamestar.surge.sh/

# Tổng kết 
Đến đây chắc hẳn mọi người đã biết cách làm sao để làm những game đơn giản với Cocos Creator rồi. Còn nếu muốn tạo những game phức tạp hơn thì cần phải đọc docs và tham khảo từ những sản phẩm đi trước rất nhiều nữa. Cảm ơn các bạn đã quan tâm đến bàì viết, rất vui và hẹn gặp lại ở những bài viết tiếp theo.

Nếu các bạn có hứng thú với game socket có thể tham khảo game mà mình và bạn trong team đã làm. Nó có tích hợp sử dụng cả websocket để chơi và blockchain để lưu kết quả nên, tuy hơi sơ sài nhưng chắc là sẽ giúp được ai đó nếu cần. Và đặc biệt là thằng này chưa hỗ chợ SocketIO nếu muốn tích hợp sẽ khá khó khăn theo như docs của nó có nói vậy, nên mình đành ngậm ngùi sử dụng Websocket. Đây là link game và cần có ví **[metamask](https://metamask.io)** mới chơi được nha:
https://github.com/ngovannghia1997kma/HeadBall2

![](https://images.viblo.asia/891b0485-f9ea-427c-a789-48342b9365b4.png)



##### Nguồn:
https://docs.cocos2d-x.org/creator/manual/en/