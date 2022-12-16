Chắc hằn ai trong chúng ta cũng từng sử dụng vở Ô Li để chơi X-O, giờ đây mình mạn phép "tái hiện" lại nó với CSS Grid, cùng tìm hiểu vs mình nhé. Lét gâu.... :3 
# 1 Lí thuyết
CSS Grid là 1 thuộc tính khá mới của CSS hỗ trợ cho việc chia layout phía dao diện. Dưới đây là danh sách các trình duyệt đã hỗ trợ cho thuộc tính này, mình đưa nó lên đầu vì mất công bạn nào đọc hết bài mà cuối cùng lại k thể áp dụng vì Cross Browers thì lại bị nhận gạch, nên bạn có thể đọc đến đây và quay mông đi or tiếp tục nghe mình chém gió đến ngày nào đó áp dụng :)
![](https://images.viblo.asia/12732a7c-d257-4716-87fa-752393be4b6c.png)

# 2 Tạo lưới container
Hãy tưởng tượng bạn là 1 đứa trẻ 9 tuổi, k dám xé vở ra chơi X-O , trong tay bạn lúc này là 1 tờ A4 trắng tinh và bạn bắt tay vào dùng thước và bút để biến tờ A4 đó thành 1 tờ giấy Ô li nnt
![](https://images.viblo.asia/d29c68f6-c8cc-446c-85b5-373deb3d6aa9.jpg)

Nguyên liệu: 

``` html
<div class="gridContainer"></div>
<style>
  .gridContainer{
    display: grid;
    grid-template-rows: repeat(10,1fr);
    grid-template-columns: repeat(10, 1fr);
    height: 500px;
    width: 500px;
    margin: 100px auto;
  }
</style>
```
**Cùng phân tích chút nhỉ:**

`display: grid` => chỉ định thuộc tính grid cho element 

`grid-template-rows: repeat(10,1fr)` => chia **gridContainer** thành 10 hàng cao 1fr

`grid-template-columns: repeat(10,1fr)` => chia **gridContainer** thành 10 cột rộng 1fr

Bạn có thể thay **fr** bằng bất cứ đơn vị đo chiều dài nào như **px, %**...(ở trường hợp này của mình 1fr = 500px/10 bạn có thể tìm hiểu  về **fr** ở [đây](https://css-tricks.com/introduction-fr-css-unit/))

**Thuật ngữ tương đương:**

Trang giấy <=> **Grid Container**

Hàng ngang , hàng dọc <=> **Grid Tracks**

Dòng kẻ ngang, dòng kẻ dọc <=>**Grid Lines** 

Khoảng cách giữa 2 hàng hoặc 2 cột liền kề <=> **Grid Gaps**

Mỗi "Ô vuông" <=> **Grid Cells**

Nhóm các "Ô vuông" cùng hàng cùng cột <=> **Grid Areas**

Những gì bạn vẽ trong trang giấy <=> **Grid Items** (k giống 100% nhé)
# 3 Tùy biến items trên gridContainer
Sau khi đã có trang giấy Oli trong tay thì giờ cùng chơi chút nhỉ :D, trước tiên mình tạo 2 items X & O cùng chút css cho nó đỡ xấu 

![](https://images.viblo.asia/2ecc6794-3643-42a5-9515-60e71da66b3a.jpg)
```html
<div class="gridContainer">
  <div class="gridItem x">X</div>
  <div class="gridItem o">O</div>
</div>
<style>
  .gridContainer{
    display: inline-grid;
    grid-template-rows: repeat(10,1fr);
    grid-template-columns: repeat(10, 1fr);
    height: 500px;
    width: 500px;
    margin: 100px auto;
  }
  .gridItem{
    border: 1px solid green;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;  
  }
</style>
```
Như bạn đã thấy, những **gridItems** đã chịu ảnh hưởng từ **gridContainer** và mỗi **gridItem** đang nằm vọn vẹn trong 1 Ô vuông(**gridCell**), mình chưa hề style gì liên quan đến **width, height, display inline** cho gridItems (chỉ những  child items cấp 1 chịu ảnh hưởng)

## 3.1 Di chuyển gridItems theo tọa độ
Giờ mình muốn di chuyển X sang hàng 5 cột 5 thì mình sẽ dùng đoạn code sau
![](https://images.viblo.asia/bc217f1f-d68d-4594-a355-bc9ad7683226.jpg)
```css
.x{
    grid-column-start: 5;
    grid-row-start: 5;
}
```
Ngoài ra bạn còn có thể di chuyển  **gridItems** theo [gridAreas](https://www.w3schools.com/cssref/pr_grid-area.asp)

## 3.2 Set size cho gridItems

Giờ mình muốn O rộng 2 cột cao 3 hàng
![](https://images.viblo.asia/977cd241-a8e2-4d02-a486-b7f14d0bbe13.jpg)
```css
.o{
  grid-column-end: span 2;
  grid-row-end: span 3;
 }
```

Bạn vẫn có thể set **width, height** cho **gridItems** theo đơn vị (**px,%**...) như bình thường nhé (thậm chí là dùng **gridAreas**). Chú í ở trường hợp này đơn vị % sẽ tính theo **gridCells**.
# 4 Kết luận
Dưới đây là tóm gọn sơ lược về tư tưởng sử dụng **CSS GRID** của mình, thật sự mình thấy nó thú vị và hữu ích, đi sâu vào thì còn rất nhiều cái hay ho, mọi người có thể tham khảo link mình để bên dưới.

https://css-tricks.com/snippets/css/complete-guide-grid/

Vài demo của mình:

https://codepen.io/yendevyt/pen/ZZEpZx

https://codepen.io/yendevyt/pen/LvJZjw

https://codepen.io/yendevyt/pen/GLPBpY

Cảm ơn mng đã đọc và hi vọng nhận được góp í, chúc mọi người có kì nghỉ lễ vui vẻ :)