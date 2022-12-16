Ở bài viết này chúng ta sẽ cùng điểm qua 1 số thay đổi trong angular 8.

### Form

`FormArray.clear`. FormArray class bổ sung thêm method `clear` để remove các controls.  
Với version < 8, để remove các controls, phải lặp và remove từng controls

```
while (fbArray.controls.length > 0) {
    fbArray.removeAt(0)
}
```

Sử dụng `clear` method

```
const fbArr = new FormArray([field1, field2])
fbArr.clear()
```

### Router

Angular8 sử dụng `import` syntax khi khai báo lazy route.

Version < 8
```
loadChildren: './feature/feature.module#FeatureModule'
```

Version 8
```
loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
```

### HTTP

`@angular/http` sẽ không còn được sử dụng ở version 8.  
`@angular/http` được đánh deprecated ở các version trước và đến version 8 được xoá hoàn toàn.  
Thay vào đó sẽ sử dụng `@angular/common/http`.