<template>
	<view>
		<view v-if="loading==true"><me-loading></me-loading></view>
		<van-transition :show="showTrans==true&&loading==false" name="fade">
		<view v-if="loading==false">
			<single-self :wx:for="data" wx:for-item="item"  wx:for-index="index" wx:key="key" :info="item.content" @delete="onDelete(index+'')"></single-Self>
			<view v-if="hasNote==false">
				<image src="https://6d65-meet-the-world-2g7kshiy287c49fe-1305360411.tcb.qcloud.la/static/image/box.png"  mode="aspectFill" style="height: 480upx;width: 480upx;margin-left: 130upx;margin-top: 130upx;"></image>
				<view class="noFav" style="margin-top: 200rpx;">
					糟糕，你怎么一条的小纸条都没有写呢？
				</view>
				<view class="noFav">
					......
				</view>
				<view  class="noFav" style="margin-top: 18rpx;">
					快去塞进纸箱里一些吧
				</view>
			</view>
			<view class="safeView"></view>
		</view>
		</van-transition>
	</view>
</template>

<script>
	import singleSelf from '../../components/singleSelf.vue'
	import meLoading from '../../components/meLoading.vue'
	export default {
		components: {
			meLoading,
			singleSelf
		},
		data() {
			return {
				loading:true,
				showTrans:false,
				data:[],
				hasNote:false
			}
		},
		onLoad() {
			wx.showNavigationBarLoading()
			const that=this;
			wx.cloud.callFunction({
				name:'pull_self',
				data: {},
				success:function(res){
					if(res.result.errCode==13600||res.result.errCode==13601)
					{
						console.log('pull_self ok',res);
						if(res.result.hasOwnProperty('data'))
							that.hasNote=true;
						for(const index in res.result.data)
						{
							res.result.data[index].cre_time=that.tansf(res.result.data[index].cre_time);
							const tmpObj={
								content:res.result.data[index],
								key:res.result.data[index]._id
							};
							that['data'][index]=tmpObj;
						}
						setTimeout(()=>{
							wx.hideNavigationBarLoading()
							that['showTrans']=true;
							that['loading']=false;
						},400);
					}
				}
			});
		},
		methods: {
			//删除纸条
			onDelete(indexS){
				const that=this;
				const index=parseInt(indexS);
				wx.cloud.callFunction({
					name:'delete_content',
					data:{
						mininote_id:that['data'][index].content._id,
					},
					success:function(res){
						console.log('delete_content success',res);
					},
					fail:function(err){
						console.log('delete_content fail',err);
					}
				});
				that[`data`].splice(index, 1);
				if(that.data.length==0)
					that.hasNote=false;
			}
		}
	}
</script>

<style scoped>
	.load{
		left: 50%;
		top: 40%;
		margin-left: -1rem;
		position: absolute;
	}
	.noFav{
		font-size:39rpx;
		text-align:center;
	}
</style>
