import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import '../App.css';

const styles = theme => ({
  root: {
    width: '90%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
});

const Users = (props) => {
  const { classes, users, albums, handlePhotosFetch } = props;
  const [updatedAlbums, setUpdatedAlbums] = React.useState([]);
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  const handleClick = (id) => {
    console.log(id);
    let updatedData = albums.filter((el) => el.userId === id);
    console.log(updatedData);
    setSelectedUserId(id);
    setUpdatedAlbums(updatedData);
  }

  return (
    <List className={classes.root}>
      {users.length > 0 ? users.map((el, i) => (
        <>
        <ListItem alignItems="flex-start" onClick={(e) => { e.preventDefault(); handleClick(el.id)}} key={i}>
          <ListItemText
            primary={`${el.name} (${el.username})`}
            secondary={
              <React.Fragment>
                <Typography component="span" className={classes.inline} color="textPrimary">
                  {el.email}
                </Typography>
                {` - ${el.address.street || ''} ${el.address.suite || ''}  ${el.address.suite || ''} ${el.address.city || ''} ${el.address.zipcode || ''}`}
              </React.Fragment>
            }
            />
          { el.id === selectedUserId ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={el.id === selectedUserId} timeout="auto" unmountOnExit>
        <List component="div" disablePadding >
          {updatedAlbums.length > 0 ?
            updatedAlbums.map((data, index) => (
            <ListItem button className={classes.nested}  onClick={(e) => {e.preventDefault(); handlePhotosFetch(data.id)}} key={data.id}>
              <ListItemText inset primary={data.title} />
            </ListItem>
            )) : ''}
        </List>
      </Collapse>  
      </>
      ))
      : ''}
    </List>
  );
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
