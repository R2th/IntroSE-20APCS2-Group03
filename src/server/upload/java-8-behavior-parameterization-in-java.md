Chào các bạn, hôm nay mình sẽ giới thiệu mọi người về Behavior Parameterization là gì và được implement trong java như thế nào thông qua ví dụ vô cùng đơn giản. Để dễ hiểu mình sẽ dùng cú pháp java 8 để thể hiện các ví dụ sau.
## 1. Đặt vấn đề (Problem).
Trong một buổi phỏng vấn, nhà tuyển dụng cho đề bài sau: Bạn có một danh sách các số nguyên và họ muốn bạn in ra một danh sách mới mà trong đó chỉ gồm các phần tử chẵn, Bạn sẽ hiện thực code đó như thế nào.
Nhanh chóng, bạn bắt tay vào code ngay mà không suy nghĩ nhiều, được kết quả như sau:
### Tìm số chẵn
```java
public class BehaviorParameterization {
    public static void main(String[] args){
        List<Integer> numbers = Arrays.asList(12, 9, 13, 4, 6, 2, 4, 12, 15); //List.of(12, 9, 13, 4, 6, 2, 4, 12, 15) - ( >=Java 9)
        List evenNumbers = collectEvenNumbersToList(numbers);
        System.out.println(evenNumbers);
    }
    
    public static List<Integer> collectEvenNumbersToList(List<Integer> numbers){
          return numbers.stream()
                .filter(x -> x % 2 == 0)              
                .collect(Collectors.toList());
    }
}
```
Okay, tuyệt vời !!! quá dễ xơi đúng không ?. Nhưng bỗng nhà tuyển dụng lại bắt bạn in các phần tử lẻ. Bạn lại cặm cụi ngồi viết thêm vào 1 hàm.
### Tìm số lẻ
```java
public class BehaviorParameterization {
    public static void main(String[] args){
        List<Integer> numbers = Arrays.asList(12, 9, 13, 4, 6, 2, 4, 12, 15); //List.of(12, 9, 13, 4, 6, 2, 4, 12, 15) - ( >=Java 9)
        List evenNumbers = collectEvenNumbersToList(numbers);
        System.out.println(evenNumbers);
        
        List oddNumbers = collectOddNumbersToList(numbers);
        System.out.println(oddNumbers);
    }
    
    public static List<Integer> collectEvenNumbersToList(List<Integer> numbers){
          return numbers.stream()
                .filter(x -> x % 2 == 0) // chia hết cho 2             
                .collect(Collectors.toList());
    }
     // Đoạn method mới thêm vào
     public static List<Integer> collectOddNumbersToList(List<Integer> numbers){
          return numbers.stream()
                .filter(x -> x % 2 != 0) // không chia hết cho 2
                .collect(Collectors.toList());
    }
}
```
### Vấn đề xảy ra
Nộp bài. Nhưng bạn lại bị bắt tìm các phần tử chia hết cho 3, rồi cho 5, nhỏ hơn 10, lớn hơn 1,.... Cứ mỗi lần yêu cầu mới, bạn lại phải viết một method mới. Trong khi các method ngoại trừ điều kiện (ở dòng filter), thì chúng y đúc nhau. Hãy nhớ đến quy tắc DRY (don't repeat yourself) và chúng ta đang vi phạm nó khi viết lặp lại các dòng code y như nhau. 
Okay, có phải chúng ta chỉ cần thay đổi điều kiện thôi nhỉ? -> điều kiện? -> thay đổi? -> biến? -> có thể hô biến điều kiện thành một parameter truyền vào hàm không?.
## 2. Hướng giải quyết (Solution).
Bạn chỉ cần thay đổi điều kiện tìm kiếm và các đoạn code còn lại sẽ được giữ nguyên. Hô biến điều kiện thành parameter truyền vào nào.
### Solution method
```java
public static List<Integer> doSolution(List<Integer> numbers, Predicate<? super Integer> predicate){
       return numbers.stream()
           .filter(predicate) // quăng cái điều kiện vào đây
           .collect(Collectors.toList());
}
```
Ở đây, ta đã dùng đối tượng [Predicate](https://***) (Predicate là một [Functional Inteface](https://***)) để làm tham số truyền vào. Bây giờ chúng ta thay đổi đoạn code tìm số chẳn và số lẻ ban đầu nhé. Gọi hàm doSolution() rồi đưa điều kiện (có thể dùng [biểu thức lambda](https://***) cho ngắn gọn code) của bạn vào tham số predicate.
### Ta có thể thực thi nhiều điều kiện truyền vào.
```java
public class BehaviorParameterization {
    public static void main(String[] args){
        List<Integer> numbers = Arrays.asList(12, 9, 13, 4, 6, 2, 4, 12, 15); //List.of(12, 9, 13, 4, 6, 2, 4, 12, 15) - ( >=Java 9)
        List evenNumbers = doSolution(numbers, x -> x % 2 == 0);
        System.out.println(evenNumbers);
        
        List oddNumbers = doSolution(numbers, x -> x % 2 != 0); // use Lambda Expression
        System.out.println(oddNumbers);
        
/*   List oddNumbers = doSolution(numbers,new Predicate<Integer>() {
            @Override
            public boolean test(Integer number) {
                return number % 2 != 0; // Ghi đè phương thức test() của inteface Predicate bằng logic điều kiện của bạn.
            }
        });*/
        
     //  List divisibleBy3Numbers = doSolution(numbers, x -> x % 3 == 0); Chia hết cho 3
     //  System.out.println(divisibleBy3Numbers);
        
     //  List lessThan12Numbers = doSolution(numbers, x -> x < 12); Nhỏ hơn 12
     //  System.out.println(lessThan12Numbers);
        
     //  List greaterThan10Numbers = doSolution(numbers, x -> x > 10); Lớn hơn 10
      //  System.out.println(greaterThan10Numbers);
    }
    
   public static List<Integer> doSolution(List<Integer> numbers, Predicate<? super Integer> predicate){
       return numbers.stream()
                        .filter(predicate) // quăng cái điều kiện vào đây
                        .collect(Collectors.toList());
    }
}
```
## 3. Kết
Đây được gọi là Behavior Parameterization, mình đã minh họa bằng một ví dụ rất đơn giản. Các bạn có thể tìm và đọc thêm nhiều ví dụ phức tạp hơn. Mong sau bài viết này, mọi người có thể hiểu và nắm được bản chất Behavior Parameterization. Thanks for reading <3.