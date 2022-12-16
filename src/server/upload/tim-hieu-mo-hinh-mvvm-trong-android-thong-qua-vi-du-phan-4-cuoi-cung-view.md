Sau 3 phần trước đây
* [PHẦN 1](https://viblo.asia/p/tim-hieu-mo-hinh-mvvm-trong-android-thong-qua-vi-du-phan-1-gioi-thieu-bWrZn67nZxw) - Giới thiệu về MVVM trong Android
* [PHẦN 2](https://viblo.asia/p/tim-hieu-mo-hinh-mvvm-trong-android-thong-qua-vi-du-phan-2-model-924lJdGNKPM) - Tìm hiểu Model
* [PHẦN 3](https://viblo.asia/p/tim-hieu-mo-hinh-mvvm-trong-android-thong-qua-vi-du-phan-3-viewmodel-Do754qOVKM6) - Tìm hiểu ViewModel

Thì hôm nay, chúng ta sẽ đi đến phần cuối cùng trong loạt bài Tìm hiểu về MVVM trong Android thông qua ví dụ này, đó chính là tìm hiểu component còn lại cuối cùng trong mô hình - **View**.

Nếu bạn vẫn chưa đọc các phần trước thì hãy tham khảo những link ở phía trên, nó sẽ giúp bạn dễ dàng hiểu được những phần liên quan trong bài biết hôm nay.

### Cùng bắt đầu nào - View trong MVVM là gì?

View trong MVVM đơn giản là một thể hiện của Giao diện người dùng, chứa các thành phần hiển thị đến người dùng và không chứa bắt kỳ logic nào trong việc xử lý. Nó được móc xích với ViewModel và sẽ được cập nhật thông qua ViewModel.

Như đã giới thiệu ở [phần 1](https://viblo.asia/p/tim-hieu-mo-hinh-mvvm-trong-android-thong-qua-vi-du-phan-1-gioi-thieu-bWrZn67nZxw) thì trong bài này, chúng ta sẽ áp dụng Data Binding vào việc xây dựng View của chúng ta.

Bắt đầu sẽ là ***activity_game.xml***:
```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <data>
        <variable
            name="gameViewModel"
            type="android.leo.tic_tac_toemvvm.viewmodel.game.GameViewModel" />
    </data>

    <GridLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="32dp"
        android:rowCount="3"
        android:columnCount="3">

        <ImageView
            android:id="@+id/cell_00"
            style="@style/Base.TextAppearance.AppCompat.Button"
            android:onClick="@{() -> gameViewModel.onClickedAtCell(0, 0)}"
            app:imageResource='@{gameViewModel.cells["00"]}'
            android:layout_column="0"
            android:layout_columnWeight="1"
            android:layout_row="0"
            android:layout_rowWeight="1"
            android:background="@drawable/cell_background" />

        ...
    </GridLayout>

</layout>

```
Có 2 thứ bạn cần chú ý trong file xml phía trên:
* Bạn chỉ thấy 1 ImageView đại diện cho 1 cell trên bàn chơi, thực ra thì các cell còn lại cũng tương tự như vậy và bạn có thể copy ra dễ dàng. Chỉ cần chú ý chỗ cái **id** và **app:imageResource** là được (giá trị **00** trong **@{gameViewModel.cells["00"]}** và **gameViewModel.onClickedAtCell(0, 0)** chính là vị trí **row column** của bạn trong bàn chơi, hãy thay thế nó bởi các giá trị tương ứng). Mỗi khi một cell được click, mỗi giá trị hiển thị của nó sẽ được tạo ra tại **ViewModel**
* Giá trị của biến name **gameViewModel** là một loại của **GameViewModel**, nó sẽ được sử dụng ở **Activity** để gọi các xử lý ở ViewModel

Phần phía trên là dành cho layout, chúng ta hãy cũng đi qua xem Activity của nó nhé.

### Acitivty sẽ xây dựng ra sao?
Như đã nói ở [phần 3](https://viblo.asia/p/tim-hieu-mo-hinh-mvvm-trong-android-thong-qua-vi-du-phan-3-viewmodel-Do754qOVKM6), View sẽ nhận thông báo khi nào kết thúc game thông qua **LiveData**, cái được cung cấp bởi **ViewModel** của chúng ta đã xây dựng.
Dưới đây là các việc mà View sẽ phải làm:
* Tạo ra 2 người chơi bằng cách truyền tên họ đến ViewModel
* Đăng ký và móc đến ViewModel
* Phản ứng các thông báo từ ViewModel

Đây chính là code **GameActivity** của chúng ta:
```java
public class GameActivity extends AppCompatActivity {

    private static final String NO_WINNER = "No One";

    private GameViewModel gameViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initDataBinding();
    }

    public void initDataBinding() {
        ActivityGameBinding activityGameBinding =
                DataBindingUtil.setContentView(this, R.layout.activity_game);
        gameViewModel = ViewModelProviders.of(this).get(GameViewModel.class);
        gameViewModel.init("P1", "P2");
        activityGameBinding.setGameViewModel(gameViewModel);
        setUpOnGameEndListener();
    }

    public void setUpOnGameEndListener() {
        gameViewModel.getWinner().observe(this, new Observer<Player>() {
            @Override
            public void onChanged(@Nullable Player player) {
                onGameWinnerChange(player);
            }
        });
    }

    @VisibleForTesting
    public void onGameWinnerChange(Player winner) {
        String winnerName = (winner != null &&
                (winner.name != null && !winner.name.isEmpty())) ? winner.name : NO_WINNER;
        Toast.makeText(this, "Winner is " + winnerName, Toast.LENGTH_SHORT).show();
    }
}
```
Một vài thứ bạn cần quan tâm trong đoạn code trên:
* gameViewModel.getWinner().observe(...): Hàm này sẽ quan sát về người chơi chiến thắng thông qua LiveData ở ViewModel. Khi kết thúc game, giá trị của winner sẽ thay đổi, từ đó sẽ dẫn đến hàm **onGameWinnerChange(player)**
* ActivityGameBinding: Lớp này được tự động tạo ra thông qua file xml layout **activity_game**. Nó giữ tất cả các thuộc tính ở xml file, trường hợp này chúng ta có biến **gameViewModel** như đã nói ở trên.
* setGameViewModel: Hàm này sẽ gán gameViewModel của chúng ta đến **gameViewModel trên layout đã tạo**

### Lời kết
Cảm ơn và chúc mừng bạn nếu bạn đã theo đến bài viết này (một chặn đường khá xa), hi vọng với những phần mình đã chia sẻ sẽ giúp các bạn hiểu hơn về mô hình **MVVM** kết hợp với **Data Binding** trong Android.

Nếu có gì chưa rõ, hãy tham khảo demo của mình ở link github này: [Demo on github](https://github.com/dinhlamvn/tictactoe_mvvm).

Chào tạm biệt và hẹn gặp lại trong các bài viết sau nhé! ^.^