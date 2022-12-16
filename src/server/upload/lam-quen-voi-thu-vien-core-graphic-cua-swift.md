Core Graphic được xây dựng dựa trên công cụ vẽ nâng cao Quartz. Nó cung cấp kết xuất 2D nhẹ, mức độ thấp với độ trung thực đầu ra chưa từng có. Bạn có thể sử dụng framework này để xử lý vẽ, biến đổi, quản lý màu, hiển thị ngoài màn hình, mẫu, độ dốc và sắc thái, quản lý dữ liệu hình ảnh, tạo hình ảnh và mặt nạ hình ảnh, cũng như tạo, hiển thị và phân tích tài liệu PDF.

CoreGraphics bao gồm một số loại hữu ích: 
*CGFloat* Loại cơ bản cho các giá trị vô hướng dấu phẩy động trong Core Graphic và các framework liên quan.

*CGPoint* Một cấu trúc có chứa một điểm trong hệ tọa độ hai chiều. 

 *CGSize*  Một cấu trúc có chứa các giá trị chiều rộng và chiều cao. 

*CGRect* Một cấu trúc có chứa vị trí và kích thước của một hình chữ nhật. 

**Lớp vẽ 2D: **

*CGContext* Bối cảnh đồ họa chứa các tham số vẽ và tất cả thông tin cụ thể của thiết bị cần thiết để hiển thị màu vẽ trên trang đến đích, cho dù đích là cửa sổ trong ứng dụng, hình ảnh bitmap, tài liệu PDF hoặc máy in. Hình ảnh Một hình ảnh bitmap hoặc mặt nạ hình ảnh. 

*CGPath / CGMutablePath* Đường dẫn đồ họa: mô tả toán học về hình dạng hoặc đường được vẽ trong ngữ cảnh đồ họa.

*CGColor* Một tập hợp các thành phần xác định một màu, với một không gian màu chỉ định cách diễn giải chúng.

vv... bạn có thể đọc thêm tại đây https://developer.apple.com/documentation/coregraphics

Bắt đầu sử dụng để vẽ thử thôi nào:

