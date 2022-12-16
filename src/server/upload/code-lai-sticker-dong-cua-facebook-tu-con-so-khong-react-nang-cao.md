Hi all,
Trước đây khi chia sẻ về [**Cách để hack 345 gói Stickers của Facebook**](https://www.facebook.com/groups/reactjs.vn/permalink/3511394902307759/?__cft__[0]=AZVUQMUNQQxaYgCCtGuH4sz3MENhVgxcyABlCoy-_gd7-bo63HaBANnMjZ96dsSS1lg_JueL2E49z28un-U8olrPggxVBEwmDQxH1sPr7fKvkq98fHbivP8Etl6oSmFVjvkXot_9oiYOLJ8qwfZsPvCq&__tn__=%2CO%2CP-R) mình cũng đã có kế hoạch sẽ chia sẻ chuyên sâu về cách diễn hoạt Sticker từ ảnh SPRITE (Một bức ảnh với nhiều khung hình), nhân tiện Viblo tổ chức cái sự kiện #MayFest này nên mình quyết định sẽ viết một bài đầy đủ về Sticker.

Tất cả mã nguồn ở đây mình đều viết lại dựa trên code đã build của Facebook, cái Sticker mà chúng ta sắp viết cũng chính là cái mà Facebook đang dùng. Ở bản Share này mình lược bỏ một số phần mà mình chưa opensource được, nhưng nhìn chung là tương đương cỡ 90% hàng của Facebook rồi.

Bài viết này khá dài, và bao gồm nhiều code nâng cao về React, nhưng mình đã đóng gói dưới dạng mã nguồn mở rồi, nên nếu bạn ngại đọc thì có thể truy cập thẳng mã nguồn [**tại đây**](https://github.com/ladifire-opensource/animated-sticker) để xem.

Ngoài ra, bạn cũng có thể truy cập [**DEMO**](https://amazing-fermi-ff7579.netlify.app/) để xem trước sản phẩm chúng ta sắp code cho có hứng khởi.

Nếu bạn quan tâm đến cách thức Facebook bảo mật tài nguyên tĩnh thì có thể [xem bài này](https://viblo.asia/p/lat-tay-chieu-tro-giau-tai-nguyen-tinh-static-assets-cua-facebook-LzD5daDEKjY) của mình.

## Đặt vấn đề
**Định nghĩa về Sticker**:
Sticker là những biểu tượng bằng hình ảnh, có thể diễn hoạt được, và được dùng để mô tả một hành động hay cảm xúc nào đó. Stickers được dùng rất phổ biến trong các ứng dụng như Facebook, Zalo, Skype, Telegram, ...

Trong bài viết này chúng ta sẽ giải quyết bài toán sau:

Có một bức ảnh Sprite như thế này:

![](https://images.viblo.asia/54edb252-47ae-4c41-8bd8-6dda83f6cd7c.png)

Chuyển thành 1 Sticker có thể diễn hoạt được như thế này:

![](https://images.viblo.asia/bd6d6b78-3184-4497-a3de-6decc040c573.gif)

Yêu cầu: 
* Sticker chỉ diễn hoạt khi di chuột vào, và sẽ tự tắt sau 1 khoảng delay kể từ khi di chuột ra khỏi
* Yêu cầu nâng cao hơn: Sticker sẽ tắt trạng thái Play khi cuộn nó khỏi vùng quan sát (không còn hiển thị trên màn hình)

Bắt đầu thôi nào!

## Phân tích các thuộc tính của Sticker

![](https://images.viblo.asia/54edb252-47ae-4c41-8bd8-6dda83f6cd7c.png)

Quan sát ảnh Sprite, chúng ta dễ dàng bóc tách ra được các tham số sau:
* Tổng số Frames có trong ảnh = 16;
* Số lượng Frames trên 1 hàng = 4;
* Số lượng Frames trên 1 cột = 4.

Đây sẽ là những tham số rất quan trọng được dùng để diễn hoạt Sticker sau này.

## Lời giải

Đơn giản chúng ta sẽ set ảnh SPRITE làm background cho 1 phần tử, sau đó tạo ra các ANIMATION để thay đổi vị trí background tương ứng với từng khung hình của ảnh SPRITE, từ đó ta sẽ có được ảnh diễn hoạt.
Việc chúng ta cần làm chỉ là tìm ra tọa độ khung hình từ ảnh SPRITE thôi, cũng dễ thôi nhỉ :)

## Viết code
### Các thành phần bổ trợ
#### Hooks
**useInvalidNumberThrowsViolation**
Hooks này nhằm mục đích kiểm tra tính hợp lệ của các biến dạng số được truyền vào, đảm bảo rằng không có một biến dạng số nào bị truyền sai kiểu dữ liệu.
```javascript
/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function useInvalidNumberThrowsViolation(numberToCheck?: number, defaultMessage?: string) {
    if (!defaultMessage) {
        defaultMessage = 'Unexpected invalid number value';
    }

    if (!Number.isNaN(numberToCheck) && Number.isFinite(numberToCheck)) {
        return numberToCheck;
    }

    throw new Error(defaultMessage);
}
```

**useSpriteAnimation** Diễn hoạt từ ảnh Sprite
```javascript
/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useLayoutEffect} from 'react';

import stylex from '@ladifire-opensource/stylex';

import {useInvalidNumberThrowsViolation} from './useInvalidNumberThrowsViolation';
import {AnimationProps} from '../types';

// This is used for stylex inject priority
const INJECT_PRIORITY = 0;

function getAnimationName(frameCount: number, framesPerCol: number, framesPerRow: number) {
    return "__DYNAMIC__CometAnimatedSprite_" + frameCount + "_" + framesPerCol + "_" + framesPerRow
}

function buildCssAnimationString(props: AnimationProps) {
    const {
        frameCount,
        framesPerCol,
        framesPerRow,
        step,
    } = props;

    let _c = step / frameCount * 100;
    let _f = step % framesPerRow / framesPerRow * 100;
    let _a = Math.floor(step / framesPerRow) / framesPerCol * 100;
    let _e = Number.isNaN(_f) || Number.isNaN(_a) || Number.isNaN(_c) || !Number.isFinite(_f) || !Number.isFinite(_a) || !Number.isFinite(_c);
    if (_e === !0) throw new Error("Invalid animation input provided");
    return _c + "% { transform: translate(-" + _f + "%, -" + _a + "%); }"
}

function getAnimationStylex(name: string, c, d, e) {
    const f = [];
    if (!Number.isFinite(c) || Number.isNaN(c)) throw new Error("Invalid framecount");
    for (let g = 0; g < c; g++) f.push(buildCssAnimationString({
        frameCount: c,
        framesPerCol: d,
        framesPerRow: e,
        step: g
    }));
    if (f.length <= 0) throw new Error("There were no animation frames to create an animation");
    return "\n  @keyframes " + name + " {\n    " + f.join("\n  ") + "\n  }\n"
}

export function useSpriteAnimation(frameCount: number, framesPerCol: number, framesPerRow: number) {
    useInvalidNumberThrowsViolation(frameCount);
    useInvalidNumberThrowsViolation(framesPerCol);
    useInvalidNumberThrowsViolation(framesPerRow);

    const _animationName = getAnimationName(frameCount, framesPerCol, framesPerRow);

    useLayoutEffect(function() {
        stylex.inject(getAnimationStylex(_animationName, frameCount, framesPerCol, framesPerRow), INJECT_PRIORITY)
    }, [_animationName, frameCount, framesPerCol, framesPerRow]);
    return _animationName
}
```

**useMemoByObjectVariables** Memorize objects, nghe cái tên là biết tác dụng của nó rồi nhỉ :)
```javascript
/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import {areEqual} from '../utils';

const j = 0;

export function useMemoByObjectVariables(a) {
    const _ref = React.useRef(j);
    const [state, setState] = React.useState(a);

    const _areEqual = !areEqual(a, state);
    if (_areEqual) {
        _ref.current += 1;
        setState(a);
    }

    const f = React.useMemo(function() {
        return a
    }, [_ref.current]);

    return React.useMemo(function() {
        return [f, _ref.current]
    }, [f])
}
```

**useMergeRefs** merge nhiều refs lại với nhau
ví dụ:
```javascript
const ref1 = React.useRef(null);
const ref2 = React.useRef(null);
const ref = useMergeRefs(ref1, ref2);
```

Note: Xem hàm ```mergeRefs``` ở phía dưới
```javascript
import * as React from 'react';

import {mergeRefs} from '../utils/mergeRefs';

export function useMergeRefs() {
    let a = arguments.length, c = new Array(a);
    for (let d = 0; d < a; d++) c[d] = arguments[d];
    return React.useMemo(function() {
        return mergeRefs.apply(void 0, c)
    }, [].concat(c))
}
```

### Components
**CometSpriteBase**
```javascript
/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import stylex from '@ladifire-opensource/stylex';

import {useMergeRefs} from '../hooks/useMergeRefs';

const styles = stylex.create({
    innerSprite: {
        animationDelay: "0s",
        animationFillMode: "forwards",
        animationIterationCount: "infinite",
        animationPlayState: "running",
        animationTimingFunction: "steps(1)",
        position: "absolute",
        start: 0,
        top: 0
    },
    spriteButton: {
        overflow: "hidden",
        position: "relative",
        ":active": {
            transform: "none"
        }
    }
});

interface Props {
    accessibilityCaption?: string;
    animationStyle?: React.CSSProperties;
    containerRef?: any;
    cursorEnabled?: boolean;
    imgHeight?: number;
    imgWidth?: number;
    imgRef?: any;
    linkProps?: any;
    onHoverIn?: () => void;
    onPress?: () => void;
    overlayEnabled?: boolean;
    pressableRef?: any;
    showFocusOverlay?: boolean;
    src?: string;
    style?: React.CSSProperties;
    xstyle?; any;
}

// Some of props are not available for SHARE version
// Only use in Ladifire internal version
export function CometSpriteBase(props: Props) {
    const {
        accessibilityCaption,
        animationStyle,
        containerRef,
        cursorEnabled = false,
        imgHeight,
        imgWidth,
        imgRef,
        linkProps,
        onHoverIn,
        onPress,
        overlayEnabled = false,
        pressableRef,
        showFocusOverlay = false,
        src,
        style,
        xstyle,
    } = props;

    const _mergeRefs = useMergeRefs(pressableRef, containerRef);

    return (
        <div
            ref={_mergeRefs}
            className={stylex([styles.spriteButton, xstyle])}
            onMouseOver={onHoverIn}
            style={style}
        >
            <img
                src={src}
                alt={accessibilityCaption}
                draggable={false}
                ref={imgRef}
                style={Object.assign({
                    height: imgHeight,
                    width: imgWidth
                }, animationStyle == null ? undefined : animationStyle())}
                className={stylex(styles.innerSprite)}
            />
        </div>
    );
}
```

**CometAnimatedSticker**
```javascript
/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import {CometAnimatedSprite} from './CometAnimatedSprite';

interface Props {
    alt?: string;
    frameCount: number;
    frameRate: number;
    framesPerCol: number;
    framesPerRow: number;
    uri: string;
}

export function CometAnimatedSticker(props: Props) {
    const {
        alt,
        frameCount,
        frameRate,
        framesPerCol,
        framesPerRow,
        uri,
        ...otherProps
    } = props;

    return React.createElement(CometAnimatedSprite, Object.assign({}, otherProps, {
        accessibilityCaption: alt,
        frameCount: frameCount,
        frameRate: frameRate,
        framesPerCol: framesPerCol,
        framesPerRow: framesPerRow,
        spriteUri: uri,
    }))
}
```

**CometAnimatedSprite**
```javascript
/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import {useInvalidNumberThrowsViolation} from '../hooks/useInvalidNumberThrowsViolation';
// NOTE: this is not available for SHARE version
// import {useVisibilityObserver} from '@ladifire-internal-ui/observer-intersection';

import {useCometAnimationTrigger} from '../hooks/useCometAnimationTrigger';
import {useSpriteAnimation} from '../hooks/useSpriteAnimation';

import {CometSpriteBase} from './CometSpriteBase';

interface Props {
    animationTriggers?: any;
    frameCount: number;
    frameRate: number;
    framesPerCol: number;
    framesPerRow: number;
    repeatNumber?: number;
    spriteUri: string;
}

export function CometAnimatedSprite(props: Props) {
    const {
        animationTriggers,
        frameCount,
        frameRate,
        framesPerCol,
        framesPerRow,
        repeatNumber = 3,
        spriteUri,
        ...otherProps
    } = props;

    let k = React.useState(null),
        l: any = k[0];
    k = k[1];

    let c = useCometAnimationTrigger({
        animationTriggers: animationTriggers,
        frameCount: frameCount,
        frameRate: frameRate,
        iterationLimit: repeatNumber,
    });

    let m = c.duration,
        n = c.getShouldAnimate;
    let e = c.onHoverIn;
    let i = c.onLoad;
    let o = c.onNextAnimationIteration,
        p = useSpriteAnimation(frameCount, framesPerCol, framesPerRow);
    c = useInvalidNumberThrowsViolation(framesPerCol * 100);
    let d = useInvalidNumberThrowsViolation(framesPerRow * 100);

    // NOTE: This is not available for SHARE version
    // f = useVisibilityObserver({
    //     onVisible: i
    // });

    React.useEffect(() => {
        let a = l;
        if (a != null) {
            a.addEventListener("animationiteration", o);
            return function() {
                a.removeEventListener("animationiteration", o)
            }
        }
    }, [l, o]);
    return React.createElement(CometSpriteBase, Object.assign({}, otherProps, {
        animationStyle: function(a) {
            return n(a) ? {
                animationDuration: m + "ms",
                animationName: p
            } : {
                animation: "none"
            }
        },
        // containerRef: f, // NOTE: not available for SHARE version
        imgHeight: c + "%",
        imgRef: k,
        imgWidth: d + "%",
        onHoverIn: e,
        src: spriteUri
    }))
}
```

#### Code khác
**areEqual**
Hàm này check 2 object xem có equal không:
```javascript
/**
 * Copyright (c) Ladifire, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const aStackPool: any[] = [];
const bStackPool: any[] = [];

/**
 * Checks if two values are equal. Values may be primitives, arrays, or objects.
 * Returns true if both arguments have the same keys and values.
 *
 * @see http://underscorejs.org
 * @copyright 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * @license MIT
 */
export function areEqual(a: any, b: any): boolean {
    const aStack = aStackPool.length ? aStackPool.pop() : [];
    const bStack = bStackPool.length ? bStackPool.pop() : [];
    const result = eq(a, b, aStack, bStack);
    aStack.length = 0;
    bStack.length = 0;
    aStackPool.push(aStack);
    bStackPool.push(bStack);
    return result;
}

function eq(a: any, b: any, aStack: Array<any>, bStack: Array<any>): boolean {
    if (a === b) {
        // Identical objects are equal. `0 === -0`, but they aren't identical.
        return a !== 0 || 1 / a == 1 / b;
    }
    if (a == null || b == null) {
        // a or b can be `null` or `undefined`
        return false;
    }
    if (typeof a != 'object' || typeof b != 'object') {
        return false;
    }
    const objToStr = Object.prototype.toString;
    const className = objToStr.call(a);
    if (className != objToStr.call(b)) {
        return false;
    }
    switch (className) {
        case '[object String]':
            return a == String(b);
        case '[object Number]':
            return isNaN(a) || isNaN(b) ? false : a == Number(b);
        case '[object Date]':
        case '[object Boolean]':
            return +a == +b;
        case '[object RegExp]':
            return a.source == b.source &&
                a.global == b.global &&
                a.multiline == b.multiline &&
                a.ignoreCase == b.ignoreCase;
    }
    // Assume equality for cyclic structures.
    let length = aStack.length;
    while (length--) {
        if (aStack[length] == a) {
            return bStack[length] == b;
        }
    }
    aStack.push(a);
    bStack.push(b);
    let size = 0;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
        size = a.length;
        if (size !== b.length) {
            return false;
        }
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
            if (!eq(a[size], b[size], aStack, bStack)) {
                return false;
            }
        }
    } else {
        if (a.constructor !== b.constructor) {
            return false;
        }
        if (a.hasOwnProperty('valueOf') && b.hasOwnProperty('valueOf')) {
            return a.valueOf() == b.valueOf();
        }
        const keys = Object.keys(a);
        if (keys.length != Object.keys(b).length) {
            return false;
        }
        for (let i = 0; i < keys.length; i++) {
            if (!eq(a[keys[i]], b[keys[i]], aStack, bStack)) {
                return false;
            }
        }
    }
    aStack.pop();
    bStack.pop();
    return true;
}
```

**mergeRefs**
```javascript
export function mergeRefs(...args: any[]) {
    let a = arguments.length, c = new Array(a);
    for (let d = 0; d < a; d++)
        c[d] = arguments[d];
    return function(a) {
        c.forEach(function(c) {
            if (c == null)
                return;
            if (typeof c === "function") {
                c(a);
                return
            }
            if (typeof c === "object") {
                c.current = a;
                return
            }
            console.warn("mergeRefs cannot handle Refs of type boolean, number or string, received ref " + String(c), "comet_ui")
        })
    }
}
```

## Lời kết
Với những mã nguồn này, kết hợp với bài viết [**Cách để hack 345 gói Stickers của Facebook**](https://www.facebook.com/groups/reactjs.vn/permalink/3511394902307759/?__cft__[0]=AZVUQMUNQQxaYgCCtGuH4sz3MENhVgxcyABlCoy-_gd7-bo63HaBANnMjZ96dsSS1lg_JueL2E49z28un-U8olrPggxVBEwmDQxH1sPr7fKvkq98fHbivP8Etl6oSmFVjvkXot_9oiYOLJ8qwfZsPvCq&__tn__=%2CO%2CP-R), bạn đã có thể tạo ra cho mình FULL bộ sticker của Facebook, bao gồm 345 gói và 8000 stickers, rất hữu ích cho các dự án CHAT của bạn.

Chào tạm biệt và hẹn gặp lại!