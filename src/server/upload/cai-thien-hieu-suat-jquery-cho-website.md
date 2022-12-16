Một số người nói rằng dành thời gian phát triển cho hiệu suất là không đáng vì khi nâng cấp phần cứng thường là một sự thay thế rẻ hơn. Nhưng khi chúng ta biết cách tối ưu hóa những dòng code thì sẽ tiết kiệm hơn gấp nhiều lần hơn so với việc nâng cấp mới phần cứng. 

Sau đây mình xin giới thiệu cho mọi người một số cách cải thiện hiệu suất JavaScript cho Website

# 1. Luôn sử dụng phiên bản mới nhất
![](https://images.viblo.asia/a81033fd-d721-4b06-9c63-6c30ce4c5e4b.png)

jQuery luôn phát triển và cải tiến, vì vậy hãy đảm bảo rằng bạn đang sử dụng phiên bản mới nhất để cải thiện hiệu suất của chương trình. 
# 2. Tối ưu hóa vòng lặp
Các vòng lặp như for, while, do while thường được sử dụng rất nhiều trong JavaScript. Nếu ta tối ưu hóa được hết tất cả các vòng lặp thì tốc độ tải trang sẽ được cải thiện đáng kể.

Vòng lặp dùng để lặp lại việc thực thi một đoạn mã nhiều lần, nếu trong vòng lặp có chứa những những câu lệnh phức tạp thì tốc độ thực thi sẽ chậm lại. Do đó, để tăng tốc độ thực thi thì ta nên thay thế những câu lệnh phức tạp bằng những câu lệnh đơn giản hơn.

- Ví dụ, đoạn mã có hiệu suất thấp:
```script
    for (var i = 0; i < arr.length; i++){
        arr[i] = i;
    }
```
   
 - Ví dụ, đoạn mã có hiệu suất cao:

```script
    var n = arr.length;
    for (var i = 0; i < n; i++){
        arr[i] = i;
    }
```
    
   # 3. Xử lý chuỗi
   Hãy xem qua 1 vài cách nối chuỗi đơn giản sau đây
   ```script
   var foo = "";
 foo = foo + bar;
 foo += bar;
[foo, bar].join();
foo.concat(bar);
   ```
   và so sánh kết quả
   ![](https://images.viblo.asia/a229d276-d217-4fde-be41-5a0724c0f84a.png)
   Như trên rõ ràng [].join() cho thấy kết quả trung bình tốt nhất. Nên lần sau viết code hãy lưu ý sử dụng
   ```script
       var veryLongMessage = [ 'This is a long string of segments including ' , 123, ' nam lien tiep voi nhau'].join();
   ```
   
   thay vì
   ```script
      var veryLongMessage = 'This is a long string of segments including ' + 123 + ' in succession';
   ```
   
   # 4. Hạn chế truy cập vào phần tử HTML
   Những câu lệnh truy cập vào phần tử HTML có tốc độ thực thi rất chậm. Nếu muốn truy cập vào cùng một phần tử nhiều lần thì ta nên truy cập một lần rồi sau đó lưu nó vào một biến để sử dụng lại.
- Ví dụ, đoạn mã có hiệu suất thấp:
```script
    $("#demo").html("a");
    $("#demo").html("b");
    $("#demo").html("c");
    $("#demo").html("d");
```
- Ví dụ, đoạn mã có hiệu suất cao:
```script
    var demo = $("#demo");
    demo.html("a");
    demo.html("b");
    demo.html("c");
    demo.html("d");
```

# 5. Sử dụng for hoặc while thay vì each
Chúng ta cùng xem ví dụ sau
```scrip
var array = new Array ();
for (var i=0; i<10000; i++) {
    array[i] = 0;
}
 
console.time('native');
var l = array.length;
for (var i=0;i<l; i++) {
    array[i] = i;
}
console.timeEnd('native');
 
console.time('jquery');
$.each (array, function (i) {
    array[i] = i;
});
console.timeEnd('jquery');
```
Và kết quả
![](https://images.viblo.asia/662a367f-caf5-4b83-9003-c487c3921f68.png)


Trên đây là 1 số cách viết tối ưu mã JavaScript mà mình sưu tầm được, hi vọng nó sẽ giúp ích cho các bạn sau này.

## Tài liệu tham khảo
https://moduscreate.com/blog/javascript-performance-tips-tricks/
https://code.tutsplus.com/tutorials/10-ways-to-instantly-increase-your-jquery-performance--net-5551