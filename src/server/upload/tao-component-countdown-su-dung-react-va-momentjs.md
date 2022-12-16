![](https://images.viblo.asia/e989c2cf-145b-4e61-b116-fb2cc100eaff.png) <br>
Gần đây mình đã phải tạo ra một Countdown cho project của mình, vì vậy trong bài này mình sẽ hướng dẫn các bạn tạo ra 1 component Countdown sử dụng react và một chút SVG nhé :D <br>
Các bạn có thể tìm thấy kết quả cuối cùng ở đây nhé:
{@codepen: https://codepen.io/FlorinPop17/pen/YbpwyG}
Đầu tiên chúng ta sẽ tạo ra một function countdown và sau đó chúng ta sẽ tạo các vòng cung bằng cách sử dụng SVG nha
#### Tạo function Countdown
Để làm điều này, chúng ta sẽ sử dụng thư viện MomentJS để giúp chúng ta parser, validate, manipulate, hiển thị dates và times.
Về cơ bản chúng ta cần có 2 ngày:
* Ngày hiện tại hoặc `now`
* Ngày cuối cùng hoặc `then`

Khi chúng ta có 2 ngày, chúng ta có thể trừ `now` từ `then` sử dụng `moment` và chúng ta sẽ nhận được thời gian còn lại (giá trị `countdown`)<br>
Đối với ngày `then` chúng ta sẽ cần phải pass 2 chuỗi:<br>
Thứ nhất, chuỗi `timeTillDate` chứa ngày cuối cùng cho đến khi chúng ta muốn đếm. (Ví dụ: **05 26 2019, 6:00 am**)<br>
Thứ 2, chuỗi `timeFormat`, được sử dụng bởi `moment` để xác định định dạng thời gian. (Ví dụ của chúng ta sẽ có định dạng là: **MM DD YYYY, h:mm a**) <br>
Bạn có thể tìm hiểu thêm về parsing strings và định dạng chúng trong tài liệu [này](https://momentjs.com/docs/#/parsing/string/)<br>
Chúng ta cùng xem đoạn code sau đây nha:
```
import moment from 'moment';

const then = moment(timeTillDate, timeFormat);
const now = moment();
const countdown = moment(then - now);
```
Lưu ý: Các giá trị `timeTillDate` và `timeFormat` sẽ được cung cấp trong React component. Trong ví dụ của chúng ta có sử dụng chúng.<br>
Từ đối tượng `countdown` chúng ta có thể get tất cả các values mà chúng ta muốn hiển thị trong component của mình - `days`, `hours`, `minutes` và `seconds` cho đến khi chúng ta đạt đến `then` time.
```
import moment from 'moment';

const then = moment(timeTillDate, timeFormat);
const now = moment();
const countdown = moment(then - now);
const days = countdown.format('D');
const hours = countdown.format('HH');
const minutes = countdown.format('mm');
const seconds = countdown.format('ss');
```
Sau đó chúng ta sẽ thêm đoạn code `interval` trong js sẽ được gọi mỗi giây. Nhưng trước đó chúng ta phải setup react component cho nó.
#### Countdown Component
Chúng ta sẽ tạo một component class based. chúng ta cần truy cập vào `state` của component bởi vì chúng ta cần lưu 4 gía trị trong nó (days, hours, minutes, seconds), mặc định các giá trị này là `undefined`.<br>
{@gist: https://gist.github.com/florinpop17/d4b85dc46b9cd2c6af0dbd3d343282ff#file-countdown-jsx}
Tiếp theo hãy tạo `interval` chạy mỗi giây. Và lưu giá trị của trong state của component. Chúng ta sẽ làm `interval` bên trong `componentDidMount` lifecycle method. Chúng ta sẽ `clear` interval trong `componentWillUnmount` lifecycle method. Vì chúng ta không muốn cho nó chạy sau khi componet bị xóa khỏi DOM.<br>
{@gist: https://gist.github.com/florinpop17/b4ab709b105c451bd7502b3c3edca44c#file-countdown-jsx}
#### CSS
Hiện tại chức năng cowndown đã có thể chạy được, nhưng chúng ta hãy style cho nó một chút nhé:<br>
{@gist: https://gist.github.com/florinpop17/4f85ecd144163a0f3495a1764fa3697f#file-style-css}
Không có gì lạ trong CSS, chúng ta dùng `flexbox` để position cho các items trong wrapper.<br>
Cuối cùng chúng ta hãy cùng nhau tạo ra vòng cung SVG để bao quanh từng mục trong bộ đêms ngược của chúng ta.
#### SVGCircle Component
Trước khi chúng ta làm điều đó, có một vài chức năng mà chúng ta cần để tạo vòng cung SVG có thể tùy chỉnh.Tôi tìm thấy những thứ này trên [StackOverflow](https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle). Để biết thêm thông tin bạn nên đến đó và đọc phần giải thích chi tiết về các chức năng.
{@gist: https://gist.github.com/florinpop17/95c8626da9193f3a9b5e91bdea5eb075#file-script-js}
Về cơ bản, hàm trên tính toán cách vẽ cung tròn bằng cách cung cấp một tập hợp các giá trị như: điểm bắt đầu và điểm kết thúc, bán kính và các góc<br>
Quay lại React Component của chúng ta: chúng ta sẽ tạo ra một svg và chúng ta sẽ có một thẻ `path` trong đó sẽ vẽ vòng cung (`d` prop) bằng cách cho nó một thuộc tính `radius`. 4 giá trị khác trong hàm `descriptionArc` được fixed, vì chúng ta không muốn sửa đổi nó và chúng ta đang customizing nó để tốt hơn cho ví dụ của chúng ta.<br>
```
const SVGCircle = ({ radius }) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke="#333"
            stroke-width="4"
            d={describeArc(50, 50, 48, 0, radius)}
        />
    </svg>
);
```
Và chúng ta cũng cần một chút CSS để position nó trong mục `.countdown-item`<br>
```
.countdown-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
}
```
Trước khi thêm component này vào bên trong Countdown component, chúng ta cần convert các giá trị mà chúng ta có (ngày, giờ, phút và giây) thành các giá trị radius của chúng. <br>
Vì vậy chúng ta sẽ cần một function đơn giản sau đây:
```
function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}
```
## The final result
{@gist: https://gist.github.com/florinpop17/86332ce1578d506ff041d2f072467046#file-App.jsx} <br>
Thế là chúng ta đã hoàn thành xong việc tạo Countdown cho project của mình. Chúc các bạn thành công ^^ <br>

##### Linh bài viết gốc:
https://medium.com/free-code-camp/how-to-create-a-countdown-component-using-react-momentjs-4717edc4ac3