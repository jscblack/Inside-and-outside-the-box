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
			<van-transition :show="loading==true&&showTrans==true" name="fade">
			<view v-if="loading==true">
				<me-loading></me-loading>
			</view>
			</van-transition>
			<van-transition :show="loading==false&&showTrans==true" name="fade">
				<view v-if="loading==false">
					<view class="avaterField">
						<view style="display: flex;align-items: center;justify-content:left">
							<van-col span="4" offset="3">
								<van-image style="margin-left: 50rpx;" round fit="cover" width="5rem" height="5rem"
									:src="avatarUrl" />
							</van-col>
							<van-col span="14" offset="3">
								<p class="userNameField">{{nickName}}</p>
							</van-col>
						</view>
					</view>
					<van-cell-group>
						<van-cell title="ㅤ我的纸条" icon="orders-o" is-link url="/pages/myNote/myNote" size="large" />
						<!-- 				<van-cell title="ㅤ我的收藏" icon="like-o" is-link url="/pages/myFavorite/myFavorite" size="large" /> -->
					</van-cell-group>
					<van-cell-group title="ㅤ">
						<van-cell title="ㅤ指南" icon="question-o" is-link url="/pages/manual/manual" size="large" />
						<van-cell title="ㅤ设置" icon="setting-o" is-link url="/pages/setting/setting" size="large" @click="onchlickSetting" />
					</van-cell-group>
				</view>
			</van-transition>


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
				avatarUrl: "",
				nickName: "",
				loading: true,
				showTrans: false,
				flush:false
			}
		},
		onLoad() {

			wx.showNavigationBarLoading();
			let that = this;
			console.log("loading me")
			wx.cloud.callFunction({
				name: 'get_user',
				success: function(res) {
					console.log(res);
					that.avatarUrl = res.result.data._favicon;
					that.nickName = res.result.data._nickname;
					wx.hideNavigationBarLoading()
					that['loading'] = false;
					setTimeout(() => {
						that['showTrans'] = true;
					}, 250);

				},
			});
		},
		onShow() {
			//console.log('imgHide '+this.imgHide);
			const that = this;
			that['showTrans'] = true;
			if(that.flush){
				wx.showNavigationBarLoading();
				that.flush=false;
				wx.cloud.callFunction({
					name: 'get_user',
					success: function(res) {
						console.log(res);
						that.avatarUrl = res.result.data._favicon;
						that.nickName = res.result.data._nickname;
						wx.hideNavigationBarLoading()
						that['loading'] = false;
						setTimeout(() => {
							that['showTrans'] = true;
						}, 250);
				
					},
				});
			}
		},
		onHide() {
			this['showTrans'] = false;
			
			// var page = getCurrentPages().pop();
			// console.log(page.$page.fullPath);
			// page.data.showTrans=false;
			// page.setData({
			// 	showTrans:false
			// })
			console.log('me'+this['showTrans'])
		},
		methods: {
			onchlickSetting(){
				const that=this;
				that.flush=true;
			}
		}
	}
</script>

<style scoped>
	.userNameField {
		display: block;
		font-size: 40rpx;
		width: 200rpx;
		text-align: center;
	}

	,
	.avaterField {
		height: 230rpx;
		padding-top: 100rpx;
	}
</style>
