Single-page app (SPA) là một website hoạt động dựa việc render lại nội dung trang web theo cử chỉ của người dùng (vd khi người dùng click 1 link) mà không thực hiện request lên server để fetch lại toàn bộ HTML cho trang web đó. Nghe thì có vẻ trìu tượng, và trên thực tế thì có rất nhiều cách để thực hiện việc implement 1 single-page app, tuy nhiên nhìn chung lại thì hầu hết chúng đều được xây dựng dựa trên những bộ API native và cơ chế của trình duyệt. Hiểu được những điều này chính là cốt lõi để nắm được nguyên tắc hoạt động của 1 single-page app.

## Phân loại SPA ?

1 Single-page app có thể quản lý state dựa theo một nguồn bên ngoài (ví dụ địa chỉ URL) hay tự nó có cơ chế quản lý state riêng. 
So sánh 2 loại với nhau, 1 SPA sử dụng cách thứ hai (internal state) có một hạn chế - đó là nó chỉ có duy nhất 1 *đầu vào (entry)* - nói cách khác là bạn chỉ có thể truy cập vào app từ 1 địa chỉ cố định (root của trang web). Trong quá trình user navigate trong app, sẽ không có cách nào để thể hiện sự thay đổi đó ra bên ngoài với browser. Điều này dẫn tới một số hạn chế, ví dụ như với use case bạn muốn chia sẻ 1 nội dung nào đó, khi đó người được chia sẻ cũng chỉ có thể truy cập vào từ root, và bạn lại phải mất công giải thích cách truy cập tới nội dung mong muốn.

