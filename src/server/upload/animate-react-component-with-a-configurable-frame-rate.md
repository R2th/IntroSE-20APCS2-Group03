![](https://images.viblo.asia/968a20c0-17b4-44ca-9c95-26cc57e3d67e.gif)

*Khi bạn phát triển một ứng dụng web bằng React và đột nhiên bạn muốn thêm vào một vài animation hay ho*

Bài viết này được lấy cảm hứng từ đó với những yêu cầu sau đây:
- Animation rất nhạy cảm với tần suất và tốc độ cập nhật ứng dụng.
- Animation thích hợp với các phần tử SVG.
- Animation có thể tái sử dụng và sử dụng được vào bất kỳ UI components nào.
- Animation phải nhanh và hiệu quả đối với mọi trình duyệt và mọi nền tảng.

## Let's start

Đầu tiên, khởi tạo một React component với SVG giống như một cái đồng hồ bấm giờ.

```
import * as React from "react";
import * as ReactDOM from "react-dom";

function degreesToRadians(degrees: number): number {
    return degrees / 180 * Math.PI - Math.PI / 2;
}
const radius = 100;
const size = radius * 2;
interface Props {
    initialDegree: number;
}
interface State {
    degree: number;
}
class StopWatch extends React.Component<Props, State> {
    public constructor(props: StopWatchProps) {
        super(props);
        this.state = {
            degree: props.initialDegree
        };
    }
    public render() {
        const radians = degreesToRadians(this.state.degree);
        // line begin at the circle center
        const lineX1 = radius;
        const lineY1 = radius;
        // Calculate line end from parametric expression for circle
        const lineX2 = lineX1 + radius * Math.cos(radians);
        const lineY2 = lineY1 + radius * Math.sin(radians);
        return (
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                >
                <circle
                    cx={radius}
                    cy={radius}
                    r={radius}
                    fill="yellow"
                />
                <line
                    x1={lineX1}
                    y1={lineY1}
                    x2={lineX2}
                    y2={lineY2}
                    strokeWidth="1"
                    stroke="red"
                />
            </svg>
        );
    }
}
```

Chúng ta sẽ có được một SVG tĩnh với một mũi tên nằm ở vị trí khởi động, *initialDegree*
![](https://images.viblo.asia/a4d19b76-05df-430d-b357-426d2f0466ca.png)

## Set in motion

Để cho mũi tên chuyển động, chúng ta cần 2 thứ:
- Một hàm cập nhật sẽ tính toán lại góc độ mới cho mũi tên.
- Vòng lặp chuyển động gọi đến hàm cập nhật trên.

```
public componentDidMount() {
    this.update();
}
private increment = 1;
private update = () => {
    this.setState(
        (previous: State): State => {
            return {
                degree: (previous.degree + this.increment) % 360
            };
        },
    );
    window.requestAnimationFrame(this.update);
};
```

*componentDidMount* gọi tới hàm cập nhật lần đầu tiên khi component được mount nên sẽ tránh được cảnh báo: *can't call setState on a component that is not yet mounted*

Trong mỗi lần gọi cập nhật, chúng ta sẽ tằng state lên 1 độ trong khoảng từ 0-259. Ở dòng cuối cùng, *requestAnimationFrame* báo cho trình duyệt để thực hiện vẽ lại animation tiếp theo với cùng phương thức cập nhật. Như một quy luật, điều này sẽ diễn ra 60 lần mỗi giây (60FPS), nhưng nó phụ thuộc vào trình duyệt và hiệu suất của thiết bị.

Kết quả, chúng ta sẽ thấy mũi tên chuyển động.

![](https://images.viblo.asia/0f9c3359-d378-43cd-8c74-4747db946fc8.gif)

## Configurable frame rate

Như chúng ta đã biết rằng, *requestAnimationFrame* thường mang lại cho chúng ta một chuyển động 60FPS, vì vậy thực tế chúng ta có thể tính toán để component được vẽ lại từ 1 cho tới 60 lần 1 giây.

Thêm thuộc tính *frameRate* vào component interface, và sử dụng nó như một component prop

```
interface Props {
    initialDegree: number;
    frameRate: number;
}
```

Thêm một dòng text để hiển thị FPS hiện tại.

```
<svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
>
    <circle
        cx={radius}
        cy={radius}
        r={radius}
        fill="yellow"
    />
    <line
        x1={lineX1}
        y1={lineY1}
        x2={lineX2}
        y2={lineY2}
        strokeWidth="1"
        stroke="red"
    />
    <text x="70" y="50" fill="black">
        {`FPS: ${this.props.frameRate}`}
    </text>
</svg>
```

Bây giờ thêm một bộ đếm frame vào phương thức update để ước tính xem có bao nhiêu khung hình chúng ta nên đợi cho đến khi animation tiếp theo được vẽ lại.

```
private maxFPS = 60;
private frameCount = 0;
private update = () => {
    this.frameCount++;
    if (this.frameCount >= Math.round(
        this.maxFPS / this.props.frameRate
    )) {
        this.setState(
            (previous: State): State => {
                return {
                    degree: (previous.degree + this.increment) % 360
                };
            },
        );
        this.frameCount = 0;
    }
    window.requestAnimationFrame(this.update);
}
```

thay đổi *increment* thành 3, và thêm *frameRate* vào *StopWatch* component props và thêm một vài stop watch nữa làm ví dụ

```
private increment = 3;
const App = () => (
    <div style={{display: "flex"}}>
        <StopWatch initialDegree={0} frameRate={60} />
        <StopWatch initialDegree={0} frameRate={30} />
        <StopWatch initialDegree={0} frameRate={20} />
    </div>
);
ReactDOM.render(
    <App />,
    document.getElementById("root")
);
```

![](https://images.viblo.asia/58ce3598-d071-4a7d-8f7f-8b985afe1ee5.gif)

Nếu muốn tất cả các mũi tên có cùng một tốc độ quay mặc dù chúng khác frame rate, chúng ta cần tính toán *increment* dựa vào FPS hiện tại.

## Last step

Để module hoá kết quả cuối cùng của chúng ta, hãy tách rời chức năng animation và làm cho nó có thể tái sử dụng.

Chúng ta sẽ sử dụng **higher order component** cho mục đích này.

```
import * as React from "react";
export type BaseProps = Readonly<{
    frameRate: number;
}>;
export type Options<Props extends BaseProps> = Readonly<{
    update: (state: Props) => Props;
}>;
export const MAX_FPS = 60;
export const withAnimation = <Props extends BaseProps>(
    options: Options<Props>
) => {
    return(
        Component: React.ComponentType<Props>
    ): React.ComponentClass<Props> => {
        return class Animation extends React.Component<
            Props, Props
        > {
            private frameCount = 0;
            private frameId = 0;
            constructor(props: Props) {
                super(props);
                this.state = props;
            }
            public render() {
                return <Component {...this.state} />;
            }
            public componentDidMount() {
                this.update();
            }
            public componentWillUnmount() {
                if (this.frameId) {
                    window.cancelAnimationFrame(this.frameId);
                }
            }
            private update = () => {
                this.frameCount++;
                if (this.frameCount >= Math.round(
                    MAX_FPS / this.props.frameRate
                )) {
                    this.setState(options.update);
                    this.frameCount = 0;
                }
                this.frameId =
                    window.requestAnimationFrame(this.update);
            };
        }
    };
};
```

Bây giờ *StopWatch* component của chúng ta trông đã đơn giản hơn nhiều

```
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BaseProps, withAnimation } from "./reactFrameRate";
function degreesToRadians(degree: number): number {
    return degree / 180 * Math.PI - Math.PI / 2;
}
const radius = 100;
const size = radius * 2;
type Props = Readonly<{
    degree: number;
}> & BaseProps;
const StopWatch: React.SFC<Props> = props => {
    const radians = degreesToRadians(props.degree);
    const lineX1 = radius;
    const lineY1 = radius;
    const lineX2 = lineX1 + radius * Math.cos(radians);
    const lineY2 = lineY1 + radius * Math.sin(radians);
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
        >
            <circle
                cx={radius}
                cy={radius}
                r={radius}
                fill="yellow"
            />
            <line
                x1={lineX1}
                y1={lineY1}
                x2={lineX2}
                y2={lineY2}
                strokeWidth="1"
                stroke="red"
            />
            <text x="70" y="50" fill="black">
                {`FPS: ${props.frameRate}`}
            </text>
        </svg>
    );
};
const options = {
    update: (props: Props): Props => {
        return {
            ...props,
            degree: (props.degree + 180 / props.frameRate) % 360
        };
    }
};
const WithAnimation = withAnimation(options)(StopWatch);
const App = () => (
    <div style={{display: "flex"}}>
        <WithAnimation degree={0} frameRate={30} />
        <WithAnimation degree={10} frameRate={10} />
        <WithAnimation degree={0} frameRate={5} />
    </div>
);
ReactDOM.render(
    <App />,
    document.getElementById("root")
);
```

![](https://images.viblo.asia/f561f8bd-68ac-4751-9bb9-94b17017ddf1.gif)

## Final thoughts

Vẫn còn một số cách để cải thiện code và cải thiện hiệu suất, nhưng hi vọng bài viết này sẽ hữu ích cho bạn và phương pháp này có thể tìm thấy một vị trí trong dự án React của bạn.

Source: https://levelup.gitconnected.com/animate-react-component-with-configurable-frame-rate-6e916572d0af