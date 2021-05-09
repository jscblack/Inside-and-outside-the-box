<template>
	<view>
		<van-loading v-if="loading==true" class="load" type="spinner" color="#000000" size="2rem" />
		<view v-if="loading==false">
			<single-self :wx:for="data" wx:for-item="item"  wx:for-index="index" wx:key="key" :info="item" @delete="onDelete(index+'')"></single-Self>
			<view class="safeView"></view>
		</view>
	</view>
</template>

<script>
	import singleSelf from '../../components/singleSelf.vue'
	export default {
		components: {
			singleSelf
		},
		data() {
			return {
				loading:true,
				data:[]
			}
		},
		onLoad() {
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
						that['data']=res.result.data
						for(const index in that['data'])
							that['data'][index].cre_time=tansf(that['data'][index].cre_time);
						that['loading']=false;
					}
				}
			});
		},
		methods: {
			//删除纸条
			onDelete(indexS){
				const index=parseInt(indexS);
				this[`data`].splice(index, 1);
				//调用后端删除
				//...
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
