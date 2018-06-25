import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
	
	this.state = {
	  apiKey: "wLgLNY6dMO7TiUUnk5vIeMsfRVFETtx7",
	  symbols: [],
	  selectedSymbol: "",
	  quote: []
	}
	
	this.getSymbols = this.getSymbols.bind(this);
	this.getQuotes = this.getQuotes.bind(this);
	this.handleChangeSymbol = this.handleChangeSymbol.bind(this);
	this.handleRefresh = this.handleRefresh.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	
  }
  
  componentDidMount() {
    this.getSymbols();
  }
  
  getSymbols = () => {
	const url = `https://forex.1forge.com/1.0.3/symbols?api_key=${this.state.apiKey}`
	fetch(url).then(results => {
	  return results.json();
	}).then(data => {
  	  this.setState({
	    symbols: data
	  });
	});
  }
  
  getQuotes = selectedSymbol => {
	const url = `https://forex.1forge.com/1.0.3/quotes?pairs=${selectedSymbol}&api_key=${this.state.apiKey}`;
	fetch(url).then(results => {
	  return results.json();
	}).then(data => {
  	  this.setState({
	    quote: data[0]
	  });
	});
  }
  
  handleChangeSymbol = (e) => {
    this.setState({selectedSymbol: e.target.value});
  }
  
  handleRefresh = () => {
    this.handleSubmit();
  }
  
  handleSubmit = () => {
    const {selectedSymbol} = this.state;
    this.getQuotes(selectedSymbol);
  }
  
  render() {
    const {symbols, selectedSymbol, quote} = this.state;
    return (
      <div className="App">
		  <select value={selectedSymbol} onChange={this.handleChangeSymbol}>
		    <option value=""></option>
			{
			  symbols.map((sym) => <option key={sym} value={sym}>{sym}</option>)
			}
		  </select>
		<button onClick={this.handleSubmit}>Submit</button>
		<button onClick={this.handleRefresh}>Refresh</button>
		
		{quote.symbol !== undefined && <div>
	      <h1>Symbol: {quote.symbol}</h1>
	      <p>Bid: {quote.bid}</p>
	      <p>Ask: {quote.ask}</p>
	      <p>Price: {quote.price}</p>
	    </div>}
      </div>
    );
  }
}

export default App;
