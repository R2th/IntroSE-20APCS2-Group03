Flexbox là 1 module. Cần phải set nhiều properties ở container(flex container) và children(flex items).

Layout thông thường dựa trên block & inline flow direction.
Flex layout dựa trên flex-flow direction. 

Hãy xem miêu tả dưới đây : 

![](https://images.viblo.asia/b9f96828-9c7d-4af2-8233-06c242e77d25.png)

Ảnh trên là setting thông thường của flexbox. 
Items sẽ được đặt theo hoặc là main-axis (trục ngang - bắt đầu từ main-start đến main-end) hoặc cross axis (trục dọc - bắt đầu từ cross-start đến cross-end).

* main axis : là trục chính của flex container, flex items được đặt theo trục chính này. Thông thường main axis không nhất thiết phải là *trục ngang*, tuy nhiên ta có thể điều chỉnh trục này qua *flex-direction* property.
* main-start, main-end : các flex items được đặt bên trong container từ main-start đến main-end.
* main size : là width hoặc height của các flex items. Main axis nằm ở đâu thì tương ứng main size sẽ được quyết định ở đó.
* cross axis : trục vuông góc với main axis là cross axis.
* cross-start, cross-end : các flex items được sắp xếp vào trong container bắt đầu từ cross-start cho đến cross-end.
* cross size : là width hoặc height  của 1 flex item. Cross axis nằm ở đâu thì tương ứng cross size sẽ được quyết định ở đó. 

# Flexbox Properties 

## 1. Properties cho parent (flex container) : 

**1. display** : 
Property này định nghĩa flex container, inline hay block tuỳ thuộc vào giá trị đưa vào. Inline hay block sẽ được áp dụng cho flex items.

```
.container {
    display: flex; /* or inline-block */
}
```

**2. flex-direction** : 

Định nghĩa main-axis của container 

.container {
    flex-direction: row | row-reverse | column | column-reverse; 
}

Các từ này đã self-explainatory rồi nên mình không note cụ thể nữa 

**3. flex-wrap** : 

Mặc định thì flex items sẽ *cố nhét* vào chỉ 1 dòng. Tuy nhiên bạn có thể thay đổi điều này và cố gắng wrap các items cần thiết vào với property này.

```
.container {
    flex-wrap: nowrap | wrap | wrap-reverse;
}
```

* nowrap (mặc định) : tất cả các items trên 1 dòng.
* wrap : flex items wrap vào thành nhiều dòng, *từ trên xuống *
* wrap-reverse : flex items wrap vào thành nhiều dòng, *từ dưới lên *

**4. flex-flow** : 

Tóm gọn : flex-flow = flex-direction + flex-wrap 
Mặc định là *row nowrap*

```
.container {
    flex-flow: column wrap;
}
```

**5. justify-content** : 

![](https://images.viblo.asia/e6b32421-5c08-47e7-bef4-a61c7b48de2e.png)

Định nghĩa alignment trên line.

Có các property như sau : 

* flex-start : các items dồn vào điểm start của flex-direction
* flex-end : các items dồn vào điểm end của flex-direction
* center : các items được align vào center dọc theo line
* space-between : items được phân bố đều trên line, item đầu tiên ở vị trí start, item cuối ở vị trí end.
* space-around : items được phân bố đều trên line. Tuy nhiên space-around sẽ mở thêm 1 khoảng cách nhỏ giữa item ở vị trí start với edge của container và giữa item ở vị trí end với edge của container. 
* space-evenly : items được phân bố sao cho spacing giữa các item (và spacing giữa item và edge) là bằng nhau.

Còn 1 số property nữa nhưng ít dùng, mình không viết ở đây. 

**6. align-items** :

Định nghĩa cách flex items được *đặt trên cross axis*. 

![](https://images.viblo.asia/60322589-6d32-40c5-a19f-a7f3e6be8813.png)

```
.container {
    align-items : stretch | flex-start | flex-end | center | baseline | first baseline | last baseline.... ;
}
```

* stretch (default) : stretch để fill container (vẫn tuân thủ min-width / max-width)
* flex-start : items được đặt tại start của cross axis 
* flex-end : items được đặt tại end của cross axis
* center : items được center trên cross axis 
* baseline : items được align như là baseline của 1 thằng