<template>
    <div>
        <img class="logo" src="../assets/signup-icon.png"/>
        <h1 class="TitleSignUp">Créer votre compte</h1>
            <div class="inputUser">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" v-model="email" />
                <label>Nom</label>
                <input type="text" class="form-control form-control-lg" v-model="name"/>
                <label>Mots de passe</label>
                <input type="password" class="form-control form-control-lg" v-model="password" />
                <label>Photo profile (URL)</label>
                <input type="url" class="form-control form-control-lg" v-model="picture"/>
                <label></label>
                <button class="btn btn-dark btn-lg btn-block" @click="signUp" style="height:70px;width:160px;">Envoyer</button>
                <button class="btn btn-dark btn-lg btn-block" @click="$router.push('/login')" style="height:70px;width:160px">Connecter</button>
            </div>
    </div>
</template>


<script>
import axios from 'axios'
    export default {
        name:'SignUp',
        data(){
            return{
                name:'',
                email:'',
                password:'',
                picture:'',
                id:'',
            }
        },
        methods:{
            async signUp()
            {
                let checkEmail = await axios.get(`http://localhost:3000/users?email=${this.email}`)
                const checkNumberEmail = checkEmail.data.length
                const checkNumberName = JSON.stringify(this.name).length //base 2
                console.log(checkNumberName)
                if (checkNumberEmail==0){
                    if((JSON.stringify(this.password)).length>5)
                    {
                        if(checkNumberName>5){
                            var result = await axios.post("http://localhost:3000/users",
                            {
                                name:this.name,
                                email:this.email,
                                password:this.password,
                                picture:this.picture,
                                id:Date.now(),
                            });
                            if(result.status==201)
                            {
                                alert("Votre compte a été crée");
                                localStorage.setItem("user-info",JSON.stringify(result.data))
                                this.$router.push({name:'Home'})
                            }
                        }
                        else{
                            alert("Pseudo doit être supérier que 3 charactère ")
                        }
                    }
                    else
                    {
                        alert("Mots de passe doit être supérier que 6 charactère ")
                    }
                }
                else{
                    alert("Email est dèja utilisé")
                }
            },
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