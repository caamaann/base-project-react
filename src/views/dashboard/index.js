import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Beasiswa, {
  setBeasiswaData,
  setBeasiswaModal,
} from "../../store/actions/beasiswa";
import { Row } from "simple-flexbox";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, Button, MenuItem } from "@material-ui/core";
import DetailButtonComponent from "../../components/global-components/DetailButton";
import InputComponent from "../../components/commons/form/input";
import Container from "../../components/container";
import Modal from "./modal";
import debounce from "lodash.debounce";
import { history } from "../../utils";
import moment from "moment";

const Index = ({ onSetBeasiswaModal, onSetBeasiswaData, pending }) => {
  const [searchText, setSearchText] = useState("");
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
    onSetBeasiswaModal(modalType, isOpen);
    onSetBeasiswaData(data);
  };

  return (
    <Container>
      <Modal handleRefresh={(state) => handleRefresh(state)} />
      <Row className="m-3 justify-content-between">
        <Button
          color="primary"
          variant="contained"
          disabled={pending}
          onClick={() => setModal("add", true, null)}
        >
          Tambah Beasiswa
        </Button>
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
          columns={[
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
                    <MenuItem onClick={() => setModal("detail", true, rowData)}>
                      Lihat Detail
                    </MenuItem>
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
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
