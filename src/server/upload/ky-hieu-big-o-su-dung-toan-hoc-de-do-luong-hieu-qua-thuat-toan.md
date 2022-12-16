Ký hiệu Big O – Sử dụng toán học để đo lường hiệu quả thuật toán
Dạo này mình đang cày lại cấu trúc dữ liệu và giải thuật, tìm được một bài viết hay nên tiện thể viết bài chia sẻ về Big O luôn. Mọi người học cấu trúc dữ liệu và giải thuật hay trong lập trình chắc đều nghe tới khái niệm Big O rồi chứ nhỉ, ví dụ như giải thuật tìm kiếm này mất O(n) đơn vị để thực hiện,….

### Vậy Kí hiệu **Big O** là gì?

Ký hiệu Big O là ngôn ngữ chúng ta sử dụng để nói về một thuật toán, giải thuật mất bao lâu để chạy. Đó là cách chúng ta so sánh hiệu quả của các cách tiếp cận khác nhau (áp dụng các giải thuật) đối với một vấn đề.

Nó giống như toán học ngoại trừ nó là một loại toán học tuyệt vời, không nhàm chán, nơi bạn có thể bỏ qua các chi tiết vê mặt toán học và chỉ tập trung vào những gì cơ bản nhất đang xảy ra bên trong theo các quy tắc của chúng ta đặt ra (sẽ nói trong phần ví dụ các quy tắc này). Với ký hiệu O, chúng ta thể hiện thời gian chạy theo thuật ngữ – brace yourself – mình không dịch thuật ngữ vì có thể làm biến tấu ý nghĩa, theo mình hiểu là tự gấp đôi chính mình – tốc độ thực thi nhanh hay chậm liên quan tới tập đầu vào vì tập đầu vào tùy ý có thể lớn thì tốc độ có thể chậm hơn bình thường. Vậy hãy chia nhỏ vấn đề trong câu phân tích này ra nhé:
1. **Thời gian chạy nhanh hay chậm như thế nào** – Thật khó để biết thời gian chạy chính xác của một thuật toán. Nó phụ thuộc vào tốc độ của bộ xử lý, máy tính khác đang chạy cái gì, v.v.. Vì vậy, thay vì nói về thời gian chạy trực tiếp, chúng tôi sử dụng ký hiệu O để nói về thời gian chạy nhanh đến mức như thế nào.
2. **Liên quan đến tập đầu vào** – Nếu thực tế nếu chúng ta tham gia chạy việt dã chúng ta có thể dễ dàng đo được thời gian chạy theo giây, phút, giờ. Nhưng trong việc thực thi thuật toán, với ký hiệu Big O, chúng ta sử dụng kích thước của đầu vào, mà chúng ta gọi là “(n)” Vì vậy, chúng ta có thể nói những thứ như thời gian chạy tăng lên “theo thứ tự kích thước của đầu vào” (O(n)) hoặc “theo thứ tự của bình phương kích thước của đầu vào” (O(n^2)).
3. **Tập đầu vào tùy ý** – Thuật toán của chúng ta có thể có các bước có vẻ tốn kém khi n nhỏ nhưng sẽ bị “lu mờ” bởi các bước khác khi n trở nên rất lớn. Đối với việc phân tích O, chúng ta quan tâm nhất về những thứ phát triển nhanh nhất khi đầu vào tăng lên, bởi vì mọi thứ khác nhanh chóng bị lu mờ khi n trở nên rất lớn. (Nếu bạn biết asymptote là gì, bạn có thể thấy tại sao “phân tích O” đôi khi được gọi là “phân tích tiệm cận“. Ý ở đây muốn nói nếu tập hợp chúng ta với phần tử ít khoảng 100, 1000 phần tử thì khi duyệt chúng ta chỉ mất O(100), O(1000) nhưng nếu tập đầu vào là tập 1 triệu phần tử mà duyệt thì O bây giờ nhìn vào chúng ta sẽ phát sợ ngay chính vì vậy mà các giải thuật ra đời để giảm chi phí thực hiện này xuống.

Một số ví dụ trong việc phân tích độ lớn thuật toán, thống nhất là tính theo đơn bị thực hiện nhé mọi người ví dụ O(n) là độ lớn thực hiện n lần:

-----
### Tính toán độ lớn giải thuật
```
public static void printFirstItem(int[] items) {
    System.out.println(items[0]); // => O(1)
}
```

```
  public static void printAllItems(int[] items) {
    for (int item : items) {
        System.out.println(item); // => O(n)
    }
}
```

```
  public static void printAllPossibleOrderedPairs(int[] items) {
    for (int firstItem : items) {
        for (int secondItem : items) {
            System.out.println(firstItem + ", " + secondItem); // => O(n^2)
        }
    }
}
```
Ở đây 2 vòng lặp for lồng nhau vậy phải duyệt n*n lần. Vậy độ lớn của mã code trên là O(n^2)

-----
### N có thể là đầu vào thực tế do người dùng nhập hoặc kích thước của đầu vào
Cả hai phương thức này đều có thời gian chạy O(n) , mặc dù một phương thức lấy một số nguyên làm đầu vào của nó và phương thức kia lấy một mảng:
```
public static void sayHiNTimes(int n) {
    for (int i = 0; i < n; i++) {
        System.out.println("hi");
    }
}

public static void printAllItems(int[] items) {
    for (int item : items) {
        System.out.println(item);
    }
}
```
Vì vậy, đôi khi n là một số thực tế là đầu vào cho phương thức của chúng ta và trong một số trường hợp khác n là số lượng phần tử trong một mảng đầu vào (hoặc HashMap, v.v.).

-----
### Loại bỏ các hằng số
Đây là lý do tại sao O quy tắc ký hiệu lớn. Khi bạn tính toán độ phức tạp lớn của một thứ gì đó, bạn chỉ cần ném ra các hằng số. Ví dụ như:
```
public static void printAllItemsTwice(int[] items) {
    for (int item : items) {
        System.out.println(item);
    }

    // once more, with feeling
    for (int item : items) {
        System.out.println(item);
    }
}

// thuật toán này thực hiện O(2*n) nhưng chúng ta viết lại là O(n)
```

```
public static void printFirstItemThenFirstHalfThenSayHi100Times(int[] items) {
    System.out.println(items[0]);

    int middleIndex = items.length / 2;
    int index = 0;

    while (index < middleIndex) {
        System.out.println(items[index]);
        index++;
    }

    for (int i = 0; i < 100; i++) {
        System.out.println("hi");
    }
}

// thuật toán này độ lớn là O(1+n/2+100) => nhưng khi viết lại cũng bỏ hằng số đi thành O(n)
```
-----
### Loại bỏ các phép tính ít quan trọng hơn (độ lớn nhỏ hơn)
```
  public static void printAllNumbersThenAllPairSums(int[] numbers) {

    System.out.println("these are the numbers:");
    for (int number : numbers) {
        System.out.println(number);
    }

    System.out.println("and these are their sums:");
    for (int firstNumber : numbers) {
        for (int secondNumber : numbers) {
            System.out.println(firstNumber + secondNumber);
        }
    }
}
```
Độ lớn thuật toán ở đây là O(n + n^2), nhưng khi loại bỏ các phép toán nhỏ hơn là n đi thì chỉ còn O(n^2). Mặc dù các bạn có thể thấy O(n^2/2 + 100*n), nhưng khi gom lại thì độ lớn vẫn là O(n^2).
Tương tự:

* O(n^3 + 50*n^2 + 10000) có độ lớn sau khi quy đổi là O(n^3)
* O((n + 30) * (n + 5)) có độ lớn sau khi quy đổi là O(n^2)

-----
### Chúng ta thường nói về "trường hợp xấu nhất"
Thường thì trường hợp xấu nhất mang ý nghĩa hàm ý giải thuật chạy tốn nhiều đơn vị nhất. Ví dụ:
```
public static boolean contains(int[] haystack, int needle) {
    // does the haystack contain the needle?
    for (int n : haystack) {
        if (n == needle) {
            return true;
        }
    }
    return false;
}
```
Trường hợp tốt nhất trong giải thuật trên là tìm thấy số k ngay vị trí đàu mảng khi đó độ lớn giải thuật là O(1) nhưng nếu nó nằm cuối mảng thì phải duyệt hết n phần tử trong mảng => độ lớn O(n)

-----
### Độ phức tạp về không gian: ranh giới cuối cùng
Đôi khi, chúng tôi muốn tối ưu hóa để sử dụng ít bộ nhớ hơn thay vì sử dụng ít thời gian hơn. Nói về chi phí bộ nhớ (hoặc "không gian phức tạp") thì tương tự như nói về chi phí thời gian. Chúng tôi chỉ đơn giản nhìn vào tổng kích thước (tương ứng với kích thước của đầu vào) của bất kỳ biến mới nào mà chúng tôi đang phân bổ.
Các bạn nên nhớ khi nói về độ phức tạp của thuật toán không chỉ nói về thời gian thực thi mà còn về không gian quản lý bộ nhớ tương ứng với thuật toán đó nữa, sau này đi chi tiết các giải thuật và cấu trúc dữ liệu chúng ta sẽ phân tích kỹ hơn về mảng quản lý bộ nhớ.
```
public static void sayHiNTimes(int n) {
    for (int i = 0; i < n; i++) {
        System.out.println("hi");
    }
}
// mất O(1) không gian nhớ để làm việc
```
```
public static String[] arrayOfHiNTimes(int n) {
    String[] hiArray = new String[n];
    for (int i = 0; i < n; i++) {
        hiArray[i] = "hi";
    }
    return hiArray;
}
// mất O(n) không gian để làm việc
```
```
public static int getLargestItem(int[] items) {
    int largest = Integer.MIN_VALUE;
    for (int item : items) {
        if (item > largest) {
            largest = item;
        }
    }
    return largest;
}
```
Đôi khi có một sự cân bằng giữa tiết kiệm thời gian và tiết kiệm không gian, vì vậy bạn phải quyết định cái nào bạn nên ưu tiên tối ưu nó trước.

-----
**Phân tích độ lớn thuật toán thật tuyệt vời phải không nào**
Bạn nên tạo thói quen suy nghĩ về thời gian và không gian phức tạp của các thuật toán khi bạn thiết kế chúng. Chẳng bao lâu nữa, điều này sẽ trở thành bản năng lúc nào trước khi giải quyết sẽ xem tốc độ giải thuật là cái chi chi mà ông nào cũng nói , cho phép bạn xem các vấn đề tối ưu hóa và hiệu suất tiềm năng ngay lập tức. Phân tích tiệm cận là một công cụ mạnh mẽ, nhưng phải sử dụng nó một cách khôn khéo nhất để đạt hiểu quả trong lập trình.

**Big O bỏ qua các hằng số, nhưng đôi khi các hằng số lại quan trọng**. Nếu chúng ta có một kịch bản mà phải mất 5 giờ để chạy, một tối ưu hóa chia thời gian chạy bằng 5 có thể không ảnh hưởng đến O lớn, nhưng nó vẫn giúp bạn tiết kiệm 4 giờ chờ đợi. Ý là giải thuật mất 5 giờ nhưng khi rút gọn ông phân tích ổng bảo mất O(n) thôi vậy ta bỏ mất 4 giờ chờ rồi.

Cẩn thận với tối ưu hóa sớm. Đôi khi, tối ưu hóa thời gian chạy code hoặc không gian bộ nhớ ảnh hưởng tiêu cực đến khả năng đọc hoặc thời gian mã hóa. Đối với một startup trẻ, điều quan trọng hơn là code sao cho đáp ứng yêu cầu nhanh theo deadline hoặc dễ hiểu dễ bảo trì sau này, ngay cả khi điều này có nghĩa là ít tốn thời gian và không gian hiệu quả hơn có thể.

Nhưng điều đó không có nghĩa là các công ty khởi nghiệp không quan tâm đến phân tích độ lớn thuật toán. Một kỹ sư lập trình (startup hoặc công ty lớn) biết cách để đạt được sự cân bằng hợp lý giữa thời gian chạy, không gian bộ nhớ, thời gian thực hiện, bảo trì và khả năng đọc mã nhanh nhất có thể.

Bạn nên phát triển kỹ năng để xem tối ưu hóa thời gian và không gian thuật toán, cũng như sự khôn khéo để lựa chọn giải pháp, giải thuật nào tối ưu nhất cho vấn đề. Cảm ơn mọi người đã theo dõi bài viết à không bài dịch và có chỉnh sửa theo kiến thức vf suy nghĩ của mình.

* Bài gốc tại địa chỉ [https://www.interviewcake.com/article/java/big-o-notation-time-and-space-complexity](https://www.interviewcake.com/article/java/big-o-notation-time-and-space-complexity) mọi người có thể tham khảo nhé!
* Bài dịch em viết trên trang này: [https://gociter.wordpress.com/2018/10/29/ky-hieu-big-o-su-dung-toan-hoc-de-do-luong-hieu-qua-thuat-toan/](https://gociter.wordpress.com/2018/10/29/ky-hieu-big-o-su-dung-toan-hoc-de-do-luong-hieu-qua-thuat-toan/)