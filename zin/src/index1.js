import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

export default class PersonList extends React.Component {
  state = {
    id: '',
  }

  handleChange = event => {
    this.setState({ id: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.delete(`http://localhost:2403/products/${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person ID:
            <input type="text" name="id" onChange={this.handleChange} />
          </label>
          <button type="submit">Delete</button>
        </form>
      </div>
    )
  }
}


class PersonEntry extends React.Component {
  state = {
    name: '',
    description:'',
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }
  handleChange1 = event => {
    this.setState({ description: event.target.value });
  }

  handleChange2 = event => {
    this.setState({ category: event.target.value });
  }

  handleChange3 = event => {
    this.setState({ price: event.target.value });
  }    
  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name
    };

    axios.post(`http://localhost:2403/products`, 
	{ name: this.state.name,
    	description: this.state.description,
    	category: this.state.category,
    	price: this.state.price,
     })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
            <input type="text" name="description" onChange={this.handleChange1} />
            <input type="text" name="category" onChange={this.handleChange2} />
            <input type="text" name="price" onChange={this.handleChange3} />

          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}


class PersonEdit1 extends React.Component {
constructor () {
    super()
    this.state = {
      username: ''
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    axios.get('http://localhost:2403/products/4d078d22c98da90d')
      .then(response => this.setState({username: response.data.name}))
  }

  render () {
    return (
      <div className='button__container'>
        <button className='button' onClick={this.handleClick}>Click Me</button>
        <p>{this.state.username}</p>
      </div>
    )
  }
}

class PersonEdit extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get('http://localhost:2403/products/4d078d22c98da90d')
      .then(response => this.setState(
	  {myTextInput: response.data.name}
	  
	  ))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange}  ref = "myTextInput" />
            <input type="text" name="description" onChange={this.handleChange1} />
            <input type="text" name="category" onChange={this.handleChange2} />
            <input type="text" name="price" onChange={this.handleChange3} />

          </label>
          <button type="submit">Add</button>
        </form>
      </div>
	  
    )
  }
}

class PersonView extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://localhost:2403/products`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
      </ul>
	  
    )
  }
}


class ExampleComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [
        { title: "React Redux Tutorial for Beginners", id: 1 },
        { title: "Redux e React: cos'è Redux e come usarlo con React", id: 2 }
      ]
    };
  }
  render() {
    const { articles } = this.state;
    return <h3 className="">
	{articles.map(el => <li key={el.id}>{el.title}</li>)}
	</h3>

	;
	
  }
}
ReactDOM.render(
  <ExampleComponent />, 
  document.getElementById('root')
);
