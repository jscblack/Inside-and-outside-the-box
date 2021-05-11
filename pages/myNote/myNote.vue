<template>
	<view>
		<view v-if="loading==true"><me-loading></me-loading></view>
		<view v-if="loading==false">
			<single-self :wx:for="data" wx:for-item="item"  wx:for-index="index" wx:key="key" :info="item.content" @delete="onDelete(index+'')"></single-Self>
			<view class="safeView"></view>
		</view>
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
				data:[]
			}
		},
		onLoad() {
			wx.showNavigationBarLoading()
			const that=this;
			//时间转化
			function tansf(utc_datetime) {
				const time=new Date(utc_datetime);
				return time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDay()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
			}
			wx.cloud.callFunction({
				name:'pull_self',
				data: {},
				success:function(res){
					if(res.result.errCode==13600)
					{
						console.log('pull_self ok',res);
						for(const index in res.result.data)
						{
							res.result.data[index].cre_time=tansf(res.result.data[index].cre_time);
							const tmpObj={
								content:res.result.data[index],
								key:res.result.data[index]._id
							};
							that['data'][index]=tmpObj;
						}
						setTimeout(()=>{
							wx.hideNavigationBarLoading()
							that['loading']=false;
						},400);
					}
				}
			});
		},
		methods: {
			//删除纸条
			onDelete(indexS){
				wx.showNavigationBarLoading()
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
				wx.hideNavigationBarLoading()
				that[`data`].splice(index, 1);
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
</style>
