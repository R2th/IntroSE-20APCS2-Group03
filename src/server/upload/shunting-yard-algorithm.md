Khi học năm thứ 3 đại học mình có tiếp xúc với lập trình android và personal project đầu tiên của mình về android là làm một ứng dụng máy tính để tính toán cộng, trừ, nhân, chia với 2 toán hạng
```
1 + 1
```
và mới đây có một người hỏi mình về việc làm một ứng dụng android giả lập một chiếc máy tính có thể tính toán với một biểu thức phức tạp:
```
10,5 * ( 9 + 3 )  - (12,456 - 8,45) / 12,4
```
Vấn đề sẽ chẳng có gì để nói thêm nếu chúng ta được sử dụng thử viện ngoài để giải quyết bài toán này, tuy nhiên bài toán này yêu cầu bắt buộc phải thực hiện tách các toán tử, toán hạng và thực thi theo thứ tự biểu thức toán học (Thực hiện biểu thức trong ngoặc  > nhân, chia > cộng, trừ)
Mình có thử một vài cách như dùng binary tree hay Shunting-yard algorithm và mình nhận thấy việc dùng Shunting-yard algorithm dễ cài đặt hơn :D ,  vậy nên trong giới hạn bài viết này mình sẽ giới thiệu về việc sử dụng Shunting-yard algorithm để làm ứng dụng giả lập máy tính.

### Shunting-yard algorithm
Shunting-yard algorithm là một giải thuật cho phép phân tích một chuỗi là một biểu thức toán học thành các Reverse Polish notation (RPN) hoặc  abstract syntax tree (AST) để từ đó chúng ta có thể thực hiện tính toán được giá trị của biểu thức theo đúng thứ tự ưu tiên của các toán tử trong một biểu thức toán học. 

Giải thuật Shunting-yard algorithm được mô phỏng như sau:

```
while there are tokens to be read:
    read a token.
    if the token is a number, then:
        push it to the output queue.
    if the token is a function then:
        push it onto the operator stack 
    if the token is an operator, then:
        while ((there is a function at the top of the operator stack)
               or (there is an operator at the top of the operator stack with greater precedence)
               or (the operator at the top of the operator stack has equal precedence and is left associative))
              and (the operator at the top of the operator stack is not a left bracket):
            pop operators from the operator stack onto the output queue.
        push it onto the operator stack.
    if the token is a left bracket (i.e. "("), then:
        push it onto the operator stack.
    if the token is a right bracket (i.e. ")"), then:
        while the operator at the top of the operator stack is not a left bracket:
            pop the operator from the operator stack onto the output queue.
        pop the left bracket from the stack.
        /* if the stack runs out without finding a left bracket, then there are mismatched parentheses. */
if there are no more tokens to read:
    while there are still operator tokens on the stack:
        /* if the operator token on the top of the stack is a bracket, then there are mismatched parentheses. */
        pop the operator from the operator stack onto the output queue.
exit.
```

![](https://images.viblo.asia/f8ff0a52-62de-4e83-95b3-0f547a859c82.png)

Ví dụ với biểu thức `1 + 2` thuật tóan sẽ hoạt động như sau:
1. Dữ liệu đầu vào `1+2`
2. Thêm `1` vào output queue
3. Thêm `+` vào operator stack
4. Thêm `2` vào output queue
5. Sau khi đã đọc hết biểu thức chúng ta pop toàn bộ phần tử trong operator stack và thêm vào output queue -> pop `+` từ operator stack và thêm vào output queue. 
6. => output: `1 2 +`

Implement giải thuật Shunting-yard algorithm

```
private fun infixToRpn(tokens: List<String>): List<String> {

        val output = arrayListOf<String>()
        val stackOperator = Stack<Operator>()
        tokens.forEach {
            when {

                isNumeric(it) -> output.add(it)

                isOperator(it) -> {
                    val operator = Operator.fromToken(it)
                    var topOperator = if (stackOperator.isNotEmpty()) stackOperator.peek() else null

                    when (operator) {

                        Operator.PARENTHESES_CLOSE -> {
                            while (topOperator != null && topOperator != Operator.PARENTHESES_OPEN) {
                                output.add(topOperator.token)
                                stackOperator.pop()
                                topOperator = if (stackOperator.isNotEmpty()) stackOperator.peek() else null
                            }

                            if (stackOperator.isNotEmpty()) {
                                stackOperator.pop()
                            }
                        }

                        Operator.PARENTHESES_OPEN -> stackOperator.push(operator)

                        else -> {
                            while (topOperator != null && topOperator.precedence() > operator.precedence()) {
                                output.add(topOperator.token)
                                stackOperator.pop()
                                topOperator = if (stackOperator.isNotEmpty()) stackOperator.peek() else null
                            }

                            stackOperator.push(operator)
                        }
                    }
                }

                else -> throw IllegalArgumentException("Expression is not valid")
            }
        }

        while (stackOperator.isNotEmpty()) {
            output.add(stackOperator.pop().token)
        }

        return output
    }
```

sau khi đã có được chuổi RPN thì việc tính toán kết quả sẽ hết sức đơn giản 

```
private fun rpnToDouble(tokens: List<String>): Double {
        try {
            val stack = Stack<String>()

            tokens.forEach {
                if (isNumeric(it)) {
                    stack.push(it)
                } else {

                    val d2 = stack.pop().toBigDecimal()
                    val d1 = stack.pop().toBigDecimal()

                    val result = when (Operator.fromToken(it)) {

                        Operator.SUM -> d1.plus(d2)

                        Operator.SUB -> d1.minus(d2)

                        Operator.TIMES -> d1.times(d2)

                        Operator.DIVIDE -> d1.divide(d2, MathContext.DECIMAL128)

                        else -> throw NumberFormatException()
                    }

                    stack.push(result.toString())
                }
            }

            return stack.pop().toDouble()

        } catch (e: NumberFormatException) {
            throw IllegalArgumentException("Expression is not valid")
        } catch (e: EmptyStackException) {
            throw IllegalArgumentException("Expression is not valid")
        }
    }
```

Link source code: https://github.com/Nghicv/CalculatorApp