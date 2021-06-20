import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import KetuaProgramStudi, {
  setKetuaProgramStudiData,
  setKetuaProgramStudiModal,
} from "../../../store/actions/user/ketua-program-studi";
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
  onSetKetuaProgramStudiModal,
  onSetKetuaProgramStudiData,
  pending,
  jurusan,
}) => {
  const [searchText, setSearchText] = useState("");
  const [jurusanId, setJurusanId] = useState("");
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
    onSetKetuaProgramStudiModal(modalType, isOpen);
    onSetKetuaProgramStudiData(data);
  };

  const handleJurusanChange = (e) => {
    if (e) {
      setJurusanId(e.value);
    } else {
      setJurusanId("");
    }
    tableRef.current && tableRef.current.onQueryChange();
  };

  let jurusanOptions;
  if (jurusan.data) {
    jurusanOptions = jurusan.data.data.data.map((item) => {
      return {
        label: item.nama,
        value: item.id,
      };
    });
  }

  useEffect(() => {
    getJurusan();
  }, []);

  const getJurusan = () => dispatch(Jurusan.get());

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
          Tambah Ketua Program Studi
        </Button>
        <Row className="justify-content-end">
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
            placeholder="Cari nama ketua program studi"
            endIcon={SearchIcon}
          />
        </Row>
      </Row>
      <div className="m-3">
        <MaterialTable
          tableRef={tableRef}
          title="KetuaProgramStudi"
          columns={[
            {
              title: "No",
              field: "no",
              width: 40,
            },
            {
              title: "Nama Ketua Program Studi",
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
              };
              dispatch(KetuaProgramStudi.get(param, resolve));
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
  userKetuaProgramStudi: { pending },
  jurusan,
  programStudi,
}) => {
  return { pending, jurusan, programStudi };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetKetuaProgramStudiModal: (modalType, isOpen) =>
      dispatch(setKetuaProgramStudiModal(modalType, isOpen)),
    onSetKetuaProgramStudiData: (data) =>
      dispatch(setKetuaProgramStudiData(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
