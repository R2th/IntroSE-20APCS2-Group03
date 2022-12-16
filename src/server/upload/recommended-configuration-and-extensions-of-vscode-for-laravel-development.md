> I am Jeremiah Caballero, one of the Development Team Lead of Sun* Philippines.  This article will mainly discuss what extensions and configuration you need for Laravel Development.

<br>
One of the most important tool that a developer should have is a good IDE, I have experienced different kinds of them like Atom,  PhpStorm (by JetBrains), and Sublime Text, but in this year I got to know a new IDE that have gotten famous and that is Visual Studio Code. So far it has good features that helped me develop laravel apps efficiently. I will share to you what are recommended configurations and extentions for developing Laravel Apps.

# Extensions

## PHP Extensions
#### PHP Intellisense
Since Laravel Framework is PHP, this extension is really a big help in writing your code. 

**Features**:
1. *Completion*
1. *Sinature Help*
1. *Workspace Symbol Search*
1. *Find All References*
1. *Go To Definition*
1. *Hover*
1. *Find all symbols*
1. *Column-accurate error reporting*
    
I will not be discussing more about the features, but if you want you can visit their repository [here](https://github.com/felixfbecker/php-language-server#features). But overall this is a recommended extension because it helps you write your code more efficiently.
    
**Installation:**
     
   [![Image from Gyazo](https://i.gyazo.com/811c25f20e1f937a07d52762387961ff.gif)](https://gyazo.com/811c25f20e1f937a07d52762387961ff)

---
## Laravel Framework Extensions
#### Laravel Blade Snippets
When we use Laravel it uses a template engine called *blade*. To make our VSCode support this engine we need to install the **Laravel Blade Snippets**.
    
   **Features:**
    <br>It provides list of blade directives and automatically writes down the blade directives.
    
   [![Image from Gyazo](https://i.gyazo.com/95ab523c0951a65a4766071140bb1c6c.gif)](https://gyazo.com/95ab523c0951a65a4766071140bb1c6c)
    
   **Installation:**
 
   [![Image from Gyazo](https://i.gyazo.com/a8b8b68be887f4c0c2e0bf434b782615.gif)](https://gyazo.com/a8b8b68be887f4c0c2e0bf434b782615)
    
<br>

#### Laravel Artisan
Artisan is one of the best feauture of Laravel Framework. It is where we generate our controllers and models as well. It can do more but overall it's very cool feature, but VSCode brings us good news because instead of running on terminal, we can actually automatically run it in our IDE. Let's have a comparison by running `php artisan route:list`: 
    
 **Feature:**
 <br>In Normal Terminal:
    
 [![Image from Gyazo](https://i.gyazo.com/ecc31533e4b6bffb7c439e3ec76108a0.gif)](https://gyazo.com/ecc31533e4b6bffb7c439e3ec76108a0)
    
 In VSCode:
    
 [![Image from Gyazo](https://i.gyazo.com/cb518848d3097546634eb9293b7b897f.gif)](https://gyazo.com/cb518848d3097546634eb9293b7b897f)
    
It outputs the same but the difference is that in VSCode it is more user friendly. Like the example above in the IDE you can actually search the routes using a search box provided by the extension.
    
[![Image from Gyazo](https://i.gyazo.com/69983a91ea8836f3cef50b63689eb5f0.gif)](https://gyazo.com/69983a91ea8836f3cef50b63689eb5f0)
    
 There is still more artisan commands listed so if you want to try it you can install the extension.
    
  **Installation:**
[![Image from Gyazo](https://i.gyazo.com/6365e59856363136a20b458a1ca28ed4.gif)](https://gyazo.com/6365e59856363136a20b458a1ca28ed4)

<br>

#### Laravel 5 snippets
Last, but not the least, I recommend to install the **Laravel 5 snippets** . Same as *Laravel Blade Snippets* it provides the list of Laravel 5 classes and automatically writes it down in your code.
    
  [![Image from Gyazo](https://i.gyazo.com/563e230a71409c1013093a6b6d011897.gif)](https://gyazo.com/563e230a71409c1013093a6b6d011897)
    
 **Installation:**
    [![Image from Gyazo](https://i.gyazo.com/6ea9c1355da883b2a3cef7a591b16c20.gif)](https://gyazo.com/6ea9c1355da883b2a3cef7a591b16c20)

### Extras

If you are creating classes most likely you need to add the namespace so that you can access the class object, to do that you need to manually input `use Acme\ClassName` and sometimes you need to know where the class is located. This extension that I recommend solves this problem and it's called **PHP Namespace Resolver**. It just automatically append the namespace of the class as shown below:

[![Image from Gyazo](https://i.gyazo.com/a2517f128538c6ec7192085d969841e0.gif)](https://gyazo.com/a2517f128538c6ec7192085d969841e0)

**Installation:**
[![Image from Gyazo](https://i.gyazo.com/2584ad6f47822a82f646f0ba446d5c59.gif)](https://gyazo.com/2584ad6f47822a82f646f0ba446d5c59)



# Configuration
Awhile ago we intalled the *Laravel Blade Snippet*, what we need to do now is to the some configuration enable foramattion for our blade. Open `Prefences > Settings` search the word `Emmet` and then look for `Edit in settings.json`
[![Image from Gyazo](https://i.gyazo.com/a1d509806f95a4aa9dc9620d33e4f95a.png)](https://gyazo.com/a1d509806f95a4aa9dc9620d33e4f95a)

Look for this codes and enable them by change their value from `false` to `true`:
```
"emmet.triggerExpansionOnTab": true, // enable tab to expanse emmet tags
"blade.format.enable": true,         // if you would like to enable blade format
```


# Conclusion
VSCode is a lot of things and it can really make your development easy. Install this Extentions and you and it will improve your development speed. 

If you want to install more extension, I suggest first to check documentation and consider if it is necessary in your development.