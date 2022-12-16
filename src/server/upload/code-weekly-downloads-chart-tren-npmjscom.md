# Mở đầu :wave:
 Là một lập trình viên Web chắc hẳn ai cũng biết đến và từng truy cập website npmjs.com để khám phá, tìm hiểu (lấy link install :joy:) các thư viện Javascript. Và mỗi lần truy cập mình điều thấy khá thích thú với biểu đồ Weekly Downloads, vậy nên mình sẽ cùng với các bạn tìm hiểu cách tạo ra một component tương tự nhé :sunglasses:

![](https://images.viblo.asia/279d99ec-01be-40c3-a4e1-12e9396bb09d.png)
![](https://images.viblo.asia/d733a3ba-5701-4e53-93ec-f9d520c29a33.png)

Công nghệ mình dùng cho project là ReactJS và SVG



-----


# Nội dung
## Data
```JSON
data = [
  {
    downloads: 111154,
    label: '2020-07-12 to 2020-07-18',
  },
  {
    downloads: 111834,
    label: '2020-07-19 to 2020-07-25',
  },
  ...
]
```
 Mình sử dụng định dạng data như trên, đấy cũng là dạng dữ liệu mà mà component của npmjs.com sử dụng (nhưng mình tìm toét cả mắt ở tag Network thì không thấy responce nào trả về như thế :confused: ai tìm được chỉ mình với nha)
 ## Phần biểu đồ tim tím
 ```js
const WIDTH = 500
const HEIGHT = 100
// ...
   <svg width={WIDTH} height={HEIGHT}>
      <path d={pathD1} fill='none'></path>
      <path d={pathD2} stroke='none'></path>

      <line x1={pointSelected.x} x2={pointSelected.x} y1={0} y2={HEIGHT}></line>
      <circle cx={pointSelected.x} cy={pointSelected.y}></circle>

      <rect
        width={WIDTH}
        height={HEIGHT}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      ></rect>
    </svg>
 // ...
 ```
 Bên trong thẻ `svg` mình dùng một số thẻ nữa với chức năng như sau
*  thẻ `path` đầu tiên để vẽ đường xanh tím này 
 ![](https://images.viblo.asia/2722e7ed-fb33-4f16-99a2-492c63fd2a99.png)
*  thẻ `path` thứ high để vẽ hình tím tím này 
![](https://images.viblo.asia/c97261fe-8f84-4295-8fff-5a578d5d431b.png)
*  thẻ `line` và `circle` để vẽ hình này khi ta hover trên biểu đồ
![](https://images.viblo.asia/8cb97adc-f535-4fdf-b13f-724e7a981c90.png)
 * còn thẻ `rect` để ta bắt sự kiện `onMouseMove` và `onMouseOut` khi hover chuột để xem chi tiết lượt download của từng tuần

### Path & Path
Phần quan trọng nhất là làm sao chúng ta có thể tính được pathD để vẽ được biểu đồ trên bằng dữ liệu bên trên. Mỗi tuần mình sẽ cho là 1 điểm có tọa độ x , y , số lượt downloads, và label là thời gian tuần đó  `{x, y, downloads, label}` .Đầu tiên chúng ta sẽ tính toán tọa độ các điểm:
```js
const WIDTH = 500
const HEIGHT = 100

const { min, max } = findMinMax(data) // tìm giá trị download min và max (findMinMax là mình tự viết)

const deltaX = WIDTH / (data.length - 1) // tính khoảng cách theo trục X giữa 2 điểm 

const deltaY = 60 / (max - min) // ở đây chiều cao chart của mình là 100px mình muốn tuần có 
//lượt download lớn nhất ở tọa độ Y 0 tuần có lượt download thấp nhất ở tọa độ Y 60 
//nên mình tính deltaY theo từng lượt download như trên

//đây là phầm tính tọa độ các điểm
let points = []
for (const [index, value] of data.entries()) {
  points.push({
    x: index * deltaX,
    y: (max - value.downloads) * deltaY + 8, // tất cả +8 để cho đẹp chút thôi
    downloads: value.downloads,
    label: value.label,
  })
}
```
Tiếp theo ta sẽ tính biến pathD. ở đây mình dùng attribute `d` của thẻ `path`, nó sẽ bao gồm một dãy các kí tự trong đó có một chữ cái đi kèm tọa độ `x y`. Ở đây mình dùng những kí tự đơn giản sau (khó mình không biết :unamused:)
*  `M 20 40` : luôn bắt đầu với `M` để di chuyển bút vẽ đến tọa `{20,40}`
*  `L 40 60` : vẽ 1 đường thẳng từ điểm trước đó của bút đến tọa độ `{40,60}`
*  `Z` : đóng lại đường đã vẽ thành một hình (màu trong hình được định nghĩa bằng attribute `fill`)

```js
let pathD = `M ${points[0].x} ${points[0].y} `
for (const point of points) {
  pathD += `L ${point.x} ${point.y} `
}
const pathD1 = pathD
const pathD2 = `${pathD} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`
```

Vậy là phần khó đã xong (style mình sẽ để riêng 1 file scss sau)
 
 ### Bắt sự kiện Mouse và show thông tin chi tiết
 
 ```js
 //...
 const defaultPoint = { // giá trị mặc định của điểm là không hiển thị trên svg
  x: -1000,
  y: -1000,
  downloads: data[data.length - 1].downloads,
  label: 'Weekly Downloads',
}

function Chart() {
  const [pointSelected, setPointSelected] = useState(defaultPoint)
  
  const handleMouseMove = (e) => {
    let index = Math.round(e.nativeEvent.offsetX / deltaX) 
    // xác định tọa độ theo trục X chuột đang di chuyển trên để tìm point
    setPointSelected(points[index])
  }
  const handleMouseOut = (e) => {
    setPointSelected(defaultPoint)
  }
  
  return (
    <div className='chart__container'>
      <h1>{pointSelected.label}</h1>
      <div className='content'>
        <div className='num'>{Intl.NumberFormat().format(pointSelected.downloads)}</div>
        // format lượt download dạng ###,###,###
        <div className='chart'>
          <svg width={WIDTH} height={HEIGHT}>
            <path d={pathD1} fill='none'></path>
            <path d={pathD2} stroke='none'></path>

            <line x1={pointSelected.x} x2={pointSelected.x} y1={0} y2={HEIGHT}></line> 
            <circle cx={pointSelected.x} cy={pointSelected.y}></circle>
            // các thuộc tính x1,x2 của line, cx, cy, r của circle các bạn tự tìm hiểu thêm nha
            
            <rect
              width={WIDTH}
              height={HEIGHT}
              onMouseMove={handleMouseMove}
              onMouseOut={handleMouseOut}
            ></rect>
          </svg>
        </div>
      </div>
    </div>
  )
}
 ```
 
Vậy là được rồi đấy các bạn :clap:

Đây là phần 
[demo](https://codesandbox.io/embed/gallant-gareth-3ldqv)



-----


# Kết luận
Đây là bài viểt debut của mình, có gì sai sót mong các bạn, các anh chị góp ý

Hi vọng với chút chia sẻ này sẽ giúp đỡ được mọi người, đặc biệt là các bạn mới để cộng đồng DEV Việt Nam ngày càng phát triển! :clap: