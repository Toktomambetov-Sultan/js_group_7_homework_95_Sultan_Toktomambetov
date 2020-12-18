import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "10vh",
  },
  list: {
    maxHeight: "40vh",
    overflowY: "scroll",
    width: "100%",
  },
}));

const IngredientsComponent = ({ ingredients, setIngredients, error }) => {
  const classes = useStyles();
  const onChange = (event, id) => {
    const copyIngredients = [...ingredients];
    const { value, name } = event.target;
    const copyIngredient = { ...copyIngredients[id] };
    copyIngredient[name] = value;
    copyIngredients[id] = copyIngredient;

    setIngredients(copyIngredients);
  };
  const onDelete = (index) => {
    const copyIngredients = [...ingredients];
    copyIngredients.splice(index, 1);
    setIngredients(copyIngredients);
  };
  const onCreate = () => {
    const copyIngredients = [...ingredients];
    setIngredients([...copyIngredients, { name: "", quantity: "" }]);
  };
  return (
    <div className={classes.wrapper}>
      <Typography variant="h6" color={!error ? "initial" : "secondary"}>
        {error?.message || "Add ingredient"}
      </Typography>
      <List className={classes.list}>
        {ingredients.map((ingredient, index) => (
          <ListItem key={index}>
            <Grid
              container
              direction="row"
              alignItems="center"
              wrap="nowrap"
              spacing={1}
            >
              <Grid xs={7} item>
                <TextField
                  size="small"
                  label={"Name"}
                  name="name"
                  value={ingredient.name}
                  onChange={(event) => onChange(event, index)}
                />
              </Grid>
              <Grid xs={3} item>
                <TextField
                  size="small"
                  label="Quantity"
                  name="quantity"
                  value={ingredient.quantity}
                  onChange={(event) => onChange(event, index)}
                />
              </Grid>
              <Grid xs={2} item>
                <IconButton
                  onClick={(e) => onDelete(index)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))}
        <ListItem>
          <Button
            color="primary"
            variant="outlined"
            onClick={onCreate}
            fullWidth
          >
            Add new ingredient
          </Button>
        </ListItem>
      </List>
    </div>
  );
};

export default IngredientsComponent;
