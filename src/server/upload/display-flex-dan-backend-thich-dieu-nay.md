# 1. Đặt vấn đề
Như chúng ta biết thì một giao diện (mà cụ thể ở đây là giao diện web) được cấu thành tự những khối giao diện, và bản thân những khối giao diện này lại là một pool cho các khối giao diện nhỏ hơn trực thuộc nó. 

Cứ thế và cứ thế, giao diện tổng thể trở nên nhiều thành phần, nhiều phân lớp.

Thông thường thì các khối giao diện mặc định sẽ được đặt ở vị trí góc trái trên cùng (bên trong khối cha) và nối đuôi nhau theo rule trái->phải, trên->dưới.

Điều này sẽ không bao giờ thỏa mãn được những thiết kế, tính năng mà 1 giao diện cần. Giả như tôi cần một khối có kích thước kha khá, và bên trong có 1 vài khối giao diện nho nhỏ; những ông con này lại không khỏa lấp được hết chỗ đất mà người cha chia cho. Vậy là mấy ông con sẽ tíu tít vào nhau bên cánh trái, để thừa ra 1 vùng rỗng không hợp thẩm mĩ thiết kế.

Việc bố trí các khối con sẽ không thể mượt mà nếu dùng float, padding,  margin , top hay left ... Và nó cũng rất là loằng ngoằng.

Có một cách rất hiệu quả cho việc này, cơ bản nhất đó là sử dụng kiểu hiển thị display: flex; kết hợp 1 vài thuộc tính có option linh động.

# 2. Sử dụng
### Bật trình duyệt lên và xem mọi thứ sẽ đơn sơ như thế nào khi chưa dùng flex:

HTML : 
```html
<div id="parent">
   <div id="son-first">1</div>
   <div id="son-second">2</div>
   <div id="son-third">3</div>
</div>
```

CSS :
```css
#parent {
    width: 500px;
    padding: 5px;
    color: white;
    font-size: 20px;
    font-family: serif;
    background: #6e9090;
}

#parent div {
  margin: 5px;
  text-align: center;
}

#son-first {
    width: 100px;
    height: 100px;
    background: #8e0088;
}

#son-second {
    width: 70px;
    height: 70px;
    background: #d420cc;
}

#son-third {
    width: 40px;
    height: 40px;
    background: #f5a3f1;
}
```

Và đây là thứ ta nhận được :
![](https://images.viblo.asia/5ab9f746-aad1-4363-8ae6-787c49162173.png)

### Giờ thử cho flex vào : 
```css
#parent {
    width: 500px;
    padding: 5px;
    color: white;
    font-size: 20px;
    font-family: serif;
    background: #6e9090;

    display: flex;
}
```

Thế là :  ![](https://images.viblo.asia/62efeec2-57d5-46a5-8f04-17bb31ee20a5.png)

Đi kèm với kiểu hiển thị flex này là các thuộc tính : 
* flex-direction : cho phép thay đổi 2 chiều tọa độ trong khối.
* justify-content : căn khoảng cách giữa các khối con với nhau, giữa các khối con với chính khối cha.
* align-items : căn vị trí các khối con đối với line tạo ra bởi trục flex-direction.

## 2.1 Một vài ví dụ cho justify-content

### 2.1.1. Dồn về cuối 
```css
#parent {
    width: 500px;
    padding: 5px;
    color: white;
    font-size: 20px;
    font-family: serif;
    background: #6e9090;

    display: flex;
    justify-content: flex-end;
}
```
![](https://images.viblo.asia/1845f16e-ea53-4ccc-acf3-f2b11d7d5091.png)
### 2.1.2.  Tạo space 2 bên (theo trục) và căn đều khoảng cách các khối
```css
#parent {
    width: 500px;
    padding: 5px;
    color: white;
    font-size: 20px;
    font-family: serif;
    background: #6e9090;

    display: flex;
    justify-content: space-around;
}
```
![](https://images.viblo.asia/8c9e0031-b2cb-4a77-8dae-eaf0e36b8f6a.png)
### 2.1.3. Căn đều khoảng cách các khối
```css
#parent {
    width: 500px;
    padding: 5px;
    color: white;
    font-size: 20px;
    font-family: serif;
    background: #6e9090;

    display: flex;
    justify-content: space-between;
}
```
![](https://images.viblo.asia/f8cd33d2-eaf2-4506-a4b5-bdc5bb5aa9d2.png)

### 2.1.4. Căn giữa
```css
#parent {
    width: 500px;
    padding: 5px;
    color: white;
    font-size: 20px;
    font-family: serif;
    background: #6e9090;

    display: flex;
    justify-content: center;
}
```
![](https://images.viblo.asia/8fbcd0b8-57b6-4bc6-ab7f-e6094fd83991.png)

## 2.2 Một vài ví dụ về  flex-direction
### 2.2.1 Trục render thẳng đứng
```css
#parent {
    width: 500px;
    padding: 5px;
    color: white;
    font-size: 20px;
    font-family: serif;
    background: #6e9090;

    display: flex;
    flex-direction: column;
}
```
![](https://images.viblo.asia/49a35798-1103-4c7e-ac4d-06e01e9956f0.png)
### 2.2.2 Trục render thằng đứng, chiều từ dưới lên
```css
#parent {
    width: 500px;
    padding: 5px;
    color: white;
    font-size: 20px;
    font-family: serif;
    background: #6e9090;

    display: flex;
    flex-direction: column-reverse;
}
```
![](https://images.viblo.asia/647fc76b-d4be-412b-9eef-6c8d622ceea2.png)
### 2.2.3 Trục render ngang, chiều từ phải sang trái
```css
#parent {
    width: 500px;
    padding: 5px;
    color: white;
    font-size: 20px;
    font-family: serif;
    background: #6e9090;

    display: flex;
    flex-direction: row-reverse;
}
```
![](https://images.viblo.asia/f30f2d05-ce95-4ab4-9a97-24670eebf02d.png)

## 2.3 Một vài ví dụ về  align-items
### 2.3.1 Căn giữa theo phương vuông góc với trục render
```css
#parent {
    width: 500px;
    padding: 5px;
    color: white;
    font-size: 20px;
    font-family: serif;
    background: #6e9090;

    display: flex;
   align-items: center;
}
```
![](https://images.viblo.asia/31dc6c89-63bc-4817-907d-18766f2d3198.png)
### 2.3.2 Dồn xuống cuối theo phương vuông góc với trục render
```css
#parent {
    width: 500px;
    padding: 5px;
    color: white;
    font-size: 20px;
    font-family: serif;
    background: #6e9090;

    display: flex;
   align-items: flex-end;
}
```
![](https://images.viblo.asia/85e6feae-739a-4000-bd03-a2a0b5cfb48b.png)

## 2.4 Dùng hỗn hợp
Các thuộc tính trên đều tương thích vớ nhau nên chúng ta đều có thể sử dụng phối hợp các option của chúng để tạo ra giao diện mong muốn. 

Sáng tạo ra các giao diện lạ mắt cho web kinh doanh đồ uống chẳng hạn, có thể làm hiệu ứng giỏ treo với align-items: flex-start; để mô tả ly đồ uống ...

# 3. Kết
Rất đơn giản thế thôi, hi vọng có ích cho anh em backend, chứ frontend chẳng lạ lẫm gì !

[https://hocwebchuan.com/](https://hocwebchuan.com/)