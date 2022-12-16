Mặc dù app Facebook và Messenger tệ thật, nhưng mà nó lại có mấy cái sticker cute cực í 🤪.
Nhưng bạn thử tải về mà xem, không có cách nào download về dưới dạng file gif cả 🤔.
Dù sao thì nó cũng hiện ra rồi, kiểu gì chả có cách tải về.
Thử inspect element xem, chúng ta sẽ thấy nó hiện hình là 1 cái spritesheet được set thành `background-image` và dùng `background-position` để thay đổi khung hình.

![animate-spritesheet](https://images.viblo.asia/94f9a6cb-a3fe-485d-a436-34839c10ee39.gif)

Đây là cái spritesheet nhé.

![tonton-inspect](https://scontent.fhan5-7.fna.fbcdn.net/v/t39.1997-6/72568563_526222821444483_279572336263299072_n.png?_nc_cat=100&_nc_sid=0572db&_nc_oc=AQlkAKjDakbfs1blUQC66vLLLnC5bCz1Eh6KJf_9JCgjaxqJ4kO1GhPF-CAkq3MZqGX5m_ar6Gu7tbuCFn06FXnA&_nc_ht=scontent.fhan5-7.fna&oh=fff5b86d6e73bd2c11d359b4f5b63b96&oe=5EE5DA80)

Vậy giờ chúng ta sẽ làm như này:

1. Lấy các khung hình từ spritesheet
2. Ghép lại thành file `gif`

## Tách các khung hình từ spritesheet

Nhìn cái spritesheet trên kia bạn có thể thấy nó có 8 khung hình, mỗi cái kích thước `288px * 288px`.
Bạn có thể tự đem cắt ra bằng tay bằng app nào đó. Hoặc là chúng ta sẽ viết script để tự cắt ra.
Chúng ta sẽ dùng Canvas API để render các khung hình từ spritesheet.

Giả sử chúng ta có spritesheet được load trong page như này

```html
<img id="spritesheet" src="https://scontent.fhan5-7.fna.fbcdn.net/v/t39.1997-6/72568563_526222821444483_279572336263299072_n.png?_nc_cat=100&_nc_sid=0572db&_nc_oc=AQlkAKjDakbfs1blUQC66vLLLnC5bCz1Eh6KJf_9JCgjaxqJ4kO1GhPF-CAkq3MZqGX5m_ar6Gu7tbuCFn06FXnA&_nc_ht=scontent.fhan5-7.fna&oh=fff5b86d6e73bd2c11d359b4f5b63b96&oe=5EE5DA80">
```

Để cắt ra mỗi frame, chúng ta sẽ tạo 1 canvas với kích thước `288px * 288px` và render phần tương ứng trên sprite sheet lên canvas đó.
Ví dụ để cắt khung hình đâu tiên thì chúng ta làm như này

```js
const spritesheet = document.getElementById('spritesheet');

const canvas = document.createElement('canvas');
canvas.width = 288;
canvas.height = 288;

const ctx = canvas.getContext('2d');
ctx.drawImage(spritesheet, 0, 0, 288, 288, 0, 0);

document.body.appendChild(canvas);
```

Bạn sẽ thấy frame đầu tiên như này

![first_frame](https://images.viblo.asia/3d9e5ce9-f3ac-4faa-a41c-1ad39933d43b.png)

Param thứ 2 và thứ 3 của `drawImage` sẽ là vị trí của khung hình trên spritesheet. Document chi tiết ở [đây](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage).

Để cắt tất cả khung hình thì chúng ta làm 1 cái vòng lặp như này

```js
const frames = [];

while (y < spritesheet.height) {
    x = 0;

    while (x < spritesheet.width) {
        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(spritesheet, x, y, 288, 288, 0, 0);

        const isEmpty = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data.every(channel => channel === 0);

        if (!isEmpty) {
            frames.push(canvas);
        }

        x += originalWidth;
    }

    y += originalHeight;
}
```

Bạn sẽ thấy là chúng ta thừa ra 1 frame cuối cùng trống không có gì, vậy nên mình phải thêm 1 đoạn check xem frame chúng ta vừa cắt ra có dữ liệu không trước khi thêm vào array `frames`. Chỉ đơn giản là check xem tất cả các pixel của nó có data hay không thôi.

```js
const isEmpty = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data.every(channel => channel === 0);
```

## Ghép các khung hình thành ảnh GIF

Có các khung hình rồi thì giờ mình ghép lại thôi. Mình sẽ dùng package [`gif.js`](http://npmjs.com/package/gif.js) để tạo ảnh gif nhé.
Tạo ảnh từ các frame thì đơn giản như này thôi.

```js
const fps = 8;

const gif = new GIF({
    workers: 2,
    quality: 1,
});

frames.forEach(frame => gif.addFrame(frame, {
    delay: 1000 / fps,
}));

gif.on('finished', (blob) => {
    const url = URL.createObjectURL(blob);
    const img = document.createElement('img');
    img.setAttribute('src', url);
    document.body.appendChild(img);
});

gif.render();
```

Chỉ cần add các frame và khoảng delay giữa các frame sau đó render. Để cho dễ tính thì chúng ta dùng khái niệm frame rate, thường thì các sticker của Facebook mình thấy có frame rate từ 8-12 fps. Kết quả trả về sẽ là raw data nên chúng ta dùng `URL.createObjectURL` để tạo 1 URL tạm thời. Kết quả của chúng ta như này.

![tonton-black](https://images.viblo.asia/9c2a1fb7-5b2b-4fa5-870d-c32262ab77ab.gif)

Cũng ổn nhỉ, trừ cái background đen xì ra 🤔. Đó là vì ảnh của chúng ta có phần transparent nên render thành gif bị như vậy.
Nếu thêm options `transparent` cho `gif.js` như này

```js
const gif = new GIF({
    workers: 2,
    quality: 1,
    transparent: 'rgba(0, 0, 0, 0)',
});
```

Thì chúng ta được kết quả như này.

![tonton-black](https://images.viblo.asia/a87852d0-d60c-4a7c-ae42-0bfb6679ecb3.gif)

Có background trong suốt rồi nhưng mà mấy chỗ đường viền không ổn lắm nhỉ. Cái này là do hạn chế của định dạng `GIF`.
Bình thường thì với ảnh trong suốt như PNG chẳng hạn, đoạn chuyển từ chỗ có hình sang chỗ trong suốt sẽ là rất nhiều pixel với độ trong suốt giảm giần như thế này để cho đường viền của ảnh được mượt mà.

![tonton-edge](https://images.viblo.asia/77379199-ff47-41eb-90e4-75c786d7283c.png)

Tuy nhiên với định dạng GIF thì mỗi px chỉ có thể có màu hoặc trong suốt hoàn toàn, không có kiểu trong suốt 1 nửa như PNG. Nên chỗ đường viền sẽ trông như kiểu răng cưa chất lượng thấp. Vậy nên ảnh gif mà có background trong suốt thường có 1 đoạn nhỏ viền có màu trắng (hoặc màu gì đó trùng với màu nền mà mọi người định đặt cái gif lên) để làm cho đường viền trông mượt hơn. Để cho đơn giản thì mình sẽ cho cả cái background màu trắng luôn.

```js
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvasWidth, canvasHeight);
```

Nhớ là phải tô màu trước khi `drawImage` nếu không nó sẽ đè lên ảnh. Kết quả của chúng ta như này.

![tontontonton](https://images.viblo.asia/a22cc9ed-e446-4eae-ad55-1ddf8afbaa54.gif)

Đây là toàn bộ code nếu bạn muốn nghịch nhé.

{@embed:https://codepen.io/thphuong/pen/qBOyRaz}

Link codepen nếu cái embed kia không load được 😔 https://codepen.io/thphuong/pen/qBOyRaz

## Bonus

Về cách làm của Facebook, tại sao lại dùng spritesheet mà không dùng luôn ảnh GIF nhỉ.
Làm như này cũng có vài lợi ích.

- Ảnh đẹp hơn, ảnh GIF chỉ có 256 màu thay vì 16 triệu màu như PNG.
- Không gặp vấn đề về transparent như mình vừa nói ở trên nữa.
- Khỏi bị copy (may be 🤔).

Nhưng chắc hẳn cũng có vài cái không có lợi rồi

- Không chỉnh được kích thước. Vì dùng `background-image` và `background-position` nên kích thước sticker là cố định, muốn thay đổi phải đổi spritesheet.
- Chạy tốn RAM với CPU 🙄.