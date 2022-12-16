# 1. Giới thiệu về MATLAB
MATLAB(Matrix laboratory) là ngôn ngữ lập trình do MathWorks phát triển, cho phép người dùng xây dựng ma trận, vẽ đồ thị hàm số hay biểu đồ dữ liệu, thực hiện các phép toán, tạo các giao diện người dùng, liên kết các chương trình máy tính được viết trên nhiều ngôn ngữ khác nhau, bao gồm cả C, C++, Java, và FORTRAN, phân tích dữ liệu, phát triển các thuật toán, tạo ra các mô hình và ứng dụng.

MATLAB được tích hợp nhiều lệnh và các hàm toán học, giúp người dùng thực hiện tính toán các con số, vẽ đồ thị và thực hiện các phương pháp số.
# 2. Vẽ đồ thị trên MATLAB
## 2.1. Vẽ đồ thị 2-D
### 2.1.1. plot(x,f(x))
Với x: vec-tơ chứa miền giá trị của hàm f . f(x): các giá trị của f  ứng với x.

* *Ví dụ: Vẽ đồ thị y = sin(x) từ [0, 2π]*
* *x  =  0  :  pi/100  :  2pi; y  =  sin(x);*
* *plot(x,  y);*

Chú thích trên đồ thị:
text(x,  y,  ’...’): đặt một chú thích (trong dấu ’ ’) lên đồ thị tại tọa độ
(x, y).
gtext(’...’):đặt chú thích lên đồ thị, vị trí được xác định bởi click chuột.
title(’...’): tựa đề của đồ thị. xlabel(’...’): ghi nhãn cho trục Ox. ylabel(’...’): ghi nhãn cho trục Oy.
hold  on/off: bật / tắt chế độ cho phép vẽ nhiều đồ thị trong cùng một hệ trục tọa độ.

Các tùy chỉnh về nét vẽ, dấu và màu sắc:
Lệnh: plot(x,y,’Nét  vẽ_Dấu_Màu  sắc’)

![](https://images.viblo.asia/2a94cadd-571f-4b9f-8c59-da97aa206bf4.JPG)
![](https://images.viblo.asia/86f74d97-3159-49d2-9151-97873e0e7246.JPG)

Màu sắc: gồm 8 tùy chọn là ’r’ - đỏ, ’k’ - đen, ’w’ - trắng, ’y’ - vàng, ’c’ - cyan, ’b’ - xanh nước biển, ’g’ - xanh lá cây, ’m’ - tím.

*Ví dụ:*
* *x  =  0:pi/20:2pi; plot(x,  sin(x),’-.r’); hold  on*
* *plot(x,  sin(x  –  pi/2),’–om’);*
* *plot(x,  sin(x  –  pi),  ‘:bs’); hold  off*

![](https://images.viblo.asia/c95e8848-13b2-407b-9a39-7b12d25e197e.JPG)

Tùy chỉnh màu sắc và độ lớn của nét vẽ: 
* LineWidth: độ rộng của nét vẽ, tính bằng pt. 
* MarkerEdgecolor: màu của đường viền dấu (marker). MarkerFacecolor: màu bên trong dấu.
* Markersize: độ lớn của dấu, tính bằng pt.

*Ví dụ:*
* *x = -pi:pi/10:pi;*
* *y = tan(sin(x)) - sin(tan(x));*
* *plot(x,y,’—rs’,’LineWidth’,2,’MarkerEdgecolor’,’k’,... ’MarkerFacecolor’,’g’, ’Markersize’,10)*

![](https://images.viblo.asia/cdc7a1cd-b398-4dff-bf4d-1d287272e0fa.JPG)

Xác định tọa độ:
* axis([xmin  xmax  ymin  ymax]) 
* xlim([xmin  xmax]) 
* ylim([ymin  ymax])

Tùy chỉnh các kiểu trục tọa độ:
* axis  on/off/auto
* axis  normal/square/equal/tight axis  ij/xy
* grid  on/off

![](https://images.viblo.asia/b6d1f37a-c4db-4dcd-8fc9-865a29432b19.JPG)

### 2.1.2. subplot(m,  n,  p) - Vẽ nhiều đồ thị trong cùng một cửa sổ
subplot(m,  n,  p): tạo ra một ma trận m hàng, n cột chứa m	n đồ thị, p
là vị trí của từng đồ thị, thứ tự từ trên xuống dưới theo hàng.

*Ví dụ: Vẽ 4 đồ thị trong cùng 1 cửa sổ*
* *t  =  0:pi/20:2pi;  [x,y]  =  meshgrid(t); subplot(2,2,1)*
* *plot(sin(t),cos(t)) axis  equal subplot(2,2,2)* 
* *z  =  sin(x)+cos(y); plot(t,z)* 
* *axis([0  2*pi  -2  2]) subplot(2,2,3)* 
* *z  =  sin(x).*cos(y); plot(t,z)* 
* *axis([0  2*pi  -1  1]) subplot(2,2,4)* 
* *z  =  (sin(x).  2)-(cos(y).  2); plot(t,z)* 
* *axis([0  2*pi  -1  1])*  
![](https://images.viblo.asia/1b9b241f-45f7-4b56-8c1d-cabdaec59f52.JPG)
## 2.2. Vẽ đồ thị 3-D
### 2.2.1. plot3(x,  y,  z)  
Trong plot3, ta cần xác định các vec-tơ
(x, y, z). Để vẽ mặt (x, y, z = f (x, y)), sử dụng lệnh meshgrid(x,y).

*Ví dụ:*
** t  =  0:0.02pi:25pi;*
* *x  =  sin(t);  y  =  cos(t); z = t;*
* *plot3(x,y,z);*

![](https://images.viblo.asia/e80a11aa-ba4a-4d71-bdbd-f63be7f012df.JPG)

*Ví dụ 1.5.6. Vẽ mặt z(x, y) = x2ye−x2−y2 với	(-4	<=  x	<= 4) và	(-4	<=  y	<= 4)*
* *[x,y]=meshgrid([-4:0.1:4]);*
* *z=x.x.y.exp(-x.  2-y.  2); plot3(x,y,z)*


![](https://images.viblo.asia/fbc3f752-ba73-466e-a096-1b5ce64d4284.JPG)

### 2.2.2. Một số lệnh vẽ đồ thị trong 3-D khác
* contour  /  contourf  /  contour3
* mesh / meshc / meshz
* surf  /  surfc
* waterfall
* bar3 / bar3h
* pie3  /  fill3
* comet3  /  scatter3  /  stem3

In và xuất đồ thị:
* Dùng lệnh: print  -dtiff  -r200  mygraph.tiff  print  –deps2  mygraph.eps
* Sử dụng Plotting Tools

![](https://images.viblo.asia/e7623ed7-b729-4641-9b31-955f5bb71372.JPG)

# 3. Tổng kết
Trong bài này mình đã giới thiệu cho các bạn một số hàm vẽ đồ thị 2-D và 3-D trong MATLAB, cảm ơn các bạn đã xem bài viết của mình!

Tham khảo: https://www.mathworks.com/help/matlab/2-and-3d-plots.html