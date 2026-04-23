import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type ApiResponse = {
  success: boolean;
  data: Employee[];
};
type Employee = {
  id: string;
  name: string;
  age: string;
  joindate: string;
  department: string;
  position: string;
  status: "W" | "T";
};


const ManageEmployees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try{
        const res = await axios.get<ApiResponse>("http://localhost:3000/employees");
        console.log(res.data);
        setEmployees(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);


  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 3 }}>
        Manage Employees
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Manage Employees
        </Typography>
        <Button variant="contained" onClick={() => navigate("/Home/ManageEmployees/Add")} >
          Add
        </Button>
      </Box>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper}>
        <Table>
          {/*  หัวตาราง */}
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {/* ข้อมูลในตาราง */}
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.id}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.age}</TableCell>
                <TableCell>{emp.joindate ? new Date(emp.joindate).toLocaleDateString() : "-"}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.position}</TableCell>

                <TableCell>
                  <Chip
                    label={emp.status === "W" ? "Working" : "Terminated"}
                    color={emp.status === "W" ? "success" : "error"}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="outlined" size="small">
                      Edit
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ManageEmployees;
