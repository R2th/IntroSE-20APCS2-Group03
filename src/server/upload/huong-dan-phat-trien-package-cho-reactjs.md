Đối với dev Reactjs , mỗi khi có một yêu cầu nào đó như hãy tích hợp đăng nhập bằng Facebook , một cái calender xịn xò như của google, ... mình tin rằng đa số mọi người sẽ search các thư viện đó ví dụ react-facebook-login , hay react-big-calendar và việc sau đó chỉ là import package đó và thêm một vài dòng code trong docs của họ là chúng ta có một giao diện vô cùng đỉnh cao. Tuy nhiên bạn đã bao giờ thắc mắc làm sao để có thể code được những package như vậy và publish nó lên npm chưa ? Qua bài viết này mình muốn giới thiệu về cách tạo package reactjs và publish nó lên npm kèm theo một vài lưu ý . Mở đầu đã hơi dài rồi nên là lẹc gooo !

![](https://images.viblo.asia/81a34d01-75de-4c6f-8517-67e0c3fcd090.png)

# Giới thiệu
Có nhiều cách để public một component package nhưng nói chung là khá phức tạp, nào là config webpack này nọ, rồi phải tạo một reactJs project rồi import thư viện mình vừa code vào , hơn nữa việc debug còn tương đối phức tạp. Thế nhưng gần đây mình tìm thấy một tool vô cùng ngon lành cành đào , chỉ cần setup một chút , chạy vài dòng lệnh là có ngay một môi trường code rồi. Xin giới thiệu [create-react-library](https://github.com/transitive-bullshit/create-react-library) . Để trực quan hơn mình sẽ demo một package nhỏ để public lên npm .
# Requirement
- Đầu tiên chắc chắn bạn phải cài đặt npm và node >=10 . Download tại [đây](https://nodejs.org/en/) 
- Một tài khoản npm . signup tại [đây](https://www.npmjs.com/signup) nhé .
# Init Package
Trước tiên hãy đảm bảo rằng tên package của mình định đặt là duy nhất bằng cách search tên package của mình định đặt trên npm có người đã đặt chưa. Bài viết này mình sẽ demo package làm đồng hồ đếm ngược. Sau khi lựa đi lựa lại mình cũng lựa đc cái tên **react-sample-countdown** . 

Có hai cách để init project:
- Cài package **global** bằng câu lệnh
```markdown
npm install -g create-react-library
```
Sau đó mỗi khi init project chỉ cần chạy
```go
create-react-library <name of your package>
```
- Mội cách init khác đó là sử dụng **npx** và init giống như react-create-app vậy
```go
npx create-react-library <name of your package>
```
Mình sẽ init package của mình
```markdown
npx create-react-library react-sample-countdown
```
![](https://images.viblo.asia/c4cff151-4b10-4763-98eb-c1fbdd0c56c5.png)
Sau khi chạy lệnh thì chúng ta cần điền một vài trường để init package như **Package Name**, **Github Repo Path**,... nhưng hầu như họ để các giá trị default chuẩn rồi nên nếu không có gì muốn thay đổi thì chỉ cần nhấn Enter là đc . Chính ra họ cũng hỗ trợ rất tốt có cả việc chọn code theo **js ( default )** hay **typescript** hay custom.

![](https://images.viblo.asia/da298ae3-515d-4680-84ed-ba1cc91cafbc.png)
Sau một hồi ngồi đợi nó install thì chúng ta cần phải mở 2 terminal một cái để chạy cái package và một cái để chạy cái example để debug cái package của mình dễ hơn.

Ngó qua một chút các file mà package tạo cho mình thì example nếu như ko kể đến vài file như config service-worker thì giống hệt một Reactjs project . **/src** chính ra code trong package của mình .
![](https://images.viblo.asia/070084e4-2e7a-4e1f-b475-aaa62e98f897.png)
# code code code !
Bài viết về các tạo package nên mình sẽ chỉ nhấn mạnh một số điểm cần lưu ý thôi . Code mọi người có thể xem tại repo của mình và mình cực cực kì vui nếu có bạn nào contribute package này đấy :v : https://github.com/vinhyenvodoi98/react-sample-countdown

## Một số lưu ý
### Cách bố trí file 
Cũng y như những gì chúng ta code thường ngày thôi các Reactjs-er chúng ta có thể thêm folder **components** vào **/src** rồi import vào index.js để tách các components ra cho dễ implement . Thậm chí hoàn toàn có thể implement thêm **redux thunk** hay **saga** hay **api context** , ...   

![](https://images.viblo.asia/ac27b01f-4ec0-4d86-a3f2-d695b826ee14.png)

### File css
Như ảnh trên thì chúng ta sẽ phải viết dưới dạng modules như vậy có một vài cái hay đó chính là scope của css chỉ trong component mà mình import thôi . Hơn nữa việc import như bình thường cũng không chạy được . 
```python:js
import 'index.css'
```
Ngoài ra có một cách khác đấy là sử dụng css inline :v nhưng có vẻ nó ko đc chuyên nghiệp cho lắm . Một cách nữa là **styled-components**. 

### Import ảnh
Hồi đầu mình cũng lúng túng mãi không import đc ảnh nhưng cuối cùng cũng đc . Ban đầu mình viết
```python:js
import clockImg from '../../asset/clock-icon.png'
```
Xong ko chạy được và cuối cùng chỉ cần thêm **/** :v chú ý nhé
```python:js
import clockImg from '/../../asset/clock-icon.png'
```
# Publishing lên npm
Chỉ cần không hơn 2 dòng lệnh thôi là đã public đc rồi .
```markdown:js
npm publish  // Câu lệnh này sẽ tự động public lên NPM
or
yarn public 
```
Deploy ví dụ của bạn
```markdown:js
npm run depublicloy  // Tự động deploy example lên github page
or
yarn deploy
```
**Lưu ý cuối** : Mình cũng chỉ là người mới trong việc contribute cho cộng động bằng các package hay ít nhất là khi mình dev cái gì đó mà các project hay dùng thì import chứ ko cần phải cop code chay . Vì thế thỉnh thoảng muốn vá lỗi thì bạn phải update lại package .Tuy nhiên ko phải cứ thế mà dùng **npm public** mà phải update lại version đấy nhé và cách để update version sao cho chuyên nghiệp .Ví dụ phiên bản 1.0.0 ( version đầu ) số cuối là số bug bạn fix đc trong version , số ở giữa là số feature mới bạn cho thêm vào version này còn số đầu tiên là update phiên bản lớn luôn và khi tăng version thì sẽ reset 2 số phía sau về 0.

# Reference
- https://github.com/transitive-bullshit/create-react-library