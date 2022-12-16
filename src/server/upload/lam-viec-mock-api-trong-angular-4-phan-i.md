Như những lần trước mình đã có bài hướng dẫn về làm việc với Services trong Angular, hôm nay mình sẽ giới thiệu các bạn về tính huống thực tế sau này các bạn sẽ gặp nhiều sẽ làm việc với 1 API (ở đây mình chọn Mockapi). Mình sẽ không hướng dẫn lại các bước như tạo component, interface, services như thế nào. 

**I. Cấu trúc thư mục:**

![](https://images.viblo.asia/2c81b295-f428-45c4-9a31-705ad72d09ea.png)

**I.  Làm việc với Interface trong Angular:**

```
export interface ICourse {
	id?: number;
	name: string;
	description: string;
}
```

Trong phần này mình mong muốn show ra ngoài view 3 rows đó là id, name , description nên mình chỉ định nghĩa ngắn gọn như trên

**II.  Làm việc với Services trong Angular:**

```
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Statics
import 'rxjs/add/observable/throw';

import { ICourse } from './../defines/course.interface';

@Injectable()
export class CourseService {
 private apiUrl = 'http://586fc8ad0474f212000b02c5.mockapi.io/api/angular2/v2/courses/';  // URL to web API

 constructor(private _httpService: Http){

 }

 getItems(): Observable<ICourse[]> {
   return this._httpService.get(this.apiUrl).map(this.extractData).catch(this.handleError);
 }

 private extractData(res: Response) {
   return res.json() || { };
 }

private handleError (error: Response | any) {
 let errMsg: string;
 if (error instanceof Response) {
   const body = error.json() || '';
   const err = body.error || JSON.stringify(body);
  errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
 } else {
    errMsg = error.message ? error.message : error.toString();
 }
 
 return Observable.throw(errMsg);
 }
 }
```

**Link API:**

```
private apiUrl = 'http://586fc8ad0474f212000b02c5.mockapi.io/api/angular2/v2/courses/';   //tương tác với api 
```

```
 getItems(): Observable<ICourse[]> {
   return this._httpService.get(this.apiUrl).map(this.extractData).catch(this.handleError);
 }
```

Trong mình sẽ giải thích hàm getItems(): Observable<ICourse[]>  có nghĩa như sau:  Observable<ICourse[]>  : khi tương tác với API trong Angular nó cung cấp Observable để xử lý , còn <ICourse[]> đó chính là id, name, description của Interface mình đã giới thiệu ở trên 

**III.  Làm việc với Component trong Angular: (course-list.component.ts)**

```
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from './../services/course.service';
import { ICourse } from './../defines/course.interface';

@Component({
	moduleId: module.id,
	selector: 'zvn-course-list',
	templateUrl: './../templates/course-list.component.html'
})

export class CourseListComponent implements OnInit {
 errorMessage: string;
 courses: ICourse[] = [];
 course: ICourse;

 constructor(
   private _courseService: CourseService)
 {
 
 }

 ngOnInit(){
  this.getItems();
 }

 getItems(){
   this._courseService.getItems().subscribe(
    (data: ICourse[]) => this.courses = data,
    (error: any) =>  this.errorMessage = <any>error
 );
 }
}
```

```
constructor(
   private _courseService: CourseService)
 {
 
 }
```
Mình sẽ giải thích giải thích đoạn này như sau  private _courseService:  đây là biến mình khai báo trong contructor  ,  **CourseService:**  đó là chính Services mình đã khái báo ở phần (II)  **( import { CourseService } from './../services/course.service)**

```
getItems(){
   this._courseService.getItems().subscribe(
    (data: ICourse[]) => this.courses = data,
    (error: any) =>  this.errorMessage = <any>error
 );
```

Cái hàm này mình viết để nó gọi Services trong  **services/course.serice.ts **

```
ngOnInit(){
  this.getItems();
 }
```
Khi mới vào trang thì nó sẽ chạy hàm  **getItems()** ngay khi đó .

**IV. Lời kết :** 
- Thông qua bài hướng dẫn này hi vọng bạn hiểu 1 phần nào đó để làm việc với  **API trong Angular** để không còn bỡ ngỡ khi vào các tính huống thực tế sau này .