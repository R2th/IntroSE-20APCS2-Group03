CSS flexbox là một one-dimensional(hay còn gọi là 1D) layout pattern, một trong những pattern giúp bạn dễ dàng thiết kế layout một cách linh hoạt và hiệu quả. Phân chia không gian giữa các items và kiểm soát căn chỉnh chúng trong container flex layout(vùng chứa). Với flexbox, chúng ta có thể dễ dàng sắp xếp các items từ trái sang phải, từ trên xuống dưới, đồng thời kiểm soát khoảng cách và thứ tự của các items trong container.
### Làm thế nào để nó hoạt động?
Trước khi đi vào tìm hiểu sâu hơn về Flexbox, chúng ta cần nắm qua cấu trúc của Flexbox là như thế nào đã:
![](https://images.viblo.asia/0c116fbb-972d-4162-8506-bac8605cd704.png)

Trong flexbox thì chủ yếu có hai thành phần chính là: thùng chứa cha (flex container) và các phần tử con nằm bên trong (flex items).<br>
Ngoài ra chúng ta cũng cần quan tâm tới một số thuộc tính sau:<br>
* **main start, main end, cross start, cross end:** Điểu bắt đầu của container theo main axis được gọi là main start, điểm kết thúc của container theo main axis gọi là main end, với cross start và cross cũng tương tự nhưng dựa theo cross axis.
*  **main axis:** Trục này chính là hướng của các item hiển thị, mặc định thì sẽ `chạy từ trái qua phải.`
* **cross axis:** Trục này vuông góc với `main axis`, `chạy từ trên xuống dưới.`
* **main size:** Là kích thước của mỗi item dựa theo trục main axis.
* **cross size:** Là kích thước của mỗi item dựa theo trục cross axis.

### Các thuộc tính của flex container
Dưới đây là một số thuộc tính có thể sử dụng đối với flex container:
* display
* flex-direction
* flex-wrap
* flex-flow
* justified-content
* align-items
* align-content

#### Không sử dụng flexbox
```css
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
</div>
```
![](https://images.viblo.asia/190fc1a4-7425-461c-b719-3a10e098136e.png)
#### Dùng display để áp dụng flexbox
Chúng ta cần phải sử dụng thuộc tính `display`. Đây là cách mà chúng ta định nghĩa một flex container, và cũng là việc bắt buộc nếu bạn làm việc với flexbox.
```html
<style>
.box {
    display: flex;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
</div>
```
![](https://images.viblo.asia/c12d937b-5144-4cb5-a0f2-7eecfdea5d05.png)
#### flex-direction
`flex-direction` dùng để chỉ định hướng hiển thì của các item, việc thay đổi hướng hiển thị flex cũng thể có thể cho phép ta thay đổi vị trí của các flex item.
#####  flex-direction: row
`flex-direction: row` là giá trị mặc định khi sử dụng flexbox, không thực hiện bất kỳ thay đổi nào, chỉ đặt các item `từ trái qua phải` theo trục chính.
```html
<style>
.box {
    display: flex;
    flex-direction: row;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
</div>
```
![](https://images.viblo.asia/a9620b86-cea6-4a9a-aa77-f8d16654a546.png)
#####  flex-direction: row-reverse
Giống với tên gọi, `flex-direction: row-reverse` ngược lại với `row`, các item sẽ được đặt `từ phải qua trái`.
```html
<style>
.box {
    display: flex;
    flex-direction: row-reverse;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
</div>
```
![](https://images.viblo.asia/3c89c655-03e7-4ff3-83aa-eb400da5b81e.png)
#####  flex-direction: column
Khi chúng ta xét `flex-direction: column`, lúc này trục chính sẽ đi từ trên xuống dưới vậy nên giờ đây các items sẽ được xếp chồng lên nhau.
```html
<style>
.box {
    display: flex;
    flex-direction: column;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
</div>
```
![](https://images.viblo.asia/ba02427d-c034-4593-b6d9-ff91201d33c0.png)
#####  flex-direction: column-reverse
Khi đó các items sẽ được xếp chống lên nhau nhưng theo chiều ngược lại. Hay để ý sẽ thấy ở ví dụ trên (1) sẽ ở trên cùng, nhưng khi sử dụng `column-reverse` (1) sẽ ở dưới cùng.
```html
<style>
.box {
    display: flex;
    flex-direction: column-reverse;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
</div>
```
![](https://images.viblo.asia/984336e9-d8f3-4b06-955e-0f54144eb5dc.png)
#### flex-wrap
`flex-wrap` dùng để kiểm soát việc bọc các items nằm gọn trong container. Nếu chúng ta giảm chiều rộng của trình duyệt, chúng ta có thể không nhìn thấy một số item trên cùng một dòng. Thuộc tính `flex-wrap` có thể giải quyết vấn đề đó:
* nowrap (mặc định): Không có gì thay đổi
* wrap: các items sẽ được bọc trọn trong container 
* wrap-reverse

```html
<style>
.box {
    display: flex;
    flex-wrap: nowrap;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
    <div class="box-item">5</div>
    <div class="box-item">6</div>
    <div class="box-item">7</div>
    <div class="box-item">8</div>
    <div class="box-item">9</div>
</div>
```
nowrap
<br>![](https://images.viblo.asia/49300129-3f31-4e69-becc-61eb42b234f6.png)<br>
wrap
<br>![](https://images.viblo.asia/7b855427-cdd0-423b-8336-9c513649a01e.png)<br>
wrap-reverse
<br>![](https://images.viblo.asia/6c2f9d35-2a1b-4500-bfa0-71028cd30a13.png)<br>
#### flex-flow
`flex-flow` là cách viết rút gọn của `flex-direction` và `flex-wrap`. Trong `flex-flow` giá trị đầu tiên là `flex-direction` và thứ 2 là `flex-wrap`
```html
<style>
.box {
  display: flex;
  flex-flow: row-reverse wrap;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
    <div class="box-item">5</div>
    <div class="box-item">6</div>
    <div class="box-item">7</div>
    <div class="box-item">8</div>
    <div class="box-item">9</div>
</div>
```
![](https://images.viblo.asia/8af9974a-8929-438c-9b4d-3f822c91806a.png)
#### justified-content
`justified-content` dùng để căn chỉnh vị trí của các items so với trục chính(main axis).
Có 6 giá trị có thể dùng đối với thuộc tính `justified-content`:
* flex-start: sẽ đặt item bắt đầu từ main start (và đây cũng là giá trị mặc định)
* flex-end:sẽ đặt item bắt đầu từ main end
* center: sẽ đặt tất cả item ở giữa trục main axis
* space-between: sẽ chia đều khoảng cách thừa và thêm nó vào giữa các item
* space-around: sẽ chia khoảng cách ở đầu và cuối. Khoảng cách ở đầu và cuối sẽ bằng 1 nửa khoảng cách ở giữa 2 item với nhau
* space-evenly: sẽ chia khoảng cách đều khoảng cách giữa các item với item, item và main start, item với main end bằng nhau

```html

<style>
.box {
  display: flex;
  justify-content: flex-start;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
</div>
```
flex-start
<br>![](https://images.viblo.asia/0f7f0453-65b0-4796-925c-9f04c2318614.png)<br>
flex-end
<br>![](https://images.viblo.asia/08c09406-104a-4542-b42c-30be20375698.png)<br>
center
<br>![](https://images.viblo.asia/42059f30-a8ed-4c03-8a69-06fb2dce2333.png)<br>
space-between
<br>![](https://images.viblo.asia/85000744-07a2-4e7b-994f-0893aacdde92.png)<br>
space-around
<br>![](https://images.viblo.asia/d9f57f2e-dbe3-4476-baf9-74e3b7e6cbff.png)<br>
space-evenly
<br>![](https://images.viblo.asia/2ded4196-e51e-4fca-b93e-065f432f64f6.png)<br>
#### align-items
Thuộc tính `align-items` dùng để xác định cách mà các flex item được đặt trong container dọc theo chiều cross axis.
* `align-items: stretch`: Chiều dài của item sẽ bằng chiều dài của cross axis.
* `align-items: flex-start`: Item được đặt ở điểm bắt đầu của cross start(trên cùng bên trái), và kích thước item không bị thay đổi.
* `align-items: flex-end`: Item được đặt ở điểm bắt đầu của cross end(dưới cùng bên trái)
* `align-items: center`: Item được đặt ở giữa điểm bắt đầu của cross start và điểm bắt đầu của cross end (ở giữa bên trái)
* `align-items: baseline`: Item sẽ được đặt dữ theo các ký tự thuộc item đó. Mục đích chính là căn chỉnh dữa liệu dòng văn bản của các item.

```html
<style>
.box {
  height: 300px;
  display: flex;
  align-items: stretch;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
</div>
```
align-items: stretch<br>
![](https://images.viblo.asia/16d76964-a366-4215-8185-d29bbcf14ab8.png)<br>
align-items: flex-start<br>
![](https://images.viblo.asia/c67fcfc4-9a2c-4fdc-9c2b-0764e72eb338.png)<br>
align-items: flex-end<br>
![](https://images.viblo.asia/67f0f195-8c8b-4622-b613-3564ed21ca86.png)<br>
align-items: center<br>
![](https://images.viblo.asia/0ffe3809-2031-4f0f-90d2-54a69413b7c3.png)<br>
align-items: baseline<br>
![](https://images.viblo.asia/481911b3-8171-41f8-bf45-41098e6e8f57.png)<br>
#### align-content
Tương tự như `justify-content` chỉ khác một chỗ là thay vì căn theo trục main axis thì `align-content` căn theo trục cros axis.
* `align-content: stretch`
* `align-content: flex-start`
* `align-content: flex-end`
* `align-content: center`
* `align-content: space-between`
* `align-content: space-around`

```html
<style>
.box {
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
}
</style>
<div class="box">
    <div class="box-item">1</div>
    <div class="box-item">2</div>
    <div class="box-item">3</div>
    <div class="box-item">4</div>
</div>
```
align-content: stretch<br>
![](https://images.viblo.asia/4d8f9826-81a0-42df-b011-486480a430e8.png)<br>
align-content: flex-start<br>
![](https://images.viblo.asia/2214c688-5fde-4f81-b172-8c20b3670dd9.png)<br>
align-content: flex-end<br>
![](https://images.viblo.asia/e098b742-b58d-4fc5-9a74-664c0b4519cc.png)<br>
align-content: center<br>
![](https://images.viblo.asia/4ab3d28d-8948-4f02-8033-43389f96463c.png)<br>
align-content: space-between<br>
![](https://images.viblo.asia/decd5f97-9435-4e36-8936-ff41b9ceaac5.png)<br>
align-content: space-around<br>
![](https://images.viblo.asia/60ee30de-b303-4322-8434-378cd6c80be4.png)

#### Tham khảo
https://medium.com/better-programming/a-complete-guide-css-flex-box-24f4a9a1e02