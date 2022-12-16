Thuật toán so khớp chuỗi Knuth–Morris–Pratt (hay thuật toán KMP) tìm kiếm sự xuất hiện của một "từ" W trong một "xâu văn bản" S bằng cách tiếp tục quá trình tìm kiếm khi không phù hợp, chính từ cho ta đầy đủ thông tin để xác định vị trí bắt đầu của ký tự so sánh tiếp theo, do đó bỏ qua quá trình kiểm tra lại các ký tự đã so sánh trước đó.

Thuật toán được Donald Knuth, Vaughan Pratt và J. H. Morris nghiên cứu độc lập năm 1977, nhưng họ công bố nó cùng nhau.

# Minh họa:

Để minh họa chi tiết thuật toán, chúng ta sẽ tìm hiểu từng quá trình thực hiện của thuật toán. Ở mỗi thời điểm, thuật toán luôn được xác định bằng hai biến kiểu nguyên, m và i, được định nghĩa lần lượt là vị trí tương ứng trên S bắt đầu cho một phép so sánh với W, và chỉ số trên W xác định ký tự đang được so sánh. Khi bắt đầu, thuật toán được xác định như sau:
```
m:         0
S:      ABC ABCDAB ABCDABCDABDE
W:      ABCDABD
i:      0
```

Chúng ta tiến hành so sánh các ký tự của W tương ứng với các ký tự của S, di chuyển lần lượt sang các chữ cái tiếp theo nếu chúng giống nhau. S[0] và W[0] đều là ‘A’. Ta tăng i:
```
m:         0
S:      ABC ABCDAB ABCDABCDABDE
W:      ABCDABD
i:      _1  
```
S[1] và W[1] đều là ‘B’. Ta tiếp tục tăng i:
```
m:         0
S:      ABC ABCDAB ABCDABCDABDE
W:      ABCDABD
i:      __2 
```
S[2] và W[2] đều là ‘C’. Ta tăng i lên 3:
```
m:         0
S:      ABC ABCDAB ABCDABCDABDE
W:      ABCDABD
i:      ___3  
```
Nhưng, trong bước thứ tư, ta thấy S[3] là một khoảng trống trong khi W[3] = 'D', không phù hợp. Thay vì tiếp tục so sánh lại ở vị trí S[1], ta nhận thấy rằng không có ký tự 'A' xuất hiện trong khoảng từ vị trí 0 đến vị trí 3 trên xâu S ngoài trừ vị trí 0; do đó, nhờ vào quá trình so sánh các ký tự trước đó, chúng ta thấy rằng không có khả năng tìm thấy xâu dù có so sánh lại. Vì vậy, chúng ta di chuyển đến ký tự tiếp theo, gán m = 4 và i = 0.
```
m: ____4
S:      ABC ABCDAB ABCDABCDABDE
W:          ABCDABD
i:          0 
```
Tiếp tục quá trình so sánh như trên, ta xác định được xâu chung "ABCDAB", với W[6] (S[10]), ta lại thấy không phù hợp. Nhưng từ kết quả của quá trình so sánh trước, ta đã duyệt qua "AB", có khả năng sẽ là khởi đầu cho một đoạn xâu khớp, vì vậy ta bắt đầu so sanh từ vị trí này. Như chúng ta đã thấy các ký tự này đã trùng khớp với nhau ký tự trong phép so khớp trước, chúng ta không cần kiểm tra lại chúng một lần nữa; ta bắt đầu với m = 8, i = 2 và tiếp tục quá trình so khớp.
```
m: ________8
S:      ABC ABCDAB ABCDABCDABDE
W:              ABCDABD
i:              __2
```
Quá trình so khớp ngay lập tức thất bại, nhưng trong W không xuất hiện ký tự ‘ ‘,vì vậy, ta tăng m lên 11, và gán i = 0.
```
m:         ___________11
S:      ABC ABCDAB ABCDABCDABDE
W:                 ABCDABD
i:                 0
```
Một lần nữa, hai xâu trùng khớp đoạn ký tự "ABCDAB" nhưng ở ký tự tiếp theo, 'C', không trùng với 'D' trong W. Giống như trước, ta gán m = 15, và gán i = 2, và tiếp tục so sánh.
```
m:         _______________15
S:      ABC ABCDAB ABCDABCDABDE
W:                     ABCDABD
i:                     __2
```
Lần này, chúng ta đã tìm được khớp tương ứng với vị trí bắt đầu là S[15].

# Thuật toán và mã giả của thuật toán tìm kiếm

