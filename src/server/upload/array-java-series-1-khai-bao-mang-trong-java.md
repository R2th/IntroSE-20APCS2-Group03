## Mảng trong Java mảng là một object vô cùng quan trọng, sử dụng một biến duy nhất để thực hiện lưu trữ nhiều giá trị cùng kiểu dữ liệu. 

### 1. Khái báo mảng (Declaring).

  Ví dụ về cú pháp:

```Java
int[] ages;
int ages[];
```

Gồm 3 thành phần là:
- Kiểu dữ liệu: int (vd: String, double, float, ...).
- Tên biến: ages.
- Dấu ngoặc vuông: [].

### 2. Tạo, khởi tạo mảng (Creating, Initializing).

* Tạo (Creating):
 
     Ví dụ về cú pháp:
         
    ```Java
    int[] ages = new int[10];
    int ages[] = new int[10];
    ```

    Cú pháp trên có ý nghĩa là tạo một mảng có 10 phần tử, nói cách khác là biến ages có thể lưu trữ 10 giá trị.
    
* Khởi tạo (Initializing):

   Ví dụ về cú pháp (1 chiều):
   
    ```Java
   int[] ages = {1, 2, 3, 4, 5, 6};
   int ages[] = {1, 2, 3, 4, 5, 6};
    ```

    Cú pháp khởi tạo phía trên có ý là khởi tạo 6 phần tử và có giá trị từ 1 - 6.
    
    Ví dụ về cú pháp (2 chiều):

    ```Java
    int[][] board = {{1, 2, 3, 4, 5, 6}, {1, 2, 3, 4, 5, 6}};
    int board[][] = {{1, 2, 3, 4, 5, 6}, {1, 2, 3, 4, 5, 6}};
    ```
    
    Ví dụ về cú pháp (3 chiều):
    
    ```java
    int[][][] board = {{{1, 2}, {3, 4}}, {{5, 6}, {7, 8}}};
    int board[][][] = {{{1, 2}, {3, 4}}, {{5, 6}, {7, 8}}};
    ```

### 3. Truy xuất (Accessing).

Ví dụ cú pháp:

```java
// Khởi tạo một mảng ages;
int[] ages = {1, 2, 3, 4, 5, 6};
// Truy xuất phần tử:
// Truy xuất giá trị phần tử đầu tiên của mảng:
ages[0]; // giá trị 1
// Truy xuất giá trị phần tử cuối cùng của mảng:
ages[5]; // giá trị 6
// Gán một giá trị vào phần từ:
// Gán giá trị vào phần tử đầu tiên của mảng:
ages[0] = 8;
// Gán giá trị vào phần tử cuối cùng của mảng:
ages[5] = 9;
```

### 4. Ví dụ về mảng:

Một đoạn chương trình tương tác với mảng.

```java
import java.util.Scanner;

public class AJS_1 {

static Scanner scanner = new Scanner(System.in);
	
    public static void main(String[] args) {
		// Tao mang co ten ages
		int[] ages = new int[3];
		
		// Gan gia tri cac phan tu mang
		System.out.println("Nhap 3 so nguyen vao mang: ");
		ages[0] = Integer.parseInt(scanner.nextLine());
		ages[1] = Integer.parseInt(scanner.nextLine());
		ages[2] = Integer.parseInt(scanner.nextLine());
		
		// Truy xuat gia tri phan tu mang
		System.out.println("Cac gia tri phan tu trong mang: ");
		System.out.println(ages[0]);
		System.out.println(ages[1]);
		System.out.println(ages[2]);

	}
}
```

Trong Series mình sẽ giới thiệu những kiến thức căn bản mà mình học tập được, và dựa trên đó để đưa ra các vấn để và cách giải quyết vấn đề.

Nếu có gì sai sót mong mọi người góp ý.