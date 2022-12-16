![](https://images.viblo.asia/405a1985-cfec-49b1-bf86-54d1e2994114.png)
Các lập trình viên thường xuyên cần sắp xếp các phần tử từ cơ sở dữ liệu vào một collection, array, or map. Trong Java, chúng ta có thể thực hiện bất kỳ thuật toán sắp xếp nào chúng ta muốn với bất kỳ loại nào. Sử dụng Comparable interface và compareTo(), chúng ta có thể sắp xếp bằng thứ tự chữ cái, độ dài chuỗi, thứ tự chữ cái ngược hoặc số. Comparator interface cho phép chúng ta làm tương tự nhưng theo cách linh hoạt hơn.

Bất cứ điều gì chúng ta muốn làm, chúng ta chỉ cần biết cách thực hiện logic sắp xếp chính xác cho interface và kiểu đã cho.
# Sắp xếp danh sách Java với một đối tượng tùy chỉnh
Trong ví dụ đầu tiên này, chúng tôi triển khai Comparable interface trong lớp Simpson, sử dụng Simpson theo kiểu generic:
```
class Simpson implements Comparable<Simpson> {
    String name;

    Simpson(String name) {
        this.name = name;
    }

    @Override
    public int compareTo(Simpson simpson) {
        return this.name.compareTo(simpson.name);
    }
}

public class SimpsonSorting {

     public static void main(String... sortingWithList) {
        List<SimpsonCharacter> simpsons = new ArrayList<>();
        simpsons.add(new SimpsonCharacter("Homer "));
        simpsons.add(new SimpsonCharacter("Marge "));
        simpsons.add(new SimpsonCharacter("Bart "));
        simpsons.add(new SimpsonCharacter("Lisa "));

        Collections.sort(simpsons);
        simpsons.stream().map(s -> s.name).forEach(System.out::print);

        Collections.reverse(simpsons);
        simpsons.stream().forEach(System.out::print);
    }

}
```
Lưu ý rằng chúng tôi đã ghi đè phương thức compareTo() và truyền vào một đối tượng Simpson khác. Chúng tôi cũng đã ghi đè phương thức toString() để làm cho ví dụ dễ đọc hơn.
# Phương thức compareTo()
Phương thức compareTo() so sánh một đối tượng đã cho hoặc đối tượng hiện tại với một đối tượng đã chỉ định để xác định thứ tự của các đối tượng. Dưới đây, một cái nhìn nhanh về cách so sánh hoạt động:
![](https://images.viblo.asia/ef62b3d4-528c-4168-85e1-c8401f4eabe3.png)
Chúng ta chỉ có thể sử dụng các lớp có thể so sánh với phương thức sort (). Nếu chúng tôi cố gắng pass một Simpson không implement Comparable, chúng tôi sẽ nhận được lỗi biên dịch.
Phương thức sort () sử dụng tính đa hình bằng cách chuyển bất kỳ đối tượng nào có thể so sánh được. Các đối tượng sau đó sẽ được sắp xếp như mong đợi.
Outpu từ đoạn code trên là:
```
Bart Homer Lisa Marge 
```
Nếu chúng ta muốn đảo ngược thứ tự, chúng ta có thể trao đổi sort () để reverse() từ:
```
Collections.sort(simpsons);
```
to
```
Collections.reverse(simpsons);
```
Ouput là:
```
Marge Lisa Homer Bart 
```
# Sắp xếp đối với mảng trong java
Trong Java, chúng ta có thể sắp xếp một mảng với bất kỳ loại nào chúng ta muốn miễn là nó implements the Comparable interface. Dưới đây là một ví dụ:
```
public class ArraySorting {

    public static void main(String... moeTavern) {
        int[] moesPints = new int[] {9, 8, 7, 6, 1};

        Arrays.sort(moesPints);

        Arrays.stream(moesPints).forEach(System.out::print);

        Simpson[] simpsons = new Simpson[]{new Simpson("Lisa"), new Simpson("Homer")};

        Arrays.sort(simpsons);
        Arrays.stream(simpsons).forEach(System.out::println);
    }
}
```
Trong lời gọi sort () đầu tiên, mảng được sắp xếp thành:
```
1 6 7 8 9
```
Trong lời gọi sort () thứ hai, nó được sắp xếp thành:
```
Homer Lisa
```
Hãy nhớ rằng các đối tượng tùy chỉnh phải triển khai So sánh để được sắp xếp, ngay cả dưới dạng một mảng.
# Sắp xếp một Map với TreeMap
API Java bao gồm nhiều lớp để hỗ trợ sắp xếp, bao gồm cả TreeMap. Trong ví dụ dưới đây, chúng tôi sử dụng TreeMap để sắp xếp các keys ở trong Map.
```
public class TreeMapExample {

    public static void main(String... barney) {
        Map<SimpsonCharacter, String> simpsonsCharacters = new TreeMap<>();
        simpsonsCharacters.put(new SimpsonCharacter("Moe"), "shotgun");
        simpsonsCharacters.put(new SimpsonCharacter("Lenny"), "Carl");
        simpsonsCharacters.put(new SimpsonCharacter("Homer"), "television");
        simpsonsCharacters.put(new SimpsonCharacter("Barney"), "beer");

        System.out.println(simpsonsCharacters);
    }
}
```
TreeMap sử dụng phương thức compareTo() được thực hiện bởi Comparable interface. Mỗi phần tử trong Map được sắp xếp theo keys của nó. Trong trường hợp này, đầu ra sẽ là:
```
Barney=beer, Homer=television, Lenny=Carl, Moe=shotgun
```
# Sắp xếp một Set với TreeSet
Set interface chịu trách nhiệm lưu trữ các giá trị duy nhất, nhưng khi chúng tôi sử dụng triển khai TreeSet, các phần tử được chèn sẽ được tự động sắp xếp khi chúng tôi thêm chúng:
```
public class TreeSetExample {

    public static void main(String... barney) {
        Set<SimpsonCharacter> simpsonsCharacters = new TreeSet<>();
        simpsonsCharacters.add(new SimpsonCharacter("Moe"));
        simpsonsCharacters.add(new SimpsonCharacter("Lenny"));
        simpsonsCharacters.add(new SimpsonCharacter("Homer"));
        simpsonsCharacters.add(new SimpsonCharacter("Barney"));

        System.out.println(simpsonsCharacters);
    }
}
```
Output:
```
Barney, Homer, Lenny, Moe
```
# Sắp xếp với Comparator
Điều gì xảy ra nếu chúng tôi không muốn sử dụng cùng một phương thức compareTo () từ lớp POJO? Chúng ta có thể ghi đè phương thức Comparable để sử dụng logic khác không? Dưới đây là một ví dụ:
```
public class BadExampleOfComparable {

    public static void main(String... args) {
        List<SimpsonCharacter> characters = new ArrayList<>();

        SimpsonCharacter homer = new SimpsonCharacter("Homer") {
            @Override
            public int compareTo(SimpsonCharacter simpson) {
                return this.name.length() - (simpson.name.length());
            }
        };

        SimpsonCharacter moe = new SimpsonCharacter("Moe") {
            @Override
            public int compareTo(SimpsonCharacter simpson) {
                return this.name.length() - (simpson.name.length());
            }
        };

        characters.add(homer);
        characters.add(moe);

        Collections.sort(characters);

        System.out.println(characters);
    }

}
```
Như bạn có thể thấy, mã này rất phức tạp và bao gồm rất nhiều sự lặp lại. Chúng tôi đã phải ghi đè phương thức compareTo () hai lần cho cùng một logic. Nếu có nhiều yếu tố hơn, chúng ta sẽ phải sao chép logic cho từng đối tượng.
May mắn thay, chúng ta có Comparator interface cho phép chúng ta tách logic compareTo ()  logic khỏi các lớp Java. Xem xét ví dụ tương tự ở trên được viết lại bằng Comparator:
```
public class GoodExampleOfComparator {

    public static void main(String... args) {
        List<SimpsonCharacter> characters = new ArrayList<>();

        SimpsonCharacter homer = new SimpsonCharacter("Homer");
        SimpsonCharacter moe = new SimpsonCharacter("Moe");

        characters.add(homer);
        characters.add(moe);

        Collections.sort(characters, (Comparator.<SimpsonCharacter>
                        comparingInt(character1 -> character1.name.length())
                        .thenComparingInt(character2 -> character2.name.length())));

        System.out.println(characters);
    }
}
```
Những ví dụ này chứng minh sự khác biệt chính giữa Comparable và Comparator.

Sử dụng Comparable khi có một so sánh mặc định cho đối tượng của bạn. Sử dụng Comparator khi bạn cần làm việc xung quanh một so sánh compareTo() hiện có hoặc khi bạn cần sử dụng logic cụ thể theo cách linh hoạt hơn. Comparator tách logic sắp xếp khỏi đối tượng của bạn và chứa  compareTo() logic trong phương thức sort () của bạn.
# Sử dụng Comparator với lambda expressions
 Trong Comparator interface, chúng ta có thể sử dụng các biểu thức lambda để đơn giản hóa và làm cho mã dễ đọc hơn. Ví dụ: chúng ta có thể thay đổi điều này:
```
Collections.sort(marvel, new Comparator<String>() {
            @Override
            public int compare(String hero1, String hero2) {
                return hero1.compareTo(hero2);
            }
        });
```

to 

```
Collections.sort(marvel, (m1, m2) -> m1.compareTo(m2));
```
Code ngắn hơn và kết quả tương tự!
Output:
```
Cyclops SpiderMan Wolverine Xavier 
```