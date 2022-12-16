## Giới thiệu
   Nếu bạn để ý, đặc biệt với các trang web có số lượng ảnh lớn thì việc tải ảnh cùng với cách data khác làm thời gian load trang tăng lên rất nhiều, người ta đã thống kê rằng, dung lượng data để load ảnh chiếm khoảng 21% kích thước tài nguyên và trang web bạn tải về:
![](https://images.viblo.asia/6d3294f2-b7cb-4974-8d79-ba7db91f667c.png)

   Đặc biệt trong ứng dụng single page reactjs, việc thời gian load trang ngay từ đầu đã khá chậm nếu ko kể đến dùng nextjs thì việc tăng thời gian chờ đợi ngay lần đầu load trang do phải load ảnh sẽ làm giảm trải nghiệm người dùng rất nhiều.
   Vì vậy hôm nay mình muốn giới thiếu đến các bạn thư viện react-lazyload và ứng dụng nó để lazyload image. Phương pháp lazyload image đã được gới thiệu khá chi tiết trong bài này rồi nên mình không nhắc lại nữa, mong các bạn đọc qua để hiểu chi tiết thêm nhé. https://viblo.asia/p/ban-chat-cua-lazy-loading-images-RQqKLAamZ7z

   React-lazyload sinh ra để giúp bạn cải thiện performance ứng dụng, ko chỉ sử dụng cho image mà còn cho các components… Nếu bạn quan tâm nhiều đến performance ứng dụng, bạn có thể đọc thêm ở đây: https://www.npmjs.com/package/react-lazyload
   Giờ đi vào ứng dụng của nó trong lazyload img cho nóng luôn nhé:

## Ví dụ
* Khởi tạo project với create-react-app:
`create-react-app react-with-lazyload-img`
* Sau đó mình cài thêm dependence này vào nhé:
`npm i react-lazyload styled-components`

Đây là cấu trúc thư mục của mình với component App (file index.js trong folder App) là nơi mình thực hiện demo react-lazyload
![](https://images.viblo.asia/095a40c3-8ebb-4d68-9477-737dee0a4017.png)

File index.js trong folder App mình chia ảnh ra thành 3 cột và căn giữa.
```
import React from 'react'
import LazyloadImg from './components/LazyloadImg'

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <LazyloadImg url="https://i.pinimg.com/564x/9f/ef/bf/9fefbf39bf0a8cd5b5c8ea6e92ded682.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/18/63/45/1863456bc4465dae29ea3705b2888109.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/cc/ef/54/ccef547f152016208ffbe0904ac3e51d.jpg" />
      </div>
      <div>
        <LazyloadImg url="https://i.pinimg.com/564x/bf/35/9b/bf359bc230a45c85776fe5b2bfb56ac5.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/d1/c8/9c/d1c89c91c2de885410f447f2b6fe457b.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/32/e5/86/32e586ecba0447b611360a56b79b6dd1.jpg" />
      </div>
      <div>
        <LazyloadImg url="https://i.pinimg.com/564x/ce/45/e3/ce45e3819f35267f5d03a2ea58f87440.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/a7/4a/e4/a74ae4958184fda7daf1f6ef9f0062aa.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/04/23/4e/04234eb5a503f5f0aed0330b44afac67.jpg" />
      </div>
      <div>
        <LazyloadImg url="https://i.pinimg.com/564x/be/4a/24/be4a24321cabff6a21fc1492b2ee9c0f.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/07/ec/b0/07ecb04c2934e82684574b1a27b0d72d.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/09/56/28/095628641cf147f9afcb33d155cb49b4.jpg" />
      </div>
      <div>
        <LazyloadImg url="https://i.pinimg.com/564x/2c/22/96/2c22968ecc5c642c570675176ae3529b.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/d9/25/e7/d925e7d926fb8427556d84fbfc409930.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/8c/b0/16/8cb016fef6275475a88e80f0296e2f01.jpg" />
      </div>
      <div>
        <LazyloadImg url="https://i.pinimg.com/564x/72/cb/d7/72cbd72b1930f38aa0ee8f701a70b70c.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/ea/f3/16/eaf316b84a928a8feb3e5765eff81e84.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/00/29/ce/0029ce0e3f6e3c79a331aefbc5420e42.jpg" />
      </div>
      <div>
        <LazyloadImg url="https://i.pinimg.com/564x/47/15/81/47158182c2f02503088171b44dd3ac12.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/7f/5b/08/7f5b0848cd6d6886d0c9206c449fba42.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/bb/fb/7a/bbfb7afc71b9a3348cb121074c5b0771.jpg" />
      </div>
      <div>
        <LazyloadImg url="https://i.pinimg.com/564x/c6/bd/c4/c6bdc46d885854e0cbb31be8318ced51.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/53/8b/ad/538badf44f9b8103b7dd447ba4c9f475.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/e9/47/90/e94790e67d26016fe8f6ce6dbd7a0d01.jpg" />
      </div>
      <div>
        <LazyloadImg url="https://i.pinimg.com/564x/05/ad/51/05ad513efa1f4851d5dcb0536fc2f488.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/c6/bd/c4/c6bdc46d885854e0cbb31be8318ced51.jpg" />
        <LazyloadImg url="https://i.pinimg.com/564x/53/8b/ad/538badf44f9b8103b7dd447ba4c9f475.jpg" />
      </div>
      
    </div>
  )
}

export default App
```

Component LazyloadImg là nơi import `react-lazyload` để thực hiện lazyload. 
Trong component **LazyloadImg** mình set **throttle** = 1000ms để delay quá trình load ảnh thành 1s, tức là bạn sẽ nhìn thấy ảnh được hiển thị sau 1s này.
Mình đồng thời cũng set **height** là 300px để cho **react-lazyload** set tạm height của ảnh là 300px khi ảnh chưa load đc về.
```
import React from 'react'
import Lazyload from 'react-lazyload'

import MainWrapper from './styles'

function LazyloadImg({ url }) {
  return (
    <MainWrapper>
      <Lazyload throttle={1000} height={300}>
        <img src={url} />
      </Lazyload>
    </MainWrapper>
  )
}

export default LazyloadImg

```

Để UI trông đẹp hơn mình đã style lại LazyloadImg cho dễ nhìn:
```
import styled from 'styled-components'

const MainWrapper = styled.div`
  padding-top: 4rem;
  display: inline-block;

  .lazyload-wrapper {
    img {
      border-radius: 20px;
      width: 310px;
      padding: 5px;
    }
  }
`

export default MainWrapper

```

Đây là kết quả của mình: 
![](https://images.viblo.asia/64ced5a3-2278-4649-be7f-7bfc8b1289fd.png)

Hãy chú ý số lượng ảnh được load.
Và sau khi mình scroll xuống, số lượng ảnh được load thay đổi:
![](https://images.viblo.asia/413c6360-a78a-4aa2-8056-7443a2136b51.png)

## Tổng kết
Ngoài việc dùng lazyload image bạn có thể dùng cách khác như là dùng thuộc tính srcset của thẻ img, bạn có thể tham khảo ở đây: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
Mỗi cách có một ưu nhược điểm riêng, bạn có thể kết hợp cả 2 nếu cần thiết nhé.

Chúc các bạn thành công.