Với những ngôn ngữ mới hiệnt tại, để tạo một một Tab hết sức đơn giản, chỉ với html+css3 bạn cũng có thể làm được.
Xong đôi khi bạn cần tuỳ biến nó cho một yêu cầu đặt biệt nào khác cần js. Bài chia sẽ này mình sẽ thực hiện tạo một Tab với Js
Hi vọng sẽ giúp ích cho các bạn! 
* Html:
    ```<div class="tab">
		<div class="tab_ttl">
			<ul>
				<li><a class="tab_ttl_item" href="javascript:void(0)">tab 1</a></li>
				<li><a class="tab_ttl_item" href="javascript:void(0)">tab 2</a></li>
				<li><a class="tab_ttl_item" href="javascript:void(0)">tab 3</a></li>
			</ul>
		</div>
		<div class="tab_content">
			<div class="tab_content_item">
				111111111111111111111
			</div>
			<div class="tab_content_item">
				22222222222222222222
			</div>
			<div class="tab_content_item">
				3333333333333333333
			</div>
		</div>
	</div>```*
* Css:
    ```
    .tab {
        display: table;
        margin: 50px auto;
        .tab_ttl {
            ul {
                display: block;
                font-size: 0;
                li {
                    display: inline-block;
                    a {
                        width: 200px;
                        border: solid 1px #000;
                        font-size: 20px;
                        display: block;
                        text-align: center;
                        &.active {
                            color: blue;
                            text-decoration: none;
                        }
                    }
                }
            }
        }
        .tab_content {
            .tab_content_item {
                font-size: 20px;
                padding: 20px 0;
                text-align: center;
                background: #d5d5d5;
                animation-duration: 0.75s;
                animation-fill-mode: both;
                animation-name: vanishIn;
            }
        }
    }
    @keyframes vanishIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    ```

* Js:
    ```var Tab = function() {
            this._tab = document.getElementsByClassName('tab');
            this._ttl;
            this._ttlItem;
            this._contentItem;
            this._iTitle;
            this._iLast;
            if(!this._tab.length) return;
            this.init();
        }
        Tab.prototype = {
            init : function() {
                var _self = this;
                this.reset();
                for(var i = 0;i < this._tab.length; i++) {
                    this._ttl = this._tab[i].getElementsByClassName('tab_ttl_item');
                    for(var j = 0; j< this._ttl.length; j++) {
                        this._ttl[j].addEventListener('click', function(e){_self.handling(e.currentTarget)}, false);
                    }
                }
            },
            handling: function(_item) {
                this.findAncestor = function(el, cls) {
                    while ((el = el.parentElement) && !el.classList.contains(cls));
                    return el;
                }
                var index = Array.prototype.indexOf.call(this._tab, this.findAncestor(_item,'tab'));
                this._ttlItem = this._tab[index].getElementsByClassName('tab_ttl_item');
                this._contentItem = this._tab[index].getElementsByClassName('tab_content_item');
                this._iTitle = Array.prototype.indexOf.call(this._ttlItem, _item);
                this.triggerTab(this._ttlItem, this._contentItem, this._iTitle);
            },
            triggerTab: function(_tit, _content, _index) {
                for(var j = 0; j < _tit.length; j++) {
                    _tit[j].classList.remove('active');
                    _content[j].classList.remove('active');
                    _content[j].style.display = 'none';
                }
                _tit[_index].classList.add('active');
                _content[_index].classList.add('active');
                _content[_index].style.display = 'block';
            },
            reset : function() {
                for(var i = 0; i< this._tab.length; i++) {
                    var item = this._tab[i];
                    this._ttl = item.getElementsByClassName('tab_ttl_item');
                    this._contentItem = item.getElementsByClassName('tab_content_item');
                    item.classList.contains('last') ? this._iLast = this._ttl.length - 1 : this._iLast = 0;

                    for(var j = 0;j < this._ttl.length; j++) {
                        this._ttl[j].classList.remove('active');
                        this._contentItem[j].classList.remove('active');
                        this._contentItem[j].style.display = 'none';

                        this._ttl[this._iLast].classList.add('active');
                        this._contentItem[this._iLast].classList.add('active');
                        this._contentItem[this._iLast].style.display = 'block';
                    }
                }
            }
        }

        window.addEventListener('DOMContentLoaded', function() {
            new Tab();
        });```


Vậy là đã done. Các bạn có thể xem chi tiết hơn ở đây: https://codepen.io/yes_no8x/pen/oJWEdJ

Bài chia sẽ hi vọng có ích!
Cảm ơn các bạn đã quan tâm.