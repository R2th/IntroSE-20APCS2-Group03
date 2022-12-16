CSS luôn được sử dụng để bố trí các trang web của chúng ta. Đầu tiên, chúng ta đã sử dụng table, sau đó là float, position và inline-block, nhưng tất cả các phương thức này bỏ qua rất nhiều chức năng quan trọng, và chưa đáp ứng được nhiều. Flexbox đã giúp chúng ta trong việc này, nhưng nó dành cho bố cục một chiều đơn giản hơn, không phải là hai chiều phức tạp. Grid là mô-đun CSS đầu tiên được tạo ra đặc biệt để giải quyết các vấn đề về bố cục. Vậy Grid layout là gì? và sử dụng nó như thế nào?
# Grid layout là gì?
CSS Grid Layout là hệ thống bố cục mạnh nhất có sẵn trong CSS. Nó là một hệ thống 2 chiều, nó có thể xử lý cả cột và hàng, không giống như flexbox phần lớn là 1 chiều. Bạn làm việc với bố cục Grid bằng cách áp dụng các quy tắc CSS cho cả phần tử cha (Container) và cho phần tử con của phần tử đó (Grid items).
# Grid Container Properties
## Enable grid layout
- Chỉ định container: `display: grid`
## Draw cell
- Để vẽ các ô sử dụng thuộc tính `grid-template-columns` và `grid-template-rows`
    - grid-template-columns: Thuộc tính chỉ định có bao nhiêu cột và mỗi cột rộng bao nhiêu
    - grid-template-rows: Thuộc tính chỉ định có bao nhiêu dòng và mỗi dòng cao bao nhiêu
### Sử dụng đơn vị tuyệt đối
```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}
```
{@embed: https://codepen.io/phanlyhuynh/pen/zYxLyjE}
### Sử dụng phần trăm
```css
.container {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 33% 33% 33%;
}
```
{@embed: https://codepen.io/phanlyhuynh/pen/dyPjwqg}
### repeat()
```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    grid-template-rows: repeat(3, 33.33%);
}
```
{@embed: https://codepen.io/phanlyhuynh/pen/abzjPXY}
Nếu bạn sử dụng `grid-template-columns: repeat(2, 100px 20px 80px);`, nó tương đương với việc cắt 6 cột
### auto-fill
```css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
}
```
{@embed: https://codepen.io/phanlyhuynh/pen/rNarogY}
### fr
```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
```
```
.container {
    display: grid;
    grid-template-columns: 150px 1fr 2fr;
}
```
Trong trường hợp này cột đầu tiên chiều rộng là 150px, cột thứ 2 sẽ bằng một nửa so với cột thứ 3
{@embed: https://codepen.io/phanlyhuynh/pen/KKwBJKW}
### minmax ()
```css
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
```
Chiều rộng của cột thứ ba không nhỏ hơn 100px, không quá 1fr.
### auto
```
grid-template-columns: 100px auto 100px;
```
Cột thứ 2 sẽ tự động xác định chiều rộng
### Tên grid line
```css
.container {
    display: grid;
    grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
    grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}
```
```css
.container {
    display: grid;
    grid-template-columns: [c1-start] 100px [c1-end c2-start] 100px [c2-end c3-start] auto [c3-end];
    grid-template-rows: [r1-start] 100px [r1-end r2-start] 100px [r2-end r3-start] auto [r3-end];
}
```
Việc chỉ định tên của grid line giúp dễ dàng xác định vị trí của item trong container.
{@embed: https://codepen.io/phanlyhuynh/pen/eYmjxBM?editors=1100}
## Cell spacing
- row-gap: khoảng cách hàng
- column-gap: khoảng cách cột
- gap: khoảng cách hàng và cột
```css
.container {
    row-gap: 20px;
    column-gap: 20px;
}
```
```css
.container {
    gap: 20px 20px;
}
```
{@embed: https://codepen.io/phanlyhuynh/pen/rNarPjK}
## Area
Một phạm vi bao gồm một hoặc nhiều ô. Thuộc tính `grid-template-areas` được sử dụng để xác định khu vực
```css
.container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-template-areas: 'a b c'
                         'd e f'
                         'g h i';
}
```
được chia thành 9 khu vực từ a đến i
```css
grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';
```
được chia thành 3 khu vực từ a, b, c
<br>
Nếu bạn chỉ muốn sử dụng một phần của khu vực, chẳng hạn như khu vực c ở trên, bạn có thể viết nó như sau:
```css
grid-template-areas: '. . .'
                     '. . .'
                     'c c c';
```
## Alignment cho tất cả các item
- justify-items: Căn chỉnh từ trái sang phải của các thành phần trong container
- align-items: Căn chỉnh Top-bottom của các thành phần trong container
- place-items: Kết hợp trái, giữa, phải, trên và dưới
```css
.container {
    justify-items: start | end | center | stretch;
    align-items: start | end | center | stretch;
}
```
trong đó `stretch` , là các giá trị thuộc tính mặc định
<br>
Lưu ý rằng thứ tự `place-items` của các thuộc tính như sau:
```css
place-items: <align-items> <justify-items>;
```
{@embed: https://codepen.io/phanlyhuynh/pen/MWYBLXX?editors=1100}
# Kết luận
Trong bài viết này mình đã giới thiệu với các bạn về grid và một số thuộc tính cơ bản, trong bài viết sau chúng ta sử dụng các thuộc tính này để responsive một trang web đơn giản. Cảm ơn các bạn đã theo dõi bài viết của mình <3