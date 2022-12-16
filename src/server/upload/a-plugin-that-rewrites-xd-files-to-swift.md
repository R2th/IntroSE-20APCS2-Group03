# Introduction
One day you got the XD file from the designer. The image will be a file with various colors defined, like the ones in your image.

From here, you can check all the colors and create an extension for UIColor, but after all, the manual work is troublesome. 

There was no way to automate it, so this project started.

![](https://images.viblo.asia/41e38a15-d483-4e1c-b77e-aa92cbc323f7.png)


# How to create

Basically, it will be JavaScript. You can also use HTML and CSS, but these are for use when you want to display a View on XD, so I will not mention this time. 

As far as I can see the code of the sample, it seems that Vue and React can also be used.

# How to begin

The plugin must be located under the directory `/Users/username/Library/Application Support/Adobe/Adobe XD/develop`

Basically, I think that it can be created automatically by selecting `Plugin/Development version/Create plugin`

At this time, two files  `main.js` and `manifest.json` are needed.

I will write an introduction of the `manifest.json` file.

* manifest.json
```
{
    "name": "SwiftColorConverter",
    "id": "Private Key",
    "version": "1.0.0",
    "description": "translate the color code of the object to Swift",
    "host":{
        "app": "XD",
        "minVersion":"13.0.0"
    },
    "uiEntryPoints":[
        {
          "type":"menu",
          "label":"swiftColorConverter",
          "commandId":"swiftColorConverter"
        }
    ]
}
```

Since this file is a file for enumerating the basic setting items, there is nothing to project so far.

Next, let's take a look at the contents of `main.js`.

* main.js

```
const fs = require("uxp").storage.localFileSystem;

async function swiftColorConverter(selection) {
    //being selected item
    const items = selection.items;

    if(items.length === 0) {
        console.log("Object is not selected");
        return;
    }

    let colorArray = [];
    items.forEach(item => {
        //not get the color if the object is not a circle
        if(item.constructor.name === "Ellipse") {
            colorArray.push(item.fill);
        } else {
            console.log("Could not get color from this object");
        }
    })

    //Write out to folder
    const userFolder = await fs.getFolder();
    const newFile = await userFolder.createEntry("UIColor+extension.swift", {overwrite: true});
    newFile.write(swiftConvertModel(colorArray));
}

function swiftConvertModel(colorArray) {
    let swiftText = 'import UIKit\n\nextension UIColor {\n    public enum Name: String {\n';
    for(let i = 0; i < colorArray.length; i++) {
        const colorName = colorArray[i].value.toString(16) + 'Color';
        swiftText += '        case ' + colorName + '\n'

    }
    swiftText += '    }\n\n'
    swiftText += '    public convenience init(name: Name) {\n        switch name {\n'
    for(let i = 0; i < colorArray.length; i++) {
        //Converts color code to hexadecimal and RGB
        const colorName = colorArray[i].value.toString(16) + 'Color';
        const colorCode = '0x' + colorArray[i].value.toString(16).slice(2);
        const red = (colorArray[i].r / 255).toFixed(10);
        const green = (colorArray[i].g / 255).toFixed(10);
        const blue = (colorArray[i].b / 255).toFixed(10);
        swiftText += '        case .' + colorName + ':\n            self.init(hex: ' + colorCode + ')'
        swiftText += ' //#colorLiteral(red: ' + red + ', green: ' + green + ', blue: ' + blue + ', alpha: 1)\n'
    }
    swiftText += '        }\n    }\n'
    swiftText += '}'
    return swiftText;
}

module.exports = {
    commands: {
        swiftColorConverter: swiftColorConverter
    }
}
```

I'll explain the contents of this code in the next section.

# Calling the main method
It will be associated with the command set in the manifest. By doing this, the swiftColorConverter can be called out when the plugin is executed.

At this time, selection, which is set as an argument, will be passed as an array of the objects selected when the command is executed.

```
module.exports = {
    commands: {
        swiftColorConverter: swiftColorConverter
    }
}
```

# How to get the color code
I basically want to get the color code in both hex and RGB. I will introduce the acquisition method.

One of the elements of the `selectionItem` obtained earlier is set as item. In addition, this time, in particular, I decided to select the color only for circular objects.

There is a class called Color as one of the XD classes, and that class manages colors. This time I want to get the color that fills the object, so

Access it like `item.fill`. `Color` class reference

How to get the hex and RGB values is as follows.

```
//hex
//Convert Color value to hexadecimal
const hex = item.fill.value.toString(16)

//RGB
const red = item.fill.r
const green = item.fill.g
const blue = item.fill.b
```

# File export method
First, at the top of the file, let's write:

```
const fs = require("uxp").storage.localFileSystem;
```

 Without it, you will not be able to access the file.

Next, I will show how to write a file.

Since we will use await this time, let's make the original method async!

```
//Specify the destination folder here.
const userFolder = await fs.getFolder();
//File name is decided here. If you want to change the file name/file format, you can do it here
const newFile = await userFolder.createEntry("UIColor+extension.swift", {overwrite: true});
```

# Create Swift file

I'm feeling good from here. 

I think it's difficult, but let's change it to the format you want to make!

In my case, I made this setting as follows.
```
function swiftConvertModel(colorArray) {
    let swiftText = 'import UIKit\n\nextension UIColor {\n    public enum Name: String {\n';
    for(let i = 0; i < colorArray.length; i++) {
        const colorName = colorArray[i].value.toString(16) + 'Color';
        swiftText += '        case ' + colorName + '\n'
    }
    swiftText += '    }\n\n'
    swiftText += '    public convenience init(name: Name) {\n        switch name {\n'
    for(let i = 0; i < colorArray.length; i++) {
        //Converts color code to hexadecimal and RGB
        const colorName = colorArray[i].value.toString(16) + 'Color';
        const colorCode = '0x' + colorArray[i].value.toString(16).slice(2);
        const red = (colorArray[i].r / 255).toFixed(10);
        const green = (colorArray[i].g / 255).toFixed(10);
        const blue = (colorArray[i].b / 255).toFixed(10);
        swiftText += '        case .' + colorName + ':\n            self.init(hex: ' + colorCode + ')'
        swiftText += ' //#colorLiteral(red: ' + red + ', green: ' + green + ', blue: ' + blue + ', alpha: 1)\n'
    }
    swiftText += '        }\n    }\n'
    swiftText += '}'
    return swiftText;
}
```

# Let's try to execute
Select the object whose color you want to get, and select Plugin/Development/Reload Plugin from the XD menu.

In XD, select Swift Color Converter from the menu

When I execute it,

A Swift file like this will be generated.

```
UIColor+Extension.swift
import UIKit

extension UIColor {
    public enum Name: String {
        case ff808080Color
        case ffacacacColor
        case ffeaea1eColor
        case ff000000Color
        case ff38f647Color
        case fff2a1a7Color
    }

    public convenience init(name: Name) {
        switch name {
        case .ff808080Color:
            self.init(hex: 0x808080) //#colorLiteral(red: 0.5019607843, green: 0.5019607843, blue: 0.5019607843, alpha: 1)
        case .ffacacacColor:
            self.init(hex: 0xacacac) //#colorLiteral(red: 0.6745098039, green: 0.6745098039, blue: 0.6745098039, alpha: 1)
        case .ffeaea1eColor:
            self.init(hex: 0xeaea1e) //#colorLiteral(red: 0.9176470588, green: 0.9176470588, blue: 0.1176470588, alpha: 1)
        case .ff000000Color:
            self.init(hex: 0x000000) //#colorLiteral(red: 0.0000000000, green: 0.0000000000, blue: 0.0000000000, alpha: 1)
        case .ff38f647Color:
            self.init(hex: 0x38f647) //#colorLiteral(red: 0.2196078431, green: 0.9647058824, blue: 0.2784313725, alpha: 1)
        case .fff2a1a7Color:
            self.init(hex: 0xf2a1a7) //#colorLiteral(red: 0.9490196078, green: 0.6313725490, blue: 0.6549019608, alpha: 1)
        }
    }
}
```

# Ending
You can do reference here
https://github.com/tosh7/SwiftColorConverter