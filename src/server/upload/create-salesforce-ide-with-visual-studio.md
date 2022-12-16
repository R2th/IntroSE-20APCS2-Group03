## Overview
Before to develop Salesforce backend part, Eclipse + Force.com IDE and Sublime Text + Mavens Mate were common.
But now we can develop it with VS code. For detail plelase check following release note.

Release note :
https://releasenotes.docs.salesforce.com/en-us/winter19/release-notes/rn_vscode_any_org.htm

Seem to this is sound cool and easy to develop.
On top of that  MavensMate support is already expired, so better to use VS Code.

### Instruction

#### 1. Install Saleforce CLI
    

   Run following command to check if have Salesforce CLI.

     $ sfdx plugins --core

   Should be displayed like. 
   
    
    salesforcedx 44.2.2 (core) 
    
 
   If there is no it, you can DL from here.
    https://developer.salesforce.com/tools/sfdxcli

 <br>
 
#### 2. Install VS Code extention 
https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode

<br>

#### 3. Create Project
Open Command palette (Ctrl+Shift+P/Cmd+Shift+P), Then select `SFDX: Create Project with Manifest`.
You can select where you create the PJ, after selected it, PJ will be generated.
![](https://images.viblo.asia/2d69ce15-294c-429a-b1d0-46cbe5e3608b.png)

  <br>
  
#### 4. Connect Salesforce 
Open Command palette then select `SFDX: Authorize an Org`.

![](https://images.viblo.asia/20278469-2565-4a48-bc04-c8c5ba797e9d.png)

And then select type organization which you want to connect.

![](https://images.viblo.asia/f728bb72-e083-434a-8410-fed3f640eabd.png)

After selected it, browser will opened automatically.
You can login with your credential.

Then check console if following message is displayed, your are connecting.
```
Successfully authorized xxxx@exmaple.com with org ID 00DXXXXXXXXXXXXXXX
You may now close the browser
```

<br>
      
#### Reference 
https://forcedotcom.github.io/salesforcedx-vscode/
https://qiita.com/shunkosa/items/e6248520bff90f397158
https://www.sunbit.co.jp/blog/2018/08/21740/