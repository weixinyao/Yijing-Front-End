<template>
	<div class="hello">
		<!-- <ul>
			<li v-for="(key ,index) in [1,2]" @click="changeData(index)">第{{key}}条数据</li>
		</ul> -->
		<div id="main" style="width: 350px;height:400px;"></div>
 
		<div>
			<h2>饼状图</h2>
			<div id="main2" style="width: 350px;height: 200px;"></div>
		</div>
	</div>
</template>
 
<script>
import {analyse} from '@/network/analyseorder/analyseorder.js'
	var echarts = require('echarts');
	// 引入柱状图
	require('echarts/lib/chart/bar');
	// 引入提示框和标题组件
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/title');
 
	export default {
		name: 'HelloWorld',
		data() {
			return {
				data: [],
				msg: 'Welcome to Your Vue.js App',
				piedata: [],
				echarts1_option:{
					title: {
						text: '成交订单量',
						subtext: "",
					},
					tooltip: {},
					xAxis: {
						data: ['昨天', '今天', '近7天', '近30天', '本季度'],
						axisLine: { // 设置刻度线相关的
							lineStyle: {
								color: '#0087ED',
								width: 1, //这里是为了突出显示加上的
							}
						},
						axisLabel: { // 设置字体相关的
							show: true,
							textStyle: {
								color: '#ddd'
							}
						}
					},
					yAxis: {
						min: 0,
						max: 10, // y 轴最大的 值
						splitNumber: 0.1, // y轴刻度之间的距离 将y轴均分10
						axisLine: { // y轴线不显示   如果想要x轴线不显示 就把这个属性设置在xAxis里面
							show: false
						},
						axisTick: { //y轴刻度线  false就是去掉刻度线
							show: false
						},
						splitLine: { // 显示或者不显示横线
							show: true,
							lineStyle: { // 设置网格线的颜色跟类型
								// 使用深浅的间隔色
								color: ['#ddd'],
								type: 'dotted'
							}
						}
					},
					series: [{
						name: '销量',
						type: 'bar', // line折线  bar矩形   
						//					 smooth: true, //平滑折线
						//					showSymbol: false, // 去掉折线的点
						data: [],
						itemStyle: { // 设置bar或者线的颜色
							normal: {　
								color: "#ddd"
							}
						}
					}]
				},
				option: {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: ['昨天', '今天', '近7天', '近30天', '本季度']
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '16',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [],
						itemStyle: { // 饼状图之间隔开一点的配置参数
							normal: {
								borderWidth: 4,
								borderColor: '#ffffff',
							}
						}
					}]
				}
				
			}
		},
        created() {
           analyse("/analyseorder").then(response => {
			   console.log(response)
			   this.data.push(response.data.yesterday)
			   this.data.push(response.data.now)
			   this.data.push(response.data.nearseven)
			   this.data.push(response.data.nearthirty)
			   this.data.push(response.data.quarter)
			   console.log(this.data)
			   this.echarts1_option.series[0].data = this.data
			   let yesterday = {
				   name: "昨天",
				   value: response.data.yesterday
			   }
			   let now = {
				   name: "今天",
				   value: response.data.now
			   }
			   let nearseven = {
				   name: "近7天",
				   value: response.data.nearseven
			   }
			   let nearthirty = {
				   name: "近30天",
				   value: response.data.nearthirty
			   }
			   let quarter = {
				   name: "本季度",
				   value: response.data.quarter
			   }
			   this.piedata.push(yesterday)
			   this.piedata.push(now)
			   this.piedata.push(nearseven)
			   this.piedata.push(nearthirty)
			   this.piedata.push(quarter)
			   this.option.series[0].data = this.piedata
		   })
		},
		watch: {
      //观察option的变化
      echarts1_option: {
        handler(newVal, oldVal) {
          if (this.myChart) {
            if (newVal) {
              this.myChart.setOption(newVal);
            } else {
              this.myChart.setOption(oldVal);
            }
          } else {
              this.echart()
          }
        },
        deep: true //对象内部属性的监听，关键。
	  },
	  option: {
        handler(newVal, oldVal) {
          if (this.myChart) {
            if (newVal) {
              this.myChart.setOption(newVal);
            } else {
              this.myChart.setOption(oldVal);
            }
          } else {
              this.echartPie()
          }
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
		mounted() {
			// 绘制图表
			this.echart();
			this.echartPie();
		},
		methods: {
			echart() {
				var echarts = require('echarts');
 
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('main'));
				// 不能在单个容器上初始化多个 ECharts 实例。
				//实例容器，一般是一个具有高宽的div元素。
				
				
				myChart.setOption(this.echarts1_option,true)
			},
			echartPie() { // 饼状图的相关配置与事件 
				
				// 1. 默认选中了某一个
				// 2. 鼠标离开记录上次选中的作为当前选中的
				
				
				
				var echarts = require('echarts');
 
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('main2'));
				// 不能在单个容器上初始化多个 ECharts 实例。
				//实例容器，一般是一个具有高宽的div元素。
 
				
				myChart.setOption(this.option,true);
				init(0);
 
				function init(index) {
					myChart.dispatchAction({
						type: 'highlight',
						seriesIndex: 0,
						dataIndex: index
					});
				}
				//记录上次高亮的索引
				var lastMouseOverIndex = null;
				// mouseover事件，记录当前数据索引并取消其他高亮，over在out之后
				myChart.on('mouseover', function(params) {
					var dataLen = this.option.series[0].data.length;
					lastMouseOverIndex = params.dataIndex;
					for(var i = 0; i < dataLen; i++) {
						if(i != params.dataIndex) {
							myChart.dispatchAction({
								type: 'downplay',
								seriesIndex: 0,
								dataIndex: i
							})
						}
					}
				});
				// mouseout事件，将上次的高亮
				myChart.on('mouseout', function(params) {
					myChart.dispatchAction({
						type: 'highlight',
						seriesIndex: 0,
						dataIndex: lastMouseOverIndex
					})
				});
			},
			
		}
	}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
</style>