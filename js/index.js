let cardList = [{name:'你好'},{name:'小兔子'},{name:'您好'},{name:'小猪'}];
let backgroundUrls = ['url(./img/end.png)','url(./img/end1.png)','url(./img/end2.png)','url(./img/end3.png)'];
const PAGE ={
  data: {
    backgroundUrls: backgroundUrls,
    defaultDatas: cardList,
    itemWidth: 320,
    itemHeight: 160,
    paddingOffset: 50,
    zIndex: 0,
    item: null,
    itemOffsetTop: null,
    itemOffsetLeft: null,
    pageX: null,
    pageY: null,
    isLock: true,
  },
  init: function() {
    this.setDefaultDatas();
    this.bind();
  },
  bind: function() {
    let cartList = document.getElementById('card-list');
    $('#card-list').on('mousedown','.message-card-item',this.handleMouseDown);
    $('#card-list').on('click','.message-close',this.removeItem);
    $('#send-Message-btn').on('click',this.sendMessage);
    //$('#input-message').on('keydown',this.keyUp)
    $(window).on('mousemove',this.handleMouseMove);
    $(window).on('mouseup',this.handleMouseUp);
  },
  handleMouseDown: function(e) {
    let item = e.target;
    item.style.zIndex = ++ PAGE.data.zIndex;
    PAGE.data.itemOffsetTop = item.offsetTop;
    PAGE.data.itemOffsetLeft = item.offsetLeft;
    PAGE.data.pageX = e.pageX;
    PAGE.data.pageY = e.pageY;
    PAGE.data.item = item;
    PAGE.data.isLock = false;
  },
  handleMouseMove: function(e) {
    if(!PAGE.data.isLock){
      let containerWidth = $('#card-list').width();
      let containerHeight = $('#card-list').height();
      let itemWidth  = PAGE.data.itemWidth;
      let itemHeight = PAGE.data.itemHeight;
      let paddingOffset = PAGE.data.paddingOffset;
      let maxWidth  = containerWidth - itemWidth - paddingOffset;
      let maxHeight = containerHeight - itemHeight - paddingOffset;
      let translateX = e.pageX - PAGE.data.pageX + PAGE.data.itemOffsetLeft;
      let translateY = e.pageY - PAGE.data.pageY + PAGE.data.itemOffsetTop;
      translateX = translateX > maxWidth ? maxWidth : translateX;
      translateY = translateY > maxHeight ? maxHeight : translateY;
      translateX = translateX < paddingOffset ? paddingOffset : translateX;
      translateY = translateY < paddingOffset ? paddingOffset : translateY;
      PAGE.data.item.style.left = translateX + 'px';
      PAGE.data.item.style.top = translateY + 'px';
    }
  },
  handleMouseUp: function() {
    PAGE.data.isLock = true
  },
  // keyUp: function(e){
  //   let value =$('input#message-text').val();
  //   let key = e.which;
  //   if(key !== 13){
  //     return
  //   }
  //   PAGE.addCart(value);
  //   $(this).value = '';
  // },
  sendMessage: function(){
    let value =$('textarea#input-message').val();
    PAGE.addCart(value);
  },
  removeItem: function(){
    $(this).parent().remove();
  },
  setDefaultDatas: function(){
    PAGE.data.defaultDatas.forEach( data => PAGE.addCart(data.name));
  },
  addCart: function(name){
    let cardList = document.getElementById('card-list');
    let containerWidth = cardList.offsetWidth;
    let containerHeight = cardList.offsetHeight;
    let itemWidth = PAGE.data.itemWidth;
    let itemHeight = PAGE.data.itemHeight;
    let paddingOffset = PAGE.data.paddingOffset;
    let maxWidth = containerWidth - itemWidth - paddingOffset;
    let maxHeight = containerHeight - itemHeight - paddingOffset;
    let randomTop = PAGE.randomBetween(paddingOffset,maxHeight);
    let randomLeft = PAGE.randomBetween(paddingOffset,maxWidth);
    let zIndex = ++PAGE.data.zIndex;
    let backgroundUrls = PAGE.data.backgroundUrls;
    let backgroundUrl = backgroundUrls[zIndex%backgroundUrls.length];
    let value =$('textarea#input-message').val();
    let cartItem = `
    <div class="message-card-item" style="z-index:${zIndex};background:${backgroundUrl};top:${randomTop}px;left:${randomLeft}px;">
      <div class="message-left-img">
        <img src="./img/mleft.png">
      </div>
      <div class="message-right-img">
        <img src="./img/mright.png">
      </div>
      <div id="close-message" class="message-close">
        <img src="./img/close.png">
      </div>
      <div class="message-borad-talk">小兔兔说:</div>
      <div id="message-text" class="message-borad-text">${value}</div>
    </div>`; 
    $('#card-list').append(cartItem);
  },
  randomBetween: function(min,max){
    return Math.floor(Math.random()*(max-min)+min);
  }
}
PAGE.init();