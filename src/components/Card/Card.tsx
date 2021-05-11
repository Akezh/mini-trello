import * as React from 'react';
// import { useDrag } from 'react-dnd';
import { Props } from "./props";
import { DragSource, DragSourceCollector, DragSourceSpec, ConnectDragSource } from 'react-dnd';
import { ItemTypes } from "../../utils/Constants";

const cardSource: DragSourceSpec<Props> = {
  beginDrag(props) {
    return props;
  }
};

const collect: any = (connect: any, monitor: any) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
};

@DragSource(ItemTypes.Card, cardSource, collect)
export class Card extends React.Component<Props> {
  render() {
    const { title, creationDate, _handleCardClick, connectDragSource, isDragging } = this.props;

    if (connectDragSource === undefined || connectDragSource === null) {
      return (<div className="rounded bg-light p-2 mb-3" style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div className="row">
          <div>
            <span style={{ fontSize: 16, fontWeight: 'bolder' }}>{title}</span>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div
              onClick={_handleCardClick}
              style={{ fontSize: 14, cursor: "pointer" }}
            >
              🖊
          </div>
            <span style={{ fontSize: 14 }}>{creationDate.toLocaleDateString()}</span>
          </div>
        </div>
      </div>);
    }

    return connectDragSource(
      <div className="rounded bg-light p-2 mb-3" style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div className="row">
          <div>
            <span style={{ fontSize: 16, fontWeight: 'bolder' }}>{title}</span>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div
              onClick={_handleCardClick}
              style={{ fontSize: 14, cursor: "pointer" }}
            >
              🖊
            </div>
            <span style={{ fontSize: 14 }}>{creationDate.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    );
  }
}