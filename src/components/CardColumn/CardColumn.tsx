/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { Card } from '../Card';
import { CardProps } from "./props";
import { DropTarget, DropTargetSpec, ConnectDropTarget } from "react-dnd";
import { ItemTypes } from "../../utils/Constants";

type Props = {
  cardList: Array<CardProps>;
  inputValue: string;
  colName: string;
  _handleCardOnClick: (id: number, colName: string) => void;
  _handleColumnInputChange: (e: React.ChangeEvent<HTMLInputElement>, colName: string) => void;
  _handleColumnKeyPress: (e: React.KeyboardEvent<HTMLElement>, colName: string) => void;
  connectDropTarget?: ConnectDropTarget;
  isOver?: boolean;
  canDrop?: boolean;
  dropCardOperation: (colName: string) => void;
}

const cardColumn: DropTargetSpec<Props> = {
  canDrop(props) {
    return true;
  },
  drop(props) {
    props.dropCardOperation(props.colName);
  }
};

const collect: any = (connect: any, monitor: any) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

@DropTarget(ItemTypes.Card, cardColumn, collect)
export class CardColumn extends React.Component<Props> {
  renderOverlay(color: string) {
    return (
      <div style={{
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }

  render() {
    const { cardList, inputValue, colName, _handleCardOnClick, _handleColumnInputChange, _handleColumnKeyPress, connectDropTarget, isOver, canDrop } = this.props;

    if (connectDropTarget === undefined || connectDropTarget === null) {
      return (
        <div className="col-md-3 p-3 m-4 bg-dark rounded" style={{ opacity: 0.9 }}>
          <p className="text-white">{colName.toUpperCase()}</p>
          {cardList.filter(card => card.type === colName).map(card => {
            return (
              <Card key={card.id}
                title={card.title}
                creationDate={card.creationDate}
                _handleCardClick={() => _handleCardOnClick(card.id, card.type)}
              />
            );
          })}
          <input
            value={inputValue}
            onChange={(e) => _handleColumnInputChange(e, colName)}
            onKeyPress={(e) => _handleColumnKeyPress(e, colName)}
            className="form-control"
            placeholder="Add Task +" />
        </div>
      )
    }

    return connectDropTarget(
      <div className="col-md-3 p-3 m-4 bg-dark rounded" style={{ opacity: 0.9 }}>
        <p className="text-white">{colName.toUpperCase()}</p>
        {cardList.filter(card => card.type === colName).map(card => {
          return (
            <Card key={card.id}
              title={card.title}
              creationDate={card.creationDate}
              _handleCardClick={() => _handleCardOnClick(card.id, card.type)}
            />
          );
        })}
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
        <input
          value={inputValue}
          onChange={(e) => _handleColumnInputChange(e, colName)}
          onKeyPress={(e) => _handleColumnKeyPress(e, colName)}
          className="form-control"
          placeholder="Add Task +" />
      </div>
    )
  }

}


// 218 lines -> 191 lines -> 188 ->