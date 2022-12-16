## Mở đầu

Trong chúng ta, đặc biệt là các dev Frontend cũng làm việc ít nhiều với calendar đúng không nào. Lần đầu làm việc với calendar, hầu hết chúng ta sẽ dành một khoảng thời gian nho nhỏ để search xem thử có thư viện nào đó hỗ trợ không, rồi nhẹ nhàng đặt tay vào bàn phím và `npm install` hay `yarn add` nó vào. Mặc dù ngoài kia bao la thư viện, tuy nhiên trong bài viết này, chúng ta sẽ cùng xây dựng một calendar ko kém phần xịn sò :v: from scratch :v:  nhé.

Kết quả cuối cùng chúng ta có được sẽ trông như sau:
![](https://images.viblo.asia/90cc817c-a6bc-4234-9b7b-a092ad152d87.PNG)

Demo: https://z-react-dayjs-calendar.stackblitz.io/

Repo: https://github.com/JeDTr/react-dayjs-calendar

Let's do it!

## Cài đặt
Chúng ta sẽ sử dụng hai thư viện là [dayjs](https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md) và [lodash-es](https://github.com/lodash/lodash/tree/es)
```js
npm install dayjs lodash-es
```
Mình bỏ qua các bước khởi tạo như install `react` , `react-dom`. Các bạn có thể  `create-react-app` hay cấu hình `webpack` nhé. Và trước khi vào phần code, các bạn hãy cùng mình mở file docs lên nào ^^

dayjs: https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md (thư viện hỗ trợ làm việc với Datetime, tương tự như moment.js)

lodash: https://lodash.com/docs/4.17.15#range (trong bài viết này chúng ta chỉ dùng hàm `range()`)

## Code
[1]

Calendar page lúc đầu của chúng ta có dạng như sau (gồm 2 file là index.js và style.scss)
```js
/*
* index.js
*/
import React, { useState } from "react"
import "./style.scss"

const Calendar = () => {
    return <div>Calendar</div>
}

export default Calendar
```
```scss
/*
* style.scss
*/
@import url('https://fonts.googleapis.com/css?family=Manjari:400,700&display=swap');

body {
  font-family: Manjari, sans-serif;
  font-size: 14px;
}

.calendar {
  width: 350px;
  margin: 100px auto 0;
  box-shadow: 1px 2px 3px 4px rgba(0, 0, 0, .1);
  border-radius: 6px;
}
/* ... */
/* Trong dấu ... là hơn 900 dòng css. Just kidding */
```
Các bạn chỉ cần quan tâm đến file `js` thôi nhé, phần `css` thì tùy thuộc vào style của mỗi người nên tạm thời mình sẽ bỏ qua phần này.

[2]

Tiếp theo, chúng ta sẽ tạo các phần `header` và `week-container`, week mình sẽ cho hiển thị từ chủ nhật (Sun) đến thứ 7 (Sat) nhé.

![](https://images.viblo.asia/9eaa11c3-0867-44dc-94ce-4ef95923eee5.PNG)

```js
...
import dayjs from "dayjs"
...

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const Calendar = () => {
    const [dayObj, setDayObj] = useState(dayjs())
    
    return (
        <div className="calendar">
          <div className="header">
            <button type="button" className="nav nav--prev">
              &lt;
            </button>
            // hàm format sẽ trả về chuỗi dạng 'tháng ngày năm'.
            <div className="datetime">{dayObj.format("MMM DD YYYY")}</div>
            <button type="button" className="nav nav--prev">
              &gt;
            </button>
          </div>
          <div className="week-container">
            {weekDays.map(d => (
              <div className="week-cell" key={d}>
                {d}
              </div>
            ))}
          </div>
      </div>
    )
}
```

[3]

Tiếp theo chúng ta sẽ tạo danh sách các ngày trong tháng. 
![](https://images.viblo.asia/5a1417c7-bad5-4a42-9938-931a972cbb4b.PNG)

Phần này hơi phức tạp 1 xíu. Mình có giải thích ở sau đoạn code này nhé.

```js
...
import range from "lodash-es/range"
...

const Calendar = () => {
  const [dayObj, setDayObj] = useState(dayjs())

  const thisYear = dayObj.year()
  const thisMonth = dayObj.month() // (January as 0, December as 11)
  const daysInMonth = dayObj.daysInMonth()

  const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
  const weekDayOf1 = dayObjOf1.day() // (Sunday as 0, Saturday as 6)

  const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
  const weekDayOfLast = dayObjOfLast.day()
  
  return (
      <div className="calendar">
          <div className="header">...</header>
          <div className="week-container">...</div>
          
          // phần mới thêm vào
          <div className="day-container">
            {range(weekDayOf1).map(i => (
              <div className="day-cell day-cell--faded" key={i}>
                {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
              </div>
            ))}

            {range(daysInMonth).map(i => (
              <div
                className={`day-cell day-cell--in-month${
                  i + 1 === todayObj.date() &&
                  thisMonth === todayObj.month() &&
                  thisYear === todayObj.year()
                    ? " day-cell--today"
                    : ""
                }`}
                key={i}
              >
                {i + 1}
              </div>
            ))}

            {range(6 - weekDayOfLast).map(i => (
              <div className="day-cell day-cell--faded" key={i}>
                {dayObjOfLast.add(i + 1, "day").date()}
              </div>
            ))}
          </div>
  )
}
```
Tóm gọn ý tường của mình như sau:

a. render những ngày của tháng trước nhưng vẫn nằm trong tuần đầu của tháng này (29 và 30 trong hình)

![](https://images.viblo.asia/f54b7b9b-fbad-42ae-9b8a-549a3c241ba5.png)

a1: Tính xem ngày đầu tiên của tháng là thứ mấy với hàm `day()` . Các bạn lưu ý là hàm này sẽ trả về một số từ 0 - 6 với `Chủ nhật = 0` và `Thứ 7 = 6` nhé. Và từ con số này mình có thể suy ra được trước ngày mùng 1 của tháng hiện tại có bao nhiêu ngày.
```js
const thisYear = dayObj.year()
const thisMonth = dayObj.month() // (January as 0, December as 11)

const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
const weekDayOf1 = dayObjOf1.day() // (Sunday as 0, Saturday as 6)
```
a2: Sau đó tính toán và render sử dụng hàm `subtract()` để trừ đi số ngày tương ứng.
```js
{range(weekDayOf1).map(i => (
  <div className="day-cell day-cell--faded" key={i}>
    {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
  </div>
))}
```

b. render những ngày trong tháng

b1. tính xem tháng đó có bao nhiêu ngày. 

```js
const daysInMonth = dayObj.daysInMonth()
```

b2. render
```js
{range(daysInMonth).map(i => (
  <div className="day-cell day-cell--in-month" key={i}>
    {i + 1}
  </div>
))}
```

c. render những ngày của tháng sau nhưng vẫn nằm trong tuần cuối của tháng này
![](https://images.viblo.asia/57562c31-5e34-4555-bbd0-de31a7d4db65.png)

c1.  Tính xem ngày cuối cùng của tháng này là ngày thứ mấy

```js
const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
const weekDayOfLast = dayObjOfLast.day()
```

c2. Tính toán và render

```js
{range(6 - weekDayOfLast).map(i => (
  <div className="day-cell day-cell--faded" key={i}>
    {dayObjOfLast.add(i + 1, "day").date()}
  </div>
))}
```

[4]

Thêm sự kiện click vào `prev` và `next` button. 

```js
...
const Calendar = () => {
...
  const handlePrev = () => {
    setDayObj(dayObj.subtract(1, "month"))
  }

  const handleNext = () => {
    setDayObj(dayObj.add(1, "month"))
  }
  ...
  
  return (
      ...
      <button type="button" className="nav nav--prev" onClick={handlePrev}>
        &lt;
      </button>
      <div className="datetime">{dayObj.format("MMM DD YYYY")}</div>
      <button type="button" className="nav nav--prev" onClick={handleNext}>
        &gt;
      </button>
      ...
  )
}
```

[5] 

Cuối cùng chúng ta sẽ thêm `className` cho ngày hôm nay

![](https://images.viblo.asia/90cc817c-a6bc-4234-9b7b-a092ad152d87.PNG)

```js
...

const todayObj = dayjs()

const Calendar = () => {
...
    {range(daysInMonth).map(i => (
      <div
        className={`day-cell day-cell--in-month${
          i + 1 === todayObj.date() &&
          thisMonth === todayObj.month() &&
          thisYear === todayObj.year()
            ? " day-cell--today"
            : ""
        }`}
        key={i}
      >
        {i + 1}
      </div>
    ))}
...
}
...
```
Mình sẽ tạo một `todayObj` và so sánh ngày, tháng, năm của các ngày trong tháng hiện tại  với `todayObj`

## Tổng kết
Cuối cùng, toàn bộ code của chúng ta sẽ như sau:
```js
import React, { useState } from "react"
import dayjs from "dayjs"
import range from "lodash-es/range"
import "./style.scss"

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const todayObj = dayjs()

const Calendar = () => {
  const [dayObj, setDayObj] = useState(dayjs())

  const thisYear = dayObj.year()
  const thisMonth = dayObj.month() // (January as 0, December as 11)
  const daysInMonth = dayObj.daysInMonth()

  const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
  const weekDayOf1 = dayObjOf1.day() // (Sunday as 0, Saturday as 6)

  const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
  const weekDayOfLast = dayObjOfLast.day()

  const handlePrev = () => {
    setDayObj(dayObj.subtract(1, "month"))
  }

  const handleNext = () => {
    setDayObj(dayObj.add(1, "month"))
  }

  return (
    <div className="calendar">
      <div className="header">
        <button type="button" className="nav nav--prev" onClick={handlePrev}>
          &lt;
        </button>
        <div className="datetime">{dayObj.format("MMM DD YYYY")}</div>
        <button type="button" className="nav nav--prev" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <div className="week-container">
        {weekDays.map(d => (
          <div className="week-cell" key={d}>
            {d}
          </div>
        ))}
      </div>
      <div className="day-container">
        {range(weekDayOf1).map(i => (
          <div className="day-cell day-cell--faded" key={i}>
            {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
          </div>
        ))}

        {range(daysInMonth).map(i => (
          <div
            className={`day-cell day-cell--in-month${
              i + 1 === todayObj.date() &&
              thisMonth === todayObj.month() &&
              thisYear === todayObj.year()
                ? " day-cell--today"
                : ""
            }`}
            key={i}
          >
            {i + 1}
          </div>
        ))}

        {range(6 - weekDayOfLast).map(i => (
          <div className="day-cell day-cell--faded" key={i}>
            {dayObjOfLast.add(i + 1, "day").date()}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
```
Chưa tới 100 dòng code các bạn ạ. Nếu có đoạn nào sai hoặc có thể cải thiện hơn, các bạn có thể comment bên dưới nhé, biết đâu sẽ có một người nào đó đi ngang qua nhìn thấy và rep lại comment của bạn. Chúc các bạn thành công :)