import React, { Component, createRef, KeyboardEvent } from 'react'
import Card from '../Card/Card';
import { v4 as uuidv4 } from 'uuid';
import { Button, Modal } from "react-bootstrap";

export default class Board extends Component {
  state = {
    todoValue: "",
    progressValue: "",
    doneValue: "",
    cardList: [{ id: 1, type: "todo", title: "To Do", description: "First to do task", creationDate: new Date("07.05.2021"), editDate: new Date("07.05.2021") }],
    showModal: false,
    modalCardInfo: { id: 1, type: "todo", title: "To Do", description: "First to do task", creationDate: new Date("07.05.2021"), editDate: new Date("07.05.2021") },
  }

  // private progressInputRef = createRef<HTMLInputElement>();
  // private doneInputRef = createRef<HTMLInputElement>();

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
      case "todo": {
        this.setState({ todoValue: event.target.value });
        break;
      }
      case "progress": {
        this.setState({ progressValue: event.target.value });
        break;
      }
      case "done": {
        this.setState({ doneValue: event.target.value });
        break;
      }
      default: break;
    }
  }

  _handleCardOnClick = (cardId: number, type: string) => {
    let cardIndex = this.state.cardList.map((card) => { return card.id; }).indexOf(cardId);;
    if (cardIndex === null || cardIndex === undefined) return;

    this.setState({ showModal: true });
    this.setState({
      showModal: true,
      modalCardInfo: this.state.cardList[cardIndex]
    })
  }

  _handleModalShowInput = () => {
    this.setState({ showModalDescription: true });
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

  _handleModalKeyPress = (event: KeyboardEvent) => {
    this.setState({ showModalDescription: false });
  }

  _handleSaveChanges = () => {
    let cardId = this.state.modalCardInfo.id;
    let cardIndex = this.state.cardList.map((card) => { return card.id; }).indexOf(cardId);
    let cardList = [...this.state.cardList];

    cardList[cardIndex] = this.state.modalCardInfo;

    this.setState({ cardList });
    this.setState({ showModal: false });
  }

  _handleDelete = () => {
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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 p-3 m-4 bg-dark rounded">
            <p className="text-white">To Do</p>
            {this.state.cardList.filter(card => card.type === "todo").map(card => {
              return (
                <Card key={card.id}
                  title={card.title}
                  creationDate={card.creationDate}
                  _handleCardClick={() => this._handleCardOnClick(card.id, card.type)}
                />
              );
            })}
            <input
              value={this.state.todoValue}
              onChange={(e) => this._handleChange(e, "todo")}
              onKeyPress={(e) => this._handleKeyPress(e, "todo")}
              className="form-control"
              placeholder="Add Task" />
          </div>
          <div className="col-md-3 p-3 m-4 bg-dark rounded">
            <p className="text-white">In Progress</p>
            {this.state.cardList.filter(card => card.type === "progress").map(card => {
              return (
                <Card key={card.id}
                  title={card.title}
                  creationDate={card.creationDate}
                  _handleCardClick={() => this._handleCardOnClick(card.id, card.type)}
                />
              );
            })}
            <input
              value={this.state.progressValue}
              onChange={(e) => this._handleChange(e, "progress")}
              onKeyPress={(e) => this._handleKeyPress(e, "progress")}
              className="form-control"
              placeholder="Add Task" />
          </div>
          <div className="col-md-3 p-3 m-4 bg-dark rounded">
            <p className="text-white">Done</p>
            {this.state.cardList.filter(card => card.type === "done").map(card => {
              return (
                <Card key={card.id}
                  title={card.title}
                  creationDate={card.creationDate}
                  _handleCardClick={() => this._handleCardOnClick(card.id, card.type)}
                />
              );
            })}
            <input
              value={this.state.doneValue}
              onChange={(e) => this._handleChange(e, "done")}
              onKeyPress={(e) => this._handleKeyPress(e, "done")}
              className="form-control"
              placeholder="Add Task" />
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={this._handleSaveChanges}>
          <Modal.Header>
            <Modal.Title>
              <input className="form-control"
                value={this.state.modalCardInfo.title}
                onChange={(e) => this._handleModalTitleChange(e, "title")}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-between">
              <h6>Description</h6>
            </div>
            <textarea className="form-control"
              style={{ fontSize: 16 }}
              value={this.state.modalCardInfo.description}
              onChange={(e) => this._handleModalDescriptionChange(e)}
            />
            <div className="mt-3 d-flex justify-content-between">
              <p style={{ fontSize: 14 }}>Last Edit: {this.state.modalCardInfo.editDate.toLocaleDateString()}</p>
              <p style={{ fontSize: 14 }}>Created at: {this.state.modalCardInfo.creationDate.toLocaleDateString()}</p>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="danger" onClick={this._handleDelete}>
              Delete
            </Button>
            <Button variant="success" onClick={this._handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}