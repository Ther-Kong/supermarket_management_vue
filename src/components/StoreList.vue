<template>
	<el-table :data="records" style="width: 100%;">
		<el-table-column prop="id" label="编号" width="160"></el-table-column>
		<el-table-column prop="goodsId" label="商品编号" width="150"></el-table-column>
		<el-table-column prop="goodsName" label="商品名字" width="130"></el-table-column>
		<el-table-column prop="count" label="操作数量" width="130"></el-table-column>
		<el-table-column prop="type" label="操作类型" width="160"></el-table-column>
		<el-table-column prop="time" label="操作时间"></el-table-column>
		<el-table-column label="操作">
			<template #default="scope">
				<template v-if="(Date.parse(scope.row.time)<new Date()-3*24*60*60*1000)||scope.row.type != '销售'">
					<el-button size="mini" @click="handleRefund(scope.$index, scope.row, proxy)" disabled="true">退款</el-button>
				</template>
				<template v-else>
					<el-button size="mini" @click="handleRefund(scope.$index, scope.row, proxy)">退款</el-button>
				</template>
			</template> 
			<!-- <template #default="scope">
				<el-button size="mini" @click="handlePurchase(scope.$index, scope.row, proxy)">进货</el-button>
				<el-button size="mini" @click="handleEdit(scope.$index, scope.row, proxy)">编辑</el-button>
				<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row, proxy)">删除</el-button>
			</template> -->
		</el-table-column>
	</el-table>
</template>

<script>
	import { getCurrentInstance } from 'vue';
	import Qs from 'qs';
	export default {
		name: 'StoreList',
		data(){
			return{
				records:''
			}
		},
		setup() {
			const { proxy } = getCurrentInstance(); // 使用proxy代替ctx，因为ctx只在开发环境有效
			return {
				proxy
			};
		},
		mounted() {
			const { proxy } = getCurrentInstance();
			proxy.$axios.get('api/record/list').then(res => {
				proxy.records = res.data.data;
				console.log('goods' + proxy.$store.state.token);
				console.log(res.data);
			});
		},
		methods:{
			handleRefund(index,row, proxy){
				console.log(proxy)
				proxy.$axios.get('api/record/refund',
				{params:{
					id:row.id,
					no:row.goodsNo,
					count:row.count
				}}).then(res => {
					setTimeout(()=>{
						alert(res.data.msg)
						if(res.data.code==200&&res.data.data!=null){
							proxy.getRecordList(proxy)
						}
					},1000)
				})
			},
			getRecordList(proxy){
				proxy.$axios.get('api/record/list').then(res => {
					proxy.records = res.data.data;
					console.log(res.data.data);
				});
			}
		}
	}
</script>

<style>
</style>