![](https://images.viblo.asia/86646a3a-98f2-4e84-b666-eeffb9a8a118.png)

Với cách tiếp cận thứ nhất - location-based SPA - bạn có thể chia sẻ một đường link cho người khác và có thể chắc chắn rằng bất cứ ai truy cập vào đường link đó cũng sẽ nhìn thấy được một nội dung như nhau (giả sử họ có quyền truy cập để xem được nội dung), do lúc này địa chỉ truy cập luôn tương ứng theo quá trình navigate của người dùng.

![](https://images.viblo.asia/a7ebf3ee-c898-48bd-b22d-e88e7d0ce528.png)

Vì vậy, Bài viết này sẽ tập trung vào cơ chế quản lý state dựa trên location.

## Location primer

Khi địa chỉ URL là thứ mà người dùng cuối nhìn thấy và tương tác, thì ứng dụng SPA sẽ làm việc với hàm `window.location`. Hàm này cho phép ta bóc tách và làm việc với từng phần của địa chỉ URL mà không phải tự tay parse.

![](https://images.viblo.asia/4ab7672b-9e2b-42e5-8861-3a750786559c.png)

Đối với một app SPA, chỉ có 3 phần trong địa chỉ URL là quan trọng: `pathname`, `hash` và `search` (hay còn được gọi là query string), còn `hostname` hay `protocol` thì có thể bỏ qua.

`pathname` là phần quan trọng nhất trong 3 phần vì nó quyết định xem nội dụng nào được render. `search và `hash` được dùng để hiển thị thêm những data khác. Ví dụ. đối với một địa chỉ như `/images?of=mountains`, phần pathname `/images` sẽ chỉ định rằng trang được render là trang images, trong khi `?of=mountains` sẽ quy định thêm nội dung nào được thể hiện trong trang images đó.

## Route matching

SPA phụ thuộc vào router. Router là một tập hợp danh sách các route, mỗi một route sẽ tương ứng với một location nó được match tới. 

Một route có thể cố định (`/about`) hoặc có thể chứa thành phần động (`/album/:id` - với `id` là giá trị số bất kì). 

```
const routes = [
  { path: '/' },
  { path: '/about' },
  { path: '/album/:id' }
];
```

Trong quá trình người dùng navigate trong app, location sẽ được so sánh để tìm ra route tương ứng với mình (thường là chỉ so sánh phần `pathname` của location). Sau khi tìm được route tương ứng, router sẽ thực hiện việc render lại nội dung app cho người dùng (việc render lại có nhiều cách , một trong số đó là phỏng theo [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) - LTV sẽ đưa cho router một function có nhiệm vụ render lại trang web, và router sẽ gọi tới function này).

![](https://images.viblo.asia/2af9bde8-29ec-414b-87df-cd5ebc507479.png)


## In-App navigation

việc navigation bên trong app cũng có một vấn đề thú vị cần giải quyết. Khi user click vào một đường dẫn ( thường là 1 thẻ `<a>`), thông thường các browser đều có các behavior mặc định gắn với một event để thực hiện navigate. Với 1 SPA, ta sẽ muốn override lại behavior mặc định này của trình duyệt (có thể sử dụng hàm `event.preventDefault()` của JS - hay như các framework SPA hiện nay đều đã hỗ trợ mặc định cho vấn đề này). Lúc này, behavior mặc định của trình duyệt sẽ bị ghi đè lên, location không còn tự động thay đổi nữa; thay vào đó quá trình navigate sẽ do ta tự định nghĩa và điều khiển.

Tuy nhiên, có thể bạn sẽ vẫn cần biết một chút về cách mà browser mặc định xử lý với navigation.

## Browser xử lý location như thế nào ?

Mỗi một tab browser có một thứ gọi là "browser context". Browser context là thứ quản lý một "session history" - về bản chất là một mảng các `location entry`.

Một entry này sẽ chứa các thông tin về một location: URL của location, `Document` tương ứng với location, state đã được serialized, cũng như một vài thuộc tính khác. Mỗi một entry đều có một index đi kèm quy định thứ tự của nó trong mảng session history. Browser context cũng giữ thông tin về entry hiện thời đang được sử dụng.

![](https://images.viblo.asia/f29b198a-1039-43f7-bd69-4ed7f76f4662.png)

### Document?

Khi trình duyệt thực hiện navigate, một request sẽ được gửi tới server và browser sử dụng response nhận về để tạo một object `Document`. Object này mô tả trang (cây DOM của trang ...) và các hàm method để tương tác với nó. Ví dụ, hàm `window.document` chính là hàm để tương tác với `Document` của location entry hiện tại.

![](https://images.viblo.asia/3a507406-f610-4d92-8605-6742849e7f99.png)

### Session history

Môi khi người dùng click vào một link và navigate, tab browser sẽ build thêm vào session history. Mỗi 1 navigate sẽ tạo một request tới server và tạo một entry mới (bao gồm 1 `Document`)

![](https://images.viblo.asia/a23a635c-5189-423b-9f48-d24205d4d1a8.png)

Khi người dùng ấn nút back trên trình duyệt, browser sẽ sử dụng entry hiện tại để xác định entry mới (`current.index -1`). `Document` của entry trước đó sẽ được load lại vào trình duyệt.

![](https://images.viblo.asia/3cc151e3-1b41-42d9-814f-42d4129a259c.png)

Lúc này, khi người dùng click một link, các entry nào nằm phía sau entry hiện tại (những trang trước khi back về) sẽ bị xóa và thay bởi entry mới.

![](https://images.viblo.asia/49c9a303-9fea-45ad-bcd3-65cbb334caca.png)

Trong trường hợp người dùng navigate tới đúng trang hiện tại (location mới có cùng `pathname`, `search` và `hash` với location hiện tại), entry hiện tại sẽ bị thay thế mà không ảnh hưởng gì tới các entry khác.

![](https://images.viblo.asia/d03a8fcf-53f6-400c-957c-11ca4c6aab03.png)

Trên đây là cơ chế hoạt động của navigation, tuy nhiên, mục đích của 1 SPA đó là thực hiện navigate mà không cần phải request tới server. Vậy làm cách nào SPA thực hiện được việc đó ?

## History API

Ban đầu, SPA hoạt động dựa trên cơ chế là ta có thể thay đổi `hash` của location và browser sẽ tạo một location entry mới mà không cần gửi request tới server. Cách này hoạt động, nhưng không được đẹp cho lắm :p Sau này, nguyên một bộ API mới được xây dựng - [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) - với mục đích hỗ trợ tận răng cho việc phát triển SPA.

Thay vì việc khởi tạo hẳn một `Document` với mỗi một location, History API sẽ tái sử dụng lại `Document` hiện thời, chỉ update nó cho phù hợp với location mới. 

History API có 3 function chính: `pushState()`, `replaceState()` và `go()`. 3 hàm này (và các hàm còn lại các của History API) đều có thể được gọi thông qua `window.history`.

![](https://images.viblo.asia/2285d48f-6d78-45ea-bfd0-7b3ca883c932.png)

Note: về vấn đề hỗ trợ - tất cả các trình duyệt mới nhất hiện nay [đều đã hỗ trợ History API](https://caniuse.com/#feat=history). Các bản IE version nhỏ hơn 9 không hỗ trợ, nhưng ta cũng không việc gì phải quan tâm tới chúng :) 

### pushState() và replaceState()

Cả 2 hàm `pushState()` và ‘replaceState()` đều có chung các argument:

- argument đầu tiên là `state`: Argument này có thể là null; argument này chính là state của app.
- argument thứ 2 là `title`
- argument thứ 3 là `path` - là địa chỉ mà ta muốn navigate tới. Đây có thể là 1 URL đầy đủ, hoặc chỉ là ở dạng relative path, nhưng nó luôn phải thuộc application hiện tại (chung `protocol` và `hostname`), nếu không, trình duyệt sẽ văng ra lỗi `DOMExeption`.

```
history.pushState(null, '', '/next-location');
history.replaceState(null, '', '/replace-location');

// attaching state to an entry
history.pushState({ msg: 'Hi!' }, '', '/greeting');

// while on medium.com
history.pushState(null, '', 'https://www.google.com');
// throws a DOMException
```

hàm `pushState()` sẽ thêm 1 entry vào session history phía sau entry hiện tại. Nếu như có entry nào đó đang nằm phía sau entry hiện tại rồi, chúng sẽ bị thay thế bởi entry mới. Cơ chế này cũng giống như cơ chế bình thường khi ta click thẻ `<a>` ở trên.

![](https://images.viblo.asia/566211b7-2169-4456-9ea0-91a39ac74c00.png)

hàm `replaceState()` sẽ thay thế entry mới với chính entry hiện tại trong session history. Các entry khác đều không bị ảnh hưởng. Cơ chế này tương tự với cơ chế được nhắc tới ở trên - click một đường link với `href` giống hệt URL hiện tại - nhưng `replaceState()` khác ở chỗ nó cho phép thay thế entry hiện tại với bất kì một location mới nào.

![](https://images.viblo.asia/acc8e40d-9487-46d8-a03e-ba11e051689c.png)

### go()

hàm `go()` là một cách để mô phỏng lại 2 nút back và foward của trình duyệt. 

![](https://images.viblo.asia/04f870f2-55be-42b5-afee-84f671b18961.png)

hàm `go()` chỉ nhận 1 argument: số các entry cần lấy ra khỏi lịch sử. Một con số dương tương đương với hành động foward, số âm tương đương với nút back, số 0 (hoặc `undefined`) tương đương với reload trang.

```
go(-1); // back 1 lần
go(1); // forward tiến tới 1 trang
go(-10); // back lại 10 trang
go(0); // reload
go(); // reload
```

Ngoài ra còn có 2 hàm `history.back()` `history.foward()` - chúng tương đương với `history.go(-1)` và `history.go(1)`

### State 

Một trong các property của entry là state, 2 hàm `pushState()` và `replaceState()` cũng chứa state trong tên của mình. Vậy state là gì ?

State là dữ liệu (data) gắn với một entry. Nó cố định navigation - có nghĩa là khi bạn thêm 1 state vào một entry, navigate đi, sau đó quay trở lại entry trước, state sẽ vẫn nằm ở đó. State được gắn vào entry bằng 2 hàm `pushState()` và `replaceState()`, và có thể được lấy ra bằng `history.state`

![](https://images.viblo.asia/ceb4fe39-2e3f-4bd6-b03a-f934f1b6e44a.png)

Có một số ràng buộc cho state. Thứ nhất, nó phải được serialize trước. Thứ 2, state có giới hạn về kích thước (vd trên Firefox là 640k). Cuối cùng, khi ta navigate trực tiếp vào 1 URL, state của nó sẽ set mặc định là `null`, do đó nếu như logic của trang web phụ thuộc vào `state` để render, ta có thể gặp vấn đề khi người dùng truy cập trực tiếp vào địa chỉ. Do đó, `state` có thể hữu ích khi dùng để lưu trữ những data không được render, ví dụ như một key để chứa một địa chỉ URL với mục đích cho người dùng mới đăng nhập foward tới.

## Navigate trong SPA sử dụng History API

Vậy 1 app SPA sử dụng History API như thế nào ? Như đã đề cập ở trên, ta có thể sử dụng 1 click handler - trong đó đã override lại cơ chế mặc định của trình duyệt bằng `event.preventDefault()`. Handler đó có thể gọi `pushState()` và `replaceState()`để thực hiện navigation mà không cần ping tới server. Tuy nhiên, History API chỉ update session history, vì vậy handler cũng cần tương tác với cả router để cho router biết location mới. 

Có nhiều cách để xử lý 1 handler như thế này. Nếu như bạn sử dụng những framework như Vue hay React, bạn có thể viết như ví dụ sau:

```
// Ví dụ cho React

const Link = ({ children, href }) => (
  <a
    href={href}
    onClick={event => {
      // override lại cơ chế mặc định
      event.preventDefault();

      // navigate sử dụng History API      
      history.pushState(null, '', href);

      // Thông báo cho router biết là navigate đã được thực hiện
    }
  >
    {children}
  </a>
);

<Link href="/somewhere">Somewhere</Link>

// => render ra cho trình duyệt, click vào thẻ a này sẽ kích hoạt lời gọi history.pushState()
<a href="/somewhere">Somewhere</a>
```

Hoặc, nếu muốn, ta có thể thêm một global event listener cho mọi nút click thực hiện in-app navigation, override lại mặc định và thay thế với lời gọi History API. Một ví dụ bạn có thể xem là với [roadtrip router](https://github.com/Rich-Harris/roadtrip/blob/3eea272cf78daba7212c179a339f9df0dde85740/src/utils/watchLinks.js).

Việc sử dụng History API khiến cho việc điều khiển navigate in-app dễ dàng hơn. Tuy nhiên, ta vẫn phải xử lý thêm 1 trường hợp nữa: khi user click vào 2 nút back và foward của trình duyệt.

## Xử lý với 2 nút back và foward

Khi 2 nút back và foward được click (cũng như khi `history.go()` được gọi), trình duyệt sẽ thực hiện 1 lời gọi `popstate`. Để bắt được sự kiện này, ta phải thêm 1 event listener

```
window.addEventListener('popstate', event => {
  // thông báo cho router biết việc navigate được thực hiện
}, false);
```

Session history sẽ được update ngay khi event trên được gọi, lúc này ta cần thông báo cho router biết rằng location hiện tại đã thay đổi.

## Navigate bằng cách thay đổi trực tiếp trên thanh địa chỉ

Nếu user thay đổi URL bằng cách sửa trực tiếp trên thanh địa chỉ, việc này sẽ tạo mới một `Document`. History API lúc này chỉ ngăn việc reload lại với các entry có cùng `Document` - nghĩa là việc gọi `history.go() hay click vào 2 nút forward/back sau lúc này sẽ thực hiện việc load lại trang hoàn toàn.

## Còn về phía server thì sao

Hầu hết các SPA đều chạy trên client, tuy nhiên file mã nguồn vẫn phải tới từ một đâu đó :) [Bài viết Single-Page app and the server](https://medium.com/@pshrmn/single-page-applications-and-the-server-32a23d67936) sẽ nói thêm về những cách mà ta có thể xây dựng nên một SPA hoàn chỉnh.

## Resource

Trang document của Mozilla có những bài viết rất đầy đủ về [History](https://developer.mozilla.org/en-US/docs/Web/API/History_API) cũng như [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location) API.

Ngoài ra, hiện nay hầu hết các SPA framework đều tự xây dựng nên những bộ wrapper riêng của mình cho History API. Ví dụ như package [history](https://github.com/ReactTraining/history) được sử dụng bởi `React router`, hoặc `vue-router` của Vue cũng [tự implement một bộ API cho riêng mình](https://github.com/vuejs/vue-router/blob/694a7af008883f47d46548f79dd1f0d24292560c/src/history/html5.js).

**Link nguồn:**

https://medium.com/@pshrmn/demystifying-single-page-applications-3068d0555d46