//param
function piechartFun(param) {
    //获取svg图，创建底部容器以及饼状图容器
    d3.select(".volume_svg_"+param.paramModel).remove();
    var svgContain = d3.select("#"+param.containerId).append("svg")
        .attr("class","volume_svg_"+param.paramModel)
        .attr("width",param.size.width)
        .attr("height",param.size.height);
    svgContain.append("g").attr("id","bgPies_"+param.paramModel);

    new d3pie("bgPies_"+param.paramModel, {
        "header": {
            "title": {
                "text": param.header.title,
                "fontSize": 14,
                "font": "courier",
                "color":"#58D1F7"
            },
            "subtitle": {
                "text": param.header.maindata.value + "%",
                "color": "#999999",
                "fontSize": 12,
                "font": "courier"
            },
            "location": "pie-center",
            "titleSubtitlePadding": 10
        },
        "footer": {
            "color": "#999999",
            "fontSize": 10,
            "font": "open sans",
            "location": "bottom-left"
        },
        "size": {
            "canvasWidth": param.size.width,
            "canvasHeight": param.size.height,
            "pieInnerRadius": "78%",
            "pieOuterRadius": "80%"
        },
        "data": {
            "sortOrder": "label-desc",
            "content": param.data.content
        },
        "labels": {
            "outer": {
                "format": "none",
                "pieDistance": 20
            },
            "inner": {
                "format": "none"
            },
            // "mainLabel": {
            //     "color": "#58D1F7",
            //     "fontSize": 14
            // },
            "percentage": {
                "color": "#999999",
                "fontSize": 11,
                "decimalPlaces": 0
            },
            "value": {
                "color": param.color,
                "fontSize": 11
            },
            "lines": {
                "enabled": false
            },
            "truncation": {
                "enabled": false
            }
        },
        "tooltips": {
            "enabled": false,
            "type": "placeholder",
            "string": "{label}:  {percentage}%",
            "styles": {
                "backgroundColor": "#0b0a0a",
                "backgroundOpacity": 1,
                "color": "#ffffff",
                "fontSize": 16,
                "padding": 10
            }
        },
        "effects": {
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 400,
                "size": 8
            },
            "highlightSegmentOnMouseover": false
        },
        "misc": {
            "colors": {
                "segmentStroke": "rgba(0,0,0,0)"
            },
            "canvasPadding": {
                "top": 20
            },
            "cssPrefix":"p1_" + param.paramModel + "_"
        },
        // "callbacks": {
        //     "onMouseoutSegment":function(obj){
        //         d3.select("#"+obj.segment.id).style("stroke","rgba(0,0,0,0)");
        //         if((obj.index != 0) && (! d3.select(".label-title_"+obj.data.label).empty())) {
        //             d3.select(".label-title_"+obj.data.label).classed("chioced-title",false);
        //             d3.select("#p1_labelGroup"+(obj.index)+"-outer").select("text").style("fill","rgb(88, 209, 247)");
        //         }
        //     },
        //     "onMouseoverSegment":function(obj){
        //         d3.select("#"+obj.segment.id).style("stroke","#FFF").style("stroke-width","2px");
        //         if((obj.index != 0) && (! d3.select(".label-title_"+obj.data.label).empty())) {
        //             d3.select(".label-title_"+obj.data.label).classed("chioced-title",true);
        //             d3.select("#p1_labelGroup"+(obj.index)+"-outer").select("text").style("fill","#FFFF");
        //         }
        //     }
        // }
    });
}