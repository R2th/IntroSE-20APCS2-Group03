Xin chào bét fờ zen!

Tình hình là hôm lay mình lên bài đầu tiên của seri [**Dốt toán học thuật toán**](https://viblo.asia/s/dot-toan-hoc-thuat-toan-QqKLvpJbl7z)  của mình!
> Như mình cũng đã nói ở rất nhiều bài viết của mình là: những kiến thức mình chia sẻ đều là do mình học hỏi và trải nghiệm, nên nếu có sai hoặc thiếu thì các bạn có thể đóng góp vào phía bên dưới để mọi người cùng tham khảo nhé!

# Bắt đầu

Như tiêu đề! hôm nay chúng ta cùng tìm hiểu về một thuật toán cơ bản mà mình nghĩ lập trình viên nào cũng phải biết, đó là thuật toán **Tìm kiếm nhị phân (Binary search)**!

Chúng ta cùng bắt đầu luôn nhé!

# Khái niệm
- **Tìm kiếm nhị phân**  là một thuật toán tìm kiếm được sử dụng trong một mảng đã được sắp xếp bằng cách chia đôi mảng cần tìm kiếm nhiều lần . 
- Chúng ta chia đôi mảng và gọi 2 phần chia đôi đó là **left** và **right**
- Phần tử đứng ở giữa **left** và **Right** được gọi là **Mid**
-  Chúng ta sẽ dựa vào **Mid** để tìm xem giá trị chúng ta cần tìm nó nằm trên mảng **left** hay **right**
-  Nếu giá trị cần tìm nằm ở trên **left** thì chúng ta sẽ loại bỏ mảng **right** và chỉ thực hiện tìm kiếm trên **left** và ngược lại!

![image.png](https://images.viblo.asia/b9341996-70ec-4f9b-9c56-464fe4e326f6.png)
> Với việc chỉ tìm kiếm trên **left** hoặc **right** thì thuật toán **Binary search** sẽ có performace nhanh hơn đáng kế so với thuật toán **Tìm kiếm tuyến tính** Vì thuật toán **Tìm kiếm tuyến tính** sẽ phải lặp qua các phần tử để thực hiện tìm kiếm!



## Các bước thực hiện


- **Bước 1:** Cho 1 mảng **arr[]** số nguyên đã được sắp xếp và **x** là giá trị cần tìm
- **Bước 2:** Thực hiện tách mảng ra làm 2 và tìm phần tử ở giữa mảng và gọi nó là **mid**, công thức tính (Mid = (left + right)/2)
- **Bước 3:**  
            -  Nếu **arr[mid]** == **x** thì sẽ return ra **mid**
            -  
            -  Ngược lại nếu **arr[mid]** > **x** thì **right** = **mid** - **1** vì giá trị cần tìm chắc chắn ko nằm trên **right** nên ta sẽ loại bỏ nó! và thực hiện tìm kiếm
            -  
           - Ngược lại nếu **arr[mid]** < **x** thì **left** = **mid** + **1** vì giá trị cần tìm chắc chắn ko nằm trên **left** nên ta sẽ loại bỏ nó! và thực hiện tìm kiếm

## Implement code

> Mình sẽ để console trong từng bước lặp để các bạn thấy rõ hơn và hiểu hơn nhé!

```
public class BinarySearch {

    public static void main(String[] args) {
        int arr[] = {1,2,3,4,5,6,7,8,9};
        System.out.println(binary(arr,4));

    }


    public static int binary(int a[], int x){
        int left = 0;
        int right = a.length - 1;

        for (int i = left; i <= right; i++){
            System.out.println(" vòng "+(i+1)+" left = "+left);
            System.out.println(" vòng "+(i+1)+" right = "+right);
            int mid = (left + right)/2;
            System.out.println(" vòng "+(i+1)+" mid = "+mid);
            System.out.println(" vòng "+(i+1)+" a[mid] = "+a[mid]);
            System.out.println("------------------------------");

            if(a[mid] == x){
                return mid;
            }else if(a[mid] > x){
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return -1;
    }
}

```

> Mình thực hiện tìm giá trị x = 4 trên mảng arr[]!
> 
> Mình sử dụng for và điều kiện dừng vòng lặp là left <= right
> 
>  Và nếu không tìm thấy giá trị cần tìm trên mảng thì sẽ return ra -1

Và kết quả sau khi chạy chương trình!
```
 vòng 1 left = 0
 vòng 1 right = 8
 vòng 1 mid = 4
 vòng 1 a[mid] = 5
------------------------------
 vòng 2 left = 0
 vòng 2 right = 3
 vòng 2 mid = 1
 vòng 2 a[mid] = 2
------------------------------
 vòng 3 left = 2
 vòng 3 right = 3
 vòng 3 mid = 2
 vòng 3 a[mid] = 3
------------------------------
 vòng 4 left = 3
 vòng 4 right = 3
 vòng 4 mid = 3
 vòng 4 a[mid] = 4
------------------------------
Giá trị cần tìm nằm ở index = 3
```

>Các bạn coppy code và chạy sau đó tự phân tích và cảm nhận nhé, vì nếu các bạn chỉ đọc và không thực hành nó thì sẽ rất khó để nhớ kiến thức!


# Kết
OTOKE! Vừa rồi chúng ta đã cùng tìm hiểu thuật toán **Binay search** và các bước nó hoạt động ra sao rùi đúng khum!

Với bài viết này, mình mong các bạn có thể hiểu được nó và áp dụng nó trong công việc hàng ngày của mình nhé!, xin chào!