- Nhìn thấy design như thế này
![](https://images.viblo.asia/6eb06e59-4607-4d3c-9e3b-c1613ff66857.png)

 Các bạn sẽ làm gì: chắc có 1 số bạn sẽ làm như sau
 `color:  linear-gradient(to right, #30CFD0 0%, #330867 100%); // ố ồ `  
 
 Nhưng sau khi viết sau bạn thấy nó không nhận. Vậy phải làm sao giờ, google seach thui (lol)
 
 Hôm nay mình sẽ hướng dẫn các bạn làm sao để có color text gradient
 
##  Dùng CSS

- Đầu  tiên  các  bạn  dùng  background  gradient  những  màu  mà  các  bạn  cần  thêm

```
background: linear-gradient(to right, #30CFD0 0%, #330867 100%); // màu background gradient 
```
- Sau  đó  làm  chìm  text  dưới  background

   `background-clip: text; // gán backgound gradient cho text( chìm text dưới background)`
  
- Và  làm  text  màu  trong  suốt:  ` color: transparent;`
 
- Đây  là  đoạn  code  hoàn thành, đơn  giản  phải  không  các  bạn, chỉ  với  3 dòng  các  bạn  đã  làm  được  text  có  nhiều  màu  theo  ý  mình  rồi  đó  

```
    background: linear-gradient(to right, #30CFD0 0%, #330867 100%); 
    background-clip: text;
    color: transparent;
```

Link demo : https://codepen.io/ovuthiyen/pen/mdRaBWK

## Dùng Canvas HTML5

- Đầu  tiên  dựng  canvas  có  width  và  height  là  300px

`<canvas id="myCanvas" width="300" height="300"></canvas>`

- Sau  đó  trong  script  xây  dựng  canvas

```
<script type="text/javascript">
    var canvas = document.getElementById('myCanvas');  // khai  báo  biến  canvas lấy  thuộc  tính  id  của  canvas
    ctx = canvas.getContext('2d');  // Xác  định  loại  canvas . 2D  các  bác  cứ  hiểu như chiều X và Y
</script>
```

-  Tiếp  theo  set  font  size  và  font  family  cho  text  mà  ta  cần  dựng

`ctx.font = "70px arial";  // set font size và font family cho text`

- Đổ  màu  gradient  cho  text

 ```
     gradient.addColorStop(0, "#30CFD0");// đổ màu vị trí đầu
      gradient.addColorStop(1, "#330867"); // đổ màu vị trí kết thúc
```

- Và cuối cùng là vẽ text và  set  vị  trị  hiện  cho  nó  trên  trục  X  và  Y

```
 ctx.fillText("Hello Yen", 10, 50);  // text muốn hiện và vị trí hiện
```

- Và đây  là  đoạn  code  hoàn  thành: 

```
   <canvas id="myCanvas" width="300" height="300"></canvas>
    <script>
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext('2d');
     ctx.font = "70px arial";  // set font size và font family cho text
      var gradient = ctx.createLinearGradient(0, 0, 100, 200); 
      gradient.addColorStop(0, "#30CFD0");// đổ màu vị trí đầu
      gradient.addColorStop(1, "#330867"); // đổ màu vị trí kết thúc
      ctx.fillStyle = gradient;
      ctx.fillText("Hello Yen", 10, 50);  // text muốn hiện và vị trí hiện
    </script>
```

Link demo: https://codepen.io/ovuthiyen/pen/LYxMzKr

##  Dùng SVG

- Dựng  svg có  width  và  height  là  50px  và  130px

   `<svg viewBox="0 0 50 130"> `
 
- Sau  đó  định nghĩa những thứ cần dùng trong defs( các  bác  cứ  hiểu  chỗ  này gần như là khai báo  biến) 
- ở  đây mình định nghĩa linergradient  có  màu  ở  vị  trí  đầu  tiên  là mã  màu #30CFD0 và  kết  thúc  là  mã #330867
```
 <defs>
    <linearGradient id="rainbow" x1="0" x2="100%" y1="0" y2="100%" gradientUnits="userSpaceOnUse" >
      <stop stop-color="#30CFD0" offset="0%"/>  // màu bắt đầu
      <stop stop-color="#330867" offset="100%"/>  // màu kết thúc
    </linearGradient>
  </defs>
```

- Tiếp  theo  là  chúng  ta  fill  cái  biến vừa tạo ở  defs vào text là chúng ta đã set dc màu gradient  cho  text  đó

```
<text fill="url(#rainbow)">
```

- Bước  cuối  là  sét  font size  cho  text  và  vị  trí  của  text  đó

```
    <tspan font-size="48" x="0" dy="60">Hello Yen</tspan>  // font size và text cần hiện vị trí hiện
```

Và  đây là đoạn code hoàn thành

```
<svg viewBox="0 0 50 130"> 
  <defs>
    <linearGradient id="rainbow" x1="0" x2="100%" y1="0" y2="100%" gradientUnits="userSpaceOnUse" >
      <stop stop-color="#30CFD0" offset="0%"/>  // màu bắt đầu
      <stop stop-color="#330867" offset="100%"/>  // màu kết thúc
    </linearGradient>
  </defs>
    <text fill="url(#rainbow)">
      <tspan font-size="48" x="0" dy="60">Hello Yen</tspan>  // font size và text cần hiện vị trí hiện
    </text>
</svg>
```

Link demo: https://codepen.io/ovuthiyen/pen/yLgGPvz

## Cắt ảnh

- Cách này bạn chỉ cần trỏ  chuột  vào  đoạn  text  cần  lấy  vào  export  cái  text  đó  xong =))


##  Kết luận
- Tạm thời mình nghĩ dc 4 cách để  làm  text  có  nhiều  màu. Mọi người nghĩ dc thêm cách gì thì có thể share ở comment ạ. cảm ơn các bạn đã đọc bài viết