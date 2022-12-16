Chào các bạn! Nối tiếp [Circuit9](https://viblo.asia/p/express-basic-f1tours-project-circuit9-using-mongodb-with-mongoose-use-mongoose-model-in-controller-oOVlY2Go58W). Hôm nay, chúng ta tiếp tục đến với chặng 10 của "F1 Tours"! Trong phần này, mình sẽ thực hiện basic filtering. <br>
Giờ cùng bước vào các phần chính của bài  hôm nay nào! <br>

# 1. Filtering với api query của mongoose:
Trong một vài tình huống, chúng ta cần phải filter kết quả trả về theo tiêu chí nào đó. Chẳng hạn như cần filter theo first_grand_prix (thời gian tổ chức giải lần đầu tiên của đường đua), hay number_of_laps (số vòng đua).  Ở đây, mình sẽ sử dụng cách truyển params vào query params trên url để thực hiện filter trực tiếp kết quả. Url để filter chặng đua có số vòng đua tùy chọn sẽ như sau:
```
http://localhost:3002/api/f1/tours?number_of_laps=57
```
Để có thể thực hiện được fitering với query params như vậy, mình chỉnh sửa *tourController* như sau:

```
const tours = await F1Tour.find(req.query);
// chỉ chỉnh sửa ở line này. Các lines khác không đổi.
```
Theo api query mongoose, hàm find có thể nhận query selector để thực hiện query với selector. Khi thử log *req.query* ra console mình nhận thấy giá trị *req.query* có dạng *{ number_of_laps: '57' }* có thể sử dụng trực tiếp để làm query selector trong hàm find. Do đó, mình đưa thẳng req.query vào sử dụng luôn cho tiện thôi.<br>
Thực hiện chạy câu query trên, mình được kết quả như mong đợi.<br>
Nhưng với cách làm như trên mình luôn tìm các chặng đua có số vòng đua lớn hơn hoặc bằng 57 thì phải làm như thế nào? Thế là mình tìm kiếm trên mạng và thật may đã có kết quả như mong đợi. Bằng cách thay đổi một chút ở query params để cho ra kết quả mình mong muốn. Query params thay đổi như sau:<br>
```
http://localhost:3002/api/f1/tours?number_of_laps[$gte]=57
```
Các bạn nhìn thấy *$gte* thật thân quen phải không nào. Đúng vậy nó là tư khóa để query trong Mongodb. Nhưng một câu hỏi đặt ra là query params này sẽ cho ra kết quả như thế nào trên server đây. Và mình đã thử log và cho kết quả: 
```
{ number_of_laps: { '$gte': '57' } }
```
yeah, thật tuyệt vời. Với kết quả này thì câu query với find sẽ chạy mượt mà thôi. Thử chạy câu query trên, các bạn sẽ có được kết quả như mong đợi.<br>
Nhưng có một câu hỏi mà mình vẫn chưa giải đáp được là tại sao với query params như vậy server lại cho kết quả *req.query* theo format như vậy? Có phải chăng do parser sẵn có trong Express.js đã hỗ trợ chúng ta việc này? Mình sẽ tiếp tục tìm hiểu để có thể tìm ra đáp áp cho câu hỏi này. <br>
Tìm được cách hay, làm ngay thêm vài thứ. :v: Giờ mình sẽ tìm theo name (tên chặng đua) xem thế nào nhé. Trong Mongodb để tìm kiếm *string/ text* theo kiểu *LIKE* như sql thì mình dùng regex. Mongodb hỗ trợ từ khóa *$regex* để có thể tìm kiếm với các pattern. Mình sẽ thử với 2 câu query như sau:
```
1)
http://localhost:3002/api/f1/tours?name[$regex]=viet

2)
http://localhost:3002/api/f1/tours?name[$regex]=VIET
```
Với câu query đầu tiên không tìm kiếm được F1Tours mong muốn là *VIETNAM - Hanoi Circuit* do việc sử dụng query params như trên đang không tìm kiếm với *options* không phân biệt chữ hoa, thường (Case insensitivity). Còn với câu query thứ 2 thì sẽ trả về kết quả như mong đợi.<br>
Qua một vài ví dụ ở trên có thể thấy cách filter này tuy là rất linh hoạt nhưng cũng bộc lộ một số mặt hạn chế nhất định. Giờ bài toán đặt ra, là mình sẽ mặc định filter với number_of_laps là sẽ filter *>=*, filter với name sẽ là tên gần đúng không phân biệt chữ hoa, thường. Bằng cách này mình hoàn toàn có thể build lại query selector cho hàm find ở server để query theo mong muốn. Tuy nhiên, lần này mình sẽ sử dụng api query của mongoose để thực hiện việc filter. <br>
Mình sửa lại *tourController* như sau:
```
const queryObj = req.query;

    const tours = await F1Tour.find().where('number_of_laps').gte(queryObj.number_of_laps)
      .where('name', new RegExp(`.*${queryObj.name ? queryObj.name : ''}.*`,'i'));
      
   // các lines khác không đổi.
```
Thực hiện chạy câu query sau:
```
http://localhost:3002/api/f1/tours?number_of_laps=50&name=viet
```
Chắc chắn sẽ ra kết quả như mong đợi. Ở đây, filter params number_of_laps bắt buộc có, còn name có thể có hoặc không. Bằng cách sử dụng api query của mongoose, mình sẽ chain các câu query lại với nhau. Bản chất thì mongoose cũng sẽ sinh ra câu query thuần để gọi đến Mongodb server mà thôi. <br>
Cách này tuy không linh hoạt bằng, nhưng quy mô query có thể mở rộng hơn nhiều. <br>
Bằng cách tương tự, các bạn có thể xử lý filter params trước khi đưa vào hàm find hoặc chain các api query của mongoose lại với nhau để tạo filter cho ứng dụng.<br>
Trên đây, mình chỉ làm filter cơ bản. Để an toàn hơn, các bạn nên build lại params trước khi filter, lọc các filter params không cần thiết và/ hoặc validate các filter params này trước khi đưa vào query. 

# 2. Phần kế tiếp:
Circuit10 đến đây xin kết thúc. Mời các bạn đón xem phần kế tiếp nhé.<br>
*Cảm ơn các bạn đã đọc bài viết của mình.* <br>
*Bài viết không thể tránh khỏi những thiếu xót, mong nhận được sự góp ý của các bạn để bài viết được hoàn thiện hơn.* <br>
***Nguồn tham khảo***:<br>
*- Expressjs.com*<br>
*- Udemy.com* <br>
*- [mongoosejs.com](https://mongoosejs.com/docs/index.html)* <br>
*- [mongodb.com](https://docs.mongodb.com/)* <br>
*- Và một số nguồn khác* <br>
***Link github [F1Tours](https://github.com/dtmhdev89/ExpressSample_F1Tours)***