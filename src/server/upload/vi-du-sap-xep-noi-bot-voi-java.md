Bài toán sắp xếp là bài toán rất thường gặp với các bạn mới tiếp xúc với lập trình, bài viết này hướng đến các bạn mới tiếp xúc với java và mong muốn hiểu rõ hơn về sắp xếp. Hiện nay trong các cuộc phỏng vấn thì nhà tuyển dụng vẫn thường đặt câu hỏi về vấn đề này. Có rất nhiều thuật toán sắp xếp, tuy nhiên bài viết này tập trung vào sắp xếp nổi bọt, thuật toán sắp xếp đơn giản nhất, hy vọng phần nào giúp các bạn nhắc lại kiến thức

Sắp xếp nổi bọt là thuật toán sắp xếp đơn giản nhất, nó so sánh hai phần tử đầu tiên, nếu phần tử đầu tiên lớn hơn phần tử thứ hai, hoán đổi chúng, tiếp tục thực hiện (so sánh và hoán đổi) cho cặp phần tử liền kề tiếp theo. Sau đó lặp lại với hai phần tử đầu tiên, so sánh, hoán đổi cho đến khi không cần thêm hoán đổi.

Nghe qua thì có vẻ rắc rối, hãy tham khảo ví dụ dưới đây để thấy rõ hơn sự nổi bọt nhé :D

Giả sử chúng ta có 1 mảng dữ liệu kiểu int chưa được sắp xếp như sau
> [99, 88, 55, 77, 1, 66]

> #1 vòng lặp số 1.
> 
> #1.1 -> [**99**, **88**, 55, 77, 1, 66] -> [**88**, ***99***, 55, 77, 1, 66]   (So sánh phần tử đầu tiên với phần tử liền kề sau nó, nếu phần tử đầu tiên lớn hơn thì đổi chỗ 2 phần tử)
> 
> #1.2 -> [88, **99**, **55**, 77, 1, 66] -> [88, **55**, ***99***, 77, 1, 66]   (So sánh phần tử thứ 2 với phần tử liền kề sau nó, nếu phần tử thứ 2 lớn hơn thì đổi chỗ 2 phần tử)
> 
> #1.3 -> [88, 55, **99**, **77**, 1, 66] -> [88, 55, **77**, ***99***, 1, 66]   (Tương tự bước trên)
> 
> #1.4 -> [88, 55, 77, **99**, **1**, 66] -> [88, 55, 77, **1**, ***99***, 66]   (Tương tự bước trên)
> 
> #1.5 -> [88, 55, 77, 1, **99**, **66**] -> [88, 55, 77, 1, **66**, ***99***]   (Tương tự bước trên)
> 
> Sau vòng lặp số 1, phần tử 99 là lớn nhất, nên sẽ được xếp là phần tử cuối cùng của mảng dữ liệu, và vòng lặp sau ta sẽ không so sánh các phần tử còn lại với những phần tử đã được xếp cuối này nữa bởi vì bản chất phần tử đó đã là lớn nhất, đây chính là sự nổi bọt. Các giá trị sẽ được sắp xếp dần dần cho đến khi mảng dữ liệu được sắp xếp hoàn chỉnh
> 
> Thêm nữa là khi không so sánh với các phần tử đã nổi bọt làm giảm các vòng lặp không cần thiết, việc đó sẽ giúp code của chúng ta chạy với tốc độ tốt hơn, các bạn hãy thử đo performance thêm nhé
>
> #2 vòng lặp số 2.
> 
>
> #2.1 -> [**88**, **55**, 77, 1, 66, 99] -> [**55**, ***88***, 77, 1, 66, 99]   (So sánh phần tử đầu tiên với phần tử liền kề sau nó, nếu phần tử đầu tiên lớn hơn thì đổi chỗ 2 phần tử)
> 
> #2.2 -> [55, **88**, **77**, 1, 66, 99] -> [55, **77**, ***88***, 1, 66, 99]   (So sánh phần tử đầu tiên với phần tử liền kề sau nó, nếu phần tử đầu tiên lớn hơn thì đổi chỗ 2 phần tử)
> 
> #2.3 -> [55, 77, **88**,** 1**, 66, 99] -> [55, 77,** 1**, ***88***, 66, 99]    (Tương tự bước trên)
> 
> #2.4 -> [55, 77, 1, **88**, **66**, 99] -> [55, 77, 1, **66**, ***88***, 99]   (Tương tự bước trên)
> 
> Sau vòng lặp số 2, hai phần tử 88 và 99 được xếp cuối mảng dữ liệu, điều này xảy ra tương tự với các vòng lặp tiếp theo
>
> #3 vòng lặp số 3.
> 
> #3.1 -> [**55**, **77**, 1, 66, 88, 99] -> [55, 77, 1, 66, 88, 99] {Không thay đổi vị trí}
> 
> #3.2 -> [55, **77**, **1**, 66, 88, 99] -> [55,** 1**, ***77***, 66, 88, 99]
> 
> #3.3 -> [55, 1, **77**, **66**, 88, 99] -> [55, 1, **66**, ***77***, 88, 99]
> 
>
> #4 vòng lặp số 4.
> 
> #4.1 -> [**55**, **1**, 66, 77, 88, 99] -> [**1**, ***55***, 66, 77, 88, 99]
> 
> #4.2 -> [**1**, **55**, 66, 77, 88, 99] -> [1, 55, 66, 77, 88, 99] {Không thay đổi vị trí}
> 
>
> #5 vòng lặp số 5.
> 
> #5.1 -> [**1**, **55**, 66, 77, 88, 99] -> is_sorted = true, break;
> 

