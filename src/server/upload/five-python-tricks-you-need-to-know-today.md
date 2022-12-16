Cái tên python chắc có lẽ cũng khá quen thuộc với ngành IT. Được phát hành đầu tiên vào năm 1991. Nó đã nhanh chóng trở thành ngôn ngữ lập trình được yêu thích của nhiều lập trình viên.
Dựa trên số lượt xem trên Stack Overflow ở các quốc gia có thu nhập cao, thì python nhanh chóng trở thành ngôn ngữ lập trình phổ biến nhất.

   Là một  ngôn ngữ lập trình bậc cao, với cú pháp đơn giản và dễ hiểu. Python tương đối dễ tiếp cận đối với cả những người không có kinh nghiệm lập trình. Các thư viện của python được tích hợp tốt và được sử dụng trong nhiều lĩnh vực như tin sinh học (biopython), data science(pandas)... Với sự bùng nổ của AI và machine learning thì python giờ đây thực sự đang rất phổ biến.
    
    
   Những tricks bạn nên cần biết khi bắt đầu với python:
   
   1. Powerfull one-lines


        Bạn có thấy mệt mỏi và lạc giữa những dòng code có quá nhiều điều kiện không?
        Python one-liners có thể là những gì bạn đang tìm kiếm.
        Ví dụ ta có một khối các điều kiện:
        ```
        >>> if alpha > 7:
        >>>    beta = 999
        >>> elif alpha == 7:
        >>>    beta = 99
        >>> else:
        >>>    beta = 0
        ```
        Chúng ta có thể viết ngắn gọn lại như sau:
        ```
        >>> beta = 999 if alpha > 7 else 99 if alpha == 7 else 0
        ```
        Điều này thật buồn cười. Ngoài những khối lệnh thì với những vòng lặp chúng ta cũng có thể rút ngăn nó.
        Ta có list như sau:
        ```
        >>> lst = [1, 3, 5]
        >>> doubled = [] 
        >>> for num in lst:
        >>>    doubled.append(num*2)
        ```
        
        Chúng ta có thể đơn giản nó với 1 dòng:
        ```
        >>> doubled = [num * 2 for num in lst]
        ```
        Cái này trước đây mình cũng đã từng [giới thiệu ](https://viblo.asia/p/su-dung-listcomprehensions-trong-python-OeVKBDdylkW) về nó.
        
        Note: Chúng ta cũng đừng quá lạm dụng điều không, không có code của cũng ta sẽ trở nên khó hiểu hơn khi chúng ta viết tường minh.


2. Quick String Manipulations

    Python có các tốc ký giúp cho việc thao tác với string sẽ đơn giản hơn.
    Để đảo ngược 1 chuỗi thì chúng ta chỉ cẩn thêm ::-1 như 1 chỉ  mục của list:
    ```
    >>> a =  "ilovepython" 
    >>> print a[::-1] 
    nohtypevoli
    ```
    Bạn cũng có thể áp dụng với chuỗi số nguyên. 

    Một ví dụ khác: in ra một chuỗi với các biến xác định trước.
    ```
    >>> str1 = "Totally"
    >>> str2 = "Awesome"
    >>> lst3 = ["Omg", "You", "Are"]
    ```
    sử dụng phương thức join(' ')
    ```
    >>> print ' '.join(lst3)
    Omg You Are
    >>> print ' '.join(lst3)+' '+str1+' '+str2
    Omg You Are Totally Awesome
    ```
    Bên cạnh thao tác chuỗi thì chúng  ta cần tìm hiểu thêm về regex để đạt được hiệu quả hơn.
3. Nested Lists Combination

    itertools là các hàm  tạo các vòng lặp để lặp hiệu quả. Đây có lẽ là thư viện yêu thích của tôi. Hãy tưởng tượng nếu bạn kết thúc một hàm và trả lại một chuỗi kết qủa  lồng nhau. Thì itertools là thứ mà bạn đang cần.
    ```
    >>> import itertools
    >>> flatten = lambda x: list(itertools.chain.from_iterable(x))
    >>> s = [['"', 'An', 'investment'], ['in'], ['knowledge'], ['pays'], ['the', 'best'], ['interest."', '--'], ['Benjamin'], ['Franklin']]
    >>> print(' '.join(flatten(s)))
    " An investment in knowledge pays the best interest." -- Benjamin Franklin
    ```
    Ở ví dụ trên chúng ta có kết hợp các chuỗi lồng nhau bằng join('') và itertools.
    Phương thức combinations() cũng là một  công cụ mạnh mẽ để trả về các phần tử dài từ dữ liệu đầu vào lăp. Hãy tìm hiểu nhiều hơn itertools [tại đây.](https://docs.python.org/3/library/itertools.html)

4. Simple Data Structures

    Chúng ta có thể dễ dàng tạo cấu trúc dữ liệu trong python với trick 1. Harold Cooper đã tạo một cấu trúc cây như sau:
    ```
    >>> def tree(): return defaultdict(tree)
    ```
    Đoạn code  trên chỉ đơn giản xác định một cây là một từ điển có giá trị mặc định là cây. 
    Một ví dụ tạo số nguyên tố:
    ```
    >>> N = 10
    >>> reduce( (lambda r,x: r-set(range(x**2,N,x)) if (x in r) else r), 
    range(2,N), set(range(2,N)))
    set([2, 3, 5, 7])
    ```
    Python có các thư viện mạnh mẽ khác như collections. Nó giúp giải quyết nhiều vấn đề khác.
    ```
    >>> from collections import Counter
    >>> myList = [1,1,2,3,4,5,3,2,3,4,2,1,2,3]
    >>> print(Counter(myList))
    Counter({2: 4, 3: 4, 1: 3, 4: 2, 5: 1})

    ```
    Ở ví dụ trên có thể thấy, nó đếm số lượng các phần từ trong list. Rất hữu ích phải không.

5. Printing Made Easy

    Trick cuối cùng này tôi ước có  thể biết nó trước đó. Chúng ta có thể in ra một chuỗi các phần tử được phân tách bằng dấu phẩy mà không cần dung join('') và vòng lặp. Đơn giản chỉ cần:
    ```
    >>> print(*row, sep=',')
    1,bob,developer,python
    ```
     thay cho cách lúc trước như sau:
     ```
     >>> row = ["1", "bob", "developer", "python"]
    >>> print(','.join(str(x) for x in row))
    1,bob,developer,python
     ```
    Một ví dụ khác:
    ```
    >>> iterable = ['a','b','c']
    >>> c = 0 
    >>> for item in iterable: 
    >>>     print c, item 
    >>>     c+= 1
    0 a
    1 b
    2 c
    ```
    Chúng ta có thể dùng enumerate để lấy ra index của phần tử cần lặp.
    ```
    >>> for c, item in enumerate(iterable):
    >>>     print c, item
    ```

    Trên đây là một số mẹo nhỏ được dịch và thay đổi một số câu chữ của bài viết gốc:
    https://towardsdatascience.com/five-python-tricks-you-need-to-learn-today-9dbe03c790ab
   Cảm ơn các bạn đã đọc bài.