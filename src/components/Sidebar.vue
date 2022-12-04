<template>
	<div class="app">
		<div class="menu-toggle">
			<div class="hamburger">
				<span></span>
			</div>
		</div>

		<aside class="sidebar">
      <div class="header">
        <h3>Menu</h3>
        <img class="logoClown" src="../assets/logo.png"/>
      </div>
			<nav class="menu">
				<a href="/" class="menu-item is-active">Home</a>
				<a href="/Login" class="menu-item" v-if="!name">Login</a>
			  <a href="/Sign-Up" class="menu-item" v-if="!name" >Sign-Up</a>
				<a href="#" @click="logout" class="menu-item" v-if="name">Logout</a>
			</nav>
		</aside>

		<main class="content">

			<h1 >Bienvenue,{{name}}</h1>
			<p>Dit moi qu'est ce que vous pensez ?</p>
			<textarea type="text" class="form-control form-control-lg" v-model="status" style="height:200px;max-width: auto ; " placeholder="Nouveau post" ></textarea>
			<div class="button-submit" style="padding-top:15px">
				<button class="btn btn-dark btn-lg btn-block" @click="sendNews" style="height:70px;width:160px;">Envoyer</button>
			</div>
			<div class="newsFeeds" style="padding-top:15px;" >
				<h1 style="text-holder:center;">New feeds</h1>
				<div class="w3-first w3-container w3-margin-bottom" :key="item.id" v-for="(item, index) in news.slice().reverse()" style="padding-top:5px;border: solid lightgray;">
					<div class="header-post" style="background-color:lightgray;">
						<img src="{{picture}}" class="rounded-circle" style="max-height:15px;max-width:15px;"/>
						<span style="padding-left:7px">{{item.name}} </span>
						<span style="float:right;">{{new Date(item.id).toLocaleTimeString('it-IT')}} {{new Date(item.id).toLocaleDateString()}} </span>
					</div>
					<div class="border" style="background-color:white; ">
						Message : {{item.status}}
					</div> 
					<div class="comment">
						<textarea type="text" class="form-control form-control-lg" v-model="comment" style="height:100px;max-width: auto ; " placeholder="Commentaire" ></textarea>
						<button class="btn btn-light btn-lg btn-block" @click="sendComment" style="height:70px;width:160px;">Envoyer</button>
					</div>
				</div>
			</div>
   		</main>
	</div>

</template>

<script>
import axios from 'axios'
//import NewFeeds from './NewFeeds.vue'
  export default {
    name:'sidebar',
    methods:{
      logout()
      {
        localStorage.clear();
        this.$router.push({name:'Login'})
      },
      async sendNews()
      {
        var news = await axios.post("http://localhost:3000/news",
          {
              name:this.name,
              status : this.status,
              id:Date.now(),
			  picture:this.picture,
          });
		if(news.status==201)
			{
				alert("Posted" );
				localStorage.setItem("user-news",JSON.stringify(news.data))
			}
		this.$router.go()
      },
	  async sendComment(){
		var news1 = await axios.post("http://localhost:3000/news",
		{
              name:this.name,
			  status : this.status,
			  picture:this.picture,
              id:Date.now(),
			  comment:{
				"name": "asaa",
				"status": "asdwdd",
				"id": Date.now()
			}
        });
	  }
    },
    async mounted(){
		let user = localStorage.getItem('user-info')
		this.name=JSON.parse(user).name
		this.picture=JSON.parse(user).picture
		let result = await axios.get(`http://localhost:3000/news`)
		this.news=result.data
		console.warn(this.picture)
    },
    data(){
      return{
        name:'',
		news:[],
      }
    },
    
  }
</script>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: sans-serif;
}

.app {
	display: flex;
	min-height: 100vh;
}
.logoClown{
  max-width:30px;
  max-height:30px;
  display:flex;
}
.news{
	background-color:rgb(145, 145, 238);
}
.menu-toggle {
	display: none;
	position: fixed;
	top: 2rem;
	right: 2rem;
	width: 60px;
	height: 60px;
	border-radius: 99px;
	background-color: #2e3047;
	cursor: pointer;
}

.hamburger {
	position: relative;
	top: calc(50% - 2px);
	left: 50%;
	transform: translate(-50%, -50%);
	width: 32px;
}

.hamburger > span,
.hamburger > span::before,
.hamburger > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 99px;
  background-color: #FFF;
  transition-duration: .25s;
}

.hamburger > span::before {
  content: '';
  top: -8px;
}
.hamburger > span::after {
  content: '';
  top: 8px;
}
.menu-toggle.is-active .hamburger > span {
  transform: rotate(45deg);
}
.menu-toggle.is-active .hamburger > span::before {
  top: 0;
  transform: rotate(0deg);
}
.menu-toggle.is-active .hamburger > span::after {
  top: 0;
  transform: rotate(90deg);
}

.sidebar {
	flex: 1 1 0;
	max-width: 300px;
	padding: 2rem 1rem;
	background-color: #2e3047;
}

.sidebar h3 {
	color: #707793;
	font-size: 0.75rem;
	text-transform: uppercase;
	margin-bottom: 0.5em;
}

.sidebar .menu {
	margin: 0 -1rem;
}

.sidebar .menu .menu-item {
	display: block;
	padding: 1em;
	color: #FFF;
	text-decoration: none;
	transition: 0.2s linear;
}

.sidebar .menu .menu-item:hover,
.sidebar .menu .menu-item.is-active {
	color: #3bba9c;
	border-right: 5px solid #3bba9c;
}

.sidebar .menu .menu-item:hover {
	border-right: 5px solid #3bba9c;
}

.content {
	flex: 1 1 0;
	padding: 2rem;
}

.content h1 {
	color: #3C3F58;
	font-size: 2.5rem;
	margin-bottom: 1rem;
}

.content p {
	color: #707793;
}

@media (max-width: 1024px) {
	.sidebar {
		max-width: 200px;
	}
}

@media (max-width: 768px) {
	.menu-toggle {
		display: block;
	}
	.content {
		padding-top: 8rem;
	}
	.sidebar {
		position: fixed;
		top: 0;
		left: -300px;
		height: 100vh;
		width: 100%;
		max-width: 300px;
		transition: 0.2s linear;
	}

	.sidebar.is-active {
		left: 0;
	}
}
</style>