Thông thường, có 5 cách để iterate một Map trong Java. Trong bài viết này, chúng ta hãy cùng tìm hiểu về 5 phương pháp ấy với những điểm mạnh và điểm yếu của từng phương pháp.
Trước hết, chúng ta cần phải làm rõ rằng Map trong Java không thể được iterate thông qua iterator, vì Map không kế thừa Collection. Ngoài ra, chúng ta còn phải tìm hiểu thêm một chút về interface Map.Entry<K, V> .
Do tất cả các loại map trong Java implement interface Map, chúng ta có thể sử dụng tất cả những cách làm dưới đây cho các loại map ấy (HashMap, TreeMap, LinkedHashMap, Hashtable, v.v...)


**1. Iterate Map.entrySet () bằng vòng lặp For-Each:**


Phương thức Map.entrySet () trả về một collection view (Set <Map.Entry <K, V >>) của các entry tồn tại trong map. Vì vậy chúng ta có thể iterate các cặp key-value bằng hai phương phức getKey() và getValue() trong Map.Entry<K, V>. Cách làm này là cách phổ biến nhất và là cách tối ưu nếu bạn cần sử dụng cả key và value của map trong vòng lặp.


```
//Chuong trinh Java vi du cho cach iterate 
// cac entry Map.entrySet() bang vong lap For-Each
  
import java.util.Map; 
import java.util.HashMap; 
  
class IterationDemo  
{ 
    public static void main(String[] arg) 
    { 
        Map<String,String> gfg = new HashMap<String,String>(); 
      
        // Nhap cap name/url 
        gfg.put("GFG", "geeksforgeeks.org"); 
        gfg.put("Practice", "practice.geeksforgeeks.org"); 
        gfg.put("Code", "code.geeksforgeeks.org"); 
        gfg.put("Quiz", "quiz.geeksforgeeks.org"); 
          
        // dung for-each de iterate Map.entrySet() 
        for (Map.Entry<String,String> entry : gfg.entrySet())  
            System.out.println("Key = " + entry.getKey() + 
                             ", Value = " + entry.getValue()); 
    } 
} 
```

Output:
Key = Quiz, Value = quiz.geeksforgeeks.org

Key = Practice, Value = practice.geeksforgeeks.org

Key = GFG, Value = geeksforgeeks.org

Key = Code, Value = code.geeksforgeeks.org



**2. Iterate key hoặc value thông qua phương thức keySet() và values()**

Phương thức Map.keySet() trả về một set view của các key tồn tại trong map, còn Map.values() method trả về một collection view các values tồn tại trong map. Vì vậy, nếu bạn chỉ cần sử dụng hoặc key, hoặc value trong map thì bạn có thể iterate bằng keySet() hoặc values(). Xem ví dụ ở chương trình Java dưới đây.

```
//Chuong trinh Java vi du cho cach iterate map
// su dung keySet() va values() 
 
import java.util.Map; 
import java.util.HashMap; 
  
class IterationDemo  
{ 
    public static void main(String[] arg) 
    { 
        Map<String,String> gfg = new HashMap<String,String>(); 
      
        // Nhap cap name/url 
        gfg.put("GFG", "geeksforgeeks.org"); 
        gfg.put("Practice", "practice.geeksforgeeks.org"); 
        gfg.put("Code", "code.geeksforgeeks.org"); 
        gfg.put("Quiz", "quiz.geeksforgeeks.org"); 
          
        // using keySet() for iteration over keys 
        for (String name : gfg.keySet())  
            System.out.println("key: " + name); 
          
        // using values() for iteration over keys 
        for (String url : gfg.values())  
            System.out.println("value: " + url); 
    } 
} 
```

Output:

key: Quiz

key: Practice

key: GFG

key: Code

value: quiz.geeksforgeeks.org

value: practice.geeksforgeeks.org

value: geeksforgeeks.org

value: code.geeksforgeeks.org



**3. Iterate bằng iterator Map.Entry<K, V>**

Phương pháp này có phần giống với phương pháp đầu tiên. Trong phương thức đầu tiên, chúng ta sử dụng vòng lặp for-each với Map.Entry <K, V>, nhưng trong phương pháp này chúng ta sử dụng iterator. Sử dụng iterator với Map.Entry <K, V> có lợi ích là chúng ta có thể xóa các entry trong map trong vòng lặp bằng cách gọi phương thức iterator.remove (). Ví dụ:


