<template>
    <div class="questionnaire" v-title='"调查问卷"'>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="Number((100*(current/Math.ceil(this.totle/this.page))).toFixed(0))" status="exception" class='progress'></el-progress>
        <dl v-for='(item,index) in questions' v-show="index>=((current-1)*page) && index<(current*page)">
            <dt>{{index+1}}.{{item.title}}</dt>
            <dd v-show='item.type=="1"' :class='{"q-radio":item.option.length<=4}'>
                <el-radio v-for="(t, i) in item.option" :key='i' v-model="answer[index]" :label="t.key" v-if="item.option.length<=4">{{t.value}}</el-radio>
                <selector placeholder="请选择" v-model="answer[index]" :options="item.option" class="el-input__inner"  v-if="item.option.length>4"></selector>
            </dd>
            <dd v-if='item.type=="3"'  >
                <el-checkbox-group  v-model="answer[index]" v-for="(t, i) in item.option" :key='t.key'>
                    <el-checkbox :label="t.key">{{t.value}}</el-checkbox>
                </el-checkbox-group>
            </dd>
            <dd  v-if="item.type=='6'">
                <el-input
                    type="inpit"
                    placeholder="请输入内容"
                    v-model="answer[index]" 
                ></el-input>
            </dd>
            <dd  v-if="item.type=='7'">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="answer[index]" 
                ></el-input>
            </dd>
        </dl>
        <div class="clear10"></div>
        <div class="clear10"></div>
        <div class="clear10"></div>
        <div class="text-center">
            <el-button @click='dialogVisible=true'>显示</el-button>
            <el-button type="danger" :disabled='current==1' icon="el-icon-arrow-left" @click='prev'>上一页</el-button>
            <el-button type="danger" v-show='current!= (Math.ceil(totle/page))'  @click='next'>下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            <el-button type="danger" v-show='current== (Math.ceil(totle/page))'  @click='show_answer()'>提交<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="70%"
            :before-close="handleClose"
            custom-class="evaluate_success"
            top='0'
          >
          <img src="/static/img/success.png" style="width:23%;margin:0 auto;display:block;">
          <div class="clear10"></div>
          <div class="clear10"></div>
          <h3 class="text-center">感谢您的评价！</h3>
        </el-dialog>
  </div>
</template>
<script>
import {getquestion,submitquestion} from '../service/getdata'
import {Selector } from 'vux'
export default {
    name:'questionnaire',
    components: {
        Selector
    },
    data() {
      return {
        dialogVisible:false,
        current:1,
        page:2,
        totle:21,
        answer:[],
        questions:[]
      }
    },
    methods:{
        handleClose(){
            this.dialogVisible = false
        },
        show_answer(){
            let data          = {}
            let arr           = [];
            let IdtonumberArr = [];
            this.answer.map((val,index)=>{
                arr.push(index+1);
                let question         = this.questions[index]
                IdtonumberArr.push(question.id+'_'+(index+1));
                data["q_"+(index+1)] = question.id;
                data["t_"+(index+1)] =question.type;
                switch (question.type){
                    case 1:
                        data['v_'+(index+1)] = val
                    break;
                    case 3:
                        data['v_'+(index+1)] = question.option.length;
                        val.map((v,i)=>{
                            data['v_'+(index+1)+'_'+(i+1)] = v
                        });
                    break;
                    case 6:
                        data['v_'+(index+1)] = val
                    break;
                    case 7:
                        data['v_'+(index+1)] = val
                    break;
                }
            });
            data.selectedQst =  arr.join();
            data.Idtonumber  =  IdtonumberArr.join('*');
            // (async function(){
            //     let reqData = await submitquestion(data);
            //     console.log(reqData);

            // })()
        },
        prev(){
            this.current--
        },
        next(){
            this.current++
        },
        async getdata(){
            let getquestionData = await getquestion();
            this.questions = getquestionData.data.body;
            this.totle = this.questions.length;
        }
    },
    watch:{
        questions:function(val){
            val.map((val,index)=>{
                switch(val.type){
                    case '1':
                        this.answer[index] = ''
                    break;
                    case '3':
                        this.answer[index] = []
                    break;
                    case '6':
                        this.answer[index] = ''
                    break;
                    case '7':
                        this.answer[index] = ''
                    break;
                }
            });
        }
    },
    created(){
        this.getdata();
    }
}
</script>
<style scoped>
    .questionnaire{background-color: #ebebeb;padding:3em 2em;color:#010101;height: 100%;box-sizing: border-box;}
    h2{line-height:2;}
    dl{}
    dt{line-height:1.5;color:#010101;font-weight: bold;margin:10px 0;}
    .q-radio{margin-left: -30px;}
    dd{line-height: 30px;color:#010101;font-weight: normal;}
    .el-progress{border: #ccc solid 2px; border-radius:20px;margin-bottom: 20px;overflow: hidden;}
</style>
    <style>
    .el-radio__label{font-size: inherit;display: inline;white-space:inherit;}
    .el-button--danger:focus,.el-button--danger:hover {background-color:#f56c6c;border-color: #f56c6c;}
    .el-input__inner{margin-top: 0;}
    .el-input__inner select{width: 100%;overflow: hidden;}
    .el-input__inner option{width: 100%;}
    .el-checkbox,.el-radio{color: inherit;font-size: inherit;font-weight:normal;white-space:inherit;line-height: 2rem;}
    .el-checkbox-group{font-size: inherit;}
    .el-checkbox__label{font-size: inherit;display: inline;}
    .el-progress.is-exception .el-progress-bar__inner{
    background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
    background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
    -webkit-background-size: 40px 40px;
    }
    .el-radio{margin-left: 30px;}
    .evaluate_success {
        background-color: #ebebeb;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-60%);
        transform: translate(-50%,-60%);
        margin: 0;
    }
</style>