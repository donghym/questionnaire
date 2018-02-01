<template>
    <div class="q-start" v-title='"服务调查问卷"'>
        <h2 class="text-center">欢迎参加（问卷标题）<br>服务满意度调查</h2>
        <h4 class="text-center">填写说明</h4>
        <p>亲爱的用户，我们正在进行一项关于XX情况的调查问卷，恳求您用几分钟时间帮忙填答这份问卷，本问卷实行匿名制，所有数据只用于统计分析，请您放心填写。题目选项无对错之分，请您按自己的世纪情况填写。谢谢您的帮助。</p>
        <div class="text-center">
            <el-button type="danger" class='to-index-btn'><a @touchstart='toIndex()' class="to-index">开始答题</a></el-button>
        </div>
  </div>
</template>
<script>
export default {
    name:'qStart',
    data() {
      return {

      }
    },
    methods:{
        toIndex(){
            this.$router.push({ path: '/index' })
        }
    },
    watch:{
    },
    created(){
    }
}
</script>
<style scoped>
    .q-start{padding:50px 15px;background-color: #ebebeb;height: 100%;}
    h2{font-size: 1.0625rem;font-weight: bold;color: #000;line-height:2rem;margin-bottom:1rem;}
    h4{color: #777;font-size:0.9375rem;font-weight: normal;margin-bottom: 0.625rem;}
    p{text-indent: 2em;color: #777;font-size:1rem;line-height:2.2;margin-bottom:2rem;}
    .to-index-btn{padding:1rem 0px;}
    .to-index{padding:1rem 20px}
</style>