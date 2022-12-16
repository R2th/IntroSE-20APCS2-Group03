## Mở đầu
Các bạn thường responsive table như thế nào? 


## Chỉ scroll ngang table
Một cách phổ biến đấy là tạo thanh cuộn cho table và nó thật đơn giản phải không, chúng ta chỉ cần thêm min-width cho phần tử cha của table và trình duyệt sẽ cho phép người dùng cuộn theo chiều ngang.
Cách này không phải là tốt nhất nhưng nó hoạt động tốt với các dạng bảng có dữ liệu lớn.

Cùng xem ví dụ nhé:

{@embed: https://codepen.io/nhungpt6/pen/qBBRLVp?editors=1100}




## Responsive table linh hoạt hơn với Flexbox
Các bố cục ngày càng đa dạng và đòi hỏi chúng ta thể hiện tốt chúng trên nhiều loại thiết bị khác nhau, đối với các bảng có dự liệu nhỏ chúng ta có thể sử dụng các cách responsive khác để có được thể hiện tốt hơn.
Flex hầu hết đã được hỗ trợ bởi các trình duyệt, giúp chúng ta chia bố cục một cách nhanh chóng, đối với bảng cũng thế, sử dụng tối ưu các thuộc tính của flex chúng ta sẽ dễ dàng có được thể hiện responsive table đẹp mắt.

Hãy thử xem nhé ^^

```
/* Style cho table mặc định */
table {
    border-collapse: collapse;
    text-align: left;
    width: 100%;
}
table tr {
    background: white;
    border-bottom: 1px solid
}
table th, table td {
    padding: 10px 20px;
}

/* CSS đơn giản cho table trên mobile */
@media(max-width: 768px) {
    table tr {
        border-bottom: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 40px;
    }
    table td {
        border: 1px solid;
        margin: 0 -1px -1px 0;
        width: 50%;
    }
}
```

Check codepen để xem nó hoạt động thế nào nhé...

{@embed: https://codepen.io/nhungpt6/pen/GRRraJV?editors=1100}


Đối với các bảng có thead chúng ta cũng có rất nhiều cách thể hiện, hãy cùng xem một ví dụ sử dụng flexbox để responsive table sao cho xịn nhé ^^

{@embed: https://codepen.io/nhungpt6/pen/XWWpwxx?editors=1100}


## Kết luận
Có rất nhiều các cách responsive dành cho table, trên đây là một số ví dụ để chúng ta dễ dàng sử dụng và custom cho dự án của mình.
Các bạn hãy thử tìm thêm những cách responsive table xịn hơn nữa nhé!