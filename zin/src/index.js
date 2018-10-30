import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class PersonList extends React.Component {
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
        { this.state.persons.map(person => 
		<div>
		<input type='text' />
		<input type='text' value={person.name} />
		<input type='text' value={person.description} />
		</div>
		)}
      </ul>
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



    axios.post(`http://localhost:2403/products`, { name: this.state.name,
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
            <input type="text" name="name" onChange={this.handleChange} /><br />
			Description:
            <input type="text" name="description" onChange={this.handleChange1} />
			<br />
			Category:
            <input type="text" name="category" onChange={this.handleChange2} />
			<br />
			Price:
            <input type="text" name="price" onChange={this.handleChange3} />
			<br />

          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

class PersonDelete extends React.Component {
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
ReactDOM.render(
  
  <PersonDelete />, 
  document.getElementById('root')
);
