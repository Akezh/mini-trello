import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLTextAreaElement> & HTMLAttributes<HTMLInputElement> & {
  show: boolean;
  modalCardInfo: any;
  _handleSaveChanges: () => void;
  _handleDelete: () => void;
  _handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  _handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};