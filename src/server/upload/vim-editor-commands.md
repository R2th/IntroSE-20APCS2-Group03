### VIM Editor Commands

Vim is an editor to create or edit a text file.   

There are two modes in vim. One is the **`command mode`** and another is the**`insert mode`**.  

In the **command mode**, user can move around the file, delete text, etc.  

In the **insert mode**, user can insert text.  

### Changing mode from one to another  
**From** command mode **to** insert mode type `a/A/i/I/o/O` ( see details below)  
**From** insert mode **to** command mode type `Esc` (escape key)

### Some useful commands for VIM  

###### _Text Entry Commands_ (Used to start text entry)

| KEY|FUNCTION| 
|:-------------|:-------------| 
| `a`|_Append text following current cursor position_|
| `A`|_Append text to the end of current line_|
| `i`|_Insert text before the current cursor position_|
| `I`|_Insert text at the beginning of the cursor line_|
| `o`|_Open up a new line following the current line and add text there_| 
|`O`|_Open up a new line in front of the current line and add text there_|

###### The following commands are used only in the **commands mode**.

###### Cursor Movement Commands  

| KEY|FUNCTION| 
|:-------------|:-------------| 
| `h`|_Moves the cursor one character to the left_|
| `l`|_Moves the cursor one character to the right_|
| `k`|_Moves the cursor up one line_|
| `j`|_Moves the cursor down one line_|
| `o`|_Open up a new line following the current line and add text there_| 
|`O`|_Open up a new line in front of the current line and add text there_|
|`nG or :n`| _Cursor goes to the specified (n) line_. (ex. `10G` goes to line 10) |
|`^F (CTRl F)`|_Forward screenful_| 
|`^B`|_Backward screenful_| 
|`^f `|_One page forward_| 
|`^b`|_One page backward_| 
|`^U`|_Up half screenful_| 
|`^D`|_Down half screenful_| 
|`$`|_Move cursor to the end of current line_| 
|`0 (zero)`|_Move cursor to the beginning of current line_| 
|`w`|_Forward one word_| 
|`b`|_Backward one word_| 

**Exit Commands** 

|KEY|FUNCTION|
|:-------------|:-------------| 
|`:wq`|_Write file to disk and quit the editor_|
|`:q!`|_Quit (no warning)_|
|`:q`|_Quit (a warning is printed if a modified file has not been saved)_|
|`ZZ`|_Save workspace and quit the editor (same as :wq)_|
|`: 10,25 w temp`|_write lines 10 through 25 into file named temp. Of course, other line numbers can be used. (Use :f to find out the line numbers you want_|

**Text Deletion Commands** 

|KEY|FUNCTION|
|:-------------|:-------------| 
|`x`|_Delete character_|
|`dw`|_Delete word from cursor on _|
|`db`|_Delete word backward _|
|`dd`|_Delete line _|
|`d$`|_Delete to end of line _|
|`d^` (d caret, not CTRL d)|_ Delete to beginning of line_|

**Yank (has most of the options of delete)-- VI's copy commmand**

|KEY|FUNCTION|
|:-------------|:-------------| 
|`yy`|_yank current line_|
|`y$`|_yank to end of current line from cursor_|
|`yw`|_yank from cursor to end of current word _|
|`5yy`|_yank, for example, 5 lines _|

**Paste (used after delete or yank to recover lines.)**  

|KEY|FUNCTION|
|:-------------|:-------------| 
|`p`|_paste below cursor_|
|`P`|_paste above cursor_| 
|`2p`|_paste from buffer 2 (there are 9)_| 
|`u`|_Undo last change_| 
|`U`|_Restore line_| 
|`J`|_Join next line down to the end of the current line_| 

**File Manipulation Commands**  

|KEY|FUNCTION|
|:-------------|:-------------| 
|`:w`|_Write workspace to original file_|
|`:w file`|_Write workspace to named file_|
|`:e file`|_Start editing a new file_|
|`:r file`|_Read contents of a file to the workspace_| 
 
To create a page break, while in the insert mode, press the `CTRL` key  

**Other Useful Commands** 
Most commands can be repeated n times by typing a number, n, before the command. For example 10dd means delete 10 lines.

**Repeat last command** 

|KEY|FUNCTION|
|:-------------|:-------------| 
|`cw`|_ Change current word to a new word_| 
|`r`|_Replace one character at the cursor position_| 
|`R`|_Begin overstrike or replace mode � use ESC key to exit_| 
|`:/`|_pattern Search forward for the pattern_| 
|`:/pattern`|_Search forward for the pattern_| 
|`:?pattern`|_Search backward for the pattern_| 
|`n`|_(used after either of the 2 search commands above to continue to find next occurrence of the pattern._|
|`:g/pat1/s//pat2/g`|_replace every occurrence of pattern1 (pat1) with pat2_| 
|`:g/tIO/s//Ada.Text_IO/g`|_This will find and replace tIO by Ada.text_IO everywhere in the file._|
|`:g/a/s// /g`|_ replace the letter a, by blank_|

##### Examples

###### Opening a New File  
```
Step 1 type vim filename	(create a file named filename) 
Step 2 type i	( switch to insert mode)  
Step 3 enter text (enter your Ada program) 
Step 4 hit Esc key	(switch back to command mode) 
Step 5 type :wq	(write file and exit vim)
```   
###### Editing the Existing File  
```
Step 1 type vim filename	(edit the existing file named filename) 
Step 2 move around the file using h/j/k/l key or any appropriate command 
h Moves the cursor one character to the left  
l Moves the cursor one character to the right  
k Moves the cursor up one line 
j Moves the cursor down one line  
nG or :n Cursor goes to the specified (n) line  
(ex. 10G goes to line 10)  
Step 3 edit required text (replace or delete or insert)  
Step 4 hit Esc key (exit from insert mode if you insert or replace text)  
Step 5 type :wq 
```  
Reference : 
https://mytutorials.xyz/post/view/VIM-Editor-Commands/5/1060/1060