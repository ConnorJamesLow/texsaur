import example from './example.js';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.replaceWith(example);
