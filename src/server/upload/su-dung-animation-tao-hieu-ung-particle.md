![](https://images.viblo.asia/e903df3d-0afa-440b-85ec-1eaf477dd3c1.gif)

Để cho demo được đơn giản hóa hết sức có thể thì mình sẽ chỉ sử dụng duy nhất 1 element button cơ bản của HTML nhé :D
```html
<button id="button">Click on me</button>
```

Phần CSS sẽ chỉ tập trung chủ yếu vào mục đích animation thôi nên mình chỉ làm tối giản hết sức có thể
```css
particle {
  /*Set vị trí cố định cho particle, không ảnh hưởng bời vị trí của bố cục web*/
  position: fixed;
  top: 0;
  left: 0;
  
  /*Bo tròn particle*/
  border-radius: 50%;
  
  /*Tránh các thao tác của user lên các particle*/
  pointer-events: none;
  
  /*Cho ẩn particle khi chưa bắt đầu animation*/
  opacity: 0;
}
```

Về phần quan trọng nhất, để tạo animation thì mình sẽ sử dụng file JS và chia các công đoạn thực hiện thành 5 bước:
1. Với mỗi click event của button sẽ gọi tới function xử lý
2. Tạo 30 particle element và chèn chúng vào body
3. Tạo ngẫu nhiên các giá trị width, height, và background color cho 30 particle element trên
4. Animate cho từng particle element 
5. Xóa particle element ra khỏi body sau khi kết thúc animation

## Bước 1: Click event

```js
// Thêm event listener cho button, mỗi lần click sẽ gọi tới function pop()
document.querySelector('#button').addEventListener('click', pop);
```

## Bước 2: Tạo 30 particle

```js
function pop(e) {
  // Tạo 30 particle qua vòng loop
  for (let i = 0; i < 30; i++) {
    createParticle(e.clientX, e.clientY);
  }
}
function createParticle(x, y) {
  // Chèn các particle element được tạo vào body
  const particle = document.createElement('particle');
  document.body.appendChild(particle);
}
```

## Bước 3: Tạo width, height and background

```js
function createParticle (x, y) {
  // [...]
  // Set ngẫu nhiên kích thước cho particle từ 5px đến 25px
  const size = Math.floor(Math.random() * 20 + 5);
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  // Set ngẫu nhiên giá trị màu background theo dải màu xanh/tím
  particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
}
```

## Bước 4: Animation

```js
function createParticle (x, y) {
  // [...]
  // Tạo ngẫu nhiên tọa độ (x,y) với khoảng cách 75px so với tọa độ của con trỏ chuột
  // Mình dùng (Math.random() - 0.5) để cho phép cả giá trị âm, từ đó có thể tạo particle theo cả 4 hướng
  const destinationX = x + (Math.random() - 0.5) * 2 * 75;
  const destinationY = y + (Math.random() - 0.5) * 2 * 75;

  // Animate particle
  const animation = particle.animate([
    {
      // Frame bắt đầu: vị trí hiển thị của particle sẽ xung quanh vị trí con trỏ chuột
      transform: `translate(${x - (size / 2)}px, ${y - (size / 2)}px)`,
      // Bắt đầu hiển thị particle
      opacity: 1
    },
    {
      // Frame kết thúc: dời vị trí hiển thị của particle ra xa 75x
      transform: `translate(${destinationX}px, ${destinationY}px)`,
      // Cho ẩn particle sau khi kết thúc
      opacity: 0
    }
  ], {
    // Set ngẫu nhiên duration của animation từ 0.5-1.5s
    duration: 500 + Math.random() * 1000,
    // Tạo độ mượt (không quá cứng nhắc) cho animation
    easing: 'cubic-bezier(0, .9, .57, 1)',
    // Set animation delay từ 0-0.2s để tạo độ trễ giữa các particle
    delay: Math.random() * 200
  });
}
```

## Bước 5: Dọn rác khi kết thúc
```js
function createParticle (x, y) {
  // [...]
  // Xóa particle element sau khi đã kết thúc animation ra khỏi DOM
  animation.onfinish = () => {
    particle.remove();
  };
}
```
Với việc mỗi khi click lại tạo mới tới 30 element 1 lúc dẫn tới chiếm bộ nhớ của browser vì các particle chỉ mới bị ẩn đi sau khi spam click. Nên để khắc phục thì sau khi sử dụng các element đó xong xuôi thì mình chỉ việc remove nó ra khỏi DOM là hoàn tất.