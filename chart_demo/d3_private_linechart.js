/**
 * 折线图
 * @param IDnum
 *  var DataOptions = {
        'containerId':'lineChartCon', //添加svg的位置
        'data':sessionData,  //折线图的数据
        'colorArr':["#99CC33","#FF6600"], //图例的颜色列表
        'margin':{top: 30, right: 30, bottom: 30, left: 30},
        'classListName':"mrc_chart" //由于图表的宽度是由类控制，因此应该取类的宽度
        'legendWidth':'10',
        'axisName' : ["个数/" + sessionData.maxValueUnit,"min"], //坐标轴的刻度单位
        'legendPosition':false,//右侧图示
        'leftPosition':'1520',
        'topPosition':'-90',
        'titleHeight':'20',
        'wholeTickShow':true, //全刻度是否全部显示true：全部显示
        'hasMaxY':sessionData.maxFlag, //是否使用最大值来作为y轴的最大刻度
        'unit':"个",
        'order':sessionData.maxValueUnit,
        'defaultY':120, //默认Y轴的最大刻度
        'hasArea':true, //是否添加面积阴影
        'hasPoint':true, //是否添加节点
        'hasOddNum':false,
        'hasTitleIcon':true, //是否添加图例
        'topTipX':20,  //y轴刻度单位的x位置
        'xDomain':[0,60],//默认的x的比例尺的自变量
        'yDomain':[1,100]//默认的y比例尺的自变量
    };
 * @returns
 */
