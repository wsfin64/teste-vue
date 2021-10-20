<template>
  <div id="app">
    <b-container id="main">
      <div id="menu">
        <b-navbar type="dark" variant="dark">
          <b-navbar-nav>
            <b-nav-item href="#">Home</b-nav-item>

            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="User" right>
              <b-dropdown-item href="#">Account</b-dropdown-item>
              <b-dropdown-item href="#">Settings</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-navbar>
      </div>    

      <div id="erro">{{ erro }}</div>
      <b-row>
        <b-col md="12">
          <div id="formulario">
        <b-form  @submit="onSubmit" @reset="onReset">
          <b-form-group id="input-group-1" label="Model's Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.nome"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Picture URL:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.urlFoto"
              placeholder="Enter URL"
              required
            ></b-form-input>
          </b-form-group>
          <div id="botoes">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </div>
        </b-form>
      </div>
      </b-col>
      <b-col md="3" v-for="foto in fotos" :key=foto.id>
        <div>
          <h2>{{foto.nome}}</h2>
          <a :href="foto.urlFoto" target="blank"><img class="avatar" v-bind:src="foto.urlFoto" alt="" ></a>
          </div>
      </b-col>
    </b-row>
    
    </b-container>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  },
  data(){
    return{
      fotos: [],
      form: {
          nome: '',
          urlFoto: ''
        },
      erro: ''
    }
  },
  mounted(){  // executa sempre que a aplicação é inciada ou a página é recarregada
    this.listar()
  },
  methods: {
     onSubmit(event) {
        event.preventDefault()
        this.sendPost();

        // Limpando o formulário
        this.form.nome = '';
        this.form.urlFoto = '';
        
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.name = ''
        this.form.urlFoto = ''
        // Trick to reset/clear native browser form validation state
      },
      sendPost() {
        console.log(JSON.stringify(this.form));
        this.$http.post("http://192.168.0.8:8080/api/modelos", JSON.stringify(this.form))
        .then(res => {
          console.log(res.body);
          this.listar();
          this.erro = '';
        })
        .catch(err => {
          console.log(err.body.message)
          this.erro = err.body.message
        });
        
      },
      listar(){
        this.$http.get("http://192.168.0.8:8080/api/modelos")
        .then(resposta => {
          this.fotos = resposta.body
        });
      }
  },
  // created(){
  //   this.$http.get("http://192.168.0.8:8080/api/modelos")
  //   .then(res => {
  //     this.fotos = res.body;
  //   });
  // }
}
</script>

<style>

#app, html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  

}



.avatar {
  width: 100%;
}

.avatar:hover{
  transition: .5s;
  transform: scale(1.2);
}

#formulario{
  margin-top: 50px;
}

#botoes {
  margin-top: 10px;
}
</style>
