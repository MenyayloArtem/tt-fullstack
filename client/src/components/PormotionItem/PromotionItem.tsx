import React from 'react';
import "./PromotionItem.scss"
import { Button, TableCell, TableRow } from '@material-ui/core';
import Promotion from '../../shared/types/Promotion';
import formatDate from '../../heplers/formatDate';

interface Props {
    item : Promotion,
    onEdit : (item : Promotion) => void,
    onDelete : (item : Promotion) => void
}

function PromotionItem ({
    item,
    onEdit,
    onDelete
} : Props) {
    return <TableRow>
    <TableCell>{item.name}</TableCell>
    <TableCell>{formatDate(item.date)}</TableCell>
    <TableCell>{item.giftsSent}</TableCell>
    <TableCell>
      <Button variant="contained" color="primary" onClick={() => onEdit(item)}>
        Редактировать
      </Button>
    </TableCell>
    <TableCell>
      <Button variant="contained" color="secondary" onClick={() => onDelete(item)}>
        Удалить
      </Button>
    </TableCell>
  </TableRow>
}

export default PromotionItem