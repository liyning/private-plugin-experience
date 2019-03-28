function d3_barchart(dataOptions) {
    var defalutDataOptions = {
        'containerId': '',
        'data': '',
        'colorArr':["#9B69FB","#9EC935","#73E5FD","#FA8356","#466928","#99CC33","#00CBFF","#005CFD","#003399","#8966FD"],
        'legendWidth':'100',
        'axisName': ["使用率/%","名称"],
        'margin':{top: 40, right: 20, bottom: 30, left: 40},
        'xDomain': [1, 60],//默认的x的比例尺的自变量
        'yDomain': [1, 100]//默认的y比例尺的自变量
    };

    var initDataOption = {};//设置插件中使用的对象
    for (var initTem in defalutDataOptions) {
        initDataOption[initTem] = defalutDataOptions[initTem];
    }
    for (var tem in dataOptions) {
        initDataOption[tem] = dataOptions[tem];
    }
    var chartInfo = {
        svg_width: parseInt(d3.select("#"+dataOptions.containerId).style("width")),
        // svg_width: 450,
        svg_height: parseInt(d3.select("#"+dataOptions.containerId).style("height")),
        // svg_height: 200,
        xScale: "",//横坐标的比例尺
        yScale: ""//纵坐标的比例尺
    };
    var DURATION = 2000;
    var width = chartInfo.svg_width - initDataOption.margin.left - initDataOption.margin.right ;
    var height = chartInfo.svg_height - initDataOption.margin.top - initDataOption.margin.bottom ;
    chartInfo.xScale = d3.scaleBand().domain(defalutDataOptions.xDomain).rangeRound([0, width]).padding(0.1);
    chartInfo.yScale = d3.scaleLinear().domain(defalutDataOptions.yDomain).range([height,0]);
    //var formatPercent = d3.format(".0%");
    var xAxis = d3.axisBottom(chartInfo.xScale);
    var yAxis = d3.axisLeft(chartInfo.yScale).ticks(5);
    //.tickFormat(formatPercent);
    if(!d3.select("#" + initDataOption.containerId).select("svg").empty())
    {
        d3.select("#" + initDataOption.containerId).select("svg").remove();
    }

    var svg = d3.select("#" + initDataOption.containerId).append("svg")
        .attr("width","100%")
        .attr("height", "100%")
        .append("g")
        .attr("transform", "translate(" + initDataOption.margin.left + "," + initDataOption.margin.top + ")");
    refresh(initDataOption.data);
    function refresh(data){
        chartInfo.xScale.domain((data.map(function(d) {return d.name;})));
        var max_value = d3.max(data, function(d) {
            return (d.frequency )});//获取所有value中最大的值
        // if((initDataOption.hasMaxY))
        // {
        //     chartInfo.yScale.domain([0, max_value <= 100 ? initDataOption.yDomain[1]: max_value]);//当数据中都为0，没办法给y轴设置自变量时，使用默认的值
        // }else{
            chartInfo.yScale.domain([0, initDataOption.defaultY]);//当数据中都为0，没办法给y轴设置自变量时，使用默认的值
        // })
        yAxis.scale(chartInfo.yScale);
    }
    svg.append("g")
        .attr("class", "bar-chart-x axis" + " x_"+initDataOption.containerId)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x",width)
        .attr("dx", "1.5em")
        .attr("y",height)
        .attr("dy",(-(height * 0.08))+"em")
        .style("text-anchor", "end")
        .text(initDataOption.axisName[1]);


    svg.append("g")
        .attr("class", "bar-chart-y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", 'translate('+ initDataOption.legendWidth +',0)')
        .attr("x",'2em')
        .attr("y", 0)
        .attr("dy", "-0.90em")
        .style("text-anchor", "end")
        .text(initDataOption.axisName[0]);
    var bars = svg.append('g')
        .attr('class','bar-container');
    var line = d3.line()
        .curve(d3.curveCardinal);
    // .interpolate("cardinal");
    var barWidth;
    var bars_rect = bars.selectAll(".bar")
        .data(initDataOption.data)
        .enter()
        .append("rect")
        .attr("class","sum-grap-bar")
        .attr("width",function(d){
            // if(chartInfo.xScale(d.name)>30){
                barWidth = 26;
            // }
            // else{
            //     barWidth = chartInfo.xScale(d.name);
            // }
            return barWidth;     //柱子的宽度
        })
        .attr("x",function(d,i) {
            return (d3.select(".x_"+initDataOption.containerId).selectAll("g")._groups[0][i].transform.animVal.getItem(0).matrix.e - barWidth / 2);
        })
        .attr("y",function(d) {return chartInfo.yScale(d.frequency); })
        .attr("height",function(d) { return height - chartInfo.yScale(d.frequency); })
        .attr("fill",function(d,i){
            var colorStr;
            console.log('ss='+i);
            switch (i) {
                case 0 : { colorStr = "#61CF91";break;}
                case 1 : { colorStr = "#2ABF95";break;}
                case 2 : { colorStr = "#6EC9A8";break;}
                case 3 : { colorStr = "#A4EBD1";break;}
                case 4 : { colorStr = "#99FFDB";break;}
                case 5 : { colorStr = "#99FFD8";break;}
                case 6 : { colorStr = "#61FFF2";break;}
                default: { colorStr = "#4AFFDE";break;}
            }
            return colorStr;
        })
        .attr("rx",13)
        .attr('ry',13)
        .call(function(d){
            bars.selectAll(".bar")
                .data(initDataOption.data)
                .enter()
                .append("path")
                .attr("class","path-opacity")
                .attr('d',function(d,i){
                    if(d.frequency > 8.69){
                        var pathX = d3.select(this).property("parentNode").childNodes[i].x.baseVal.value + barWidth/2;
                        var pathY = d3.select(this).property("parentNode").childNodes[i].y.baseVal.value + (height - chartInfo.yScale(d.frequency));
                        var array = [
                            [pathX + 25,pathY],
                            [pathX + 23,pathY - 1],
                            [pathX + 20,pathY - 2],
                            [pathX + 18,pathY - 3],
                            [pathX + 16,pathY - 5],
                            [pathX + 15,pathY - 6],
                            [pathX + 14,pathY - 7],
                            [pathX + 13,pathY - 8],
                            [pathX + 12,pathY - 10],
                            [pathX + 7,pathY - 19],
                            [pathX - 7,pathY - 19],
                            [pathX - 12,pathY - 10],
                            [pathX - 13,pathY - 8],
                            [pathX - 14,pathY - 7],
                            [pathX - 15,pathY - 6],
                            [pathX - 16,pathY - 5],
                            [pathX - 18,pathY - 3],
                            [pathX - 20,pathY - 2],
                            [pathX - 23,pathY - 1],
                            [pathX - 25,pathY]
                        ];
                        return line.curve(d3.curveCardinal.tension(0.6))(array)
                    }
                })
                .style('stroke', function(d,i){
                    var colorStr;
                    switch (i) {
                        case 0 : { colorStr = "#61CF91";break;}
                        case 1 : { colorStr = "#2ABF95";break;}
                        case 2 : { colorStr = "#6EC9A8";break;}
                        case 3 : { colorStr = "#A4EBD1";break;}
                        case 4 : { colorStr = "#99FFDB";break;}
                        case 5 : { colorStr = "#99FFD8";break;}
                        case 6 : { colorStr = "#61FFF2";break;}
                        default: { colorStr = "#4AFFDE";break;}
                    }
                    return colorStr;
                })
                .style('fill',function(d,i){
                    // console.log(i);
                    var colorStr;
                    switch (i) {
                        case 0 : { colorStr = "#61CF91";break;}
                        case 1 : { colorStr = "#2ABF95";break;}
                        case 2 : { colorStr = "#6EC9A8";break;}
                        case 3 : { colorStr = "#A4EBD1";break;}
                        case 4 : { colorStr = "#99FFDB";break;}
                        case 5 : { colorStr = "#99FFD8";break;}
                        case 6 : { colorStr = "#61FFF2";break;}
                        default: { colorStr = "#4AFFDE";break;}
                    }
                    return colorStr;
                })
                .on('mouseover',function(d){
                    bar_tooltips.html(d.name+"<br/>"+initDataOption.axisName[0].split("/")[0]+":" +(d.frequency))
                        .style("left",d3.event.pageX + 10 + 'px')
                        .style("top",d3.event.pageY + 10 + 'px')
                        .style("display","block")
                        .style("opacity",1.0)
                })
                .on('mousemove',function(d){
                    bar_tooltips.html(d.name+"<br/>"+initDataOption.axisName[0].split("/")[0]+":" +(d.frequency))
                        .style("left",d3.event.pageX + 10 + 'px')
                        .style("top",d3.event.pageY + 10 + 'px')
                        .style("display","block")
                        .style("opacity",1.0)
                })
                .on('mouseout',function(d){
                    bar_tooltips.html(d.name+"<br/>"+initDataOption.axisName[0].split("/")[0]+":" +(d.frequency))
                        .style('display','none')
                });
        });

    //生成tooltip框
    var bar_tooltips = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("display","block")
        .style("opacity",0.0);
    bars_rect.on('mouseover',function(d){
        bar_tooltips.html(d.name+"<br/>"+initDataOption.axisName[0].split("/")[0]+":" +(d.frequency))
            .style("left",d3.event.pageX + 10 + 'px')
            .style("top",d3.event.pageY + 10 + 'px')
            .style("display","block")
            .style("opacity",1.0)
    })
        .on('mousemove',function(d){
            bar_tooltips.html(d.name+"<br/>"+initDataOption.axisName[0].split("/")[0]+":" +(d.frequency))
                .style("left",d3.event.pageX + 10 + 'px')
                .style("top",d3.event.pageY + 10 + 'px')
                .style("display","block")
                .style("opacity",1.0)
        })
        .on('mouseout',function(d){
            bar_tooltips.html(d.name+"<br/>"+initDataOption.axisName[0].split("/")[0]+":" +(d.frequency))
                .style('display','none')
        });
    //统计图的柱子的动画
    bars_rect.attr("height",function(d,i){return 0;})
        .attr('y',function(d){return height;})
        .transition()
        .delay(function(d,i){
            return i * 50;
        })
        .duration(DURATION)
        .ease(d3.easeBounce)
        // .ease('bounce')
        .attr("height",function(d){return height - chartInfo.yScale(d.frequency);})
        .attr('y',function(d,i){return chartInfo.yScale(d.frequency);});

    d3.selectAll(".bar-chart-y").selectAll("line")
        .transition()
        .duration(DURATION)
        .attr("x2", function(){
            // console.log(
            //     parseFloat(d3.select(".x_"+initDataOption.containerId).select(".domain")._groups[0][0].attributes[2].nodeValue.split("H")[1])
            // );
            return (parseFloat(d3.select(".x_"+initDataOption.containerId).select(".domain")._groups[0][0].attributes[2].nodeValue.split("H")[1]));
            // return (1589.5);
        });//网格的水平线
}
