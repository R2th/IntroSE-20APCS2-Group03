### Why
Bạn đang dạo quanh Internet và thi thoảng bắt gặp những giao diện website cực kì sáng tạo và mượt mà, những slider, button, animation như Mobile App vậy. Muốn tìm hiểu họ làm như thế nào lắm, nhưng khi xem source code Javascript thì nó đã được bundle mất rồi :sob: hoặc tệ hơn đó là Wordpress cùng với hàng tá plugin. 

Mình sẽ mách các bạn một số thư viện vô cùng hay ho để có thể tự tay làm nên những Smoothhhh UI :rofl:

### Framer Motion
Homepage: https://www.framer.com/motion/

Doc: https://www.framer.com/api/motion

Guthub: https://github.com/framer/motion - 8,7k Stars

Một thư viện chắc hẳn Dev ReactJS Native nào cũng biết tới. Thư viện này được phát triển từ [Pose](https://popmotion.io/pose/) và trên trang chủ Pose cũng đã thông báo chuyển hướng về Framer Motion. Framer là một công cụ cho phép dựng khung UI/UX cho App Mobile (Prototype), và họ cung cấp phần mêm trả phí nhưng thư viện thì lại hoàn toàn miễn phí và là Opensource.

![](https://images.viblo.asia/dc5c24eb-fe69-4297-a50f-5ff92e54c712.PNG)

##### Review
Đây thật sự là một thư viện cực dễ sử dụng vì tất cả đã được gói gọn trong các Component, tất cả những việc phải làm là chọn màu sắc, hình dáng, thời gian chuyển động ... Viêc cực kì ít code, chỉ với 4 dòng bạn đã có ngay một Animation sờ mút. Và đương nhiên với tiêu chí là Mobile First nên thư viện này đặc biệt phù hợp khi làm App Mobile với những hiệu ứng kéo thả, vuốt, chạm và giữ.

Tuy nhiên đây là hạn chế khi bạn muốn lồng ghép nhiều hiệu ứng cùng lúc, việc suy nghĩ sắp xếp sẽ thực sự khó. Đối với mỗi đối tượng chỉ nên dử dụng một animation.

```
import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const MyComponent = () => {
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]
  )

  return (
    <motion.div style={{ background }}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x }}
      >
        <Icon x={x} />
      </motion.div>
    </motion.div>
  )
}
```
Demo: https://codesandbox.io/s/framer-motion-path-drawing-drag-and-usetransform-jnqk2

```
import { motion } from "framer-motion"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      animate={isOpen ? "open" : "closed"}
      variants={variants}
    >
      <Toggle onClick={() => setIsOpen(!isOpen)} />
      <Items />
    </motion.nav>
  )
}
```

Demo: https://codesandbox.io/s/framer-motion-side-menu-mx2rw

### React-spring
Homepage & Doc: https://www.react-spring.io/

Github: https://github.com/pmndrs/react-spring - 19k Stars

Thư viện React-spring mới được phát triển từ năm 2018. Về nguồn gốc và cha đẻ của nó thì hãy xem phần dưới tiếp nhé.

React-spring là thư viện Animation (hoạt ảnh) dựa trên Spring (ý nói về sự nhún nhay lặp lại) sẽ bao gồm hầu hết các Animation liên quan đến UI/UX của bạn. Nó cung cấp cho bạn các công cụ đủ linh hoạt để thực hiện mọi ý tưởng của bạn vào các giao diện mượt mà. 

Nó được truyền cảm hứng rất nhiều từ Animation của Christopher Chedeau's [animated](https://github.com/animatedjs/animated) and Cheng Lou's [react-motion](https://github.com/chenglou/react-motion). Nó kế thừa hiệu suất và nội suy mạnh mẽ của hoạt hình, cũng như tính dễ sử dụng của chuyển động phản ứng. Bạn sẽ ngạc nhiên khi dữ liệu tĩnh được chuyển thành chuyển động dễ dàng như thế nào với các hàm tiện ích nhỏ, không ảnh hưởng đến cách bạn xem hình ảnh.

![](https://images.viblo.asia/f47841b9-a700-48b6-9734-3ad51cb32f84.PNG)


##### Review
React-spring thô sơ hơn Motion rất nhiều và nó đòi hỏi phải có thời gian học hỏi và hiểu biết về Keyframe hơn nhiều. Đổi lại nó cũng cấp rất nhiều API để có thể sử dụng để làm ra mọi Animation mà bạn có thể nghĩ tới. Không nhiều component, chỉ giới hạn trong những dạng chuyển động cơ bản nhất: 
* useSpring
* useSprings
* useTrail
* useTransition
* useChain

Nhưng tin mình đi, chỉ cần sử dụng 3/5 loại này là website của bạn đã lác mắt rồi :laughing:

```
import React from 'react'
import { render } from 'react-dom'
import { useTrail, animated } from 'react-spring'
import './styles.css'

const fast = { tension: 1200, friction: 40 }
const slow = { mass: 10, tension: 200, friction: 50 }
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

export default function Goo() {
  const [trail, set] = useTrail(3, () => ({ xy: [0, 0], config: i => (i === 0 ? fast : slow) }))
  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
          <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7" />
        </filter>
      </svg>
      <div className="hooks-main" onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}>
        {trail.map((props, index) => (
          <animated.div key={index} style={{ transform: props.xy.interpolate(trans) }} />
        ))}
      </div>
    </>
  )
}

render(<Goo />, document.getElementById('root'))

```
Demo: https://codesandbox.io/embed/8zx4ppk01l

```
// Original: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list

import { render } from 'react-dom'
import React, { useRef } from 'react'
import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import { useGesture } from 'react-use-gesture'
import { useSprings, animated, interpolate } from 'react-spring'
import './styles.css'

// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? { y: curIndex * 100 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex' }
    : { y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false }

function DraggableList({ items }) {
  const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useGesture(({ args: [originalIndex], down, delta: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
    const newOrder = swap(order.current, curIndex, curRow)
    setSprings(fn(newOrder, down, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder
  })
  return (
    <div className="content" style={{ height: items.length * 100 }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
            transform: interpolate([y, scale], (y, s) => `translate3d(0,${y}px,0) scale(${s})`)
          }}
          children={items[i]}
        />
      ))}
    </div>
  )
}

render(<DraggableList items={'Lorem ipsum dolor sit'.split(' ')} />, document.getElementById('root'))

```

Demo: https://codesandbox.io/embed/r5qmj8m6lq

Đây là cái Demo thuyết phục mình sử dụng React-spring.

### React-motion
Github: https://github.com/chenglou/react-motion  - 19k Stars

![](https://images.viblo.asia/1d37ca3b-790d-4a10-9e80-e1ff8983955a.PNG)

##### Review
Nếu các bạn xem Document của thư viện này, hẳn sẽ nhận ra giống gần như hoàn toàn React-spring. Chính xác đó, mục đích ban đầu của Cheng Lou là làm demo nói về việc quản lý trạng thái đầu cuối của đối tượng chuyển động để mang đến trải nghiệm tức thì cho User. Về su đó cộng đồng đóng góp và hướng ứng rất tốt với tư duy này nên đã góp nhau đẻ ra React-spring <3 Trên trang chủ React-spring cũng có dẫn Video của anh này tại React-Europe 2015.

```
import createReactClass from 'create-react-class';

const Demo = createReactClass({
  getInitialState() {
    return {
      items: [{key: 'a', size: 10}, {key: 'b', size: 20}, {key: 'c', size: 30}],
    };
  },
  componentDidMount() {
    this.setState({
      items: [{key: 'a', size: 10}, {key: 'b', size: 20}], // remove c.
    });
  },
  willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return {width: spring(0), height: spring(0)};
  },
  render() {
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        styles={this.state.items.map(item => ({
          key: item.key,
          style: {width: item.size, height: item.size},
        }))}>
        {interpolatedStyles =>
          // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
          <div>
            {interpolatedStyles.map(config => {
              return <div key={config.key} style={{...config.style, border: '1px solid'}} />
            })}
          </div>
        }
      </TransitionMotion>
    );
  },
});
```

Nếu các bạn còn đang nghĩ rằng mình đã master khi có thể làm website chỉ trong vài tuần hoặc vài ngày, thì nó còn ở tầm bước 0,01 so với thế giới thôi. Hãy xem xét những vấn đề cho dù đó là 0,01s UI/UX, nó sẽ giúp nâng level lên 100 lần đó :joy:

Video: https://www.youtube.com/watch?v=1tavDv5hXpo