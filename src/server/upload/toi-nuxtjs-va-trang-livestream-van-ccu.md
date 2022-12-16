Một câu chuyện nhỏ về con đường tối ưu ứng dụng Server-Side Rendering chạy bằng NuxtJS.

Tất nhiên là khi mình đặt phím viết bài blog này thì ứng dụng mình đang làm chưa có tới được vạn CCU. Nên đọc tới đây thì bạn có thể bảo là mình giật tít câu view cũng được. Cơ bản là giờ nói chia sẻ gì mà ứng dụng phèn có 3 ngàn CCU thì nó không có được tín cho lắm. Nhưng mà thôi tính mình thì hay nói thẳng nói thật nên cũng nói luôn với các bạn từ đầu bài viết thế này để cho khỏi thất vọng này nọ ha.

Nếu các bạn thấy câu chuyện có khả năng hấp dẫn chỉ với con số 3k CCU thì ok ta đọc tiếp.

À mình không tối ưu **hệ thống livestream** nhé các bạn đừng nhầm không lại hụt hẫng. Đây là hệ thống **web có chứa livestream** thôi.

![image.png](https://images.viblo.asia/70175363-ee92-48f4-88b8-0b0b93ccb68f.png)

## First things first

Như thường lệ thôi, mình là **Minh Monmen**, một DevOps nhưng kiêm cả ít Frontend cho nó có tiếng là Fullstack. Khả năng HTML CSS của mình thì chỉ ở mức vừa phải thôi, tức là có thể làm được thôi chứ làm hông có đẹp. Mình thường được nhận những chiếc task liên quan tới kiến trúc, khởi tạo project hoặc tối ưu project trong quá trình các bạn chuyên frontend làm. Sau đây là một số những thứ mình phải xử lý trong quá trình làm frontend cho trang web livestream vạn CCU (target vạn CCU =))).

Những kiến thức này thì hoàn toàn có thể áp dụng trực tiếp cho những framework tương tự như NextJS (cho React) chẳng hạn vì về mặt kiến trúc nói chung thì chả khác nhau mấy đâu.

Ok chưa? Start!

## Bắt đầu từ CSR và SSR 

Vấn đề to lớn đầu tiên khi khởi tạo một project frontend là chuyện phải hiểu được ứng dụng frontend của mình sẽ được triển khai như thế nào. Trong quá khứ mình đã chứng kiến một lựa chọn sai lầm về mặt kiến trúc là chọn luôn SPA (Single Page Application) với CSR (Client-Side Rendering) để làm ứng dụng web đã dẫn tới nhiều tình huống dở khóc dở cười sau này ra sao. Thế nên lời khuyên đầu tiên của mình dành cho bạn đó là:

> Luôn khởi tạo project bằng 1 framework có cả khả năng SSR (Server-Side Rendering) và CSR (Client-Side Rendering). Hay chúng nó thường gọi là ứng dụng Universal ấy. Ví dụ như code VueJS thì đừng xài Vue mà hãy xài NuxtJS, nếu code ReactJS thì đừng xài React mà hãy xài NextJS,...

Tất nhiên là nếu các bạn đã lỡ chọn Vue thuần client hay React thuần client,... thì nếu có lúc cần tới khả năng SSR thì cũng có nhiều cách để vá víu khắc phục thôi. Thế nhưng mình nghĩ tốt nhất là cứ chọn luôn 1 thằng có kiến trúc hỗ trợ SSR ngay từ đầu đi cho chắc. Thừa còn hơn thiếu vì nếu mà thiếu thì đắp vào khổ lắm bạn ơi.

