Chào các bạn!

Với mức độ phổ biến của CSS3 hiện nay thì việc sử dụng Animation sẽ không còn gì xa lạ nữa. Tuy nhiên để biết chi tiết từng giá trị và vận dụng chúng thì chắc ít người đi tìm hiểu. Ngay cả bản thân mình khi sử dụng animation thì cũng không dùng hết toàn bộ các thuộc tính của animation, mà chỉ sử dụng 1 phần nào đó sao cho hiệu ứng của mình có thể chạy là ổn.

## Animation là gì?

**Animation** được hiểu là hiệu ứng chuyển động, sử dụng để tạo hiệu ứng di chuyển cho các phần tử , cho phép một phần tử dần dần thay đổi từ kiểu này sang kiểu khác. Bạn có thể tùy ý thay đổi các thuộc tính CSS theo mong muốn của bạn.

Quan trọng nhất, để 1 animation có thể chạy, bắt buộc phải dùng **keyframe**. Khi khai báo CSS trong **keyframe**, các style sẽ dần thay đổi từ kiểu hiện tại sang kiểu mới tại một số thời điểm nhất định. 

```
/* The animation code */
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}

/* The element to apply the animation to */
div {
  width: 100px;
  height: 100px;
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
}
```

Phân tích 1 chút về đoạn css bên trên nhé.

- Chúng ta có 1 div với background-color mặc định là red.
- Để thay đổi màu background từ red sang yellow thì cần sử dụng keyframe để thay đổi backgound-color cho div đó mà không cần thao tác gì. Nếu như bình thường để đổi background-color thì cần dùng **:hover** hay **:focus** nhưng với animation thì không cần.

Cũng ở đoạn code ví dụ trên, chúng ta thấy có 2 thuộc tính: **animation-name** và **animation-duration.**

Đánh giá mà nói thì đây là 2 thuộc tính quan trọng nhất của animation, không có 2 thuộc tính này thì animation khỏi chạy luôn.

- **animation-name**: Tên của animation đó. Khi khai báo **keyframe** thì cần có **animation-name** để keyfram đó biết được nó đang chạy cho animation nào. Cái gì chả cần có tên huống chi là animation đúng không các bạn?
- **animation-duration**: là khoảng thời gian diễn ra hiệu ứng. Nếu phần duration không được chỉ định sẽ không xảy ra hiệu ứng vì giá trị mặc định bằng 0. Tất nhiên, nếu như **animation-duration** = 0 thì animation không thể chạy được. 

Chính vì vậy mình mới nói **animation-name** và **animation-duration** là 2 thuộc tính không thể thiếu nếu như bạn muốn animation của mình chạy được. Chạy được đã, chưa nói tới ngon hay dở.

Ngoài, 2 thuộc tính trên thì còn 1 số các thuộc tính khác nữa.

- animation-delay
- animation-timing-function
- animation-iteration-count
- aniamtion-direction
- animation-fill-mode

### Thuộc tính animation-delay

**animation-delay** sử dụng để xác định khoảng thời gian trì hoãn giữa thời gian một thuộc tính thay đổi và lúc hiệu ứng animation thực sự bắt đầu. Tức là nó sẽ chờ khoảng 1 thời gian nào đó rồi mới chạy hiệu ứng. 

Ví dụ 1: Chờ 2 giây trước khi bắt đầu hiệu ứng.

```
div {
  width: 100px;
  height: 100px;
  position: relative;
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
  animation-delay: 2s;
}
```

Thường thì mình ít sử dụng thuộc tính này. Cùng lắm là để 1s hoặc 1.5s là cùng thôi. Chờ lâu quá là không ưa rồi.

### Thuộc tính animation-timing-function    

Thuộc tính **animation-timing-function** dùng để xác định tốc độ thay đổi khi hiệu ứng diễn ra.

Các giá trị có sẵn như sau:

