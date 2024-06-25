# Group Project - Trippy

- _Date Created_: 23 JUNE 2024
- _Last Modification Date_: 24 JUNE 2024
- _Project URL_: <https://trippy-main.netlify.app/>
- _Git URL_: <https://git.cs.dal.ca/parthraj/CSCI5709_Grp_Project-06>

## Authors

- [Abhishek Kapoor](kapoor98.ak@dal.ca)
- [Abhishek Latawa](ab827859@dal.ca)
- [Kushal Panchal](ks735728@dal.ca)
- [Parthraj Panchal](pr829133@dal.ca)
- [Vaibhav Ramchandani](vaibhav.ramchandani@dal.ca)
- [Yash Walia](yashwalia@dal.ca)

## Getting Started

See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To have a local copy of this project up and running on your local machine, you will first need to install the following libraries

- Git
  - You can check if Git is installed by running the following command in the terminal.
  ```
  git --version
  ```
- Node
  - You can check if Node is installed by running the following command in the terminal.
  ```
  node --version
  ```
- A web browser like Google Chrome or Firefox

### Installing

A step by step series of examples that tell you how to get a development environment running

1. Clone this repository to your local system

```
git clone https://git.cs.dal.ca/parthraj/CSCI5709_Grp_Project-06.git
```

2. Change the current directory to cloned repository

```
cd CSCI5709_Grp_Project-06
```

3. Install required dependencies

```
cd frontend && npm install
```

4. Run the project

```
npm run dev
```

Above step would run the app in the development mode.
Open http://localhost:5173 to view it in your browser. The page will reload when you make changes.

## Deployment

We created a new private repository on Github called - CSCI5709_Grp_Project-06. Then we created separate branches respectively for each member of the group and pushed changes to them accordingly and merged them all into the main branch. Then, we imported the project on Netlify from Github and setup build settings to deploy the application. Finally, it was deployed and live on the mentioned link.

After you've finished setting up and have successfully accomplished all the preceding steps, it's time to publish your website. The following steps will guide you through this process.

- Login into Netlify with Github
- After login select the repository you want to deploy
- After selecting repository, Netlify will automatially deploy your website

## Built With

- [React](https://reactjs.org/) - Frontend Framework
- [NPM](https://www.npmjs.com/) - The package manager for [Node](https://nodejs.org/)
- [Netlify](https://www.netlify.com/) - The cloud platform used for application deployment
- [GitHub](https://github.com/) - The version control tool
- [Visual Studio Code](https://code.visualstudio.com/download) - The source code editor used
- [Google Chrome](https://www.google.com/intl/en_in/chrome/) - Browser used to visualize the changes

## Sources Used

### Header.jsx

_Lines 106-145_

```
 <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
  <IconButton
    size="large"
    aria-label="account of current user"
    aria-controls="menu-appbar"
    aria-haspopup="true"
    onClick={handleOpenNavMenu}
    color="inherit"
  >
    <MenuIcon />
  </IconButton>
  <Menu
    id="menu-appbar"
    anchorEl={anchorElNav}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    open={Boolean(anchorElNav)}
    onClose={handleCloseNavMenu}
    sx={{
      display: { xs: "block", md: "none" },
    }}
  >
    {pages.map((page) => (
      <MenuItem
        key={page.name}
        data-my-value={page.url}
        onClick={handleCloseNavMenu}
      >
        <Typography textAlign="center">{page.name}</Typography>
      </MenuItem>
    ))}
  </Menu>
</Box>
```

The code above was created by adapting the code in [Material UI - App Bar](https://mui.com/material-ui/react-app-bar/) as shown below:

```
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
```

### Landing.jsx

_Lines 237-262_

```
<Card
  sx={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
  }}
>
  <CardMedia
    sx={{ height: 180 }}
    image={card.image}
    title="machu pichu"
  />
  <CardContent sx={{ flexGrow: 1 }}>
    <Typography gutterBottom variant="h5" component="div">
      {card.title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {card.content}
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small" variant="contained">
      Book Now
    </Button>
  </CardActions>
</Card>
```

The code above was created by adapting the code in [Material UI - Card](https://mui.com/material-ui/react-card/) as shown below:

```
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
```

### FAQ.jsx

_Lines 84-99_

```
 <Accordion defaultExpanded>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
      sx={{ fontWeight: "bold" }}
    >
      How do I create an account?
    </AccordionSummary>
    <AccordionDetails>
      To create an account, click on the 'Sign Up' button on the top right
      corner of our homepage. Fill in the required details such as your
      name, email address, and password. You will receive a confirmation
      email to verify your account.
    </AccordionDetails>
  </Accordion>
```

The code above was created by adapting the code in [Material UI - ](https://mui.com/material-ui/react-card/) as shown below:

```
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function AccordionUsage() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Accordion 2
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
```

## Acknowledgments

- The code provided significant insights, serving as a foundation for comprehending the functionality and logic of various UI components. We are thankful for their work and commitment.
- It offered valuable perspectives and shaped my approach to understanding and learning specific techniques and methods. Their contribution is greatly appreciated.
