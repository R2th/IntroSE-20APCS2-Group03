- Một ngày buồn và cạn hết nguồn ý tưởng ko biết viết gì để chia sẻ kiến thức với các bạn . Thôi nay mình chia sẻ tips đơn giản hướng dẫn các bạn style checkbox, radio button không giống như mặc định ban đầu của checkbox và radio button chỉ với **css**
- Để giúp cho các bạn tự làm được tôi sẽ hướng dẫn với radio button còn các bạn có thể tự làm với checkbox thông qua bài làm của tôi

## 1. Tạo HTML

- Chúng ta tạo các input với radio theo sau là label sao cho id của input bằng for của label như đoạn code bên dưới đây

```
<div class="radio">
    <input type="radio" id="radio1" name="group-radio" />
    <label for="radio1">I love</label>
  </div>
```

## 2. Tạo css

- Đầu tiên chúng ta nên ẩn **input** đi và mọi style chúng ta làm trong label bằng đoạn code dưới đây.

```
input[type="radio"] { {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 0;
    height: 0;
  }
```

đoạn này bạn cũng có thể thay bằng đoạn code sau:
```
input[type="radio"] { {
    display: none;
  }
```

- Tiếp theo ta style cho  **label**

```
label {
    padding-left: 35px; // Khoảng cách này để mình chứa style cho ô radio
    position: relative;
    margin: 0;
    line-height: 20px;
 }
```

- Bây giờ chúng ta style cho cái nút radio

  + Tạo vòng tròn bao ngoài nút radio. Chúng ta cho label bằng relative và tạo ra nút vòng bao ngoài radio với :before

```
label:before {
	 width: 20px;
	 height: 20px;
	 border-radius: 50%;
	 position: absolute;
	 top: 50%;
	 tranform: translateY(-50%);
	 left: 0;
	 content: '';
	 background: #fff;
	 border: 1px solid black;
}
```

  + Tạo nút bên trong radio khi input: checked. Bằng cách sau: 
  
```
input[type="radio"]:checked ~ label:after {
	 width: 12px;
	 height: 12px;
	 border-radius: 50%;
	 position: absolute;
	 top: 50%;
	 tranform: translateY(-50%);
	 left: 4px;
	 content: '';
     background: blue;
}
```

- Chỉ với vài dòng code đơn giản chúng ta đã tuỳ chỉnh dc radio button theo ý mình.
- Tương tự với checkbox cũng vậy.  Các bạn chỉ cần chú ý đoạn code này **input[type="radio"]:checked + label** 
- https://codepen.io/ngc-yn/pen/MWWjVQa

{@codepen:https://codepen.io/ngc-yn/pen/MWWjVQa}


## 3. Kết luận.
- Như vậy trong bài viết này mình đã hướng dẫn cách làm sao để có thể style lại các radio button, tương tự các bạn hãy thử làm với checkbox để xem mình hiểu bài ko nhé . Cảm ơn các bạn đã đọc bài viết của mình.

- Demo với checkbox https://codepen.io/ngc-yn/pen/vYYXRoQ
{@codepen:https://codepen.io/ngc-yn/pen/vYYXRoQ}