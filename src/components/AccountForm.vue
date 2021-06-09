<template>
	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" hide-required-asterisk="true">
		<el-form-item v-if="msg != 'changePass'" label="用户名" prop="username"><el-input v-model="ruleForm.username"></el-input></el-form-item>
		<el-form-item label="密码" prop="pass"><el-input type="password" v-model="ruleForm.pass"></el-input></el-form-item>
		<el-form-item v-if="msg != 'login'" label="确认密码" prop="checkPass"><el-input type="password" v-model="ruleForm.checkPass"></el-input></el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm',proxy)">提交</el-button>
			<el-button @click="resetForm('ruleForm',proxy)">重置</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
import {getCurrentInstance} from "vue";
import Qs from "qs"
let loading;
export default {
	name: 'AccountForm',
	props: {
		msg: String,
	},
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('确认密码不能为空'));
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			ruleForm: {
				username: '',
				pass: '',
				checkPass: '',
			},
			rules: {
				username: [
					{ required: true, message: '用户名不能为空', trigger: 'blur' },
					{
						min: 1,
						max: 10,
						message: '用户名长度请控制在1-10个字符'
					}
				],
				pass: [
					{ required: true, message: '密码不能为空', trigger: 'blur' },
					{
						min: 8,
						max: 20,
						message: '请检查输入密码是否规范，密码长度为8-20个字符',
						trigger: 'blur'
					}
				],
				checkPass: [
					{
						min: 8,
						max: 20,
						message: '请检查输入密码是否规范，密码长度为8-20个字符',
						trigger: 'blur'
					},
					{ validator: validatePass, trigger: 'blur' }
				]
			}
		};
	},
	setup(){
		const { proxy } = getCurrentInstance() // 使用proxy代替ctx，因为ctx只在开发环境有效
		console.log(proxy.$axios) // 路由信息
		// console.log(proxy.$systemName) // 全局挂载对象
		return{
			proxy
		}
	},
	methods: {
		submitForm(formName,proxy) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					if(proxy.msg=='login'){
						proxy.login(proxy)
					}
					
				} else {
					alert('请检查输入是否合法');
					return false;
				}
			});
		},
		login(proxy){
			proxy.openFullScreen();
			var data = Qs.stringify({
				"username":proxy.ruleForm.username,
				"pwd":proxy.ruleForm.pass
			})
			proxy.$axios.post('api/user/login',data).then(res => {
				setTimeout(()=>{
					proxy.closeFullScreen();
					if(res.data.code==200&&res.data.data!=null){
						proxy.$store.state.token = res.data.data;
						console.log("token"+proxy.$store.state.token)
						proxy.$router.push('/mainpage')
						console.log("设置token")
						console.log("跳转置首页")
					}else{
						alert(res.data.data)
					}
				},1000)
			})
		},
		openFullScreen() {
			loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
		},
		closeFullScreen(){
			loading.close();
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
};
</script>

<style lang="stylus" scoped>

</style>
