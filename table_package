
function creatNewUXTable()
{
    var G_UXTABLE = new UXTABLE();
    $(window).resize(function()
    {
        G_UXTABLE.uxTableMethod('resetView');
    });
    return G_UXTABLE;
}
function UXTABLE() {}
UXTABLE.prototype.g_showPageNum = 5;
UXTABLE.prototype.g_curClickBtIndex = 0;
UXTABLE.prototype.g_pageSize = 50;
UXTABLE.prototype.g_onePackSize = 250;
UXTABLE.prototype.g_clickToSelect = true;
UXTABLE.prototype.g_clickRowIptType = "radio";
//每页可视的表格条目
UXTABLE.prototype.g_visualLen = 18;
UXTABLE.prototype.g_bLastPageHeightMod = true;
UXTABLE.prototype.g_pageNumIndex = 0;
UXTABLE.prototype.g_totalPageNum = 2;
UXTABLE.prototype.g_bHasNextPack = false;
UXTABLE.prototype.g_bHasPrevPack = false;
//UXTABLE.prototype.g_autoReqNextPackFlag = false;
//UXTABLE.prototype.g_autoReqNextPackDataLen = 0;


UXTABLE.prototype.g_allPackCheckedArray = [];
UXTABLE.prototype.g_allPackSelectedArray = [];
UXTABLE.prototype.g_packIndex = 0;
UXTABLE.prototype.g_curPackLen = 0;
UXTABLE.prototype.g_selectedRowsArray = [];
UXTABLE.prototype.g_onePackCheck = [];
UXTABLE.prototype.g_tbIDName = "";
UXTABLE.prototype.g_modIDName = "";
UXTABLE.prototype.g_delIDName = "";
UXTABLE.prototype.g_height = 750;
UXTABLE.prototype.g_reqDataFlag = 0;
UXTABLE.prototype.g_bPagination = true;
UXTABLE.prototype.g_prevPackCallBackFun=function(){};
UXTABLE.prototype.g_nextPackCallBackFun=function(){};
UXTABLE.prototype.g_firstPackCallBackFun=function(){};
UXTABLE.prototype.g_lastPackCallBackFun=function(){};
UXTABLE.prototype.g_pageChangeCallBackFun=function(){};
UXTABLE.prototype.g_btGroupID = ["buttonOne","buttonTwo","buttonThree","buttonFour","buttonFive"];

UXTABLE.prototype.initUXTable = function(tbOperObj,columnsPar,editFun)
{
    this.g_tbIDName = tbOperObj.tbID;
    this.g_modIDName = tbOperObj.btModID;
    this.g_delIDName = tbOperObj.btDelID;
    this.g_height = window.innerHeight * 0.85;
    this.g_onePackSize = tbOperObj.packSize;

    if(typeof tbOperObj.tbHeight != "undefined")
    {
        this.g_height = tbOperObj.tbHeight;
    }
    this.g_showPageNum = this.g_btGroupID.length;
    if(typeof tbOperObj.bPagination != "undefined")
    {
        this.g_bPagination = tbOperObj.bPagination;
    }
    this.g_visualLen = tbOperObj.visualLen || 18;
    this.g_pageSize = tbOperObj.pageSize || 50;
    this.initTable(tbOperObj,columnsPar);
    this.initTableEvent(editFun);
    if(this.g_bPagination)
    {
        this.initBtGroupHTML();
        this.initBtGroupEvent();
    }
    $(".fixed-table-body").mCustomScrollbar();
};

UXTABLE.prototype.setPrevPackCallBackFunc = function(func)
{
    this.g_prevPackCallBackFun = func;
};

UXTABLE.prototype.setNextPackCallBackFunc = function(func)
{
    this.g_nextPackCallBackFun = func;
};

UXTABLE.prototype.setFirstPackCallBackFunc = function(func)
{
    this.g_firstPackCallBackFun = func;
};

UXTABLE.prototype.setLastPackCallBackFunc = function(func)
{
    this.g_lastPackCallBackFun = func;
};

UXTABLE.prototype.setPageChangeCallBackFun = function(func)
{
    this.g_pageChangeCallBackFun = func;
};

UXTABLE.prototype.setToTargetPackCallBackFun = function(func)
{
    this.g_toTargetPackCallBackFun = func;
};
UXTABLE.prototype.setPageChangeCallBackFun = function(func)
{
    this.g_pageChangeCallBackFun = func;
};
//刷新数据，重新从后台获取数据
UXTABLE.prototype.refreshUXTable = function(jsonObjData,bHasNextPack,totalPage)
{
    //复位操作
    this.g_pageNumIndex = 0;
    this.g_curClickBtIndex = 0;
    this.g_packIndex = 0;
    this.g_reqDataFlag = 0;
    this.g_bHasNextPack = bHasNextPack;
    this.g_selectedRowsArray = [];
    this.g_allPackCheckedArray = [];
    this.g_allPackSelectedArray = [];
    //先调整视图再加载数据
    this.loadDataToTable(jsonObjData,bHasNextPack,totalPage);

};
//添加监听事件
UXTABLE.prototype.addUXTableEvent = function(eventStr,callBackFunc)
{
    var $table = $('#'+this.g_tbIDName);
    $table.on(eventStr, callBackFunc);
};

