<template>
	<view>
		<van-transition :show="loading==true&&showTrans==true" name="fade">
			<view v-if="loading==true">
				<me-loading></me-loading>
			</view>
		</van-transition>
		<van-transition :show="loading==false&&showTrans==true" name="fade">
			<view v-if="loading==false&&hasFav==true">
				<single :wx:for="data" wx:for-item="item" wx:for-index="index" wx:key="note" :info="item.det"
					@delete="onDelete(index+'')"></single>
				<view class="safeView"></view>
			</view>
			<view v-if="loading==false&&hasFav==false">
				<image src="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/box.png"  mode="aspectFill" style="height: 480upx;width: 480upx;margin-left: 130upx;margin-top: 130upx;"></image>
				<view class="noFav" style="margin-top: 200rpx;">
					糟糕，你怎么一条收藏的小纸条都没有呢？
				</view>
				<view class="noFav">
					......
				</view>
				<view  class="noFav" style="margin-top: 18rpx;">
					快去收藏一些吧
				</view>
			
			</view>
		</van-transition>
		<view :class="tabBarClass">
			<my-tabbar now=1 :able="tabBarClass!='setdown'"></my-tabbar>
		</view>
	</view>
</template>

<script>
	import myTabbar from '../../components/myTabbar.vue'
	import single from '../../components/single.vue'
	import meLoading from '../../components/meLoading.vue'
	import Vue from 'vue'
	export default {
		components: {
			myTabbar,
			single,
			meLoading
		},
		data() {
			return {
				loading: true,
				data: [],
				tabBarClass: 'normal',
				curpos: 0,
				showTrans: false,
				hasFav: false,
			}
		},
		onShow() {
			//console.log(this['showTrans'])
			if(Vue.prototype.$imgHide.status==true){
				console.log('from imgHide')
				Vue.prototype.$imgHide.status=false;
				return;
			}
			this['showTrans'] = true;
			wx.showNavigationBarLoading()
			const that = this;
			wx.cloud.callFunction({
				name: 'pull_fav',
				data: {},
				success: function(res) {
					that['data'] = res.result.data;
					that.hasFav=that['data'].length>=1?true:false;
					for (const index in that['data'])
						that['data'][index].det.cre_time = that.tansf(that['data'][index].det.cre_time);
					wx.hideNavigationBarLoading()
					that['loading'] = false;
					setTimeout(() => {
						that['showTrans'] = true;
					}, 250);
				}
			});
		},
		onPageScroll(ev) {
			const that = this;
			if (ev.scrollTop < this.curpos||ev.scrollTop==0)
				that.tabBarClass = 'setup';
			else
				that.tabBarClass = 'setdown';
			this.curpos = ev.scrollTop
		},
		onHide() {
			//console.log('fuck'+Vue.prototype.$imgHide.status)
			if(Vue.prototype.$imgHide.status==true){
				console.log('from imgHide')
				return;
			}
			this['showTrans'] = false;
			
			// var page = getCurrentPages().pop();
			// console.log(page.$page.fullPath);
			// page.data.showTrans=false;
			// page.setData({
			// 	showTrans:false
			// })
			console.log('fav'+this['showTrans'])
		},
		methods: {
			//删除收藏
			onDelete(indexS) {
				const that = this;
				const index = parseInt(indexS);
				wx.cloud.callFunction({
					name: 'alter_fav',
					data: {
						note_id: that['data'][index].det._id,
						oper: 2
					},
					success: function(res) {
						console.log('alter_fav success', res);
					},
					fail: function(err) {
						console.log('alter_fav fail', err);
					}
				});
				that[`data`].splice(index, 1);
				if(that.data.length==0)
					that.hasFav=false;
			}
		}
	}
</script>

<style scoped>
	@keyframes load {
		0% {
			opacity: 0.0;
		}

		100% {
			opacity: 1.0;
		}
	}

	@keyframes distory {
		0% {
			opacity: 1.0;
		}

		100% {
			opacity: 0;
		}
	}

	.normal {}

	.setup {
		animation: load 0.5s linear;
		opacity: 1.0;
	}

	.setdown {
		animation: distory 0.5s linear;
		opacity: 0;
	}
	.noFav{
		font-size:39rpx;
		text-align:center;
	}
</style>
