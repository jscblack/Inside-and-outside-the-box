<!--
 * @Author       : Gehrychiang
 * @LastEditTime : 2021-05-11 14:30:20
 * @Website      : www.yilantingfeng.site
 * @E-mail       : gehrychiang@aliyun.com
 * @ProbTitle    : (记得补充题目标题)
-->
<template>
	<view>
		<view>
			<view v-if="loading==false">
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
				  <van-col span="7" offset="3">
					   <view class="userNameField">{{nickName}}</view>
				  </van-col>
				</van-row>
			</view>
			<van-cell-group>
				<van-cell title="ㅤ我的纸条" icon="orders-o" is-link url="/pages/myNote/myNote" size="large" />
<!-- 				<van-cell title="ㅤ我的收藏" icon="like-o" is-link url="/pages/myFavorite/myFavorite" size="large" /> -->
			</van-cell-group>
			<van-cell-group title="ㅤ">
				<van-cell title="ㅤ说明" icon="question-o" is-link url="/pages/manual/manual" size="large" />
				<van-cell title="ㅤ设置" icon="setting-o" is-link url="/pages/setting/setting" size="large" />
			</van-cell-group>
		</view>
		<view v-else><me-loading></me-loading></view>
		<my-tabbar now=2></my-tabbar>
	</view>
	</view>
</template>

<script>
	import myTabbar from '../../components/myTabbar.vue'
	import meLoading from '../../components/meLoading.vue'
	export default {
		components: {
			myTabbar,
			meLoading
		},
		data() {
			return {
				avatarUrl:"",
				nickName:"",
				loading:true,
			}
		},
		onLoad(){
			
			let that = this;
			console.log("loading me")
			wx.cloud.callFunction({
				name:'get_user',
				success:function(res){
					console.log(res);
					that.avatarUrl=res.result.data._favicon;
					that.nickName=res.result.data._nickname;
					that.loading=false;
				},
			});
			// wx.getUserInfo({
			//     success: function (res) {
			//         console.log(res);
			// 		that['avatarUrl']=res.userInfo.avatarUrl;
			// 		that['nickName']=res.userInfo.nickName;
			//     }
			// })
		},
		onShow() {
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.userNameField{
		position: fixed;
		top: 9%;
		font-size: 60rpx;
		text-align: center;
		
	},
	.avaterField{
		height: 230rpx;
		padding-top: 100rpx;
	}
</style>
