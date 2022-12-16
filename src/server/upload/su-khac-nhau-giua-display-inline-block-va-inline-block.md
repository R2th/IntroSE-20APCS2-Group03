Ở bài viết này mình sẽ phân biệt ba kiểu hiển thị:
* `display: inline`
* `display: block`
* `display: inline-block`

## `display: inline`
Với kiểu này thì các item sẽ nằm trên cùng một dòng, ví dụ như `<span>` . Nếu các items vượt quá độ dài của dòng thì item sẽ xuống dòng mới

Các item có kiểu display này **không thể set width và height**.

Các inline item sẽ chỉ có thể điều chỉnh margin và padding **left and right**  (top và bottom thì không thể).
![](https://images.viblo.asia/0ccb7868-0ce4-4958-9d43-5107606958e0.PNG)

<br>

## `display: block`
Khác với kiểu `display: inline` thì các item có kiểu `display: block` luôn được xuống dòng và chiếm toàn bộ width nếu width không được set. Ví dụ sẽ là `div`

![](https://images.viblo.asia/63bfa5de-e8ab-4b1f-aa69-dd87cf2981c3.PNG)

Các item có kiểu `display: block` sẽ set  được width, height, margin, padding đầy đủ 4 hướng (top, bottom, right, left).

<br>

## `display: inline-block`
Kiểu `display: inline-block` sẽ được sắp xếp giống với kiểu `display: inline`, nghĩa là các items sẽ được xếp cùng nhau trên một dòng . Tuy nhiên các items sẽ có thuộc tính của `display: block` như là có set width, height, margin, padding đủ 4 hướng.

![](https://images.viblo.asia/ef10c47b-0df3-4943-a50d-44a8c7993aaa.PNG)

Kiểu display này sẽ thường được sử dụng để tạo thanh navbar.