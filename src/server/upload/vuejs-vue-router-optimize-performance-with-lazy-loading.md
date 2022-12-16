### Mở đầu
Trong bài trước  mình đã giới thiệu về Vue Router. Qua bài đó bạn sẽ thấy có vấn đề như sau: <br>
Chúng ta sẽ bundler tất cả các page vào 1 file js duy nhất, Lúc đó ứng dụng của chúng ta sẽ chỉ cần load một file js duy nhất và có thể chạy tất cả các page khác. <br>
Vậy vấn đề ở đây là gì? <br>
Vậy nếu ứng dụng của chúng ta lớn thì sao? Chúng ta cũng vẫn để 1 file lớn như vậy sao? Liệu có cần thiết load hết cả 1 file lớn như vậy không? Liệu user có cần thiết tải cả một file lớn như vậy? Nếu mạng internet của người dùng không được tốt thì sao? <br>
Rõ ràng là có vấn đề đúng không :D Trong bài này mình sẽ hướng dẫn các bạn giải quyết vấn đề đó. :)<br>

### Story
 Trong quá trình phát triển ứng dụng chúng ta không chỉ nghĩ đơn giản ứng dụng của chúng ta chạy được là được mà chúng ta còn phải quan tâm đến hiệu suất của ứng dụng, làm sao để cải thiện cho người dùng có trải nghiệm tốt nhất. Vì vậy chúng ta sẽ cần tối ưu hiệu suất của ứng dụng ta. Không chỉ bên backend mà ngay cả ở bên frontend cũng cần tối ưu sao cho phù hợp nhất, hiệu quả nhất.
 <br>
 Tiếp tục giải quyết vấn đề ở trên thôi :D
<br>
Nếu ứng dụng của chúng ta nhỏ thì vấn đề load 1 file js cho cả ứng dụng thì sẽ không có gì đáng nói cả. Nhưng nếu ứng dụng của chúng ta đủ lớn thì sẽ là một vấn đề về hiệu suất. Trong lần tải đầu tiên người dùng sẽ phải load cả 1 file cực kì nặng cỡ tầm 15 - 20 Mb điều này đã làm người dùng phải đợi đến hàng 10s nếu như mạng không ổn định. Đấy là còn chưa kể đến tải dữ liệu từ API về nhé :D. Load hết cả file nặng vậy nhưng người dùng liệu có chắc chắn dùng hết tất cả tài nguyên có trong đấy không? Rất có thể là không. Vì vậy để giải quyết vấn đề này chúng ta sẽ chia nhỏ file js của chúng ta ra với các nhiệm vụ khác nhau. Người dùng dùng đến đâu chúng ta load đến đấy để tối ưu hóa nhất có thể. Điều này sẽ làm cho file js của chúng ta nhẹ đi rất nhiều và tải sẽ nhanh hơn. 

### Thực hành

Mình sẽ demo trên ứng dụng laravel + vuejs nhé.
Đầu tiên chúng ta sẽ cài laravel, vuejs, vue router. Mình đã có nói vấn đề này ở bài trước, các bạn có thể tham khảo tại [đây](https://viblo.asia/p/laravel-vuejs-vue-router-63vKjGXRZ2R) Để xem chi tiết. Trong bài này mình sẽ nói về vấn đề chính là lazy loading
Mình cũng sẽ lấy toàn bộ source code của bài đó áp dụng vào bài này nhé. :D

Tài file routes.js như sau:

```js
import Home from './components/Home'
import User from './components/User'

const routes = [
    {
        path: '/',
        component: Home,
        name: 'index',
    },
    {
        path: '/users',
        component: User,
        name: 'user',
    }
];

export default routes;
```

Bình thường chúng ta sẽ import như sau:

```js
import Home from './components/Home';
```
Sau đó sẽ đưa component đó vào routes:

```js
const routes = [
    {
        path: '/',
        component: Home,
        name: 'index',
    }
];
```

Chúng ta có thể khai báo 1 async component (component được load không đồng bộ) như sau:
```js
const Home = () => import('./components/Home.vue');
```
và đầy đủ sẽ như sau:

```js
const Home from './components/Home'
const User from './components/User'

const routes = [
    {
        path: '/',
        component: Home,
        name: 'index',
    },
    {
        path: '/users',
        component: User,
        name: 'user',
    }
];

export default routes;
```

Nhìn thì không thấy khác mấy nhỉ :D. Khi ta khai báo như trên, webpack sẽ tự chia ra cho mỗi route mà sử dụng 1 hoặc 1 số async component một file .js riêng biệt và sẽ chỉ cần load các component đó khi chúng ta đi vào route. Khác với cách bình thường ta hay dùng là tất cả trong 1 file app.js 😃 (cũng tiết kiệm đáng kể, và giảm tải load cho client)

Ok, giờ chạy npm run dev hoặc npm run watch để webpack compile cho chúng ta.

Và vào thư mục public/ chúng ta sẽ thấy xuất hiện các file
![](https://images.viblo.asia/dd59aad4-e068-49f1-9faa-7a22c9936cc2.png)

Sau khi compile thành công ta mở folder public sẽ thấy xuất hiện các file 0.js, 1.js....như sau (các số 0,1,2 là việc webpack quyết định chứ không theo thứ tự các route ta định nghĩa từ trên xuống dưới đâu nhé ae 😃 ):
Các file đó tương ứng với các component mà chúng ta định nghĩa ở file routes.js.
Nhưng chúng ta thấy nó tên nó không được hay lắm phải không? Và nó phải để vào một thư mục nào đó cho gọn đúng không nào.
Chúng ta sẽ sửa lại như sau:

```js
const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ './components/Home.vue'),
        name: 'page.index',
    },
    {
        path: '/users',
        component: () => import(/* webpackChunkName: "user" */ './components/User.vue'),
        name: 'page.user',
    }
];

export default routes;
```
![](https://images.viblo.asia/1bcfc799-4496-459b-a6a0-f437163503f8.png)

Vậy là ngon lành rồi. :D <br>
Các bạn có thể ra ngoài test với các router khác nhau sẽ load ra các file js khác nhau được rồi đấy. :D