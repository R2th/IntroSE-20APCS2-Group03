Chuyện là khi mình nghịch Ruby contest ở trang [codingame](https://www.codingame.com/playgrounds/46635/tic-tac-toe-game-implementation), mình tìm thấy 1 bài toán khá thú vị, đó là tạo game TicTacToe (cờ caro 3x3) bằng code Ruby.

Link bài học :
https://www.codingame.com/playgrounds/46635/tic-tac-toe-game-implementation

Ở trong link bên trên đã có sẵn phần description và sourecode của bài toán này. Phần sourecode khá ngắn, chỉ có 116 dòng . Và bạn có thể test sourecode khá đơn giản với trình thông dịch Ruby(irb) trong `terminal` của bạn (điều kiện là máy tính của bạn đã cài Ruby) .

Game cờ caro 3x3( `TicTacToe` ) mà bạn có thể tưởng tượng ra là như thế này:
![](https://images.viblo.asia/507965d5-faf3-4857-aeac-49b44c6799dd.gif)

Còn đây là sản phẩm mô phỏng của `sourecode` bên trên :
![](https://images.viblo.asia/cf13bc03-0f7c-4c3e-ad5b-39104e0c9077.gif)

Ở series bài viết gồm nhiều part này, mình sẽ làm những điều sau:
* Giải thích sourecode bên trên: bao gồm flow của game và ý nghĩa của 17 `method` trong `class TicTacToe` **(part 1)**
* Cách để từ `sourecode` nói trên tạo ra game cờ caro nxn (n > 3) . **(part 1)**
* Từ sourecode nói trên, tạo ra game cờ caro 3x3 trên nền tảng web . (thay vì chạy trong terminal nhìn tù lắm :) ) . **(part 2)**

Okay, giờ thì bắt đầu thoai. 

## 1. Game TicTacToe chơi như thế nào?
Để chơi game, đầu tiên chúng ta cần một bảng 3x3 ô trống như thế này, tạm gọi là `board` .
```
irb(main):118:0> TicTacToe.new.display_board
   |   |   
-----------
   |   |   
-----------
   |   |   
```
Sẽ chỉ có 2 players, mỗi player tương ứng với 1 `token` để điền vào `board` là `X` hoặc `O` . Ở đây ta quy ước như sau:
* Player 1 tương ứng với `X`
* Player 2 tương ứng với `O`
2 players sẽ chơi theo lượt , `player 1` sẽ chơi lượt lẻ, `player 2` chơi lượt chẵn :
* Lượt 1 : `player 1` sẽ điền X vào 1 ô trong `board`
* Lượt 2 : `player 2` sẽ điền O vào 1 ô **còn trống** trong `board`
* Lượt 3 : `player 1` sẽ điền X vào 1 ô **còn trống** trong `board`
.......
* Lượt 9 : `player 1` sẽ điền X vào 1 ô **còn trống** trong `board`

Khi 9 ô trong `board` được điền đầy `token` thì game kết thúc ở 1 trong 3 trạng thái :
* Player 1 thắng. 
```
 X | X | X   
-----------
 O |   |    
-----------
   | O | O   
 => Congratulations X!
```

* Player 2 thắng
```
 X |   | X   
-----------
   | X |    
-----------
 O | O | O  
=> Congratulations O!
```
* Hòa.
```
 X | O | X   
-----------
 O | X | O   
-----------
 O | X | O  
=> Cat's game
```

##  2.  Giải thích sourecode của trang codingame.
Dưới đây là 116 dòng sourecode của class TicTacToe trên trang `codingame` nói trên:
```ruby
class TicTacToe
  attr_reader :board
  WIN_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  def initialize(board = nil, options = {})
    @options = {rows: 3, cols: 3, chr_empty: ' ', chr_separ_v: '|', chr_separ_h: '-', players: {'Player 1': 'X', 'Player 2': 'O'}}
    @options = @options.merge(options)
    @board = board || Array.new(self.cells_count, @options[:chr_empty])
  end

  def cells_count
    @options[:rows]*@options[:cols]
  end

  def get_cell_from_row_col(row, col)
    # puts "row: #{row}, col: #{col}, cell: #{((row-1)*@options[:cols])+col-1}"
    @board[((row-1)*@options[:cols])+col-1]
  end

  def display_board
    @options[:rows].times.with_index(1) do |r, row_index|
      str_row = ''
      @options[:cols].times.with_index(1) do |c, col_index|
        str_row += @options[:chr_empty]+get_cell_from_row_col(row_index, col_index)+@options[:chr_empty]
        str_row += @options[:chr_separ_v] if col_index < @options[:cols]
      end
      puts str_row
      puts @options[:chr_separ_h]*((@options[:cols]*3)+@options[:cols]-1) if row_index < @options[:rows]
    end
  end

  def input_to_index(str_input)
    str_input.to_i-1
  end

  def move(index, player_token)
    @board[index] = player_token
  end

  def position_taken?(index)
    !@board[index].strip.empty?
  end

  def valid_move?(index)
    index.between?(0, cells_count-1) && !position_taken?(index)
  end

  def turn
    puts "Enter position (1-9):"
    index = input_to_index(gets.strip)
    if valid_move?(index)
      move(index, current_player)
      display_board
    else
      turn
    end
  end

  def turn_count
    counter = 0
    @board.each {|cell| counter += 1 unless cell.strip.empty?}
    counter
  end

  def current_player
    turn_count % 2 == 0 ? 'X' : 'O'
  end

  def won?
    ret = nil
    WIN_COMBINATIONS.each do |wc|
      if wc.all? { |index| position_taken?(index) && @board[index] == @board[wc[0]]}
        ret = wc
        break
      end
    end
    ret
  end

  def full?
    turn_count == cells_count
  end

  def draw?
    full? && !won?
  end

  def over?
    won? || full?
  end

  def winner
    won = won?
    won ? @board[won[0]] : nil
  end

  def play
    until over? do
      turn
    end
    if won?
      puts "Congratulations #{winner}!"
    else
      puts "Cat's Game!"
    end
  end
end
```

Bây giờ, mình sẽ đi vào giải thích 17 `methods` bên trên theo `flow` của game .

### 2.1 Tạo màn chơi mới.

Để tạo một màn chơi mới, ta cần khởi tạo một đối tượng của `class TicTacToe` bằng `method TicTacToe#new`  ( `alias` của nó là `method TicTacToe#initialize` )
```ruby
  def initialize
    @options = {rows: 3, cols: 3, chr_empty: ' ', chr_separ_v: '|', chr_separ_h: '-', players: {'Player 1': 'X', 'Player 2': 'O'}}
    @board = Array.new(self.cells_count, @options[:chr_empty])
  end
  
  def cells_count
    @options[:rows]*@options[:cols]
  end
```
```
irb(main):119:0> game = TicTacToe.new
=> #<TicTacToe:0x000056549b554790 @options={:rows=>3, :cols=>3, :chr_empty=>" ", :chr_separ_v=>"|", :chr_separ_h=>"-", :players=>{:"Player 1"=>"X", :"Player 2"=>"O"}}, @board=[" ", " ", " ", " ", " ", " ", " ", " ", " "]>
```
Ta lưu màn chơi mới này bằng biến `game` với 2 giá trị quan trọng là được lưu vào các instance variable: `@options` và `@board` . Mình sẽ giải thích về 2 giá trị này.

`@options` là một `hash` lưu các giá trị liên quan đến settings của trò chơi. 
* `@options[:rows]` và `@options[:cols]` lưu số hàng và số cột của `board` . (ở đây mặc định là 3x3) .
* `@options[:chr_empty]`,  `@options[:chr_separ_v]`, `@options[:chr_h]` lưu các ký tự để vẽ lên board trong terminal như sau:
```
   |   |   
-----------
   |   |   
-----------
   |   |   
```
* `@options[:players]` = `{'Player 1': 'X', 'Player 2': 'O'}` là 1 hash lưu lại token của Player 1 và Player 2, phục vụ cho mục đích truy xuất xem cuối cùng ai là người thắng cuộc.

Về giá trị `@board`, nó là một mảng lưu lại tất cả giá trị 'X', 'O' đã được điền trong suốt màn chơi. Cụ thể, các giá trị của `@board` thể hiện trên màn hình như sau:
```
 @board[0] | @board[1] | @board[2]  
----------------------------------
 @board[3] | @board[4] | @board[5]  
----------------------------------
 @board[6] | @board[7] | @board[8]  
```
Như vậy, quá trình chơi game tương ứng với quá trị gán giá trị cho các phần từ từ `@board[0] -> @board[8]` .
Khi khởi tạo một đối tượng, mặc định 1 board sẽ được tạo ra 

### 2.2 Hiển thị board

Như vậy là ta đã tạo xong một màn chơi mới, giờ ta sẽ thử hiển thị board của màn chơi mới bằng `method TicTacToe#display_board` :
```ruby
  def get_cell_from_row_col(row, col)
    @board[((row-1)*@options[:cols])+col-1]
  end

  def display_board
    @options[:rows].times.with_index(1) do |r, row_index|
      str_row = ''
      @options[:cols].times.with_index(1) do |c, col_index|
        str_row += @options[:chr_empty]+get_cell_from_row_col(row_index, col_index)+@options[:chr_empty]
        str_row += @options[:chr_separ_v] if col_index < @options[:cols]
      end
      puts str_row
      puts @options[:chr_separ_h]*((@options[:cols]*3)+@options[:cols]-1) if row_index < @options[:rows]
    end
  end
```
Hình ảnh board của màn chơi mới khởi tạo:
```
irb(main):119:0> TicTacToe.new.display_board
   |   |   
-----------
   |   |   
-----------
   |   |   
=> 3
```
Mình sẽ giải thích về `method TicTacToe#display_board` . Trước hết, ta thấy việc hiển thị `board` trên màn hình giống như việc in ra ma trận từ một mảng 2 chiều. Tuy nhiên ở đây, mình lưu `board` dưới dạng mảng 1 chiều `@board`, nên mình cần có thêm 1 method sau:
```ruby
  def get_cell_from_row_col(row, col)
    @board[((row-1)*@options[:cols])+col-1]
  end
```
`method TicTacToe#get_cell_from_row_col(row,col)` sẽ trả về giá trị 'X' hoặc 'O' tương ứng trong `board` , khi biết chỉ số hàng và cột. Cụ thể:
```
 row = 1, col = 1 | row = 1, col = 2 | row = 1, col = 3  
--------------------------------------------------------
 row = 2, col = 1] |row = 2, col = 2 | row = 2, col = 3  
--------------------------------------------------------
 row = 3, col = 1 | row = 3, col = 2 | row = 3, col = 3
```
```
 @board[0] | @board[1] | @board[2]  
----------------------------------
 @board[3] | @board[4] | @board[5]  
----------------------------------
 @board[6] | @board[7] | @board[8]  
```
Ví dụ, 
* với row = 1, col = 1 , `method TicTacToe#get_cell_from_row_col(row,col)` trả về giá trị `@board[0]`
* với row = 2, col = 3 , `method TicTacToe#get_cell_from_row_col(row,col)` trả về giá trị `@board[5]`

Trở lại với `method TicTacToe#display_board`, mình sẽ giải thích nó bằng comment trong code:
```ruby
 def display_board
 #Chạy vòng lặp column lồng trong vòng lặp row.
    @options[:rows].times.with_index(1) do |r, row_index|
    # Biến str_row thể hiện giá trị in ra của hàng hiện tại
      str_row = ''
      @options[:cols].times.with_index(1) do |c, col_index|
      
      #Thêm từng cell cell: ' X ' hoặc ' O ' 
        str_row += @options[:chr_empty]+get_cell_from_row_col(row_index, col_index)+@options[:chr_empty]
      
      #Thêm ký ký tự '|' nếu chỉ số cột không phải là cột cuối cùng
        str_row += @options[:chr_separ_v] if col_index < @options[:cols]
      end
      
      # In ra từng hàng
      puts str_row
      # Thêm chuỗi ký tự '-----------------------' nếu chỉ số hàng không phải là hàng cuối cùng
      puts @options[:chr_separ_h]*((@options[:cols]*3)+@options[:cols]-1) if row_index < @options[:rows]
    end
  end
```

### 2.3  Chơi game thôi . 
Sau khi khởi tạo màn chơi, chúng ta sẽ bắt đầu chơi bằng `method` `TicTacToe#play` :
![](https://images.viblo.asia/d61c31ac-ae67-484d-8bd8-6e8a4da4df76.gif)
Về method play:
```ruby
 def play
 #Cho đến khi game đấu kết thúc (game.over? => true) thì các player vẫn được chơi theo lượt (game.turn). 
    until over? do
      turn
    end
  
  # Nếu game đấu kết thúc với 1 chiến thắng(game.won? == true) thì hiển thị người chiến thắng.
    if won?
      puts "Congratulations #{winner}!"
    else
    
    #Nếu không, thì thông báo game đấu này hòa .
      puts "Cat's Game!"
    end
  end
```
Để hiểu `method` `TicTacToe#play`, chúng ta phải hiểu được các `method` `over?` , `turn`,  `won?`, `winner`.

### 2.3.1 Method over?
Với `method over` :

```ruby
  def over?
    won? || full?
  end
  
  def full?
    turn_count == cells_count
  end
  
  def turn_count
    counter = 0
    @board.each {|cell| counter += 1 unless cell.strip.empty?}
    counter
  end
```
`method over?` dùng để kiểm tra xem màn chơi đã kết thúc chưa. Màn chơi kết thúc chỉ trong 2 trường hợp:
*  ***TH1: Có 1 người chơi thắng trước khi `board` bị đầy.*** 

Trường hợp này sẽ được kiểm tra bằng `method TicTacToe#won?` dưới đây, và mình sẽ giải thích về cách mà nó hoạt động.
```ruby
WIN_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
 
  def won?
    ret = nil
    WIN_COMBINATIONS.each do |wc|
      if wc.all? { |index| position_taken?(index) && @board[index] == @board[wc[0]]}
        ret = wc
        break
      end
    end
    ret
  end
  
  def position_taken?(index)
    !@board[index].strip.empty?
  end
```
Người chơi `X` được xác nhận là dành chiến thắng khi và chỉ khi có 3 `token` `X`  được điền vào `board` ở tổ hợp các vị trí sau:
```
 X | X | X         |   |           |   |        X |   |   
-----------     -----------     -----------    -----------
   |   |         X | X | X         |   |        X |   |    
-----------     -----------     -----------    -----------
   |   |           |   |         X | X | X      X |   |   
       
############################################################

   | X |            |   | X       X |   |         |   | X 
 -----------     -----------     -----------   -----------
   | X |            |   | X         | X |         | X |   
 -----------     -----------     -----------   -----------
   | X |            |   | X         |   | X     X |   |   
```
Điều tương tự xảy ra với người chơi `O` .

Xét các tổ hợp vị trí nói trên, ta suy ra được **8 trường hợp** tương ứng với việc một trong 2 người chơi dành chiến thắng:
```
# Các giá trị của mảng @board tương ứng với vị trí trên màn hình hiển thị:

 @board[0] | @board[1] | @board[2]  
----------------------------------
 @board[3] | @board[4] | @board[5]  
----------------------------------
 @board[6] | @board[7] | @board[8]  

# Một người chơi dành chiến thắng khi và chỉ khi:

@board[n1] = @board[n2] = @board[n3] =  'X' (hoặc 'O')
Với [n1,n2,n3] = [0,1,2] hoặc [3,4,5] hoặc [6,7,8] hoặc [0,3,6] 
            hoặc [1,4,7] hoặc [2,5,8] hoặc [0,4,8] hoặc [2,4,6]
```
**8 trường hợp** dành chiến thắng này được lưu bởi hằng số `WIN_COMBINATIONS` . Sau khi hiểu được hằng số này, việc hiểu `method TicTacToe#won?` trở lên dễ dàng hơn:
```ruby
  def won?
    ret = nil
    WIN_COMBINATIONS.each do |wc|
    
    #Kiểm tra các vị trí mà người chơi 'X' hoặc 'O' có khớp với các vị trí thắng cuộc hay không
      if wc.all? { |index| position_taken?(index) && @board[index] == @board[wc[0]]}
      
        #Nếu trùng, thì lưu lại trường hợp thắng cuộc trong biến ret và thoát vòng lặp
        ret = wc
        break
      end
    end
    ret
  end
  
  #Method position_taken? để kiểm tra xem vị trí của @board[index] đã được điền token chưa?
  def position_taken?(index)
    !@board[index].strip.empty?
  end
```

* ***TH2: Board bị đầy . Tức là `@board` đã đủ 9 phần tử có giá trị 'X' hoặc 'O' .***

Trường hợp này được kiểm tra bằng `method TicTacToe#full?` khá dễ hiểu:
```ruby
 # Board bị đầy khi màn chơi chuyển đến lượt số 9.
  def full?
    turn_count == cells_count
  end
  
  # Method turn_count trả về lượt chơi hiện tại của game. Nó bằng với số phần tử trong board đã được điền token.
  def turn_count
    counter = 0
    @board.each {|cell| counter += 1 unless cell.strip.empty?}
    counter
  end
  
  # Method cells_count trả về số ô của bảng hiển thị. Ở đây là 3x3=9
  def cells_count
    @options[:rows]*@options[:cols]
  end
```

### 2.3.2 Method turn
`Method TicTacToe#turn` được dùng để nhập token ở mỗi lượt chơi của 2 player như sau:
```ruby
 def turn
 #Yêu cầu người chơi nhập vị trí để điền token vào bảng hiển thị. Vị trí này bằng chỉ số phần tử trong mảng @board cộng thêm 1.
    puts "Enter position (1-9):"
    index = input_to_index(gets.strip)
 
 #Nếu số nhập vào thuộc đoạn từ 1-9 thì chạy method move và hiển thị bảng sau khi đã điền token.
    if valid_move?(index)
      move(index, current_player)
      display_board
    else
    
  #Nếu không thì tiếp tục lượt chơi mới.  
      turn
    end
  end
  
  #Method input_to_index chuyển vị trí nhập vào từ bàn phím thành chỉ số phần tử trong mảng @board
  def input_to_index(str_input)
    str_input.to_i-1
  end
  
  #Method valid_move? kiểm tra số nhập vào từ bàn phím có thuộc đoạn từ 1-9 không.
  def valid_move?(index)
    index.between?(0, cells_count-1) && !position_taken?(index)
  end
  
  #Method move, gán phần tử @board bằng giá trị token 'X' hoặc 'O'.
  def move(index, player_token)
    @board[index] = player_token
  end
  
  #Method current_player xác định token của người chơi hiện tại là 'X' hay 'O'. Lượt chơi lẻ thì sẽ là 'X', lượt chơi chẵn thì sẽ là 'O'
  def current_player
    turn_count % 2 == 0 ? 'X' : 'O'
  end
```

Như vậy là mình đã giải thích xong cách mà các method trong `sourecode` hoạt động.
Giờ chúng ta cùng thử tìm cách sửa lại `sourecode` này 1 chút để tạo ra các game cờ caro 4x4 hoặc 5x5 .

## 3. Thử tạo ra game cờ caro nxn (n>3)
Để tạo ra game cờ caro nxn (n>3) khá đơn giản, chúng ta chỉ cần sửa lại `@options` và hằng số `WIN_COMBINATIONS` một chút. 

Mình sẽ thử với trường hợp 4x4 .
Đầu tiên, với biến `@options` trong `method initialize`, chúng ta sẽ sửa số `rows` và `cols` thành 4.
```ruby
  def initialize(board = nil, options = {})
    @options = {rows: 4, cols: 4, chr_empty: ' ', chr_separ_v: '|', chr_separ_h: '-', players: {'Player 1': 'X', 'Player 2': 'O'}}
    @board = Array.new(self.cells_count, @options[:chr_empty])
  end
```
Tiếp theo, chúng ta sửa `WIN_COMBINATIONS` như sau:
```ruby
WIN_COMBINATIONS = [
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    [0,5,10,15],
    [3,6,9,12]
  ]
```
Toàn bộ phần `sourecode` còn lại của game 3x3 sẽ được giữ nguyên và ta có `sourecode` mới cho game cờ caro 4x4 như sau:
```ruby
class TicTacToe
  attr_reader :board
  WIN_COMBINATIONS = [
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    [0,5,10,15],
    [3,6,9,12]
  ]

  def initialize(board = nil, options = {})
    @options = {rows: 4, cols: 4, chr_empty: ' ', chr_separ_v: '|', chr_separ_h: '-', players: {'Player 1': 'X', 'Player 2': 'O'}}
    @board = Array.new(self.cells_count, @options[:chr_empty])
  end

  def cells_count
    @options[:rows]*@options[:cols]
  end

  def get_cell_from_row_col(row, col)
    # puts "row: #{row}, col: #{col}, cell: #{((row-1)*@options[:cols])+col-1}"
    @board[((row-1)*@options[:cols])+col-1]
  end

  def display_board
    @options[:rows].times.with_index(1) do |r, row_index|
      str_row = ''
      @options[:cols].times.with_index(1) do |c, col_index|
        str_row += @options[:chr_empty]+get_cell_from_row_col(row_index, col_index)+@options[:chr_empty]
        str_row += @options[:chr_separ_v] if col_index < @options[:cols]
      end
      puts str_row
      puts @options[:chr_separ_h]*((@options[:cols]*3)+@options[:cols]-1) if row_index < @options[:rows]
    end
  end

  def input_to_index(str_input)
    str_input.to_i-1
  end

  def move(index, player_token)
    @board[index] = player_token
  end

  def position_taken?(index)
    !@board[index].strip.empty?
  end

  def valid_move?(index)
    index.between?(0, cells_count-1) && !position_taken?(index)
  end

  def turn
    puts "Enter position (1-9):"
    index = input_to_index(gets.strip)
    if valid_move?(index)
      move(index, current_player)
      display_board
    else
      turn
    end
  end

  def turn_count
    counter = 0
    @board.each {|cell| counter += 1 unless cell.strip.empty?}
    counter
  end

  def current_player
    turn_count % 2 == 0 ? 'X' : 'O'
  end

  def won?
    ret = nil
    WIN_COMBINATIONS.each do |wc|
      if wc.all? { |index| position_taken?(index) && @board[index] == @board[wc[0]]}
        ret = wc
        break
      end
    end
    ret
  end

  def full?
    turn_count == cells_count
  end

  def draw?
    full? && !won?
  end

  def over?
    won? || full?
  end

  def winner
    won = won?
    won ? @board[won[0]] : nil
  end

  def play
    until over? do
      turn
    end
    if won?
      puts "Congratulations #{winner}!"
    else
      puts "Cat's Game!"
    end
  end
end
```

Mình sẽ thử chơi với `sourecode` mới nhé:
![](https://images.viblo.asia/da64df2f-80e6-4450-9689-1feafae63442.gif)

Như vậy mấu chốt để tạo ra game cờ caro `nxn` là hằng số `WIN_COMBINATIONS` . Chúng ta có thể nhận thấy 1 quy luật khá rõ ràng:
```
* Với n = 3, WIN_COMBINATIONS có 8 phần tử
* Với n = 4, WIN_COMBINATIONS có 10 phần tử
* Với n = 5, WIN_COMBINATIONS có 12 phần tử
=> WIN_COMBINATIONS sẽ có (n*2 + 2) phần tử.
```
Với n < 8, các bạn hoàn toàn có thể dùng `bút và giấy nháp` để thiết lập `WIN_COMBINATIONS` . Tuy nhiên với n = 20 chẳng hạn, ngồi tìm ra 42 phần tử của `WIN_COMBINATIONS` đúng là mắc mợt . 
Cách tốt nhất là chúng ta nên viết một method để sinh ra `WIN_COMBINATIONS` với tham số là n. Tuy nhiên, bài viết đến đây là đủ dài rồi, mình sẽ chia sẻ thuật toán để viết method này vào part 2 của bài viết. 

## 4. Tạm biệt
Chốt lại, ở các phần sau của bài viết, mình sẽ giải quyết các vấn đề sau:
* Thuật toán tạo `WIN_COMBINATIONS` với tham số n cho trước.
* Mông má thêm 1 chút HTML, CSS, JS + Rails để tạo một webgame TicTacToe

Còn bây giờ thì tạm biệt.



-----
References:


https://www.codingame.com/playgrounds/46635/tic-tac-toe-game-implementation