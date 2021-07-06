import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Beasiswa, {
  setBeasiswaData,
  setAddBeasiswaData,
  setBeasiswaModal,
} from "../../store/actions/beasiswa";
import { Row } from "simple-flexbox";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, Button, MenuItem } from "@material-ui/core";
import DetailButtonComponent from "../../components/global-components/DetailButton";
import TableStatus from "../../components/global-components/TableStatus";
import InputComponent from "../../components/commons/form/input";
import Container from "../../components/container";
import Modal from "./modal";
import debounce from "lodash.debounce";
import { history } from "../../utils";
import { getUser } from "../../utils/user";
import moment from "moment";

const Index = ({
  onSetBeasiswaModal,
  onSetBeasiswaData,
  onSetAddBeasiswaData,
  pending,
}) => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const user = getUser();
  const tableRef = useRef();

  const handleRefresh = (state) => {
    setSearchText(state);
    tableRef.current && tableRef.current.onQueryChange();
  };

  const delayedQuery = debounce((value) => {
    return handleRefresh(value);
  }, 500);

  const handleSearchChange = (e) => {
    delayedQuery(e.target.value);
  };

  const setModal = (modalType, isOpen, data) => {
    onSetBeasiswaModal(modalType, isOpen);
    onSetBeasiswaData(data);
  };

  const setDetail = (type, data) => {
    onSetAddBeasiswaData(data);
    // onSetBeasiswaData(data);
    history.push(`/pd3/beasiswa/${type}/${data.id}`);
  };

  let columns = [
    {
      title: "No",
      field: "no",
      width: 40,
    },
    {
      title: "Nama Beasiswa",
      render: ({ nama }) => {
        return nama ? nama : "-";
      },
    },
    {
      title: "Awal Pendaftaran",
      render: ({ awal_pendaftaran }) => {
        return awal_pendaftaran
          ? moment(awal_pendaftaran).format("DD MMMM YYYY")
          : "-";
      },
    },
    {
      title: "Akhir Pendaftaran",
      render: ({ akhir_pendaftaran }) => {
        return akhir_pendaftaran
          ? moment(akhir_pendaftaran).format("DD MMMM YYYY")
          : "-";
      },
    },
    {
      title: "Aksi",
      width: 80,
      cellStyle: {
        paddingLeft: 0,
      },
      render: (rowData) => {
        return (
          <DetailButtonComponent>
            <MenuItem onClick={() => setDetail("detail", rowData)}>
              Lihat Detail
            </MenuItem>
            {user.role_code === "pd3" && (
              <>
                <MenuItem onClick={() => setDetail("edit", rowData)}>
                  Edit Data
                </MenuItem>
                <MenuItem onClick={() => setModal("delete", true, rowData)}>
                  Hapus Data
                </MenuItem>
              </>
            )}
          </DetailButtonComponent>
        );
      },
    },
  ];

  if (user.role_code === "mahasiswa") {
    columns.splice(4, 0, {
      title: "Status Pendaftaran",
      render: ({ status }) => {
        return status > -1 ? (
          <TableStatus
            status={
              status === 0
                ? "Belum mendaftar"
                : status === 1
                ? "Sudah mendaftar"
                : "Menerima beasiswa"
            }
          />
        ) : (
          "-"
        );
      },
    });
  }
  return (
    <Container>
      <Modal handleRefresh={(state) => handleRefresh(state)} />
      <Row className="m-3 justify-content-between">
        {user.role_code === "pd3" ? (
          <Button
            color="primary"
            variant="contained"
            disabled={pending}
            // onClick={() => setModal("add", true, null)}
            onClick={() => history.push("/beasiswa/add")}
          >
            Tambah Beasiswa
          </Button>
        ) : (
          <div></div>
        )}
        <InputComponent
          onChange={(e) => handleSearchChange(e)}
          placeholder="Cari nama beasiswa"
          endIcon={SearchIcon}
        />
      </Row>
      <div className="m-3">
        <MaterialTable
          tableRef={tableRef}
          title="Beasiswa"
          columns={columns}
          data={(q) =>
            new Promise((resolve) => {
              let param = {
                page: q.page + 1,
                length: 10,
                search_text: searchText,
              };
              dispatch(Beasiswa.get(param, resolve));
            })
          }
          options={{
            pageSize: 10,
            paginationType: "stepped",
            pageSizeOptions: [],
            showTitle: false,
            search: false,
            sorting: false,
            headerStyle: {
              backgroundColor: "#fff",
              fontWeight: "bold",
            },
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "Tidak ada data",
            },
          }}
          components={{
            Toolbar: () => <div />,
            Container: (props) => <Paper {...props} elevation={0} />,
          }}
        />
      </div>
    </Container>
  );
};

const mapStateToProps = ({ beasiswa: { pending } }) => {
  return { pending };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetBeasiswaModal: (modalType, isOpen) =>
      dispatch(setBeasiswaModal(modalType, isOpen)),
    onSetBeasiswaData: (data) => dispatch(setBeasiswaData(data)),
    onSetAddBeasiswaData: (data) => dispatch(setAddBeasiswaData(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
