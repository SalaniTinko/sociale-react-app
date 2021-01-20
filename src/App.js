import logo from './logo.svg';
import './App.css';
import SearchPageComponent from './containers/search-page';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import DetailPage from './containers/detail-page';
import CreatePageComponent from './containers/create-page';

function App() {
  return (
    <div className="App">
                <nav class="navbar navbar-fixed-top  navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
</nav>
      <BrowserRouter>
      <Switch>
        <Route exact path='/'>
        <SearchPageComponent></SearchPageComponent>
        </Route>
        <Route  exact path="/create/celebrity" component={CreatePageComponent}/>
        <Route exact path="/:id" component={DetailPage} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
