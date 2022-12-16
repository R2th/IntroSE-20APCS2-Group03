Như vậy là trong những bài trước, chúng ta đã cùng ôn lại qua những kiến thức cơ bản về cấu trúc dữ liệu, thuật toán, độ phức tạp của thuật toán, và cùng với đó là một giải thuật rất cơ bản là đệ quy. Và để tiếp nối series về [các phương pháp thiết kế giải thuật](https://viblo.asia/s/algorithms-design-techniques-3vKjR8XkK2R), ở phần tiếp theo này, chúng ta sẽ cùng đi vào tìm hiểu về một trong những chiến lược thiết kế thuật toán phổ biến nhất, đó là **chia để trị**, hay **divide and conquer**. 

Hãy cùng tìm hiểu xem **"chia để trị"** là gì, nó có những đặc điểm gì, có quan hệ như thế nào với đệ quy, và nó được ứng dụng vào để giải quyết những bài toán như thế nào nhé ;)

## Khái niệm chia để trị
Trong khoa học máy tính, **chia để trị** là một mô hình thiết kế thuật toán quan trọng, hoạt động dựa trên ý tưởng **chia vấn đề cần giải quyết thành các vấn đề con cùng dạng với vấn đề đã cho, chỉ khác là cỡ của chúng nhỏ hơn, cứ như vậy lặp lại nhiều lần, cho đến khi bài toán thu được đủ đơn giản để có thể giải quyết trực tiếp. Sau đó, lời giải của các bài toán nhỏ được tổng hợp lại thành lời giải cho bài toán ban đầu.**

Một giải thuật chia để trị thường được thiết kế theo 3 bước như sau:
1. **Chia (divide)**: Chia bài toán ra thành các bài toán nhỏ hơn (subproblems). Về cơ bản thì những bài toán nhỏ này giống với bài toán ban đầu.
2. **Trị (conquer)**: Giải quyết bài toán con trong trường hợp nó đủ nhỏ, còn không thì tiếp tục tiến hành chia tách nó ra thành những bài toán con nhỏ hơn nữa.
3. **Kết hợp (combine)**: Kết hợp các kết quả từ bài toán con nhỏ nhất, để ra lời giải cho các bài toán con (subproblems), và cứ thế cuối cùng ra được lời giải cho bài toán ban đầu.

