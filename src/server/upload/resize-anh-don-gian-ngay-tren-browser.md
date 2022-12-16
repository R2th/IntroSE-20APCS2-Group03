Bạn có biết là mình có thể resize ảnh ngay trên browser mà không cần dùng đến tool hay thư viện nào không :smiley_cat:.

## Dùng canvas

[Canvas API](https://developer.mozilla.org/en/docs/Web/API/Canvas_API) cho phép chúng ta vẽ đồ họa 2D theo ý muốn trên trình duyệt.
Nghĩa là chúng ta hoàn toàn có thể vẽ lại một hình nào đó với kích thước mong muốn. Hay nói cách khác là resize đó :smiley:.
Chúng ta hãy cùng xem method dùng để vẽ lại một hình ảnh trên canvas [drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage). `drawImage` có thể có đến 9 parameter:

```js
void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

Trong đó:

- `sx`, `sy`: là vị trí trên cùng bên trái của ảnh gốc mà chúng ta muốn vẽ lại.
- `sWidth`, `sHeight`: là kích thước hình ảnh chúng ta muốn vẽ lại từ ảnh gốc.
- `dx`, `dy`: là vị trí trên canvas mà chúng ta muốn vẽ lại ảnh gốc.
- `dWidth`, `dHeight`: là kích thước trên canvas mà chúng ta muốn vẽ lại ảnh gốc.

Vậy là chỉ cần set `dWidth` và `dHeight` thành kích thước mà chúng ta muốn resize là sẽ resize được ảnh. Hãy làm thử xem nhé.
Ví dụ mình có hình này.

![mashu.png](https://i.imgur.com/XAvtCXJ.png)

Kích thước ảnh gốc là *1207 x 1800*. Giờ mình sẽ resize thành *301 x 450* nhé. Code của chúng ta như này:

```js
const img = new Image();

img.onload = function() {
    const canvas
    const canvas = newCanvas(width, height);

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 301, 450);
    document.body.appendChild(canvas);
};

img.src = url;
```

Đây là kết quả nè.

![mashu-rsz.png](https://i.imgur.com/AeUL84V.png)

Hmm, trông không ổn lắm nhỉ :thinking:. Hình khá thiếu sắc nét so với ảnh gốc.
Đó là do API này vốn không được thiết kế để resize ảnh với những thuật toán xịn như những tool chỉnh sửa ảnh hay thư viện phía server vì lý do performance.
Vậy nên khi resize với kích thước khác biệt quá nhiều sẽ khiến cho hình ảnh bị răng cưa như vậy.
Để hạn chế, chúng ta sẽ resize từ từ mỗi lần 1 tí để tránh kích thước mỗi lần resize cách nhau quá nhiều.
Resize nhiều lần cũng có thể khiến chất lượng giảm đi, nhưng sẽ tránh được tình trạng răng cưa như trên.
Mình sửa code 1 tí như này, mỗi lần sẽ resize còn 1 nửa, dần dần tới kích thước mình muốn.

```js
function resize(img, width, height, quality = null) {
    const canvas = newCanvas(width, height);

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);

    return canvas;
}

const img = new Image();

img.onload = function() {
    let canvas = img;

    while (canvas.width * .5 > 301) {
        canvas = resize(canvas, canvas.width / 2, canvas.height / 2);
    }

    canvas = resize(canvas, 301, 450);
};

img.src = url;
```

Đây là kết quả:

![mashu-multirsz.png](https://i.imgur.com/rKe4QzW.png)

Trông khá hơn nhiều nhỉ :smiley:.

Cũng có 1 tính năng thử nghiệm hiện mới có trên Chrome có thể tùy chỉnh chất lượng resize là option [imageSmoothingQuality](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality) của canvas context 2D. Mình thử dùng thì được kết quả ảnh như này:

![mashu-hqrsz.png](https://i.imgur.com/55P2gKb.png)

Cũng không khác cái trên là mấy nhỉ, mình thấy cái trên còn đẹp hơn ấy :rofl:.

## Dùng `createImageBitmap`

Vẫn là Canvas API nhưng lần này chúng ta có một method khác, vẫn là chỉ support trên chrome
(Firefox có support nhưng lại là crop thay vì resize :slightly_smiling_face:).
[createImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap) cho phép tạo
`ImageBitmap` để lưu dữ liệu ảnh từ ảnh gốc (image hoặc canvas). Trong quá trình tạo còn support tính năng resize nữa.
Và đặc biệt là nó return một `Promise` nên chúng ta không phải lo nó sẽ làm browser bị lag khi đang render.
Resize 1 cái ảnh thì vẫn chưa thấy gì khác biệt, nhưng bạn sẽ thấy sự khác biệt ở đoạn sau khi chúng ta resize một lúc nhiều ảnh.
Chắc cũng nhờ vậy nên nó cho phép sử dụng những thuật toán resize xịn hơn.

Giờ chúng ta dùng thử xem sao, code như này:

```js
const img = new Image();

img.onload = function() {
    createImageBitmap(img, {
        resizeWidth: 301,
        resizeHeight: 450,
        resizeQuality: 'high',
    }).then((data) => {
        const canvas = newCanvas(width, height);
            canvas.getContext('2d').drawImage(data, 0, 0);
            document.body.appendChild(canvas);
        };
    });
}

