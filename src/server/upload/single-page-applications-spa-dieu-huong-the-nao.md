# Giới thiệu #
Một **single-page application (SPA)** là 1 **website** thực hiện việc **render** lại nội dung khi thực hiện việc điều hướng ( ví dụ khi người dùng thực hiện việc click vào 1 link ) thì sẽ không thực hiện việc **request** lên **server** để lấy toàn bộ **html** mới về cho trang **SPA** đó nữa.

Mặc dù trên thực tế có nhiều cách để triển khai ứng dụng **SPA**, tuy nhiên nhìn chung thì hầu hết chúng đều được xây dựng trên cơ chế của **trình duyệt** và **API** để xây dựng những chức năng cốt lõi, Hiểu được những điều này chính là cốt lõi để nắm được nguyên tắc hoạt động của 1 single-page app.

# Phân loại SPA #
1 **SPA** có thể quản lý **state** dựa theo 1 nguồn bên ngoài ( ví dụ : địa chỉ url ) hoặc tự nó có cơ chế quản lý **state** riêng. 

So sánh 2 loại với nhau, 1 **SPA** sử dụng cách thứ 2 **(internal state)** có 1 hạn chế : bạn chỉ truy cập vào **SPA** đó từ 1 địa chỉ cố định ( **root** của trang **SPA** đó ), trong quá trình người dùng ( **user** ) thực hiện việc điều hướng ( **navigate** ), sẽ không có cách nào để thể hiện sự điều hướng đó ngoài trình duyệt ( **browser** ). 

Điều này sẽ dẫn đến hạn chế, ví dụ như 1 **user** muốn chia sẻ **SPA** của bạn cho ai đó thì chắc chắn họ sẽ **copy link url** và gửi cho người bạn họ muốn chia sẻ ( **share**), khi đó người nhận được **share** đó cũng sẽ chỉ truy cập từ đầu là **root**, và bạn sẽ là người giải thích cách truy cập đến nội dung mà cần **share**.

