![image.png](https://images.viblo.asia/f6ce2f9f-4930-4a5d-8610-7a4f6961df49.png)

Angular Router là một trong những package hữu ích nhất trong hệ sinh thái Angular. Tuy nhiên, nếu bạn chưa quen với Angular và mới bắt đầu làm việc với các bộ định tuyến (routes), mục tiêu của bạn có thể là thiết lập một số tuyến cơ bản. Hơn nữa, với các developer mới, tôi thường thấy nhiều câu hỏi xung quanh các thuộc tính children() và loadChildren(). Vì vậy, bài viết này sẽ chỉ tập trung vào sự khác biệt giữa hai thuộc tính này và khi nào thì sử dụng cái gì cho phù hợp.

**Angular Route Interface**

```
export interface Route {
  path?: string;
  component?: Type<any>;

  children?: Route[];
  loadChildren?: LoadChildren;

  ... few other properties
}
```


Hãy để tôi bắt đầu bằng cách giải thích nhanh bốn thuộc tính trên của giao diện Route (nằm trong phạm vi của bài viết này):

**Path**: bộ định tuyến API  chia nhỏ toàn bộ URL thành các đoạn riêng lẻ. Mỗi path có thể tương ứng với sự kết hợp của các đoạn này. Nó chủ yếu được sử dụng để xác định các component Angular cần được khởi tạo và tải trong bộ định tuyến của parent.

**Component**: Thuộc tính này đề cập đến component sẽ khởi tạo cho route này.

**Children**: Thuộc tính này xác định các tuyến đường lồng nhau và Angular sẽ tải chúng từ trước.

**LoadChildren**: Nó cũng được sử dụng để xác định các tuyến đường lồng nhau, nhưng Angular Router sẽ tải chúng theo kiểu lazyload. Bạn thấy lợi thế ở đây.
Bây giờ chúng ta đã xác định các thuộc tính Route có liên quan, chúng ta hãy xem khi nào chúng ta nên chọn giữa childrenand loadChildren.


**Children**

Để thêm các tuyến đường lồng nhau.

Angular sẽ tải trước tất cả các thành phần con.

Đảm bảo rằng bạn import tất cả các NgModules cho từng thành phần được xác định trong bảng tuyến đường lồng nhau. Nếu không, mã của bạn sẽ không hoạt động.

Để giúp mã của bạn dễ đọc và có thể bảo trì, hãy tránh thuộc tính này nếu việc lồng bảng tuyến đường của bạn quá dài. Sở thích cá nhân của tôi là tối đa <= 3 cấp độ.

Lý tưởng cho các tuyến đường đơn giản.

Ví dụ:

```
const routes = [ 
    { 
        path: '', 
        component: ApplicationFrameComponent, 
        children: [ 
            { 
                path: 'home', 
                component: HomeDashboardComponent, 
                children: [ 
                    { 
                        path: 'api-dashboard', 
                        component: ApiHomeDashboardComponent 
                    }] 
            }, 
            { 
                path: 'api-list', 
                component: ApiListComponent, 
                children: [ 
                    { 
                        path: 'internal', 
                        component: InternalApisListComponent 
                    }, 
                    { 
                        path: 'external', 
                        component: ExternalApisListComponent 
                    }] 
            }]
        }];
        
```

 **LoadChildren**
 
 Dùng cho lazy loading. Sử dụng thuộc tính này sẽ tối ưu hóa hiệu suất ứng dụng của bạn bằng cách chỉ tải cây con tuyến đường lồng nhau khi người dùng điều hướng đến một URL cụ thể khớp với đường dẫn tuyến đường hiện tại.
 
Nó giúp giữ cho bảng các tuyến đường lồng nhau được tách biệt.

Bạn phải chỉ định một mô-đun định tuyến cho **loadChildren**. Mô-đun này phải xác định các tuyến đường và phải nhập tất cả các mô-đun có liên quan

Nếu bạn sử dụng import (<module-path>) .then (module => module. <routing-module>), Angular sẽ tạo một gói js riêng biệt sẽ chỉ được tải khi một tuyến con được kích hoạt. Và bạn sẽ có được hiệu suất, khả năng đọc mã và khả năng bảo trì tốt hơn.
    
Nếu bạn sử dụng () => <routing-module>, angle sẽ không tạo một gói js riêng biệt, nhưng bảng các route sẽ được giữ riêng biệt. Kết quả là khả năng đọc và bảo trì mã tốt hơn. Hiệu suất sẽ giống như cách tiếp cận children.
    
Ví dụ:
    
   
```
const rootRoutes = [ 
    { 
        path: '', 
        component: ApplicationFrameComponent, 
        children: [ 
            { 
                path: 'home', 
                loadChildren: () => HomeDashboardRoutingModule 
            }, 
            { 
                path: 'api-list', 
                loadChildren: @import('./api-list.module').then(module => module.ApiListRoutingModule) 
            }] 
    }];

// In HomeDashboardRoutingModule
const homeRoutes = [ 
    { 
        path: '', 
        component: HomeDashboardComponent, 
        children: [ 
            { 
                path: 'api-dashboard', 
                component: ApiHomeDashboardComponent 
            }] 
    }]; 

// In ApiListRoutingModule 
const apiListRoutes = [ 
    { 
        path: '', 
        component: ApiListComponent, 
        children: [ 
            { 
                path: 'internal', 
                component: InternalApisListComponent 
            }, 
            { 
                path: 'external',
                component: ExternalApisListComponent 
            }]
    }];
```

    
   Hy vọng bài viết giúp bạn hiểu rõ hơn về route, cho những bạn đã xem, tôi có một câu hỏi như sau: Chuyện gì sẽ xảy ra nếu ta truyền một component cho một route với thuộc tính loadChildren? Ví dụ:
    

```
{ 
    path: 'home', 
    component: HomeDashboardComponent, 
    loadChildren: () => HomeDashboardRoutingModule 
}
```

    
    
Hãy comment bên dưới câu trả lời nha.
    Cám ơn.
    
    Link: https://dev.to/hypertrace/angular-router-children-or-loadchildren-2igc
    
Tìm hiểu thêm về Route: https://viblo.asia/p/routing-trong-angular-co-the-ban-chua-biet-Qbq5Q6n3KD8