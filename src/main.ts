import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vant/lib/index.css';
import 'animate.css';

const bodyClass = import.meta.env.VITE_ROTATE;

// Apply the class to the body element
if (bodyClass && !navigator.userAgent.endsWith("_phone")) {
  document.body.classList.add(bodyClass);
}


createApp(App).mount('#app')
