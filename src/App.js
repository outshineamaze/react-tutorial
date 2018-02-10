import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.handlerClick = this.handlerClick.bind(this)
    this.onInput = this.onInput.bind(this)
    this.state = {
      todoList: [{ value: '', flag: false }],
      doneList: []
    }
  }

  handlerClick(event) {
    console.log(event)
    let newTodoList = this.state.todoList.concat([{ index: this.state.todoList.length, flag: false, value: '' }])
    this.setState({
      todoList: newTodoList
    });
  }


  deleteItem(event, index, type = 'done') {
    let list = this.state[`${type}List`]
    let newList = list.filter((item) => item.index != index)
    this.setState({
      [`${type}List`]: newList
    })
  }

  setflag(event, index) {
    let newDoneList = this.state.doneList
    let TodoList2 = this.state.todoList.map((item, key) => {
      if (item.index == index) {
        newDoneList.unshift(item)
        item.flag = !Boolean(item.flag)
        if (item.flag === false) {
          newDoneList = newDoneList.filter(doneItem => doneItem.index !== index)
        }
      }
      return item
    })

    this.setState({
      todoList: TodoList2,
      doneList: newDoneList
    })
  }

  onInput(event) {
    console.log(event)
    let index = event.target.dataset.index
    let value = event.target.value
    let newTodoList = this.state.todoList.map((item, key) => {
      if (item.index == index) {
        item.value = value
      }
      return item
    })
    this.setState({
      todoList: newTodoList
    })
  }

  componentWillMount() {
    if (window.localStorage) {
      try {
        let newState = JSON.parse(localStorage.getItem('todoList'))
        this.setState({
          doneList: newState.doneList,
          todoList: newState.todoList
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  componentDidUpdate() {
    if (window.localStorage) {
      try {
        localStorage.setItem('todoList', JSON.stringify(this.state))
      } catch (e) {
        console.log(e)
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to TODO List</h1>
        </header>

        <div className="container-fluid">
          <div className="card">
            <ul className="list-group list-group-flush">
              {Array.isArray(this.state.todoList) ? this.state.todoList.map((item) => {
                return (
                  <li className="list-group-item" key={item.index}>
                    <div className="row">
                      <div className="col-xs-10 col-md-10">
                        <div className="input-group input-group-lg">
                          <input type="text" className="form-control" disabled={item.flag} data-index={item.index} value={item.value} onChange={this.onInput}></input>
                        </div>
                      </div>
                      <div className="col-xs-2 col-md-2">
                        <button  className={"btn " + (!item.flag ? "btn-info" : "btn-success")} onClick={(event) => { this.setflag(event, item.index) }}>
                          <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                          {item.flag ? '已完成' : '未完成'}
                        </button>
                        <button style={{marginLeft: '5px'}} className="btn btn-danger" onClick={(event) => { this.deleteItem(event, item.index, 'todo') }}>
                          <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>删除
                        </button>
                      </div>
                    </div>
                  </li>)
              }) : null}
              <li className="list-group-item" key="add">
                <button type="button" className="btn btn-light" onClick={this.handlerClick}>添加</button>
              </li>
            </ul>
          </div>
          {/* <h2>已完成事项</h2>
          <ul className="list-unstyled">
            {Array.isArray(this.state.doneList) ? this.state.doneList.map((item) => {
              return (<li key={item.index}>
                {item.value}
                <button onClick={(event) => { this.deleteItem(event, item.index, 'done') }}>删除</button>
              </li>)
            }) : null}
          </ul> */}
        </div>
      </div>
    );
  }
}
export default App;