Vậy thực hiện lý thuyết trên trong java như thế nào? Dưới đây là sample code:

```
public static void sort(int[] input) {

        int inputLength = input.length;
        int temp;
        boolean is_sorted;

        for (int i = 0; i < inputLength; i++) {

            is_sorted = true;

            for (int j = 1; j < (inputLength - i); j++) {

                if (input[j - 1] > input[j]) {
                    temp = input[j - 1];
                    input[j - 1] = input[j];
                    input[j] = temp;
                    is_sorted = false;
                }

            }

            // is sorted? then break it, avoid useless loop.
            if (is_sorted) break;

            System.out.println("\n");
            
        }
        
    }
```

Ví dụ đầy đủ sắp xếp nổi bọt theo chiều tăng dần và giảm dần:

```
package com.vuta.sort.test;

import java.util.Arrays;
import java.util.stream.Collectors;

public class BubbleSortExample {

	public static void main(String[] args) {

		int[] array = { 99, 88, 55, 77, 1, 66 };

		System.out.print("unsorted data: ");
		printArray(array);

		System.out.print("ascending order: "); // 1,55,66,77,88,99
		bubble_sort(array);

		printArray(array);

		System.out.print("descending order: "); // 99,88,77,66,55,1
		bubble_sort(array, false);

		printArray(array);

	}

	private static void bubble_sort(int[] input) {
		bubble_sort(input, true);
	}

	private static void bubble_sort(int[] input, boolean ascending) {

		int inputLength = input.length;
		int temp;
		boolean is_sorted;

		for (int i = 0; i < inputLength; i++) {

			is_sorted = true;

			for (int j = 1; j < (inputLength - i); j++) {

				if (ascending) {
					if (input[j - 1] > input[j]) {
						temp = input[j - 1];
						input[j - 1] = input[j];
						input[j] = temp;
						is_sorted = false;
					}
				} else {
					if (input[j - 1] < input[j]) {
						temp = input[j - 1];
						input[j - 1] = input[j];
						input[j] = temp;
						is_sorted = false;
					}

				}

			}

			// is sorted? then break it, avoid useless loop.
			if (is_sorted)
				break;

		}

	}

	private static void printArray(int[] data) {
		String result = Arrays.stream(data).mapToObj(String::valueOf).collect(Collectors.joining(","));
		System.out.println(result);
	}

}

```