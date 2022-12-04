<template>
    <div class="status">
        <div class="post">
            <label>News feed from {{name}}</label>
            <h1 style="display:flex;">
                <span style="float:left;">{{name}}</span> 
                <span style="float:right;">{{new Date(id).toLocaleDateString()}} {{new Date(id).toLocaleTimeString()}}</span>
            </h1>
        </div>
        <div class="news">
            <h1>{{status}}</h1>
        </div> 
    </div>
</template>

<script>
    export default {
        name:'NewFeeds',
        data(){
            return{
                name:'',
                id:'',
                status:'',

            }
        },
        mounted(){
            let user = localStorage.getItem('user-news')
            let userInfo = localStorage.getItem('user-info')
            this.name=JSON.parse(userInfo).name
            this.id=JSON.parse(user).id
            this.status=JSON.parse(user).status
        },
        methods:{

        },
    }
    
</script>

<style lang="scss" scoped>
.title span:nth-of-type(1) { float:right }
.title span:nth-of-type(2) { float:left }
.post{
    display:block;
    border-radius: 5px;
    border-color:black;
    text-align: center;
    background-color: rgb(180, 170, 238);
}
.news{
    background-color: rgb(248, 117, 117);
    color: #2e3047;
}
.status{
    padding-top: 150px;
    border-color: #2e3047;
}
</style>