//添加对表的操作方法
UXTABLE.prototype.uxTableMethod = function(funcName,parameter)
{
    $('#'+this.g_tbIDName).bootstrapTable(funcName,parameter);
};

UXTABLE.prototype.getSelection = function()
{
    return this.g_selectedRowsArray;
};
UXTABLE.prototype.getAllPackSelection = function()
{
    return this.g_allPackSelectedArray;
};

UXTABLE.prototype.loadDataToTable = function(dataObj,bHasNextPack,totalPage)
{
    if(typeof dataObj == "undefined" || bHasNextPack == "undefined" || totalPage == "undefined")
    {
        return;
    }


    this.g_totalPageNum = totalPage;
    this.$uxpagination_detail.find(".totalPageText").html(this.g_totalPageNum);
    this.g_bHasNextPack = bHasNextPack;
    this.g_curPackLen = dataObj.length;
    this.g_showPageNum = this.getPageNumByTotalRowNum(dataObj.length);
    var $firstPage,$prevPage,$nextPage,$lastPage;
    $firstPage = this.$uxpagination.find(".firstPage");
    $prevPage = this.$uxpagination.find(".prevPage");
    $nextPage = this.$uxpagination.find(".nextPage");
    $lastPage = this.$uxpagination.find(".lastPage");
    $uxTopage = this.$uxpagination_detail.find(".toPageBtn");
    $uxTopageNum = this.$uxpagination_detail.find("input[name = 'uxTopageNum']");
    if(this.g_totalPageNum > 0)
    {
        $firstPage.show();
        $prevPage.show();
        $nextPage.show();
        $lastPage.show();
        this.$uxpagination_detail.show();
        if(this.g_totalPageNum > 1){
            this.$uxpagination_detail.removeClass("textdisabled");
            $uxTopage.removeClass("delBtnClass").addClass("admitClick").removeAttr("disabled");
            $uxTopageNum.removeClass("undisabled").removeAttr("disabled");
        }else{
            this.$uxpagination_detail.addClass("textdisabled");
            $uxTopage.removeClass("admitClick").addClass("delBtnClass").attr("disabled","true");
            $uxTopageNum.addClass("undisabled").attr("disabled","true");
        }
    } else{
        $firstPage.hide();
        $prevPage.hide();
        $nextPage.hide();
        $lastPage.hide();
        this.$uxpagination_detail.hide();
    }
    //恢复视图，表格高度
    if(this.g_bLastPageHeightMod && this.g_curPackLen > this.g_visualLen && this.g_showPageNum > 0)
    {
        $('#'+this.g_tbIDName).bootstrapTable('refreshOptions',{height:this.g_height});
        this.g_bLastPageHeightMod = false;
    }
    //请求上一页数据
    if(this.g_reqDataFlag == 1)
    {
        //加载数据到表格
        $('#'+this.g_tbIDName).bootstrapTable('load',dataObj);
        this.g_pageNumIndex = this.g_packIndex*this.g_btGroupID.length;
        this.dealWithNewPack(dataObj.length);
        //处理check
        //得到checkedArray
        var preCheckArray = this.g_allPackCheckedArray[this.g_packIndex];
        this.setOnePackCheck(preCheckArray);
    }
    else if(this.g_reqDataFlag == 2)
    {
        //先调整视图，再加载数据到表格
        if(this.g_showPageNum <= 1)
        {
            //this.adjustLastPageHeight();
        }

        $('#'+this.g_tbIDName).bootstrapTable('load',dataObj);
        this.g_pageNumIndex = this.g_packIndex*this.g_btGroupID.length;
        this.dealWithNewPack(dataObj.length);
        //处理check
        //得到checkedArray
        var nextCheckArray = this.g_allPackCheckedArray[this.g_packIndex];
        if(typeof nextCheckArray != "undefined")
        {
            this.setOnePackCheck(nextCheckArray);
        }
        else
        {
            //dealWithNewPack处理，当前为this.g_onePackCheck 为false数组
            this.g_allPackCheckedArray.push(this.g_onePackCheck);
        }
    }
    //请求指定页
    else if(this.g_reqDataFlag == 3){
        $('#'+this.g_tbIDName).bootstrapTable('load',dataObj);
        this.g_pageNumIndex = this.g_packIndex*this.g_btGroupID.length;
        this.dealWithNewPack(dataObj.length);
        //处理check
        //得到checkedArray
        var selectPageCheckArray = this.g_allPackCheckedArray[this.g_packIndex];
        if(typeof selectPageCheckArray != "undefined")
        {
            this.setOnePackCheck(selectPageCheckArray);
        }
        else
        {
            //dealWithNewPack处理，当前为this.g_onePackCheck 为false数组
            this.g_allPackCheckedArray.push(this.g_onePackCheck);
        }
    }
    else
    {

        //先调整视图，再加载数据到表格
        if(this.g_showPageNum <= 1)
        {
            //this.adjustLastPageHeight();
        }

        $("#"+this.g_tbIDName).bootstrapTable('load', dataObj);
        this.g_pageNumIndex = 0;
        this.dealWithNewPack(dataObj.length);
        this.setUserButtonStatus();
    }
    $('#'+this.g_tbIDName).bootstrapTable('resetView');
};
//修改单元格数据
UXTABLE.prototype.modifyCellData = function(row,fieldName,Celldata)
{
    $('#'+this.g_tbIDName).bootstrapTable('updateCell', {index:row,field:fieldName,value:Celldata});

};
//合并单元格
UXTABLE.prototype.mergeCellData = function(row,fieldName,rowspan,colspan)
{
    var option={"index":row,"field":fieldName,"rowspan":rowspan,"colspan":colspan};
    $('#'+this.g_tbIDName).bootstrapTable('mergeCells',option);

};
//初始化分页工具栏
UXTABLE.prototype.initPaginationBar = function()
{
    for(var i = 0; i  <  this.g_btGroupID.length; i++)
    {
        var btIDName = this.g_btGroupID[i];
        this.$uxpagination.find("."+btIDName).show();
    }

    var hideNum = this.g_btGroupID.length - this.g_showPageNum;
    for(var i = 0; i < hideNum; i++)
    {
        this.hideButton(i+this.g_showPageNum);
    }
    var $firstPage,$prevPage,$nextPage,$lastPage;
    $firstPage = this.$uxpagination.find(".firstPage");
    $prevPage = this.$uxpagination.find(".prevPage");
    $nextPage = this.$uxpagination.find(".nextPage");
    $lastPage = this.$uxpagination.find(".lastPage");

    $prevPage.removeAttr("disabled");
    $prevPage.addClass("onblur");
    $nextPage.removeAttr("disabled");
    $nextPage.addClass("onblur");
    $firstPage.removeAttr("disabled");
    $firstPage.addClass("onblur");
    $lastPage.removeAttr("disabled");
    $lastPage.addClass("onblur");

    if(this.g_reqDataFlag == 0)
    {
        $prevPage.attr({"disabled":"disabled"});
        $firstPage.attr({"disabled":"disabled"});
    }
    if(this.g_showPageNum <= 1)
    {
        $nextPage.attr({"disabled":"disabled"});
        $lastPage.attr({"disabled":"disabled"});
    }
    this.onPageChanged(this.g_btGroupID[this.g_curClickBtIndex]);
    //页码处理
    for(var i = 0; i < this.g_showPageNum; i++)
    {
        var labelText = this.g_pageNumIndex + i + 1;
        this.setPageNumberLabel(i,labelText.toString());
    }

};
//初始化按钮组监听事件
UXTABLE.prototype.initBtGroupEvent = function()
{
    var $btGroup = this.$uxpagination.find('.btGroup');
    var that = this;
    $btGroup.click(function(par)
    {
        if(that.g_showPageNum <= 1)
        {
            return;
        }
        var clickBtObj = par.target;
        that.onPageChanged(clickBtObj.classList[2]); //clickBtObj.classList[2] = that.g_btGroupID[i],唯一区别button
        var $firstPage,$prevPage,$nextPage,$lastPage;
        $firstPage = that.$uxpagination.find(".firstPage");
        $prevPage = that.$uxpagination.find(".prevPage");
        $nextPage = that.$uxpagination.find(".nextPage");
        $lastPage = that.$uxpagination.find(".lastPage");

        $prevPage.removeAttr("disabled");
        $prevPage.addClass("onblur");
        $nextPage.removeAttr("disabled");
        $nextPage.addClass("onblur");
        $firstPage.removeAttr("disabled");
        $firstPage.addClass("onblur");
        $lastPage.removeAttr("disabled");
        $lastPage.addClass("onblur");

        var bLast = ((that.g_curClickBtIndex) < (that.g_showPageNum -1) ? false: true);
        if(that.g_bLastPageHeightMod && !bLast)
        {
            $('#'+that.g_tbIDName).bootstrapTable('refreshOptions',{height:that.g_height});
            that.g_bLastPageHeightMod = false;
        }
        if(bLast)
        {
            if(that.g_bHasNextPack)
            {
                $nextPage.removeAttr("disabled");
                $nextPage.addClass("onblur");
                $lastPage.removeAttr("disabled");
                $lastPage.addClass("onblur");
            }
            else
            {
                $nextPage.attr({"disabled":"disabled"});
                $lastPage.attr({"disabled":"disabled"});
                //处理最后一个页面的表格高度
                //that.adjustLastPageHeight();
            }

        }
        var pageIn = Number(that.g_curClickBtIndex)+1;
        $('#'+that.g_tbIDName).bootstrapTable('selectPage',pageIn);
        var numberLabel = that.getPageNumberLabel(that.g_curClickBtIndex);
        if(numberLabel == 1)
        {
            $prevPage.attr({"disabled":"disabled"});
            $firstPage.attr({"disabled":"disabled"});
            return;
        }
    });

};

