import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from 'dayjs';
import axios from "axios";

const ManageEmployees_add = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [joinDate, setJoinDate] = useState<Dayjs | null>(null);
  const [department, setDepartment] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const [CancelOpen, setCancelOpen] = useState(false);
  const [SaveOpen, setSaveOpen] = useState(false);
  const navigate = useNavigate();

  const handleConfirmSave = async () => {
    setSaveOpen(false);
    try {
      const body = {
        name: name.trim(),
        age: age === "" ? null : age,
        joindate: joinDate ? joinDate.toISOString() : null,
        department: department || null,
        position: position || null,
        status: 
          status === "Working" ? "W" :
          status === "Terminated" ? "T" :
          status || null,
      };
      await axios.post("http://localhost:8000/insertemployees", body);
      navigate("/Home/ManageEmployees");
    } catch (error: any) {
      console.error("Failed to save employee:", error);
      alert("Save failed: " + (error.response?.data?.detail ?? JSON.stringify(error.response?.data) ?? error.message));
    }
  };

  return (
    <>
      <Breadcrumbs separator=">" aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Typography>Manage Employees</Typography>
        <Typography color="text.primary">Add</Typography>
      </Breadcrumbs>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          New Employee
        </Typography>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            sx={{ mb: 3, mr: 2 }}
            onClick={() => setSaveOpen(true)}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{ mb: 3 }}
            onClick={() => setCancelOpen(true)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Name
            </Typography>
            <TextField
              placeholder="Name"
              fullWidth
              variant="outlined"
              value={name}
              sx={{ mb: 2 }}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Age
            </Typography>
            <TextField
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              error={age !== "" && Number(age) < 18}
              helperText={
                age !== "" && Number(age) < 18 ? "Age must be at least 18" : ""
              }
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Join Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={joinDate}
                onChange={(newValue) => setJoinDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Department
            </Typography>
            <Autocomplete
              disablePortal
              options={[
                "Development",
                "Human Resources",
                "Finance",
                "Marketing",
              ]}
              value={department || null}
              onChange={(_, v) => setDepartment(v ?? "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Department"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Position
            </Typography>
            <Autocomplete
              disablePortal
              options={[
                "Frontend Developer",
                "HR Officer",
                "Accountant",
                "Digital Marketing Executive",
              ]}
              value={position || null}
              onChange={(_, v) => setPosition(v ?? "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Position"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Status
            </Typography>
            <Autocomplete
              disablePortal
              options={["Working", "Terminated"]}
              value={status}
              onChange={(_, v) => setStatus(v ?? "Working")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Status"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Confirm Save Dialog */}
      <Dialog
        open={SaveOpen}
        onClose={() => setSaveOpen(false)}
        aria-labelledby="save-dialog-title"
        aria-describedby="save-dialog-description"
      >
        <DialogTitle id="save-dialog-title">ยืนยันการบันทึกข้อมูล?</DialogTitle>
        <DialogContent>
          <DialogContentText id="save-dialog-description">
            คุณต้องการบันทึกข้อมูลพนักงานใหม่หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveOpen(false)}>ยกเลิก</Button>
          <Button
            color="primary"
            onClick={handleConfirmSave}
            autoFocus
          >
            ยืนยันบันทึก
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Cancel Dialog */}
      <Dialog
        open={CancelOpen}
        onClose={() => setCancelOpen(false)}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
      >
        <DialogTitle id="cancel-dialog-title">
          ยกเลิกการเพิ่มพนักงาน?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-dialog-description">
            ข้อมูลที่กรอกจะไม่ถูกบันทึก คุณต้องการยืนยันการยกเลิกหรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelOpen(false)}>ย้อนกลับ</Button>
          <Button
            color="error"
            onClick={() => {
              setCancelOpen(false);
              navigate("/Home/ManageEmployees");
            }}
            autoFocus
          >
            ยืนยันยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageEmployees_add;
