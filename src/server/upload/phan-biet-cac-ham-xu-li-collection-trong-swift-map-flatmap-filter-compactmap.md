# Giới thiệu
Đối với lập trình viên, việc thao tác với collection là kĩ nẵng quan trọng. Trong bài viết này tôi sẽ trình bày về chức năng của các hàm xử lí với Collection trong Swift (Filter, Map, FlatMap, CompactMap, Reduce)

## Filter():
Filter là một trong những hàm khá thông dụng trong Swift. Chức năng của filter là duyệt các phần tử trong mảng và trả về 1 mảng chua các phần tử thỏa mãn điều kiện cho trước.
 -  func filter(_ isIncluded: (Self.Element) throws -> Bool) rethrows -> [Self.Element]

Quan sát closure isInclude (self.Element) -> Bool là tham số tuyền vào, có chức  năng kiểm kiểm tra phan tử có thõa mãn điều kiện để thêm lọc mảng. Nếu closure return true phần tử sẽ được thêm vào mảng  và ngược lại.

Ví dụ: Tìm các phần tử chia hết cho 2 trong mảng số nguyên.
 
 
 Khi không sử sự Filter:

![](https://images.viblo.asia/a8e8f893-e555-4f31-8b61-2d3c8f3ab5c9.png)


Ví dụ với Filter:
    
   ![](https://images.viblo.asia/66b61a68-75b8-4247-9669-c98ad2fc4341.png)
  
  Rút gọn: 
  
![](https://images.viblo.asia/b29be977-f3d2-4c5f-8f4d-6334d1152553.png)

   
## Map():
Map là hàm có chức năng duyệt các phần tử trong mảng và trả về mảng chữa các phần tử theo một biến đổi T.

func map<T>(_ transform: (Element) throws -> T) rethrows -> [T]
    
   - Ví dụ:
    
![](https://images.viblo.asia/8fe3036c-c4c2-4a2a-bf54-92a37508ad47.png)

Ví dụ duyệt mảng với map.
  
  ![](https://images.viblo.asia/2f31777f-5086-4695-afd3-d5864431fc42.png)

    
    
    
   - Trong ví dụ này hàm Map() sẽ duyệt các phần tử trong mảng và trả về mảng các phần tử theo biến đổi T.
    
    - Kết quả :
    
![](https://images.viblo.asia/249ee4fb-45b1-4c6a-b1e4-fbc06686f391.png)

    
## FlatMap():
    
   - FlatMap tương tự như map tuy nhiên nó gộp các mảng con trong mảng trở thành 1.
    
ví dụ với FlatMap:
    
![](https://images.viblo.asia/62ea5f58-05aa-4830-bf54-29fd1f201b99.png)

Ta có thể hiểu flatMap tương đương với cấu trúc sau trong Map. 
    
s.flatMap(transform)  ==  Array(s.map(transform).joined()).

    
## Compact map():
    
CompactMap có chức năng tương tự như Map như giá tri trả về là một mảng  không chua phần tử nil.
    
Xem ví dụ với Map: 

![](https://images.viblo.asia/26e412a4-58ee-4549-afd8-9ab7f3012824.png)


Trong ví dụ với Map. các phần tử trả về sẽ chưa các phần tử không thể Convert sang Int. Và mảng trả về là Optional.
    
![](https://images.viblo.asia/10e40de8-c5e2-49e1-bc6e-64f536a1af5f.png)

Đối với CompactMap:

![](https://images.viblo.asia/359572f2-9ff1-4d24-b4ca-d76b1cd26004.png)


# Tổng kết

Trong bài viết này tôi đã trình bày các hàm duyệt và xử lí cơ bản đối với Collecttion trong swift.