img.src = url;
```

Đây là kết quả:

![mashu-cib.png](https://i.imgur.com/Pzn4I0X.png)

Đây là ảnh mình thử resize với một tool chỉnh sửa ảnh xịn để thấy chất lượng cũng không khác gì lắm.

![mashu-pdn](https://i.imgur.com/3GNNovE.png)

Đây là code của tất cả các cách trên để bạn so sánh. Bạn mở full example lên so sánh cho dễ nhé.
Kết quả có thể khác nhau tùy browser bạn dùng.

{@embed:https://codepen.io/thphuong/pen/qBOeMRb}

Link codepen: https://codepen.io/thphuong/pen/qBOeMRb

## Resize GIF

Nếu bạn thử cách trên với ảnh GIF sẽ thấy không được. Ví dụ mình resize hình này

![yutathrowheart.gif](https://i.giphy.com/media/S9ceVioSdQGGRmcVkm/giphy.gif)

Sẽ chỉ được mỗi frame đấu tiên.

![yutathrow-first-frame.png](https://i.imgur.com/uNP8ic1.png)

Có thể bạn đã biết rồi là ảnh *gif* được tạo thành từ các frame.
Hôm trước mình cũng mới viết một bài tạo ảnh gif ở [đây](https://viblo.asia/p/RQqKLLkbK7z).
Vậy nếu chúng ta có thể từ ảnh *gif* tách ra thành từng frame, rồi resize mỗi frame, sao đó ghép lại như cũ là có ảnh *gif* đã được resize rồi :smiley:.

Mình sẽ dùng [gif-frames](https://www.npmjs.com/package/gif-frames) đế tách *gif* thành cách frame và [gif.js](https://www.npmjs.com/package/gif.js)
để ghép các frame lại thành *gif*.

Không giải thích thư viện dùng như nào nữa cho bạn khỏi mất thời gian :smiley:, code tách file gif thành frame như này nhé.

```js
async function getFrames(url) {
  const frames = await gifFrames({
    url,
    frames: "all",
    outputType: "canvas"
  });

  return frames.map(frame => ({
    image: frame.getImage(),
    delay: frame.frameInfo.delay
  }));
}
```

Còn cái này để ghép các frame lại thành gif

```js
function renderGif(frames) {
  const gif = new GIF({
    workers: 2,
    quality: 1,
    transparent: 'rgba(0, 0, 0, 0)',
  });

  return new Promise((resolve, reject) => {
    gif.on("finished", resolve);

    try {
      gif.render();
    } catch (e) {
      reject(e);
    }
  });
}
```

Function resize thì như phần trước nhé, ghép lại và chạy thì mình được kết quả như này.

![yuta-throw-rsz-1.gif](https://i.imgur.com/0uM2Li4.gif)

Hmm, lại bị cái viền đen rồi. Như bạn thấy thì cái ảnh gif gốc có nền trong suốt. Với png thì để có nền trong suốt
chúng ta sẽ cho những pixel trong suốt giá trị alpha channel = 0 (a trong rgba). Ở chỗ viền để cho đoạn chuyển từ
có màu sang trong suốt sẽ được mượt mà, không bị răng cưa thì sẽ có rất nhiều px với độ trong suốt giảm dần, kiểu như này.

![png-edge.png](https://i.imgur.com/NuZudmG.png)

Như bạn thấy là lúc resize canvas, vì nó render ảnh dạng png nên đã tiện tay render giúp mình những pixel chỗ viền thành
trong suốt thay vì giữ nguyên như ảnh gốc.
Ảnh gif thì lại không có alpha channel như png (chỉ có RGB), mỗi pixel chỉ có thể có màu hoặc không có màu,
không có kiểu mờ mờ nhìn xuyên qua được như png. Chỗ viền cũng gần giống như png thôi.

![gif-edge.png](https://i.imgur.com/M0c8aQD.png)

Khi chúng ta ghép các frame lại thì vì không có alpha channel nên những pixel trong suốt vốn có màu là `rgba(0, 0, 0, 0)`
sẽ bị chuyển thành `rgb(0, 0, 0)` (màu đen).
Như bạn thấy đoạn code ở trên chúng ta cần có option `transparent: 'rgba(0, 0, 0, 0)'`  để biết được pixel nào nên được
chuyển thành trong suốt.
Ngoài ra thì những pixel gần sát viền có màu là `rgb(0, 0, 0)` và `a` gần bằng 0 nên vẫn bị chuyển thành màu đen.
Đó là lí do chúng ta có ít viền đen như hình trên kia.

Vậy giờ chúng ta có 2 lựa chọn.
Tô màu background để không có đoạn viền trong suốt nữa như mình làm [bài trước]((https://viblo.asia/p/RQqKLLkbK7z)) :p.
Hoặc là chúng ta fix bằng cách sửa lại những pixel có alpha channel thành không trong suốt đúng theo yêu cầu của gif.

Để sửa data của ảnh vẽ trong canvas, chúng ta dùng `canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data`.
Image data sẽ là 1 array các số nguyên 8 bit (0-255). Mỗi 4 số sẽ là 1 pixel, thể hiện 4 giá trị trong `rgba`.
Vậy giờ mình loop trong đống array pixel đấy và thấy cái nào có màu mà giá trị a nhỏ hơn 255 thì sẽ set lại thành 255.
Ngoài ra những pixel mà có alpha channel quá nhỏ (< 127) thì mình cũng set = 0 luôn để hình đỡ bị răng cưa.
Code tí nữa bạn xem function `fixEdgeSmoothing` trong demo nhé.

Kết quả ngon hơn nhiều rồi. So với resize bằng thư viện xịn như Imagemagick thì mình thấy cũng không kém đâu :smiley_cat:.

![yuta-throw-rsz.gif](https://i.imgur.com/s2aYfFp.gif)

Code và demo ở đây bạn nhé.

Codesandbox: https://codesandbox.io/s/gif-resize-zn6bnl

Demo: https://zn6bn.csb.app

Nếu bạn để ý thì mình đã dùng `createImageBitmap` khi có thể. Khi chạy trên browser không support `createImageBitmap`
như Firefox thì lúc ấn nút resize sẽ có một khoảng thời gian browser bị đơ do resize quá tốn thời gian.