UXTABLE.prototype.initBtGroupHTML = function()
{

    var htmlStr = '<div class="uxpagination">';
    htmlStr += '<button class="btn btn-sm onblur firstPage" style="margin:0 5px;">&laquo;</button>';
    htmlStr += '<button class="btn btn-sm onblur prevPage" style="margin:0 5px;">上一页</button>';
    htmlStr += '<div class="btn-group btGroup">';
    htmlStr += '<button  class="btn btn-link buttonOne"> 1</button>';
    htmlStr += '<button  class="btn btn-link buttonTwo"> 2</button>';
    htmlStr += '<button  class="btn btn-link buttonThree">3</button>';
    htmlStr += '<button  class="btn btn-link buttonFour"> 4</button>';
    htmlStr += '<button  class="btn btn-link buttonFive"> 5</button>';
    htmlStr += '</div>';
    htmlStr += '<button class="btn btn-sm onblur nextPage" style="margin:0 0 0 5px;">下一页</button>';
    htmlStr += '<button class="btn btn-sm onblur lastPage" style="margin:0 0 0 5px;">&raquo;</button>';
    htmlStr += '</div>';
    htmlStr += '<div class="uxpagination-detail">总共<span class = "totalPageText">'+ this.g_totalPageNum + '</span>页，到第';
    htmlStr += '<input type="text" name="uxTopageNum" class = "uxTopageNum">页<button class = "toPageBtn">确&nbsp;&nbsp;定</button>';
    //创建分页工具栏
    this.$uxclearfix = $('#'+this.g_tbIDName).parent().parent().parent().next();
    this.$uxclearfix.after(htmlStr);
    this.$uxpagination = this.$uxclearfix.next();
    this.$uxpagination_detail = this.$uxpagination.next();
    var $firstPage, $prevPage,
        $nextPage, $lastPage,$uxTopage;
    $firstPage = this.$uxpagination.find(".firstPage");
    $prevPage = this.$uxpagination.find(".prevPage");
    $nextPage = this.$uxpagination.find(".nextPage");
    $lastPage = this.$uxpagination.find(".lastPage");
    $uxTopage = this.$uxpagination_detail.find(".toPageBtn");
    $firstPage.off('click').on('click', $.proxy(this.firstPage, this));
    $prevPage.off('click').on('click', $.proxy(this.prevPage, this));
    $nextPage.off('click').on('click', $.proxy(this.nextPage, this));
    $lastPage.off('click').on('click', $.proxy(this.lastPage, this));
    $uxTopage.off('click').on('click', $.proxy(this.toTargetPage, this));
};
//修改按钮组颜色属性
UXTABLE.prototype.onPageChanged = function(btIDName)
{
    if(btIDName == "")
    {
        return;
    }

    this.g_selectedRowsArray = [];
    this.setUserButtonStatus();
    this.g_pageChangeCallBackFun();

    for (i in this.g_btGroupID)
    {
        var btIDStr = this.g_btGroupID[i];
        if(btIDStr != btIDName)
        {
            this.$uxpagination.find("."+btIDStr).removeClass("active");
        }
        else
        {
            this.g_curClickBtIndex = i;
        }
    }
    this.$uxpagination.find("."+btIDName).addClass("active");
};

