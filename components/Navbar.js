import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  useTheme,
  fade,
  withStyles
} from "@material-ui/core/styles";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import {
  Avatar,
  ListItemAvatar,
  Tooltip,
  Icon,
  Button
} from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

import AssignmentIcon from "@material-ui/icons/Assignment";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SettingsIcon from "@material-ui/icons/Settings";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useRouter } from "next/router";

import PerfectScrollbar from "react-perfect-scrollbar";
import { handleLogout } from "../utils/auth";
import Link from "next/link";

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    position: "relative"
  },
  container: {
    position: "relative",
    overflow: "hidden"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    width: "100%",
    WebkitOverflowScrolling: "touch",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  toolbar2: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0.1),
    backgroundColor: "#232f3e",
    overflow: "hidden"
  },
  drawerPaper: {
    width: drawerWidth,
    color: "#fff",
    backgroundColor: theme.palette.secondary.deep,
    "& svg": {
      color: "#fff"
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: "none",
    alignItems: "center",

    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  title: {
    display: "none",
    fontWeight: 600,
    cursor: "pointer",
    transition: "color 300ms ease",
    [theme.breakpoints.up("lg")]: {
      display: "block"
    },
    "&:hover": {
      color: theme.palette.secondary.light
    }
  },
  icon: {
    color: "#fff"
  },
  nested: {
    paddingLeft: theme.spacing(2)
  },
  logo: {
    fontWeight: 900,
    cursor: "pointer",
    // color: "#000",
    "&:hover": {
      color: theme.palette.type === "light" ? "#333" : ""
    }
  },
  login: {
    [theme.breakpoints.down("sm")]: {
      color: theme.palette.common.black
    }
  }
}));

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge);

