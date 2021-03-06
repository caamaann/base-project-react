import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import KetuaJurusan, {
  setKetuaJurusanData,
  setKetuaJurusanModal,
} from "../../../store/actions/ketua-jurusan";
import { Row } from "simple-flexbox";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, Button, MenuItem } from "@material-ui/core";
import InputComponent from "../../../components/commons/form/input";
import Container from "../../../components/container";
import debounce from "lodash.debounce";
import { history } from "../../../utils";
import { getUser } from "../../../utils/user";
import moment from "moment";
import { isMoreTime } from "../../../utils/date";
import HeaderDetailKuota from "../../../components/header-content/detail-kuota";

const Index = ({
  onSetKetuaJurusanModal,
  onSetKetuaJurusanData,
  pending,
  chosenMahasiswa,
}) => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const user = getUser();
  const tableRef = useRef();
  const path = window.location.pathname.split("/");
  const id = path.pop();

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

  const onSubmit = () => {
    let mahasiswa_ids = chosenMahasiswa.map((item) => item.id);
    const param = {
      beasiswa_id: id,
      mahasiswa_ids,
    };
    const callback = () => {
      history.push("/ketua-prodi/beasiswa");
    };
    dispatch(KetuaJurusan.put(param, callback));
  };

  return (
    <Container>
      <div className="p-3">
        <Button
          color="primary"
          variant="contained"
          onClick={() => onSubmit()}
          disabled={pending}
        >
          Submit
        </Button>
      </div>
      <div className="m-3">
        <MaterialTable
          tableRef={tableRef}
          title="KetuaJurusan"
          columns={[
            {
              title: "No",
              // field: "no",
              width: 40,
              render: ({ no }) => {
                return <div className="my-3">{no}</div>;
              },
            },
            {
              title: "Program Studi",
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
            {
              title: "Nama Mahasiswa",
              render: ({ nama }) => {
                return nama ? nama : "-";
              },
            },
            {
              title: "Nama Wali Kelas",
              render: ({ wali_kelas_nama }) => {
                return wali_kelas_nama ? wali_kelas_nama : "-";
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
              dispatch(KetuaJurusan.get(param, resolve));
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
            selectionProps: (rowData) => ({
              color: "primary",
            }),
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

const mapStateToProps = ({ ketuaJurusan: { data, pending }, kuota }) => {
  const chosenMahasiswa = data?.data?.data;
  return { pending, kuota, chosenMahasiswa };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetKetuaJurusanModal: (modalType, isOpen) =>
      dispatch(setKetuaJurusanModal(modalType, isOpen)),
    onSetKetuaJurusanData: (data) => dispatch(setKetuaJurusanData(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
