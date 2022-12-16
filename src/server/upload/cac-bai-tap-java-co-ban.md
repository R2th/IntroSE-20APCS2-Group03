## Bài 1: Nhập ký tự từ bàn phím

```java
import java.io.IOException;
import java.lang.*;

public class Main {

  public static void main(String[] args) {
    char ch = '';
    try {
        ch = (char) System.in.read();
    } catch (IOException e) {
        System.out.println("Nhập lỗi!");
    }
    System.out.println("Ky tu vua nhap:" + ch);
  }
}
```

<div class="result">
  <p>a</p>
  <p>Ky tu vua nhap:a</p>
</div>

## Bài 2: Nhập số từ bàn phím

```java
import java.io.*;

public class Main {

  public static void main(String[] args) {
    int n = 0;
    try {
      BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
      String s;
      s = in.readLine();
      n = Integer.parseInt(s);
    } catch (Exception e) {
        System.out.println("Nhập dữ liệu bị lỗi !");
    }
    System.out.println("Bạn vừa nhập số:" + n);
  }
}

```

<div class="result">
  <p>5</p>
  <p>Bạn vừa nhập số:5</p>
</div>

## Bài 3: Nhập và xuất giá trị các phần tử của một mảng các số nguyên.

```java
public class Main {

  public static void main(String[] args) {
    int arrInt[] = new int[10];
    int i;
    for (i = 0; i < 10; i = i + 1)
      arrInt[i] = i;
    for (i = 0; i < 10; i = i + 1)
        System.out.println("This is arrInt[" + i +"]: " + arrInt[i]);
  }
}

```

<div class="result">
  <p>This is arrInt[0]: 0</p>
  <p>This is arrInt[1]: 1</p>
  <p>This is arrInt[2]: 2</p>
  <p>This is arrInt[3]: 3</p>
  <p>This is arrInt[4]: 4</p>
  <p>This is arrInt[5]: 5</p>
  <p>This is arrInt[6]: 6</p>
  <p>This is arrInt[7]: 7</p>
  <p>This is arrInt[8]: 8</p>
  <p>This is arrInt[9]: 9</p>
</div>

## Bài 4: Tìm phần tử có giá trị nhỏ nhất (Min) và lớn nhất (Max) trong một mảng.

```java
public class Main {

  public static void main(String[] args) {
    int nums[] = new int[10];
    int min, max;
    nums[0] = 99;
    nums[1] = -10;
    nums[2] = 100123;
    nums[3] = 18;
    nums[4] = -978;
    nums[5] = 5623;
    nums[6] = 463;
    nums[7] = -9;
    nums[8] = 287;
    nums[9] = 49;
    min = max = nums[0];
    for (int i = 1; i < 10; i++) {
        if (nums[i] < min) min = nums[i];
        if (nums[i] > max) max = nums[i];
    }
    System.out.println("min and max: " + min + " " + max);
  }
}
```

<div class="result">
  <p>min and max: -978 100123</p>
</div>

```java
public class Main {

  public static void main(String[] args) {
    int nums[] = {99, -10, 100123, 18, -978, 5623, 463, -9, 287, 49};
    int min, max;
    min = max = nums[0];
    for (int i = 1; i < 10; i++) {
        if (nums[i] < min) min = nums[i];
        if (nums[i] > max) max = nums[i];
    }
    System.out.println("Min and max: " + min + " " + max);
  }
}
```

<div class="result">
  <p>Min and max: -978 100123</p>
</div>

## Bài 5: chương trình minh họa một lỗi tham chiếu đến phần tử bên ngoài (vuợt quá) kích thước mảng.

```java
public class Main {

  public static void main(String[] args) {
    int sample[] = new int[10];
    int i;
    for(i = 0; i < 100; i = i+1)
        sample[i] = i;
  }
}
```

<div class="result">
  <p style="color: red;">Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 10	at com.company.Main.main(Main.java:10)</p>
</div>

## Bài 6: Sắp xếp mảng dùng phương pháp sắp xếp nổi bọt (Bubble Sort)

```java
public class Main {

  public static void main(String[] args) {
    int nums[] = {99, -10, 100123, 18, -978, 5623, 463, -9, 287, 49};
    int a, b, t;
    int size;
    size = 10; // number of elements to sort
    // display original array
    System.out.print("Original array is:");
    for (int i = 0; i < size; i++)
      System.out.print(" " + nums[i]);
    System.out.println();
    // This is the Bubble sort.
    for (a = 1; a < size; a++)
      for (b = size - 1; b >= a; b--) {
        if (nums[b - 1] > nums[b]) { // if out of order
          // Exchange elements
          t = nums[b - 1];
          nums[b - 1] = nums[b];
          nums[b] = t;
        }
      }
    // display sorted array
    System.out.print("Sorted array is:");
    for (int i = 0; i < size; i++)
        System.out.print(" " + nums[i]);
    System.out.println();
  }
}
```

<div class="result">
  <p>Original array is: 99 -10 100123 18 -978 5623 463 -9 287 49</p>
  <p>Sorted array is: -978 -10 -9 18 49 99 287 463 5623 100123</p>
</div>

## Bài 7: Nhập và xuất giá trị của các phần tử trong một mảng hai chiều.

```java
public class Main {

  public static void main(String[] args) {
    int t, i;
    int table[][] = new int[3][4];
    for (t = 0; t < 3; ++t) {
      for (i = 0; i < 4; ++i) {
        table[t][i] = (t * 4) + i + 1;
        System.out.print(table[t][i] + " ");
      }
      System.out.println();
    }
  }
}
```

<div class="result">
  <p>1 2 3 4</p>
  <p>5 6 7 8</p>
  <p>9 10 11 12</p>
</div>

## Bài 8: Tạo đối tượng chuỗi

