import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';
import './styles/results.scss';
import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
// import './styles/resets.scss';
// import './images/logo.svg';
function importAll(r) {
    return r.keys().map(r);
}
const images = importAll(require.context('./images/', false, /\.(png|gif|jpe?g|svg)$/));

console.log(checkForName);

export {
    checkForName,
    handleSubmit
}
