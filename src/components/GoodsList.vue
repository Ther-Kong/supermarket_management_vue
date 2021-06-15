<template>
	<div>
		<div style="width: 100%; background-color: white;"><el-button @click="handleAdd(proxy)" type="primary">添加商品</el-button></div>
		<el-table :data="goods" style="width: 100%;">
			<el-table-column prop="id" label="编号" width="160"></el-table-column>
			<el-table-column prop="name" label="名字" width="150"></el-table-column>
			<el-table-column prop="purchase" label="进价" width="130"></el-table-column>
			<el-table-column prop="price" label="售价" width="130"></el-table-column>
			<el-table-column prop="dateStart" label="生产日期" width="160"></el-table-column>
			<el-table-column prop="dateEnd" label="保质期" width="160"></el-table-column>
			<el-table-column prop="inventory" label="库存" width="130"></el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="mini" @click="handlePurchase(scope.$index, scope.row, proxy)">进货</el-button>
					<template v-if="Date.parse(scope.row.dateEnd)<new Date()">
						<el-button size="mini" @click="handleSell(scope.$index, scope.row, proxy)" disabled="true">销售</el-button>
					</template>
					<template v-else>
						<el-button size="mini" @click="handleSell(scope.$index, scope.row, proxy)">销售</el-button>
					</template>
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row, proxy)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row, proxy)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="收货地址" v-model="dialogTableVisible" center width="27%" @close="resetData(proxy)">
			<el-form :model="goodsInfo" ref="goodsInfo" :rules="rules" :label-position="right" label-width="80px">
				<el-form-item label="商品编号" prop="id"><el-input v-model="goodsInfo.id"></el-input></el-form-item>
				<el-form-item label="商品名称" prop="name"><el-input v-model="goodsInfo.name"></el-input></el-form-item>
				<el-form-item label="商品类别" prop="category"><el-input v-model="goodsInfo.category"></el-input></el-form-item>
				<el-form-item label="商品进价" prop="purchase"><el-input v-model="goodsInfo.purchase"></el-input></el-form-item>
				<el-form-item label="商品售价" prop="price"><el-input v-model="goodsInfo.price"></el-input></el-form-item>
				<el-form-item label="保质期">
					<el-col :span="10">
						<el-form-item prop="dateStart">
							<el-date-picker type="date" placeholder="选择日期" v-model="goodsInfo.dateStart" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="10">
						<el-form-item prop="dateEnd"><el-date-picker placeholder="选择日期" v-model="goodsInfo.dateEnd" style="width: 100%;"></el-date-picker></el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="商品库存" prop="inventory"><el-input-number :min="0" :max="999" v-model="goodsInfo.inventory"></el-input-number></el-form-item>
				<el-form-item size="large">
					<el-button type="primary" @click="onSubmit('goodsInfo', proxy)">确定</el-button>
					<el-button @click="handleCancel(proxy)">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="请输入销售数量" v-model="sellVisible" width="20%">
			<el-form >
				<el-form-item label="数量:" label-width="60px">
					<el-input type="number" min="1" oninput ="value=value.replace(/[^\d]/g,'')"  v-model.number="count"></el-input>
				</el-form-item>
				<el-form-item label-width="20px">
					<el-button type="primary" @click="sell(proxy)">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="请输入进货数量" v-model="purchaseVisible" width="20%">
			<el-form >
				<el-form-item label="数量:" label-width="60px">
					<el-input type="number" placeholder="请输入" min="1" oninput ="value=value.replace(/[^\d]/g,'')"  v-model.number="count"></el-input>
				</el-form-item>
				<el-form-item label-width="20px">
					<el-button type="primary" @click="purchase(proxy)">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import Qs from 'qs';
