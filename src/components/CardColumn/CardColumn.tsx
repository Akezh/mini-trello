import React, { FC, KeyboardEvent } from 'react'
import { Card } from '../Card';
import { CardProps } from "./props";

type Props = {
  cardList: Array<CardProps>;
  inputValue: string;
  colName: string;
  _handleCardOnClick: (id: number, colName: string) => void;
  _handleColumnInputChange: (e: React.ChangeEvent<HTMLInputElement>, colName: string) => void;
  _handleColumnKeyPress: (e: KeyboardEvent, colName: string) => void;
}

export const CardColumn: FC<Props> = (props: Props) => {
  return (
    <div className="col-md-3 p-3 m-4 bg-dark rounded" style={{ opacity: 0.9 }}>
      <p className="text-white">{props.colName.toUpperCase()}</p>
      {props.cardList.filter(card => card.type === props.colName).map(card => {
        return (
          <Card key={card.id}
            title={card.title}
            creationDate={card.creationDate}
            _handleCardClick={() => props._handleCardOnClick(card.id, card.type)}
          />
        );
      })}
      <input
        value={props.inputValue}
        onChange={(e) => props._handleColumnInputChange(e, props.colName)}
        onKeyPress={(e) => props._handleColumnKeyPress(e, props.colName)}
        className="form-control"
        placeholder="Add Task +" />
    </div>
  )
}


// 218 lines -> 191 lines -> 188 ->