# Giới thiệu
Hẳn chúng ta không còn xa lạ với **flexbox** layout, một css layout được tích hợp trong **CSS3** để đơn giản hóa việc sắp xếp và định vị các thành phần con trong container. Sau đây chúng ta sẽ hệ thống hóa lại các thành phần của **flexbox** thật dễ hiểu và ghi nhớ được lâu nhé.
# Cách flexbox hoạt động
## Kiến trúc của Flexbox
Vậy cách **Flexbox** hoạt động ra sao? Các flex-item được phân phối dọc theo các trục **Main Axis** và **Cross Axis**, điều này phụ thuộc vào property **flex-direction**, vị trí layout thay đổi giữa các hàng và cột dựa theo các trục.

![](https://images.viblo.asia/b6519493-3a03-4a46-a14f-292c2e825e56.png)


## Flexbox chart
Chart dưới đây tổng hợp các property và value mà bạn có thể sử dụng để làm việc với flexbox. Bạn có thể quay lại đây để xem các propery trong pet project để hiểu cách các property này hoạt động.

![](https://images.viblo.asia/15ea6937-e48b-4401-b7c0-c6ae79dd5a94.png)


## Setup 1 pet project để test
Cho pet project này, bạn cần biết một ít về HTML và CSS, cách làm việc với chúng ở VS code.


1. Tạo 1 folder tên "Project-1" & mở trong VS Code
2. Tạo file index.html & style.css 
3. Cài đặt Plugin Live Server và chạy Live Server.

Ở cuối tutorial này, bạn có thể tạo ra 1 website layout theo cách bạn mong muốn. Hãy tin tôi.

### HTML
Trong HTML, thêm những dòng dưới đây trong tab <body>
```html
<div class="container">
    <div class="box-1"> A </div>
    <div class="box-2"> B </div>
    <div class="box-3"> C </div>
</div>
```

### CSS
 Tiếp theo them css cho class .container và các box. Như bên dưới

```css
.container{
   height : 100vh;
}

[class ^="box-"]{
    width: 140px;
    height: 140px;
    background-color: skyblue;
    border: 2px solid black;

// To view the letter better
    font-size: 65px;
}
```
## Các property của flexbox
### Flow
Trước khi bắt đầu, hãy cùng tìm hiểu mỗi quan hệ giữa parent và child class
    
![](https://images.viblo.asia/e3e983d9-8288-4614-ab33-aacdddb2fdf9.png)

Flexbox css có tác dụng trên parent class, không phải trên các children class.
    
Ở đây, class .container là class cha và .box-* là các class con.

Hãy apply `display: flex` trong .container class. Và đặt các letters ở giữa các box như bên dưới

```css
.container{
    display : flex;
    height : 100vh;

// To place some gap between boxes
    gap : 25px;
}
[class ^="box-"]{
// Code from previous step are here

// Placing text at center 
    display : flex;
    justify-content : center;
    align-items : center;
}
```
Ok. Vậy là chúng ta đã có thể bắt đầu để test các property của flexbox.

### flex-direction
flex-items được phân phối trong flex-container dựa vào flex-direction như bên dưới

![](https://images.viblo.asia/a3f6d1a9-a36b-4a9c-ba23-f5872b3b9535.png)

![](https://images.viblo.asia/0ec0ee8b-60cd-486d-9701-e2753ea76917.png)

   Để được kết quả như vậy, hãy thử code css như bên dưới.
   Chú ý là chúng ta sẽ viết trong class .container

```css
.container{
//code from setup stage are here

// Change the value  👇 here to see results
    flex-direction : row;
}
```


### justify-content
   Property này sắp xếp các flex-items dọc theo trục MAIN AXIS trong flex-container
![](https://images.viblo.asia/90281847-ac4d-47d8-9c43-2e23ff0d5463.png)

![](https://images.viblo.asia/ee1d9d07-e848-47b1-8414-43367b79a9f5.png)

   Để được kết quả này, thêm các css như bên dưới
```css
.container{
//code from setup stage are here

//  Change the value  👇 here to see results
    justify-content: flex-start;
}
```

### align-content
Để phân phối các flex-items dọc theo CROSS AXIS trong flex-container, ta dùng align-content, tương tự như jusify-content
  

![](https://images.viblo.asia/564226ae-b8ef-421f-8a8b-79404b1bdc2b.png)

![](https://images.viblo.asia/1f39b6af-9c0f-4288-8a21-0f4ecf5a40f4.png)

   Chú ý rằng, nếu không có property flex-wrap, property align-content này sẽ không có tác dụng. Demo như bên dưới

```css
.container{

//  Change the value  👇 here to see results
    align-content: center;

// without this line, align-content won't work
    flex-wrap: wrap;
}
```


### align-items
Property này phân phối flex-items dọc theo CROSS AXIS
    
![](https://images.viblo.asia/57f7abef-7257-4874-9c52-59631a7233e6.png)

Để có kết quả như vậy, hãy update css như bên dưới
```css
.container{
//code from setup stage are here

// Change the value 👇 here to see results
    align-items: flex-end;
}
```


### align-self
Đây là property là được apply ngay trong các class của các item con. Nó định vị item con dọc theo CROSS AXIS
    
![](https://images.viblo.asia/7d740f10-df61-4754-a44b-7d6b53610748.png)

Chúng ta có tổng cộng 6 giá trị cho property này

* flex-start
* flex-end
* center
* baseline
* stretch
* auto

Để có kết quả, hãy apply css dưới vào bất kì box nào (có class box-*)
```css
.box-2{
// Change the value 👇 here to see results
     align-self : center;
}
```

### flex - grow | shrink | wrap | basis
   Các property này sẽ điều chỉnh độ rộng của các item con. Hãy thử xem nhé

* flex-grow : tăng độ rộng của flex-item dựa trên độ rộng của flex-container
* flex-shrink : giảm độ rộng của flex-item dựa trên độ rộng của flex-container, ngược lại với flex-grow

![](https://images.viblo.asia/39294f1a-f606-48a3-9be8-645fb2bb31b2.png)

Hãy thử test property trên bằng các css bên dưới

Chú ý là flex-grow và flex-shrink được apply trên các flex-item con. Nên chúng ta phải target các box.
    
```css
.box-1{
    flex-grow: 1;
}
.box-2{
    flex-grow: 5;
}
.box-1{
    flex-grow: 1;
}
```

 Hãy điều chỉnh độ rộng của windows để xem kết quả

Để xem nó được apply như thế nào nếu ta dùng flex-shrink, hãy thử css bên dưới
    
Chú ý là xóa property flex-wrap, nếu không nó sẽ không có tác dụng
    
```css
.box-1{
    flex-shrink: 1;
}
.box-2{
    flex-shrink: 5;
}
.box-1{
    flex-shrink: 1;
}
```
Bây giờ hãy thử thu hẹp độ rộng window để xem tác dụng.

* flex-wrap : số lượng flex-item bạn muốn trong 1 line/row

![](https://images.viblo.asia/49c3e1c1-0886-4c56-8089-bac88993f958.png)

property này được apply trên class .container 
    
```css
.container{
    //other codes are here 

// Change value 👇 here to see results
    flex-wrap : wrap;
```

* flex-basis : Cái này tương tự việc set độ rộng mặc định của flex-item, nhưng theo 1 cách linh động hơn. Ví dụ flex-basis: 10em; nó sẽ set giá trị độ rộng ban đầu là 10em, nhưng tùy thuộc vào giá trị flex-grow và flex-shrink, độ rộng sẽ được điều chỉnh.


## Short Hands
### flex 
   Đây là short hand cho flex-grow, flex-shrink và flex-basic.
![](https://images.viblo.asia/5894cb45-1ffc-4c4f-b65d-63c543d56122.png)

Bạn có thể thử như bên dưới
Chú ý là nó chỉ tác dụng với các flex-item

```css
.box-2{
    flex : 2 1 30em;
}
```

### flex-flow
Đây là Short hand cho flex-direction và flex-wrap

![](https://images.viblo.asia/c915330a-4f00-4757-ad6b-93c11ad91d77.png)

Bạn có thể thử như bên dưới
    
 Chú ý là nó chỉ tác dụng với container class

```css
.container{
    flex-flow : row wrap;
}
```

### place-content
Đây là shorthand của justify-content và align-content

![](https://images.viblo.asia/48f494e9-af5c-4558-bf48-fb054c78b333.png)

Hãy test thử.
    
Chú ý là property này có tác dụng trên cả container và flex-item
    
    
```css
.container{
    place-content : center flex-end;
}
```
# Kết thúc
Hi vọng bài viết đã giúp các bạn hiểu cách hoạt động của flexbox layout trong CSS3. Bài viết được tham khảo từ [Complete Flexbox Tutorial w/ Cheat Sheet](https://dev.to/joyshaheb/flexbox-cheat-sheets-in-2021-css-2021-3edl?fbclid=IwAR1wUICYO_g9nITi-tZoTVlRIlxT7V21dbPOEIgaE7cqOMfQIYkH93GgNSE) của Joy Shaheb. Cảm ơn các bạn đã đọc bài!