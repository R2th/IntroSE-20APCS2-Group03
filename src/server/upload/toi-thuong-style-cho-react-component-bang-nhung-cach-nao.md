#### Chào mọi người, lại là mình đây, hôm nay mình sẽ chia sẽ một số cách thường dùng để style cho `react component` nhé :D .

# 1. Chuẩn bị
#### Yêu cầu:
- Đã có kiến thức cơ bản về reactjs.
- Đã có kiến thức cơ bản về webpack, babel.
- Môi trường mình sẽ demo:
  - window 10
  - node v8.11.3
  - yarn v1.7.0
 
#### Mục đích:
- Thực hiện để biết cách sử dụng.
- Tự kiểm nghiệm ưu và nhược điểm để sử dụng sao cho phù hợp với từng dự án.

#### Những phần bỏ qua:
-  Trong quá trình chúng ta thực hiện thì mình sẽ lượt bớt (không giải thích những thuật ngữ và các lệnh cơ bản).
-  Phần cấu hình mình sẽ không mô tả chi tiết trong bài viết, các bạn có thể theo dõi thông qua repo.
- .etc

# 2. Tiến hành

### 1. Inline (cách cơ bản nhất)
#### Input
![](https://images.viblo.asia/e78b9691-ac3b-4feb-989f-b5a7e7935b91.png)

#### Output
![](https://images.viblo.asia/877b92b9-152a-4c98-be73-2fa520c0451b.PNG)

### 2. Stylesheet (cách này mình thấy nhiều người sử dụng nhất)
#### Input
![](https://images.viblo.asia/77eaa4a0-5887-4a96-9f9c-01d9976074ba.png)

![](https://images.viblo.asia/1e209eb5-0aee-444f-8a63-0d46f1d1d474.png)

#### Output
![](https://images.viblo.asia/68b8131e-7131-4c51-bc1e-a7c055f7c251.png)

### 3. CSS Modules (các class được tạo ra sẽ được hash theo cách bạn muốn)
#### Input
![](https://images.viblo.asia/37430c58-a5bf-4bcf-99e8-7308958e5153.png)

![](https://images.viblo.asia/2284806c-2b47-449d-823b-052aa5ed84c9.png)

#### Output
![](https://images.viblo.asia/2f25ef6b-4952-47ac-b920-8f8fdfe40f28.png)

### 4. classnames library (sử dụng tính năng css-modules)
#### Input
![](https://images.viblo.asia/20ae9868-ac1a-4446-a821-bb0ff8409a81.png)

![](https://images.viblo.asia/2284806c-2b47-449d-823b-052aa5ed84c9.png)

#### Output
![](https://images.viblo.asia/c0c1d536-3543-4444-bed5-5e8f3e073e98.png)

### 5. styled-components library (có thể nói rằng: "bất kì ai làm việc với react đều không thể không biết thư viện này")
#### Input
![](https://images.viblo.asia/3b82a57c-cd5b-48c9-a3da-9a57571a0446.png)

#### Output
![](https://images.viblo.asia/065acc5d-dde6-4611-955f-169cf2b79199.png)

### 6. emotion library (thằng này được các developer nổi tiếng trong giới react rất hay sử dụng)
- Thư viện này có 2 trường phái sử dụng:
  - Chế độ `jsx` trong `@emotion/core`
  - `@emotion/styled`
#### Input
![](https://images.viblo.asia/db09f30c-5d8b-456f-9198-061a56f66c44.png)

#### Output
![](https://images.viblo.asia/b7406b8c-ff4c-479c-a6c7-47e7c50cfbd9.png)

# 3. Kết luận
Trong bài viết mình chỉ đề cập một số cách sử dụng cơ bản nhất và thường dùng nhất của mình :D, ngoài kia còn rất nhiều thư viện với nhiều cách để style cho `react component` còn độc đáo và tốt hơn nữa. Mình thì thường sử dụng `css-modules` và `styled-components`. Tùy vào sở thích, cách viết và độ thành thạo mà các bạn hãy sử dụng chúng cho phù hợp với dự án. Cảm ơn bạn đã đọc bài viết của mình, hi vọng nó sẽ mang lại cho bạn thêm một chút kiến thức gì đó nữa :pray:

Link repo tại đây https://github.com/daint2git/viblo.asia/tree/master/style-react