//调整最后一页的数据高度
UXTABLE.prototype.adjustLastPageHeight = function()
{
    var lastDataLen =  (this.g_curPackLen) % (this.g_pageSize);
    if(((lastDataLen > 0) && (lastDataLen < this.g_visualLen)) || (this.g_curPackLen == 0) )
    {
        this.g_bLastPageHeightMod = true;
        $('#'+this.g_tbIDName).bootstrapTable('refreshOptions',{height:''});
    }
};
//刷新表格高度
UXTABLE.prototype.refreshTableHeight = function()
{

    this.g_height = window.innerHeight * 0.9;
    $('#'+this.g_tbIDName).bootstrapTable('refreshOptions',{height:this.g_height});
    if(this.g_curClickBtIndex == this.g_showPageNum -1)
    {
        //this.adjustLastPageHeight();
    }
    //$('#'+this.g_tbIDName).bootstrapTable('resetView');

};

//记录check信息
UXTABLE.prototype.recordSingleCheckInfo = function(clickRowIndex,oneRowInfo,bChecked)
{
    if(clickRowIndex < 0)
    {
        return;
    }
    //记录checkstatus
    if(this.g_clickRowIptType == "radio"){
        if(bChecked)
        {
            this.g_onePackCheck[clickRowIndex] = true;
            this.g_allPackCheckedArray = [];
            this.g_allPackSelectedArray = [];
            this.g_selectedRowsArray = [];
            this.g_selectedRowsArray.push(oneRowInfo);
            this.g_allPackSelectedArray.push(oneRowInfo);
        }
    }else{
        if(bChecked)
        {
            this.g_onePackCheck[clickRowIndex] = true;
            var findIndex = inArrayObj(oneRowInfo,this.g_selectedRowsArray);
            if(findIndex == -1)
            {
                this.g_selectedRowsArray.push(oneRowInfo);
            }
            var selectedIndex = inArrayObj(oneRowInfo,this.g_allPackSelectedArray);
            if(selectedIndex == -1)
            {
                this.g_allPackSelectedArray.push(oneRowInfo);
            }

        }
        else
        {
            this.g_onePackCheck[clickRowIndex] = false;
            var findIndex = inArrayObj(oneRowInfo,this.g_selectedRowsArray);
            if(findIndex != -1)
            {
                this.g_selectedRowsArray.splice(findIndex,1);
            }
            var selectedIndex = inArrayObj(oneRowInfo,this.g_allPackSelectedArray);
            if(selectedIndex != -1)
            {
                this.g_allPackSelectedArray.splice(selectedIndex,1);
            }
        }

    }
};
//判断elem对象是否在array中
function inArrayObj( elem, array ) {
    for ( var i = 0, length = array.length; i < length; i++ )
        if ( array[i].index === elem.index )
            return i;
    return -1;
}
//记录当前页 全选/全不选
UXTABLE.prototype.recordCheckAllInfo = function(dataArray,bChechAll)
{
    this.g_clickRowIptType = "checkbox";
    var checkArrayPosition = this.g_curClickBtIndex * this.g_pageSize;
    var dataLen = dataArray.length;
    var tarLen =  checkArrayPosition + dataLen;
    if(bChechAll)
    {
        var i = checkArrayPosition;
        var j = 0;
        for(; i < tarLen; i++,j++)
        {
            this.g_onePackCheck[i] = true;
            var oneRowInfo = dataArray[j];
            this.recordSingleCheckInfo(i,oneRowInfo,true);
        }

    }
    else
    {
        var i = checkArrayPosition;
        var j = 0;
        for(; i < tarLen; i++,j++)
        {
            this.g_onePackCheck[i] = false;
            var oneRowInfo = dataArray[j];
            this.recordSingleCheckInfo(i,oneRowInfo,false);

        }
    }

};
UXTABLE.prototype.setUserButtonStatus = function()
{
    $('#'+this.g_delIDName).attr({"disabled":"disabled"}).css({
        "background":"none",
        "color": "#999",
        "border": "2px solid #999",
        "cursor": "not-allowed"
    });
    if(this.g_allPackSelectedArray.length > 0)
    {
        $('#'+this.g_delIDName).removeAttr("disabled").css({
            "background-color":"#57D1F7",
            "color": "#091621",
            "border": "0px solid #57D1F7",
            "cursor": "pointer"
        });
    }

};
//初始化表格监听事件
UXTABLE.prototype.initTableEvent = function(editFun)
{
    var $table = $('#'+this.g_tbIDName);
    var that = this;
    //单选
    $table.on('check.bs.table uncheck.bs.table', function (parA,parB,events) {
        var clickRow =events[0];
        that.g_clickRowIptType = $(clickRow).attr("type");
        var clickRowIndex;
        if(typeof (clickRow) == "undefined")
        {
            clickRowIndex = parB.index -1;
        }
        else
        {
            clickRowIndex =clickRow.dataset.index;
        }
        var bChecked = false;
        if(parA.type == "check")
        {
            bChecked = true;
        }
        that.recordSingleCheckInfo(clickRowIndex,parB,bChecked);
        //修改按钮状态
        that.g_selectedRowsArray = $table.bootstrapTable('getSelections');
        that.setUserButtonStatus();

    });

    //全选
    $table.on('check-all.bs.table uncheck-all.bs.table', function (parA,parB) {
        var bChechAll = false;
        that.g_clickRowIptType = "checkbox";
        if(parA.type == "check-all")
        {
            bChechAll = true;
            that.g_selectedRowsArray = $table.bootstrapTable('getData',{useCurrentPage:true});
        }
        else
        {
            that.g_selectedRowsArray = [];
        }
        var curPageData =  $table.bootstrapTable('getData',{useCurrentPage:true});
        that.recordCheckAllInfo(curPageData,bChechAll);
        //修改按钮状态

        that.setUserButtonStatus();
    });
    //更改页
    $table.on('page-change.bs.table', function (parA,parB) {
        if(typeof editFun == "function" && editFun != undefined) {
            editFun();
        }
    });
};