![divide and conquer](https://images.viblo.asia/6acbff5b-5501-4ee4-8c27-0a8e5be34655.png)

(Hình ảnh miêu tả giải thuật Chia để Trị. [Image Source](https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms))

Đến đây, khi nhắc đến việc chia bài toán ban đầu thành các bài toán con đồng dạng, rồi tiếp tục chia các bài toán con đó thành các bài toán con nhỏ hơn, và cứ tiếp tục như vậy cho đến khi gặp được bài toán con đủ nhỏ, hay đủ đơn giản để giải quyết, thì chắc hẳn các bạn cũng sẽ thấy tư tưởng của nó khá quen thuộc với một khái niệm mà chúng ta đã từng tìm hiểu ở bài trước nhỉ. Đúng vậy, với cách thiết kế thuật toán chia để trị như ở trên, **thì chúng ta thường liên tưởng ngay đến giải thuật [đệ quy](https://viblo.asia/p/tim-hieu-ve-giai-thuat-de-quy-3Q75wVVQlWb)**.  Và trong thực tế, các giải thuật chia để trị cũng thường được implement bằng cách sử dụng đệ quy.

Ta có thể viết một lược đồ đơn giản để miêu tả một giải thuật chia để trị như sau
```js
// Giải bài toán A
DivideConquer (A) {
    if (A đủ nhỏ) {
        return Solve (A)
    } else {
        // Chia bài toán A thành các bài toán con: A1, A2, ... , An
        for (i = 1; i <= n; i ++) {
            // Gọi đệ quy để giải quyết từng bài toán con Ai
            xi = DivideConquer (Ai)
        }
        // Kết hợp các nghiệm xi của các bài toán con Ai để nhận được nghiệm của bài toán A
        combine(x1, x2, ..., xn)
    }
}
```

Có thể mới nhìn qua các bạn sẽ thấy hơi khó hiểu. Chúng ta hãy cùng đi vào một số ví dụ dưới đây nhé.

## Một số ví dụ về giải thuật chia để trị
### Bài toán Tháp Hà Nội
Một bài toán rất quen thuộc phải không mọi người. Ở trong bài viết trước về Đệ Quy, mình cũng đã từng giới thiệu về bài toán kinh điển này, cũng như cách giải nó bằng cách sử dụng đệ quy. Lời giải đó cũng có thể coi là phương pháp **chia để trị**, khi chúng ta chia bài toán **chuyển n đĩa từ cột A sang cột C** về bài toán nhỏ hơn là **chuyển n-1 đĩa từ cột A sang cột B**, sau đó thì **chuyển đĩa thứ n từ cột A sang cột C** và kết thúc bằng cách **chuyển n-1 đĩa từ cột B sang cột C**.

Bạn có thể xem kỹ lại giải thuật chia để trị cho bài toán Tháp Hà Nội tại [đây](https://viblo.asia/p/tim-hieu-ve-giai-thuat-de-quy-3Q75wVVQlWb#_bai-toan-thap-ha-noi-5) nhé. 

### Merge Sort
Merge Sort là một thuật toán sắp xếp nổi tiếng, luôn có trong chương trình giảng dạy về Algorithms trên ghế nhà trường. 

Mục tiêu của một thuật toán sắp xếp thì rất đơn giản, đó là sắp xếp lại một dãy số không có thứ tự, thành một dãy có thứ tự, từ nhỏ đến lớn (hoặc từ lớn đến nhỏ). Có rất nhiều thuật toán khác nhau để giải quyết vấn đề này. Các thuật toán đơn giản, và dễ hiểu, dùng đến 2 vòng lặp như Bubble Sort, Insertion Sort, Selection Sort thì đều cho độ phức tạp thuật toán trung bình là $O(n^2)$. Một số thuật toán hiệu quả hơn có thể cho độ phức tạp là $O(nlogn)$. Và Merge Sort là một trong số đó.

Merge Sort cũng là một trong những ví dụ kinh điển về việc thiết kế giải thuật chia để trị. Ý tưởng cơ bản của Merge Sort như sau:
- Chia dãy số ra làm 2 nửa, nửa bên trái và nửa bên phải (bước Chia (Divide))
- Tiến hành sắp xếp 2 nửa (2 mảng) đó (bước Trị (Conquer)), bằng cách gọi đệ quy. Việc gọi đệ quy được dừng lại khi mảng con được chia ra chỉ còn có 1 phần tử. Lúc đó mảng ở vào trạng thái đã được sắp xếp rồi (do chỉ có 1 phần tử thôi mà :joy:)
- Sau khi có được 2 dãy con đã sắp xếp, thì ta dùng một thuật toán merge để tạo thành một dãy số mới được sắp xếp (Bước Tổng Hợp (Combine))

Thuật toán merge 2 dãy con đã được sắp xếp (giả sử là theo thứ tự từ nhỏ đến lớn), thành một dãy được sắp xếp có thể miêu tả như sau:
- Chạy vòng `while` duyệt hết các phần từ của mảng chứa nửa bên trái, ta gọi là mảng `L` và mảng chứa nửa bên phải, ta gọi là mảng `R`
- So sánh phần tử ở mảng `L` với phần tử ở mảng `R`, phần tử nào nhỏ hơn, thì ta đưa vào mảng kết quả. Cứ như vậy cho đến khi duyệt hết số phần từ của một trong 2 mảng
- Copy nốt số phần tử còn lại ở mảng còn lại vào mảng kết quả

Dưới đây là hình ảnh miêu tả một cách trực quan cách thức hoạt động của thuật toán merge sort.

![merge sort algorithm](https://images.viblo.asia/462a7fde-dd41-4100-bd66-b133288156b5.png)

Còn dưới đây là một ví dụ về cách implementation của giải thuật Merge Sort bằng Python (bạn có thể tham khảo thêm tại [GeeksforGeeks](https://www.geeksforgeeks.org/merge-sort/))
```python
def mergeSort(A):
    # Chỉ tiến hành sort khi số phần tử của mảng > 1. Hay nói cách khác, hàm đệ quy sẽ dừng lại khi chia thành mảng chỉ có một phần tử
    # Lúc đó thì mảng đã ở trạng thái được sort sẵn rồi (do chỉ có 1 phần tử)
    if len(A) > 1:
        ## Lấy phần tử ở giữa làm trung tâm
        mid = len(A)//2
        # Chia mảng ban đầu thành hai mảng L (left) và R (right)
        L = A[:mid]
        R = A[mid:]
        # Gọi đệ quy để sort 2 mảng L và R
        mergeSort(L)
        mergeSort(R)
        # Merge 2 mảng L và R đã được sắp xếp vào mảng kết quả
        merge(A, L, R)

# Thuật toán để merge 2 mảng đã sắp xếp Left và Right thành 1 mảng được sắp xếp
def merge(A, L, R):
    i = j = k = 0
    while i < len(L) and j < len(R):
        if L[i] < R[j]:
            A[k] = L[i]
            i += 1
        else:
            A[k] = R[j]
            j += 1
        k += 1

    # Copy nốt các phần tử còn lại của mảng L hoặc mảng R vào mảng kết quả
    while i < len(L):
        A[k] = L[i]
        i += 1
        k += 1

    while j < len(R):
        A[k] = R[j]
        j += 1
        k += 1

if __name__ == '__main__':
    A = [38, 27, 43, 3, 9, 82, 10]
    mergeSort(A)
    print(A)
```

### Quick Sort
Quick Sort, hay sắp xếp nhanh, cũng là một trong những thuật toán nổi tiếng luôn được đề cập khi giảng dạy về Sorting Algorithm. Và nó cũng là một trong những ví dụ nổi tiếng cho việc thiết kế giải thuật chia để trị.

Trong khi Merge Sort chia danh sách cần sắp xếp thành hai danh sách con có kích thước tương đối bằng nhau nhờ chỉ số **đứng giữa danh sách**, thì **Quick Sort** lại chia danh sách cần sắp xếp thành hai danh sách con **bằng cách so sánh từng phần tử của danh sách với một phần tử được chọn được gọi là pivot**, hay phần tử chốt. Những phần tử nhỏ hơn hoặc bằng pivot được đưa về phía bên trái và nằm trong danh sách con thứ nhất, các phần tử lớn hơn chốt được đưa về phía bên phải và thuộc danh sách đứng sau. Cứ tiếp tục chia như vậy tới khi các danh sách con đều có độ dài bằng 1.

Cụ thể hơn, Quick Sort sử dụng cách thiết kế chia để trị với các bước như sau:
- Chọn phần tử pivot. Đây có thể là phần tử ở đầu, ở cuối, hoặc ở giữa của dãy số.
- Dùng 2 con trỏ chạy từ đầu dãy, và chạy từ cuối dãy. Với con trỏ chạy từ đầu dãy thì dừng lại khi gặp phần tử lớn hơn pivot. Với con trỏ chạy từ cuối dãy thì dừng lại khi gặp phần tử nhỏ hơn pivot. Swap 2 phần tử này với nhau và tiến hành duyệt tiếp. Dừng lại khi con trỏ chạy từ đầu gặp, hoặc vượt qua con trỏ chạy ngược lại từ cuối. Swap pivot vào vị trí hợp lý ta sẽ được 2 dãy con: 1 dãy gồm các phần tử nhỏ hơn pivot, 1 dãy gồm các phần tử lớn hơn pivot. Đây chính là 2 bài toán con mà ta cần tiếp tục giải quyết. Đến đây ta hoàn thành bước chia (divide)
- Gọi đệ quy để tiếp tục chia nhỏ các bài toán con ra, cho đến khi gặp bài toán con với độ dài là 1, tức ở trạng thái đã được sắp xếp rồi. Đến đây ta hoàn thành bước trị (conquer)
- Sau khi hoàn thành sắp xếp dãy bên trái nhỏ hơn pivot và dãy bên phải lớn hơn pivote, thì đơn giản ta chỉ cần ghép dãy bên trái, pivote, dãy bên phải về thành 1 mảng là có được kết quả cuối cùng là dãy được sắp xếp.

![quick sort](https://images.viblo.asia/b4c391b2-a263-4eec-bde9-619d205cdfbe.jpg)

(Hình ảnh miêu tả cách thức Quick Sort hoạt động với cách chọn phần tử pivot ở cuối dãy. [Image Source](https://morioh.com/p/b0deaa623ac4))

Dưới đây là một ví dụ về cách implementation của giải thuật Quick Sort bằng Python (bạn có thể tham khảo thêm tại [GeeksforGeeks](https://www.geeksforgeeks.org/quick-sort/))

```python
# Thuật toán để chia dãy số ra thành 2 phần, một phần nhỏ hơn phần tử pivot, một phần lớn hơn phần tử pivot
# phần tử pivot ở đây ta lấy là phần tử đầu tiên của mảng
def partition(start, end, A):
	pivot_index = start
	pivot = A[pivot_index]

    # Chạy vòng lặp tăng dần con trỏ từ đầu dãy, là start, và giảm dần con trỏ từ cuối dãy, là end
    # Dừng lại khi 2 con trỏ này gặp nhau
	while start < end:
        # Tăng dần con trỏ từ đầu dãy, cho đến khi gặp phần tử lớn hơn pivot
		while start < len(A) and A[start] <= pivot:
			start += 1
        # Giảm dần con trỏ từ cuối dãy, cho đến khi gặp phần tử nhỏ hơn hoặc bằng pivot
		while A[end] > pivot:
			end -= 1
        # Nếu khi có 2 phần tử này, mà start vẫn nhỏ hơn end thì swap chúng với nhau
        # Mục tiêu là đưa hết phần tử nhỏ hơn hoặc bằng pivot sang một bên (bên trái)
        # và đưa hết các phần tử lớn hơn pivot sang một bên (bên phải)
		if(start < end):
			A[start], A[end] = A[end], A[start]

    # Khi vòng lặp bị break ra, thì phần tử end đang là phần tử nhỏ hơn pivot
    # swap nó cho pivot ta sẽ đưa pivot về vị trí ngăn cách 2 dãy,
    # một dãy bên trái gồm các phần tử nhỏ hơn, và dãy bên phải gồm các phần tử lớn hơn
	A[end], A[pivot_index] = A[pivot_index], A[end]

    # Trả về vị trí của pivot
	return end

# Quick Sort mảng A, từ phần tử start đến phần tử end
def quick_sort(start, end, A):
    # Chỉ tiếp tục chạy và gọi đệ quy khi mảng có hơn 1 phần từ (tức start < end)
	if (start < end):
        # Chia mảng A thành 2 phần,
        # với vị trí p ngăn cách phần nhỏ hơn phần tử pivot, và phần lớn hơn phần tử pivot
		p = partition(start, end, A)
        # Gọi đệ quy để sắp xếp nửa bên trái và nửa bên phải
		quick_sort(start, p - 1, A)
		quick_sort(p + 1, end, A)

A = [38, 27, 43, 3, 9, 82, 10]
quick_sort(0, len(A) - 1, A)

print(A)
```

### Một số bài toán khác
Bên cạnh các bài toán kinh điển về chia để trị như Tháp Hà Nội, Quick Sort, Merge Sort, chúng ta còn có một số bài toán nổi tiếng khác có thể giải một cách hiệu quả bằng giải thuật chia để trị như sau:
- **Integer Multiplication**: Bài toán nhân 2 số nguyên có `n` chữ số. Với cách nhân bình thường sẽ có độ phức tạp là $O(n^2)$. Thuật toán của Anatolii A. Karatsuba phát hiện năm 1960 cho phép thực hiện phép tính này với độ phức tạp $O(n^{\log _{2}3})$ 
- **Closest Points Problem**: Cho $n$ điểm trên mặt phẳng Oxy có tọa độ lần lượt là $(x_1, y_1)$, $(x_2, y_2)$, ..., $(x_n, y_n)$. Tìm 2 điểm gần nhau nhất trong $n$ điểm đó.
- **Subset Sum Recursive Problem**: Cho một tập hợp với $n$ giá trị. Hãy tính xem có tồn tại một hợp con sao cho tổng của chúng bằng một giá trị target $T$ cho trước không? 
- **Strassen’s Algorithm**: Trong đại số tuyến tính, thuật toán Strassen, được đặt theo tên của Volker Strassen, là một thuật toán nhân ma trận. Nó nhanh hơn thuật toán nhân ma trận tiêu chuẩn và rất hữu ích trong thực tế đối với ma trận lớn.
- **Skyline Problem**
- **Tromino Tiling**

Các bạn có thể tìm hiểu thêm về lời giải của những bài toán này qua một tài liệu bài giảng về Divide and Conquer này của trường đại học University of Central Florida tại [đây](http://www.cs.ucf.edu/~sarahb/COP3503/Lectures/DivideAndConquer.ppt)

## Tổng kết
Như vậy là chúng ta đã cùng tìm hiểu về phương pháp thiết kế giải thuật chia để trị, cùng ứng dụng của nó vào việc giải một số bài toán cụ thể. Nhìn chung tư tưởng của chia để trị là chia bài toán lớn thành nhiều bài toán nhỏ, và giải quyết các bài toán nhỏ đó rồi ghép lời giải lại để được lời giải cho bài toán lớn. Thế nên chia để trị thường có đặc điểm như sau:
- Sử dụng các lời gọi đệ quy, để giải quyết các bài toán nhỏ bằng cách chia chúng thành các bài toán nhỏ hơn. Thực ra việc sử dụng đệ quy này là không bắt buộc, ta có thể viết lại bằng vòng lặp để khử đệ quy, tuy nhiên cách viết đệ quy vẫn là cách ngắn gọn và dễ hiểu hơn
- Có từ 2 lời gọi đệ quy trở lên, do việc cần chia bài toán lớn thành nhiều bài toán nhỏ hơn (và để giải quyết 1 bài toán nhỏ đó, ta cần 1 lời gọi đệ quy). Thực ra tên gọi "chia để trị" thông thường cũng được áp dụng cho các thuật toán quy bài toán ban đầu **về đúng một bài toán nhỏ hơn**, chẳng hạn như thuật toán **tìm kiếm nhị phân**, dùng cho việc tìm khóa trong một danh sách đã sắp xếp. Tuy nhiên nhiều người cũng cho rằng "chia để trị" **chỉ nên dùng cho trường hợp mỗi bài toán có thể được chia thành hai hay nhiều hơn bài toán nhỏ**, khi đó, cái tên **"giảm để trị"** **(decrease and conquer)** được đề xuất dùng cho trường hợp **bài toán lớn được quy về đúng một bài toán nhỏ hơn**
- Các bài toán con thường là độc lập với nhau (giải quyết bài toán con này không phụ thuộc vào giải quyết bài toán con kia)

Ta thường implement phương pháp chia để trị bằng cách sử dụng đệ quy, tuy nhiên không phải cứ dùng đệ quy là ta đang làm theo hướng chia để trị. Cần chú ý rằng tư tưởng của chia để trị là việc chia tách thành các bài toán con. Thế nên việc gọi đệ quy mà không bao gồm sự chia tách bài toán con thì sẽ không thể coi là chia để trị được. Ta có thể kể ra như việc gọi đệ quy để tính số Fibonacci như trong ví dụ ở bài trước, thì mặc dù có gọi đến 2 lần đệ quy đấy, tuy nhiên nó không phải là ta chia bài toán lớn thành 2 bài toán con, nên về bản chất thì nó không được coi là chia để trị. Hay các thuật toán duyệt cây thông thông thường, là đệ quy đấy, nhưng không phải là chia để trị. 

Bên cạnh chia để trị thì cũng có một phương pháp thiết kế giải thuật nổi tiếng khác cũng có ý tưởng giải quyết bài toán lớn bằng cách sử dụng kết quả của các bài toán con, đó là Quy Hoạch Động (dynamic programming). Tuy nhiên thay vì giải quyết các bài toán con một cách độc lập, rồi **combine** kết quả lại để ra lời giải của bài toán lớn như chia để trị, thì quy hoạch động sẽ lưu trữ lại rồi tận dụng lời giải của các bài toán con để có thể giải quyết các bài toán lớn một cách hiệu quả hơn. Chúng ta sẽ cùng tìm hiểu thêm về phương pháp Quy Hoạch Động ở những bài sau nhé ;) 

## Tham khảo
- [Chia để trị | Wiki](https://vi.wikipedia.org/wiki/Thu%E1%BA%ADt_to%C3%A1n_chia_%C4%91%E1%BB%83_tr%E1%BB%8B)
- [Merge Sort | Wiki](https://en.wikipedia.org/wiki/Merge_sort)
- [Quick Sort | Wiki](https://vi.wikipedia.org/wiki/S%E1%BA%AFp_x%E1%BA%BFp_nhanh)
- [Merge Sort | GeeksforGeeks](https://www.geeksforgeeks.org/merge-sort/)
- [Quick Sort | GeeksforGeeks](https://www.geeksforgeeks.org/quick-sort/)
- https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms
- http://www.cs.ucf.edu/~sarahb/COP3503/Lectures/DivideAndConquer.ppt
- https://www.radford.edu/~nokie/classes/360/divcon.html