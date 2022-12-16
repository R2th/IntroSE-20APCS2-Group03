Ngày nay, các ứng dụng được tạo bằng  MFC trong môi trường window vẫn rất phổ biến và ưa thích đối với người sử dụng cũng như các nhà phát triển.  Quá trình phát triển một project không chỉ đòi hỏi có năng chạy tốt mà mà còn đòi hỏi UI đẹp và đáp ứng  yêu cầu về kỹ thuật của nhà phát triển. Đối với phần tạo dao diên, MFC cung cấp cho chúng ta một thanh toolbox đa phần giúp các lập trình viên tạo được các UI một cách dễ dàng. Tuy nhiên, có những yêu cầu từ nhà phát triển đòi hỏi chúng ta phải tạo ra những control có sự độc đáo và phức tạp mà không sẵn có trong toolbox khiến chi dev bối rối. Dưới đây là hình minh họa cho một trong những control như vậy:

![](https://images.viblo.asia/ea6d9fa6-2481-4634-bed8-404c0b3bbc3a.jpg)


Hôm nay mình sẽ hướng dẫn bạn tạo ra những một control để đáp ứng những yêu cầu đó.


**1. Tạo Custom Control**

Đầu tiên ta vào phần Resource View chon một dialog hoặc view mà bạn muốn add control. vào phần toolbox add item Custom Control vào vị trí mà bạn muốn sử dụng.
     
   ![](https://images.viblo.asia/cc26f6db-cb1d-4f36-93e2-759d80714d8a.jpg)
   
   
   **2.Tạo Class**
   
 Để dễ quản lý, ta sẽ tạo lớp là `MyCustomControl` kế thừ lơp CWnd  như dưới đây:
 
```
 //bên MyCustomControl.h
#pragma once
class MyCustomControl : public CWnd
{
        // Construction
        public:
            MyCustomControl();
            virtual ~MyCustomControl();
            DECLARE_MESSAGE_MAP()
};

//bên MyCustomControl.cpp
MyCustomControl::MyCustomControl()
{
}

MyCustomControl::~MyCustomControl()
{
}

BEGIN_MESSAGE_MAP(MyCustomControl, CWnd)
	//{{AFX_MSG_MAP(MyCustomControl)
	//}}AFX_MSG_MAP
END_MESSAGE_MAP()
```
 
 **3. Dăng ký class**
 
 
Vì lớp được tạo sử dụng CWnd làm base, chúng ta sẽ phải đăng ký lớp này. Chúng ta  viết hàm RegisterWndClass () như sau:

```
BOOL MyCustomControl::RegisterWndClass()
{
	WNDCLASS windowclass;
	HINSTANCE hInst = AfxGetInstanceHandle();
	//Check weather the class is registerd already
	if (!(::GetClassInfo(hInst, MYWNDCLASS, &windowclass)))
	{
		//If not then we have to register the new class
		windowclass.style = CS_DBLCLKS;// | CS_HREDRAW | CS_VREDRAW;
		windowclass.lpfnWndProc = ::DefWindowProc;
		windowclass.cbClsExtra = windowclass.cbWndExtra = 0;
		windowclass.hInstance = hInst;
		windowclass.hIcon = NULL;
		windowclass.hCursor = AfxGetApp()->LoadStandardCursor(IDC_ARROW);
		windowclass.hbrBackground = ::GetSysColorBrush(COLOR_WINDOW);
		windowclass.lpszMenuName = NULL;
		windowclass.lpszClassName = MYWNDCLASS;
		if (!AfxRegisterClass(&windowclass))
		{
			AfxThrowResourceException();
			return FALSE;
		}
	}
	return TRUE;
}
```

Bằng cách này, chúng ta đã đăng ký lớp cửa sổ mới. Chúng ta sẽ phải thêm hàm đó vào constructor như sau: 

```
MyCustomControl::MyCustomControl()
{
	//Register My window class
	RegisterWndClass();
}
```

**4. Gán lớp vào custom control**

Chúng ta chuột phải vào control, điên tên class bất kỳ mà bạn muốn gán. Ví dụ: `Cuscontrol`

**5. Tạo biến sử dụng cho control**

Trong dialog hoặc view mà bạn muốn sử dụng custom control, khai báo 1 biến 
`MyCustomControl m_custom_control`. Ví dụ như :
```
void CCustomControlDlg::DoDataExchange(CDataExchange* pDX)
{
    CDialog::DoDataExchange(pDX);
    //{{AFX_DATA_MAP(CCustomControlDlg)
    // NOTE: the ClassWizard will add DDX and DDV calls here
    DDX_Control(pDX,IDC_CUSTOM1,m_drawpad);
    //}}AFX_DATA_MAP
}
```
*nhớ thêm `#include "MyCustomControl.h"` vào tệp mà bạn muốn dùng custom control này.*

**6. Thêm các Message Map**

bây giờ bạn hãy thêm các message map mà bạn muốn sử dụng cho custom control này ví dụ như : 
```
	afx_msg void OnLButtonDown(UINT nFlags, CPoint point);
	afx_msg void OnMouseMove(UINT nFlags, CPoint point);
	afx_msg void OnLButtonUp(UINT nFlags, CPoint point);
```
**7. Tạo giao diện cho control**

để tạo được giao diện control theo cách mình muốn. Ta thêm hàm` afx_msg nPaint();` để vễ ra control đó, với cách vẽ này ta có thể tạo ra một control theo bất kỳ hình thù gì mà ta muốn. Nó có thể tương tác với sự click chuột của người dùng hay chuyển động giống với một cái slider control mà các bạn đã biết. mình sẽ không đi sâu vào phần paint này, các bạn có thể tự tìm hiểu thêm.