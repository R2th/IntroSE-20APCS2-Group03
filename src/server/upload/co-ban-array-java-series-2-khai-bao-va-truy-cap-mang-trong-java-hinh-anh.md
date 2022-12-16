## Mình xin giới thiệu lại cách khởi tạo và truy cập phần tử trong mảng.

### 1. Khởi tạo mảng

Ví dụ ta khởi tạo một mảng ages có 7 phần tử:

```Java
int[] ages = new int[7];
int ages[] = new int[7];
```

Gán gía trị cho mỗi phần từ:

```Java
ages[0] = 1;
ages[1] = 3;
ages[2] = 4;
ages[3] = 5;
ages[4] = 9;
ages[5] = 8;
ages[6] = 7;
```

Hoặc gán lúc tạo mảng:

```Java
int ages[] = {1, 3, 4, 5, 9, 8, 7};
int ages[] = new int[]{1, 3, 4, 5, 9, 8, 7};
```

![Array](https://images.viblo.asia/95e2eec4-5b68-4c08-a897-87a0963fd79e.jpg)


### 2. Truy cập phần từ bất kỳ 

Ví dụ cú pháp:

```Java
int ages[7] = {8, 9, 7, 6, 5, 4, 3};
```

![](https://images.viblo.asia/0559e53a-39c3-4718-aea4-f9d6ebb99545.jpg)


```Java
int a = ages[1]; // a = 9
int b = ages[5]; // b = 5
```

Biến a có giá trị là 9, b có giá trị là 5.

### 3. Khởi tạo và truy cập mảng hai chiều

Ta khởi tạo mảng hai chiều ages, 
với hàng đầu tiên là **4 phần tử**, hàng thứ hai là **4 phần tử**, hàng thứ ba là **5 phần tử**.

Ví dụ cú pháp:
```Java
int[][] ages = int[3][];
int ages[][] = int[3][];
```

Khởi tạo hàng đầu tiên:

```Java
ages[0] = new int[4];
ages[0][0] = 3;
ages[0][1] = 4;
ages[0][2] = 7;
ages[0][3] = 9;
```

![Array ages 1](https://images.viblo.asia/c51d354c-d533-42ff-ab8d-31c50a01170b.jpg)

Khởi tạo hàng thứ hai:

```Java
ages[1] = new int[4];
ages[1][0] = 1;
ages[1][1] = 1;
ages[1][2] = 5;
ages[1][3] = 4;
```

![Array ages 2](https://images.viblo.asia/57af7b8b-52fc-44ad-ae17-b3d94b210251.jpg)

Khởi tạo mảng thứ ba:

```Java
ages[2] = new int[5];
ages[2][0] = 3;
ages[2][1] = 4;
ages[2][2] = 7;
ages[2][3] = 9;
ages[2][4] = 2;
```

![Array ages 3](https://images.viblo.asia/c89b0432-bf92-400d-8e2f-6c4ed655bcc5.jpg)

Về cú pháp truy cập:
```Java
int row13 = ages[0][2]; // row12 = 7
int row24 = ages[1][3]; // row24 = 4
int row31 = ages[2][0]; // row31 = 3
```

Có gì mong mọi người góp ý.