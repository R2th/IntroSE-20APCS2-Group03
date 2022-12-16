# Mở đầu :wave:
Chào mọi người, chắc hẳn mọi người đã quá quen thuộc với trào lưu Trading trong những năm gần đây. Dưới góc độ của một nhà phát triển chúng ta hãy cùng tìm hiểu các yếu tố kĩ thuật tạo nên một sàn giao dịch như thế. Mở đầu hôm nay chúng ta sẽ cùng làm một module khá quen thuộc, tạo nên nét đặt trưng của các sàn giao dịch đó là Candlestick Chart

![](https://images.viblo.asia/cb3e5f75-a8eb-4b1d-b975-c7663c569dfb.png)

Công nghệ mình dùng cho project là: ReactJS, SVG

# Nội dung
## 1.Data
Đầu tiên chúng ta cùng tìm hiểu về những ngọn nến của Candle Chart. Một Candle (ngọn nến) sẽ bao gồm ít nhất 4 thuộc tính: Open price, High price, Low price và Close price. Nếu Open price < Close price ngọn nến sẽ có màu xanh (mua nhà) và ngược lại ngọn nến sẽ có màu đỏ (bán nhà)

![](https://images.viblo.asia/b8c01464-1849-4f33-9e40-0f5560055977.jpg)


Về mặt dữ liệu, đầu vào Candle Chart của chúng ta sẽ là một mảng các object, mỗi object `{ O, H, L, C }` đại điện cho các thuộc tính kể trên sẽ được dùng để vẽ nên một `candle`.

Ở đây chúng ta sẽ tạo một module `data.js` để generate dữ liệu

``` js
const Direction = () => (Math.random() < 0.5 ? -1 : 1)
const Random = (rand) => Math.random() * rand
const RandomProbabilityZero = (rand) => (Math.random() < 0.3 ? 0 : Random(rand))  //cái random này để có 30% trả về 0 để cho cái Chart của chúng ra đỡ rối mắt thôi
const Round = (num) => Math.round(num * 100) / 100   // lấy 2 chữ số thập phân

export function genCandle(prevCandleC) {
  const O = prevCandleC        
  // ở đây mình lấy Open price của nến hiện tại sẽ bằng Close price của cây nến trước đó. 
  // Thực tế 2 thông số này thường sẽ không bằng nhau, nhưng mình để thế cho dễ generate vậy :((
  const C = Round(O + Direction() * Random(500))
  const H = Round((O < C ? C : O) + RandomProbabilityZero(300))
  const L = Round((O > C ? C : O) - RandomProbabilityZero(300))
  return { O, H, L, C }
}

export function genCandles(initNum, amount) {
  let candles = [genCandle(initNum)]
  Array.from(Array(amount)).forEach((x, i) => {  // hàm này tương đương for(let i = 0; i < amount; i++) nhìn cũng rối nhưng không sao, mình thích vậy :))
    candles.push(genCandle(candles[i].C))
  })
  return candles
}
```

## 2.Vẽ nến nào
Ở đây mình sẽ dùng thẻ `svg`, bạn nào chưa biết có thể tìm hiểu thông qua bài viết trước của mình nhé [npmjs chart](https://viblo.asia/p/code-weekly-downloads-chart-tren-npmjscom-RnB5prM7ZPG)
``` js
// CandleChart.jsx
<svg
  width='1200'
  height='600'
>
  <path fill='#ee4947' stroke='#ee4947' d={pathD.dRed}></path>
  <path fill='#22f6db' stroke='#22f6db' d={pathD.dGreen}></path>

  // ...
</svg>
```

Chúng ta sẽ nhóm hết các cây nến màu xanh, đỏ vào với nhau để trong cùng một thẻ `path` nhằm cho đỡ rối và tăng hiệu xuất.

Trước hết tạo module `Candle.js` để tính ra pathD từ dữ liệu đầu vào là một mảng các cây nến `candles`. Ở đây mình sẽ fix cứng một số thông số
``` js
const HEIGHT = 600
const CANDLE_W = 20  // chiều rộng cấy nến
const D = 4   // khoảng cách 2 cây nến
let deltaY = 0  // tỉ số số pixel tương ứng với giá trị (H,O,L,C price) của cây nến
let min = 0   // max price của tất cả cây nến
let max = 0

export function calcPathD(candles) {  // hàm tính `d` của tất cả cây nến
  findMinMax(candles)
  deltaY = HEIGHT / (max - min)
  let dRed = ''
  let dGreen = ''
  candles.forEach((candle, index) => {
    if (candle.O < candle.C) {    // nến xanh
      dGreen += calcD(candle, index)
    } else {   // nến đỏ
      let candleTem = { H: candle.H, O: candle.C, C: candle.O, L: candle.L }
      dRed += calcD(candleTem, index)
    }
  })
  return { dRed, dGreen }
}

function calcD(candle, index) {   // hàm tính `d` của một cây nến cụ thể
  let posH = (max - candle.H) * deltaY
  let posO = (max - candle.O) * deltaY
  let posC = (max - candle.C) * deltaY
  let posL = (max - candle.L) * deltaY
  let posXCandle = index * (CANDLE_W + D) + CANDLE_W / 2   // tính tọa độ của cây nến theo trục X
  let d = `M ${posXCandle} ${posH} L ${posXCandle} ${posO} `   // vẽ cái đường upper shadow
  d += `M ${posXCandle - CANDLE_W / 2} ${posO} `    // vẽ body cây nến
  d += `L ${posXCandle + CANDLE_W / 2} ${posO} `
  d += `L ${posXCandle + CANDLE_W / 2} ${posC} `
  d += `L ${posXCandle - CANDLE_W / 2} ${posC} Z `
  d += `M ${posXCandle} ${posC} L ${posXCandle} ${posL} ` // vẽ đường lower shadow
  return d
}

// ....
const findMinMax = (candles) => {
  min = Number.MAX_VALUE
  max = Number.MIN_VALUE
  candles.forEach((candle) => {
    if (max < candle.H) max = candle.H
    if (min > candle.L) min = candle.L
  })
}
```

Ở component `CandleChart` chúng ta sẽ import 2 module và khởi tạo Chart

``` js
import { genCandle, genCandles } from './data'
import { calcPathD, calcValueY } from './Candle'

let candles = genCandles(10000, 40)  khởi tạo

function CandleChart() {
  const [pathD, setPathD] = useState(calcPathD(candles))  // tính attribute d của thẻ path
  
 //...
 
  return (
    <>
      ///...
      <svg
        width='1200'
        height='600'
      >
        <path fill='#ee4947' stroke='#ee4947' d={pathD.dRed}></path>
        <path fill='#22f6db' stroke='#22f6db' d={pathD.dGreen}></path>

        //...
      </svg>
    </>
  )
}

export default CandleChart
```

## 3.Thêm sự kiện mouse xem giá trị của từng cây nến

``` js
import React, { useState, useEffect } from 'react'
import { genCandle, genCandles } from './data'
import { calcPathD, calcValueY } from './Candle'

let candles = genCandles(10000, 40)

function CandleChart() {
  const [pathD, setPathD] = useState(calcPathD(candles))
  const [pointer, setPointer] = useState({ x: -100, y: -100, candleIndex: -1 })

  const handleMouseMove = (e) => {
    let x = e.nativeEvent.layerX
    let y = e.nativeEvent.layerY
    let candleIndex = Math.floor(x / 24)
    x = candleIndex * 24 + 10
    setPointer({ x, y, candleIndex })
  }
  const handleMouseLeonMouseLeave = (e) => {
    setPointer({ x: -100, y: -100, candleIndex: -1 })
  }

  const candleSelected = candles[pointer.candleIndex]
  const color = candleSelected?.O > candleSelected?.C ? 'red' : 'green'
  let delta = (candleSelected?.C - candleSelected?.O).toFixed(2)
  delta = delta > 0 ? `+${delta}` : delta

  const pointerValueY = calcValueY(pointer.y)
  return (
    <>
      <div className='info'>   // các price của cây nến
        <div className='label'>{'Open '}</div>
        <div className={`value ${color}`}>{candleSelected?.O}</div>
        <div className='label'>{'High '}</div>
        <div className={`value ${color}`}>{candleSelected?.H}</div>
        <div className='label'>{'Low '}</div>
        <div className={`value ${color}`}>{candleSelected?.L}</div>
        <div className='label'>{'Close '}</div>
        <div className={`value ${color}`}>{candleSelected?.C}</div>
        <div className={`value ${color}`}>{delta}</div>
      </div>
      <svg
        width='1200'
        height='600'
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeonMouseLeave}
      >
        <path fill='#ee4947' stroke='#ee4947' d={pathD.dRed}></path>
        <path fill='#22f6db' stroke='#22f6db' d={pathD.dGreen}></path>

        <line x1={pointer.x} y1={0} x2={pointer.x} y2={800} stroke='#888' strokeDasharray='5' />  // vẽ 2 đường nét đứt ngang và dọc
        <line x1={0} y1={pointer.y} x2={1130} y2={pointer.y} stroke='#888' strokeDasharray='5' />
        <g>
          <line x1={1130} y1={0} x2={1130} y2={600} stroke='#666' />  
          <text x={1135} y={pointer.y + 6} fill='#aaa'>   // xem price của tọa độ đang chọn theo trục Y
            {pointerValueY}
          </text>
        </g>
      </svg>
    </>
  )
}

export default CandleChart
```

##  4.Thêm nến vào biểu đồ để biểu đồ chuyển động như thật : ))
Chúng ta chỉ cần thêm `setInterval` để thêm `candle` vào biến `candles` mỗi một khoảng thời gian là chart sẽ chạy ngay thôi

``` js
// CandleChart.jsx
//...
useEffect(() => {
  let setIntervalId = setInterval(() => {
    candles.shift()   // thêm vào thì phải xóa đi
    candles.push(genCandle(candles[candles.length - 1].C))
    setPathD(calcPathD(candles))  // set lại giá trị pathD là React sẽ tự rereder lại cho ta
  }, 2000)   //thêm mỗi 2 giây
  return () => {
    clearInterval(setIntervalId)
  }
}, [])
//...
```
Vậy là ok rồi đó  :clap:
 
Nhìn qua có vẻ ổn đúng không? Nhưng có một vấn đề là mỗi lần chúng ta move chuột trên biểu đồ thì component sẽ được rerender lại để cập nhật thông tin chi tiết của cây nến, 2 đường nét đứt và cả price theo trục y nữa, mỗi lần như thế hàm `calcPathD` sẽ được gọi lại gây lãng phí tài nguyên, với dữ liệu nhiều sẽ làm trình duyệt bị giật ảnh hưởng đến trải nghiệm của người dùng (trong thực tế vấn đề này xảy ra khá nhiều, những bạn mới thường không để ý, hoặc không biết để xử lý). Nếu bạn nào quan tâm vấn đề này hãy ping mình biết (upvote, follow, comment :joy:), mình sẽ viết một bài giới thiệu một kĩ thuật rất phổ biến `memorization` để giải quyết bài toán này và một số bài toán tương tự nhé.  
Ngoài ra bạn nào muốn mình viết thêm bài tích hợp xử lý `realtime` nhận dữ liệu từ server vào project này thì cũng ping mình biết nhé :joy:

À đây là [demo](https://codesandbox.io/s/inspiring-newton-jqhoc) dạo này mạng hơi kém, ai không xem được có thể bookmark lại để xem sau nhé
# Kết luận
Cái title mình giật hơi quá mong các anh chị, các bạn, các em thông cảm nhé :cry:

Cảm ơn các bạn đã đọc!!!