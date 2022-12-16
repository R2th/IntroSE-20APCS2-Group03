### Chào các bạn 
Là mình đây, như mình đã giới thiệu về **MVVM trong Android** ở [phần trước](https://viblo.asia/p/tim-hieu-mo-hinh-mvvm-trong-android-thong-qua-vi-du-phan-1-gioi-thieu-bWrZn67nZxw) thì trong **MVVM** có 3 thành phần là **Model - View - ViewModel**. Ở **phần 2** này chúng ta sẽ cùng nhau tìm hiểu thành phần thứ nhất là **Model** nhé. Chúng ta sẽ cùng xây dựng model của một game quen thuộc như đã nói ở phần trước là
game **Tic-Tac-Toe.**

Model trong MVVM không giống như Model trong MVP, trong MVP thì Model sẽ chịu trách nhiệm chứa các dữ liệu của đối tượng, logic sẽ do Presenter xử lý và gửi về cho View. Còn Model trong MVVM ngoài chứa thông tin của đổi tượng, nó sẽ bao gồm luôn các xử lý logic liên quan đến đối tượng đó (giống với Model trong MVC vậy đó).

### Bắt đầu nào
Model trong game Tic-Tac-Toe mà chúng ta sẽ xây dựng sẽ bao gồm 3 đối tượng chính là:
* Player
* Cell
* Game

#### Player
Player sẽ chứa 2 thuộc tính cơ bản là **Name**(lưu tên người chơi) và **Value**(lưu giá trị chơi của người đó, ở đây là X or O)

```java
public class Player {

    public String name;
    public PlayerValue value;

    public Player(String name, String value) {
        this.name = name;
        if (value.equalsIgnoreCase("x")) {
            this.value = PlayerValue.VALUE_X;
        } else if (value.equalsIgnoreCase("o")) {
            this.value = PlayerValue.VALUE_O;
        } else {
            this.value = PlayerValue.VALUE_EMPTY;
        }
    }

    public Player(String name, PlayerValue value) {
        this.name = name;
        this.value = value;
    }

    public Player(String name, int value) {
        this.name = name;
        if (value == 0) {
            this.value = PlayerValue.VALUE_X;
        } else if (value == 1) {
            this.value = PlayerValue.VALUE_O;
        } else {
            this.value = PlayerValue.VALUE_EMPTY;
        }
    }

    public enum PlayerValue {
        VALUE_EMPTY("VALUE_EMPTY"),
        VALUE_X("VALUE_X"),
        VALUE_O("VALUE_O");

        private String value = "";

        PlayerValue(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            String s = super.toString();
            if (s.equals("VALUE_X")) {
                return "X";
            }
            return "O";
        }

    }
}
```
#### Cell
Mỗi Cell trong game chỉ chứa 1 đối tượng duy nhất chính là cell của **Player** nào. Nên ở đây chúng ta chỉ cần:
```java
public class Cell {

    public Player player;

    public Cell(Player player) {
        this.player = player;
    }

    public Cell(String name, String value) {
        this.player = new Player(name, value);
    }

    public boolean isEmpty() {
        return player == null || player.value == Player.PlayerValue.VALUE_EMPTY;
    }
}
```
#### Game
Lớp này sẽ đại diện cho trò chơi Tic-Tac-Toe ngoài thực tế, tức sẽ có 2 người chơi trong 1 board 3x3 (9 cell). Trong mỗi
lượt người chơi sẽ đánh vào ô của mình (phải là ô empty), ở đây mình gọi là currentPlayer và cuối cùng là người chiến thắng.

Người chiến thắng **winner** mình sẽ sử dụng MultableLiveData để lưu lại, thông báo cho view biết ai sẽ người chiến thắng. Nếu bạn
chưa biết về MultableLiveData thì đừng cảm thấy khó khăn, nó khá đơn giản và thông qua đây bạn có thể hiểu cơ bản cách nó làm việc thôi. ^.^

```java
public class Game {

    private static final String TAG = Game.class.getSimpleName();

    private static final int BOARD_SIZE = 3;

    public Player player1;
    public Player player2;

    public Player currentPlayer;

    public Cell[][] cells;

    public MutableLiveData<Player> winners = new MutableLiveData<>();

    public Game(String playerOneName, String playerTwoName) {
        cells = new Cell[BOARD_SIZE][BOARD_SIZE];
        player1 = new Player(playerOneName, "x");
        player2 = new Player(playerTwoName, "o");
        currentPlayer = player1;
    }

    public void switchPlayer() {
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }
}
```
Ở đối tượng ***Game*** này chúng ta cần biết khi nào game kết thúc, đó là lý do chúng ta cần kiểm tra dòng và cột
trên board sau khi 1 player đã đánh vào ô trống trên Board. Game sẽ là kết thúc khi có 3 cell giống hệt nhau theo chiều dọc, chiều
ngang hoặc theo đường chéo, hoặc là board của game đã full không còn di chuyển được nữa (Lúc này ko ai là người chiến thắng cả)

```java
public boolean isGameEnded() {
    if (hasThreeSameOnHorizontalCells() || hasThreeSameOnVerticalCells()
            || hasThreeSameOnDiagonalCells()) {
        winners.setValue(currentPlayer);
        return true;
    }

    if (isBoardFull()) {
        winners.setValue(null);
        return true;
    }

    return false;
}

public boolean hasThreeSameOnHorizontalCells() {
    Player.PlayerValue value = currentPlayer.value;

    return areEquals(value, cells[0][0], cells[1][0], cells[2][0])
            || areEquals(value, cells[0][1], cells[1][1], cells[2][1])
            || areEquals(value, cells[0][2], cells[1][2], cells[2][2]);
}

public boolean hasThreeSameOnVerticalCells() {
    Player.PlayerValue value = currentPlayer.value;

    return areEquals(value, cells[0][0], cells[0][1], cells[0][2])
            || areEquals(value, cells[1][0], cells[1][1], cells[1][2])
            || areEquals(value, cells[2][0], cells[2][1], cells[2][2]);
}

public boolean hasThreeSameOnDiagonalCells() {
    Player.PlayerValue value = currentPlayer.value;

    return areEquals(value, cells[0][0], cells[1][1], cells[2][2])
            || areEquals(value, cells[0][2], cells[1][1], cells[2][0]);
}

public boolean isBoardFull() {
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            if (cells[i][j] == null || cells[i][j].isEmpty()) {
                return false;
            }
        }
    }
    return true;
}

public boolean areEquals(Player.PlayerValue value, Cell... cells) {
    for (Cell cell : cells) {
        if (cell == null || cell.isEmpty() || cell.player != currentPlayer || cell.player.value != value) {
            return false;
        }
    }
    return true;
}
```

Cuối cùng thì sau khi game kết thúc, ta cần bắt đầu lại một game mới để người chơi có thể tiếp tục chơi phải không nào:
```java
public void reset() {
    currentPlayer = player1;
    cells = new Cell[BOARD_SIZE][BOARD_SIZE];
}
```

### Tổng kết

Như các bạn có thể thấy, **Model** trong MVVM sẽ không chỉ là đại diện cho dữ liệu, mà còn chứa trạng thái và các xử lý
logic của đối tượng đó nữa. Nó mô tả các yếu tố nền tảng trong ứng dụng của chúng ta, kiểm tra khi nào game còn có thể tiếp tục hay
đã có thể kết thúc hay chưa và biết cần lầm gì khi game kết thúc luôn. Tất cả logic đã được viết tại **Model**, bây giờ chúng ta cần phải
có một thành phần để dàn dựng lên trò chơi của chúng ta. Nó chính là **ViewModel**, chúng ta sẽ cùng xây dựng nó trong **phần 3** của loạt bài
viết này nha.

***Điểm hay ho***: Sự thật trong trong mô hình **MVVM** thì **Model** là lớp có thể test rất dễ dàng. Nó không cần sự tương tác từ UI, điều đó có nghĩa là
chỉ cần Junit test là chúng ta có thể test tính đúng đắn của tất cả các xử lý logic ở đây rồi.

Cảm ơn các bạn đã theo dõi nha, hẹn gặp lại các bạn trong phần sau của bài viết, chúng ta sẽ cùng tìm hiểu về **ViewModel** trong **MVVM**.