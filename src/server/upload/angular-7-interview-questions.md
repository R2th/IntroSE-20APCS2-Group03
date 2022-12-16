## 1. What's new in Angular 7?
Angular Elements is enabled to support content projection with the help of web standards for custom elements.
![](https://images.viblo.asia/fca8b78b-09d7-4e5c-a936-2801b3116b14.jpg)
**Angular Material Gets Minor Updates**
Angular Material got better in the display that gives it an elegant look in the new update. Moreover, it also added a new homepage for the material, material.io. In this, you get tooling, design guidance, development components and stay up-to-date with the latest news.

If you are using an Angular Material v7 then you observe a visual difference as library make changes to itself with the updated version of the Material design.

**Better Accessibility for Selects**
In the updated version, it includes a lot of new features to enhance accessibility for selects. It adds a new feature of the native select inside mat-form-field. It is far better and outperformed than the mat- select.

Both the select and mat-select are available so you can choose what you want to do.

**Virtual Scrolling**
The Component Dev Kit (CDK) is available in the market with the great virtual scrolling capabilities that the user can apply by importing the `ScrollingModule`!

<cdk-virtual-scroll-viewport itemSize="20">   
<div *cdkVirtualFor="let dog of dogsArray"> {{dog}}
</cdk-virtual-scroll-viewport>

**Drag & Drop**
The CDK in the new update also now recommends Drag & Drop, which possess these great hallmarks:

**Automated render as a user moves items**
It is new feature available only in Angular 7

**Helper methods for reordering/transferring items in lists**
For reordering or transferring items in lists, you can use a helper method: moveItemInArray and transferArrayItem

**Enhancing Application Performance**
You will get enhanced application performance in Angular 7

**A safeguard has come into play for the users of Angular 7**
It gives a portent to new application builders when they are crossing the budget with their bundle size. The warning occurs on 2 MB whereas an error occurs over 5 MB. But you don't need to frighten. You can change the limits simply in your angular.json file. The thing you have to do is add in a bit about the warnings and error sizes with budget details.
<pre>
"budgets": [
{
    type": "initial",
    "maximumWarning": "2mb",
    "maximumError": "5mb"
    }
]
</pre> 

Also, [Read Best Top Angular JS Interview Questions](https://www.onlineinterviewquestions.com/angularjs-basic-interview-questions/)

## 2. What is IVY Renderer? Is it supported by Angular 7?
Angular will be releasing a new kind of rendering pipeline and view engine.

The purpose of angular view engine is to translate the templates and components that we have written into the regular HTML and JavaScript so it is easy for the browser to read it comfortably. Ivy is believed to be splendid for the Angular Renderer.

Yes, it is supported by Angular 7.

## 3. What are the Core Dependencies of Angular 7?
Core Dependencies
There are two types of core dependencies: RxJS and TypeScript.

**RxJS 6.3**
RxJS version 6.3 is used by Angular 7. It has no changes in the version from Angular 6

**TypeScript 3.1**
TypeScript version 3.1 is used by Angular 7. It is the upgrade from the version2.9 of Angular 6.

## 4. How to update Angular 4,5, 6 to Angular 7?
* First of all, you need to update the [Angular Version](https://www.onlineinterviewquestions.com/angular-js-interview-questions/) globally by inserting the latest version via the terminal: sudo npm install -g @angular/cli@latest.
* The next step is to upgrade the version locally in your project and need to assure the altering for the new version are displayed in the package.json file ng update @angular/cli
* When it is done, upgrade all your dependencies and dev dependencies in package.json
* To build Angular applications, Angular-devkit was introduced in Angular 6 that needs the dependency on the CLI projects.
* With all of this, you'll also require to upgrade the version for Typescriptnpm install typescript@2.9.2 --save-dev
* Then, you need to relocate the configuration of angular-cli.json to angular.json ng update @angular/cli and ng update @angular/core.
* Use this command: ng update @angular/material in case of Angular material is used.
* The next step is the removal of deprecated RxJS 6 features npm install -g rxjs-tslint rxjs-5-to-6-migrate -p src/tsconfig.app.json
* When it is done, uninstall rxjs-compat as it is not required for Angular npm uninstall --save rxjs-compat
* Also change import { Observable } from 'rxjs/Observable'; to import { Observable } from 'rxjs';
* Finally, you are able to start your Angular 7 application by using ng serve

## 5. Explain Bazel?
Bazel is a test tool just like the Make, Maven and Gradlen and it is an open-source build. Bazel utilizes the readable and high-level build language. It handles the project in a great number of languages and builds the product for a large number of platforms. Moreover, it supports multiple users and large codebases over several repositories.

## 6. How to generate a class in Angular 7 using CLI?
Create a class using below code:

ng generate class <name> [options]

ng g class <name> [options]

Where name refers the name of a class.

Options refer to the project name, spec value in Boolean or type of a file

## 7. How can you create a decorator in Angular?
There are two ways to register decorators in Angular. These are:
$provide.decorator, and
module.decorator

## 8. How can you handle events in Angular 7?
There are various methods to handle events in Angular 7. These are:

1. **Binding to user input events**: You are able to use the Angular event binding to answer to DOM event. User input triggers so many DOM events. It is a very effective method to get the input from the user.
For example,
 <button (click)="onClickMe()">Click me!</button>
2. **Get user input from the event object**: DOM carries a cargo of the information that possibly is valuable for the components. Here is an example to show you the keyup event of an input box to obtain the user's input after every stroke
src/app/keyup.components.ts (template v.1) 
content_copy 
<pre>
template: `
<input (keyup)="onKey($event)"> 
<p>{{values}}</p> 
<pre>

3. **Key event filtering**: Every keystroke is heard by the (keyup) event handler. The enter keys matter the most as it provides the sign of the user that he has done with the typing. The most efficient method of eliminating the noise is to look after every $event.keyCode and the action is taken only when the enter key is pressed.