Xin chào các bạn!

Hôm nay mình lại trở lại với series [**Reactjs nâng cao**](https://viblo.asia/s/reactjs-nang-cao-VgZvEv9rKAw). Ở bài trước chúng ta đã tìm hiểu về cách viết 1 hooks trong React hoàn chỉnh và có thể tái sử dụng cho toàn bộ dự án của bạn từ nay trở về sau.
Trong bài này mình sẽ nói về việc tạo ra một layout tổng quát cho component, nhằm mục đích để tái sử dụng component này về sau.

Hãy nhớ rằng: **Tái sử dụng Component là tiêu chí sống còn khi scale ứng dụng của bạn!**. Vì rằng khi ứng dụng của bạn lớn lên và có đến hàng nghìn component, nếu các component càng không liên quan đến nhau thì size của ứng dụng của bạn càng lớn, càng rắc rối, đến mức mỗi khi nhìn lại nó bạn chỉ muốn ném máy tính đi thôi! Tin tôi đi! :D

## Live demo
Trước khi đọc tiếp, hãy xem live demo [Tại đây](https://codesandbox.io/s/slots-provider-test-3ndbf?file=/src/SlotsProvider.tsx) đã nhé!

## Mở đầu

Giả sử chúng ta có các components với layout tương tự nhau, như hình dưới đây:
![](https://images.viblo.asia/e23107cb-9e6e-4fa0-bdde-c919e0b4b8ea.png)

Component sẽ được layout thành các vùng như vậy, nhưng việc render cái gì vào đó là có thể tùy biến linh hoạt. Layout này có thể phù hợp với Modal, cũng có thể phù hợp với Alert, Toast, ..... và rất nhiều thứ khác. Vì vậy nó sẽ được tái sử dụng rất nhiều trong dự án. Giảm thiểu việc phải viết đi viết lại những đoạn code giống nhau một cách thừa thãi.

## Bắt đầu

### 1. Tạo ra một Context Provider dạng Slots

**Cho tao 1 slot nhé!** Bạn có thấy câu nói này rất phổ biến không? Slot là một "đặt hàng" để giữ chỗ trước, sau đó có thể lấy hoặc không lấy nó.

Slots Provider mà chúng ta sắp tạo cũng như vậy, nó sẽ tạo ra một loạt các slots, sau đó thằng nào lấy slot nào để hiển thị thì sẽ vào đúng vùng mà ta đã layout. Ở đây ta sẽ tạo ra các slots sau:
* header
* closeIcon
* divider
* content
* footer
* buttonGroup

... Tương ứng với các phân vùng của layout đã được thiết kế trong ảnh trên.

Như vậy khi sử dụng nó, ta sẽ viết đại loại như sau:

```jsx
<SlotsComponent>
    <Slot slot="header">Đây là header</Slot>
    <Slot slot="closeIcon">Đây là close icon</Slot>
    <Slot slot="divider">Đây là divider</Slot>
    <Slot slot="content">Đây là content</Slot>
    <Slot slot="buttonGroup">Đây là buttons group</Slot>
</SlotsComponent>
```

Điểm hay ho của việc sử dụng Slots là bạn không cần quan tâm thứ tự của các Slot, chỉ cần điền đúng tên slot là được. Ví dụ nếu bạn thay đổi thứ tự viết các slots như sau thì component vẫn render ra đúng layout như thế.

```jsx
<SlotsComponent>
    // Đưa cái nào lên trước cũng không thành vấn đề, 
    // slot của mày là closeIcon thì mày phải nằm đúng vùng closeIcon do tao đặt ra cho mày
    <Slot slot="closeIcon">Đây là close icon</Slot>
    <Slot slot="header">Đây là header</Slot>
    <Slot slot="divider">Đây là divider</Slot>
    <Slot slot="content">Đây là content</Slot>
    <Slot slot="buttonGroup">Đây là buttons group</Slot>
</SlotsComponent>
```

OK, tiếp nào! đây là code cho SlotsProvider, đây chỉ là thuần React Context thôi nên cũng không có gì phải bàn nhiều:

```typescript
import React, { useContext, useMemo } from "react";

interface SlotProps {
  slot?: string;
}

let SlotContext = React.createContext(null);

export function useSlotProps<T>(props: T, defaultSlot?: string): T {
  let slot = (props as SlotProps).slot || defaultSlot;
  let { [slot]: slotProps = {} } = useContext(SlotContext) || {};
  return Object.assign(slotProps, props);
}

export function SlotProvider(props) {
  let parentSlots = useContext(SlotContext) || {};
  let { slots = {}, children } = props;

  // Merge props for each slot from parent context and props
  let value = useMemo(
    () =>
      Object.keys(parentSlots)
        .concat(Object.keys(slots))
        .reduce(
          (o, p) => ({
            ...o,
            [p]: Object.assign(parentSlots[p] || {}, slots[p] || {})
          }),
          {}
        ),
    [parentSlots, slots]
  );

  return <SlotContext.Provider value={value}>{children}</SlotContext.Provider>;
}
```

### 2. Tạo ra một SlotWrapper

Đây chỉ là một Wrapper, nhằm mục đích wrapper bất cứ thứ gì bạn muốn render vào đúng Slot bằng cách chỉ định tên slot cho nó thôi:

```typescript
import * as React from "react";

import { useSlotProps } from "./SlotsProvider";

interface Props {
  slot?: string;
  children: React.ReactElement;
}

export const SlotWrapper = (props: Props) => {
  props = useSlotProps(props, "text");
  const { children, ...otherProps } = props;

  return React.cloneElement(children, {
    ...otherProps
  });
};
```

### 3. Viết một component test, thể hiện cái layout đã thiết kế
```jsx
import * as React from "react";

import { SlotProvider } from "./SlotsProvider";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const TestComponent = (props: Props) => {
  return (
    <div className="grid">
      <SlotProvider
        slots={{
          header: {
            className: "header"
          },
          closeIcon: {
            className: "closeIcon"
          },
          divider: {
            className: "divider"
          },
          content: {
            className: "content"
          },
          footer: {
            className: "footer"
          },
          buttonGroup: {
            className: "buttonGroup"
          }
        }}
      >
        {props.children}
      </SlotProvider>
    </div>
  );
};
```

Chúng ta chỉ việc wrap toàn bộ children của component trong ```<SlotProvider...```. Đồng thời tạo ra các slots cho nó, trong mỗi slot, ở đây mình đã chèn một cái className vào cho nó.

### 4. CSS tí thôi!

```css
.App {
  font-family: sans-serif;
  text-align: center;
  background: #f0f1f2;
  height: 100vh;
  padding: 0;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: 12px auto 1fr auto minmax(0, auto) 12px;
  grid-template-rows: auto auto 16px 1fr auto auto 12px;
  grid-template-areas:
    ".        .           .         .             .             ."
    ".        header      header    header        closeIcon    ."
    "divider  divider     divider   divider       divider       divider"
    "content  content     content   content       content       content"
    ".        footer      footer    buttonGroup   buttonGroup   ."
    ".        .           .         .             .             .";
  width: 80%;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
}

.header {
  grid-area: header;
}

.closeIcon {
  grid-area: closeIcon;
}

.divider {
  grid-area: divider;
}

.content {
  grid-area: content;
}

.footer {
  grid-area: footer;
}

.buttonGroup {
  grid-area: buttonGroup;
}
```

Thế là xong rồi đấy! Giờ thì test nào!

### 5. Sử dụng

```jsx
import React from "react";

import { SlotWrapper } from "./SlotWrapper";
import { TestComponent } from "./TestComponent";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Slots provider test</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TestComponent>
          <SlotWrapper slot="header">
            <div>
              <h3>This is header</h3>
            </div>
          </SlotWrapper>
          <SlotWrapper slot="closeIcon">
            <div>Icon</div>
          </SlotWrapper>
          <SlotWrapper slot="content">
            <div>This is content area, you can render any thing here</div>
          </SlotWrapper>
          <SlotWrapper slot="divider">
            <div>
              <hr />
            </div>
          </SlotWrapper>
          <SlotWrapper slot="buttonGroup">
            <div>
              <button>Button 1</button>
            </div>
          </SlotWrapper>
        </TestComponent>
      </div>
    </div>
  );
}
```

 [Demo Tại đây](https://codesandbox.io/s/slots-provider-test-3ndbf?file=/src/SlotsProvider.tsx)

### 6. Kết thúc

Hi vọng bài viết này bổ ích cho mọi người, nếu có chỗ nào gây khó hiểu bạn hãy comment phía dưới nhé! Mình rất sẵn lòng giải đáp! Cảm ơn bạn đã theo dõi bài viết của mình!