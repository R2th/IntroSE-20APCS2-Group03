**1. replaceAll**

- syntax `"<string>".replaceAll(<pattern>);`
- Phương thức này trả về một chuỗi string mới đã được thay thế theo pattern.
- Example: 

    ````
      const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';
      
      console.log(p.replaceAll('dog', 'monkey'));
      
      // Output:  "The quick brown fox jumps over the lazy monkey. If the monkey reacted, was it really lazy?"
    ````
 - `<pattern>` là một string hoặc cũng có thể là một regex
    ````
      const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';
      
      const regex = /Dog/ig;
      
      console.log(p.replaceAll(regex, 'ferret'));
      
      // expected output: "The quick brown fox jumps over the lazy ferret. If the ferret reacted, was it really lazy?"
    ````
    
**2. Promise.any**

- `Promise` any nhận vào 1 mảng `Promise Object`, và nó sẽ `reslove`  sau khi có 1 `Promise Object` trong mảng `resolve`
- Example: 
    ````
        const promise1 = Promise.reject(0);
        const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
        const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

        const promises = [promise1, promise2, promise3];

        Promise.any(promises).then((value) => console.log(value));

        // Output: "quick"
    ````
    
**3. Logical Assignment Operator**

- Logical Assignment Operator sẽ combine(cho phép kết hợp) giữa toán tử logic và biểu thức gán.
- Example: 
    ````
        a ||= b
        // equals to
        a = a || (a = b)

        a &&= b
        // equals to
        a = a && (a = b)

        a ??= b
        // equals to
        a = a ?? (a = b)
    ````

**4. Underscores as Numeric Separator**
- Example:
    ````
        const billion = 1_000_000_000;
        console.log(billion); // 1000000000

        1_000_000_000 === 1000000000; // true
    ````
    
 **Refer**
 [Javascript-es2021-you-need-to-see-these-es12-features](https://www.pullrequest.com/blog/javascript-es2021-you-need-to-see-these-es12-features/)