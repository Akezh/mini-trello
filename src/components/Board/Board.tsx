import React, { Component, KeyboardEvent } from 'react'
import { CardModal } from '../CardModal';
import { CardColumn } from '../CardColumn';
import { v4 as uuidv4 } from 'uuid';

export default class Board extends Component {
  state = {
    todoValue: "",
    progressValue: "",
    doneValue: "",
    cardList: [{ id: 1, type: "todo", title: "Task Sample", description: "First to do task sample", creationDate: new Date("07.05.2021"), editDate: new Date("06.05.2021") }],
    showModal: false,
    modalCardInfo: { id: 1, type: "todo", title: "To Do", description: "First to do task", creationDate: new Date("07.05.2021"), editDate: new Date("07.05.2021") },
  }

  _handleKeyPress = (event: KeyboardEvent, name: string) => {
    if (event.key === 'Enter') {

      let newTask = {
        id: uuidv4(),
        type: "",
        title: "",
        description: "",
        creationDate: new Date(),
        editDate: new Date(),
      }
      newTask.type = name;

      switch (name) {
        case "todo": {
          if (this.state.todoValue === "") return;
          newTask.title = this.state.todoValue;
          this.setState({ todoValue: "", });
          break;
        }
        case "progress": {
          if (this.state.progressValue === "") return;
          newTask.title = this.state.progressValue;
          this.setState({ progressValue: "" });
          break;
        }
        case "done": {
          if (this.state.doneValue === "") return;
          newTask.title = this.state.doneValue;
          this.setState({ doneValue: "" });
          break;
        }
        default: break;
      }
      this.setState({
        cardList: [...this.state.cardList, newTask],
      })
    }
  }

  _handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    switch (name) {
      case "todo":
        this.setState({ todoValue: event.target.value });
        break;
      case "progress":
        this.setState({ progressValue: event.target.value });
        break;
      case "done":
        this.setState({ doneValue: event.target.value });
        break;
      default: break;
    }
  }

  _handleCardOnClick = (cardId: number, type: string) => {
    let cardIndex = this.state.cardList.map((card) => { return card.id; }).indexOf(cardId);;
    if (cardIndex === null || cardIndex === undefined) return;

    this.setState({
      showModal: true,
      modalCardInfo: this.state.cardList[cardIndex]
    })
  }

  _handleModalTitleChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    this.setState({
      modalCardInfo: { ...this.state.modalCardInfo, title: event.target.value, editDate: new Date() }
    })
  }

  _handleModalDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      modalCardInfo: { ...this.state.modalCardInfo, description: event.target.value, editDate: new Date() },
    })
  }

  _handleModalSaveChanges = () => {
    let cardId = this.state.modalCardInfo.id;
    let cardIndex = this.state.cardList.map((card) => { return card.id; }).indexOf(cardId);
    let cardList = [...this.state.cardList];

    cardList[cardIndex] = this.state.modalCardInfo;

    this.setState({ cardList });
    this.setState({ showModal: false });
  }

  _handleModalDelete = () => {
    let cardId = this.state.modalCardInfo.id;
    let cardIndex = this.state.cardList.map((card) => { return card.id; }).indexOf(cardId);
    let cardList = [...this.state.cardList];

    if (cardIndex !== -1 && cardIndex !== undefined) {
      cardList.splice(cardIndex, 1);
    }
    this.setState({
      cardList,
      showModal: false,
    });
  }

  componentDidMount = () => {
    // retrieve vals from local storage
    // if (localStorage.length > 0) {
    //   Object.keys(localStorage).forEach((cardId) => {
    //     let result = localStorage.getItem(cardId);
    //     if (result !== null) {
    //       let card = JSON.parse(result);

    //       // this.setState({
    //       //   cardList: [...this.state.cardList, card]
    //       // })
    //     }
    //   });
    // }
  }

  componentWillUnmount = () => {
    // this.state.cardList.forEach((card) => {
    //   localStorage.setItem(card.id.toString(), JSON.stringify(card));
    // })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <CardColumn
            cardList={this.state.cardList}
            inputValue={this.state.todoValue}
            colName="todo"
            _handleCardOnClick={this._handleCardOnClick}
            _handleColumnInputChange={this._handleChange}
            _handleColumnKeyPress={this._handleKeyPress}
          />
          <CardColumn
            cardList={this.state.cardList}
            inputValue={this.state.progressValue}
            colName="progress"
            _handleCardOnClick={this._handleCardOnClick}
            _handleColumnInputChange={this._handleChange}
            _handleColumnKeyPress={this._handleKeyPress}
          />
          <CardColumn
            cardList={this.state.cardList}
            inputValue={this.state.doneValue}
            colName="done"
            _handleCardOnClick={this._handleCardOnClick}
            _handleColumnInputChange={this._handleChange}
            _handleColumnKeyPress={this._handleKeyPress}
          />
        </div>
        <CardModal
          show={this.state.showModal}
          modalCardInfo={this.state.modalCardInfo}
          _handleSaveChanges={this._handleModalSaveChanges}
          _handleDelete={this._handleModalDelete}
          _handleTitleChange={(e) => this._handleModalTitleChange(e, "title")}
          _handleDescriptionChange={(e) => this._handleModalDescriptionChange(e)}
        />
      </div>
    )
  }
}


// 218 lines -> 191 lines -> 188 -> 159