## Phần I. Giới thiệu:
Grid Layout cung cấp một hệ thống bố cục dựa trên dạng lưới, với các hàng và cột, giúp thiết kế các trang web dễ dàng hơn mà không cần phải sử dụng Float hoặc Position. Nó vẫn còn khá mới mẻ và đang trong quá trình phát triển vì thế các trình duyệt support nó vẫn còn hạn chế. Nhưng với khả năng tuỳ biến layout rất mạnh thì nó có thể trở thành 1 công nghệ phát triển và phổ biến trong tương lai gần. Bài viết này mình xin giới thiệu cơ bản về về Grid Layout cơ bản nhé.

## Phần II. Nội dung:
### 1.Grid Elements:
- Grid Layout bao gồm một phần tử mẹ, với một hoặc nhiều phần tử con.<br>
```
    <div class="grid-container">
           <div class="grid-item">1</div>
           <div class="grid-item">2</div>
           <div class="grid-item">3</div>
   </div>
```

![](https://images.viblo.asia/cf52dd28-6014-492e-9237-0911cebfffe9.png)

### 2. Display Property:
   -Tạo một grid container bằng cách thiết lập thuộc tính display với giá trị grid hoặc inline-grid.<br>
```
    display: grid;
```

![](https://images.viblo.asia/c72ce77b-1dbb-476b-999e-c9f6114e0ece.png)

```
    display: inline-grid;
```

 ![](https://images.viblo.asia/4ed9a7c4-db2e-4144-8293-672ebb49a934.png)

### 3. Grid Columns:
-Các đường thẳng đứng của Grid Layout được gọi là grid columns.</br>
![](https://images.viblo.asia/c8be98b2-1537-4e6e-8de1-7ebce87454d0.png)

###  4. Grid Rows:
-Ngược lại các đường nằm ngang của Grid Layout được gọi là grid rows.
![](https://images.viblo.asia/94746efb-800e-48bb-ad50-e0bb7c6f6c6d.png)

### 5. Grid Gaps:
Khoảng cách giữa các hàng và các cột được gọi là gaps.
![](https://images.viblo.asia/c510a1de-3a73-4221-bad2-145d08c8b741.png)

### 6.Grid Lines:
-Là các đường ngang và dọc tạo thành cấu trúc grid. Chúng được sử dụng để định vị các khối trên grid.<br>
![](https://images.viblo.asia/9b214726-8939-405e-80dc-1b1a38772082.png)
### 7.Định vị các phần tử qua Grid Line Numbers:
1. grid-column-start: chỉ định vị trí bắt đầu của một item-grid trong `cột lưới` bằng cách thêm một đường, một khoảng hoặc không có gì (tự động) vào vị trí lưới của nó, do đó chỉ định `inline-start` của grid area của nó.<br>
```
    .item1 {
        grid-column-start: 2;
     }
```

![](https://images.viblo.asia/b83b56f0-12c8-4b9b-b74e-0daafc1061d7.png)
<br>2. grid-column-end: thuộc tính chỉ định vị trí kết thúc của item-grid trong `cột lưới` bằng cáchthêm một đường, một khoảng hoặc không có gì (tự động) vào vị trí lưới của nó, do đó chỉ định cạnh inline-end của grid area của nó.<br>
```
    item1 {
        grid-column-end: span 2;
    }
```

![](https://images.viblo.asia/0126789d-9e8f-4863-b6d8-efc38b4898b2.png)
<br>3. grid-row-start: thuộc tính chỉ định vị trí bắt đầu của item-grid trong `hàng lưới` bằng cách thêm một đường, một khoảng hoặc không (tự động) vào vị trí lưới của nó, do đó chỉ định `inline-start`  của  grid area của nó.<br>
```
    .item1 {
        grid-row-start: 2;
     }
```

![](https://images.viblo.asia/4b71ac5a-7961-44f2-8998-1d3a7a37caa7.png)
<br>4. grid-row-end: thuộc tính chỉ định vị trí kết thúc của item-grid trong` hàng lưới` bằng cách thêm một đường, một khoảng hoặc không có gì (tự động) vào vị trí lưới của nó, do đó chỉ định `inline-end` của  grid area của nó.<br>
 <br>
```
    .item1 {
        grid-row-end: 2;
    }
```

![](https://images.viblo.asia/7636cda6-eda5-4bb9-8f75-f47cc2b2ba31.png)

## Phần III. Lời kết:<br>
Trên đây là những kiến thức cơ bản về Grid Layout cơ bản mà mình học được. Hi vọng bài viết này đã giúp các bạn hiểu được phần nào đó. Thank all!
<br>
Link tham khảo:<br>
https://www.bravebits.co/gioi-thieu-va-tim-hieu-ve-cac-thuoc-tinh-trong-css-grid/.
https://www.w3schools.com/css/css_grid_item.asp.