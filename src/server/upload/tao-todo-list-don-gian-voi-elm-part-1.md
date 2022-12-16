Mọi ứng dụng web được viết bằng elm luôn xoay quanh model - update - view. Do đó đầu tiên chúng ta cần xác định model. Trong todo list của chúng ta cần lưu4 thông tin : todos, in progress và finished và input từ người dùng nhập vào.
Tiến hành khởi tạo model nào.
```
type alias Model = {
    finishInput: String,
    inprogressInput: String,
    todoInput: String,
    todo: List String,
    finish: List String,
    inprogress: List String
}
model: Model
model = {
    todo = [],
    finish = [],
    inprogress = [],
    todoInput = "",
    finishInput = "",
    inprogressInput = ""}
```
Sau đó, để thay đổi các giá trị trong model, chúng ta cần khởi tạo các action .Các action bao gồm :nhập input todo, nhập input in progress, nhập input finished, tạo thẻ todo, tạo thẻ in progress, tạo thẻ finished.
```
type Msg = ADDTODO | ADDFINISH | ADDINPROGRESS | TODO String| FINISH String| INPROGRESS String
```
Có action rồi nhưng chúng ta cần phải hướng dẫn cho elm hiểu là action này sẽ làm cái gì. Do đó chúng ta cần khai báo update
Hàm update sẽ nhận Msg và Model đã khai báo ở trên để thay đổi dữ liệu trong Model
```
update: Msg -> Model -> Model
update msg model = 
    case msg of 
        TODO item -> { model | todoInput = item}
        FINISH item -> {model | finishInput = item}
        INPROGRESS item -> {model | inprogressInput = item}
        ADDTODO -> { model | todo = model.todo ++ [model.todoInput] , todoInput = "" }
        ADDFINISH -> { model | finish = model.finish ++ [model.finishInput], finishInput = ""}
        ADDINPROGRESS -> { model | inprogress = model.inprogress ++ [model.inprogressInput], inprogressInput = ""}
```
Đã xong cơ bản phần logic. Tiếp đến phần view, ở đây chúng ta sẽ có 3 input tương ứng vs todo, in progress và finished.Ngoài ra bên dưới sẽ có các list dữ liệu tương ứng. Chúng ta sẽ sử dụng thư viện Html  của elm để tạo view
```
view : Model -> Html Msg
view model = 
    div [class "container"] [
        div [class "item"]
        [ input [placeholder "Todo", onInput TODO] []
        , button [onClick ADDTODO] [text "add todo"]
        , div [] (renderTodos model.todo)
        ],
        div [class "item"]
        [ input [placeholder "Inprogress", onInput INPROGRESS] []
        , button [onClick ADDINPROGRESS] [text "add inprogress"]
        , div [] (renderTodos model.inprogress)
        ],
        div [class "item"]
        [ input [placeholder "finish", onInput FINISH] []
        , button [onClick ADDFINISH] [text "add finish"]
        , div [] (renderTodos model.finish)
        ]
    ]
    

renderTodo modelTodo = 
    let 
        children = 
        [
            li [] [text modelTodo]
        ]
    in 
        ul [] children

renderTodos todo = List.map renderTodo todo
```
Vậy là xong bước đầu để tạo todolist với elm. Phần tiếp theo chúng ta sẽ thêm tính năng chuyển loại thẻ ví dụ như chuyển thẻ từ todo sang in progress.
[Link Project](https://github.com/le1tuan/learn-elm)