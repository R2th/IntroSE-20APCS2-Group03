Xin chào các bạn,

Chúng ta thường sử dụng border khi muốn tạo đường viền xung quanh 1 phần tử, nhưng nó có nhiều công dụng hơn chúng ta tưởng, một trong những tác dụng to lớn mà border đem lại, đó là nó có thể tạo ra được các hình thù toán học, mà có lẽ chúng ta thường xuyên gặp phải trong quá trình làm việc của 1 Frontend. 

Vậy, chúng ta thử ngó qua đó là những hình thù gì nhé!!

## 1. Hình Vuông
Coi demo nhé:
{@embed: https://codepen.io/NetNet/pen/ExKdzOV?editors=0100}

Code:
```
    #square {
      width: 100px;
      height: 100px;
      background: red;
    }
```

## 2. Hình chữ nhật
Demo:
{@embed: https://codepen.io/NetNet/pen/RwaemqL?editors=1100}

Code:
```
    #rectangle {
      width: 200px;
      height: 100px;
      background: red;
    }
```

## 3. Hình tròn
Demo:
{@embed: https://codepen.io/NetNet/pen/rNeqgoN}

Code:
```
    #circle {
      width: 100px;
      height: 100px;
      background: red;
      border-radius: 50%
    }
```

## 4. Hình oval
Demo:
{@embed: https://codepen.io/NetNet/pen/zYqmQeG?editors=1100}

Code:
```
    #oval {
      width: 200px;
      height: 100px;
      background: red;
      border-radius: 100px / 50px;
    }
```
## 5. Hình tam giác
Demo danh sách những hình thù khác nhau của tam giác:
{@embed: https://codepen.io/NetNet/pen/ZEWqNZz?editors=1100}
### 5.1. Hình tam giác lên
```
    #triangle-up {
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 100px solid red;
    }
```
### 5.2. Hình tam giác xuống
```
    #triangle-down {
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-top: 100px solid red;
    }
```
### 5.3. Hình tam giác trái
```
    #triangle-left {
      width: 0;
      height: 0;
      border-top: 50px solid transparent;
      border-right: 100px solid red;
      border-bottom: 50px solid transparent;
    }
```

### 5.4. Hình tam giác phải
```
    #triangle-right {
      width: 0;
      height: 0;
      border-top: 50px solid transparent;
      border-left: 100px solid red;
      border-bottom: 50px solid transparent;
    }

```
### 5.5. Hình tam giác trên cùng trái
```
    #triangle-topleft {
      width: 0;
      height: 0;
      border-top: 100px solid red;
      border-right: 100px solid transparent;
    }
```
### 5.6. Hình tam giác trên cùng phải
```
    #triangle-topright {
      width: 0;
      height: 0;
      border-top: 100px solid red;
      border-left: 100px solid transparent;
    }
  
```

## Kết Luận
Trên đây, mình đã liệt kê một số hình toán học rất hữu ích mà border CSS3 có thể tạo ra.
Còn rất nhiều hình hay ho khác mà bạn có thể tham khảo thêm tại đây: [tại đây](https://css-tricks.com/the-shapes-of-css/)

Refer: 
https://css-tricks.com/the-shapes-of-css/