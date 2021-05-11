import { ConnectDragSource } from 'react-dnd';


export type Props = {
  title: string;
  description?: string;
  creationDate: Date;
  editDate?: Date;
  _handleCardClick: () => void;
  connectDragSource?: ConnectDragSource;
  isDragging?: boolean;
}