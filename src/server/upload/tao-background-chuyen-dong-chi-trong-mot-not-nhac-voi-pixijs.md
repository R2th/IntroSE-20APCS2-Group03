Để làm một hay một chuỗi slider ảnh chuyển động không có gì đáng nói khi có quá nhiều thư viện hỗ trợ sẵn các kiểu slider rồi, nhưng hôm nay mình xin giới thiệu một thư viện có thể làm một hay một chuỗi anh chuyển động chỉ trong một nốt nhạc

Nó là ai, chính là [PixiJS](https://www.pixijs.com/). Nó làm được gì như thế nào thì các bạn có thể tự tìm hiểu nhé. Hiểu nôm na nó là một công nghệ `The HTML5 Creation Engine`.

Dựa trên nền tảng html5 và `2D WebGL renderer`. Cho phép chúng ta tạo ra các chuyển động cực kì nhanh và mượt mà.

Vì chỉ là 2D, nên việc xử lí cũng rất đơn giản. Khi làm việc với `PixiJS` chúng ta như được quay trở về quá khứ tuổi thơ.

Với những tính toán toạ độ x,y của những trục tung và trục hoành. Hẳn ai còn nhớ :joy::joy::joy:

Bây giờ mình xin lấy một ví dụ cực kì đơn giản, làm sao tạo ra một background chuyển động với `PixiJS`

Đầu tiên bạn phải tìm hiểu khái niệm `Application`,  chính nó là cốt lõi cái core của tất cả mọi thứ

Để khai báo `Application` đơn giản xem ví dụ sau 

```js
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    transparent: false,
    backgroundColor: 0x000000,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
});
```

Đầu vào quan trọng là truyền vào width, hieght. Nếu để như này không hiển thị đc cái gì đâu các bạn nhé, như giới thiệu ngay trang chủ của `PixiJS`

chúng còn phải render mà, để render thì đơn giản `app.view` là xong, chúng ta append vào body đơn giản như sau

```js
document.body.appendChild(app.view);
```

Nếu để này chạy thì đương nhiên chúng ta chỉ nhìn thấy một backgroud đen sì :laughing::laughing::laughing:

Tiếp theo chúng ta bắt đầu thêm ảnh vào nào, mình sẽ lấy ngẫu nhiên một ảnh trên mạng nhé :heart_eyes:

Để biến một image url thành một đối tượng trong Pixi chúng ta sử dụng đối tượng `Texture` ví dụ 

```js
 const url = PIXI.Texture.from('http://i293.photobucket.com/albums/mm54/byutatortot/Blog%20Designs/Backgrounds/ButterflyBeauty-1.png')
```

sau đó chúng ta add chúng vào `TilingSprite`, nó là gì thì các bạn tự tìm hiểu nhé 

```js
const tiling = new PIXI.TilingSprite(url, window.innerWidth, window.innerHeight);
app.stage.addChild(tiling);
```

Đến đây chúng ta đã đưa một đối tượng ảnh từ url vào trong `PixiJS` rồi các bạn mình nhé :heart_eyes::heart_eyes::heart_eyes::heart_eyes:

Bây giờ sao mà chuyển động được đây :rofl:

Lưu ý, bạn có thể tạo ra nhiều đối tượng khác nữa nhưng nhớ là phải `addChild` chúng vào `app` nhé đừng quên.

Đơn giản lắm mà, trong `PixiJS` một thứ magic nó sẽ điều khiển một hoạt động liên quan đến animation là `ticker` với 1 dòng code đơn giản sau chúng ta đã làm cho một image chuyển động dễ dàng rồi 

```js
app.ticker.add(() => {
   tiling.tilePosition.x -= 1;
})
```

vì là 2D nên chỉ có x,y thôi, bạn muốn chuyển động theo trục nào thì chỉnh trục đó, mình thích x nên chỉnh x :laughing::laughing::laughing:

Kết quả cuối cùng đây các bạn xem trên [codepend](https://codepen.io/cuongnp1646/pen/bGEqxaW?editors=1011&__cf_chl_jschl_tk__=9337b71dc26c340e621f8ed800cdae8ac87fc26b-1592821206-0-ASj_1LyuH1cyoucznSdaTOZVMIOX_UXKl-yorBM7QUT2LbGx0iQMAT0FvGPqsW4FRg22qtQBehUWM3Vc30lPwVfKQ5WBTU1tbxJhlr6UYVdcmvqT1B1NmDrr1UoJZmqrB42oMnq5NhPdjOJwycUNytRjNtwuQcPWspTXdG45fXELnPyib5dOEklaovdPD-vS1QABldSgYGdMAfiZ87igdb5TtnltE_tic9k9eDtAnCfLqKWvqWI0EIYVf5MJlhLfLaIrem8OsZhqHgrr7uXfNacK_bDBZlsgJ0NxmGFr-b7X1rgbPmaa80WXBTdf-OiE6efK8IFau8A_iVFCva2zBTtAJMeXwRgBRrrGnL-fi-a2Gi_BZ-WSggy3yEzqCTO3Tw) của mình nhé

Hi vọng bài viết giúp các bạn học thêm được một kiến thức mới về `PixiJS`