Bây giờ, chúng ta tìm hiểu về sự tồn tại của bảng "so khớp một phần"(partial match) T, được mô tả bên dưới, giúp ta xác định được vị trí tiếp theo để so khớp khi phép so khớp trước đã thất bại. Mảng T được tổ chức để nếu chúng ta có một phép so khớp bắt đầu từ S[m] thất bại khi so sánh S[m + i] với W[i], thì vị trí của phép so khớp tiếp theo có chỉ số là m + i - T[i] trong S (T[i] là đại lượng xác định số ô cần lùi khi có một phép so khớp thất bại). Mặc dù phép so khớp tiếp theo sẽ bắt đầu ở chỉ số m + i - T[i], giống như ví dụ ở trên, chúng ta không cần so sánh các ký tự T[i] sau nó, vì vậy chúng ta chỉ cần tiếp tục so sánh từ ký tự W[T[i]]. Ta có T[0] = -1, cho thấy rằng nếu W[0] không khớp, ta không phải lùi lại mà tiếp tục phép so sánh mới ở ký tự tiếp theo. Sau đây là đoạn mã giả mẫu của thuật toán tìm kiếm KMP.
```
algorithm kmp_search:
    input:
        mảng ký tự, S (đoạn văn bản)
        mảng ký tự, W (xâu đang tìm)
    output:
        một biến kiểu nguyên (vị trí (bắt đầu từ 0) trên S mà W được tìm thấy)

    define variables:
        biến nguyên, m ← 0 
        biến nguyên, i ← 0 
        mảng nguyên, T 

    while m + i nhỏ hơn độ dài của sâu S, do:
        if W[i] = S[m + i],
            let i ← i + 1
            if i bằng độ dài W,
                return m
        otherwise,
            if T[i] > -1,
                let i ← T[i], m ← m + i - T[i]
            else
                let i ← 0, m ← m + 1
            
    return độ dài của đoạn văn bản S
```

# Độ phức tạp của thuật toán tìm kiếm

Với sự xuất hiện của mảng T, phần tìm kiếm của thuật toán Knuth–Morris–Pratt có độ phức tạp O(k), trong đó k là độ dài của xâu S. Ngoại trừ các thủ tục nhập xuất hàm ban đầu, tất cả các phép toán đều được thực hiện trong vòng lặp while, chúng ta sẽ tính số câu lệnh được thực hiện trong vòng lặp; để làm được việc này ta cần phải tìm hiểu về bản chất của mảng T. Theo định nghĩa, mảng được tạo để: nếu một phép so khớp bắt đầu ở vị trí S[m] thất bại khi so sánh S[m + i] với W[i], thì phép so khớp có thể thành công tiếp theo sẽ bắt đầu ở vị trí S[m + (i - T[i])]. Cụ thể hơn, phép so khớp tiếp theo sẽ bắt đầu tại vị trí có chỉ số cao hơn m, vì vậy T[i] < i.

Từ điều này, chúng ta thấy rằng vòng lặp có thể thực hiện 2k lần. Với mỗi lần lặp, nó thực hiện một trong hai nhánh của vòng lặp. Nhánh thứ nhất tăng i và không thay đổi m, vì vậy chỉ số m + i của ký tự đang so sánh trên S tăng lên. Nhánh thứ hai cộng thêm i - T[i] vào m, và như chúng ta đã biết, đây luôn là số dương. Vì vậy, vị trí m, vị trí bắt đầu của một phép so khớp tiềm năng tăng lên. Vòng lặp dừng nếu m + i = k; vì vậy mỗi nhánh của vòng lặp có thể được sử dụng trong tối đa k lần, do chúng lần lượt tăng giá trị của m + i hoặc m, và m ≤ m + i: nếu m = k, thì m + i ≥ k, vì vậy: do các phép toán chủ yếu tăng theo đơn vị, chúng ta đã có m + i = k vào một thời điểm nào đó trước, và vì vậy thuật toán dừng.

Do đó vòng lặp chủ yếu thực hiện 2k lần, độ phức tạp tính toán của thuật toán tìm kiếm chỉ là O(k).

# Mã giả của thuật toán tạo bảng
```
algorithm kmp_table:
    input:
        mảng ký tự, W 
        mảng số nguyên, T 
    output:
        mảng T

    define variables:
        biến kiểu nguyên, pos ← 2 
        biến kiểu nguyên, cnd ← 0  
    let T[0] ← -1, T[1] ← 0 
    while pos nhỏ hơn độ dài của W, ‘’’do’’’:
        (trường hợp một: tiếp tục dãy con)
        if W[pos - 1] = W[cnd], 
          let T[pos] ← cnd + 1, pos ← pos + 1, cnd ← cnd + 1

        (trường hợp hai: không thỏa mãn, nhưng ta có thể quay ngược trở lại)
        otherwise, if cnd > 0, let cnd ← T[cnd]

        (trường hợp ba: hết phần tử. Chú ý rằng cnd = 0)
        otherwise, let T[pos] ← 0, pos ← pos + 1
```

