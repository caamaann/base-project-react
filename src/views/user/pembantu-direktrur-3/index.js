import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import PembantuDirektur3, {
  setPembantuDirektur3Data,
  setPembantuDirektur3Modal,
} from "../../../store/actions/user/pembantu-direktur-3";
import Jurusan from "../../../store/actions/master/jurusan";
import ProgramStudi from "../../../store/actions/master/program-studi";
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

const Index = ({
  onSetPembantuDirektur3Modal,
  onSetPembantuDirektur3Data,
  pending,
  jurusan,
}) => {
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
    onSetPembantuDirektur3Modal(modalType, isOpen);
    onSetPembantuDirektur3Data(data);
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
          Tambah Pembantu Direktur 3
        </Button>
        <Row className="justify-content-end">
          <InputComponent
            onChange={(e) => handleSearchChange(e)}
            placeholder="Cari nama pembantu direktur 3"
            endIcon={SearchIcon}
          />
        </Row>
      </Row>
      <div className="m-3">
        <MaterialTable
          tableRef={tableRef}
          title="PembantuDirektur3"
          columns={[
            {
              title: "No",
              field: "no",
              width: 40,
            },
            {
              title: "Nama Pembantu Direktur 3",
              render: ({ nama }) => {
                return nama ? nama : "-";
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
              dispatch(PembantuDirektur3.get(param, resolve));
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

const mapStateToProps = ({
  userPembantuDirektur3: { pending },
  jurusan,
  programStudi,
}) => {
  return { pending, jurusan, programStudi };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetPembantuDirektur3Modal: (modalType, isOpen) =>
      dispatch(setPembantuDirektur3Modal(modalType, isOpen)),
    onSetPembantuDirektur3Data: (data) =>
      dispatch(setPembantuDirektur3Data(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
