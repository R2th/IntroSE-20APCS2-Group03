![Svelt](https://subscribe.packtpub.com/wp-content/uploads/2020/10/svelte_js.png)

Hello mọi người, trong bài viết này, mình xin khái quát một số kiến thức về **Svelte** cũng như cách để xây dựng một web app bằng Svelte.
# TL;DR
Dành cho những bạn lười đọc, vốn tiếng Anh kha khá và thích "learn by doing":
* Mọi thông tin, tài liệu của Svelte, từ cơ bản đến nâng cao đều được hướng dẫn chi tiết trên trang chủ: https://svelte.dev
* Vừa học, vừa thực hành: https://svelte.dev/tutorial
* Github repo: https://github.com/sveltejs/svelte
* Tổng hợp các tài liệu liên quan: https://svelte-community.netlify.app/resources
* Tổng hợp các plugins hay đi kèm: https://github.com/rollup/plugins

# 1. Tổng quan
**Svelte** hay còn được gọi là SvelteJS, là một front-end JavaScript framework được phát triển bởi [Rich Harris](https://twitter.com/Rich_Harris) nhằm xây dựng giao diện người dùng một cách nhanh chóng và dễ dàng. Về bản chất, Svelte là một **compiler**, giúp biên dịch các cú pháp đặc thù mà bạn viết từ Svelte sang HTML, JS, CSS thuần tại thời điểm build, giúp tăng hiệu suất nhờ giảm các bước xử lý từ phía client.

## 1.1. Các ưu điểm
### Code ít hơn
Việc làm phần mềm nói chung, và viết code nói riêng đều có rủi ro ít nhiều về lỗi, bug. Việc phải viết nhiều code, bạn phải mất nhiều thời gian > codebase của bạn trở nên to, việc maintain, xử lý lỗi tốn nhiều thời gian > bạn muốn phát triển thêm tính năng hay ho, tối ưu hiệu suất, học thêm các kiến thức khác hoặc bạn muốn dành thời gian cho bạn bè, gia đình, vui chơi giải trí... bạn không còn thời gian. Do vậy, việc code ít, đồng nghĩa với việc sản phẩm của bạn sẽ ít lỗi, hoặc ít nhất bạn dễ tìm ra lỗi để xử lý, bạn sẽ có thêm thời gian cho các hoạt động khác ngoài chỉ biết "fix bug". Bạn hạnh phúc với cuộc đời dev 😀.

### Không dùng Virtual DOM
Nếu bạn đã và đang sử dụng các thư viện/framework phổ biến hiện nay như React hay Vue, chắc hẳn bạn sẽ nghe quen quen khái niệm "Virtual DOM" (DOM ảo) cũng như hay nghe nói "Virtual DOM nhanh vô đối". Dưới góc nhìn của Rich Harris, người sáng tạo ra Svelte, cho rằng việc sử dụng Virtual DOM để xử lý giao diện người dùng không hoàn toàn nhanh như những gì chúng ta đang lầm tưởng. Do đó, Svelte không sử dụng Virtual DOM mà hoàn toàn là một compiler biên dịch code của bạn sang ngôn ngữ JS thuần, zero dependency. App của bạn sẽ chỉ nhanh và nhanh ⚡.

### Reactive thực thụ
Bạn ngán ngẫm, không thể hiểu nổi các cơ chế quản lý state phức tạp trong các thư viện/framework JavaScript? Svelte là lựa chọn dành cho bạn, Svelte đưa cơ chế "reactivity" trong JavaScript lên một cấp độ mới, cực kỳ đơn giản và dễ áp dụng. Bạn sẽ càng đam mê với code 💻.

## 1.2. Làm quen
Các cú pháp của Svelte được nhận diện trong các component, có phần đuôi mở rộng là `.svelte`. Mỗi component sẽ gồm có 3 phần rõ ràng:
```html
<script>
    // JS code
</script>

<style>
    /* CSS code */
</style>

<!-- HTML code -->
```
* `<script>` chứa code JS mà bạn muốn xử lý trong component.
* `<style>` chứa code CSS để trang điểm cho component (code CSS này sẽ chỉ thuộc phạm vi component này thôi).
* Phần cuối cùng sẽ được Svelte compiler tự động nhận diện là các thẻ HTML.

Nhìn quá quen thuộc như lúc bạn mới nhập môn lập trình web đúng không? Phần thú vị còn ở phía sau 😁.

## 1.3. Các cú pháp cơ bản
Mình lướt qua một số cú pháp cơ bản của Svelte. Nhìn chung các cú pháp của Svelte không quá phức tạp, nếu không muốn nói là đơn giản. Nếu bạn đã quen thuộc với HTML, CSS, JavaScript, và một số cú pháp của ES6 thì bạn sẽ nhanh chóng thích nghi ngay.

### Truy xuất biến
```html
<script>
	let name = "world";
</script>

<h1>Hello {name}!</h1>
```

Khai báo biến trong thẻ `<script>`, trong HTML template, muốn truy xuất, bạn chỉ cần nhập tên biến trong cặp dấu ngoặc nhọn.

### Truy xuất biến trong thuộc tính thẻ
```html
<script>
	let src = "image.gif";
</script>

<img src={src} alt="Tên ảnh">
```

Tương tự, cú pháp để truy xuất biến trong thuộc tính thẻ được sử dụng như trên. Trường hợp biến của bạn cùng tên với thuộc tính, có thể viết gọn lại như sau:
```html
<img {src} alt="Tên ảnh">
```

### Import một component khác
```html
<script>
    import Button from "./Button.svelte";
</script>

<h1>Ví dụ import</h1>
<Button />
```

### Reactivity - cơ chế phản ứng với thay đổi
```html
<script>
    let count = 0;
    function increase() {
        count += 1;
    }
    setInterval(increase, 1000);
</script>

<p>Giá trị của count là: {count}</p>
```

Với ví dụ trên, cứ mỗi 1 giây thì biến `count` sẽ tăng lên 1. Như các bạn thấy, chỉ với cú pháp khai báo và gán giá trị biến thông thường, Svelte khiến cơ chế "reactivity" trở nên vô cùng đơn giản.

### Tạo props (thuộc tính) cho component
```html
// Button.svelte
<script>
    export let text = "Gửi";
</script>

<button>{text}</button>

// App.svelte
<script>
    import Button from "./Button.svelte";
</script>

<Button text="Hủy" />
```

Bằng từ khóa `export`, các component khác có thể thay đổi thuộc tính `text` của component Button.

### Sự kiện DOM
```html
<script>
    let count = 0;
    
    function handleClick() {
        count += 1;
    }
</script>

<button on:click={handleClick}>Đã nhấn {count} lần</button>
```

Nếu JS thuần bạn dùng `onclick` để gắn sự kiện, thì Svelte chỉ hơi khác một chút là `on:click`.

### Conditional rendering (render theo điều kiện)
```html
<script>
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
</script>

{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

Với HTML thuần, bạn không thể thực hiện conditional rendering, nhưng với Svelte thì có. Cú pháp có vẻ hơi lạ, nhưng cần phải nhớ.

### Render dữ liệu từ mảng/danh sách
```html
<script>
    let tasks = [
        "Dọn dẹp nhà cửa",
        "Cho gà ăn",
        "Tắm cho heo",
        "Code"
    ];
</script>

<h1>Nhiệm vụ</h1>
<ul>
    {#each tasks as task, index}
        <li>Nhiệm vụ số {index + 1}: {task}</li>
    {/each}
</ul>
```

Svelte cũng hỗ trợ render từng phần tử trong một mảng/danh sách.

### Two-way binding (ràng buộc song phương)
```html
<script>
	let name = "world";
</script>

<input bind:value={name}>

<h1>Hello {name}!</h1>
```

Two-way binding cũng cực kỳ đơn giản với Svelte.

### Lifecycle (chu kỳ hoạt động)
```html
<script>
	import { onMount } from 'svelte';
    
    let data;
    
    onMount(() =>  {
        fetch("https://someapi.com")
            .then(res => res.json())
            .then(res => {
                data = res;
            });
    });
</script>

{#if data}
    <p>Dữ liệu đã fetch được: {data}</p>
{:else}
    <p>Đang tải...</p>
{/if}
```

Lifecycle của một component tương tự như React hay Vue cũng được Svelte hỗ trợ. Ngoài `onMount`, còn có `onDestroy`, `beforeUpdate` hay `afterUpdate`... Tùy trường hợp mà bạn có thể tìm hiểu thêm để sử dụng.
# 2. Các bước xây dựng một web app
## 2.1. Chuẩn bị
* Máy tính, chuột, bàn phím...
* Code Editor mà bạn yêu thích (như Atom, VS Code, Sublime, Vim, ...)
* CLI (như CMD hoặc một terminal tích hợp sẵn nếu code editor của bạn có hỗ trợ)
* [NodeJS](https://nodejs.org/en/) (cần thiết để sử dụng npm)

## 2.2. Setup môi trường
Sau khi đã chuẩn bị đầy đủ, nhập vào CLI các câu lệnh sau:
```
npx degit sveltejs/template MY-SVELTE-PROJECT
cd MY-SVELTE-PROJECT

npm install
npm run dev
```

Mở trình duyệt, truy cập `http://localhost:5000`, bạn thấy màn hình sau:
![](https://media.prod.mdn.mozit.cloud/attachments/2020/07/22/17338/24c9401b457b27a1f27d60e944b77e5f/01-svelte-starter-app.png)

Vậy là bạn đã setup xong và có thể bắt đầu xây dựng web app bằng Svelte 👍

**Giải thích tí về các câu lệnh trên**

[`degit`](https://github.com/Rich-Harris/degit) là một công cụ khác do Rich Harris phát triển, cho phép bạn copy toàn bộ source code từ một repository trên Github xuống thư mục của mình. Cụ thể ở đây chúng ta đang copy source code của một template Svelte có sẵn xuống thư mục của mình với tên `MY-SVELTE-PROJECT`.

Sau khi copy xong ta chuyển đường dẫn tới thư mục vừa tạo, cài các dependency bằng `npm install` và cuối cùng chạy môi trường development bằng `npm run dev`.

### Cấu trúc thư mục
Một template Svelte sẽ có cách tổ chức thư mục cơ bản như sau, tùy theo từng dự án mà bạn có thể tổ chức thư mục theo cách của mình sao cho phù hợp nhất.
![](https://images.viblo.asia/8f7fc56b-91b7-4654-bd27-7405d8f64b6b.png)

Từ dưới lên:
* **`rollup.config.js`**: Svelte sử dụng công cụ bundle gọi là Rollup, và đây là file bạn có thể tùy chỉnh cài đặt để bundle source code của mình.
* **`README.md`**: File thông tin project của bạn (dành cho user đọc) nếu bạn publish lên GitHub
* **`package.json`**: File thông tin project của bạn (dành cho dev đọc), cũng chứa các dependency để phát triển, deploy project của bạn.
* **`.gitignore`**: Như tên gọi, file này để bỏ qua các file/folder mà bạn không muốn commit lên git.
* **`src`**: Thư mục chứa source code
    * **`main.js`**: File đầu vào của cả cái web app. Lưu ý là nếu thay đổi tên file, bạn cần cài đặt lại tương ứng trong `rollup.config.js`.
    * **`App.svelte`**: Component viết bằng cú pháp của Svelte.
* **`scripts/setupTypeScript.js`**: File để cài đặt TypeScript thay cho JavaScript, chạy câu lệnh `node scripts/setupTypeScript.js` để cài đặt.
* **`public`**: Thư mục để deploy.

## 2.3. Xây dựng một web app máy tính đơn giản
Sau khi đã hoàn tất khâu chuẩn bị và cài đặt môi trường dev, ta tiến hành xây dựng một web app, đề tài đơn giản mình chọn là một web app **máy tính** để áp dụng một số cú pháp cơ bản của Svelte. Ok, bắt đầu thôi!

### Bố cục, chức năng
Cấu trúc vẫn như trên, mình sẽ chỉ thêm 2 component mới là **`Button.svelte`** và **`Screen.svelte`**.

**`Button.svelte`** là từng phím bấm để xử lý các thao tác tính toán.
```html
<script>
  export let key;
  export let result;
  const error = "Invalid input!";

  function replace(value) {
    return value.replace("x", "*").replace("÷", "/");
  }

  function handleClick() {
    switch (key) {
      case "=":
        try {
          result = eval(replace(result));
        } catch (e) {
          result = error;
        }
        break;
      case "C":
        result = "0";
        break;
      default:
        result = result === error || result === "0" ? key : result + key;
    }
  }
</script>

<button on:click={handleClick}>{key}</button>
```

**`Screen.svelte`** là màn hình hiển thị kết quả tính toán.
```html
<script>
  export let result;
</script>

<div class="screen">{result}</div>
```

Cuối cùng trong **`App.svelte`**, mình import 2 component trên vào và hiển thị thành một máy tính hoàn chỉnh
```html
<script>
  import Screen from "./Screen.svelte";
  import Button from "./Button.svelte";

  const rows = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "x"],
    ["1", "2", "3", "-"],
    ["0", "C", "=", "+"],
  ];

  let result = "";
</script>

<main>
  <Screen {result} />
  <div class="keys">
    {#each rows as row}
      <div class="row">
        {#each row as key}
          <Button {key} bind:result />
        {/each}
      </div>
    {/each}
  </div>
</main>
```

Kết quả bạn sẽ có một máy tính với hình dáng sơ khai như hình:
![](https://images.viblo.asia/94fd08ba-7f7a-4558-b4e3-3bf83a1a3f58.png)

### Làm đẹp
Bước tiếp theo là trang điểm, làm đẹp các kiểu cho cái máy tính. Ở đây mình chọn kiểu **neumorphism** và style theo từng component. Kết quả cuối cùng cái máy tính sẽ có mặt mũi như hình:

![](https://images.viblo.asia/1918a28c-7328-4780-b527-62fc6284f07b.png)


## 2.4. Build và deploy
Sau khi đã hài lòng với cái máy tính, các bạn build source code bằng câu lệnh `npm run build`. Toàn bộ source code sau đó sẽ được minify lại, giúp giảm kích cỡ, đồng thời cơ chế **livereload** cũng sẽ được tắt đi. Để deploy, chỉ cần quăng toàn bộ thư mục `public` lên host là hoàn tất.

> **Lưu ý**: khi deploy lên host, bạn cần kiểm tra lại các đường dẫn tương đối trong [`index.html`](https://github.com/khang-nd/calculator-svelte/blob/master/public/index.html). Vd khi mình deploy lên Github Pages, mình phải đặt thẻ `<base href>` lên đầu, và bỏ tất cả dấu `/` ở đầu các đường dẫn đến file JS, CSS.

* Repository đầy đủ cho bạn tham khảo: https://github.com/khang-nd/calculator-svelte.
* Trang thành quả: https://khang-nd.github.io/calculator-svelte

# 3. Kết
Svelte vẫn còn là một framework mới mẻ, job offer cũng chưa có nhiều và cộng đồng sử dụng cũng chưa lớn, nhưng Svelte là một tân binh tiềm năng, có thể phát triển mạnh và được sử dụng rộng rãi trong tương lai. Hiện tại mình chỉ nên vọc và làm vài cái pet project hoặc project cá nhân để học và thỏa đam mê với code 😎 Nếu bạn có ý định sử dụng cho project bự thì nên cân nhắc.

Vậy là mình đã khái quát một số kiến thức cơ bản về Svelte mà mình biết, mong là bài viết giúp ích cho mọi người.

----
@khangnd<br>[![Github](https://images.viblo.asia/20x20/81dd12f0-a8c9-403f-ae51-27b92828ca22.png)](https://github.com/khang-nd) [![Linkedin](https://images.viblo.asia/20x20/4981766e-5e57-401a-8623-d3657a3148e5.png)](https://www.linkedin.com/in/khangnd/) [![Dev.to](https://images.viblo.asia/20x20/3921db2e-e4e5-45d7-acc8-e8b92e02d47d.png)](https://dev.to/khangnd) [![Fandom](https://images.viblo.asia/20x20/fad64df3-0be8-4481-b810-8995f18f71ea.png)](https://dev.fandom.com/wiki/User:KhangND)