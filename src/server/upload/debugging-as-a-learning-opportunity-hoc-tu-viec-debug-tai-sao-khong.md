Chắc hẳn anh em developers, dù ngôn ngữ lập trình nào đi nữa, thì cũng đã quá quen thuộc với việc **debug**. :| Debug chính là quá trình tìm kiếm, tìm hiểu nguyên nhân, và sửa chữa những lỗi logic khiến chương trình bị dừng hoặc chạy ra kết quả không đúng như kỳ vọng. Chương trình càng phức tạp, lỗi tiềm ẩn trong chương trình càng nhiều và khó đoán. Trớ trêu thay, những lỗi đó lại từ việc lập trình của chính chúng ta mà ra. :)

> **If debugging is the process of removing software bugs, then programming must be the process of putting them in.**
> 
> *Edsger Dijkstra*
> 
### **Vậy tại sao debug lại là một cơ hội tốt để học hỏi?**

- Thứ nhất, việc debug giúp cho mình **hiểu rõ hơn về các trường hợp biên và các trường hợp đặc biệt**, nhờ đó mình có thể thiết kế chương trình xử lí được các trường hợp biệt lập này một cách toàn diện hơn, nhằm tránh các kết quả ngoài ý muốn. Thói quen xấu của mình khi mới bắt đầu code là chỉ cố gắng cho function đó chạy được rồi tính sau (nhưng "sau" không biết bao lâu). Ví dụ, hàm tính diện tích hình chữ nhật dưới đây có thể chạy bình thường ở đa số các trường hợp:

```
def calculate_the_rectangle_area(width, length): 
    return width * length 
```

Tuy nhiên, sẽ như thế nào nếu chiều dài hoặc chiều rộng truyền vào là số âm hay là string? Vì độ dài phải là một số dương, chúng ta phải đặt vài biểu thức validation để đảm bảo tính đúng đắn của function trên:

```python
def calculate_the_rectangle_area(width: float, 
                                 height: float) -> None:
    """
    Calculate the rectangle's area by the 
    following formula: S = width * length.
    :param width:
    :param height:
    :return:
    """
    try:
        width = float(width)
        height = float(height)
        assert width > 0, \
            f"The width of the rectangle must be greater than 0. " \
            f"Got width={width}."
        assert height > 0, \
            f"The height of the rectangle must be greater than 0. " \
            f"Got height={height}."
    except (ValueError, AssertionError) as e:
        print(e)
    except Exception as e:
        print(f"Got an exception: {e}")
    else:
        print(f"The rectangle's area is: {width * height}")
```

- Thứ hai, chúng ta sẽ **có cơ hội học những tính năng hay ho về ngôn ngữ**. Lúc mình mới biết tới Python, khi merge hai lists với nhau, mình hay dùng `for` (cách khá "củ chuối") hoặc dùng `extend`:

```python
a_list = [1, 2, 3, 4 ,5]
another_list = [7, 8, 9]
a_list.extend(another_list) 
# for now, a_list = [1, 2, 3, 4, 5, 7, 8, 8]
```

Sau đó, mình gặp một bug liên quan đến việc merge hai lists. Mình đã tìm theo message error tới được một topic, và thấy dưới phần bình luận nhiều cách rất hay ho để ra được kết quả tương tự mà mình không hề hay biết. Một số cách khác để merge hai lists:

```python
# Use * to unpack and merge 
a_list = [1, 2, 3, 4 ,5]
another_list = [7, 8, 9]
and_another_list = [*a_list, *another_list]
and_another_list  # [1, 2, 3, 4, 5, 7, 8, 9]

# Use itertools 
from itertools import chain
and_another_another_list = list(chain(a_list, another_list))
and_another_another_list  # [1, 2, 3, 4, 5, 7, 8, 9]

# Or simply using + operator ...
and_another_another_another_list = a_list + another_list
```

Với mình, đây là một khám phá rất thú vị với ngôn ngữ Python. Còn khi sử dụng bạn có thể chọn cách nào dễ hiểu là được.

- Thứ 3, chúng ta sẽ **nắm chắc được luồng thực thi của chương trình hơn**. Bằng việc debug, bạn có thể theo dõi trạng thái của biến thay đổi như thế nào qua từng function, các câu lệnh trong nhánh điều kiện nào sẽ được gọi, ...
- Và nhờ vậy, thứ 4, đây sẽ là dịp tốt nhất để chúng ta **đọc hiểu phần code của người khác**. Khi làm chung một dự án, chắc chắn bạn phải import và sử dụng những module, functions do các đồng đội viết nên hoặc các developers đi trước để lại. Và bình thường, mình chỉ quan tâm inputs, outputs và chức năng chính của nó chứ không thực sự rõ logic trong đó được thực hiện như thế nào. Chính vì thế mình sẽ rất mất thời gian khi gặp bug hoặc muốn mở rộng. Biết đâu những đoạn code ấy đã giải quyết bài toán nào đó mà mình đang "trầy trụa" cũng nên! Và debug chính là cơ hội để tìm hiểu, và biết đâu bạn sẽ không phải gọi tên "ai đó" trong team mỗi khi có bug nữa. ;)
- Cuối cùng, thứ 5, việc debug sẽ **rèn luyện cho chúng ta đức tính kiên nhẫn**, cho chúng bài học về sự cẩn thận trong lập trình, cũng như có cái nhìn tổng quát và tư duy logic hơn khi giải quyết các vấn đề liên quan.

Đến đây, hi vọng mọi người sẽ "yêu mến" hơn việc debugging và có một góc nhìn tích cực khác về nó. 😆 Ở những phần sau, mình sẽ thống kê những cách debugging mà mình góp nhặt được trong quá trình làm việc, để mọi người đỡ vất vả và thấy hứng thú hơn khi lập trình vô tình gặp "bọ" nhé! 🐞

Link gốc bài viết [tại đây](https://nguyendhn.wordpress.com/2020/08/31/debugging-as-a-learning-opportunity-hoc-tu-viec-debug-tai-sao-khong/). Có gì mọi người góp ý cho mình với nhé!