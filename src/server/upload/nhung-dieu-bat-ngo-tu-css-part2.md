Ở phần một mình đã giới thiệu với các bạn về `margin-collapsing`, `block format context`, `absolute positioning`,... Đến phần này mình sẽ tiếp tục giới thiệu đến các bạn những điều thú vị khác của CSS3
## Flex box 
Bạn có thực sự hiểu rõ về `flex`? Nếu bạn thực sự chưa hiểu rõ về `flex` thì thực sự bạn sẽ gặp khó khăn khi sử dụng, tại sao lại không hoạt động như mong muốn.
Mình sẽ giới thiệu 3 thuộc tính của `flex` là `flex-grow`, `flex-basic`, `flex-shrink`
**flex-basic**
`flex-basic` cũng giống như thuộc tính `width`. Khi `flex-shrink` và `flex-grow` được xét về 0 thì width của phần tử chính là `flex-basic`
> Example
{@embed: https://codepen.io/BinhLT-S2/pen/BaBQYra}
**flex-grow**
Khi có nhiều hơn không gian của `flex-basic` thì các phần tử có khả năng tăng trưởng dựa trên khoảng không gian trống và lúc này `flex-grow` có hiệu lực.
Để hiểu một cách đơn giản thì mình sẽ lấy ví dụ sau: 
```
.item1 {
    width: 100px;
    flex-grow: 1;
}
```
```
.item2 {
     width: 100px;
    flex-grow: 2;
}
```
Với `flex-grow: 2;` thì `.item2` sẽ lấy phần dư gấp đôi `item1`
{@embed: https://codepen.io/BinhLT-S2/pen/GRKNQzK}
**flex-shrink**
Bạn có thể hiểu mặc định tất cả các item đều có giá trị `flex-shrink` là `1`. Điều này có nghĩa là khi chúng ta thu nhỏ trình duyệt lại, các phần tử đều co lại bằng nhau. Tuy nhiên giả sử mình muốn `block3` nó co lại nhiều hơn so với các item khác thì mình sẽ tăng giá trị `flex-shrink` của nó lên.
```
.block3 {
    flex-shrink: 2;
}
```
## z-index
Có thể sẽ phức tạp nếu bạn không hiểu về nó
Đầu tiên bạn cần hiểu thứ tự sắp xếp mặc định của các phần tử
1. Static position
2. Floating block
3. Position block (none static position)
Đầu tiên: Z-index chỉ có tác dụng với những block có position khác `static`
Thứ hai: z-index hoạt động liên quan tới tổ tiên gần nhất
Cuối cùng: z-index sẽ chỉ cạnh "tranh nhau" nếu chúng có cùng trong một `stacking context`
## Percentages in transform 
Với mô hình `box modal` tỷ lệ phần trăm sẽ tính toán trên kích thước của cha mẹ chúng.
Ví dụ, nếu cha có: `width: 100px`, con có: `width: 10%` thì con sẽ có width: 10px, và `left: 100%` thì sẽ nằm hoàn toàn bên phải của cha
Tuy nhiên với `transform` thì không phải như vậy
Ví dụ dưới đây sẽ giải thích rõ điều này
{@embed: https://codepen.io/BinhLT-S2/pen/aboBYjr}
Ở đây ta thấy với `block.relative` nằm hoàn toàn bên ngoài `parent` của nó vì `left: 100% = width` của `parent`.Tuy nhiên với `block.transform` thì `left: 100%` được tính là 100% width của chính nó, nên nó vẫn nằm trong `parent`
## Tổng kết
Kết thúc hai phần mình đã giới thiệu một vài điều bất ngờ của CSS tới các bạn.Tuy nhiên CSS là cả một thế giới nên còn nhiều điều cần chính các bạn khám phá. Hãy khám phá nó và cho mình biết nhé!  
Cảm ơn các bạn đã theo dõi! Good luck!!!