Cho những người chưa biết CSR và SSR là gì thì có thể xem thêm về cách hoạt động của 2 cơ chế này trong video: [https://www.youtube.com/watch?v=XwswPqIXYoI](https://www.youtube.com/watch?v=XwswPqIXYoI). Đại khái thì: 

- CSR là client sẽ load 1 trang **HTML chỉ có code không có nội dung** về dưới browser, sau đó mới chạy JS để render ra nội dung trang web. 

![](https://images.viblo.asia/494d5872-4040-4598-a50a-e51ed106989d.png)

- SSR là server sẽ render ra trang **HTML có sẵn nội dung**, sau đó browser load trang HTML có sẵn nội dung này thì chỉ cần hiển thị ra và làm cho content có thể tương tác được thôi. 

![](https://images.viblo.asia/250dda5f-4a3f-4270-9d4d-bb17042dd392.png)

- SSR truyền thống sẽ load lại trang HTML mới từ server mỗi khi user chuyển trang, còn SSR với NuxtJS hay NextJS thì thường được gọi là **Universal app**, tức là app sẽ kết hợp **SSR cho rendering lần đầu** và **CSR cho việc user chuyển trang** trên app.

![](https://images.viblo.asia/920fd891-abaf-49ab-bc82-616a8bbe9e14.png)

Lý do to lớn nhất để những thằng SPA lớn như VueJS hay ReactJS vẫn phải làm chế độ SSR là việc tối ưu cho SEO và Social Sharing. Google bot, Bing bot, Facebook bot,... thường chỉ crawl nội dung page của chúng ta từ trang HTML thôi chứ không rảnh để ngồi load cả js với css ra để render đâu. Mặc dù tất nhiên là Google bot bây giờ nó thông minh lắm rồi, render được cả page CSR các thứ tuy nhiên trên góc độ của những chuyên gia SEO kỳ cựu thì vẫn nên tạo điều kiện cho con bot nó có ngay nội dung từ trang HTML là tối ưu nhất. 

Social sharing là khi chúng ta paste link lên facebook thì nó render được title với description với ảnh ra như này:

![](https://images.viblo.asia/a6ccde71-07e2-444b-80df-a02019a915da.png)

Ok, vậy thì init project với SSR thôi. 

```bash
$ yarn create nuxt-app my-awesome-nuxt

create-nuxt-app v5.0.0
✨  Generating Nuxt.js project in my-awesome-nuxt
? Project name: my-awesome-nuxt
? Programming language: TypeScript
? Package manager: Yarn
? UI framework: Bootstrap Vue
? Template engine: HTML
? Nuxt.js modules: Axios - Promise based HTTP client
? Linting tools: ESLint, Prettier
? Testing framework: None
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Server (Node.js hosting)
? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Continuous integration: None
? Version control system: Git
```

Vậy là chúng ta đã có một project Nuxt JS mới khởi tạo. Mình có sử dụng một thằng CSS quen thuộc với mọi developer là Bootstrap và chọn chế độ render là Universal. Done.

## Vấn đề đầu tiên: Extract CSS

Chưa cần phải code gì hết. Mình có chạy luôn project dưới dạng Production:

```bash
$ yarn build
$ yarn start

   ╭──────────────────────────────────────────╮
   │                                          │
   │   Nuxt @ v2.15.8                         │
   │                                          │
   │   ▸ Environment: production              │
   │   ▸ Rendering:   server-side             │
   │   ▸ Target:      server                  │
   │                                          │
   │   Memory usage: 32.4 MB (RSS: 92.7 MB)   │
   │                                          │
   │   Listening: http://localhost:3000/      │
   │                                          │
   ╰──────────────────────────────────────────╯
```

Mở trình duyệt với đường dẫn `http://localhost:3000`, trang demo của Nuxt hiện lên một cách hoàn hảo. Thế nhưng với giác quan thứ 6 của một người làm DevOps, mình mở F12 và thấy ngay một chi tiết thú vị:

![](https://images.viblo.asia/e587fc47-2a38-4f7b-bbf9-186260ad787a.jpg)

Chẹp, tất nhiên là mình không cần phải tìm lý do xa xôi nào cho việc một project empty mà HTML nó lại nặng những 220KB bởi vì chỉ cần mở nội dung HTML ra là sẽ thấy kẻ thủ ác: **CSS trong header**.

![](https://images.viblo.asia/81c83789-ad98-4e66-bc90-04e000e32e4a.png)

CSS của project được nhúng thẳng vô HTML trang chủ luôn các bạn ạ. Tất nhiên là có nhiều lý do để NuxtJS làm điều này mặc định, tuy nhiên với những project mà mình hay anh em thường gặp thì việc sử dụng 1 thư viện CSS (như mình đang dùng Bootstrap) là cực kỳ phổ biến. Do đó khi NuxtJS nhét hết CSS của page vào header như trên thì cái trang HTML của chúng ta sẽ RẤT RẤT NẶNG. 

> Có thể các bạn thấy 200KB cho 1 trang HTML nó chưa có lớn, nhưng hãy chú ý đây là một project **EMPTY**. Mình đã gặp rất nhiều project với setting mặc định như này có trang HTML nặng tới 1.5MB!!!

Mặc dù 1 ứng dụng Universal thì chỉ có lần đầu tiên khi load trang là SSR, còn sau đó user navigation sẽ được xử lý trên client tuy nhiên nếu user ấn **F5** hoặc **Open in new tab** thì quá trình SSR lại được thực hiện lại. Mà với ứng dụng livestream mình đang làm thì user F5 nó lại như cơm bữa. Do đó không thể để trang HTML nặng như kia được.

Một lý do khác đó là HTML thường không được cache thoải mái trên Proxy hay CDN mà phải revalidate với Origin để xem phía Origin có thay đổi gì về nội dung hay không. Do vậy việc để CSS trong header như này sẽ khiến đoạn CSS kia không được cache mà cứ phải load lại từ Origin nếu nội dung trang web của chúng ta thay đổi.

Cách fix thì rất đơn giản, chỉ là set thuộc tính `build.extractCSS = true` trong file `nuxt.config.js` là được.

```js
{
    build: {
        extractCSS: true
    }
}
```

Option này sẽ cấu hình để Nuxt (hay cụ thể là webpack) tách CSS của bạn ra những file riêng. Những file này thì có thể cache thoải mái trên Browser (đối với 1 user F5), Proxy hay CDN (đối với nhiều user cùng truy cập). Nó không khó tuy nhiên vì không được set mặc định nên nhiều người không để ý. Hãy thử xem 1 cái vote hồi 2018 của NuxtJS về tính năng này xem có bao nhiêu người để ý đến nó nhé:

![](https://images.viblo.asia/28fbc20f-5204-430f-a770-fbd3e4d485b6.png)

Kết quả sau khi extractCSS:

![](https://images.viblo.asia/27673035-339e-482d-a059-568a93ef089a.png)

Như các bạn đã thấy, extractCSS không làm giảm dung lượng data mà browser phải down xuống trong **lần đầu**, nhưng sẽ có tác dụng rất lớn khi chúng ta refresh trang. Trang HTML lúc này chỉ nặng 7KB, phần 200KB đã được tách ra file css riêng và **sẽ được browser** cache lại.

## Cache common data trên server

Trong quá trình mình tối ưu một ứng dụng NuxtJS của vài bên khác thì gặp một tình trạng phổ biến là có những data rất common, hiển thị trên mọi page kiểu như **list category**, **menu**, **page meta**,... nhưng vẫn bị fetch lại từ Backend API trong quá trình SSR. Điều này làm tăng gánh nặng cho latency của page được render SSR và cũng tăng gánh nặng xử lý cho Node server (chạy NuxtJS) và Backend server (chạy API). 

Vậy thì chúng ta phải làm gì với trường hợp này? Tất nhiên là cache. Mặc dù đối với Backend API thì việc sử dụng memory cache (1 biến global nào đó) hay distributed cache (redis) là rất phổ biến. Tuy nhiên khi chuyển qua NuxtJS thì nó là một framework cho Frontend, do đó việc đặt cache server thường bị quên lãng. Để giải quyết vấn đề này và làm sao sử dụng cache server trong quá trình SSR thì mình sẽ hướng dẫn các bạn. 

Đừng nghĩ nó dễ nhé, cái khó nhất của SSR chính là hiểu được **đoạn code của mình đang chạy ở đâu**. Có rất nhiều bạn khi code không hiểu điều này và cuối cùng dẫn đến việc đặt cache xong thấy nó chả có tác dụng gì hết (do đoạn code đó chạy trên client), hoặc bị loạn data giữa các user với nhau (do đoạn code đó lại chạy trên server).

Đầu tiên hãy cài đặt `node-cache` bằng `yarn` hoặc `npm`, sau đó tạo file có tên là `server.cache.ts` (mình dùng ts) trong thư mục `modules` như sau:

```ts
import NodeCache from 'node-cache'

import { Module } from '@nuxt/types'

const serverCache: Module = function () {
    const cache = new NodeCache()
    this.nuxt.hook('vue-renderer:ssr:prepareContext', (ssrContext: any) => {
        ssrContext.$cache = cache
    })
}

export default serverCache
```

Bằng việc tạo module này, chúng ta có thể chắc chắn object `cache` kia chỉ được tạo 1 lần khi **start server NuxtJS**. Sau đó nó sẽ được inject vào ssrContext (context chỉ có trên server).

Lúc này ta có thể dùng cache trong các component như sau: (lưu ý khi dùng phải check `process.server` trước nhé)

```ts
export default Vue.extend({
    async asyncData({ ssrContext }) {
        const cache = ssrContext.$cache
    }
})
```

## Tránh bị memory leak khi setInterval

Một kỹ thuật thường được sử dụng khi muốn refresh data realtime là `short-polling`, phần vì bởi nó làm code logic trở nên đơn giản hơn rất nhiều, phần vì nó cực dễ implement cả ở server và client. Đừng cười nha, đến một ngày các bạn nhận ra mặc dù có vô vàn khuyết điểm nhưng chỉ cần một sự thật không thể phủ nhận là `short-polling` quá là dễ làm với thời gian dev cực nhanh thì nó đã là lựa chọn cực kỳ sáng giá rồi.

Để làm được `short-polling` thì chắc chắn không thể không nhắc tới chiếc function thần thánh `setInterval` rồi. Nhưng cũng chính vì thằng `setInterval` này mà mình cũng gặp không ít tình huống dở khóc dở cười đây.

Hãy bắt đầu với đoạn code sau:

```ts
export default Vue.extend({
    async fetch() {
        const items = await this.getItems();
        this.items = items
    },
    created() {
        setInterval(() => {
            this.$fetch()
        }, 15000)
    }
})
```

Quen thuộc đúng không? Đây chỉ là việc cài đặt 1 cái interval để refresh data trên trang sau mỗi 15s thôi. Tuy nhiên khi chạy bạn sẽ phát hiện ra cứ route qua vài trang, load component qua lại là thấy việc gọi `getItems` tới API được lặp đi lặp lại nhiều lần liên tục chứ không phải sau 15s. Điều này là do bạn đang gặp vấn đề với memory leak

Cái vấn đề ở đây là khi `created` được chạy SSR tức là chạy trên server, thì cái interval kia sẽ được chạy vĩnh viễn **trong process Node**. Và bạn tưởng tượng khi có 1000 user cũng load trang thì cũng tạo ra 1000 cái interval **trên server** như vậy. Tèo! Con Nuxt server của mình chạy được một thời gian, nhanh thì 1 ngày mà chậm thì vài hôm là lên RAM kinh khủng rồi tự restart (mình chạy bằng docker nhé).

Ok ok, nhưng mà code như này thì sai sơ đẳng quá, qua 1 lúc google để khắc phục thì thể nào bạn cũng học được trò clear cái interval ở `beforeDestroy` như sau đúng không:

```ts
export default Vue.extend({
    async fetch() {
        const items = await this.getItems();
        this.items = items
    },
    created() {
        this.interval = setInterval(() => {
            this.$fetch()
        }, 15000)
    },
    beforeDestroy() {
        clearInterval(this.interval)
    }
})
```

Ôi bạn ơi, sai lần đầu thì là SSR mới lạ quá mình không quen, nhưng đi search google và fix theo như này cũng sai tiếp thì là mình ngờ u thật rồi =))). Mà cái nguy hiểm hơn của việc fix theo google này là mình còn **đinh ninh là nó đúng** và không có check lại kết quả cơ.

Nhưng thôi, sai lầm thì cũng đã qua và mình cũng nói luôn cách mình đã làm để các bạn khỏi ngờ u giống mình nhé:

```ts
export default Vue.extend({
    async fetch() {
        const items = await this.getItems();
        this.items = items
    },
    created() {
        this.init()
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
    actions: {
        init() {
            if (process.client) {
                this.interval = setInterval(() => {
                    this.$fetch()
                }, 15000)
            }
        }
    }
})
```

Oke, thay đổi duy nhất ở đây là mình check thêm giá trị của `process.client` để chắc chắn chỉ khi `created` được call dưới client thì mới khởi tạo interval, còn trên server thì không.

## Tiết kiệm băng thông khi short-polling với Etag

Vẫn là thằng short-polling này gây chuyện. Mình có một API chứa tài nguyên cần short-polling và API cũng nặng vừa vừa tầm vài chục KB sau khi gzip (thôi ở đây không nhắc tới gzip nữa nhé vì nó lại đơn giản quá). Điều đáng nói ở đây là khi chạy chiếc app livestream kia thì mình phát hiện kha khá băng thông public của mình bị chiếm dụng mà user thì chưa có nhiều. Mình cũng đã thử xem xét tài nguyên mà browser phải tải khi load trang thì cũng không thấy bị nhiều quá. Thế rồi mình chợt để ý thấy chiếc request `short-polling` của mình vẫn cần mẫn gọi lên server với status `200` xanh lè. 

Thôi xong thủ phạm đây rồi. Mặc dù gọi API với tần suất 15s/call tuy nhiên data của mình thì trên dưới 1 phút mới có thay đổi cơ, đôi khi cũng lâu hơn nữa, do đó lần nào cũng get lại response của API thì cũng phí khá nhiều băng thông đó.

![](https://images.viblo.asia/4068e7f4-1a5a-4a06-b240-5a8e60730cdb.jpg)

Oke, vậy làm sao để chỉ get lại data mới nếu có thay đổi (mà không phải đổi gì logic code - rất lâuuuuuuuuuuuu)? Tất nhiên là sử dụng một tính năng có sẵn của tụi HTTP đó là `Etag / If-none-match`.

![](https://images.viblo.asia/b6502458-0d01-4977-be84-f1af8b40af9c.png)

Nôm na thì server sẽ trả kèm 1 cái `etag` chính là signature sinh ra từ response của request đó trong lần gọi đầu tiên. Browser sẽ lưu lại chiếc tag này và lần sau request sẽ truyền đúng cái `etag` lần trước lên. Nếu server sinh response mà thấy signature giống hệt chiếc etag được browser truyền lên thì sẽ trả về http code `304 Not Modified` cùng response trống để browser tự hiểu mà lấy response cũ ra xài.

Bình thường thì chắc anh em cũng không để ý vụ này và không động chạm gì tới nó cả. Phần vì nếu xài expressjs thì đã có tích hợp sẵn etag trong response rồi. Phần vì toàn bộ logic này được browser implement và anh em client khi gọi ajax cũng chỉ thấy được trả lại response bình thường thôi. Tuy nhiên mình lại đang sử dụng **fastify** để làm API, mà thằng này lại không bật sẵn tính năng etag nên mới thành ra chiếm nhiều băng thông như vậy.

> Nginx mặc định cũng bật sẵn Etag cho **static resource**, tức là js, css, image,... các thứ nhưng lại **không bật** với **proxy_pass** khi call API vào backend phía sau nên anh em phải tự xử lý nhé.

Tất nhiên là phát hiện ra rồi thì xử lý chỉ là việc đơn giản:

```ts
import fastifyEtag from '@fastify/etag';
import fastify from 'fastify';

const server = fastify();
await server.register(fastifyEtag, { weak: true });
```

## Tránh re-render khi response API không thay đổi bằng Etag

Một vấn đề mình cũng gặp phải khi render giao diện trên client là khi data được refresh (mà mình đã load lại toàn bộ) thì trên UI sẽ phải render lại khá nhiều, ngoài ra trong code logic của mình cũng phải xử lý kha khá để transform response API ra thành nội dung hiển thị cho user. Thành ra khi short-polling mà data không thay đổi thì browser lại phải tốn kha khá tài nguyên xử lý không cần thiết gây lag cho user.

Mình thì không code frontend nhiều, nên mấy cái kỹ thuật cao siêu kiểu chống re-render khi data không đổi mình không nắm rõ. Tuy nhiên mình có áp dụng một cách cực kỳ đơn giản và dễ làm để tránh re-render nếu data không thay đổi đó chính là tận dụng luôn cái `etag` header mình mới xài ở trên.

```ts
export default Vue.extend({
    async fetch() {
        const {headers, data} = await axios.get(url);
        if (headers.etag) {
            if (this.previousTag === result.tag) {
                // tag exists, not update data
                return
            }
            this.previousTag = headers.etag
        }
        this.items = data
    },
    created() {
        this.init()
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
    actions: {
        init() {
            if (process.client) {
                this.interval = setInterval(() => {
                    this.$fetch()
                }, 15000)
            }
        }
    }
})
```

> Lưu ý: Đừng cố sử dụng status = 304 để check request có thay đổi hay không nhé bởi vì trong code client vẫn sẽ nhận được **toàn bộ** response từ request 200 phía trước bao gồm cả status, headers.

Voila, với một ứng dụng có data realtime rất nhiều mà lại dùng kiến trúc đơn giản thì mình đã tiết kiệm được không ít tài nguyên xử lý của browser rồi. Trải nghiệm trên web mượt hẳn đấy =)))

## Tách CSR cho user và SSR cho crawler bot

Lại chạy thêm một thời gian, và mình nhận ra rằng SSR cho user trong bài toán của mình **không ngon**. Tại sao?

- Data động trên trang rất nhiều và còn theo user, do đó việc cache toàn trang bằng HTML là tương đối bất khả thi (thật ra là làm được nhưng tốn **rất** nhiều công sức)
- Thời gian chờ load đủ data cho HTML tương đối lâu khi phải kết hợp response từ nhiều API. Mình đã có tối ưu bằng việc phân chia **data chính**, **data phụ** (tức là data chính được load SSR, data phụ được đặt vào thẻ `<client-only>` để chỉ load trên client rồi) tuy nhiên tổng thời gian response vẫn kha khá.
- Tài nguyên xử lý cho con SSR Nuxt tương đối lớn. Mặc dù đã tối ưu kha khá tuy nhiên khi có 3k CCU vào thì con Nuxt vẫn chiếm tài nguyên nhiều nhất trên server (3 container Nuxt + 30% CPU mỗi container). API của mình thì đã được tối ưu hẳn rồi nên gần như không chiếm tài nguyên mấy.

Vậy làm sao để có thể handle được vạn CCU bây giờ? Hiện tại thì mình chỉ đang dùng 1 con 4CPU + 8GB RAM để chạy toàn bộ frontend + backend thôi, khá là tiết kiệm đúng không? Tất nhiên là mình có thể scale thêm tài nguyên vì mấy con Nuxt thì chạy không chứa state nên là muốn scale bao nhiêu cũng được á. Tuy nhiên mình vẫn nghĩ 1 con server này thì dư sức cân được vạn CCU cùng ấn F5 rồi nên là tối ưu tiếp thôi.

Một điều đáng chú ý là **user không thích nhìn trang trắng quay quay**. Họ phải **thấy cái gì đó** rồi chờ tiếp cũng được. Thế nên mấy cái trò app skeleton kiểu facebook mới ra đời. Tức là thay vì chờ để hiển thị luôn bài viết cho user thì nó cho 1 cái block trắng có mấy dòng mờ mờ để loading đã. Ngoài ra thì làm SSR cũng chỉ vì liên quan tới SEO + social media share thôi. Vậy tại sao mình không chơi CSR cho user còn bot thì đáp SSR vào mặt sau?

CSR sẽ có ưu điểm là thời gian load html ban đầu cực nhanh (vì chẳng có content gì mà). Sau đó mình tha hồ mà hiện skeleton hay loading để chờ API response. Trải nghiệm này giúp giữ chân người dùng trên web nhiều hơn là việc phải chờ rất lâu cho 1 trang full HTML. Đây cũng là phương pháp mà **hầu hết** các ông lớn về thương mại điện tử, mạng xã hội,... đều đang làm. Tuy nhiên để làm được thì các bạn phải có kiến thức về hạ tầng 1 xíu nha.

Đầu tiên thì chúng ta sẽ tách việc build app Nuxt ra làm 2 deployment. 1 thằng sẽ chạy dạng CSR để serve HTML, JS, CSS tĩnh. 1 thằng sẽ chạy dạng SSR để render HTML động. Để làm được điều này thì mình sẽ tách thêm 1 file `client.nuxt.config.js` để config cho deployment CSR. Còn `nuxt.config.js` mặc định sẽ được dùng cho SSR.

```js
import serverConfig from './nuxt.config'

export default {
    ...serverConfig,
    ssr: false,
    target: 'static',
    modules: [...serverConfig.modules, 'nuxt-client-init-module'],
}
```

File này thật ra là chỉ thay đổi 1 chút, set `ssr: false` để khi build ra thì nuxt sẽ target tới CSR mà thôi. Ngoài ra trong project của mình có sử dụng `nuxtServerInit` để load data vào store. Khi xuống client thì sẽ không chạy được code trong nuxtServerInit do đó mình có cài thêm module `nuxt-client-init` để thay thế mà thôi.

Tiếp tục sửa `package.json` để build riêng cho client và server:

```json
{
    "scripts": {
        "dev": "nuxt",
        "dev-client": "nuxt -c client.nuxt.config.js",
        "build": "nuxt build",
        "build-client": "nuxt build -c client.nuxt.config.js",
        "start": "nuxt start",
        "start-client": "nuxt start -c client.nuxt.config.js"
    },
    ...
}
```

Sửa thêm `Dockerfile` để chạy server node với SSR và nginx với CSR (vì nếu là CSR thôi không cần server thì nginx chịu tải tốt hơn **rất rất rất** nhiều so với server Node):

```Dockerfile
# Step 1: Build dependencies
FROM node:16-alpine3.12 AS builder

LABEL AUTHOR=minhpq331@gmail.com

WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile

ADD . /app
RUN yarn generate

# Step 2: runtime
FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Còn đây là Dockerfile dùng để chạy SSR

```Dockerfile
# Step 1: Build dependencies
FROM node:16-alpine3.12 AS builder

LABEL AUTHOR=minhpq331@gmail.com

WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile

ADD . /app
RUN yarn build
RUN yarn --pure-lockfile --prod

# Step 2: runtime
FROM node:16-alpine3.12

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /app

COPY --from=builder /app .

CMD ["npm", "run", "start"]
```

Đến đây là hòm hòm rồi, còn 1 bước quan trọng nhất chính là chia tải làm sao để User sẽ vào trang CSR, Crawler bot sẽ vào trang SSR. Lúc này mình sẽ cấu hình chiếc nginx proxy ở phía trước như sau:

```conf
http {
    resolver 127.0.0.11;
    
    map $http_user_agent $frontend_server {
        "~*(Googlebot\\/|facebookexternalhit)" "nuxt_ssr:3000";
        # anything not matching goes here 
        default "nuxt_csr";
    }

    server {
        listen 80;
        server_name my.domain.com;

        location / {
            proxy_pass http://$frontend_server;
        } 
    }

}
```

Trên đây là config ví dụ của mình, tức là khi crawler bot của facebook hoặc google (được xác định qua việc check user-agent) truy cập thì sẽ được proxy tới `nuxt_ssr:3000` là deployment chạy SSR, còn tất cả các request khác từ user thường sẽ được routing tới `nuxt_csr` là deployment chạy CSR của mình.

![](https://images.viblo.asia/f6a6c6f9-6a80-48dd-8c87-b4af09f19c42.png)

Ngoài ra trong config của nginx mình còn đặt thêm các header liên quan tới cache-control để những thằng proxy phía trước mình (ví dụ cloudflare) sẽ cache phần lớn các request static asset (js, css,...) nữa.

Kết quả: 

- Hạ được phần lớn băng thông ra vào server
- CPU của server chỉ còn chiếm khoảng 5-10%
- User load web gần như sẽ thấy ngay skeleton
- F5 không tốn băng thông (như hình dưới đây, khi F5 thì user chỉ tốn **635 bytes** transfer data vì tất cả mọi request trên trang đều đã được browser cache, cái thì cache không request, cái thì request 304 - mà vẫn đảm bảo độ fresh nhé)

![](https://images.viblo.asia/2ba598d1-fc52-4843-82ea-cf23afff5a67.png)

Một điều lưu ý duy nhất là các bạn nên test lại cả CSR và SSR thường xuyên. Bởi vì 1 code base tách ra 2 deployment cho nên tiện thì có tiện nhưng ví dụ nó lỗi phần SSR thì mình lại khó phát hiện ra lắm (do mình chỉ hay vào dạng CSR mà). Bọn mình đã bị dính một quả CSR thì chạy ngon còn SSR chủ quan không check lại thế là bot google vào lỗi hết cả trang đấy.

## Tổng kết

Qua bài viết này mình hy vọng các bạn đã có thêm 1 số kinh nghiệm trong việc tối ưu ứng dụng Nuxt SSR. Có thể đọc xong các bạn sẽ thấy nhiều cái tối ưu của mình đáng lẽ không cần phải làm nếu như chọn một giải pháp công nghệ khác. Ví dụ thay vì short-polling thì chuyển qua websocket hay server-sent event gì đó đi. Tuy nhiên triết lý tối ưu của mình trước nay vẫn là **tính kinh tế**, tức là làm sao để với ít công sức nhất, ít effort nhất vẫn có thể đạt hiệu quả tối đa chứ không phải là tìm giải pháp hoàn thiện nhất. Điều đó thể hiện ở những tính chất sau:

- Giải pháp giúp phát triển sản phẩm **nhanh nhất**.
- Giải pháp **ít phải thay đổi** codebase hay kiến trúc nhất.
- Giải pháp **đơn giản nhất**.

Cảm ơn các bạn đã quan tâm theo dõi. Upvote cho mình nếu thấy bài viết hữu ích nhé.