import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { InnerPageContainer } from "../../pageContainer";
import { DataGrid } from "@mui/x-data-grid";
import { BorderColorRounded, DeleteOutline } from "@material-ui/icons";
import UserAvatar from "../../../images/avatar/3ca46bfcfa43ef92f2875eaaa3199af6.jpeg";
import { userRows } from "../../../data/dummy";

const UserListContainer = styled(InnerPageContainer)`
  flex: unset;
  height: 200px;
  align-items: unset;
`;

const TableCellWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const UserCellImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const AnchorLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #6daaf0;
  cursor: pointer;
  text-decoration: none;
  transition: all 200ms ease-in-out;
  margin-right: 20px;

  &:hover {
    filter: contrast(0.6);
  }
`;

const ActionCellDeleteIcon = styled(DeleteOutline)`
  color: red;
  cursor: pointer;
`;

const UserList = () => {
  const [data, setData] = useState(userRows);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "user",
      headerName: "User",
      width: 170,
      renderCell: (params) => {
        return (
          <TableCellWrapper>
            <UserCellImage
              src={params.row.avatar}
              alt="user-avatar-user-list"
            />
            {params.row.username}
          </TableCellWrapper>
        );
      },
    },
    { field: "email", headerName: "Email", width: 230 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
    },
    {
      field: "transaction",
      headerName: "Transaction",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <TableCellWrapper>
            <AnchorLink to={`/user/${params.row.id}`}>
              <BorderColorRounded />
              {/* <TableCellActionButton>Edit</TableCellActionButton> */}
            </AnchorLink>
            <ActionCellDeleteIcon onClick={() => handleDelete(params.row.id)} />
          </TableCellWrapper>
        );
      },
    },
  ];

  return (
    <UserListContainer>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={15}
        userRowsPerPageOptions={[5]}
      />
    </UserListContainer>
  );
};

export default UserList;
