import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Kuota, {
  setKuotaData,
  setKuotaModal,
} from "../../../store/actions/kuota";
import { Row } from "simple-flexbox";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, Button, MenuItem } from "@material-ui/core";
import DetailButtonComponent from "../../../components/global-components/DetailButton";
import InputComponent from "../../../components/commons/form/input";
import SelectComponent from "../../../components/commons/form/select";
import Container from "../../../components/container";
import Modal from "./modal";
import debounce from "lodash.debounce";
import { history } from "../../../utils";

const Index = ({ onSetKuotaModal, onSetKuotaData, pending }) => {
  const [searchText, setSearchText] = useState("");
  const path = window.location.pathname.split("/");
  const id = path.pop();
  const dispatch = useDispatch();
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
    onSetKuotaModal(modalType, isOpen);
    onSetKuotaData(data);
  };

  return (
    <Container>
      <Modal handleRefresh={(state) => handleRefresh(state)} />
      <Row className="m-3 justify-content-between">
        <Button
          color="primary"
          disabled={pending}
          variant="contained"
          onClick={() => setModal("add", true, null)}
        >
          Tambah Kuota
        </Button>
        <InputComponent
          onChange={(e) => handleSearchChange(e)}
          placeholder="Cari nama program studi"
          endIcon={SearchIcon}
        />
      </Row>
      <div className="m-3">
        <MaterialTable
          tableRef={tableRef}
          title="Kuota"
          columns={[
            {
              title: "No",
              field: "no",
              width: 40,
            },
            {
              title: "Nama Program Studi",
              render: ({ nama }) => {
                return nama ? nama : "-";
              },
            },
            {
              title: "Angkatan",
              render: ({ angkatan }) => {
                return angkatan ? angkatan : "-";
              },
            },
            {
              title: "Kuota",
              render: ({ kuota }) => {
                return kuota ? kuota : "-";
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
                    {/* <MenuItem onClick={() => setModal("detail", true, rowData)}>
                      Lihat Detail
                    </MenuItem> */}
                    <MenuItem onClick={() => setModal("edit", true, rowData)}>
                      Edit Data
                    </MenuItem>
                    <MenuItem onClick={() => setModal("delete", true, rowData)}>
                      Hapus Data
                    </MenuItem>
                  </DetailButtonComponent>
                );
              },
            },
          ]}
          data={(q) =>
            new Promise((resolve) => {
              let param = {
                page: q.page + 1,
                length: 10,
                search_text: searchText,
                beasiswa_id: id,
              };
              dispatch(Kuota.get(param, resolve));
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

const mapStateToProps = ({ kuota: { pending } }) => {
  return { pending };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetKuotaModal: (modalType, isOpen) =>
      dispatch(setKuotaModal(modalType, isOpen)),
    onSetKuotaData: (data) => dispatch(setKuotaData(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
