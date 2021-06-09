<template>
	<div class="container">
		<div class="title"><h1>修改</h1><h1>密码</h1></div>
		<div class="form">
			<AccountForm msg="login" />
		</div>
		<div class="bottom"><el-link href="" target="_blank">注册账号</el-link><el-link href="" target="_blank">忘记密码？</el-link></div>
	</div>
</template>

<script>
	import AccountForm from '@/components/AccountForm.vue';
	export default {
		name: 'ChangePass',
		components: {
			AccountForm
		}
	};
</script>

<style>
</style>