function Navbar({ container, children, toggleDarkMode, token, user }) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [budgets, setBudgets] = React.useState(false);
  const [purchase, setPurchase] = React.useState(false);
  const [sales, setSales] = React.useState(false);
  const [roles, setRoles] = React.useState(false);
  const [vendors, setVendors] = React.useState(false);
  const [setup, setSetup] = React.useState(false);
  const [inventory, setInventory] = React.useState(false);
  const [navwidth, setNavwitdth] = React.useState(true);
  const [scroll, setScroll] = React.useState(false);
  const navRef = React.useRef(null);

  React.useEffect(() => {
    setNavwitdth(!token);
  }, [token]);

  navRef.current = scroll;

  React.useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 20;
      if (navRef.current !== show) {
        setScroll(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBudgetsDropdown = () => {
    setBudgets(!budgets);
  };

  const handleVendorsDropdown = () => {
    setVendors(!vendors);
  };

  const handleInventoryDropdown = () => {
    setInventory(!inventory);
  };

  const handlePurchaseDropdown = () => {
    setPurchase(!purchase);
  };

  const handleSalesDropdown = () => {
    setSales(!sales);
  };

  const handleRolesDropdown = () => {
    setRoles(!roles);
  };

  const handleSetupDropdown = () => {
    setSetup(!setup);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleRoute = path => {
    router.push(path);
    setMobileOpen(false);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onLogout = () => {
    handleLogout();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={toggleDarkMode}>
        <IconButton aria-label="toggle light/dark theme" color="inherit">
          {theme.palette.type === "light" ? (
            <Brightness4Icon />
          ) : (
            <Brightness7Icon />
          )}
        </IconButton>
        <p>Toggle light/dark theme</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem button onClick={handleLogout}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PowerSettingsNewIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <PerfectScrollbar>
      <div>
        <List className={(classes.toolbar, classes.toolbar2)}>
          <ListItem>
            <ListItemAvatar>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                variant="dot"
              >
                <Avatar />
              </StyledBadge>
            </ListItemAvatar>

            <ListItemText
              primary={
                user && user.authUser.firstname + " " + user.authUser.lastname
              }
            />
          </ListItem>
        </List>

        <Divider />
        <List>
          <ListItem button onClick={() => handleRoute("/")}>
            <ListItemIcon>
              <Icon>
                <img src="/dashboard.png" />
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handleVendorsDropdown}>
            <ListItemIcon>
              <Icon className="fas fa-user-tie" style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Vendors" />
            {vendors ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={vendors} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => handleRoute("/vendor/add")}
              >
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>AV</>
                </ListItemIcon>
                <ListItemText primary="Add Vendor" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>QR</>
                </ListItemIcon>
                <ListItemText primary="Quotation Request" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handleBudgetsDropdown}>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Budgets" />
            {budgets ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={budgets} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>AB</>
                </ListItemIcon>
                <ListItemText primary="Annual Budget" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>MB</>
                </ListItemIcon>
                <ListItemText primary="Monthly Budget" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>SB</>
                </ListItemIcon>
                <ListItemText primary="Supplementary Budget" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handleInventoryDropdown}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory Mgt." />
            {inventory ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={inventory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <> SR</>
                </ListItemIcon>
                <ListItemText primary="Store Requisition" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>GP</>
                </ListItemIcon>
                <ListItemText primary="Gate Pass" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleSalesDropdown}>
            <ListItemIcon>
              <Icon>
                <img src="/naira.png" />
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Sales Mgt." />
            {sales ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={sales} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>SO</>
                </ListItemIcon>
                <ListItemText primary="Sales Order" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>QR</>
                </ListItemIcon>
                <ListItemText primary="Quotation" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handlePurchaseDropdown}>
            <ListItemIcon>
              <Icon>
                <img src="/icons8-money.png" />
              </Icon>
            </ListItemIcon>
            <ListItemText primary="Purchasing" />
            {purchase ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={purchase} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>PR</>
                </ListItemIcon>
                <ListItemText primary="Purchase Requisition" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>RFQ</>
                </ListItemIcon>
                <ListItemText primary="Request for Quotation" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>QR</>
                </ListItemIcon>
                <ListItemText primary="Quotation Request" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>PO</>
                </ListItemIcon>
                <ListItemText primary="Purchase Order" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>RI</>
                </ListItemIcon>
                <ListItemText primary="Receiving & Inspection" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>RL</>
                </ListItemIcon>
                <ListItemText primary="Rejection Logs" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>OM</>
                </ListItemIcon>
                <ListItemText primary="Open Market" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handleRolesDropdown}>
            <ListItemIcon>
              <SettingsApplicationsIcon />
            </ListItemIcon>
            <ListItemText primary="Role Mgt." />
            {roles ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={roles} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>DH</>
                </ListItemIcon>
                <ListItemText primary="Divisional Heads" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>AP</>
                </ListItemIcon>
                <ListItemText primary="Approvers" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>RV</>
                </ListItemIcon>
                <ListItemText primary="Reviewers" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>PM</>
                </ListItemIcon>
                <ListItemText primary="Permissions" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handleSetupDropdown}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setup" />
            {setup ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={setup} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>EH</>
                </ListItemIcon>
                <ListItemText primary="Expense Header" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>LOC</>
                </ListItemIcon>
                <ListItemText primary="Location" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => handleRoute("/users")}
              >
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>US</>
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => handleRoute("/users/create")}
              >
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>CA</>
                </ListItemIcon>
                <ListItemText primary="Create User Account" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: theme.palette.secondary.icon }}>
                  <>VC</>
                </ListItemIcon>
                <ListItemText primary="Vendor Contracts" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    </PerfectScrollbar>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar}
        // color={user && "inherit"}
        color="inherit"
        style={{
          width: navwidth ? "100%" : "",
          backgroundColor: scroll
            ? theme.palette.background.paper
            : "transparent",
          // boxShadow: auth && "none"
          transition: "all ease 300ms"
        }}
        elevation={user || scroll ? 3 : 0}
      >
        <Toolbar>
          {token && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Link href="/">
            <Typography variant="h6" className={classes.logo}>
              RSEDGE
            </Typography>
          </Link>
          <div className={classes.grow} />

          {!token ? (
            <div>
              <Button
                // style={{ color: theme.palette.background.paper }}
                onClick={() => router.push("/login")}
                // size="large"
                style={{
                  fontWeight: "bold",
                  border: `2px solid ${theme.palette.secondary.light}`,
                  borderRadius: 50,
                  width: 100,
                  color: scroll ? "#fefefe" : "#fff",
                  backgroundColor: theme.palette.secondary.light
                }}
                className={classes.login}
              >
                Login
              </Button>
            </div>
          ) : (
            <>
              <div className={classes.sectionDesktop}>
                <Tooltip title="toggle light/dark theme">
                  <IconButton
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={toggleDarkMode}
                  >
                    {theme.palette.type === "light" ? (
                      <Brightness4Icon />
                    ) : (
                      <Brightness7Icon />
                    )}
                  </IconButton>
                </Tooltip>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={() => router.push("/notifications")}
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right"
                    }}
                    variant="dot"
                  >
                    <Avatar />
                  </StyledBadge>
                </IconButton>
                <Tooltip title="Logout">
                  <IconButton
                    edge="end"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={onLogout}
                  >
                    <PowerSettingsNewIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      <>
        {renderMobileMenu}
        {renderMenu}
      </>

      {token && (
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}
      {children}
    </div>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

export default Navbar;
