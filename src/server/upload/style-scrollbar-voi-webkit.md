### Mục tiêu


{@codepen: https://codepen.io/phongct-1713/pen/orxyxb}


Chúng ta có thể tuỳ biến mọi thứ trên tranh scrollbar với `-webkit-`


### Pseudo-elements


Đây là danh sách các pseudo-elements mà `-webkit-` hỗ trợ


```CSS
::-webkit-scrollbar {
    //Màu nên của thanh scrollbar.
} 

::-webkit-scrollbar-button {
    //các nút định hướng trên thanh scrollbar.
} 

::-webkit-scrollbar-track {
    //không gian trống bên dưới hướng thanh scrollbar.
}

::-webkit-scrollbar-track-piece {
    //lớp trên cùng của thanh cuộn không bị che bởi scrollbar-thumb.
}

::-webkit-scrollbar-thumb {
    //thành phần định hướng có thể kéo được trên scrollbar.
}

::-webkit-scrollbar-corner {
    //góc dưới cùng bên phải của scrollbar, nơi hai thanh scrollbar ngang vào dọc gặp nhau.
}

::-webkit-resizer {
    //tay cầm thay đổi kích thước có thể kéo xuất hiện phía trên góc thanh scrollbar.
}
```


### Pseudo-classes.


Đây là danh sách các pseudo-classes mà `-webkit-` hỗ trợ

> **`:horizontal`** – Áp dụng style cho thanh `scrollbar` ngang.
> <br>
> **`:vertical`** – Áp dụng style cho thanh `scrollbar` dọc.
> <br>
> **`:decrement`** – Áp dụng style cho nút điều hướng thanh `scrollbar` đi xuống hoặc từ trái quá phải.
> <br>
> **`:increment`** – Áp dụng style cho nút điều hướng thanh `scrollbar` đi lên hoặc từ phải quá trái.
> <br>
> **`:start`** – Áp dụng style cho nút điều hướng thanh scrollbar được đặt phía trên hoặc bên trái `scrollbar-thumb`.
> <br>
> **`:end`** – Áp dụng style cho nút điều hướng thanh scrollbar được đặt phía dưới hoặc bên phải `scrollbar-thumb`.
> <br>
> **`:double-button`** – Áp dụng style cho nút điều hướng đôi.
> <br>
> **`:single-button`** – Áp dụng style cho nút điều hướng đơn.
> <br>
> **`:no-button`** – Áp dụng style cho `scrollbar` không có nút điều hướng.
> <br>
> **`:corner-present`** – Áp dụng style cho góc dưới cùng bên phải của scrollbar.
> <br>
> **`:window-inactive`** – Check xem thanh `scrollbar` có đang được kéo hay không và áp dụng style cho nó.
> <br> 


### Áp dụng


```CSS
::-webkit-scrollbar {
  width: 20px; // Chiều rộng thanh scrollbar dọc
  height: 20px; // Chiều dài thanh scrollbar ngang
}

::-webkit-scrollbar-track {
  background-color: #BDDBFF; // Màu nền thanh scrollbar
}

::-webkit-scrollbar-thumb {
  background-color: #9BC9FF; // Màu nền nút kéo scrollbar 
}

::-webkit-scrollbar-button:horizontal:start:decrement, // Nút bên phải thanh scrollbar ngang
::-webkit-scrollbar-button:horizontal:end:increment { // Nút bên trái thanh scrollbar ngang
  position: absolute;
  top: 0;
  display: block;
  height: 20px;
  width: 20px;
  background-image: url(...);
  background-size: 100%;
}

::-webkit-scrollbar-button:horizontal:end:increment { // Nút bên trái thanh scrollbar ngang
  background-image: url(...);
}

::-webkit-scrollbar-button:vertical:start:decrement, // Nút bên trên thanh scrollbar dọc
::-webkit-scrollbar-button:vertical:end:increment { // Nút bên dưới thanh scrollbar dọc
  position: absolute;
  top: 0;
  display: block;
  height: 20px;
  width: 20px;
  background-image: url(...);
  background-size: 100%;
}

::-webkit-scrollbar-button:vertical:end:increment { // Nút bên dưới thanh scrollbar dọc
  background-image: url(...);
}
```


{@codepen: https://codepen.io/phongct-1713/pen/orxyxb}


### Kết bài
Cảm ơn các bạn đã đọc bài !!!