```java
public class Main {

  public static void main(String[] args) {
    // Tao chuoi bang nhieu cach khac nhau
    String str1 = new String("Chuoi trong java la nhung Objects.");
    String str2 = "Chung duoc xay dung bang nhieu cach khac nhau.";
    String str3 = new String(str2);
    System.out.println(str1);
    System.out.println(str2);
    System.out.println(str3);
  }
}

```

<div class="result">
  <p>Chuoi trong java la nhung Objects.</p>
  <p>Chung duoc xay dung bang nhieu cach khac nhau.</p>
  <p>Chung duoc xay dung bang nhieu cach khac nhau.</p>
  <p>Chieu dai cua chuoi str1 la: 51</p>
</div>

## Bài 9: Minh họa một số thao tác cơ bản trên chuỗi

```java
public class Main {

  public static void main(String[] args) {
    String str1 = "Java la chon lua so mot cho lap trinh ung dung Web.";
    String str2 = new String(str1);
    String str3 = "Java ho tro doi tuong String de xu ly chuoi";
    int result, idx;
    char ch;
    System.out.println("str1:" + str1);
    System.out.println("str2:" + str2);
    System.out.println("str3:" + str3);
    System.out.println("Chieu dai cua chuoi str1 la: " + str1.length());
    // Hien thi chuoi str1, moi lan mot ky tu.
            System.out.println();
    for (int i = 0; i < str1.length(); i++)
        System.out.print(str1.charAt(i));
    System.out.println();
    if (str1.equals(str2))
        System.out.println("str1 == str2");
    else
        System.out.println("str1 != str2");
    if (str1.equals(str3))
        System.out.println("str1 == str3");
    else
        System.out.println("str1 != str3");
    result = str1.compareTo(str3);
    if (result == 0)
        System.out.println("str1 = str3 ");
    else if (result < 0)
        System.out.println("str1 < str3");
    else
        System.out.println("str1 > str3");
    // Tao chuoi moi cho str4
    String str4 = "Mot Hai Ba Mot";
    idx = str4.indexOf("Mot");
    System.out.println("str4:" + str4);
    System.out.println("Vi tri xuat hien dau tien cua chuoi con 'Mot' trong str4: " + idx);
    idx = str4.lastIndexOf("Mot");
    System.out.println("Vi tri xuat hien sau cung cua chuoi con 'Mot' trong str4:" + idx);
  }
}
```

<div class="result">
  <p>Java la chon lua so mot cho lap trinh ung dung Web.</p>
  <p>str1 == str2</p>
  <p>str1 != str3</p>
  <p>str1 > str3</p>
  <p>str4:Mot Hai Ba Mot</p>
  <p>Vi tri xuat hien dau tien cua chuoi con 'Mot' trong str4: 0</p>
  <p>Vi tri xuat hien sau cung cua chuoi con 'Mot' trong str4:11</p>
</div>

## Bài 10: Chương trình nhập vào một chuỗi và in ra chuỗi nghịch đảo của chuỗi nhập.

```java
import java.lang.String;
import java.io.*;
public class Main {

  public static void main(String[] args) {
    System.out.println("\n *** CHUONG TRINH IN CHUOI NGUOC *** ");
    try {
      System.out.println("\n *** Nhap chuoi:");
      BufferedReader in = new
              BufferedReader(new
              InputStreamReader(System.in));
      // Class BufferedReader cho phép đọc text từ luồng nhập ký tự, tạo bộ đệm cho nhữngkýtựđể hỗ trợ cho việc đọc những ký tự, những mảng hay những dòng.
      // Doc 1 dong tu BufferReadered ket thuc bang dau ket thuc dong.
      String str = in.readLine();
      System.out.println("\n Chuoi vua nhap la:" + str);
      // Xuat chuoi nghich dao
      System.out.println("\n Chuoi nghich dao la:");
      for (int i = str.length() - 1; i >= 0; i--) {
          System.out.print(str.charAt(i));
      }
    } catch (IOException e) {
      System.out.println(e.toString());
    }
  }
}
```

<div class="result">
  <p>*** CHUONG TRINH IN CHUOI NGUOC ***</p>
  <p>*** Nhap chuoi:</p>
  <p>thaycacac</p>
  <p>Chuoi vua nhap la:thaycacac</p>
  <p>Chuoi nghich dao la:</p>
  <p></p>cacacyaht</p>
</div>

## Bài 11: Lấy chuỗi con của một chuỗi

```java
public class Main {
  public static void main(String[] args) {
    String orgstr = "Mot Hai Ba Bon";
    // Lay chuoi con dung ham
    // public String substring(int beginIndex, int
    // endIndex)
    String substr = orgstr.substring(4, 7);
    System.out.println("Chuoi goc: " + orgstr);
    System.out.println("Chuoi con: " + substr);
  }
}
```

<div class="result">
  <p>Chuoi goc: Mot Hai Ba Bon</p>
  <p>Chuoi con: Hai</p>
</div>

## Bài 12: Mảng các chuỗi

```java
public class Main {
  public static void main(String[] args) {
    String str[] = {"Mot", "Hai", "Ba", "Bon"};
    System.out.print("Mang goc: ");
    for (int i = 0; i < str.length; i++)
        System.out.print(str[i] + " ");
    System.out.println("\n");
    // Thay doi chuoi
    str[0] = "Bon";
    str[1] = "Ba";
    str[2] = "Hai";
    str[3] = "Mot";
    System.out.print("Mang thay doi:");
    for (int i = 0; i < str.length; i++)
        System.out.print(str[i] + " ");
    System.out.print("\n");
  }
}
```

<div class="result">
  <p> Mang goc: Mot Hai Ba Bon</p>
  <p>Mang thay doi:Bon Ba Hai Mot</p>
</div>