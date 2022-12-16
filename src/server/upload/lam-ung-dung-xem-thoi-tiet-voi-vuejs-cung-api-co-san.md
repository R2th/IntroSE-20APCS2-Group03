![Screenshot from 2021-09-11 07-30-01.png](https://images.viblo.asia/0e0f4285-0906-44de-b22b-b60d768c6375.png)
# Mở Đầu
Xin chào các bạn chả là mình cũng mới biết đến một api về dự báo thời tiết free với 60 lần gọi trên phút hoặc 1 triệu lần gọi trên tháng, nó có dữ liệu về thời tiết của hơn 200.000 thành phố và được thu thập xử lý qua nhiều  cách khác nhau từ vệ tinh, radar hay các trạm thời tiết. Nó cũng có rất nhiều đinh dạng trả về như JSON, XML, HTML. Nên mình thử làm cái ứng dụng xem thời tiết từ api xem sao :D
# Tiến Hành
Đầu tiên muốn có API bạn cần truy câp vào trang [OpenWheather](https://openweathermap.org/), nếu chưa có tài khoản thì hãy đăng ký một tài khoản nhé, tiếp theo bạn chọn `Pricing` rồi chọn `Get API key` rồi chọn tiếp `API keys` ở đây sẽ có một key mặc định bạn có thể sử dụng luôn hoặc có thể tự tạo cho mình một key mới tùy theo bạn. Cái `key` này sẽ được truyền vào khi chúng ta gọi api lấy thông tin thời tiết. À một lưu ý là các khi đăng ký tài khoản thì nó sẽ gửi email verify về email đăng ký tài khoản của bạn vì thế bạn cần verify thì mới có thể sử dụng được key này nhé (khi bạn đã đăng ký mà chưa verify email thì nó vẫn có một cái key default nhưng khi gọi api mà sử dụng key đó thì sẽ bị lỗi 401). Tiếp theo là về Api, các bạn chọn `API` rồi chọn `API doc` của "Current Weather Data" nhé vì cái này free :D. Chúng ta sẽ có một URL api kiểu https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid={APIkey}. Với 2 Params là cityname APi key tương ứng với tên thành phố mà bạn muốn xem thời tiết và key mà chúng ta vừa tạo ra ở trên. Ngoài ra còn có một số Parameters khác như : 

* mode: Xác định kiểu trả về. Có các giá trị là xml và html. Nếu bạn không sử dụng thì mặc định sẽ là json
* units: Đơn vị đo gồm có `standard`, `metric`, `imperial`. Nếu bạn không sử dụng thì mặc định sẽ là `standard`. Đối với đơn vị `imperial` thì sẽ trả về nhiệt độ tính bằng độ F, `metric` thì sẽ trả về nhiệt độ tính bằng độ C,  còn mặc định thì nhiệt độ sẽ trả về độ Kelvin.
* lang: Ngôn ngữ trả về của dữ liệu

Các bạn có thể xem chi tiết về các trường trả về của API tại [đây](https://openweathermap.org/current#current_JSON). Vì nó khá dài và ở trên doc cũng đã giải thích chi tiết nên mình sẽ không đưa vào trong bài nữa. OK bây giờ chúng ta cùng test thử xem api có hoạt động không nhé, mình sẽ sử dụng thêm 2 Parameters đó là `units` = `metric` và `lang`=`vi` để kết quả trả về có nhiệt độ là độ C và ngôn ngữ là tiếng việt. Đây là kết quả 
![Screenshot from 2021-09-11 08-27-44.png](https://images.viblo.asia/c6d7651b-8fff-4cf8-8c96-cca8bbe46302.png)
Vậy là chúng ta đã có API rồi, tiếp theo chúng ta cần xây dựng giao diện để hiển thị data từ api ra nữa là xong. Giao diện của mình sẽ như thế này 


![Screenshot from 2021-09-11 07-30-01.png](https://images.viblo.asia/0e0f4285-0906-44de-b22b-b60d768c6375.png)

Khi người dùng nhập tên thành phố vào thì sẽ thực hiện gọi api để trả về kết quả. Đầu tiên là cứ phải tạo một project Vue cái đã :D à các bạn nhớ install thêm cả `axios` với `momentjs` vì lúc sau mình cần dùng đến nó nhé. Phần style giao diện các bạn có thể xem ở source code mình sẽ để link github ở phía dưới, Ở đây mình sẽ tập trung nói về cách xử  lý và hiển thị data. Khi người dùng nhập thành phố thì sẽ thực hiện gọi api để lấy data nên mình trong thẻ tìm kiếm mình có sự kiện `getAPI` khi data thay đổi như sau 
```js
    <input
        type="text"
        v-model="city"
        class="search-input"
        placeholder="Tìm kiếm"
        @change="getAPI"
    />
    methods: {
        async getAPI() {
            try {
                const data = await getData({
                    q: this.city,
                    appid: "c34d0b30de706ed953190741dcd852f2",
                    units: "metric",
                    lang: "vi",
                }).then((response) => ({
                    data: response.data,
                }));

                this.data = data;
            } catch (e) {
                return { data: [] };
            }
        },
    },
```
OKi thế là đã lấy được data. Tiếp theo là phần thời gian thứ ngày tháng và giờ cái này mình sẽ lấy luôn thời gian hiện tại và format theo kiểu của mình muốn hiển thị + ngôn ngữ nữa. 
```js
 <span>{{ time }}</span>
 
  computed: {
          time() {
            const date = moment(new Date());

            return date.locale("vi").format("dddd, Do MMMM");
        },
  }
```
Phần địa điểm thì mình sẽ lấy từ trong trường name ở trong data của api trả về. Lúc đầu chưa gọi api thì sẽ để là `- -`
```html
                <div v-if="data.data" class="address">{{ data.data.name }}</div>
                <div v-else class="address">- -</div>
```
Tiếp theo là phần icon thời tiết thì `OpenWheather` cho chúng ta URL icon dạng ` http://openweathermap.org/img/wn/10d@2x.png`. Trong data trả về  phần `weather[0].icon` sẽ trả về icon tương ứng của thời tiết vì vậy chúng ta chỉ cần thay `10d` bằng icon trả về đó là được.
MÌnh có phần icon như sau
```js
 <img class="image" :src="srcImage" />
 
 computed: {
    srcImage() {
        if (this.data.data) {
            return `http://openweathermap.org/img/wn/${this.data.data.weather[0].icon}@2x.png`;
        }

        return "http://openweathermap.org/img/wn/10d@2x.png";
    },
 }
```
Nếu chưa có data thì mình cũng hiển thị 1 icon cho đẹp :D.

Phần nhiệt độ thì chỉ cần lấy ra từ trường `temp` của data rồi hiển thị lên là được. Nếu chưa có data mình cũng để hiển thị một giá trị vào đó
```js
 <p class="temperature">{{ temperature(data) }}</p>
 
 methods: {
     temperature(value) {
        if (value.data) {
            const temperature = Math.round(value.data.main.temp);
            return temperature;
        }

        return 23;
    },
}
```
Phần mặt trời mọc và mặt trời lặn tương ứng nằm ở trường `sunrise` và `sunset` cần format lại trước khi hiển thị mình làm như sau:
```js
<p class="font-bold">
    MT Mọc: <span class="font-nomal"> {{ sunrise }} </span>
</p>

computed: {
    sundown() {
        if (this.data.data) {
            const sundown = this.data.data.sys.sunset;

            return moment.unix(sundown).format("H:mm");
        }

        return "6:00";
    },
}
```
Cuối cùng là phần độ ẩm và tốc độ gió nằm ở trường  `humidity` và `speed` chúng ta chỉ cần hiển thị ra thôi, mặc định tốc độ gió là m/s bạn có thể đổi lại thành km/h bằng cách nhân với 3.6.
 
 Vậy là đã xong  :D đây là kết quả 
 
 ![Peek 2021-09-11 09-21.gif](https://images.viblo.asia/7f46a8b9-8c27-4c57-997a-053cc04569f9.gif)


# Kết Luận 
Như vậy mình đã giới thiệu đến các bạn một API về thời tiết để có thể tự mình làm một ứng dụng xem thời tiết các bạn có thể lên trang chủ của [OpenWheather](https://openweathermap.org/) để tìm hiểu chi tết hơn nhé. Bài viết của mình đến đây là kết thúc cảm ơn các bạn đã theo dõi nếu thấy bài viết hữu ích thì hãy cho mình một upvote nhé, ấn theo dõi để cập nhật các bài viết mới nhất từ mình nhé. Cảm ơn các bạn

Source code: [https://github.com/hoangbh-0986/open-weather](https://github.com/hoangbh-0986/open-weather)