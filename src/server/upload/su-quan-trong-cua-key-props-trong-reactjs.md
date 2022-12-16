## Đặt vấn đề
Nếu bạn đã tìm hiểu hay đang làm việc với `ReactJS`, mình đoán có lẽ bạn đã từng bắt gặp cảnh báo:

![](https://images.viblo.asia/73931b59-e18d-4168-9a7a-834f032213a1.PNG)

khi đang `map()` một mảng danh sách nào đó.

Uhmm thì... sửa theo `Stackoverflow` là được rồi 😹😹 Có bao giờ bạn tự hỏi vì sao phải làm như vậy không?

Trong bài viết này chúng ta sẽ cùng trả lời cho câu hỏi đó nhé !

![](https://images.viblo.asia/2f398cc4-f837-480e-8f2e-eddc41319118.PNG)

## Lý do ReactJS cần `key` props

Khi `state` trong `component` thay đổi, hàm `render()` sẽ trả về một `tree` mới *(`a new tree of React elements`)*, khác với `tree cũ` lúc `state` chưa thay đổi. `ReactJS` sẽ tìm ra những điểm khác biệt thông qua thuật toán `diffing` và `update` lại chúng trên `UI`. Quá trình `match tree cũ và tree mới` gọi là **`reconciliation`**. Bạn có thể tìm hiểu thêm chi tiết về cơ chế `ReactJS` hoạt động với `Virtual DOM` trong [bài viết này](https://viblo.asia/p/original-dom-vs-shadow-dom-vs-virtual-dom-GrLZDQO3lk0#_bonus-virtual-dom-trong-reactjs-11) của mình.

Quay lại với chủ đề của chúng ta: Chính xác thì có ảnh hưởng gì của mảng mà `ReactJS` cần có `key` props?

Giả sử, chúng ta `render` một mảng mà không thêm `key` props:
```javascript:html
<li>Devnote 1</li>
<li>Devnote 2</li>
```
Sau đó, `Devnote 3` được thêm vào. Lúc này:
```javascript:html
<li>Devnote 1</li>
<li>Devnote 2</li>
<li>Devnote 3</li>
```
`ReactJS` bắt đầu so sánh 2 `trees` này để tìm ra điểm khác biệt. Để thực hiện điều này, nó sẽ `cùng-lặp-qua-lần lượt-tất-cả` các phần tử con của cả 2 mảng; `generate` ra chỗ cần cập nhật mỗi khi nhận ra được điểm nào đó khác nhau.

Như vậy thì ở ví dụ trên, phần tử đầu tiên và phần tử thứ 2, okie, giống nhau, phần tử thứ 3 là chỗ được thay đổi, cập nhật thôi ! Nom có vẻ ngon lành cành đào nhỉ 😸😸

Bây giờ, chúng ta lại thêm `Devnote 0` vào trước mảng đó:
```javascript:html
<li>Devnote 0</li>
<li>Devnote 1</li>
<li>Devnote 2</li>
<li>Devnote 3</li>
```
Một lần nữa, `ReactJS` lại lặp, lại so sánh:
- Phần tử đầu của `old tree`(*`<li>Devnote 1</li>`*) với phần tử đầu của `new tree`(*`<li>Devnote 0</li>`*) ⇒ khác nhau ⇒ cập nhật.
- Phần tử thứ 2 của `old tree`(*`<li>Devnote 2</li>`*) với phần tử thứ 2 của `new tree`(*`<li>Devnote 1</li>`*) ⇒ khác nhau ⇒ cập nhật.
- ...

Ồ, có vẻ như có gì đó phát sinh rồi đây !

Cứ vậy thì `ReactJS` sẽ cập nhật lại hết tất cả các phần tử con thay vì nhận ra được *`<li>Devnote 1</li>`, `<li>Devnote 2</li>`, `<li>Devnote 3</li>`* không thay đổi. Điều này sẽ ảnh hưởng tới `performance` của ứng dụng.

Lúc này, `key` props sinh ra cho đời bớt khổ (J4F).

Theo *Trang chủ `ReactJS`*:
> Keys help React identify which items have changed, are added, or are removed.
> Keys should be given to the elements a stable identity.

<br/>

Như vậy, khi chúng ta sửa lại:
```javascript:html
<li key={ 0 }>Devnote 0</li>
<li key={ 1 }>Devnote 1</li>
<li key={ 2 }>Devnote 2</li>
<li key={ 3 }>Devnote 3</li>
```
`ReactJS` sẽ sử dụng `key` này trong quá trình `reconciliation`, so sánh `tree cũ` và `tree mới` thông qua key của từng phần tử, và kết quả là `ReactJS` sẽ nhận ra được phần tử mới là `<li key={ 0 }>Devnote 0</li>` được thêm vào phía trước, các phần tử còn lại chỉ là dịch xuống vị trí kế tiếp mà thôi.

## FAQs
### Nếu không có `key` thì ứng dụng có chạy không ?

Điều này còn tùy vào từng trường hợp. Thông thường, khi chúng ta không dùng `key`, ứng dụng sẽ không báo có lỗi mà chỉ có dòng `Warning` bên phía cửa sổ `Console`. Song, nếu chúng ta thực hiện các hành động làm thay đổi thứ tự của các phần tử trong mảng như *sắp xếp, xóa, etc* thì `có-thể-sẽ-dẫn-đến` các `bugs` khác.

Hãy cùng nhau điểm qua một ví dụ để hiểu rõ ý này nhé !

Giả sử có một danh sách `hobbies`:
```json
{ id: 1, hobby: "📷" },
{ id: 2, hobby: "🎹" }
```
Chúng ta  `render` chúng ra ngoài và cho phép người  thể đánh giá mức độ sở thích *(likes|| loves)* thông qua `<select> tag` như hình dưới đây:

![](https://images.viblo.asia/6c701b33-0d15-454f-b059-5274ee850ebe.png)

Lúc này, dù có `key` hay không thì vẫn có thể `rating` 📷, 🎹 bình thường và không phát sinh ra `bug` nào cả. Như đã nói phía trên thì đó là do chúng ta không thực hiện các hành động xóa, sắp xếp... các phần tử này.

Bây giờ, mình thêm một `button X` vào mỗi phần tử cho phép người dùng xóa phần tử đó:

![](https://images.viblo.asia/433837d2-4c89-40e3-9a70-997a0b05c126.png)

Được rồi, bây giờ bạn `rating` 📷 là `loves` sau đó ấn vào `button X` để xóa nó đi. Thử quan sát nhé:

![](https://images.viblo.asia/3cf6cc5e-88d5-44f1-a5a0-31a4ed956aff.gif)

After the deletion, the 🤪 emoji appears rated as “Very good”, which is wrong because we haven’t changed its rating at all 😦
Sau khi xóa 📷 đi, 🎹 xuất hiện rating `loves` dù trước đó là `likes` và chúng ta chưa hề `rating` nó !?!

Thật không ổn chút nào khi không dùng `key` đúng không nào ^^ Xem demo bug này [tại đây](https://codesandbox.io/s/haoltkeyisimportant-p9727?).

### Sử dụng giá trị của `key` là `index` ?

Có thể khi bạn xem trong các `Tutorial` làm `mini-project` nhỏ hay một số các `demo`, giá trị của `key` là `index` *(trong `map()`)*

Bạn thấy có ổn không 🤔 ? `Spoil` chút là không nha =))

Bởi vì nếu `key` là `index` thì khi ta thay đổi vị trí của các phần tử trong mảng *(xóa, thêm...)*, `index` cũng sẽ thay đổi và lại xảy ra vấn đề như ví dụ `Devnotes` ở mục phía trên. 

## Best practise

Chính ý nghĩa của `key` trong quá trình  `reconciliation`, `key` được `recommend` nên là các `unique value`. Kiểu giá trị của `key` không phải lúc nào cũng phải là `number`, `key` có thể là một `string`, hay thậm chí là `emoji` kìa ^^

Và để thuận tiện và không cần phải suy nghĩ nhiều, chúng ta có thể `set` `id` của mỗi phần tử là giá trị của `key`. 

Cùng sửa lại ví dụ `hobbies` phía trên:
```javascript:html
<li className="hobby-item" key={item.id}>
```
Bây giờ thử kiểm tra lại bên cửa sổ `Console` nhé, warning và bug đề cập phía trên không còn nữa rồi 🎉🎉

## Kết

Chủ đề này có lẽ không quá mới mẻ với các bạn đã và đang làm việc với `ReactJS` *(kể cả các bạn `newbie`)*. Cách `fix` cũng có rất nhiều trên `Stackoverflow` và không có gì quá khó khăn.

Song, thông qua bài viết này, mình vẫn muốn chúng ta cùng nhau tìm hiểu rõ: *Tại sao lại phải dùng `key`, dùng thì nó có tác dụng gì ? Có lý do nào đó bên trong `ReactJS` à? Không dùng thì có `'ổn áp'` không ?, etc.* Mình cảm ơn các bạn vì đã đọc bài viết này và hy vọng rằng nó có thể giúp ích được cho các bạn ^^ Tặng mình **`1 upvote`** để có thêm động lực cho những bài viết sắp tới nha.

![](https://images.viblo.asia/c8bd3a20-1eac-4e69-9f8f-554952ff2aa6.PNG)

*Tham khảo thêm các bài viết về Techniques [tại đây](http://haodev.wordpress.com) ^^*

*Chúc các bạn cuối tuần vui vẻ ^^*

<br/>

***Reference**: [Personal Blog](http://haodev.wordpress.com/), [Medium](https://medium.com/swlh/understanding-the-importance-of-the-key-prop-in-react-f2b92ce65f45), [ReactJS Document](https://www.react.org/).*