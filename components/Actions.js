import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Actions({
  title,
  message,
  openAction,
  handleCloseAction,
  action,
  handleAction,
  contentId
}) {
  return (
    <div>
      <Dialog
        open={openAction}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAction}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAction}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleAction(contentId)}
            color="secondary"
            variant="contained"
          >
            {action}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
