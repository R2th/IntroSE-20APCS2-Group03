## 1.Description
Given an array of **integers nums** and an **integer target**, return **indices** of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.
**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```
**Example 2:**
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```
**Example 3:**
```
Input: nums = [3,3], target = 6
Output: [0,1]
```
## 2.Solution
### My algorithm
Ở thuật toán này, với o(n^2) , các bạn có thể dễ dàng làm được.
```javascript
var twoSum = function (nums, target) {
  for (var i = 0; i < nums.length; i++) {
    for (var j = i + 1; j < nums.length; j++) {
      if (target - nums[i] === nums[j]) {
        return [i, j];
      }
    }
  }
};
```
### Optimal Solution
Sau thời gian lang thang trên mạng thì mình thấy thuật toán này tối ưu nhất ( trong những thuật toán mình xem ), mình mất quá nhiều thời gian để hiểu :(((  
```javascript
var twoSum = function (nums, target) {
  var a = [];
  for (var i = 0; i < nums.length; i++) {
    var n = nums[i];

    if (a[target - n] >= 0) {
      console.log(a[target - n]);
      return [a[target - n], i];
    } else {
      a[n] = i;
    }
  }
};
```