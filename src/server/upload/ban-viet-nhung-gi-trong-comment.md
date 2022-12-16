Lần trước tôi có viết một bài về việc đặt tên trong code, lần này tôi sẽ nói thêm về một việc làm nhỏ nhặt khác nhưng không kém phần quan trọng khác: comment!

Khác với việc đặt hàm, biến, có comment hay không thì code của bạn vẫn chạy, vẫn bug như thường :joy:

Và cũng giống như việc đặt tên biến, hàm, bạn có viết cái gì trong comment đi chăng nữa thì code của bạn cũng không thay đổi việc nó có bug :joy:

Vậy comment có tác dụng gì? Nó giúp cho hiểu tại sao bạn lại viết đoạn code này, để sau này có debug thì cũng không phải ngồi ngẫm xem đoạn code "trời đánh" đó để làm cái gì? Thằng sucvat  viết cái thứ kinh khủng đó (bạn) để làm gì :joy:

Với kinh nghiệm ~~tham khảo~~ của mình, tôi chia code thành comment thành 2 loại

* Comment mang tính tài liệu - Documentation Comments
* Comment giải thích - Clarification comments

## Comment mang tính tài liệu - Documentation Comments

Là cái dạng như vậy này
```
/**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the number of times the key was returned by `iteratee`. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': 1, '6': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
```

Comment này được dùng với tool để tạo document cho tài liệu, có chuẩn và phải viết chính xác, hết.

## Comment giải thích - Clarification comments

Comment này thì do lập trình viên tuỳ ý viết. Vâng, nhiều khi rất tuỳ ý đấy :stuck_out_tongue_winking_eye:

Được chia thành 3 loại chính theo cấp bậc, kinh nghiệm của developer

* comment mà như không comment
* comment như comment
* không comment mà như comment

### Comment mà như không comment

Là những comment vô thưởng, vô phát, vô tác dụng, nói về những thức rõ rành rành

```java
// Tạo function chia đôi toàn bộ các phần tử của mảng đưa vào
public int[] half(int[] y){
  int[] x; // Tạo một array mới chứa kết quả
  for (int i = 0; i < y.length ; i++)  // Duyệt các phần tử của mảng y
  {
     x[i] = y[i]/2;  // Gán trá trị vào array chứa kết quả
  };
  return x; // Trả kết quả ra
}
```

hoặc đôi khi và vài dòng tâm sự, chia sẻ, những trăn trở về cuộc sống...

```
// sometimes I believe compiler ignores all my comments
```
```
long long ago; /* in a galaxy far far away */
```
```
/* where the world ends */
```

### Comment như comment

Đây là khi trình độ khi bạn sử dụng đúng tác dụng của của comment

* Những đoạn code cần phải giải thích tại sao
```
//Can run with value of 2, 4 or 8
// but 4 is best for performance
NUMBER_OF_THREADS = 4;
```
* Những đoạn code dễ bị hiểu sai
```
// Force vector to relinquish its memory 
// Must use swap(), look up "STL swap trick" for more detail
vector<float>().swap(data)
```
* Những comment mang lại cái nhìn bao quát (thường thì nó là cái Documentation Comments đã nói ở trên)
* Những đoạn code thực sự khó hiểu

Chắc là không nhiều nhưng đôi khi có nhưng đoạn code dùng để cảnh báo kiểu như này

```
// Magic. Do not touch.
```
```
// If this comment is removed the program will blow up
```
```
// I am not sure why this works but it fixes the problem.
```

Đó là khi bạn chả hiểu cái dòng thêm vào có tác dụng gì nhưng tự dưng có nó thì code lại chạy êm như dùng dầu nhớt, nghỉ lại thì có vẻ cũng chả ít đâu nhỉ :joy:

### Không comment mà như comment

Cảnh giới thượng thừa của ~~võ~~ code học chí tôn, code của bạn chỉ chứa những comment tối thiểu để ghi chú nhắc nhở như `// drunk, fix later`..., không cần đến nhưng thứ giải thích dài dòng cầu kì.

Tại sao ư? Nó ở hết trong tên biến, function rồi đó, đọc [bài về đặt tên](https://viblo.asia/p/chuyen-dat-ten-trong-lap-trinh-bJzKmzEOZ9N) của tôi để biết thêm chi tiết.

Dù nói thế thì vẫn phải có nhưng comment bắt buộc phải viết ngoài cái ghi chú kia

```
//Chỉ cần nhìn tên hàm là biết hàm làm gì
public object GetRandomObjectFromDatabase(){
  return randomObj;
}
 
public int[] HalfAllNumbersFromInput(int[] input){
   int[] output; //Nhìn tên biến là biết biến làm gì
   for (int i = 0; i < input.length ; i++)
   {
      output[i] = input[i]/2;
      //Viết để dubug, sau này phải remove
      //Đây là comment bắt buộc phải viết, để giải thích lý do ta viết code
      Console.Write("Call this");
   };
   return output;
}
```

### Đoạn này thì giới thiệu cho các đồng môn vài comment loại 1 nhưng lại lại rất có *ý nghĩa* với developer, maintainer

```
// simply copied from another code
```
```
#define TRUE FALSE
// Happy debugging suckers
```
```
// Houston, we have a problem
```
```
//This code sucks, you know it and I know it.
```
```
//The following code was written by <developer name>.
// Unless it doesn't work, then I have no idea who wrote it.
```
```
// 
// Dear maintainer:
// 
// Once you are done trying to 'optimize' this routine,
// and have realized what a terrible mistake that was,
// please increment the following counter as a warning
// to the next guy:
// 
// total_hours_wasted_here = 42
```
```
// I will give you two of my seventy-two virgins if you can fix this.
```
```
//Dear future me. Please forgive me. 
//I can't even begin to express how sorry I am.
```
```
// Its 4am and I am still working and wondering what is the meaning // of life? 
// If you are reading this let me know the meaning because this is // my break point
```
```
// If you're reading this, that means you have been put in charge //of my previous project. I am so, so sorry for you. God speed.
```
```
/*
 * You may think you know what the following code does.
 * But you dont. Trust me.
 * Fiddle with it, and youll spend many a sleepless
 * night cursing the moment you thought youd be clever
 * enough to "optimize" the code below.
 * Now close this file and go play with something else.
 */
 ```
 ```
 // 3.4  JeK  My manager promised me a lap dance if I can fix this //release
// 3.5  JeK  Still waiting for that dance from my manager
// 3.6  JeK  My manager got changed, the new manager is hairy, dont want the dance anymore
// 3.7  Jek  Got that dance, yuck!
```
```
// I am not responsible of this code.
// They made me write it, against my will.
```
```
virgin = 0;     /* you're not a virgin anymore, sweety */
```
```
/*
after hours of consulting the tome of google
i have discovered that by the will of unknown forces
without the below line, IE7 believes that 6px = 12px
*/
font-size: 0px;
```
```
// This is crap code but it's 3 a.m. and I need to get this working.
```

## Kết luận
// Hãy viết code như thể maintainer là một kẻ sát nhân hàng loạt biết địa chỉ nhà bạn!

// khuyên chân thành đó bạn hiền, cầu trên là bao gồm cả việc comment nữa đấy


***Tài liệu tham khảo***

https://nhungdongcodevui.com/2016/11/25/series-viet-code-sao-cho-chuan-bai-3-ban-ve-comment-code/

https://toidicodedao.com/2015/07/09/luan-ve-comment-code-phong-cach-kiem-hiep/

https://blog.daynhauhoc.com/comment-code-tai-sao-chung-ta-nen-comment-code-p1/