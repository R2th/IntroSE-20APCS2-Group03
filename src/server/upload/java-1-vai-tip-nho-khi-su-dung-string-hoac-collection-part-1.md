![](https://images.viblo.asia/b236b3c5-f71b-4608-94eb-5c0472b5634d.png)
Hello các bạn, hôm nay mình sẽ chia sẻ về mẹo check String null hay full space một cách tiện lợi 

Mình sẽ sử dụng thư viện Lớp StringUtils download file jar để import vào thư viện tại ([link](https://commons.apache.org/proper/commons-lang/download_lang.cgi))

Nếu các bạn dùng maven project thì dễ dàng hơn, chỉ cần import ở file pom.xml
```
<!-- https://mvnrepository.com/artifact/org.apache.commons/commons-lang3 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.7</version>
</dependency>
```

Nếu các bạn muốn check String có null / full space/ empty không thì thường check kiểu thủ công sẽ như này
```java
package test;

import org.apache.commons.lang3.StringUtils;

public class Main {

    public static void main(String[] args) {
        String a = null;
        String b = "";
        String c = "              ";

        System.out.println("manual result: " + "a: " + validateStringManual(a) + " b: " + validateStringManual(b) + " c: " + validateStringManual(c));

    }

    private static Boolean validateStringManual(String str) {
        if (length(str) == 0 || isFullspace(str)) {
            return true;
        }
        return false;
    }

    public static int length(CharSequence cs) {
        return cs == null ? 0 : cs.length();
    }

    public static Boolean isFullspace(CharSequence cs) {
        int strLen = length(cs);
        for (int i = 0; i < strLen; ++i) {
            if (!Character.isWhitespace(cs.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}

```

**Output**
```
manual result: a: true b: true c: true
```

Rất dài và loằng ngoằng đúng không nào

Giờ nếu dùng thư viện thì ta chỉ cần làm như này
```java
package test;

import org.apache.commons.lang3.StringUtils;

public class Main {

    public static void main(String[] args) {
        String a = null;
        String b = "";
        String c = "              ";
        
        System.out.println("StringUtils result: " + "a: " + StringUtils.isBlank(a) + " b: " + StringUtils.isBlank(a) + " c: " + StringUtils.isBlank(c));

    }
 }
```

**Output**
```
StringUtils result: a: true b: true c: true
```

Vẫn như vậy, rất tiện lợi phải không nào?

Còn nếu bạn không muốn check fullspace thì dùng cách sau:
```java
package test;

import org.apache.commons.lang3.StringUtils;

public class Main {

    public static void main(String[] args) {
        String a = null;
        String b = "";
        String c = "              ";

        System.out.println("StringUtils result: " + "a: " + StringUtils.isEmpty(a) + " b: " + StringUtils.isEmpty(a) + " c: " + StringUtils.isEmpty(c));

    }

}
```

**Output**

```
StringUtils result: a: true b: true c: false
```

StringUtils còn rất nhiều thư viện khác, các bạn có thể check và sử dụng theo mục đích của mình Ví dụ như isNotBlank(), isNotEmpty() ...

**Giờ chuyển sang validate Collections trong java**

Maven project thì thêm đoạn này vào file pom.xml: 
```
<!-- https://mvnrepository.com/artifact/org.apache.commons/commons-collections4 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-collections4</artifactId>
    <version>4.1</version>
</dependency>

```

Còn project java thường thì import file jar download tại [link](https://commons.apache.org/proper/commons-lang/download_lang.cgi)

Ví dụ về check xem Collection đó có empty hay null hay không
```java
package test;

import org.apache.commons.collections4.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        List<String> list1 = null;
        List<String> list2 = new ArrayList<>();
        List<String> list3 = new ArrayList<>();
        list3.add("xxx");
        System.out.println("result: " + "list1: " + CollectionUtils.isEmpty(list1));
        System.out.println("result: " + "list2: " + CollectionUtils.isEmpty(list2));
        System.out.println("result: " + "list3: " + CollectionUtils.isEmpty(list3));

    }
}

```

**Output**
```
result: list1: true
result: list2: true
result: list3: false
```

Đây là chỉ là 1 trong các hàm của lớp CollectionUtils, tùy vào mục đích sử dụng các bạn lấy ra để dùng nhé

Cám ơn các bạn đã đọc hết bài của mình, có gì sai sót vui lòng comment để mình sửa ạ

Fanpage của mình: https://www.facebook.com/morethanacoder

Utube của mình: [thanglaptrinh](https://www.youtube.com/channel/UChTnprALzFahmO1ybcdseRg)