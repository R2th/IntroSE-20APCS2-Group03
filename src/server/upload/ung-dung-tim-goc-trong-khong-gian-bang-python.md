Chắc hẳn ai cũng được học phân tích vecto trên ghế nhà trường, hiện tại mình cũng đang làm về 1 dự án về phân tích tư thế của cơ thể khi tập vật lý trị liệu, thế nên được áp dụng những công thức từ trước để tìm góc được tạo bởi 3 điểm : vai, hông, đầu gối. Có những không gian 2D, 3D nhưng hôm nay mình sẽ áp dụng với dữ liệu 2D.

Công thức tính góc có thể xác định theo đại số hoặc hình học. ĐỊnh nghĩa hình học dựa trên các khái niệm về góc và khoảng cách( độ lớn của vector). Sự tương đương của hai định nghĩa này phụ thuộc vào việc có một hệ tọa độ Decartes cho không gian Euclide.

# 1. Định nghĩa hình học:
1 góc gồm độ lớn và hướng. Một vector có thể được hình dung như 1 mũi tên. Độ lớn của nó là chiều dài và hướng của nó là hướng mà mũi tên chỉ tới. Độ lớn của 1 vector a được kí hiệu là ||a||. Tích số chấm của 2 vector Oclit a và b được xác định bởi θ là góc giữa a và b .![](https://images.viblo.asia/2d169d03-f654-4c49-aa99-030dc14d4fae.png)

Giải thích:
![](https://images.viblo.asia/f0059405-e637-404b-bf61-2ddb3d4d180a.png)

![](https://images.viblo.asia/006a60d5-6652-4358-80de-0efc27e0e71e.jpeg)
![](https://images.viblo.asia/b5d1169b-ca18-4f2b-b447-e2e06cfa7df7.jpeg)

![](https://images.viblo.asia/0ad4f22c-d5af-463b-b2e6-ccebda912cbb.jpeg)
![](https://images.viblo.asia/32dd2884-22ca-4af2-9a5c-0331bca95e17.jpeg)

# 2. Công thức
Sử dụng thư viện math:
```
import math
 
def getAngle(knee, hip, shoulder):
    ang = math.degrees(math.atan2(shoulder[1]-hip[1], shoulder[0]-hip[0]) - math.atan2(knee[1]-hip[1], knee[0]-hip[0]))
    return ang + 360 if ang < 0 else ang
 
print(getAngle((5, 0), (0, 0), (0, 5)))
```

Sử dụng thư viện numpy
```
def get_degree_three_points(p, p1, p2):
    v1 = np.array([p1.x - p.x, p1.y - p.y])
    v2 = np.array([p2.x - p.x, p2.y - p.y])
    unit_v1 = v1 / np.linalg.norm(v1)
    unit_v2 = v2 / np.linalg.norm(v2)
    dot_product = np.dot(unit_v1, unit_v2)
    angle = np.math.atan2(np.linalg.det([unit_v1, unit_v2]), dot_product)
    degree = np.round(np.degrees(angle), 2)
    return degree if degree > 0 else degree + 360
```

Ngoài ra, từ công thức trên cũng có thể tạo góc với 2 điểm , điểm còn lại chỉnh là trục OX 
VD: độ nghiêng của thân người (gồm vai và hông)
```
import math
 
def get_Angle(hip, shoulder):
    ang = math.degrees(math.atan2(shoulder[1]-hip[1], shoulder[0]-hip[0]))
    return ang + 360 if ang < 0 else ang
 
print(get_Angle((0, 0), (0,5)))
```
Hoặc có trường hợp sẽ tính góc của hông trái- vai trái sẽ khác với hông phải - lưng phải , thì sẽ là 1 hệ quy chiếu khác đối nghịch trục ox với không gian trước, ta sẽ tính với công thức sau 
```
import math
 
def get_Angle_negative(hip, shoulder):
    ang = math.degrees(math.atan2(shoulder[1]-hip[1], shoulder[0]-hip[0])- math.atan2(0,-1))
    return ang + 360 if ang < 0 else ang
 
print(get_Angle_negative((0, 0), (0,5)))
```
Nguồn : 
https://manivannan-ai.medium.com/find-the-angle-between-three-points-from-2d-using-python-348c513e2cd