import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Mahasiswa, {
  setMahasiswaData,
  setMahasiswaModal,
} from "../../../store/actions/user/mahasiswa";
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
import { history } from "../../../utils";
import { yearOptions } from "../../../utils/date";

const Index = ({
  onSetMahasiswaModal,
  onSetMahasiswaData,
  pending,
  jurusan,
  programStudi,
}) => {
  const [searchText, setSearchText] = useState("");
  const [jurusanId, setJurusanId] = useState("");
  const [programStudiId, setProgramStudiId] = useState("");
  const [angkatan, setAngkatan] = useState("");
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
    onSetMahasiswaModal(modalType, isOpen);
    onSetMahasiswaData(data);
  };

  const handleJurusanChange = (e) => {
    if (e) {
      setJurusanId(e.value);
    } else {
      setJurusanId("");
    }
    tableRef.current && tableRef.current.onQueryChange();
  };

  const handleProgramStudiChange = (e) => {
    if (e) {
      setProgramStudiId(e.value);
    } else {
      setProgramStudiId("");
    }
    tableRef.current && tableRef.current.onQueryChange();
  };

  const handleAngkatanChange = (e) => {
    if (e) {
      setAngkatan(e.value);
    } else {
      setAngkatan("");
    }
    tableRef.current && tableRef.current.onQueryChange();
  };

  let jurusanOptions, prodiOptions;
  if (jurusan.data) {
    jurusanOptions = jurusan.data.data.data.map((item) => {
      return {
        label: item.nama,
        value: item.id,
      };
    });
  }

  if (programStudi.data) {
    prodiOptions = programStudi.data.data.data.map((item) => {
      return {
        label: item.nama,
        value: item.id,
      };
    });
  }

  useEffect(() => {
    getJurusan();
    getProgramStudi();
  }, []);

  const getJurusan = () => dispatch(Jurusan.get());
  const getProgramStudi = () => dispatch(ProgramStudi.get());

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
          Tambah Mahasiswa
        </Button>
        <Row className="justify-content-end">
          <div style={{ width: 120, marginRight: 20 }}>
            <SelectComponent
              onChange={(e) => handleAngkatanChange(e)}
              placeholder="Angkatan"
              options={yearOptions(4)}
            />
          </div>
          <div style={{ width: 200, marginRight: 20 }}>
            <SelectComponent
              onChange={(e) => handleProgramStudiChange(e)}
              placeholder="Program Studi"
              options={prodiOptions}
              isAsync
              asyncUrl="/program_studi"
            />
          </div>
          <div style={{ width: 200, marginRight: 20 }}>
            <SelectComponent
              onChange={(e) => handleJurusanChange(e)}
              placeholder="Jurusan"
              options={jurusanOptions}
              isAsync
              asyncUrl="/jurusan"
            />
          </div>
          <InputComponent
            onChange={(e) => handleSearchChange(e)}
            placeholder="Cari nama mahasiswa"
            endIcon={SearchIcon}
          />
        </Row>
      </Row>
      <div className="m-3">
        <MaterialTable
          tableRef={tableRef}
          title="Mahasiswa"
          columns={[
            {
              title: "No",
              field: "no",
              width: 40,
            },
            {
              title: "Nama Mahasiswa",
              render: ({ nama }) => {
                return nama ? nama : "-";
              },
            },
            {
              title: "Program Studi",
              render: ({ program_studi }) => {
                return program_studi?.nama ? program_studi.nama : "-";
              },
            },
            {
              title: "Jurusan",
              render: ({ jurusan }) => {
                return jurusan?.nama ? jurusan.nama : "-";
              },
            },
            {
              title: "Angkatan",
              render: ({ angkatan }) => {
                return angkatan ? angkatan : "-";
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
                jurusan_id: jurusanId,
                program_studi_id: programStudiId,
                angkatan: angkatan,
              };
              dispatch(Mahasiswa.get(param, resolve));
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
  userMahasiswa: { pending },
  jurusan,
  programStudi,
}) => {
  return { pending, jurusan, programStudi };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMahasiswaModal: (modalType, isOpen) =>
      dispatch(setMahasiswaModal(modalType, isOpen)),
    onSetMahasiswaData: (data) => dispatch(setMahasiswaData(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