//前一页
UXTABLE.prototype.prevPage = function()
{
    if(this.g_bLastPageHeightMod)
    {
        $('#'+this.g_tbIDName).bootstrapTable('refreshOptions',{height:this.g_height});
        this.g_bLastPageHeightMod = false;
    }

    var $firstPage,$prevPage,$nextPage,$lastPage;
    $firstPage = this.$uxpagination.find(".firstPage");
    $prevPage = this.$uxpagination.find(".prevPage");
    $nextPage = this.$uxpagination.find(".nextPage");
    $lastPage = this.$uxpagination.find(".lastPage");
    this.g_selectedRowsArray = [];
    this.setUserButtonStatus();
    this.g_curClickBtIndex--;
    if(this.g_curClickBtIndex < 0)
    {
        this.g_curClickBtIndex = 0;
        //请求前一包数据
        $nextPage.removeAttr("disabled");
        $nextPage.addClass("onblur");
        $lastPage.removeAttr("disabled");
        $lastPage.addClass("onblur");
        this.reqPrevPackData();
        return;
    }
    if(this.g_curClickBtIndex == 0)
    {
        var numberLabel = this.getPageNumberLabel(this.g_curClickBtIndex);
        if(numberLabel == 1)
        {
            $prevPage.attr({"disabled":"disabled"});
            $firstPage.attr({"disabled":"disabled"});
        }
    }
    $nextPage.removeAttr("disabled");
    $nextPage.addClass("onblur");
    $lastPage.removeAttr("disabled");
    $lastPage.addClass("onblur");
    var pageIndex = Number(this.g_curClickBtIndex) % Number(this.g_showPageNum) ;
    this.onPageChanged(this.g_btGroupID[pageIndex]);
    $('#'+this.g_tbIDName).bootstrapTable('prevPage');
};
//下一页
UXTABLE.prototype.nextPage = function()
{
    this.g_selectedRowsArray = [];
    this.setUserButtonStatus();
    this.g_curClickBtIndex++;
    var $firstPage,$prevPage,$nextPage,$lastPage;
    $firstPage = this.$uxpagination.find(".firstPage");
    $prevPage = this.$uxpagination.find(".prevPage");
    $nextPage = this.$uxpagination.find(".nextPage");
    $lastPage = this.$uxpagination.find(".lastPage");
    $prevPage.removeAttr("disabled");
    $prevPage.addClass("onblur");
    $firstPage.removeAttr("disabled");
    $firstPage.addClass("onblur");
    var pageIndex = Number(this.g_curClickBtIndex) % Number(this.g_showPageNum) ;
    if(pageIndex == 0  )
    {
        if(this.g_bHasNextPack)
        {
            this.reqNextPackData();
            return;
        }
    }
    if(this.g_curClickBtIndex >= this.g_showPageNum -1)
    {
        if(!this.g_bHasNextPack)
        {
            $nextPage.attr({"disabled":"disabled"});
            $lastPage.attr({"disabled":"disabled"});
            //处理最后一个页面的表格高度
            //this.adjustLastPageHeight();
        }

    }

    this.onPageChanged(this.g_btGroupID[pageIndex]);
    $('#'+this.g_tbIDName).bootstrapTable('nextPage');

};

