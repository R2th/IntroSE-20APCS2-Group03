Khi bạn áp dụng một thuộc tính CSS cho một phần tử, có rất nhiều thứ đang diễn ra. Ví dụ, chúng ta có 1 đoạn HTML thế này:
```
<div class="parent">
  <div class="child">Child</div>
  <div class="child">Child</div>
  <div class="child">Child</div>
</div>
```
Thêm CSS cho nó:
```
.parent {
  display: flex;
}
```
Nhìn thì chỉ có 1 dòng, nhưng trên thực tế, một loạt các thuộc tính sẽ được áp dụng cho thuộc tính `.child`, giống như viết như này
```
.child {
  flex: 0 1 auto; /* Default flex value */
}
```
Thuộc tính `flex` ở trên là cách viết tắt., thực tế là nó đang set 3 thuộc tính mà viết đầy đủ sẽ thế này
```
.child {
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
}
```
Cách viết tắt giúp việc kết hợp các thuộc tính css lại cùng 1 chỗ trở nên dễ dàng, code nhìn cũng đỡ dài hơn, như thuộc tính `background`, ta có thể viết thế này
```
body {
  background: url(sweettexture.jpg) top center no-repeat fixed padding-box content-box red;                   
}
```
Nếu viết đầy đủ ra chắc cũng phải 6, 7 dòng :v Với flex nó đã tự tóm gọn lại thành 1 thuộc tính mặc định, và thường thì chúng ta chỉ viết kiểu 
```
.parent {
  display: flex;
  justify-content: space-between;
}
```
Chúng ta chẳng cần quan tâm đến phần tử con hay style nào đang được áp dụng cho chúng, và điều đó thật tuyệt! Trong trường hợp này, chúng ta đang sắp xếp các mục con cạnh nhau và xếp nó cách đều. Hai dòng CSS trên cung cấp rất nhiều sức mạnh lại cực kì gọn gàng, chúng ta không nhất thiết phải hiểu sự phức tạp bên dưới khi sử dụng nó. 

Nhưng nếu bạn muốn tìm hiểu flexbox - bao gồm cả `flex-grow`, `flex-shrink`, và `flex-basis` thực sự hoạt động như nào, và chúng ta có thể làm những điều thú vị gì với chúng, thì đọc tiếp nhé! :wink:

Hãy bắt đầu với thuộc tính flex mặc định được áp dụng cho phần tử con
```
flex: 0 1 auto;
=> flex: [flex-grow] [flex-shrink] [flex-basis];
hoặc flex: [max] [min] [ideal size];
```
Giá trị đầu tiên là `flex-grow` sẽ chỉ định phần tử con đó sẽ được tăng chiều ngang (hoặc dọc nếu `flex-direction` là column) bao nhiêu so với các phần tử còn lại, nó được set mặc định bằng 0, vì thông thường chúng ta sẽ muốn kích thước của phần tử con khớp với nội dung bên trong nó. 

