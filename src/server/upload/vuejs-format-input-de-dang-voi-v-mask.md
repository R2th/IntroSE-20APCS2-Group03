## Problem
Giả sử bạn đang muốn format input của người dùng ngay trong lúc họ nhập, ví dụ cụ thể là ô input đang cần nhập số tiền. Bạn muốn khi người dùng cứ nhập 3 chữ số của mệnh giá, nó sẽ tự động tách ra cho dễ nhìn:
![](https://images.viblo.asia/88b98947-a930-4e67-920e-bfa92c6bf563.png)

Hồi đầu khi chưa biết tới v-mask, nếu muốn làm như trên mình thường tạo [watcher](https://vuejs.org/v2/guide/computed.html#Computed-vs-Watched-Property) để theo dõi sự thay đổi của giá trị trong ô input. Sau đó dùng mấy hàm của javascript kiểu đếm kí tự rồi nhét space vào để nó cách ra. Nhưng vì giá trị tiền đó mình lưu trong database dạng integer nên trước khi gửi request lên server để lưu, mình lại phải format lại để lấy giá trị cũ của nó. Thật bất tiện và dài dòng đúng không?

Sau khi biết tới v-mask mọi thứ thật là easy :D đơn giản, dễ chơi, dễ xong task =)) Với những format khó hơn ví dụ trên của mình thì v-mask cũng xử lý nhanh gọn cho chúng ta. Tất cả những gì chúng ta cần làm khai báo format mà bạn muốn.
Sau đây thì mình xin giới thiệu cụ thể hơn về cách install và cách sử dụng trong ví dụ cụ thể nhé.

## Solution
### Install & Initialization v-mask
Như những package khác, chúng ta có thể sử dụng npm để kéo thư viện v-mask về:
```javascript
       npm install v-mask
```

Sau đó import vào file bạn đang muốn sử dụng hoặc file chung nếu bạn sử dụng nó ở nhiều nơi trong project:

```javascript
            import Vue from 'vue'

            // As a plugin
            import VueMask from 'v-mask'
            Vue.use(VueMask);

            // Or as a directive
            import { VueMaskDirective } from 'v-mask'
            Vue.directive('mask', VueMaskDirective);
```

### Usage:
Tiếp theo là bước sử dụng v-mask, tất cả những gì chúng ta cần làm là sử dụng directive *v-mask="format"* với format là mẫu dữ liệu mà chúng ta muốn hiển thị ra
```javascript
            <input type="text" v-mask="'####-##'" v-model="myInputModel">
            <!-- OR -->
            <input type="text" v-mask="nameOfVariableWithMask" v-model="myInputModel">
```

Ở ví dụ trên, chúng ta sẽ có kết quả như sau:
![](https://images.viblo.asia/43e745c1-dd4e-4fa8-93bc-a5e96a2348ab.png)

Nhưng có một lưu ý là, khi sử dụng *v-mask* từ v1.1.0 trở đi , chúng ta cần phải sử dụng kèm với *v-model* cho giá trị mà chúng ta muốn format. Ở những phiên bản cũ hơn thì không require *v-model* nhưng bị phát sinh nhiều bugs liên quan đến HTML element, các even listeners và việc đồng bộ với Vue. Nên mình cũng khuyến khích các bạn sử dụng bản > v1.1.0

Mọi thứ thật dễ dàng phải không? Trên đây là một thư viện hữu ích mà mình đã từng sử dụng và muốn giới thiệu với các bạn đang có nhu cầu format input của người dùng ngay trong lúc họ nhập. Mong nhận được góp ý từ các bạn đã từng sử dụng thư viện này. Còn những người chưa biết tới *v-mask* thì hãy thử và cảm nhận nhé :D

## Reference:
https://www.npmjs.com/package/v-mask