//首页
UXTABLE.prototype.firstPage = function()
{
    if(this.g_bLastPageHeightMod)
    {
        $('#'+this.g_tbIDName).bootstrapTable('refreshOptions',{height:this.g_height});
        this.g_bLastPageHeightMod = false;
    }

    this.g_selectedRowsArray = [];
    this.setUserButtonStatus();
    this.g_curClickBtIndex = 0;
    this.reqFirstPackData();

    var $firstPage,$prevPage,$nextPage,$lastPage;
    $firstPage = this.$uxpagination.find(".firstPage");
    $prevPage = this.$uxpagination.find(".prevPage");
    $nextPage = this.$uxpagination.find(".nextPage");
    $lastPage = this.$uxpagination.find(".lastPage");
    $prevPage.attr({"disabled":"disabled"});
    $firstPage.attr({"disabled":"disabled"});
    $nextPage.removeAttr("disabled");
    $nextPage.addClass("onblur");
    $lastPage.removeAttr("disabled");
    $lastPage.addClass("onblur");
    var pageIndex = Number(this.g_curClickBtIndex) % Number(this.g_showPageNum) ;
    this.onPageChanged(this.g_btGroupID[pageIndex]);
    $('#'+this.g_tbIDName).bootstrapTable('selectPage', 1);
};
//尾页
UXTABLE.prototype.lastPage = function()
{
    this.g_selectedRowsArray = [];
    this.setUserButtonStatus();
    this.reqLastPackData();
    var $firstPage,$prevPage,$nextPage,$lastPage;
    $firstPage = this.$uxpagination.find(".firstPage");
    $prevPage = this.$uxpagination.find(".prevPage");
    $nextPage = this.$uxpagination.find(".nextPage");
    $lastPage = this.$uxpagination.find(".lastPage");
    $prevPage.removeAttr("disabled");
    $prevPage.addClass("onblur");
    $firstPage.removeAttr("disabled");
    $firstPage.addClass("onblur");
    this.g_curClickBtIndex = this.g_showPageNum - 1;
    var pageIndex = Number(this.g_curClickBtIndex) % Number(this.g_showPageNum) ;
    $nextPage.attr({"disabled":"disabled"});
    $lastPage.attr({"disabled":"disabled"});
    //处理最后一个页面的表格高度
    //this.adjustLastPageHeight();
    this.onPageChanged(this.g_btGroupID[pageIndex]);
    $('#'+this.g_tbIDName).bootstrapTable('selectPage', this.g_showPageNum);

};
//跳转至选择页
UXTABLE.prototype.toTargetPage = function()
{
    if(this.g_bLastPageHeightMod)
    {
        $('#'+this.g_tbIDName).bootstrapTable('refreshOptions',{height:this.g_height});
        this.g_bLastPageHeightMod = false;
    }

    this.g_selectedRowsArray = [];
    this.setUserButtonStatus();
    var $firstPage,$prevPage,$nextPage,$lastPage,$uxTopageNum;
    $firstPage = this.$uxpagination.find(".firstPage");
    $prevPage = this.$uxpagination.find(".prevPage");
    $nextPage = this.$uxpagination.find(".nextPage");
    $lastPage = this.$uxpagination.find(".lastPage");
    $uxTopageNum = this.$uxpagination_detail.find(".uxTopageNum");
    var toPageNum = parseInt($uxTopageNum.val());
    var firstBtGroupChild = parseInt(this.$uxpagination.find(".btGroup button:first-child").html());
    var lastBtGroupChild = parseInt(this.$uxpagination.find(".btGroup button:last-child").html());
    if(toPageNum > 0 && toPageNum <= this.g_totalPageNum && toPageNum != NaN)
    {
        //this.g_packIndex = Math.floor(toPageNum*this.g_pageSize/this.g_onePackSize);
        this.g_curClickBtIndex = toPageNum -1;
        $nextPage.removeAttr("disabled");
        $nextPage.addClass("onblur");
        $lastPage.removeAttr("disabled");
        $lastPage.addClass("onblur");
        if(toPageNum > 1){
            $prevPage.removeAttr("disabled");
            $prevPage.addClass("onblur");
            $firstPage.removeAttr("disabled");
            $firstPage.addClass("onblur");
        }
        if(toPageNum < firstBtGroupChild || toPageNum > lastBtGroupChild){ // 请求页没在当前包，修请求目标页所在包
            //请求目标页所在的包数据
            this.g_curClickBtIndex = toPageNum -1;
            this.reqToTargetPackData();
        }
        if(this.g_curClickBtIndex == 0)
        {
            var numberLabel = this.getPageNumberLabel(this.g_curClickBtIndex);
            if(numberLabel == 1)
            {
                $prevPage.attr({"disabled":"disabled"});
                $firstPage.attr({"disabled":"disabled"});
            }
        }
        var pageIndex = Number(this.g_curClickBtIndex) % 5;
        this.g_curClickBtIndex = pageIndex;
        if(this.g_curClickBtIndex == this.g_showPageNum -1)
        {
            if(!this.g_bHasNextPack)
            {
                $nextPage.attr({"disabled":"disabled"});
                $lastPage.attr({"disabled":"disabled"});
                //处理最后一个页面的表格高度
                //this.adjustLastPageHeight();
            }
        }
        this.onPageChanged(this.g_btGroupID[pageIndex]);
        var selectedPageNum = pageIndex + 1;
        $('#'+this.g_tbIDName).bootstrapTable('selectPage', selectedPageNum);
    }else{
        return;
    }
};