```
//: A UIKit based Playground for presenting user interface
import CoreGraphics
import UIKit
import PlaygroundSupport

class DrawView: UIView {
    
    override func draw(_ rect: CGRect) {
        super.draw(rect)
        
        drawLine(rect)
        drawPath(rect)
        drawArc(rect)
        drawImage(rect)
    }
    
    private func drawLine(_ rect: CGRect) {
        guard let context = UIGraphicsGetCurrentContext() else { return }
        context.setStrokeColor(UIColor.red.cgColor)
        context.setLineWidth(10.0)
        
        context.move(to: CGPoint(x: 0, y: 0))
        context.addLine(to: CGPoint(x: 0, y: 100))
        context.addLine(to: CGPoint(x: 100, y: 100))
        
        context.strokePath()
    }
    
    private func drawPath(_ rect: CGRect) {
        guard let context = UIGraphicsGetCurrentContext() else { return }
        context.setStrokeColor(UIColor.blue.cgColor)
        context.setLineWidth(10.0)
        
        let path = CGMutablePath()
        path.move(to: CGPoint(x: 100, y: 100))
        path.addRect(CGRect(x: 100, y: 100, width: 50, height: 50))
        path.addEllipse(in: CGRect(x: 200, y: 200, width: 50, height: 50))
        
        context.addPath(path)
        context.strokePath()
    }
    
    private func drawArc(_ rect: CGRect) {
        guard let context = UIGraphicsGetCurrentContext() else { return }
        context.setStrokeColor(UIColor.gray.cgColor)
        context.setLineWidth(10.0)
        
        context.addArc(center: CGPoint(x: 100, y: 300), radius: 100, startAngle: 0, endAngle: 90, clockwise: true)
        
        context.strokePath()
    }
    
    private func drawImage(_ rect: CGRect) {
        guard let context = UIGraphicsGetCurrentContext() else { return }
        let base64String = "iVBORw0KGgoAAAANSUhEUgAAAGQAAABLCAYAAACGGCK3AAABKGlDQ1BrQ0dDb2xvclNwYWNlQWRvYmVSR0IxOTk4AAAokWNgYFJILCjIYRJgYMjNKykKcndSiIiMUmB/xMDEIM3AxcDAoJiYXFzgGBDgA2QzwGhU8O0aAyOIvqwLMgtTHi/gSkktTgbSf4A4O7mgqISBgTEDyFYuLykAsXuAbJGkbDB7AYhdBHQgkL0FxE6HsE+A1UDYd8BqQoKcgewPQDZfEpjNBLKLLx3CFgCxofaCgKBjSn5SqgLI9xqGlpYWmiT6gSAoSa0oAdHO+QWVRZnpGSUKjsCQSlXwzEvW01EwMjC0YGAAhTtE9edAcHgyip1BiCEAQmyOBAOD/1IGBpY/CDGTXgaGBToMDPxTEWJqhgwMAvoMDPvmJJcWlUGNYWQyZmAgxAcA855KQwAprlAAAAAJcEhZcwAAFxIAABcSAWef0lIAAAI8aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xNjAwPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjIxMzM8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KZryRNwAAD+pJREFUeAHtWgl0VdW5/jLdDPdmIAOZIXOCEIYEJOJQcKCCtOLzKQhCC6iNfX3IqxNBtDxoUd96bR2qhcbZp7D6Wlsoazl0FWwtiIxWCCiEQAYykQEyz/t9/07OMUgeKsmF4+rZa917ztln73//+//3Px8PAIo/u1mEAp4WwcNGo48CNkMsdhRshtgMsRgFLIaOLSE2QyxGAYuhY0uIzRCLUcBi6NgSYjPEYhSwGDq2hNgMsRgFLIaOLSE2QyxGAYuhY0vIPzNDPDw8zO3Lff9neWH0fbHfeGdO/go3X4RxPthfAdxFGyIUcnuBSoihVO8y/e+NXQ7UN9C7840baLzR9026up0hBhFj4+Lg4+2NEydOII73QUFBmk4NDQ0oKyuDt48PEhMS4Ovri46ODj1OrtJiYmPh63Dg+PHj+vnL/qKjY+Dv54uivvGuwEDEEYbgIq2ttRXHiceXNcEpiHPr6uq+bOiQvpej65YfCaDhRkdHm/BT09LMe2PdkSNHKl+Hz1n93g5fRfKpsLAwsz8xKUmFh4Waz1GEO2LECEVG6z4H56SmpprvA5wu5e/vbz4b68k1PDxc98fExKrY2BhzTExMjIqPi1MOh8PsCwoONu/7w3DTvXuYYSBrMOOe3Fz1yCMr9Mam3zhTvfHmm2rDhjfVjG/fYG529Zqfqi1btqg1q/9T9w0Li9DXuXfMU/+xbJk5Lj4+TgkTjTWEiFFRZE58vO677fY5Z42fcuXV6oknn1Tr169X+fn5asniRXpcenq6CUPgCXMNmJRiRQlRGaMy+vo8lHHAjDFuurqHIQbyycnJekO/eOpp9dKL+eqaaderkpJStW/fXrV37z5VVlqqvjXlcvX8unz2F2uG1NbVqT/8/n9N4mz87e84fo/53J8QEyaMP6c//4WX1MEDn5j9y1c+ppqamtWuj3aqXbt2q1PV1WrF8of0+8SkXvz6w5w0caJ+9+MHl6vde3arhBgv/RwR/rl09h8/lPfeBObWZhpzrtLU3IzHHl2JxobTyMrK1useKDiEFY+ugo+fEw7amFmzZiFvxUrERg838Wqlzo+JjcPfPvgAgS4nVjz0AMZkTca8ubdD9fRg//69WHLXPfjzX7YiJNAFF+1Te0uzOd+PdqmpuREr8x5EfbsXNv9uI5wB/li4aAnu+9EPNYxXXn4Rno4A3EGYMn7vnt2IG5mIidnZeGz1Oiy+627Ay0fbsvY+22YuMIQ3bo9DAgICNLq0HbhiyhSEhQ7Dx/v3mVvYs2cvkpKTsHDBfJRVVKG2thbfWzAPhUePmGMcvg7tEGzZvAme3g6sWv1TOgAjcfJkGWrq6nH99Tdgw4aNyBx9Gf7w1u/R1tYBP39/c74w1OUKxM+ffg5vvJxPBnShqLgUj+QtR11tDRqaW7D0vmW4ZfbNSBgxAqWlpbQyCocOHUZ5RQU+/HC7huVJZeJOZsgibmdID0+wNPGYGs6cQWNjI1JT03Sf/KWkpIDqBA8++BBeWP88aMRRVVOP5Xl55pjh4eFoaWmhN1aKstIyJHHOxOwsCOxeCfRAZmYmmpsa8dmRIzh9+jScTieuuvIKDSMgwMm+etx79/eQlpaKiuoaLP33pfTE/DReVZWVqD51Cu9v24odH+7UXl1cfLzGVWDlv/iKhuPV66Sh72LiN5Q3bmeIp2fvEr7cvLiQzz2/DklkyHvvvoO333kXo9JT8dyzz2BM5lj8bO0TePaZZxA6LISnv9zcZ2V1NSIiIigJ05HO8R/t3AlXYBBioqPR2dmJoOAgnuIdcPj6Yfbs2UhMTEArGfj37R9qGF1dXQgNDcOqNU/ij5s2YURcLP7x8X6UnTyp3W+Xy4UaMmTUZaMRHh6K6upTGDt2HKXSC3QW8MxTv9BwPKiyvLy8tNHVHW748yLMVW6Aa4Kk+wiJNaIio7jRKjz91C/R3tmF0dy8w8cbL+b/Bs/9ej1ee/V1MiUT48aNRUnxcazIe5gEq9BwwsMjqFpqEUkGVJafxHdvno2u7h4kJSWirqYGJVQxf31/K4pOlFBSxuDAJ//A9u3bsW3b+3q+SIufwxdyOCQW2rb1L8i994eoqKrmer2E/+3GDdi+czcmjB9PW+aFl2lT1q5di8wxmWhvb8Pbb7+DHpp21dON7j6pNzc5xDfagyDMIb8anlZUVJQJmyrKvDfWTB6gT94F0/+XnzHu614ZECrasAHnB4d8Ht98FbiUsAHhfJW5X2eMqENZyG2NTNF6nkEcvCnuEpUnJSVB1IgsLCe2qKjorPXFHtQzOhaVIi04OIS2JVRLmpz2FnprPpQ88bC8ON9QIwE05IVHj8KX17DQUJSUlOj5MiZh5Eh0c02xaIJHOSVt2LAwSk2vRTDwFIlua2uDD6P0U5S+6KgoNNHuiY25GM3tDOm/CWPT0udNIolBFmKaKZKYGBKq13YwKMRw6nNpzWSA0+mCw+FDB6BJp1ASExPpOblIvFYad4Vjx47psaNGjdLGWBhPydOGu729HUfJqLi4eISEBGu789lnnyGa6wnjBI+qqkrU1NRqvARPsU3S5F5+hnOiO938d1FEkXs4Zx0j2l6z9nF1rKhIFRQUqKNHjijalXPG9p8/kNpbtXqNmnfH7WrJPblq8+ZN58xP+kIAGN8vKjdgh4SE6HlkwDnzjTHuvro9MOQG/t/mR89LmrjBLmcAlv5bLm66+V8x57ZbUVh4FDX1DRhPI79r10c0+OMwMj4OW7Zsxmuvv4GF31+E78y6CZ8WHMSjP1mFRYsWoba6Ei+98hpO9amXHy29D1OvuRr7GOStfeJJTLtuOu6+axFKi0/g4eV5yJlyFZ+XADTUr776MgPP7RgWEoJ6urqXql1ShhhqQFSWqBVRY8Ik8WrGjs/GTST4QXpMPM2M3KPR2t6BvLwVcLqCcf/996OyshwTJkzQqklskuj/iRMnIoOu8cMcd+8P7kFxcTHu/kEuAmh7rrvh2+jsaEN2VhaGDx+O0ZnjEej0x5mGRuTm5vYyhCpMGCJqysgyXEzmuN3tPd9mQrl5SW3PnPUd5Fx+OcZPyEJqSjI2vvk/aO3oQUpiAkbT7YxnCkNSJl3d3YgcHoFIxgae1Co5OVegpKwcH/ztr5h0+WTs37sLRaXlyBqfiejoWJyuO4Wp067F3n0f4+prpmLKFTmUtl2MW4bpeKP4RLGOb+rra3HwwAFs3boN/swsSPB6qZrbA8PzbUwMurRg5p6qqioYjI0Fk5E83Y/ogK21Lx+1cOECMiIcJ8srdL1Eonapp0QyO7JwwZ24dtpUSpcPYmPjyDgXT7enzpuFhoVr+MuWLdUqUSSxqbFB11qKjh3XXtvWrVvJoFDMn3+nHlteWUup6U336I6L/HdJGWJ4MpK/qmT6QlpKarq+1tXVardTHg4f/pQnejjSKD30e3Di+DGcKCnDjoPHMOayUfj0cAEO8ISn0BbFRUehgvmn9evWoZPBY2FhIeel4JWX8rFj50e46upvIZW5s0+oCoNpL6677lpC7MFORv/SoiPD0NzSqu8v1d8l8ygMb4YnWxeWnM4As6BEtaRSUz4vNs2/c4G6aeYMxQSlypowTuO8ePFiFRsRaOI/deo0RfugjJQ/CapkjFyN3+IlS9TMGTeaz3cuWEDvbK75zMqkeW/MucjXz5Ed7MJS3ZPCDnNWelMGwZmyMDdJNXVW9M0AzHwn6+v3fe6nPNMY6wreF3GjaJvzDPe5/xipBPZ/ZtzCqmRvZVH65RDQHpljYmNjlSfdXToGirZNCc4MSJWjH35SfZRKY3+myR6NffZf70LvhywwlDS76HajsXpH76WBQR+Tf0GBOgCUd5L0024lvZhYBmaitkT/ezN/1E2jXVlRzlyRoooKZ6BWY4DTV7Evko9qZyTdwpQ64wYd8TdyHZZrWavwQSEDRCMrIBF3IBOaZ86cpufWwQRjqPbiZB15J0EoGccA06mDzxbarPr6s11eH+bAoqMiNW4n+zIHoI2KjWHmgV5hMwPVGqpcGi6yWfg7+GaeEoL62vdyOvz8fPW8W/7lVvXAA/ertOSE88KJ7JfbGmhNUTvSL+qJKW+VnpGhsvr6Bhrfvy8rO/u8a/cfK3AD/XtxN/pzcnJUWmpvvm0K1zf6jWtyctI5fQ7fs2EYYy/kOmgJcbLwI3UIaevWr6c76qFjijOsfZSzgPT6xs14bMWPmd6u7j35EeGIYX7ov554HLfcNodfgDTzixMH44MOnZdiMpFZYB9C86BkufD2u+9h7pw5Ov+0kyl2bx9mbeny/mzt41i58lFKYBt8/fzRIjh4eiM7OwvF/KKkkd7UC7/+FcKjR7DQVIB58xcgZ/IkHeOwhMw81jCEUQqb6eLK1ykZ6emQquGNs27GlXSPn//Vs7j19rloa2mCVDUlFyYlACZKcYRpl0ZKhuDYw2LX0/+9Fk3tzMsRb8NREXpcSBt0YGi4rrK4J0X58OFDmDFjpmZSBInf3tHFnFE00tLT0MqclIOBn4+XJ0oYA0gSUWoTR1hUaqfqCqLL6kk1EM4ilXhdkqeS4EwKSaKWsiZOYpySQoIfx10sqaampuj38umQk3O7yFRJHk6fPl2n+vcw5pg85Uqk7k9ERkYG+BGDVjHp6aO0mvKimuykSs1k7SMiIgzHmB0Io6vsYhApTZKQEvNMmpzDce26kNZExkuZQJKcntzHjr9/oJkhLvaZ04P/XGjQDBG96+frg7b2TmZny1k/GIM//WkTEhKSUM3YouDQIY24RNHJzPJK5rSNkXhKRrp2VauZ1JMSq5zogACXrjfsYqQcz0SgbPCPb72l69pVlRWMLVrADxS0tL3z3nt0c1PQyQifKkPbFU8vb9oMp84ed5GABQf2obDouH52MWNcXl5GSWrGZaOlEBVGe1FHF7kSwyMjEUCmHywoQDP30d3ZroNQkZwoBqKHDx9mxjlI2xwnq4+SPZY4SHCWKqM0YVg33ezBtkGrLEHAg5LhTWXf2dU9WHy+kfMl6yxZ6KFoQ8IQAxERd/ELBEHD45J6uT+/8BC1I/UID6oBWVRUkpwy+XXwdAlTxUuhD6m/7BDvxZNj6+vreZojtO73ZYnWi2pCNi9VO7E1oq4kJyaqUympsfem9mV9kcYedohXJV8vytckPTzFfv5+2juTOXRKNPo6iidcWSOA+IoHJjZDUvuMjyidTZwvebZ2vWZnZwdzZ744TfzkaxqBMxS5ryFliMEY+3rhFHBL6sQ4dReO1j/vTFtCLMZ7t0iIxfb4jULHZojF2GUzxGaIxShgMXRsCbEZYjEKWAwdW0JshliMAhZDx5YQmyEWo4DF0LElxGaIxShgMXRsCbEZYjEKWAwdW0JshliMAhZDx5YQmyEWo4DF0LElxGaIxShgMXRsCbEZYjEKWAwdW0JshliMAhZDx5YQmyEWo4DF0LElxGIM+T+1jqy55qNuNwAAAABJRU5ErkJggg=="
        guard let data = Data(base64Encoded: base64String), let image = UIImage(data: data), let cgImage = image.cgImage else { return }
        
        context.draw(cgImage, in: CGRect(x: 100, y: 400, width: 200, height: 150))
    }
    
}

class MyViewController : UIViewController {
    
    override func loadView() {
        let view = DrawView()
        view.backgroundColor = .white
        
        self.view = view
    }
    
}
// Present the view controller in the Live View window
PlaygroundPage.current.liveView = MyViewController()
```

Ví dụ này chứa DrawView có các hàm: 
drawLine Vẽ các đường bằng các hàm CGContext. 
drawPath Vẽ đường dẫn bằng các hàm CGMutablePath. 
drawArc Vẽ cung tròn bằng các hàm CGContext. 
drawImage Vẽ hình ảnh bằng cách sử dụng base64String làm biểu diễn dữ liệu, Dữ liệu để cung cấp dữ liệu từ chuỗi sang lớp UIImage và CGImage để cung cấp hình ảnh vào CGContext.

và đây là kết quả :

![](https://images.viblo.asia/ee319432-285e-483b-8c0d-e17f0ec4c406.png)