import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from "@mui/material/Avatar";

const Dashboard = () => {
  return (
    <>
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" key="1" color="inherit" href="/">
          Dashboard
        </Link>
      </Breadcrumbs>
      <Typography variant="h5" sx={{ mb: 2}}>Dashboard</Typography>
          
          <Grid container spacing={2} sx={{ mb: 2}}>
            <Grid size={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">120</Typography>
                  <Typography variant="body2" color="text.secondary">
                    จำนวนพนักงานทั้งหมด
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">5</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ลาวันนี้
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">3</Typography>
                  <Typography variant="body2" color="text.secondary">
                    มาสายวันนี้
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">7</Typography>
                  <Typography variant="body2" color="text.secondary">
                    คำขอลาที่รออนุมัติ
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

      {/* </Card> */}

      {/* คำขอลารออนุมัติ */}
      <Typography variant="h5" sx={{ mb: 2}}>Pending Actions</Typography>
      <Accordion>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>คำขอลาที่รออนุมัติ</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{}}>
            <Typography>(1)</Typography>
          </Box>
        </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>ลำดับ</TableCell>
                    <TableCell>ชื่อพนักงาน</TableCell>
                    <TableCell>ประเภทการลา</TableCell>
                    <TableCell>วันที่เริ่มลา</TableCell>
                    <TableCell>วันที่สิ้นสุดการลา</TableCell>
                    <TableCell>จำนวนวันลา</TableCell>
                    <TableCell>สถานะ</TableCell>
                    <TableCell>วันที่ยื่นคำขอ</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>สมชาย ใจดี</TableCell>
                    <TableCell>ลาป่วย</TableCell>
                    <TableCell>2024-07-01</TableCell>
                    <TableCell>2024-07-03</TableCell> 
                    <TableCell>2</TableCell> 
                    <TableCell>
                      <Chip label="รออนุมัติ" color="warning" />
                    </TableCell>
                    <TableCell>2024-06-28</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Avatar sx={{ bgcolor: 'green', width: 28, height: 28, cursor: 'pointer' }}>Y</Avatar>
                        <Avatar sx={{ bgcolor: 'red', width: 28, height: 28, cursor: 'pointer' }}>N</Avatar>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
      </Accordion>

      {/*  พนักงานไม่ลงเวลาเข้า–ออก */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>พนักงานไม่ลงเวลาเข้า–ออก</Typography>
        </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>ชื่อพนักงาน</TableCell>
                    <TableCell>ประเภทการลา</TableCell>
                    <TableCell>วันที่เริ่มลา</TableCell>
                    <TableCell>วันที่สิ้นสุดการลา</TableCell>
                    <TableCell>สถานะ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>สมชาย ใจดี</TableCell>
                    <TableCell>ลาป่วย</TableCell>
                    <TableCell>2024-07-01</TableCell>
                    <TableCell>2024-07-03</TableCell> 
                    <TableCell>รออนุมัติ</TableCell> 
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
      </Accordion>

      {/* คำขอแก้ไขข้อมูลพนักงาน */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>คำขอแก้ไขข้อมูลพนักงาน</Typography>
        </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>ชื่อพนักงาน</TableCell>
                    <TableCell>ประเภทการลา</TableCell>
                    <TableCell>วันที่เริ่มลา</TableCell>
                    <TableCell>วันที่สิ้นสุดการลา</TableCell>
                    <TableCell>สถานะ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>สมชาย ใจดี</TableCell>
                    <TableCell>ลาป่วย</TableCell>
                    <TableCell>2024-07-01</TableCell>
                    <TableCell>2024-07-03</TableCell> 
                    <TableCell>รออนุมัติ</TableCell> 
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
      </Accordion>
    </>
  );
};
export default Dashboard;