function lineChartFun(dataOptions,callback) {
    var initDataOption = {};//设置插件中使用的对象
    for (var tem in dataOptions) {
        initDataOption[tem] = dataOptions[tem];
    }
    var chartInfo = {
            svg_width: parseInt(d3.select("#"+dataOptions.containerId).style("width")),
            svg_height: parseInt(d3.select("#"+dataOptions.containerId).style("height")),
            xScale: "",//横坐标的比例尺
            yScale: ""//纵坐标的比例尺
        },
        DURATION = 2000,
        width = chartInfo.svg_width - initDataOption.margin.left - initDataOption.margin.right,
        height = chartInfo.svg_height - initDataOption.margin.bottom - initDataOption.margin.top;
    //设置x轴和y轴的比例尺
    chartInfo.xScale = d3.scaleLinear().domain(initDataOption.xDomain).rangeRound([0, width]);//rangeRoundBands功能同rangeBands，但是该函数可以美化输出的区间段，也就是保证每个区间段的起点值都是整数。
    chartInfo.yScale = d3.scaleLinear().domain(initDataOption.yDomain).rangeRound([height, 0]);
    //定义x轴和y轴
    var xAxis = d3.axisBottom(chartInfo.xScale);
    var yAxis = d3.axisLeft(chartInfo.yScale).ticks(5);
    if(!d3.select("#" + initDataOption.containerId).select("svg").empty())
    {
        d3.select("#" + initDataOption.containerId).select("svg").remove();
    }
    var svg;
    // if(initDataOption.upBtnId != undefined && initDataOption.downBtnId != undefined){
    //     d3.select("#" + initDataOption.containerId).selectAll("button").remove();
    //     d3.select("#" + initDataOption.containerId).append("button")
    //         .attr('id',initDataOption.upBtnId);
    //     d3.select("#" + initDataOption.containerId).append("button")
    //         .attr("id",initDataOption.downBtnId)
    //         .attr("class","first-btn");
    //     svg = d3.select("#" + initDataOption.containerId).insert("svg","button")
    //         .attr("width","100%")
    //         .attr("height","100%")
    //         .attr("id",initDataOption.containerId+"_svg")
    //         .attr("preserveAspectRatio","xMidYMid meet")
    //         .attr("viewBox", "0 0 " + chartInfo.svg_width + " " + chartInfo.svg_height)
    //         .append("g")
    //         .attr("class", "graph")
    //         .attr("transform", "translate(" + initDataOption.margin.left + "," + initDataOption.margin.top + ")");
    //
    // }else{
        svg = d3.select("#" + initDataOption.containerId).append("svg")
            .attr("width","100%")
            .attr("height","100%")
            .attr("id",initDataOption.containerId+"_svg")
            .attr("preserveAspectRatio","xMidYMid meet")
            .attr("viewBox", "0 0 " + chartInfo.svg_width + " " + chartInfo.svg_height)
            .append("g")
            .attr("class", "graph")
            .attr("transform", "translate(" + initDataOption.margin.left + "," + initDataOption.margin.top + ")");
    // }
    // //生成侧边栏name的包含框
    var title_g = svg.append("g")
        .attr("class", "legend_name_g")
        .attr("transform", function(){
            var translateStr;
            var templength = Object.keys(initDataOption.data.host_name_map).length;
            if(initDataOption.legendPosition)
            {
                translateStr = "translate(" + (width) + "," + initDataOption.margin.top + ")";
            }else{
                translateStr = "translate(" + (width - (templength > 1 ? (templength):(templength + 1)) * (initDataOption.margin.right + initDataOption.margin.left)) + "," + (-(initDataOption.margin.top +　initDataOption.margin.bottom)) + ")";
            }
            return translateStr;
        });
    //生成图表标题
    var title_x = (width - (+initDataOption.legendWidth))/2;//initDataOption.legendWidth原本是一个字符串，使用+将取得字符串的数字部分。功能类似于jQuery的parseFloat()方法
    var title_y = 0;
    svg.append('g')
        .attr('class','title_con')
        .append('text')
        .text(initDataOption.titleContent)
        .attr("x",title_x)
        .attr("y",title_y);

    //添加x轴
    var xBar = svg.append("g")
        .attr("class", "line-chart-x axis")
        .attr("transform", "translate(0," + (+height + +initDataOption.titleHeight) + ")")
        .call(xAxis);

    xBar.append("text")
        .attr("x", width)
        .attr("dx", function(){
            return (".5em");
        })
        .attr("class",initDataOption.containerId+"_text")
        .style("text-anchor", "end");
    //添加y轴
    var yBar = svg.append("g")
        .attr("class", "line-chart-y axis")
        .attr("transform", "translate(0,"+ initDataOption.titleHeight +")")
        .call(yAxis);//给当前选择到的元素调用yAxis方法;

    yBar.append("text")
        .attr("y", 10)
        .attr("x",'2em')
        .attr("dy", "-2em")
        .attr("dx",".3em")
        .style("text-anchor", "end")
        .text(initDataOption.axisName[0]);

    if (initDataOption.hasArea) {
        d3.selectAll(".line-chart-y").selectAll("line")
            .transition()
            .duration(DURATION)
            .attr("x2", width);//网格的水平线
    }
    d3.select("#"+initDataOption.containerId+"_svg").selectAll(".line-chart-x").selectAll("line")
        .transition()
        .duration(DURATION)
        .attr("y2", "-" + height);

    //生成曲线包含框
    var path_container = svg.append("g")
        .attr("class", "path_container")
        .attr("transform", "translate(0,"+ initDataOption.titleHeight +")");
    d3.selectAll(".tooltip").style('display','none');
    //生成tooltip框
    var bar_tooltips = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style('display','none');
    //定义标记包含框
    var mark_container = svg.append("g")
        .attr('class', 'mark_g')
        .attr("transform", "translate(0,"+ initDataOption.titleHeight +")");
    //生成圆点包含框
    var pointer_container = svg.append("g").attr("class", "path_container");
    /**统计图的条条的动画**/
    lineChartFresh(initDataOption.data);
    var X_text_arr;
    function lineChartFresh(data) {
        /**数据处理**/
        var userData = data.data_arr;
        path_container.selectAll("*").remove();
        mark_container.selectAll("*").remove();
        var mark_g = mark_container.selectAll('g').data(userData).enter().append('g');
        if(userData.length > 0) {
            var dataObj = {
                    dataValue: [],//数据的所有值的数组
                    nameArr: [],//数据中每一项的名字
                    name_color: [],//每一项数据的英文名、中文名和颜色的映射关系,
                    each_name: data.host_name_map//各个内容项的名字
                },
                COLOR_INDEX = 0;

            for (var j in data.data_arr[1]) {//几种图的数据接口名称
                if (j != 'day') {
                    var name_obj = {
                        'color': initDataOption.colorArr[COLOR_INDEX],
                        'C_name': dataObj.each_name[j],
                        'E_name': j
                    };
                    dataObj.name_color.push(name_obj);
                    COLOR_INDEX++;
                }
            }
            for (var i in userData) {
                if (i != "remove") {
                    for (var key_num in userData[i]) {
                        if(initDataOption.valueflag == true){
                            var value = ((userData[i][key_num])*100).toFixed(2)+"%";
                            key_num != "day" && dataObj.dataValue.push(value);
                        }
                        else{
                            key_num != "day" && dataObj.dataValue.push(userData[i][key_num]);//将所有的value值放进数组中
                        }
                    }
                }
            }
            var max_value = d3.max(dataObj.dataValue);//获取所有value中最大的值
            X_text_arr = userData.map(function (d,i) {
                //数据较少时，全部显示刻度
                if(userData.length < 3)
                {
                    return d.day;
                }else{
                    if(initDataOption.wholeTickShow)
                    {
                        return d.day;
                    }else{
                        return ((i % 2 == 0) ? (d.day):(""));
                    }
                }
            });
            chartInfo.xScale.domain([0,X_text_arr.length > 0 ? X_text_arr.length - 1 : initDataOption.xDomain[1]]);//当数据中的值的长度为零时，使用默认的值
            if(initDataOption.hasMaxY)
            {
                var max_value_defaultY = (max_value % 50 == 0) ? (max_value) :(max_value + 50);
                chartInfo.yScale.domain([0, max_value > 0 ? max_value_defaultY : initDataOption.yDomain[1]]);//当数据中都为0，没办法给y轴设置自变量时，使用默认的值
            }else{
                chartInfo.yScale.domain([0, initDataOption.defaultY]);//当数据中都为0，没办法给y轴设置自变量时，使用默认的值
            }
            var temp = X_text_arr.length > 0 ? X_text_arr.length - 1 : initDataOption.xDomain[1];
            xAxis.scale(chartInfo.xScale).ticks(temp);
            yAxis.scale(chartInfo.yScale);

            xBar.transition().duration(DURATION).call(xAxis);
            yBar.transition().duration(DURATION).call(yAxis);

            var retStr = "";
            setTimeout(function(){
                xBar.selectAll("text")
                    .style("text-anchor", "start")
                    .attr("class",initDataOption.containerId+"_text")
                    .attr("transform",function(d,i){
                        if(d !== undefined) {
                            return "rotate(45)";
                        }else{
                            return "rotate(0)";
                        }
                    })
                    .text(function (d,i) {
                        if(d !== undefined) {
                            if(X_text_arr[d] != undefined) {
                                retStr = X_text_arr[d];
                            }
                        }else{
                            retStr = initDataOption.axisName[1];
                        }
                        return retStr;
                    });
            },500);
            var line = d3.line()
                .x(function (d, i) {
                    return chartInfo.xScale(i);
                })
                .y(function (d,i) {
                    return chartInfo.yScale(d);
                })
                .curve(d3.curveLinear);
            if (initDataOption.hasArea) {
                d3.selectAll(".line-chart-y").selectAll("line")
                    .transition()
                    .duration(DURATION)
                    .attr("x2", width);//网格的水平线
            }
            d3.select("#"+initDataOption.containerId+"_svg").selectAll(".line-chart-x").selectAll("line")
                .transition()
                .duration(DURATION)
                .attr("y2", "-" + (height));//网格的竖直线
            if (initDataOption.hasArea) {
                //定义画面积函数
                var area = d3.area()
                    .x(function (d, i) {
                        return chartInfo.xScale(i);
                    })
                    .y0(height)
                    .y1(function (d) {
                        return chartInfo.yScale(d);
                    });
                createGradient(initDataOption.containerId,dataObj.name_color,initDataOption.hasPoint);
            }
            /**生成标记的矩形**/
            mark_g.append('rect')
                .attr("class","mark-rect")
                .attr("x",function (d, i) {
                    return chartInfo.xScale(i);
                })
                .attr("height",height)
                .attr("width",function(d,i){
                    return chartInfo.xScale(i);
                })
                .attr('fill-opacity',0);

            /**生成标记的竖线**/
            mark_g.append('line')
                .attr("class","mark-line")
                .attr("x1",function(d,i){return chartInfo.xScale(i);})
                .attr("y1",0)
                .attr("x2",function (d, i) {return chartInfo.xScale(i);})
                .attr("y2",height)
                .attr('stroke-width',2);

            for (var item_num in dataObj.name_color) {
                path_container.append("path")//画曲线
                    .attr("class", "chart-polyline")
                    .datum(function () {
                        var test_arr = [];
                        userData.forEach(function (value, index) {
                            test_arr.push(value[dataObj.name_color[item_num].E_name]);
                        });
                        return test_arr;
                    })
                    .transition()
                    .duration(DURATION)
                    .ease(d3.easeBounce)
                    // .ease('bounce')
                    .attr("d", line)
                    .attr("stroke", dataObj.name_color[item_num].color)
                    .attr("fill", "none");

                /**生成标记的外圆*/
                mark_g.append('circle')
                    .attr("class","mark-points-m")
                    .attr("cx",function (d, i) {return chartInfo.xScale(i);})
                    .attr('cy',function (d) {return chartInfo.yScale(d[dataObj.name_color[item_num].E_name]);})
                    .attr("fill",dataObj.name_color[item_num].color)
                    .attr("fill-opacity",0.3)
                    .attr("stroke",dataObj.name_color[item_num].color)
                    .attr('r',8);
                if (initDataOption.hasArea) {
                    path_container.append("path")//画面积
                        .datum(function () {
                            var test_arr = [];
                            userData.forEach(function (value, index) {
                                test_arr.push(value[dataObj.name_color[item_num].E_name]);
                            });
                            return test_arr;
                        })
                        .transition()
                        .duration(DURATION)
                        .ease(d3.easeBounce)
                        // .ease('bounce')
                        .attr("d", area)
                        .attr("stroke", "none")
                        .attr("fill", "url(#gradient_" + dataObj.name_color[item_num].E_name + ")");
                    /**生成标记的内圆*/
                    mark_g.append('circle')
                        .attr("class","mark-points-m")
                        .attr("cx",function (d, i) {
                            return chartInfo.xScale(i);
                        })
                        .attr("cy",function (d) {
                            return Math.abs(chartInfo.yScale(d[dataObj.name_color[item_num].E_name]));
                        })
                        .attr("fill",dataObj.name_color[item_num].color)
                        .attr("fill-opacity",1)
                        .attr("stroke",dataObj.name_color[item_num].color)
                        .attr('r',3);
                } else {
                    var points = pointer_container.selectAll("chart-points").data(userData).enter();//画曲线上的点
                    points.append("circle")//折线上的圆点
                        .attr("class", "chart-points")
                        .transition()
                        .duration(DURATION)
                        .attr("cx", function (d, i) {
                            return chartInfo.xScale(i);
                        })
                        .attr("cy", function (d) {
                            return chartInfo.yScale(d[dataObj.name_color[item_num].E_name]);
                        })
                        .attr("fill", dataObj.name_color[item_num].color)
                        .attr("r", 2);
                }
            }
            // //生成侧边title
            if(initDataOption.hasTitleIcon) {
                line_draw_title(dataObj.name_color,initDataOption.legendPosition, title_g);
            }

            mark_g.selectAll("rect.mark-rect").on('mouseover',function(d,i){
                var target_dom = d3.event.target.parentNode;
                d3.select(target_dom).selectAll('line,circle').style('display','inline-block');

                var html_text =  d.day + '<br/>';
                for(var name_key in d){
                    if(initDataOption.order == "")
                    {
                        if(initDataOption.valueflag == true){
                            name_key != 'day' && (html_text += dataObj.each_name[name_key] + '：' + (d[name_key]*100).toFixed(2) + initDataOption.unit + '<br/>');
                        }
                        else{
                            name_key != 'day' && (html_text += dataObj.each_name[name_key] + '：' + d[name_key] + initDataOption.unit + '<br/>');
                        }
                    }else{
                        name_key != 'day' && (html_text += dataObj.each_name[name_key] + '：' + d[name_key]+ '<br/>');
                    }
                }
                bar_tooltips
                    .html(html_text)
                    .style("left",d3.event.pageX + 10 + 'px')
                    .style("top",d3.event.pageY + 10 + 'px')
                    .style('display','block')
            })
                .on("mousemove", function (d) {
                    var target_dom = d3.event.target.parentNode;
                    d3.select(target_dom).selectAll('line,circle').style('display','inline-block');
                    bar_tooltips
                        .style('display','block')
                        .style('left',d3.event.pageX + 10 + 'px')
                        .style('top',d3.event.pageY + 10 + 'px');
                })
                .on("mouseout", function (d) {
                    var target_dom = d3.event.target.parentNode;
                    d3.select(target_dom).selectAll('line,circle').style('display','none');
                    bar_tooltips.style('display','none');
                })
                .on('click',function(d,i){
                    if(typeof callback === "function") {
                        callback(d,i,"mouseclick");
                    }else{
                        return null;
                    }
                })
        }
    }
}

