Chào các bạn, lại là mình đây :D, thông qua 2 phần trước đây [phần 1](https://viblo.asia/p/tim-hieu-mo-hinh-mvvm-trong-android-thong-qua-vi-du-phan-1-gioi-thieu-bWrZn67nZxw) và [phần 2](https://viblo.asia/p/tim-hieu-mo-hinh-mvvm-trong-android-thong-qua-vi-du-phan-2-model-924lJdGNKPM) thì chúng ta đã cùng nhau tìm hiểu lý thuyết cũng như thành phần đầu
tiên trong mô hình **MVVM** là **Model**. Trong phần tiếp theo này, chúng ta sẽ cùng tìm hiểu thành phần kế tiếp đó chính là **ViewModel** nha.

Vậy **ViewModel** trong **MVVM** là gì? Nó được xây dựng như thế nào? Chúng ta hãy cùng nhau tìm hiểu nhé !! ^.^

### ViewModel là gì?
Như chúng ta đã nói ở phần trước, ViewModel trong MVVM sẽ chứa các model và quan sát các View của chúng ta. Nó không có ràng buộc với View, điều đó có
nghĩa là bạn sẽ không tìm được bất kỳ instance nào của View trong ViewModel class cả. Nhưng nếu là vậy, nó sẽ giao tiếp cũng như cập nhập với View của
chúng ta như thế nào nhỉ?

Thật ra có rất nhiều cách để làm điều đó, bạn có thể làm nó với [eventBus](https://github.com/greenrobot/EventBus), [RxAndroid](https://github.com/ReactiveX/RxAndroid), hoặc là giống trong ví dụ của chúng ta ở bài này, là sử dụng Google's [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel.html), một thành phần kiến trúc đi kèm vời [LiveData](https://developer.android.com/topic/libraries/architecture/livedata)

### LiveData là như nào?
Bạn hãy nghĩa đơn giản thế này, LiveData là một thành phần bao ngoài một dữ liệu nào đó trong ứng dụng của bạn mà dữ liệu này rất hay bị thay đổi (ví dụ như số lượt like status của bạn trên Facebook, nó có thể được bao bọc trong LiveData vì nó rất hay thay đổi theo thời gian mà, mấy phút thôi đã lên mấy K đối với mấy bạn hotface rồi :D).

Cái lớp bao ngoài này sẽ cung cấp dữ liệu cho tất cả đối tượng nào mà lắng nghe nó, ví dụ chúng ta có 1 chú chó Husky đáng yêu và nó được bao bọc bởi LiveData và chúng ta chính là đối tượng quan sát nó. Khi chú chó Husky đáng yêu đó có bắt kỳ hành động nào (chạy, nằm, ngáo,...) thì lập tức chúng ta sẽ có thể ghi nhận lại hành động (dữ liệu cuối cùng) mà chú chó Husky của chúng ta đã làm. Mô hình LiveData cũng tương tự như vậy, khi data có sự thay đổi thì đối tượng quan sát sẽ nhận được giá trị cuối cùng cho sự thay đổi đó.

Điều tuyệt vời của LiveData đó là nằm ở vòng đời của nó, như các bạn biết mỗi activity, fragment đều có vòng đời của riêng nó, từ lúc khởi tạo, hiển thị lên cho lúc bị hủy đi, thì LiveData sẽ chỉ cập nhập đến đối tượng quan sát đang trong vòng đời hoạt động mà thôi. Như thế thật tốt phải không nào!!

### Trở lại với ViewModel của chúng ta
Nếu các bạn đã đọc qua phần trên, thì hẵn các bạn cũng đoán được là **ViewModel** của chúng ta sẽ chứa một đối tượng LiveData, cái sẽ quan sát **View** của chúng ta. Nói cách khác, nó sẽ thông báo đến View biết về các trạng thái khi nào Game end, điều đó cho phép View cập nhật lại UI của mình.

Cùng xem qua **ViewModel** của chúng ta nào:
```java
public class GameViewModel extends ViewModel {

    public ObservableArrayMap<String, Integer> cells;
    private Game game;

    public void init(String p1, String p2) {
        game = new Game(p1, p2);
        cells = new ObservableArrayMap<>();
    }

    public void onClickedAtCell(int r, int c) {
        if (game.cells[r][c] == null) {
            game.cells[r][c] = new Cell(game.currentPlayer);
            int res = 0;
            if (game.currentPlayer.value == Player.PlayerValue.VALUE_X) {
                res = R.drawable.ic_cat_smile;
            } else {
                res = R.drawable.ic_rat;
            }
            cells.put(String.valueOf(r) + String.valueOf(c), res);

            if (game.isGameEnded()) {
                resetGame();
            } else {
                game.switchPlayer();
            }
        }
    }

    public LiveData<Player> getWinner() {
        return game.winners;
    }

    public void resetGame() {
        final Handler handler = new Handler(Looper.getMainLooper());
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                game.reset();
                cells.clear();
            }
        }, 1000);
    }
}
```
Để sử dụng được ***ObservableArrayMap*** các bạn hãy thêm DataBinding vào project của mình nha.

Có 2 thứ bạn cần chú ý trong đoạn code trên là:

* onClickedAtCell(...): Hàm này, các bạn sẽ gặp nó trong phần sau khi nói về **View**, mục đích của nó là sẽ cập nhật lại giá trị cho cái cell mà chúng 
ta sẽ click vào khi chơi game.
* getWinner(): Là một đối tượng LiveData được quan sát, nó sẽ biểu thị khi nào game chúng ta kết thúc để **View** có các xử lý phù hợp

Như vậy, chúng ta đã xây dựng xong **ViewModel** trong mô hình **MVVM** rồi, ở phần sau chúng ta sẽ cùng nhau xây dựng đối tượng cuối cùng là **View** và xem cách mà tạo ra **ViewModel** sẽ giao tiếp với **View** như thế nào nhé.

Cảm ơn các bạn đã theo dõi, hẹn gặp các bạn ở phần sau nha !! ^..^