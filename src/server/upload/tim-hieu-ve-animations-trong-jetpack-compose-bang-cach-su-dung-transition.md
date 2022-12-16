Trong bài này, chúng sẽ tìm hiểu làm sao để sử dụng các kiểu khác nhau của animation trong Jetpack Compose bằng việc sử dụng Transition

Nếu bạn có hứng thú với các thành phần trong Jetpack Compose, bạn có thể xem qua lượt bài link dưới đâu:

- [How to make a Scrollable list in Jetpack Compose?](https://proandroiddev.com/how-to-make-a-recyclerview-in-jetpack-compose-fd54417d8479)
- [Handling Clicks in Jetpack Compose](https://proandroiddev.com/handling-clicks-in-jetpack-compose-3800379845c4)
- [Creating AppBars in Jetpack Compose](https://proandroiddev.com/creating-appbars-in-jetpack-compose-a8b5a5639930)
- [How to use Tabs in Jetpack Compose?](https://proandroiddev.com/how-to-use-tabs-in-jetpack-compose-41491be61c39)
- [Exploring Drawers in Jetpack Compose](https://android.jlelse.eu/exploring-drawers-in-jetpack-compose-3131e6f1b07b)
- [Exploring AdapterList in Jetpack Compose](https://proandroiddev.com/exploring-adapterlist-in-jetpack-compose-1615865d8e7d)
- [Animations in Jetpack Compose using Transition](https://proandroiddev.com/animations-in-jetpack-compose-using-transition-25d5d2143401)

Bài này chúng ta sẽ sử dụng Transition để tạo một animation đẹp trong bài này nhé, Vì thế chúng ta hãy tìm hiểu qua `Transition`.

```
@Composable
fun <T> Transition(
    definition: TransitionDefinition<T>,
    toState: T,
    clock: AnimationClockObservable = AnimationClockAmbient.current,
    initState: T = toState,
    onStateChangeFinished: ((T) -> Unit)? = null,
    children: @Composable() (state: TransitionState) -> Unit
)
```

`TransitionDefinition` bao gồm tất cả thông tin liên quan đến animation mà điều đó sẽ được tạo ra  khi chúng ta chuyển từ trạng thái này sang một trạng thái khác. `initState` được xem như là trạng thái ban đầu của transition khi mà `initState`  không xác định thì `initState`  sẽ lấy `toState` ban đầu làm transition. `toState` như nghĩa của cái tên là trạng thái tiếp theo của transition. `clock` là tham số tùy chọn ,tham số này sẽ căn chỉnh thời gian của animation. `onStateChangeFinished` chịu trách nhiệm lắng nghe khi việc chuyển trạng thái của animation kết thúc. `children` là composable mà sẽ được tạo hiệu ứng

Trong `TransitionDefinition` chúng ta sẽ xác định tất cả animation và trạng thái của animation mà chúng ta sử dụng. Có một số animation được dựng trước mà chúng ta có thể sử dụng luôn.

### Tween

Nó được sử dụng để tạo hiệu ứng từ giá trị này tới giá trị khác bằng cách cung cấp cho nó thời gian cho animation, delay và easing. Đoạn code bên dưới đây sử dụng để tạo **Tween** animation trong `TransitionDefinition`
```
angle using tween {
            duration = 3000
            delay = 1000
            easing = FastOutLinearInEasing
}
```


### Physics

Dùng để tạo animation 1 cách mềm mượt, Cung cấp  giá trị về tỉ lệ giảm xóc và độ cứng. Bạn có thể xem đoạn code dưới đây:

```
angle using physics {
            stiffness = 100f
}
```


### Keyframe
Được sử dụng để tạo các animation dựa trên các giá trị tại các thời điểm khác nhau. Timestamps có thể được xác định bằng cách sử dụng hàm `infix`  ... `at` và cũng cung cấp easing cho animation bằng cách sử dụng `infix`  ... `with`

```
angle using keyframes {
            duration = 6000
            0f at 0 with FastOutLinearInEasing
            360f at 6000 with FastOutLinearInEasing
}
```


### Snap
Được sử dụng để chuyển ngay lập tức từ trạng thái animation này sang animation khác. 

` angle using snap()`
### Repeatable

Sử dụng một animation khác làm tham số và có thể được sử dụng để lập đi lập lại nhiều lần với thời gian lặp (`duration`)

```
angle using repeatable {
            animation = tween {
                duration = 3000
                delay = 1000
                easing = FastOutLinearInEasing
            }
            iterations = Infinite
}
```


Bây giờ ý tưởng đầu tiên là về animation được dựng trước và làm sao để tạo `TransitionDefinition`. Bao gồm 3 bước cơ bản như sau:


**1 - Create PropKeys**
Bước đầu tiên là tạo `PropKeys`. Nó được yêu cầu cho mỗi  thuộc tính mà cần animate vì thế chúng ta có thể thay đổi giá trị của chúng  khi mà chúng ta chuyển từ trạng thái này sang trạng thái khác. Ví dụ là, nếu chúng ta yêu cần  giá trị là `float`  thì chúng ta có thể dùng `FloatPropKey`  tương tự cho các trường hợp khác nhau, chúng ta có thể sử dụng các loại `Propkeys` khác nhau như `PxPropKey`, `ColorPropKey` ...

**2 - Create State names**

Việc tạo tên trạng thái cho những checkpoint khác nhau trong animation. Tên trạng thái là chung nên chúng có thể là integer, string, enum hoặc bất kì kiểu gì mà phù hợp với trường hợp của bạn.

**3 - Create the TransitionDefinition**

Chúng ta sẽ sử dụng  DSL animation để tạo `TransitionDefinition`  bằng cách sử dụng `PropKeys`, `StateNames`

Cùng nhau tìm hiểu về quá trình tạo animation trong Jetpack Compose bằng ví dụ. Code bên dưới đây chúng ta tạo `TrasitionDefinition`:
```
private val angle = FloatPropKey()
private val transDef = transitionDefinition {
    state("start") {
        this[angle] = 0f
    }
    state("end") {
        this[angle] = 360f
    }
    transition("start" to "end") {
        angle using repeatable {
            animation = tween {
                duration = 3000
                easing = FastOutLinearInEasing
            }
            iterations = Infinite
        }
    }
}
```


Chúng ta tạo một `PropKey`  kiểu `float`. `TransitionDefinition`  của chúng ta có 2 trạng thái là `start` và `end` .  ProKey sẽ có giá trị trong khoảng 0f tới 360f. Chúng ta sử dụng  animation  `repeatable` trong đó chúng ta sử dụng animation `Tween` 

Bây giờ chúng ta đã xác định được  `TransitionDefinition`  và truyền nó vào `Transition` :
```
Transition(
                definition = transDef,
                initState = "start",
                toState = "end"
        ) { state ->
            Canvas(modifier = Modifier.preferredSize(200.dp)) {
                save()
                val midX = size.width.value / 2
                val midY = size.height.value / 2
                drawArc(Rect(midX - 150, midY - 150, midX + 150, midY + 150), 0f, state[angle], true, Paint().apply {
                    color = Color(0, 138, 255)
                })
                drawArc(Rect(midX - 100, midY - 100, midX + 100, midY + 100), 0f, state[angle], true, Paint().apply {
                    color = Color(255, 13, 128)
                })
                drawArc(Rect(midX - 50, midY - 50, midX + 50, midY + 50), 0f, state[angle], true, Paint().apply {
                    color = Color(255, 255, 255)
                })
                restore()
            }
        }
```
Code bên trên chúng ta đã chuyền `TransitionDefinition` và xác định được trạng thái ban đầu và trạng thái cuối cùng của chuyển đổi. Sau đó chúng ta sử dụng canvas để vẽ animation, sau đó chúng ta tạo 3 vòng tròn đồng tâm  và truyền vào `state[angle]`  như là đối số để thực hiện hàm `drawArc` . Giá trị của `state[angle]` trong khoảng từ 0f tới 360f. 
Và cuối cùng kết quả chúng ta nhận được là :

![](https://images.viblo.asia/e7626938-ea91-49dd-890d-7c118897b381.gif)



Link tham khảo: https://proandroiddev.com/animations-in-jetpack-compose-using-transition-25d5d2143401

Github : https://github.com/haiminhtran810/LearnAnimationsJepackCompose