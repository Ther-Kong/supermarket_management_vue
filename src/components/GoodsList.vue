<template>
	<div>
		<el-table :data="tableData" style="width: 100%;">
			<el-table-column prop="id" label="编号" width="180"></el-table-column>
			<el-table-column prop="name" label="名字" width="180"></el-table-column>
			<el-table-column prop="purchase" label="进价"></el-table-column>
			<el-table-column prop="price" label="售价"></el-table-column>
			<el-table-column prop="dateStart" label="生产日期"></el-table-column>
			<el-table-column prop="dateEnd" label="保质期"></el-table-column>
			<el-table-column prop="inventory" label="库存"></el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
	name: 'GoodsList',
	data(){
		return{
			goods:""
		}
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
		proxy.$axios.get('api/goods/list').then(res => {
				proxy.goods = res.data;
				console.log("goods"+proxy.$store.state.token)
				console.log(res.data)
		})
		console.log(22222)
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		}
	}
};
</script>

<style></style>
