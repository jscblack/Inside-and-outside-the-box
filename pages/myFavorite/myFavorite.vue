<template>
	<view>
		<van-loading v-if="loading==true" class="load" type="spinner" color="#000000" size="40px" />
		<view v-if="loading==false">
			<single :wx:for="data" wx:for-item="item"  wx:for-index="index" wx:key="key" :info="item.det" @delete="onDelete(index+'')"></single>
			<view class="safeView"></view>
		</view>
	</view>
</template>

<script>
	import single from '../../components/single.vue'
	export default {
		components: {
			single
		},
		data(){
			return{
				loading:true,
				data:[]
			}
		},
		onLoad(){
			//加载收藏
			const that=this;
			function tansf(utc_datetime) {
				const time=new Date(utc_datetime);
				return time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDay()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
			}
			wx.cloud.callFunction({
				name:'pull_fav',
				data:{},
				success:function(res){
					that['data']=res.result.data;
					for(const index in that['data'])
						that['data'][index].det.cre_time=tansf(that['data'][index].det.cre_time);
					that['loading']=false;
					console.log(res);
				}
			});
		},
		methods:{
			//删除收藏
			onDelete(indexS){
				const index=parseInt(indexS);
				this[`data`].splice(index, 1);
			}
		}
	}
</script>

<style scoped>
	.load{
		left: 50%;
		top: 40%;
		margin-left: -20px;
		position: absolute;
	}
</style>
