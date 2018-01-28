import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.handlerClick = this.handlerClick.bind(this)
    this.onInput = this.onInput.bind(this)
    this.state = {
      todoList: [],
      doneList: []
    }
  }

  handlerClick(event) {
      console.log(event)
      let newTodoList = this.state.todoList.concat([{index: this.state.todoList.length, flag:false,value: ''}])
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

  setflag(event,index){
    let flag=event.target.flag
    let newDoneList = this.state.doneList
    let TodoList2 = this.state.todoList.map((item, key) => {
      if(item.index==index){
        newDoneList.unshift(item)
        item.flag=true;
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
      } catch(e){
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
            <h1 className="App-title">Welcome to React laynezhou</h1>
          </header>
          <p className="App-intro">
            这是一个todo应用
          </p>
          <h2>待办事项:<button onClick={this.handlerClick}>添加</button></h2>
          <ul>
          {Array.isArray(this.state.todoList) ? this.state.todoList.map((item) => {
              return (<li key={item.index}>
                {item.value}
                <input type="text" data-index={item.index} value={item.value} onChange={this.onInput}></input>
                <button onClick={(event) => {this.deleteItem(event, item.index, 'todo')}}>删除</button>
                <button onClick={(event) => {this.setflag(event,item.index)}}>{item.flag ? '已完成' : '未完成'}</button>
                </li>)
          }) : null}
          </ul>

          <h2>已完成事项</h2>
          <ul>
          {Array.isArray(this.state.doneList) ? this.state.doneList.map((item) => {
              return (<li key={item.index}>
                {item.value}
                <button onClick={(event) => {this.deleteItem(event, item.index, 'done')}}>删除</button>
                </li>)
          }) : null}
          </ul>
        </div>
      );
    }
}

export default App;
