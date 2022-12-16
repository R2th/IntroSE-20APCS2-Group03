Mã được mô tả cho một ứng dụng xử lý ảnh đa giao diện (MDI) sử dụng lớp CImage trong C ++.

### 1: Ưu điểm của MDI.

Thiết kế Imagr như một ứng dụng MDI mang lại lợi ích khi có thể so sánh hình ảnh hoặc thực hiện các hoạt động hai ảnh (như được giải thích dưới đây). Ngoài ra, điều quan trọng là phải có khả năng tạo bản sao của một hình ảnh, ví dụ: bạn có thể lưu trạng thái hoạt động của bộ lọc trước khi thử các bộ lọc khác hoặc thực hiện thao tác hai ảnh với bản sao của hình ảnh hoặc bản sao được xử lý của hình ảnh. MDI cũng thực hiện một số công việc nền quan trọng. Với một cuộc gọi tới SetModifiedFlag () , trạng thái thay đổi của hình ảnh được duy trì, để nếu hình ảnh được đóng lại, MDI sẽ tự động nhắc người dùng lưu nó trước. MDI cũng cho phép các tập tin được kéo và thả vào ứng dụng, và phối hợp ảnh nào là ảnh đang kích hoạt với một cú click chuột.

### 2: Chức năng biểu đồ.
Trong bối cảnh của ứng dụng hiện tại, một biểu đồ là một biểu diễn đồ họa của việc phân phối các giá trị pixel trong một hình ảnh. Số lượng của mỗi giá trị pixel được duy trì trong một mảng có kích thước 256 (hoặc 256 x 3 đối với hình ảnh màu) và được vẽ đồ thị tới cửa sổ hộp thoại. (Lưu ý: Trong mã Imagr, bạn sẽ thấy rằng các pixel <0 và> 255 cũng được hiển thị trong biểu đồ để xử lý kiểu nguyên của hình ảnh nguyên). Hình ảnh tỷ lệ màu xám và biểu đồ được liên kết của nó được hiển thị bên dưới. Như có thể thấy trong biểu đồ, phần lớn các điểm ảnh trong hình ảnh này nằm trong vùng 32… 112.![](https://images.viblo.asia/94d50ea5-12a8-45b8-9401-7956d8987fef.JPG)

Ví dụ về biểu đồ hình ảnh màu (bên dưới) hình ảnh màu này cho thấy các bản phân phối kênh màu đỏ, xanh lục và xanh dương.
![](https://images.viblo.asia/653a27df-89b6-4d92-9a8f-a34a21b0a7a8.JPG)

Thuật toán chuẩn hóa hoạt động trên mọi pixel trong hình ảnh là:

`pixel = (pixel - min)*(nmax - nmin) / (max - min) + nmin`

Trong đó max và min là giá trị pixel tối đa và tối thiểu trong hình ảnh, và nmax và nmin là giá trị pixel tối thiểu mới và tối đa mới được chọn để chuẩn hóa.

Mã chuẩn hóa được hiển thị bên dưới để xử lý ba loại pixel hình ảnh (thang màu xám, màu sắc và số nguyên "thô"). `RED ()` được gọi trong mã màu xám để cô lập chỉ byte dưới của pixel nguyên, không thực sự đỏ trong trường hợp này (để rõ ràng, có lẽ tôi đã tạo `GRAY ()` và thực hiện tương tự) . Hàm này được gọi từ một lớp trượt kép. Chức năng chuẩn hóa được gắn với các thanh trượt kép để hình ảnh có thể được chuẩn hóa khi bạn điều chỉnh thanh trượt trong thời gian thực (tùy thuộc vào kích thước hình ảnh và tốc độ hệ thống). Hình ảnh được sao chép vào bộ đệm trước mỗi điều chỉnh thanh trượt để chức năng hoạt động trên cùng một hình ảnh bắt đầu mỗi khi thanh trượt được thay đổi. Thanh trượt điều khiển các biến nmin và nmax được truyền cho hàm.

```
/*----------------------------------------------------------------------
  This function normalizes the bitmap to the passed range. 
  (For calling interactively from the slider dialog.)
----------------------------------------------------------------------*/
void CImagrDoc::Nrmlz(int nmin, int nmax)
{
    int d;
    float factor;
    byte r = 0, g = 0, b = 0;

    OnDo();        // Save prev. image for Undo

    int *min = &(m_image.minmax.min);
    int *max = &(m_image.minmax.max);

    if (*max - *min == 0)
        factor = 32767.;    // Avoid div. by 0
    else
        factor = (float)((float)(nmax - nmin) / (*max - *min));
    
    int *p = (int *) m_image.GetBits();    // Ptr to bitmap
    unsigned long n = GetImageSize();

    switch (m_image.ptype) {
        case GREY:    // Grey scale pixels
            for ( ; n > 0; n--, p++) {
                r = RED(*p);
                d = (int)((float)(r - *min) * factor + nmin + 0.5);
                r = (byte)THRESH(d);
                *p = BGR(r, r, r);
            }
            break;
        case cRGB:    // RGB color pixels
            for ( ; n > 0; n--, p++) {
                r = RED(*p);
                d = (int)((float)(r - *min) * factor + nmin + 0.5);
                r = (byte)THRESH(d);

                g = GRN(*p);
                d = (int)((float)(g - *min) * factor + nmin + 0.5);
                g = (byte)THRESH(d);

                b = BLU(*p);
                d = (int)((float)(b - *min) * factor + nmin + 0.5);
                b = (byte)THRESH(d);
                
                *p = BGR(b, g, r);
            }
            break;
        default:    // INTG
            for ( ; n > 0; n--, p++) {
                r = (int)((float)(*p - *min) * factor + nmin + 0.5);
                *p = BGR(r, r, r);
            }
            m_image.ptype = GREY;    // Changed type
            break;
    }

    *min = nmin;
    *max = nmax;
    UpdateAllViews(NULL, ID_SBR_IMAGEMINMAX);    
}
```

Lưu ý rằng việc chuẩn hóa này bị hạn chế để hoạt động ở phạm vi pixel từ tối thiểu đến tối đa. Đôi khi, người ta có thể muốn mở rộng hoặc thu hẹp phạm vi biểu đồ hẹp. Imagr bao gồm chức năng này trong hàm NrmlzRange () với thuật toán sau:

`pixel = (pixel - rmin)*255 / (rmax - rmin)`

Trong đó rmax to rmin là dải giá trị pixel được chọn. Một thanh trượt kép cũng được sử dụng để điều chỉnh các biến rmin và rmax. Điều này cho phép người ta chọn một phạm vi biểu đồ được chuẩn hóa trong phạm vi từ 0 đến 255. Quá trình này có thể buộc các giá trị pixel nhỏ hơn 0 hoặc lớn hơn 255, nằm ngoài phạm vi có thể hiển thị. Các pixel có các giá trị nằm ngoài phạm vi 0 đến 255 sẽ được chuyển đến phạm vi để chúng có thể được hiển thị. Bất kỳ pixel <0 nào được đặt bằng 0 và bất kỳ pixel nào> 255 được đặt bằng 255. Hình ảnh và biểu đồ bên dưới thể hiện điều này. Hình ảnh có độ tương phản cao hơn toàn bộ phạm vi của nó với chi phí làm móng được thực hiện ở đầu ngoài của biểu đồ.

![](https://images.viblo.asia/135759b4-4a9d-431f-bb18-2645569f6772.JPG)

### 3: Bộ lọc xử lý hình ảnh

Có nhiều bộ lọc có thể được áp dụng cho các chức năng xử lý hình ảnh khác nhau. Hàm convolve (Convl.cpp) được sử dụng để áp dụng các bộ lọc hạt nhân 3 x 3 (ma trận) cho ảnh. Imagr hiện có các tùy chọn menu cho nhiều loại bộ lọc bao gồm: pass thấp, pass cao, Sobel, Prewitt, Frei-Chen, các bộ lọc khác nhau và bộ lọc Laplacian, bộ lọc nổi, và hộp thoại đầu vào để người dùng có thể thử nghiệm .

Một phần của mã bộ lọc convolution được hiển thị bên dưới, nhưng chỉ với phần tỷ lệ màu xám cho hiển thị (xem Convl.cpp cho mã đầy đủ). Các hạt nhân 3 x 3 (ma trận) được chuyển đến hàm.

```
/*----------------------------------------------------------------------
  This function performs a 3 x 3 convolution on the active image. The 
  kernel array is passed externally. Edges are added (doubly weighted)
  for the computation. 
----------------------------------------------------------------------*/
void CImagrDoc::Convl(float k1, float k2, float k3,
                       float k4, float k5, float k6,
                       float k7, float k8, float k9)
{
    int *p;                        /* Image ptr */
    unsigned long i, j, nx, ny;
    int *m1, *m2, *m3;            // Pointers to buffers to free()
    int *old_r1, *r1, *r2, *r3; /* Cycling pointers to rows */
    float s, fsum;
    int t;
    byte r, g, b;

    nx = m_image.GetWidth();
    ny = m_image.GetHeight();
    p = (int *) m_image.GetBits();    // Ptr to bitmap

    /* Allocate row buffers */
    if (!(m1 = (int *) malloc((nx+2) * sizeof(*m1)))) {
        fMessageBox("Error - " __FUNCTION__, MB_ICONERROR, "malloc() error m1");
        return;
    }
    if (!(m2 = (int *) malloc((nx+2) * sizeof(*m2)))) {
        fMessageBox("Error - " __FUNCTION__, MB_ICONERROR, "malloc() error m2");
        free(m1);
        return;
    }
    if (!(m3 = (int *) malloc((nx+2) * sizeof(*m3)))) {
        fMessageBox("Error - " __FUNCTION__, MB_ICONERROR, "malloc() error m3");
        free(m1);
        free(m2);
        return;
    }
    r1 = m1;
    r2 = m2;
    r3 = m3;

    // Initialize rows
    memcpy_s(&r1[1], nx * sizeof(int), p, nx * sizeof(int));
    r1[0] = r1[1];                      /* Doubly weight edges */
    r1[nx+1] = r1[nx];

    /* Start r2 = r1 (doubly weight 1st row) */
    memcpy_s(r2, (nx+2) * sizeof(int), r1, (nx+2) * sizeof(int));

    // Calc. sum of kernel
    fsum = k1 + k2 + k3 + k4 + k5 + k6 + k7 + k8 + k9;
    if (fsum == 0) 
        fsum = 1;            // Avoid div. by 0
    else
        fsum = 1/fsum;        // Invert so can mult. 

    OnDo();        // Save image for Undo

    BeginWaitCursor(); 
    switch (m_image.ptype) {
        case GREY:
            for (j = 1; j <= ny; j++, p += nx) {
                if (j == ny) {                /* Last row */
                    r3 = r2;                /* Last row doubly weighted */
                }
                else {     /* Read next row (into the 3rd row) */
                    memcpy_s(&r3[1], nx * sizeof(int), p + nx, nx * sizeof(int));
                    r3[0] = r3[1];            /* Doubly weight edges */
                    r3[nx+1] = r3[nx];
                }

                for (i = 0; i < nx; i++) {
                    s = k1 * (float)RED(r1[i]) 
                      + k2 * (float)RED(r1[i+1])
                      + k3 * (float)RED(r1[i+2]) 
                      + k4 * (float)RED(r2[i])
                      + k5 * (float)RED(r2[i+1])
                      + k6 * (float)RED(r2[i+2])
                      + k7 * (float)RED(r3[i])
                      + k8 * (float)RED(r3[i+1])
                      + k9 * (float)RED(r3[i+2]);

                    t = NINT(s * fsum);
                    r = (byte)THRESH(t);

                    p[i] = RGB(r, r, r);      
                }

                /* Cycle row pointers */
                old_r1 = r1;    // To save addr. for r3
                r1 = r2;
                r2 = r3;
                r3 = old_r1;
            }
            break;
    }
    EndWaitCursor();

    free(m1);                   
    free(m2);
    free(m3);                

    ChkData();                // Re-check range
    SetModifiedFlag(true);    // Set flag
    UpdateAllViews(NULL);    // Still needed even though called by ChkData()
}
```

Mã hàm convolution (một lần nữa nhờ Frank Hoogterp và Steven Caito cho mã Fortran gốc) truy cập ba hàng của hình ảnh tại một thời điểm bằng cách lưu trữ chúng trong ba mảng. Các con trỏ tới các mảng hàng được duy trì dễ dàng trong các hàng dịch chuyển khi hàng mới được nạp vào từ hình ảnh. Ví dụ, khi hoạt động trên một hàng mới của hình ảnh, con trỏ tới các hàng mảng hai và ba (r2 và r3) được thiết lập để trỏ đến r1 và r2, tương ứng. Vì vậy, chỉ có ba hàng cần được cập nhật với các pixel từ hình ảnh và điều này trở thành r3 mới (con trỏ trước đó đến r1).

Các hàng và cột cạnh được xử lý bằng cách tăng gấp đôi trọng số  của chúng. Ví dụ, khi hoạt động trên một pixel ở hàng thứ nhất, hàng thứ nhất được sao chép vào mảng hàng thứ 2 để vẫn có 3 hàng (mảng hàng thứ 3 chứa hàng thứ 2) để xử lý. Vì vậy, nó như thể hàng đầu tiên được sao chép trên hàng đầu tiên thực tế. Các cạnh dọc (các cột) được xử lý tương tự bằng cách sao chép một điểm ảnh bổ sung ở đầu và cuối của hàng.


Như vậy là chúng ta đã hoàn thành tìm hiểu về ứng dụng xử lý ảnh trong C++, bài viết mình xin kết thúc ở đây, mong nhận được sự góp ý của các bạn. Cảm ơn các bạn đã quan tâm đến bài viết này!

Nguồn bài viết: https://www.codeproject.com/Articles/789555/An-Image-Processing-Application-in-Cplusplus