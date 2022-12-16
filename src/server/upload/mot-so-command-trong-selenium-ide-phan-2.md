# 1.Kiểm tra UI các trường
## 1.1 Check title 
**Cách 1**: 

Command: **assert/verify title**

Target: title theo spec

**Cách 2**: 
* Gọi biến x là title của page: 

     Command: **store title** 
 
     Value: x
* Kiểm tra tiêu đề được truy xuất theo biến x có đúng k

   Command: **verify** 
   
  Target: x 
  
  Value: title theo spec

**Ví dụ**: Check title của page HTML trong website https://www.w3schools.com/

![](https://images.viblo.asia/e94fa052-d82b-4fd7-aec2-b72a8583627a.png)

Step 1: Open website https://www.w3schools.com/

Step 2: Click “Lerarn HTML” link

Step 3: Check title của page 

**Cách1**:   Sử dụng "**verify title**"
![](https://images.viblo.asia/48459d4c-92dc-42f8-b210-faf8372f9322.png)

**Cách2**: Sử dụng biến để gọi đến title
![](https://images.viblo.asia/d64c0196-eb8f-4528-915e-9ef9021be23a.png)
 
 ## 1.2 Kiểm tra label của element
**Cách1**: 

Command: **assert/ verify text** 

Target: vị trí của element

Value: label theo spec

**Ví dụ**: Check label của trường

![](https://images.viblo.asia/5eab9958-19f7-4edb-b65c-583b1e050373.png)

**Cách 2:**
* Gọi biến x là label của element

    Command: **store text** 

    Target: vị trí của element

    Value: x
* Kiểm tra giá trị biến x đúng với label mong muốn không

	Command: **Verify**
    
    Target: x 
    
    Value: Label/ Text mong muốn

**Ví dụ**:
![](https://images.viblo.asia/0166d933-d860-4fb1-8745-44f028988c1c.png)
## 1.3 Kiểm tra trạng thái của trường
### a. Trường có thể edit
Command: **assert/verify editable** 

Target: vị trí của trường

**Ví dụ**: Kiểm tra textbox search có thể edit được
![](https://images.viblo.asia/d7e9fe35-541a-4375-be47-7eb83950775e.png)

 Chạy IDE
 ![](https://images.viblo.asia/54b2f9ec-1898-418d-87eb-345e42392660.png)
### b.Trường không thể edit
Command: **assert/verify not editable** 

Target: vị trí của trường

**Ví dụ:** Kiểm tra trường "**Mã nhân viên**" không edit được 
![](https://images.viblo.asia/3c41a23c-087a-4456-838a-c70641a40bdc.jpg)

Chạy IDE: Tiền điều kiện: Nhân viên ABC đã login vào hệ thống.
![](https://images.viblo.asia/2756796c-2b45-4a1a-adea-b2220fd7c4fa.png)


## 1.4 Kiểm placeholder của trường
* Đặt biến x là giá trị của thuộc tính placeholder

    Command: **store attribute** 
    
    Target: ví trị của element + @placeholder
    
    Value: x
* Kiểm tra giá trị của biến x 

	Command: **verify** 
    
    Target: x
    
    Value: Placeholder của trường theo spec
    
 **Ví dụ**: Kiểm tra placeholder của textbox search
![](https://images.viblo.asia/3f8dc41f-7219-47d0-911f-296fbc6da167.png)
Chạy IDE:
![](https://images.viblo.asia/cd94c2e3-c1c4-4eff-90f9-08f88d133eda.png)
## 1.5 Kiểm tra value của trường
**Cách 1**: 

   Command: **assert/verify value** 

   Target:  Vị trí of element 

Value: giá trị của element

**Cách 2:**
* Gọi biến x là value của trường

    Command: **store value** 

    Target: Vị trí của element

    Value: x
* Kiểm tra giá trị biến x với giá trị mong muốn

    Command: **verify** 

    Target: x 

    Value: giá trị theo space
    
    ## Tài liệu tham khảo
    https://ui.vision/rpa/docs/selenium-ide