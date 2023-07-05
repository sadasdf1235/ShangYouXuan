window.onload = function(){
    var Num = 0
    //路径导航
    navpathbind();
    function navpathbind(){
        //获取内容区 path盒子
    const navpath = document.querySelector('.path')
    // 获取动态数据
    const path = goodData.path
    // 动态添加a span
    for(let i = 0;i < path.length;i++){
        if(i === path.length - 1){
            //最后一个a不设置href
            var apath = document.createElement('a')
            apath.innerText = path[i].title
            navpath.appendChild(apath)
        }else{
            var apath = document.createElement('a')
            apath.href = path[i].url
            apath.innerText = path[i].title
            var spanpath = document.createElement('span')
            spanpath.innerText = '/'
            navpath.appendChild(apath)
            navpath.appendChild(spanpath)
        }
        
    }
    }
    //放大镜的移入移出
    bigClassbind();
    function bigClassbind(){
        var smallPic = document.querySelector('.smallgalss')
        var glass = document.querySelector('.glass')
        var imgessrc = goodData.imgessrc
        //移入
        smallPic.addEventListener('mouseenter',()=>{
            //创建蒙版元素
            var maskDiv = document.createElement('div');
            maskDiv.className = 'mask';
            //创建大图框
            var bigPic = document.createElement('div');
            bigPic.className = 'bigglass'
            //创建大图片
            var bigImg = document.createElement('img');
            bigImg.src = imgessrc[Num].b
            //大图框追加图片
            bigPic.appendChild(bigImg);
            //小图框追加蒙版
            smallPic.appendChild(maskDiv);
            //galss追加大图框
            glass.appendChild(bigPic)
            // 移动
            smallPic.onmousemove = function(e){
                //left top  是蒙版与小边框的距离 
                // 鼠标当前位置-小变框距离浏览器左边的位置-蒙版自身宽度的一半
                var left = e.clientX-smallPic.getBoundingClientRect().left-maskDiv.offsetWidth/2
                var top = e.clientY-smallPic.getBoundingClientRect().top-maskDiv.offsetHeight/2
                // 限制蒙版移动范围
                if(left < 0 ){
                    left = 0
                }else if(left > smallPic.clientWidth - maskDiv.offsetWidth){
                    left = smallPic.clientWidth - maskDiv.offsetWidth
                }
                if(top < 0 ){
                    top = 0
                }else if(top > smallPic.clientHeight - maskDiv.offsetHeight){
                    top = smallPic.clientHeight - maskDiv.offsetHeight
                }
                maskDiv.style.left = left + 'px'
                maskDiv.style.top = top + 'px'
                var scale = (smallPic.clientWidth - maskDiv.offsetWidth)/(bigImg.offsetWidth-bigPic.clientWidth)
                bigImg.style.left = -left/scale + 'px'
                bigImg.style.top = -top/scale + 'px'
            }
            // 移出
            smallPic.onmouseleave = function(){
                smallPic.removeChild(maskDiv)
                glass.removeChild(bigPic)
            }
        })
    }
    //动态渲染缩略图中的数据
    thumbnailData();
    function thumbnailData(){
        //获取缩略图中的ul
        const ul = document.querySelector('.centerimg .imgs ul')
        //获取图片数据
        var imgessrc = goodData.imgessrc
        for(let i = 0;i<imgessrc.length;i++){
            var newLi = document.createElement("li")
            var newImg = document.createElement('img')
            newImg.src = imgessrc[i].s
            newLi.appendChild(newImg)
            ul.appendChild(newLi)
        }
    }
    //缩略图点击切换图片
    thumbnailClick();
    function thumbnailClick(){
        const liNode = document.querySelectorAll('.centerimg .imgs ul li')
        var imgessrc = goodData.imgessrc
        for(let i=0;i<liNode.length;i++){
            liNode[i].addEventListener('click',function(){
                //小图
                Num = i
                const imgGalss = document.querySelector('.smallgalss img')
                imgGalss.src = imgessrc[Num].s
            })
        }
    }
    //轮播图效果
    thumbnailLeftRightClick()
    function thumbnailLeftRightClick(){
        // const centerimg = document.querySelector('.centerimg')
        const ul = document.querySelector('.centerimg .imgs ul')
        const liNodes = document.querySelectorAll('.centerimg .imgs ul li')
        const centera = document.querySelectorAll('.centerimg a')
        //起始位置
        var start = 0
        //步长
        var step = liNodes[0].offsetWidth + 20
        //最大移动距离
        var endPosition = (liNodes.length - 5)*step
        centera[0].onclick = function(){
            start -= step
            if(start < 0){
                start = 0
            }
            ul.style.left = -start + 'px'
        }
        centera[1].onclick = function(){
            start += step
            if(start > endPosition){
                start = endPosition
            }
            ul.style.left = -start + 'px'
        }
    }
    // 价格详情
    detailsData()
    function detailsData(){
        var details = document.querySelector('.details')
        var goodsDetail = goodData.goodsDetail
        var s = `
        <div class="detailsH">
        <h3>${goodsDetail.title}</h3>
        <p>${goodsDetail.recommend}</p>
        </div>
    <div class="detailsP">
       <div class="price">
        <div class="priceP clearfix">
            <span>价&nbsp;&nbsp;&nbsp;&nbsp;格</span>
            <span>￥</span>
            <span>${goodsDetail.price}
                <p>降价通知</p>
            </span>
            <span>累计评价&nbsp;
                <p>${goodsDetail.evaluateNum}</p>
            </span>
        </div>
        <div class="priceC clearfix">
            <p>促&nbsp;&nbsp;&nbsp;&nbsp;销
            <span>${goodsDetail.promoteSales.type}&nbsp;</span>
            <span>${goodsDetail.promoteSales.content}</span>
            </p>
        </div>
       </div>
       <div class="support clearfix">
        <span>支&nbsp;&nbsp;&nbsp;&nbsp;持</span>
        <p>${goodsDetail.support}</p>
       </div>
       <div class="distribution clearfix">
        <span> 
            配送至
        </span>
        <p>
            ${goodsDetail.address}
        </p>
       </div>
       </div>
       `
       details.innerHTML = s
    }
    // 商品参数选中区域 数据动态渲染
    rightBottomData()
    function rightBottomData(){
        var select = document.querySelector('.select')
        var crumbData = goodData.goodsDetail.crumbData
        for(var i=0;i<crumbData.length;i++){
            var dlNode = document.createElement('dl')
            var dtNode = document.createElement('dt')
            dtNode.innerText = crumbData[i].title
            dlNode.className = 'clearfix'
            dlNode.appendChild(dtNode)
            for(let j=0;j<crumbData[i].data.length;j++){
                var ddNode = document.createElement('dd')
                ddNode.innerText = crumbData[i].data[j].type
                dlNode.appendChild(ddNode)
            }
            select.appendChild(dlNode)
        }
    }
    //商品参数点击 排他效果
    clickddBind()
    function clickddBind(){
        var crumbData = goodData.goodsDetail.crumbData
        var dlNodes = document.querySelectorAll('.select dl')
        var choose = document.querySelector('.choose')
        var arr = new Array(dlNodes.length)
        arr.fill(0)
        for(let i=0;i<dlNodes.length;i++){
          let ddNodes = dlNodes[i].querySelectorAll('dd')
          for(let j=0;j<ddNodes.length;j++){
            ddNodes[j].setAttribute('price',crumbData[i].data[j].changePrice)
            ddNodes[j].onclick = function(){
                choose.innerHTML = ''
                for(let k=0;k<ddNodes.length;k++){
                    ddNodes[k].style.color = '#666'
                }
                ddNodes[j].style.color = 'red'
                arr[i] = this
                // 添加
                arr.forEach(function(value,index){
                    if(value){
                        var markDiv = document.createElement('div')
                        markDiv.className = 'mark'
                        markDiv.innerText = value.innerText
                        var aNode = document.createElement('a')
                        aNode.innerText = 'X'
                        aNode.setAttribute('index',index)
                        markDiv.appendChild(aNode)
                        choose.appendChild(markDiv)
                        changePriceBind(arr)
                    }
                }) 
                // 删除
                var aNodes = document.querySelectorAll('.mark a')
                for(let i=0;i<aNodes.length;i++){
                    aNodes[i].onclick = function(){
                        var xdl = this.getAttribute('index')
                        arr[xdl] = 0
                        var ddlist = dlNodes[xdl].querySelectorAll('dd')
                        for(let j=0;j<ddlist.length;j++){
                            ddlist[j].style.color = '#666'
                        }
                        ddlist[0].style.color = 'red'
                        choose.removeChild(this.parentNode)
                        changePriceBind(arr)
                    }
                }
            }
          }
        }
    }
    // 点击价格变化
    function changePriceBind(arr){
        var spanNodes = document.querySelectorAll('.priceP span')
        var price = goodData.goodsDetail.price
        for(let i=0;i<arr.length;i++){
            if(arr[i]){
                var changePrice = Number(arr[i].getAttribute('price'))
                price += changePrice
            }
            spanNodes[2].innerText = price
            var listPrice = document.querySelector('.listleft p')
            listPrice.innerText = '￥'+price
            var checkInputs = document.querySelectorAll('.listmid input')
            var iPrice = document.querySelector('.listright i')
            for(let j=0;j<checkInputs.length;j++){
                if(checkInputs[j].checked){
                    price += Number(checkInputs[j].value)
                }
            }
            iPrice.innerText = '￥'+price
        }
    }
    // 配件区域价格变化
    choosePrice()
    function choosePrice(){
        var checkInputs = document.querySelectorAll('.listmid input')
        var listPrice = document.querySelector('.listleft p')
        var iPrice = document.querySelector('.listright i')
        for(let i=0;i<checkInputs.length;i++){
            checkInputs[i].onclick = function(){
                var newPrice = Number(listPrice.innerText.slice(1))
                for(let j=0;j<checkInputs.length;j++){
                    if(checkInputs[j].checked){
                        newPrice = newPrice + Number(checkInputs[j].value)
                    }
                }
                iPrice.innerText = '￥'+ newPrice
            }
        }
    }
    //左侧选项卡切换  相关分类
    leftTab()
    function leftTab(){
        var h4s = document.querySelectorAll('.leftaside .asideTop h4')
        var divs = document.querySelectorAll('.accessoriesleft .leftaside .asideBottom>div')
        for(let i=0;i<h4s.length;i++){
            h4s[i].onclick = function(){
                for(let j=0;j<h4s.length;j++){
                    h4s[j].className = ''
                    divs[j].classList.remove('asideBottomActive')
                }
                this.className = 'asideActive'
                divs[i].classList.add('asideBottomActive')
            }
        }
    }
    // 右侧选项卡切换  商品介绍
    rightTab()
    function rightTab(){
        var lis = document.querySelectorAll('.bottomDetail .tabBtns li')
        var divs = document.querySelectorAll('.bottomDetail .tabContents div')
        for(let i=0;i<lis.length;i++){
            lis[i].onclick = function(){
                for(let j=0;j<lis.length;j++){
                    lis[j].className = ''
                    divs[j].className = ''
                }
                this.className = 'tabBtnsActive'
                divs[i].className = 'tabContentsActive'
            }
        }
    }
    //点击右边侧边栏的效果
    rightAsideBind()
    function rightAsideBind(){
        var sidebar = document.querySelector('.sidebar')
        var btns = document.querySelector('.sidebar .btns')
        var flag = true //默认关闭
        btns.onclick = function(){
            if(flag){
                sidebar.className = 'sidebar asideOpen'
                btns.className = 'btns btnsOpen'
                flag = false
            }else{
                sidebar.className = 'sidebar asideClose'
                btns.className = 'btns btnsClose'
                flag = true
            }
            // flag = !flag
        }
    }
    // 鼠标移动到人像效果
    portrait()
    function portrait(){
        var lis = document.querySelectorAll('.sidebar .navList li')
        for(let i=0;i<lis.length;i++){
            lis[i].onmouseenter = function(){
                var p = this.querySelector('p')
                var i = this.querySelector('i')
                p.style.backgroundColor = 'pink'
                i.style.backgroundColor = 'pink'
                i.style.left = -62 + 'px'
                this.onmouseleave = function(){
                    p.style.backgroundColor = '#7a6e6e'
                    i.style.backgroundColor = '#7a6e6e'
                    i.style.left = 35 + 'px'
                }
            }
        }
    }
}