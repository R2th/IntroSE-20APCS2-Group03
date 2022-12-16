### Text-shadow
Hiệu ứng text-shadow thường được dùng khá nhiều, và ngoài ra nó còn hỗ trỡ multi shadow nữa, chính vì vậy mà có nhiều hiệu ứng text rất đẹp mắt đã được tạo ra dựa vào khả năng multi shadow của nó.
Nó được viết với cú pháp như sau:
![](https://images.viblo.asia/835ca76b-58ea-4e24-a9cd-444ae8728345.png)
Và các hiệu ứng lạ mắt:
![](https://images.viblo.asia/b353f611-0630-499f-a0b8-ba9f818e8226.png)

Ví dụ về multi shadow:
{@embed: https://codepen.io/buiduccuong30051989/pen/ExYNPWP}

### Box-shadow
Vậy liệu box-shadow có làm được điều tương tự, chắc chắn là có.
Một trong những hiệu ứng rất hay được tạo multi box-shadow được gọi là stacked paper, nó như thế này

![](https://images.viblo.asia/ece72bc5-7f2f-49cb-b443-6d705aed45c5.jpg)

Như thế này tức là mỗi lớp giấy ở dưới sẽ được tạo từ 1 box shadow và gộp chung lại thành 1 thuộc tính box shadow có multi shadow

```
<div class="paper"></div>
```

```
.paper {
  background: #fff;
  box-shadow:
    /* The top layer shadow */
    0 -1px 1px rgba(0,0,0,0.15),
    /* The second layer */
    0 -10px 0 -5px #eee,
    /* The second layer shadow */
    0 -10px 1px -4px rgba(0,0,0,0.15),
     /* The third layer */
    0 -20px 0 -10px #eee,
    /* The third layer shadow */
    0 -20px 1px -9px rgba(0,0,0,0.15);
    /* Padding for demo purposes */
    padding: 30px;
}
```

Kết quả: 
{@embed: https://codepen.io/buiduccuong30051989/pen/KKPNVmY}