![](https://images.viblo.asia/91ec3e1d-ce0f-44c3-8173-0adaf6ad8632.png)

Tuy nhiên, nếu ta thay giá trị mặc định của flex-grow từ 0 thành 1, giống như thế này `flex: 1 1 auto;`, thì các phần từ sẽ phát triển và chiếm 1 phần bằng nhau của phần tử cha.

![](https://images.viblo.asia/a19d56aa-453c-4d6e-a6a4-db0c65dced5e.png)

Ở đây mình chỉ cần viết `flex-grow: 1` vì các giá trị khác đã được set mặc định khi mình thêm `display: flex` cho phần tử cha. Giờ nếu muốn 1 phần tử con lớn hơn các phần tử còn lại

![](https://images.viblo.asia/52209599-674a-441b-899b-73b7e973fbd9.png)

Trong ví dụ trên, 2 phần tử con đầu tiên sẽ chiếm phần không gian bằng nhau, trong khi đó phần tử con thứ 3 to gấp 3 lần các phần tử khác. Tuy nhiên tất cả vẫn phụ thuộc vào nội dung của phần tử con. Nếu phần tử thứ 2 có nội dung dài thật dài, thì dù có để `flex-grow: 3` như trên, bố cục vẫn sẽ như thế này.

![](https://images.viblo.asia/7de01154-9344-41a8-8395-86015ff8070c.png)

Cột thứ 2 đang chiếm quá nhiều khoảng trống, chúng ta sẽ quay lại với nó sau, giờ thì chỉ cần nhớ rằng nội dung trong từng phần tử sẽ ảnh hưởng đến cách `flex-grow`, `flex-shrink`, `flex-basis` hoạt động.

Giờ đến `flex-shrink`, là giá trị thứ 2 trong `flex: 0 1 auto`, nó nói với trình duyệt kích thước nhỏ nhất mà phần tử nên có. Giá trị mặc định là 1, nghĩa là nó sẽ theo nội dung và các phần tử khác. Tuy nhiên nếu sửa giá trị thành 0
```
.child {
  flex: 0 0 auto;
}
```
Nó sẽ hiểu là hãy giữ nguyên kích thước, kể cả có vỡ layout :v sẽ dễ hiểu hơn khi ta kết hợp nó với thuộc tính cuối cùng.

`flex-basis` là thuộc tính cuối cùng, nó quyết định kích thước lý tưởng của phần tử, mặc định là auto, hiểu nôm na là theo chiều rộng hay chiều dài của nội dung hay các phần tử khác. Như ban đầu có nói, kích thước của phần tử cha sẽ bằng tổng kích thước của các phần tử con, nếu bạn muốn nó full màn hình, thì có thể set các phần tử con `width: 100%` hay `flex-basis: 100%`, hoặc `flex-grow: 1` (như đã nói ở trên).

3 giá trị `flex-grow`, `flex-shrink`, và `flex-basis` kết hợp và tác động lẫn nhau, đó là lý do nên viết chung thành 1 dòng thay vì viết 3 dòng riêng lẻ. Giờ xem nó tác động đến nhau thế nào nhé
```
.child-three {
  flex: 0 1 1000px;
}
```
Khi để `flex-basis` là 1000px, trình duyệt sẽ hiểu là "hãy cố gắng dành ra 1 khoảng trống 1000px cho phần tử đó". Nếu điều đó là không thể, thì phần tử đó cũng sẽ chiếm nhiều không gian theo tỉ lệ với các phần tử khác. 

![](https://images.viblo.asia/4983d498-e5c0-4448-9064-3b7a0e54c9dc.png)

Ở màn hình nhỏ thì phần tử thứ 3 không thể chiếm đủ 1000px, nhưng nó cũng tương đối to. Giờ, thử thêm vài nội dung vào phần tử thứ 2

![](https://images.viblo.asia/c9e760e0-98ab-4021-b252-7d4c4ef55811.png)

Phần tử thứ 3 đã bị thu nhỏ lại. Giờ, nếu muốn ngăn điều này, chúng ta có thể viết như này:
```
.child-three {
  flex: 0 0 1000px;
}
```
Điều này nói với trình duyệt "Không được phép co lại", vì vậy nó sẽ vượt ra ngoài cả phần tử cha để đảm bảo đủ kích thước 1000px.

![](https://images.viblo.asia/e940bf20-2e3d-4a2c-bf07-e7ccfc2202f1.png)

Giờ nếu ta set `flex-wrap` cho phần tử cha
```
.parent {
  display: flex;
  flex-wrap: wrap;
}

.child-three {
  flex: 0 0 1000px;
}
```
Nó sẽ như thế này

![](https://images.viblo.asia/a4282277-036d-40b7-b4e7-09e5d0118012.png)

Bởi vì, theo mặc định, phần tử flex sẽ cố gắng để khít trên 1 dòng, nhưng `flex-wrap: wrap` sẽ bỏ qua điều đấy. Giờ nếu phần tử flex không vừa trên cùng 1 dòng, nó sẽ xuống dòng.

Nói chung là, đây cũng chỉ là 1 số ví dụ về cách các thuộc tính flex kết hợp với nhau, việc hiểu nó giúp chúng ta đỡ bối rối khi thuộc tính này ảnh hưởng đến thuộc tính kia mà ta không biết lỗi ở đâu. Hy vọng bạn sẽ có lúc dùng đến!

Nguồn: https://css-tricks.com/understanding-flex-grow-flex-shrink-and-flex-basis/