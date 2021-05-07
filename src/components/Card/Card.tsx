import React, { FC } from 'react';
import { Props } from "./props";

export const Card: FC<Props> = ({
  title,
  creationDate,
  _handleCardClick
}: Props) => {
  return (
    <div className="rounded bg-light p-2 mb-3">
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
  )
}