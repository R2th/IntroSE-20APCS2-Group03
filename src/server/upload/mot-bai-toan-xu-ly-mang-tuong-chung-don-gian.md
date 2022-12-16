Xuân sang, Quang đang lang thang trang facebook thì bắt gặp một bạn hỏi bài toán này: 

![](https://images.viblo.asia/85fcfc4a-4a66-499f-95b9-6cb04083e8c1.png)

Mặc dù có rất nhiều comment nhưng có điểm sai mà tuyệt nhiên mình không thấy có ai phát hiện ra đó là chủ thớt viết sai "chính tã" : "giúp đỡ" chứ không phải "giúp đở", "mảng" chữ không phải "mãng". Mà thôi bỏ qua vấn đề này đi, cùng tập trung vào vấn đề chính nào!

Để giải bài này chắc cũng không có gì khó mình thấy cũng khá nhiều comment giải giống nhau, mình tóm gọn lại thành các phương pháp chung như sau : (Đây là diễn đàn về Javascript nên lời giải hoàn toàn dùng javascript)

1. Gán giá trị check ban đầu là true. Lọc qua từng phần tử mảng array1, mỗi vòng lặp lọc qua mảng array2, nếu có phần tử nào ở màng 2 có giá trị bằng mảng 1 thì lập tức gán check =  false và return . Viết thì khá là dễ hiểu nhưng cách này thuật toán quá phức tạp, lọc qua 2 mảng thì performance tăng theo cấp số nhân, nghĩa là 2 mảng càng dài thì thời gian thực thi càng lâu.

```
array2.some(item => array1.some(item1 => item1 === item))
```

![](https://images.viblo.asia/c29a6384-5249-4950-afb1-effdc68658b3.png)

*Cách này thì không ai cãi được*

2.  Cách 2 có vẻ đơn giản hơn, lọc qua array2 và sau đó dùng hàm includes() để xem array1 có chứa phần tử của mảng 2 không. Performance hiệu quả hơn hẳn vì chỉ chạy vòng lặp 1 lần.
```
arr1.some((x) => arr2.includes(x));
```


Ngoài ra thì còn 1 số cách sáng tạo khác nhưng nhìn chung là sai.

Nhưng cách giải khiến mình để ý nhất vẫn là cách giải của bạn này, nhận được vô số reaction và comment tán thưởng, thậm chí nhiều người còn thừa nhận rằng đây là cách giải tốt nhất vì không cần dùng bất kì vòng lặp nào :
![](https://images.viblo.asia/4dbc7bd1-157d-4208-9777-b1631fe0e2e1.png)

*set loại bỏ phần tử trùng nhau trong mảng (Javascript), tuy nhiên các phần tử của set nằm trong ngoặc nhọn , set không phải là mảng

Đúng là cách giải sáng tạo thật nhưng mình cứ ngờ ngợ làm sao á. Cái cảm giác này thường xuất hiện khi mình làm task xong mà không dám chắc mình có làm đúng hay không (rồi đúng là có bug thật)

Và cách giải trên cũng có bug. Trường hợp 2 mảng là `[1,2,3,3]` và `[4,5]` => Trả về `true` trong khi đáp án phải là `false`.

 Chỉ cần Fix con bug trên là ngon lành cành đào. Không biết có bug nào nữa không nhỉ ? (Vẫn còn ngờ ngợ)
 
 ```
     const uniq_a = new Set(a)
     const uniq_b = new Set(b)
     uniq_a.add(uniq_b).size < uniq_a.size + uniq_b.size
 ```