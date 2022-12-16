Như chúng ta đã biết Set là một tập hợp các phần tử không trùng lặp, thế nhưng bạn có bao giờ suy nghĩ đến làm thế nào để nó làm được điều này không?

Nếu mỗi lần thêm phần tử vào mà nó đi duyệt để kiểm tra thì hiệu năng sẽ rất là tệ phải không nào? Thế nhưng các giáo sư đi khắp 5 châu để viết ra những collection này không có suy nghĩ đơn giản như chúng ta đâu nhé. Cùng tìm hiểu xem nó hoạt động như thế nào để đảm bảo cả về bản chất của Set và hiệu năng nhé.
## Set/HashSet hoạt động như thế nào?
Hãy xem mã nguồn triển khai bên trong HashSet.
```
private transient HashMap<E,Object> map;
 
//Constructor - 1
 
public HashSet()
{
        //Creating internally backing HashMap object
        map = new HashMap<>();          
}
 
//Constructor - 2
 
public HashSet(Collection<? extends E> c)
{
        //Creating internally backing HashMap object
        map = new HashMap<>(Math.max((int) (c.size()/.75f) + 1, 16));     
        addAll(c);
}
 
//Constructor - 3
 
public HashSet(int initialCapacity, float loadFactor)
{
        //Creating internally backing HashMap object
        map = new HashMap<>(initialCapacity, loadFactor); 
}
 
//Constructor - 4
 
public HashSet(int initialCapacity)
{
        //Creating internally backing HashMap object
        map = new HashMap<>(initialCapacity);          
}
```

Mỗi constructor bên trong HashSet đều khởi tạo một HashMap object, như vậy bước đầu chúng ta có thể thấy bên trong HashSet sử dụng HashMap để triển khai các tính năng.
Làm thế nào để tránh phần tử trùng lặp
Làm thế nào để Set đảm bảo tính duy nhất của các phần tử nhỉ? Có liên quan gì đến HashMap không ta? Như chúng ta đã biết rằng mỗi key trong HashMap là duy nhất, vận dụng tính chất này mỗi phần tử trong HashSet sẽ là một key trong HashMap với một value là một hằng số PRESENT.

```

// Dummy value to associate with an Object in the backing Map
private static final Object PRESENT = new Object();
```

Hãy xem hàm add() của HashSet.
```
public boolean add(E e)
{
        return map.put(e, PRESENT)==null;
}
```

Từ đoạn code trên có thể thấy rằng bên trong HashSet#add() sử dụng HashMap#put() method với key là phần tử được thêm vào HashSet và value là một hằng số PRESENT.

HashMap#put method trả về phần value khi của key khi nó đã tồn tại trước đó hoặc trả về null khi chưa tồn tại. Vì vậy nếu HashMap.put() trả về null nghĩa là thêm phần tử thành công.
```
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        //Creating One HashSet object

        HashSet<String> set = new HashSet<>();

        //Adding elements to HashSet

        set.add("RED");

        set.add("GREEN");

        set.add("BLUE");

        set.add("PINK");

        System.out.println(set);

        set.add("RED");

        System.out.println(set);

        set.remove("RED");
        System.out.println(set);
    }
}
```

![](https://images.viblo.asia/dfc9b02c-7353-4b4e-b28a-5ca6c5c37c68.png)

Hầu hết mọi hoạt động trên HashSet đều quy về sử dụng các method của HashMap để triển khai. Các bạn có thể xem hình ở trên để có cái nhìn tổng quan về HashSet.

Nguồn tham khảo
[https://shareprogramming.net/lam-the-nao-de-set-hashset-dam-bao-cac-phan-tu-khong-trung-lap/](https://shareprogramming.net/lam-the-nao-de-set-hashset-dam-bao-cac-phan-tu-khong-trung-lap/)