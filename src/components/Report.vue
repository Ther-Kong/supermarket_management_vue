<template>
	<div class="reportBody">
		<div class="buttonBox" style="background-color: white;">
			<el-button-group>
				<el-button type="info" plain>按日汇总</el-button>
				<el-button type="info" plain>按月汇总</el-button>
			</el-button-group>	
		</div>
		<div id="myChart"></div>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
	name: 'Report',
	data() {
		return {};
	},
	setup() {
		const { proxy } = getCurrentInstance(); // 使用proxy代替ctx，因为ctx只在开发环境有效
		// 路由信息
		// console.log(proxy.$systemName) // 全局挂载对象
		return {
			proxy
		};
	},
	mounted() {
		const { proxy } = getCurrentInstance();
		proxy.drawPicture(proxy);
	},
	methods: {
		drawPicture(proxy) {
			var option = {
				legend: {},
				tooltip: {},
				dataset: {
					source: [
						['product', '2012', '2013', '2014', '2015', '2016', '2017'],
						['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
						['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
						['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
						['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
					]
				},
				series: [
					{
						type: 'pie',
						radius: '33%',
						center: ['25%', '30%']
						// No encode specified, by default, it is '2012'.
					},
					{
						type: 'pie',
						radius: '33%',
						center: ['75%', '30%'],
						encode: {
							itemName: 'product',
							value: '2012'
						}
					},
					{
						type: 'pie',
						radius: '33%',
						center: ['25%', '75%'],
						encode: {
							itemName: 'product',
							value: '2014'
						}
					},
					{
						type: 'pie',
						radius: '33%',
						center: ['75%', '75%'],
						encode: {
							itemName: 'product',
							value: '2015'
						}
					}
				]
			};
			let myChart = proxy.$echarts.init(document.getElementById('myChart'));
			myChart.setOption(option);
		}
	}
};
</script>

<style lang="stylus">
	.reportBody
		width 100%
		height 100%
		#myChart
			width 99%
			height 95%
</style>
