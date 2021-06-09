<template>
	<div class="container">
		<div class="title"><h1>登</h1><h1>录</h1></div>
		<div class="form">
			<AccountForm msg="login" />
		</div>
		<div class="bottom"><router-link to="changepass" target="_blank">注册账号</router-link><router-link to="/changepass" target="_blank">忘记密码？</router-link></div>
	</div>
</template>

<script>
import AccountForm from '@/components/AccountForm.vue';
export default {
	name: 'Login',
	components: {
		AccountForm
	}
};
</script>

<style lang="stylus">
.container
	margin-top 230px
	width 28%
	margin 30px auto
	.title
		display flex
		flex-direction row
		justify-self center
		width 40%
		margin 30px auto
		justify-content space-between
		margin-left 38%
		h1
			font 45px Extra large
			font-family "PingFang SC"
	.bottom
		display flex
		flex-direction row
		justify-self center
		margin 30px auto
		justify-content space-between
		margin-left 80px
</style>