//隐藏按钮组按钮
UXTABLE.prototype.hideButton = function (btIndex)
{
    if(btIndex < 0)
    {
        return;
    }
    var btIDName = this.g_btGroupID[btIndex];
    this.$uxpagination.find("."+btIDName).hide();
};
//初始化一包数据的check状态
UXTABLE.prototype.initOnePackCheckStatus = function ()
{
    var totalRow = this.g_showPageNum * this.g_pageSize;
    this.g_onePackCheck = new Array;
    for (var i = 0; i < totalRow; i++)
    {
        this.g_onePackCheck[i] = false;
    }

};

UXTABLE.prototype.setOnePackCheck = function (checkedArray)
{
    for(var i = 0; i < this.g_curPackLen; i++)
    {
        var bChecked = checkedArray[i];
        this.g_onePackCheck[i] = bChecked;
        if(bChecked)
        {
            $('#'+this.g_tbIDName).bootstrapTable('check',i);
        }
        else
        {
            $('#'+this.g_tbIDName).bootstrapTable('uncheck',i);
        }

    }

};
//请求上一包数据
UXTABLE.prototype.reqPrevPackData = function ()
{
    //ajax请求数据
    //分页处理
    //保存当前页check状态
    this.g_reqDataFlag = 1;
    this.g_allPackCheckedArray[this.g_packIndex] = this.g_onePackCheck;
    this.g_packIndex--;
    if(this.g_packIndex < 0)
    {
        this.g_packIndex = 0;
        return;
    }
    this.g_curClickBtIndex = this.g_btGroupID.length -1;
    this.g_bHasNextPack = true;
    this.g_prevPackCallBackFun();
    //用户调用 loadDataToTable 加载数据

};
//请求下一包数据
UXTABLE.prototype.reqNextPackData  = function ()
{
    this.g_reqDataFlag = 2;
    this.g_bHasPrevPack = true;
    //下一包数据页数待定
    this.g_curClickBtIndex = 0;
    //保存当前包的check状态
    this.g_allPackCheckedArray[this.g_packIndex] = this.g_onePackCheck;

    this.g_packIndex++;
    this.g_nextPackCallBackFun();
    //用户调用 loadDataToTable 加载数据

};