![](https://images.viblo.asia/190388ef-7a51-459d-b41d-2cf1ddfef9cc.png)

Với cách tiếp cận thứ nhất, **location based SPA**, bạn có thể chia sẻ đường link cho 1 **user** nào đó và chắc chắn khi **user** truy cập đường **link** đó ( giả sử user đó họ hoàn toàn có quyền để truy cập đường link đó hoặc đường link đó public cho mọi user ), thì nội dung hiển thị sẽ tương ứng với **link** mà họ nhận được, do lúc này địa chỉ truy cập ( **url** ) luôn tương ứng với quá trình **navigate** của người dùng.

![](https://images.viblo.asia/2fef8b0a-d44c-4681-840d-b9198eca45bf.png)

-> Vì vậy, Bài viết này sẽ tập trung vào cơ chế quản lý **state** dựa trên **location**.

## Location Primer ##
Khi địa chỉ **url** là thứ mà **user** họ nhìn thấy và tương tác, **SPA** sẽ làm việc với hàm `window.location`, Hàm này cho phép ta bóc tách và làm việc với từng phần của địa chỉ **url** mà không phải tự tay **parse**.

![](https://images.viblo.asia/902b84da-2912-497e-b584-e7923cc18503.png)

Đối với **SPA** có **3** phần trong **url** là quan trọng: **pathname**, **hash**, và **search** ( còn gọi là query string ), còn **hostname** và **protocol** tạm thời bỏ qua.

 **pathname** là phần quan trọng nhất trong **3** phần trong **url** vì nó quyết định nội dung gì sẽ được **render**. **search** và **hash** sẽ được dùng để hiển thị thêm những **dữ liệu** khác.
 
- Ví dụ: Đối với một địa chỉ như `/images?of=mountains`, **pathname** là `/images` sẽ được chỉ định rằng trang được **render** là trang **/images**, trong khi `?of=mountains` sẽ quy định thêm nội dung gì sẽ được hiển thị trên trang **/images** đó.
## Route matching ##
**SPA** phụ thuộc vào **router**, **router** là tập hợp danh sách các **route**, mỗi một **route** sẽ tương ứng với 1 **location** nó được **match** với nhau.

Một **route** có thể chỉ cố định `/about` hoặc có thành phần động như `/album/:id` với `id` là thành phần bất kì người dùng có thể truyền vào.

Ví dụ :
```
const routes = [
  { path: '/' },
  { path: '/about' },
  { path: '/album/:id' }
];
```
Trong quá trình **user** thực hiện **navigate** trong **SPA**, **location** sẽ được so sánh để tìm ra **route** tương ứng ( thường chỉ cần so sánh **pathname** của **location**), Sau khi tìm được **route** tương ứng, **router** sẽ thực hiện việc **render** lại nội dung **SPA** cho người dùng.

Việc **render** có nhiều cách :
- Một trong số đó là mô phỏng theo [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) , **dev** sẽ đưa cho **router** một **function** sẽ có nhiệm vụ **render** lại **SPA** và **router** sẽ thực hiện việc gọi lại **function** này.
- 
![](https://images.viblo.asia/7976f7e6-4145-4db8-b01c-62ce2afbb5d0.png)

## In-App navigation ##
Khi **user** **click** vào một đường dẫn, thường thì đó là thẻ `<a>`, thông thường các **browser** đều có **behavior** mặc định để gắn với 1 **event** để thực hiện việc **navigate**, khi bạn muốn **override** ( ghi đè ) lại **behavior** của trình duyệt thì có thể sử dụng `event.preventDefault()` của **JavsaSript**, và hầu như những **framework SPA** đều có hỗ trợ cho việc này.

Và khi **behavior** mặc định của **browser** bị ghi đè lên, **loaction** không bị thay đổi nữa, thay vào đó quá trình **navigate** sẽ do chính chúng ta tự định nghĩa và thực hiện việc điều khiển.

## Browser xử lý location như thế nào ? ##

Mỗi một **tab browser** có một thứ gọi là **browser context** , **browser context** là thứ để quản lý một **session history** - về bản chất là một mảng các **location entry**.

Một **entry** sẽ chứa thông tin về một **location**: **url** của **location**, **Document** tương ứng với **location**, **state** đã được **serialized**, cũng như 1 vài thuộc tính khác. Mỗi một **entry** đều có **index** đi kèm quy định thứ tự của nó trong mảng **session history**. **Browser context** cũng giữ thông tin về **entry** hiện thời đang được sử dụng.

![](https://images.viblo.asia/4aef5029-8554-4723-b456-d112e0d05282.png)

### Document ###
Khi **browser** thực hiện việc **navigate**, một **request** sẽ được gửi tới **server** và **browser** sử dụng **response** nhận về để tạo một **object** `Document`. **object** này mô tả trang ( cây DOM của trang ...) và các **method** để tương tác với nó. Ví dụ : **hàm** `window.document` chính là **hàm** để tương tác với `Document` của **location entry** hiện tại.

![](https://images.viblo.asia/589720cb-711d-4871-ae54-5878eaaa8ed1.png)

### Session history ###
Khi **user** **click** vào **link** và **navigate**, **tab browser** sẽ **build** thêm vào **session history**. Mỗi một **navigate** sẽ tạo một **request** tới **server** và tạo một **entry** mới ( bao gồm 1 `Document` ).

![](https://images.viblo.asia/158245c1-a4c2-4e35-bb51-2642d17355a1.png)

Khi **user** ấn nút **Back** trên **browser**, **browser** sẽ sử dụng **entry** hiện tại để xác định **entry** mới (`current.index -1`). `Document` của **entry** trước đó sẽ được **load** lại vào **browser**.

![](https://images.viblo.asia/4f06f8d9-2131-455f-bee0-e9d996fd501a.png)

Lúc này, khi **user** **click** vào một **url**, các **entry** nào nằm phía sau **entry** hiện tại ( những trang trước khi **back** về ) sẽ bị **xóa** và thay bởi **entry** mới.

![](https://images.viblo.asia/1b973140-ebe1-473a-90ea-63bbf882f50c.png)

Trong trường hợp **user** dùng **navigate** tới đúng **page** hiện tại (location mới có cùng pathname, search và hash với location hiện tại), **entry** hiện tại sẽ cũng sẽ bị thay thế bằng **entry** mới, nhưng sẽ không ảnh hưởng gì đến các **entry** khác.

![](https://images.viblo.asia/c4e89e60-ae00-48f9-9ab2-c394d0b4e61b.png)

Trên đây là cơ chế hoạt động của **navigation**, tuy nhiên việc thực hiện **navigate** mà không cần phải **request** đến **server**.

Làm cách nào để **SPA** thực hiện được điều này ?
## History API ##
Ban đầu, **SPA** hooạt động trên cơ chế là ta có thể thay đổi `hash` của **location** và 
**browser** sẽ tạo một `location entry` mới mà không cần gửi **request** tới **server** , sau này nguyên một bộ **[History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)** với mục đích hỗ trợ cho việc phát triển **SPA**.

Thay vì phải khởi tạo hẳn một `document`, với mỗi một **location**, **History API** sẽ tái sử dụng `document` hiện thời, chỉ **update** ( cập nhật ) cho nó phù hợp với **location** mới.

**History Api** có 3 **hàm** chính: `pushState()`, `replaceState()` và `go()`. 3 **hàm** này ( và các hàm còn lại của **History API** ) và có thể được gọi thông qua `window.history`.

![](https://images.viblo.asia/4c308881-fb36-4472-9af2-bd011cb6a7d7.png)

Note: Về vấn đề hỗ trợ - tất cả các **browser** hiện nay đều [hỗ trợ History Api](https://caniuse.com/#feat=history).
### pushState() và replaceState() ### 
Cả 2 **hàm** `pushState()` và `replaceState()` đều có chung các **argument**:
- **argument** đầu tiên là **state**: **argument** mặc định có thể **null**, **argument** này chính là **state** của **SPA**.
- **argument** thứ 2 là **title**
- **argument** thứ 3 là **path** - là địa chỉ mà ta muốn **navigate** tới. Đây có thể là 1 **url** đầy đủ, hoặc chỉ là ở dạng **relative path**, nhưng nó luôn phải thuộc **application** hiện tại (chung protocol và hostname), nếu không, **browser** sẽ văng ra lỗi **DOMExeption**.
```
history.pushState(null, '', '/next-location');
history.replaceState(null, '', '/replace-location');

// attaching state to an entry
history.pushState({ msg: 'Hi!' }, '', '/greeting');

// while on medium.com
history.pushState(null, '', 'https://www.google.com');
// throws a DOMException
```

**Hàm** `pushState()`  sẽ thêm một **entry** vào **session history** phía sau **entry** hiện tại. Nếu như có **entry** nào đó đang nằm phía sau **entry** hiện tại rồi, nó sẽ bị thay thế bởi **entry** mới, cơ chế này giống như cơ chế bình thường **click** thẻ `<a>` như phía trên mình có nói qua.

![](https://images.viblo.asia/90ab1cfd-3bc6-4356-9a81-684fbf26c9a6.png)

**Hàm** `replaceState()` sẽ thay thế **entry** mới với chính **entry** hiện tại trong **session history**. Các **entry** khác đều không bị ảnh hưởng. cơ chế này giống như cơ chế bình thường **click** thẻ `<a>` như phía trên mình có nói qua, nhưng `replaceState()` khác ở chỗ nó có thể thay thế **entry** hiện tại với bất kì **locaction** nào.

![](https://images.viblo.asia/4d5b8bf0-7fe7-4d95-9c39-75177648bc55.png)

### go() ###
**hàm** `go()` là một cách để mô phỏng lại 2 nút **back** và **foward** của **browser**.

![](https://images.viblo.asia/1fce3333-163f-4f18-947b-4309970061f9.png)

**Hàm** `go()` chỉ nhận 1 **argument**: Số các **entry** cần lấy ra khỏi **history**. Một con số dương tương đương với hành động **foward**, số âm tương đương với **back**, số 0 sẽ tương đương với với **reload** trang.
```
go(-1); // back 1 lần
go(1); // forward tiến tới 1 trang
go(-10); // back lại 10 trang
go(0); // reload
go(); // reload
```
Ngoài ra, còn 2 **hàm** `history.back()` và `history.foward()`, sẽ tương đương với `history.go(-1)` và `history.go(1)`.
### State ###
Một trong các **property** của **entry** là **state**, 2 **hàm** `pushState()` và `replaceState()` trong **argument** có chứa **state**. Vậy **state** là gì ?

**state** là dữ liệu ( data ) gắn với một **entry**. Nó cố định **navigation** - có nghĩa là khi bạn thêm một **state** vào một **entry**, **navigate** đi, sau đó quay trở lại **entry** trước, **state** sẽ vẫn nằm ở đó. **state** sẽ được gắn vào **entry** bằng 2 **hàm** `pushState()` và `replaceState()`, và có thể được lấy ra bằng `history.state`.

![](https://images.viblo.asia/738522b4-7217-47c9-9f70-91100561b237.png)

Một số ràng buộc đối với **state**:
- **state** phải được **serialize** trước.
- **state** có giới hạn về kích thước ( ví dụ: Firefox tối đa là 640kb ).
- Khi ta **navigate** trực tiếp vào một **url** thì **state** sẽ được **set** mặc định là **null**, do vậy nếu ta set logic trang **SPA** phụ thuộc vào **state** để **render**, ta sẽ gặp vấn đề khi người dùng truy cập thẳng từ **url** đó,

Do vậy **state** sẽ hữu ích hơn khi dùng nó để lưu trữ dữ liệu không phụ thuộc vào việc **render**.
### Navigate trong SPA sử dụng History API ###
Như đã đề cập ở trên, ta có thể sử dụng một **click  handler** - trong đó đã **override** lại cơ chế mặc định của **browser** bằng `event.preventDefault()`.
**Handler** đó có thể gọi `pushState()` và `replaceState()` để thực hiện **navigation** mà không cần **ping** tới **server**. Tuy nhiên, **History API** chỉ cập nhật ( update ) **session history**,  vì vậy **handler** cũng cần tương tác với cả **router** để cho **router** biết **location** mới.

Có nhiều cách để xử lý 1 **handler** như thế này. Nếu như bạn sử dụng những **framework** như **Vue** hay **React**, bạn có thể viết như ví dụ sau:

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

Việc sử dụng **History API** khiến cho việc điều khiển **navigate** **SPA** dễ dàng hơn. Tuy nhiên, ta vẫn phải xử lý thêm 1 trường hợp nữa: khi **user** **click** vào 2 nút **back** và **foward** của **browser**.
## Xử lý với 2 nút back và foward ##
Khi 2 nút **back** và **foward** được **click** (cũng như khi `history.go()` được gọi), **browser** sẽ thực hiện 1 lời gọi `popstate`. Để bắt được sự kiện này, ta phải thêm một **event listener**.
```
window.addEventListener('popstate', event => {
  // thông báo cho router biết việc navigate được thực hiện
}, false);
```
**Session history** sẽ được **update** ngay khi **event** trên được gọi, lúc này ta cần thông báo cho **router** biết rằng **location** hiện tại đã thay đổi.
## Navigate bằng cách thay đổi trực tiếp trên thanh url ##

Nếu **user** thay đổi **url** bằng cách sửa trực tiếp trên thanh **url**, việc này sẽ tạo mới một `Document`. **History API** lúc này chỉ ngăn việc **reload** lại với các **entry** có cùng `Document` - nghĩa là việc gọi `history.go()`hay **click** vào 2 nút **forward/back** sau lúc này sẽ thực hiện việc **load** lại **page** hoàn toàn.
 
 # Kết bài # 
 Bài viết này, mình và các bạn cùng tìm hiểu **SPA** thực hiện việc **render** nội dung, khi thực hiện việc **navigate** như thế nào một cách cơ bản, mọi đóng góp các bạn có thể bình luận phía dưới.
 
**Mình có tham khảo tại các bài viết**

https://viblo.asia/p/single-page-app-dieu-khien-history-nhu-the-nao-1VgZvEoMKAw
https://blog.pshrmn.com/entry/how-single-page-applications-work/

**Xin cảm ơn !!**