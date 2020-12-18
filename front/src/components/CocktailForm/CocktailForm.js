import React from "react";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import FileUploader from "../UI/FileUploader/FileUploader";
import IngredientsComponent from "../../components/CocktailForm/IngredientsComponent/IngredientsComponent";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "30px",
    width: "500px",
  },
  Bottom: {
    padding: "30px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileUploader: {
    maxWidth: "500px",
  },
  select: {
    minWidth: "300px",
  },
}));

const CocktailForm = ({
  onSubmit,
  onChange,
  error,
  cocktail,
  setIngredients,
}) => {
  const classes = useStyles();
  console.log(error);
  return (
    <div>
      <Box
        textAlign="center"
        bgcolor="#fff"
        margin={1}
        padding={1}
        borderRadius={10}
      >
        <Typography variant="h5">Add new Cocktail</Typography>
        <form onSubmit={onSubmit} noValidate>
          <Grid container>
            <Grid xs={8} item>
              <TextField
                margin="normal"
                className={classes.title}
                error={!!error?.name}
                label={error?.name?.message || "Name"}
                name="name"
                autoFocus
                value={cocktail.name}
                onChange={onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                error={!!error?.recipe}
                label={error?.recipe?.message || "Recipe"}
                fullWidth
                multiline
                rows={7}
                value={cocktail.recipe}
                required
                onChange={onChange}
                name="recipe"
              />
              <div className={classes.Bottom}>
                <div className={classes.fileUploader}>
                  <FileUploader
                    name="image"
                    onChange={onChange}
                    error={!!error?.image}
                    label={error?.image?.message || "image"}
                  />
                </div>
              </div>

              <Box marginTop={2} width="300px" display="inline-block">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Create
                </Button>
              </Box>
            </Grid>
            <Grid xs={4} item>
              <IngredientsComponent
                error={error?.ingredients}
                ingredients={cocktail.ingredients}
                setIngredients={setIngredients}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default CocktailForm;
