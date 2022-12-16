Xin chào các bạn, mình là 1 con mòe vui vẻ. Hôm nay rảnh rỗi nên mình ngồi vọc vạch code con game game khủng long chạy phiên bản pikachu với html5 canvas chỉ với... chưa đến 200 dòng code. 

Dành cho bạn nào chưa biết thì **canvas** là một phần tử của HTML5, được đẻ ra để thực hiện kết xuất đồ họa trên trang web. Các bạn có thể tham khảo các canvas API trên trang https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

Thôi, không câu giờ nữa, bắt tay vào làm thôi nào!

## 1. Đặt vấn đề
Bài toán của chúng ta là tạo ra 1 game khủng long chạy dựa theo game dino trên chrome mà chúng ta hay chơi khi mất mạng đó. Gameplay sẽ như sau: Chú khủng long sẽ chạy trên đường, các vật cản sẽ lần lượt hiện ra, nhiệm vụ của người chơi là ấn nút space trên bàn phím để giúp chú khủng long nhảy lên tránh các chướng ngại vật. Điểm số sẽ tăng dần theo thời gian chơi. Phiên chơi sẽ kết thúc khi khủng long chạm vào chướng ngại vật.

## 2. Bắt tay vào làm
###  2.1 Tạo game canvas
Đầu tiên, mình sẽ tạo một khung html cơ bản, sau đó thêm vào một thẻ canvas với chiều dài 1280px, chiều rộng 720px để đặt game bên trong, sau đó style lại một chút cho đẹp.
   ![](https://images.viblo.asia/bcc380c6-3f38-4e42-ace2-2cdac0b26abe.png)
### 2.2 Tạo các biến/hàm cơ bản
Sau khi tạo canvas cho game thì tiếp theo, mình sẽ khai báo các biến/hàm chung để sau này sử dụng trong game.
```
    const canvas = document.querySelector('canvas'); // Lấy thẻ canvas
    const ctx = canvas.getContext('2d'); // Lấy context 2d
    const game = {}; // Object này để chứa dữ liệu game
```
Mình sẽ nhóm một số nhóm code theo chức năng thành các hàm để sau này chỉ việc lôi ra dùng thôi, đỡ phải viết đi viết lại nhiều. Vì mình lười lắm.
   * Hàm createText để tạo text trên canvas với các tham số truyền vào là tọa độ x,y, style của text, căn chỉnh text, nội dung text
```
    function createText(x, y, style, align, content) {
      ctx.textAlign = align;
      ctx.font = style;
      ctx.fillText(content, x, y);
    }
```
   *  Hàm createImg để tạo một html image mới:
```
    function createImg(src) {
      const image = new Image();
      image.src = src;
      return image;
    }
```
   *  Hàm resizeCanvas để căn chỉnh canvas cho phù hợp với các kích cỡ màn hình khác nhau:
```
    function resizeCanvas() {
      if ((window.innerWidth / window.innerHeight) >= (1280 / 720)) {
        canvas.style.width = "";
        canvas.style.height = "100%";
      } else {
        canvas.style.width = "100%";
        canvas.style.height = "";
      }
    }
```
### 2.3 Tạo các đối tượng trong game:
Ok, xong các hàm cơ bản, tiếp theo chúng ta sẽ tạo các đối tượng trong game:

**1. Player (chính là con khủng long đó):**
```
    function Player(img, x, y, w, h) {
      this.img = createImg(img); // Ảnh của vật thể
      this.x = x; // Tọa độ x
      this.y = y; // Tọa độ y
      this.w = w; // Chiều rộng
      this.h = h; // Chiều cao
      this.maxJump = 500; // Độ cao nhảy tối đa
      this.jumpStatus = "None"; //Trạng thái nhảy

      this.update = () => {
        // Nếu trạng thái nhảy là up thì tăng tọa độ y
        if (this.jumpStatus === "Up") {
          this.y += 10;
          if (this.y >= this.maxJump) {
            this.y = this.maxJump;
            this.jumpStatus = "Down";
          }
        }
        // Nếu trạng thái nhảy là down thì giảm tọa độ y
        if (this.jumpStatus === "Down") {
          this.y -= 10;
          if (this.y <= 0) {
            this.y = 0
            this.jumpStatus = "None";
          }
        }
        // Vẽ ảnh trên canvas
        ctx.drawImage(this.img, this.x, 720 - this.y - this.h, this.w, this.h);
      }
    }
```
**2. các chướng ngại vật:**
```
    function Obstacle(img, x, y, w, h) {
      this.img = createImg(img);
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.active = true;

      this.update = () => {
        if (!this.active) return;
        // Chướng ngại vật sẽ di chuyển từ phải qua trái
        this.x -= 10;
        if (this.x <= -this.w) {
          this.active = false;
        }
        ctx.drawImage(this.img, this.x, 720 - this.y - this.h, this.w, this.h);
      }
    }
```
### 2.4 Game play:
- Khởi tạo game mới:
```
    function initGame() {
      // Ẩn nút chơi lại
      document.getElementById('play-again').style.display = "none";
      game.score = 0;
      game.startTime = new Date().getTime();
      // Tạo Player
      game.pikachu = new Player('https://media.discordapp.net/attachments/600891241185411082/875985072942120960/pikachu.png', 100, 0, 200, 200);
      // Danh sách các chướng ngại vật
      game.obstacles = [];
      // Mốc thời gian tạo chướng ngại vật tiếp theo
      game.nextObstacleTmp = new Date().getTime() + Math.floor(Math.random() * 2000) + 1000;
      // Xử lý sự kiên khi ấn phím cách thì nhảy lên
      window.onkeyup = function (e) {
        if (e.keyCode == 32) {
          if (game.pikachu.jumpStatus == "None")
            game.pikachu.jumpStatus = "Up";
        }
      }
      gameLoop();
    }
    initGame();
```
- Game loop: 
```
    function gameLoop() {
      resizeCanvas();
      // Xóa frame cũ
      ctx.clearRect(0, 0, 1280, 720);
      // Cập nhật điểm
      updateScore();
      // Tạo chướng ngại vật mới
      genObstacle();
      // Cập nhật vị trí khủng long
      game.pikachu.update();
      // Cập nhật vị trí các chướng ngại vật
      for (let i = 0; i < game.obstacles.length; i++) {
        game.obstacles[i].update();
        // Kiểm tra va chạm với khủng long, nếu va chạm thì game kết thúc
        if (checkCollision(game.obstacles[i], game.pikachu)) {
          createText(1280 / 2, 720 / 2, "40px Arial", "center", "GAME OVER");
          document.getElementById('play-again').style.display = "inline-block";
          return window.cancelAnimationFrame(gameLoop);
        }
      }
      window.requestAnimationFrame(gameLoop);
    }
```
Sinh chướng ngại vật mới:
```
    function genObstacle() {
      // Nếu chưa đến thời gian tạo chướng ngại vật mới thì return luôn
      if (game.nextObstacleTmp > new Date().getTime()) return;
      // Tạo sỗ ngẫu nhiên 0 hoặc 1
      const randomNum = Math.floor(Math.random() * 2);
      // Nếu số là 0 thì tạo pokeball
      if (randomNum == 0) {
        const newObstacles = new Obstacle('https://media.discordapp.net/attachments/600891241185411082/875985078428237874/pokeball.png', 1280, 0, 200, 200);
        game.obstacles.push(newObstacles);
      } else {
        // Nếu không thì tạo con Nyasu là Nyasu
        const newObstacles = new Obstacle('https://media.discordapp.net/attachments/600891241185411082/875985079883685918/nyasu.png', 1280, 0, 220, 275);
        game.obstacles.push(newObstacles);
      }
      // Cập nhật thời gian sinh chướng ngại vật tiếp theo
      game.nextObstacleTmp = new Date().getTime() + Math.floor(Math.random() * 2000) + 1000;
    }
```
- Cập nhật điểm: 
```
    function updateScore() {
      game.score = Math.floor((new Date().getTime() - game.startTime) / 100);
      createText(1280 - 50, 50, "28px Arial", "right", `Score: ${game.score}`);
    }
```
- Kiểm tra va chạm:
```
    function checkCollision(obj1, obj2) {
      if (obj1.x > obj2.x + obj2.w
        || obj1.x + obj1.w < obj2.x
        || obj1.y > obj2.y + obj2.h
        || obj1.y + obj1.h < obj2.y) {
        return false;
      } else {
        return true;
      }
    }
```
## 3. Thành quả:
Vậy là chỉ với html/css/js thuần, chúng ta đã tạo ra một game Pikachu chạy vô vùng đơn giản. Các bạn có thể xem source code và demo [tại đây](https://codepen.io/thanhpham99/pen/wvyjZmM) để tham khảo và tự tạo cho mình các game khác.
Chúc các bạn thành công.