- **ease**: khi bắt đầu thì chậm sau đó nhanh dần và gần kết thúc lại chậm dần (giá trị mặc định).
- **linear**: từ lúc bắt đầu với lúc kết thúc tốc độ là như nhau. Tốc độ đều đều.
- **ease-in**: chậm lúc bắt đầu sau đó nhanh dần tới khi kêt thúc.
- **ease-out**: nhanh khi bắt đầu và chậm dần cho tới khi kết thúc.
- **ease-in-out**: chậm lúc bắt đầu sau đó nhanh dần ở đoạn giữa và kết thúc thì lại chậm dần.
- **cubic-bezier(n,n,n,n)**: cho phép bạn xác định một giá trị của riêng mình theo hàm bezier 

Các bạn có thể xem demo chạy ở đây

{@codepen: https://codepen.io/maiptn226/pen/abpYLgB}
    
### Thuộc tính animation-iteration-count

Thuộc tính **animation-iteration-count** sử dụng để thiết lập số lần thực hiện một animation. Giá trị thường là:

- X lần nhất định (X là số nguyên dương)
- **infinite**: animation lặp lại liên tục và vô hạn

### Thuộc tính animation-direction

Thuộc tính **animation-direction** sử dụng để xác định chiều chạy của animation. Các giá trị mà animation-direction có thể nhận là:

- **normal**: animation di chuyển bình thường tiến về phía trước (mặc định)
- **reverse**: animation di chuyển theo hướng ngược lại, lui về sau.
- **alternate**: animation di chuyển tiến về trước, sau đó lui theo hướng ngược lại
- **alternate-reverse**: animation di chuyển ngược lại trước, rồi đổi chiều tiến về trước.

### Thuộc tính animation-fill-mode

Animation CSS không gây ảnh hưởng đến phần tử trước khi chạy keyframe đầu tiên và sau khi keyframe cuối cùng kết thúc. Và thuộc tính **animation-fill-mode** sử dụng để thay đổi trạng thái của phần tử trước khi bắt đầu sau khi kết thúc Animation.

Các giá trị có sẵn như sau:

- **none**: khi animation không hoạt động thì nó sẽ giữ nguyên trạng thái bất động của phần tử, không thêm một style nào vào thành phần (mặc định).
- **forwards**: khi animation không hoạt động sau khi kết thúc animation, giá trị này sẽ apply các thuộc tính của lần cuối cùng xuất hiện trong keyframe vào trạng thái của phần tử (phụ thuộc vào animation-direction và animation-iteration-count).
- **backwards**: khi animation không hoạt động trước khi bắt đầu animation (đang trong thời gian delay), giá trị này sẽ apply các thuộc tính của lần xuất hiện đầu tiên trong keyfame vào trạng thái của phần tử (phụ thuộc vào thuộc tính anmation-direction).
- **both**: kết hợp cả forwards và backwards cho trạng thái của phần tử.

Về thuộc tính này thì gần như chẳng bao giờ mình sử dụng cả.

### Viết thu gọn Animation

Chẳng hạn chúng ta sử dụng 6 thuộc tính của animation như sau:

```
div {
  animation-name: example;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
```

Mỗi lần mà viết như thế này thì khá là mất thời gian nhỉ. Vì vậy có 1 cách viết gộp chung các thuộc tính của animation vào giống như viết gộp của margin, padding,... vậy. Chúng ta sẽ viết gộp như sau:

```
div {
  animation: example 5s linear 2s infinite alternate;
}
```
Tức là sẽ có cú pháp như thế này

```
animation: name | duration | timing-function | delay | iteration-count | direction | fill-mode
```

Mình có làm 1 demo về animation cho button như thế này

{@codepen: https://codepen.io/maiptn226/pen/jOVRyBK}

Ở ví dụ này thì mình không sử dụng hết tất cả các thuộc tính của animation mà chỉ sử dụng 1 số vừa đủ thôi.

```
animation: biglight 1.5s linear infinite;
```

Nếu để viết chi tiết về animation bên trên của mình sẽ là như thế này

```
div {
  animation-name: biglight;
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
```

Tức là ở ví dụ này mình chỉ cần dùng 4 thuộc tính là đủ rồi.

Như vậy ở bài viết này mình đã giới thiệu tới các bạn về animation. Hi vọng có thể giúp ích gì đó cho các bạn.

Cám ơn các bạn đã theo dõi!

> Nguồn tham khảo: w3schools, quantrimang. com