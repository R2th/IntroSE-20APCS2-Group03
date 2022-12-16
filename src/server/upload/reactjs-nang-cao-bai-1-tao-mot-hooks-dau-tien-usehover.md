Xin chào các bạn!

Trong series này, mình sẽ bắt đầu chia sẻ những kiến thức có thể tạm gọi là nâng cao về Reactjs, vì nó không dành cho những người mới học Reactjs. Mình sẽ cố gắng giải thích nhiều nhất có thể ý nghĩa của từng đoạn code được viết ra. Mình hi vọng những chia sẻ của mình sẽ hữu ích với các bạn đang sử dụng Reactjs. Nếu bạn phát hiện trong bài viết của mình có lỗi, hãy comment phía dưới giúp mình nhé! Xin cảm ơn!

Bắt đầu thôi nào!

Đặt vấn đề: Trong các component của React, chúng ta thường sử dụng rất thường xuyên việc xử lý các sự kiện Hover chuột lên component. Theo cách thông thường chúng ta sẽ viết đại khái như này:
```js
function Component(props: Props) {
    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    
    const handleMouseOver = () => {
        setIsHovered(true);
    }
    
     const handleMouseLeave = () => {
        setIsHovered(false);
    }
    
    return (
        <div
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            {...otherProps}
        >
        Component
        </div>
    );
}
```

Sẽ không có vấn đề gì cả khi ứng dụng của bạn chỉ có ít component phải sử dụng các sự kiện Hover chuột. Nhưng nếu Ứng dụng của bạn có quá nhiều chỗ phải dùng đến nó thì sao? Chẳng lẽ cứ trong mỗi component lại phải viết lại đống này sao?
Câu trả lời rõ ràng là không, bằng cách này hay cách khác, nhưng chắc chắn bạn sẽ phải đóng gói chúng lại để tái sử dụng. Có thể nghĩ đến Higer Order Component cũng là một giải pháp.

Ở đây, mình sẽ cung cấp một giải pháp xử lý nó để tái sử dụng một cách đơn giản nhất. đó là: Tạo ra một hooks để xử lý các sự kiện Hover chuột.
Kết quả sẽ được một hàm ```useHover()``` và chúng ta có thể sử dụng nó dễ dàng như sau:

```js
    import {useHover} from '@mylibrary/useHover';
    
    function MyComponent() {
        const {hoverProps, isHovered} = useHover({});
        
        return (
            <div
                {...hoverProps}
            >
                {`isHovered: ${isHovered}`}
            </div>
        );
    }
```

