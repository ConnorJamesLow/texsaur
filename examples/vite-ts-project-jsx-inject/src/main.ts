import example from './example';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.replaceWith(example);
