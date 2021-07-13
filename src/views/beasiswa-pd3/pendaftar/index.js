import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import PD3, { setPD3Data, setPD3Modal } from "../../../store/actions/pd-3";
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

const Index = ({
  onSetPD3Modal,
  onSetPD3Data,
  pending,
  chosenMahasiswa,
  status,
}) => {
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
    onSetPD3Modal(modalType, isOpen);
    onSetPD3Data(data);
  };

  const onSubmit = () => {
    let mahasiswa_ids = chosenMahasiswa.map((item) => item.id);
    const param = {
      beasiswa_id: id,
      mahasiswa_ids,
    };
    const callback = () => {
      history.push("/pd-3/beasiswa");
    };
    dispatch(PD3.seleksi(param, callback));
  };

  return (
    <Container>
      <Modal handleRefresh={(state) => handleRefresh(state)} />
      <Row className="m-3 justify-content-between">
        <InputComponent
          onChange={(e) => handleSearchChange(e)}
          placeholder="Cari nama mahasiswa"
          endIcon={SearchIcon}
        />
        {status === 1 && chosenMahasiswa?.length > 0 && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => onSubmit()}
            disabled={pending}
          >
            Submit
          </Button>
        )}
      </Row>
      <div className="m-3">
        <MaterialTable
          tableRef={tableRef}
          title="PD3"
          columns={[
            {
              title: "No",
              field: "no",
              width: 40,
            },
            {
              title: "Nama Mahasiswa",
              render: ({ nama }) => {
                return nama ? <div className="py-3">{nama}</div> : "-";
              },
            },
            {
              title: "Nama Program Studi",
              render: ({ program_studi_nama }) => {
                return program_studi_nama ? program_studi_nama : "-";
              },
            },
            {
              title: "Angkatan",
              render: ({ angkatan }) => {
                return angkatan ? angkatan : "-";
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
              dispatch(PD3.getPendaftar(param, resolve));
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
  pd3: { pending, data },
  beasiswa: { data: dataBeasiswa },
}) => {
  const status = dataBeasiswa?.status_pendaftaran === "Dibuka" ? 1 : 0;
  const chosenMahasiswa = data?.data?.data;
  return { pending, chosenMahasiswa, status };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetPD3Modal: (modalType, isOpen) =>
      dispatch(setPD3Modal(modalType, isOpen)),
    onSetPD3Data: (data) => dispatch(setPD3Data(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
