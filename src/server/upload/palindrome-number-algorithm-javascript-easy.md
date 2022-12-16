## 1.Description
Given an integer number, return true if number is palindrome integer.
**Example 1:**
```
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
```
**Example 2:**
```
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```
**Example 3:**
```
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

## 2.Solution
### My algorithm
Thuật toán mà mình thấy ổn nhất là đảo số dư lên đầu, cách đó rất nhanh. 
```javascript
var isPalindrome = function (x) {
  if (x < 0 || (x > 0 && x % 10 === 0)) {
    return false;
  }
  var reversedNum = 0;
  var xcopy = x;
  while (xcopy > 0) {
    reversedNum = reversedNum * 10 + (xcopy % 10);
    xcopy = (xcopy - (xcopy % 10)) / 10;
  }
  return x === reversedNum;
};
```
Còn đây là thuật toán hiện lên trong đầu mình khi đọc đề, mình sẽ đổi nó về string để so sánh.
```javascript
var isPalindrome = function (x) {
  var quantity = x.toString().length;
  for (var i = 0; i < Math.floor(quantity / 2); i++) {
    if ((x.toString()[i] !== x.toString()[quantity - 1 - i]) || x < 0){
      return false;
    }
  }
  return true;
};
```
### Optimal Solution
Còn đây là thuật toán mình chôm được trên mạng, cùng là một cách nhưng mình làm vấn đề rắc rối hơn :))
```javascript
var isPalindrome = function(x) {
    let text = x.toString();
    for(var i=0;i<text.length/2;i++)
    {
        if(text.charAt(i) != text.charAt(text.length-1-i))
        {
            return false;
        }
    }
    return true;
};
```