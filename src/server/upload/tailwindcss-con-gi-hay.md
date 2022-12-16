## 1. Mở đầu
<hr>

Trong [bài viết trước đây](https://viblo.asia/p/tailwindscss-co-gi-hay-WAyK8A2mZxX) của mình về thư viện `TailwindCSS`  đã giới thiệu qua cho các bạn về những ưu điểm, những tính năng cũng như những tiện ích mà nó mang lại cho chúng ta. Tại thời điểm mình viết bài nói trên thì TailwindCSS lúc đó đang là phiên bản 2x còn với bài viết này mình sẽ giới thiệu đến các bạn các tính năng mới hơn, hay hơn cũng như những điều thú vị mà mình nhận thấy sau khi có nhiều thời gian trải nhiệm và sử dụng thư viện này ở phiên bản 3x hơn. Nào chúng ta cùng bắt đầu nhé.

## 2. TailwindCSS
<hr>

### a. JIT mode

JIT mode hay tên đầy đủ là Just-in-Time mode là một tính năng mới và với bản thân mình là hay ho nhất trong phiên bản 3 của TailwindCSS. Trên thực tế ở phiên bản 2.1 cũng đã giới thiệu đến nó tuy nhiên ở thời điểm này nó chỉ là tính năng thử nghiệm chứ chưa thực sự stable cho đến bản 3. Đối với các thư viện CSS khác như Boootstrap hay TailwindCSS thì ta luôn cần một thao tác đó là import toàn bộ các class css của thử viện vào file `index.html` hoặc `index.js`. Điều này sẽ dẫn đến một số nhược điểm sau:
- Sau này khi chúng ta build ra sản phẩm cuối cùng thì sẽ cần thêm một số thao tác để loại bộ các style không dùng đến này đi để tối ưu kích thước file style của chúng ta. Tuy nhiên ở môi trường dev thì ta vẫn là dùng toàn bộ thư viện và điều này đôi khi có thể làm cho quá trịnh chạy dev của chúng ta chậm đi.
- Với TailwindCSS thì với tính năng `variant` ví dụ như `focus:`, `hover:` thì ta chỉ dùng được một số class kết hợp với các state này thôi. Còn muốn dùng thêm ta phải config bổ sung trong file `tailwind.config.js`. Sở dĩ có điều này vì nếu TailwindCSS mặc định cho bạn sử dụng tất cả thì bundle size sẽ rất lớn.

Để giải quyết vấn đề này thì TailwindCSS đã releas  ra tính năng là JIT. Về cơ bản bạn có thể hiểu là thay vì bạn phải import một file chứa toàn bộ style của TailwindCSS thì khi bạn dùng đến class nào trong file html hay các component React/ Vue của bạn thì TailwindCSS mới generate ra class đó thôi và việc này cũng diễn ra gần như tức thì và không ảnh hưởng gì đến quá trình hot reload của bạn cả. Cũng nhờ vậy mà ta có thể thoải mái sử dụng các `variant` mà khong cần config thêm nữa.

Ngoài ra JIT còn mang đến cho chúng ta một khả năng mới đó là tạo ra các class mới mà TailwindCSS không có sẵn vô cùng nhanh chóng. Như bạn đã biết mặc định padding nhỏ nhất mà TailwindCSS cung cấp là `p-1` tương ứng với `padding: 4px`. Tuy nhiên trong một số trường hợp ta lại muốn `padding-top: 1px` hay `padding-top: 2px`. Để giải quyết vấn đề này trước kia ta sẽ phải tự tạo ra các class mới:
```css
.pt-1px {
    padding-top: 1px
}
.pt-2px {
    padding-top: 2px
}
```
Hoặc thêm config trong file `tailwind.config.js`. Cá nhân mình thấy việc này hơi bất tiện vì đang code dở file này lại phải mở file khác để thêm cái này cái kia vào rồi mới code được tiếp. Tuy nhiên nhờ có JIT mode mà ta có thể làm như sau:
```html
<p clas="pt-[1px]">Something</p>
```
Bạn để ý khi dùng cú pháp `pt-[1px]` sẽ tự động tạo ra class css như sau:
```css
.pt-[1px] {
    padding-top: 1px;
}
``` 
Siêu siêu tiện lợi phải không nào. Ta có thể dùng cách này cho rất nhiều các thuộc tính khác như margin, font-size, ... . Nếu bạn muốn hiểu hơn chi tiết về tính năng này cũng như toàn bộ những ưu điểm mà nó mang lại thì có thể tham khảo thêm ở [đây](https://tailwindcss.com/blog/just-in-time-the-next-generation-of-tailwind-css).

### b. @apply

Như trước đây mình có đề cập, TailwindCSS cung cấp cho chúng ta rất nhiều các utility class và chúng ta chỉ cần ghép nối các class này nhau để `làm đẹp` cho UI của chúng ta. Cụ thể với một button thì ta có thể thêm các class để thu được kết quả như sau:

![](https://images.viblo.asia/c6665e56-3dbe-4508-94d0-f42422cda286.gif)

Để tạo được button như trên thì mình sẽ cần ghép các class như sau:

```html
<!-- Button xanh lá -->
<button class="cursor-pointer rounded-full px-8 py-2 font-bold text-white focus:ring-2 focus:ring-opacity-50 focus:ring-offset-2 bg-teal-500 hover:bg-teal-600 focus:ring-teal-500 ">
    Button
</button>
<!-- Button tím -->
<button class="cursor-pointer rounded-full px-8 py-2 font-bold text-white focus:ring-2 focus:ring-opacity-50 focus:ring-offset-2 bg-violet-500 hover:bg-violet-600 focus:ring-violet-500">
    Button
</button>
```

Nếu bạn để ý thấy ở đây chúng ta đang có một vấn đề đó là 2 button này gần như giống hệt nhau và chỉ khác nhau về màu sắc mà thôi. Để giải quyết vấn đề này, có thể bạn sẽ nghĩ ngay tới việc sử tạo ra một class có tên là `.btn` sau đó bắt đầu sử dụng code css để tạo ra button như nói trên (lưu ý ở đây chúng ta sẽ bỏ qua màu sắc mà chỉ tập chung vào hình dạng chung của button mà thôi). Với idea này thì kết quả ta thu được một class mới như sau:
```css
.btn {
    cursor: pointer;
    border-radius: 100%;
    padding: 8px 32px;
    font-weight: bold;
    color: white;
}
.btn:focus {
    ...
}
.btn:hover {
    ...
}
```
Sau đấy ta dùng class này như sau:
```html
<button class="btn bg-violet-500 hover:bg-violet-600 focus:ring-violet-500">
    Button
</button>
```
Tuy nhiên khi bạn đang dùng các utility class của TailwindCSS rồi mà lại phải quay lại tạo ra class và lấp đầy nó bởi các thuộc tính CSS thì khá là chán và đôi khi ta cũng không rõ thuộc tính CSS mà TailwindCSS đang sử dụng cho class của họ. Ví dụ ở đây có class `ring-2` hay `ring-offset-2` thì bản thân mình cũng không rõ TailwindCSS đang làm như nào và lại phải truy cập vào document để copy nó ra. Nhưng thực tế chúng ta không cần phải làm như này mà có thể sử dụng từ khóa là `@apply`. Tất cả những gì chúng ta cần làm là tạo ra một class `.btn` sau đó copy các class mà ta đang dùng vào class `.btn` mới tạo này kết hợp với từ khóa `@apply` như sau:
```css
.btn {
    @apply cursor-pointer rounded-full px-8 py-2 font-bold text-white focus:ring-2 focus:ring-opacity-50 focus:ring-offset-2;
}
```
Với cách làm trên sẽ mang lại kết quả như chúng ta mong muốn đồng thời cũng ta cũng không cần phải code CSS chay lại nữa. Đây là một tính năng mà mình cho là khá hay của TailwindCSS mang lại cho chúng ta để có thể nhanh chóng tạo ra các class mới để tái sử dụng ở nhiều chỗ khác nhau. Về cách dùng thì chỉ đơn giản như mình vừa demo ở trên cho các bạn thôi. Lưu ý ở đây bạn chỉ nên sử dụng cách này khi ta có nhu cầu tái sử dụng một số thuộc tính ví dụ như với button nói trên chứ không nên sử dụng `@apply` chỉ để thu gọn danh sách class mà thôi.

### c. Animation

Thêm một cái hay nưa mà v3 mang lại cho chúng ta đó là các animation đơn giản và phổ biến ta có thể sử dụng ngay mà không cần tạo `@keyframes` để tự tạo animation nữa. Tất cả những gì chúng ta cần làm là thêm animation mà mình mong muốn dưới dạng class vào element của chúng ta mà thôi. Giả sử chúng ta có một button và đang cần hiển thị trạng thái loading như sau:

![](https://images.viblo.asia/3806c095-9b37-4bd6-ad63-16481102c0ca.gif)

Thì ta chỉ cần thêm class `animate-spin` vào icon của chúng ta và nó sẽ bắt đầu xoay như hình nói trên:
```html
<button type="button" class="bg-indigo-500 ..." disabled>
    <i class="loading-icon animate-spin" />
    Processing...
</button>
```
Vô cùng đơn giản và tiện lợi đúng không nào, ngoài animation nói trên thì ta còn có các animation khác như:

![](https://images.viblo.asia/47d88d2f-7ac1-42ce-aa67-aaf75fe8e63f.gif)

![](https://images.viblo.asia/ca1c2a4a-abe4-486e-af0e-41b25eade610.gif)

![](https://images.viblo.asia/7f4980e4-8dbf-478f-b90d-ff4762a6ad0d.gif)

Chi tiết các bạn có thể tham khảo thêm ở [đây](https://tailwindcss.com/docs/animation).

### d. Plugins

Ngoài các utility class mà TailwindCSS cung cấp sẵn cho chúng ta ra thì nó còn cho phép chúng ta cài thêm một số plugin hay ho khác để hỗ trợ chúng ta. Một trong plugin mà mình hay sử dụng nhất đó là `@tailwindcss/line-clamp`. Để cài đặt một plugins, ta chỉ cần dùng lệnh `npm install` hoặc `yarn add` để tải package đó về. Tiếp đó ta mở file `tailwind.config.js` lên, tại mục `plugins` và thêm như sau:
```js
module.exports = {
  theme: {
    extend: {
      // ...
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
```
Và chỉ đơn giản như trên thôi, ta đã cài xong plugin để sử dụng việc tiếp theo ta cần làm là đọc lại document của plugin đó để xem cách dùng mà thôi. Ở ví dụ này, mình đang sử dụng plugin có tên là `line-clamp` với tác dụng nó sẽ tự động thu ngắn đoán văn bản của chúng ta về còn `n` dòng và thêm dấu `...` ở cuối. Giả sử mình có mẫu UI như sau:

![image.png](https://images.viblo.asia/1dbdb843-c3a3-4e5e-a660-78edd5d72e7c.png)

Đây đơn giản chỉ là một cái card với title và đoạn text mô tả rất dài. Nếu dữ nguyên cả đoạn text như này thì nhìn nó không được đẹp cho lắm và hơn nữa trên thực tế bạn sẽ gặp nhiều trường hợp mà có nhiều card ở cạnh nhau và cần có độ cao giống nhau, cụ thể ở đây ta sẽ cần làm cho phần nội dung mô tả luôn có chiều cao cố định hay số dòng text cố định. Để làm điều này, ở trong element chứa class nói trên, ta chỉ cần sửa lại như sau:
```html
<p class="line-clamp-5">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</p>
```
Và đây là kết quả thu được:

![image.png](https://images.viblo.asia/0df4c0a2-fad4-46cd-aca9-ecdae5cacd99.png)

Bằng cách sử dụng class có tên là `line-clamp-n` với `n` là số dòng tối đa bạn muốn hiển thị cho đoạn text, ta đã có thể nhanh chóng làm đẹp hơn cho card của chúng ta. Ngoài plugin này ra bạn cũng có thể tham khảo thêm các plugin hay ho khác của TailwindCSS, cụ thể bạn cũng có thể xem ở [đây](https://tailwindcss.com/docs/typography-plugin). 

## 3. Kết bài

<hr>

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã đọc. Nếu trong tương lai mình khám phá ra nhiều điều thú vị hơn thì mình sẽ chia sẻ lại cho các bạn ở các bài viết tiếp theo. Nếu các bạn thấy bài viết hay và bổ ích thì đừng quên để lại một upvote hay share bài viết để ủng hộ mình nhé.