![](https://images.viblo.asia/14fa6dd3-f285-4baf-8a32-6d7761ea53d3.png)

# Đặt vấn đề
- Khi làm việc với Array, trong một số trường hợp chúng ta cần loại bỏ các phần tử trùng nhau?  Có rất nhiều cách để giải quyết bài toán trên, hôm nay tôi sẽ giới thiệu tới các bạn 3 cách đơn giản để loại bỏ các phần tử trùng nhau.

# Giải pháp
- Đây là 3 cách để loại bỏ các phần tử trùng nhau trong mảng, sử dụng **Set**, **filter**, **reduce**. Để hiểu hơn chúng ta sẽ tìm hiểu từng cách.
![](https://images.viblo.asia/f7f5fbd7-f86b-4bb5-9ecf-05a21d10a274.png)

## Using Set
- Chúng ta sẽ đi vào tìm hiểu **Set** là gì?
> *- Set là một data object mới được giới thiệu trong ES6. **Set** chỉ cho phép lưu trữ các giá trị duy nhất. Vì thế khi truyền vào một mảng, nó sẽ xóa mọi giá trị trùng lặp*

- Okay, quay lại code của chúng ta và áp dụng **Set**. Có 2 bước khi sử dụng **Set**:
    1. Đầu tiên, chúng ta tạo một **Set** mới từ mảng truyền vào. Bởi vì **Set** chỉ cho phép lưu trữ các giá trị duy nhất, nên các giá trị trùng sẽ bị xóa.
    2. Hiện tại các giá trị lặp đã bị xóa, chúng ta sẽ convert trở lại thành mảng bằng cách sử dụng toán từ **...**
![](https://images.viblo.asia/6a2bf972-2b76-4743-9a7a-5e0f4abd2b76.png)

- Chúng ta có thể sử dụng **Array.from** để convert **Set** thành **Array**:
![](https://images.viblo.asia/166d2bf8-dd37-408d-a7ec-9364328dd310.png)

## Using filter
- Cách tiếp tôi muốn giới thiệu là sử dụng **filter**. Trước tiên, ta cần hiểu về 2 method sau:
    1. **indexOf**: Method này sẽ trả về vị trí đầu tiên mà nó tìm thấy của phần tử được cung cấp từ mảng.
    2. **filter**: Method này sẽ tạo một mảng mới của các phần tử thỏa mãn điều kiện.
- Chúng ta cùng xem điều gì xảy ra khi chúng ta lặp qua mảng:
![](https://images.viblo.asia/1c0f2fb2-d3fa-4fda-a890-7c40c3862daa.png)

- Dưới đây là output từ đoạn code trên. Các phần tử lặp có index không trùng với indexOf vì thế sẽ không thỏa mãn điều kiện và không được chứa trong filter array.
![](https://images.viblo.asia/3aa3ac7b-7398-4677-bbea-45e504f89e42.png)

- Chúng ta cũng có thể filter ra các phần tử lặp bằng cách sau:
![](https://images.viblo.asia/9f707c6a-4ad6-4dcb-b0db-692a37131e7a.png)

- Output cho đoạn code trên:
![](https://images.viblo.asia/1fac61c4-0b2c-47ff-81b4-e0abcaa8c6b3.png)

## Using reduce
- Cách cuối cùng tôi muốn giới thiệu tới các bạn là sử dụng **reduce**. 
- **reduce** là một method được sử dụng để rút gọn các phần tử của mảng và kết hợp chúng thành final array dựa trên một số reducer function.
- Trong bài toán của chúng ta, **reducer function** đang kiểm tra xem final array có chứa item không. Nếu nó không chứa, lưu item vào final array. Nếu không thì, bỏ qua item đó và trả về final array.
- Việc sử dụng **reduce** có thể sẽ khó hiểu hơn một chút, vì vậy hãy xem đoạn code sau:
![](https://images.viblo.asia/4c63f70e-81e7-4306-87e3-49a6aac9efb7.png)

- Và đây là output từ console.log:
![](https://images.viblo.asia/ce11d394-b276-462f-80e8-469cf1f57648.png)

# Tổng kết
- Như vậy là tôi đã giới thiệu tới các bạn 3 cách để loại bỏ các phần tử lặp trong mảng. Và cách tôi hay sử dụng là **Set** bởi nó ngắn và dễ hiểu nhất. =))
- Cảm ơn các bạn đã đọc !
- Nguồn tham khảo: https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c