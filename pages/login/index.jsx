//Next, React (core node_modules) imports must be placed here

//Fetchers must be imported here
//import useFETCHER from 'tools/useFETCHER'

//Layout must be imported here
//import LAYOUT from 'layouts/LAYOUT'
import LoginLayout from "layouts/Login";

//Component must be imported here
//import COMPONENT from 'components/COMPONENT'

const LoginPage = (props) => {
  return <div>This is the login page</div>;
};
LoginPage.Layout = LoginLayout;

export default LoginPage;
