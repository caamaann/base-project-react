import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import KetuaProgramStudi, {
  setKetuaProgramStudiData,
  setKetuaProgramStudiModal,
} from "../../../store/actions/ketua-prodi";
import Kuota from "../../../store/actions/kuota";
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
  onSetKetuaProgramStudiModal,
  onSetKetuaProgramStudiData,
  pending,
  kuota,
}) => {
  const [searchText, setSearchText] = useState("");
  const [chosenMahasiwa, setChosenMahasiwa] = useState("");
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

  useEffect(() => {
    getKuotaProgramStudi();
  }, []);

  const getKuotaProgramStudi = () =>
    dispatch(Kuota.getKuotaProdi({ beasiswa_id: id }));

  let dataKuota;
  if (kuota.data) {
    dataKuota = kuota.data.data.data;
  }

  const onSubmit = () => {
    let mahasiswa_ids = chosenMahasiwa.map((item) => item.id);
    const param = {
      beasiswa_id: id,
      mahasiswa_ids,
    };
    const callback = () => {
      history.push("/ketua-prodi/beasiswa");
    };
    dispatch(KetuaProgramStudi.put(param, callback));
  };

  return (
    <Container>
      <HeaderDetailKuota data={dataKuota} />
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
          title="KetuaProgramStudi"
          columns={[
            {
              title: "No",
              field: "no",
              width: 40,
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
            {
              title: "Skor Akhir",
              render: ({ skor_akhir }) => {
                return skor_akhir ? skor_akhir : "-";
              },
            },
            // {
            //   title: "Aksi",
            //   width: 120,
            //   cellStyle: {
            //     paddingLeft: 0,
            //   },
            //   render: (rowData) => {
            //     return (
            //       <div className="p-3">
            //         <Button
            //           color="primary"
            //           variant="outlined"
            //           disabled={
            //             !isMoreTime(
            //               rowData.awal_pendaftaran,
            //               rowData.akhir_pendaftaran
            //             ) ||
            //             rowData.status === 1 ||
            //             rowData.total_pendaftar === 0
            //           }
            //           onClick={() => setDetail("detail", rowData)}
            //         >
            //           Penilaian
            //         </Button>
            //       </div>
            //     );
            //   },
            // },
          ]}
          data={(q) =>
            new Promise((resolve) => {
              let param = {
                page: q.page + 1,
                length: 10,
                search_text: searchText,
                beasiswa_id: id,
              };
              dispatch(KetuaProgramStudi.get(param, resolve));
            })
          }
          options={{
            pageSize: 10,
            selection: true,
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
          onSelectionChange={(rows) => setChosenMahasiwa(rows)}
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

const mapStateToProps = ({ ketuaProgramStudi: { pending }, kuota }) => {
  return { pending, kuota };
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
