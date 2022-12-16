Đây là một số bài toán đơn giản trên `codefight`, đáp án là tự mình viết nên có thể code vẫn còn cùi chưa đc ngon ăn như của các anh senior (mình hiện là beginner ruby thôi), rất mong nhận được sự chỉ giáo của mọi người, nhất là bài 6 ạ, mình rất mong nhận đc sự góp ý cải thiện.
## Bài 1: Phone Call Tính số phút gọi được

```
def phoneCall(min1, min2_10, min11, s)
end

```

trong đó:
`min1` là giá tiền của phút đầu tiên
`min2_10` là giá tiền của từ phút thứ 2 đến phút thứ 10
`min11` là giá tiền sau phút thứ 10
`s` là số tiền bạn có
yêu cầu `output` số phút mà gọi được

testcase:

1: 
min1: 3 
min2_10: 1 
min11: 2 
s: 20 
output correct: 14

2: 
min1: 2 
min2_10: 2 
min11: 1 
s: 2 
output correct: 1

3: 
min1: 10 
min2_10: 1 
min11: 2 
s: 22 
output correct: 11 

4: 
min1: 2 
min2_10: 2 
min11: 1 
s: 24 
output correct: 14

5: 
min1: 1 
min2_10: 2 
min11: 1 
s: 6 
output correct: 3

6: 
min1: 3 
min2_10: 4 
min11: 5 
s: 2 
output correct: 0


đáp án:

```

def phoneCall(min1, min2_10, min11, s)
    return 0 if s < min1
    return 1 if s == min1
    return 1 + (s - min1) / min2_10 if s <= min1 + min2_10 * 9
    10 + (s - min1 - min2_10 * 9) / min11
end

```


## Bài 2: Knapsack Light tìm item mà bạn có thể mang được.

```

def knapsackLight(value1, weight1, value2, weight2, maxW)
end

```

`value` là giá trị của item
`weight` là trọng lượng của item
`maxW` trọng lượng tối đa mà bạn mang được

yêu cầu đặt ra: 
- trọng lượng không được vượt quá `maxW`
- nếu 2 item cùng trọng lượng thì lấy thằng có value to hơn
- nếu 2 item cùng value thì lấy 2 thằng nhẹ hơn
- không nhấc nếu weight đều lớn maxw

testcase:

1: 
value1: 10 
weight1: 5 
value2: 6 
weight2: 4 
maxW: 8 
output: 10

2: 
value1: 10 
weight1: 5 
value2: 6 
weight2: 4 
maxW: 9 
output: 16

3: 
value1: 5 
weight1: 3 
value2: 7 
weight2: 4 
maxW: 6 
output: 7 

4: 
value1: 10 
weight1: 2 
value2: 11 
weight2: 3 
maxW: 1 
output: 0

5: 
value1: 15 
weight1: 2 
value2: 20 
weight2: 3 
maxW: 2 
output: 15

đáp án:

```
def knapsackLight(value1, weight1, value2, weight2, maxW)
    if weight1 + weight2 <= maxW
        value1 + value2
    elsif weight1 > maxW && weight2 > maxW
        0
    elsif weight1 <= maxW && (value1 > value2 || value1 == value2 && weight1 <= weight2 || value1 < value2 && weight2 > maxW)
        value1
    else
        value2
    end
end

```


## Bài 3: Extra Number Tìm số khác biệt trong 3 số

```
def extraNumber(a, b, c)
end

```

trong 3 số có 2 số giống nhau trả về số khác biệt

đáp án:

```
def extraNumber(a, b, c)
    a == b ? c : (b == c ? a : b)
end
```


## Bài 4: Is Infinite Process? nó có phải vòng lặp vô hạn không ?

```
def isInfiniteProcess(a, b)

end
```

nếu a khác b thì a sẽ tăng 1 và b giảm 1

đáp án

```
def isInfiniteProcess(a, b)
    a > b || (a - b)%2 != 0
end

```


## Bài 5: Arithmetic Expression thực thi phép toán

```

def arithmeticExpression(a, b, c)

end
```

có phép toán `a#b=c` thay thế `#` bằng + - * /, nếu 1 trong số chúng thành phép toán đúng thì true còn không thì false

đáp án

```

def arithmeticExpression(a, b, c)
    ["+", "-", "*"].each{|operation| return true if eval("a #{operation} b == c")}
    return true if eval("a / b == c && a % b == 0")
    false
end

```

# Bài 6: rule90(medium) (Weekly challenge on codefight)
**REVERSE CHALLENGE chỉ cho sẵn input output và method, testcase, yêu cầu tự tìm ra mô tả bài toán và giải quyết.**

https://app.codesignal.com/challenge/2Aj9SuWGcP7cTGddu

thời gian giới hạn: 4s(ruby)
input: string `seed` (3 <= seed.length <= 50), seed[i] ∈ {"0", "1"} (dãy nhị phân 01010101)
input: integer `iterations` (0 <= iterations <= 100)
output: array.string 
```
def rule90(seed, iterations)

end 
``` 

testcase: 

1: Input:  
{seed: "000010000" iterations: 5}   
Output:  
["000010000",  
"000101000",  
"001000100",  
"010101010",  
"100000001",  
"110000011"] 

2: Input:  
{seed: "01010110" iterations: 7}   
Output:  
["01010110",  
"10000111",  
"11001100",  
"11111111",  
"00000000",  
"00000000",  
"00000000",  
"00000000"] 

3: Input:  
{seed: "" interations: } 
Output:  
["0001",  
"1010",  
"0000"] 

4: 
Input:   
{seed: "11101101" iterations: 4}   
Output:   
["11101101",  
"00101101",  
"11001100",  
"11111111",  
"00000000"] 

5: 
Input:   
{seed: "001000000000" iterations: 13}   
Output:  
["001000000000",  
"010100000000",  
"100010000000",  
"010101000001",  
"000000100010",  
"000001010101",  
"100010000000",  
"010101000001",  
"000000100010",  
"000001010101",  
"100010000000",  
"010101000001",  
"000000100010",  
"000001010101"] 


Bài này khá khoai vì không cho biết sẵn yêu cầu đề vào. Cùng nghĩ 1 chút trước khi xem đáp án nếu bạn là người ưa thử thách nhé :-s

Thực ra thì đáp án nằm ở ngay tên đề bài rồi `rule90` 

Trong các thuật toán theo `cellular automata`. Rule90 là một `cellular automaton based` dựa trên `exclusive` hoặc `function`. nó là một mảng một chiều bao gồm dãy số nhị phân `0` và `1`.

Lúc đầu mình đã thử cộng trừ nhân chia đủ kiểu để tìm ra cái quy luật của dám output bên trên mà cuối cùng là bó chiếu =)) 

rút cục quy luật của nó là:



| current pattern | 111 | 110 | 101 | 100 | 011 | 010 | 001 | 000 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| new state for center cell     | 0     | 1     | 0 | 1 | 1 | 0 | 1 | 0 | 



đáp án:

```

def rule90(s, i)  
 [s]+ (i).times.map do |c|
  a=s[-1]+s+s[0]
  s=s.length.times.map{|z|(a[z].to_i+a[z+2].to_i)%2}.join("")
 end
end

```