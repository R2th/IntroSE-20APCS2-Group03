# 1. Giới thiệu dạng biểu đồ
Khi làm các dự án liên quan tới thống kê con số bằng biểu đồ hay số liệu, phần đa người ta sẽ nghĩ ngay tới dạng biểu đồ này: 

* Biểu đồ pie chart

![](https://images.viblo.asia/4d1bef4d-65fb-430f-828e-8891e6c250f0.png)

hay 
* Biểu đồ donut chart

![](https://images.viblo.asia/c622a858-e6cc-47b9-a938-1ebb5510a3bb.jpg)

Đây chắc hẳn là dạng biểu đồ thông dụng dành cho các vấn đề liên quan tới % ^^.
Bài viết ngày hôm nay của mình xin chia sẻ về cách vẽ dạng biểu đồ này trong dự án React Native.

# 2. Giới thiệu một số thư viện liên quan
Mình có tìm được ở đây, có 1 danh sách khá nhiều thư viện hỗ trợ, cũng có khá nhiều tương tác rate, download,...
https://openbase.io/packages/top-react-native-chart-libraries

Ví dụ như thư việc này: react-native-charts-wrapper:
https://github.com/wuxudong/react-native-charts-wrapper

![](https://images.viblo.asia/2d85d1c9-8457-4137-b451-10450b36026f.png)

Thư viện này cung cấp khá nhiều các kiểu vẽ chart khác nhau từ dạng cột, hình tròn, đường cong, hình đa giác,... cùng với hiệu ứng animation luôn. Nếu các bạn làm dự án cần vẽ rất nhiều chart thì đây cũng là một thư viện đáng được tham khảo.

Tuy nhiên, nếu trong một dự án design của chart thay đổi liên tục, animation mà khách hàng mong muốn trong lib không support chẳng hạn, đó lại là một vấn đề khá đau đầu. Nhưng không sao, chúng ta có thể tự mình xây dựng 1 "thư viện chart" nho nhỏ phục vụ cho dự án của mình.

# 3. Tạo chart với react-native-svg và d3
Nếu các bạn có flow về list bài post của mình, thì mình đã có một bài post nói về react-native-svg ( là nó nè https://viblo.asia/p/su-dung-svg-va-animation-render-view-trong-react-native-Az45bGrgKxY) và animation (https://viblo.asia/p/react-native-animated-RQqKLEbMZ7z) để vẽ những đường cong, đường thẳng theo ý muốn của mình.

Về giới thiệu react-native-svg, chắc mình sẽ không giới thiệu lại nữa, các bạn có thể search [react-native-svg](https://github.com/react-native-community/react-native-svg) trên github hoặc đọc bài viết trước của mình. Mình nghĩ thư viện đó khá hay, dùng được rất nhiều thứ nên bạn có thể tham khảo qua nó.

Về d3, thì D3(Data Driven Document) là một thư viện JavaScript được sử dụng để thao tác các documents dựa trên dữ liệu. Nó sử dụng HTML, CSS và SVG để biểu diễn trực quan của dữ liệu và có thể xem trên bất kỳ trình duyệt. Nó cũng cung cấp các tính năng tuyệt vời tương tác và hình ảnh động.

# 4. Giới thiệu về [d3-shape](https://devdocs.io/d3~4/d3-shape#_arc) và cách dùng
Trong bài này, mình dùng d3-shape để vẽ một cung tròn theo ý muốn dựa vào % của nó so với tổng.

```
const startAngle = 0
const ratio = percent * Math.PI *2 // arc
const endAngle = startAngle * ratio
const path = shape.arc()
        .outerRadius(60) // r in circle outside
        .innerRadius(20) // r in circle inner
        .startAngle(startAngle) // start 
        .endAngle(endAngle) // end
```

![](https://images.viblo.asia/d4b21461-8a91-45ca-a37f-e7d11b0b4f72.png)

Đối với một mảng dữ liệu:
```
const data = [
 {
    id: 1,
    color: 'red',
    value: 1,
  },
  {
    id: 2,
    color: 'green',
    value: 2,
  },
  {
    id: 2,
    color: 'yellow',
    value: 4,
  }
 ]
```

size => 2R circle out

```
const total = data.reduce(((total, item) => (item.value || 0) + total),
```

```
 <View style={[{
        width: size,
        height: size,
      }]}
      >
        <Surface
          width={size}
          height={size}
        >
          <Group
            x={size / 2}
            y={size / 2}
          >
            {
              data.map((item, index) => {
              
              const percent = item.value / total	
                const ratio = percent * circle	
                const endAngle = startAngle + ratio	

                const path = shape.arc()	
                  .outerRadius(size / 2)	
                  .startAngle(startAngle)	
                  .endAngle(endAngle)	
                startAngle = endAngle
              
                return (
                  <Shape
                    key={item.id}
                    d={path()}
                    fill={item.color}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                  />
                )
              })
            }
          </Group>
        </Surface>
      </View>
```

Kết quả :
![](https://images.viblo.asia/fcbfeb07-00ce-408b-ab5e-9cd14b354cf8.png)

còn nếu set thêm innerRadius thì: 

![](https://images.viblo.asia/e32def89-bb2f-4839-9b19-40daf98bb681.png)

# 5. Kết luận
Trên đây là cách vẽ một chart dạng hình tròn, về phần animation thì mình thấy cũng khá đơn giản, mọi người có thể dựa vào path để tạo animation, hãy thử  xem sao nhé ^^ .

Cám ơn mọi người đã đọc!