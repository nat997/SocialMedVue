<template>
    <div>
        <h1>Commentaire : {{test}}</h1>
    </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import axios from 'axios'
    export default {
        name:'Update',
        components:{
            Sidebar
        },
        data(){
            return{
				name:"",
				comment:"",
				id:"",
            }
        },
        async mounted(){
            let user=localStorage.getItem('user-info');
            if(!user)
            {
                this.router.push({name:'SignUp'})
            }
            const result=await axios.get(`http://localhost:3000/news?id=`+this.$route.params.id)
            console.warn(result.data[0].comment[0].status)
            console.warn(result.data)
            for(var i = 0;i<result.data[0].comment.length;i++){
                localStorage.setItem("comment"+[i],JSON.stringify(result.data[0].comment[i]))}
        },
        methods:{
            async UpdateComment(){
                //const result=await axios.post()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>