<template>
	<el-container style="height: 100%;">
		<el-aside width="200px" style="height: 100%;"><NavMenu></NavMenu></el-aside>
		<el-divider direction="vertical"></el-divider>
		<el-container>
			<el-header>
				<el-row :span = "24"  type="flex" justify="end">
					<el-col :span="4" >
						<a>用户：啊啊啊啊</a>
					</el-col>
					<el-col :span="1">
						<a>退出</a>
					</el-col>
				</el-row>
			</el-header>
			<el-main style="height: 100%;padding: 0;">
				<GoodsList></GoodsList>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import NavMenu from '../components/NavMenu.vue';
import GoodsList from '../components/GoodsList.vue';
export default {
	name: 'Goods',
	components: {
		NavMenu,
		GoodsList
	}
};
</script>

<style lang="stylus" scoped>
	.el-container
		margin-top 0px
		height 100%
		width 100%
		padding 0
		margin 0
		.user
			font-size 30px
			display flex
			flex-direction row
		.el-header
			padding-top 18px
			a:hover
				color: #409eff
			a
				display: inline-flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				vertical-align: middle;
				position: relative;
				text-decoration: none;
				outline: none;
				cursor: pointer;
				padding: 0;
				font-size: 14px;
				font-weight: 500
				text-decoration: none
		.el-divider
			width 2px
			height 100%
			margin 0
		.el-aside
			background-color #545c64
			height 100%
			width 100%
			padding 0
			margin 0
		.el-main
			background-color #f1f2f6
</style>
