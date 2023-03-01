// import { Helmet } from 'react-helmet-async';
// import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
// import { useState } from 'react';
// // @mui
// import {
//   Card,
//   Table,
//   Stack,
//   Paper,
//   Avatar,
//   Button,
//   Popover,
//   Checkbox,
//   TableRow,
//   MenuItem,
//   TableBody,
//   TableCell,
//   Container,
//   Typography,
//   IconButton,
//   TableContainer,
//   TablePagination,
// } from '@mui/material';
// // components
// import Label from '../components/label';
// import Iconify from '../components/iconify';
// import Scrollbar from '../components/scrollbar';
// // sections
// import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// // mock
// import USERLIST from '../_mock/user';

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'id', label: 'id', alignRight: false },
//   { id: 'Username', label: 'Username', alignRight: false },
//   { id: 'Usercode', label: 'Usercode', alignRight: false },
//   { id: 'Password', label: 'Password', alignRight: false },
//   { id: 'Balance', label: 'Balance', alignRight: false },
//   { id: 'Name', label: 'Name', alignRight: false },
//   { id: 'Account No', label: 'Account No', alignRight: false },
//   { id: 'IFSC', label: 'IFSC', alignRight: false },
//   { id: 'upi id', label: 'upi id', alignRight: false },
//   { id: '' },
// ];

// // ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

// export default function UserPage() {
//   const [open, setOpen] = useState(null);
//   const [page, setPage] = useState(0);
//   const [order, setOrder] = useState('asc');
//   const [selected, setSelected] = useState([]);
//   const [orderBy, setOrderBy] = useState('name');
//   const [filterName, setFilterName] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleOpenMenu = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setOpen(null);
//   };

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = USERLIST.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };

//   const handleFilterByName = (event) => {
//     setPage(0);
//     setFilterName(event.target.value);
//   };

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

//   const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

//   const isNotFound = !filteredUsers.length && !!filterName;

//   return (
//     <>


//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//           <Typography variant="h4" gutterBottom>
//             User
//           </Typography>
//         </Stack>

//         <Card>
//           <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

//           <Scrollbar>
//             <TableContainer sx={{ minWidth: 800 }}>
//               <Table>
//                 <UserListHead
//                   order={order}
//                   orderBy={orderBy}
//                   headLabel={TABLE_HEAD}
//                   rowCount={USERLIST.length}
//                   numSelected={selected.length}
//                   onRequestSort={handleRequestSort}
//                   onSelectAllClick={handleSelectAllClick}
//                 />
//                 <TableBody>
//                   {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//                     const { id, name, role, status, company, avatarUrl, isVerified } = row;
//                     const selectedUser = selected.indexOf(name) !== -1;

//                     return (
//                       <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>


//                         <TableCell component="th" scope="row" padding="none">
//                           <Stack direction="row" alignItems="center" spacing={2}>
//                             <Typography variant="subtitle2" noWrap>
//                               {name}
//                             </Typography>
//                           </Stack>
//                         </TableCell>

//                         <TableCell align="left">{company}</TableCell>

//                         <TableCell align="left">{role}</TableCell>
//                         <TableCell align="left">{role}</TableCell>
//                         <TableCell align="left">{role}</TableCell>
//                         <TableCell align="left">{role}</TableCell>
//                         <TableCell align="left">{role}</TableCell>
//                         <TableCell align="left">{role}</TableCell>
//                         <TableCell align="left">{role}</TableCell>
//                         <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

//                         <TableCell align="left">
//                           <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
//                         </TableCell>

//                         <TableCell align="right">
//                           <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
//                             <Iconify icon={'eva:more-vertical-fill'} />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//                   {emptyRows > 0 && (
//                     <TableRow style={{ height: 53 * emptyRows }}>
//                       <TableCell colSpan={6} />
//                     </TableRow>
//                   )}
//                 </TableBody>

//                 {isNotFound && (
//                   <TableBody>
//                     <TableRow>
//                       <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
//                         <Paper
//                           sx={{
//                             textAlign: 'center',
//                           }}
//                         >
//                           <Typography variant="h6" paragraph>
//                             Not found
//                           </Typography>

//                           <Typography variant="body2">
//                             No results found for &nbsp;
//                             <strong>&quot;{filterName}&quot;</strong>.
//                             <br /> Try checking for typos or using complete words.
//                           </Typography>
//                         </Paper>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 )}
//               </Table>
//             </TableContainer>
//           </Scrollbar>

//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={USERLIST.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Card>
//       </Container>

//       <Popover
//         open={Boolean(open)}
//         anchorEl={open}
//         onClose={handleCloseMenu}
//         anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{
//           sx: {
//             p: 1,
//             width: 140,
//             '& .MuiMenuItem-root': {
//               px: 1,
//               typography: 'body2',
//               borderRadius: 0.75,
//             },
//           },
//         }}
//       >
//         <MenuItem>
//           <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
//           Edit
//         </MenuItem>

//         <MenuItem sx={{ color: 'error.main' }}>
//           <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
//           Delete
//         </MenuItem>
//       </Popover>
//     </>
//   );
// }












import React, { useState } from 'react';
import { Table } from 'react-bootstrap'

const User = () => {
  const [records, setRecords] = useState([
    {
      userName: "9876543210",
      userId: "jqydfgeyu",
      password: "123",
      balance: 123,
      name: "Manish",
      AccountNumber: 1234,
      ifsc: "ifsc",
      upi: "upi"
    },
    {
      userName: "9876543210",
      userId: "jqyfgeyu",
      password: "123",
      balance: 123,
      name: "Manish",
      AccountNumber: 1234,
      ifsc: "ifsc",
      upi: "upi"
    }
  ]);
  const [filteredData, setFilteredData] = useState([...records]);
  const [searchValue, setSearchValue] = useState("");


  function filterResults(value) {
    setSearchValue(value)
    const data = records.filter(item => {
      return item.userName.includes(value) || item.userId.includes(value)
    });
    setFilteredData(data);
  }

  return (
    <>
      <input value={searchValue} onChange={(e) => filterResults(e.target.value)} />

      <Table style={{ textAlign: 'center' }} className='' responsive striped bordered >
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Username</th>
            <th>userId</th>
            <th>Password</th>
            <th>Balance</th>
            <th>Name</th>
            <th>Account No.</th>
            <th>IFSC</th>
            <th>UPI</th>
          </tr>
        </thead>
        <tbody>
          {
            (filteredData && filteredData.length > 0) &&
            filteredData.map((item, index) => {
              return (
                <tr key={item.userId}>
                  <td>{index + 1}</td>
                  <td>{item.userName}</td>
                  <td>{item.userId}</td>
                  <td>{item.password}</td>
                  <td>{item.balance}</td>
                  <td >{item.name}</td>
                  <td >{item.AccountNumber}</td>
                  <td >{item.ifsc}</td>
                  <td >{item.upi}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </>
  )
}

export default User