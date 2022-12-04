<template>
    <div>
        <img class="logo" src="../assets/login-icon.png"/>
        <h1 class="TitleSignUp">Connecter</h1>
        <div class="inputUser">
            <label>Email</label>
            <input type="email" class="form-control form-control-lg" v-model="email" />
            <label>Mots de passe</label>
            <input type="password" class="form-control form-control-lg" v-model="password" autocomplete="on" />
            <label></label>
            <div class="buttonLogin" style="padding-top:15px;">
                <button class="btn btn-dark btn-lg btn-block" @click="login" style="height:70px;width:165px;">Envoyer</button>
                <button class="btn btn-dark btn-lg btn-block" @click="$router.push('/sign-up')" style="height:70px;width:165px;">Creer un compte</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:"Login",
        data(){
            return{
                email:'',
                password:'',
            }
        },
        methods:{
            async login(){
                let result = await axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`)
                if(result.status==200 && result.data.length > 0 )
                {
                    alert("Bienvenue" );
                    localStorage.setItem("user-info",JSON.stringify(result.data[0]))
                    this.$router.push({name:'Home'})
                }
            }
        },
        mounted(){
            let user=localStorage.getItem('user-info')
            if(user){
                this.$router.push({name:'Home'})
                }
            },
    }
</script>

<style>
.logo{
    width: 100px;
    display: block;
    margin-left: auto;
    margin-right: auto ;
}
.TitleSignUp{
    display:flex;
    text-align:center;
    margin-left: auto;
    margin-right: auto ;
    justify-content: space-around;
}
.inputUser {
  min-width: 320px;
  max-width: 400px;
  min-height: 350px;
  max-height: 350px;
  padding: 2rem;
  text-align: center;
  margin: auto;
}



</style>