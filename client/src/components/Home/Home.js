import React from "react";
import { Container } from "@mui/system";
import Blogs from "../Blogs/Blogs";
import { Grid } from "@material-ui/core";

const Home = () => {
  return (
    <Container>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Blogs />
          </Grid>
          <Grid item xs={12} sm={4}></Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Home;