### Live demo:
[Xem live Demo trên Codesanbox](https://codesandbox.io/s/usehover-f89ls)

Thực sự đơn giản phải không? giờ đây mỗi khi cần trigger Hover trên component nào đó, chúng ta chỉ cần đơn giản vài ba dòng là xong.

Và bây giờ sẽ là code!

```js
    import { RefObject, HTMLAttributes, useMemo, useRef, useState } from "react";

    export interface HoverEvent {
      /** The type of hover event being fired. */
      type: "hoverstart" | "hoverend";
      /** The pointer type that triggered the hover event. */
      pointerType: "mouse" | "pen";
      /** The target element of the hover event. */
      target: HTMLElement;
    }

    export interface HoverEvents {
      /** Handler that is called when a hover interaction starts. */
      onHoverStart?: (e: HoverEvent) => void;
      /** Handler that is called when a hover interaction ends. */
      onHoverEnd?: (e: HoverEvent) => void;
      /** Handler that is called when the hover state changes. */
      onHoverChange?: (isHovering: boolean) => void;
    }

    export interface HoverProps extends HoverEvents {
      /** Whether the hover events should be disabled. */
      isDisabled?: boolean;
      isHovered?: boolean;
    }

    export interface HoverHookProps extends HoverProps {
      ref?: RefObject<HTMLElement>;
    }

    interface HoverResult {
      /** Props to spread on the target element. */
      hoverProps: HTMLAttributes<HTMLElement>;
      isHovered: boolean;
    }

    /**
     * Handles pointer hover interactions for an element. Normalizes behavior
     * across browsers and platforms, and ignores emulated mouse events on touch devices.
     */
    export function useHover(props: HoverProps): HoverResult {
      let {
        onHoverStart,
        onHoverChange,
        onHoverEnd,
        isDisabled,
        isHovered: isHoveredProp
      } = props;

      let [isHovered, setHovered] = useState(false);
      let state = useRef({
        isHovered: false,
        ignoreEmulatedMouseEvents: false
      }).current;

      let hoverProps = useMemo(() => {
        let triggerHoverStart = (event, pointerType) => {
        // Giải thích thêm: Bỏ qua nếu component bị disabled, hoặc touch trên di động, hoặc đã hover rồi.
          if (isDisabled || pointerType === "touch" || state.isHovered) {
            return;
          }

          state.isHovered = true;
          let target = event.target;

          if (onHoverStart) {
            onHoverStart({
              type: "hoverstart",
              target,
              pointerType
            });
          }

          if (onHoverChange) {
            onHoverChange(true);
          }

          setHovered(true);
        };

        let triggerHoverEnd = (event, pointerType) => {
          if (isDisabled || pointerType === "touch" || !state.isHovered) {
            return;
          }

          state.isHovered = false;
          let target = event.target;

          if (onHoverEnd) {
            onHoverEnd({
              type: "hoverend",
              target,
              pointerType
            });
          }

          if (onHoverChange) {
            onHoverChange(false);
          }

          setHovered(false);
        };

        let hoverProps: HTMLAttributes<HTMLElement> = {};

        if (typeof PointerEvent !== "undefined") {
          hoverProps.onPointerEnter = (e) => {
            triggerHoverStart(e, e.pointerType);
          };

          hoverProps.onPointerLeave = (e) => {
            triggerHoverEnd(e, e.pointerType);
          };
        } else {
          hoverProps.onTouchStart = () => {
            state.ignoreEmulatedMouseEvents = true;
          };

          hoverProps.onMouseEnter = (e) => {
            if (!state.ignoreEmulatedMouseEvents) {
              triggerHoverStart(e, "mouse");
            }

            state.ignoreEmulatedMouseEvents = false;
          };

          hoverProps.onMouseLeave = (e) => {
            triggerHoverEnd(e, "mouse");
          };
        }
        return hoverProps;
      }, [onHoverStart, onHoverChange, onHoverEnd, isDisabled, state]);

      return {
        hoverProps,
        isHovered: isHoveredProp || isHovered
      };
    }
```

## Giải thích code
Quay lại đoạn code sử dụng ở trên:
```js
    import {useHover} from '@mylibrary/useHover';
    
    function MyComponent() {
        const {hoverProps, isHovered} = useHover({});
        
        return (
            <div
                {...hoverProps}
            >
                {`isHovered: ${isHovered}`}
            </div>
        );
    }
```

Ta thấy rằng hàm ```useHover()``` trả về 1 object có chứa 2 tham số: ```hoverProps``` là hàm xử lý các sự kiện Hover để chèn vào component của bạn; ```isHovered``` là giá trị ```boolean```, ```true``` khi hover chuột vào phần tử.
Bạn cũng có thể xử lý thêm các sự kiện hover bằng cách truyền vào props của hàm ```useHover()```:

```js
    import {useHover} from '@mylibrary/useHover';
    
    function MyComponent() {
        const {hoverProps, isHovered} = useHover({
            onHoverStart: () => {console.log('onHoverStart')},
            onHoverEnd: () => {console.log('onHoverEnd')},
            ...
        });
        
        return (
            <div
                {...hoverProps}
            >
                {`isHovered: ${isHovered}`}
            </div>
        );
    }
```

Chi tiết trong hàm useHover() có lẽ cũng không cần giải thích gì thêm vì bản thân nó đã rất clean rồi phải không nào? Nếu bạn thấy chỗ nào khó hiểu, đừng ngần ngại comment phía dưới nhé! Mình sẽ giải đáp sớm nhất!

Kết thúc bài đầu tiên tại đây. Hi vọng bài viết này bổ ích đối với bạn. Cảm ơn bạn đã dành thời gian đọc bài của tôi!