//请求第一包数据
UXTABLE.prototype.reqFirstPackData = function ()
{
    //ajax请求数据
    //分页处理
    //保存当前页check状态
    this.g_reqDataFlag = 3;
    this.g_allPackCheckedArray[this.g_packIndex] = this.g_onePackCheck;
    //this.g_packIndex = 1;
    this.g_packIndex = 0;
    this.g_curClickBtIndex = 0;
    this.g_bHasNextPack = true;
    this.g_firstPackCallBackFun();
    //用户调用 loadDataToTable 加载数据

};
//请求最后一包数据
UXTABLE.prototype.reqLastPackData  = function ()
{
    this.g_reqDataFlag = 3;
    this.g_bHasPrevPack = false;
    //下一包数据页数待定
    this.g_curClickBtIndex = this.g_btGroupID.length -1;
    //保存当前包的check状态
    this.g_allPackCheckedArray[this.g_packIndex] = this.g_onePackCheck;
    this.g_packIndex = Math.ceil(this.g_totalPageNum*this.g_pageSize/this.g_onePackSize) - 1 ;
    this.g_lastPackCallBackFun();
    //用户调用 loadDataToTable 加载数据
};

//请求目标页所在的包数据
UXTABLE.prototype.reqToTargetPackData = function ()
{
    //ajax请求数据
    //分页处理
    //保存当前页check状态
    this.g_reqDataFlag = 3;
    this.g_allPackCheckedArray[this.g_packIndex] = this.g_onePackCheck;
    this.g_packIndex = Math.ceil(parseInt(this.$uxpagination_detail.find(".uxTopageNum").val())*this.g_pageSize/this.g_onePackSize) - 1 ;
    if(this.g_packIndex < 0)
    {
        this.g_packIndex = 0;
        return;
    }
    this.g_curClickBtIndex = parseInt(this.$uxpagination_detail.find(".uxTopageNum").val()) - 1;
    this.g_bHasNextPack = true;
    this.g_toTargetPackCallBackFun();
    //用户调用 loadDataToTable 加载数据

};

//得到按钮页码标签
UXTABLE.prototype.getPageNumberLabel = function (pageIndex)
{
    if(pageIndex < 0)
    {
        return 0;
    }
    var idName = this.g_btGroupID[pageIndex];
    var labelText = this.$uxpagination.find("."+idName).html();
    return labelText;

};
//设置按钮页码标签
UXTABLE.prototype.setPageNumberLabel = function (pageIndex,labelText)
{
    if(pageIndex < 0)
    {
        return;
    }
    if(labelText < 0)
    {
        return;
    }
    var idName = this.g_btGroupID[pageIndex];
    this.$uxpagination.find("."+idName).html(labelText);

};
//处理新的的一包数据
UXTABLE.prototype.dealWithNewPack = function (dataLen)
{
    if(!this.g_bPagination)
    {
        return;
    }
    this.g_curPackLen = dataLen;
    this.initOnePackCheckStatus();
    this.initPaginationBar();
    var pageIn = Number(this.g_curClickBtIndex)+1;
    $('#'+this.g_tbIDName).bootstrapTable('selectPage',pageIn);
};
//根据数据包得到页码
UXTABLE.prototype.getPageNumByTotalRowNum = function (totalRowNum)
{
    if(totalRowNum < 0)
    {
        return 0;
    }
    var packPageNum = Math.floor(totalRowNum/this.g_pageSize);
    if(totalRowNum % this.g_pageSize != 0)
    {
        packPageNum += 1;
    }
    if(packPageNum > this.g_btGroupID.length)
    {
        uxAlert("system error !");
        packPageNum = this.g_btGroupID.length;

    }
    return packPageNum;
};


//创建表格初始化
UXTABLE.prototype.initTable = function (tbOperObj,columnsPar)
{
    $('#'+this.g_tbIDName).bootstrapTable({
        classes:"table table-no-bordered",
        locale: 'zh-CN',
        pagination: this.g_bPagination,
        onlyInfoPagination: true,
        maintainSelected: true,
        striped: true,
        cache: false,
        pageSize: this.g_pageSize,
        height:this.g_height,
        clickToSelect:this.g_clickToSelect,
        detailView: tbOperObj.detailView || false,
        detailFormatter: tbOperObj.detailFormatter,
        columns: columnsPar,
    });
};
