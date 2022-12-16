### Giới thiệu
Hôm nay mình xin chia sẻ 1 số Layout và UI component quen mà có lẽ là quen thuộc với nhiều người khi làm dự án, hay bắt gặp trên mạng. Cái này nó như 1 dạng template có code sẵn mọi người có thể tham khảo rút ngắn được thời gian code Frontend.
![](https://images.viblo.asia/88fbedcb-5ed1-49c7-93fd-9a3fbbb82f07.png)

### UI component & layout

**[CSS Layout](https://csslayout.io/)**

![](https://images.viblo.asia/f1113268-f65c-46ca-aeb3-2763704a2935.png)

Ưu điểm của CSS layout : 
1. Không liên quan ảnh hưởng 1 chút gì tới style đang có sẵn
2. Không cần framework
3. Làm bằng CSS đơn giản nhất vì vậy không có bug
4. Dùng được với những CSS mới nhất ví dụ như Flexbox
5. Có ví dụ thực tế
6. Có thể dùng miễn phí bằng [MITライセンス](https://github.com/phuoc-ng/csslayout/blob/master/LICENSE)

<br>

**[Patterns -CSS Layout](https://csslayout.io/patterns)** 

![](https://images.viblo.asia/9a0b36ef-fced-4d7b-89eb-44c77e8da98b.png)

Ưu điểm của Patterns -CSS Layout
1.  Sử dụng code từ demo
1. Ở button phía trên bên phải có thể chuyển đổi qua lại được từ source code và demo

<br>

**[Same column height](https://csslayout.io/patterns/same-height-columns)**

![](https://images.viblo.asia/a996858d-f69e-41d1-808b-6fe142ce9755.png)

```HTML
<div style="display: flex;">
    <!-- Column -->
    <div style="
        flex: 1;
        /* Space between columns */
        margin: 0 8px;
 
        /* Layout each column */
        display: flex;
        flex-direction: column;
    ">
        <!-- Cover -->
        ...
 
        <!-- Content -->
        <div style="
            /* Take available height */
            flex: 1;
        ">
            ...
        </div>
 
        <!-- Button sticks to the bottom -->
        ...
    </div>
 
    <!-- Repeat with other columns -->
    ...
</div>
```

<br>

**[Sticky table headers](https://csslayout.io/patterns/sticky-table-headers)**

![](https://images.viblo.asia/399bbe5d-ab6e-40c7-b3fe-a4981437247d.png)

```HTML
<table>
    <thead>
        <tr>
            <th style="
                /* Background color */
                background-color: #ddd;

                /* Stick to the top */
                position: sticky;
                top: 0;

                /* Displayed on top of other rows when scrolling */
                z-index: 9999;
            ">
                ...
            </th>

            <!-- Repeat other header column ... -->
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
```


### Lời kết
Với những layout và UI component có sẵn các bạn có thể copy/ pase tham khảo sẽ rút ngắn được nhiều thời gian cho việc viết giao diện của mình, hi vọng sẽ giúp ích cho các bạn trong công việc, nâng cao hiệu suất và tiết kiệm được nhiều thời gian.