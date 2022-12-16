# Lời nói đầu
Trong những năm qua, tôi đã sử dụng một loạt các Code Editor khác nhau; TextMate, Php Storm, Sublime Text, Atom, và mỗi cái có những ưu điểm và nhược điểm khác nhau. Tuy nhiên, Visual Studio Code thì tôi đã hoàn toàn bị thuyết phục cho đến lúc này. Có rất nhiều các bài viết về tính năng vượt trội của nó so với các Code editor khác. Tuy nhiên trong bài viết này tôi sẽ chỉ chia sẻ về các phím tắt của Visual Studio Code sẽ giúp chúng ta tối ưu các thao tác hơn trong quá trình xử lý.
Để xem bảng các phím tắt này chúng ta có thể bật Visual Studio Code lên và vào các mục  File > Preferences > Keyboard Shortcuts. (Code > Preferences > Keyboard Shortcuts on macOS)  

![](https://images.viblo.asia/05552409-1ec6-4106-b8f9-7479a0c733a7.gif)

Các phím tắt dưới đây sẽ dùng cho macOS nếu bạn dùng Win chỉ cần thay ⌘ => Ctrl, ⇧ => Shift, ⌥ => Alt
# Basic Editing
| Key | Command  |
| -------- | -------- |
| ⌘X     | Cut line (empty selection)     |
| ⌘C     | Copy line (empty selection)     | 
| ⇧⌘K    | Delete Line    | 
| ⌘Enter     | Insert Line Below     |
| ⇧⌘Enter     | Insert Line Above     | 
| ⌥↓     | Move Line Down     | 
| ⌥↑     | Move Line Up     | 
| ⇧⌥↓     | Copy Line Down     | 
| ⇧⌥↑     | Copy Line Up     |
| ⌘D     | Add Selection To Next Find Match     | 
| ⌘K ⌘D     | Move Last Selection To Next Find Match     | 
| ⌘U     | Undo last cursor operation     | 
| ⇧⌥I    | Insert cursor at end of each line selected     |  
| ⇧⌘L    | Select all occurrences of current selection    | 
| ⌘F2     | Select all occurrences of current word     | 
| ⌘L     | Select current line     | 
| ⌥⌘↓     | Insert Cursor Below     | 
| ⌥⌘↑     | Insert Cursor Aove     | 
| ⇧⌘\    | Jump to matching bracket     | 
| ⌘]     | Indent Line     | 
| ⌘[    | Outdent Line    | 
| Home     | Go to Beginning of Line     | 
| End     | Go to End of Line     | 
| ⌘↓    | Go to End of File    | 
| ⌘↑    | Go to Beginning of File     | 
| ⌃PageDown     | Scroll Line Down     | 
| ⌃PageUp     | Scroll Line Up     | 
| ⌘PageDown     | Scroll Page Down     | 
| ⌘PageUp     | Scroll Page Up     | 
| ⌥⌘[     | Fold (collapse) region     | 
| ⌥⌘]     | Unfold (uncollapse) region     | 
| ⌘K ⌘[    | Fold (collapse) all subregions     | 
| ⌘K ⌘]    | Unfold (uncollapse) all subregions     | 
| ⌘K ⌘0     | Fold (collapse) all regions     | 
| ⌘K ⌘J     | Unfold (uncollapse) all regions     | 
| ⌘K ⌘C     | Add Line Comment    | 
| ⌘K ⌘U     | Remove Line Comment	    | 
| ⌘/     | Toggle Line Comment     | 
| ⇧⌥A     | Toggle Block Comment     | 
| ⌘F     | Find     | 
| ⌥⌘F     | Replace     | 
| ⌘G    | Find Next    | 
| ⇧⌘G     | Find Previous     | 
| ⌥Enter     | Select All Occurrences of Find Match     | 
| ⌥⌘C    | Toggle Find Case Sensitive     | 
| ⌥⌘R     | Toggle Find Regex     | 
| ⌥⌘W     | Toggle Find Whole Word     | 
| ⌃⇧M     | Toggle Use of Tab Key for Setting Focus     | 
| unassigned     | Toggle Render Whitespace     | 
| ⌥Z     | Toggle Word Wrap     | 

# Rich Languages Editing
| Key | Command  |
| -------- | -------- |
| ⌃Space     | Trigger Suggest    |
| ⇧⌘Space     | Trigger Parameter Hints    |
| ⇧⌥F     | Format Document    |
| ⌘K ⌘F     | Format Selection    |
| F12     | Go to Definition    |
| ⌘K ⌘I     | Show Hover    |
| ⌥F12     | Peek Definition    |
| ⌘K F12	     | Open Definition to the Side    |
| ⌘.     | Quick Fix    |
| ⇧F12     | Peek References    |
| F2     | Rename Symbol    |
| ⇧⌘.     | Replace with Next Value    |
| ⇧⌘,     | Replace with Previous Value    |
| ⌃⇧⌘→     | Expand AST Selection    |
| ⌃⇧⌘←     | Shrink AST Selection    |
| ⌘K ⌘X	     | Trim Trailing Whitespace    |
| ⌘K M     | Change Language Mode	   |

# Navigation
| Key | Command  |
| -------- | -------- |
| ⌘T     | Show All Symbols    |
| ⌃G     | Go to Line...    |
| ⌘P     | Go to File..., Quick Open    |
| ⇧⌘O     | Go to Symbol...    |
| ⇧⌘M     | Show Problems    |
| F8     | Go to Next Error or Warning    |
| ⇧F8     | Go to Previous Error or Warning    |
| ⇧⌘P    | Show All Commands    |
| ⌃⇧Tab	     | Navigate Editor Group History    |
| ⌃-     | Go Back    |
| ⌃-     | Go back in Quick Input	    |
| ⌃⇧-     | Go Forward    |

# Editor/Window Management
| Key | Command  |
| -------- | -------- |
| ⇧⌘N    | New Window   |
| ⇧⌘W    | Close Window   |
| ⌘W    | Close Editor   |
| ⌘K F    | Close Folder   |
| ⌘\    | Split Editor   |
| ⌘1    | Focus into First Editor Group   |
| ⌘2    | Focus into Second Editor Group   |
| ⌘3    | Focus into Third Editor Group   |
| ⌘K ⇧⌘←	    | Move Editor Left   |
| ⌘K ⇧⌘→    | Move Editor Right   |
| ⌘K ←    | Move Active Editor Group Left   |
| ⌘K →    | Move Active Editor Group Right	   |
| ⌃⌘→    | Move Editor into Next Group   |
| ⌃⌘←    | Move Editor into Previous Group   |

# File Management
| Key | Command  |
| -------- | -------- |
| ⌘N    | New File   |
| ⌘S    | Save   |
| ⌥⌘S    | Save All	   |
| ⇧⌘S    | Save As...   |
| ⌘W    | Close   |
| ⌥⌘T    | Close Others   |
| ⌘K W    | Close Group   |
| ⌘K ⌘W    | Close All   |
| ⇧⌘T    | Reopen Closed Editor   |
| ⌘K Enter    | Keep Open   |
| ⌃Tab    | Open Next   |
| ⌃⇧Tab    | Open Previous   |
| ⌘K P    | Copy Path of Active File   |
| ⌘K R    | Reveal Active File in Windows   |
| ⌘K O    | Show Opened File in New Window   |

# Display
| Key | Command  |
| -------- | -------- |
| ⌃⌘F    | Toggle Full Screen    |
| ⌘K Z    | Toggle Zen Mode    |
| Escape Escape    | Leave Zen Mode    |
| ⌘=    | Zoom in    |
| ⌘-    | Zoom out    |
| ⌘Numpad0    | 	Reset Zoom    |
| ⌘B    | Toggle Sidebar Visibility    |
| ⇧⌘E    | Show Explorer / Toggle Focus    |
| ⇧⌘F    | Show Search    |
| ⌃⇧G    | Show Source Control    |
| ⇧⌘D    | Show Debug    |
| ⇧⌘X    | Show Extensions    |
| ⇧⌘U    | Show Output    |
| ⌃Q    | Quick Open View    |
| ⇧⌘C    | Open New Command Prompt    |
| ⇧⌘V    | Toggle Markdown Preview    |
| ⌘K V    | Open Preview to the Side    |
| ⌃`    | Toggle Integrated Terminal    |

# Search
| Key | Command  |
| -------- | -------- |
| ⇧⌘F   | Show Search    |
| ⇧⌘H    | Replace in Files    |
| ⌥⌘C    | Toggle Match Case    |
| ⌥⌘W    | Toggle Match Whole Word    |
| ⌥⌘R    | Toggle Use Regular Expression    |
| ⇧⌘J	    | Toggle Search Details    |
| F4    | Focus Next Search Result    |
| ⇧F4    | Focus Previous Search Result    |
| ↓    | Show Next Search Term    |
| ↑    | Show Previous Search Term    |

# Preferences
| Key | Command  |
| -------- | -------- |
| ⌘,  | Open Settings    |
| ⌘K ⌘S  | Open Keyboard Shortcuts    |
| ⌘K ⌘T  | Select Color Theme    |

# Debug
| Key | Command  |
| -------- | -------- |
| F9 | Toggle Breakpoint    |
| F5 | Start    |
| F5 | Continue    |
| ⌃F5 | Start (without debugging)    |
| F6 | Pause      | 
| F11 | Step Into       | 
| ⇧F11 |  Step Out      | 
| F10 |  Step Over      | 
| ⇧F5 |  Stop      | 
| ⌘K ⌘I | Show Hover   | 

# Tasks
| Key | Command  |
| -------- | -------- |
| ⇧⌘B | Run Build Task    |
| ⇧⌘T | Run Test Task    |

# Nguồn 
Tham khảo tại https://code.visualstudio.com/docs/getstarted/keybindings