# Độ phức tạp của thuật toán tạo bảng
Độ phức tạp của thuật toán tạo bảng là O(n), với n là độ dài của W. Ngoại trừ một số sắp xếp ban đầu, toàn bộ công việc được thực hiện trong vòng lặp while, độ phức tạp của toàn bộ vòng lặp là O(n), với việc cùng lúc xử lý giá trị của pos và pos - cnd. Trong trường hợp thứ nhất, pos - cnd không thay đổi, khi cả pos và cnd cùng tăng lên một đơn vị. Ở trường hợp hai, cnd được thay thế bởi T[cnd], như chúng ta đã biết ở trên, luôn luôn nhỏ hơn cnd, do đó tăng giá trị của pos - cnd. Trong trường hợp thứ ba, pos tăng và cnd thì không, nên cả giá trị của pos và pos - cnd đều tăng. Mà pos ≥ pos - cnd, điều này có nghĩa là ở mỗi bước hoặc pos hoặc chặn dưới pos đều tăng; mà thuật toán kết thúc khi pos = n, nên nó phải kết thúc tối đa sau 2n vòng lặp, do pos - cnd bắt đầu với giá trị 1. Vì vậy độ phức tạp của thuật toán xây dựng bảng là O(n).

# Độ phức tạp của thuật toán KMP
```
Độ phức tạp của thuật toán là O(n)
```
# Code trên Ruby
```
# My code use Knuth-Morris-Pratt algorithm

class Test
  def initialize string, pattern
    @string = string
    @pattern = pattern
    @string_length = string.length
    @pattern_length = pattern.length
  end

  def pattern_match
  	results = []
    string_counter, pattern_counter, potential_match_index = 0, 0, 0
    # While we didn't reach the end of the string
    while string_length - potential_match_index > kmp_table_length - 1 do
      # While the we didn't reach the end of the pattern and theres a match
      while pattern_counter < kmp_table_length - 1  && string[string_counter ] == pattern[pattern_counter] do
        # increment up both
        string_counter += 1
        pattern_counter += 1
      end
      # Got a complete match?
      if pattern_counter >= kmp_table_length - 1
        # Put that thing in th@results!
      results << potential_match_index
      end
       # If this is the beginning of a potential match?
      if kmp_table[pattern_counter - 1] != nil && kmp_table[pattern_counter - 1] > 0
        # reset the potential_match_index to the string_counter minus the number of chars we've matched in the prefix
        potential_match_index = string_counter - kmp_table[pattern_counter -1]
        # or, if the string counter equals the potential match index
      else
        string_counter += 1 if string_counter == potential_match_index
        # set potential_match_index to the string_counter
        potential_match_index = string_counter
      end
      # If we're not on the first letter in pattern, in which case we won't get to skip ahead..

      # reset pattern counter by what it returns in the prefix table
      pattern_counter = kmp_table[pattern_counter -1] if pattern_counter > 0
    end
    results
  end

  private 
  attr_reader :string, :pattern, :string_length, :pattern_length

  # kmp_table is array which store value kmp table of Knuth-Morris-Pratt algorithm
  def kmp_table
  	return @kmp_table if @kmp_table
    # Creates an array to hold our table.
    # The array is initialized with 0 as its first element because it cannot be a prefix of itself.
    prefix_table = [0]
    # Match_count tells us how many matches we have found that match the beginning of our string (the prefix).
    match_count = 0
    # lets increment, shall we?
    (1...pattern_length).each do |pattern_counter|
      # If we found matches previously but the current one is not a match..
      if (match_count > 0 && (pattern[match_count] != pattern[pattern_counter]))
        # set current match to:
        match_count = prefix_table[match_count -1] || 0
      end
      # If we found a new match, increment up our match_count
      match_count += 1 if pattern[match_count] == pattern[pattern_counter]

      # Puts the match_count in the prefix table
      prefix_table[pattern_counter] = match_count
    end
    @kmp_table = prefix_table
  end

  def kmp_table_length
    @kmp_table_length ||= kmp_table.length
  end	
end

Test.new("cozacocacolacococacolacocacoladjejdeicocacola", "cocacola").pattern_match
# tests
puts "My name is Khuong"
puts '*' * 40

# match
test_str = "cozacocacolacococacolacocacoladjejdeicocacola"
test_pattern = "cocacola"
should_be = [4, 14, 22, 37]
test = Test.new test_str, test_pattern

p test.pattern_match
raise "This is wrong" unless test.pattern_match == should_be

# no match

test_str2     = "How do you do? Great thanks!"
test_pattern2 = "potato"
should_be2    = []
test2         = Test.new test_str2, test_pattern2

p test2.pattern_match
raise "This is wrong" unless test2.pattern_match == should_be2
```