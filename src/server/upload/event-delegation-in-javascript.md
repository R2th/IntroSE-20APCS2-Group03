Để hiểu về Event Delegation trước tiên chúng ta cần hiểu về Event Listeners. 

Event Listerners trong Javascrip được hiểu là một hành động tác động lên phần tử HTML mà ta có thể bắt được sự kiện này và thực hiện những hành động nào đó.
Có thể kể đến một vài event sử dụng phổ biến như:
<br>
1. **change**: Một đối tượng HTML đã thay đổi
2. **click**: Người dùng click vào một đối tượng HTML
3. **mouseover**: Người dùng di chuột qua đối tượng HTML
4. **mouseout**: Người dùng di chuột ra khỏi đối tượng HTML
5. **keydown**: Người dùng ấn phím
6. **load**: Trình duyệt đã tải xong
<br>
### addEventListener()
Để thêm một Event Listeners vào đối tượng HTMLchúng ta sử dụng method `addEventListener()`

```Coffee
An Example of the addEventListener() Method
const character = document.getElementById("disney-character");
character.addEventListener('click', showCharactersName);
```
`document.getElementById` là một DOM (Document Object Model), dịch tạm ra là mô hình các đối tượng trong tài liệu HTML. Với DOM Element chúng ta có thể truy xuất đến một phần tử HTML bất kì thông qua các thuộc tính như id, class, name hay thậm chí là tên của phần tử HTML với cú pháp CSS Selector .
<br>
**Cách eventListener hoạt động**
<br>
Khi người dùng click vào HTML element với id  `disney-character` thì eventListener sẽ được thực thi và gọi tới function `showCharactersName`. EventListener được cài đặt khi tải trang. Khi bạn mở một trang web, trình duyệt sẽ download, đọc và thực thi Javascrip.
<br>
```Coffee
const character = document.getElementById("disney-character");
character.addEventListener('click', showCharactersName);
```
Trong ví dụ trên, khi website được tải, eventListener sẽ tìm kiếm phần tử HTML có id là `disney-character` và thiết lập `click event listener` cho phần tử HTML. Điều này có vẻ ổn nếu phần tử HTML đó tồn tại trên trang khi trang được tải, điều gì sẽ xảy ra với eventListener khi phần tử thiết lập được thêm vào DOM sau khi trang được tải?
<br>
### Event Delegation
Event Delegation sẽ giải quyết vẫn đề này. Để hiểu về Event Delegation chúng ta cùng nhìn ví dụ bên dưới !
<br>
![](https://images.viblo.asia/aa98590c-bcc3-42db-b422-3b18d946213f.png)
<br>
List trên có một vài chức năng cơ bản. Chúng ta có thể thêm mục vào trong list, check vào checkbox, clear checkbox. Giả sử các mục được thêm vào sau khi tải trang và không có `eventListener` nào được thêm vào phần tử ở đây là các checkbox. Cùng xem qua đoạn code sau:
<br>
```Coffee
const checkBoxes = document.querySelectorAll(‘input’)
checkBoxes.forEach(input => input.addEventListener(‘click’, ()=> alert(‘Hello!’)))
//an alert should fire when I click on the checkbox (Mickey, Minnie, or Goofy)
```
<br>
Đây là đoạn mã khi tải trang:

```
<ul class=”characters”>
</ul>
```
Và sau khi add thêm các mục vào danh sách:
```
<ul class=”characters”>
 <li>
   <input type=”checkbox” data-index=”0" id=”item0">
   <label for=”item0">Mickey</label>
 </li>
 
 <li>
   <input type=”checkbox” data-index=”1" id=”item1">
   <label for=”item1">Minnie</label>
 </li>
 
 <li>
   <input type=”checkbox” data-index=”2" id=”item2">
   <label for=”item2">Goofy</label>
 </li>
</ul>
```
Các checkbox được thêm sau khi tải trang sẽ không được thiết lập sự kiện. Nếu chúng ta click vào checkbox, expect là một popup 'Hello!'. Do các checkbox được thêm sau khi tải trang nên sẽ không có bất kỳ popup nào xuất hiện.
<br>
![](https://images.viblo.asia/c8f73400-219a-477d-bd00-049ad321d9e5.gif)
<br>
**Vậy làm sao để giải quyết vấn đề này?**
<br>
Thay vì thiết lập sự kiện cho các phần tử được tạo sau khi tải trang thì chúng ta sẽ tìm kiếm phần tử xuất hiện trên trang khi trang được tải.
```
<ul class=”characters”> // PARENT - ALWAYS ON THE PAGE
 <li>
   <input type=”checkbox” data-index=”0" id=”char0"> //CHILD 1
   <label for=”char0">Mickey</label>
 </li>
 
 <li>
   <input type=”checkbox” data-index=”1" id=”char1"> //CHILD 2
   <label for=”char1">Minnie</label>
 </li>
 
 <li>
   <input type=”checkbox” data-index=”2" id=”char2"> //CHILD 3
   <label for=”char2">Goofy</label>
 </li>
</ul>
```
Thay vì thiết lập sự kiện cho phần tử con `<li>` thì chúng ta thiết lập cho phần tử cha `<ul>`.
```
<ul class=”characters”>
</ul>
<script>
  function toggleDone (event) {
    console.log(event.target)
  } 
  const characterList = document.querySelector('.characters')
  characterList.addEventListener('click', toggleDone)
</script>
```
Giờ chúng ta đã thiết lập `eventListener` cho phần tử cha `<ul>` với class `.characters`, thẻ `<ul>` hiện tại là một danh sách rỗng khi tải trang. Điều gì xảy ra khi chúng ta click vào checkbox (Mickey, Minnie or Goofy) sau khi trang được tải? **console.log**  để xem nhé.
### Console.log(event.target)
Sau khi chạy `console.log(event.target)` chúng ta thu được kết quả sau:
<br>
![](https://images.viblo.asia/b8307be5-de77-4ad8-9d43-6db667f9e0ca.png)
<br>
`event.target` sẽ tham chiếu đến phần tử được thiết lập sự kiện. Hay nói cách khác, nó xác định thành phần HTML mà sự kiện đã xảy ra.
Sự kiện trong trường hợp ví dụ này là click chuột! Phần tử hay đối tượng xảy ra sự kiện là thẻ `<input />`.
### Console.log(event.currentTarget)
Nếu chúng ta thử chạy `console.log(event.currentTarget)` chúng ta sẽ nhìn thấy một vài sự khác biệt.
<br>
![](https://images.viblo.asia/0bda047f-1f76-4441-810a-c7b80d66148d.png)
<br>
`event.currentTarget` xác định target hiện tại cho sự kiện, khi sự kiện đi qua DOM.  Hay nói cách khác `event.currentTarget` sẽ trả về thành phần mà trên đó `eventListener` được thêm vào, trong ví dụ này là thẻ `<ul>` hay class `.characters`.

**Viết Event Delegation trong  JavaScript**
```
//Event Delegation
function toggleDone (event) {
  if (!event.target.matches(‘input’)) return
  console.log(event.target)
  //We now have the correct input - we can manipulate the node here
}
```
Về cơ bản,  nếu `event.target` được click không khớp với tham số hay phần tử được truyền vào ở đây là thẻ `<input>` thì sẽ thoát function. Ngược lại, nếu nếu `event.target` được click là thẻ `<input>` thì sẽ tiếp tục thực thi các mã bên trong function. 
### Event Bubbling
Nhưng điều gì xảy ra khi bạn click chuột?
Khi bạn click vào một phần tử thì đồng nghĩa bạn cũng click lên phần tử cha của phần tử đó, điều này gọi là `event bubbiding`.
Đây là một ví dụ:
```
<div class=”one”>
  <div class=”two”>
    <div class=”three”>
    </div>
  </div>
</div>
<script>
  const divs = document.querySelectorAll('div');  
  function logClassName(event) {
    console.log(this.classList.value);
  }
  divs.forEach(div => div.addEventListener('click', logClassName));
</script>
```

Chúng ta có 2 div: div1, div2, div3. Mỗi div sẽ có `eventListener` riêng biệt. Bây giờ hãy mở trình duyệt của bạn lên và click vào div3 `console.log(this.classList.value)` sẽ cho thấy các class mà chúng ta click vào.
<br>
![](https://images.viblo.asia/34e3071d-7a8b-4440-8d86-460580047646.gif)
<br>
Như chúng ta thấy, khi cick vào div3 expect `console.log` trả về một class là `three`. Tuy nhiên chúng ta nhận được cả 3 class khi click vào div3. Đó là `event bubbing`.
Trở lại với ví dụ về Event Delegation.
```
<ul class=”characters”> // PARENT -- This is where the listener is!
 <li>
   <input type=”checkbox” data-index=”0" id=”char0"> //CHILD 1
   <label for=”char0">Mickey</label>
 </li>
 
 <li>
   <input type=”checkbox” data-index=”1" id=”char1"> //CHILD 2
   <label for=”char1">Minnie</label>
 </li>
 
 <li>
   <input type=”checkbox” data-index=”2" id=”char2"> //CHILD 3
   <label for=”char2">Goofy</label>
 </li>
</ul>
<script>
  const characterList = document.querySelector('.characters');
  characterList.addEventListener('click', toggleDone);
</script>
```
Chúng ta chỉ có một `eventListener` được đặt trong thẻ `<ul>`. Khi chúng ta nhấp vào phần tử con của thẻ `<ul>` là thẻ `<input>` thì `eventListener` cũng sẽ được kích hoạt do `event bubbing`.
<br> <br>
*Do `event bubbing`, chúng ta có thể đặt `eventListener` trên một phần tử HTML cha và `eventListener` đó sẽ được thực thi bất cứ khi nào một sự kiện xảy ra trên bất kỳ phần tử con nào của nó - ngay cả khi các phần tử con này được thêm vào trang sau khi tải.*
<br> <br>
Tài liệu tham khảo:
1. [https://medium.com/](https://medium.com/@bretdoucette/part-4-what-is-event-delegation-in-javascript-f5c8c0de2983)