/**
 * 生成侧边栏的title
 * @param each_name
 */
function line_draw_title(name_color,legendPosition,title_con_g){
    var margin = {top: 50, right: 50, bottom: 20, left: 20};
    var oldGPosition = 0;
    for(var i in name_color){
        if(i != "remove" ){
            var title_g = title_con_g.append("g")
                .attr("transform",function(){
                    var translateStr;
                    if(legendPosition)
                    {
                        translateStr = "translate(" + margin.left + "," +  i * 30 +")";
                    }else{
                        translateStr = "translate(" + (i * 70) + "," + margin.top +")";
                    }
                    return translateStr;
                });
            title_g.append("rect")
                .attr("x","10")
                .attr("y","10")
                .attr("width","10")
                .attr("height","10")
                .attr("dy",".5em")
                .attr("stroke",name_color[i].color)
                .attr("fill",name_color[i].color)
                .attr("transform","translate(0,0)");
            title_g.append("text")
                .attr("transform","translate(30,20)")
                .text(name_color[i].C_name);
        }
    }
}

/**
 * 根据数据的个数生成不同的滤镜
 * @param item_name -- 数据的name数组
 * @param color_arr -- 备用的颜色数组
 */
function createGradient(id,name_color,areaFlag){
    var svg = d3.select("#"+id).select(".graph").append("g").attr("class","gradient_g");
    for(var item_i in name_color) {
        var linear_gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id","gradient_" + name_color[item_i].E_name)
            .attr("x1","0%")
            .attr("y1","0%")
            .attr("x2","0%")
            .attr("y2" , "100%");
        linear_gradient.append("stop")
            .attr("offset","0%")
            .attr("stop-color",name_color[item_i].color)
            .attr("stop-opacity",function(){
                var opacity;
                opacity = (!areaFlag) ? (0):(0.3);
                return opacity;
            });
        linear_gradient.append("stop")
            .attr("offset","100%")
            .attr("stop-color",name_color[item_i].color)
            .attr("stop-opacity",function(){
                var opacity;
                opacity = (!areaFlag) ? (0):(0.1);
                return opacity;
            });
    }
}