```
//Chuong trinh Java vi du cho cach iterate map
// bang iterator
  
import java.util.Map; 
import java.util.HashMap; 
import java.util.Iterator; 
  
class IterationDemo  
{ 
    public static void main(String[] arg) 
    { 
        Map<String,String> gfg = new HashMap<String,String>(); 
      
        // Nhap cap name/url 
        gfg.put("GFG", "geeksforgeeks.org"); 
        gfg.put("Practice", "practice.geeksforgeeks.org"); 
        gfg.put("Code", "code.geeksforgeeks.org"); 
        gfg.put("Quiz", "quiz.geeksforgeeks.org"); 
          
        // Dung iterator
        Iterator<Map.Entry<String, String>> itr = gfg.entrySet().iterator(); 
          
        while(itr.hasNext()) 
        { 
             Map.Entry<String, String> entry = itr.next(); 
             System.out.println("Key = " + entry.getKey() +  
                                 ", Value = " + entry.getValue()); 
        } 
    } 
} 
```

Output :

Key = Quiz, Value = quiz.geeksforgeeks.org

Key = Practice, Value = practice.geeksforgeeks.org

Key = GFG, Value = geeksforgeeks.org

Key = Code, Value = code.geeksforgeeks.org



**4. Using forEach(action) method :**

Trong Java 8, bạn có thể iterate map bằng phương thức Map.forEach(action) và sử dụng lambda expression. Phương pháp này rất gọn code và nhanh.

```
//Chuong trinh Java vi du cho cach iterate map
// bang phuong thuc forEach(action) 

import java.util.Map; 
import java.util.HashMap; 
  
class IterationDemo  
{ 
    public static void main(String[] arg) 
    { 
        Map<String,String> gfg = new HashMap<String,String>(); 
      
        // Nhap cap name/url
        gfg.put("GFG", "geeksforgeeks.org"); 
        gfg.put("Practice", "practice.geeksforgeeks.org"); 
        gfg.put("Code", "code.geeksforgeeks.org"); 
        gfg.put("Quiz", "quiz.geeksforgeeks.org"); 
          
        // forEach(action) method to iterate map 
        gfg.forEach((k,v) -> System.out.println("Key = "
                + k + ", Value = " + v)); 
          
    } 
} 
```

Output :

Key = Quiz, Value = quiz.geeksforgeeks.org

Key = Practice, Value = practice.geeksforgeeks.org

Key = GFG, Value = geeksforgeeks.org

Key = Code, Value = code.geeksforgeeks.org



**5. Iterate key và tìm value (không hiệu quả)**

Ở phương pháp này trước tiên chúng ta lặp các key (sử dụng phương thức Map.keySet ()) và sau đó tìm kiếm value (sử dụng phương thức Map.get (key)) cho mỗi key. Phương pháp này không được sử dụng trong thực tế vì  khá chậm và không hiệu quả vì việc lấy value của một key có thể khá tốn thời gian.

```
//Chuong trinh Java vi du cho cach iterate map
// bang key va tim value

import java.util.Map; 
import java.util.HashMap; 
  
class IterationDemo  
{ 
    public static void main(String[] arg) 
    { 
        Map<String,String> gfg = new HashMap<String,String>(); 
      
        // enter name/url pair 
        gfg.put("GFG", "geeksforgeeks.org"); 
        gfg.put("Practice", "practice.geeksforgeeks.org"); 
        gfg.put("Code", "code.geeksforgeeks.org"); 
        gfg.put("Quiz", "quiz.geeksforgeeks.org"); 
          
        // Chay vong lap key
        for (String name : gfg.keySet())  
        { 
            // Tim gia tri
            String url = gfg.get(name); 
            System.out.println("Key = " + name + ", Value = " + url); 
        } 
    } 
} 
```

Output :

Key = Quiz, Value = quiz.geeksforgeeks.org

Key = Practice, Value = practice.geeksforgeeks.org

Key = GFG, Value = geeksforgeeks.org

Key = Code, Value = code.geeksforgeeks.org


Nguồn: geeksforgeeks