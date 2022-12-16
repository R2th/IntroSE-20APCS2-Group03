![image.png](https://images.viblo.asia/ffcb730c-0d3b-4a95-a662-32ee8c03bea7.png)
# Lí do sử dụng
Trước khi đến với khái niệm về HOC chúng ta hay tìm hiểu xem lí do tại sao cần phải dùng đến nó

Ví dụ có một component để hiển thị ảnh và khi hover sẽ giảm opacity của ảnh. Đơn giản như sau: 

```javascript
import { useState } from 'react'

const Image = ({ src, opacity }) => {
  const [isHovered, setIsHovered] = useState()
  return (
    <div
      style={{
        opacity: isHovered ? opacity : 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={src} alt="img" />
    </div>
  )
}

export default function Image() {
  return (
    <Image src="image" opacity={0.5} />
  )
}
```

Nhưng nếu chúng ta có một component khác và cũng muốn hover giống như component `Image` thì sao?

Nếu copy lại component `Image`, chúng ta bị lặp code rất nhiều. Vậy nên chúng ta sẽ sử dụng một số cách để có thể khắc phục điều này.

# Wrapper Component

Wrapper components là các thành phần bao quanh các components và cung cấp cấu trúc mặc định để hiển thị children components

Chúng ta sẽ tách ra như sau

Component Image sẽ chỉ nhận đầu vào là src và hiển thị ra ảnh
```javascript
// Image.jsx
const Image = ({ src }) => {
  return <img src={src} alt="img" />
}
```

Component HoverOpacity sẽ nhận `children` và `opacity`

```javascript
// HoverOpacity.jsx
import { useState } from 'react'

const HoverOpacity = ({ children, opacity }) => {
  const [isHovered, setIsHovered] = useState()
    return (
      <div
        style={{
          opacity: isHovered ? opacity : 1
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        { children }
      </div>
  )
}
```
Và sử dụng như sau
```javascript
export default function WrappedComponent() {
  return (
    <div>
      <HoverOpacity opacity={0.5}>
        <Image src="image1" />
      </HoverOpacity>
      <HoverOpacity opacity={0.7}>
        <BackgroundImage src="image2" />
      </HoverOpacity>
    </div>
  )
}
```

# Higher Order Functional Component

Higher order component là một component sẽ nhận đầu vào là một component và trả về một component khác

Vẫn sẽ tách ra một component Image với chức năng hiển thị ảnh khi nhận `src` và `alt`

```javascript
// Image.jsx
const Image = ({ src, alt = "img" }) => {
  return <img src={src} alt={alt} />
}
```

Và component `HoverOpacity`, nó sẽ nhận giá trị là 1 Component và nó sẽ tạo ra 1 component mới sẽ nhận các props 

```javascript
// HoverOpacity
import { useState } from 'react'

const HoverOpacity = Component => function NewComponent(props) {
  const [isHovered, setIsHovered] = useState()
  const { opacity, alt, ...rest } = props
  const formatAlt = alt?.toLowerCase()?.replaceAll(' ', '-')
  return (
    <div
      style={{
        opacity: isHovered ? opacity : 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {alt && <h1>{alt}</h1>}
      <Component {...rest} alt={formatAlt} />
    </div>
  )
}
```
`NewComponent` sẽ bao gồm `Component` nhận vào ở đây ví dụ là component `Image`

Component `Image` nhận 2 props là `src` và `alt`, chúng ta có thể sử dụng các props của `NewComponent` truyền xuống `Component`, hoặc thay đổi giá trị của nó

Cuối cùng chúng ta có thể sử dụng nó như thế này

```javascript
const HoverImage = HoverOpacity(Image)
// Có thể tạo một component BackgroundImage với trường hợp dùng background image và truyền vào HoverOpacity để sử dụng
const HoverBackgroundImage = HoverOpacity(BackgroundImage)

export default function WrappedComponent() {
  return (
    <div>
      <HoverImage src="img1" opacity={0.8} alt="Image 1" />
      <HoverBackgroundImage src="img2" opacity={0.5} />
    </div>
  )
}
```

Cuối cùng chúng ta sẽ có thẻ `h1` "Image 1" và thuộc tính `alt` "image-1"

![](https://images.viblo.asia/5559cfd0-b889-40e8-93f1-72fe4129c872.png)


```html
<img src="img1" alt="image-1">
```

# Kết luận

Hi vọng sau bài viết này chúng ta đã hiểu được 2 phương pháp trên và nên dùng phương pháp nào cho mỗi trường hợp