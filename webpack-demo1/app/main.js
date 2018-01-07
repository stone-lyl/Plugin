import "./style.less";
const app = document.getElementById('app');
app.innerText = "change app text!";
let changeText = () => {
    return 'function change text!!!';
}
app.innerText = changeText();