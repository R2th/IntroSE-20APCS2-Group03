# Trình duyệt
CSS Grid Layout đã có những bước nhảy vọt trong những năm qua và do đó bạn sẽ thấy các trình duyệt hỗ trợ cho nó khá tốt tại thời điểm hiện tại.
![](https://images.viblo.asia/ba8867ff-f3ef-49b3-9a09-b0b9ec767bd5.PNG)
# Cài đặt một Grid
Grid cho phép sắp xếp các thành phần trên một trang theo các vùng.
## Thuật ngữ
### 1. Columns (Cột)
Các hàng dọc của các thành phần grid được gọi là cột.
![](https://images.viblo.asia/0b5c9c81-a3b6-4ae0-9754-8f016ca36596.PNG)
Bạn có thể điều chỉnh cột dựa theo thuộc tính sau:
```
grid-template-columns
```
Ví dụ:

HTML:
```
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>  
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>  
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>  
</div>
```
|  |3 cột tự động cân bằng| 3 cột tùy chỉnh tỉ lệ |
| -------- | -------- | -------- |
| CSS     |`.grid-container {display: grid; grid-template-columns: auto auto auto;}`|`.grid-container {display: grid; grid-template-columns: 20% 30% 50%;}`|
| Kết quả     |![](https://images.viblo.asia/042faca1-60e0-47b1-92cc-cd521b72f555.PNG)|![](https://images.viblo.asia/78ece6d5-35f3-41c7-acc7-56d80627bd66.PNG)|
### 2. Rows (Hàng)
Các hàng ngang của các thành phần grid được gọi là hàng.
![](https://images.viblo.asia/09fba330-e85b-43f5-bdf0-1107fca16710.PNG)
Bạn có thể điều chỉnh hàng dựa theo thuộc tính sau (tương tự như cột):
```
grid-template-rows
```

### 3. Gaps (Khoảng trống)
Khoảng cách giữa mỗi cột / hàng được gọi là khoảng trống.
![](https://images.viblo.asia/e8900a40-4394-4bd8-87d0-55ea6d783654.PNG)
Bạn có thể điều chỉnh kích thước khoảng cách bằng cách sử dụng một trong các thuộc tính sau:
```
grid-column-gap
grid-row-gap
grid-gap
```
Ví dụ:

HTML:
```
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>  
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>  
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>  
</div>
```
|  | `grid-column-gap` | `grid-row-gap` | `grid-gap` |
| -------- | -------- | -------- | -------- |
| CSS     |`.grid-container {display: grid; grid-column-gap: 50px;}`|`.grid-container {display: grid; grid-row-gap: 50px;}`| `.grid-container {display: grid; grid-gap: 30px 60px;}`|
| Kết quả     |![](https://images.viblo.asia/ed27abd9-8f44-4b3c-8ef7-3923c2f72587.PNG)|![](https://images.viblo.asia/301267c6-4d40-4438-b22d-8850451f5cbb.PNG)|![](https://images.viblo.asia/823cbeda-2eba-4b0c-9ae8-8879572a15d3.PNG)|

### 4. Lines
Viền nằm giữa các cột và hàng.
![](https://images.viblo.asia/98cf6563-5188-43fd-8494-db973ab29cf6.PNG)
Bạn có thể tùy chỉnh gộp cột bằng cách css ở từng ô (cell) theo các thuộc tính sau
```
grid-columns-start: [Line bắt đầu]
grid-columns-end: [Line kết thúc]
grid-row-start: [Line bắt đầu]
grid-row-end: [Line kết thúc]
```
hoặc
```
grid-columns: [Line bắt đầu]/[Line kết thúc]
grid-row: [Line bắt đầu]/[Line kết thúc]
```
Ví dụ:

HTML:
```
<div class="grid-container">
  <div class="grid-item-1">1</div>
  <div class="grid-item-2">2</div>
  <div class="grid-item-3">3</div>  
  <div class="grid-item-4">4</div>
  <div class="grid-item-5">5</div>
  <div class="grid-item-6">6</div>  
  <div class="grid-item-7">7</div>
  <div class="grid-item-8">8</div>
</div>
```
|  | gộp cột từ line 1 đến 3 | gộp hàng từ line 1 đến 3 |
| -------- | -------- | -------- |
| CSS     |`.grid-item-1 {grid-column-start: 1; grid-column-end: 3;}`|`grid-item-1 {grid-row-start: 1; grid-row-end: 3;}`|
| Kết quả     |![](https://images.viblo.asia/c9fae4b0-9516-4924-a3da-091ce6e8b556.PNG)|![](https://images.viblo.asia/0c78bc6f-290e-4b71-b8b5-be15adaa1621.PNG)|
- Ngoài ra bạn cũng có thể tùy chỉnh theo vùng bằng thuộc tính:
```
grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end;
```
Ví dụ:

HTML:
```
<div class="grid-container">
  <div class="item1">1</div>
  <div class="item2">2</div>
  <div class="item3">3</div>  
  <div class="item4">4</div>
  <div class="item5">5</div>
  <div class="item6">6</div>
  <div class="item7">7</div>
  <div class="item8">8</div>  
  <div class="item9">9</div>
  <div class="item10">10</div>
  <div class="item11">11</div>
  <div class="item12">12</div>
  <div class="item13">13</div>
  <div class="item14">14</div>
  <div class="item15">15</div>
</div>
```
CSS:
```
.item8 {
  grid-area: 1 / 2 / 5 / 6;
}
```
Kết quả:
![](https://images.viblo.asia/11d184b8-9935-46ca-9a55-37d1e8202bfc.PNG)
Cảm ơn các bạn đã theo dõi.