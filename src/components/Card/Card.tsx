import React from 'react'

type Props = {
  title: string;
  description?: string;
  creationDate: Date;
  editDate?: Date;
  _handleCardClick: () => void;
}

export default function Card(props: Props) {
  return (
    <div className="rounded bg-light p-2 mb-3">
      <div className="row">
        <div>
          <span style={{ fontSize: 16, fontWeight: 'bolder' }}>{props.title}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div
            onClick={props._handleCardClick}
            style={{ fontSize: 14, cursor: "pointer" }}
          >
            🖊
          </div>
          <span style={{ fontSize: 14 }}>{props.creationDate.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}