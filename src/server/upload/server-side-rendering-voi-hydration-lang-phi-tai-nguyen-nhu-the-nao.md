Bài gốc: https://thanhle.blog/blog/server-side-rendering-voi-hydration-lang-phi-tai-nguyen-nhu-the-nao

## Tại sao nên đọc bài này?

- Tìm hiểu cách Server side rendering mà hầu hết các framework/lib như React, Nextjs, Vuejs, Svelte đang làm hiện tại
- Có cách để tối ưu hơn cho SSR

*🐣 Bài này là mình dịch từ bài gốc [https://www.builder.io/blog/hydration-is-pure-overhead](https://www.builder.io/blog/hydration-is-pure-overhead) dưới góc nhìn của mình, tuy nhiên sẽ cố gắng truyền tải ý chính mà tác giả muốn viết (Do tuần này bí quá không biết viết gì)*

*Có một số chỗ mình sẽ lược bỏ vì mình thấy cố gắng dịch càng khiến nó càng khó hiểu hơn nên ai muốn tìm hiểu kĩ hơn thì nên khuyến khích đọc bài gốc nhé.*


Có một vấn đề mà mình luôn tìm kiếm lâu nay, là mặc dù các framework hiện tại hầu hết đều support SSR và nó dần trở thành một chuẩn phải có ở tất cả các website với ưu điểm có FCB (First Contentful Paint) cực kì cao - nghĩa là gõ URL, enter là hiện cái website trong chớp mắt, SEO tốt, tuy nhiên TTI (Time to interact) - lại cực kì tệ mà không thể nào optimize được.

![Sự chênh lệch giữa FCP và TTI của CoinMarketCap](https://images.viblo.asia/91776336-c91d-41e8-ab72-97ff4e26a5bf.png)

Sự chênh lệch giữa FCP và TTI của CoinMarketCap

![Tốn khoảng gần 1s kể từ khi website xuất hiện về phía user cho tới khi nó có thể tương tác được](https://images.viblo.asia/712288f9-7f81-4bad-8e20-80cff20e63e2.png)

Tốn khoảng gần 1s kể từ khi website xuất hiện về phía user cho tới khi nó có thể tương tác được

Trước đây mình đã suy nghĩ vì rất nhiều component gửi về phía client sẽ cần hydrate thì mới có thể interact được nên có một hướng để optimize cho case này là lazy hydration - nôm na là component nào cần tương tác, hoặc user đụng tới thì mới load code của nó về, hydrate, rồi cuối cùng là handle interaction

Một hướng để làm việc lazy hydration là apply kiến trúc [Island Architecture](https://jasonformat.com/islands-architecture/), tuy nhiên với các framework hiện tại thì chỉ có Astro là support nó, mình ko thể nào đổi hoàn toàn techstack hiện tại từ nextjs qua [Astro](https://astro.build/) được 

Bài viết giới đây sẽ giúp bạn hiểu được tại sao các app lại phải tốn rất nhiều time để hydrate (làm tươi) các component gửi xuống browser và có một cách tiếp cận siêu đỉnh để giải quyết việc này

## Hydration - Làm tươi

Hydration là một giải pháp để thêm tương tác vào code HTML đã được server render gửi xuống browser. Theo định nghĩa của Wikipedia

> In web development, hydration or rehydration is a technique in which client-side JavaScript converts a static HTML web page, delivered either through static hosting or server-side rendering, into a dynamic web page by attaching event handlers to the HTML elements.

> Trong việc thiết kế web, hydration hay rehydration là một cách để client-side JavaScript biến một trang HTML tĩnh, được dựng lên từ hosting static hoặc server-side rendering thành một web động bằng việc gắn các hàm xử lý sự kiện vào các Element HTML

Hơi 🍌, nói ngắn gọn là, SSR trả về một web tĩnh (HTML, CSS) cho các bác, bây giờ muốn cái web đó có thể xử lý được các event tới từ user (Click vào button, validate form,...) thì phải chạy một bước là Hydrate để gắn các việc xử lý sự kiện vào các Element HTML tương ứng (Button, input,...)

Hydration hầu hết đều được implement dưới tầng framework do đó mọi người thường không care tới nó lắm, do đó bài viết này sẽ chứng minh Hydration là một việc khá thừa thãi bằng cách bỏ step này đi mà web app vẫn có thể chạy bình thường.

![image.png](https://images.viblo.asia/bfac8a92-9979-49ae-a0f1-12acb2a92f3c.png)

## Vậy hydration làm việc ra sao?

Trong Hydration, công việc của nó là là biết được `WHAT` logic nào cần handle và `WHERE` để gắn nó vào đâu

- `WHAT` : Nó là chỗ logic mà mình thường code khi user trigger một event.
- `WHERE`: Trong cả mớ Element của cây DOM thì mình phải biết gắn cái `WHAT` ở trên vào Element nào cho đúng.

Nó bắt đầu phức tạp hơn khi cái `WHAT` thường bao gồm 2 thứ `APP_STATE` và `FRAMEWORK_STATE`

- `APP_STATE` : là cái state của app mình hay viết á, mọi người hay hiểu ngắn gọn nó là state. Nếu không có `APP_STATE` thì các web của các bác không khác gì web tĩnh show ra cho user cả. Nhìn ngon đó nhưng không làm gì được 😝
- `FRAMEWORK_STATE`: Là những state nội tại của framework mà mình đang dùng để lưu trữ những thứ như component này nằm đâu, ứng với Element nào trên cây DOM, rồi một component đang ở Lifecycle nào. Nếu không có `FRAMEWORK_STATE` thì cái web của các bác sẽ không biết update lại Element nào khi `APP_STATE` thay đổi cả.

[https://res.cloudinary.com/ddxwdqwkr/video/upload/v1609056522/patterns.dev/prog-rehy-2.mp4](https://res.cloudinary.com/ddxwdqwkr/video/upload/v1609056522/patterns.dev/prog-rehy-2.mp4)

Vậy làm cách nào mà mình có thể khôi phục được `WHAT` (`APP_STATE` + `FRAMEWORK_STATE`)  và `WHERE` ? Đáp án là bạn download lại toàn bộ Javascript, excecute lại code một lần nữa để tạo lại HTML. Và việc download toàn bộ JavaScript, sau đó render ra HTML là phần tốn nhiều tài nguyên nhất.

Nói cách khác, hydration khôi phục lại `APP_STATE` và `FRAMEWORK_STATE` bằng cách excecute lại code ở browser qua các bước:

1. Download code của component
2. Chạy code đó
3. Khôi phục lại `WHAT`(`APP_STATE` + `FRAMEWORK_STATE`) và `WHERE` để biết được tầm vực của event handler
4. Gắn cái `WHAT` (Code handler logic interactive) vào đúng cái `WHERE` (DOM Element)

![image.png](https://images.viblo.asia/69fde7df-5912-48fa-ab08-712ed1bd54cc.png)

Gọi 3 bước đầu là giai đoạn `RECOVERY` . Giai đoạn rebuild lại app tốn rất nhiều tài nguyên vì nó phải download code, và excecute những đoạn code đó

Vì `RECOVERY` ảnh hưởng trực tiếp tới thời gian Hydration của web app, đặc biệt với những trang web phức tạp nó có thể tốn tới 10s để Hydration khi load một website trên mobile

`RECOVERY` , theo ý của tác giả là một giai đoạn thừa thãi, đơn giản là không cần có nó thì web vẫn chạy ngon lành được, nó không mang lại value trực tiếp gì cho app cả. Nó thừa thãi, không mang lại value vì những việc đó đã làm trên server rồi. Vì cách thiết kế hiện tại, server không gửi những data `WHAT` và `WHERE` cho browser được, do đó, tụi nó phải tự làm lại việc đó để tìm đúng cái `WHAT` và `WHERE` để add vào cây DOM cho đúng.

Nói ngắn gọn, hydration là công việc recover lại những hàm xử lý event bằng cách Download code, chạy lại các component mà SSR/SSG gửi xuống. Do đo website sẽ được gửi xuống 2 lần, 1 là dưới dạng HTML, 2 là dưới dạng JavaScript. Thêm một điểm nữa, là farmwork bắt buộc phải chạy lại code Javascript để recover lại các even handler, từ đó thì mới có thể handle interactive từ user được.

Để hiểu rõ hơn vấn đề, mình lấy một ví dụ nhé

```jsx
export const Main = () => <>
   <Greeter />
   <Counter value={10}/>
</>

export const Greeter = () => {
  return (
    <button onClick={() => alert('Hello World!'))}>
      Greet
    </button>
  )
}

export const Counter = (props: { value: number }) => {
  const store = useStore({ count: props.number || 0 });
  return (
    <button onClick={() => store.count++)}>
      {count}
    </button>
  )
}
```

Với đoạn code trên, nếu SSR/SSG thì nó sẽ trả về khá ngắn gọn

```jsx
<button>Greet</button>
<button>10</button>
```

Nếu nhìn vào đoạn HTML trả về thì các bác thấy rồi đó, nó hoàn toàn không biết phải gắn code xử lý event (`WHAT`) vào Element nào (`WHERE`) cả. Cách để gắn 2 thành phần đó vào là download thêm Javascript, excecute nó để biết component nào tương ứng với DOM nào `FRAMEWORK_STATE`, biết rồi thì gắn cái `APP_STATE` vào đúng Element tương ứng với nó `WHERE`

Sau khi làm xong các việc trên thì app của các bác đó có thể nhận event, do đó lúc này mới có thể tương tác được.

### Resumability: Giải pháp thay thế Hydration mà không phải double work

Hydration thì khiến app của mình phải render hai lần, đẫn tới tốn resource. Vậy solution ở đây là gì? Bỏ phase RECOVERY đi 

Để loại bỏ `RECOVERY` phase, cần 3 bước:

1. Seriallize tất cả data về `WHAT` (Bao gồm cả `FRAMEWORK_STATE` + `APP_STATE`)  và `WHERE`  vào HTML để gửi xuống cho Browser
2. Một thằng “Global event handle” để hứng tất cả các event. Tại sao lại cần global? Tại vì có event handler ở mức global thì mình không cần phải chờ event attach vào đúng Element nào thì mới có thể chạy được
3. Một thằng có thể lazy load code `WHAT` tương ứng với các event nhận được

![image.png](https://images.viblo.asia/641c3faa-d187-446f-a652-00c30f084123.png)

Với pattern Hydration cũ thì nó bắt buộc phải load trước `WHAT` vì nó cần biết nó là gì để còn biết mà gắn vào Element nào. Thay vì vậy mình có có cách tối ưu hơn bằng cách chỉ load cái `WHAT` khi nào user tương tác thôi.

Cách set up như trên có thể coi là Resumable bởi vì app ở Browser sẽ tiếp tục công việc từ trạng thái mà server trả về (Thay vì phải chạy lại từ đầu 2 lần như trước đây). Vậy là không có bước nào Double work ở đây cả

Một cách khác để suy nghĩ về việc này là nhìn vào design pattern Push và Pull:

- Push (hydration): Download code, chạy nó, sau đó gắn đống code xử lý event vào đúng Element
- Pull (Resumability): Không làm gì cả, khi nào user trigger một event thì lazy load code tương ứng rồi xử lý event

[Qwik](https://github.com/BuilderIO/qwik) là một framework hiện thực pattern trên, cùng xem detail nó chạy như thề nào nhé

Ở pattern resumability bắt buộc chúng ta phải serialized được `WHAT`(`FRAMEWORK_STATE` + `APP_STATE`) và `WHERE` , sau đó gửi tất cả data đó xuống cùng với HTML

```jsx
<div q:host>
  <div q:host>
    <button on:click="./chunk-a.js#greet">Greet</button>
  </div>
  <div q:host>
    <button q:obj="1" on:click="./chunk-b.js#count[0]">10</button>
  </div>
</div>
<script>/* code that sets up global listeners */</script>
<script type="text/qwik">/* JSON representing APP_STATE, FRAMEWORK_STATE */</script>
```

Khi đoạn code HTML ở trên được load vào Browser, nó sẽ lập tức chạy đoạn Inline Script để gắn sự kiện global vào app. Bằng cách này, app của chúng ta đã sẵn sàng nhận tất cả event mà user tương tác với app. Nó gần như là giải pháp chỉ load cực-kì-ít JS

[The cost of JavaScript in 2019](https://v8.dev/blog/cost-of-javascript-2019)

Với code HTML ở trên nó bao gồm data `WHERE` được gán trực tiếp vào thuộc tính của Element tương ứng. Sau đó nếu user trigger một event nào đó, framework sẽ dùng thuộc tính đó đó để load code logic handle even tương ứng. Sau khi load được logic tương ứng rồi thì chạy để xử lý event thôi

![image.png](https://images.viblo.asia/df8c0836-7dee-4285-ad8c-ad104f849a38.png)

Đỉnh!

## Về việc dùng bộ nhớ ở pattern Hydration

Mỗi DOM element sẽ lưu lại toàn bộ những Event handler gắn vào nó, do đó, với pattern Hydration, khi load hết tất cả event và gắn vào DOM thì đồng thời nó cũng khiến app của mình cần nhiều bộ nhớ hơn để lưu lại những event handler đó.

Với pattern Resumability thì mình sẽ không có giới hạn đó vì chúng ta chỉ có duy nhất một global handler thôi, rồi khi user tương tác với event nào thì mới load event đó.

Quá phù hợp cho tiêu chí optimization

>  Only load what users need
> 

## Tổng kết

![image.png](https://images.viblo.asia/ef5fc16d-1df3-4dc5-ab53-b1e59b640f8f.png)

Bằng việc serialized data `WHAT` và `WHERE` vào HTML và gửi xuống Browser, kết hợp cùng Global event handler, cuối cùng thì cũng có một thằng có thể hiện thực được pattern mà mình hằng mong muốn

> Khi nào user tương tác với logic gì thì mới load logic đó xuống và chạy thôi
> 

Với những hạn chế của React thì không sao mình làm được những việc như trên, và cũng chưa nhận ra được key point ở đây là Serialized được `WHAT` và `WHERE` thì mới làm được điều đó.

Hiện tại thì Qwik vẫn chưa support React nhưng sắp tới chắc sẽ có nhé

![image.png](https://images.viblo.asia/14d05912-7d8f-4af7-8942-83b530561b21.png)

*P/S: Mình định sẽ viết lại code Blog này với framework mới: Remix, Astro hoặc Qwik để có cái nhìn practical hơn về các framework mà mình quan tâm. Nhưng sau bài này chắc là phải thử Qwik đầu tiên thôi*