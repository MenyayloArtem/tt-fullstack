import React from 'react';
import "./GiftItem.scss"
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import Gift from '../../shared/types/Gift';
import formatDate from '../../heplers/formatDate';

interface Props {
    item : Gift,
    onSelect : (item : Gift) => void
}



function GiftItem ({item, onSelect} : Props) {
    return <Card variant="outlined" className='giftItem'>
    <CardContent>
      <Typography className="giftItem__title" color="textSecondary" gutterBottom>
        { item.avaliableCount }
      </Typography>
      <Typography variant="h5" component="h2">
        {item.name}
      </Typography>
      <Typography className="giftItem__pos" color="textSecondary">
        {formatDate(item.fireDate)}
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant='contained' color='primary' size="small" onClick={() => onSelect(item)}>Выбрать</Button>
    </CardActions>
  </Card>
}

export default GiftItem