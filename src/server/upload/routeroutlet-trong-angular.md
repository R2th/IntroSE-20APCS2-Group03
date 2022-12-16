![image.png](https://images.viblo.asia/f339f66a-01c6-4d87-9e71-42763c7d2891.png)

Về định nghĩa và cách sử dụng router bạn có thể xem link cuối bài, trong bài này mình sẽ chia sẻ thêm về router-outlet.

Router-outlet được sử dụng để điều hướng (route) cho các path url trong ứng dụng của bạn.
NgModule

    RouterModule
Selectors

    router-outlet


**Properties**


**Property	Description**

```
@Output('activate')
activateEvents: EventEmitter<any>	
    
    
@Output('deactivate')
deactivateEvents: EventEmitter<any>	
    
    
isActivated: boolean	Read-only.
    
    
component: Object	Read-only.
    
    
activatedRoute: ActivatedRoute	Read-only.
    
    
activatedRouteData: Data	Read-only.
```
    
    
**Các thành phần trong router-outlet**

Template:

`outlet	#myTemplateVar="outlet"`


Mô tả các dùng: 

```
<router-outlet></router-outlet>
<router-outlet name='left'></router-outlet>
<router-outlet name='right'></router-outlet>
```

Với mỗi router-outlet , nó sẽ emit một active event mỗi khi một component mới được khởi tạo và một deactive event khi nó bị huỷ.

```
<router-outlet
  (activate)='onActivate($event)'
  (deactivate)='onDeactivate($event)'></router-outlet>
```

Và để hiểu rõ các thuộc tính của router-outlet, mình sẽ lấy ví dụ sau: 

- Truy cập phương thức / biến của ChildCoponent từ ParentComponent 

Ta có một component app root như sau:

```
@Component({
    selector: 'my-app',
    providers: [],
                  <router-outlet></router-outlet>`
})
export class AppComponent {

    constructor() {

    }
}
```


ChildComponent:

```
@Component({
    selector: 'child',
    providers: [],
    templateUrl: `<div>Hello World</div>`
})
export class ChildComponent {

    constructor() {

    }
    my_var: boolean;
    myFunction(){
        console.log('success');
    }

}
```


Ta sẽ set thuộc tính `active` trong `router-outlet` của ParentComponent như sau:

```
<div class="container">
    <router-outlet (activate)="onActivate($event)"></router-outlet>
  </div>


  onActivate(componentRef){
    console.log(componentRef.my_var);
    console.log(componentRef.myFunction());
  }
```
  
  Như vậy, thông qua property `active` của `router-outlet`  ta đã truy cập được các phương thức / biến của thành phần con một cách dễ dàng.
  Ngoài ra, còn có các thuộc tính khác được liệt kê như bên dưới.
  
  
**Methods**

`ngOnDestroy() `


Parameters
There are no parameters.

Returns
void

**ngOnDestroy(): void**

Parameters
There are no parameters.

Returns
void

**ngOnInit()** 


ngOnInit(): void

Parameters
There are no parameters.

Returns
void

**detach()**

Được gọi khi RouteReuseStrategy detach subtree.


detach(): ComponentRef<any>
    
Parameters
There are no parameters.

Returns
ComponentRef<any>

**attach()**
Được gọi khi RouteReuseStrategy re-attach một subtree đã được detach trước đó.

attach(ref: ComponentRef<any>, activatedRoute: ActivatedRoute)
Parameters
ref	ComponentRef	
activatedRoute	ActivatedRoute	
    
    
**deactivate() **

    
deactivate(): void

    Parameters

    There are no parameters.

Returns
void

**activateWith()**
    

activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver)

    Parameters
    
activatedRoute	ActivatedRoute	
    
resolver	ComponentFactoryResolver

Tham khảo router: https://viblo.asia/p/co-ban-ve-router-trong-angular-2-63vKjn7yK2R