# Lời mở đầu
Tình cờ mình có cơ hội được tham gia vào một dự án sử dụng `React-Native` và kiến trúc `Redux`, quả thực mình cảm thấy rất hứng thú với `Redux`. Đó cũng là lý do mà mình muốn áp dụng kiến trúc `Redux` vào ứng dụng Android.

Thư viện mà mình sử dụng trong bài viết này có tên gọi là [Kdux](https://github.com/htdangkhoa/kdux)
# Redux là gì
Redux là một `predictable state management tool` cho các ứng dụng JS. Nó giúp bạn viết các ứng dụng hoạt động một cách nhất quán, chạy trong các môi trường khác nhau (client, server, and native) và dễ dàng để test.
[Chi tiết](https://redux.js.org)

Redux gồm các thành phần chính:
 - **Store:** Là nơi quan lý những `State` hay còn gọi là trạng thái của ứng dụng.
 - **Actions:** Là nơi mà bạn định nghĩa các event mà ứng dụng muốn giao tiếp đến những `State` được quản lý trong `Store` thông qua phương thức `store.dispatch()`.
 - **Reducers:** Là tầng xử lý, chúng sẽ lấy những trạng thái hiện tại, thông qua các event được định nghĩa trong `Actions`, ứng với mỗi action, chúng sẽ trả về một trạng thái mới.

# Bắt đầu
Chúng ta sẽ bắt đầu làm một ứng dụng đếm số đơn giản.

- **Khởi tạo một `State`**
    ```kotlin
    data class CounterState(val number: Int = 0): State
    ```
- **Khởi tạo một `Action`**
    ```kotlin
    sealed class CounterAction: Action {
        object INCREASE: CounterAction()

        object DECREASE: CounterAction()

        companion object {
            fun increaseAction(dispatch: Dispatch) = dispatch(INCREASE)

            fun decreaseAction(dispatch: Dispatch) = dispatch(DECREASE)
        }
    }
    ```
- **Khởi tạo một `Reducer`**
    ```kotlin
    class CounterReducer: Reducer<CounterState> {
        override fun reduce(state: CounterState, action: Action): CounterState {
            return when (action) {
                CounterAction.INCREASE -> state.copy(number = state.number + 1)

                CounterAction.DECREASE -> state.copy(number = state.number - 1)

                else -> state
            }
        }
    }
    ```
- **CounterActivity**
    ```kotlin
    class CounterActivity: AppCompatActivity(), Enhancer<CounterState> {
        private val store: Store<CounterState> by lazy {
            Store(
                CounterReducer(),
                CounterState()
                // applyMiddleware(...)
            )
        }
        
        /**
        * Nếu bạn muốn xem lịch sử thay đổi của các trạng thái,
        * Kdux có cung cấp cho chúng ta một công cụ gọi là KduxDevTools.
        * Chúng ta sẽ khởi tạo store thông qua thương thức composeWithDevTools.
        * 
        * private val store: Store<CounterState> by lazy {
        *     composeWithDevTools(
        *         CounterReducer(),
        *         CounterState()
        *         // applyMiddleware(...)
        *     )
        * }
        */

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_counter)

            btnIncrease.setOnClickListener {
                CounterAction.increaseAction { store.dispatch(it) }
            }

            btnDecrease.setOnClickListener {
                CounterAction.decreaseAction { store.dispatch(it) }
            }
            
            // btnUndo.setOnClickListener {
            //     store.dispatch(KduxDevToolAction.UNDO)
            // }

            // btnRedo.setOnClickListener {
            //     store.dispatch(KduxDevToolAction.REDO)
            // }

            // btnReset.setOnClickListener {
            //     store.dispatch(KduxDevToolAction.RESET)
            // }
        }

        override fun onStart() {
            super.onStart()

            store.subscribe(this)
        }

        override fun onStop() {
            super.onStop()

            store.unsubscribe(this)
        }

        override fun enhance(state: CounterState) {
            txtNumber.text = "${state.number}"
        }
    }
    ```
    
# Kết quả
![Tada](https://images.viblo.asia/041eb0ac-44fb-485e-a52b-545fe3562dee.gif)


# Tổng kết
Redux là một tool giúp bạn có thể quản lý các trạng thái của ứng dụng. Ngoài ra nó giúp tách biệt các login function, dễ dàng cho việc kiểm thử.

Hy vọng với bài viết này, phần nào giúp các bạn hiểu được cách hoạt động của `Redux`. Chúc các bạn thành công.

# References
- [https://redux.js.org](https://redux.js.org)
- [https://github.com/htdangkhoa/kdux](https://github.com/htdangkhoa/kdux)