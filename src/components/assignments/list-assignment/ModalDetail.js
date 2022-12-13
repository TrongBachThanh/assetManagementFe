import { useContext } from "react";
import { Grid, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

import Title from "../../common/title/Title";
import { ListAssignmentContext } from "../../../contexts/providers/ListAssignmentProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalDetail = (props) => {
  const { listAssignmentState, changeOpenModalStatus } = useContext(
    ListAssignmentContext
  );
  return (
    <Modal
      keepMounted
      open={listAssignmentState.modalDetail.open}
      onClose={() => changeOpenModalStatus(false)}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style} style={{ borderRadius: "20px", width: "700px" }}>
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid black",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: '20px'
          }}
        >
          <Title title="Detailed Assignment Information" />
          <IconButton onClick={() => changeOpenModalStatus(false)}>
            <DisabledByDefaultOutlinedIcon
              sx={{ fontSize: 40 }}
              style={{ color: "#e30613" }}
            />
          </IconButton>
        </div>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={3}>Asset Code</Grid>
            <Grid item xs={9}>{listAssignmentState.modalDetail.data.assetCode}</Grid>
            <Grid item xs={3}>Asset Name</Grid>
            <Grid item xs={9}> {listAssignmentState.modalDetail.data.assetName}</Grid>
            <Grid item xs={3}>Specification</Grid>
            <Grid item xs={9} style={{ overflowWrap: "break-word" }}>
              {listAssignmentState.modalDetail.data.specification}
            </Grid>
            <Grid item xs={3}>Assigned to</Grid>
            <Grid item xs={9}> {listAssignmentState.modalDetail.data.assignedTo}</Grid>
            <Grid item xs={3}>Assigned by</Grid>
            <Grid item xs={9}> {listAssignmentState.modalDetail.data.assignedBy}</Grid>
            <Grid item xs={3}>Assigned Date </Grid>
            <Grid item xs={9}> {listAssignmentState.modalDetail.data.assignedDate}</Grid>
            <Grid item xs={3}>State </Grid>
            <Grid item xs={9}> {listAssignmentState.modalDetail.data.state}</Grid>
            <Grid item xs={3}>Note</Grid>
            <Grid item xs={9} style={{overflowWrap: "break-word"}}>{listAssignmentState.modalDetail.data.note}</Grid>
          </Grid>
       
      </Box>
    </Modal>
  );
};

export default ModalDetail;