export default {
	name: 'GoodsList',
	data() {
		var checkDate = (rule, value, callback) => {
			setTimeout(() => {
				if (this.goodsInfo.dateStart) {
					var date1 = new Date(this.goodsInfo.dateStart);
					var date2 = new Date(this.goodsInfo.dateEnd);
					if (date1 > date2) {
						callback(new Error('填写的日期不合法'));
					} else {
						callback();
					}
				}
			}, 1000);
		};
		return {
			nowGoods:0,
			count:0,
			sellVisible:false,
			purchaseVisible:false,
			dialogTableVisible: false,
			goodsNo: 0,
			goods: '',
			goodsInfo: {
				no:'',
				id: '',
				name: '',
				category: '',
				purchase: '',
				price: '',
				dateStart: '',
				dateEnd: '',
				inventory: 0
			},
			rules: {
				id: [
					{ required: true, message: '商品编号不能为空', trigger: 'blur' },
					{
						min: 13,
						max: 13,
						message: '商品编号必须为13位',
						trigger: 'blur'
					},
					{ type: 'number', message: '商品编号只能为数字', trigger: 'blur', transform: value => Number(value) }
				],
				name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }, { max: 30, message: '商品名称不能超过30个字符' }],
				category: [{ required: true, message: '商品类别不能为空', trigger: 'blur' }, { max: 30, message: '商品名称不能超过30个字符' }],
				purchase: [
					{ required: true, message: '商品进价不允许为空', trigger: 'blur' },
					{ pattern: /^([1-9]\d*|0)(\.\d{0,2})?$/, message: '价格最多只允许两位小数', trigger: 'blur' }
				],
				price: [
					{ required: true, message: '商品售价不允许为空', trigger: 'blur' },
					{ pattern: /^([1-9]\d*|0)(\.\d{0,2})?$/, message: '价格最多只允许两位小数', trigger: 'blur' }
				],
				dateStart: [{ required: true, message: '日期不能为空' ,trigger:'blur'}],
				dateEnd: [{ required: true, message: '日期不能为空',trigger:'blur' }, { validator: checkDate, trigger: 'blur' }]
			}
		};
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
			proxy.goods = res.data.data;
			console.log('goods' + proxy.$store.state.token);
			console.log(res.data);
		});
	},
	methods: {
		getGoodsList(proxy){
			proxy.$axios.get('api/goods/list').then(res => {
				proxy.goods = res.data.data;
				console.log('goods' + proxy.$store.state.token);
				console.log(res.data);
			});
		},
		handleEdit(index, row, proxy) {
			proxy.goodsNo = row.no;
			proxy.goodsInfo = JSON.parse(JSON.stringify(row));
			console.log(proxy.goodsInfo)
			proxy.dialogTableVisible = true;
		},
		handleAdd(proxy){
			proxy.dialogTableVisible = true;
		},
		handleDelete(index, row, proxy) {
			console.log(index, row);
			console.log(proxy);
			proxy.$axios.get('api/goods/delete',
			{params:{
				no:row.no
			}}).then(res => {
				setTimeout(()=>{
					alert(res.data.msg)
					if(res.data.code==200&&res.data.data!=null){
						proxy.getGoodsList(proxy)
					}
				},1000)
			})
		},
		handleCancel(proxy) {
			proxy.dialogTableVisible = false;
			proxy.resetGoodsInfo(proxy)
			proxy.goodsNo = 0
		},
		handlePurchase(index, row, proxy){
			proxy.nowGoods = row
			proxy.purchaseVisible = true
		},
		handleSell(index, row, proxy){
			proxy.nowGoods = row
			proxy.sellVisible = true
		},
		sell(proxy){
			console.log("开始销售")
			if(proxy.count ==0){
				alert("数量不能为0")
			}else if(proxy.nowGoods.inventory<proxy.count){
				alert("销售数量不能超过库存数量")
			}else{
				proxy.$axios.get('api/goods/sell',
				{params:{
					no:proxy.nowGoods.no,
					count:proxy.count
				}}).then(res => {
					setTimeout(()=>{
						alert(res.data.msg)
						if(res.data.code==200&&res.data.data!=null){
							proxy.getGoodsList(proxy)
						}
					},1000)
				})
			}
		},
		purchase(proxy){
			console.log("开始进货")
			if(proxy.count ==0){
				alert("数量不能为0")
			}else if(proxy.nowGoods.inventory+proxy.count>999){
				alert("库存量不能超过999")
			}else{
				proxy.$axios.get('api/goods/purchase',
				{params:{
					no:proxy.nowGoods.no,
					count:proxy.count
				}}).then(res => {
					setTimeout(()=>{
						alert(res.data.msg)
						if(res.data.code==200&&res.data.data!=null){
							proxy.getGoodsList(proxy)
						}
					},1000)
				})
			}
		},
		onSubmit(formName, proxy) {
			console.log("提交表单")
			this.$refs[formName].validate(valid => {
				console.log("进行表单验证")
				if (valid) {
					console.log('验证通过');
					console.log('id'+proxy.goodsInfo.id)
					if(proxy.goodsNo!=''||proxy.goodsNo!=null){
						proxy.goodsInfo.no = Number(proxy.goodsNo)
					}else{
						proxy.goodsInfo.no = 0;
					}
					var goodsData = Qs.stringify(proxy.goodsInfo);
					console.log("no"+proxy.goodsNo)
					proxy.$axios.post('api/goods/upload', goodsData).then(res => {
						setTimeout(() => {
							if (res.data.code == 200 && res.data.data != null) {
								if (proxy.goodsNo != null || proxy.goodsNo != '') {
									console.log('添加商品 ');
									proxy.dialogTableVisible = false
								} else {
									console.log('修改商品信息');
								}
								proxy.resetGoodsInfo(proxy)
								proxy.goodsNo =0;
								proxy.getGoodsList(proxy)
							} else {
								alert(res.data.msg);
							}
						}, 1000);
					});
				} else {
					console.log("输入非法")
					alert('请检查输入是否合法');
					return false;
				}
			});
		},
		resetGoodsInfo(proxy){
			proxy.goodsInfo ={
				no:'',
				id: '',
				name: '',
				category: '',
				purchase: '',
				price: '',
				dateStart: '',
				dateEnd: '',
				inventory: 0
			}
		},
		resetData(proxy){
			proxy.resetGoodsInfo(proxy)
			proxy.goodsNo = 0
			this.$refs['goodsInfo'].resetFields();
		}
	}
};
</script>

<style></style>
