import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs,{ Dayjs } from "dayjs";
import axios from "axios";

const ManageEmployees_add = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [joinDate, setJoinDate] = useState<Dayjs | null>(null);
  const [department, setDepartment] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [errors, setErrors] = useState({
    name: "",
    age: "",
    joinDate: "",
    department: "",
    position: "",
    status: "",
  });
  const [CancelOpen, setCancelOpen] = useState(false);
  const [SaveOpen, setSaveOpen] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  useEffect(() => {
    if (!isEditMode) return;
    const fetchEmployeeById = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/employees/edit/${id}`);
        console.log(res.data);
        const emp = res.data.data;
        setName(emp.name);
        setAge(emp.age);
        setJoinDate(dayjs(emp.joindate));
        setDepartment(emp.department);
        setPosition(emp.position);
        setStatus(emp.status === "W" ? "Working" : "Terminated");
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    }
    fetchEmployeeById();
  }, [id, isEditMode]);

  const handleConfirmSave = async () => {
    setSaveOpen(false);

      const body = {
        name: name.trim(),
        age: age,
        joindate: joinDate ?.format("YYYY-MM-DD"),
        department: department ,
        position: position ,
        status: status === "Working" ? "W" : "T",
      };
      try{
        if (isEditMode) {
          await axios.put(`http://localhost:3000/employees/update/${id}`, body);
        } else {
          await axios.post("http://localhost:3000/employees/add", body);
        }
        navigate("/Home/ManageEmployees");
      } catch (error: any) {
        console.error("Failed to save employee:", error);
        alert(
        "Save failed: " +
          (error.response?.data?.detail ??
            JSON.stringify(error.response?.data) ??
            error.message),
      );
    }
  };

const validateForm = () => {
  const newErrors = {
    name: name.trim() === "" ? "Name is required" : "",
    age:
      age.trim() === ""
        ? "Age is required"
        : Number(age) < 18
          ? "Age must be at least 18"
          : "",
    joinDate: !joinDate ? "Join Date is required" : "",
    department: department === "" ? "Department is required" : "",
    position: position === "" ? "Position is required" : "",
    status: status === "" ? "Status is required" : "",
  };

  setErrors(newErrors);

  const hasError = Object.values(newErrors).some((message) => message !== "");

  if (hasError) {
    alert("Please fill in all required fields correctly before saving.");
    return;
  }

  setSaveOpen(true);
};
  return (
    <>
      <Breadcrumbs separator=">" aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Typography>Manage Employees</Typography>
        <Typography color="text.primary">
          {isEditMode ? "Edit Employee" : "Add Employee"}
        </Typography>
      </Breadcrumbs>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          {isEditMode ? "Edit Employee" : "New Employee"}
        </Typography>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            sx={{ mb: 3, mr: 2 }}
            onClick={validateForm}
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
              error={errors.name !== ""}
              onChange={(e) => setName(e.target.value)}
              onBlur={() =>
                setErrors({
                  ...errors,
                  name: name.trim() === "" ? "Name is required" : "",
                })
              }
              helperText={errors.name}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Age
            </Typography>
            <TextField
              fullWidth
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              error={errors.age !== ""}
              helperText={errors.age}
              onBlur={() =>
                setErrors({
                  ...errors,
                  age:
                    age.trim() === ""
                      ? "Age is required"
                      : Number(age) < 18
                        ? "Age must be at least 18"
                        : "",
                })
              }
            />
          </Grid>
          <Grid size={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Join Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={joinDate}
                onChange={(newValue) => {
                  setJoinDate(newValue);
                  setErrors((prev) => ({
                    ...prev,
                    joinDate: newValue ? "" : "Join Date is required",
                  }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: errors.joinDate !== "",
                    helperText: errors.joinDate,
                    onBlur: () => {
                      setErrors((prev) => ({
                        ...prev,
                        joinDate: joinDate ? "" : "Join Date is required",
                      }));
                    },
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
                  error={errors.department !== ""}
                  helperText={errors.department}
                  onBlur={() =>
                    setErrors({
                      ...errors,
                      department: department ? "" : "Department is required",
                    })
                  }
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
                  error={errors.position !== ""}
                  helperText={errors.position}
                  onBlur={() =>
                    setErrors({
                      ...errors,
                      position: position ? "" : "Position is required",
                    })
                  }
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
              onChange={(_, v) => setStatus(v ?? "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Status"
                  error={errors.status !== ""}
                  helperText={errors.status}
                  onBlur={() =>
                    setErrors({
                      ...errors,
                      status: status ? "" : "Status is required",
                    })
                  }
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
          <Button color="primary" onClick={handleConfirmSave} autoFocus>
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
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageEmployees_add;
