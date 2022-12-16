![](https://images.viblo.asia/d6bdd3c7-0169-451e-b89b-905440802172.jpg)
# 1. Ý tưởng
 &nbsp;&nbsp;&nbsp;&nbsp; Trong quá trình làm một dự án về AI thì phần mất nhiều thời gian cho project nhất chính là xử lý dữ liệu. Chính vì vậy có nhiều công cụ (tool) được tạo ra để giảm tải cho quá trình này. Xuất phát từ bài toán nhận diện khuôn mặt, mình có ý tưởng xây dựng một công cụ tự động cắt ảnh chỉ chứa phần khuôn mặt cho ảnh chân dung. Mục đích để xử lý loại bỏ phần tóc tai, cổ, áo và phần thân thừa, chỉ giữ lại phần ảnh đặc trưng khuôn mặt với vùng mặt chứa hai mắt, mũi, miệng. Mỗi bức ảnh sau khi qua tool xử lý sẽ được lưu lại thành ảnh mới. 
<br>&nbsp;&nbsp;&nbsp;&nbsp; Ta chỉ cần thu thập ảnh cho vào thư mục, chọn thư mục đầu ra, và tool sẽ cắt ảnh tự động. Thư mục dữ liệu ảnh sẽ có hai loại:
* Thư mục lớn chứa nhiều thư mục nhỏ với tên đã được đánh nhãn riêng ứng với nội dung ảnh trong thư mục nhỏ.
![](https://images.viblo.asia/0be4ca52-078a-4aaf-ad9f-8cd8c4a951c9.jpg)
Thư mục "data" chứa các thư mục nhỏ chứa ảnh, tên từng thư mục được ghi tên của người nổi tiếng.
<br>&nbsp;&nbsp;&nbsp;&nbsp; Sau khi được tool xử lý sẽ trả về các ảnh chỉ có phần khuôn mặt, giữ nguyên tên file ban đầu và nằm đúng theo thư mục nhỏ với tên ban đầu. 
![](https://images.viblo.asia/f9d22701-d436-44ef-9d1c-a02be9ffbbd9.jpg)
* Thư mục chỉ chứa ảnh
![](https://images.viblo.asia/a8041394-3c99-439a-b02d-914fdb2b12d0.png)
Một thư mục chỉ chứa ảnh của Cha Eun Woo
&nbsp;&nbsp;&nbsp;&nbsp; Cũng giống như trên, khi được tool xử lý sẽ trả về các ảnh chỉ có phần khuôn mặt, giữ nguyên tên file ban đầu.
![](https://images.viblo.asia/ac3a6ed4-911c-4c3b-9f9d-6e3f4c0d6686.jpg)
&nbsp;&nbsp;&nbsp;&nbsp; Với việc cắt ảnh như vậy giúp tiền xử lý ảnh về khuôn mặt nhanh và đỡ tốn công sức hơn. Có thể ứng dụng hỗ trợ xử lý dữ liệu ảnh để phục vụ train model cho các bài toán về nhận dạng khuôn mặt, phân loại cảm xúc, giới tính, dự đoán độ tuổi...
# 2. Giới thiệu về MTCNN và PyQt5
&nbsp;&nbsp;&nbsp;&nbsp; Chúng ta sẽ sử dụng MTCNN để phát hiện khuôn mặt và cắt khuôn mặt ra từ ảnh gốc và lưu lại thành một bức ảnh khác. MTCNN hiện nay đang là phương pháp detect face nhanh, tốt và đơn giản hơn so với dlib hay Haar Cascade. Sau khi hoàn thành được phần lõi của tool rồi, chúng ta tiến hành làm giao diện cho tool với PyQt5. Một trong những GUI desktop app cho python dễ làm và được ưa chuộng nhất hiện nay.
## 2.1 Phát hiện khuôn mặt với MTCNN
&nbsp;&nbsp;&nbsp;&nbsp;Khái niệm: MTCNN là viết tắt của Multi-task Cascaded Convolutional Networks. Nó là bao gồm 3 mạng CNN xếp chồng và đồng thời hoạt động khi detect khuôn mặt. Mỗi mạng có cấu trúc khác nhau và đảm nhiệm vai trò khác nhau trong task. Đầu ra của MTCNN là vị trí khuôn mặt và các điểm trên mặt như: mắt, mũi, miệng…
<br>&nbsp;&nbsp;&nbsp;&nbsp;MTCNN hoạt động theo 3 bước, mỗi bước có một mạng neural riêng lần lượt là: P-Net, R-Net và O-net

![image.png](https://images.viblo.asia/f7df7db5-0ead-4cab-81e8-65af9435f4eb.png)
<br>&nbsp;&nbsp;&nbsp;&nbsp; Đầu vào hình ảnh được resize thành nhiều kích thước tạo thành một Image Pyramid. Sau đó pyramid sẽ được đưa vào **P-Net:**

![image.png](https://images.viblo.asia/a3ca011f-0510-4f9c-a16b-ce1174f55556.png)
* P-Net sử dụng 1 kernel 12x12 chạy qua mỗi bức hình để tìm kiếm khuôn mặt.
* Sau lớp convolution layer 3 thì mạng chia làm 2 lớp: convolution 4-1 để xác một định khuôn mặt nằm trong mỗi bounding boxes và convolution 4-2 cung cấp các tọa độ của của các bounding boxes.
* P-Net có  nhiệm vụ là xác định các window ảnh bao gồm mặt người nhưng lại lấy nhiều, nhanh và thiếu chính xác.
<br>&nbsp;&nbsp;&nbsp;&nbsp;**R-Net:** có cấu trúc tương tự P-Net nhưng có nhiều layer hơn. Nó sử dụng các bounding boxes được cung cấp từ R-Net. Và tương tự R-Net, P-Net chia làm 2 layer ở bước cuối, cung cấp 2 đầu ra đó là tọa độ mới của các bounding boxes, cùng độ tin tưởng của nó.

![image.png](https://images.viblo.asia/58764022-9873-4d51-b6f9-07d137b6d695.png)

<br>&nbsp;&nbsp;&nbsp;&nbsp;**O-Net:** lấy các bounding boxes từ R-Net làm đầu vào và đánh dấu các tọa độ của các mốc trên khuôn mặt. Kết quả 3 đầu ra bao gồm: xác suất của khuôn mặt nằm trong bounding box, tọa độ của bounding box và tọa độ của các mốc trên khuôn mặt (vị trí mắt, mũi, miệng)

![image.png](https://images.viblo.asia/6817987d-1ff8-44c8-9b85-9d6d1c74dc29.png)

![image.png](https://images.viblo.asia/2af7d4ce-4d3e-44aa-abe5-3d682fba60fa.png)

<br>&nbsp;&nbsp;&nbsp;&nbsp;**Demo phát hiện khuôn mặt MTCNN:** để sử dụng MTCCN thì rất đơn giản, chúng ta chỉ cần import thư viện, khởi tạo và gọi hàm detect_faces. MTCNN sẽ trả về  một danh sách khuôn mặt với các khuôn phát hiện được. Với mỗi khuôn mặt sẽ có bounding box với tọa độ góc trái trên (x,y) và chiều rộng (width) và dài (height) của box; các tọa độ điểm mắt trái-phải, mũi, mép miệng trái-phải và xác suất có khuôn mặt. 
![image.png](https://images.viblo.asia/8ef05307-2c5d-4236-9775-da92f67215e1.png)
![image.png](https://images.viblo.asia/ca0d3625-414e-4c38-b9aa-175888ad3d28.png)
## 2.2 Giao diện ứng dụng với PyQt5
&nbsp;&nbsp;&nbsp;&nbsp;Qt là một Application framework đa nền tảng viết trên ngôn ngữ C++ , được dùng để phát triển các ứng dụng trên desktop, hệ thống nhúng và mobile. Hỗ trợ cho các platform bao gồm : Linux, OS X, Windows, VxWorks, QNX, Android, iOS, BlackBerry, Sailfish OS và một số platform khác. PyQt là Python interface của Qt, kết hợp của ngôn ngữ lập trình Python và thư viện Qt, là một thư viện bao gồm các thành phần giao diện điều khiển (widgets , graphical control elements).  PyQt API bao gồm các module bao gồm số lượng lớn với các classes và functions hỗ trợ cho việc thiết kế ra các giao diện giao tiếp với người dùng của các phần mềm chức năng. Hỗ trợ với Python 2.x và 3.x.
<br>&nbsp;&nbsp;&nbsp;&nbsp;Để cài đặt PyQt5 ta mở cmd và gõ lệnh:
`pip install PyQt5`
<br>&nbsp;&nbsp;&nbsp;&nbsp;**Qt Designer:** Qt sử dụng IDE tên Qt Creator với một tool thiết kế giao diện người dùng Qt Designer. Qt Designer có thể làm việc một mình độc lập với Qt Creator . Qt Designer sử dụng XML .ui file  để lưu thiết kế và không sinh thêm bất kỳ mã nguồn nào của nó. User Interface Compiler (uic) đọc định dạng file XML (.ui) và xuất ra header file mã nguồn C++ tươn ứng. Qt có một class QUiLoader cho phép một ứng dụng tải một file .ui và tạo một giao diện động tương ứng.
![image.png](https://images.viblo.asia/de5f564e-ea19-49e2-abc6-3c7b8836a419.png)
<br>&nbsp;&nbsp;&nbsp;&nbsp;Thiết kế giao diện với Qt Designer chúng ta chỉ cần tạo window main, sau đó kéo thả các object tương ứng từ cột bên trái sang. Đổi tên các obeject cho dễ nhớ khi bắt sự kiện trong code về sau.  Sau khi thiết kế giao diện xong rồi, ta chuyển file .ui sang file .py để bắt sự kiện cho các object trong GUI bằng lệnh:
<br>`pyuic5 -x "tên file ui" -o "tên file py" `
![image.png](https://images.viblo.asia/08a6d18f-ee4c-4545-9aba-f7bead99628f.png)
Tên file search.py được chuyển từ search.ui. Dễ dàng nhìn thấy nút search trên giao diện khi được đổi tên "btn_search" thì sang file "search.py" cũng có tên như vậy.
Link tải Qt Designer: https://build-system.fman.io/qt-designer-download
# 3. Xây dựng công cụ
&nbsp;&nbsp;&nbsp;&nbsp; Mình sử dụng IDE là Visual Studio Code để code tool này. Trước hết ta tạo cây thư mục cho project như sau:
![image.png](https://images.viblo.asia/bc91f903-51f0-464d-b544-346e18362c95.png)
<br>Folder "data_in" chứa dữ liệu là các ảnh đầu vào được chia vào các folder nhỏ hơn, được ghi tên ứng với ảnh của người trong folder nhỏ. Folder "data_out" là folder để chứa ảnh sau khi tool xử lý xong. "images" là thư mục các ảnh dùng để hiện thị ở phần GUI cho tool. File "crop_face.py" là file code phát hiện khuôn mặt bằng MTCNN. Còn "main.py" là file để code bắt sự kiện cho GUI được tạo bởi PyQt5 designer. 
## 3.1 Code phát hiện khuôn mặt và cắt ảnh
&nbsp;&nbsp;&nbsp;&nbsp;  Đầu tiên là file code xử lý phát hiện khuôn mặt và lưu lại thành ảnh mới. Tại file **crop_face.py** sử dụng MTCNN để phát hiện khuôn mặt bằng hàm **detect_face()**. Với tham số truyền vào là đường dẫn file ảnh, đường dẫn folder lưu ảnh ra, tên ảnh. Ta dùng thư viện **opencv** để đọc và ghi ảnh mới sau khi được crop.
```
detector = MTCNN()
def detect_face(image, folder_out, file_name):
    img = cv2.imread(image)
    faces = detector.detect_faces(img)
    for face in faces:
        bounding_box = face['box']
        im  = img[ bounding_box[1]:bounding_box[1]+bounding_box[3],
                 bounding_box[0]:bounding_box[0]+bounding_box[2]]
        file_path = folder_out +"/"+ file_name
        cv2.imwrite(file_path, im)
```
Tiếp đó là việc lấy từng file ảnh cho vào hàm **detect_face()**. Như đã giới thiệu ở phần ý tưởng, có 2 loại thư mục đầu vào, với loại 1 thư mục lớn chứa nhiều thư mục nhỏ được gắn tên. Ta code một hàm **crop_face_many_folders()** lấy đường dẫn thư mục nhỏ rồi vào từng thư mục nhỏ để lấy đường dẫn của ảnh. Sử dụng thư viện **os** để lấy đường dẫn và tạo folder nhỏ mới bên trong folder_out (folder lớn chứa ảnh đầu ra). 
```
#data_folder_in = "./data_in"
#data_folder_out = "./data_out"

def crop_face_many_folders(data_folder_in, data_folder_out):
    for folder_name in os.listdir(data_folder_in):
        os.mkdir(data_folder_out+"/"+folder_name)
        folder_path = os.path.join(data_folder_in,folder_name)
        for image_name in os.listdir(folder_path):
            image_path = os.path.join(data_folder_in,folder_name,image_name)
            folder_out =  data_folder_out + "/" + folder_name
            detect_face(image_path,folder_out,image_name)
```
Đối với loại thư mục đầu vào số 2 chỉ chứa ảnh, ta chỉ cần dùng một vòng for để lấy đường dẫn ảnh với hàm  **crop_face_one_folder()**:
```
#image_folder_in = ".\data_in\Amber Heard"
#image_folder_out =".\data_out\Amber"   

def crop_face_one_folder(image_folder_in, image_folder_out):
    for image_name in os.listdir(image_folder_in):
            image_path = os.path.join(image_folder_in,image_name)
            detect_face(image_path,image_folder_out,image_name)
```
File **crop_face.py** hoàn chỉnh như sau:
```
from mtcnn import MTCNN
import cv2
import os

detector = MTCNN()
def detect_face(image, folder_out, file_name):
    img = cv2.imread(image)
    faces = detector.detect_faces(img)
    for face in faces:
        bounding_box = face['box']
        im  = img[ bounding_box[1]:bounding_box[1]+bounding_box[3],
                 bounding_box[0]:bounding_box[0]+bounding_box[2]]
        file_path = folder_out +"/"+ file_name
        cv2.imwrite(file_path, im)
        
#data_folder_in = "./data_in"
#data_folder_out = "./data_out"

def crop_face_many_folders(data_folder_in, data_folder_out):
    for folder_name in os.listdir(data_folder_in):
        os.mkdir(data_folder_out+"/"+folder_name)
        folder_path = os.path.join(data_folder_in,folder_name)
        for image_name in os.listdir(folder_path):
            image_path = os.path.join(data_folder_in,folder_name,image_name)
            folder_out =  data_folder_out + "/" + folder_name
            detect_face(image_path,folder_out,image_name)
            
#image_folder_in = ".\data_in\Amber Heard"
#image_folder_out =".\data_out\Amber"   
        
def crop_face_one_folder(image_folder_in, image_folder_out):
    for image_name in os.listdir(image_folder_in):
            image_path = os.path.join(image_folder_in,image_name)
            detect_face(image_path,image_folder_out,image_name)
```
## 3.2 Code giao diện cho tool
&nbsp;&nbsp;&nbsp;&nbsp;Sau khi tải và cài đặt QtDesigner, ta thiết kế giao diện cho tool sẽ có 3 tab. **Tab 1** sẽ là phần tool1 dành cho cắt ảnh từ thư mục đầu vào loại 1 (thư mục lớn chứa nhiều thư mục nhỏ có ảnh),  nút "Crop"  bắt sự kiện click đến hàm crop_face_many_folders().
![image.png](https://images.viblo.asia/0dc29240-5be9-44da-b7ed-387b4cabe7ba.png)
Ta sẽ thay đổi các tên của object ở window để tiện cho việc chỉnh sửa file code bắt sự kiện bằng các chuột phải vào object và chọn change objectName. Danh sách các object bôi đỏ cần đổi tên :
![image.png](https://images.viblo.asia/835780a8-9328-4091-a680-3659a02f457e.png)
&nbsp;&nbsp;&nbsp;&nbsp;**Tab 2** nhìn cũng giống như tab1 nhưng dành cho phần tool2 và sẽ bắt sự kiện click cho nút "Crop" đến hàm crop_face_one_folder().
![image.png](https://images.viblo.asia/2b2db389-7260-4d57-b3c5-bb978a477cf8.png)
Thay đổi các tên của object ở window để tiện cho việc chỉnh sửa file code bắt sự kiện:
![image.png](https://images.viblo.asia/32c1ff5f-53ef-4e4c-9e37-8228c27a20b4.png)
&nbsp;&nbsp;&nbsp;&nbsp;Với **Tab3** chỉ là phần hướng dẫn sử dụng nên ta không cần phải đổi tên các đối tượng, chỉ việc kéo object từ cột bên trái sang căn chỉnh và gõ chữ. Tuy nhiên chúng ta cần thêm ảnh minh họa nên cần thao tác chèn ảnh. Ảnh hướng dẫn được lưu ở thư mục images với 3 ảnh pic1, pic2, pic3.  Các bạn có thể tham khảo cách chèn ảnh ở link sau: https://www.youtube.com/watch?v=M0Y9_vBmYXU
![image.png](https://images.viblo.asia/99c1eb44-7a07-49cf-a3b7-fe1c1221dea0.png)
 &nbsp;&nbsp;&nbsp;&nbsp;Khi thiết kế xong giao diện với QtDesigner rồi, các bạn save file lại với tên **view.ui**  lưu ở thư mục project cùng cấp với file main.py. Và gõ lệnh trên ở terminal VS code như sau: `pyuic5 -x view.ui -o main.py`
 ![image.png](https://images.viblo.asia/2884f2a6-8997-47e7-b72b-a61530c98870.png)
 &nbsp;&nbsp;&nbsp;&nbsp; Ta sẽ được file main.py với phần code GUI. Giờ là việc bắt sự kiện cho các inputbox và button trên giao diện tool. Cần bắt sự kiện cho các nút là 2 nút browse chọn folder và 1 nút crop ở mỗi tab, có 2 tab vậy là 6 nút. Tìm phần code có tên object là nút bắt sự kiện và thêm dòng code dưới như dưới. Bắt sự kiện sẽ gọi đến hàm thực thi khi thực hiện sự kiện (ở đây là click), như dưới đây sẽ gọi đến hàm chooseFolderInput1() khi ấn nút  button_choose1_tool1 để thực hiện chọn folder data input ở tool1 :
 ![image.png](https://images.viblo.asia/540fe085-bf12-43fa-836a-778f2f682b2d.png)
Tổng cộng ta có 6 nút cần thêm button_choose1_tool1, button_choose2_tool1, button_crop_tool1, button_choose1_tool2, button_choose2_tool2, button_crop_tool2.
```
self.button_choose1_tool1.setObjectName("button_choose1_tool1")
self.button_choose1_tool1.clicked.connect(self.chooseFolderInput1)      #event

self.button_choose2_tool1.setObjectName("button_choose2_tool1")
self.button_choose2_tool1.clicked.connect(self.chooseFolderOutput1)     #event

self.button_crop_tool1.setObjectName("button_crop_tool1")
self.button_crop_tool1.clicked.connect(self.cropTool1)          #event

self.button_choose1_tool2.setObjectName("button_choose1_tool2")
self.button_choose1_tool2.clicked.connect(self.chooseFolderInput2)      #event

self.button_choose2_tool2.setObjectName("button_choose2_tool2")
self.button_choose2_tool2.clicked.connect(self.chooseFolderOutput2)     #event

self.button_crop_tool2.setObjectName("button_crop_tool2")
self.button_crop_tool2.clicked.connect(self.cropTool2)      #event
```
Và tương ứng chúng ta sẽ có các hàm để thực thi với sự kiện click nút:
#function for events

   ```
def chooseFolderInput1(self):
        folder_path = QtWidgets.QFileDialog.getExistingDirectory(None, "Select choose folder")
        self.folder_input_path_tool1.setText(folder_path)
    
    def chooseFolderOutput1(self):
        folder_path = QtWidgets.QFileDialog.getExistingDirectory(None, "Select choose folder")
        self.folder_output_path_tool1.setText(folder_path)
    
    def chooseFolderInput2(self):
        folder_path = QtWidgets.QFileDialog.getExistingDirectory(None, "Select choose folder")
        self.folder_input_path_tool2.setText(folder_path)
    
    def chooseFolderOutput2(self):
        folder_path = QtWidgets.QFileDialog.getExistingDirectory(None, "Select choose folder")
        self.folder_output_path_tool2.setText(folder_path)
       
    def cropTool1(self):
        ans = QtWidgets.QMessageBox.question(None, 'Confirm', "Are you crop image?", QtWidgets.QMessageBox.Yes | QtWidgets.QMessageBox.No | QtWidgets.QMessageBox.Cancel, QtWidgets.QMessageBox.Cancel)
        if ans == QtWidgets.QMessageBox.Yes:
            folder_data_in = self.folder_input_path_tool1.text()
            folder_data_out = self.folder_output_path_tool1.text()
            if folder_data_in=="" or folder_data_out=="":
                QtWidgets.QMessageBox.about(None,"Error","Empty folder path")
            else: 
                crop_face_many_folders(folder_data_in,folder_data_out)            
                QtWidgets.QMessageBox.about(None,"Successful","Cropped images successful!")
    
    def cropTool2(self):
        ans = QtWidgets.QMessageBox.question(None, 'Confirm', "Are you crop image?", QtWidgets.QMessageBox.Yes | QtWidgets.QMessageBox.No | QtWidgets.QMessageBox.Cancel, QtWidgets.QMessageBox.Cancel)
        if ans == QtWidgets.QMessageBox.Yes:
            folder_image_in = self.folder_input_path_tool2.text()
            folder_image_out = self.folder_output_path_tool2.text()
            if folder_image_in=="" or folder_image_out=="":
                QtWidgets.QMessageBox.about(None,"Error","Empty folder path")
            else: 
                crop_face_one_folder(folder_image_in,folder_image_out) 
                QtWidgets.QMessageBox.about(None,"Successful","Cropped images successful!")  
```
Với mỗi nút Crop ta thêm hộp thoại MessageBox.question để xác nhận việc người dùng muốn cắt ảnh, nếu ấn "Yes thì" sẽ thực hiện.
```
ans = QtWidgets.QMessageBox.question(None, 'Confirm', "Are you crop image?", QtWidgets.QMessageBox.Yes | QtWidgets.QMessageBox.No | QtWidgets.QMessageBox.Cancel, QtWidgets.QMessageBox.Cancel)
        if ans == QtWidgets.QMessageBox.Yes:
```
Và kiểm tra xem người dùng đã chọn thư mục dữ liệu nhập và xuất chưa, nếu họ chọn thiếu, ta sẽ hiển thị hộp thoại MessageBox.about báo chưa chọn thư mục.
```
if folder_image_in=="" or folder_image_out=="":
                QtWidgets.QMessageBox.about(None,"Error","Empty folder path")
```
Sau khi thực hiện xử lý cắt ảnh xong, thông báo cho người dùng quá trình đã hoàn thành:
`QtWidgets.QMessageBox.about(None,"Successful","Cropped images successful!")`
## 3.3 Kết quả
Chạy file main.py khởi động tool. Ta sẽ được giao diện sau:
![image.png](https://images.viblo.asia/653c165f-3dcc-4229-9b0d-81edde7ac585.png)
Chọn folder in và out để cắt ảnh:
![image.png](https://images.viblo.asia/e54318a6-e9d4-4fdb-baa5-f534fcb2132b.png)
Kết quả cắt ảnh thành công với tool1 với 2 folder mới được tạo trong thư mục data_out giống tên với data_in và các ảnh đã được crop face:
![image.png](https://images.viblo.asia/589198d7-0526-459e-85d0-614f75d03421.png)
![image.png](https://images.viblo.asia/9b96406d-ca7e-4a5b-ac63-7680f220b2e3.png)

Kết quả cắt ảnh thành công với tool2 với ảnh khuôn mặt Tổng thống Putin đã được cắt ra từ ảnh gốc lưu ở folder cũ Vladimir Vladimirovich Putin vào folder mới Putin được chọn.
![image.png](https://images.viblo.asia/cd000ee2-1392-43cc-9b79-b3e33be1b001.png)
Trước ở folder cũ Vladimir Vladimirovich Putin: 
![image.png](https://images.viblo.asia/d1e1d19c-a62a-4c7b-9548-06ffdfa1eb46.png)
Sau với folder mới Putin : 
![image.png](https://images.viblo.asia/5b4d9249-df72-4b90-b47e-0a72d56bd67e.png)

**Link github cho toàn bộ code:** https://github.com/nguyenthuy1681999/Crop_Face_Image.git
# 4. Tạo file thực thi cho tool chạy trên hệ điều hành Windows
&nbsp;&nbsp;&nbsp;&nbsp; Thay vì phải chạy file .py trong IDE hoặc cmd, ta sẽ tạo file thực thi (file .exe) cho tool cắt ảnh khuôn mặt của chúng ta để nó chạy trên hệ điều hành Windows như các ứng dụng khác trên desktop. Đầu tiên ta phải install  pyinstaller: 
`pip install pyinstaller`
<br>&nbsp;&nbsp;&nbsp;&nbsp; Sau đó chạy lệnh ` pyinstaller --onefile main.py` để tạo file exe
Sau khi thực thi xong thì trong thư mục **dist/main/** sẽ có file **main .exe** như sau:
![image.png](https://images.viblo.asia/b4e42154-9463-4528-afa5-1abff6f15a4e.png)
Bấm vào file main.exe để chạy ta sẽ được kết quả như hình dưới đây. Vậy là chúng ta có thể nén thư mục cho project này lại và đem sang máy khác chạy tool như một app desktop bình thường.
![image.png](https://images.viblo.asia/ccceb486-9b9b-477d-8f39-643c79e8dd18.png)
Link tải tool: https://drive.google.com/file/d/1VdphGOqv6e8tQ-zauoIqXKZcdINKmZ-c/view?usp=sharing
# 5. Tài liệu tham khảo
https://www.youtube.com/watch?v=M0Y9_vBmYXU
<br>https://realpython.com/qt-designer-python/
<br>https://code24h.com/tim-hieu-mtcnn-va-ap-dung-de-xac-dinh-vi-tri-cac-khuon-mat-d26908.htm
<br>https://datatofish.com/executable-pyinstaller/