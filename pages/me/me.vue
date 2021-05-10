<template>
	<view>
		<view>
			<view class="avaterField">
				<van-row>
				  <van-col span="6" offset="3">
					  <van-image
						round
						fit="cover"
						width="5rem"
						height="5rem"
						:src="avatarUrl"
					  />
				  </van-col>
				  <van-col span="12" offset="3">
					  <view class="userNameField">{{nickName}}</view>
				  </van-col>
				</van-row>
			</view>
			<van-cell-group>
				<van-cell title="ㅤ我的纸条" icon="orders-o" is-link url="/pages/myNote/myNote" size="large" />
				<van-cell title="ㅤ我的收藏" icon="like-o" is-link url="/pages/myFavorite/myFavorite" size="large" />
			</van-cell-group>
			<van-cell-group title="ㅤ">
				<van-cell title="ㅤ说明" icon="question-o" is-link url="/pages/manual/manual" size="large" />
				<van-cell title="ㅤ设置" icon="setting-o" is-link url="/pages/setting/setting" size="large" />
			</van-cell-group>
		</view>
		<my-tabbar now=1></my-tabbar>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				avatarUrl:"",
				nickName:""
			}
		},
		onShow() {
			let that = this;
			wx.getUserInfo({
			    success: function (res) {
			        console.log(res);
					that['avatarUrl']=res.userInfo.avatarUrl;
					that['nickName']=res.userInfo.nickName;
			    }
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.userNameField{
		position: absolute;
		top: 13%;
		font-size: 60rpx;
		text-align: center;
	},
	.avaterField{
		height: 230rpx;
		padding-top: 100rpx;
	}
</style>
