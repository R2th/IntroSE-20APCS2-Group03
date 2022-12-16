### Ở đâu mình giới thiệu 2 lỗi mình gặp trong lúc sử dụng mảng trong java.

### 1. Truy cập phần tử nằm ngoài độ rộng của mảng.

Tạo mảng 4 phần tử:

```java
int[] arr = {1,2,3,4};
```

Thực hiện truy cập phần tử:
```java
System.out.print(arr[1]); // in ra 2
System.out.print(arr[3]); // in ra 4
```

Trường hợp truy cập vào phần tử vị trí thứ 4:
```java
System.out.print(arr[4]); 
```

Thông báo lỗi:
```sh
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 4
```

Trường hợp truy cập vào phần tử vị trí thứ -1:
```java
System.out.print(arr[-1]); 
```

Thông báo lỗi:
```sh
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: -1
```

Vd: Sau đây là ví dụ về duyệt một mảng tìm phần tử lớn nhất (MAX)
```java
int []a = {5,6,3,2,3}; // mảng có 5 phần tử.
int MAX = a[0];
for (int i=0; i<6; i++) {
  System.out.print(a[i]);
}
```

Thông báo lỗi:
```sh
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 5
```

Bởi vì không tồn tại phần tử thứ 5 trong mảng.

Để xác định số lượng phần tử thì thực hiện:
```java
System.out.print(a.length); 
```

Chỉnh sửa code:
```java
int []a = {5,6,3,2,3}; // mảng có 5 phần tử.
int MAX = a[0];
for (int i=0; i<a.length; i++) {
  System.out.print(a[i]);
}
```

### 2. Truy cập vào phần tử chưa được tạo.

Khởi tạo mảng:

```java
String[] st = new String[4];
st[0] = "A";
st[1] = "B";
st[3] = "D";
```

Truy cập cào phần tử vị trí số 3;
```java
System.out.print(st[2]);
```

Kết quả:
```java
null
```