import logo from './logo.svg';
import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Form from  "./components/form/Form"
import api from "./api";

function App() {
  return (
    <div className="App">
      <Header> </Header>
        <Form> </Form>
        <Footer></Footer>
    </div>
  );
}

export default App;
