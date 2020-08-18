//import "./style.css"

//document.getElementById('app').innerHTML = "Hello webpack"
import Vue from "vue";
import App from "./App.vue";
import router from "@/router";

// var element = document.createElement('div');
// element.setAttribute("id","app");
// document.body.appendChild(element);

new Vue({
  render: h => h(App),
  // render: function(createElements) {
  //   return createElements(App);
  // }
  router: router,
}).$mount("#app");
