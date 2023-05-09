import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
  },
  heading: {
    margin: theme.spacing(2),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function CardList() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => setCards(response.data))
        .catch(error => console.log(error));
  }, []);

  const handleToggle = (id) => {
    const updatedCards = cards.map(card => {
      if (card.id === id) {
        card.completed = !card.completed;
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleDelete = (id) => {
    setCards(cards.filter(card => card.id !== id))
  };

  return (
      <div className={classes.root}>
        <h1 className={classes.heading}>TODOшки</h1>
        <List className={classes.list}>
          {cards.map(card => (
              <ListItem key={card.id} dense button onClick={() => handleToggle(card.id)}>
                <Checkbox checked={card.completed} disableRipple />
                <ListItemText primary={card.title} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(card.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
          ))}
        </List>
      </div>
  );
}

export default CardList;