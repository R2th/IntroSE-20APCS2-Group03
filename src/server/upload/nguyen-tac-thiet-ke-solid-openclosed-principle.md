Nguyên tắc  Open/Closed Principle là một trong năm nguyên tắc thiết kế để phát triển phần mềm hướng đối tượng được mô tả bởi Robert C. Martin,
* [Single Responsibility Principle](https://viblo.asia/p/nguyen-tac-thiet-ke-solid-single-responsibility-principle-bWrZnpAb5xw)
* Open/Closed Principle
* Liskov Substitution Principle
* Interface Segregation Principle
* Dependency Inversion

Robert C. Martin đã coi nguyên tắc này là nguyên tắc quan trọng nhất của thiết kế hướng đối tượng. Nhưng ông ấy không phải là người đầu tiên định nghĩa nó. Bertrand Meyer đã viết về nó vào năm 1988 trong cuốn sách Object-Oriented Software Construction. Ông giải thích Nguyên tắcOpen/Closed Principle là:

*Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification*

Nguyên tắc này có thể được hiểu rằng: các class hoặc hàm nên được thiết kể để mở rộng, nhưng đóng lại để tránh sự thay đổi trực tiếp mã nguồn. Điều này có nghĩa là hệ thống nên được thiết để hỗ trợ các lập trình viên sau này có extend các class có sẵn để cung cấp thêm chức năng thay vì chỉnh sửa trên mã nguồn tồn tại sẵn trong hệ thống.

Chúng ta hãy xem ví dụ đơn giản sau đây:
```
// Ta có 3 class: vuông, tròn, tam giác, kế thừa class Shape
// Chuyển logic tính diện tích vào mỗi class
public abstract class Shape 
{
  public double Area();
}
public class Square : Shape
{
  public double Height { get; set; }
  public double Area() {
    return Math.Sqrt(this.Height);
  }
}
public class Circle : Shape
{
  public double Radius { get; set; }
  public double Area() {
    return this.Radius * this.Radius * Math.PI;
  }
}
public class Triangle : Shape
{
  public double FirstSide { get; set; }
  public double SecondSide { get; set; }
  public double ThirdSide { get; set; }
  public double Area() {
    double TotalHalf = (this.FirstSide + this.SecondSide + this.ThirdSide) / 2;
    var area += Math.Sqrt(TotalHalf * (TotalHalf - this.FirstSide) * 
        (TotalHalf - this.SecondSide) * (TotalHalf - this.ThirdSide));
    return area;
  }
}

// Module in ra diện tích các hình
public class AreaDisplay
{
  public double ShowArea(List<Shape> shapes)
  {
    foreach (var shape in shapes) {
      Console.WriteLine(shape.Area());
    }
  }
}
```

Ta chuyển module tính diện tích vào mỗi class. Class AreaDisplay chỉ việc in ra. Trong tương lai, khi thêm class mới, ta chỉ việc cho class này kế thừa class Shape ban đầu. Class AreaDisplay có thể in ra diện tích của các class thêm vào mà không cần sửa gì tới source code của nó cả.