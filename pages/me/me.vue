<template>
	<view>
		<view v-if="loadingFinished">
			<van-steps
			  :steps="content"
			  :active="active"
			  direction="vertical"
			  active-color="#000000"
			  inactive-color="#000000"
			  active-icon="clock"
			  inactive-icon="clock"
			  custom-class="step-class"
			  desc-class="step-desc-class"
			/>
		</view>
		<view v-else><me-loading></me-loading></view>
		<my-tabbar now=1></my-tabbar>
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
				actice: 1,
				loadingFinished: false,
				items: [
					{
						index:"1",
						content:"123"
					},
					{
						index:"2",
						content:"345"
					}
				],
				content: []
			}
		},
		onShow() {
			this['loadingFinished'] = false;
			this['content']=[];
			this.$options.methods.getSelfMessages(this);
			console.log(this.$options);
		},
		methods: {
			getSelfMessages(that){
				wx.cloud.callFunction({
					name:'pull_self',
					data: {},
					success:function(res){
						console.log('[getSelfMessages] ok',res);
						if(res.result.errCode == 13600){
							that['loadingFinished'] = true;
							that.$options.methods.updateData(that,res.result.data);
						}
					},
					fail:function(err){
						console.log('[getSelfMessages] failed',err);
					}
				});
			},
			updateData(that,resultData) {
				console.log(resultData);
				console.log(resultData.length);
				for (let id in resultData) {
					that['content'].push({
						text:resultData[id].cre_time.replace("T"," ").substr(0,19),
						desc:resultData[id].note_words,
						pics:resultData[id].note_pic
					});
					console.log(that['content']);
				}
				
			}
		}
	}
</script>
<style>

</style>
<style>
	.step-class {
		overflow: scroll !important;
		max-height: 980rpx;
		overflow-y: auto;
	}
	.step-desc-class {
		font-size: 48rpx;
		margin-bottom: 25rpx;
	}
</style>
